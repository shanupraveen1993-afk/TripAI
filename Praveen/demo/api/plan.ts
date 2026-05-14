import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const GEMINI_KEY  = process.env.GEMINI_API_KEY ?? '';

// ─── In-memory Places API cache ───────────────────────────────────────────────
// Vercel serverless instances stay warm for several minutes — this cuts repeat
// API calls for the same query (e.g. multiple users searching "biryani").
// TTL: 10 minutes. Max 120 entries (evicts oldest first).
const PLACES_CACHE = new Map<string, { ts: number; places: any[] }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

function cacheLookup(key: string): any[] | null {
  const hit = PLACES_CACHE.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) { PLACES_CACHE.delete(key); return null; }
  return hit.places;
}

function cacheStore(key: string, places: any[]): void {
  if (PLACES_CACHE.size >= 120) {
    // evict the oldest entry
    const oldest = [...PLACES_CACHE.entries()].reduce((a, b) => a[1].ts < b[1].ts ? a : b);
    PLACES_CACHE.delete(oldest[0]);
  }
  PLACES_CACHE.set(key, { ts: Date.now(), places });
}

// Preferred SKU fields — same billing tier as servesVegetarianFood (already paying it)
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
  'places.priceLevel',
  'places.regularOpeningHours',
  'places.currentOpeningHours',
  'places.types',
  'places.primaryType',            // single definitive type — improves hotel/restaurant separation
  'places.websiteUri',
  'places.googleMapsUri',
  'places.businessStatus',
  'places.editorialSummary',
  // ── Diet & Cuisine booleans ───────────────────────────────────────────────
  'places.servesVegetarianFood',   // Veg / Pure Veg hard filter (existing)
  // ── Meal time booleans — replaces keyword guessing in mealTime filter ────
  'places.servesBreakfast',
  'places.servesLunch',
  'places.servesDinner',
  'places.servesBrunch',
  // ── Service mode booleans ─────────────────────────────────────────────────
  'places.dineIn',
  'places.takeout',
  'places.delivery',
  'places.curbsidePickup',
  'places.reservable',
  // ── Ambience & Vibe booleans ──────────────────────────────────────────────
  'places.outdoorSeating',
  'places.goodForGroups',
  'places.goodForChildren',
  'places.menuForChildren',        // precise family-dining signal (replaces 'seating' keyword)
  'places.liveMusic',
  'places.goodForWatchingSports',
  'places.allowsDogs',
  // ── Drinks booleans ───────────────────────────────────────────────────────
  'places.servesCoffee',
  'places.servesBeer',
  'places.servesWine',
  'places.servesCocktails',
  'places.servesDessert',
  // ── Facilities ────────────────────────────────────────────────────────────
  'places.parkingOptions',
  'places.accessibilityOptions',   // wheelchair accessible entrance/seating/restroom/parking
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

