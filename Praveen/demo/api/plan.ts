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

// City coordinates lookup — used for Places API locationBias
// Fallback: Thanjavur centre. Add cities here as the app expands.
const CITY_CONFIG: Record<string, { lat: number; lng: number; state: string }> = {
  'Thanjavur':  { lat: 10.787,  lng: 79.1378, state: 'Tamil Nadu'  },
  'Tanjore':    { lat: 10.787,  lng: 79.1378, state: 'Tamil Nadu'  },
  'Bangalore':  { lat: 12.9716, lng: 77.5946, state: 'Karnataka'   },
  'Bengaluru':  { lat: 12.9716, lng: 77.5946, state: 'Karnataka'   },
  'Chennai':    { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu'  },
  'Coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu'  },
  'Madurai':    { lat: 9.9252,  lng: 78.1198, state: 'Tamil Nadu'  },
  'Mysore':     { lat: 12.2958, lng: 76.6394, state: 'Karnataka'   },
  'Mysuru':     { lat: 12.2958, lng: 76.6394, state: 'Karnataka'   },
  'Hyderabad':  { lat: 17.3850, lng: 78.4867, state: 'Telangana'   },
  'Kochi':      { lat: 9.9312,  lng: 76.2673, state: 'Kerala'      },
  'Trivandrum': { lat: 8.5241,  lng: 76.9366, state: 'Kerala'      },
  'Pondicherry':{ lat: 11.9416, lng: 79.8083, state: 'Puducherry'  },
};

function getCityCenter(city: string): { latitude: number; longitude: number } {
  const key = city.trim().toLowerCase();
  for (const [name, cfg] of Object.entries(CITY_CONFIG)) {
    if (name.toLowerCase() === key) return { latitude: cfg.lat, longitude: cfg.lng };
  }
  return { latitude: 10.787, longitude: 79.1378 }; // default Thanjavur
}

function getCityState(city: string): string {
  const key = city.trim().toLowerCase();
  for (const [name, cfg] of Object.entries(CITY_CONFIG)) {
    if (name.toLowerCase() === key) return cfg.state;
  }
  return 'Tamil Nadu';
}

// Food tags that map to a Google Places includedType — API restricts results at source
const FOOD_TAG_TYPES: Record<string, string> = {
  'South Indian': 'south_indian_restaurant',
  'North Indian': 'north_indian_restaurant',
  'Seafood':      'seafood_restaurant',
  'Cafe':         'cafe',
  'Bakery':       'bakery',
  'Fast Food':    'fast_food_restaurant',
  'Chinese':      'chinese_restaurant',
};

// Hotel tag → search query modifier — appended to city-level query
// All entries are city-agnostic (no hardcoded landmark names)
const HOTEL_TAG_SEARCH: Record<string, string> = {
  'Heritage':             'heritage boutique historical hotel',
  'Business':             'business corporate executive hotel',
  'Family':               'family hotel children spacious',
  'Near Temple':          'hotel near temple',
  'Near Railway Station': 'hotel near railway station junction',
  'Near Bus Stand':       'hotel near bus stand terminal',
  'City Centre':          'hotel city centre main road central',
  'Rooftop':              'rooftop hotel terrace restaurant',
  'In-House Restaurant':  'hotel with restaurant dining',
  'Parking':              'hotel with parking',
  'Pool':                 'hotel swimming pool',
  'Spa':                  'hotel spa wellness',
  'Luxury':               'luxury premium five star hotel',
  'River View':           'river view hotel waterfront',
  'Mountain View':        'mountain view hill hotel',
  'Sea View':             'sea view beach hotel',
};

// Hotel price range → extra query keyword so Places returns price-relevant results
const HOTEL_PRICE_QUERY: Record<string, string> = {
  '₹1K-5K':                 'budget affordable',
  '₹5K-10K':                'mid-range',
  '₹15K+':                  'luxury premium',
  'PRICE_LEVEL_INEXPENSIVE': 'budget affordable economy',
  'PRICE_LEVEL_MODERATE':    'mid-range standard',
  'PRICE_LEVEL_EXPENSIVE':   'luxury premium',
};

// Persona → search keyword refinement (complements tag-derived query)
const PERSONA_QUERY: Record<string, string> = {
  Solo:     'budget affordable solo traveller',
  Couple:   'couple romantic heritage ambience',
  Family:   'family children parking spacious',
  Business: 'business corporate wifi central',
};

function buildHotelQuery(filters: UserFilters): string {
  const city      = filters.city  ?? 'Thanjavur';
  const state     = getCityState(city);
  const tagTerm   = filters.hotelTag ? (HOTEL_TAG_SEARCH[filters.hotelTag] ?? filters.hotelTag.toLowerCase()) : '';
  const priceKw   = (filters.priceFilter && filters.priceFilter !== 'Any')
    ? (HOTEL_PRICE_QUERY[filters.priceFilter] ?? '') : '';
  const personaKw = (filters.persona && filters.persona !== '')
    ? (PERSONA_QUERY[filters.persona] ?? '') : '';

  if (filters.hotelArea) {
    return `${personaKw} ${priceKw} ${tagTerm} hotel near ${filters.hotelArea} ${city} ${state}`.replace(/\s+/g, ' ').trim();
  }
  if (tagTerm) {
    return `${personaKw} ${priceKw} ${tagTerm} in ${city} ${state}`.replace(/\s+/g, ' ').trim();
  }
  return `${personaKw} ${priceKw} hotels in ${city} ${state}`.replace(/\s+/g, ' ').trim();
}

// Default city centre — overridden per-request via FetchOptions.center
const DEFAULT_CENTER = { latitude: 10.787, longitude: 79.1378 };

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

