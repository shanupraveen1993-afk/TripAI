export interface AiDetail {
  whyOverOthers: string;
  dataPoints: string[];
  bestFor: string;
  caveat?: string;
  insiderTip?: string;
}

export interface ReviewItem {
  text: string;
  author: string;
  location: string;
  stars: number;
  ago: string;
  highlight?: string;
}

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  dist: number;
  lat?: number | null;
  lng?: number | null;
  rating: number;
  reviewCount: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free';
  openNow: boolean;
  tags: string[];
  reviewSummary?:      string;
  aiNote:              string;
  filterVerification?: string | null;
  matchedKeyword?:     string | null;
  trendVerdict?: 'improving' | 'declining' | 'stable';
  trendReason?: string;
  matchedTags?:   string[];
  confirmedTags?: string[];
  tagEvidence?:   string;
  matchScore?:    number;    // 0-100 tag match percentage
  filterLayer?:   1 | 2 | 3 | 4;
  photoRef?: string | null;
  websiteUri?: string | null;
  googleMapsUri?: string | null;
  reviews: ReviewItem[];
  recentRatings?: number[];
  photoColor: string;
  aiDetail: AiDetail;
}

export type TrafficLevel = 'Light' | 'Moderate' | 'Heavy';

export interface ItineraryStop {
  stop: string;
  time: string;
  trafficNote: string;
  tip: string;
  currentTraffic: TrafficLevel;
  yesterdayTraffic: TrafficLevel;
  travelToNext?: string;
  departBy?: string;
  crowdLevel?: 'Low' | 'Moderate' | 'High';
  duration?: string;
  entryFee?: string;
  highlights?: string[];
  reachNote?: string;
  cautionNote?: string;
  avoidNote?: string;
  reviews?: ReviewItem[];
  imgId?: string;
}

export interface ExploreResult {
  id: string;
  name: string;
  address: string;
  rating: number;
  openNow: boolean;
  openingHours: string;
  status: 'Open' | 'Busy' | 'Closed';
  insight: string;
  flow: string;
  preparation: string;
  bestTime?: string | null;
  avoidNote?: string | null;
  tags: string[];
  reviews: ReviewItem[];
  photoColor: string;
  photoRef?: string | null;
}

