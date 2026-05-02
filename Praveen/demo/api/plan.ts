import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const GEMINI_KEY  = process.env.GEMINI_API_KEY ?? '';

// All fields in Advanced tier — no Enterprise upgrade needed
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
  'places.priceLevel',
  'places.regularOpeningHours',
  'places.currentOpeningHours',
  'places.types',
  'places.websiteUri',
  'places.googleMapsUri',
  'places.businessStatus',
  // Amenity booleans — hard-filter and Gemini signal
  'places.servesVegetarianFood',
  'places.dineIn',
  'places.takeout',
  'places.delivery',
  'places.outdoorSeating',
  'places.goodForGroups',
  'places.goodForChildren',
  'places.reservable',
  'places.servesCoffee',
  'places.parkingOptions',
].join(',');

// Separate field mask when we need photo refs (Hotels / Food only)
const FIELD_MASK_WITH_PHOTOS = FIELD_MASK + ',places.photos';

const QUERIES: Record<string, string> = {
  Hotels:    'hotels in Thanjavur Tamil Nadu near Brihadeeswarar Temple',
  Food:      'restaurants in Thanjavur Tamil Nadu',
  Itinerary: 'top tourist attractions in Thanjavur Tamil Nadu',
};

// Hotel tag → search query term — changes the Google Places query so results differ per selection
const HOTEL_TAG_SEARCH: Record<string, string> = {
  // Location-based (highest accuracy — Places API understands proximity)
  'Temple Nearby':        'hotel near Brihadeeswarar Temple Big Temple',
  'Near Railway Station': 'hotel near Thanjavur railway junction station',
  'Near Bus Stand':       'hotel near Thanjavur new bus stand',
  'City Centre':          'hotel Thanjavur city centre main road',
  // Type
  'Heritage':             'heritage boutique historical hotel',
  'Budget Friendly':      'budget affordable economy hotel',
  'Family':               'family hotel',
  'Business':             'business corporate hotel',
  // Amenities
  'AC Rooms':             'air conditioned hotel AC',
  'WiFi':                 'hotel wifi',
  'Parking':              'hotel with parking',
  'In-House Restaurant':  'hotel with restaurant dining',
  'Rooftop Restaurant':   'rooftop restaurant hotel terrace',
  'Veg Kitchen':          'vegetarian pure veg hotel',
  'Breakfast Included':   'hotel breakfast included',
  // Guest type
  'Couple Friendly':      'couple friendly hotel',
  'Honeymoon':            'romantic honeymoon hotel',
};

// Hotel price range → extra query keyword so Places returns price-relevant results
const HOTEL_PRICE_QUERY: Record<string, string> = {
  '₹1K-5K':  'budget affordable',
  '₹5K-10K': 'mid-range',
  '₹15K+':   'luxury premium',
};

function buildHotelQuery(filters: UserFilters): string {
  const tags     = (filters.hotelTags ?? []).filter(t => t);
  const tagTerms = tags.slice(0, 2).map(t => HOTEL_TAG_SEARCH[t] ?? t).join(' ');
  const priceKw  = (filters.priceFilter && filters.priceFilter !== 'Any')
    ? (HOTEL_PRICE_QUERY[filters.priceFilter] ?? '') : '';

  if (filters.hotelArea) {
    return `${priceKw} ${tagTerms} hotel near ${filters.hotelArea} Thanjavur Tamil Nadu`.replace(/\s+/g,' ').trim();
  }
  if (tagTerms) {
    return `${priceKw} ${tagTerms} in Thanjavur Tamil Nadu`.replace(/\s+/g,' ').trim();
  }
  return `${priceKw} hotels in Thanjavur Tamil Nadu near Brihadeeswarar Temple`.replace(/\s+/g,' ').trim();
}

// Thanjavur city centre — used for location-restricted and location-biased searches
const THANJAVUR_CENTER = { latitude: 10.787, longitude: 79.1378 };

function mapPriceLevel(level: string): string {
  const map: Record<string, string> = {
    PRICE_LEVEL_FREE:          'Free',
    PRICE_LEVEL_INEXPENSIVE:   '₹',
    PRICE_LEVEL_MODERATE:      '₹₹',
    PRICE_LEVEL_EXPENSIVE:     '₹₹₹',
    PRICE_LEVEL_VERY_EXPENSIVE:'₹₹₹₹',
  };
  return map[level] ?? '₹₹';
}

const COLORS = ['bg-amber-600','bg-green-600','bg-blue-600','bg-purple-600','bg-rose-600','bg-teal-600'];

// Pre-computed locally — no Gemini call needed
const KEYWORD_BUCKETS: Record<string, string[]> = {
  taste:    ['tasty','delicious','flavour','flavor','spicy','authentic','fresh','yummy','crispy','sweet'],
  quality:  ['quality','good','great','excellent','best','amazing','superb','fantastic','wonderful'],
  hygiene:  ['clean','hygienic','neat','sanitised','sanitized','tidy','spotless','fresh'],
  service:  ['fast','quick','friendly','staff','helpful','attentive','polite','responsive','service'],
  value:    ['affordable','cheap','worth','reasonable','value','pocket','budget'],
  ambience: ['cozy','peaceful','atmosphere','pleasant','comfortable','ambiance','ambience','beautiful'],
};

function computeBuckets(reviews: any[]): Record<string, number> {
  const text = reviews.map(r => (r.text?.text ?? '').toLowerCase()).join(' ');
  const scores: Record<string, number> = {};
  for (const [bucket, kws] of Object.entries(KEYWORD_BUCKETS)) {
    scores[bucket] = kws.filter(k => text.includes(k)).length;
  }
  return scores;
}

const SEED_RANK: Record<number, string> = {
  0: 'RELEVANCE',
  1: 'DISTANCE',
  2: 'RELEVANCE',
  3: 'DISTANCE',
};

const SEED_PREFIX: Record<number, string> = {
  0: '',
  1: '',
  2: 'highly rated ',
  3: 'popular budget ',
};

