import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

const FIELD_MASK = [
  'places.displayName',
  'places.types',
  'places.primaryType',
  'places.reviews',
  'places.formattedAddress',
  'places.editorialSummary',
  'places.parkingOptions',
  'places.dineIn',
  'places.takeout',
  'places.delivery',
  'places.goodForGroups',
  'places.goodForChildren',
  'places.priceLevel',
  'places.rating',
  'places.userRatingCount',
  'places.servesVegetarianFood',
  'places.servesCoffee',
  'places.location',
  'places.id',
].join(',');

// ─────────────────────────────────────────────────────────────────────────────
// TAG SEGMENTS — 5 groups derived from real review keyword analysis
// (50 hotels × 250 reviews — see scripts/keyword-segments-v2.ts)
// ─────────────────────────────────────────────────────────────────────────────
export const TAG_SEGMENTS = {
  CLEANLINESS: 'Cleanliness & Hygiene',
  LOCATION:    'Location & Access',
  STAFF:       'Staff & Hospitality',
  ROOM:        'Room & Comfort',
  FOOD:        'Food & Value',
} as const;

export type TagSegment = typeof TAG_SEGMENTS[keyof typeof TAG_SEGMENTS];

export interface TagMeta {
  tag:     string;
  segment: string;
  group:   'A' | 'B';
  freq?:   number;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOTEL TAG KEYWORDS — 3 segments × 5 tags = 15 tags
// Grounded in real review keyword frequency from top-34 Thanjavur hotels
// ─────────────────────────────────────────────────────────────────────────────
const HOTEL_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Location (GPS-verified via CITY_LANDMARKS in plan.ts) ────────────────
  'Near Big Temple':      ['temple', 'brihadeeswarar', 'big temple', 'gopuram', 'near temple'],
  'City Centre':          ['city centre', 'city center', 'central', 'main road', 'heart of city'],
  'Near Railway Station': ['railway station', 'railway', 'junction', 'rail', 'near station'],
  'Quiet & Peaceful':     ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free'],
  'Free Parking':         ['parking', 'car park', 'free parking', 'car parking', 'parking available'],

  // ── Rooms ────────────────────────────────────────────────────────────────
  'Good Amenities':       ['amenities', 'all amenities', 'basic amenities', 'well equipped', 'facilities', 'ac', 'air conditioned', 'hot water', 'geyser', 'comfortable', 'good facilities', 'nice room'],
  'Good WiFi':            ['wifi', 'wi-fi', 'free wifi', 'internet', 'fast wifi', 'wifi available', 'good wifi', 'wifi working', 'high speed', 'internet access', 'connectivity'],
  'Spacious Rooms':       ['spacious', 'clean spacious', 'large room', 'big room', 'roomy', 'good space'],
  'Swimming Pool':        ['swimming pool', 'pool', 'swim', 'resort pool', 'pool side'],
  'In-House Restaurant':  ['restaurant', 'dining', 'dining hall', 'in-house restaurant', 'food court'],

  // ── Stay Type ────────────────────────────────────────────────────────────
  'Budget Stay':          ['budget', 'affordable', 'economical', 'lodge', 'inn', 'value for money', 'cheap'],
  'Premium Stay':         ['luxury', 'premium', 'five star', '5 star', 'upscale', 'elite', 'suite'],
  'Highly Rated':         ['highly recommended', 'must stay', 'excellent', 'best hotel', 'top rated', 'recommend'],
  'Heritage Stay':        ['heritage', 'boutique', 'historic', 'traditional', 'old charm', 'colonial', 'period'],
  'Breakfast Included':   ['complimentary breakfast', 'breakfast included', 'free breakfast', 'breakfast provided'],
};

