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
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free' | 'Under ₹200' | '₹200–500' | '₹500–1200' | '₹1200+';
  priceRange?: string;
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
  googleHotelsPrice?: string;
  priceFromGemini?:   boolean;
  reviews: ReviewItem[];
  recentRatings?: number[];
  photoColor: string;
  cautionNote?: string;
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
    priceRange: '₹1,500–3,500/night',
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
    priceRange: '₹1,500–4,000/night',
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
    priceRange: '₹700–1,200/night',
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
    priceRange: '₹800–1,500/night',
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
    priceRange: '₹600–1,000/night',
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
  {
    id: 'h6',
    name: 'Hotel Oriental Towers',
    address: 'M.K.M. Road, Thanjavur',
    dist: 1.4,
    rating: 4.1,
    reviewCount: 680,
    priceLevel: '₹₹₹',
    priceRange: '₹2,000–4,500/night',
    openNow: true,
    tags: ['AC Rooms', 'Multi-Cuisine Restaurant', 'WiFi', 'Parking', 'Business', 'Premium Stay'],
    reviewSummary: 'One of Thanjavur\'s better-appointed mid-range hotels, Oriental Towers offers spacious rooms and an in-house multi-cuisine restaurant. Business travellers rate it highly for its reliable infrastructure and central location.',
    aiNote: 'Best mid-range with in-house dining — multi-cuisine restaurant saves effort of finding good food nearby.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.1★ across 680 reviews — steady mid-range performance',
    photoColor: 'bg-slate-700',
    reviews: [
      { text: 'Spacious rooms and the best in-house restaurant I found in Thanjavur. Worth the slightly higher price.', author: 'Anand M.', location: 'Chennai', stars: 4, ago: '1 week ago' },
      { text: 'Good business hotel. Conference facilities are decent and the WiFi is reliable. Central location.', author: 'Preethi K.', location: 'Bangalore', stars: 4, ago: '2 weeks ago' },
      { text: 'Clean, modern rooms. Restaurant serves both North and South Indian. Good overall for Thanjavur.', author: 'Suresh V.', location: 'Mumbai', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Best mid-range option in Thanjavur for business travellers — in-house multi-cuisine dining is not available at budget hotels like Grand Pragati or TTDC. 680 reviews at 4.1★ confirms consistent quality.',
      dataPoints: [
        '4.1★ across 680 reviews — reliable mid-range Thanjavur hotel',
        'In-house multi-cuisine restaurant — unique feature in this price tier',
        'Central MKM Road location — accessible from both temple and railway station',
        '₹₹₹ pricing: best value when factoring in dining convenience',
      ],
      bestFor: 'Business travellers, couples, anyone wanting a mid-range stay with on-site dining.',
      caveat: 'Pricier than budget options. Rooms are functional but not luxury-grade.',
    },
  },
  {
    id: 'h7',
    name: 'Hotel Valli',
    address: 'Old Bus Stand Area, Thanjavur',
    dist: 1.9,
    rating: 3.6,
    reviewCount: 290,
    priceLevel: '₹',
    priceRange: '₹400–700/night',
    openNow: true,
    tags: ['Budget Stay', 'Near Bus Stand', 'AC Rooms', 'Value for Money'],
    reviewSummary: 'A genuine budget hotel near the old bus stand offering clean, functional rooms at Thanjavur\'s lowest price tier. Reviewers consistently praise the value and the friendly management.',
    aiNote: 'Cheapest AC option in Thanjavur — no frills but clean and functional. Best for solo budget travellers.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 3.6★ — dependable budget standard',
    photoColor: 'bg-cyan-800',
    reviews: [
      { text: 'Cheapest option I found with AC in Thanjavur. Basic but clean. Exactly what you need for a one-night stay.', author: 'Karthick S.', location: 'Trichy', stars: 4, ago: '2 weeks ago' },
      { text: 'Budget stay done right. No complaints for the price. Owner is friendly and helpful with directions.', author: 'Siva R.', location: 'Chennai', stars: 3, ago: '1 month ago' },
      { text: 'Very affordable for Thanjavur. Rooms are clean, AC works, location near bus stand is convenient.', author: 'Muthu P.', location: 'Madurai', stars: 4, ago: '6 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Lowest price tier in this set — for travellers on a strict budget, Hotel Valli is the only AC option under ₹700/night. Small review count but positive sentiment.',
      dataPoints: [
        '3.6★ across 290 reviews — small but genuine feedback set',
        'Lowest nightly rate: ₹400–700 — cheapest AC option in Thanjavur',
        'Old bus stand location — walkable to local transport',
        'Basic clean rooms — no luxury expectations set',
      ],
      bestFor: 'Solo budget travellers, backpackers, pilgrims on a strict budget.',
      caveat: 'Very basic facilities. No restaurant on-site. Older building.',
    },
  },
  {
    id: 'h8',
    name: 'Raj Park Hotel',
    address: 'Railway Station Road, Thanjavur',
    dist: 1.2,
    rating: 3.8,
    reviewCount: 410,
    priceLevel: '₹₹',
    priceRange: '₹1,000–2,200/night',
    openNow: true,
    tags: ['Near Railway Station', 'AC Rooms', 'Parking', 'Clean Rooms', 'Good Amenities'],
    reviewSummary: 'A well-located mid-range hotel directly on Railway Station Road, popular with travellers arriving by train. Reviewers highlight the easy walk from the station and clean, comfortable rooms.',
    aiNote: 'Best hotel for train travellers — 5-minute walk from Thanjavur Railway Station. No need for a cab on arrival.',
    trendVerdict: 'stable',
    trendReason: 'Steady 3.8★ — solid mid-range train-arrival option',
    photoColor: 'bg-indigo-700',
    reviews: [
      { text: 'Walked straight from the station to the hotel in 5 minutes. Clean room, AC works. Perfect for a quick Thanjavur stop.', author: 'Rajan T.', location: 'Bangalore', stars: 4, ago: '1 week ago' },
      { text: 'Good mid-range option near the railway station. Staff are helpful. Parking was available for our car.', author: 'Priya N.', location: 'Chennai', stars: 4, ago: '3 weeks ago' },
      { text: 'Convenient location for train arrival. Rooms are clean and comfortable. Nothing outstanding but reliable.', author: 'Suresh B.', location: 'Hyderabad', stars: 3, ago: '2 months ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Unique positioning directly on Railway Station Road — the most convenient option in this set for train passengers. Avoids the hassle and cost of cab transfers on arrival.',
      dataPoints: [
        '3.8★ across 410 reviews — reliable mid-range option',
        'Railway Station Road location — closest hotel to Thanjavur station',
        '5-minute walk from train platform — zero cab cost on arrival',
        '₹₹ pricing — mid-range with good connectivity value',
      ],
      bestFor: 'Train travellers, families arriving by rail, short-stay visitors.',
      caveat: '1.2km from the Big Temple — requires an auto for temple visits.',
    },
  },
  {
    id: 'h9',
    name: 'Sri Priya Hotel',
    address: 'South Main Street, Thanjavur',
    dist: 0.7,
    rating: 3.7,
    reviewCount: 180,
    priceLevel: '₹',
    priceRange: '₹500–900/night',
    openNow: true,
    tags: ['Budget Stay', 'City Centre', 'AC Rooms', 'Near Big Temple', 'Heritage Stay'],
    reviewSummary: 'A small budget hotel on South Main Street, within walking distance of the Big Temple. Often overshadowed by larger competitors, it offers genuine value for heritage visitors who want a central base.',
    aiNote: 'Hidden budget gem — 0.7km from the Big Temple on South Main Street. Lower profile but honest reviews.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 3.7★ across 180 reviews — small but dependable',
    photoColor: 'bg-emerald-800',
    reviews: [
      { text: 'Small hotel, big location. Right near the temple. Budget rooms but clean and perfectly located.', author: 'Arun K.', location: 'Coimbatore', stars: 4, ago: '3 weeks ago' },
      { text: 'Best budget option I found this close to the Big Temple. Friendly staff. Very basic rooms.', author: 'Geetha M.', location: 'Salem', stars: 3, ago: '1 month ago' },
      { text: 'Functional and affordable. South Main Street is the heart of old Thanjavur — great location.', author: 'Venkat P.', location: 'Trichy', stars: 4, ago: '2 months ago' },
    ],
    aiDetail: {
      whyOverOthers: 'At 0.7km from the Big Temple and under ₹900/night, it competes directly with Hotel Parisutham on proximity at nearly half the price. Fewer reviews but consistent positive feedback.',
      dataPoints: [
        '3.7★ across 180 reviews — smaller set but genuine',
        'South Main Street — 0.7km from Brihadeeswarar Temple',
        'Budget pricing: ₹500–900 — significantly cheaper than heritage options',
        'Walking distance to temple, palace, and museum complex',
      ],
      bestFor: 'Budget-conscious heritage travellers, solo pilgrims, backpackers wanting temple proximity.',
      caveat: 'Basic rooms and facilities. Limited parking. Small property.',
    },
  },
  {
    id: 'h10',
    name: 'Hotel Vijay',
    address: 'Gandhiji Road, Thanjavur',
    dist: 1.0,
    rating: 4.0,
    reviewCount: 520,
    priceLevel: '₹₹',
    priceRange: '₹1,200–2,800/night',
    openNow: true,
    tags: ['Heritage Stay', 'Temple Nearby', 'AC Rooms', 'In-House Restaurant', 'Parking', 'Good Amenities'],
    reviewSummary: 'A trusted mid-range hotel on Gandhiji Road with a dedicated following among repeat Thanjavur visitors. The in-house vegetarian restaurant and temple proximity make it popular with pilgrimage groups.',
    aiNote: 'Best mid-range for pilgrimage groups — veg restaurant on-site, temple within 1km, group rooms available.',
    trendVerdict: 'improving',
    trendReason: 'Recent renovation: room quality scores improving 4.2★ vs 4.0★ historical',
    photoColor: 'bg-amber-800',
    reviews: [
      { text: 'Excellent for a pilgrimage stay. Veg restaurant is excellent and the Big Temple is a short auto ride away.', author: 'Saroja D.', location: 'Trichy', stars: 5, ago: '5 days ago' },
      { text: 'Reliable Thanjavur hotel I have used for years. Rooms improved after renovation. Good value.', author: 'Balasubramanian R.', location: 'Chennai', stars: 4, ago: '2 weeks ago' },
      { text: 'In-house veg restaurant is a big plus. Clean rooms, helpful staff. Good central location.', author: 'Meenakshi V.', location: 'Madurai', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Strong combination of temple proximity + in-house veg dining — matches Hotel Parisutham on location while adding a full veg restaurant that Parisutham lacks at this price tier. Post-renovation scores are improving.',
      dataPoints: [
        '4.0★ across 520 reviews — solid mid-range trust signal',
        'In-house vegetarian restaurant — valuable for pilgrimage groups',
        '1.0km from Brihadeeswarar Temple — walking or short auto distance',
        'Post-renovation improvement: room quality trending to 4.2★ recent',
      ],
      bestFor: 'Pilgrimage groups, families, vegetarian travellers wanting on-site dining near the temple.',
      caveat: 'Not luxury grade. Group bookings need advance reservation during festival season.',
    },
  },
];

export const MOCK_FOOD: PlaceResult[] = [
  {
    id: 'f1',
    name: 'Pattukottai Kamatchi Mess',
    address: 'Thanjavur city',
    dist: 0.6,
    rating: 4.5,
    reviewCount: 1900,
    priceLevel: '₹',
    priceRange: '₹80–130/head',
    openNow: true,
    tags: ['Pure Veg', 'Thali', 'South Indian', 'Banana Leaf', 'Mess & Meals'],
    reviewSummary: 'A trusted Thanjavur mess known for its traditional South Indian thali served on banana leaf. Locals and pilgrims alike rely on it for an affordable, filling meal. Sambar, rasam, kootu, and unlimited rice are consistently praised.',
    aiNote: 'Reliable Thanjavur thali — banana leaf service, unlimited rice, traditional sides. A local favourite for pilgrims visiting the Big Temple.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.5★ rating — a dependable Thanjavur thali institution',
    photoColor: 'bg-orange-700',
    reviews: [
      { text: 'Best affordable thali in Thanjavur. Sambar is the real Thanjavur style — rich, tangy, with drumstick. Unlimited rice and everything served fresh on banana leaf.', author: 'Rajesh M.', location: 'Trichy', stars: 5, ago: '5 days ago' },
      { text: 'Locals eat here every day and that tells you everything. Very clean, quick service, and the rasam here is outstanding.', author: 'Kavitha S.', location: 'Thanjavur', stars: 5, ago: '2 weeks ago' },
      { text: 'Authentic Thanjavur meals — this is the real thing. Not tourist-facing, pure local mess. Arrive before 1 PM.', author: 'Murugan P.', location: 'Chennai', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'A genuinely local Thanjavur mess — not dressed up for tourists. The banana-leaf thali with traditional Thanjavur sambar and unlimited rice is what visitors come specifically for. Strong trust signal from local regular customers.',
      dataPoints: [
        '4.5★ across 1,900 reviews — strong local footfall',
        'Banana-leaf service with unlimited rice — traditional Thanjavur method',
        'Thanjavur-style sambar cited in majority of reviews as the standout',
        'Budget pricing: ₹80–130 for a complete thali — best value in this category',
      ],
      bestFor: 'Pilgrims, budget travellers, anyone wanting an authentic local Thanjavur thali experience.',
      caveat: 'Lunch only — typically open until 2:30 PM. Arrive by 12:30 PM on weekends to avoid sellout.',
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
    priceRange: '₹150–300/head',
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
    priceRange: '₹60–120/head',
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
    priceRange: '₹150–250/head',
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
    priceRange: '₹200–350/head',
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
    priceRange: '₹80–180/head',
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
  {
    id: 'f7',
    name: 'Venkatramana Bhavan',
    address: 'Big Temple Road, Thanjavur',
    dist: 0.4,
    rating: 4.6,
    reviewCount: 2800,
    priceLevel: '₹',
    priceRange: '₹70–120/head',
    openNow: true,
    tags: ['Pure Veg', 'South Indian', 'Tiffin', 'Mess & Meals', 'Heritage', 'Banana Leaf'],
    reviewSummary: 'The oldest and most beloved pure vegetarian restaurant on Big Temple Road — a Thanjavur institution. Pilgrims and locals have relied on Venkatramana Bhavan for decades for its satvik thali, soft idlis, and perfect sambar.',
    aiNote: 'Most iconic pure veg restaurant in Thanjavur — Big Temple Road location makes it the go-to for temple pilgrims.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.6★ institution — quality unchanged over decades',
    photoColor: 'bg-orange-600',
    reviews: [
      { text: 'After the Big Temple darshan, this is where everyone goes. The satvik meals are perfect — fresh, clean, spiritually appropriate.', author: 'Janaki R.', location: 'Madurai', stars: 5, ago: '3 days ago' },
      { text: 'Idlis are cloud-soft and the sambar is Thanjavur-perfect. Banana leaf thali is an experience every visitor must have.', author: 'Padmavathi S.', location: 'Trichy', stars: 5, ago: '1 week ago' },
      { text: 'Been eating here for 20 years. Quality never drops. This is what Thanjavur food should taste like.', author: 'Sundarajan K.', location: 'Thanjavur', stars: 5, ago: '2 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'The highest-rated pure veg restaurant in Thanjavur at 4.6★ — matched only by Pattukottai Kamatchi Mess. Big Temple Road location makes it the most convenient satvik dining option for pilgrims.',
      dataPoints: [
        '4.6★ across 2,800 reviews — among the highest-rated restaurants in Thanjavur',
        'Big Temple Road — 0.4km from Brihadeeswarar Temple entrance',
        'Satvik cooking — no onion, garlic — appropriate for post-darshan meals',
        'Decades-old institution — consistent quality across generations of visitors',
      ],
      bestFor: 'Temple pilgrims, satvik food seekers, pure vegetarians, heritage food enthusiasts.',
      caveat: 'No non-veg options. Peak hours 11 AM–1 PM fill very fast. Cash-only.',
    },
  },
  {
    id: 'f8',
    name: 'Sri Annapoorna Restaurant',
    address: 'Hospital Road, Thanjavur',
    dist: 1.6,
    rating: 4.2,
    reviewCount: 890,
    priceLevel: '₹₹',
    priceRange: '₹100–200/head',
    openNow: true,
    tags: ['Pure Veg', 'South Indian', 'Family Dining', 'AC', 'Tiffin', 'Lunch Spot'],
    reviewSummary: 'A family-friendly pure veg restaurant with AC seating — a premium over the typical Thanjavur mess. Known for generous portions, a wide tiffin selection, and a clean, comfortable environment suited for families and senior visitors.',
    aiNote: 'Best AC pure veg experience in Thanjavur — comfortable, family-suited, wide tiffin and meals menu.',
    trendVerdict: 'improving',
    trendReason: 'New AC seating praised by recent guests — comfort scores up to 4.4★ recent',
    photoColor: 'bg-yellow-700',
    reviews: [
      { text: 'Best comfortable veg dining in Thanjavur. AC, clean, generous portions. Perfect for families with elderly members.', author: 'Rajalakshmi T.', location: 'Chennai', stars: 5, ago: '1 week ago' },
      { text: 'Wide tiffin menu — idli, dosa, upma, pongal, poori. Everything fresh and well-made. Good filter coffee too.', author: 'Subramaniam P.', location: 'Coimbatore', stars: 4, ago: '3 weeks ago' },
      { text: 'Nice break from the heat — AC restaurant with quality food. Slightly pricier but worth it for comfort.', author: 'Nandini V.', location: 'Bangalore', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Only pure veg restaurant in this set with full AC seating — a significant comfort advantage in Thanjavur\'s heat. Wide tiffin selection caters to all-day dining unlike mess-only competitors.',
      dataPoints: [
        '4.2★ across 890 reviews — strong for a family restaurant',
        'AC seating — only pure veg AC restaurant in this Thanjavur set',
        'All-day menu: tiffin from 7 AM + lunch meals — widest operating window',
        '₹₹ pricing — premium justified by comfort and menu variety',
      ],
      bestFor: 'Families with elderly, senior pilgrims, anyone wanting comfortable veg dining in AC.',
      caveat: 'Slightly higher prices than traditional messes. Can fill up on weekend afternoons.',
    },
  },
  {
    id: 'f9',
    name: 'Shri Krishna Bhavan',
    address: 'Srinivasa Nagar, Thanjavur',
    dist: 2.2,
    rating: 4.3,
    reviewCount: 1200,
    priceLevel: '₹',
    priceRange: '₹60–100/head',
    openNow: true,
    tags: ['Tiffin', 'Pure Veg', 'South Indian', 'Filter Coffee', 'Breakfast Spot', 'Quick'],
    reviewSummary: 'Thanjavur\'s go-to tiffin centre for early-morning breakfast — soft idlis, crispy dosas, and the city\'s most praised filter coffee. A neighbourhood favourite that draws a steady local crowd from 6 AM every day.',
    aiNote: 'Best breakfast tiffin in Thanjavur — opens at 6 AM, perfect for pre-temple or pre-travel morning meals.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.3★ across 1,200 reviews — dependable neighbourhood breakfast spot',
    photoColor: 'bg-amber-700',
    reviews: [
      { text: 'Best idli in Thanjavur, hands down. The filter coffee is legendary. Been eating here every morning for three days.', author: 'Krishnaswamy A.', location: 'Chennai', stars: 5, ago: '4 days ago' },
      { text: 'Opens at 6 AM — perfect for an early temple visit morning. Idli-sambar and crispy vada were outstanding.', author: 'Revathi S.', location: 'Trichy', stars: 4, ago: '2 weeks ago' },
      { text: 'Local favourite for a reason. Unpretentious, fast service, fantastic tiffin quality. Filter coffee is the best I had in Tamil Nadu.', author: 'Harish V.', location: 'Bangalore', stars: 5, ago: '3 weeks ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Earliest opening time (6 AM) in this set — the only option for pre-dawn temple visitors. Filter coffee cited in 88% of reviews as the standout, outranking even Bombay Bakes for coffee quality among locals.',
      dataPoints: [
        '4.3★ across 1,200 reviews — strong local tiffin footfall',
        'Opens 6 AM — earliest in this Thanjavur food set',
        'Filter coffee mentioned in 88% of reviews as primary draw',
        'Budget pricing: ₹60–100 — most affordable breakfast option',
      ],
      bestFor: 'Early risers, pre-temple breakfast, filter coffee enthusiasts, backpackers.',
      caveat: 'Tiffin only — no lunch or dinner. Closes by 11 AM when items sell out. Cash-only.',
    },
  },
  {
    id: 'f10',
    name: 'Hotel Grand Durbar',
    address: 'Trichy Road, Thanjavur',
    dist: 2.5,
    rating: 4.0,
    reviewCount: 740,
    priceLevel: '₹₹₹',
    priceRange: '₹200–450/head',
    openNow: true,
    tags: ['Fine Dining', 'Family Dining', 'Multi-Cuisine', 'Non-Veg', 'AC', 'Buffet'],
    reviewSummary: 'Thanjavur\'s best fine-dining option — Grand Durbar offers a full multi-cuisine buffet and à la carte menu in a formal AC setting. Popular for family celebrations, business lunches, and travellers wanting a premium sit-down meal.',
    aiNote: 'Best fine-dining in Thanjavur — multi-cuisine buffet, formal AC ambience, good for family celebrations and business meals.',
    trendVerdict: 'stable',
    trendReason: 'Consistent 4.0★ across 740 reviews — reliable premium option',
    photoColor: 'bg-rose-900',
    reviews: [
      { text: 'Best restaurant ambience in Thanjavur by far. Buffet had 30+ dishes including Chettinad, Chinese, and North Indian. Family dinner was memorable.', author: 'Kalpana R.', location: 'Chennai', stars: 4, ago: '1 week ago' },
      { text: 'Worth the price for a celebratory meal. Service is formal and attentive. Good wine list for Tamil Nadu.', author: 'Arun S.', location: 'Mumbai', stars: 4, ago: '3 weeks ago' },
      { text: 'Best multi-cuisine option in the city. Buffet value is excellent — great spread of both veg and non-veg dishes.', author: 'Vijayalakshmi P.', location: 'Bangalore', stars: 4, ago: '1 month ago' },
    ],
    aiDetail: {
      whyOverOthers: 'Unique in offering formal fine-dining in Thanjavur — no other restaurant in this set provides multi-cuisine buffet + AC + formal service. For family celebrations or business meals, it is the only suitable option.',
      dataPoints: [
        '4.0★ across 740 reviews — strong for a premium Thanjavur restaurant',
        'Multi-cuisine buffet: 30+ dishes including Chettinad, Chinese, North Indian',
        'Formal AC dining — only fine-dining experience in this Thanjavur set',
        '₹₹₹ pricing: buffet ₹200–450 — premium but best multi-course value',
      ],
      bestFor: 'Family celebrations, business meals, travellers wanting premium sit-down dining in Thanjavur.',
      caveat: 'Most expensive option in this set. Reservation recommended for dinner. Parking can fill on weekends.',
    },
  },
];

export const MOCK_ITINERARY: ItineraryStop[] = [
  {
    stop: 'Brihadeeswarar Temple (Big Temple)',
    time: '7:00 AM',
    trafficNote: 'Light — arrive early before tourist crowds build',
    tip: 'Enter from the East Gopuram gate. Stand inside the courtyard by 7:10 AM to see the morning puja — the granite shadow of the 66m vimana never falls outside the temple walls at any time of day. UNESCO World Heritage Site.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '2 hrs',
    entryFee: 'Free',
    highlights: ['Morning puja', 'Shadow phenomenon', 'East Gopuram'],
    travelToNext: '5 min · Walk',
    departBy: '9:00 AM',
  },
  {
    stop: 'Thanjavur Maratha Palace & Durbar Hall',
    time: '9:15 AM',
    trafficNote: 'Light — opens at 9 AM, quietest before 10:30 AM',
    tip: 'Start with the Durbar Hall — the Maratha-era portraits, royal weapons, and ivory throne are unmatched. Climb the Bell Tower (5th floor) for a panoramic view of the Big Temple. Museum ticket covers Palace, Durbar Hall, and Bell Tower — allow 90 min.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '90 min',
    entryFee: '₹50',
    highlights: ['Bell Tower panorama', 'Durbar Hall', 'Ivory throne'],
    travelToNext: '2 min · Walk (within palace complex)',
    departBy: '10:45 AM',
  },
  {
    stop: 'Saraswathi Mahal Library',
    time: '10:45 AM',
    trafficNote: 'Light',
    tip: 'Founded around 1700 AD — one of Asia\'s oldest libraries with over 49,000 manuscripts on palm leaf, paper, and cloth. The illustrated Ramayana manuscripts and Thanjavur-school botanical drawings are extraordinary. Closed on Wednesdays.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '45 min',
    entryFee: '₹20',
    highlights: ['49,000+ manuscripts', 'Illustrated Ramayana texts', 'Botanical drawings'],
    travelToNext: '12 min · Auto (~₹80)',
    departBy: '11:30 AM',
  },
  {
    stop: 'Rajarajan Manimandapam',
    time: '11:45 AM',
    trafficNote: 'Light — park is quiet and uncrowded at midday',
    tip: 'Stand at the Manimandapam entrance facing south for the cleanest unobstructed photo of the Big Temple gopuram. The memorial hall has well-curated Chola dynasty historical panels — worth 20 minutes inside.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '30 min',
    entryFee: 'Free',
    highlights: ['Rajaraja I statue', 'Chola dynasty panels', 'Best gopuram photo angle'],
    reachNote: '~2.8 km by auto from Palace complex (~12 min, ₹80). Near the north gate of Brihadeeswarar Temple.',
    travelToNext: '10 min · Auto (~₹60)',
    departBy: '12:15 PM',
  },
  {
    stop: 'Sivaganga Fort',
    time: '12:30 PM',
    trafficNote: 'Light — fort is uncrowded in the afternoon',
    tip: 'Walk the full fort rampart perimeter for the best unobstructed view of the Big Temple gopuram from a distance. The Sivaganga tank reflection and warm laterite stone are Thanjavur\'s best photography spot. Visit the small Shiva shrine inside the fort.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '45 min',
    entryFee: 'Free',
    highlights: ['Fort ramparts with Big Temple view', 'Sivaganga tank reflection', 'Shiva shrine inside fort'],
    reachNote: '~1.5 km by auto from Manimandapam (~10 min, ₹60).',
    travelToNext: '10 min · Auto (~₹60)',
    departBy: '1:15 PM',
  },
  {
    stop: 'Lunch — South Indian Restaurant',
    time: '1:30 PM',
    trafficNote: 'Moderate — lunch hour traffic on main road near bus stand',
    tip: 'Order the full banana leaf thali — typically ₹150–200 for rice, sambar, 3 curries, rasam, papad, and curd. Refills are free at most local mess restaurants. Best lunch option is near Thanjavur Bus Stand area.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Moderate',
    crowdLevel: 'Moderate',
    duration: '1 hr',
    entryFee: '~₹150–300 per person',
    highlights: ['Banana leaf thali — South Indian meals', 'Thanjavur-style filter coffee', 'Chettinad specials at local mess restaurants'],
    reachNote: '8 min auto from Sivaganga Fort — several mess restaurants along the main road near Thanjavur Bus Stand.',
    travelToNext: '10 min · Auto (~₹60)',
    departBy: '2:30 PM',
  },
  {
    stop: 'Thanjavur Art Gallery',
    time: '2:45 PM',
    trafficNote: 'Light — quiet afternoon inside Palace complex',
    tip: 'Focus on the Nataraja and Saraswathi bronzes in the central hall — these are the finest Chola bronzes outside Chennai. The Ardhanarisvara panel at the far end is unmissable. 1,000+ stone and metal pieces from the 9th–13th century.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '1 hr',
    entryFee: '₹30',
    highlights: ['Chola bronze Nataraja — 11th-century masterwork', 'Ardhanarisvara stone panel', '1000+ pieces from 9th–13th century'],
    reachNote: '10 min auto from restaurant — inside Thanjavur Palace complex, separate entrance.',
    travelToNext: '3 min · Walk (200m)',
    departBy: '3:30 PM',
  },
  {
    stop: 'Schwartz Church',
    time: '3:45 PM',
    trafficNote: 'Light — almost no crowd in the afternoon',
    tip: 'The Serfoji II cenotaph inside is historically significant — commissioned in memory of Danish missionary Schwartz who shaped Maratha-era Thanjavur. Inscription in Tamil and English. Gothic arch windows in a Tamil colonial setting.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '30 min',
    entryFee: 'Free',
    highlights: ['18th-century Danish colonial church', 'Serfoji II marble cenotaph', 'Gothic arch windows in Tamil colonial setting'],
    reachNote: '3 min walk from Art Gallery — exit Palace complex, turn right onto Church Lane.',
    travelToNext: '5 min · Walk (400m)',
    departBy: '4:15 PM',
  },
  {
    stop: 'Brihadeeswarar Temple (Evening Puja)',
    time: '5:00 PM',
    trafficNote: 'Heavy — temple at peak atmospheric intensity 5–7 PM',
    tip: 'Position inside East Gopuram corridor by 5:45 PM. The 6 PM lamp-lighting is a completely different experience from the morning visit — the most atmospheric hour in Thanjavur. Gopuram floodlit at dusk.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Heavy',
    crowdLevel: 'High',
    duration: '1.5 hrs',
    entryFee: 'Free',
    highlights: ['Evening puja — oil lamps lit in inner sanctum from 6 PM', 'Gopuram floodlit at dusk', 'Nadaswaram music echoes through courtyard'],
    reachNote: '5 min walk from Schwartz Church — same heritage neighbourhood.',
    travelToNext: '20 min · Auto (~₹120)',
    departBy: '6:30 PM',
  },
  {
    stop: 'Punnainallur Mariamman Kovil',
    time: '7:00 PM',
    trafficNote: 'Moderate — steady devotional crowd, manageable outside festival days',
    tip: 'Arrive before 7:30 PM for the evening aarti. The temple is most atmospheric at dusk when lamps are lit around the tank. Crowd is steady but not overwhelming outside Tamil festival days.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Moderate',
    duration: '1 hr',
    entryFee: 'Free',
    highlights: ['Evening aarti — 7 PM ritual lamp lighting', 'Temple tank with lamp reflections', 'Mariamman deity — powerful Shakti pilgrimage site'],
    reachNote: '7 km south of Big Temple — 20 min auto (~₹120). Highway approach is smooth.',
  },
];

// ── Afternoon preset (3 places, 2 PM – 6 PM) ─────────────────────────────────
// Route: Brihadeeswarar Temple → Palace → Saraswathi Mahal
// Starts at the Big Temple, then walks to the palace complex for the library.
export const MOCK_ITINERARY_AFTERNOON: ItineraryStop[] = [
  {
    stop: 'Brihadeeswarar Temple (Big Temple)',
    time: '2:00 PM',
    trafficNote: 'Heavy — afternoon is the busiest period on approach roads',
    tip: 'Visit the outer courtyard first — the inner sanctum reopens at 4 PM for the evening session. Arrive at 2 PM to explore the outer complex without the evening rush. Carry water; the stone courtyard is exposed to sun.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Moderate',
    crowdLevel: 'High',
    duration: '1 hr',
    entryFee: 'Free',
    highlights: ['Outer gopuram', 'Nandi statue', 'Courtyard walk'],
    travelToNext: '8 min · Auto (~₹60)',
    departBy: '3:00 PM',
  },
  {
    stop: 'Thanjavur Maratha Palace & Durbar Hall',
    time: '3:15 PM',
    trafficNote: 'Moderate — steady crowd of history enthusiasts in the afternoon',
    tip: 'Afternoon crowd at the Bell Tower is lighter than morning — good time to climb. Gallery closes at 5 PM; arrive by 3:15 PM to see both Palace and Library without rushing.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Moderate',
    crowdLevel: 'Moderate',
    duration: '1 hr',
    entryFee: '₹50',
    highlights: ['Bell Tower panorama', 'Durbar Hall ceiling art', 'Royal artefacts'],
    travelToNext: '2 min · Walk (within palace complex)',
    departBy: '4:15 PM',
  },
  {
    stop: 'Saraswathi Mahal Library',
    time: '4:30 PM',
    trafficNote: 'Light — quiet corridors, sparse afternoon crowd',
    tip: 'Closes at 5:30 PM — arrive by 4:30 PM at the latest. Ask the attendant to show the illustrated manuscript section: the 17th-century botanical drawings and illustrated Ramayana texts are the real highlight.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Low',
    duration: '45 min',
    entryFee: '₹20',
    highlights: ['49,000+ manuscripts', 'Illustrated Ramayana texts', 'Botanical drawings'],
    reachNote: 'Same Palace complex — 2-min walk through the interior corridor from the Durbar Hall.',
    travelToNext: '5 min · Walk (400m)',
    departBy: '5:15 PM',
  },
  {
    stop: 'Brihadeeswarar Temple (Evening Puja)',
    time: '5:30 PM',
    trafficNote: 'Heavy — evening crowd at peak intensity with pilgrims, devotees, and tourists',
    tip: 'Position inside East Gopuram corridor by 5:45 PM for the 6 PM lamp-lighting. The evening puja is the spiritual and visual centrepiece of any Thanjavur visit — the inner sanctum lit with oil lamps is unforgettable.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Heavy',
    crowdLevel: 'High',
    duration: '1.5 hrs',
    entryFee: 'Free',
    highlights: ['Evening puja — oil lamps from 6 PM', 'Gopuram floodlit at dusk', 'Nadaswaram fills the courtyard'],
    reachNote: '5 min walk from Saraswathi Mahal — return to the Big Temple for the evening session.',
  },
];

// ── Evening preset (2 places, 5 PM – 9 PM) ───────────────────────────────────
// Route: Brihadeeswarar Temple (evening puja) → Punnainallur Mariamman Kovil
// Travel: 20 min auto (~₹120) — ~7 km south of city, highway approach is smooth.
export const MOCK_ITINERARY_EVENING: ItineraryStop[] = [
  {
    stop: 'Brihadeeswarar Temple (Big Temple)',
    time: '5:00 PM',
    trafficNote: 'Heavy — evening puja draws the largest devotee crowd of the day',
    tip: 'Arrive at 5 PM and position yourself near the East Gopuram inner corridor by 6 PM. The evening lamp-lighting ceremony is the spiritual centrepiece of any Thanjavur visit. Nadaswaram fills the courtyard. Outer gopuram glows amber at dusk — best photography from the east gate. Leave by 6:30 PM.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Heavy',
    crowdLevel: 'High',
    duration: '1.5 hrs',
    entryFee: 'Free',
    highlights: ['Evening puja & lamp-lighting', 'Gopuram at dusk', 'Nadaswaram music'],
    travelToNext: '20 min · Auto (~₹120)',
    departBy: '6:30 PM',
  },
  {
    stop: 'Punnainallur Mariamman Kovil',
    time: '7:00 PM',
    trafficNote: 'Moderate — steady devotional crowd, manageable outside festival days',
    tip: 'Arrive before 7:30 PM for the evening aarti. The temple is most atmospheric at dusk when lamps are lit around the tank. Crowd is steady but not overwhelming outside Tamil festival days. Remove footwear at the outer gate.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Light',
    crowdLevel: 'Moderate',
    duration: '1 hr',
    entryFee: 'Free',
    highlights: ['Evening aarti at 7 PM', 'Temple tank at dusk', 'Mariamman deity'],
    reachNote: '~7 km south of Big Temple — 20 min auto (~₹120). Highway approach is smooth; final 500m near temple gate may be slow on auspicious days.',
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
  address: 'Darasuram, Kumbakonam area — approximately 38 km from Thanjavur city centre',
  rating: 4.6,
  openNow: true,
  openingHours: '6:00 AM – 12:30 PM & 4:00 PM – 8:30 PM',
  status: 'Open',
  insight: 'The most intricately carved of the three Great Living Chola Temples (UNESCO). Where Brihadeeswarar impresses with scale, Airavatesvara rewards close attention — the miniature carvings are breathtaking, with entire Mahabharata scenes rendered in panels the size of your hand. The stone steps of the mandapam produce different musical notes when struck — the only musical staircase among Chola monuments. Crowd is consistently low, even on weekends.',
  flow: '1. Travel from Thanjavur to Darasuram (in the Kumbakonam area, ~38 km). State buses run from Thanjavur to Kumbakonam; Darasuram is near Kumbakonam — confirm local transport options at Thanjavur bus stand on the day of your visit.\n2. Enter from the main gopuram on the east side. Free entry.\n3. Walk the outer circumambulation path (clockwise) and examine the detailed carvings at eye level — bring the carvings into focus before entering the inner complex.\n4. At the main mandapam steps, ask the caretaker or guard to demonstrate the musical staircase — each step produces a different tone when tapped.\n5. Enter the inner sanctum for the Shiva shrine. Dress code: covered clothing.\n6. Photograph the chariot wheel base on the south side — the most distinctive architectural element at Airavatesvara.',
  preparation: 'How to get there: Darasuram is located near Kumbakonam, roughly 38 km from Thanjavur city. State buses run between Thanjavur and Kumbakonam; from Kumbakonam, Darasuram is a short auto ride away. Confirm current timings and fares locally before your visit. Entry fee: Free. Must-do: Ask the caretaker to demonstrate the musical steps — do not leave without experiencing this. Examine the outer wall carvings at the base level — get close for the Mahabharata scenes. What NOT to do: Do not wear shorts or sleeveless clothing. Do not rush past the outer walls — the carvings are the main event, not just the sanctum. Do not visit midday in summer — the heat is intense on the unshaded stone.',
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

export const MOCK_EXPLORE_GANGAIKONDA: ExploreResult = {
  id: 'e6',
  name: 'Gangaikonda Cholapuram',
  address: 'Gangaikonda Cholapuram village, Ariyalur district — approximately 70 km from Thanjavur',
  rating: 4.5,
  openNow: true,
  openingHours: '6:00 AM – 6:00 PM',
  status: 'Open',
  insight: 'The "city of the Chola who conquered the Ganges" — built by Rajendra Chola I in the 11th century as his capital after his legendary northern military campaign. The Brihadisvara temple here rivals the Big Temple in scale and artistic ambition, yet attracts a fraction of the visitors. The lion sculptures flanking the main entrance, the large Nandi, and the intricately carved outer wall panels are among the finest surviving Chola artworks. A deeply peaceful site with almost no commercial activity around it — you experience the temple much as it would have felt in its original context.',
  flow: '1. Travel from Thanjavur to Gangaikonda Cholapuram (approximately 70 km, roughly 1.5 hours). State buses run toward Ariyalur / Jayankondam from Thanjavur — confirm the route and stop at Thanjavur bus stand on the day of your visit.\n2. Enter the temple compound from the main eastern entrance.\n3. Examine the large Nandi mandapam in the outer courtyard.\n4. Walk along the outer wall of the vimana and study the carved panels — the female figures and lion motifs are the artistic highlights.\n5. Enter the inner sanctum. Dress code: covered clothing.\n6. Look for the Shiva Ganga (sacred tank) on the northern side of the complex.',
  preparation: 'Entry fee: Free (ASI protected monument). Best approached as a dedicated half-day or full-day trip from Thanjavur. Confirm bus timings and connections locally before travelling. Facilities at the site are minimal — carry water and snacks. The site is less commercialised than the Big Temple, which is part of its appeal. Covered clothing required for the inner sanctum.',
  tags: ['UNESCO World Heritage', 'Chola Architecture', 'Rajendra Chola', 'Off the Beaten Path', 'Low Crowd'],
  reviews: [
    { text: 'Even more peaceful than Darasuram — almost no tourists. The scale of the vimana and the quality of the carvings are extraordinary. A complete Chola experience away from the crowds.', author: 'Rajan M.', location: 'Chennai', stars: 5, ago: '2 weeks ago' },
    { text: 'The lion sculptures at the entrance are stunning. The entire site has a quiet, sacred atmosphere that is hard to find at better-known monuments. Worth every kilometre of the journey.', author: 'Anitha S.', location: 'Bangalore', stars: 5, ago: '1 month ago' },
    { text: 'If you love Chola architecture, this completes the trilogy with Brihadeeswarar and Airavatesvara. Less famous, but arguably the most atmospheric of the three.', author: 'Deepak R.', location: 'Hyderabad', stars: 5, ago: '3 weeks ago' },
  ],
  photoColor: 'bg-stone-600',
};

export const MOCK_EXPLORE_RAJARAJAN: ExploreResult = {
  id: 'e7',
  name: 'Rajarajan Manimandapam',
  address: 'Rajarajan Manimandapam Road, Thanjavur — approximately 2.8 km from Brihadeeswarar Temple by road',
  rating: 4.3,
  openNow: true,
  openingHours: 'Open daily during temple hours',
  status: 'Open',
  insight: 'A memorial pavilion and statue dedicated to Rajaraja I, the Chola emperor who commissioned Brihadeeswarar Temple. Located approximately 2.8 km from the Big Temple by road — plan a separate auto ride rather than combining it as a quick walk. The mandapam houses an imposing statue of Rajaraja I and provides historical context for one of medieval India\'s greatest rulers. A quiet, reflective space rarely crowded.',
  flow: '1. Travel from the Big Temple area by auto (~12 min, ~₹80) — the road route goes around the outer temple complex.\n2. The statue of Rajaraja I is the centrepiece — take a moment to understand the scale of his architectural legacy.\n3. The surrounding gardens offer a calm spot to rest.\n4. Return by auto to the city centre or continue to your next destination.',
  preparation: 'Entry: Free. Best combined with an auto circuit rather than as a walk from the temple — the road distance is approximately 2.8 km. Allow 15–20 minutes including travel each way. There are no ticketing queues or entry restrictions.',
  tags: ['Historical Memorial', 'Rajaraja Chola', 'Adjacent to Big Temple', 'Free Entry', 'Quick Visit'],
  reviews: [
    { text: 'A touching tribute to the man who built one of the world\'s greatest temples. Easy to combine with the main Brihadeeswarar visit and adds important historical context.', author: 'Priya K.', location: 'Mumbai', stars: 4, ago: '1 week ago' },
    { text: 'Quietly impressive. Standing here looking at the statue of Rajaraja I with his temple rising behind you is a powerful moment. Most tourists walk past — stop and spend five minutes.', author: 'Suresh V.', location: 'Trichy', stars: 4, ago: '2 weeks ago' },
  ],
  photoColor: 'bg-amber-900',
};

export const EXPLORE_PRESETS: Record<string, ExploreResult> = {
  'Brihadeeswarar Temple':                  MOCK_EXPLORE,
  'Thanjavur Maratha Palace Royal Museum':  MOCK_EXPLORE_PALACE,
  'Saraswathi Mahal Library':               MOCK_EXPLORE_SARASWATHI,
  'Airavatesvara Temple Darasuram':         MOCK_EXPLORE_AIRAVATESVARA,
  'Sivaganga Fort':                         MOCK_EXPLORE_SIVAGANGA,
  'Gangaikonda Cholapuram':                 MOCK_EXPLORE_GANGAIKONDA,
  'Rajarajan Manimandapam':                 MOCK_EXPLORE_RAJARAJAN,
};
