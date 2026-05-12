import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

const FIELD_MASK = [
  'places.displayName',
  'places.types',
  'places.reviews',
  'places.formattedAddress',
  'places.editorialSummary',
  'places.parkingOptions',
  'places.dineIn',
  'places.goodForGroups',
  'places.goodForChildren',
  'places.priceLevel',
  'places.servesVegetarianFood',
  'places.location',
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
// HOTEL TAG VALIDATION KEYWORDS — 5 × 5 matrix
// Derived from real review keyword frequency analysis.
// Each cluster merges synonyms so one tag captures the full concept.
// ─────────────────────────────────────────────────────────────────────────────
const HOTEL_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Cleanliness & Hygiene ─────────────────────────────────────────────────
  // Merged tags — aligned with TAG_TEXT_KEYWORDS in plan.ts and CITY_TAG_META
  'Spotlessly Clean':    ['clean', 'cleaning', 'cleanliness', 'spotless', 'spotlessly', 'immaculate', 'hygienic', 'hygiene', 'sanitized', 'sanitary'],
  'Well Maintained':     ['maintained', 'well-maintained', 'maintenance', 'neat', 'tidy', 'neatly'],
  'Fresh Rooms':         ['fresh', 'odour', 'smell', 'odor', 'bathroom', 'toilet', 'shower', 'towels', 'bath'],
  // Legacy split tags — kept for backward compat
  'Hygienic':            ['hygienic', 'hygiene', 'sanitized', 'sanitary'],
  'Clean Bathrooms':     ['bathroom clean', 'clean bathroom', 'clean toilet', 'towels', 'shower'],

  // ── Location & Access ────────────────────────────────────────────────────
  'Near Big Temple':     ['temple', 'kovil', 'brihadeeswarar', 'big temple', 'gopuram'],
  'Near Railway Station':['railway', 'station', 'junction', 'rail', 'near station'],
  'Central & Walkable':  ['city centre', 'main road', 'central', 'town centre', 'walk', 'walkable', 'walking distance', 'minutes away', 'nearby', 'convenient'],
  'Easy Parking':        ['parking', 'car park', 'valet', 'garage', 'bike parking'],
  'Walkable Area':       ['walk', 'walkable', 'walking distance', 'minutes away', 'nearby', 'convenient'],

  // ── Staff & Hospitality ───────────────────────────────────────────────────
  // Merged tags
  'Friendly & Helpful':  ['friendly', 'warm', 'warmth', 'welcoming', 'hospitable', 'helpful', 'attentive', 'cooperative', 'caring', 'supportive'],
  'Warm Hospitality':    ['courteous', 'polite', 'professional', 'respectful', 'hospitality', 'heartwarming', 'teamwork'],
  'Quick Response':      ['prompt', 'promptly', 'quick', 'smooth', 'responsive', 'fast service'],
  // Legacy split tags
  'Friendly Staff':      ['friendly', 'warm', 'warmth', 'welcoming', 'family-friendly'],
  'Helpful Team':        ['helpful', 'help', 'attentive', 'cooperative', 'caring'],
  'Courteous Service':   ['courteous', 'polite', 'professional', 'respectful', 'behaved'],
  'Great Hospitality':   ['hospitality', 'welcoming', 'heartwarming', 'teamwork'],

  // ── Room & Comfort ────────────────────────────────────────────────────────
  'Spacious Rooms':      ['spacious', 'space', 'large room', 'big room', 'roomy'],
  'Comfortable & Quiet': ['comfortable', 'comfort', 'comfortably', 'cozy', 'quiet', 'peaceful', 'calm', 'serene', 'noise-free'],
  'Good Amenities':      ['amenities', 'wifi', 'internet', 'lift', 'pool', 'facilities', 'generator'],
  'In-House Restaurant': ['restaurant', 'dining', 'dining hall', 'meals', 'food court', 'in-house'],
  'Comfortable Stay':    ['comfortable', 'comfort', 'comfortably', 'cozy', 'cosy'],

  // ── Food & Value ──────────────────────────────────────────────────────────
  'Breakfast Included':  ['breakfast included', 'complimentary breakfast', 'free breakfast', 'breakfast provided'],
  'Good Food':           ['food', 'tasty', 'taste', 'delicious', 'tasted', 'meals', 'recommend', 'recommended', 'excellent', 'amazing'],
  'Value for Money':     ['value for money', 'affordable', 'worth', 'good value', 'money', 'price', 'budget', 'reasonable', 'economical'],
  // ── New 3×5 hotel tags ───────────────────────────────────────────────────
  'City Centre':         ['city', 'centre', 'central', 'city center', 'town', 'main road', 'heart of', 'prime location'],
  'Walkable Distance':   ['walk', 'walking', 'walkable', 'nearby', 'proximity', 'close to', 'minutes walk', 'walking distance'],
  'Quiet & Peaceful':    ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free', 'peaceful stay'],
  'Budget-Friendly':     ['budget', 'affordable', 'cheap', 'economical', 'inexpensive', 'low cost', 'lodge'],
  'Prompt Service':      ['prompt', 'quick service', 'fast service', 'responsive', 'smooth', 'efficient'],
  'Good Hospitality':    ['hospitality', 'welcoming', 'warm', 'courteous', 'polite', 'hospitable', 'heartwarming'],
  'Highly Recommended':  ['recommend', 'recommended', 'must stay', 'must visit', 'excellent', 'best', 'outstanding'],
  // Legacy split tags
  'Fair Price':          ['price', 'budget', 'decent price', 'reasonable', 'economical'],
};