// ─────────────────────────────────────────────────────────────────────────────
// HOTEL TAG LIST — 3 segments × 5 tags = 15 tags
// Grounded in real keyword frequency: "swimming pool"=13, "wifi"=21,
// "heritage"=19, "complimentary breakfast"=12, "parking"=32 in top-34 reviews
// ─────────────────────────────────────────────────────────────────────────────
const HOTEL_BASE_TAGS: TagMeta[] = [
  // LOCATION (5) — GPS-verified or strong keyword signal
  { tag: 'Near Big Temple',      segment: 'Location',  group: 'A' },
  { tag: 'City Centre',          segment: 'Location',  group: 'A' },
  { tag: 'Near Railway Station', segment: 'Location',  group: 'A' },
  { tag: 'Quiet & Peaceful',     segment: 'Location',  group: 'B' },
  { tag: 'Free Parking',         segment: 'Location',  group: 'B' },
  // ROOMS (5) — all with real review keyword support
  { tag: 'Good Amenities',       segment: 'Rooms',     group: 'B' },
  { tag: 'Good WiFi',            segment: 'Rooms',     group: 'B' },
  { tag: 'Spacious Rooms',       segment: 'Rooms',     group: 'B' },
  { tag: 'Swimming Pool',        segment: 'Rooms',     group: 'B' },
  { tag: 'In-House Restaurant',  segment: 'Rooms',     group: 'B' },
  // STAY TYPE (5)
  { tag: 'Budget Stay',          segment: 'Stay Type', group: 'B' },
  { tag: 'Premium Stay',         segment: 'Stay Type', group: 'B' },
  { tag: 'Highly Rated',         segment: 'Stay Type', group: 'B' },
  { tag: 'Heritage Stay',        segment: 'Stay Type', group: 'B' },
  { tag: 'Breakfast Included',   segment: 'Stay Type', group: 'B' },
];

export const CITY_TAG_META: Record<string, TagMeta[]> = {
  thanjavur:  [...HOTEL_BASE_TAGS],
  kumbakonam: [...HOTEL_BASE_TAGS],
};

const HOTEL_SEGMENT_KEYS = ['Location', 'Rooms', 'Stay Type'] as const;

