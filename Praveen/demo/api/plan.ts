import type { VercelRequest, VercelResponse } from '@vercel/node';
// ── Thanjavur itinerary preset (inline) ─────────────────────────────────────
// factual fields are hardcoded from THANJAVUR_FACTS ground truth.
// Gemini enriches tip / cautionNote / avoidNote only — failures fall back safely.
const THANJAVUR_PRESET: Record<string, Array<{
  label:            string;
  aliases:          string[];
  travelToNext:     string | null;
  reachNote:        string;
  currentTraffic:   'Light' | 'Moderate' | 'Heavy';
  yesterdayTraffic: 'Light' | 'Moderate' | 'Heavy';
  trafficNote:      string;
  entryFee:         string;
  duration:         string;
  crowdLevel:       'Low' | 'Moderate' | 'High';
  highlights:       string[];
  tip:              string;
  isLunchBreak?:    boolean;
}>> = {
  // ── Morning / Full Day — 7 AM → 8 PM ─────────────────────────────────────
  '07:00': [
    { label: 'Brihadeeswarar Temple',
      aliases: ['brihadeeswarar','big temple','brihadeeswara','peruvudaiyar'],
      travelToNext: '10 min · Auto',
      reachNote: 'Starting point — arrive before 7 AM for sunrise puja. Traffic is nonexistent at this hour.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Light traffic early morning — peaceful walkthrough, minimal crowd.',
      entryFee: 'Free entry', duration: '2 hrs', crowdLevel: 'Low',
      highlights: ['Vimana — 66m tower, tallest of its era', 'Morning puja — 7 AM sanctum lighting ceremony', 'Nandi statue — monolithic bull carved from a single rock'],
      tip: 'Enter East Gopuram by 7:10 AM for the morning puja. Stand in the inner courtyard — the 66m vimana shadow never falls outside the temple walls.' },
    { label: 'Rajarajan Manimandapam',
      aliases: ['rajarajan','manimandapam','rajaraja statue','rajarajan statue'],
      travelToNext: '10 min · Auto',
      reachNote: 'Auto from Big Temple — ask the driver for Rajarajan Manimandapam; statue complex is a short auto ride away.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Light morning traffic — the area is quiet before 10 AM.',
      entryFee: 'Free entry', duration: '30 min', crowdLevel: 'Low',
      highlights: ['Rajaraja I statue — Chola king who built the Big Temple', 'Memorial hall — Chola dynasty historical panels', 'Photography vantage — full Big Temple gopuram view'],
      tip: 'Stand at the Manimandapam entrance facing the temple for the cleanest unobstructed gopuram photograph. Best morning angle for full-height framing.' },
    { label: 'Schwartz Church',
      aliases: ['schwartz','schwartz church','danish mission','church'],
      travelToNext: '8 min · Walk',
      reachNote: 'Short auto from Rajarajan Manimandapam — church spire is visible from the main road heading south.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Almost no crowd in the morning — one of Thanjavur\'s most peaceful heritage sites.',
      entryFee: 'Free entry', duration: '30 min', crowdLevel: 'Low',
      highlights: ['18th-century Danish colonial church', 'Serfoji II marble cenotaph — Maratha-European fusion memorial', 'Gothic arch windows in Tamil colonial setting'],
      tip: 'The Serfoji II cenotaph inside is historically significant — commissioned in memory of the Danish missionary who shaped Maratha-era Thanjavur. Inscription in Tamil and English.' },
    { label: 'Thanjavur Palace',
      aliases: ['thanjavur palace','maratha palace','royal museum','nayak palace'],
      travelToNext: '2 min · Walk',
      reachNote: '~650m walk south from Schwartz Church — enter Palace from the north gate on Palace Road.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Light morning traffic — crowd builds from 10 AM.',
      entryFee: '₹50 / adult', duration: '1.5 hrs', crowdLevel: 'Low',
      highlights: ['Bell Tower — 5th floor panoramic view of Big Temple', 'Durbar Hall — Maratha ceiling art and royal portraits', 'Museum — ivory throne, royal weapons, Chola bronzes'],
      tip: 'Climb to the Bell Tower 5th floor before 11 AM — best aerial view of the Big Temple complex before the crowd arrives.' },
    { label: 'Saraswathi Mahal Library',
      aliases: ['saraswathi mahal','saraswati mahal','palm leaf','manuscript'],
      travelToNext: '2 min · Walk',
      reachNote: 'Same Palace complex — interior corridor west from Durbar Hall, free to reach.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'No traffic — interior palace walk.',
      entryFee: '₹20 / adult', duration: '45 min', crowdLevel: 'Low',
      highlights: ['49,000+ manuscripts — palm leaf, paper, cloth', '17th-century illustrated Ramayana manuscripts', 'Botanical drawings — rarest illustrated collection in South India'],
      tip: 'Ask the guide for the illustrated manuscript section — 17th-century botanical drawings are the real highlight. Closed Wednesdays, closes 5:30 PM.' },
    { label: 'Thanjavur Art Gallery',
      aliases: ['art gallery','thanjavur art','tanjore art','chola bronze','nataraja gallery'],
      travelToNext: '8 min · Auto',
      reachNote: 'Same Palace complex — separate entrance on the east wing, 2-min walk through the inner courtyard.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Quiet midday — most tourists visit in the afternoon.',
      entryFee: '₹30 / adult', duration: '1 hr', crowdLevel: 'Low',
      highlights: ['Chola bronze Nataraja — 11th-century UNESCO-level masterwork', 'Ardhanarisvara stone panel — most significant sculpture', '1000+ stone and metal pieces from 9th–13th century'],
      tip: 'Focus on the Nataraja and Saraswathi bronzes in the central hall — finest Chola bronzes outside Chennai. The Ardhanarisvara panel at the far end is unmissable.' },
    { label: 'Sivaganga Fort',
      aliases: ['sivaganga','sivaganga fort','sivaganga park','sivagangai'],
      travelToNext: null,
      reachNote: '~900m auto from Palace complex — 8 min ride to the fort entrance on Sivaganga Road.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Quiet midday — fort and tank area largely empty before 2 PM.',
      entryFee: 'Free entry', duration: '45 min', crowdLevel: 'Low',
      highlights: ['Fort ramparts — unobstructed view of Big Temple from a distance', 'Sivaganga tank — peaceful waterfront walk', 'Open ruins — uncrowded, best photography spot in Thanjavur'],
      tip: 'Walk the full fort rampart perimeter. The tank reflection and the warm stone gopuram backdrop in the distance make this Thanjavur\'s best photography location.' },
  ],

  // ── Afternoon — 2 PM → 7 PM ───────────────────────────────────────────────
  '14:00': [
    { label: 'Brihadeeswarar Temple',
      aliases: ['brihadeeswarar','big temple','brihadeeswara','peruvudaiyar'],
      travelToNext: '8 min · Auto',
      reachNote: 'Starting point — outer complex open all day; inner sanctum reopens 4 PM for evening session.',
      currentTraffic: 'Heavy', yesterdayTraffic: 'Moderate',
      trafficNote: 'Heavy afternoon traffic on approach roads — auto is faster than walking in midday heat.',
      entryFee: 'Free entry', duration: '1 hr', crowdLevel: 'High',
      highlights: ['Outer gopuram — best afternoon light for photography', 'Nandi statue — striking in afternoon shadow', 'Courtyard walk — 66m vimana at close range'],
      tip: 'Visit the outer courtyard at 2 PM while inner sanctum is closed. Return to enter sanctum at 4 PM for lamp-lighting. Carry water — courtyard is open to sky in afternoon heat.' },
    { label: 'Thanjavur Palace',
      aliases: ['thanjavur palace','maratha palace','royal museum','nayak palace'],
      travelToNext: '2 min · Walk',
      reachNote: '8 min auto from Big Temple — Palace entrance on Palace Road.',
      currentTraffic: 'Moderate', yesterdayTraffic: 'Moderate',
      trafficNote: 'Moderate afternoon crowd — Bell Tower has shorter queue than morning.',
      entryFee: '₹50 / adult', duration: '1 hr', crowdLevel: 'Moderate',
      highlights: ['Durbar Hall — ceiling art and Maratha royal portraits', 'Bell Tower — panoramic city view', 'Museum — ivory throne, royal artefacts'],
      tip: 'Afternoon crowd at the Bell Tower is lighter than morning. Gallery closes at 5 PM — arrive by 3:15 PM to see both Palace and Library in time.' },
    { label: 'Saraswathi Mahal Library',
      aliases: ['saraswathi mahal','saraswati mahal','palm leaf','manuscript'],
      travelToNext: '5 min · Walk',
      reachNote: 'Same Palace complex — 2-min walk through the interior corridor from the Durbar Hall.',
      currentTraffic: 'Light', yesterdayTraffic: 'Light',
      trafficNote: 'Sparse afternoon crowd — quiet corridors by 4:30 PM.',
      entryFee: '₹20 / adult', duration: '45 min', crowdLevel: 'Low',
      highlights: ['49,000+ manuscripts on palm leaf and cloth', 'Illustrated Ramayana texts — 17th century', 'Botanical drawings — rare illustrated collection'],
      tip: 'Closes at 5:30 PM — arrive by 4:30 PM. Ask attendant to show the botanical drawing collection. The illustrated manuscript gallery is the real highlight.' },
    { label: 'Brihadeeswarar Temple (Evening Puja)',
      aliases: ['brihadeeswarar evening','big temple evening','evening puja','peruvudaiyar evening'],
      travelToNext: null,
      reachNote: '5 min walk from Saraswathi Mahal — return to the Big Temple for the evening session.',
      currentTraffic: 'Heavy', yesterdayTraffic: 'Heavy',
      trafficNote: 'Heavy evening crowd — temple at peak atmosphere with pilgrims, devotees, and tourists.',
      entryFee: 'Free entry', duration: '1.5 hrs', crowdLevel: 'High',
      highlights: ['Evening puja — oil lamps lit in inner sanctum from 6 PM', 'Gopuram floodlit at dusk — stunning against darkening sky', 'Nadaswaram music fills courtyard at lamp-lighting'],
      tip: 'Position inside East Gopuram corridor by 5:45 PM for the 6 PM lamp-lighting. The evening puja is the spiritual and visual centrepiece of any Thanjavur visit.' },
  ],
  '17:00': [
    { label: 'Brihadeeswarar Temple',
      aliases: ['brihadeeswarar','big temple','brihadeeswara','peruvudaiyar'],
      travelToNext: '20 min · Auto',
      reachNote: 'Starting point — inner sanctum reopens 4 PM for evening puja. Most atmospheric visit of the day.',
      currentTraffic: 'Heavy', yesterdayTraffic: 'Heavy',
      trafficNote: 'Heavy evening crowd 5–7 PM — temple at its most atmospheric with pilgrims and devotees.',
      entryFee: 'Free entry', duration: '1.5 hrs', crowdLevel: 'High',
      highlights: ['Evening puja — sanctum lit with oil lamps from 6 PM', 'Outer gopuram floodlit at dusk — best photography', 'Nadaswaram music fills the courtyard at lamp-lighting'],
      tip: 'Arrive at 5 PM and position yourself near the East Gopuram inner corridor by 6 PM. The evening lamp-lighting is the spiritual centrepiece. Leave by 6:30 PM for the drive south.' },
    { label: 'Punnainallur Mariamman Kovil',
      aliases: ['punnainallur','mariamman','punnainallur mariamman','mariamman kovil','shri mariamman'],
      travelToNext: null,
      reachNote: '~7 km south of Big Temple — 20 min auto (~₹120). Highway approach is smooth; final 500m near temple gates can be congested on auspicious days.',
      currentTraffic: 'Moderate', yesterdayTraffic: 'Light',
      trafficNote: 'Moderate devotional crowd in the evening — manageable outside festival days.',
      entryFee: 'Free entry', duration: '1 hr', crowdLevel: 'Moderate',
      highlights: ['Mariamman deity — powerful Shakti pilgrimage site', 'Temple tank — serene evening atmosphere', 'Evening aarti — 7 PM ritual lamp lighting'],
      tip: 'Arrive before 7:30 PM for the evening aarti. The temple is most atmospheric at dusk when the lamps are lit around the tank. Crowd is steady but not overwhelming outside Tamil festival days.' },
  ],
  '16:00': [
    { label: 'Brihadeeswarar Temple',
      aliases: ['brihadeeswarar','big temple','brihadeeswara','peruvudaiyar'],
      travelToNext: '20 min · Auto',
      reachNote: 'Starting point — inner sanctum reopens 4 PM for evening puja. Most atmospheric visit of the day.',
      currentTraffic: 'Heavy', yesterdayTraffic: 'Heavy',
      trafficNote: 'Heavy evening crowd 5–7 PM — temple at its most atmospheric with pilgrims and devotees.',
      entryFee: 'Free entry', duration: '1.5 hrs', crowdLevel: 'High',
      highlights: ['Evening puja — sanctum lit with oil lamps from 6 PM', 'Outer gopuram floodlit at dusk — best photography', 'Nadaswaram music fills the courtyard at lamp-lighting'],
      tip: 'Arrive at 5 PM and position yourself near the East Gopuram inner corridor by 6 PM. The evening lamp-lighting is the spiritual centrepiece. Leave by 6:30 PM for the drive south.' },
    { label: 'Punnainallur Mariamman Kovil',
      aliases: ['punnainallur','mariamman','punnainallur mariamman','mariamman kovil','shri mariamman'],
      travelToNext: null,
      reachNote: '~7 km south of Big Temple — 20 min auto (~₹120). Highway approach is smooth; final 500m near temple gates can be congested on auspicious days.',
      currentTraffic: 'Moderate', yesterdayTraffic: 'Light',
      trafficNote: 'Moderate devotional crowd in the evening — manageable outside festival days.',
      entryFee: 'Free entry', duration: '1 hr', crowdLevel: 'Moderate',
      highlights: ['Mariamman deity — powerful Shakti pilgrimage site', 'Temple tank — serene evening atmosphere', 'Evening aarti — 7 PM ritual lamp lighting'],
      tip: 'Arrive before 7:30 PM for the evening aarti. The temple is most atmospheric at dusk when the lamps are lit around the tank. Crowd is steady but not overwhelming outside Tamil festival days.' },
  ],
};

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
  'places.priceRange',
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