// ─────────────────────────────────────────────────────────────────────────────
// CITY-CURATED TAG LIST — 5 segments × 5 tags
// Hotel counts in comments are from the 50-hotel Thanjavur corpus analysis.
// ─────────────────────────────────────────────────────────────────────────────
// Shared food segments for hotel filter — lets users find hotels whose
// in-house restaurant serves a specific cuisine or dish.
const HOTEL_FOOD_TAGS: TagMeta[] = [
  // Cuisine Style
  { tag: 'South Indian',    segment: 'Cuisine Style',    group: 'B' },
  { tag: 'North Indian',    segment: 'Cuisine Style',    group: 'B' },
  { tag: 'Chettinad',       segment: 'Cuisine Style',    group: 'B' },
  { tag: 'Multi Cuisine',   segment: 'Cuisine Style',    group: 'B' },
  // Specialty
  { tag: 'BBQ & Grills',    segment: 'Specialty',        group: 'B' },
  { tag: 'Tandoori',        segment: 'Specialty',        group: 'B' },
  { tag: 'Mandi',           segment: 'Specialty',        group: 'B' },
  { tag: 'Alfaham',         segment: 'Specialty',        group: 'B' },
  { tag: 'Buffet',          segment: 'Specialty',        group: 'B' },
  { tag: 'Thali/Meals',     segment: 'Specialty',        group: 'B' },
  { tag: 'Tiffin',          segment: 'Specialty',        group: 'B' },
  // Vibe & Occasion
  { tag: 'Family Dining',   segment: 'Vibe & Occasion',  group: 'B' },
  { tag: 'Affordable',      segment: 'Vibe & Occasion',  group: 'B' },
  // Dishes · Veg
  { tag: 'Dosa',            segment: 'Dishes · Veg',     group: 'B' },
  { tag: 'Idli',            segment: 'Dishes · Veg',     group: 'B' },
  { tag: 'Pongal',          segment: 'Dishes · Veg',     group: 'B' },
  { tag: 'Paneer',          segment: 'Dishes · Veg',     group: 'B' },
  { tag: 'Filter Coffee',   segment: 'Dishes · Veg',     group: 'B' },
  { tag: 'Sweets',          segment: 'Dishes · Veg',     group: 'B' },
  // Dishes · Non-Veg
  { tag: 'Biryani',         segment: 'Dishes · Non-Veg', group: 'B' },
  { tag: 'Chicken',         segment: 'Dishes · Non-Veg', group: 'B' },
  { tag: 'Mutton',          segment: 'Dishes · Non-Veg', group: 'B' },
  { tag: 'Fish',            segment: 'Dishes · Non-Veg', group: 'B' },
  { tag: 'Shawarma',        segment: 'Dishes · Non-Veg', group: 'B' },
];