// Build searchable corpus from a Places API place object
function buildCorpus(p: any): string {
  const reviews = (p.reviews ?? []).map((r: any) => r.text?.text ?? '').join(' ');
  return [
    (p.displayName?.text ?? ''),
    ...(p.types ?? []).map((t: string) => t.replace(/_/g, ' ')),
    (p.editorialSummary?.text ?? ''),
    reviews,
  ].join(' ').toLowerCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOD TAG SEGMENTS — 5 segments × 5 tags = 25 tags
// Derived from real Thanjavur restaurant review keyword analysis (May 2026)
// Pure Veg / Non-Veg are diet-filter dropdowns in UI — not tag segments here
// ─────────────────────────────────────────────────────────────────────────────
export interface FoodTagMeta {
  tag:     string;
  segment: string;
  group:   'A' | 'B';
  freq?:   number;
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOD TAG KEYWORDS — 3 segments × 5 tags = 15 active tags
// ─────────────────────────────────────────────────────────────────────────────
const FOOD_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Cuisine (5) ──────────────────────────────────────────────────────────
  'South Indian':     ['south indian', 'dosa', 'dosai', 'idli', 'sambar', 'pongal', 'vada', 'rasam', 'banana leaf', 'saapadu', 'idiyappam'],
  'Biryani':          ['biryani', 'biriyani', 'dum biryani', 'mutton biryani', 'chicken biryani', 'mandi biryani', 'biryani house'],
  'Chettinad':        ['chettinad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'country chicken', 'anjappar', 'chettinad style', 'chettinad cuisine'],
  'North Indian':     ['north indian', 'paneer', 'butter masala', 'naan', 'roti', 'dal makhani', 'kadai', 'punjabi', 'butter chicken'],
  'Mess & Meals':     ['mess', 'meals', 'full meals', 'thali', 'banana leaf', 'saapadu', 'lunch thali', 'rice meals'],
  // ── Dining Style (5) ─────────────────────────────────────────────────────
  'Tiffin':           ['tiffin', 'tiffin center', 'tiffin centre', 'idli', 'dosa', 'vada', 'pongal', 'upma', 'morning tiffin', 'breakfast'],
  'Fine Dining':      ['fine dine', 'fine dining', 'elegant', 'upscale dining', 'fine cuisine', 'ambience', 'fine restaurant'],
  'Buffet':           ['buffet', 'unlimited buffet', 'all you can eat', 'buffet lunch', 'buffet dinner', 'unlimited spread'],
  'Cafe & Drinks':    ['cafe', 'filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'strong tea', 'coffee shop', 'beverages'],
  'Family Dining':    ['family dining', 'family restaurant', 'family friendly', 'good for families', 'kids menu', 'kids friendly', 'children friendly', 'suitable for kids', 'kids', 'children'],
  // ── Preference (5) ───────────────────────────────────────────────────────
  'Fresh & Hot':      ['fresh', 'freshly cooked', 'hot and fresh', 'made fresh', 'steaming hot', 'piping hot', 'freshly made'],
  'Budget Friendly':  ['affordable', 'cheap', 'budget', 'pocket friendly', 'economical', 'low price', 'affordable price'],
  'Authentic':        ['authentic', 'authentic taste', 'traditional', 'original', 'since 1964', 'authentic south', 'ancestral'],
  'Lunch Spot':       ['lunch', 'lunch thali', 'afternoon', 'noon', 'lunch time', 'lunch crowd', 'midday'],
  'Dinner Special':          ['dinner', 'evening', 'night', 'dinner menu', 'dinner special', 'serves dinner', 'late night'],
  // ── Thematic advanced tags ────────────────────────────────────────────────
  'South Indian Breakfast':  ['idli', 'dosa', 'dosai', 'vada', 'vadai', 'idly', 'south indian breakfast', 'breakfast'],
  'Pongal & Coffee':         ['pongal', 'filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'ven pongal'],
  'Thali & Meals':           ['thali', 'meals', 'full meals', 'banana leaf', 'saapadu', 'lunch thali', 'rice meals'],
  'Parotta / Kothu':         ['parotta', 'kothu', 'kothu parotta', 'idiyappam', 'kothu roti', 'parota'],
  'Tea & Snacks':            ['tea', 'chai', 'evening snacks', 'snacks', 'pakoda', 'bajji', 'bonda', 'murukku'],
  'Chicken / Mutton':        ['chicken', 'mutton', 'kozhi', 'chicken curry', 'mutton curry', 'chicken gravy', 'mutton gravy'],
  'Grills & Shawarma':       ['shawarma', 'bbq', 'grills', 'alfaham', 'barbeque', 'grill', 'grilled', 'kebab', 'tikka'],
  'Biryani & Mandi':         ['biryani', 'biriyani', 'mandi', 'dum biryani', 'briyani', 'biryani house'],
  'Indo-Chinese':            ['noodles', 'manchurian', 'fried rice', 'soup', 'indo chinese', 'indo-chinese', 'schezwan', 'chilli chicken'],
};

// 3×5 matrix — 15 tags
const FOOD_TAG_META: FoodTagMeta[] = [
  // Cuisine (5)
  { tag: 'South Indian',    segment: 'Cuisine',      group: 'B', freq: 34 },
  { tag: 'Biryani',         segment: 'Cuisine',      group: 'B', freq: 37 },
  { tag: 'Chettinad',       segment: 'Cuisine',      group: 'B', freq: 14 },
  { tag: 'North Indian',    segment: 'Cuisine',      group: 'B', freq: 18 },
  { tag: 'Mess & Meals',    segment: 'Cuisine',      group: 'B', freq: 29 },
  // Dining Style (5)
  { tag: 'Tiffin',          segment: 'Dining Style', group: 'B', freq: 31 },
  { tag: 'Fine Dining',     segment: 'Dining Style', group: 'B', freq: 12 },
  { tag: 'Buffet',          segment: 'Dining Style', group: 'B', freq: 14 },
  { tag: 'Cafe & Drinks',   segment: 'Dining Style', group: 'B', freq: 18 },
  { tag: 'Family Dining',   segment: 'Dining Style', group: 'B', freq: 24 },
  // Preference (5)
  { tag: 'Fresh & Hot',     segment: 'Preference',   group: 'B', freq: 22 },
  { tag: 'Budget Friendly', segment: 'Preference',   group: 'B', freq: 35 },
  { tag: 'Authentic',       segment: 'Preference',   group: 'B', freq: 22 },
  { tag: 'Lunch Spot',      segment: 'Preference',   group: 'B', freq: 30 },
  { tag: 'Dinner Special',  segment: 'Preference',   group: 'B', freq: 22 },
];

// Segment map — 15 active food tags (3×5)
const FOOD_TAG_SEGMENT_MAP: Record<string, { segment: string; group: 'A' | 'B' }> = {
  'South Indian':    { segment: 'Cuisine',      group: 'B' },
  'Biryani':         { segment: 'Cuisine',      group: 'B' },
  'Chettinad':       { segment: 'Cuisine',      group: 'B' },
  'North Indian':    { segment: 'Cuisine',      group: 'B' },
  'Mess & Meals':    { segment: 'Cuisine',      group: 'B' },
  'Tiffin':          { segment: 'Dining Style', group: 'B' },
  'Fine Dining':     { segment: 'Dining Style', group: 'B' },
  'Buffet':          { segment: 'Dining Style', group: 'B' },
  'Cafe & Drinks':   { segment: 'Dining Style', group: 'B' },
  'Family Dining':   { segment: 'Dining Style', group: 'B' },
  'Fresh & Hot':     { segment: 'Preference',   group: 'B' },
  'Budget Friendly': { segment: 'Preference',   group: 'B' },
  'Authentic':       { segment: 'Preference',   group: 'B' },
  'Lunch Spot':      { segment: 'Preference',   group: 'B' },
  'Dinner Special':  { segment: 'Preference',   group: 'B' },
};

const HOTEL_FALLBACKS = [
  'Near Big Temple', 'City Centre', 'Near Railway Station', 'Quiet & Peaceful', 'Free Parking',
  'Good Amenities', 'Good WiFi', 'Spacious Rooms', 'Swimming Pool', 'In-House Restaurant',
  'Budget Stay', 'Premium Stay', 'Highly Rated', 'Heritage Stay', 'Breakfast Included',
];
const FOOD_FALLBACKS = FOOD_TAG_META.map(m => m.tag);

function getCityKey(city: string): string {
  return city.trim().toLowerCase().replace(/[^a-z]/g, '');
}

// Parallel pool fetch — runs multiple queries concurrently, deduplicates by place ID.
// Free-tier safe: 2-3 queries × 20 results = up to 50 unique candidates per call.
async function fetchPool(queries: string[], max = 50): Promise<any[]> {
  const results = await Promise.allSettled(
    queries.map(q =>
      fetch('https://places.googleapis.com/v1/places:searchText', {
        method:  'POST',
        headers: {
          'Content-Type':     'application/json',
          'X-Goog-Api-Key':   PLACES_KEY,
          'X-Goog-FieldMask': FIELD_MASK,
        },
        body: JSON.stringify({ textQuery: q, maxResultCount: 20, languageCode: 'en' }),
      })
      .then(r => r.ok ? r.json() : { places: [] })
      .then((d: any) => (d.places ?? []) as any[])
    )
  );
  const seen = new Set<string>();
  const pool: any[] = [];
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const p of r.value) {
      const id = (p.id ?? p.displayName?.text ?? '') as string;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      pool.push(p);
      if (pool.length >= max) return pool;
    }
  }
  return pool;
}

// Score each hotel tag against real corpus — multi-signal for objective tags.
function scoreTagsAgainstPlaces(meta: TagMeta[], places: any[]): TagMeta[] {
  const BUDGET_NAME_RX   = /\b(lodge|budget|economy|inn|residency|dormitory|hostel)\b/i;
  const PREMIUM_NAME_RX  = /\b(grand|resort|palace|suite|spa|international|tower|crown|imperial|royal|executive|luxury)\b/i;
  const QP_KWS   = ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free'];
  const WIFI_KWS = ['wifi', 'wi-fi', 'free wifi', 'internet', 'fast wifi'];

  return meta.map(m => {
    let count = 0;

    if (m.tag === 'Budget Stay') {
      for (const p of places) {
        const price = p.priceLevel ?? '';
        if (price === 'PRICE_LEVEL_INEXPENSIVE' || price === 'PRICE_LEVEL_FREE') { count++; continue; }
        if (BUDGET_NAME_RX.test((p.displayName?.text ?? '').toLowerCase())) count++;
      }
    } else if (m.tag === 'Premium Stay') {
      for (const p of places) {
        const price = p.priceLevel ?? '';
        if (price === 'PRICE_LEVEL_EXPENSIVE' || price === 'PRICE_LEVEL_VERY_EXPENSIVE') { count++; continue; }
        if (PREMIUM_NAME_RX.test((p.displayName?.text ?? '').toLowerCase())) count++;
      }
    } else if (m.tag === 'Highly Rated') {
      for (const p of places) {
        if ((p.rating ?? 0) >= 4.3 && (p.userRatingCount ?? 0) >= 30) count++;
      }
    } else if (m.tag === 'Quiet & Peaceful') {
      for (const p of places) {
        const reviewCount = (p.reviews ?? []).filter((r: any) =>
          QP_KWS.some(k => (r.text?.text ?? '').toLowerCase().includes(k))
        ).length;
        if (reviewCount >= 1) { count++; continue; }
        if (p.goodForGroups === false) count++;
      }
    } else if (m.tag === 'Swimming Pool') {
      const POOL_KWS = ['swimming pool', 'pool', 'swim'];
      for (const p of places) {
        const reviewHits = (p.reviews ?? []).filter((r: any) =>
          POOL_KWS.some(k => (r.text?.text ?? '').toLowerCase().includes(k))
        ).length;
        if (reviewHits >= 1) count++;
      }
    } else if (m.tag === 'Heritage Stay') {
      const HERITAGE_RX = /\b(heritage|boutique|historic|colonial|period|traditional)\b/i;
      const HERITAGE_NAME_RX = /\b(heritage|boutique|villa|manor|palace|mahal|resort)\b/i;
      for (const p of places) {
        if (HERITAGE_NAME_RX.test(p.displayName?.text ?? '')) { count++; continue; }
        const reviewHits = (p.reviews ?? []).filter((r: any) =>
          HERITAGE_RX.test(r.text?.text ?? '')
        ).length;
        if (reviewHits >= 1) count++;
      }
    } else if (m.tag === 'Free Parking') {
      for (const p of places) {
        if (p.parkingOptions?.freeParkingLot === true || p.parkingOptions?.paidParkingLot === true) { count++; continue; }
        const corpus = buildCorpus(p);
        const kws = HOTEL_TAG_KEYWORDS['Free Parking'] ?? [];
        if (kws.some(k => corpus.includes(k))) count++;
      }
    } else if (m.tag === 'In-House Restaurant') {
      for (const p of places) {
        if (p.dineIn === true) { count++; continue; }
        const corpus = buildCorpus(p);
        const kws = HOTEL_TAG_KEYWORDS['In-House Restaurant'] ?? [];
        if (kws.some(k => corpus.includes(k))) count++;
      }
    } else {
      const kws = HOTEL_TAG_KEYWORDS[m.tag] ?? [];
      for (const p of places) {
        const corpus = buildCorpus(p);
        if (kws.some(k => corpus.includes(k))) count++;
      }
    }

    return { ...m, freq: count };
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const city    = ((req.body?.city as string) ?? 'Thanjavur').trim();
  const tab     = (req.body?.tab ?? 'Hotels') as 'Hotels' | 'Food';
  const cityKey = getCityKey(city);

  // ── Hotels ────────────────────────────────────────────────────────────────
  if (tab === 'Hotels') {
    const metaEntry = Object.entries(CITY_TAG_META).find(([k]) =>
      cityKey.includes(k) || k.includes(cityKey)
    );

    // Candidate tag list: curated for known cities, Thanjavur template for unknown
    const candidateMeta = metaEntry ? metaEntry[1] : (CITY_TAG_META['thanjavur'] ?? []);

    // Pool fetch: 3 queries × 20 = up to 50 unique hotels (free-tier safe)
    if (PLACES_KEY) {
      try {
        const places = await fetchPool([
          `hotels lodges in ${city}`,
          `budget hotels accommodation in ${city}`,
          `best hotels ${city} Tamil Nadu`,
        ], 50);

        const scored = scoreTagsAgainstPlaces(candidateMeta, places);

        const segments: Record<string, string[]> = {};
        for (const seg of HOTEL_SEGMENT_KEYS) {
          const inSeg = scored
            .filter(m => m.segment === seg)
            .sort((a, b) => (b.freq ?? 0) - (a.freq ?? 0));
          if (inSeg.length > 0) segments[seg] = inSeg.map(m => m.tag);
        }

        const groupA = scored.filter(m => m.group === 'A').map(m => m.tag);
        const tags   = scored
          .sort((a, b) => (b.freq ?? 0) - (a.freq ?? 0))
          .map(m => ({ tag: m.tag, count: m.freq ?? 0 }));

        return res.json({ tags, segments, groupA, city, total: places.length });
      } catch (err) {
        console.error('[/api/tags hotels]', err);
      }
    }

    // No API key or fetch failed — static fallback
    const tags = candidateMeta.map(m => ({ tag: m.tag, count: m.freq ?? 0 }));
    const segments: Record<string, string[]> = {};
    for (const seg of HOTEL_SEGMENT_KEYS) {
      const inSeg = candidateMeta.filter(m => m.segment === seg).map(m => m.tag);
      if (inSeg.length > 0) segments[seg] = inSeg;
    }
    const groupA = candidateMeta.filter(m => m.group === 'A').map(m => m.tag);
    return res.json({ tags, segments, groupA, city, total: candidateMeta.length });
  }

  // ── Food ──────────────────────────────────────────────────────────────────
  // Static fallback using hardcoded FOOD_TAG_META
  const FOOD_SEGMENT_KEYS = ['Cuisine', 'Dining Style', 'Preference'] as const;
  function buildFoodSegmentResponse(meta: FoodTagMeta[], total: number) {
    const tags = meta.map(m => ({ tag: m.tag, count: m.freq ?? 0 }));
    const segments: Record<string, string[]> = {};
    for (const seg of FOOD_SEGMENT_KEYS) {
      const inSeg = meta.filter(m => m.segment === seg).map(m => m.tag);
      if (inSeg.length > 0) segments[seg] = inSeg;
    }
    const groupA = meta.filter(m => m.group === 'A').map(m => m.tag);
    return { tags, segments, groupA, city, total };
  }

  if (!PLACES_KEY) {
    return res.json(buildFoodSegmentResponse(FOOD_TAG_META, 0));
  }

  try {
    // Pool fetch: 3 queries × 20 = up to 50 unique restaurants (free-tier safe)
    const places = await fetchPool([
      `restaurants in ${city}`,
      `tiffin food hotels dining in ${city}`,
      `best restaurants ${city} Tamil Nadu`,
    ], 50);

    // Score all tags in FOOD_TAG_SEGMENT_MAP against the 50-place corpus.
    // Objective tags use API booleans first, keyword fallback second.
    const scored = Object.entries(FOOD_TAG_SEGMENT_MAP).map(([tag, meta]) => {
      let count = 0;
      if (tag === 'Buffet') {
        // primaryType signal first, then keyword
        for (const p of places) {
          if ((p.primaryType ?? '').includes('buffet')) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Buffet'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Fine Dining') {
        // primaryType=fine_dining_restaurant first, then keyword
        for (const p of places) {
          if ((p.primaryType ?? '').includes('fine_dining')) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Fine Dining'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Cafe & Drinks') {
        for (const p of places) {
          if (p.servesCoffee === true) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Cafe & Drinks'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Budget Friendly') {
        for (const p of places) {
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Budget Friendly'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Highly Rated') {
        for (const p of places) {
          if ((p.rating ?? 0) >= 4.3 && (p.userRatingCount ?? 0) >= 50) count++;
        }
      } else if (tag === 'North Indian') {
        for (const p of places) {
          if ((p.primaryType ?? '').includes('north_indian')) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['North Indian'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Mess & Meals') {
        for (const p of places) {
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Mess & Meals'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Tiffin') {
        for (const p of places) {
          if ((p.primaryType ?? '').includes('breakfast_restaurant')) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Tiffin'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Authentic') {
        for (const p of places) {
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Authentic'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Chettinad') {
        for (const p of places) {
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Chettinad'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Fresh & Hot') {
        for (const p of places) {
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Fresh & Hot'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Family Dining') {
        for (const p of places) {
          if ((p.primaryType ?? '').includes('family_restaurant')) { count++; continue; }
          const corpus = buildCorpus(p);
          if (['family', 'kids'].some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Lunch Spot') {
        for (const p of places) {
          if (p.servesLunch === true) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Lunch Spot'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else if (tag === 'Dinner Special') {
        for (const p of places) {
          if (p.servesDinner === true) { count++; continue; }
          const corpus = buildCorpus(p);
          const kws = FOOD_TAG_KEYWORDS['Dinner Special'] ?? [];
          if (kws.some(k => corpus.includes(k))) count++;
        }
      } else {
        const kws = FOOD_TAG_KEYWORDS[tag] ?? [];
        for (const p of places) {
          const corpus = buildCorpus(p);
          if (kws.some(k => corpus.includes(k))) count++;
        }
      }
      return { tag, segment: meta.segment, group: meta.group, freq: count };
    });

    // Per segment: sort by real frequency, take top 5 (3×5 matrix)
    const segments: Record<string, string[]> = {};
    for (const seg of FOOD_SEGMENT_KEYS) {
      const inSeg = scored
        .filter(m => m.segment === seg && m.freq >= 1)
        .sort((a, b) => b.freq - a.freq)
        .slice(0, 5);
      if (inSeg.length > 0) segments[seg] = inSeg.map(m => m.tag);
    }

    // Fall back to static list for any segment with no live results
    for (const seg of FOOD_SEGMENT_KEYS) {
      if (!segments[seg] || segments[seg].length === 0) {
        segments[seg] = FOOD_TAG_META.filter(m => m.segment === seg).map(m => m.tag);
      }
    }

    const tags = scored
      .filter(m => m.freq >= 2)
      .sort((a, b) => b.freq - a.freq)
      .map(m => ({ tag: m.tag, count: m.freq }));

    return res.json({ tags, segments, groupA: [], city, total: places.length });
  } catch (err) {
    console.error('[/api/tags food]', err);
    return res.json(buildFoodSegmentResponse(FOOD_TAG_META, 0));
  }
}