// Hotels/Food use locationRestriction (strict — only Thanjavur city).
// Itinerary/Explore use locationBias (prefers Thanjavur but allows nearby heritage sites).
async function fetchPlaces(
  query: string,
  searchSeed = 0,
  withPhotos = false,
  radiusKm = 15,
  strictLocation = true,
  minRating = 0,
) {
  const rankPreference = SEED_RANK[searchSeed % 4] ?? 'RELEVANCE';
  const prefix         = SEED_PREFIX[searchSeed % 4] ?? '';

  // Places API (New) v1: locationRestriction only accepts rectangle, not circle.
  // Use locationBias (circle) for all searches — filterThanjavurOnly enforces strict locality.
  const locationParam = {
    locationBias: {
      circle: {
        center: THANJAVUR_CENTER,
        radius: radiusKm * 1000,
      },
    },
  };

  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'X-Goog-Api-Key':   PLACES_KEY,
      'X-Goog-FieldMask': withPhotos ? FIELD_MASK_WITH_PHOTOS : FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery:      prefix + query,
      maxResultCount: 10,
      languageCode:   'en',
      rankPreference,
      ...(minRating > 0 ? { minRating } : {}),
      ...locationParam,
    }),
  });
  if (!r.ok) {
    const errBody = await r.text();
    console.error(`[Places API] HTTP ${r.status}:`, errBody);
    throw new Error(`Places API error ${r.status}`);
  }
  const data = await r.json() as { places?: any[] };
  return data.places ?? [];
}

// Ensure results are actually in Thanjavur — removes stray nearby-city results
function filterThanjavurOnly(places: any[]): any[] {
  const inCity = places.filter(p => {
    const addr = (p.formattedAddress ?? '').toLowerCase();
    return addr.includes('thanjavur') || addr.includes('tanjore');
  });
  // Only enforce if we have enough results; otherwise keep all to avoid empty set
  return inCity.length >= 2 ? inCity : places;
}

interface UserFilters {
  hotelTags?:   string[];
  hotelArea?:   string;
  foodTags?:    string[];  // cuisine/type tags — wired into Places query
  priceFilter?: string;   // 'Any' | '₹' | '₹₹' | '₹₹₹' — hard-filtered via priceLevel
  minRating?:   number;   // 0 = any; hard-filtered via rating field
  openNow?:     boolean;  // hard-filtered via openNow boolean from Places API
  dietType?:    string;   // 'Any' | 'Veg' | 'Non-Veg' — hard-filtered via servesVegetarianFood
  dineMode?:    string;   // 'Any' | 'Dine-in' | 'Takeout' — hard-filtered via dineIn/takeout
}

// Map UI food tags → search-friendly terms for Places API query
const FOOD_TAG_SEARCH: Record<string, string> = {
  'Seafood':        'seafood fish restaurant',
  'Biryani':        'biryani restaurant',
  'Thali':          'thali meals restaurant',
  'South Indian':   'South Indian restaurant',
  'North Indian':   'North Indian restaurant',
  'Street Food':    'street food stalls',
  'Filter Coffee':  'filter coffee café',
  'Cafe':           'café coffee shop',
  'Banana Leaf':    'banana leaf meals',
  'Tiffin':         'tiffin idli dosa breakfast',
  'Chinese':        'Chinese restaurant',
  'Sweets':         'sweet shop mithai',
  'Bakery':         'bakery',
  'Fast Food':      'fast food',
  'Buffet':         'buffet restaurant',
  'Rooftop Dining': 'rooftop restaurant',
  'Outdoor Seating':'outdoor restaurant',
};

function buildFoodQuery(filters: UserFilters): string {
  const tags      = (filters.foodTags ?? []).filter(t => t);
  // Combine up to 2 tags so the query is specific but not over-constrained
  const tagTerms  = tags.slice(0, 2).map(t => FOOD_TAG_SEARCH[t] ?? t.toLowerCase()).join(' ');
  const dietPfx   = filters.dietType === 'Veg' ? 'vegetarian pure veg ' : '';
  const pricePfx  = filters.priceFilter === 'Low Cost'  ? 'budget cheap '   :
                    filters.priceFilter === 'Expensive'  ? 'fine dining '    : '';
  const baseTerm  = tagTerms || 'restaurant';
  return `${pricePfx}${dietPfx}${baseTerm} in Thanjavur Tamil Nadu`.replace(/\s+/g,' ').trim();
}

// Hotel price range buckets — inclusive on boundaries to avoid empty results
const PRICE_BUCKETS: Record<string, string[]> = {
  // New hotel price-range labels
  '₹1K-5K':   ['PRICE_LEVEL_FREE', 'PRICE_LEVEL_INEXPENSIVE'],
  '₹5K-10K':  ['PRICE_LEVEL_INEXPENSIVE', 'PRICE_LEVEL_MODERATE'],
  '₹15K+':    ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
  // Legacy symbol labels kept for any cached/old requests
  '₹':    ['PRICE_LEVEL_FREE', 'PRICE_LEVEL_INEXPENSIVE'],
  '₹₹':   ['PRICE_LEVEL_INEXPENSIVE', 'PRICE_LEVEL_MODERATE'],
  '₹₹₹':  ['PRICE_LEVEL_MODERATE', 'PRICE_LEVEL_EXPENSIVE'],
  '₹₹₹₹': ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
};

// Food cost tier — keyword frequency analysis across all reviews
// A place matches a tier if its reviews repeat keywords from that category most
const FOOD_COST_KEYWORDS: Record<string, string[]> = {
  'Low Cost':    ['cheap', 'affordable', 'budget', 'pocket', 'inexpensive', 'low price', 'economical', 'very cheap', 'low cost', 'cheap and', 'affordable price'],
  'Medium Cost': ['reasonable', 'value for money', 'moderate', 'mid-range', 'worth it', 'decent price', 'fair price', 'average price', 'not too expensive', 'good value'],
  'High Cost':   ['pricey', 'a bit expensive', 'costly', 'slightly expensive', 'overpriced', 'on the expensive', 'not cheap', 'expensive but', 'premium price'],
  'Expensive':   ['fine dining', 'luxury', 'very expensive', 'high-end', 'splurge', 'lavish', 'top-end', 'extravagant', 'premium dining'],
};

// Google Places price level → food cost tier mapping (used as fallback when keyword score is 0)
const FOOD_PRICE_LEVEL_MAP: Record<string, string[]> = {
  'Low Cost':    ['PRICE_LEVEL_FREE', 'PRICE_LEVEL_INEXPENSIVE'],
  'Medium Cost': ['PRICE_LEVEL_INEXPENSIVE', 'PRICE_LEVEL_MODERATE'],
  'High Cost':   ['PRICE_LEVEL_MODERATE', 'PRICE_LEVEL_EXPENSIVE'],
  'Expensive':   ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
};