// Food tag → keywords — 25 tags (5×5), each subsuming all related variants
const FOOD_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Cuisine & Dish ───────────────────────────────────────────────────────
  'Biryani':        ['biryani', 'biriyani', 'dum biryani', 'briyani', 'mandi biryani', 'biryani house', 'biryani point', 'chicken biryani', 'mutton biryani', 'veg biryani', 'dum rice'],
  'Pure Veg':       ['pure veg', 'veg only', 'vegetarian only', 'sattvic', 'saivam', 'no non-veg', 'bhavan', 'vegetarian restaurant', 'bhawan', 'serves vegetarian'],
  'Non-Veg':        ['non-veg', 'nonveg', 'chicken', 'mutton', 'fish', 'prawn', 'non veg', 'seafood', 'meat', 'egg', 'shawarma', 'kozhi', 'meen', 'non vegetarian'],
  'South Indian':   ['south indian', 'dosa', 'dosai', 'idli', 'idly', 'sambar', 'pongal', 'vada', 'rasam', 'banana leaf', 'saapadu', 'uttapam', 'appam', 'idiyappam', 'south indian restaurant'],
  'Tiffin':         ['tiffin', 'tiffin center', 'tiffin centre', 'morning tiffin', 'evening tiffin', 'tiffin shop', 'idli', 'dosa', 'dosai', 'vada', 'vadai', 'pongal', 'idly', 'uttapam', 'upma'],
  // ── Meal & Timing ────────────────────────────────────────────────────────
  'Lunch':          ['lunch', 'lunch meals', 'lunch thali', 'afternoon meals', 'lunch time', 'afternoon', 'meals', 'full meals', 'banana leaf meals', 'rice meals'],
  'All Day':        ['all day', 'open all day', 'all time', 'anytime', 'full day', 'variety', 'multi cuisine', 'open late', '24 hours', 'always open'],
  'Dinner':         ['dinner', 'night food', 'evening meals', 'dinner time', 'supper', 'night restaurant', 'dinner menu', 'night dining'],
  'Snacks':         ['snacks', 'snack', 'bajji', 'bonda', 'chaat', 'evening snack', 'street food', 'bakery', 'tea shop', 'tea stall', 'murukku', 'parotta', 'kothu parotta', 'chat'],
  'Breakfast':      ['breakfast', 'morning tiffin', 'morning', 'idli', 'dosa', 'tiffin', 'pongal', 'upma', 'morning snack', 'early morning', 'idli vada'],
  // ── Taste & Quality ──────────────────────────────────────────────────────
  'Delicious':      ['delicious', 'tasty', 'flavorful', 'flavour', 'yummy', 'amazing taste', 'loved the taste', 'great taste', 'wonderful food', 'mouthwatering', 'taste is good'],
  'Fresh':          ['fresh', 'freshly', 'freshly cooked', 'freshly prepared', 'hot and fresh', 'cooked fresh', 'fresh ingredients', 'hot food', 'made fresh'],
  'Spicy':          ['spicy', 'spice', 'masala', 'pepper', 'tangy', 'hot and spicy', 'spice level', 'well spiced', 'fiery', 'chilli', 'peppery'],
  'Good Quantity':  ['quantity', 'generous', 'generous portions', 'good quantity', 'full stomach', 'enough food', 'large portion', 'filling', 'heavy meal', 'generous serving'],
  'Authentic':      ['authentic', 'traditional', 'original', 'homemade', 'age old', 'heritage', 'classic', 'real taste', 'old recipe', 'native style', 'cooked fresh'],
  // ── Dining Experience ────────────────────────────────────────────────────
  'AC Dine-in':     ['ac', 'air conditioned', 'air conditioning', 'fully ac', 'ac restaurant', 'ac hall', 'centrally ac', 'cool ambience', 'dine in', 'dine-in', 'dining hall'],
  'Friendly Staff': ['friendly staff', 'helpful staff', 'staff friendly', 'attentive staff', 'courteous', 'polite staff', 'warm staff', 'good service', 'prompt service', 'caring staff'],
  'Family Dining':  ['family', 'family friendly', 'family restaurant', 'comfortable seating', 'spacious', 'kids', 'group dining', 'seating capacity', 'couples', 'large group'],
  'Good Ambience':  ['ambience', 'ambiance', 'atmosphere', 'decor', 'interior', 'cozy', 'nice ambience', 'good ambience', 'pleasant', 'well decorated', 'beautiful'],
  'Clean':          ['clean', 'hygienic', 'hygiene', 'neat', 'tidy', 'clean place', 'cleanliness', 'spotless', 'well maintained', 'sanitized'],
  // ── Value & Price ────────────────────────────────────────────────────────
  'Highly Rated':   ['highly recommended', 'must visit', 'must try', 'top rated', 'best in thanjavur', 'everyone recommends', 'go-to place', 'popular', 'famous', 'well known', 'landmark'],
  'Value for Money':['value for money', 'worth it', 'worth the price', 'good value', 'value', 'money worth', 'cost effective', 'decent price', 'reasonable price'],
  'Good Portions':  ['quantity', 'generous portions', 'good quantity', 'generous serving', 'good portions', 'full value', 'filling meal', 'large serving', 'generous meal'],
  'Affordable':     ['affordable', 'cheap', 'pocket friendly', 'inexpensive', 'budget friendly', 'low price', 'very affordable', 'economical', 'budget meal'],
  'Top Pick':       ['top pick', 'first choice', 'go-to', 'landmark', 'favourite', 'popular spot', 'crowd favourite', 'local favourite', 'iconic', 'institution'],
  // ── New 3×5 food tags ────────────────────────────────────────────────────
  'Tiffin & Snacks': ['tiffin', 'tiffin center', 'tiffin shop', 'idli', 'dosa', 'dosai', 'vada', 'vadai', 'parotta', 'snack', 'puri', 'poori', 'upma', 'pongal', 'bajji', 'bonda'],
  'Fresh & Hot':     ['fresh', 'freshly', 'freshly cooked', 'hot', 'piping hot', 'freshly prepared', 'served hot', 'warm food', 'made fresh', 'hot and fresh'],
  'Chettinad Style': ['chettinad', 'chetnaad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'country chicken', 'chettinad cuisine', 'chettinad style', 'anjappar'],
  'Quick Service':   ['quick service', 'fast service', 'prompt', 'speedy', 'quick', 'fast', 'efficient service', 'attentive staff', 'good service'],
  // ── Legacy — Dashboard preset overrides (other cities) ───────────────────
  'Thali/Meals':    ['thali', 'meals', 'meal', 'banana leaf', 'unlimited meals', 'full meals', 'set meals', 'lunch thali', 'saapadu', 'virunthu'],
  'North Indian':   ['north indian', 'paneer', 'naan', 'roti', 'butter chicken', 'dal makhani', 'tandoor', 'punjabi', 'paratha', 'mughlai'],
  'Chettinad':      ['chettinad', 'chettinaad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'chettinad cuisine', 'anjappar', 'country chicken'],
  'Filter Coffee':  ['filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'south indian coffee', 'decoction', 'coffee shop'],
  'Buffet':         ['buffet', 'unlimited buffet', 'all you can eat', 'buffet lunch', 'buffet dinner', 'unlimited meals'],
  'Cafe':           ['cafe', 'coffee shop', 'cappuccino', 'filter coffee', 'kaapi', 'bakery cafe'],
  'Street Food':    ['street food', 'chaat', 'gol gappa', 'pani puri', 'bhel puri', 'vada pav', 'pav bhaji'],
  'Seafood':        ['seafood', 'fish', 'prawn', 'crab', 'lobster', 'meen', 'sea food'],
};

// Place types that indicate food/restaurant — used to exclude from hotel results
// Types that confirm a place IS a restaurant/food outlet — used to keep food results
const RESTAURANT_TYPES = new Set([
  'restaurant', 'food', 'cafe', 'bakery', 'bar', 'meal_delivery',
  'meal_takeaway', 'night_club', 'fast_food_restaurant', 'south_indian_restaurant',
  'north_indian_restaurant', 'chinese_restaurant', 'seafood_restaurant',
]);

// Types that confirm a place is NOT a restaurant — hard exclude from Food results
// Catches fish stalls, aquariums, pet shops, supermarkets that mention food items
const NON_RESTAURANT_TYPES = new Set([
  'aquarium', 'pet_store', 'zoo', 'supermarket', 'grocery_store', 'convenience_store',
  'department_store', 'clothing_store', 'shoe_store', 'hardware_store', 'furniture_store',
  'fish_market', 'seafood_market', 'market', 'fish_store', 'butcher_shop',
  'tourist_attraction', 'museum', 'art_gallery', 'park', 'church', 'mosque', 'temple',
  'hospital', 'pharmacy', 'bank', 'atm', 'gas_station', 'car_wash', 'car_repair',
  'lodging', 'hotel', 'motel', 'guest_house',
]);

// Food tags that map to a Google Places includedType — kept for Veg/Pure Veg only
// Cuisine tags use keyword post-fetch filter instead (more reliable for smaller cities)
const FOOD_TAG_TYPES: Record<string, string> = {
  'South Indian': 'south_indian_restaurant',
  'North Indian': 'north_indian_restaurant',
  'Seafood':      'seafood_restaurant',
  'Cafe':         'cafe',
  'Bakery':       'bakery',
  'Fast Food':    'fast_food_restaurant',
  'Chinese':      'chinese_restaurant',
};

// Hotel tag → post-fetch verification keywords
// At least ONE keyword must appear in name + address + reviews for the hotel to qualify.
// Tags marked null are GPS-verified — no text check needed.
const HOTEL_TAG_VERIFY: Record<string, string[] | null> = {
  // ── Active 17 base tags (merged) ─────────────────────────────────────────
  'Spotlessly Clean':    ['clean', 'spotless', 'cleanliness', 'neat', 'tidy', 'hygienic', 'hygiene', 'sanitized'],
  'Well Maintained':     ['maintained', 'well-maintained', 'neat', 'maintenance'],
  'Fresh Rooms':         ['fresh', 'odour', 'smell', 'odor', 'bathroom', 'toilet', 'shower', 'towels'],
  'Near Big Temple':     ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram'],
  'Near Railway Station':['railway station', 'railway', 'junction', 'station road'],
  'Central & Walkable':  null,  // GPS-verified via CITY_LANDMARKS
  'City Centre':         null,  // GPS-verified via CITY_LANDMARKS
  'Easy Parking':        ['parking', 'car park', 'valet', 'garage'],
  'Walkable Distance':   ['walk', 'walking', 'walkable', 'nearby', 'close to', 'minutes walk', 'walking distance'],
  'Quiet & Peaceful':    ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free', 'peaceful stay'],
  'Budget-Friendly':     ['budget', 'affordable', 'cheap', 'economical', 'inexpensive', 'low cost', 'lodge'],
  'Prompt Service':      ['prompt', 'quick service', 'fast service', 'responsive', 'smooth', 'efficient'],
  'Good Hospitality':    ['hospitality', 'welcoming', 'warm', 'courteous', 'polite', 'hospitable', 'heartwarming'],
  'Highly Recommended':  ['recommend', 'recommended', 'must stay', 'must visit', 'excellent', 'best', 'outstanding'],
  'Friendly & Helpful':  ['friendly', 'warm', 'welcoming', 'helpful', 'attentive', 'cooperative'],
  'Warm Hospitality':    ['courteous', 'polite', 'professional', 'hospitality', 'welcoming', 'heartwarming'],
  'Quick Response':      ['prompt', 'quick', 'smooth', 'responsive'],
  'Spacious Rooms':      ['spacious', 'large room', 'roomy', 'big room', 'good space'],
  'AC Rooms':            ['ac room', 'air conditioned room', 'air conditioning', 'ac available', 'fully ac', 'centrally ac'],
  'Comfortable & Quiet': ['comfortable', 'comfort', 'cozy', 'quiet', 'peaceful', 'calm', 'serene'],
  'Good Amenities':      ['amenities', 'wifi', 'internet', 'lift', 'pool', 'facilities', 'generator'],
  'In-House Restaurant': ['restaurant', 'dining', 'dining hall', 'meals', 'food court'],
  'Breakfast Included':  ['breakfast', 'complimentary breakfast', 'free breakfast'],
  'Good Food':           ['food', 'tasty', 'delicious', 'recommend', 'excellent', 'amazing'],
  'Value for Money':     ['value', 'affordable', 'worth', 'money', 'price', 'budget', 'reasonable'],
  // ── Legacy tags ──────────────────────────────────────────────────────────
  'Near Temple':         ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram'],
  'Near Bus Stand':      ['bus stand', 'bus station', 'setc', 'bus terminus'],
  'Parking':             ['parking', 'car park', 'valet', 'garage'],
  'Heritage':            ['heritage', 'historical', 'palace', 'colonial', 'traditional', 'fort'],
  'Swimming Pool':       ['pool', 'swimming pool', 'swim'],
  'Sea View':            ['sea view', 'ocean view', 'beach view', 'sea facing'],
  'River View':          ['river view', 'riverside', 'waterfront'],
  'Family Friendly':     null,
  'Business':            null,
  'Rooftop':             null,
  'Luxury':              null,
  'Pure Veg Hotel':      ['pure veg', 'veg only', 'vegetarian only', 'sattvic'],
  'Pilgrim Friendly':    ['pilgrim', 'darshan', 'devotee', 'religious'],
  'Temple View':         ['temple view', 'big temple view', 'gopuram view'],
  'Power Backup':        ['generator', 'inverter', 'power backup'],
  '24hr Front Desk':     ['24 hour', '24/7', 'round the clock', 'front desk'],
};

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-TAG HOTEL SYSTEM
// Landmark coordinates for Group A (location-anchor) tags — used for
// coordinate-based distance verification instead of keyword guessing.
// ─────────────────────────────────────────────────────────────────────────────
const CITY_LANDMARKS: Record<string, Array<{ tags: string[]; lat: number; lng: number; label: string }>> = {
  thanjavur: [
    { tags: ['Near Temple', 'Near Big Temple', 'Temple View'], lat: 10.7827, lng: 79.1317, label: 'Big Temple' },
    { tags: ['Near Railway Station'],       lat: 10.7862, lng: 79.1329, label: 'Railway Station' },
    { tags: ['Near Bus Stand'],             lat: 10.7796, lng: 79.1468, label: 'Bus Stand' },
    { tags: ['Near Palace'],                lat: 10.7819, lng: 79.1308, label: 'Thanjavur Palace' },
    { tags: ['Near Market', 'City Centre', 'Central & Walkable'], lat: 10.7855, lng: 79.1388, label: 'City Centre' },
  ],
  kumbakonam: [
    { tags: ['Near Temple'],                                      lat: 10.9602, lng: 79.3845, label: 'Kumbeswarar Temple' },
    { tags: ['Near Railway Station'],                             lat: 10.9598, lng: 79.3730, label: 'Kumbakonam Station' },
    { tags: ['Near Bus Stand'],                                   lat: 10.9620, lng: 79.3760, label: 'Bus Stand' },
    { tags: ['Near Market', 'City Centre', 'Central & Walkable'], lat: 10.9610, lng: 79.3800, label: 'Town Hall' },
  ],
};

// Haversine distance in km
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// Keywords used to score/verify each tag from review/address/name text.
// New 5×5 matrix derived from real review keyword analysis (50 hotels, 250 reviews).
// Legacy tag names kept for backward-compat with SMART_PICKS quick-override paths.
const TAG_TEXT_KEYWORDS: Record<string, string[]> = {
  // ── Cleanliness & Hygiene ─────────────────────────────────────────────────
  'Spotlessly Clean':    ['clean', 'cleaning', 'cleanliness', 'spotless', 'spotlessly', 'immaculate', 'hygienic', 'hygiene', 'sanitized', 'sanitary'],
  'Well Maintained':     ['maintained', 'well-maintained', 'maintenance', 'neat', 'tidy', 'neatly'],
  'Fresh Rooms':         ['fresh', 'odour', 'smell', 'odor', 'bathroom', 'toilet', 'shower', 'towels', 'bath'],
  // ── Location & Access ────────────────────────────────────────────────────
  'Near Big Temple':     ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram'],
  'Near Railway Station':['railway station', 'railway', 'junction', 'station road'],
  'Central & Walkable':  ['city centre', 'main road', 'central', 'town centre', 'walk', 'walkable', 'walking distance', 'minutes away', 'nearby', 'convenient'],
  'City Centre':         ['city', 'centre', 'central', 'city center', 'town', 'main road', 'heart of', 'prime location'],
  'Easy Parking':        ['parking', 'car park', 'valet', 'garage', 'bike parking'],
  'Walkable Distance':   ['walk', 'walking', 'walkable', 'nearby', 'close to', 'minutes walk', 'walking distance'],
  'Quiet & Peaceful':    ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free', 'peaceful stay'],
  'Budget-Friendly':     ['budget', 'affordable', 'cheap', 'economical', 'inexpensive', 'low cost', 'lodge'],
  'Prompt Service':      ['prompt', 'quick service', 'fast service', 'responsive', 'smooth', 'efficient'],
  'Good Hospitality':    ['hospitality', 'welcoming', 'warm', 'courteous', 'polite', 'hospitable', 'heartwarming'],
  'Highly Recommended':  ['recommend', 'recommended', 'must stay', 'must visit', 'excellent', 'best', 'outstanding'],
  // ── Staff & Hospitality ───────────────────────────────────────────────────
  'Friendly & Helpful':  ['friendly', 'warm', 'warmth', 'welcoming', 'hospitable', 'helpful', 'attentive', 'cooperative', 'caring', 'supportive'],
  'Warm Hospitality':    ['courteous', 'polite', 'professional', 'respectful', 'well-behaved', 'hospitality', 'heartwarming', 'outstanding service', 'teamwork'],
  'Quick Response':      ['prompt', 'promptly', 'quick', 'smooth check', 'responsive', 'fast service'],
  // ── Room & Comfort ────────────────────────────────────────────────────────
  'Spacious Rooms':      ['spacious', 'large room', 'big room', 'roomy', 'good space'],
  'Comfortable & Quiet': ['comfortable', 'comfort', 'comfortably', 'cozy', 'cosi', 'quiet', 'peaceful', 'calm', 'serene', 'noise-free', 'peaceful stay'],
  'Good Amenities':      ['amenities', 'wifi', 'internet', 'lift', 'pool', 'facilities', 'generator'],
  'In-House Restaurant': ['restaurant', 'dining', 'dining hall', 'meals', 'food court'],
  // ── Food & Value ─────────────────────────────────────────────────────────
  'Breakfast Included':  ['breakfast included', 'complimentary breakfast', 'free breakfast', 'breakfast provided'],
  'Good Food':           ['food', 'tasty', 'delicious', 'good food', 'fresh food', 'recommend', 'recommended', 'excellent', 'amazing', 'wonderful', 'must visit'],
  'Value for Money':     ['value for money', 'affordable', 'worth', 'good value', 'money', 'price', 'budget', 'reasonable', 'economical', 'decent price'],
  // ── Legacy tags — kept for SMART_PICKS / TRENDING_OVERRIDES paths ────────
  'Near Temple':          ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram'],
  'Near Bus Stand':       ['bus stand', 'bus station', 'setc', 'bus terminus'],
  'Near Palace':          ['palace', 'maratha', 'durbar', 'royal'],
  'Near Market':          ['market', 'bazaar', 'main road', 'main street'],
  'Parking':              ['parking', 'car park', 'valet', 'garage', 'bike parking'],
  'Heritage':             ['heritage', 'historical', 'traditional', 'colonial', 'fort', 'vintage'],
  'Budget Stay':          ['budget', 'affordable', 'cheap', 'economical', 'value for money', 'lodge'],
  'Breakfast Included_legacy': ['breakfast included', 'complimentary breakfast', 'free breakfast'],
  'Family Friendly':      ['family', 'families', 'kids', 'children', 'family room'],
  'Swimming Pool':        ['swimming pool', 'pool', 'swim'],
  'Rooftop Access':       ['rooftop', 'terrace', 'top floor', 'roof top'],
  'Power Backup':         ['generator', 'inverter', 'power backup', 'backup power'],
  '24hr Front Desk':      ['24 hour', '24/7', 'round the clock', 'front desk', '24hrs'],
  'Pure Veg Hotel':       ['pure veg', 'veg only', 'vegetarian only', 'sattvic', 'pure vegetarian'],
  'Pilgrim Friendly':     ['pilgrim', 'darshan', 'devotee', 'religious', 'pooja', 'sattvic'],
  'Temple View':          ['temple view', 'big temple view', 'view of temple', 'gopuram view'],
};

// ─────────────────────────────────────────────────────────────────────────────
// TAG SCORING SYSTEM — continuous 0.0–1.0 per tag
// Philosophy: tags RANK hotels, they never exclude. Every hotel always gets a
// score for every tag. 0.3 = unknown/no data (neutral). 0.0 = confirmed absent.
// 1.0 = GPS/API-boolean confirmed present.
// ─────────────────────────────────────────────────────────────────────────────

interface TagScoreResult {
  allTagScores: Record<string, number>;  // 0-1 for every known tag
  matchedTags:   string[];               // selected tags with score >= 0.60
  confirmedTags: string[];               // selected tags with score >= 0.85
  tagEvidence:   Record<string, string>;
  tagSnippets:   Record<string, string>;
  matchScore:    number;                 // 0-1 avg of selected tag scores (1.0 if no tags)
}

function scoreAllTagsForHotel(place: any, selectedTags: string[], cityKey: string): TagScoreResult {
  const lat       = place.location?.latitude  as number | undefined;
  const lng       = place.location?.longitude as number | undefined;
  const name      = (place.displayName?.text    ?? '').toLowerCase();
  const addr      = (place.formattedAddress     ?? '').toLowerCase();
  const editorial = (place.editorialSummary?.text ?? '').toLowerCase();
  const reviews   = (place.reviews ?? []).slice(0, 5) as any[];
  const revText   = reviews.map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
  const allText   = `${name} ${addr} ${editorial} ${revText}`;
  const priceLevel = place.priceLevel ?? '';
  const rating     = place.rating ?? 0;
  const landmarks  = CITY_LANDMARKS[cityKey] ?? CITY_LANDMARKS['thanjavur'] ?? [];

  const allTagScores: Record<string, number> = {};
  const tagEvidence:  Record<string, string> = {};
  const tagSnippets:  Record<string, string> = {};

  // Raw hit count (for non-review corpus like name/address)
  const countHits = (corpus: string, kws: string[]): number =>
    kws.filter(k => corpus.includes(k)).length;

  // Star-weighted + recency-decay hit count.
  // 4-5★ reviews count fully; 3★ = 0.4; 1-2★ = 0 (negative context, avoid "the food was terrible").
  // Recency multiplier: reviews from ≤3 months ago score 30% higher; >12 months ago score 40% of face value.
  // This means a fresh 5★ review mentioning "clean" outweighs three old 5★ mentions.
  const countWeightedHits = (kws: string[]): number => {
    const now = Date.now();
    let score = 0;
    for (const rev of reviews) {
      const rt        = (rev.text?.text ?? '').toLowerCase();
      const stars     = rev.rating ?? 3;
      const starW     = stars >= 4 ? 1.0 : stars === 3 ? 0.4 : 0.0;
      const published = rev.publishTime ? new Date(rev.publishTime).getTime() : 0;
      const ageMo     = published > 0 ? (now - published) / 2592000000 : 12; // 2592000000 = 30d in ms
      const recencyW  = ageMo <= 3 ? 1.3 : ageMo <= 6 ? 1.0 : ageMo <= 12 ? 0.7 : 0.4;
      if (kws.some(k => rt.includes(k))) score += starW * recencyW;
    }
    return score;
  };

  // Find snippet only from 4-5★ reviews (positive evidence only)
  const findSnippet = (kws: string[]): string => {
    // Prefer positive reviews first
    const sorted = [...reviews].sort((a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0));
    for (const rev of sorted) {
      const rt  = rev.text?.text ?? '';
      const rl  = rt.toLowerCase();
      const kw  = kws.find(k => rl.includes(k));
      if (kw && (rev.rating ?? 0) >= 4) return extractSnippet(rt, kw, 70);
    }
    // Fallback to any review if no 4★+ match found
    for (const rev of reviews) {
      const rt  = rev.text?.text ?? '';
      const rl  = rt.toLowerCase();
      const kw  = kws.find(k => rl.includes(k));
      if (kw) return extractSnippet(rt, kw, 70);
    }
    return '';
  };

  // ── LOCATION TAGS — GPS distance (deterministic) ──────────────────────────
  const LOCATION_TAGS = [
    'Near Big Temple','Near Temple','Near Railway Station','Near Bus Stand',
    'City Centre','Central & Walkable','Walkable Distance','Near Palace','Near Market','Temple View',
  ];
  for (const tag of LOCATION_TAGS) {
    const lm = landmarks.find(l => l.tags.includes(tag));
    if (lm && lat !== undefined && lng !== undefined) {
      const dist = haversineKm(lat, lng, lm.lat, lm.lng);
      let score: number;
      if      (dist <= 1.5) { score = 1.0; tagEvidence[tag] = `${dist.toFixed(1)}km from ${lm.label} (GPS ✓)`; }
      else if (dist <= 2.5) { score = 0.8; tagEvidence[tag] = `${dist.toFixed(1)}km from ${lm.label}`; }
      else if (dist <= 4.0) { score = 0.5; tagEvidence[tag] = `${dist.toFixed(1)}km from ${lm.label}`; }
      else if (dist <= 7.0) { score = 0.15; tagEvidence[tag] = `${dist.toFixed(1)}km — not nearby`; }
      else                  { score = 0.0;  tagEvidence[tag] = `${dist.toFixed(1)}km — far`; }
      allTagScores[tag] = score;
      const snip = findSnippet(TAG_TEXT_KEYWORDS[tag] ?? []);
      if (snip) tagSnippets[tag] = snip;
    } else {
      // No GPS — keyword fallback
      const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
      const hits = countHits(allText, kws);
      allTagScores[tag] = hits >= 2 ? 0.6 : hits === 1 ? 0.4 : 0.2;
      if (hits > 0) {
        const kw = kws.find(k => allText.includes(k)) ?? '';
        tagEvidence[tag] = `"${kw}" in reviews`;
        const snip = findSnippet(kws);
        if (snip) tagSnippets[tag] = snip;
      }
    }
  }

  // ── PARKING / EASY PARKING — API boolean first ───────────────────────────
  const scoreParking = (() => {
    if (place.parkingOptions?.freeParkingLot === true)  return { score: 1.0, ev: 'Free parking (Google ✓)' };
    if (place.parkingOptions?.paidParkingLot === true)  return { score: 0.9, ev: 'Paid parking (Google ✓)' };
    if (place.parkingOptions && !place.parkingOptions.freeParkingLot && !place.parkingOptions.paidParkingLot)
                                                         return { score: 0.1, ev: 'No parking (Google ✓)' };
    const kws = TAG_TEXT_KEYWORDS['Easy Parking'] ?? [];
    const hits = countHits(allText, kws);
    return { score: hits >= 2 ? 0.85 : hits === 1 ? 0.60 : 0.05, ev: hits > 0 ? '"parking" in reviews' : '' };
  })();
  allTagScores['Easy Parking'] = scoreParking.score;
  allTagScores['Parking']      = scoreParking.score; // legacy alias
  if (scoreParking.ev) { tagEvidence['Easy Parking'] = scoreParking.ev; tagEvidence['Parking'] = scoreParking.ev; }
  const parkSnip = findSnippet(TAG_TEXT_KEYWORDS['Easy Parking'] ?? []);
  if (parkSnip) { tagSnippets['Easy Parking'] = parkSnip; tagSnippets['Parking'] = parkSnip; }

  // ── IN-HOUSE RESTAURANT — dineIn boolean ─────────────────────────────────
  const scoreRestaurant = (() => {
    if (place.dineIn === true)  return { score: 1.0, ev: 'Dine-in (Google ✓)' };
    if (place.dineIn === false) return { score: 0.0, ev: 'No dine-in' };
    const kws  = TAG_TEXT_KEYWORDS['In-House Restaurant'] ?? [];
    const hits = countHits(allText, kws);
    return { score: hits >= 2 ? 0.80 : hits === 1 ? 0.55 : 0.08, ev: hits > 0 ? '"restaurant/dining" in reviews' : '' };
  })();
  allTagScores['In-House Restaurant'] = scoreRestaurant.score;
  if (scoreRestaurant.ev) tagEvidence['In-House Restaurant'] = scoreRestaurant.ev;
  const restSnip = findSnippet(TAG_TEXT_KEYWORDS['In-House Restaurant'] ?? []);
  if (restSnip) tagSnippets['In-House Restaurant'] = restSnip;

  // ── CLEANLINESS TAGS — star-weighted (positive reviews only) ─────────────
  // 1 weighted hit = 0.45 (below 0.60 match threshold) — require 2+ mentions to qualify.
  // Prevents a single "clean" in one review from inflating the score.
  for (const tag of ['Spotlessly Clean', 'Well Maintained', 'Fresh Rooms'] as const) {
    const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
    const hits = countWeightedHits(kws);
    allTagScores[tag] = hits >= 3 ? 0.95 : hits >= 2 ? 0.82 : hits >= 1 ? 0.45 : hits >= 0.4 ? 0.30 : 0.10;
    if (hits > 0) { tagEvidence[tag] = `"${kws[0]}" ×${hits.toFixed(1)} in positive reviews`; const s = findSnippet(kws); if (s) tagSnippets[tag] = s; }
  }

  // ── STAFF & HOSPITALITY TAGS — star-weighted ──────────────────────────────
  // 1 weighted hit = 0.45 — require 2+ reviewer mentions to confirm "friendly/warm/quick".
  for (const tag of ['Friendly & Helpful', 'Warm Hospitality', 'Quick Response'] as const) {
    const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
    const hits = countWeightedHits(kws);
    allTagScores[tag] = hits >= 3 ? 0.95 : hits >= 2 ? 0.82 : hits >= 1 ? 0.45 : hits >= 0.4 ? 0.30 : 0.10;
    if (hits > 0) { tagEvidence[tag] = `"${kws[0]}" ×${hits.toFixed(1)} in positive reviews`; const s = findSnippet(kws); if (s) tagSnippets[tag] = s; }
  }

  // ── ROOM & COMFORT TAGS — star-weighted ───────────────────────────────────
  for (const tag of ['Spacious Rooms', 'Comfortable & Quiet', 'Good Amenities'] as const) {
    const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
    const hits = countWeightedHits(kws);
    allTagScores[tag] = hits >= 3 ? 0.95 : hits >= 2 ? 0.82 : hits >= 1 ? 0.45 : hits >= 0.4 ? 0.30 : 0.10;
    if (hits > 0) { tagEvidence[tag] = `"${kws[0]}" ×${hits.toFixed(1)} in positive reviews`; const s = findSnippet(kws); if (s) tagSnippets[tag] = s; }
  }
  // Good Amenities — boolean boost on top of keyword score (each is an independent facility signal)
  {
    let boost = 0; const boostEv: string[] = [];
    if (place.outdoorSeating === true) { boost += 0.15; boostEv.push('outdoor seating'); }
    if (place.goodForGroups === true)  { boost += 0.10; boostEv.push('good for groups'); }
    if (place.liveMusic === true)      { boost += 0.10; boostEv.push('live music'); }
    if (boost > 0) {
      allTagScores['Good Amenities'] = Math.min((allTagScores['Good Amenities'] ?? 0.10) + boost, 1.0);
      tagEvidence['Good Amenities'] = [tagEvidence['Good Amenities'], `${boostEv.join(', ')} (Google ✓)`].filter(Boolean).join(' + ');
    }
  }

  // ── FOOD & VALUE TAGS — star-weighted ────────────────────────────────────
  {
    const bkws  = TAG_TEXT_KEYWORDS['Breakfast Included'] ?? [];
    const bhits = countWeightedHits(bkws);
    // servesBreakfast boolean is ground-truth; keywords confirm it's complimentary
    if (place.servesBreakfast === true) {
      const kwBoost = bhits >= 1 ? 0.15 : 0;
      allTagScores['Breakfast Included'] = Math.min(0.80 + kwBoost, 1.0);
      tagEvidence['Breakfast Included'] = bhits >= 1
        ? 'Serves breakfast (Google ✓) + review confirms'
        : 'Serves breakfast (Google ✓)';
    } else {
      allTagScores['Breakfast Included'] = bhits >= 2 ? 0.92 : bhits >= 1 ? 0.72 : bhits >= 0.4 ? 0.50 : 0.05;
      if (bhits > 0) tagEvidence['Breakfast Included'] = `"breakfast" ×${bhits.toFixed(1)} in positive reviews`;
    }
    const s = findSnippet(bkws); if (s) tagSnippets['Breakfast Included'] = s;
  }
  for (const tag of ['Good Food', 'Value for Money'] as const) {
    const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
    const hits = countWeightedHits(kws);
    allTagScores[tag] = hits >= 3 ? 0.95 : hits >= 2 ? 0.82 : hits >= 1 ? 0.45 : hits >= 0.4 ? 0.30 : 0.10;
    if (hits > 0) { tagEvidence[tag] = `"${kws[0]}" ×${hits.toFixed(1)} in positive reviews`; const s = findSnippet(kws); if (s) tagSnippets[tag] = s; }
  }
  // servesDessert boolean boosts Good Food — confirmed food offering signal
  if (place.servesDessert === true) {
    allTagScores['Good Food'] = Math.min((allTagScores['Good Food'] ?? 0.10) + 0.15, 1.0);
    tagEvidence['Good Food'] = [tagEvidence['Good Food'], 'serves dessert (Google ✓)'].filter(Boolean).join(' + ');
  }

  // ── LEGACY TAGS — scored for SMART_PICKS / TRENDING_OVERRIDES paths ──────
  {
    // Budget Stay
    let bScore = 0.3; let bEv = '';
    if (priceLevel === 'PRICE_LEVEL_INEXPENSIVE' || priceLevel === 'PRICE_LEVEL_FREE') { bScore = 1.0; bEv = 'Budget tier (Google ✓)'; }
    else if (priceLevel === 'PRICE_LEVEL_MODERATE') { bScore = 0.25; bEv = 'Mid-range'; }
    else if (priceLevel === 'PRICE_LEVEL_EXPENSIVE' || priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE') { bScore = 0.0; bEv = 'Premium — not budget'; }
    else {
      const nameSig = /lodge|budget|economy|residency|inn\b|cheap|affordable/i.test(name) ? 0.25 : 0;
      const rateSig = rating <= 3.5 ? 0.2 : rating <= 4.0 ? 0.1 : 0;
      const hits    = countHits(revText, TAG_TEXT_KEYWORDS['Budget Stay'] ?? []);
      bScore = Math.min(0.3 + nameSig + rateSig + hits * 0.1, 0.85);
      bEv    = nameSig > 0 ? 'Budget name signals' : hits > 0 ? `"budget" ×${hits}` : '';
    }
    allTagScores['Budget Stay'] = bScore; if (bEv) tagEvidence['Budget Stay'] = bEv;
    // Mirror to Fair Price if not already set higher
    if (!allTagScores['Fair Price'] || allTagScores['Fair Price'] < bScore) allTagScores['Fair Price'] = Math.min(bScore, 0.85);
  }
  {
    // Heritage
    const nameH = /heritage|palace|fort|colonial|traditional|haveli|historical/i.test(name + ' ' + editorial);
    const kws   = TAG_TEXT_KEYWORDS['Heritage'] ?? [];
    const hits  = countHits(allText, kws);
    allTagScores['Heritage'] = nameH ? 0.95 : hits >= 2 ? 0.65 : hits === 1 ? 0.45 : 0.2;
    tagEvidence['Heritage'] = nameH ? 'Heritage — name confirmed' : hits > 0 ? `"heritage" ×${hits}` : 'Not mentioned';
    const snip = findSnippet(kws); if (snip) tagSnippets['Heritage'] = snip;
  }
  for (const tag of ['Pilgrim Friendly', 'Pure Veg Hotel', 'Swimming Pool', 'Rooftop Access', 'Power Backup', '24hr Front Desk', 'Temple View'] as const) {
    const kws  = TAG_TEXT_KEYWORDS[tag] ?? [];
    const hits = countHits(tag === 'Pure Veg Hotel' ? allText : revText, kws);
    const base = tag === 'Swimming Pool' || tag === 'Temple View' ? (hits >= 1 ? 0.95 : 0.02)
               : tag === 'Pure Veg Hotel' ? (place.servesVegetarianFood === true && hits >= 1 ? 1.0 : hits >= 2 ? 0.85 : hits === 1 ? 0.65 : place.servesVegetarianFood === true ? 0.45 : 0.03)
               : (hits >= 2 ? 0.9 : hits === 1 ? 0.7 : 0.08);
    allTagScores[tag] = base;
    if (hits > 0) { tagEvidence[tag] = `"${kws[0]}" ×${hits} in reviews`; const s = findSnippet(kws); if (s) tagSnippets[tag] = s; }
  }
  // ── FAMILY FRIENDLY — boolean-first (menuForChildren / goodForChildren / goodForGroups) ──
  {
    const kws  = TAG_TEXT_KEYWORDS['Family Friendly'] ?? [];
    const hits = countHits(revText, kws);
    let score: number; let ev = '';
    if (place.menuForChildren === true || place.goodForChildren === true) {
      score = 1.0; ev = 'Family friendly (Google ✓)';
    } else if (place.goodForGroups === true) {
      score = hits >= 1 ? 0.90 : 0.75; ev = 'Good for groups (Google ✓)';
    } else {
      score = hits >= 2 ? 0.90 : hits === 1 ? 0.70 : 0.08;
      if (hits > 0) ev = `"${kws[0]}" ×${hits} in reviews`;
    }
    allTagScores['Family Friendly'] = score;
    if (ev) tagEvidence['Family Friendly'] = ev;
    const s = findSnippet(kws); if (s) tagSnippets['Family Friendly'] = s;
  }

  // ── Derive matched/confirmed from selected tags only ─────────────────────
  const matchedTags   = selectedTags.filter(t => (allTagScores[t] ?? 0.3) >= 0.60);
  const confirmedTags = selectedTags.filter(t => (allTagScores[t] ?? 0.3) >= 0.85);

  // matchScore = avg of selected tag scores (1.0 when no tags — no filter active)
  const matchScore = selectedTags.length > 0
    ? selectedTags.reduce((sum, t) => sum + (allTagScores[t] ?? 0.3), 0) / selectedTags.length
    : 1.0;

  return { allTagScores, matchedTags, confirmedTags, tagEvidence, tagSnippets, matchScore };
}


interface ScoredHotel {
  place:        any;
  allTagScores: Record<string, number>;
  matchedTags:  string[];
  confirmedTags:string[];
  tagEvidence:  Record<string, string>;
  tagSnippets:  Record<string, string>;
  matchScore:   number;  // 0-1 avg of selected tag scores
}

// Tags RANK hotels — they never exclude.
// 4-signal composite: relevancy(40%) + recentQuality(30%) + trend(20%) + insight(10%)
// Always returns the full pool — guarantees results even when 0 tags match.
function rankByTagScores(pool: ScoredHotel[]): ScoredHotel[] {
  const composite = (h: ScoredHotel): number => {
    const rating  = h.place.rating ?? 0;
    const reviews = h.place.userRatingCount ?? 0;
    // recentQuality: rating scaled 0–1 × log-normalised review volume (more reviews = more trusted)
    const recentQuality = Math.min(rating / 5, 1) * Math.min(Math.log10(Math.max(reviews, 1)) / 3.5, 1);
    return h.matchScore                               * 0.40
         + recentQuality                              * 0.30
         + computeTrendScore(h.place)                 * 0.20
         + computeInsightScore(h.place, 'Hotels')     * 0.10;
  };
  return [...pool].sort((a, b) => {
    const diff = composite(b) - composite(a);
    if (Math.abs(diff) > 0.01) return diff;
    // Tiebreak: more GPS/API-confirmed tags first, then raw rating
    const cd = b.confirmedTags.length - a.confirmedTags.length;
    if (cd !== 0) return cd;
    return (b.place.rating ?? 0) - (a.place.rating ?? 0);
  });
}

// Hotel tag → search query modifier (used for Places API query building)
const HOTEL_TAG_SEARCH: Record<string, string> = {
  // ── Active 17 merged base tags ────────────────────────────────────────────
  'Spotlessly Clean':    'clean hotel neat well maintained hygienic sanitary',
  'Well Maintained':     'hotel well maintained neat tidy maintenance',
  'Fresh Rooms':         'hotel fresh rooms clean odour free bathroom',
  'Near Big Temple':     'hotel near temple brihadeeswarar big temple',
  'Near Railway Station':'hotel near railway station junction',
  'Central & Walkable':  'hotel city centre main road central walkable convenient nearby',
  'Easy Parking':        'hotel with parking car park free parking',
  'Friendly & Helpful':  'hotel friendly helpful staff warm welcoming attentive',
  'Warm Hospitality':    'hotel hospitality courteous polite professional service',
  'Quick Response':      'hotel quick response smooth check-in prompt',
  'Spacious Rooms':      'hotel spacious rooms large comfortable roomy',
  'Comfortable & Quiet': 'comfortable quiet peaceful hotel cozy calm serene',
  'Good Amenities':      'hotel amenities wifi lift pool facilities',
  'In-House Restaurant': 'hotel with restaurant dining meals',
  'Breakfast Included':  'hotel complimentary breakfast free morning meal',
  'Good Food':           'hotel good food tasty delicious recommended excellent',
  'Value for Money':     'hotel value for money affordable worth reasonable price budget',
  // ── Legacy — backward-compat split names ─────────────────────────────────
  'Hygienic':            'hygienic hotel clean sanitary',
  'Fresh Rooms_old':     'hotel fresh rooms clean odour free',
  'Clean Bathrooms':     'hotel clean bathroom shower towels',
  'City Centre':         'hotel Thanjavur central area main road',
  'Walkable Distance':   'hotel walkable distance Thanjavur nearby',
  'Quiet & Peaceful':    'quiet peaceful hotel Thanjavur calm serene',
  'Budget-Friendly':     'cheapest hotel Thanjavur budget affordable',
  'Prompt Service':      'hotel quick service Thanjavur efficient',
  'Good Hospitality':    'best service hotel Thanjavur hospitality welcoming',
  'Highly Recommended':  'most recommended hotel Thanjavur excellent',
  'Walkable Area':       'hotel walkable location convenient nearby',
  'Friendly Staff':      'hotel friendly staff warm welcoming',
  'Helpful Team':        'hotel helpful staff attentive service',
  'Courteous Service':   'hotel courteous polite professional staff',
  'Great Hospitality':   'hotel hospitality excellent service',
  'Comfortable Stay':    'comfortable hotel cozy rooms',
  'Fair Price':          'hotel reasonable price budget economical',
  // ── Legacy — backward-compat for SMART_PICKS / TRENDING_OVERRIDES ────────
  'Near Temple':         'hotel near temple brihadeeswarar',
  'Near Bus Stand':      'hotel near bus stand terminal',
  'Near Palace':         'hotel near palace maratha',
  'Near Market':         'hotel near market bazaar',
  'Parking':             'hotel with parking',
  'Heritage':            'heritage historical hotel traditional',
  'Budget Stay':         'budget affordable economy hotel lodge',
  'Family Friendly':     'family hotel children spacious rooms',
  'Business':            'business corporate executive hotel',
  'Luxury':              'luxury premium five star hotel',
  'Rooftop':             'rooftop hotel terrace',
  'Pool':                'hotel swimming pool',
  'Swimming Pool':       'hotel with swimming pool',
  'Sea View':            'sea view beach hotel',
  'River View':          'river view hotel waterfront',
  'Pilgrim Friendly':    'hotel pilgrim darshan temple town',
  'Pure Veg Hotel':      'pure veg hotel vegetarian only',
  'Temple View':         'hotel temple view room gopuram',
  'Power Backup':        'hotel generator power backup',
  '24hr Front Desk':     'hotel 24 hour reception front desk',
};

// Hotel price range → extra query keyword so Places returns price-relevant results
const HOTEL_PRICE_QUERY: Record<string, string> = {
  '₹1K-5K':                 'budget lodge cheap affordable economy',
  '₹5K-10K':                'standard mid-range hotel',
  '₹15K+':                  'luxury premium star hotel',
  'PRICE_LEVEL_INEXPENSIVE': 'budget lodge cheap affordable economy',
  'PRICE_LEVEL_MODERATE':    'standard mid-range hotel',
  'PRICE_LEVEL_EXPENSIVE':   'luxury premium star hotel',
};

// Resolve the effective tag list — hotelTags[] takes priority over legacy hotelTag
function resolveHotelTags(filters: UserFilters): string[] {
  if (filters.hotelTags && filters.hotelTags.length > 0) return filters.hotelTags.slice(0, 2);
  if (filters.hotelTag) return [filters.hotelTag];
  return [];
}

function buildHotelQuery(filters: UserFilters): string {
  const city    = filters.city ?? 'Thanjavur';
  const state   = getCityState(city);
  const tags    = resolveHotelTags(filters);
  const priceKw = (filters.priceFilter && filters.priceFilter !== 'Any')
    ? (HOTEL_PRICE_QUERY[filters.priceFilter] ?? '') : '';

  // Combine ALL selected tag terms into one query — Google ranks by combined intent
  // Dedup words across tags so query stays clean (e.g., "hotel" appears only once)
  const tagWords = new Set<string>();
  tagWords.add('hotel');
  for (const tag of tags) {
    const term = HOTEL_TAG_SEARCH[tag] ?? tag.toLowerCase();
    for (const w of term.split(/\s+/)) if (w.length > 2) tagWords.add(w);
  }
  const tagTerm = [...tagWords].join(' ');

  if (filters.hotelArea) {
    return `${priceKw} ${tagTerm} near ${filters.hotelArea} ${city} ${state}`.replace(/\s+/g, ' ').trim();
  }
  if (tags.length > 0) {
    return `${priceKw} ${tagTerm} in ${city} ${state}`.replace(/\s+/g, ' ').trim();
  }
  return `${priceKw} hotels in ${city} ${state}`.replace(/\s+/g, ' ').trim();
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

// ─────────────────────────────────────────────────────────────────────────────
// TREND SCORE — review velocity + rating momentum + volume bonus
// Uses publishTime (ISO string) returned as part of places.reviews object.
// Returns 0–1: 0.3 = neutral/no data, >0.5 = trending up, <0.2 = slowing.
// ─────────────────────────────────────────────────────────────────────────────
function computeTrendScore(place: any): number {
  const reviews = (place.reviews ?? []) as any[];
  if (reviews.length === 0) return 0.3;

  // With < 3 reviews the velocity signal is pure noise — return volume-only estimate
  if (reviews.length < 3) {
    const volumeBonus = Math.min(Math.log10(Math.max(place.userRatingCount ?? 1, 1)) / 4, 0.25);
    return Math.min(volumeBonus * 0.2 + 0.15, 0.35);
  }

  const now    = Date.now();
  const MS_3M  = 90  * 24 * 3600 * 1000;
  const MS_6M  = 180 * 24 * 3600 * 1000;

  let recent = 0, semiRecent = 0, recentRatingSum = 0;
  for (const r of reviews) {
    const published = r.publishTime ? new Date(r.publishTime).getTime() : 0;
    const age       = published > 0 ? now - published : now; // treat unknown as old
    if (age < MS_3M) { recent++;     recentRatingSum += r.rating ?? 3; }
    if (age < MS_6M)   semiRecent++;
  }

  // Fraction of reviews that landed in the last 3 months — high = actively visited
  const velocity = recent / reviews.length;

  // Are recent reviewers rating higher (+) or lower (−) than the historical average?
  const recentAvgRating = recent > 0 ? recentRatingSum / recent : (place.rating ?? 3);
  const momentum        = Math.max(-0.5, Math.min(0.5, (recentAvgRating - (place.rating ?? 3)) / 2));

  // Volume bonus: log-scale on total review count (capped at 0.25)
  const volumeBonus = Math.min(Math.log10(Math.max(place.userRatingCount ?? 1, 1)) / 4, 0.25);

  return Math.min(Math.max(velocity * 0.5 + momentum * 0.3 + volumeBonus * 0.2 + 0.1, 0), 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHT SCORE — wires computeBuckets() into a 0–1 quality signal
// Hotels weight hygiene + service + quality + value
// Food weights taste + quality + service + ambience
// Each bucket capped at 3 keyword hits before normalising so no single bucket
// dominates (a review corpus mentioning "clean" 20 times ≠ 20× more hygienic).
// ─────────────────────────────────────────────────────────────────────────────
function computeInsightScore(place: any, tab: string): number {
  const buckets = computeBuckets(place.reviews ?? []);
  const keys    = tab === 'Hotels'
    ? ['hygiene', 'service', 'quality', 'value']
    : ['taste', 'quality', 'service', 'ambience'];
  const sum = keys.reduce((s, k) => s + Math.min(buckets[k] ?? 0, 3), 0);
  return Math.min(sum / (keys.length * 3), 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter reviews older than MAX_DISPLAY_AGE_YEARS from UI display.
// Falls back to all reviews if fewer than 2 recent ones exist, so cards never go empty.
const MAX_DISPLAY_AGE_MS = 6 * 30.4375 * 24 * 3600 * 1000; // 6 months

function filterReviewsForDisplay(reviews: any[]): any[] {
  const now = Date.now();
  const recent = reviews.filter(r => {
    if (!r.publishTime) return true;
    return (now - new Date(r.publishTime).getTime()) < MAX_DISPLAY_AGE_MS;
  });
  return recent.length >= 2 ? recent : reviews;
}

// REVIEW SORT — unified sort used for all UI review display and Gemini context.
// Priority: (1) keyword evidence match, (2) star rating ≥4, (3) recency (newest
// first via publishTime), (4) text length as final tiebreak.
// Year-old reviews will never surface above a recent review at the same star level.
// ─────────────────────────────────────────────────────────────────────────────
function sortReviewsForDisplay(reviews: any[], matchKeywords: string[] = []): any[] {
  const now = Date.now();
  return [...reviews].sort((a: any, b: any) => {
    // 1. Keyword evidence match first (so the UI card shows proof of the tag)
    if (matchKeywords.length) {
      const aHas = matchKeywords.some(k => (a.text?.text ?? '').toLowerCase().includes(k));
      const bHas = matchKeywords.some(k => (b.text?.text ?? '').toLowerCase().includes(k));
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return  1;
    }
    // 2. Positive reviews (4-5★) before negative/neutral
    const aPos = (a.rating ?? 3) >= 4 ? 0 : 1;
    const bPos = (b.rating ?? 3) >= 4 ? 0 : 1;
    if (aPos !== bPos) return aPos - bPos;
    // 3. Most recent first
    const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0;
    const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0;
    if (Math.abs(bTime - aTime) > 7 * 24 * 3600 * 1000) return bTime - aTime; // >1 week difference → sort by date
    // 4. Longer text = more useful review (tiebreak for same week)
    return (b.text?.text?.length ?? 0) - (a.text?.text?.length ?? 0);
  });
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
  includedType?:   string;    // e.g. 'vegetarian_restaurant' — single place type restriction
  center?:         { latitude: number; longitude: number }; // city centre for locationBias
  noLocationBias?: boolean;   // skip locationBias entirely — lets Google's own spatial ranking handle "near X"
}

// Hotels/Food use locationBias (city-centred); filterThanjavurOnly enforces strict locality.
// Itinerary/Explore use larger radius with no locality guard.
async function fetchPlaces(
  query: string,
  searchSeed = 0,
  radiusKm = 15,
  opts: FetchOptions = {},
) {
  const { withPhotos = false, minRating = 0, priceLevels, openNow, includedType, center = DEFAULT_CENTER, noLocationBias = false } = opts;
  const rankPreference = SEED_RANK[searchSeed % 4] ?? 'RELEVANCE';
  const prefix         = SEED_PREFIX[searchSeed % 4] ?? '';

  // Cache key covers every param that affects the result
  const cacheKey = JSON.stringify({ query, searchSeed, radiusKm, withPhotos, minRating, priceLevels, openNow, includedType, noLocationBias, center });
  const cached = cacheLookup(cacheKey);
  if (cached) return cached;

  // noLocationBias: let Google's own spatial understanding handle the query (e.g. "near X")
  // Normal mode: city-centred locationBias so results stay in the right city
  const locationParam = noLocationBias ? {} : {
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
  if (priceLevels?.length)     body.priceLevels  = priceLevels;
  if (openNow === true)        body.openNow      = true;
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
  const places = data.places ?? [];
  cacheStore(cacheKey, places);
  return places;
}

// ─── Multi-query pool fetch ───────────────────────────────────────────────────
// Runs up to 5 query variants in parallel (each capped at 20 by the Places API),
// deduplicates by place.id, and returns up to `maxPool` unique candidates.
// Use for Hotels and Food to get ~80-100 candidates instead of 8-20.
interface PoolVariant {
  query:  string;
  seed:   number;
  opts?:  FetchOptions;
}
async function fetchPlacesPool(
  variants: PoolVariant[],
  maxPool = 100,
): Promise<any[]> {
  const results = await Promise.allSettled(
    variants.map(v => fetchPlaces(v.query, v.seed, 20, v.opts ?? {}))
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
      if (pool.length >= maxPool) return pool;
    }
  }
  return pool;
}

// When searchQuery looks like a name (e.g. "Hotel Tamilnadu", "Kannapa restaurant"),
// pin the best name-matching result to position #1 after Gemini re-ranking.
// Gemini optimises for quality — this ensures the place you searched for is always first.
function pinNameMatchToTop(places: any[], searchQuery: string): any[] {
  if (!searchQuery || places.length <= 1) return places;
  const q = searchQuery.toLowerCase().trim();
  const qWords = q.split(/\s+/).filter(w => w.length > 2 && !['hotel', 'restaurant', 'near', 'the', 'and', 'for'].includes(w));
  if (qWords.length === 0) return places;

  let bestIdx  = -1;
  let bestScore = 0;
  for (let i = 0; i < places.length; i++) {
    const name = (places[i].displayName?.text ?? '').toLowerCase();
    if (name.includes(q)) { bestIdx = i; bestScore = 1; break; } // exact substring — stop immediately
    const overlap = qWords.filter(w => name.includes(w)).length / qWords.length;
    if (overlap > bestScore) { bestScore = overlap; bestIdx = i; }
  }

  // Only pin if there's a meaningful name match (≥50% word overlap) and it's not already #1
  if (bestIdx <= 0 || bestScore < 0.5) return places;
  const pinned = places[bestIdx];
  return [pinned, ...places.filter((_, i) => i !== bestIdx)];
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
  // Keep city-only results as long as at least 1 matched — avoids re-admitting out-of-city places
  return inCity.length >= 1 ? inCity : places;
}

interface UserFilters {
  city?:          string;   // city name — used in queries and locationBias coords
  hotelTag?:      string;   // legacy single tag — kept for quick-override paths
  hotelTags?:     string[]; // multi-select tags (max 2) — takes priority over hotelTag
  hotelArea?:     string;   // free-text area within city — added to Places query
  foodTag?:       string;   // legacy single tag — kept for quick-override paths
  foodTags?:      string[]; // multi-select tags (max 2) — takes priority over foodTag
  priceFilter?:   string;   // 'Any' | PRICE_LEVEL_* — passed as priceLevels to Places API
  minRating?:     number;   // 0 = any — passed to Places API minRating
  openNow?:       boolean;  // passed as openNow to Places API
  dietType?:      string;   // 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg'
  dineMode?:      string;   // 'Any' | 'Dine-in' | 'Takeout' | 'Delivery'
  mealTime?:      string;   // 'Any' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Brunch'
  // ── New boolean filters — all backed by Places API boolean fields (100% accurate when set) ──
  outdoorSeating?: boolean; // places.outdoorSeating — outdoor seating available
  goodForGroups?:  boolean; // places.goodForGroups — suitable for group dining
  allowsDogs?:     boolean; // places.allowsDogs — pet friendly
  liveMusic?:      boolean; // places.liveMusic — live music venue
  servesBeer?:     boolean; // places.servesBeer — bar / pub filter
  servesWine?:     boolean; // places.servesWine — wine available
  reservable?:     boolean; // places.reservable — online/phone reservation available
  accessible?:     boolean; // places.accessibilityOptions.wheelchairAccessibleEntrance
  familyMenu?:     boolean; // places.menuForChildren — dedicated kids menu
  searchQuery?:    string;  // free-text override — bypasses tag-based query building
}

// Map UI food tags → Places API search query strings
const FOOD_TAG_SEARCH: Record<string, string> = {
  // ── Cuisine & Dish ────────────────────────────────────────────────────────
  'Biryani':        'biryani biriyani dum biryani restaurant',
  'Pure Veg':       'pure vegetarian veg restaurant',
  'Non-Veg':        'non veg chicken mutton fish restaurant',
  'South Indian':   'dosa idli sambar south indian restaurant',
  'Tiffin':         'tiffin center idli dosa vada breakfast restaurant',
  'Tiffin & Snacks':'tiffin snacks breakfast restaurant Thanjavur',
  'Fresh & Hot':    'fresh hot food restaurant Thanjavur',
  'Chettinad Style':'chettinad restaurant Thanjavur pepper kuzhambu',
  'Quick Service':  'fast service restaurant Thanjavur prompt',
  // ── Meal & Timing ────────────────────────────────────────────────────────
  'Lunch':          'lunch thali meals restaurant afternoon',
  'All Day':        'restaurant all day menu variety',
  'Dinner':         'dinner biryani night restaurant',
  'Snacks':         'snacks bajji chaat street food evening',
  'Breakfast':      'breakfast tiffin idli dosa morning restaurant',
  // ── Taste & Quality ──────────────────────────────────────────────────────
  'Delicious':      'delicious tasty restaurant thanjavur',
  'Fresh':          'fresh freshly cooked restaurant',
  'Spicy':          'spicy masala pepper restaurant',
  'Good Quantity':  'generous portions quantity restaurant',
  'Authentic':      'authentic traditional south indian restaurant',
  // ── Dining Experience ────────────────────────────────────────────────────
  'AC Dine-in':     'air conditioned restaurant dine in',
  'Friendly Staff': 'friendly staff service restaurant',
  'Family Dining':  'family restaurant dining comfortable seating',
  'Good Ambience':  'good ambience atmosphere restaurant',
  'Clean':          'clean hygienic restaurant',
  // ── Value & Price ─────────────────────────────────────────────────────────
  'Highly Rated':   'highly recommended restaurant thanjavur',
  'Value for Money':'value for money restaurant worth',
  'Good Portions':  'generous portions restaurant quantity',
  'Affordable':     'affordable cheap budget restaurant',
  'Top Pick':       'best restaurant popular local favourite',
  // ── Legacy — Dashboard preset overrides (other cities) ───────────────────
  'Thali/Meals':    'thali meals banana leaf restaurant',
  'Thali':          'thali meals banana leaf restaurant',
  'North Indian':   'paneer north indian naan roti restaurant tandoor',
  'Chettinad':      'chettinad restaurant pepper chicken kuzhambu',
  'Filter Coffee':  'filter coffee kaapi south indian cafe',
  'Buffet':         'buffet restaurant unlimited meals',
  'Cafe':           'cafe coffee filter coffee kaapi restaurant',
  'Street Food':    'street food chaat snacks local restaurant',
  'Seafood':        'seafood fish prawn crab restaurant',
  'Veg Biryani':    'veg biryani vegetable biryani restaurant',
  'Multi Cuisine':  'multi cuisine variety restaurant continental',
  // ── FOOD_ADVANCED dish quick-picks ───────────────────────────────────────
  'Dosa':           'dosa masala dosa south indian restaurant',
  'Idli':           'idli tiffin south indian restaurant',
  'Vada':           'vada vadai south indian restaurant',
  'Pongal':         'pongal south indian breakfast restaurant',
  'Parotta':        'parotta kothu parotta restaurant',
  'Paneer':         'paneer butter masala north indian restaurant',
  'Sweets':         'halwa payasam sweet shop dessert',
  'Mandi':          'mandi restaurant arabian',
  'Shawarma':       'shawarma chicken restaurant',
  'BBQ & Grills':   'barbeque grill tikka kebab restaurant',
  'Alfaham':        'alfaham chicken arabian restaurant',
  'Mutton':         'mutton restaurant non veg',
  'Chicken':        'chicken restaurant non veg',
  'Fish':           'fish meen restaurant non veg seafood',
  'Prawn':          'prawn masala seafood restaurant',
  'Crab':           'crab nandu seafood restaurant',
  'Butter Masala':  'butter masala paneer restaurant',
  'Sambar':          'sambar idli dosa south indian restaurant',
  'Noodles':         'noodles restaurant',
  'Soup':            'soup restaurant',
  // ── Dishes · Non-Veg ─────────────────────────────────────────────────────────
  'Mutton Biryani':  'mutton biryani restaurant',
  'Chicken Biryani': 'chicken biryani restaurant',
  'Fish Curry':      'fish curry meen kuzhambu restaurant',
};

// Meal time → search keyword map
const MEAL_TIME_QUERY: Record<string, string> = {
  'Breakfast': 'breakfast idli dosa tiffin morning coffee',
  'Lunch':     'lunch thali meals rice sambar afternoon',
  'Dinner':    'dinner restaurant night biryani',
};

function buildFoodQuery(filters: UserFilters): string {
  const city     = filters.city ?? 'Thanjavur';
  const state    = getCityState(city);
  const allTags  = (filters.foodTags && filters.foodTags.length > 0) ? filters.foodTags : (filters.foodTag ? [filters.foodTag] : []);

  // Combine ALL selected tag terms — dedup words so query stays clean
  const tagWords = new Set<string>();
  tagWords.add('restaurant');
  for (const tag of allTags) {
    if (FOOD_TAG_TYPES[tag]) {
      // Has an includedType — add the tag name itself as a search hint
      tagWords.add(tag.toLowerCase());
    } else {
      const term = FOOD_TAG_SEARCH[tag] ?? tag.toLowerCase();
      for (const w of term.split(/\s+/)) if (w.length > 2) tagWords.add(w);
    }
  }
  const tagTerm = allTags.length > 0 ? [...tagWords].join(' ') : 'restaurant';

  // Diet prefix — steers Places API toward relevant results (when includedType not active)
  const dietPfx = filters.dietType === 'Pure Veg' ? 'pure vegetarian only veg no non-veg '        :
                  filters.dietType === 'Veg'       ? 'vegetarian veg '                             :
                  filters.dietType === 'Non-Veg'   ? 'non vegetarian chicken mutton fish meat egg ' : '';

  // Meal time prefix
  const mealPfx = (filters.mealTime && filters.mealTime !== 'Any')
    ? (MEAL_TIME_QUERY[filters.mealTime] ?? '') + ' '
    : '';

  return `${mealPfx}${dietPfx}${tagTerm} in ${city} ${state}`.replace(/\s+/g, ' ').trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// HOTEL TIER CLASSIFIER
// Classifies any hotel into Budget / Standard / Premium using name + priceLevel
// + review keywords. Used as a hard post-fetch filter since most Tier-2 Indian
// hotels have no priceLevel set in Google — the API param alone is useless.
// ─────────────────────────────────────────────────────────────────────────────
const BUDGET_NAME_RE  = /\b(lodge|inn|residency|residencies|guest\s*house|dharma|comforts?|classic|rathna|kumaran|kumar|murugan|selvam|saravana|ganesh|balaji|subramani|raja\b|rani\b|lakshmi|vinayaga|mahalakshmi|annamalai|shanmuga|velmurugan|temple\s*inn|pilgrim)\b/i;
const PREMIUM_NAME_RE = /\b(grand|resort|palace|suite|suites|spa|international|tower|plaza|crown|imperial|royal\s*court|executive|elite|luxury|marriott|taj\b|hyatt|hilton|radisson|ibis|novotel|holiday\s*inn\s*express)\b/i;

function classifyHotelTier(place: any): 'Budget' | 'Standard' | 'Premium' {
  const name      = (place.displayName?.text ?? '').toLowerCase();
  const revText   = (place.reviews ?? []).map((r: any) => (r.text?.text ?? '')).join(' ').toLowerCase();
  const priceLevel = place.priceLevel ?? '';

  // Google priceLevel — authoritative when set
  if (priceLevel === 'PRICE_LEVEL_EXPENSIVE' || priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE') return 'Premium';
  if (priceLevel === 'PRICE_LEVEL_INEXPENSIVE')                                               return 'Budget';
  if (priceLevel === 'PRICE_LEVEL_MODERATE')                                                  return 'Standard';

  // Name patterns — highly reliable
  if (PREMIUM_NAME_RE.test(name)) return 'Premium';
  if (BUDGET_NAME_RE.test(name))  return 'Budget';

  // Review keyword signals
  const budgetHits  = ['affordable','cheap','budget','value for money','economical','pocket'].filter(k => revText.includes(k)).length;
  const premiumHits = ['luxury','premium','expensive','high end','star hotel','upscale','5 star','four star'].filter(k => revText.includes(k)).length;
  if (premiumHits >= 2) return 'Premium';
  if (budgetHits  >= 2) return 'Budget';

  return 'Standard';
}

// Map UI priceFilter value → tier label
function priceFilterToTier(pf: string): 'Budget' | 'Standard' | 'Premium' | null {
  if (pf === 'PRICE_LEVEL_INEXPENSIVE' || pf === '₹1K-5K' || pf === '₹') return 'Budget';
  if (pf === 'PRICE_LEVEL_MODERATE'    || pf === '₹5K-10K'|| pf === '₹₹') return 'Standard';
  if (pf === 'PRICE_LEVEL_EXPENSIVE'   || pf === '₹15K+'  || pf === '₹₹₹' || pf === '₹₹₹₹') return 'Premium';
  return null;
}

// Hotel price range buckets — kept for reference / Gemini context
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

// NOTE: 'biryani'/'biriyani' intentionally excluded — biryani is not exclusively non-veg.
// Non-veg biryani is caught by 'chicken', 'mutton', 'fish', 'prawn', 'egg' individually.
const NON_VEG_KEYWORDS = [
  'chicken', 'mutton', 'fish', 'prawn', 'crab', 'meat', 'egg',
  'seafood', 'pork', 'lamb', 'beef', 'non veg', 'nonveg', 'non-veg',
  'kebab', 'kabab', 'shawarma', 'mandi', 'grilled chicken', 'chicken curry',
  'fish curry', 'prawn curry', 'mutton curry', 'egg curry', 'barbeque',
  'barbecue', 'bbq', 'fried chicken', 'chicken rice', 'bone', 'liver',
];

// Name patterns that positively confirm a place is pure veg
// Removed 'saravana' (Saravana Chicken is non-veg), 'tiffin centre' (many serve egg),
// 'hot chips' (some outlets serve non-veg) — too risky as pure-veg signals
const PURE_VEG_NAME_SIGNALS = [
  'pure veg', 'veg only', 'vegetarian', 'bhavan', 'bhawan',
  'sweet shop', 'adyar', 'brahmin', 'sattvic', 'no non-veg',
  'veg restaurant', 'veg hotel', 'veg mess', 'veg biryani', 'veg house',
  'annapoorna', 'sree anand', 'udupi', 'anna bhavan',
  'saathvika', 'green restaurant', 'vegetable restaurant',
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
      // Hard-fail if Google confirms vegetarian-only
      if (place.servesVegetarianFood === true) {
        C.diet = { score: 0, weight: 3, hard: true };
      } else {
        // Count non-veg keywords — weight 4-5★ review mentions more heavily
        const nvName = NON_VEG_KEYWORDS.some(kw => nameText.includes(kw)) ? 4 : 0;
        const nvRevPositive = NON_VEG_KEYWORDS.filter(kw =>
          (place.reviews ?? []).some((r: any) => (r.rating ?? 0) >= 4 && (r.text?.text ?? '').toLowerCase().includes(kw))
        ).length;
        const nvRevAny = NON_VEG_KEYWORDS.filter(kw => revText.includes(kw)).length;
        const hits = nvName + nvRevPositive * 1.5 + nvRevAny * 0.5;
        C.diet = { score: Math.min(hits / 6, 1), weight: 3 };
      }
    } else if (f.dietType === 'Veg' || f.dietType === 'Pure Veg') {
      // API already filtered via includedType; score as signal for ranking richness
      const typeVeg = (place.types ?? []).includes('vegetarian_restaurant');
      const flagVeg = place.servesVegetarianFood;
      const nvHits  = NON_VEG_KEYWORDS.filter(kw => revText.includes(kw)).length;
      C.diet = { score: (typeVeg || flagVeg === true) ? 1 : nvHits >= 2 ? 0.1 : 0.6, weight: 2 };
    }

    // ── Meal Time — API booleans first, keyword fallback ─────────────────────
    // servesBreakfast/Lunch/Dinner are Places API booleans — 100% accurate when set.
    // Keyword scoring is the fallback for places where Google hasn't set the boolean.
    if (f.mealTime && f.mealTime !== 'Any') {
      const apiMealMap: Record<string, keyof typeof place> = {
        'Breakfast': 'servesBreakfast',
        'Lunch':     'servesLunch',
        'Dinner':    'servesDinner',
        'Brunch':    'servesBrunch',
      };
      const apiField = apiMealMap[f.mealTime];
      const apiVal   = apiField ? place[apiField] : undefined;

      if (apiVal === true) {
        // API confirms — perfect score, no guessing needed
        C.mealTime = { score: 1.0, weight: 2 };
      } else if (apiVal === false) {
        // API confirms NOT serving this meal — hard fail
        C.mealTime = { score: 0, weight: 2, hard: true };
      } else {
        // API has no data — fall back to keyword matching
        const kws  = MEAL_SCORE_KEYWORDS[f.mealTime] ?? [];
        const hits = kws.filter(kw => allText.includes(kw)).length;
        C.mealTime = { score: Math.min(0.35 + hits * 0.15, 0.85), weight: 2 };
      }
    }

    // ── Craving / Cuisine ─────────────────────────────────────────────────────
    // Use FOOD_TAG_KEYWORDS (rich synonym lists) not FOOD_TAG_SEARCH (short query strings)
    {
      const activeFoodTags = (f.foodTags?.length ?? 0) > 0 ? f.foodTags! : (f.foodTag ? [f.foodTag] : []);
      if (activeFoodTags.length > 0) {
        let tagsMatched = 0;
        for (const tag of activeFoodTags) {
          if (tag === 'Pure Veg') {
            // GBP boolean is ground truth — keyword matching alone misses non-veg places
            // that mention "veg options" in reviews. Use boolean as primary signal.
            // PURE_VEG_NAME_SIGNALS includes 'bhavan'/'bhawan' — catches "Shree Ariya Bhavan" pattern.
            const gbpConfirmed  = place.servesVegetarianFood === true;
            const typeConfirmed = (place.types ?? []).includes('vegetarian_restaurant');
            const nameMatch     = PURE_VEG_NAME_SIGNALS.some(s => nameText.includes(s));
            if (gbpConfirmed || typeConfirmed || nameMatch) tagsMatched++;
            continue;
          }
          if (tag === 'Non-Veg') {
            // GBP false = Google confirmed not-veg → strong non-veg signal
            const gbpNotVeg = place.servesVegetarianFood === false;
            const nvHits = NON_VEG_KEYWORDS.filter(kw => allText.includes(kw)).length;
            if (gbpNotVeg || nvHits >= 1) tagsMatched++;
            continue;
          }
          const kws = FOOD_TAG_KEYWORDS[tag] ?? (FOOD_TAG_SEARCH[tag] ?? tag.toLowerCase()).split(' ').filter(k => k.length > 3);
          // Count how many distinct reviews mention this tag — specialization signal
          const reviewTexts = (place.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase());
          const mentionCount = kws.reduce((sum: number, kw: string) => sum + reviewTexts.filter((rt: string) => rt.includes(kw)).length, 0);
          // Graded: 0=miss, 0.6=1-2 reviews, 0.8=3-4, 1.0=5+ (restaurant specializes in it)
          const tagScore = mentionCount === 0 ? 0 : mentionCount <= 2 ? 0.6 : mentionCount <= 4 ? 0.8 : 1.0;
          tagsMatched += tagScore;
        }
        // Score: fraction of selected tags that match — 1.0 if all match, 0 if none
        C.craving = { score: tagsMatched / activeFoodTags.length, weight: 2 };
      }
    }

    // ── Food Price ────────────────────────────────────────────────────────────
    if (f.priceFilter && f.priceFilter !== 'Any') {
      const allowedLvl = FOOD_PRICE_LEVEL_MAP[f.priceFilter] ?? [];
      const levelMatch = allowedLvl.includes(place.priceLevel ?? '');
      const kwScore    = scoreFoodCost(place.reviews ?? [], f.priceFilter);
      C.price = { score: levelMatch ? 1 : kwScore > 0 ? Math.min(kwScore / 3, 0.8) : 0.3, weight: 1 };
    }

    // ── Dine Mode — API booleans: dineIn, takeout, delivery ──────────────────
    if (f.dineMode && f.dineMode !== 'Any') {
      let apiVal: boolean | null | undefined;
      if      (f.dineMode === 'Dine-in')  apiVal = place.dineIn;
      else if (f.dineMode === 'Takeout')  apiVal = place.takeout;
      else if (f.dineMode === 'Delivery') apiVal = place.delivery;
      const score = apiVal === true ? 1 : apiVal === false ? 0 : 0.5;
      C.dineMode = { score, weight: 1, hard: apiVal === false };
    }

    // ── New API-boolean filters — 100% accurate when set, neutral when null ──

    if (f.outdoorSeating === true) {
      C.outdoor = { score: place.outdoorSeating === true ? 1 : place.outdoorSeating === false ? 0 : 0.4, weight: 1, hard: place.outdoorSeating === false };
    }
    if (f.goodForGroups === true) {
      C.groups = { score: place.goodForGroups === true ? 1 : place.goodForGroups === false ? 0 : 0.5, weight: 1, hard: place.goodForGroups === false };
    }
    if (f.allowsDogs === true) {
      C.dogs = { score: place.allowsDogs === true ? 1 : place.allowsDogs === false ? 0 : 0.4, weight: 1, hard: place.allowsDogs === false };
    }
    if (f.liveMusic === true) {
      C.music = { score: place.liveMusic === true ? 1 : place.liveMusic === false ? 0 : 0.3, weight: 1, hard: place.liveMusic === false };
    }
    if (f.servesBeer === true) {
      C.beer = { score: place.servesBeer === true ? 1 : place.servesBeer === false ? 0 : 0.3, weight: 1, hard: place.servesBeer === false };
    }
    if (f.servesWine === true) {
      C.wine = { score: place.servesWine === true ? 1 : place.servesWine === false ? 0 : 0.3, weight: 1, hard: place.servesWine === false };
    }
    if (f.reservable === true) {
      C.reservable = { score: place.reservable === true ? 1 : place.reservable === false ? 0 : 0.5, weight: 1, hard: place.reservable === false };
    }
    if (f.accessible === true) {
      const wca = place.accessibilityOptions?.wheelchairAccessibleEntrance;
      C.accessible = { score: wca === true ? 1 : wca === false ? 0 : 0.4, weight: 1, hard: wca === false };
    }
    if (f.familyMenu === true) {
      // menuForChildren is more precise than keyword matching for Family Dining
      const mc = place.menuForChildren ?? (place.goodForChildren === true ? true : undefined);
      C.family = { score: mc === true ? 1 : mc === false ? 0 : 0.4, weight: 1, hard: mc === false };
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

    // ── Hotel Tag match (soft ranking signal) — supports multi-tag ─────────
    {
      const activeHotelTags = (f.hotelTags && f.hotelTags.length > 0) ? f.hotelTags : (f.hotelTag ? [f.hotelTag] : []);
      if (activeHotelTags.length > 0) {
        let totalKws = 0, totalHits = 0;
        for (const ht of activeHotelTags) {
          const kws = (HOTEL_TAG_SEARCH[ht] ?? ht).toLowerCase().split(' ').filter(k => k.length > 3);
          totalKws  += kws.length;
          totalHits += kws.filter(k => allText.includes(k)).length;
        }
        C.tags = { score: totalKws > 0 ? Math.min(totalHits / totalKws, 1) : 0.3, weight: 2 };
      }
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
// Removes places that have had no customer activity in the past 6 months.
// These are likely closed or permanently inactive (e.g. "Thatha Paati Bhojanam").
// Google's Places API returns the 5 most recent reviews sorted newest-first —
// so reviews[0].publishTime is the most recent customer interaction signal we have.
// Only applied to established places (≥20 total reviews) to avoid penalising new venues.
function filterStalePlaces(places: any[]): any[] {
  const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;
  const cutoff = Date.now() - SIX_MONTHS_MS;
  return places.filter(place => {
    const reviews    = (place.reviews ?? []) as any[];
    const totalCount = (place.userRatingCount ?? 0) as number;
    // Brand-new places (<5 reviews) — no baseline, keep them; 5+ must show recent activity
    if (totalCount < 5) return true;
    // If API returned no reviews (field not populated) — can't judge, keep
    if (reviews.length === 0) return true;
    // Most recent review is reviews[0] (API sorts newest-first)
    const newestTime = reviews[0]?.publishTime ? new Date(reviews[0].publishTime).getTime() : null;
    if (newestTime === null) return true;
    return newestTime >= cutoff;
  });
}

// Only Non-Veg uses this path (Veg/PureVeg handled by includedType at API level;
// price/openNow handled by priceLevels/openNow at API level).
// ─────────────────────────────────────────────────────────────────────────────
function applyStrictFilter(places: any[], tab: string, f: UserFilters): any[] {
  if (tab !== 'Food') return places;

  // Non-Veg: 3-layer hard filter — NO fallback to the full pool (would include pure veg places)
  if (f.dietType === 'Non-Veg') {
    return places.filter(p => {
      const name    = (p.displayName?.text ?? '').toLowerCase();
      const reviews = (p.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');

      // Layer 1: Exclude if Google explicitly marks it vegetarian AND no non-veg keyword in name
      // (servesVegetarianFood=true + no non-veg name = confirmed pure veg)
      if (p.servesVegetarianFood === true && !NON_VEG_KEYWORDS.some(kw => name.includes(kw))) return false;

      // Layer 2: Exclude if name matches any pure veg signal — bhavan, vegetarian, tiffin centre, etc.
      if (PURE_VEG_NAME_SIGNALS.some(sig => name.includes(sig))) return false;

      // Layer 3: Must have at least one non-veg keyword in name OR review text.
      // Context-aware: check ALL occurrences of each keyword — if ANY occurrence is un-negated, the place qualifies.
      // A review saying "no chicken" + another review saying "great chicken biryani" → correctly qualifies.
      const combined = `${name} ${reviews}`;
      const hasNonVegKw = NON_VEG_KEYWORDS.some(kw => {
        let searchFrom = 0;
        while (true) {
          const idx = combined.indexOf(kw, searchFrom);
          if (idx === -1) break;
          // Check up to 20 chars before keyword for negation context
          const before = combined.slice(Math.max(0, idx - 20), idx);
          const isNegated = /\b(no|not|without|free|never|don'?t|zero|isn'?t|doesn'?t)\s*$/.test(before.trimEnd());
          if (!isNegated) return true;  // found an un-negated occurrence — qualifies
          searchFrom = idx + kw.length;
        }
        return false;
      });
      return hasNonVegKw;
    });
  }

  // Pure Veg: hard filter — must be classified as vegetarian_restaurant AND have no
  // non-veg type tags AND must not self-label as "(Non Veg)" / "non-veg" in name.
  if (f.dietType === 'Pure Veg') {
    const NON_VEG_TYPES = new Set([
      'seafood_restaurant', 'chicken_restaurant', 'bbq_restaurant',
      'barbecue_restaurant', 'butcher_shop', 'fish_and_chips_restaurant',
    ]);
    const NON_VEG_NAME_SIGNALS = ['non veg', 'non-veg', 'nonveg', 'chicken', 'mutton', 'seafood', 'meat shop'];

    return places.filter(p => {
      const types = (p.types ?? []) as string[];
      const name  = (p.displayName?.text ?? '').toLowerCase();
      // Exclude if name explicitly signals non-veg
      if (NON_VEG_NAME_SIGNALS.some(sig => name.includes(sig))) return false;
      // Exclude if non-veg place type present
      if (types.some(t => NON_VEG_TYPES.has(t))) return false;
      // Must be classified as vegetarian_restaurant by Google
      return types.includes('vegetarian_restaurant');
    });
  }

  // Meal time — API boolean first (100% accurate), keyword fallback for unknown places.
  // Hard-exclude only when Google explicitly says the meal is NOT served (false).
  if (f.mealTime && f.mealTime !== 'Any') {
    const apiMealMap: Record<string, string> = {
      'Breakfast': 'servesBreakfast',
      'Lunch':     'servesLunch',
      'Dinner':    'servesDinner',
      'Brunch':    'servesBrunch',
    };
    const apiField = apiMealMap[f.mealTime];

    // Step 1: hard-exclude places where API confirms the meal is NOT served
    const notConfirmedAbsent = places.filter(p =>
      !apiField || (p as any)[apiField] !== false
    );

    // Step 2: prefer places confirmed by API boolean or keyword match
    const confirmed = notConfirmedAbsent.filter(p => (p as any)[apiField] === true);
    if (confirmed.length >= 2) return confirmed;

    // Step 3: keyword fallback for places with no API data
    const mealKws = MEAL_SCORE_KEYWORDS[f.mealTime] ?? [];
    if (mealKws.length > 0) {
      const matched = notConfirmedAbsent.filter(p => {
        // API confirmed — already included by step 2 above
        if (apiField && (p as any)[apiField] === true) return true;
        const name    = (p.displayName?.text ?? '').toLowerCase();
        const reviews = (p.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
        return mealKws.some(kw => `${name} ${reviews}`.includes(kw));
      });
      if (matched.length >= 2) return matched;
    }

    // Step 4: last resort — return any place not explicitly excluded
    return notConfirmedAbsent.length >= 1 ? notConfirmedAbsent : places;
  }

  return places;
}

// ─────────────────────────────────────────────────────────────────────────────
// TAG FILTER — strict hard filter on type and keywords
// Hotels: exclude places with restaurant/food types (catches South Indian restaurants
//   named "X Hotel" that slip past the text query)
// Food: if a cuisine tag is selected, a place MUST match at least one keyword in
//   name, types, editorialSummary, or reviews — zero matches = excluded (no fallback)
//   Evidence (best matching review snippet) is attached to p._matchEvidence for the UI.
// ─────────────────────────────────────────────────────────────────────────────
function extractSnippet(text: string, keyword: string, ctx = 55): string {
  const pos = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (pos === -1) return '';
  const s = Math.max(0, pos - ctx);
  const e = Math.min(text.length, pos + keyword.length + ctx);
  return (s > 0 ? '…' : '') + text.slice(s, e).trim() + (e < text.length ? '…' : '');
}

function applyTagFilter(places: any[], tab: string, f: UserFilters): any[] {
  if (tab === 'Hotels') {
    // Step 1: strip restaurant-type places (South Indian "hotels" etc.)
    const hotels = places.filter(p => {
      const types = (p.types ?? []) as string[];
      return !types.some(t => RESTAURANT_TYPES.has(t));
    });
    const hotelPool = hotels.length >= 2 ? hotels : places;

    // Step 2: if tags are selected, require EACH selected tag's keywords to appear in corpus.
    // With multiple tags, a hotel must match at least 1 keyword from each individual tag
    // (not just any keyword from the merged pool) — prevents "money" matching "Value for Money"
    // tag when a hotel only talks about wasting money.
    const activeHotelTags = (f.hotelTags && f.hotelTags.length > 0) ? f.hotelTags : (f.hotelTag ? [f.hotelTag] : []);
    if (activeHotelTags.length > 0) {
      // Only check tags that have keyword lists (GPS-verified tags like Central & Walkable are null)
      const tagsWithKws = activeHotelTags.filter(ht => HOTEL_TAG_VERIFY[ht] !== null && HOTEL_TAG_VERIFY[ht] !== undefined);
      if (tagsWithKws.length > 0) {
        const verified = hotelPool.filter(p => {
          const name    = (p.displayName?.text ?? '').toLowerCase();
          const addr    = (p.formattedAddress  ?? '').toLowerCase();
          const reviews = (p.reviews ?? []).slice(0, 5)
            .map((r: any) => (r.text?.text ?? '').slice(0, 400).toLowerCase()).join(' ');
          const corpus  = `${name} ${addr} ${reviews}`;
          // Must match at least 1 keyword from EACH tag with a keyword list
          return tagsWithKws.every(ht => {
            const kws = HOTEL_TAG_VERIFY[ht] ?? [];
            return kws.some(kw => corpus.includes(kw));
          });
        });
        // Fallback: if strict AND-match yields < 2, relax to OR-match across all tags
        if (verified.length >= 2) return verified;
        const allVerifyKws: string[] = tagsWithKws.flatMap(ht => HOTEL_TAG_VERIFY[ht] ?? []);
        const relaxed = hotelPool.filter(p => {
          const name    = (p.displayName?.text ?? '').toLowerCase();
          const addr    = (p.formattedAddress  ?? '').toLowerCase();
          const reviews = (p.reviews ?? []).slice(0, 5)
            .map((r: any) => (r.text?.text ?? '').slice(0, 400).toLowerCase()).join(' ');
          const corpus  = `${name} ${addr} ${reviews}`;
          return allVerifyKws.some(kw => corpus.includes(kw));
        });
        return relaxed.length >= 2 ? relaxed : hotelPool;
      }
    }
    return hotelPool;
  }

  const activeFoodTags = (f.foodTags && f.foodTags.length > 0) ? f.foodTags : (f.foodTag ? [f.foodTag] : []);

  if (tab === 'Food' && activeFoodTags.length > 0) {
    const matching = places.filter(p => {
      const name      = (p.displayName?.text ?? '').toLowerCase();
      const types     = (p.types ?? []).join(' ').replace(/_/g, ' ').toLowerCase();
      const editorial = (p.editorialSummary?.text ?? '').toLowerCase();
      const reviews   = (p.reviews ?? []).slice(0, 5)
        .map((r: any) => (r.text?.text ?? '').slice(0, 500).toLowerCase()).join(' ');
      const corpus    = `${name} ${types} ${editorial} ${reviews}`;

      const matched: string[] = [];
      for (const tag of activeFoodTags) {
        const kws = FOOD_TAG_KEYWORDS[tag];
        if (!kws) continue;
        const matchedKw = kws.find(kw => corpus.includes(kw));
        if (matchedKw) matched.push(tag);
      }

      // Require at least one tag to match
      if (matched.length === 0) return false;

      // Count positive (4-5★) review hits for each matched tag — drives ranking
      let positiveHitCount = 0;
      for (const tag of matched) {
        const kws = FOOD_TAG_KEYWORDS[tag] ?? [];
        positiveHitCount += (p.reviews ?? []).filter((r: any) =>
          (r.rating ?? 0) >= 4 && kws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
        ).length;
      }
      p._positiveHitCount = positiveHitCount;
      p._matchedTags = matched;

      // Evidence snippet — prefer 4-5★ reviews for positive evidence
      const firstTag = matched[0];
      const firstKws = FOOD_TAG_KEYWORDS[firstTag] ?? [];
      const matchedKw = firstKws.find(kw => corpus.includes(kw)) ?? firstTag;
      const positiveReview = (p.reviews ?? []).find((r: any) =>
        (r.rating ?? 0) >= 4 && firstKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
      );
      const anyMatchReview = positiveReview ?? (p.reviews ?? []).slice(0, 5).find((r: any) =>
        firstKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
      );
      if (anyMatchReview) {
        const reviewText = (anyMatchReview.text?.text ?? '');
        const kwInReview = firstKws.find(kw => reviewText.toLowerCase().includes(kw)) ?? matchedKw;
        p._matchEvidence = { keyword: kwInReview, snippet: extractSnippet(reviewText, kwInReview, 70), source: (anyMatchReview.rating ?? 0) >= 4 ? 'positive_review' : 'review' };
      } else if (editorial && firstKws.some(kw => editorial.includes(kw))) {
        const kwInEd = firstKws.find(kw => editorial.includes(kw)) ?? matchedKw;
        p._matchEvidence = { keyword: kwInEd, snippet: extractSnippet(p.editorialSummary?.text ?? '', kwInEd, 80), source: 'editorial' };
      } else {
        p._matchEvidence = { keyword: matchedKw, snippet: null, source: 'name' };
      }

      return true;
    });

    // 4-signal composite for food: relevancy(40%) + recentQuality(30%) + trend(20%) + insight(10%)
    matching.sort((a, b) => {
      const composite = (p: any): number => {
        // relevancy: fraction of selected tags this place matches + normalised positive hit count
        const tagRatio    = (p._matchedTags?.length ?? 0) / Math.max(activeFoodTags.length, 1);
        const posHits     = Math.min((p._positiveHitCount ?? 0) / 5, 1);
        const relevancy   = tagRatio * 0.7 + posHits * 0.3;
        // recentQuality: rating × log-volume (mirrors hotel formula)
        const rating      = p.rating ?? 0;
        const reviewCount = p.userRatingCount ?? 0;
        const recentQuality = Math.min(rating / 5, 1) * Math.min(Math.log10(Math.max(reviewCount, 1)) / 3.5, 1);
        return relevancy                           * 0.40
             + recentQuality                       * 0.30
             + computeTrendScore(p)                * 0.20
             + computeInsightScore(p, 'Food')      * 0.10;
      };
      return composite(b) - composite(a);
    });

    // Only narrow down when ≥4 strong keyword matches exist — if fewer, trust Google's
    // ranking and pass the full pool to Gemini. This prevents good places (e.g. V Subbaiya
    // Tiffin whose reviews say "idli" not "tiffin center") from being cut before AI sees them.
    return matching.length >= 4 ? matching : places;
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

    // Recent positive reviews carry more signal — sort by recency then length
    const byLength = sortReviewsForDisplay(allReviews);

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

    // Multi-tag match data — pre-computed by scoreAllTagsForHotel, attached on place object
    const matchedTags   = (p._matchedTags   ?? []) as string[];
    const confirmedTags = (p._confirmedTags ?? []) as string[];
    const tagEvidence   = (p._tagEvidence   ?? {}) as Record<string, string>;
    const tagSnippets   = (p._tagSnippets   ?? {}) as Record<string, string>;
    const filterLayer   = (p._filterLayer   ?? 1)  as number;

    // Legacy single-tag compatibility (Food tab, quick overrides)
    const activeTag = tab === 'Hotels' ? '' : (filters.foodTag ?? '');
    const tagMentions: Record<string, boolean> = {};
    if (activeTag) {
      const keywords = (FOOD_TAG_SEARCH[activeTag] ?? activeTag)
        .toLowerCase().split(' ').filter((k: string) => k.length > 3);
      tagMentions[activeTag] = keywords.some((k: string) => allText.includes(k));
    }
    // Add multi-tag mentions
    for (const t of matchedTags) tagMentions[t] = true;

    return {
      idx:          i,
      name:         p.displayName?.text ?? '',
      address:      p.formattedAddress  ?? '',
      editorial:    p.editorialSummary?.text ?? '',
      rating:       p.rating ?? 0,
      totalReviews: p.userRatingCount ?? 0,
      priceLevel:   p.priceLevel ?? 'PRICE_LEVEL_MODERATE',
      openNow:      p.regularOpeningHours?.openNow ?? p.currentOpeningHours?.openNow ?? true,
      trendDelta:   recentAvg !== null ? +(recentAvg - (p.rating ?? 0)).toFixed(1) : 0,
      recentAvg,
      matchedTags,
      confirmedTags,
      tagEvidence,
      tagSnippets,
      matchScore:   (p._matchScore ?? 100) as number,
      reviewDepth,
      buckets:      computeBuckets(allReviews),
      // Top 5 reviews sorted by length — stars included so Gemini knows positive vs negative context
      reviews: byLength.slice(0, 5).map((r: any) => ({
        stars: r.rating,
        text:  (r.text?.text ?? '').slice(0, 200),
        ago:   r.relativePublishTimeDescription ?? '',
      })),
      // positiveTagMatches: per matched tag, snippets ONLY from 4-5★ reviews — Gemini's ground truth for positive evidence
      positiveTagMatches: (() => {
        const result: Record<string, string[]> = {};
        const activeTags = tab === 'Hotels'
          ? (p._matchedTags ?? []) as string[]
          : ((p._matchedTags ?? []) as string[]);
        for (const tag of activeTags) {
          const kws = (tab === 'Hotels' ? TAG_TEXT_KEYWORDS[tag] : FOOD_TAG_KEYWORDS[tag]) ?? [];
          if (kws.length === 0) continue;
          const snippets = allReviews
            .filter((r: any) => (r.rating ?? 0) >= 4 && kws.some(k => (r.text?.text ?? '').toLowerCase().includes(k)))
            .slice(0, 2)
            .map((r: any) => `[${r.rating}★] ${(r.text?.text ?? '').slice(0, 150)}`);
          if (snippets.length > 0) result[tag] = snippets;
        }
        return result;
      })(),
      // tagMentions: which selected tags are actually mentioned in name/reviews
      tagMentions,
      // Universal filter match score (0–1 per criterion, pre-computed)
      filterScore:     filterScores[i]?.total     ?? 1,
      filterBreakdown: filterScores[i]?.breakdown ?? {},
      // Amenity signals from Places API — all boolean, null = no data from Google
      servesVeg:        p.servesVegetarianFood ?? null,
      dineIn:           p.dineIn               ?? null,
      takeout:          p.takeout              ?? null,
      delivery:         p.delivery             ?? null,
      curbsidePickup:   p.curbsidePickup       ?? null,
      outdoor:          p.outdoorSeating       ?? null,
      goodGroups:       p.goodForGroups        ?? null,
      goodChildren:     p.goodForChildren      ?? null,
      menuChildren:     p.menuForChildren      ?? null,
      reservable:       p.reservable           ?? null,
      liveMusic:        p.liveMusic            ?? null,
      watchSports:      p.goodForWatchingSports ?? null,
      allowsDogs:       p.allowsDogs           ?? null,
      coffee:           p.servesCoffee         ?? null,
      beer:             p.servesBeer           ?? null,
      wine:             p.servesWine           ?? null,
      cocktails:        p.servesCocktails      ?? null,
      dessert:          p.servesDessert        ?? null,
      breakfast:        p.servesBreakfast      ?? null,
      lunch:            p.servesLunch          ?? null,
      dinner:           p.servesDinner         ?? null,
      brunch:           p.servesBrunch         ?? null,
      parking:          p.parkingOptions?.freeParkingLot ? 'free' : p.parkingOptions?.paidParkingLot ? 'paid' : null,
      wheelchair:       p.accessibilityOptions?.wheelchairAccessibleEntrance ?? null,
      primaryType:      p.primaryType          ?? null,
    };
  });

  // ── Step 2: Build structured visitor profile ─────────────────────────────
  type Criterion = { label: string; value: string; weight: 'critical' | 'important' | 'nice-to-have' };
  const criteria: Criterion[] = [];

  if (tab === 'Hotels') {
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price tier', value: `${filters.priceFilter} — HARD RULE: hotels whose priceLevel field is already set to a DIFFERENT tier have been pre-filtered out. Any remaining hotel with a set priceLevel matches this tier. For hotels with no priceLevel set (unknown), include only if review text suggests this tier; if reviews suggest a different price range, exclude them.`, weight: 'critical' });
    if (filters.minRating && filters.minRating > 0)
      criteria.push({ label: 'Min rating', value: `${filters.minRating}+`, weight: 'important' });
    // Multi-tag: use resolved tags list
    const resolvedTags = resolveHotelTags(filters);
    if (resolvedTags.length > 0) {
      criteria.push({ label: 'Selected tags', value: resolvedTags.join(' + ') + ` — RANK hotels by matchedTags count first (3 matches > 2 > 1). A hotel matching all ${resolvedTags.length} tags must rank above an equally-rated hotel matching fewer tags.`, weight: 'critical' });
    }
    if (filters.hotelArea)
      criteria.push({ label: 'Preferred area', value: `near ${filters.hotelArea}`, weight: 'important' });
    const isThanjavurCity = /thanjavur|tanjore/i.test(filters.city ?? '');
    if (isThanjavurCity)
      criteria.push({ label: 'Implicit need', value: 'walkable or close to Brihadeeswarar Temple', weight: 'important' });
  } else if (tab === 'Food') {
    if (filters.dietType === 'Pure Veg')
      criteria.push({ label: 'Diet', value: 'STRICTLY Pure Veg — restaurant must serve ONLY vegetarian food. ANY mention of chicken, mutton, fish, egg, seafood, biryani, meat or non-veg in name or reviews = EXCLUDE completely. Do NOT rank or mention non-veg restaurants at all.', weight: 'critical' });
    else if (filters.dietType === 'Non-Veg')
      criteria.push({ label: 'Diet', value: 'Non-Veg — HARD RULES: (1) EXCLUDE any place where servesVeg=true — these are confirmed vegetarian-only restaurants. (2) EXCLUDE any place with zero non-veg keywords (chicken/mutton/fish/prawn/crab/egg/meat/seafood/biryani/shawarma/bbq) in reviews. (3) RANK by non-veg keyword count in 4-5★ reviews — more positive non-veg mentions = higher rank. A pure veg restaurant appearing in this list is a critical error.', weight: 'critical' });
    else if (filters.dietType && filters.dietType !== 'Any')
      criteria.push({ label: 'Diet', value: filters.dietType, weight: 'critical' });
    {
      const activeTags = (filters.foodTags?.length ?? 0) > 0 ? filters.foodTags! : (filters.foodTag ? [filters.foodTag] : []);
      if (activeTags.length > 0)
        criteria.push({ label: 'Cuisine / type (PRIMARY)', value: activeTags.join(' + ') + (activeTags.length > 1 ? ` — rank places that match MORE of these tags higher (union match)` : ''), weight: 'critical' });
    }
    if (filters.mealTime && filters.mealTime !== 'Any')
      criteria.push({ label: 'Meal time', value: filters.mealTime + ' — rank places that specialise in this meal highest', weight: 'critical' });
    if (filters.priceFilter && filters.priceFilter !== 'Any')
      criteria.push({ label: 'Price range (per person)', value: filters.priceFilter, weight: 'important' });
    if (filters.dineMode && filters.dineMode !== 'Any')
      criteria.push({ label: 'Dining mode', value: filters.dineMode, weight: 'important' });
    const isThanjavurFood = /thanjavur|tanjore/i.test(filters.city ?? '');
    if (isThanjavurFood)
      criteria.push({ label: 'Implicit need', value: 'authentic Thanjavur / Tamil cuisine', weight: 'nice-to-have' });
  }

  const criteriaStr = criteria.length > 0
    ? criteria.map(c => `  - [${c.weight.toUpperCase()}] ${c.label}: ${c.value}`).join('\n')
    : '  - No specific preferences stated (rank by quality and review signals)';

  // ── Step 3: Build ranking + selection rules specific to the tab ──────────
  const rankingRules = tab === 'Hotels' ? `
RANKING RULES for Hotels:
1. MATCH SCORE IS PRIMARY — each hotel has a pre-computed matchScore (0-100%) from tag scoring.
   Higher matchScore → rank higher. matchScore already reflects GPS distance, API booleans, and review frequency.
2. confirmedTags[] = verified by GPS or API boolean (green ✓). matchedTags[] = score >= 60%.
   Same matchScore → prefer more confirmedTags.
3. tagEvidence{} contains proof per tag — USE THIS in aiNote and filterVerification.
4. tagSnippets{} contains the exact review sentence — quote it in filterVerification.
5. Among equal matchScore: rank by rating × log(totalReviews), then trend.
6. Trust signal: 4.3★ × 2000 reviews outranks 4.7★ × 50 reviews.
7. reviewDepth > 150 → higher trust; < 50 → lower trust.
8. Declining trend is a penalty — rank below stable/improving at same quality.
9. NEVER return zero results — all hotels are pre-scored and sorted, just pick top 7.` : tab === 'Food' ? `
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

4. TARGET: Return exactly 7 results for Hotels tab. If pool < 7, return all available.
   NEVER return 0 results — if nothing else qualifies, rank the top 7 by rating.
5. Minimum 5 results always — relax all score thresholds if needed to reach 5.
6. Maximum 10 results — stop when filterScore drops significantly.
7. QUALITY FLOOR: prefer rating >= 4.0 AND totalReviews >= 20. Relax to 3.2 / 5 if needed.
8. TREND: declining is a penalty, not an exclusion.
9. The returned list IS the final result — every position must earn its place.`;

  // ── Step 5: Compose the prompt ────────────────────────────────────────────
  const resolvedTagsForPrompt = resolveHotelTags(filters);
  const tagContext = tab === 'Hotels' && resolvedTagsForPrompt.length > 0
    ? `\nSELECTED TAGS: ${resolvedTagsForPrompt.join(', ')} — use matchedTags[], confirmedTags[], tagEvidence{}, tagSnippets{} fields on each hotel to write specific evidence in aiNote and filterVerification.`
    : '';

  const prompt = `You are a ${filters.city ?? 'Thanjavur'} travel expert and data analyst. From the ${places.length} ${tab.toLowerCase()} below, select and rank the BEST ${tab.toLowerCase()} for a visitor with these needs:

VISITOR PROFILE:
${criteriaStr}
${rankingRules}
${selectionRules}
${tagContext}

TREND INTERPRETATION (use trendDelta field):
- trendDelta > +0.5 → "improving" (recent reviewers clearly rate higher than historical avg)
- trendDelta < -0.5 → "declining" (recent reviewers clearly rate lower — meaningful drop)
- Otherwise → "stable" (within normal n=5 sample variance — do NOT call it improving/declining)

DATA FIELDS AVAILABLE PER PLACE:
- name, address, editorial (Google's description), rating, totalReviews
- trendDelta, recentAvg — pre-computed trend signal
- matchedTags[], confirmedTags[], tagEvidence{}, tagSnippets{} — pre-scored tag match data
- matchScore (0–100) — overall tag match percentage
- reviewDepth — avg chars per review (higher = more detailed feedback = higher trust)
- buckets{taste, quality, hygiene, service, value, ambience} — raw keyword hit counts across all reviews
- reviews[] — top 5 reviews each with: stars (1–5), text (up to 200 chars), ago
- positiveTagMatches{} — CRITICAL: pre-extracted snippets from 4-5★ reviews mentioning each matched tag. USE THESE for filterVerification and reviewSummary — they are the only confirmed positive evidence.
- filterScore, filterBreakdown — pre-computed filter match scores
- primaryType — Google's single definitive place type (e.g. "restaurant", "cafe", "lodging")
- Google API booleans (true/false/null — null means no data): servesVeg, dineIn, takeout, delivery, outdoor, goodGroups, goodChildren, menuChildren, reservable, liveMusic, watchSports, allowsDogs, coffee, beer, wine, cocktails, dessert, breakfast, lunch, dinner, brunch, wheelchair, parking

SENTIMENT RULES — STRICTLY FOLLOW:
1. reviews[].stars tells you sentiment: 4-5★ = happy visitor (positive), 1-2★ = unhappy visitor (negative), 3★ = neutral
2. A keyword in a 4-5★ review = CONFIRMED POSITIVE signal for that tag
3. A keyword in a 1-2★ review = NEGATIVE signal — do NOT use this as evidence, do NOT quote it in filterVerification or reviewSummary
4. positiveTagMatches{} already pre-filtered to 4-5★ only — always prefer these over raw tagSnippets{} for filterVerification
5. In reviewSummary: only synthesise what 4-5★ reviewers praise. If a place has mostly 1-3★ reviews mentioning the tag, that's a red flag — note it in caveat
6. In trendReason: if recentAvg < rating, recent visitors are unhappier — always call this out as "declining"

PLACES DATA (${places.length} candidates):
${JSON.stringify(summaries)}

TASK: Return a JSON array of ranked ${tab.toLowerCase()} (rank 1 = best match). Return only results with strong tag evidence — prefer 3–5 high-quality matches over padding with weak ones. Up to 7 if strong candidates exist. NEVER return an empty array.
Rank by: (1) matchedTags.length DESC, (2) confirmedTags.length DESC, (3) rating × log(totalReviews), (4) trend.

[{
  "originalIdx": <idx from input, integer>,
  "rank": <1 = best, integer>,
  "trendVerdict": "improving" | "declining" | "stable",
  "trendReason": "<max 12 words — MUST quote or closely paraphrase words from the actual review text>",
  "reviewSummary": "<2 sentences — synthesise what reviewers most frequently praise; use words from actual reviews; lead with strongest positive>",
  "aiNote": "<max 20 words — For Hotels: start with 'Verified by AI:' then state matchedTags count and cite the single best tagEvidence or tagSnippet. Example: 'Verified by AI: matches 3/3 tags — 0.8km from Big Temple, free parking confirmed, heritage building.' For Food: cite review count for the primary filter keyword.>",
  "filterVerification": "<ONE sentence — ALWAYS use positiveTagMatches{} first (4-5★ reviews only). Quote the actual sentence, e.g. '\"10 minutes walk to the Big Temple\" — 5★ reviewer'. If positiveTagMatches is empty for this tag, use tagSnippets{}. If both empty, say how many total reviews mention it.>",
  "whyOverOthers": "<max 30 words — compare against the other candidates in this list; cite specific numbers or unique features>",
  "bestFor": "<10 words — describe the ideal visitor type>",
  "caveat": "<one specific drawback from reviews, or null>",
  "insiderTip": "<max 20 words — one concrete actionable tip: best time to visit, what to order/request, local trick, or hidden detail from reviews>"
}]

QUALITY RULES:
- trendReason: use words found in actual review texts, not invented. If recentAvg < rating, call it declining.
- aiNote: MUST start with "Verified by AI:" — for hotels cite matchedTags count and best positive evidence; for food cite how many 4-5★ reviews mention the tag
- filterVerification: ALWAYS quote from positiveTagMatches{} (4-5★ reviews). Never quote negative reviews as evidence.
- reviewSummary: synthesise only what 4-5★ reviewers praise most. If reviews are mostly negative or mixed, lead with that reality in caveat.
- whyOverOthers: compare specifically against others in this list — cite tag match count, rating, review volume, or unique feature
- caveat: real drawbacks from 1-3★ reviews only — or null. Never fabricate.
- insiderTip: derive from review text patterns — e.g. "arrive before 11am", "ask for window seat", "order the thali not the buffet". If nothing specific, return null.
- ZERO RESULTS IS NOT ACCEPTABLE — always return at minimum the top places by rating if nothing else matches

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
        if (s.trendDelta > 0.5) {
          trendVerdict = 'improving';
          trendReason  = `Recent visitors rate it ${s.recentAvg}★ — clearly above the ${s.rating}★ historical average`;
        } else if (s.trendDelta < -0.5) {
          trendVerdict = 'declining';
          trendReason  = `Recent visitors rate it ${s.recentAvg}★ — meaningfully below the ${s.rating}★ historical average`;
        } else {
          trendReason = `Recent visitors rate it ${s.recentAvg}★ — stable around the ${s.rating}★ all-time average`;
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
          ? 'Budget travellers' : s.priceLevel === 'PRICE_LEVEL_EXPENSIVE' || s.priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE'
          ? 'Premium travellers' : 'Mid-range travellers';
        bestFor = `${tier} — ${s.totalReviews.toLocaleString()} verified stays confirm ${s.rating}★ reliability`;
      } else {
        const vegLabel = s.servesVeg === true ? 'Vegetarian food seekers' : s.servesVeg === false ? 'Non-veg diners' : 'Food lovers';
        bestFor = `${vegLabel} — ${s.totalReviews.toLocaleString()} diners rate it ${s.rating}★ for quality & taste`;
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
        aiNote:        `${s.rating}★ across ${s.totalReviews.toLocaleString()} reviews — verified quality for ${filters.city ?? 'local'} visitors`,
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

    return stops.slice(0, stopCount).map((s: any) => ({
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
      const places = await fetchPlaces(`${locationName} ${exploreCity} ${exploreState}`, 0, 50, { center: exploreCenter, withPhotos: true });
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
          reviews: sortReviewsForDisplay(filterReviewsForDisplay(place.reviews ?? [])).slice(0, 2).map((r: any) => ({
            text:     r.text?.text ?? '',
            author:   r.authorAttribution?.displayName ?? 'Visitor',
            location: 'Tamil Nadu',
            stars:    r.rating ?? 5,
            ago:      r.relativePublishTimeDescription ?? 'Recently',
          })),
          photoColor: EXPLORE_COLORS[timeSlot] ?? 'bg-amber-600',
          photoRef:   place.photos?.[0]?.name ?? null,
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
        searchSeed, 35, { center: itinCenter, withPhotos: true },
      );
      const stops = await geminiItinerary(rawPlaces, startTime, stopCount, itinCity);

      if (stops.length === 0) {
        return res.status(500).json({ error: 'Could not generate itinerary' });
      }

      // Attach Google Places photo ref by matching stop name to rawPlaces
      const stopsWithPhotos = stops.map((s: any) => {
        const sn = s.stop.toLowerCase();
        const match = rawPlaces.find((p: any) => {
          const pn = (p.displayName?.text ?? '').toLowerCase();
          return sn.includes(pn) || pn.includes(sn) ||
            pn.split(' ').some((w: string) => w.length > 4 && sn.includes(w));
        });
        return { ...s, photoRef: match?.photos?.[0]?.name ?? null };
      });

      return res.json({ itinerary: stopsWithPhotos });
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
    hotelTags:   Array.isArray(req.body?.hotelTags) ? (req.body.hotelTags as string[]).slice(0, 3) : undefined,
    hotelArea:   req.body?.hotelArea   ?? '',
    foodTag:     req.body?.foodTag     ?? '',
    foodTags:    Array.isArray(req.body?.foodTags) ? (req.body.foodTags as string[]).slice(0, 2) : undefined,
    priceFilter: req.body?.priceFilter ?? 'Any',
    minRating:   Number(req.body?.minRating ?? 0),
    openNow:     req.body?.openNow === true,
    dietType:    req.body?.dietType    ?? 'Any',
    dineMode:    req.body?.dineMode    ?? 'Any',
    mealTime:    req.body?.mealTime    ?? 'Any',
    // New API-boolean filters — only applied when sent as true by the client
    outdoorSeating: req.body?.outdoorSeating === true ? true : undefined,
    goodForGroups:  req.body?.goodForGroups  === true ? true : undefined,
    allowsDogs:     req.body?.allowsDogs     === true ? true : undefined,
    liveMusic:      req.body?.liveMusic      === true ? true : undefined,
    servesBeer:     req.body?.servesBeer     === true ? true : undefined,
    servesWine:     req.body?.servesWine     === true ? true : undefined,
    reservable:     req.body?.reservable     === true ? true : undefined,
    accessible:     req.body?.accessible     === true ? true : undefined,
    familyMenu:     req.body?.familyMenu     === true ? true : undefined,
    searchQuery:    typeof req.body?.searchQuery === 'string' && req.body.searchQuery.trim()
                      ? req.body.searchQuery.trim() : undefined,
  };

  const apiMinRating  = (filters.minRating ?? 0) > 0 ? (filters.minRating ?? 0) : 0;
  const apiOpenNow    = filters.openNow === true;
  const cityCenter    = getCityCenter(city);
  const cityKey       = city.trim().toLowerCase().replace(/[^a-z]/g, '');

  const apiPriceLevels = (tab === 'Hotels' && filters.priceFilter && filters.priceFilter !== 'Any')
    ? (PRICE_BUCKETS[filters.priceFilter] ?? []).filter(p => p !== 'PRICE_LEVEL_FREE')
    : [];

  const activeFoodTagsForApi = [...(filters.foodTags ?? []), ...(filters.foodTag ? [filters.foodTag] : [])];
  const apiIncludedType: string | undefined =
    (tab === 'Food' && (
      filters.dietType === 'Veg' || filters.dietType === 'Pure Veg' ||
      activeFoodTagsForApi.includes('Pure Veg')
    )) ? 'vegetarian_restaurant' : undefined;

  try {
    // ═══════════════════════════════════════════════════════════════════════
    // HOTELS: 2-call smart-pool fetch + 4-layer guarantee
    // ═══════════════════════════════════════════════════════════════════════
    if (tab === 'Hotels') {
      const selectedTags = resolveHotelTags(filters);
      const state = getCityState(city);

      // Free-text search: send query exactly as typed (+ city name) with NO locationBias —
      // Google's own spatial ranking handles "near X" natively, same as Google Maps.
      // Filter-tag mode: keep existing city-centre bias.
      const query = filters.searchQuery
        ? `${filters.searchQuery} in ${city} ${state}`
        : buildHotelQuery(filters);

      const fetchOpts = {
        withPhotos:     !filters.searchQuery, // no photos for free-text search results
        openNow:        apiOpenNow || undefined,
        center:         cityCenter,
        noLocationBias: !!filters.searchQuery,
      };

      // 5 parallel variants → deduplicated pool of up to 100 candidates.
      // Single call kept for free-text search (name-specific queries don't benefit from variants).
      let mergedPool: any[];
      if (filters.searchQuery) {
        mergedPool = await fetchPlaces(query, searchSeed, 20, fetchOpts);
      } else {
        const hotelVariants: PoolVariant[] = [
          { query, seed: searchSeed,            opts: fetchOpts },
          { query, seed: (searchSeed + 1) % 4, opts: fetchOpts },
          { query: `budget hotels lodges accommodation in ${city} ${state}`, seed: searchSeed,            opts: fetchOpts },
          { query: `hotels near ${city} ${state}`,                           seed: (searchSeed + 2) % 4, opts: fetchOpts },
          { query: `best hotels ${city} Tamil Nadu`,                         seed: (searchSeed + 3) % 4, opts: fetchOpts },
        ];
        mergedPool = await fetchPlacesPool(hotelVariants);
      }

      // Strip restaurants (South Indian "hotels" etc.) + city guard
      // primaryType is Google's single definitive type — most reliable signal for exclusion.
      const localPool  = filterCityOnly(mergedPool, city);
      const hotelOnly  = localPool.filter(p => {
        const primaryType = (p.primaryType ?? '') as string;
        const types = (p.types ?? []) as string[];
        if (primaryType && RESTAURANT_TYPES.has(primaryType)) return false;
        return !types.some(t => RESTAURANT_TYPES.has(t));
      });
      const basePool = filterStalePlaces(hotelOnly.length >= 2 ? hotelOnly : localPool)
        .filter(p => (p.rating ?? 0) >= 3.5);

      // Budget hard filter — classify every hotel and exclude wrong tiers.
      // Works even when Google priceLevel is missing (uses name + review signals).
      const targetTier = filters.priceFilter && filters.priceFilter !== 'Any'
        ? priceFilterToTier(filters.priceFilter) : null;
      const cleanPool = targetTier
        ? basePool.filter(p => classifyHotelTier(p) === targetTier)
        : basePool;
      // Fallback only if classifier left < 2 results
      const effectivePool = cleanPool.length >= 2 ? cleanPool : basePool;

      // Require ≥10 reviews so tag scoring has enough signal; fall back to full pool if too few survive
      const reviewedPool = effectivePool.filter(p => (p.userRatingCount ?? 0) >= 10);
      const qualityPool  = reviewedPool.length >= 3 ? reviewedPool : effectivePool;

      // Score ALL tags for every hotel — continuous 0-1 per tag
      const allScored: ScoredHotel[] = qualityPool.map(place => {
        const result = scoreAllTagsForHotel(place, selectedTags, cityKey);
        return { place, ...result };
      });

      // Pre-filter: at least one selected tag must score ≥0.60 (matchedTags non-empty).
      // Previous formula (1/tags*0.5) let almost everything through for 2+ tags.
      let tagFiltered = allScored;
      if (selectedTags.length > 0) {
        const matched = allScored.filter(h => h.matchedTags.length >= 1);
        if (matched.length >= 3) tagFiltered = matched;
      }

      // Rank by matchScore descending
      const candidates = rankByTagScores(tagFiltered);

      // ── FALLBACK LOGIC ────────────────────────────────────────────────────
      // If <5 hotels match ALL selected tags, relax the lowest-count tag (3rd)
      // and label those extra hotels as "Close Match" so the user always sees ≥5.
      // Corpus counts for merged tags — used to decide which tag to relax in close-match fallback.
      // Merged tags carry sum of both original tags' counts.
      const ALL_TAG_COUNTS: Record<string, number> = {
        'Spotlessly Clean':    64,  // 50 (clean) + 14 (hygienic)
        'Well Maintained':     33,
        'Fresh Rooms':         54,  // 15 (fresh) + 39 (clean bathrooms)
        'Central & Walkable':  60,  // 29 (city centre) + 31 (walkable)
        'Easy Parking':        55,
        'Near Big Temple':     24,
        'Near Railway Station': 6,
        'Friendly & Helpful':  74,  // 35 (friendly staff) + 39 (helpful team)
        'Warm Hospitality':    66,  // 35 (courteous) + 31 (great hospitality)
        'Quick Response':      26,
        'Spacious Rooms':      42,
        'Comfortable & Quiet': 65,  // 41 (comfortable) + 24 (quiet & peaceful)
        'Good Amenities':      49,
        'In-House Restaurant': 42,
        'Breakfast Included':  32,
        'Good Food':           87,  // 41 (good food) + 46 (highly recommended)
        'Value for Money':     74,  // 36 (value for money) + 38 (fair price)
      };

      const PERFECT_THRESHOLD = 0.55; // score per tag to count as "perfect match"
      const perfectMatches = selectedTags.length > 0
        ? candidates.filter(h => selectedTags.every(t => (h.allTagScores[t] ?? 0) >= PERFECT_THRESHOLD))
        : candidates;

      let closeMatchPool: typeof candidates = [];
      let relaxedTag: string | null = null;

      if (selectedTags.length >= 2 && perfectMatches.length < 5) {
        // Drop the tag with the lowest corpus count (hardest to satisfy)
        const sortedByCount = [...selectedTags].sort((a, b) => (ALL_TAG_COUNTS[a] ?? 20) - (ALL_TAG_COUNTS[b] ?? 20));
        relaxedTag = sortedByCount[0];
        const coreTags = selectedTags.filter(t => t !== relaxedTag);
        closeMatchPool = candidates.filter(h =>
          !perfectMatches.includes(h) &&
          coreTags.every(t => (h.allTagScores[t] ?? 0) >= PERFECT_THRESHOLD)
        );
      }

      // Build final ranked list: perfect first, close matches after
      const perfectPlaces = perfectMatches.slice(0, 20);
      const closeMatchPlaces = closeMatchPool.slice(0, Math.max(0, 5 - perfectPlaces.length));
      const mergedCandidates = [
        ...perfectPlaces.map(c => ({ ...c, _matchTier: 'Perfect Match' as const })),
        ...closeMatchPlaces.map(c => ({ ...c, _matchTier: 'Close Match' as const, _relaxedTag: relaxedTag })),
      ];
      const finalCandidates = mergedCandidates.length > 0 ? mergedCandidates : candidates.slice(0, 20).map(c => ({ ...c, _matchTier: 'Perfect Match' as const }));

      // Attach scores to each place object for Gemini + buildHotelResult
      const placesToRank = finalCandidates.slice(0, 20).map(c => ({
        ...c.place,
        _matchedTags:   c.matchedTags,
        _confirmedTags: c.confirmedTags,
        _tagEvidence:   c.tagEvidence,
        _tagSnippets:   c.tagSnippets,
        _allTagScores:  c.allTagScores,
        _matchScore:    Math.round(c.matchScore * 100),
        _matchTier:     c._matchTier,
        _relaxedTag:    (c as any)._relaxedTag ?? null,
        _filterLayer:   1 as const,
      }));

      const filterScored = applyFilterScoring(placesToRank, tab, filters);
      const rankedAi     = await geminiRankAndAnalyse(placesToRank, tab, filters, filterScored.map(s => s.filterScore));

      const sorted          = [...rankedAi].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
      const geminiOrdered   = sorted.map((ai: any) => placesToRank[ai.originalIdx ?? 0] ?? placesToRank[0]);
      const reorderedPlaces = pinNameMatchToTop(geminiOrdered, filters.searchQuery ?? '');

      const buildHotelResult = (p: any, ai: any, globalIdx: number) => {
        const mTags      = (p._matchedTags   ?? []) as string[];
        const cTags      = (p._confirmedTags ?? []) as string[];
        const tEvid      = (p._tagEvidence   ?? {}) as Record<string, string>;
        const tSnip      = (p._tagSnippets   ?? {}) as Record<string, string>;
        const matchScore = (p._matchScore    ?? 100) as number;  // 0-100 match %
        const fLayer     = 1 as const;

        // Sort reviews: keyword evidence first, then recent positive reviews
        const primaryMatchedTag = mTags[0] ?? '';
        const kws = primaryMatchedTag ? (TAG_TEXT_KEYWORDS[primaryMatchedTag] ?? []) : [];
        const displayReviews = filterReviewsForDisplay(p.reviews ?? []);
        const allSortedReviews = sortReviewsForDisplay(displayReviews, kws);
        // Prefer 4-5★ reviews that mention the tag keyword; fall back to any match
        const positiveTagMatched = kws.length > 0
          ? allSortedReviews.filter((r: any) => (r.rating ?? 0) >= 4 && kws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
          : [];
        const anyTagMatched = kws.length > 0
          ? allSortedReviews.filter((r: any) => kws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
          : [];
        const bestTagMatch = positiveTagMatched.length > 0 ? positiveTagMatched : anyTagMatched;
        const pickedReviews: any[] = bestTagMatch.length > 0 ? [bestTagMatch[0]] : [];
        const remainingReviews = allSortedReviews.filter((r: any) => !pickedReviews.includes(r));
        if (pickedReviews.length < 2) pickedReviews.push(...remainingReviews.slice(0, 2 - pickedReviews.length));
        const uiReviews = pickedReviews.slice(0, 2).map((r: any) => {
            const body = (r.text?.text ?? '').toLowerCase();
            const matchedKw = kws.find(k => body.includes(k));
            return {
              text:      r.text?.text ?? '',
              author:    r.authorAttribution?.displayName ?? 'Visitor',
              location:  'Tamil Nadu',
              stars:     r.rating ?? 5,
              ago:       r.relativePublishTimeDescription ?? 'Recently',
              highlight: matchedKw,
            };
          });

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
          ? `Top-ranked: ${rating}★ × ${reviewCount.toLocaleString()} reviews — matches ${mTags.length}/${selectedTags.length || 1} selected tags`
          : `${rating}★ with ${reviewCount.toLocaleString()} reviews — matches ${mTags.length}/${selectedTags.length || 1} tags`;
        const topReviewText = sortReviewsForDisplay(displayReviews)
          .find((r: any) => (r.text?.text ?? '').length > 15);
        const reviewSummaryFB = topReviewText
          ? `${rating}★ across ${reviewCount.toLocaleString()} reviews. Visitors say: "${(topReviewText.text?.text ?? '').slice(0, 80).trim()}"`
          : `${rating}★ rated by ${reviewCount.toLocaleString()} verified visitors.`;

        // filterVerification: prefer tag snippet, then ai output, then tag evidence
        const primarySnippet = Object.values(tSnip)[0] ?? null;
        const filterVerification = (() => {
          if (ai.filterVerification) return ai.filterVerification;
          if (primarySnippet) return `"${primarySnippet}"`;
          const evid = Object.values(tEvid)[0];
          if (evid) return evid;
          return null;
        })();

        // Build dataPoints: tag matches first, then decision-relevant signals
        const tagDataPoints = mTags.map(t =>
          `${cTags.includes(t) ? '✓' : '~'} ${t}${tEvid[t] ? ': ' + tEvid[t] : ''}`
        );
        const matchLabel = selectedTags.length > 0
          ? `${matchScore}% tag match (${mTags.length}/${selectedTags.length} tags)`
          : '';
        const trendSignalDP = recentAvgFB !== null
          ? recentAvgFB >= rating + 0.2
            ? `Trending up — recent guests avg ${recentAvgFB}★ vs ${rating}★ all-time`
            : recentAvgFB <= rating - 0.2
            ? `Trending down — recent guests avg ${recentAvgFB}★ vs ${rating}★ all-time`
            : `Consistent — recent guests avg ${recentAvgFB}★, stable near ${rating}★ all-time`
          : null;
        const priceLabelDP = priceStr && priceStr !== 'N/A'
          ? `${priceStr} — ${priceStr === '₹' ? 'budget-friendly' : priceStr === '₹₹' ? 'mid-range' : priceStr === '₹₹₹' ? 'premium' : 'luxury'} stay`
          : null;
        const openLabelDP = p.regularOpeningHours?.openNow !== undefined
          ? (p.regularOpeningHours.openNow ? 'Currently open for check-in' : 'Currently closed — verify hours before visiting')
          : null;
        const dataPoints = [
          ...(matchLabel ? [matchLabel] : []),
          ...tagDataPoints,
          `${rating}★ from ${reviewCount.toLocaleString()} verified guests`,
          priceLabelDP,
          trendSignalDP,
          openLabelDP,
        ].filter((x): x is string => Boolean(x));

        return {
          id:          p.id ?? `place-${globalIdx}`,
          name:        p.displayName?.text ?? 'Unknown',
          address:     p.formattedAddress  ?? 'Thanjavur, Tamil Nadu',
          lat:         p.location?.latitude  ?? null,
          lng:         p.location?.longitude ?? null,
          dist:        0,
          rating,
          reviewCount,
          priceLevel:  priceStr,
          openNow:     p.regularOpeningHours?.openNow ?? true,
          tags:        (p.types ?? []).slice(0, 5).map((t: string) =>
                         t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                       ),
          reviewSummary:      ai.reviewSummary   || reviewSummaryFB,
          aiNote:             ai.aiNote          || `Verified by AI: ${rating}★${selectedTags.length > 0 ? ` — ${matchScore}% tag match (${mTags.length}/${selectedTags.length})` : ''}`,
          filterVerification,
          matchedKeyword:     primaryMatchedTag || null,
          matchedTags:        mTags,
          confirmedTags:      cTags,
          tagEvidence:        Object.values(tEvid)[0] ?? null,
          matchScore,
          matchTier:          (p._matchTier ?? 'Perfect Match') as 'Perfect Match' | 'Close Match',
          relaxedTag:         p._relaxedTag ?? null,
          filterLayer:        fLayer,
          trendVerdict:       ai.trendVerdict ?? 'stable',
          trendReason:        ai.trendReason  || trendReasonFB,
          recentRatings:      recent5.map((r: any) => r.rating ?? 0).filter((n: number) => n > 0),
          reviews:            uiReviews,
          photoColor:         COLORS[globalIdx % COLORS.length],
          photoRef:           p.photos?.[0]?.name ?? null,
          websiteUri:         p.websiteUri    ?? null,
          googleMapsUri:      p.googleMapsUri ?? null,
          aiDetail: {
            whyOverOthers: ai.whyOverOthers || whyOverOthersFB,
            dataPoints,
            bestFor: ai.bestFor || `Visitors wanting ${priceStr} stay — ${reviewCount.toLocaleString()} reviews confirm ${rating}★`,
            ...(ai.caveat ? { caveat: ai.caveat } : {}),
            ...(ai.insiderTip ? { insiderTip: ai.insiderTip } : {}),
          },
        };
      };

      const finalResults = reorderedPlaces.map((p: any, i: number) =>
        buildHotelResult(p, sorted[i] ?? {}, i)
      );

      return res.json({ results: finalResults });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FOOD
    // ═══════════════════════════════════════════════════════════════════════
    const foodState = getCityState(city);
    // Free-text search: raw query + city, no locationBias — mirrors Google Maps ranking.
    // Filter-tag mode: city-centre bias as before.
    const query = filters.searchQuery
      ? `${filters.searchQuery} in ${city} ${foodState}`
      : buildFoodQuery(filters);
    const foodNoLocationBias = !!filters.searchQuery;

    const foodWithPhotos = !filters.searchQuery; // no photos for free-text search results
    const foodBaseOpts: FetchOptions = {
      withPhotos:     foodWithPhotos,
      minRating:      apiMinRating,
      openNow:        apiOpenNow || undefined,
      includedType:   apiIncludedType,
      center:         cityCenter,
      noLocationBias: foodNoLocationBias,
    };

    // 5 parallel variants for tag/filter searches → ~80-100 unique candidates.
    // Free-text search stays single-call (name-specific, variants add noise).
    let rawPlaces: any[];
    if (filters.searchQuery) {
      rawPlaces = await fetchPlaces(query, searchSeed, 20, foodBaseOpts);
    } else {
      const broadOpts: FetchOptions = { ...foodBaseOpts, includedType: undefined, minRating: 0, noLocationBias: false };
      const foodVariants: PoolVariant[] = [
        { query, seed: searchSeed,            opts: foodBaseOpts },
        { query, seed: (searchSeed + 1) % 4, opts: foodBaseOpts },
        { query: `restaurants dining in ${city} ${foodState}`,              seed: searchSeed,            opts: broadOpts },
        { query: `tiffin center mess food hotels ${city} ${foodState}`,     seed: (searchSeed + 2) % 4, opts: broadOpts },
        { query: `best restaurants ${city} Tamil Nadu`,                     seed: (searchSeed + 3) % 4, opts: broadOpts },
      ];
      rawPlaces = await fetchPlacesPool(foodVariants);
    }

    const localPlaces  = filterCityOnly(rawPlaces, city);

    // Hard-exclude non-restaurant place types (fish stalls, aquariums, pet shops, etc.)
    // primaryType is Google's single definitive type — most reliable signal available.
    // Falls back to types[] array, then name/editorial keyword check.
    const restaurantPlaces = localPlaces.filter(p => {
      const primaryType = (p.primaryType ?? '') as string;
      const types = (p.types ?? []) as string[];
      // primaryType hard-excludes immediately (single most-accurate signal)
      if (primaryType && NON_RESTAURANT_TYPES.has(primaryType)) return false;
      // types[] array check
      if (types.some(t => NON_RESTAURANT_TYPES.has(t))) return false;  // confirmed non-restaurant
      // primaryType confirms restaurant
      if (primaryType && RESTAURANT_TYPES.has(primaryType)) return true;
      // types[] array confirms restaurant
      if (types.some(t => RESTAURANT_TYPES.has(t))) return true;
      // No definitive type — allow only if name/editorial mentions dining context
      const nameAddr = `${(p.displayName?.text ?? '').toLowerCase()} ${(p.editorialSummary?.text ?? '').toLowerCase()}`;
      return /restaurant|cafe|diner|eatery|dining|tiffin|hotel|mess|dhaba|biryani|meals|food court/i.test(nameAddr);
    });
    const foodPool = filterStalePlaces(restaurantPlaces.length >= 2 ? restaurantPlaces : localPlaces)
      .filter(p => (p.rating ?? 0) >= 3.5);

    const tagFiltered  = applyTagFilter(foodPool, tab, filters);
    const hardFiltered = applyStrictFilter(tagFiltered, tab, filters);
    const filterScored = applyFilterScoring(hardFiltered, tab, filters);

    // Pool is already ≥3.5 rated and active (reviewed within 6 months) from foodPool above.
    // Prefer places with ≥5 reviews; only fall back within the 3.5+ pool — never below.
    const qualified    = filterScored.filter(({ place }) => (place.userRatingCount ?? 0) >= 5);
    const scoredToRank = qualified.length >= 5 ? qualified : filterScored;

    const placesToRank = scoredToRank.map(s => s.place).slice(0, 20);
    const placeScores  = scoredToRank.map(s => s.filterScore).slice(0, 20);

    const rankedAi = await geminiRankAndAnalyse(placesToRank, tab, filters, placeScores);
    const sorted          = [...rankedAi].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    const geminiOrderedF  = sorted.map((ai: any) => placesToRank[ai.originalIdx ?? 0] ?? placesToRank[0]);
    const reorderedPlaces = pinNameMatchToTop(geminiOrderedF, filters.searchQuery ?? '');

    const buildPlaceResult = (p: any, ai: any, globalIdx: number) => {
      const evidence = p._matchEvidence as { keyword: string; snippet: string | null; source: string } | undefined;

      const evidenceKws = evidence?.keyword ? [evidence.keyword.toLowerCase()] : [];
      const displayReviews = filterReviewsForDisplay(p.reviews ?? []);
      const allSortedFood = sortReviewsForDisplay(displayReviews, evidenceKws);
      // Prefer 4-5★ reviews that mention the tag keyword; fall back to any match
      const positiveTagFood = evidenceKws.length > 0
        ? allSortedFood.filter((r: any) => (r.rating ?? 0) >= 4 && evidenceKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
        : [];
      const anyTagFood = evidenceKws.length > 0
        ? allSortedFood.filter((r: any) => evidenceKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
        : [];
      const bestTagFood = positiveTagFood.length > 0 ? positiveTagFood : anyTagFood;
      const pickedFood: any[] = bestTagFood.length > 0 ? [bestTagFood[0]] : [];
      const remainingFood = allSortedFood.filter((r: any) => !pickedFood.includes(r));
      if (pickedFood.length < 2) pickedFood.push(...remainingFood.slice(0, 2 - pickedFood.length));
      const uiReviews = pickedFood.slice(0, 2).map((r: any) => {
          const body = (r.text?.text ?? '').toLowerCase();
          const matchedKw = evidenceKws.find(k => body.includes(k));
          return {
            text:      r.text?.text ?? '',
            author:    r.authorAttribution?.displayName ?? 'Visitor',
            location:  'Tamil Nadu',
            stars:     r.rating ?? 5,
            ago:       r.relativePublishTimeDescription ?? 'Recently',
            highlight: matchedKw,
          };
        });

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
      const isVeg = p.servesVegetarianFood === true;
      const whyOverOthersFB = globalIdx === 0
        ? `Top in this set: ${rating}★ × ${reviewCount.toLocaleString()} reviews`
        : `${rating}★ with ${reviewCount.toLocaleString()} reviews`;
      const bestForFB = isVeg
        ? `Vegetarian food seekers — ${reviewCount.toLocaleString()} diners confirm ${rating}★ quality & authentic taste`
        : `Food lovers seeking local flavour — ${rating}★ from ${reviewCount.toLocaleString()} verified diners`;
      const topReviewText = sortReviewsForDisplay(displayReviews)
        .find((r: any) => (r.text?.text ?? '').length > 15);
      const reviewSummaryFB = topReviewText
        ? `${rating}★ across ${reviewCount.toLocaleString()} reviews. Visitors say: "${(topReviewText.text?.text ?? '').slice(0, 80).trim()}"`
        : `${rating}★ rated by ${reviewCount.toLocaleString()} verified visitors.`;

      return {
        id:          p.id ?? `place-${globalIdx}`,
        name:        p.displayName?.text ?? 'Unknown',
        address:     p.formattedAddress  ?? 'Thanjavur, Tamil Nadu',
        lat:         p.location?.latitude  ?? null,
        lng:         p.location?.longitude ?? null,
        dist:        0,
        rating,
        reviewCount,
        priceLevel:  priceStr,
        openNow:     p.regularOpeningHours?.openNow ?? true,
        tags:        (p.types ?? []).slice(0, 5).map((t: string) =>
                       t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                     ),
        reviewSummary:      ai.reviewSummary || reviewSummaryFB,
        aiNote:             ai.aiNote        || `Verified by AI: ${rating}★ across ${reviewCount.toLocaleString()} reviews`,
        filterVerification: (() => {
          if (evidence?.snippet) return `"${evidence.snippet}"`;
          if (evidence) return `Confirmed: matches '${evidence.keyword}'`;
          return ai.filterVerification || null;
        })(),
        matchedKeyword:  evidence?.keyword ?? null,
        matchedTags:     (p._matchedTags ?? []) as string[],
        confirmedTags:   (p._matchedTags ?? []) as string[],
        tagEvidence:     null,
        filterLayer:     1 as const,
        trendVerdict:    ai.trendVerdict ?? 'stable',
        trendReason:     ai.trendReason  || trendReasonFB,
        reviews:         uiReviews,
        photoColor:      COLORS[globalIdx % COLORS.length],
        photoRef:        p.photos?.[0]?.name ?? null,
        websiteUri:      p.websiteUri    ?? null,
        googleMapsUri:   p.googleMapsUri ?? null,
        aiDetail: {
          whyOverOthers: ai.whyOverOthers || whyOverOthersFB,
          dataPoints: (() => {
            const tSig = recentAvgFB !== null
              ? recentAvgFB >= rating + 0.2
                ? `Trending up — recent diners avg ${recentAvgFB}★ vs ${rating}★ all-time`
                : recentAvgFB <= rating - 0.2
                ? `Trending down — recent diners avg ${recentAvgFB}★ vs ${rating}★ all-time`
                : `Consistent — recent diners avg ${recentAvgFB}★, stable near ${rating}★ all-time`
              : null;
            const pSig = priceStr && priceStr !== 'N/A'
              ? `${priceStr} — ${priceStr === '₹' ? 'budget-friendly' : priceStr === '₹₹' ? 'mid-range' : 'premium'} pricing`
              : null;
            const oSig = p.regularOpeningHours?.openNow !== undefined
              ? (p.regularOpeningHours.openNow ? 'Currently open for dining' : 'Currently closed — check hours before visiting')
              : null;
            return [
              `${rating}★ from ${reviewCount.toLocaleString()} verified diners`,
              pSig, tSig, oSig,
            ].filter((x): x is string => Boolean(x));
          })(),
          bestFor: ai.bestFor || bestForFB,
          ...(ai.caveat ? { caveat: ai.caveat } : {}),
          ...(ai.insiderTip ? { insiderTip: ai.insiderTip } : {}),
        },
      };
    };

    // Gemini has already selected best — build the final result list directly
    const finalResults = reorderedPlaces.map((p: any, i: number) =>
      buildPlaceResult(p, sorted[i] ?? {}, i)
    );

    return res.json({ results: finalResults });
  } catch (err) {
    console.error('[/api/plan]', err);
    return res.status(500).json({ error: 'Failed to fetch places data' });
  }
}