// Food tag → keywords — 15 active tags (3×5)
const FOOD_TAG_KEYWORDS: Record<string, string[]> = {
  // ── Diet (strict filter — do NOT change, used by applyStrictFilter) ──────
  'Pure Veg':          ['pure veg', 'veg only', 'vegetarian only', 'sattvic', 'saivam', 'no non-veg', 'bhavan', 'vegetarian restaurant', 'bhawan', 'serves vegetarian'],
  'Non-Veg':           ['non-veg', 'nonveg', 'chicken', 'mutton', 'fish', 'prawn', 'non veg', 'seafood', 'meat', 'egg', 'shawarma', 'kozhi', 'meen', 'non vegetarian'],
  // ── Cuisine (5) ──────────────────────────────────────────────────────────
  'South Indian':      ['south indian', 'dosa', 'dosai', 'idli', 'idly', 'sambar', 'pongal', 'vada', 'rasam', 'banana leaf', 'saapadu', 'uttapam', 'idiyappam'],
  'Biryani':           ['biryani', 'biriyani', 'dum biryani', 'briyani', 'mandi biryani', 'biryani house', 'chicken biryani', 'mutton biryani'],
  'Veg Biryani':       ['veg biryani', 'vegetable biryani', 'veg biriyani', 'veg dum biryani', 'vegetarian biryani', 'veg biryani house', 'veg pulao', 'thalappakatti veg'],
  'Chettinad':         ['chettinad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'country chicken', 'anjappar', 'chettinad style', 'chettinad cuisine'],
  'North Indian':      ['north indian', 'paneer', 'butter masala', 'naan', 'roti', 'dal makhani', 'kadai', 'punjabi', 'butter chicken'],
  'Mess & Meals':      ['mess', 'meals', 'full meals', 'thali', 'banana leaf', 'saapadu', 'lunch thali', 'rice meals'],
  // ── Dining Style (5) ─────────────────────────────────────────────────────
  'Tiffin':            ['tiffin', 'tiffin center', 'tiffin centre', 'idli', 'dosa', 'vada', 'pongal', 'upma', 'morning tiffin', 'breakfast'],
  'Fine Dining':       ['fine dine', 'fine dining', 'fine-dine', 'elegant', 'upscale dining', 'fine cuisine', 'fine restaurant', 'ambience', 'ambiance', 'atmosphere', 'romantic', 'classy', 'fancy', 'interiors', 'decor', 'premium dining', 'special occasion'],
  'Buffet':            ['buffet', 'unlimited buffet', 'all you can eat', 'buffet lunch', 'buffet dinner', 'unlimited spread'],
  'Cafe & Drinks':     ['cafe', 'filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'strong tea', 'coffee shop', 'beverages', 'south indian coffee', 'coffee', 'tea', 'chai', 'cold coffee', 'juice', 'shakes', 'milkshake', 'espresso', 'latte'],
  'Family Dining':     ['family dining', 'family restaurant', 'family friendly', 'good for families', 'kids menu', 'kids friendly', 'children friendly', 'suitable for kids', 'kids', 'children'],
  // ── Preference (5) ───────────────────────────────────────────────────────
  'Fresh & Hot':       ['fresh', 'freshly cooked', 'hot and fresh', 'made fresh', 'steaming hot', 'piping hot', 'freshly made', 'hot food', 'served hot', 'warm food', 'just cooked', 'freshly prepared', 'hot dish', 'made to order'],
  'Budget Friendly':   ['affordable', 'cheap', 'pocket friendly', 'value for money', 'value money', 'affordable price', 'economical', 'budget meal', 'low price', 'reasonable', 'worth it', 'good price', 'inexpensive', 'cost effective', 'cheap rate', 'value', 'cheap food'],
  'Authentic':         ['authentic', 'authentic taste', 'traditional', 'original', 'since 1964', 'authentic south', 'ancestral', 'old recipe', 'generations', 'age old', 'traditional taste', 'heritage', 'original taste', 'classic', 'old school', 'timeless', 'unchanged recipe', 'traditional method'],
  'Lunch Spot':        ['lunch', 'lunch thali', 'afternoon', 'noon', 'lunch time', 'lunch crowd', 'midday'],
  'Dinner Special':    ['dinner', 'evening', 'night', 'dinner menu', 'dinner special', 'serves dinner', 'late night', 'dinner time', 'evenings', 'night time', 'open late', 'dinner crowd', 'dinner buffet', 'evening meal', 'night dining'],
  // ── Non-veg specific dishes (imply Non-Veg hard filter) ──────────────────
  'Seafood':               ['seafood', 'fish', 'prawn', 'crab', 'lobster', 'squid', 'oyster', 'meen', 'nandu', 'shrimp', 'prawn fry', 'fish fry', 'fish curry', 'sea food'],
  'Crab':                  ['crab', 'nandu', 'crab curry', 'crab masala', 'crab fry', 'crab rice', 'crab roast', 'mud crab'],
  'Prawn':                 ['prawn', 'shrimp', 'prawn masala', 'prawn fry', 'prawn curry', 'prawn biryani', 'chemmeen'],
  'Chicken Biryani':       ['chicken biryani', 'chicken biriyani', 'chicken dum biryani', 'chicken biryani rice'],
  // ── Thematic advanced tags ────────────────────────────────────────────────
  'South Indian Breakfast': ['idli', 'dosa', 'dosai', 'vada', 'vadai', 'idly', 'south indian breakfast', 'breakfast'],
  'Pongal & Coffee':        ['pongal', 'filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'ven pongal'],
  'Thali & Meals':          ['thali', 'meals', 'full meals', 'banana leaf', 'saapadu', 'lunch thali', 'rice meals'],
  'Parotta / Kothu':        ['parotta', 'kothu', 'kothu parotta', 'idiyappam', 'kothu roti', 'parota'],
  'Tea & Snacks':           ['tea', 'chai', 'evening snacks', 'snacks', 'pakoda', 'bajji', 'bonda', 'murukku'],
  'Chicken / Mutton':       ['chicken', 'mutton', 'kozhi', 'chicken curry', 'mutton curry', 'chicken gravy', 'mutton gravy'],
  'Grills & Shawarma':      ['shawarma', 'bbq', 'grills', 'alfaham', 'barbeque', 'grill', 'grilled', 'kebab', 'tikka'],
  'Biryani & Mandi':        ['biryani', 'biriyani', 'mandi', 'dum biryani', 'briyani', 'biryani house'],
  'Indo-Chinese':           ['noodles', 'manchurian', 'fried rice', 'soup', 'indo chinese', 'indo-chinese', 'schezwan', 'chilli chicken'],
};

// Place types that indicate food/restaurant — used to exclude from hotel results
// Types that confirm a place IS a restaurant/food outlet — used to keep food results
const RESTAURANT_TYPES = new Set([
  'restaurant', 'food', 'cafe', 'bakery', 'bar', 'meal_delivery',
  'meal_takeaway', 'night_club', 'fast_food_restaurant', 'south_indian_restaurant',
  'north_indian_restaurant', 'chinese_restaurant', 'seafood_restaurant',
]);

// Types that confirm a place is NOT a restaurant — hard exclude from Food results
const NON_RESTAURANT_TYPES = new Set([
  'aquarium', 'pet_store', 'zoo', 'supermarket', 'grocery_store', 'convenience_store',
  'department_store', 'clothing_store', 'shoe_store', 'hardware_store', 'furniture_store',
  'fish_market', 'seafood_market', 'market', 'fish_store', 'butcher_shop',
  'tourist_attraction', 'museum', 'art_gallery', 'park', 'church', 'mosque', 'temple',
  'hospital', 'pharmacy', 'bank', 'atm', 'gas_station', 'car_wash', 'car_repair',
  'car_dealer', 'motorcycle_dealer', 'auto_parts_store', 'car_rental', 'vehicle_rental',
  'lodging', 'hotel', 'motel', 'guest_house',
]);

// Types that hard-exclude a place from Hotel results
// A car dealer / service center has no lodging type — must be blocked explicitly
const NON_HOTEL_TYPES = new Set([
  'restaurant', 'cafe', 'bakery', 'bar', 'food', 'meal_delivery', 'meal_takeaway',
  'fast_food_restaurant', 'south_indian_restaurant', 'north_indian_restaurant',
  'car_dealer', 'motorcycle_dealer', 'auto_parts_store', 'car_repair', 'car_wash',
  'car_rental', 'vehicle_rental', 'gas_station', 'fuel',
  'school', 'university', 'college', 'hospital', 'clinic', 'doctor', 'pharmacy',
  'bank', 'atm', 'finance', 'insurance_agency', 'real_estate_agency',
  'shopping_mall', 'electronics_store', 'clothing_store', 'hardware_store',
  'tourist_attraction', 'museum', 'art_gallery', 'park', 'church', 'mosque', 'temple',
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
  'Near Railway Station':['railway station', 'railway', 'junction', 'station road', 'station', 'near station', 'train station', 'walking distance', 'walk from station'],
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
  'AC Rooms':            ['ac room', 'air conditioned room', 'air-conditioned room', 'centrally air', 'fully ac', 'ac available'],
  'Hot Water':           ['hot water', 'geyser', 'hot shower', 'warm water'],
  'Good WiFi':           ['wifi', 'wi-fi', 'free wifi', 'internet', 'fast wifi'],
  'Free Parking':        ['parking', 'car park', 'free parking', 'valet', 'garage'],
  'Budget Stay':         ['budget', 'affordable', 'cheap', 'economical', 'inexpensive', 'low cost', 'lodge'],
  'Premium Stay':        ['luxury', 'premium', 'five star', '5 star', 'star hotel', 'suite', 'upscale'],
  'Highly Rated':        ['recommend', 'recommended', 'excellent', 'best hotel', 'outstanding', 'top rated'],
  'Comfortable & Quiet': ['comfortable', 'comfort', 'cozy', 'quiet', 'peaceful', 'calm', 'serene'],
  'Good Amenities':      ['amenities', 'wifi', 'internet', 'lift', 'pool', 'facilities', 'generator'],
  'In-House Restaurant': ['in-house restaurant', 'hotel restaurant', 'hotel dining', 'dining hall', 'restaurant in hotel', 'food court'],
  'Breakfast Included':  ['breakfast', 'complimentary breakfast', 'free breakfast'],
  'Good Food':           ['food', 'tasty', 'delicious', 'recommend', 'excellent', 'amazing'],
  'Value for Money':     ['value', 'affordable', 'worth', 'money', 'price', 'budget', 'reasonable'],
  // ── Legacy tags ──────────────────────────────────────────────────────────
  'Near Temple':         ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram'],
  'Near Bus Stand':      ['bus stand', 'bus station', 'setc', 'bus terminus'],
  'Parking':             ['parking', 'car park', 'valet', 'garage'],
  'Heritage':            ['heritage', 'historical', 'palace', 'colonial', 'traditional', 'fort'],
  'Sea View':            ['sea view', 'ocean view', 'beach view', 'sea facing'],
  'River View':          ['river view', 'riverside', 'waterfront'],
  'Swimming Pool':       ['swimming pool', 'pool', 'swim', 'pool side'],
  'Heritage Stay':       ['heritage', 'boutique', 'historic', 'traditional', 'colonial', 'period', 'old charm'],
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
  'Spotlessly Clean':    ['clean', 'cleaning', 'cleanliness', 'spotless', 'spotlessly', 'immaculate', 'hygienic', 'hygiene', 'sanitized', 'sanitary', 'very clean', 'neatly', 'squeaky clean', 'well cleaned', 'tidy'],
  'Well Maintained':     ['maintained', 'well-maintained', 'maintenance', 'neat', 'tidy', 'neatly', 'well kept', 'good condition', 'looks new', 'renovated', 'well managed', 'properly maintained', 'upkeep', 'clean property'],
  'Fresh Rooms':         ['fresh', 'odour', 'smell', 'odor', 'bathroom', 'toilet', 'shower', 'towels', 'bath', 'linen', 'bed sheets', 'bedding', 'airy', 'ventilated', 'fresh linen', 'clean sheets', 'fresh towels', 'no smell', 'pleasant smell', 'mattress'],
  // ── Location & Access ────────────────────────────────────────────────────
  'Near Big Temple':     ['temple', 'kovil', 'big temple', 'brihadeeswarar', 'gopuram', 'close to temple', 'walking distance', 'temple nearby', '5 minutes', '10 minutes', 'few minutes'],
  'Near Railway Station':['railway station', 'railway', 'junction', 'station road', 'station', 'near station', 'train station', 'walking distance', 'walk from station', 'minutes from station', 'close to station', '5 min', '10 min', 'minutes away', 'auto stand', 'easy access'],
  'Central & Walkable':  ['city centre', 'main road', 'central', 'town centre', 'walk', 'walkable', 'walking distance', 'minutes away', 'nearby', 'convenient', 'prime location', 'good location', 'great location', 'central location', 'near everything', 'well located', 'located well', 'good connectivity'],
  'City Centre':         ['city', 'centre', 'central', 'city center', 'town', 'main road', 'heart of', 'prime location', 'good location', 'great location'],
  'Easy Parking':        ['parking', 'car park', 'valet', 'garage', 'bike parking', 'two wheeler', 'bike stand', 'vehicle parking', 'parking space', 'ample parking', 'free parking', 'parking available'],
  'Free Parking':        ['parking', 'car park', 'free parking', 'bike parking', 'two wheeler', 'bike stand', 'vehicle parking', 'parking space', 'ample parking', 'parking available', 'complimentary parking'],
  'Walkable Distance':   ['walk', 'walking', 'walkable', 'nearby', 'close to', 'minutes walk', 'walking distance'],
  'Quiet & Peaceful':    ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free', 'peaceful stay', 'no noise', 'undisturbed', 'relaxing', 'silent', 'restful'],
  'Budget-Friendly':     ['budget', 'affordable', 'cheap', 'economical', 'inexpensive', 'low cost', 'lodge', 'reasonable', 'worth', 'good price', 'value for money', 'pocket friendly'],
  'Prompt Service':      ['prompt', 'quick service', 'fast service', 'responsive', 'smooth', 'efficient', 'quick check', 'hassle free', 'no wait', 'immediate', 'timely', 'fast check', 'smooth check-in', 'easy check-in'],
  'Good Hospitality':    ['hospitality', 'welcoming', 'warm', 'courteous', 'polite', 'hospitable', 'heartwarming', 'felt at home', 'warm welcome', 'great hospitality', 'excellent hospitality'],
  'Highly Recommended':  ['recommend', 'recommended', 'must stay', 'must visit', 'excellent', 'best', 'outstanding', 'highly recommend', 'would recommend'],
  // ── Staff & Hospitality ───────────────────────────────────────────────────
  'Friendly & Helpful':  ['friendly', 'warm', 'warmth', 'welcoming', 'hospitable', 'helpful', 'attentive', 'cooperative', 'caring', 'supportive', 'kind', 'polite', 'courteous', 'nice staff', 'good staff', 'excellent staff', 'great staff', 'staff was'],
  'Warm Hospitality':    ['courteous', 'polite', 'professional', 'respectful', 'well-behaved', 'hospitality', 'heartwarming', 'outstanding service', 'teamwork', 'warm welcome', 'made us feel', 'felt at home', 'personal touch', 'went above', 'great hospitality', 'excellent hospitality', 'welcoming'],
  'Quick Response':      ['prompt', 'promptly', 'quick', 'smooth check', 'responsive', 'fast service', 'quick check-in', 'smooth check-in', 'hassle free', 'hassle-free', 'no waiting', 'immediate', 'timely', 'fast check', 'easy check', 'efficient'],
  // ── Room & Comfort ────────────────────────────────────────────────────────
  'Spacious Rooms':      ['spacious', 'large room', 'big room', 'roomy', 'good space', 'spacious room', 'large rooms', 'good size', 'well sized', 'ample space', 'big rooms', 'comfortable room', 'big', 'huge room', 'enough space', 'good room size', 'nice room'],
  'Comfortable & Quiet': ['comfortable', 'comfort', 'comfortably', 'cozy', 'cosi', 'quiet', 'peaceful', 'calm', 'serene', 'noise-free', 'peaceful stay', 'relaxing', 'good sleep', 'slept well', 'sound sleep', 'undisturbed', 'no noise'],
  // ── Amenities — tags missing from here caused zero keyword matches ─────────
  'AC Rooms':            ['ac', 'air conditioned', 'air conditioning', 'air-conditioned', 'centrally air', 'fully ac', 'ac room', 'ac available', 'cool room', 'cooling', 'well cooled', 'ac working', 'temperature'],
  'Hot Water':           ['hot water', 'geyser', 'hot shower', 'warm water', 'geyser working', 'hot bath', 'warm shower', 'all amenities', 'basic amenities', 'facilities available', 'well equipped', 'hot tap', 'warm tap'],
  'Good WiFi':           ['wifi', 'wi-fi', 'free wifi', 'internet', 'fast wifi', 'wifi available', 'good wifi', 'wifi working', 'wifi speed', 'high speed', 'internet access', 'broadband', 'connectivity'],
  'Good Amenities':      ['amenities', 'wifi', 'wi-fi', 'internet', 'lift', 'elevator', 'pool', 'facilities', 'generator', 'power backup', 'backup', 'ac', 'air conditioning', 'parking', 'well equipped', 'good facilities', 'all facilities', 'basic amenities', 'all amenities', 'tv', 'television', 'fridge', 'refrigerator', 'geyser', 'kettle', 'equipped'],
  'In-House Restaurant': ['in-house restaurant', 'hotel restaurant', 'hotel dining', 'restaurant in hotel', 'dining hall', 'hotel has restaurant', 'restaurant facility', 'food court', 'restaurant', 'dining', 'canteen', 'breakfast served', 'meals served', 'food available', 'room service', 'attached restaurant', 'meals', 'food at hotel', 'food served'],
  // ── Food & Value ─────────────────────────────────────────────────────────
  'Breakfast Included':  ['breakfast included', 'complimentary breakfast', 'free breakfast', 'breakfast provided', 'breakfast', 'morning meal', 'breakfast was', 'breakfast served', 'morning breakfast', 'breakfast available', 'buffet breakfast'],
  'Good Food':           ['food', 'tasty', 'delicious', 'good food', 'fresh food', 'recommend', 'recommended', 'excellent', 'amazing', 'wonderful', 'must visit'],
  'Highly Rated':        ['recommend', 'recommended', 'highly recommend', 'excellent', 'outstanding', 'best hotel', 'great hotel', 'wonderful', 'amazing', 'superb', 'fantastic', 'loved', 'great stay', 'best stay', 'top rated', 'must visit', 'must stay', 'exceptional', 'perfect', 'very good', 'thoroughly enjoyed'],
  'Value for Money':     ['value for money', 'affordable', 'worth', 'good value', 'money', 'price', 'budget', 'reasonable', 'economical', 'decent price'],
  // ── Stay Type ─────────────────────────────────────────────────────────────
  'Premium Stay':        ['luxury', 'premium', 'five star', '5 star', 'star hotel', 'suite', 'upscale', 'elite', 'luxurious', 'high-end', 'top class', 'world class'],
  'Heritage Stay':       ['heritage', 'historical', 'traditional', 'colonial', 'period', 'old charm', 'boutique', 'vintage', 'antique', 'old building', 'historic'],
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
      if      (dist <= 2.0) { score = 1.0; tagEvidence[tag] = `Within 2km of ${lm.label}`; }
      else if (dist <= 4.0) { score = 0.6; tagEvidence[tag] = `About 3–4km from ${lm.label}`; }
      else if (dist <= 7.0) { score = 0.15; tagEvidence[tag] = `Over 5km — not nearby`; }
      else                  { score = 0.0;  tagEvidence[tag] = `Far from ${lm.label}`; }
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

  // ── IN-HOUSE RESTAURANT — specific keyword phrases required ─────────────
  // dineIn boolean alone is not enough (it's true even for pure restaurants).
  // Need specific phrases like "in-house restaurant", "hotel restaurant", "dining hall".
  // Single generic hit is intentionally below threshold (0.40) to prevent false matches.
  const scoreRestaurant = (() => {
    if (place.dineIn === false) return { score: 0.0, ev: 'No dine-in (Google ✓)' };
    const kws  = TAG_TEXT_KEYWORDS['In-House Restaurant'] ?? [];
    const hits = countHits(allText, kws);
    // dineIn true boosts only when review also confirms (avoids scoring restaurants-named-hotels)
    if (place.dineIn === true && hits >= 1) return { score: 0.95, ev: 'Dine-in (Google ✓) + review confirms' };
    if (place.dineIn === true)              return { score: 0.65, ev: 'Dine-in confirmed (Google ✓)' };
    return { score: hits >= 2 ? 0.85 : hits === 1 ? 0.40 : 0.05, ev: hits > 0 ? '"in-house restaurant/dining hall" in reviews' : '' };
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
    // 1 hit = 0.65 (above PERFECT_THRESHOLD=0.55) so single keyword mention qualifies
    allTagScores[tag] = hits >= 3 ? 0.95 : hits >= 2 ? 0.82 : hits >= 1 ? 0.65 : hits >= 0.4 ? 0.40 : 0.10;
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

  // ── BUDGET-FRIENDLY — priceLevel boolean (primary) + name signals + keyword fallback ──
  // Universal: priceLevel is Google's own cost tier — far more reliable than hoping
  // guests write "affordable" in reviews of a ₹500/night lodge.
  {
    let bfScore = 0.30; let bfEv = '';
    if      (priceLevel === 'PRICE_LEVEL_INEXPENSIVE' || priceLevel === 'PRICE_LEVEL_FREE') {
      bfScore = 1.0; bfEv = 'Budget price tier (Google ✓)';
    } else if (priceLevel === 'PRICE_LEVEL_MODERATE') {
      bfScore = 0.65; bfEv = 'Moderate price tier';
    } else if (priceLevel === 'PRICE_LEVEL_EXPENSIVE') {
      bfScore = 0.10; bfEv = 'Premium — not budget';
    } else if (priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE') {
      bfScore = 0.0;  bfEv = 'Luxury — not budget';
    }
    // Name-pattern boost: "lodge", "inn", "residency", "budget", "economy" → typically cheaper
    const budgetNameRx = /\b(lodge|budget|economy|inn|residency|dormitory|hostel|cheap)\b/i;
    if (budgetNameRx.test(name)) {
      bfScore = Math.min(bfScore + 0.20, 1.0);
      bfEv = [bfEv, 'budget name signal'].filter(Boolean).join(' + ');
    }
    // Keyword fallback for priceLevel=null (Google hasn't set the tier yet)
    if (!priceLevel) {
      const kws  = TAG_TEXT_KEYWORDS['Budget-Friendly'] ?? [];
      const hits = countWeightedHits(kws);
      bfScore = hits >= 2 ? 0.75 : hits === 1 ? 0.55 : budgetNameRx.test(name) ? 0.60 : 0.25;
      bfEv = hits > 0 ? `"budget/affordable" ×${hits.toFixed(1)} in reviews` : bfEv;
    }
    allTagScores['Budget-Friendly'] = bfScore;
    if (bfEv) tagEvidence['Budget-Friendly'] = bfEv;
    const s = findSnippet(TAG_TEXT_KEYWORDS['Budget-Friendly'] ?? []); if (s) tagSnippets['Budget-Friendly'] = s;
  }

  // ── QUIET & PEACEFUL — multi-review signal + goodForGroups inverse ──────────
  // Universal: count how many of the 5 most recent reviews explicitly mention
  // quiet/peaceful/calm/serene. 2+ independent reviewers = strong consensus.
  // goodForGroups=true is a soft negative proxy (group venues tend to be louder).
  {
    const qpKws = TAG_TEXT_KEYWORDS['Quiet & Peaceful'] ?? [];
    // Count distinct reviews (not weighted hits) — we want independent mentions
    const qpReviewCount = reviews.filter((r: any) =>
      qpKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
    ).length;
    let qpScore: number; let qpEv = '';
    if (qpReviewCount >= 3) { qpScore = 1.0;  qpEv = `"peaceful/quiet" in ${qpReviewCount} reviews`; }
    else if (qpReviewCount === 2) { qpScore = 0.88; qpEv = `"peaceful/quiet" in ${qpReviewCount} reviews`; }
    else if (qpReviewCount === 1) { qpScore = 0.60; qpEv = `"peaceful/quiet" mentioned in a review`; }
    else {
      // No explicit quiet mentions — use goodForGroups as inverse proxy
      if      (place.goodForGroups === false) { qpScore = 0.65; qpEv = 'Not a group venue (likely quieter)'; }
      else if (place.goodForGroups === true)  { qpScore = 0.20; qpEv = 'Group-friendly venue (may be busy)'; }
      else                                    { qpScore = 0.30; qpEv = ''; }
    }
    // Mild boost if location tags suggest a non-busy-road location
    if ((allTagScores['Near Big Temple'] ?? 0) >= 0.5) qpScore = Math.min(qpScore + 0.05, 1.0);
    allTagScores['Quiet & Peaceful'] = qpScore;
    if (qpEv) tagEvidence['Quiet & Peaceful'] = qpEv;
    const s = findSnippet(qpKws); if (s) tagSnippets['Quiet & Peaceful'] = s;
  }

  // ── PROMPT SERVICE — star-weighted keywords + reservable boolean ───────────
  {
    const psKws  = TAG_TEXT_KEYWORDS['Prompt Service'] ?? [];
    const psHits = countWeightedHits(psKws);
    let psScore = psHits >= 3 ? 0.95 : psHits >= 2 ? 0.82 : psHits >= 1 ? 0.55 : psHits >= 0.4 ? 0.38 : 0.20;
    let psEv = psHits > 0 ? `"${psKws[0]}" ×${psHits.toFixed(1)} in positive reviews` : '';
    // reservable = organised enough to take bookings → correlated with prompt service
    if (place.reservable === true) { psScore = Math.min(psScore + 0.10, 1.0); psEv = [psEv, 'accepts reservations (Google ✓)'].filter(Boolean).join(' + '); }
    allTagScores['Prompt Service'] = psScore;
    if (psEv) tagEvidence['Prompt Service'] = psEv;
    const s = findSnippet(psKws); if (s) tagSnippets['Prompt Service'] = s;
  }

  // ── GOOD HOSPITALITY — star-weighted keywords + family/child signals ───────
  {
    const ghKws  = TAG_TEXT_KEYWORDS['Good Hospitality'] ?? [];
    const ghHits = countWeightedHits(ghKws);
    let ghScore = ghHits >= 3 ? 0.95 : ghHits >= 2 ? 0.82 : ghHits >= 1 ? 0.55 : ghHits >= 0.4 ? 0.38 : 0.20;
    let ghEv = ghHits > 0 ? `"${ghKws[0]}" ×${ghHits.toFixed(1)} in positive reviews` : '';
    if (place.menuForChildren === true || place.goodForChildren === true) {
      ghScore = Math.min(ghScore + 0.10, 1.0); ghEv = [ghEv, 'family-friendly (Google ✓)'].filter(Boolean).join(' + ');
    }
    allTagScores['Good Hospitality'] = ghScore;
    if (ghEv) tagEvidence['Good Hospitality'] = ghEv;
    const s = findSnippet(ghKws); if (s) tagSnippets['Good Hospitality'] = s;
  }

  // ── HIGHLY RECOMMENDED — rating × review volume (objective) + keyword boost ─
  // Universal: a truly recommended hotel is one where the crowd has spoken.
  // We don't rely on guests writing "I recommend this" — we look at the aggregate.
  {
    const hrKws  = TAG_TEXT_KEYWORDS['Highly Recommended'] ?? [];
    const hrHits = countWeightedHits(hrKws);
    // Base score from rating + volume — the two signals that define "highly recommended"
    let hrBase: number;
    if      (rating >= 4.5 && (place.userRatingCount ?? 0) >= 200) hrBase = 1.0;
    else if (rating >= 4.3 && (place.userRatingCount ?? 0) >= 50)  hrBase = 0.85;
    else if (rating >= 4.0 && (place.userRatingCount ?? 0) >= 20)  hrBase = 0.70;
    else if (rating >= 3.8)                                         hrBase = 0.50;
    else                                                            hrBase = 0.25;
    // Keyword boost on top (guests explicitly recommending adds confidence)
    const hrScore = Math.min(hrBase + (hrHits >= 2 ? 0.10 : hrHits >= 1 ? 0.05 : 0), 1.0);
    const hrEv = hrHits > 0 ? `${rating}★ × ${place.userRatingCount ?? 0} reviews + "${hrKws[0]}" mentioned`
                             : `${rating}★ across ${place.userRatingCount ?? 0} reviews`;
    allTagScores['Highly Recommended'] = hrScore;
    tagEvidence['Highly Recommended'] = hrEv;
    const s = findSnippet(hrKws); if (s) tagSnippets['Highly Recommended'] = s;
  }

  // ── AC ROOMS — ≥2 review mentions of multi-word AC phrases ─────────────
  {
    const acKws   = TAG_TEXT_KEYWORDS['AC Rooms'] ?? [];
    const acHits  = reviews.filter((r: any) =>
      acKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
    ).length;
    let acScore   = acHits >= 3 ? 1.0 : acHits === 2 ? 0.90 : acHits === 1 ? 0.60 : countHits(allText, acKws) >= 1 ? 0.45 : 0.10;
    let acEv      = acHits > 0 ? `"ac room" mentioned in ${acHits} reviews` : '';
    allTagScores['AC Rooms'] = acScore;
    if (acEv) tagEvidence['AC Rooms'] = acEv;
    const s = findSnippet(acKws); if (s) tagSnippets['AC Rooms'] = s;
  }

  // ── HOT WATER — review mentions ─────────────────────────────────────────
  {
    const hwKws  = TAG_TEXT_KEYWORDS['Hot Water'] ?? [];
    const hwHits = reviews.filter((r: any) =>
      hwKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
    ).length;
    allTagScores['Hot Water'] = hwHits >= 2 ? 1.0 : hwHits === 1 ? 0.75 : countHits(allText, hwKws) >= 1 ? 0.55 : 0.10;
    if (hwHits > 0) { tagEvidence['Hot Water'] = `"hot water" in ${hwHits} reviews`; const s = findSnippet(hwKws); if (s) tagSnippets['Hot Water'] = s; }
  }

  // ── GOOD WIFI — review mentions ─────────────────────────────────────────
  {
    const wfKws  = TAG_TEXT_KEYWORDS['Good WiFi'] ?? [];
    const wfHits = reviews.filter((r: any) =>
      wfKws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
    ).length;
    allTagScores['Good WiFi'] = wfHits >= 2 ? 1.0 : wfHits === 1 ? 0.75 : countHits(allText, wfKws) >= 1 ? 0.55 : 0.10;
    if (wfHits > 0) { tagEvidence['Good WiFi'] = `"wifi" in ${wfHits} reviews`; const s = findSnippet(wfKws); if (s) tagSnippets['Good WiFi'] = s; }
  }

  // ── FREE PARKING — same logic as Easy Parking ────────────────────────────
  allTagScores['Free Parking'] = scoreParking.score;
  if (scoreParking.ev) tagEvidence['Free Parking'] = scoreParking.ev;
  if (parkSnip) tagSnippets['Free Parking'] = parkSnip;

  // ── BUDGET STAY — mirrors Budget-Friendly ───────────────────────────────
  allTagScores['Budget Stay'] = allTagScores['Budget-Friendly'] ?? 0.3;
  tagEvidence['Budget Stay']  = tagEvidence['Budget-Friendly']  ?? '';
  tagSnippets['Budget Stay']  = tagSnippets['Budget-Friendly']  ?? '';

  // ── PREMIUM STAY — priceLevel EXPENSIVE + name signals ──────────────────
  {
    const PREMIUM_NAME_RX = /\b(grand|resort|palace|suite|spa|international|tower|crown|imperial|royal|executive|luxury)\b/i;
    let psScore = 0.10; let psEv = '';
    if (priceLevel === 'PRICE_LEVEL_EXPENSIVE' || priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE') {
      psScore = 1.0; psEv = 'Premium price tier (Google ✓)';
    } else if (priceLevel === 'PRICE_LEVEL_MODERATE') {
      psScore = 0.35; psEv = 'Mid-range — not premium';
    } else if (priceLevel === 'PRICE_LEVEL_INEXPENSIVE') {
      psScore = 0.0; psEv = 'Budget — not premium';
    }
    if (PREMIUM_NAME_RX.test(name)) { psScore = Math.min(psScore + 0.25, 1.0); psEv = [psEv, 'premium name signal'].filter(Boolean).join(' + '); }
    if (rating >= 4.2 && (place.userRatingCount ?? 0) >= 100) psScore = Math.min(psScore + 0.10, 1.0);
    allTagScores['Premium Stay'] = psScore;
    if (psEv) tagEvidence['Premium Stay'] = psEv;
  }

  // ── HIGHLY RATED (hotel) — rating × volume metric ────────────────────────
  {
    let hrScore = 0.20;
    if      (rating >= 4.5 && (place.userRatingCount ?? 0) >= 100) hrScore = 1.0;
    else if (rating >= 4.3 && (place.userRatingCount ?? 0) >= 30)  hrScore = 0.85;
    else if (rating >= 4.0 && (place.userRatingCount ?? 0) >= 10)  hrScore = 0.65;
    else if (rating >= 3.8)                                         hrScore = 0.45;
    allTagScores['Highly Rated'] = hrScore;
    tagEvidence['Highly Rated']  = `${rating}★ across ${place.userRatingCount ?? 0} reviews`;
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
    // Heritage Stay — active tag (19 keyword hits in top-34 Thanjavur hotel reviews)
    allTagScores['Heritage Stay'] = allTagScores['Heritage'];
    if (tagEvidence['Heritage']) tagEvidence['Heritage Stay'] = tagEvidence['Heritage'];
    if (tagSnippets['Heritage']) tagSnippets['Heritage Stay'] = tagSnippets['Heritage'];
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
  'City Centre':         'hotel Thanjavur central area main road bus stand',
  'Walkable Distance':   'hotel walkable distance Thanjavur nearby',
  'Quiet & Peaceful':    'quiet peaceful hotel Thanjavur calm serene',
  'Budget-Friendly':     'cheapest hotel Thanjavur budget affordable',
  'Budget Stay':         'budget lodge affordable hotel Thanjavur economical',
  'Premium Stay':        'luxury premium star hotel Thanjavur suite',
  'Highly Rated':        'best rated hotel Thanjavur highly recommended top',
  'AC Rooms':            'hotel air conditioned rooms Thanjavur AC room',
  'Hot Water':           'hotel hot water geyser Thanjavur',
  'Good WiFi':           'hotel wifi internet Thanjavur free wifi',
  'Free Parking':        'hotel parking free parking Thanjavur car park',
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

// Short primary search term per hotel tag — drives clean Google queries (1-3 words)
const HOTEL_TAG_SHORT_TERM: Record<string, string> = {
  'Spotlessly Clean':    'clean hygienic',
  'Well Maintained':     'well maintained',
  'Fresh Rooms':         'fresh rooms',
  'Near Big Temple':     'near brihadeeswarar temple',
  'Near Railway Station':'near railway station',
  'Central & Walkable':  'city centre walkable',
  'Easy Parking':        'with parking',
  'Friendly & Helpful':  'friendly helpful staff',
  'Warm Hospitality':    'warm hospitality',
  'Quick Response':      'quick service',
  'Spacious Rooms':      'spacious rooms',
  'Comfortable & Quiet': 'comfortable quiet',
  'Good Amenities':      'amenities wifi',
  'In-House Restaurant': 'with restaurant',
  'Breakfast Included':  'breakfast included',
  'Good Food':           'good food',
  'Value for Money':     'value for money',
  'Budget Stay':         'budget affordable',
  'Premium Stay':        'luxury premium',
  'Highly Rated':        'highly rated',
  'AC Rooms':            'air conditioned',
  'Hot Water':           'hot water',
  'Good WiFi':           'wifi internet',
  'Free Parking':        'free parking',
  'Quiet & Peaceful':    'quiet peaceful',
  'Budget-Friendly':     'budget affordable',
  'Pure Veg Hotel':      'pure veg',
  'Pilgrim Friendly':    'pilgrim friendly',
  'Heritage Stay':       'heritage boutique',
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

// 3 distinct natural-language hotel queries from tag keywords — varied Google result sets
function buildHotelQueryVariants(tags: string[], city: string): [string, string, string] {
  const primaryTag = tags[0];
  const shortTerm  = HOTEL_TAG_SHORT_TERM[primaryTag] ?? primaryTag.toLowerCase();
  const kws        = (TAG_TEXT_KEYWORDS[primaryTag] ?? []) as string[];

  // Find keywords that don't overlap with the short term
  const shortWords = shortTerm.split(' ');
  const extras = kws.filter(k => !shortWords.some(w => k.includes(w)) && k.length > 3);

  const q1 = `hotel ${shortTerm} in ${city}`;
  const q2 = extras.length > 0
    ? `${extras[0]} hotel in ${city}`
    : `best hotel ${shortTerm} ${city} Tamil Nadu`;
  const q3 = extras.length > 1
    ? `${extras[Math.floor(extras.length / 2)]} hotel ${city}`
    : `top hotel ${shortTerm} ${city} Tamil Nadu`;

  return [q1, q2, q3];
}

// Default city centre — overridden per-request via FetchOptions.center
const DEFAULT_CENTER = { latitude: 10.787, longitude: 79.1378 };

function mapPriceLevel(level: string): string {
  const map: Record<string, string> = {
    PRICE_LEVEL_FREE:           'Free',
    PRICE_LEVEL_INEXPENSIVE:    'Under ₹200',
    PRICE_LEVEL_MODERATE:       '₹200–500',
    PRICE_LEVEL_EXPENSIVE:      '₹500–1200',
    PRICE_LEVEL_VERY_EXPENSIVE: '₹1200+',
  };
  return map[level] ?? '₹₹';
}

function extractPriceRange(place: any): string | null {
  const pr = place.priceRange;
  if (!pr) return null;
  const start = pr.startPrice?.units ?? pr.lowerBound?.units;
  const end   = pr.endPrice?.units   ?? pr.upperBound?.units;
  if (start && end)   return `₹${start}–₹${end}`;
  if (start)          return `From ₹${start}`;
  if (end)            return `Up to ₹${end}`;
  return null;
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
// QUALITY SCORE — combines rating with review volume (log-damped)
// Formula: rating × reviews^0.2 — volume matters but diminishes beyond 1000
// Examples: 4.0★/1000 reviews = 15.9 > 4.5★/200 reviews = 12.98 (per user spec)
// ─────────────────────────────────────────────────────────────────────────────
// Specific food/experience words that appear in genuine reviews
const GENUINE_WORDS = new Set([
  'biryani','biriyani','dosa','idli','thali','chicken','mutton','fish','meals',
  'rice','sambar','curry','roti','naan','coffee','tiffin','vada','pongal',
  'kuzhambu','parotta','kozhi','meen','prawn','dosai','rasam','chettinad',
  'nattu','pepper','tandoor','kebab','buffet','dinner','lunch','breakfast',
  'ambience','service','staff','clean','parking','family','kids','outdoor',
  'delicious','tasty','fresh','spicy','sweet','sour','flavour','flavor',
  'portion','quantity','price','value','affordable','expensive','waiting',
]);

function computeAuthenticityScore(place: any): number {
  const reviews  = (place.reviews ?? []) as any[];
  const rating   = place.rating ?? 0;
  const count    = place.userRatingCount ?? 0;
  if (reviews.length === 0) return 0.6;

  let score = 1.0;

  // 1. All reviews are 5★ — suspicious uniformity
  const ratings5 = reviews.filter((r: any) => (r.rating ?? 0) === 5).length;
  if (ratings5 === reviews.length && reviews.length >= 3) score -= 0.25;

  // 2. Very short reviews — avg < 40 chars means no real experience described
  const avgLen = reviews.reduce((s: number, r: any) => s + (r.text?.text ?? '').length, 0) / reviews.length;
  if (avgLen < 25) score -= 0.35;
  else if (avgLen < 50) score -= 0.15;

  // 3. No genuine specific words across all reviews — pure generic praise
  const combinedText = reviews.map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
  const hasGenuineWord = [...GENUINE_WORDS].some(w => combinedText.includes(w));
  if (!hasGenuineWord) score -= 0.20;

  // 4. High rating with very few reviews — unverified, easy to inflate
  if (rating >= 4.7 && count < 50)  score -= 0.20;
  else if (rating >= 4.5 && count < 80) score -= 0.10;

  // 5. Bonus: diverse star ratings (not all same) — sign of organic reviews
  if (new Set(reviews.map((r: any) => r.rating ?? 0)).size >= 2) score += 0.05;

  return Math.max(0.1, Math.min(1.0, score));
}

function computeQualityScore(place: any): number {
  const rating  = place.rating ?? 0;
  const reviews = place.userRatingCount ?? 0;
  return rating * Math.pow(Math.max(reviews, 1), 0.2) * computeAuthenticityScore(place);
}

const HOTEL_GENUINE_WORDS = new Set([
  'clean','room','staff','check','wifi','parking','breakfast','food','water',
  'ac','air','toilet','bathroom','shower','bed','pillow','towel','lift',
  'reception','service','maintained','hygienic','spacious','quiet','peaceful',
  'temple','station','centre','central','walking','location','nearby',
  'friendly','helpful','courteous','hospitality','professional','prompt',
  'amenities','generator','restaurant','dining','affordable','budget',
  'comfortable','cozy','neat','tidy','fresh','value','worth',
]);

function computeHotelAuthenticityScore(place: any): number {
  const reviews = (place.reviews ?? []) as any[];
  const rating  = place.rating ?? 0;
  const count   = place.userRatingCount ?? 0;
  if (reviews.length === 0) return 0.6;

  let score = 1.0;
  const ratings5 = reviews.filter((r: any) => (r.rating ?? 0) === 5).length;
  if (ratings5 === reviews.length && reviews.length >= 3) score -= 0.25;

  const avgLen = reviews.reduce((s: number, r: any) => s + (r.text?.text ?? '').length, 0) / reviews.length;
  if (avgLen < 25) score -= 0.35;
  else if (avgLen < 50) score -= 0.15;

  const combinedText = reviews.map((r: any) => (r.text?.text ?? '').toLowerCase()).join(' ');
  const hasGenuineWord = [...HOTEL_GENUINE_WORDS].some(w => combinedText.includes(w));
  if (!hasGenuineWord) score -= 0.20;

  if (rating >= 4.7 && count < 30) score -= 0.20;
  else if (rating >= 4.5 && count < 50) score -= 0.10;

  if (new Set(reviews.map((r: any) => r.rating ?? 0)).size >= 2) score += 0.05;
  return Math.max(0.1, Math.min(1.0, score));
}

// ─────────────────────────────────────────────────────────────────────────────
// AI SIGNALS — recentTrend, consistency, oneWord label, numberInsights string
// Designed to be passed to Gemini for richer comparative analysis
// ─────────────────────────────────────────────────────────────────────────────
function computeAISignals(place: any): {
  recentTrend:    'Rising' | 'Stable' | 'Declining' | 'Unknown';
  consistency:    'High' | 'Medium' | 'Low';
  oneWord:        string;
  numberInsights: string;
} {
  const rating      = place.rating ?? 0;
  const reviews     = place.userRatingCount ?? 0;
  const qualityScore = computeQualityScore(place);
  const trendScore  = computeTrendScore(place);

  const recentTrend: 'Rising' | 'Stable' | 'Declining' | 'Unknown' =
    (place.reviews ?? []).length === 0 ? 'Unknown' :
    trendScore >= 0.65 ? 'Rising' :
    trendScore >= 0.45 ? 'Stable' : 'Declining';

  const consistency: 'High' | 'Medium' | 'Low' =
    (rating >= 4.2 && reviews >= 500)  ? 'High'   :
    (rating >= 3.8 && reviews >= 100)  ? 'Medium' : 'Low';

  const oneWord =
    qualityScore >= 25 && rating >= 4.4 ? 'Iconic'      :
    qualityScore >= 18 && rating >= 4.2 ? 'Established' :
    recentTrend === 'Rising' && rating >= 4.3 ? 'Rising' :
    rating >= 4.5 && reviews < 200      ? 'Hidden Gem'  :
    rating >= 4.0 && reviews >= 300     ? 'Consistent'  :
    recentTrend === 'Declining'         ? 'Declining'   :
    rating >= 4.0                       ? 'Reliable'    : 'Mixed';

  const numberInsights = `${rating}★ · ${reviews.toLocaleString()} reviews · Score ${qualityScore.toFixed(1)} · ${recentTrend}`;

  return { recentTrend, consistency, oneWord, numberInsights };
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
// Caution: extract what users should watch out for from 1–3★ reviews.
// Returns a short phrase (max ~12 words) or null if nothing notable.
function extractCautionNote(reviews: any[]): string | null {
  const negative = reviews.filter(r => (r.rating ?? 5) <= 3 && (r.text?.text ?? '').length > 20);
  if (negative.length === 0) return null;
  const text = negative.map(r => (r.text?.text ?? '').toLowerCase()).join(' ');
  const complaints: { label: string; kws: string[] }[] = [
    { label: 'long wait times',        kws: ['wait', 'slow service', 'queue', 'long time', 'takes time', 'delayed'] },
    { label: 'gets very crowded',      kws: ['crowded', 'very busy', 'rush', 'no seats', 'packed', 'full house'] },
    { label: 'limited parking nearby', kws: ['no parking', 'parking issue', 'parking problem', 'hard to park'] },
    { label: 'service needs work',     kws: ['rude', 'bad service', 'poor service', 'unfriendly', 'attitude'] },
    { label: 'can be noisy inside',    kws: ['noisy', 'very loud', 'too loud', 'noise'] },
    { label: 'cleanliness concerns',   kws: ['dirty', 'unclean', 'not clean', 'unhygienic'] },
    { label: 'portions are small',     kws: ['small portion', 'less quantity', 'less food', 'not enough'] },
    { label: 'quality can vary',       kws: ['cold food', 'stale', 'tasteless', 'bland', 'not fresh', 'disappointing', 'inconsistent'] },
    { label: 'pricey for what you get',kws: ['expensive', 'overpriced', 'costly', 'not worth the price'] },
    { label: 'rooms need maintenance', kws: ['maintenance', 'old room', 'broken', 'needs repair', 'outdated', 'worn out'] },
  ];
  const found: string[] = [];
  for (const c of complaints) {
    if (c.kws.some(k => text.includes(k))) {
      found.push(c.label);
      if (found.length >= 2) break;
    }
  }
  if (found.length === 0) return null;
  return found.length === 1
    ? `Some visitors mention ${found[0]}`
    : `Watch for: ${found.join(', ')}`;
}

// Scans ALL reviews (any star) for timing / crowd sentences — e.g. "fills up by 1 PM"
function extractWhenToVisit(reviews: any[]): string | null {
  const timingKws = ['fills up', 'fill up', 'arrive before', 'arrive by', 'reach by', 'come before',
    'come early', 'peak hour', 'rush hour', 'best time', 'lunch only', 'closes at', 'closed on',
    'open till', 'opens at', 'morning visit', 'avoid afternoon', 'book in advance', 'gets crowded',
    'no seats', 'wait for', 'queue', 'packed by'];
  const byRating = [...reviews].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  for (const r of byRating) {
    const sentences = (r.text?.text ?? '').split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      const low = s.toLowerCase();
      if (timingKws.some(k => low.includes(k)) && s.trim().length > 15 && s.trim().length < 130) {
        return s.trim().replace(/^[^a-zA-Z₹0-9]+/, '');
      }
    }
  }
  return null;
}

// Scans reviews for specific dish / item recommendations
function extractMustTry(reviews: any[]): string | null {
  const mustKws = ['order the', 'try the', 'must try', 'must-try', 'signature', 'speciality',
    'specialty', 'best dish', 'best item', 'famous for', 'known for', 'go for the',
    'highly recommend', 'don\'t miss', 'standout', 'highlight', 'star of'];
  const byRating = [...reviews].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  for (const r of byRating) {
    const sentences = (r.text?.text ?? '').split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      const low = s.toLowerCase();
      if (mustKws.some(k => low.includes(k)) && s.trim().length > 10 && s.trim().length < 110) {
        return s.trim().replace(/^[^a-zA-Z₹0-9]+/, '');
      }
    }
  }
  return null;
}

// Recent sentiment: 2–3 factual bullets combining recent review stats + tag/keyword facts.
const MS_3M = 3 * 30.4375 * 24 * 3600 * 1000;
function buildRecentSentiment(
  reviews: any[],
  tagEvidenceMap: Record<string, string>,
  matchedTags: string[],
  rating: number,
  reviewCount: number,
  tagSnippetsMap: Record<string, string> = {},
): string[] {
  const now    = Date.now();
  const recent = reviews.filter(r => r.publishTime && (now - new Date(r.publishTime).getTime()) < MS_3M);
  const bullets: string[] = [];

  // Bullet 1: recent visitor ratio
  if (recent.length > 0) {
    const posCount = recent.filter(r => (r.rating ?? 0) >= 4).length;
    const negCount = recent.filter(r => (r.rating ?? 0) <= 2).length;
    if (posCount >= 1) bullets.push(`${posCount}/${recent.length} recent visitors rated 4★ or higher`);
    else if (negCount >= 1) bullets.push(`${negCount} of ${recent.length} recent visitors rated 2★ or below`);
  }

  // Bullet 2: best tag evidence fact (location / keyword count)
  for (const tag of matchedTags) {
    const ev = tagEvidenceMap[tag];
    if (ev && !ev.includes('not nearby') && !ev.includes('Far from') && !ev.includes('Over 5km')) {
      bullets.push(ev);
      break;
    }
  }

  // Bullet 3: top tag snippet (actual review quote about a tag)
  for (const tag of matchedTags) {
    const snip = tagSnippetsMap[tag];
    if (snip && snip.length > 10) {
      bullets.push(`Guests say: "${snip.slice(0, 70).trim()}…"`);
      break;
    }
  }

  // Fallback bullet: overall credibility
  if (bullets.length === 0) {
    bullets.push(`${rating}★ from ${reviewCount.toLocaleString()} verified visitors`);
  }

  return bullets.slice(0, 3);
}

// ─────────────────────────────────────────────────────────────────────────────
// Hard limit: never show reviews older than 5 months. No fallback to old reviews.
const MAX_DISPLAY_AGE_MS = 5 * 30.4375 * 24 * 3600 * 1000; // 5 months — hard cap, no fallback

function isGenuineReview(r: any): boolean {
  const text = (r.text?.text ?? '').trim();
  if (text.length < 25) return false;
  // Pure generic praise with no specific content — likely fake
  const genericOnly = /^[\s!.,]*((good|great|nice|best|amazing|excellent|wonderful|awesome|fantastic|must visit|highly recommend|must try|loved it|perfect|superb|outstanding|very good|so good|really good|too good)[\s!.,]*)+$/i.test(text);
  if (genericOnly) return false;
  return true;
}

function filterReviewsForDisplay(reviews: any[]): any[] {
  const now = Date.now();
  // Hard recency filter — no fallback. Reviews older than 5 months never show.
  const recent = reviews.filter(r => {
    if (!r.publishTime) return false; // no date = exclude
    return (now - new Date(r.publishTime).getTime()) < MAX_DISPLAY_AGE_MS;
  });
  // Strip fake/generic reviews; fall back to recent (not old) if too few genuine
  const genuine = recent.filter(isGenuineReview);
  return genuine.length >= 1 ? genuine : recent;
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
  // ── Active 25 food tags (5×5) ─────────────────────────────────────────────
  'South Indian':     'dosa idli sambar south indian restaurant meals',
  'Biryani':          'biryani biriyani dum biryani restaurant',
  'North Indian':     'paneer north indian butter masala naan roti restaurant',
  'Multi Cuisine':    'multi cuisine variety restaurant continental',
  'Grills & BBQ':     'grill bbq barbecue grilled chicken restaurant',
  'Mess & Meals':     'mess meals thali banana leaf lunch restaurant',
  'Tiffin':           'tiffin idli dosa vada pongal morning breakfast restaurant',
  'Fine Dining':      'fine dining restaurant elegant upscale',
  'Buffet':           'buffet restaurant unlimited meals all you can eat',
  'Cafe & Drinks':    'cafe filter coffee kaapi degree coffee south indian',
  'Authentic':        'authentic traditional south indian restaurant original',
  'Homely Food':      'homely food home cooked comfort restaurant',
  'Chettinad':        'chettinad nattu kozhi kuzhambu pepper chicken restaurant',
  'Fresh & Hot':      'fresh freshly cooked hot restaurant',
  'Must Try':         'must try best restaurant popular must visit',
  'Outdoor Seating':  'outdoor seating open air terrace garden restaurant',
  'Family Dining':    'family restaurant dining comfortable kids',
  'Highly Rated':     'highly recommended best rated restaurant',
  'Lunch Spot':       'lunch thali banana leaf meals afternoon restaurant',
  'Dinner Special':   'dinner evening night restaurant dinner menu',
  'Budget Friendly':  'affordable cheap budget tiffin meals restaurant',
  'Value for Money':  'value for money worth restaurant good value',
  'Ample Parking':    'parking car parking restaurant free parking',
  'Large Portions':   'generous portions quantity restaurant filling',
  'Veg Options':      'vegetarian veg options serves veg restaurant',
  'Pure Veg':         'pure veg vegetarian restaurant only veg',
  'Non-Veg':          'chicken mutton non veg restaurant',
  // ── Legacy (backward-compat, city presets) ───────────────────────────────
  'Seafood':         'seafood fish prawn crab restaurant',
  'Dine-In':         'dine in restaurant seating dining hall',
  'Family Friendly': 'family restaurant dining comfortable kids',
  'Quick Bites':     'fast food takeaway street food quick bites',
  // ── Legacy ───────────────────────────────────────────────────────────────
  'Chettinad Style': 'chettinad restaurant pepper kuzhambu',
  'Quick Service':   'fast service restaurant',
  'Affordable':      'affordable cheap budget restaurant',
  'AC Dine-in':      'air conditioned restaurant dine in',
  'Good Ambience':   'good ambience atmosphere restaurant',
  'Lunch':           'lunch thali meals restaurant afternoon',
  'All Day':         'restaurant all day menu variety',
  'Dinner':          'dinner biryani night restaurant',
  'Snacks':          'snacks bajji chaat street food evening',
  'Breakfast':       'breakfast tiffin idli dosa morning restaurant',
  'Delicious':       'delicious tasty restaurant',
  'Fresh':           'fresh freshly cooked restaurant',
  'Spicy':           'spicy masala pepper restaurant',
  'Good Quantity':   'generous portions quantity restaurant',
  'Friendly Staff':  'friendly staff service restaurant',
  'Clean':           'clean hygienic restaurant',
  'Good Portions':   'generous portions restaurant quantity',
  'Top Pick':        'best restaurant popular local favourite',
  // ── Legacy — Dashboard preset overrides (other cities) ───────────────────
  'Thali/Meals':    'thali meals banana leaf restaurant',
  'Thali':          'thali meals banana leaf restaurant',
  'Cafe':           'cafe coffee filter coffee kaapi restaurant',
  'Street Food':    'street food chaat snacks local restaurant',
  'Veg Biryani':    'veg biryani vegetable biryani restaurant',
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

// Clean 1-3 word Google-friendly terms per tag — used for composed query
// (tag 1 is priority anchor, tag 2 is added as a bonus hint)
const FOOD_TAG_SHORT_TERM: Record<string, string> = {
  'South Indian':    'south indian',
  'Biryani':         'biryani',
  'North Indian':    'north indian',
  'Multi Cuisine':   'multi cuisine',
  'Grills & BBQ':    'grills bbq',
  'Mess & Meals':    'meals',
  'Tiffin':          'tiffin',
  'Fine Dining':     'fine dining',
  'Buffet':          'buffet',
  'Cafe & Drinks':   'cafe',
  'Authentic':       'authentic',
  'Homely Food':     'home food',
  'Chettinad':       'chettinad',
  'Fresh & Hot':     'fresh',
  'Must Try':        'best',
  'Outdoor Seating': 'outdoor seating',
  'Family Dining':   'family',
  'Highly Rated':    'top rated',
  'Lunch Spot':      'lunch',
  'Dinner Special':  'dinner',
  'Budget Friendly': 'budget',
  'Value for Money': 'value',
  'Ample Parking':   'parking',
  'Large Portions':  'generous',
  'Veg Options':     'vegetarian',
  'Pure Veg':        'pure veg',
  'Non-Veg':         'non veg',
};

// Compose a clean Google-style query from tag short terms
// tags[0] = priority anchor, tags[1] = bonus (dropped on fallback)
// Tag 1 = 100% priority — drives the Google query with all its related keywords
// Tag 2 = bonus only — applied as a ranking preference after fetch, never narrows the query
// Returns 3 distinct natural-language queries for the primary tag.
// Each query is a clean Google-style phrase (not a word-soup) so Google returns varied results.
function buildFoodQueryVariants(tags: string[], city: string): [string, string, string] {
  const primaryTag = tags[0];
  const shortTerm  = FOOD_TAG_SHORT_TERM[primaryTag] ?? primaryTag.toLowerCase();
  const kws        = (FOOD_TAG_KEYWORDS[primaryTag] ?? []) as string[];

  // Extra keywords: phrases that don't overlap with the short term
  const extras = kws.filter(k => !k.includes(shortTerm) && !shortTerm.includes(k) && k.length > 3);

  const q1 = `${shortTerm} restaurant in ${city}`;
  const q2 = extras.length > 0
    ? `${extras[0]} restaurant in ${city}`
    : `best ${shortTerm} food restaurant ${city} Tamil Nadu`;
  const q3 = extras.length > 1
    ? `${extras[Math.floor(extras.length / 2)]} restaurant ${city}`
    : `top ${shortTerm} restaurant ${city} Tamil Nadu`;

  return [q1, q2, q3];
}

function buildFoodQuery(filters: UserFilters): string {
  const city     = filters.city ?? 'Thanjavur';
  const state    = getCityState(city);
  const rawTags  = (filters.foodTags && filters.foodTags.length > 0) ? filters.foodTags : (filters.foodTag ? [filters.foodTag] : []);
  // Pure Veg + Biryani → Veg Biryani (veg biryani restaurants, not non-veg)
  const allTags  = rawTags.includes('Pure Veg') && rawTags.includes('Biryani')
    ? rawTags.map(t => t === 'Biryani' ? 'Veg Biryani' : t)
    : rawTags;

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
      const rawFoodTags    = (f.foodTags?.length ?? 0) > 0 ? f.foodTags! : (f.foodTag ? [f.foodTag] : []);
      const activeFoodTags = rawFoodTags.includes('Pure Veg') && rawFoodTags.includes('Biryani')
        ? rawFoodTags.map(t => t === 'Biryani' ? 'Veg Biryani' : t)
        : rawFoodTags;
      if (activeFoodTags.length > 0) {
        let tagsMatched = 0;
        for (const tag of activeFoodTags) {
          if (tag === 'Pure Veg') {
            // Use vegetarian_restaurant type as primary signal — this is Google's exclusive tag
            // for restaurants that serve ONLY vegetarian food. servesVegetarianFood=true is NOT
            // used here because it merely means "has veg options" (Barbequeen-type places qualify),
            // which would incorrectly score a mixed restaurant as Pure Veg.
            const typeConfirmed = (place.types ?? []).includes('vegetarian_restaurant');
            const nameMatch     = PURE_VEG_NAME_SIGNALS.some(s => nameText.includes(s));
            if (typeConfirmed || nameMatch) tagsMatched++;
            continue;
          }
          if (tag === 'Non-Veg') {
            // GBP false = Google confirmed not-veg → strong non-veg signal
            const gbpNotVeg = place.servesVegetarianFood === false;
            const nvHits = NON_VEG_KEYWORDS.filter(kw => allText.includes(kw)).length;
            if (gbpNotVeg || nvHits >= 1) tagsMatched++;
            continue;
          }
          // Buffet: primaryType first, keyword fallback
          if (tag === 'Buffet') {
            if ((place.primaryType ?? '').includes('buffet')) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Buffet'] ?? [];
            tagsMatched += kws.some(kw => allText.includes(kw)) ? 0.85 : 0;
            continue;
          }
          // Fine Dining: primaryType=fine_dining_restaurant first, keyword fallback
          if (tag === 'Fine Dining') {
            if ((place.primaryType ?? '').includes('fine_dining')) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Fine Dining'] ?? [];
            tagsMatched += kws.some(kw => allText.includes(kw)) ? 0.85 : 0;
            continue;
          }
          // Highly Rated: rating + review count (pure metric — no keywords needed)
          if (tag === 'Highly Rated') {
            const rating = place.rating ?? 0;
            const cnt    = place.userRatingCount ?? 0;
            if (rating >= 4.3 && cnt >= 100) { tagsMatched += 1; }
            else if (rating >= 4.0 && cnt >= 50) { tagsMatched += 0.7; }
            else if (rating >= 4.3) { tagsMatched += 0.6; }
            continue;
          }
          // Cafe & Drinks: servesCoffee boolean first (53% populated — real signal)
          if (tag === 'Cafe & Drinks') {
            if (place.servesCoffee === true) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Cafe & Drinks'] ?? [];
            tagsMatched += kws.some(kw => allText.includes(kw)) ? 0.8 : 0;
            continue;
          }
          // Lunch Spot: servesLunch boolean first, keyword fallback (lunch=16 in real data)
          if (tag === 'Lunch Spot') {
            if (place.servesLunch === true) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Lunch Spot'] ?? [];
            const hits = kws.filter(kw => allText.includes(kw)).length;
            tagsMatched += hits >= 2 ? 1 : hits === 1 ? 0.75 : 0;
            continue;
          }
          // Family Dining: primaryType or Google booleans first; keyword phrases only (no bare "family")
          if (tag === 'Family Dining') {
            if ((place.primaryType ?? '').includes('family_restaurant')) { tagsMatched += 1; continue; }
            if (place.goodForChildren === true || place.menuForChildren === true) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Family Dining'] ?? [];
            const hits = kws.filter((kw: string) => allText.includes(kw)).length;
            tagsMatched += hits >= 2 ? 0.8 : hits === 1 ? 0.4 : 0;
            continue;
          }
          // Dinner Special: servesDinner boolean first
          if (tag === 'Dinner Special') {
            if (place.servesDinner === true) { tagsMatched += 1; continue; }
            const kws = FOOD_TAG_KEYWORDS['Dinner Special'] ?? [];
            tagsMatched += kws.some(kw => allText.includes(kw)) ? 0.75 : 0;
            continue;
          }
          // Authentic: keyword match against review corpus
          if (tag === 'Authentic') {
            const kws = FOOD_TAG_KEYWORDS['Authentic'] ?? [];
            tagsMatched += kws.some(kw => allText.includes(kw)) ? 0.75 : 0;
            continue;
          }
          // Mess & Meals: strong keyword signal (mess=17, meals=21 in real data)
          if (tag === 'Mess & Meals') {
            const kws = FOOD_TAG_KEYWORDS['Mess & Meals'] ?? [];
            const hits = kws.filter(kw => allText.includes(kw)).length;
            tagsMatched += hits >= 3 ? 1 : hits >= 1 ? 0.75 : 0;
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

// Only Non-Veg/PureVeg use this path (price/openNow handled at API level).
// ─────────────────────────────────────────────────────────────────────────────
function applyStrictFilter(places: any[], tab: string, f: UserFilters): any[] {
  if (tab !== 'Food') return places;

  const activeFoodTagsStrict = (f.foodTags?.length ?? 0) > 0 ? f.foodTags! : (f.foodTag ? [f.foodTag] : []);

  // Tags that imply non-veg — selecting any of these must exclude pure-veg places.
  const IMPLICIT_NON_VEG_TAGS = ['Non-Veg', 'Crab', 'Seafood', 'Prawn', 'Chicken Biryani', 'Chettinad', 'Biryani', 'Chicken / Mutton', 'Grills & Shawarma', 'Biryani & Mandi'];
  const impliesNonVeg = f.dietType === 'Non-Veg' || activeFoodTagsStrict.some(t => IMPLICIT_NON_VEG_TAGS.includes(t));

  // Non-Veg: 3-layer hard filter. Fires for dietType OR tag selection so that
  // "Non-Veg + AC Dine-in" cannot surface pure-veg places like Ariya Bhavan.
  if (impliesNonVeg) {
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
  if (f.dietType === 'Pure Veg' || activeFoodTagsStrict.includes('Pure Veg')) {
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

        // Biryani: require name match OR 2+ independent review hits.
        if (tag === 'Biryani') {
          const pureVegMode = f.dietType === 'Pure Veg' || activeFoodTags.includes('Pure Veg');
          const biryaniNameKws = ['biryani', 'biriyani', 'briyani', 'biryani house', 'biryani point'];
          if (biryaniNameKws.some(k => name.includes(k))) { matched.push(tag); continue; }
          const reviewHits = (p.reviews ?? []).filter((r: any) =>
            kws.some(kw => (r.text?.text ?? '').toLowerCase().includes(kw))
          ).length;
          if (reviewHits >= (pureVegMode ? 1 : 2)) matched.push(tag);
          continue;
        }

        // Buffet: primaryType first, keyword fallback
        if (tag === 'Buffet') {
          if ((p.primaryType ?? '').includes('buffet')) { matched.push(tag); continue; }
          if (kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }

        // Fine Dining: primaryType first, keyword fallback
        if (tag === 'Fine Dining') {
          if ((p.primaryType ?? '').includes('fine_dining')) { matched.push(tag); continue; }
          if (kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }

        // Cafe & Drinks: servesCoffee boolean OR keyword
        if (tag === 'Cafe & Drinks') {
          if (p.servesCoffee === true || kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }
        // Lunch Spot: servesLunch boolean OR keyword
        if (tag === 'Lunch Spot') {
          if (p.servesLunch === true || kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }
        // Authentic: keyword corpus match
        if (tag === 'Authentic') {
          if (kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }
        // Family Dining: primaryType or Google booleans first; require 2+ keyword hits (no bare "family")
        if (tag === 'Family Dining') {
          if ((p.primaryType ?? '').includes('family_restaurant')) { matched.push(tag); continue; }
          if (p.goodForChildren === true || p.menuForChildren === true) { matched.push(tag); continue; }
          const hits = kws.filter((kw: string) => corpus.includes(kw)).length;
          if (hits >= 2) matched.push(tag);
          continue;
        }
        // Dinner Special: servesDinner boolean OR keyword (Experience segment)
        if (tag === 'Dinner Special') {
          if (p.servesDinner === true || kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }
        // Chettinad: strong keyword signal (nattu kozhi, kuzhambu — Thanjavur-specific)
        if (tag === 'Chettinad') {
          if (kws.some(kw => corpus.includes(kw))) matched.push(tag);
          continue;
        }

        const matchedKw = kws.find(kw => corpus.includes(kw));
        if (matchedKw) matched.push(tag);
      }

      // When 2 tags selected: require BOTH to match (AND logic).
      // This prevents places that match only the more-common tag (e.g. Non-Veg)
      // from appearing when the user also wants AC Dine-in or Chettinad Style.
      // OR fallback is applied at the pool level below if AND yields < 3 results.
      p._matchedTags_raw = matched;
      if (activeFoodTags.length >= 2 && matched.length < activeFoodTags.length) return false;
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

    // AND-match fallback: if strict AND-filter yielded < 3, relax to OR (at least 1 tag).
    // This preserves results for niche combos (e.g. Chettinad + AC Dine-in in a small city).
    if (activeFoodTags.length >= 2 && matching.length < 3) {
      const orMatching = places.filter(p => {
        const name_     = (p.displayName?.text ?? '').toLowerCase();
        const types_    = (p.types ?? []).join(' ').replace(/_/g, ' ').toLowerCase();
        const editorial_ = (p.editorialSummary?.text ?? '').toLowerCase();
        const reviews_  = (p.reviews ?? []).slice(0, 5)
          .map((r: any) => (r.text?.text ?? '').slice(0, 500).toLowerCase()).join(' ');
        const corpus_   = `${name_} ${types_} ${editorial_} ${reviews_}`;
        for (const tag of activeFoodTags) {
          const kws = FOOD_TAG_KEYWORDS[tag];
          if (!kws) continue;
          if (kws.some(kw => corpus_.includes(kw))) return true;
        }
        return false;
      });
      if (orMatching.length >= 3) return orMatching;
    }

    // Guarantee minimum 5 results: pad with top quality places from the broader pool
    // when strict tag matches are fewer than 5.
    if (matching.length >= 5) return matching;
    const matchedIds = new Set(matching.map((p: any) => p.id ?? p.displayName?.text ?? ''));
    const pad = places
      .filter((p: any) => !matchedIds.has(p.id ?? p.displayName?.text ?? ''))
      .slice(0, Math.max(0, 5 - matching.length));
    return matching.length > 0 ? [...matching, ...pad] : places;
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
      qualityScore: computeQualityScore(p),
      ...computeAISignals(p),
      buckets:      computeBuckets(allReviews),
      // Top 5 reviews sorted by length — stars included so Gemini knows positive vs negative context
      reviews: byLength.slice(0, 5).map((r: any) => ({
        stars: r.rating,
        text:  (r.text?.text ?? '').slice(0, 200),
        ago:   r.relativePublishTimeDescription ?? '',
      })),
      // positiveTagMatches: per tag, snippets ONLY from 4-5★ reviews — Gemini's ground truth.
      // Includes BOTH matched tags AND selected tags so Gemini always has evidence to quote.
      positiveTagMatches: (() => {
        const result: Record<string, string[]> = {};
        const matchedTagList  = (p._matchedTags ?? []) as string[];
        const selectedTagList = tab === 'Hotels'
          ? (filters.hotelTags ?? (filters.hotelTag ? [filters.hotelTag] : []))
          : (filters.foodTags  ?? (filters.foodTag  ? [filters.foodTag]  : []));
        const allTagsToCheck = [...new Set([...matchedTagList, ...selectedTagList])];
        for (const tag of allTagsToCheck) {
          const kws = (tab === 'Hotels' ? TAG_TEXT_KEYWORDS[tag] : FOOD_TAG_KEYWORDS[tag]) ?? [];
          if (kws.length === 0) continue;
          const snippets = allReviews
            .filter((r: any) => (r.rating ?? 0) >= 4 && kws.some(k => (r.text?.text ?? '').toLowerCase().includes(k)))
            .slice(0, 3)
            .map((r: any) => `[${r.rating}★] ${(r.text?.text ?? '').slice(0, 200)}`);
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
    {
      const activeTags = (filters.foodTags?.length ?? 0) > 0 ? filters.foodTags! : (filters.foodTag ? [filters.foodTag] : []);
      const pureVegActive = filters.dietType === 'Pure Veg' || activeTags.includes('Pure Veg');
      const nonVegActive  = filters.dietType === 'Non-Veg'  || activeTags.includes('Non-Veg');
      if (pureVegActive)
        criteria.push({ label: 'Diet', value: 'STRICTLY Pure Veg — restaurant must serve ONLY vegetarian food. ANY mention of chicken, mutton, fish, egg, seafood, biryani, meat or non-veg in name or reviews = EXCLUDE completely. Do NOT rank or mention non-veg restaurants at all.', weight: 'critical' });
      else if (nonVegActive)
        criteria.push({ label: 'Diet', value: 'Non-Veg — HARD RULES: (1) EXCLUDE any place where servesVeg=true — these are confirmed vegetarian-only restaurants. (2) EXCLUDE any place with zero non-veg keywords (chicken/mutton/fish/prawn/crab/egg/meat/seafood/biryani/shawarma/bbq) in reviews. (3) RANK by non-veg keyword count in 4-5★ reviews — more positive non-veg mentions = higher rank. A pure veg restaurant appearing in this list is a critical error.', weight: 'critical' });
      else if (filters.dietType && filters.dietType !== 'Any')
        criteria.push({ label: 'Diet', value: filters.dietType, weight: 'critical' });
      const tagsForCriteria = pureVegActive ? activeTags.filter(t => t !== 'Pure Veg') :
                              nonVegActive  ? activeTags.filter(t => t !== 'Non-Veg')  : activeTags;
      if (tagsForCriteria.length > 0)
        criteria.push({ label: 'Cuisine / type (PRIMARY)', value: tagsForCriteria.join(' + ') + (tagsForCriteria.length > 1 ? ` — rank places that match MORE of these tags higher (union match)` : ''), weight: 'critical' });
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
  "aiNote": "<max 20 words — Always start with 'Verified by AI:'. For Hotels: state matchedTags count and cite the single best tagEvidence or tagSnippet. For Food: quote the strongest keyword from positiveTagMatches{} and how many 4-5★ reviews confirm it. Example hotel: 'Verified by AI: 3/3 tags — 0.8km from Big Temple, free parking confirmed.' Example food: 'Verified by AI: 14 reviewers praise the biryani — 4.5★ avg. \"best biryani in Thanjavur\"'.>",
  "filterVerification": "<ONE sentence — ALWAYS use positiveTagMatches{} first (4-5★ reviews only). Quote the actual sentence, e.g. '\"10 minutes walk to the Big Temple\" — 5★ reviewer'. If positiveTagMatches is empty for this tag, use tagSnippets{}. If both empty, say how many total reviews mention it.>",
  "whyOverOthers": "<max 30 words — compare against the other candidates in this list; cite specific numbers or unique features>",
  "bestFor": "<10 words — describe the ideal visitor type>",
  "caveat": "<one specific drawback from reviews, or null>",
  "insiderTip": "<max 20 words — one concrete actionable tip: best time to visit, what to order/request, local trick, or hidden detail from reviews>",
  "whenToVisit": "<max 15 words — timing or crowd tip extracted from actual review text, e.g. 'Arrives full by 12:45 PM — come before noon on weekdays', or null>",
  "mustTry": "<max 15 words — specific dish or item name + price if mentioned in reviews, e.g. 'Pongal Virunthu thali ₹349 — includes soup, halwa and curd', or null>"
}]

QUALITY RULES:
- trendReason: use words found in actual review texts, not invented. If recentAvg < rating, call it declining.
- aiNote: MUST start with "Verified by AI:" — for hotels cite matchedTags count + best tagEvidence/tagSnippet; for food quote the strongest snippet from positiveTagMatches{} + how many reviews confirm it
- filterVerification: ALWAYS quote from positiveTagMatches{} (4-5★ reviews). Never quote negative reviews as evidence.
- reviewSummary: synthesise only what 4-5★ reviewers praise most. If reviews are mostly negative or mixed, lead with that reality in caveat.
- whyOverOthers: compare specifically against others in this list — cite tag match count, rating, review volume, or unique feature
- caveat: real drawbacks from 1-3★ reviews only — or null. Never fabricate.
- insiderTip: derive from review text patterns — e.g. "arrive before 11am", "ask for window seat", "order the thali not the buffet". If nothing specific, return null.
- whenToVisit: extract ONLY from actual review text — timing, crowd level, day/hour. Must be factual. Return null if not mentioned.
- mustTry: extract ONLY from actual review text — a specific named dish or item. Include price if reviewer mentioned it. Return null if no specific item is mentioned.
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

// Gemini itinerary for non-Thanjavur cities — Gemini picks and orders stops
// ─── Distance Matrix ─────────────────────────────────────────────────────────
interface LegDistance { distanceKm: number; durationMins: number; }

async function batchDistanceMatrix(
  coords: Array<{ lat: number; lng: number } | null>,
  mode: 'driving' | 'walking' | 'transit',
  apiKey: string,
): Promise<Array<LegDistance | null>> {
  const N = coords.length;
  if (N < 2 || !apiKey) return Array(N - 1).fill(null);
  const origins = coords.slice(0, N - 1);
  const dests   = coords.slice(1);
  const origStr = origins.map(c => c ? `${c.lat},${c.lng}` : '0,0').join('|');
  const destStr = dests.map(c => c ? `${c.lat},${c.lng}` : '0,0').join('|');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`
    + `?origins=${encodeURIComponent(origStr)}`
    + `&destinations=${encodeURIComponent(destStr)}`
    + `&mode=${mode}&key=${apiKey}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json() as any;
    if (data.status !== 'OK') return Array(N - 1).fill(null);
    return origins.map((_, i) => {
      const el = data.rows?.[i]?.elements?.[i];
      if (!el || el.status !== 'OK') return null;
      return {
        distanceKm:   +(el.distance.value / 1000).toFixed(1),
        durationMins: Math.ceil(el.duration.value / 60),
      };
    });
  } catch {
    return Array(N - 1).fill(null);
  }
}


async function geminiItinerary(places: any[], startTime = '07:00', stopCount = 5, city = 'Thanjavur'): Promise<any[]> {
  if (!GEMINI_KEY || places.length === 0) return [];

  const SLOT_TIMES: Record<string, string[]> = {
    '07:00': ['7:00 AM','9:10 AM','9:45 AM','10:30 AM','12:00 PM','12:50 PM','2:00 PM'],
    '14:00': ['2:00 PM','3:15 PM','4:30 PM','5:30 PM'],
    '16:00': ['5:00 PM','7:00 PM'],
    '17:00': ['5:00 PM','7:00 PM'],
  };
  const SLOT_DEPART: Record<string, Array<string | undefined>> = {
    '07:00': ['9:00 AM','9:40 AM','10:25 AM','11:50 AM','12:45 PM','1:55 PM',undefined],
    '14:00': ['3:00 PM','4:15 PM','5:15 PM',undefined],
    '16:00': ['6:30 PM',undefined],
    '17:00': ['6:30 PM',undefined],
  };
  const slotTimes  = SLOT_TIMES[startTime]  ?? SLOT_TIMES['07:00'];
  const slotDepart = SLOT_DEPART[startTime] ?? SLOT_DEPART['07:00'];
  const validTraffic = (v: unknown) =>
    ['Light','Moderate','Heavy'].includes(v as string) ? v as string : 'Light';
  const validCrowd = (v: unknown) =>
    ['Low','Moderate','High'].includes(v as string) ? v as string : 'Moderate';
  const [h, m] = startTime.split(':').map(Number);
  const startStr = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;

  const topPlaces = places.slice(0, 8).map((p: any) => ({
    name:    p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    rating:  p.rating ?? 0,
    types:   (p.types ?? []).slice(0, 3).join(', '),
  }));

  const sessionLabel = startTime.startsWith('16') ? 'evening'
                     : startTime.startsWith('12') ? 'afternoon'
                     : 'full day';

  const prompt = `You are a local expert trip planner for ${city}. Create a ${stopCount}-stop ${sessionLabel} itinerary starting at ${startStr}. IMPORTANT: All stop times MUST be at or after ${startStr} — do not schedule any stop before this time.

AVAILABLE ATTRACTIONS (from Google Places — use names as given):
${JSON.stringify(topPlaces)}

SEQUENCING RULES:
1. Start with the most iconic / highest-rated attraction
2. Group walkable/nearby attractions consecutively to minimise travel
3. Sequence remaining stops to minimise backtracking

For EACH stop return this exact JSON object:
{
  "stop": "name exactly as given in available attractions",
  "time": "arrival time in '09:00 AM' format",
  "duration": "time to spend e.g. '1.5 hrs' or '1 hr 30 min'",
  "tip": "one specific, actionable visitor tip — max 18 words — must reference an actual section, feature, or crowd insight",
  "trafficNote": "one specific traffic sentence for this location and time",
  "currentTraffic": "Light | Moderate | Heavy",
  "yesterdayTraffic": "Light | Moderate | Heavy",
  "crowdLevel": "Low | Moderate | High",
  "travelToNext": "mode + duration e.g. '5 min · Walk' or '15 min · Auto' or '55 min · Cab' — omit for the last stop",
  "departBy": "time to leave e.g. '10:30 AM' — omit for the last stop",
  "entryFee": "e.g. 'Free entry' or '₹50 / adult'",
  "highlights": ["specific feature 1", "specific feature 2", "specific feature 3"],
  "reachNote": "one sentence: how to reach from the previous stop",
  "cautionNote": "one 15-word tip visitors should know",
  "avoidNote": "one specific 15-word thing to avoid at this stop"
}

VALIDATION RULES:
- CRITICAL: First stop time must be ${startStr}. Every subsequent stop time must be AFTER ${startStr}.
- currentTraffic / yesterdayTraffic: ONLY "Light", "Moderate", or "Heavy"
- crowdLevel: ONLY "Low", "Moderate", or "High"
- tip must NOT be generic — must name a specific section, timing, or feature

Return a JSON array of EXACTLY ${stopCount} stops. Return ONLY valid JSON. No markdown. No explanation.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
    );
    const data  = await resp.json() as any;
    const raw   = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const clean = raw.replace(/```json|```/g, '').trim();
    const stops = JSON.parse(clean);

    const validTraffic = (v: unknown) =>
      ['Light','Moderate','Heavy'].includes(v as string) ? v as string : 'Light';

    const stopsArr = Array.isArray(stops) ? stops : [];
    return stopsArr.slice(0, stopCount).map((s: any, idx: number) => ({
      stop:             s.stop              ?? '',
      time:             slotTimes[idx]      ?? startStr,
      duration:         s.duration          ?? '1 hr',
      tip:              s.tip               ?? 'Explore the main section for the best experience.',
      trafficNote:      s.trafficNote       ?? 'Light traffic at this hour.',
      currentTraffic:   validTraffic(s.currentTraffic),
      yesterdayTraffic: validTraffic(s.yesterdayTraffic),
      crowdLevel:       validCrowd(s.crowdLevel),
      ...(s.travelToNext          ? { travelToNext: s.travelToNext }             : {}),
      ...(slotDepart[idx] != null ? { departBy:     slotDepart[idx] as string } : {}),
      ...(s.cautionNote           ? { cautionNote:  s.cautionNote }              : {}),
      ...(s.avoidNote             ? { avoidNote:    s.avoidNote }                : {}),
      entryFee:         s.entryFee    ?? null,
      highlights:       Array.isArray(s.highlights) ? s.highlights.slice(0, 3) : [],
      reachNote:        s.reachNote   ?? '',
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

  "bestTime": "Max 20 words. Absolute best time to visit this specific location and WHY — crowd, light, access, or ritual timing.",

  "avoidNote": "Max 25 words. One concrete thing to avoid at this place — specific to section, queue, timing, or restriction. Make it actionable.",

  "status": "${timeSlot === 'Evening' ? 'Busy' : 'Open'}"
}

QUALITY RULES:
- insight: if reviews are provided, cite at least one; if no reviews, use your expert knowledge of this specific place
- flow steps must name actual physical sections of the place, not generic actions
- preparation must be actionable ("carry ₹20 for entry" not just "bring money")
- bestTime and avoidNote MUST always be filled — never leave them empty or null
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
// ── Hotel price extraction from review text ──────────────────────────────────
// Scans review text for price mentions (e.g. "paid ₹1800", "room was ₹2500")
function extractHotelPriceFromReviews(reviews: any[]): string | null {
  const priceRe = /(?:paid|charged|cost|costs?|rate|priced?|rs\.?|₹|inr)\s*[\s:]*(\d[\d,]+)/gi;
  const roomRe  = /(?:room|stay|night|per night|nightly)/i;
  const positive = reviews.filter(r => (r.rating ?? 0) >= 4);
  for (const r of positive) {
    const text = r.text?.text ?? r.text ?? '';
    if (!roomRe.test(text)) continue;
    const m = priceRe.exec(text);
    if (m) {
      const n = parseInt(m[1].replace(/,/g, ''), 10);
      if (n >= 400 && n <= 25000) return `₹${n.toLocaleString('en-IN')}/night`;
    }
  }
  return null;
}

function hotelPriceFromLevel(priceLevel: string, name: string): string {
  const lower = name.toLowerCase();
  if (/oyo|lodge|inn|residency|budget|economy/.test(lower)) return '₹800–₹1,200/night';
  if (/palace|heritage|resort|spa|boutique/.test(lower))    return '₹4,000–₹8,000/night';
  if (priceLevel === '₹')    return '₹600–₹1,200/night';
  if (priceLevel === '₹₹')   return '₹1,200–₹2,500/night';
  if (priceLevel === '₹₹₹')  return '₹3,000–₹6,000/night';
  if (priceLevel === '₹₹₹₹') return '₹6,000+/night';
  return '₹1,000–₹2,000/night';
}

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
          bestTime:     guide?.bestTime    ?? `Early morning 6–9 AM — fewer visitors, cooler temperature, and best light for the architecture`,
          avoidNote:    guide?.avoidNote   ?? `Avoid midday hours (11 AM–3 PM) — intense heat with no shade in the outer courtyards`,
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

  // ── Itinerary ─────────────────────────────────────────────────────────────
  if (tab === 'Itinerary') {
    const rawStartTime = (req.body?.startTime  ?? '07:00') as string;
    const startTime    = rawStartTime === 'Morning'   ? '07:00'
                       : rawStartTime === 'Afternoon' ? '14:00'
                       : rawStartTime === 'Evening'   ? '17:00'
                       : rawStartTime;
    const defaultStops = rawStartTime === 'Evening' ? 2 : rawStartTime === 'Afternoon' ? 4 : 10;
    const stopCount    = Math.min(Math.max(parseInt(String(req.body?.stopCount ?? defaultStops), 10) || defaultStops, 2), 12);
    const searchSeed   = parseInt((req.body?.searchSeed ?? '0') as string, 10);
    const itinCity     = ((req.body?.city as string) ?? 'Thanjavur').trim();
    const itinState    = getCityState(itinCity);
    const itinCenter   = getCityCenter(itinCity);

    const SLOT_TIMES: Record<string, string[]> = {
      '07:00': ['7:00 AM','9:10 AM','9:45 AM','10:30 AM','12:00 PM','12:50 PM','2:00 PM'],
      '14:00': ['2:00 PM','3:15 PM','4:30 PM','5:30 PM'],
      '16:00': ['5:00 PM','7:00 PM'],
      '17:00': ['5:00 PM','7:00 PM'],
    };
    const SLOT_DEPART: Record<string, Array<string | undefined>> = {
      '07:00': ['9:00 AM','9:40 AM','10:25 AM','11:50 AM','12:45 PM','1:55 PM',undefined],
      '14:00': ['3:00 PM','4:15 PM','5:15 PM',undefined],
      '16:00': ['6:30 PM',undefined],
      '17:00': ['6:30 PM',undefined],
    };
    const slotTimes  = SLOT_TIMES[startTime]  ?? SLOT_TIMES['07:00'];
    const slotDepart = SLOT_DEPART[startTime] ?? SLOT_DEPART['07:00'];
    const [hh, mm]   = startTime.split(':').map(Number);
    const startStr   = `${hh > 12 ? hh - 12 : hh === 0 ? 12 : hh}:${mm.toString().padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`;
    const validCrowd = (v: unknown) => ['Low','Moderate','High'].includes(v as string) ? v as string : 'Moderate';

    // ── THANJAVUR: fully preset-driven ──────────────────────────────────────
    const presetStops = /thanjavur|tanjore/i.test(itinCity) ? (THANJAVUR_PRESET[startTime] ?? null) : null;

    if (presetStops) {
      try {
        // Places API — only for photo refs + reviews
        const rawPlaces = await fetchPlaces(
          `top tourist attractions in ${itinCity} ${itinState}`,
          searchSeed, 35, { center: itinCenter, withPhotos: true },
        );

        // Match each preset stop to a rawPlace for photo + reviews
        const orderedStops = presetStops.map((ps) => {
          const rawMatch = rawPlaces.find((p: any) => {
            const pn = (p.displayName?.text ?? '').toLowerCase();
            return ps.aliases.some((a) => pn.includes(a) || a.includes(pn));
          });
          return { ...ps, rawMatch };
        });

        // Gemini: content only
        const stopList = orderedStops.map((s) => ({
          name:    s.label,
          address: s.rawMatch?.formattedAddress ?? 'Thanjavur, Tamil Nadu',
          rating:  s.rawMatch?.rating ?? 4.5,
        }));

        const contentPrompt = `You are a local expert guide for Thanjavur. Return content for these stops IN THIS EXACT ORDER.

${THANJAVUR_FACTS}

STOPS (visit order — do NOT reorder):
${JSON.stringify(stopList)}

For EACH stop return:
{
  "stop": "name exactly as given",
  "duration": "time to spend e.g. '2 hrs' or '45 min'",
  "tip": "one specific tip — max 18 words — must name an actual section, feature, or crowd insight (not generic)",
  "crowdLevel": "Low | Moderate | High",
  "entryFee": "exact from GROUND TRUTH e.g. 'Free entry' or '₹50 / adult'",
  "highlights": ["specific feature 1", "specific feature 2", "specific feature 3"],
  "cautionNote": "15-word crowd warning, dress code, or timing constraint",
  "avoidNote": "15-word specific thing to avoid at this stop"
}

RULES: crowdLevel ONLY "Low"/"Moderate"/"High". Entry fees ONLY from GROUND TRUTH. Return JSON array of EXACTLY ${orderedStops.length} objects. Return ONLY valid JSON, no markdown.`;

        let geminiContent: any[] = [];
        try {
          const gresp = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ parts: [{ text: contentPrompt }] }] }) },
          );
          const gdata  = await gresp.json() as any;
          const graw   = gdata?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
          const parsed = JSON.parse(graw.replace(/```json|```/g, '').trim());
          geminiContent = Array.isArray(parsed) ? parsed : [];
        } catch { /* use defaults */ }

        // ── Distance Matrix enrichment using real Places API coordinates ──────
        // Build coords array from rawPlaces matches (not STOPS registry which has
        // wrong hardcoded coords for Rajarajan Manimandapam and Punnainallur).
        // Lunch and stops without a rawMatch use null — keeps preset travelToNext.
        const dmCoords = orderedStops.map((s) => {
          if (s.isLunchBreak) return null; // lunch stop — no Places coords
          const loc = s.rawMatch?.location;
          if (!loc) return null;
          return { lat: loc.latitude as number, lng: loc.longitude as number };
        });

        let dmLegs: Array<{ distanceKm: number; durationMins: number } | null> = [];
        try {
          dmLegs = await batchDistanceMatrix(dmCoords, 'driving', PLACES_KEY);
        } catch { /* fall back to preset travelToNext strings */ }

        // Map each leg to a human-readable travelToNext string.
        // Only overwrite if the leg is non-null AND both endpoints have coords.
        const formatLeg = (leg: { distanceKm: number; durationMins: number } | null, fallback: string | null): string | null => {
          if (!leg) return fallback;
          const mins = leg.durationMins;
          const km   = leg.distanceKm;
          // Google Places sometimes co-locates nearby landmarks — if the API returns
          // near-zero distance but the preset says Auto, the GPS data is unreliable.
          // Trust the preset in that case rather than showing "0.0 km Walk".
          const mode = mins <= 5 && km <= 0.5 ? 'Walk' : km > 20 ? 'Cab' : 'Auto';
          if (mode === 'Walk' && fallback && /auto|cab/i.test(fallback)) return fallback;
          return `${mins} min · ${mode}`;
        };

        const itinerary = orderedStops.map((ps, idx) => {
          const c = geminiContent[idx] ?? {};
          const placeReviews = sortReviewsForDisplay(filterReviewsForDisplay(ps.rawMatch?.reviews ?? []))
            .slice(0, 3)
            .map((r: any) => ({
              text:     r.text?.text ?? '',
              author:   r.authorAttribution?.displayName ?? 'Visitor',
              location: 'Tamil Nadu',
              stars:    r.rating ?? 5,
              ago:      r.relativePublishTimeDescription ?? 'Recently',
            }));

          // Use Distance Matrix leg when available, else fall back to preset string.
          const enrichedTravel = idx < dmLegs.length
            ? formatLeg(dmLegs[idx], ps.travelToNext)
            : ps.travelToNext;

          return {
            stop:             ps.label,
            time:             slotTimes[idx]        ?? startStr,
            duration:         c.duration            ?? ps.duration,
            tip:              c.tip                 ?? ps.tip,
            trafficNote:      ps.trafficNote,
            currentTraffic:   ps.currentTraffic,
            yesterdayTraffic: ps.yesterdayTraffic,
            crowdLevel:       validCrowd(c.crowdLevel) ?? ps.crowdLevel,
            ...(enrichedTravel != null          ? { travelToNext: enrichedTravel }           : {}),
            ...(slotDepart[idx] != null         ? { departBy: slotDepart[idx] as string }    : {}),
            ...(c.cautionNote                   ? { cautionNote: c.cautionNote }              : {}),
            ...(c.avoidNote                     ? { avoidNote:   c.avoidNote }                : {}),
            entryFee:         c.entryFee    ?? ps.entryFee,
            highlights:       (Array.isArray(c.highlights) && c.highlights.length > 0) ? c.highlights.slice(0, 3) : ps.highlights,
            reachNote:        ps.reachNote,
            photoRef:         ps.rawMatch?.photos?.[0]?.name ?? null,
            reviews:          placeReviews,
          };
        });

        return res.json({ itinerary });
      } catch (err) {
        console.error('[/api/plan Itinerary Preset]', err);
        return res.status(500).json({ error: 'Failed to generate itinerary' });
      }
    }

    // ── Other cities: Gemini picks and orders stops ──────────────────────────
    try {
      const rawPlaces = await fetchPlaces(
        `top tourist attractions in ${itinCity} ${itinState}`,
        searchSeed, 35, { center: itinCenter, withPhotos: true },
      );
      const stops = await geminiItinerary(rawPlaces, startTime, stopCount, itinCity);

      if (stops.length === 0) {
        return res.status(500).json({ error: 'Could not generate itinerary' });
      }

      const stopsWithPhotos = stops.map((s: any) => {
        const sn    = s.stop.toLowerCase();
        const match = rawPlaces.find((p: any) => {
          const pn = (p.displayName?.text ?? '').toLowerCase();
          return sn.includes(pn) || pn.includes(sn) ||
            pn.split(' ').some((w: string) => w.length > 4 && sn.includes(w));
        });
        const placeReviews = sortReviewsForDisplay(filterReviewsForDisplay(match?.reviews ?? []))
          .slice(0, 3)
          .map((r: any) => ({
            text:     r.text?.text ?? '',
            author:   r.authorAttribution?.displayName ?? 'Visitor',
            location: 'Tamil Nadu',
            stars:    r.rating ?? 5,
            ago:      r.relativePublishTimeDescription ?? 'Recently',
          }));
        return {
          ...s,
          photoRef: match?.photos?.[0]?.name ?? null,
          reviews:  placeReviews,
          ...(s.cautionNote ? {} : { cautionNote: extractCautionNote(match?.reviews ?? []) }),
        };
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

      // Fetch strategy:
      // Search mode: single query (name-specific, no benefit from variants)
      // Tag mode:    3 DISTINCT natural queries from tag keywords → varied Google results → ~40-60 unique candidates
      // Browse mode: 5-variant broad pool for discovery
      let mergedPool: any[];
      if (filters.searchQuery) {
        mergedPool = await fetchPlaces(query, searchSeed, 20, fetchOpts);
      } else if (selectedTags.length > 0) {
        const [q1, q2, q3] = buildHotelQueryVariants(selectedTags, city);
        const [p1, p2, p3] = await Promise.all([
          fetchPlaces(q1, searchSeed, 20, fetchOpts),
          fetchPlaces(q2, searchSeed, 20, fetchOpts),
          fetchPlaces(q3, searchSeed, 20, fetchOpts),
        ]);
        const hotelSeen = new Set<string>();
        mergedPool = [];
        for (const p of [...p1, ...p2, ...p3]) {
          const pid = p.id ?? p.displayName?.text ?? '';
          if (pid && !hotelSeen.has(pid)) { hotelSeen.add(pid); mergedPool.push(p); }
        }
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

      // Strip restaurants, vehicle dealers, and other non-accommodation places + city guard
      const localPool  = filterCityOnly(mergedPool, city);
      const hotelOnly  = localPool.filter(p => {
        const primaryType = (p.primaryType ?? '') as string;
        const types = (p.types ?? []) as string[];
        if (primaryType && NON_HOTEL_TYPES.has(primaryType)) return false;
        return !types.some(t => NON_HOTEL_TYPES.has(t));
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
      // Apply hotel authenticity filter to remove fake-review hotels before scoring
      const reviewedPool = effectivePool.filter(p => (p.userRatingCount ?? 0) >= 10);
      const qualityPool  = (reviewedPool.length >= 3 ? reviewedPool : effectivePool)
        .filter(p => computeHotelAuthenticityScore(p) >= 0.35);

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
      let finalCandidates = mergedCandidates.length > 0 ? mergedCandidates : candidates.slice(0, 20).map(c => ({ ...c, _matchTier: 'Perfect Match' as const }));

      // Guarantee minimum 5 — pad from full scored pool when short (e.g. single niche tag)
      if (finalCandidates.length < 5) {
        const existingIds = new Set(finalCandidates.map(c => c.place.id ?? c.place.displayName?.text ?? ''));
        const padItems = candidates
          .filter(c => !existingIds.has(c.place.id ?? c.place.displayName?.text ?? ''))
          .slice(0, 5 - finalCandidates.length)
          .map(c => ({ ...c, _matchTier: 'Close Match' as const, _relaxedTag: null as string | null }));
        finalCandidates = [...finalCandidates, ...padItems];
      }

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

        // Keywords from ALL selected + matched tags — catches every synonym across both tags
        const allHotelKws: string[] = [...new Set(
          [...selectedTags, ...mTags].flatMap(t => (TAG_TEXT_KEYWORDS[t] ?? []).map((k: string) => k.toLowerCase()))
        )];
        const displayReviews = filterReviewsForDisplay(p.reviews ?? []);
        const allSortedReviews = sortReviewsForDisplay(displayReviews, allHotelKws);
        // Slot 1: MUST contain a tag keyword (positive 4★+ preferred, then any match)
        const positiveTagMatched = allHotelKws.length > 0
          ? allSortedReviews.filter((r: any) => (r.rating ?? 0) >= 4 && allHotelKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
          : [];
        const anyTagMatched = allHotelKws.length > 0
          ? allSortedReviews.filter((r: any) => allHotelKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
          : [];
        // Slot 1: Best quality keyword match (4★+ preferred, then any match)
        // Slot 2: Most RECENT keyword match different from slot 1
        const bestTagMatch = positiveTagMatched.length > 0 ? positiveTagMatched : anyTagMatched;
        const slot1Hotel = bestTagMatch[0];
        const slot2Hotel = [...anyTagMatched]
          .filter((r: any) => r !== slot1Hotel)
          .sort((a: any, b: any) => {
            const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0;
            const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0;
            return bTime - aTime; // newest first
          })[0];
        const pickedReviews: any[] = [slot1Hotel, slot2Hotel].filter(Boolean);
        if (pickedReviews.length < 2) {
          const remaining = allSortedReviews.filter((r: any) => !pickedReviews.includes(r));
          for (const r of remaining) {
            if (pickedReviews.length >= 2) break;
            pickedReviews.push(r);
          }
        }
        const uiReviews = pickedReviews.slice(0, 2).map((r: any) => {
            const body = (r.text?.text ?? '').toLowerCase();
            // Find first matching keyword to use as highlight anchor
            const matchedKw = allHotelKws.find(k => body.includes(k));
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
          priceRange:  extractPriceRange(p) ?? undefined,
          openNow:     p.regularOpeningHours?.openNow ?? true,
          tags:        (p.types ?? []).slice(0, 5).map((t: string) =>
                         t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                       ),
          reviewSummary:      ai.reviewSummary   || reviewSummaryFB,
          aiNote:             ai.aiNote          || `Verified by AI: ${rating}★${selectedTags.length > 0 ? ` — ${matchScore}% tag match (${mTags.length}/${selectedTags.length})` : ''}`,
          filterVerification,
          matchedKeyword:     mTags[0] || null,
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
          cautionNote:        extractCautionNote(p.reviews ?? []),
          whenToVisit:        ai.whenToVisit  || extractWhenToVisit(p.reviews ?? []) || undefined,
          mustTry:            ai.mustTry      || extractMustTry(p.reviews ?? [])     || undefined,
          recentSentiment:    buildRecentSentiment(p.reviews ?? [], tEvid, mTags, rating, reviewCount, tSnip),
          reviews:            uiReviews,
          photoColor:         COLORS[globalIdx % COLORS.length],
          photoRef:           p.photos?.[0]?.name ?? null,
          websiteUri:         p.websiteUri    ?? null,
          googleMapsUri:      p.googleMapsUri ?? null,
          googleHotelsPrice:  extractHotelPriceFromReviews(p.reviews ?? []) ?? hotelPriceFromLevel(priceStr, p.displayName?.text ?? ''),
          aiDetail: {
            whyOverOthers: ai.whyOverOthers || whyOverOthersFB,
            dataPoints,
            bestFor: ai.bestFor || `Visitors wanting ${priceStr} stay — ${reviewCount.toLocaleString()} reviews confirm ${rating}★`,
            ...(ai.caveat     ? { caveat:     ai.caveat     } : {}),
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

    // Tag-selected: single composed query — Google's own ranking handles relevance.
    // No tags / browse mode: 5-variant pool for broad discovery.
    // Free-text search: single call, no locationBias (mirrors Google Maps).
    const activeFoodTags = (filters.foodTags?.length ?? 0) > 0 ? filters.foodTags! : (filters.foodTag ? [filters.foodTag] : []);
    let rawPlaces: any[];
    if (filters.searchQuery) {
      rawPlaces = await fetchPlaces(query, searchSeed, 20, foodBaseOpts);
    } else if (activeFoodTags.length > 0) {
      // 3 DISTINCT natural-language queries from tag keywords → varied Google result sets
      // → ~40-60 unique candidates → guaranteed 5+ quality results after filters
      const [q1, q2, q3] = buildFoodQueryVariants(activeFoodTags, city);
      const [p1, p2, p3] = await Promise.all([
        fetchPlaces(q1, searchSeed, 20, foodBaseOpts),
        fetchPlaces(q2, searchSeed, 20, foodBaseOpts),
        fetchPlaces(q3, searchSeed, 20, foodBaseOpts),
      ]);
      const tagSeen = new Set<string>();
      rawPlaces = [];
      for (const p of [...p1, ...p2, ...p3]) {
        const pid = p.id ?? p.displayName?.text ?? '';
        if (pid && !tagSeen.has(pid)) { tagSeen.add(pid); rawPlaces.push(p); }
      }
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

    // Primary tag filter pipeline — 3-tier fallback to guarantee ≥5 quality results:
    //   Tier 1: review keyword match (strongest signal — slot 1 review always highlights tag)
    //   Tier 2: corpus match (name + editorial + reviews, broader net)
    //   Tier 3: full quality pool (rating ≥3.5, active) — no keyword requirement
    const primaryTag = activeFoodTags[0];
    const primaryKws = primaryTag ? (FOOD_TAG_KEYWORDS[primaryTag] ?? []).map((k: string) => k.toLowerCase()) : [];
    const primaryFiltered = primaryKws.length > 0
      ? foodPool.filter(p =>
          (p.reviews ?? []).some((r: any) =>
            primaryKws.some(k => (r.text?.text ?? '').toLowerCase().includes(k))
          )
        )
      : foodPool;
    // Fall back to corpus match if review-filter yields < 5
    const corpusFiltered = primaryKws.length > 0 && primaryFiltered.length < 5
      ? foodPool.filter(p => {
          const corpus = [
            (p.displayName?.text ?? '').toLowerCase(),
            (p.editorialSummary?.text ?? '').toLowerCase(),
            ...(p.reviews ?? []).map((r: any) => (r.text?.text ?? '').toLowerCase()),
          ].join(' ');
          return primaryKws.some(k => corpus.includes(k));
        })
      : primaryFiltered;
    // Fall back to full quality pool if corpus also yields < 5
    const poolForTag = corpusFiltered.length >= 5 ? corpusFiltered : foodPool;

    const tagFiltered  = applyTagFilter(poolForTag, tab, filters);
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

      // Use full keyword list for all active tags — catches synonyms (biryani/biriyani, etc.)
      const activeFoodTagsLocal = (filters.foodTags?.length ?? 0) > 0 ? filters.foodTags! : (filters.foodTag ? [filters.foodTag] : []);
      const tagKws = activeFoodTagsLocal.flatMap(t => (FOOD_TAG_KEYWORDS[t] ?? []).map((k: string) => k.toLowerCase()));
      const evidenceKws = [...new Set([...(evidence?.keyword ? [evidence.keyword.toLowerCase()] : []), ...tagKws])];
      const displayReviews = filterReviewsForDisplay(p.reviews ?? []);
      const allSortedFood = sortReviewsForDisplay(displayReviews, evidenceKws);
      // Prefer 4-5★ reviews that mention the tag keyword; fall back to any match
      const positiveTagFood = evidenceKws.length > 0
        ? allSortedFood.filter((r: any) => (r.rating ?? 0) >= 4 && evidenceKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
        : [];
      const anyTagFood = evidenceKws.length > 0
        ? allSortedFood.filter((r: any) => evidenceKws.some((k: string) => (r.text?.text ?? '').toLowerCase().includes(k)))
        : [];
      // Slot 1: Best quality keyword match (4★+ preferred, then any match)
      // Slot 2: Most RECENT keyword match different from slot 1
      const bestTagFood = positiveTagFood.length > 0 ? positiveTagFood : anyTagFood;
      const slot1Food = bestTagFood[0];
      const slot2Food = [...anyTagFood]
        .filter((r: any) => r !== slot1Food)
        .sort((a: any, b: any) => {
          const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0;
          const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0;
          return bTime - aTime; // newest first
        })[0];
      const pickedFood: any[] = [slot1Food, slot2Food].filter(Boolean);
      if (pickedFood.length < 2) {
        const remaining = allSortedFood.filter((r: any) => !pickedFood.includes(r));
        for (const r of remaining) {
          if (pickedFood.length >= 2) break;
          pickedFood.push(r);
        }
      }
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
        priceRange:  extractPriceRange(p) ?? undefined,
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
        cautionNote:     extractCautionNote(p.reviews ?? []),
        whenToVisit:     ai.whenToVisit  || extractWhenToVisit(p.reviews ?? []) || undefined,
        mustTry:         ai.mustTry      || extractMustTry(p.reviews ?? [])     || undefined,
        recentSentiment: buildRecentSentiment(p.reviews ?? [], {}, p._matchedTags ?? [], rating, reviewCount),
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