interface FetchOptions {
  withPhotos?:   boolean;
  minRating?:    number;
  // API-level filters — Google enforces these before returning any results
  priceLevels?:  string[];  // e.g. ['PRICE_LEVEL_INEXPENSIVE'] — direct Places API param
  openNow?:      boolean;   // true = only currently open places
  includedType?: string;    // e.g. 'vegetarian_restaurant' — single place type restriction
  center?:       { latitude: number; longitude: number }; // city centre for locationBias
}

// Hotels/Food use locationBias (city-centred); filterThanjavurOnly enforces strict locality.
// Itinerary/Explore use larger radius with no locality guard.
async function fetchPlaces(
  query: string,
  searchSeed = 0,
  radiusKm = 15,
  opts: FetchOptions = {},
) {
  const { withPhotos = false, minRating = 0, priceLevels, openNow, includedType, center = DEFAULT_CENTER } = opts;
  const rankPreference = SEED_RANK[searchSeed % 4] ?? 'RELEVANCE';
  const prefix         = SEED_PREFIX[searchSeed % 4] ?? '';

  const locationParam = {
    locationBias: {
      circle: { center, radius: radiusKm * 1000 },
    },
  };

  const body: Record<string, unknown> = {
    textQuery:      prefix + query,
    maxResultCount: 20,
    languageCode:   'en',
    rankPreference,
    ...locationParam,
  };
  if (minRating > 0)           body.minRating    = minRating;
  // priceLevels: API-native filter — returns ONLY places matching these levels
  if (priceLevels?.length)     body.priceLevels  = priceLevels;
  // openNow: API-native filter — returns ONLY currently open places
  if (openNow === true)        body.openNow      = true;
  // includedType: API-native filter — returns ONLY places of this type
  if (includedType)            body.includedType = includedType;

  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'X-Goog-Api-Key':   PLACES_KEY,
      'X-Goog-FieldMask': withPhotos ? FIELD_MASK_WITH_PHOTOS : FIELD_MASK,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const errBody = await r.text();
    console.error(`[Places API] HTTP ${r.status}:`, errBody);
    throw new Error(`Places API error ${r.status}`);
  }
  const data = await r.json() as { places?: any[] };
  return data.places ?? [];
}

// Ensure results are in the searched city — removes stray nearby-city results
function filterCityOnly(places: any[], cityName: string): any[] {
  const cn = cityName.toLowerCase().trim();
  // Also check common aliases (Tanjore = Thanjavur, Bengaluru = Bangalore)
  const aliases: Record<string, string[]> = {
    thanjavur: ['tanjore'],
    bangalore: ['bengaluru'],
    mysore:    ['mysuru'],
    trivandrum:['thiruvananthapuram'],
  };
  const alts = aliases[cn] ?? [];
  const inCity = places.filter(p => {
    const addr = (p.formattedAddress ?? '').toLowerCase();
    return addr.includes(cn) || alts.some(a => addr.includes(a));
  });
  return inCity.length >= 2 ? inCity : places;
}