const HOTEL_BASE_TAGS: TagMeta[] = [
  // WHERE? — location anchors (GPS-verified where possible)
  { tag: 'Near Big Temple',      segment: 'Where?',           group: 'A' },
  { tag: 'Near Railway Station', segment: 'Where?',           group: 'A' },
  { tag: 'City Centre',          segment: 'Where?',           group: 'A' },
  { tag: 'Easy Parking',         segment: 'Where?',           group: 'B' },
  { tag: 'Walkable Distance',    segment: 'Where?',           group: 'A' },
  // ROOM & STAY — property features each guest explicitly chooses
  { tag: 'Spacious Rooms',       segment: 'Room & Stay',      group: 'B' },
  { tag: 'Good Amenities',       segment: 'Room & Stay',      group: 'B' },
  { tag: 'In-House Restaurant',  segment: 'Room & Stay',      group: 'B' },
  { tag: 'Quiet & Peaceful',     segment: 'Room & Stay',      group: 'B' },
  { tag: 'Breakfast Included',   segment: 'Room & Stay',      group: 'B' },
  // VALUE & SERVICE — practical stay quality
  { tag: 'Value for Money',      segment: 'Value & Service',  group: 'B' },
  { tag: 'Budget-Friendly',      segment: 'Value & Service',  group: 'B' },
  { tag: 'Prompt Service',       segment: 'Value & Service',  group: 'B' },
  { tag: 'Good Hospitality',     segment: 'Value & Service',  group: 'B' },
  { tag: 'Highly Recommended',   segment: 'Value & Service',  group: 'B' },
];

export const CITY_TAG_META: Record<string, TagMeta[]> = {
  thanjavur:  [...HOTEL_BASE_TAGS],
  kumbakonam: [...HOTEL_BASE_TAGS],
};

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
// FOOD TAG SEGMENTS — 5 segments derived from real Thanjavur restaurant review
// keyword analysis (37 restaurants × 185 reviews, May 2026)
// ─────────────────────────────────────────────────────────────────────────────
export interface FoodTagMeta {
  tag:     string;
  segment: string;
  group:   'A' | 'B';
  freq?:   number;
}