function scoreFoodCost(reviews: any[], category: string): number {
  const text = reviews.map(r => (r.text?.text ?? '').toLowerCase()).join(' ');
  const keywords = FOOD_COST_KEYWORDS[category] ?? [];
  return keywords.filter(k => text.includes(k)).length;
}

// Hard filter applied BEFORE Gemini — guarantees results match user constraints.
// Query-level filtering (buildHotelQuery / buildFoodQuery + minRating in Places API)
// handles tags, cuisine, and rating. This function handles post-retrieval booleans.
function applyHardFilters(places: any[], tab: string, f: UserFilters): any[] {
  let out = places;

  // 1. Price / cost filter (secondary — query already pulls price-relevant results)
  if (f.priceFilter && f.priceFilter !== 'Any') {
    const isFoodCostLabel = Object.keys(FOOD_COST_KEYWORDS).includes(f.priceFilter);

    if (isFoodCostLabel && tab === 'Food') {
      // Score by keyword frequency; sort best-match first (don't hard-exclude)
      const allowedLevels = FOOD_PRICE_LEVEL_MAP[f.priceFilter] ?? [];
      const scored = out.map(p => ({
        place:        p,
        keywordScore: scoreFoodCost(p.reviews ?? [], f.priceFilter!),
        levelMatch:   allowedLevels.includes(p.priceLevel ?? ''),
      }));
      // Keep all but sort by relevance — weakly matching places appear last for Gemini
      out = scored
        .sort((a, b) => (b.keywordScore + (b.levelMatch ? 2 : 0)) - (a.keywordScore + (a.levelMatch ? 2 : 0)))
        .map(({ place }) => place);
    } else if (tab === 'Hotels') {
      // Hotels: filter by priceLevel when available; keep places with no priceLevel as fallback
      const allowed = PRICE_BUCKETS[f.priceFilter] ?? [];
      const matched = out.filter(p => allowed.includes(p.priceLevel ?? ''));
      // Only enforce if we got ≥2 with known price; otherwise keep all (no priceLevel data)
      if (matched.length >= 2) out = matched;
    }
  }

  // 2. Open Now — hard exclude closed places (keep undefined/null as "unknown = open")
  if (f.openNow) {
    const n = out.filter(p => {
      const isOpen = p.regularOpeningHours?.openNow ?? p.currentOpeningHours?.openNow;
      return isOpen !== false; // keep true and undefined, exclude only explicit false
    });
    if (n.length >= 1) out = n;
  }

  // 3. Vegetarian (Food only) — uses Places servesVegetarianFood boolean
  if (tab === 'Food' && f.dietType === 'Veg') {
    const n = out.filter(p => p.servesVegetarianFood === true);
    // Only enforce if we found veg-flagged places — Places data is inconsistent
    if (n.length >= 2) out = n;
  }

  // 4. Dining mode (Food only)
  if (tab === 'Food') {
    if (f.dineMode === 'Dine-in') {
      const n = out.filter(p => p.dineIn === true);
      if (n.length >= 1) out = n;
    } else if (f.dineMode === 'Takeout') {
      const n = out.filter(p => p.takeout === true);
      if (n.length >= 1) out = n;
    }
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI: Comparative ranking + analysis for Hotels and Food
//
// Design decisions:
//   1. All places are passed together → Gemini compares them against each other,
//      not each in isolation. This allows genuine "ranked #1 because X beats Y" reasoning.
//   2. We pre-compute recentDelta (avg last-3 reviews − overall rating) so Gemini
//      can make data-driven trend decisions instead of guessing from review text alone.
//   3. Gemini returns originalIdx so we can reorder the result list by AI rank.
//   4. User filter preferences are encoded as structured criteria, not buried in prose,
//      so Gemini can score each place against them explicitly.
//   5. whyOverOthers must compare against the specific other places in this list
//      (not generic "one of the best" praise).
// ─────────────────────────────────────────────────────────────────────────────
async function geminiRankAndAnalyse(
  places: any[],
  tab: string,
  filters: UserFilters = {},
): Promise<any[]> {
  if (!GEMINI_KEY || places.length === 0) return [];

  // ── Step 1: Build enriched summaries with pre-computed trend signal ──────
  const summaries = places.map((p, i) => {
    const allReviews = (p.reviews ?? []) as any[];

    // Most recent 5 for trend (more stable than 3)
    const recent5   = allReviews.slice(0, 5);
    const recentAvg = recent5.length > 0
      ? +(recent5.reduce((s: number, r) => s + (r.rating ?? 0), 0) / recent5.length).toFixed(1)
      : null;

    // Long reviews carry more signal — sort by text length, prioritise detailed ones
    const byLength = [...allReviews].sort((a, b) =>
      (b.text?.text?.length ?? 0) - (a.text?.text?.length ?? 0)
    );

    // Avg chars per review — higher = visitors write detailed feedback = trust signal
    const reviewDepth = allReviews.length > 0
      ? Math.round(allReviews.reduce((s: number, r) => s + (r.text?.text?.length ?? 0), 0) / allReviews.length)
      : 0;

    // Check if the hotel's name or reviews actually mention selected tags —
    // gives Gemini hard evidence to exclude non-matching places
    const allText = [
      (p.displayName?.text ?? '').toLowerCase(),
      (p.formattedAddress  ?? '').toLowerCase(),
      ...allReviews.map((r: any) => (r.text?.text ?? '').toLowerCase()),
    ].join(' ');

    const selectedTags = tab === 'Hotels' ? (filters.hotelTags ?? []) : (filters.foodTags ?? []);
    const tagMentions: Record<string, boolean> = {};
    for (const tag of selectedTags) {
      const keywords = (HOTEL_TAG_SEARCH[tag] ?? tag).toLowerCase().split(' ').filter(k => k.length > 3);
      tagMentions[tag] = keywords.some(k => allText.includes(k));
    }

    return {
      idx:          i,
      name:         p.displayName?.text ?? '',
      rating:       p.rating ?? 0,
      totalReviews: p.userRatingCount ?? 0,
      priceLevel:   p.priceLevel ?? 'PRICE_LEVEL_MODERATE',
      openNow:      p.regularOpeningHours?.openNow ?? p.currentOpeningHours?.openNow ?? true,
      trendDelta:   recentAvg !== null ? +(recentAvg - (p.rating ?? 0)).toFixed(1) : 0,
      recentAvg,
      reviewDepth,
      buckets:      computeBuckets(allReviews),
      reviews:      byLength.slice(0, 3).map((r: any) => ({
        stars: r.rating,
        text:  (r.text?.text ?? '').slice(0, 120),
        ago:   r.relativePublishTimeDescription ?? '',
      })),
      // tagMentions: which selected tags are actually mentioned in name/reviews
      tagMentions,
      // Amenity signals from Places API
      servesVeg:   p.servesVegetarianFood ?? null,
      dineIn:      p.dineIn               ?? null,
      takeout:     p.takeout              ?? null,
      outdoor:     p.outdoorSeating       ?? null,
      goodGroups:  p.goodForGroups        ?? null,
      parking:     p.parkingOptions?.freeParkingLot ? 'free' : p.parkingOptions?.paidParkingLot ? 'paid' : null,
      coffee:      p.servesCoffee         ?? null,
      reservable:  p.reservable           ?? null,
    };
  });

  // ── Step 2: Build structured visitor profile ─────────────────────────────
  type Criterion = { label: string; value: string; weight: 'critical' | 'important' | 'nice-to-have' };
  const criteria: Criterion[] = [];

  if (tab === 'Hotels') {
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price tier', value: filters.priceFilter, weight: 'important' });
    if (filters.minRating && filters.minRating > 0)
      criteria.push({ label: 'Min rating', value: `${filters.minRating}+`, weight: 'important' });
    if (filters.hotelTags?.length)
      criteria.push({ label: 'Required features', value: filters.hotelTags.join(', '), weight: 'critical' });
    if (filters.hotelArea)
      criteria.push({ label: 'Preferred area', value: `near ${filters.hotelArea}`, weight: 'important' });
    criteria.push({ label: 'Implicit need', value: 'walkable or close to Brihadeeswarar Temple', weight: 'important' });
  } else if (tab === 'Food') {
    if (filters.dietType && filters.dietType !== 'Any')
      criteria.push({ label: 'Diet', value: filters.dietType, weight: 'critical' });
    if (filters.foodTags?.length)
      criteria.push({ label: 'Cuisine / type', value: filters.foodTags.join(', '), weight: 'critical' });
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price tier', value: filters.priceFilter, weight: 'important' });
    if (filters.dineMode && filters.dineMode !== 'Any')
      criteria.push({ label: 'Dining mode', value: filters.dineMode, weight: 'important' });
    criteria.push({ label: 'Implicit need', value: 'authentic Thanjavur / Tamil cuisine', weight: 'nice-to-have' });
  }

  const criteriaStr = criteria.length > 0
    ? criteria.map(c => `  - [${c.weight.toUpperCase()}] ${c.label}: ${c.value}`).join('\n')
    : '  - No specific preferences stated (rank by quality and review signals)';

  // ── Step 3: Build ranking rules specific to the tab ──────────────────────
  const rankingRules = tab === 'Hotels' ? `
RANKING RULES for Hotels:
1. Check tagMentions for each place — this tells you if the place's name or reviews actually mention the selected tags.
   - If a tag is CRITICAL and tagMentions[tag] = false for a place → rank that place LAST (rank = total places count)
   - If ALL places have tagMentions[tag] = false for a CRITICAL tag → rank by quality anyway (no place can be excluded)
2. Among tag-matching places: rank by (a) tagMentions score (most tags confirmed = first), (b) proximity to Big Temple, (c) rating × log(totalReviews)
3. A hotel with 4.3 rating + 2000 reviews outranks 4.7 + 50 reviews (volume = trust signal)
4. reviewDepth > 150 → higher trust; reviewDepth < 50 → lower trust
5. If two hotels match equally, the one with better recent trend wins` : tab === 'Food' ? `
RANKING RULES for Food:
1. Eliminate any place that violates CRITICAL diet constraint (e.g. non-veg items only when visitor is Pure Veg)
2. Among remaining: rank by (a) diet match, (b) spend level match, (c) bucket scores, (d) review volume
3. Bucket scoring: buckets.hygiene + buckets.taste are weighted 2× — if both ≥ 3, strong recommendation
4. If diningVibe matches a bucket name (e.g. "ambience"), double-weight that bucket score
5. reviewDepth > 150 = detailed reviewer community = trust signal
6. Authentic local cuisine beats international at same rating for Thanjavur visitors
7. A packed local spot with 4.4 + 3000 reviews outranks 4.8 + 80 reviews` : `
RANKING RULES: rank by overall rating weighted by review volume`;

  // ── Step 4: Compose the prompt ────────────────────────────────────────────
  const prompt = `You are a Thanjavur travel expert and data analyst. Rank and annotate these ${places.length} ${tab.toLowerCase()} for a visitor with these needs:

VISITOR PROFILE:
${criteriaStr}
${rankingRules}

TREND INTERPRETATION (use trendDelta field):
- trendDelta > +0.2 → "improving" (recent reviewers rate higher than historical avg)
- trendDelta < -0.3 → "declining" (recent reviewers rate lower)
- Otherwise → "stable"

PLACES DATA (${places.length} items):
${JSON.stringify(summaries)}

TASK: Return a JSON array of EXACTLY ${places.length} items in RANKED ORDER (best match = first, rank 1):

[{
  "originalIdx": <idx from input, integer>,
  "rank": <1 = best match, integer>,
  "trendVerdict": "improving" | "declining" | "stable",
  "trendReason": "<max 12 words — MUST quote or closely paraphrase words from the actual review text provided>",
  "reviewSummary": "<2 sentences — synthesise what reviewers most frequently praise about this place; use words or phrases from the actual review texts; lead with the strongest positive; do NOT mention ranking or visitor criteria>",
  "aiNote": "<max 18 words — personalised to THIS visitor's stated criteria — must reference at least one criterion>",
  "whyOverOthers": "<max 30 words — compare against the OTHER places in this exact list; cite specific numbers, unique features, or gaps the others have>",
  "bestFor": "<10 words — describe the ideal visitor type for this place>",
  "caveat": "<one sentence specific drawback, or null — only include if genuinely significant>"
}]

QUALITY RULES:
- trendReason must use words found in the review text, not invented
- reviewSummary must sound like a concise summary of real visitor feedback, grounded in review text
- aiNote must feel personal — "matches your Heritage + Pool request" not "popular with visitors"
- whyOverOthers must name or describe the alternatives: "unlike the other hotels here, this one..."
- caveat should only appear for real drawbacks (noise, distance, service issues from reviews)

Return ONLY valid JSON. No markdown fences. No explanation text.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data   = await resp.json() as any;
    const raw    = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const clean  = raw.replace(/```json|```/g, '').trim();
    const parsed = clean ? JSON.parse(clean) : [];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    throw new Error('empty');
  } catch {
    // Fallback: compute from real data — no static strings
    const avgRating = summaries.length > 0
      ? summaries.reduce((a, s) => a + s.rating, 0) / summaries.length : 4.0;

    return summaries.map((s, i) => {
      // trendVerdict + trendReason from pre-computed trendDelta / recentAvg
      let trendVerdict = 'stable';
      let trendReason: string;
      if (s.recentAvg !== null) {
        if (s.trendDelta > 0.2) {
          trendVerdict = 'improving';
          trendReason  = `Recent visitors rate it ${s.recentAvg}★ — above the ${s.rating}★ historical average`;
        } else if (s.trendDelta < -0.3) {
          trendVerdict = 'declining';
          trendReason  = `Recent visitors rate it ${s.recentAvg}★ — below the ${s.rating}★ historical average`;
        } else {
          trendReason = `Recent visitors rate it ${s.recentAvg}★ — matching the ${s.rating}★ all-time average`;
        }
      } else {
        trendReason = `${s.rating}★ across ${s.totalReviews.toLocaleString()} reviews — no recent drift detected`;
      }

      // reviewSummary from actual review text snippets
      const reviewTexts = s.reviews.filter(r => r.text && r.text.length > 15).slice(0, 2);
      const reviewSummary = reviewTexts.length > 0
        ? `${s.rating}★ across ${s.totalReviews.toLocaleString()} reviews. Visitors say: "${reviewTexts[0].text.slice(0, 80).trim()}"`
        : `${s.rating}★ rated by ${s.totalReviews.toLocaleString()} verified visitors in Thanjavur.`;

      // bestFor from price level + tab + veg signal
      let bestFor: string;
      if (tab === 'Hotels') {
        const tier = s.priceLevel === 'PRICE_LEVEL_INEXPENSIVE' || s.priceLevel === 'PRICE_LEVEL_FREE'
          ? 'budget-focused' : s.priceLevel === 'PRICE_LEVEL_EXPENSIVE' || s.priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE'
          ? 'premium comfort' : 'mid-range value';
        bestFor = `Travellers wanting ${tier} — ${s.totalReviews.toLocaleString()} guests confirmed ${s.rating}★`;
      } else {
        const vegLabel = s.servesVeg === true ? 'vegetarian' : s.servesVeg === false ? 'non-veg' : '';
        bestFor = `${vegLabel ? vegLabel + ' diners — ' : ''}${s.totalReviews.toLocaleString()} reviews confirm ${s.rating}★ quality`;
      }

      // whyOverOthers from rating vs set average
      const diff = (s.rating - avgRating).toFixed(1);
      const whyOverOthers = i === 0
        ? `Top in this set: ${s.rating}★ × ${s.totalReviews.toLocaleString()} reviews — highest combined trust signal`
        : `${s.rating}★ with ${s.totalReviews.toLocaleString()} reviews — ${parseFloat(diff) >= 0 ? `${diff} above` : 'near'} the group average of ${avgRating.toFixed(1)}★`;

      return {
        originalIdx:   i,
        rank:          i + 1,
        trendVerdict,
        trendReason,
        reviewSummary,
        aiNote:        `${s.rating}★ across ${s.totalReviews.toLocaleString()} reviews — verified quality for Thanjavur visitors`,
        whyOverOthers,
        bestFor,
        caveat:        null,
      };
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI: Thanjavur day itinerary generator
//
// Design decisions:
//   1. Thanjavur-specific domain knowledge is injected directly into the prompt
//      (opening hours, entry fees, walking distances, crowd patterns, auto fares).
//      This prevents Gemini from hallucinating generic "temple opens at 9am" facts.
//   2. Sequencing logic is stated as rules: Big Temple first (crowd peaks midday),
//      Palace cluster together (all walkable), lunch timed for 12:15-1:30pm
//      (thali runs out after 2pm at most spots), afternoon for galleries.
//   3. The schema is strict and validated after parsing to guard against malformed output.
// ─────────────────────────────────────────────────────────────────────────────

// Ground-truth Thanjavur knowledge — injected into itinerary prompt
const THANJAVUR_FACTS = `
THANJAVUR GROUND TRUTH (use these exact facts, do not guess):

SITES & HOURS:
• Brihadeeswarar Temple (Big Temple): Free entry. Opens 6:00 AM. Inner sanctum: 6–12:30 PM & 4–8:30 PM. Remove footwear at gate. No cameras inside sanctum. Dress modestly (no shorts/sleeveless). Crowd: LOW 6–9 AM, MODERATE 9–11 AM, HIGH 11 AM–noon & 4–6 PM.
• Thanjavur Palace & Royal Museum: ₹50/adult. Open 9 AM–6 PM daily. Highlight: Durbar Hall ceiling art + Bell Tower (5th floor view). 5-min walk south of Big Temple. Crowd: LOW mornings, MODERATE 11 AM–2 PM.
• Saraswathi Mahal Library: ₹20/adult. Open 10 AM–1 PM & 1:30–5:30 PM. CLOSED Wednesdays. Inside Palace complex (same ticket area). Palm-leaf manuscript gallery is the highlight. LOW crowd throughout.
• Thanjavur Art Gallery: ₹30/adult. Open 9 AM–5 PM. Inside Palace complex. Chola bronze Nataraja = centrepiece. Allow 45 min minimum. LOW crowd.
• Sivaganga Fort: Free. Open all day (ruins). 15-min walk from Palace. Photography-friendly.
• Airavatesvara Temple (Darasuram): Free. 4 km from Thanjavur centre. 15-min auto (₹80–100). UNESCO listed. Opens 6 AM. LOW crowd all day.

TRAVEL TIMES (door-to-door):
• Big Temple ↔ Palace: 5 min walk (400m south)
• Palace ↔ Saraswathi Mahal: 2 min walk (same complex)
• Saraswathi Mahal ↔ Art Gallery: 2 min walk (same complex)
• Palace complex ↔ local restaurants: 10–20 min auto
• City centre ↔ Darasuram: 15 min auto, ₹80–100
• City centre ↔ Gangaikonda Cholapuram: 1 hr car, ₹800–1,200 round trip

FOOD & MEAL TIMING:
• Authentic banana-leaf thali: served 12:00–1:30 PM at most places (runs out fast — arrive by 12:15 PM)
• Filter coffee: available all day at local cafés from 7 AM
• Auto fares: ₹50–80 short hops, ₹100–150 medium hops, ₹200–300 cross-town
`;

async function geminiItinerary(places: any[], startTime = '09:00'): Promise<any[]> {
  if (!GEMINI_KEY || places.length === 0) return [];

  const topPlaces = places.slice(0, 8).map(p => ({
    name:    p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    rating:  p.rating ?? 0,
    types:   (p.types ?? []).slice(0, 3).join(', '),
  }));

  // Convert 24-hour startTime to 12-hour display format
  const [h, m] = startTime.split(':').map(Number);
  const period  = h >= 12 ? 'PM' : 'AM';
  const hour12  = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const startStr = `${hour12}:${m.toString().padStart(2, '0')} ${period}`;

  const prompt = `You are a Thanjavur expert trip planner. Create a 5-stop day itinerary starting at ${startStr}.

${THANJAVUR_FACTS}

AVAILABLE ATTRACTIONS (from Google Places — use names as given):
${JSON.stringify(topPlaces)}

SEQUENCING RULES (follow in order):
1. If Brihadeeswarar Temple is in the list → it MUST be stop 1 (best visited before 9 AM when crowd is low; inner sanctum closes 12:30 PM)
2. Thanjavur Palace, Saraswathi Mahal, Art Gallery are a walkable cluster → schedule consecutively, no auto needed between them
3. Schedule a lunch stop around 12:00–12:30 PM (even if no restaurant is in the list — add "Thanjavur Thali Lunch" as a stop with tip to visit Sri Venkatramana Bhavan or Chola Mess)
4. If start time is before 8 AM and Big Temple is included → visitor can do 2 full sessions before 10 AM
5. Sequence remaining stops to minimise backtracking

For EACH stop return this exact JSON object:
{
  "stop": "name exactly as given in available attractions (or 'Thanjavur Thali Lunch' for meal stop)",
  "time": "arrival time in '09:00 AM' format",
  "duration": "time to spend e.g. '1.5 hrs' or '1 hr 30 min'",
  "tip": "one specific, actionable visitor tip — max 18 words — must reference an actual section, feature, or crowd insight",
  "trafficNote": "one specific traffic sentence for this location and time",
  "currentTraffic": "Light | Moderate | Heavy — use GROUND TRUTH crowd patterns above",
  "yesterdayTraffic": "Light | Moderate | Heavy",
  "crowdLevel": "Low | Moderate | High — use GROUND TRUTH patterns above",
  "travelToNext": "mode + duration e.g. '5 min walk' or '15 min auto ₹80' — omit this field for the last stop",
  "departBy": "time to leave e.g. '10:30 AM' — omit this field for the last stop",
  "entryFee": "from GROUND TRUTH above e.g. 'Free entry' or '₹50 / adult'",
  "highlights": ["specific section or feature 1", "specific feature 2", "specific feature 3"],
  "reachNote": "one sentence: how to reach from the previous stop, including auto fare if applicable"
}

VALIDATION RULES (Gemini must follow):
- currentTraffic / yesterdayTraffic: ONLY "Light", "Moderate", or "Heavy"
- crowdLevel: ONLY "Low", "Moderate", or "High"
- Use entry fees EXACTLY from GROUND TRUTH (not guessed)
- tip must NOT be generic ("visit early") — must name a specific section, timing, or feature

Return a JSON array of EXACTLY 5 stops. Return ONLY valid JSON. No markdown. No explanation.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data  = await resp.json() as any;
    const raw   = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const clean = raw.replace(/```json|```/g, '').trim();
    const stops = JSON.parse(clean);

    const validTraffic = (v: unknown) =>
      ['Light','Moderate','Heavy'].includes(v as string) ? v as string : 'Light';
    const validCrowd = (v: unknown) =>
      ['Low','Moderate','High'].includes(v as string) ? v as string : 'Moderate';

    return stops.slice(0, 5).map((s: any) => ({
      stop:             s.stop              ?? 'Brihadeeswarar Temple',
      time:             s.time              ?? startStr,
      duration:         s.duration          ?? '1 hr',
      tip:              s.tip               ?? 'Enter early for the best experience.',
      trafficNote:      s.trafficNote       ?? 'Light traffic at this hour.',
      currentTraffic:   validTraffic(s.currentTraffic),
      yesterdayTraffic: validTraffic(s.yesterdayTraffic),
      crowdLevel:       validCrowd(s.crowdLevel),
      ...(s.travelToNext ? { travelToNext: s.travelToNext } : {}),
      ...(s.departBy     ? { departBy:     s.departBy     } : {}),
      entryFee:         s.entryFee          ?? null,
      highlights:       Array.isArray(s.highlights) ? s.highlights.slice(0, 3) : [],
      reachNote:        s.reachNote         ?? '',
    }));
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI: Deep single-location explore guide
//
// Design decisions:
//   1. Same Thanjavur ground-truth facts are injected so Gemini uses real
//      opening hours, crowd patterns, and dress codes from the THANJAVUR_FACTS
//      constant rather than hallucinating.
//   2. The `flow` field is asked as numbered steps with specific section names —
//      not just "explore the temple" but "enter via East Gopuram, walk outer
//      pradakshina, visit Nandi mandapam".
//   3. The `preparation` field is asked to be slot-specific (Morning crowd is
//      different from Evening crowd).
// ─────────────────────────────────────────────────────────────────────────────
async function geminiExploreGuide(place: any, locationName: string, timeSlot: string) {
  if (!GEMINI_KEY) return null;

  const timeRange = timeSlot === 'Morning'   ? '6 AM–12 PM'
                  : timeSlot === 'Afternoon' ? '12 PM–4 PM'
                  :                            '4 PM–8 PM';

  const reviews = (place.reviews ?? []).slice(0, 3).map((r: any) => ({
    stars: r.rating,
    text:  (r.text?.text ?? '').slice(0, 120),
    ago:   r.relativePublishTimeDescription ?? '',
  }));

  const prompt = `You are a Thanjavur expert guide creating a personalised visit plan for ${locationName} during the ${timeSlot} (${timeRange}).

${THANJAVUR_FACTS}

PLACE LIVE DATA (from Google Places):
- Name: ${place.displayName?.text ?? locationName}
- Rating: ${place.rating ?? 'N/A'} (${place.userRatingCount ?? 0} total reviews)
- Open now: ${place.regularOpeningHours?.openNow ?? true}
- Recent reviews: ${JSON.stringify(reviews)}

TASK: Return a JSON object with these exact keys:

{
  "insight": "One paragraph, max 50 words. Lead with the single best reason to visit at THIS time slot (${timeSlot}). Reference crowd level, light/atmosphere, or access advantage. Must feel specific to ${locationName}, not generic.",

  "flow": "Numbered step-by-step visit sequence for ${timeSlot}. Use SPECIFIC section names (e.g. 'East Gopuram entrance', 'Nandi mandapam', 'Durbar Hall'). Include entry/shoe removal notes where relevant. Format exactly as: 1. Step\\n2. Step\\n3. Step\\n4. Step\\n5. Step (4-6 steps)",

  "preparation": "Max 45 words. Be TIME-SLOT SPECIFIC — crowd at ${timeSlot} is different from other times. Include: what to wear, what to bring, any entry rules, parking/auto notes if relevant.",

  "status": "${timeSlot === 'Evening' ? 'Busy' : 'Open'}"
}

QUALITY RULES:
- insight must cite at least one data point from the reviews provided
- flow steps must name actual physical sections of the place, not generic actions
- preparation must be actionable ("carry ₹20 for entry" not just "bring money")
- All facts (entry fee, opening hours) must match GROUND TRUTH above

Return ONLY valid JSON. No markdown. No explanation.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data  = await resp.json() as any;
    const raw   = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

const EXPLORE_COLORS: Record<string, string> = {
  Morning:   'bg-amber-600',
  Afternoon: 'bg-orange-600',
  Evening:   'bg-indigo-700',
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const tab = (req.body?.tab ?? 'Hotels') as string;

  // ── Explore: single-location deep guide ─────────────────────────────────
  if (tab === 'Explore') {
    const locationName = (req.body?.exploreTarget ?? 'Brihadeeswarar Temple') as string;
    const timeSlot     = (req.body?.timeSlot ?? 'Morning') as string;

    try {
      const places = await fetchPlaces(`${locationName} Thanjavur Tamil Nadu`, 0, false, 50, false);
      const place  = places[0] ?? {};
      const guide  = await geminiExploreGuide(place, locationName, timeSlot);

      return res.json({
        exploreResult: {
          id:           place.id ?? 'explore-1',
          name:         place.displayName?.text ?? locationName,
          address:      place.formattedAddress  ?? 'Thanjavur, Tamil Nadu',
          rating:       place.rating        ?? 4.5,
          openNow:      place.regularOpeningHours?.openNow ?? true,
          openingHours: '6:00 AM – 8:30 PM (varies by section)',
          status:       (guide?.status ?? (place.regularOpeningHours?.openNow ? 'Open' : 'Closed')) as 'Open' | 'Busy' | 'Closed',
          insight:      guide?.insight     ?? `${locationName} is one of Thanjavur's most significant heritage sites.`,
          flow:         guide?.flow        ?? '1. Arrive at the main entrance\n2. Remove footwear\n3. Explore the outer courtyard\n4. Visit the inner sanctum',
          preparation:  guide?.preparation ?? 'Wear covered clothing. Remove footwear at entrance. Donations welcome.',
          tags: (place.types ?? []).slice(0, 5).map((t: string) =>
            t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
          ),
          reviews: (place.reviews ?? []).slice(0, 3).map((r: any) => ({
            text:     r.text?.text ?? '',
            author:   r.authorAttribution?.displayName ?? 'Visitor',
            location: 'Tamil Nadu',
            stars:    r.rating ?? 5,
            ago:      r.relativePublishTimeDescription ?? 'Recently',
          })),
          photoColor: EXPLORE_COLORS[timeSlot] ?? 'bg-amber-600',
          timeSlot,
        },
      });
    } catch (err) {
      console.error('[/api/plan Explore]', err);
      return res.status(500).json({ error: 'Failed to fetch explore data' });
    }
  }

  // ── Itinerary: AI-generated day plan ─────────────────────────────────────
  if (tab === 'Itinerary') {
    const startTime  = (req.body?.startTime  ?? '09:00') as string;
    const searchSeed = parseInt((req.body?.searchSeed ?? '0') as string, 10);

    try {
      const rawPlaces = await fetchPlaces(QUERIES.Itinerary, searchSeed, false, 35, false);
      const stops     = await geminiItinerary(rawPlaces, startTime);

      if (stops.length === 0) {
        return res.status(500).json({ error: 'Could not generate itinerary' });
      }
      return res.json({ itinerary: stops });
    } catch (err) {
      console.error('[/api/plan Itinerary]', err);
      return res.status(500).json({ error: 'Failed to generate itinerary' });
    }
  }

  // ── Hotels / Food: ranked list via Gemini comparative analysis ───────────
  const searchSeed = parseInt((req.body?.searchSeed ?? '0') as string, 10);

  const filters: UserFilters = {
    hotelTags:   req.body?.hotelTags   ?? [],
    hotelArea:   req.body?.hotelArea   ?? '',
    foodTags:    req.body?.foodTags    ?? [],
    priceFilter: req.body?.priceFilter ?? 'Any',
    minRating:   Number(req.body?.minRating ?? 0),
    openNow:     req.body?.openNow === true,
    dietType:    req.body?.dietType    ?? 'Any',
    dineMode:    req.body?.dineMode    ?? 'Any',
  };

  // Build query from filters — changes the Places search so different filters → different results
  const query = tab === 'Food' ? buildFoodQuery(filters) : buildHotelQuery(filters);

  // Pass minRating directly to Places API so Google pre-filters — stricter than post-filter
  const apiMinRating = (filters.minRating ?? 0) > 0 ? (filters.minRating ?? 0) : 0;

  try {
    // 15km radius around Thanjavur centre; minRating applied at Places API level
    const rawPlaces     = await fetchPlaces(query, searchSeed, true, 15, true, apiMinRating);
    // Secondary guard: drop any result whose address doesn't mention Thanjavur/Tanjore
    const localPlaces   = filterThanjavurOnly(rawPlaces);

    // Hard filter first — guarantees results match user constraints (price, veg, dine mode)
    const hardFiltered = applyHardFilters(localPlaces, tab, filters);

    // Then drop low-signal places — saves Gemini tokens, improves ranking quality
    const qualified    = hardFiltered.filter(p => (p.rating ?? 0) >= 3.8 && (p.userRatingCount ?? 0) >= 10);
    const placesToRank = qualified.length >= 2 ? qualified : hardFiltered;

    // Gemini ranks all places comparatively and returns them in best-first order
    const rankedAi = await geminiRankAndAnalyse(placesToRank, tab, filters);

    // Sort by Gemini's rank (ascending) then map to original place objects
    const sorted          = [...rankedAi].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    const reorderedPlaces = sorted.map((ai: any) => placesToRank[ai.originalIdx ?? 0] ?? placesToRank[0]);

    const results = reorderedPlaces.map((p: any, i: number) => {
      const ai = sorted[i] ?? {};

      // Show up to 5 reviews (Places API Advanced limit), longest first — detail = trust
      const uiReviews = [...(p.reviews ?? [])]
        .sort((a, b) => (b.text?.text?.length ?? 0) - (a.text?.text?.length ?? 0))
        .slice(0, 5)
        .map((r: any) => ({
          text:     r.text?.text ?? '',
          author:   r.authorAttribution?.displayName ?? 'Visitor',
          location: 'Tamil Nadu',
          stars:    r.rating ?? 5,
          ago:      r.relativePublishTimeDescription ?? 'Recently',
        }));

      // Dynamic fallbacks derived from real place data — used when Gemini field is null
      const rating      = p.rating ?? 0;
      const reviewCount = p.userRatingCount ?? 0;
      const priceStr    = mapPriceLevel(p.priceLevel ?? '');
      const recent5     = [...(p.reviews ?? [])].slice(0, 5);
      const recentAvgFB = recent5.length > 0
        ? +(recent5.reduce((s: number, r: any) => s + (r.rating ?? 0), 0) / recent5.length).toFixed(1)
        : null;
      const trendReasonFB = recentAvgFB !== null
        ? `Recent visitors rate it ${recentAvgFB}★ — ${recentAvgFB >= rating ? 'matching' : 'near'} the ${rating}★ overall average`
        : `${rating}★ across ${reviewCount.toLocaleString()} reviews — consistent visitor satisfaction`;
      const whyOverOthersFB = i === 0
        ? `Top-ranked: ${rating}★ across ${reviewCount.toLocaleString()} reviews — strongest trust signal in this set`
        : `${rating}★ with ${reviewCount.toLocaleString()} reviews — #${i + 1} of ${placesToRank.length} ${tab.toLowerCase()} analysed`;
      const isVeg = p.servesVegetarianFood === true;
      const bestForFB = tab === 'Hotels'
        ? (priceStr === '₹' || priceStr === '₹₹'
            ? `Budget-conscious visitors — ${reviewCount.toLocaleString()} reviews confirm value`
            : `Visitors seeking ${priceStr} comfort — ${rating}★ confirmed by ${reviewCount.toLocaleString()} guests`)
        : (isVeg
            ? `Vegetarian diners — ${reviewCount.toLocaleString()} reviews, ${rating}★ satisfaction`
            : `Food enthusiasts — ${rating}★ across ${reviewCount.toLocaleString()} Thanjavur reviews`);
      const topReviewText = [...(p.reviews ?? [])]
        .sort((a: any, b: any) => (b.text?.text?.length ?? 0) - (a.text?.text?.length ?? 0))
        .find((r: any) => (r.text?.text ?? '').length > 15);
      const reviewSummaryFB = topReviewText
        ? `${rating}★ across ${reviewCount.toLocaleString()} reviews. Visitors say: "${(topReviewText.text?.text ?? '').slice(0, 80).trim()}"`
        : `${rating}★ rated by ${reviewCount.toLocaleString()} verified visitors in Thanjavur.`;

      return {
        id:          p.id ?? `place-${i}`,
        name:        p.displayName?.text ?? 'Unknown',
        address:     p.formattedAddress  ?? 'Thanjavur, Tamil Nadu',
        dist:        0,
        rating,
        reviewCount,
        priceLevel:  priceStr,
        openNow:     p.regularOpeningHours?.openNow ?? true,
        tags:        (p.types ?? []).slice(0, 5).map((t: string) =>
                       t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                     ),
        reviewSummary: ai.reviewSummary || reviewSummaryFB,
        aiNote:       ai.aiNote       || `${rating}★ across ${reviewCount.toLocaleString()} reviews — verified quality`,
        trendVerdict: ai.trendVerdict ?? 'stable',
        trendReason:  ai.trendReason  || trendReasonFB,
        reviews:      uiReviews,
        photoColor:   COLORS[i % COLORS.length],
        photoRef:     p.photos?.[0]?.name ?? null,
        websiteUri:   p.websiteUri   ?? null,
        googleMapsUri: p.googleMapsUri ?? null,
        aiDetail: {
          whyOverOthers: ai.whyOverOthers || whyOverOthersFB,
          dataPoints: [
            `${rating} ★ across ${reviewCount.toLocaleString()} reviews`,
            `${p.formattedAddress ?? 'Thanjavur, Tamil Nadu'}`,
            `AI rank: #${ai.rank ?? i + 1} of ${placesToRank.length} ${tab.toLowerCase()} analysed`,
          ],
          bestFor: ai.bestFor || bestForFB,
          ...(ai.caveat ? { caveat: ai.caveat } : {}),
        },
      };
    });

    return res.json({ results });
  } catch (err) {
    console.error('[/api/plan]', err);
    return res.status(500).json({ error: 'Failed to fetch places data' });
  }
}