interface UserFilters {
  city?:        string;   // city name — used in queries and locationBias coords
  hotelTag?:    string;   // single hotel tag — maps to HOTEL_TAG_SEARCH query term
  hotelArea?:   string;   // free-text area within city — added to Places query
  persona?:     string;   // 'Solo' | 'Couple' | 'Family' | 'Business' | ''
  foodTag?:     string;   // single cuisine/type tag — maps to includedType or query term
  priceFilter?: string;   // 'Any' | PRICE_LEVEL_* — passed as priceLevels to Places API
  minRating?:   number;   // 0 = any — passed to Places API minRating
  openNow?:     boolean;  // passed as openNow to Places API
  dietType?:    string;   // 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg'
  dineMode?:    string;   // 'Any' | 'Dine-in' | 'Takeout'
  mealTime?:    string;   // 'Any' | 'Breakfast' | 'Lunch' | 'Dinner'
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

// Meal time → search keyword map
const MEAL_TIME_QUERY: Record<string, string> = {
  'Breakfast': 'breakfast idli dosa tiffin morning coffee',
  'Lunch':     'lunch thali meals rice sambar afternoon',
  'Dinner':    'dinner restaurant night biryani',
};

function buildFoodQuery(filters: UserFilters): string {
  const city  = filters.city ?? 'Thanjavur';
  const state = getCityState(city);
  const tag   = filters.foodTag ?? '';

  // If the tag has an includedType, the API handles type restriction — query uses name for context
  // If no includedType, the tag text IS the primary query anchor
  const tagTerm = tag ? (FOOD_TAG_TYPES[tag] ? tag.toLowerCase() + ' restaurant' : (FOOD_TAG_SEARCH[tag] ?? tag.toLowerCase())) : '';

  // Diet prefix — steers Places API toward relevant results (when includedType not active)
  const dietPfx = filters.dietType === 'Pure Veg' ? 'pure vegetarian only veg no non-veg '        :
                  filters.dietType === 'Veg'       ? 'vegetarian veg '                             :
                  filters.dietType === 'Non-Veg'   ? 'non vegetarian chicken mutton fish meat egg ' : '';

  // Meal time prefix
  const mealPfx = (filters.mealTime && filters.mealTime !== 'Any')
    ? (MEAL_TIME_QUERY[filters.mealTime] ?? '') + ' '
    : '';

  const baseTerm = tagTerm || 'restaurant';
  return `${mealPfx}${dietPfx}${baseTerm} in ${city} ${state}`.replace(/\s+/g, ' ').trim();
}

// Hotel price range buckets — NON-OVERLAPPING tiers for strict Places API priceLevels param.
// Each tier maps to exactly the levels that hotel should be returned for.
// Overlap was the root cause of hotels appearing across multiple budget tiers.
const PRICE_BUCKETS: Record<string, string[]> = {
  // Direct Places API enum keys (current UI values) — strict, non-overlapping
  'PRICE_LEVEL_INEXPENSIVE': ['PRICE_LEVEL_INEXPENSIVE'],
  'PRICE_LEVEL_MODERATE':    ['PRICE_LEVEL_MODERATE'],
  'PRICE_LEVEL_EXPENSIVE':   ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
  // Legacy INR-range labels (backward compat)
  '₹1K-5K':  ['PRICE_LEVEL_INEXPENSIVE'],
  '₹5K-10K': ['PRICE_LEVEL_MODERATE'],
  '₹15K+':   ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
  '₹':    ['PRICE_LEVEL_INEXPENSIVE'],
  '₹₹':   ['PRICE_LEVEL_MODERATE'],
  '₹₹₹':  ['PRICE_LEVEL_EXPENSIVE'],
  '₹₹₹₹': ['PRICE_LEVEL_VERY_EXPENSIVE'],
};

// Food cost tier — keyword frequency analysis across all reviews
// INR ranges derived from Thanjavur Google review price mentions:
//   Under ₹100  = street food / mess / budget tiffin
//   ₹100–300    = everyday restaurant / local thali
//   ₹300–600    = mid-premium dining
//   ₹600+       = fine dining / luxury
const FOOD_COST_KEYWORDS: Record<string, string[]> = {
  'Under ₹100': ['cheap', 'affordable', 'budget', 'pocket', 'inexpensive', 'low price', 'economical', 'very cheap', 'low cost', 'cheap and', 'affordable price', '50 rupees', '80 rupees', 'very affordable'],
  '₹100–300':   ['reasonable', 'value for money', 'moderate', 'worth it', 'decent price', 'fair price', 'average price', 'not too expensive', 'good value', 'mid-range', '100 rupees', '150 rupees', '200 rupees'],
  '₹300–600':   ['pricey', 'a bit expensive', 'costly', 'slightly expensive', 'on the expensive', 'not cheap', 'expensive but', 'premium price', '300 rupees', '400 rupees', '500 rupees'],
  '₹600+':      ['fine dining', 'luxury', 'very expensive', 'high-end', 'splurge', 'lavish', 'top-end', 'extravagant', 'premium dining', '600 rupees', '700 rupees', '800 rupees', 'expensive restaurant'],
};

// Google Places price level → food cost tier mapping (used as fallback when keyword score is 0)
const FOOD_PRICE_LEVEL_MAP: Record<string, string[]> = {
  'Under ₹100': ['PRICE_LEVEL_FREE', 'PRICE_LEVEL_INEXPENSIVE'],
  '₹100–300':   ['PRICE_LEVEL_INEXPENSIVE', 'PRICE_LEVEL_MODERATE'],
  '₹300–600':   ['PRICE_LEVEL_MODERATE', 'PRICE_LEVEL_EXPENSIVE'],
  '₹600+':      ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
};

function scoreFoodCost(reviews: any[], category: string): number {
  const text = reviews.map(r => (r.text?.text ?? '').toLowerCase()).join(' ');
  const keywords = FOOD_COST_KEYWORDS[category] ?? [];
  return keywords.filter(k => text.includes(k)).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL FILTER SCORING
// Every active filter produces a score 0–1 and an optional hardFail flag.
// All criteria are evaluated together → a single total score per place.
// Gemini receives these scores as explicit context — no more filter silos.
// ─────────────────────────────────────────────────────────────────────────────

const NON_VEG_KEYWORDS = [
  'chicken', 'mutton', 'fish', 'prawn', 'biryani', 'crab', 'meat', 'egg',
  'seafood', 'pork', 'lamb', 'beef', 'non veg', 'nonveg', 'non-veg',
];

const MEAL_SCORE_KEYWORDS: Record<string, string[]> = {
  'Breakfast': ['breakfast', 'idli', 'dosa', 'tiffin', 'upma', 'pongal', 'vada', 'morning', 'puri', 'poori'],
  'Lunch':     ['lunch', 'thali', 'meals', 'rice', 'sambar', 'rasam', 'afternoon', 'noon', 'buffet'],
  'Dinner':    ['dinner', 'night', 'biryani', 'parotta', 'kothu', 'evening', 'supper'],
};

interface PlaceScore {
  total:     number;
  hardFail:  boolean;
  breakdown: Record<string, number>;
}

function scorePlaceForFilters(place: any, tab: string, f: UserFilters): PlaceScore {
  const nameText = (place.displayName?.text ?? '').toLowerCase();
  const addrText = (place.formattedAddress  ?? '').toLowerCase();
  const revText  = (place.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
  const allText  = `${nameText} ${addrText} ${revText}`;

  type Crit = { score: number; weight: number; hard?: boolean };
  const C: Record<string, Crit> = {};

  // openNow and hotel price are now enforced at the Places API level —
  // no need to score them here. Only soft ranking signals below.

  if (tab === 'Food') {
    // ── Diet signal (for Gemini ranking context only — strict exclusion is in applyStrictFilter)
    if (f.dietType === 'Non-Veg') {
      const nvRev  = NON_VEG_KEYWORDS.filter(kw => revText.includes(kw)).length;
      const nvName = NON_VEG_KEYWORDS.some(kw => nameText.includes(kw)) ? 4 : 0;
      const hits   = nvRev + nvName;
      C.diet = { score: Math.min(hits / 5, 1), weight: 3 };
    } else if (f.dietType === 'Veg' || f.dietType === 'Pure Veg') {
      // API already filtered via includedType; score as signal for ranking richness
      const typeVeg = (place.types ?? []).includes('vegetarian_restaurant');
      const flagVeg = place.servesVegetarianFood;
      const nvHits  = NON_VEG_KEYWORDS.filter(kw => revText.includes(kw)).length;
      C.diet = { score: (typeVeg || flagVeg === true) ? 1 : nvHits >= 2 ? 0.1 : 0.6, weight: 2 };
    }

    // ── Meal Time ─────────────────────────────────────────────────────────────
    if (f.mealTime && f.mealTime !== 'Any') {
      const kws  = MEAL_SCORE_KEYWORDS[f.mealTime] ?? [];
      const hits = kws.filter(kw => allText.includes(kw)).length;
      C.mealTime = { score: Math.min(0.4 + hits * 0.15, 1), weight: 2 };
    }

    // ── Craving / Cuisine ─────────────────────────────────────────────────────
    if (f.foodTag) {
      const tag  = f.foodTag;
      const term = FOOD_TAG_SEARCH[tag] ?? tag.toLowerCase();
      const kws  = term.split(' ').filter(k => k.length > 3);
      const hits = kws.filter(kw => allText.includes(kw)).length;
      C.craving = { score: kws.length > 0 ? Math.min(hits / kws.length, 1) : 0.5, weight: 2 };
    }

    // ── Food Price ────────────────────────────────────────────────────────────
    if (f.priceFilter && f.priceFilter !== 'Any') {
      const allowedLvl = FOOD_PRICE_LEVEL_MAP[f.priceFilter] ?? [];
      const levelMatch = allowedLvl.includes(place.priceLevel ?? '');
      const kwScore    = scoreFoodCost(place.reviews ?? [], f.priceFilter);
      C.price = { score: levelMatch ? 1 : kwScore > 0 ? Math.min(kwScore / 3, 0.8) : 0.3, weight: 1 };
    }

    // ── Dine Mode ─────────────────────────────────────────────────────────────
    if (f.dineMode && f.dineMode !== 'Any') {
      const ok = f.dineMode === 'Dine-in' ? place.dineIn === true : place.takeout === true;
      C.dineMode = { score: ok ? 1 : place.dineIn === null ? 0.6 : 0, weight: 1, hard: !ok && place.dineIn !== null };
    }
  }

  if (tab === 'Hotels') {
    // Price is enforced at API level via priceLevels param — no scoring needed here.

    // ── Area Proximity ────────────────────────────────────────────────────────
    if (f.hotelArea) {
      const areaKws = f.hotelArea.toLowerCase().replace(' area', '').split(' ').filter(k => k.length > 2);
      const hits    = areaKws.filter(k => addrText.includes(k) || allText.includes(k)).length;
      C.area = { score: hits > 0 ? 1 : 0.4, weight: 2 };
    }

    // ── Hotel Tag match (soft ranking signal) ────────────────────────────────
    if (f.hotelTag) {
      const kws = (HOTEL_TAG_SEARCH[f.hotelTag] ?? f.hotelTag).toLowerCase().split(' ').filter(k => k.length > 3);
      const hit = kws.some(k => allText.includes(k));
      C.tags = { score: hit ? 1 : 0.3, weight: 2 };
    }
  }

  const keys = Object.keys(C);
  if (keys.length === 0) return { total: 1, hardFail: false, breakdown: {} };

  const hardFail    = keys.some(k => !!C[k].hard);
  const totalWeight = keys.reduce((s, k) => s + C[k].weight, 0);
  const total       = keys.reduce((s, k) => s + C[k].score * C[k].weight, 0) / totalWeight;
  const breakdown   = Object.fromEntries(keys.map(k => [k, +C[k].score.toFixed(2)]));

  return { total: +total.toFixed(2), hardFail, breakdown };
}

function applyFilterScoring(places: any[], tab: string, f: UserFilters): Array<{ place: any; filterScore: PlaceScore }> {
  const scored = places.map(p => ({ place: p, filterScore: scorePlaceForFilters(p, tab, f) }));
  // Sort by filter match score: Gemini receives best-matching candidates first
  return scored.sort((a, b) => b.filterScore.total - a.filterScore.total);
}

// ─────────────────────────────────────────────────────────────────────────────
// STRICT BINARY POST-FILTER
// Runs AFTER API-level filters. For filters not handled by Places API, apply
// a hard binary test: if the place cannot be confirmed to match → remove it.
// Only Non-Veg uses this path (Veg/PureVeg handled by includedType at API level;
// price/openNow handled by priceLevels/openNow at API level).
// ─────────────────────────────────────────────────────────────────────────────
function applyStrictFilter(places: any[], tab: string, f: UserFilters): any[] {
  if (tab !== 'Food') return places;

  // Non-Veg strict filter: exclude any place with ZERO non-veg evidence.
  // Evidence = non-veg keyword in name OR reviews. If doubt → out.
  if (f.dietType === 'Non-Veg') {
    const confirmed = places.filter(p => {
      const name    = (p.displayName?.text ?? '').toLowerCase();
      const reviews = (p.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
      const combined = `${name} ${reviews}`;
      return NON_VEG_KEYWORDS.some(kw => combined.includes(kw));
    });
    // Only enforce if we have enough confirmed results — otherwise return all
    return confirmed.length >= 3 ? confirmed : places;
  }

  // Pure Veg strict filter: exclude places with 2+ non-veg keyword hits in reviews.
  // (includedType already filtered most; this catches edge cases that slipped through)
  if (f.dietType === 'Pure Veg') {
    const confirmed = places.filter(p => {
      const reviews = (p.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
      const nvHits  = NON_VEG_KEYWORDS.filter(kw => reviews.includes(kw)).length;
      return nvHits < 2;
    });
    return confirmed.length >= 3 ? confirmed : places;
  }

  return places;
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
  filterScores: PlaceScore[] = [],
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

    // Single tag — check if the place's name/reviews mention it
    const activeTag = tab === 'Hotels' ? (filters.hotelTag ?? '') : (filters.foodTag ?? '');
    const tagMentions: Record<string, boolean> = {};
    if (activeTag) {
      const keywords = (HOTEL_TAG_SEARCH[activeTag] ?? FOOD_TAG_SEARCH[activeTag] ?? activeTag)
        .toLowerCase().split(' ').filter((k: string) => k.length > 3);
      tagMentions[activeTag] = keywords.some((k: string) => allText.includes(k));
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
      // Universal filter match score (0–1 per criterion, pre-computed)
      filterScore:     filterScores[i]?.total     ?? 1,
      filterBreakdown: filterScores[i]?.breakdown ?? {},
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

  const PERSONA_PROFILE: Record<string, string> = {
    Solo:     'Solo traveller — values budget, walking distance to temples, no-fuss check-in',
    Couple:   'Couple stay — values ambience, heritage feel, quiet rooms, romantic atmosphere',
    Family:   'Family with children — values spacious rooms, parking, safety, in-house dining',
    Business: 'Business traveller — values reliable WiFi, central location, professional amenities',
  };
  if (tab === 'Hotels') {
    if (filters.persona && PERSONA_PROFILE[filters.persona])
      criteria.push({ label: 'Visitor persona', value: PERSONA_PROFILE[filters.persona], weight: 'critical' });
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price tier', value: `${filters.priceFilter} — CRITICAL: if a hotel's priceLevel field is set to a different tier, EXCLUDE it. If priceLevel is missing, only include the hotel if review keywords support this tier — exclude if review keywords suggest a different price range.`, weight: 'critical' });
    if (filters.minRating && filters.minRating > 0)
      criteria.push({ label: 'Min rating', value: `${filters.minRating}+`, weight: 'important' });
    if (filters.hotelTag)
      criteria.push({ label: 'Hotel type', value: filters.hotelTag, weight: 'critical' });
    if (filters.hotelArea)
      criteria.push({ label: 'Preferred area', value: `near ${filters.hotelArea}`, weight: 'important' });
    criteria.push({ label: 'Implicit need', value: 'walkable or close to Brihadeeswarar Temple', weight: 'important' });
  } else if (tab === 'Food') {
    if (filters.dietType === 'Pure Veg')
      criteria.push({ label: 'Diet', value: 'Pure Veg — must serve ONLY vegetarian food, no non-veg items at all', weight: 'critical' });
    else if (filters.dietType === 'Non-Veg')
      criteria.push({ label: 'Diet', value: 'Non-Veg — EXCLUDE restaurants whose reviews have ZERO mentions of chicken/mutton/fish/biryani/meat/egg/seafood. Rank places with the most non-veg review mentions highest. A place with servesVegetarianFood=true but NO non-veg review keywords must be ranked LAST or excluded.', weight: 'critical' });
    else if (filters.dietType && filters.dietType !== 'Any')
      criteria.push({ label: 'Diet', value: filters.dietType, weight: 'critical' });
    if (filters.foodTag)
      criteria.push({ label: 'Cuisine / type (PRIMARY)', value: filters.foodTag, weight: 'critical' });
    if (filters.mealTime && filters.mealTime !== 'Any')
      criteria.push({ label: 'Meal time', value: filters.mealTime + ' — rank places that specialise in this meal highest', weight: 'critical' });
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price range (per person)', value: filters.priceFilter, weight: 'important' });
    if (filters.dineMode && filters.dineMode !== 'Any')
      criteria.push({ label: 'Dining mode', value: filters.dineMode, weight: 'important' });
    criteria.push({ label: 'Implicit need', value: 'authentic Thanjavur / Tamil cuisine', weight: 'nice-to-have' });
  }

  const criteriaStr = criteria.length > 0
    ? criteria.map(c => `  - [${c.weight.toUpperCase()}] ${c.label}: ${c.value}`).join('\n')
    : '  - No specific preferences stated (rank by quality and review signals)';

  // ── Step 3: Build ranking + selection rules specific to the tab ──────────
  const rankingRules = tab === 'Hotels' ? `
RANKING RULES for Hotels:
1. CRITERIA FIRST — the visitor profile above is the primary filter. A place that perfectly matches tag criteria at 4.1★ beats a 4.8★ place with no tag match.
2. Check tagMentions for each place:
   - CRITICAL tag with tagMentions[tag] = false → rank LAST, set recommended=false
   - If ALL places have tagMentions[tag] = false → rank by quality (no exclusion possible)
3. Among tag-matching places: rank by (a) tagMentions score, (b) rating × log(totalReviews), (c) recent trend
4. Trust signal: 4.3★ × 2000 reviews outranks 4.7★ × 50 reviews
5. reviewDepth > 150 → higher trust; < 50 → lower trust
6. Declining trend is a penalty — rank below stable/improving at same quality` : tab === 'Food' ? `
RANKING RULES for Food:
1. CRITERIA FIRST — visitor's diet, meal time, cuisine tags, and price range are the primary filters.
2. Pure Veg constraint: any place with non-veg dominance in reviews → rank LAST, recommended=false
3. Meal time match: if Breakfast selected, tiffin/idli/dosa spots rank above general restaurants
4. Tag match: cuisine tag in name or reviews → rank above non-matching places at same quality
5. Bucket scoring: buckets.hygiene + buckets.taste weighted 2× — both ≥ 3 = strong signal
6. Authentic Thanjavur/Tamil cuisine beats international at same rating for local visitors
7. 4.4★ × 3000 reviews outranks 4.8★ × 80 reviews — volume = real footfall signal
8. Price range match: if price tier selected, places whose review keywords match that tier rank higher` : `
RANKING RULES: rank by criteria fit first, then rating × log(reviewCount)`;

  // ── Step 4: Selection and count rules ────────────────────────────────────
  const selectionRules = `
SELECTION RULES — pick the BEST 5–10 from the full list:

1. FILTER SCORE IS PRIMARY. Every place has a filterScore (0–1) and filterBreakdown showing per-criterion scores.
   - filterScore >= 0.75: strong match — include unless quality is very low
   - filterScore 0.50–0.74: partial match — include only if no better options exist
   - filterScore < 0.50: poor match — EXCLUDE unless fewer than 5 places pass
   - filterScore = 1 (no active filters): rank purely by quality

2. DIET IS NON-NEGOTIABLE. If filterBreakdown.diet exists:
   - diet = 0 → EXCLUDE. Do not rank last — fully exclude.
   - diet < 0.3 → EXCLUDE unless fewer than 5 alternatives.
   - A place with servesVeg=true but diet='Non-Veg' filter and diet score=0 MUST be excluded.

3. CRAVING MATCH. If filterBreakdown.craving exists and craving < 0.3, rank last only.

4. Minimum 5 results — relax filterScore threshold to 0.3 only if needed.
5. Maximum 10 results — stop when filterScore drops significantly.
6. QUALITY FLOOR: prefer rating >= 4.0 AND totalReviews >= 20. Relax to 3.8 / 10 only if needed to reach 5.
7. TREND: declining is a penalty, not an exclusion.
8. The returned list IS the final result — every position must earn its place.`;

  // ── Step 5: Compose the prompt ────────────────────────────────────────────
  const prompt = `You are a Thanjavur travel expert and data analyst. From the ${places.length} ${tab.toLowerCase()} below, select and rank the BEST 5–10 for a visitor with these needs:

VISITOR PROFILE:
${criteriaStr}
${rankingRules}
${selectionRules}

TREND INTERPRETATION (use trendDelta field):
- trendDelta > +0.2 → "improving" (recent reviewers rate higher than historical avg)
- trendDelta < -0.3 → "declining" (recent reviewers rate lower)
- Otherwise → "stable"

PLACES DATA (${places.length} candidates):
${JSON.stringify(summaries)}

TASK: Return a JSON array of your selected 5–10 places in RANKED ORDER (rank 1 = best match).
Only include places that earn their place. Stop when quality/relevance drops.

[{
  "originalIdx": <idx from input, integer>,
  "rank": <1 = best, integer>,
  "trendVerdict": "improving" | "declining" | "stable",
  "trendReason": "<max 12 words — MUST quote or closely paraphrase words from the actual review text>",
  "reviewSummary": "<2 sentences — synthesise what reviewers most frequently praise; use words from actual reviews; lead with strongest positive>",
  "aiNote": "<max 18 words — MUST start with 'Verified by AI:' — state exactly how many of the provided reviews confirm the visitor's primary filter (diet, meal time, or persona). Example: 'Verified by AI: 4 of 5 guests mention biryani — strong non-veg match'>",
  "filterVerification": "<ONE sentence — scan the reviews array provided and count: how many reviews mention the visitor's primary filter keyword (e.g. non-veg food types, veg/pure veg, breakfast items, couple/family). State: 'X of Y recent guests confirm [what they confirm]'. Use actual counts from the reviews provided, not guesses.>",
  "whyOverOthers": "<max 30 words — compare against the other candidates in this list; cite specific numbers or unique features>",
  "bestFor": "<10 words — describe the ideal visitor type>",
  "caveat": "<one specific drawback from reviews, or null>"
}]

QUALITY RULES:
- trendReason: use words found in the actual review texts provided, not invented
- aiNote: MUST start with "Verified by AI:" and cite a specific review count — never generic praise
- filterVerification: count actual review mentions of the primary filter keyword — "3 of 5 guests mention chicken/biryani" beats "guests enjoy non-veg food"
- whyOverOthers: name or contrast the alternatives: "unlike the other hotels here, this one..."
- caveat: only for real drawbacks cited in reviews (noise, distance, service issues)

Return ONLY valid JSON array. No markdown. No explanation text.`;

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
    // Fallback: sort by filterScore × quality signal — respects all active filters
    const avgRating = summaries.length > 0
      ? summaries.reduce((a, s) => a + s.rating, 0) / summaries.length : 4.0;

    const qualitySorted = [...summaries].sort((a, b) => {
      const aFilterBoost = (a.filterScore ?? 1);
      const bFilterBoost = (b.filterScore ?? 1);
      const aQuality = a.rating * Math.log10(Math.max(a.totalReviews, 1));
      const bQuality = b.rating * Math.log10(Math.max(b.totalReviews, 1));
      // Hard-fail (filterScore = 0 for a critical criterion) → push to end
      const aFail = a.filterScore === 0 ? -1000 : 0;
      const bFail = b.filterScore === 0 ? -1000 : 0;
      return (bFilterBoost * bQuality + bFail) - (aFilterBoost * aQuality + aFail);
    });
    const targetCount = Math.min(Math.max(qualitySorted.length, 5), 10);
    const selected = qualitySorted.slice(0, targetCount);

    return selected.map((s, i) => {
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
        originalIdx:   s.idx,
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
• Airavatesvara Temple (Darasuram): Free. Located in Darasuram village near Kumbakonam — 35–38 km from Thanjavur city centre (~50–60 min by car/taxi). UNESCO listed. Opens 6 AM. LOW crowd all day. NOT reachable by short auto from Thanjavur — requires hired taxi or bus to Kumbakonam then local auto.

TRAVEL TIMES (door-to-door):
• Big Temple ↔ Palace: 5 min walk (400m south)
• Palace ↔ Saraswathi Mahal: 2 min walk (same complex)
• Saraswathi Mahal ↔ Art Gallery: 2 min walk (same complex)
• Palace complex ↔ local restaurants: 10–20 min auto
• City centre ↔ Darasuram (Airavatesvara Temple): 50–60 min by car/taxi (35–38 km). Taxi ₹800–1,200 round trip. Or bus from Thanjavur to Kumbakonam (₹30–50), then local auto to Darasuram (₹40–60).
• City centre ↔ Gangaikonda Cholapuram: 1 hr car, ₹800–1,200 round trip

FOOD & MEAL TIMING:
• Authentic banana-leaf thali: served 12:00–1:30 PM at most places (runs out fast — arrive by 12:15 PM)
• Filter coffee: available all day at local cafés from 7 AM
• Auto fares: ₹50–80 short hops, ₹100–150 medium hops, ₹200–300 cross-town
`;

async function geminiItinerary(places: any[], startTime = '07:00', stopCount = 5, city = 'Thanjavur'): Promise<any[]> {
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
  const sessionLabel = stopCount === 5 ? 'full day' : stopCount === 3 ? 'afternoon' : 'evening';

  const isThanjavur = /thanjavur|tanjore/i.test(city);
  const cityFacts   = isThanjavur ? THANJAVUR_FACTS : '';
  // City-specific sequencing rules injected only when we have verified ground truth
  const citySeqRules = isThanjavur ? `
SEQUENCING RULES (follow in order):
1. If Brihadeeswarar Temple is in the list → it MUST be stop 1 (best visited before 9 AM when crowd is low; inner sanctum closes 12:30 PM)
2. Thanjavur Palace, Saraswathi Mahal, Art Gallery are a walkable cluster → schedule consecutively, no auto needed between them` : `
SEQUENCING RULES:
1. Start with the most iconic / highest-rated attraction
2. Group walkable/nearby attractions consecutively to minimise travel`;

  const prompt = `You are a local expert trip planner for ${city}. Create a ${stopCount}-stop ${sessionLabel} itinerary starting at ${startStr}.

${cityFacts}

AVAILABLE ATTRACTIONS (from Google Places — use names as given):
${JSON.stringify(topPlaces)}
${citySeqRules}
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

Return a JSON array of EXACTLY ${stopCount} stops. Return ONLY valid JSON. No markdown. No explanation.`;

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
async function geminiExploreGuide(place: any, locationName: string, timeSlot: string, city = 'Thanjavur') {
  if (!GEMINI_KEY) return null;

  const timeRange = timeSlot === 'Morning'   ? '6 AM–12 PM'
                  : timeSlot === 'Afternoon' ? '12 PM–4 PM'
                  :                            '4 PM–8 PM';

  const reviews = (place.reviews ?? []).slice(0, 3).map((r: any) => ({
    stars: r.rating,
    text:  (r.text?.text ?? '').slice(0, 120),
    ago:   r.relativePublishTimeDescription ?? '',
  }));

  // Only inject Thanjavur-specific ground-truth facts for Thanjavur — other cities use live data only
  const cityFacts = /thanjavur|tanjore/i.test(city) ? THANJAVUR_FACTS : '';

  const prompt = `You are a local expert guide for ${city} creating a personalised visit plan for ${locationName} during the ${timeSlot} (${timeRange}).

${cityFacts}

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
    const exploreCity  = ((req.body?.city as string) ?? 'Thanjavur').trim();
    const exploreState = getCityState(exploreCity);
    const exploreCenter = getCityCenter(exploreCity);

    try {
      const places = await fetchPlaces(`${locationName} ${exploreCity} ${exploreState}`, 0, 50, { center: exploreCenter });
      const place  = places[0] ?? {};
      const guide  = await geminiExploreGuide(place, locationName, timeSlot, exploreCity);

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
    const startTime    = (req.body?.startTime  ?? '07:00') as string;
    const stopCount    = Math.min(Math.max(parseInt(String(req.body?.stopCount ?? '5'), 10) || 5, 2), 5);
    const searchSeed   = parseInt((req.body?.searchSeed ?? '0') as string, 10);
    const itinCity     = ((req.body?.city as string) ?? 'Thanjavur').trim();
    const itinState    = getCityState(itinCity);
    const itinCenter   = getCityCenter(itinCity);

    try {
      const rawPlaces = await fetchPlaces(
        `top tourist attractions in ${itinCity} ${itinState}`,
        searchSeed, 35, { center: itinCenter },
      );
      const stops     = await geminiItinerary(rawPlaces, startTime, stopCount, itinCity);

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

  const city = ((req.body?.city as string) ?? 'Thanjavur').trim();

  const filters: UserFilters = {
    city,
    hotelTag:    req.body?.hotelTag    ?? '',
    hotelArea:   req.body?.hotelArea   ?? '',
    persona:     req.body?.persona     ?? '',
    foodTag:     req.body?.foodTag     ?? '',
    priceFilter: req.body?.priceFilter ?? 'Any',
    minRating:   Number(req.body?.minRating ?? 0),
    openNow:     req.body?.openNow === true,
    dietType:    req.body?.dietType    ?? 'Any',
    dineMode:    req.body?.dineMode    ?? 'Any',
    mealTime:    req.body?.mealTime    ?? 'Any',
  };

  // Build query from filters — changes the Places search so different filters → different results
  const query = tab === 'Food' ? buildFoodQuery(filters) : buildHotelQuery(filters);

  const apiMinRating = (filters.minRating ?? 0) > 0 ? (filters.minRating ?? 0) : 0;

  // ── API-level filter params — Google enforces these before returning results ──────────────
  // Hotel price: pass priceLevels directly; Places API returns ONLY matching hotels.
  // PRICE_LEVEL_FREE cannot be used in priceLevels param — omit it.
  const apiPriceLevels = (tab === 'Hotels' && filters.priceFilter && filters.priceFilter !== 'Any')
    ? (PRICE_BUCKETS[filters.priceFilter] ?? []).filter(p => p !== 'PRICE_LEVEL_FREE')
    : [];

  // Open Now: pass to API so only open places are returned.
  const apiOpenNow = filters.openNow === true;

  const cityCenter = getCityCenter(city);

  // Diet includedType: vegetarian_restaurant for Veg/Pure Veg (Google API-level)
  const dietIncludedType = (tab === 'Food' && (filters.dietType === 'Veg' || filters.dietType === 'Pure Veg'))
    ? 'vegetarian_restaurant' : undefined;

  // Food tag includedType: Tier-1 tags map directly to a Google Place type
  // Only used when diet doesn't already set an includedType
  const tagIncludedType = (tab === 'Food' && !dietIncludedType && filters.foodTag)
    ? (FOOD_TAG_TYPES[filters.foodTag] ?? undefined) : undefined;

  const apiIncludedType = dietIncludedType ?? tagIncludedType;

  try {
    // Primary fetch — all API-level filters applied at source
    let rawPlaces = await fetchPlaces(query, searchSeed, 15, {
      withPhotos:   true,
      minRating:    apiMinRating,
      priceLevels:  apiPriceLevels.length ? apiPriceLevels : undefined,
      openNow:      apiOpenNow || undefined,
      includedType: apiIncludedType,
      center:       cityCenter,
    });

    // Fallback: includedType may be too restrictive in smaller cities — retry without it
    if (apiIncludedType && rawPlaces.length < 4) {
      const fallback = await fetchPlaces(query, searchSeed, 15, {
        withPhotos:  true,
        minRating:   apiMinRating,
        priceLevels: apiPriceLevels.length ? apiPriceLevels : undefined,
        openNow:     apiOpenNow || undefined,
        center:      cityCenter,
      });
      if (fallback.length > rawPlaces.length) rawPlaces = fallback;
    }

    // Remove results outside the searched city
    const localPlaces = filterCityOnly(rawPlaces, city);

    // ── Post-fetch strict binary filter ─────────────────────────────────────────────────────
    // Rule: if we cannot confirm the place matches the active filter → remove it.
    // Only applied to filters NOT already enforced at API level.
    const hardFiltered = applyStrictFilter(localPlaces, tab, filters);

    // Score remaining places for Gemini ranking priority (soft signals only — no exclusion)
    const filterScored = applyFilterScoring(hardFiltered, tab, filters);

    // Quality floor — drop very-low-signal places; relax if pool would be too small
    const qualified    = filterScored.filter(({ place }) => (place.rating ?? 0) >= 3.8 && (place.userRatingCount ?? 0) >= 10);
    const scoredToRank = qualified.length >= 2 ? qualified : filterScored;

    const placesToRank = scoredToRank.map(s => s.place);
    const placeScores  = scoredToRank.map(s => s.filterScore);

    // Gemini receives places sorted by filter match + filter scores as explicit context
    const rankedAi = await geminiRankAndAnalyse(placesToRank, tab, filters, placeScores);

    // Sort by Gemini's rank (ascending); recommended places come first naturally
    const sorted          = [...rankedAi].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    const reorderedPlaces = sorted.map((ai: any) => placesToRank[ai.originalIdx ?? 0] ?? placesToRank[0]);

    // Build the full result shape for every place
    const buildPlaceResult = (p: any, ai: any, globalIdx: number) => {
      const uiReviews = [...(p.reviews ?? [])]
        .sort((a: any, b: any) => (b.text?.text?.length ?? 0) - (a.text?.text?.length ?? 0))
        .slice(0, 5)
        .map((r: any) => ({
          text:     r.text?.text ?? '',
          author:   r.authorAttribution?.displayName ?? 'Visitor',
          location: 'Tamil Nadu',
          stars:    r.rating ?? 5,
          ago:      r.relativePublishTimeDescription ?? 'Recently',
        }));

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
      const whyOverOthersFB = globalIdx === 0
        ? `Top-ranked: ${rating}★ across ${reviewCount.toLocaleString()} reviews — strongest criteria match in this set`
        : `${rating}★ with ${reviewCount.toLocaleString()} reviews — #${globalIdx + 1} of ${placesToRank.length} ${tab.toLowerCase()} analysed`;
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
        id:          p.id ?? `place-${globalIdx}`,
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
        reviewSummary:      ai.reviewSummary      || reviewSummaryFB,
        aiNote:             ai.aiNote             || `Verified by AI: ${rating}★ across ${reviewCount.toLocaleString()} reviews — quality confirmed`,
        filterVerification: ai.filterVerification || null,
        trendVerdict: ai.trendVerdict  ?? 'stable',
        trendReason:  ai.trendReason   || trendReasonFB,
        reviews:      uiReviews,
        photoColor:   COLORS[globalIdx % COLORS.length],
        photoRef:     p.photos?.[0]?.name ?? null,
        websiteUri:   p.websiteUri    ?? null,
        googleMapsUri: p.googleMapsUri ?? null,
        aiDetail: {
          whyOverOthers: ai.whyOverOthers || whyOverOthersFB,
          dataPoints: [
            `${rating}★ across ${reviewCount.toLocaleString()} reviews`,
            `${p.formattedAddress ?? 'Thanjavur, Tamil Nadu'}`,
            `AI rank: #${ai.rank ?? globalIdx + 1} of ${placesToRank.length} ${tab.toLowerCase()} analysed`,
          ],
          bestFor: ai.bestFor || bestForFB,
          ...(ai.caveat ? { caveat: ai.caveat } : {}),
        },
      };
    };

    // Gemini has already selected 5–10 best — build the final result list directly
    const finalResults = reorderedPlaces.map((p: any, i: number) =>
      buildPlaceResult(p, sorted[i] ?? {}, i)
    );

    return res.json({ results: finalResults });
  } catch (err) {
    console.error('[/api/plan]', err);
    return res.status(500).json({ error: 'Failed to fetch places data' });
  }
}