export const MOCK_HOTELS: PlaceResult[] = [
  {
    id: 'h1',
    name: 'Hotel Parisutham',
    address: '55, G.A. Canal Road, Thanjavur',
    dist: 0.8,
    rating: 4.2,
    reviewCount: 1850,
    priceLevel: '₹₹',
    openNow: true,
    tags: ['Heritage', 'Temple Nearby', 'AC Rooms', 'Veg Kitchen', 'Parking'],
    reviewSummary: 'A well-established Thanjavur hotel rated highly for its proximity to the Big Temple and reliable service. Guests frequently praise the clean rooms and helpful staff who assist with temple visit timings.',
    aiNote: 'Best pick for temple visits — 0.8km walk to Brihadeeswarar, staff arrange early morning puja access.',
    trendVerdict: 'improving',
    trendReason: 'Recent guests rate service 4.4★ — above the 4.2★ historical average',
    photoColor: 'bg-amber-700',
    reviews: [
      { text: 'Perfect location — just 10 minutes walk to the Big Temple. Staff helped us with early morning puja timings and arranged an auto at 6 AM.', author: 'Suresh R.', location: 'Chennai', stars: 5, ago: '1 week ago' },
      { text: 'Clean rooms, decent food, great value for Thanjavur. The veg restaurant is excellent — authentic South Indian meals.', author: 'Priya N.', location: 'Coimbatore', stars: 4, ago: '2 weeks ago' },
      { text: 'Very helpful staff throughout our stay. Walking distance to all the major heritage sites in Thanjavur.', author: 'Ramesh V.', location: 'Bangalore', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Ranked #1 because reviewers specifically mention temple proximity and early puja access — unlike Hotel Sangam which is 2.1km further. 1,850 reviews with 4.2★ is the strongest trust signal in this Thanjavur set.',
      dataPoints: [
        '4.2★ across 1,850 reviews — highest review volume among Thanjavur hotels in this set',
        '0.8km from Brihadeeswarar Temple — closest hotel in this set',
        '94% of recent reviews mention "helpful staff" or "good location"',
        'Veg restaurant on-site — important for pilgrimage and heritage visitors',
      ],
      bestFor: 'Temple pilgrims, heritage travellers, families seeking proximity to the Big Temple.',
      caveat: 'Rooms are mid-range standard. No pool. Not suitable if luxury amenities are required.',
    },
  },
  {
    id: 'h2',
    name: 'Hotel Sangam',
    address: 'Trichy Road, Thanjavur',
    dist: 2.1,
    rating: 4.0,
    reviewCount: 1240,
    priceLevel: '₹₹',
    openNow: true,
    tags: ['Pool', 'Business', 'Family', 'AC Rooms', 'WiFi', 'Parking'],
    reviewSummary: 'A popular choice for business and family travellers with a swimming pool and spacious rooms. The multi-cuisine restaurant is praised for accommodating both vegetarian and non-vegetarian guests, and the conference facilities are well-rated.',
    aiNote: 'Only hotel in Thanjavur with a pool in this set — best choice for families with children.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.0★ across 1,240 reviews — steady and reliable',
    photoColor: 'bg-blue-700',
    reviews: [
      { text: 'The pool was great for kids. Hotel is clean and the restaurant serves good food. Location is convenient on Trichy Road.', author: 'Kavitha M.', location: 'Trichy', stars: 5, ago: '3 days ago' },
      { text: 'Good business hotel. Conference rooms are well-equipped. Food is decent, both veg and non-veg options available.', author: 'Arun K.', location: 'Mumbai', stars: 4, ago: '2 weeks ago' },
      { text: 'Nice family stay. Swimming pool was the highlight for our children. Staff are friendly and helpful.', author: 'Meena S.', location: 'Madurai', stars: 4, ago: '3 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Wins for families — the only hotel in this Thanjavur set with a swimming pool. Multi-cuisine restaurant accommodates both veg and non-veg guests, unlike Parisutham\'s veg-only dining. 1,240 verified reviews confirm consistent quality.',
      dataPoints: [
        '4.0★ across 1,240 reviews — strong consistent trust signal in Thanjavur',
        'Swimming pool — only hotel in this set with pool access',
        'Multi-cuisine restaurant (veg + non-veg) — better variety than others',
        '2.1km from Big Temple — easy 5-min auto ride',
      ],
      bestFor: 'Families with children, business travellers needing conference facilities, mixed groups.',
      caveat: 'Located on busy Trichy Road — street noise can be an issue on lower floors facing the road.',
    },
  },
  {
    id: 'h3',
    name: 'Hotel Tamil Nadu (TTDC)',
    address: '6-A, G.R. Road, Thanjavur',
    dist: 0.5,
    rating: 3.8,
    reviewCount: 720,
    priceLevel: '₹',
    openNow: true,
    tags: ['Temple Nearby', 'Parking', 'AC Rooms', 'Value for Money'],
    reviewSummary: 'Operated by Tamil Nadu Tourism Development Corporation, this government-run hotel sits closest to the Big Temple. Reviewers value the unbeatable price and central location, acknowledging the older but functional rooms.',
    aiNote: 'Best value option near the Big Temple — TTDC government pricing is fixed, no festival surge pricing.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 3.8★ government hotel standard — reliable across Tamil Nadu',
    photoColor: 'bg-green-700',
    reviews: [
      { text: 'Can\'t beat the price for this location. Basic but clean. Just a short walk to the Big Temple.', author: 'Vijay P.', location: 'Pondicherry', stars: 4, ago: '1 week ago' },
      { text: 'Good value option. TTDC hotels are reliable across Tamil Nadu. Food is average but location is prime.', author: 'Lakshmi D.', location: 'Salem', stars: 3, ago: '3 weeks ago' },
      { text: 'Simple rooms, government pricing. Perfect for a quick heritage visit to Thanjavur. No surprises.', author: 'Senthil A.', location: 'Thanjavur', stars: 4, ago: '2 months ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Ranked for value — government-fixed rates are typically 35–40% lower than comparable private hotels. At 0.5km, it is the closest hotel to the Big Temple in this entire set.',
      dataPoints: [
        '3.8★ across 720 reviews — reliable TTDC quality standard',
        '0.5km from Brihadeeswarar Temple — closest in this set',
        'Government-fixed pricing — no dynamic price surges during festivals',
        'Economy tier — lowest nightly rate among surveyed Thanjavur hotels',
      ],
      bestFor: 'Value-seeking travellers, solo pilgrims, backpackers, government employees on official tour.',
      caveat: 'Rooms are older and basic. Not suitable for travellers expecting modern finishes. Books fast during Pongal and Tamil New Year.',
    },
  },
  {
    id: 'h4',
    name: 'Ideal River View Resort',
    address: 'Punnainallur, Thanjavur',
    dist: 3.5,
    rating: 3.9,
    reviewCount: 480,
    priceLevel: '₹',
    openNow: true,
    tags: ['River View', 'Quiet & Peaceful', 'Parking', 'Family'],
    reviewSummary: 'A serene riverside resort on the Vennar river bank, popular with families seeking a peaceful stay away from the city centre. Guests mention the pleasant river-facing rooms and calm atmosphere as standout features.',
    aiNote: 'Only river-view property in this set — quiet escape while staying within Thanjavur district.',
    trendVerdict: 'improving',
    trendReason: 'Post-renovation cleanliness scores 4.1★ — above the 3.9★ historical average',
    photoColor: 'bg-teal-700',
    reviews: [
      { text: 'Peaceful property on the Vennar river. Very quiet and relaxing. Rooms are clean after recent renovation.', author: 'Rohini T.', location: 'Chennai', stars: 4, ago: '2 weeks ago' },
      { text: 'Nice river views from the room. Great value for what you get. Good for families wanting peace and quiet.', author: 'Balamurugan P.', location: 'Coimbatore', stars: 4, ago: '1 month ago' },
      { text: 'Quiet location far from city noise. Perfect for a relaxing temple-town visit in Thanjavur.', author: 'Anand K.', location: 'Hyderabad', stars: 4, ago: '6 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Unique in offering a riverside setting — no other hotel in this Thanjavur set provides river views. Improving recent scores after renovation signal a better-maintained property than before.',
      dataPoints: [
        '3.9★ across 480 reviews — solid for a smaller riverside resort',
        'Vennar river frontage — only river-view property in this Thanjavur set',
        'Recent renovation: cleanliness improving (4.1★ recent vs 3.9★ all-time)',
        'Economy pricing — best for scenic value per rupee',
      ],
      bestFor: 'Families seeking peace and quiet, couples seeking a quiet escape, nature-loving travellers.',
      caveat: '3.5km from the Big Temple — requires auto or cab for sightseeing. On-site dining options are limited.',
    },
  },
  {
    id: 'h5',
    name: 'Grand Pragati Hotel',
    address: 'NH-67, Srinivasa Nagar, Thanjavur',
    dist: 2.8,
    rating: 3.7,
    reviewCount: 340,
    priceLevel: '₹',
    openNow: true,
    tags: ['Good Amenities', 'WiFi', 'Near Railway Station', 'AC Rooms', 'Business'],
    reviewSummary: 'A no-frills hotel near the NH-67 highway, convenient for road travellers and bus arrivals. Reviews highlight fast WiFi and comfortable AC rooms at competitive Thanjavur prices, making it a practical transit stay.',
    aiNote: 'Best for transit stays — near the bus stand and highway. Fast WiFi suits remote workers passing through Thanjavur.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 3.7★ — steady value-focused property',
    photoColor: 'bg-purple-700',
    reviews: [
      { text: 'Clean rooms, fast WiFi, good price for Thanjavur. No frills but everything you need for a quick stay.', author: 'Karthi S.', location: 'Trichy', stars: 4, ago: '1 week ago' },
      { text: 'Convenient location near the highway and bus stand. Easy check-in, reliable AC. Good value.', author: 'Dhruv M.', location: 'Bangalore', stars: 3, ago: '3 weeks ago' },
      { text: 'Best affordable option near the Thanjavur bus stand. AC works well, WiFi is reliable for work.', author: 'Sundar V.', location: 'Chennai', stars: 4, ago: '2 months ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Wins for transit convenience — nearest hotel to Thanjavur Bus Stand in this set. At competitive pricing with fast WiFi (mentioned by 78% of business reviewers), it edges the TTDC hotel for connectivity needs.',
      dataPoints: [
        '3.7★ across 340 reviews — honest value-focused feedback',
        'NH-67 location — most convenient for road travellers and bus passengers',
        'Fast WiFi mentioned positively by 78% of business reviewer comments',
        'Lowest nightly rate in the set — practical for short stays',
      ],
      bestFor: 'Short transit stays, business travellers passing through, solo travellers.',
      caveat: '2.8km from the Big Temple. Highway-facing rooms can be noisy. Not a heritage or scenic stay.',
    },
  },
];

export const MOCK_FOOD: PlaceResult[] = [
  {
    id: 'f1',
    name: 'Sri Venkatramana Bhavan',
    address: 'Gandhiji Road, Thanjavur',
    dist: 0.4,
    rating: 4.6,
    reviewCount: 2800,
    priceLevel: '₹',
    openNow: true,
    tags: ['Pure Veg', 'Thali', 'South Indian', 'Banana Leaf', 'Heritage'],
    reviewSummary: 'A Thanjavur institution celebrated for its traditional banana-leaf thali. Reviewers consistently praise the Thanjavur-style sambar, rasam, and unlimited rice service — served on bronze plates the authentic way.',
    aiNote: 'Best for authentic Thanjavur thali — a cultural experience, not just a meal. Arrive by 12:15 PM before they run out.',
    trendVerdict: 'improving',
    trendReason: 'Recent guests rate food quality 4.7★ — above the 4.6★ all-time average',
    photoColor: 'bg-yellow-700',
    reviews: [
      { text: 'The best Thanjavur thali I\'ve had. Authentic flavours, generous portions, banana leaf service. A complete cultural and culinary experience.', author: 'Meena T.', location: 'Chennai', stars: 5, ago: '4 days ago' },
      { text: 'Unlimited rice with all the traditional Thanjavur sides. Very affordable. Arrive early — thali sells out by 1 PM.', author: 'Karthik R.', location: 'Trichy', stars: 5, ago: '2 weeks ago' },
      { text: 'Sambar and rasam are outstanding. Pure veg kitchen, very clean. This is the real Thanjavur taste.', author: 'Priya S.', location: 'Bangalore', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Ranked #1 for authenticity — reviewers specifically cite the banana-leaf service and Thanjavur-style sambar as irreplaceable. At 2,800 reviews and 4.6★, it has the strongest trust signal for South Indian thali in this Thanjavur set.',
      dataPoints: [
        '4.6★ across 2,800 reviews — highest review volume for a Thanjavur restaurant',
        'Banana-leaf service — traditional method that competitors in this set don\'t match',
        'Thanjavur thali authenticity score: 9.4/10 based on review keyword analysis',
        'Affordable pricing: ₹80–150 for a full thali — exceptional value',
      ],
      bestFor: 'Pilgrims and heritage food lovers, vegetarian visitors, anyone wanting the authentic Chola thali experience.',
      caveat: 'Thali sells out by 1:30 PM on most days. Cash only. No air-conditioning inside.',
    },
  },
  {
    id: 'f2',
    name: 'Hotel Sathars',
    address: 'Karanthai Main Road, Thanjavur',
    dist: 0.9,
    rating: 4.3,
    reviewCount: 4200,
    priceLevel: '₹₹',
    openNow: true,
    tags: ['Biryani', 'South Indian', 'Non-Veg', 'Tiffin'],
    reviewSummary: 'Thanjavur\'s most-reviewed restaurant, famous for Ambur-style biryani and generous non-veg rice specials. The bold spice profile and value portions have earned it a devoted following across the region.',
    aiNote: 'Best biryani in Thanjavur — Ambur-style biryani cited in 62% of all reviews. Largest review count locally.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.3★ across 4,200 reviews — a proven Thanjavur favourite',
    photoColor: 'bg-red-700',
    reviews: [
      { text: 'The biryani is everything Thanjavur travellers talk about. Bold spices, generous portions. An absolute must-try.', author: 'Arjun P.', location: 'Chennai', stars: 5, ago: '3 days ago' },
      { text: 'Best non-veg option in Thanjavur city. Ambur biryani is outstanding. Service is fast even at peak lunch hour.', author: 'Vishal K.', location: 'Madurai', stars: 4, ago: '1 week ago' },
      { text: '4,200+ reviews for a reason. Consistent biryani quality every single visit over many years.', author: 'Selvam A.', location: 'Trichy', stars: 4, ago: '2 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Highest review count (4,200) of any restaurant in Thanjavur — more people have rated this than anywhere else in the city. The Ambur-style biryani is the specific signature that no other entry here matches.',
      dataPoints: [
        '4.3★ across 4,200 reviews — highest review volume in this Thanjavur food set',
        'Ambur-style biryani: mentioned in 62% of all reviews as the primary draw',
        'Non-veg specialist — best option in Thanjavur for meat-based dishes',
        'Open from 7 AM — doubles as a breakfast tiffin stop',
      ],
      bestFor: 'Non-vegetarian food lovers, biryani enthusiasts, travellers wanting Thanjavur\'s most-reviewed spot.',
      caveat: 'Vegetarian options are very limited. Very busy 12–2 PM — expect a wait. Limited seating.',
    },
  },
  {
    id: 'f3',
    name: 'Chola Mess',
    address: 'New Bus Stand Road, Thanjavur',
    dist: 1.3,
    rating: 4.5,
    reviewCount: 1600,
    priceLevel: '₹',
    openNow: true,
    tags: ['Thali', 'South Indian', 'Pure Veg', 'Heritage', 'Banana Leaf'],
    reviewSummary: 'Specialising in Chola-era recipes, Chola Mess serves dishes like paal paniyaram, koozh, and traditional rice specials visitors cannot find elsewhere in Thanjavur. A genuinely unique heritage food experience.',
    aiNote: 'Unique Chola-era recipes only available here — try paal paniyaram and koozh for a 1,000-year-old culinary experience.',
    trendVerdict: 'improving',
    trendReason: 'Heritage food curiosity growing — recent guests rate uniqueness 4.7★ vs 4.5★ all-time',
    photoColor: 'bg-orange-700',
    reviews: [
      { text: 'Ate the paal paniyaram and koozh — dishes from 1,000 years ago, still made the same way. Incredible experience unlike anything else in Tamil Nadu.', author: 'Deepa R.', location: 'Mumbai', stars: 5, ago: '1 week ago' },
      { text: 'This is why you visit Thanjavur for food. Chola-era recipes, traditional service, authentic Chola taste.', author: 'Harish V.', location: 'Bangalore', stars: 5, ago: '3 weeks ago' },
      { text: 'The koozh (fermented rice drink) here is amazing. Very affordable and truly unique to Thanjavur.', author: 'Nalini S.', location: 'Thanjavur', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Uniquely offers Chola-era cuisine that no other restaurant in Thanjavur provides. While Venkatramana Bhavan wins on review volume, Chola Mess wins on culinary heritage — paal paniyaram and koozh are irreplaceable experiences.',
      dataPoints: [
        '4.5★ across 1,600 reviews — excellent for a specialty heritage restaurant',
        'Paal paniyaram and koozh: unique Chola-era dishes not available at competing entries',
        'Heritage food uniqueness mentioned in 87% of 5-star reviews',
        'Affordable pricing: ₹60–120 — extraordinary value for one-of-a-kind cuisine',
      ],
      bestFor: 'Food historians, culinary tourists, heritage visitors, vegetarians seeking something beyond the usual thali.',
      caveat: 'Limited hours (lunch only) and small menu by design. Seating fills fast. Best visited before 1 PM.',
    },
  },
  {
    id: 'f4',
    name: 'Bombay Bakes & Café',
    address: 'Medical College Road, Thanjavur',
    dist: 1.8,
    rating: 4.4,
    reviewCount: 920,
    priceLevel: '₹₹',
    openNow: true,
    tags: ['Cafe & Snacks', 'Filter Coffee', 'Bakery', 'South Indian', 'Snacks'],
    reviewSummary: 'The go-to café for Thanjavur\'s best filter coffee, freshly baked goods, and light meals. The decoction filter coffee is ranked as the finest in the city by reviewers, and the AC interior is a welcome break between temple visits.',
    aiNote: 'Best filter coffee in Thanjavur — decoction cited in nearly every review. Ideal pre-temple breakfast stop.',
    trendVerdict: 'improving',
    trendReason: 'New menu additions praised — recent guests rate variety 4.5★ vs 4.4★ all-time',
    photoColor: 'bg-amber-600',
    reviews: [
      { text: 'Best filter coffee in Thanjavur, no question. The decoction is perfect and freshly baked bread is excellent.', author: 'Nirmala K.', location: 'Chennai', stars: 5, ago: '5 days ago' },
      { text: 'Nice café atmosphere. Filter coffee and banana bread made for a great start to our temple visit day in Thanjavur.', author: 'Vikram S.', location: 'Hyderabad', stars: 4, ago: '2 weeks ago' },
      { text: 'Refreshing stop after the museum. AC inside, good coffee, light snacks. Reasonably priced for a café.', author: 'Sona R.', location: 'Bangalore', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'The only dedicated café in this set — fills a completely different need from traditional messes and biryani joints. Filter coffee is mentioned in 91% of reviews vs 0% at any other entry in this list.',
      dataPoints: [
        '4.4★ across 920 reviews — excellent for a café-style venue in Thanjavur',
        'Filter coffee: mentioned positively in 91% of reviews — the defining draw',
        'AC indoor seating — unique comfort advantage during Thanjavur\'s hot afternoons',
        '₹₹ pricing: breakfast + coffee around ₹150–250',
      ],
      bestFor: 'Coffee lovers, light-meal seekers, afternoon breaks between sightseeing, anyone wanting café-style ambience.',
      caveat: 'Not a full South Indian meal stop — come for coffee and snacks. For heavier meals, pair with a visit to Venkatramana Bhavan or Chola Mess.',
    },
  },
  {
    id: 'f6',
    name: 'Kannapa Restaurant',
    address: 'Anna Salai, Near Railway Station, Thanjavur',
    dist: 1.1,
    rating: 4.5,
    reviewCount: 3100,
    priceLevel: '₹₹',
    openNow: true,
    tags: ['Chettinad', 'Non-Veg', 'South Indian', 'Mutton Kuzhambu', 'Pepper Chicken'],
    reviewSummary: 'The definitive Chettinad restaurant in Thanjavur — famed for bold, aromatic curries made with freshly ground kalpasi, marathi mokku, and star anise. Reviewers single out the Chettinad mutton kuzhambu and pepper chicken as unmatched anywhere in the district.',
    aiNote: 'Best Chettinad in Thanjavur — freshly ground spice blends used daily. Mutton kuzhambu and pepper chicken are the signature dishes.',
    trendVerdict: 'improving',
    trendReason: 'Recent guests rate spice authenticity 4.7★ — above the 4.5★ all-time average',
    photoColor: 'bg-red-900',
    reviews: [
      { text: 'Best Chettinad mutton kuzhambu I have had outside Chettinad itself. The spice blend is completely different from regular restaurants — deep, earthy, aromatic. Absolute must-try in Thanjavur.', author: 'Murugesan K.', location: 'Thanjavur', stars: 5, ago: '3 days ago' },
      { text: 'The pepper chicken here is legendary. You can smell the freshly ground kalpasi and marathi mokku the moment you walk in. Real Chettinad, not a diluted version.', author: 'Divya S.', location: 'Chennai', stars: 5, ago: '1 week ago' },
      { text: 'Visited Kannapa three times on a week-long trip. Consistent quality, generous portions, great value. The Chettinad egg curry is underrated — try it.', author: 'Ravi T.', location: 'Coimbatore', stars: 4, ago: '2 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Ranked as the only Chettinad specialist in this set — no other restaurant offers this cuisine. With 3,100 reviews and 4.5★, it is the second-most reviewed food spot in Thanjavur, confirming that locals and travellers consistently seek it out for authentic Chettinad flavours.',
      dataPoints: [
        '4.5★ across 3,100 reviews — second-highest review count in this Thanjavur food set',
        'Chettinad spice blend ground fresh daily — kalpasi, marathi mokku, star anise',
        'Mutton kuzhambu and pepper chicken cited in 74% of all reviews as primary draw',
        '₹₹ pricing: full Chettinad meal ₹200–350 — strong value for specialty cuisine',
      ],
      bestFor: 'Non-vegetarian food lovers, Chettinad cuisine seekers, travellers wanting regional Tamil Nadu cooking beyond biryani.',
      caveat: 'Very limited vegetarian options — primarily a non-veg kitchen. Peak hours 1–3 PM draw large crowds. Spice levels are authentic and high — ask for "medium" if sensitive to heat.',
    },
  },
  {
    id: 'f5',
    name: 'Hotel Ramnath',
    address: 'New Bus Stand Area, Thanjavur',
    dist: 2.4,
    rating: 4.1,
    reviewCount: 1450,
    priceLevel: '₹',
    openNow: true,
    tags: ['South Indian', 'Tiffin', 'Filter Coffee', 'Non-Veg', 'Quick'],
    reviewSummary: 'A reliable local favourite near the Thanjavur bus stand serving both veg and non-veg South Indian meals. The chicken curry and parotta combination is the signature dish, and the morning tiffin attracts early risers.',
    aiNote: 'Best all-rounder in Thanjavur — covers both veg and non-veg at affordable pricing. Chicken curry + parotta is the crowd favourite.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.1★ across 1,450 reviews — dependable Thanjavur local',
    photoColor: 'bg-rose-700',
    reviews: [
      { text: 'Chicken curry and parotta here is outstanding. Best combination in Thanjavur. A true local favourite.', author: 'Murugan P.', location: 'Trichy', stars: 5, ago: '1 week ago' },
      { text: 'Solid tiffin in the morning. Idli-sambar and vada are fresh and well-made. Quick service even in the rush.', author: 'Kavya S.', location: 'Madurai', stars: 4, ago: '3 weeks ago' },
      { text: 'Reliable option near bus stand. Both veg and non-veg dishes are good quality. Very affordable.', author: 'Raju K.', location: 'Thanjavur', stars: 4, ago: '2 months ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Wins for versatility — the only restaurant in this set offering both quality veg and non-veg meals at ₹ pricing. While Sathars specialises in biryani, Ramnath covers the full South Indian menu at lower prices.',
      dataPoints: [
        '4.1★ across 1,450 reviews — strong for a local Thanjavur restaurant',
        'Chicken curry + parotta: most mentioned dish combination across all reviews',
        'Dual veg/non-veg menu — only restaurant in this set covering both equally well',
        'Bus stand proximity — convenient for transit visitors to Thanjavur',
      ],
      bestFor: 'Value-seeking travellers, mixed veg/non-veg groups, transit visitors near the Thanjavur bus stand.',
      caveat: 'Basic seating and ambience. Very busy at meal times — expect queues. Not a dining experience, purely functional.',
    },
  },
];

export const MOCK_ITINERARY: ItineraryStop[] = [
  {
    stop: 'Brihadeeswarar Temple (Big Temple)',
    time: '7:00 AM',
    trafficNote: 'Light — arrive early before tourist crowds build',
    tip: 'Enter from the East Gopuram gate. Remove footwear at the entrance. Stand inside the courtyard by 7:30 AM to see the morning puja — the granite shadow of the 66m vimana never falls outside the temple walls at any time of day. UNESCO World Heritage Site.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '2 hrs',
    entryFee: 'Free',
    highlights: ['Morning puja', 'Shadow phenomenon', 'East Gopuram'],
    travelToNext: '5 min · Walk (adjacent complex)',
    departBy: '9:15 AM',
  },
  {
    stop: 'Thanjavur Maratha Palace & Durbar Hall',
    time: '9:30 AM',
    trafficNote: 'Light — opens at 9 AM, quietest before 10:30 AM',
    tip: 'Start with the Durbar Hall — the Maratha-era portraits, royal weapons, and ivory throne are unmatched. Climb the 58m Bell Tower for a panoramic view of the Big Temple and the city. Museum entry covers the Royal Palace, Durbar Hall, and Bell Tower — allow 90 min minimum.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '90 min',
    entryFee: '₹50',
    highlights: ['Bell Tower view', 'Durbar Hall', 'Ivory throne'],
    travelToNext: '2 min · Walk (within palace complex)',
    departBy: '11:00 AM',
  },
  {
    stop: 'Saraswathi Mahal Library',
    time: '11:00 AM',
    trafficNote: 'Light',
    tip: 'Founded around 1700 AD — one of Asia\'s oldest libraries with over 60,000 manuscripts on palm leaf, paper, and cloth. The display gallery has rare illustrated Ramayana manuscripts and Thanjavur-school drawings. Photography not allowed inside. Takes 45–60 minutes.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '45 min',
    entryFee: 'Free',
    highlights: ['60,000 manuscripts', 'Palm leaf scrolls', 'No photography'],
    travelToNext: '3 min · Walk (same palace grounds)',
    departBy: '12:00 PM',
  },
  {
    stop: 'Thanjavur Art Gallery — Chola Bronze Sculptures',
    time: '12:15 PM',
    trafficNote: 'Light — afternoons are the quietest slot',
    tip: 'Home to one of India\'s finest Chola-era bronze collections — including 11th-century Nataraja, Ardhanarishvara, and Shiva sculptures from Gallery 3. The 9th–12th century bronzes are extraordinary. Combined ticket with Palace Museum covers entry. Spend at least 60 minutes.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '60 min',
    entryFee: '₹50 (combo)',
    highlights: ['Nataraja bronze', '9th–12th century art', 'Chola collection'],
    travelToNext: '12 min · Auto',
    departBy: '1:45 PM',
  },
  {
    stop: 'Goldsmith Street — Thanjavur Paintings & Glass Work',
    time: '2:00 PM',
    trafficNote: 'Moderate near market area',
    tip: 'The original Thanjavur painting ateliers are on Thalavaiyal Salai (Goldsmith Street). Watch artisans apply real 22-carat gold foil and semi-precious stones to gesso panels — a tradition going back 400 years. Prices are fixed at reputed workshops; expect ₹800–2,500 for a small original piece.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Moderate',
    duration: '60 min',
    highlights: ['22-carat gold foil', 'Live artisans', 'Original paintings'],
    reachNote: '12 min by auto from Art Gallery. Ask for Thalavaiyal Salai.',
  },
];

export const MOCK_EXPLORE_PALACE: ExploreResult = {
  id: 'e2',
  name: 'Thanjavur Maratha Palace Royal Museum',
  address: 'Palace Road, Thanjavur — 5-min walk south of Brihadeeswarar Temple',
  rating: 4.4,
  openNow: true,
  openingHours: '9:00 AM – 6:00 PM daily',
  status: 'Open',
  insight: 'The only place in Thanjavur where you can stand above the Big Temple — climb the Bell Tower (5th floor) for a panoramic view no ground-level vantage matches. The Durbar Hall ceiling art is Maratha at its most extravagant: painted panels covering every surface above you. The Saraswathi Mahal Library and Art Gallery are in the same complex — buy the combined ticket and walk between all three without leaving the grounds.',
  flow: '1. Enter from the main Palace gate on East Main Street (south of Big Temple). Buy the combined ticket (₹50/adult — covers Palace, Art Gallery, and Bell Tower).\n2. Start at the Durbar Hall on the ground floor — the painted ceiling and Maratha royal portraits set the context for everything else.\n3. Walk upstairs to the Bell Tower and climb all 5 floors for the aerial view of the Big Temple.\n4. Cross the courtyard to the Saraswathi Mahal Library — show combined ticket at entry.\n5. Finish at the Thanjavur Art Gallery (same complex) — allow 45 minutes for the Chola bronze collection.\n6. Exit back through the main Palace gate.',
  preparation: 'How to get there: 5-min walk south of Brihadeeswarar Temple, or ₹50 auto from bus stand. Entry fee: ₹50/adult (covers Palace + Art Gallery + Bell Tower). Must-do: Climb the Bell Tower for the only aerial view of the Big Temple — most visitors miss this. See Gallery 3 in the Art Gallery for the finest 11th-century Nataraja bronze. What NOT to do: Do not skip the Art Gallery — it holds the finest Chola bronze collection in Tamil Nadu. Do not come on Wednesday — Art Gallery is closed. Photography is allowed in the Palace but not inside the Library gallery.',
  tags: ['Maratha Heritage', 'Bell Tower', 'Royal Museum', 'Architecture', 'Chola Bronze'],
  reviews: [
    { text: 'The Bell Tower is a hidden gem — nobody told me you could climb it for a full panorama of the Big Temple and the whole city. Absolutely worth the ₹50 combined ticket.', author: 'Anand M.', location: 'Bangalore', stars: 5, ago: '1 week ago' },
    { text: 'The Durbar Hall ceiling art is extraordinary — detailed Maratha-era paintings covering every inch. The Chola bronzes in the Art Gallery are world-class, especially the Nataraja.', author: 'Kavitha R.', location: 'Chennai', stars: 5, ago: '2 weeks ago' },
    { text: 'Visit in the morning between 9–11 AM — the gallery is quiet, the light is soft, and the guides are available. Morning is when you can actually examine the bronzes closely without crowds.', author: 'Ravi M.', location: 'Mumbai', stars: 5, ago: '5 days ago' },
    { text: 'Late afternoon around 4 PM is surprisingly peaceful — the afternoon crowd thins and the Bell Tower view catches beautiful golden light over the city. Try to reach before 5 PM to have the gallery to yourself.', author: 'Divya K.', location: 'Pune', stars: 4, ago: '2 weeks ago' },
    { text: 'Spend at least 2 hours here covering all three sections. The Saraswathi Mahal palm leaf manuscripts are fascinating — ask the curator to explain the writing process.', author: 'Suresh T.', location: 'Hyderabad', stars: 4, ago: '1 month ago' },
  ],
  photoColor: 'bg-purple-800',
};

export const MOCK_EXPLORE_SARASWATHI: ExploreResult = {
  id: 'e3',
  name: 'Saraswathi Mahal Library',
  address: 'Inside Thanjavur Palace Complex, East Main Street, Thanjavur',
  rating: 4.5,
  openNow: true,
  openingHours: '10:00 AM – 1:00 PM & 1:30 PM – 5:30 PM (Closed Wednesdays)',
  status: 'Open',
  insight: 'Founded around 1700 AD under Maratha ruler Serfoji II — one of Asia\'s oldest continuously functioning libraries. Over 60,000 manuscripts survive here: palm leaf, paper, and cloth. The illustrated Ramayana manuscripts with Thanjavur-school miniature paintings are the crown jewels — some panels are just centimetres wide with dozens of figures painted in extraordinary detail. Unlike most museums, you can ask curators to explain specific manuscripts.',
  flow: '1. Enter from inside the Palace complex (same ticket area as the Art Gallery — ₹20 separate entry or use combined Palace ticket).\n2. Start at the display gallery near the entrance — the showcased manuscripts give context before the deeper collection.\n3. Look for the illustrated Ramayana palm leaves — ask the curator at the front desk to point these out directly.\n4. Examine the textile manuscripts (cloth-based writing) — unique to this library among Indian collections.\n5. Check the medical and astronomy manuscripts section — some treatises date to the 17th century.\n6. Exit back through the Palace courtyard.',
  preparation: 'How to get there: Inside Palace complex — same courtyard as Art Gallery. Walk from Big Temple (5 min) or auto from bus stand (₹50). Entry: ₹20/adult (separate from Palace ticket), or included in ₹50 combined ticket. Must-do: Ask the curator to show the illustrated Ramayana palm leaves — they are not always on primary display. What NOT to do: No photography inside the manuscript gallery — this is strictly enforced. Do not visit on Wednesday (closed). Do not rush — allow at least 45 minutes to absorb what you are seeing.',
  tags: ['Ancient Library', 'Palm Manuscripts', 'Maratha Heritage', 'Rare Books', 'History'],
  reviews: [
    { text: 'Staggering to stand in a 300-year-old library and hold a conversation about palm leaf manuscripts written before modern India existed. The illustrated Ramayana panels are jaw-dropping.', author: 'Priya K.', location: 'Delhi', stars: 5, ago: '3 days ago' },
    { text: 'The curators are incredibly knowledgeable and happy to explain. Asked about the astronomy manuscripts and got a 20-minute explanation. Hidden gem of Thanjavur.', author: 'Rajan S.', location: 'Mumbai', stars: 5, ago: '2 weeks ago' },
    { text: 'Small but extraordinary. Do not miss the cloth manuscripts — I had never seen anything like them. Closed on Wednesdays, check before you go.', author: 'Meena V.', location: 'Coimbatore', stars: 4, ago: '3 weeks ago' },
  ],
  photoColor: 'bg-blue-800',
};

export const MOCK_EXPLORE_AIRAVATESVARA: ExploreResult = {
  id: 'e4',
  name: 'Airavatesvara Temple Darasuram',
  address: 'Darasuram, 4 km from Thanjavur city centre (15-min auto)',
  rating: 4.6,
  openNow: true,
  openingHours: '6:00 AM – 12:30 PM & 4:00 PM – 8:30 PM',
  status: 'Open',
  insight: 'The most intricately carved of the three Great Living Chola Temples (UNESCO). Where Brihadeeswarar impresses with scale, Airavatesvara rewards close attention — the miniature carvings are breathtaking, with entire Mahabharata scenes rendered in panels the size of your hand. The stone steps of the mandapam produce different musical notes when struck — the only musical staircase among Chola monuments. Crowd is consistently low, even on weekends.',
  flow: '1. Take an auto from Thanjavur city centre to Darasuram (15 min, ₹80–100). Tell the driver "Airavatesvara Temple" — all local autos know it.\n2. Enter from the main gopuram on the east side. Free entry.\n3. Walk the outer circumambulation path (clockwise) and examine the detailed carvings at eye level — bring the carvings into focus before entering the inner complex.\n4. At the main mandapam steps, ask the caretaker or guard to demonstrate the musical staircase — each step produces a different tone when tapped.\n5. Enter the inner sanctum for the Shiva shrine. Dress code: covered clothing.\n6. Photograph the chariot wheel base on the south side — the most distinctive architectural element at Airavatesvara.',
  preparation: 'How to get there: Auto from Thanjavur city centre ₹80–100 (15 min). No direct bus — auto is the practical choice. Entry fee: Free. Must-do: Ask the caretaker to demonstrate the musical steps — do not leave without experiencing this. Examine the outer wall carvings at the base level — get close for the Mahabharata scenes. What NOT to do: Do not wear shorts or sleeveless clothing. Do not rush past the outer walls — the carvings are the main event, not just the sanctum. Do not visit midday in summer — the heat is intense on the unshaded stone.',
  tags: ['UNESCO World Heritage', 'Chola Architecture', 'Musical Steps', 'Temple Carvings', 'Less Crowded'],
  reviews: [
    { text: 'The musical staircase blew my mind — ancient Chola engineers carved stone steps that each produce a different musical note. No other monument in India has this. Come here before the crowds discover it.', author: 'Vikram N.', location: 'Pune', stars: 5, ago: '5 days ago' },
    { text: 'The evening puja here is quietly beautiful — oil lamps placed along the outer carvings, almost no tourists, just devotees. The atmosphere at dusk with the temple lit by lamps is completely different from the daytime experience.', author: 'Sunita P.', location: 'Hyderabad', stars: 5, ago: '1 week ago' },
    { text: 'Morning visit around 7 AM is magical — fresh, cool, and empty. The early light falls directly on the eastern gopuram and the carved panels come alive. Arrived at sunrise and stayed two hours without seeing more than ten people.', author: 'Arjun L.', location: 'Delhi', stars: 5, ago: '2 weeks ago' },
    { text: 'More intimate than Brihadeeswarar but arguably more beautiful up close. I spent 90 minutes just examining the outer wall carvings. The Mahabharata battle scenes in miniature are extraordinary.', author: 'Lalitha S.', location: 'Chennai', stars: 5, ago: '10 days ago' },
    { text: 'UNESCO listed and almost empty on a Saturday morning. The caretaker was knowledgeable and showed us the musical steps and chariot base. A must for anyone interested in Chola art.', author: 'Deepak R.', location: 'Bangalore', stars: 5, ago: '3 weeks ago' },
  ],
  photoColor: 'bg-amber-800',
};

export const MOCK_EXPLORE_SIVAGANGA: ExploreResult = {
  id: 'e5',
  name: 'Sivaganga Fort',
  address: '15-min walk from Thanjavur Palace, or 5-min auto from city centre',
  rating: 4.1,
  openNow: true,
  openingHours: 'Open all day (ruins — no ticketed entry)',
  status: 'Open',
  insight: 'A peaceful, crowd-free alternative to Thanjavur\'s main heritage circuit. The fort ruins sit around the Sivaganga tank — a historic water reservoir used by the Nayak and Maratha rulers. Less photographed than the Big Temple but ideal for quiet exploration, golden-hour photography, and understanding Thanjavur\'s non-Chola history. You will often have the ramparts to yourself, even on weekends.',
  flow: '1. Walk 15 minutes from the Palace complex, or take a 5-min auto (₹40–50) from city centre.\n2. Approach from the east entrance and walk the outer ramparts clockwise for the best structural views.\n3. Descend to the Sivaganga tank edge — the water reservoir with its stepped ghats is the photographic centrepiece.\n4. Look for the cannon remnants near the main bastion on the north side — the only surviving artillery piece at the fort.\n5. Climb the eastern corner of the ramparts for a view of both the fort and the distant Big Temple vimana.\n6. Visit the small Shiva shrine inside the fort complex — still actively worshipped.',
  preparation: 'How to get there: 15-min walk from Thanjavur Palace, or 5-min auto (₹40–50). Entry fee: Free (open ruins). Best time: 5–6 PM for golden-hour photography when the stone turns warm orange. Must-do: Photograph the Sivaganga tank reflection at golden hour. Walk the full perimeter of the ramparts. What NOT to do: Do not go alone after dark — the ruins are unlit and unguarded after sunset. Do not expect maintained facilities — this is an open ruin site, bring your own water. Do not skip the Shiva shrine inside — it gives the fort its living character.',
  tags: ['Fort Ruins', 'Historic Tank', 'Photography', 'Peaceful', 'Off the Beaten Path'],
  reviews: [
    { text: 'Completely peaceful — had the whole fort to ourselves on a Sunday afternoon. The golden-hour light on the tank and ramparts is absolutely stunning. A perfect end to a Thanjavur heritage day.', author: 'Rohini T.', location: 'Trichy', stars: 5, ago: '1 week ago' },
    { text: 'Less visited but genuinely atmospheric. The Sivaganga tank gives the fort a living quality. Cannon remnants on the north side were an unexpected find.', author: 'Arjun P.', location: 'Chennai', stars: 4, ago: '2 weeks ago' },
    { text: 'Good contrast to the crowded Big Temple. Quiet, photogenic, historically interesting. Go in the late afternoon for the best light and temperature.', author: 'Seetha N.', location: 'Madurai', stars: 4, ago: '1 month ago' },
  ],
  photoColor: 'bg-stone-700',
};

export const MOCK_EXPLORE: ExploreResult = {
  id: 'e1',
  name: 'Brihadeeswarar Temple',
  address: 'Membalam Road, Balaganapathy Nagar, Thanjavur',
  rating: 4.7,
  openNow: true,
  openingHours: '6:00 AM – 12:30 PM & 4:00 PM – 8:30 PM',
  status: 'Open',
  insight: 'Visit between 6–8 AM for the morning puja when crowd is minimal and the sun illuminates the 66m vimana from the east. The granite shadow phenomenon — the vimana casts no shadow within the temple complex — is best observed at noon.',
  flow: '1. Enter from the East Gopuram (main entrance on the east side).\n2. Remove footwear at the entrance steps — lockers available.\n3. Walk the outer pradakshina (circumambulation path) clockwise to see the carved panels.\n4. Visit the Nandi mandapam — the 16-tonne monolithic Nandi bull facing the sanctum.\n5. Enter the inner sanctum (dress code: men in dhoti or covered clothing, women in saree or salwar).\n6. Climb to the first platform for a ground-level view of the vimana structure.',
  preparation: 'Carry ₹20 for the small museum adjacent to the temple. Wear covered clothing (no shorts or sleeveless). No cameras inside the sanctum. Free entry to main temple. Auto from city centre: ₹50–80.',
  tags: ['UNESCO World Heritage', 'Temple', 'Architecture', 'History', 'Chola'],
  reviews: [
    { text: 'The shadow of the vimana never falls outside the temple walls — ancient Chola engineering that still astonishes. Arrive at sunrise for the best experience.', author: 'Supriya V.', location: 'Hyderabad', stars: 5, ago: '1 week ago' },
    { text: "Morning puja at 6 AM is spectacular. Very few tourists that early. The scale of the 1,000-year-old temple is breathtaking up close.", author: 'Naveen K.', location: 'New Delhi', stars: 5, ago: '2 weeks ago' },
    { text: 'The evening puja around 6:30 PM is the most atmospheric time to visit — oil lamps are lit around the vimana, the nadaswaram fills the courtyard, and the crowd is calmer than morning. The golden light on the gopuram at dusk is unforgettable.', author: 'Meera R.', location: 'Coimbatore', stars: 5, ago: '4 days ago' },
    { text: 'Afternoon visit between 2–4 PM is peaceful — the intense midday crowd thins out and you can walk the pradakshina path without rushing. The carved panels on the outer wall are easier to examine without the morning rush.', author: 'Kiran S.', location: 'Bangalore', stars: 4, ago: '3 weeks ago' },
    { text: 'One of the finest pieces of Dravidian architecture anywhere. The Chola bronzes in the adjacent gallery are world-class.', author: 'Preethi S.', location: 'Chennai', stars: 5, ago: '1 month ago' },
  ],
  photoColor: 'bg-amber-700',
};

export const EXPLORE_PRESETS: Record<string, ExploreResult> = {
  'Brihadeeswarar Temple':                  MOCK_EXPLORE,
  'Thanjavur Maratha Palace Royal Museum':  MOCK_EXPLORE_PALACE,
  'Saraswathi Mahal Library':               MOCK_EXPLORE_SARASWATHI,
  'Airavatesvara Temple Darasuram':         MOCK_EXPLORE_AIRAVATESVARA,
  'Sivaganga Fort':                         MOCK_EXPLORE_SIVAGANGA,
};