const FOOD_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Cuisine & Dish — each tag subsuming all its dish/style variants ───────
  'Biryani':       ['biryani', 'biriyani', 'dum biryani', 'briyani', 'mandi biryani', 'chicken biryani', 'mutton biryani', 'veg biryani', 'biryani house', 'biryani point'],
  'Pure Veg':      ['pure veg', 'vegetarian', 'veg only', 'no non-veg', 'bhavan', 'saiva', 'sattvic', 'serves vegetarian', 'vegetarian restaurant', 'saivam'],
  'Non-Veg':       ['non-veg', 'nonveg', 'chicken', 'mutton', 'fish', 'prawn', 'crab', 'egg', 'meat', 'shawarma', 'non vegetarian', 'kozhi', 'meen'],
  'South Indian':  ['south indian', 'dosa', 'dosai', 'idli', 'idly', 'sambar', 'pongal', 'vada', 'rasam', 'banana leaf', 'saapadu', 'uttapam', 'appam', 'idiyappam', 'south indian restaurant'],
  'Tiffin':        ['tiffin', 'tiffin center', 'tiffin centre', 'morning tiffin', 'evening tiffin', 'tiffin shop', 'idli', 'dosa', 'dosai', 'vada', 'vadai', 'pongal', 'idly', 'uttapam', 'upma'],
  // ── Meal & Timing ────────────────────────────────────────────────────────
  'Lunch':         ['lunch', 'lunch meals', 'lunch thali', 'afternoon meals', 'lunch time', 'afternoon', 'meals', 'full meals', 'banana leaf meals'],
  'All Day':       ['all day', 'open all day', 'all time', 'anytime', 'full day', 'variety', 'multi cuisine', 'open late', '24 hours'],
  'Dinner':        ['dinner', 'night food', 'evening meals', 'dinner time', 'supper', 'night restaurant', 'dinner menu'],
  'Snacks':        ['snacks', 'snack', 'bajji', 'bonda', 'chaat', 'evening snack', 'street food', 'bakery', 'tea shop', 'tea stall', 'murukku', 'parotta', 'kothu parotta'],
  'Breakfast':     ['breakfast', 'morning tiffin', 'morning', 'idli', 'dosa', 'tiffin', 'pongal', 'upma', 'morning snack', 'early morning'],
  // ── Taste & Quality ──────────────────────────────────────────────────────
  'Delicious':     ['delicious', 'tasty', 'flavorful', 'flavour', 'yummy', 'amazing taste', 'loved the taste', 'great taste', 'wonderful food', 'mouthwatering'],
  'Fresh':         ['fresh', 'freshly', 'freshly cooked', 'freshly prepared', 'hot and fresh', 'cooked fresh', 'fresh ingredients', 'hot food'],
  'Spicy':         ['spicy', 'spice', 'masala', 'pepper', 'tangy', 'hot and spicy', 'spice level', 'well spiced', 'fiery', 'chilli'],
  'Good Quantity': ['quantity', 'generous', 'generous portions', 'good quantity', 'full stomach', 'enough food', 'large portion', 'filling', 'heavy meal'],
  'Authentic':     ['authentic', 'traditional', 'original', 'homemade', 'age old', 'heritage', 'classic', 'real taste', 'old recipe', 'native style'],
  // ── Dining Experience ────────────────────────────────────────────────────
  'AC Dine-in':    ['ac', 'air conditioned', 'air conditioning', 'fully ac', 'ac restaurant', 'ac hall', 'centrally ac', 'cool ambience', 'dine in', 'dine-in', 'dining hall'],
  'Friendly Staff':['friendly staff', 'helpful staff', 'staff friendly', 'attentive staff', 'courteous', 'polite staff', 'warm staff', 'good service', 'prompt service'],
  'Family Dining': ['family', 'family friendly', 'family restaurant', 'comfortable seating', 'spacious', 'kids', 'group dining', 'seating capacity', 'couples', 'large group'],
  'Good Ambience': ['ambience', 'ambiance', 'atmosphere', 'decor', 'interior', 'cozy', 'nice ambience', 'good ambience', 'pleasant', 'well decorated'],
  'Clean':         ['clean', 'hygienic', 'hygiene', 'neat', 'tidy', 'clean place', 'cleanliness', 'spotless', 'well maintained'],
  // ── Value & Price ────────────────────────────────────────────────────────
  'Highly Rated':    ['highly recommended', 'must visit', 'must try', 'top rated', 'best in thanjavur', 'everyone recommends', 'go-to place', 'popular', 'famous', 'well known'],
  'Value for Money': ['value for money', 'worth it', 'worth the price', 'good value', 'value', 'money worth', 'cost effective', 'decent price'],
  'Good Portions':   ['quantity', 'generous portions', 'good quantity', 'generous serving', 'good portions', 'full value', 'filling meal', 'large serving'],
  'Affordable':      ['affordable', 'cheap', 'pocket friendly', 'inexpensive', 'budget friendly', 'low price', 'very affordable', 'economical'],
  'Top Pick':        ['top pick', 'first choice', 'go-to', 'landmark', 'favourite', 'popular spot', 'crowd favourite', 'local favourite', 'iconic'],
  // ── New 3×5 food tags ────────────────────────────────────────────────────
  'Tiffin & Snacks': ['tiffin', 'tiffin center', 'tiffin shop', 'idli', 'dosa', 'vada', 'vadai', 'parotta', 'snack', 'puri', 'poori', 'upma', 'pongal', 'bajji', 'bonda'],
  'Fresh & Hot':     ['fresh', 'freshly', 'freshly cooked', 'hot', 'piping hot', 'freshly prepared', 'served hot', 'warm food', 'made fresh'],
  'Chettinad Style': ['chettinad', 'chetnaad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'country chicken', 'chettinad cuisine', 'chettinad style'],
  'Quick Service':   ['quick service', 'fast service', 'prompt', 'speedy', 'quick', 'fast', 'efficient service', 'attentive staff', 'good service'],
};

// 3×5 matrix — 15 tags derived from real accuracy testing (80 restaurants, rating ≥ 3.5)
const FOOD_TAG_META: FoodTagMeta[] = [
  // Cuisine & Dish (5)
  { tag: 'Biryani',          segment: 'Cuisine & Dish',     group: 'B', freq: 37 },
  { tag: 'South Indian',     segment: 'Cuisine & Dish',     group: 'B', freq: 34 },
  { tag: 'Non-Veg',          segment: 'Cuisine & Dish',     group: 'B', freq: 43 },
  { tag: 'Pure Veg',         segment: 'Cuisine & Dish',     group: 'B', freq: 31 },
  { tag: 'Tiffin & Snacks',  segment: 'Cuisine & Dish',     group: 'B', freq: 28 },
  // Taste & Quality (5)
  { tag: 'Fresh & Hot',      segment: 'Taste & Quality',    group: 'B', freq: 55 },
  { tag: 'Authentic',        segment: 'Taste & Quality',    group: 'B', freq: 35 },
  { tag: 'Good Quantity',    segment: 'Taste & Quality',    group: 'B', freq: 41 },
  { tag: 'Spicy',            segment: 'Taste & Quality',    group: 'B', freq: 28 },
  { tag: 'Chettinad Style',  segment: 'Taste & Quality',    group: 'B', freq: 25 },
  // Value & Experience (5)
  { tag: 'Affordable',       segment: 'Value & Experience', group: 'B', freq: 41 },
  { tag: 'Value for Money',  segment: 'Value & Experience', group: 'B', freq: 38 },
  { tag: 'Family Dining',    segment: 'Value & Experience', group: 'B', freq: 32 },
  { tag: 'Quick Service',    segment: 'Value & Experience', group: 'B', freq: 30 },
  { tag: 'Highly Rated',     segment: 'Value & Experience', group: 'B', freq: 62 },
];

const HOTEL_FALLBACKS = [
  'Near Big Temple', 'Near Railway Station', 'City Centre', 'Easy Parking', 'Walkable Distance',
  'Spacious Rooms', 'Good Amenities', 'In-House Restaurant', 'Quiet & Peaceful', 'Breakfast Included',
  'Value for Money', 'Budget-Friendly', 'Prompt Service', 'Good Hospitality', 'Highly Recommended',
];
const FOOD_FALLBACKS = FOOD_TAG_META.map(m => m.tag);

function getCityKey(city: string): string {
  return city.trim().toLowerCase().replace(/[^a-z]/g, '');
}

async function fetchHotels(city: string): Promise<any[]> {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method:  'POST',
    headers: {
      'Content-Type':     'application/json',
      'X-Goog-Api-Key':   PLACES_KEY,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery:      `hotels lodges in ${city}`,
      maxResultCount: 20,
      languageCode:   'en',
    }),
  });
  if (!r.ok) throw new Error(`Places ${r.status}`);
  const data = await r.json() as { places?: any[] };
  return data.places ?? [];
}

// Score each tag against real hotel corpus — returns count of hotels matching
function scoreTagsAgainstPlaces(meta: TagMeta[], places: any[]): TagMeta[] {
  return meta.map(m => {
    const kws = HOTEL_TAG_KEYWORDS[m.tag] ?? [];
    let count = 0;
    for (const p of places) {
      const corpus = buildCorpus(p);
      if (kws.some(k => corpus.includes(k))) count++;
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

    // Always validate against real Places API data
    if (PLACES_KEY) {
      try {
        const places = await fetchHotels(city);

        // Score every tag against real corpus
        const scored = scoreTagsAgainstPlaces(candidateMeta, places);

        // Sort within each segment by real frequency (descending)
        const segments: Record<string, string[]> = {};
        for (const seg of ['Where?', 'Room & Stay', 'Value & Service'] as const) {
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
        // fall through to static fallback
      }
    }

    // No API key or fetch failed — return static curated list
    const tags = candidateMeta.map(m => ({ tag: m.tag, count: m.freq ?? 0 }));
    const segments: Record<string, string[]> = {};
    for (const seg of ['Where?', 'Room & Stay', 'Value & Service']) {
      const inSeg = candidateMeta.filter(m => m.segment === seg).map(m => m.tag);
      if (inSeg.length > 0) segments[seg] = inSeg;
    }
    const groupA = candidateMeta.filter(m => m.group === 'A').map(m => m.tag);
    return res.json({ tags, segments, groupA, city, total: candidateMeta.length });
  }

  // ── Food — segmented response ─────────────────────────────────────────────
  function buildFoodSegmentResponse(meta: FoodTagMeta[], total: number) {
    const tags = meta.map(m => ({ tag: m.tag, count: m.freq ?? 0 }));
    const segments: Record<string, string[]> = {};
    for (const seg of ['Cuisine & Dish', 'Taste & Quality', 'Value & Experience']) {
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
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method:  'POST',
      headers: {
        'Content-Type':     'application/json',
        'X-Goog-Api-Key':   PLACES_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({ textQuery: `restaurants in ${city}`, maxResultCount: 20, languageCode: 'en' }),
    });
    if (!r.ok) throw new Error(`Places ${r.status}`);
    const data   = await r.json() as { places?: any[] };
    const places = data.places ?? [];

    // Score each tag against live corpus, update freq
    const scored = FOOD_TAG_META.map(m => {
      const kws = FOOD_TAG_KEYWORDS[m.tag] ?? [];
      let count = 0;
      for (const p of places) {
        const corpus = buildCorpus(p);
        if (kws.some(k => corpus.includes(k))) count++;
      }
      return { ...m, freq: count };
    });

    return res.json(buildFoodSegmentResponse(scored, places.length));
  } catch (err) {
    console.error('[/api/tags food]', err);
    return res.json(buildFoodSegmentResponse(FOOD_TAG_META, 0));
  }
}
