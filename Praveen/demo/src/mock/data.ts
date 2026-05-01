export interface AiDetail {
  whyOverOthers: string;
  dataPoints: string[];
  bestFor: string;
  caveat?: string;
}

export interface ReviewItem {
  text: string;
  author: string;
  location: string;
  stars: number;
  ago: string;
}

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  dist: number;
  rating: number;
  reviewCount: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free';
  openNow: boolean;
  tags: string[];
  aiNote: string;
  trendVerdict?: 'improving' | 'declining' | 'stable';
  trendReason?: string;
  photoRef?: string | null;
  reviews: ReviewItem[];
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
  tags: string[];
  reviews: ReviewItem[];
  photoColor: string;
}

export const MOCK_HOTELS: PlaceResult[] = [
  {
    id: 'h1', name: 'The Leela Palace', address: '23 Airport Road, Bangalore', dist: 1.2,
    rating: 4.8, reviewCount: 3240, priceLevel: '₹₹₹₹', openNow: true,
    tags: ['Luxury', 'Heritage', 'Pool', 'Spa', 'Fine Dining'],
    aiNote: 'Perfect for your heritage + luxury tags — reviewers specifically praise the pool garden and the staff\'s temple tour assistance.',
    reviews: [
      { text: 'Stunning architecture and world-class service.', author: 'Priya S.', location: 'Mumbai', stars: 5, ago: '2 weeks ago' },
      { text: 'The spa is absolutely divine, worth every rupee.', author: 'Ananya R.', location: 'Chennai', stars: 5, ago: '1 month ago' },
      { text: "Best breakfast buffet I've had in India.", author: 'Rahul K.', location: 'New Delhi', stars: 5, ago: '3 weeks ago' },
    ],
    photoColor: 'bg-amber-600',
    aiDetail: {
      whyOverOthers: 'Ranked #1 over ITC Gardenia because reviewers in the last 90 days specifically cite the heritage wing renovation as complete and the new pool garden as "the best in Bangalore." ITC\'s pool reviews, while good, have fewer recent mentions.',
      dataPoints: [
        '4.8 average across 3,240 reviews — highest review volume in this set',
        '94% of recent reviews mention "exceptional staff" or "service"',
        'Pool & Spa together mentioned in 68% of 5-star reviews',
        'Price premium of ₹4,000–₹6,000/night over Taj West End — justified by amenities depth',
      ],
      bestFor: 'Couples celebrating milestones, first-time luxury travellers, anyone who wants the heritage story alongside five-star comfort.',
      caveat: 'Airport Road location adds 15–20 min to central Bangalore travel during peak hours. Not ideal if your plans are city-centre heavy.',
    },
  },
  {
    id: 'h2', name: 'Taj West End', address: 'Race Course Road, Bangalore', dist: 2.8,
    rating: 4.7, reviewCount: 2100, priceLevel: '₹₹₹', openNow: true,
    tags: ['Heritage', 'Garden', 'Business', 'Family Friendly'],
    aiNote: 'Strong match for a family stay — its 20-acre garden is a favourite with kids and the heritage rooms are remarkably quiet.',
    reviews: [
      { text: 'The garden is magical in the evening.', author: 'Meena T.', location: 'Pune', stars: 5, ago: '1 week ago' },
      { text: 'Rooms are spacious and beautifully maintained.', author: 'Suresh B.', location: 'Hyderabad', stars: 4, ago: '3 weeks ago' },
      { text: 'Excellent for a family holiday.', author: 'Kavitha N.', location: 'Kochi', stars: 5, ago: '2 months ago' },
    ],
    photoColor: 'bg-green-600',
    aiDetail: {
      whyOverOthers: 'Beats Citrus and Bloom on family metrics — 20-acre garden gives children genuine outdoor space, and the heritage wing has the thickest walls, making it the quietest hotel in this list per reviewer noise complaints (only 2 in last 6 months vs 18 at Bloom).',
      dataPoints: [
        '4.7 average across 2,100 reviews — second highest in set',
        'Family-tagged reviews: 41% of total — highest family share',
        '20-acre garden — only property in this list with significant green space',
        'Noise complaints in last 6 months: 2 (lowest in set)',
      ],
      bestFor: 'Families with young children, travellers who want heritage ambience without airport-road distance, business stays requiring a quiet environment.',
      caveat: 'Business centre is older than ITC Gardenia\'s — if you need cutting-edge AV facilities, ITC edges ahead.',
    },
  },
  {
    id: 'h3', name: 'Citrus Hotel Hebbal', address: 'Hebbal Flyover, Bangalore', dist: 5.1,
    rating: 4.2, reviewCount: 890, priceLevel: '₹₹', openNow: true,
    tags: ['Budget', 'Business', 'WiFi', 'Parking'],
    aiNote: 'Best budget pick — reviewers highlight the fast WiFi and the generous complimentary breakfast as standout values at this price point.',
    reviews: [
      { text: 'Great value for money, no complaints.', author: 'Vikram G.', location: 'Ahmedabad', stars: 4, ago: '5 days ago' },
      { text: 'WiFi was surprisingly fast.', author: 'Arjun M.', location: 'Jaipur', stars: 4, ago: '2 weeks ago' },
      { text: 'Clean rooms and friendly staff.', author: 'Divya P.', location: 'Bengaluru', stars: 4, ago: '1 month ago' },
    ],
    photoColor: 'bg-blue-600',
    aiDetail: {
      whyOverOthers: 'Ranked above Bloom Hotel on budget metrics specifically — at ₹₹ price, Citrus delivers a full breakfast (Bloom charges ₹350 extra), free parking (Bloom ₹200/day), and 150 Mbps WiFi vs Bloom\'s 50 Mbps. Value-per-rupee score: Citrus 8.4, Bloom 6.9.',
      dataPoints: [
        'Complimentary breakfast included — saves ₹400–600/person/day',
        'WiFi speed: 150 Mbps avg (independently verified by 12 business reviewers)',
        'Free parking for all guests — saves ₹200/day vs alternatives',
        'Value-for-money rating: 4.6 — highest in the ₹₹ tier',
      ],
      bestFor: 'Solo business travellers, budget-conscious families on Bangalore stopovers, anyone who needs reliable fast internet above all else.',
      caveat: 'Hebbal location is 25 min from MG Road. If you plan heavy sightseeing in central Bangalore, factor in the cab fare — it may erode the savings.',
    },
  },
  {
    id: 'h4', name: 'ITC Gardenia', address: 'Residency Road, Bangalore', dist: 3.4,
    rating: 4.6, reviewCount: 1870, priceLevel: '₹₹₹₹', openNow: true,
    tags: ['Luxury', 'Eco', 'Pool', 'Fine Dining', 'Business'],
    aiNote: 'India\'s first LEED Platinum hotel — ideal if sustainability matters to you, without compromising on luxury.',
    reviews: [
      { text: 'Eco-luxury done right.', author: 'Rohan S.', location: 'Kolkata', stars: 5, ago: '4 days ago' },
      { text: 'The pool is spectacular.', author: 'Nisha V.', location: 'Nagpur', stars: 5, ago: '3 weeks ago' },
      { text: 'Food at Cubbon Pavilion is outstanding.', author: 'Aditya L.', location: 'New Delhi', stars: 5, ago: '1 month ago' },
    ],
    photoColor: 'bg-emerald-600',
    aiDetail: {
      whyOverOthers: 'Unique in this list as the only LEED Platinum certified property in Bangalore — if sustainability is a factor, it\'s unmatched. Also has the best-rated restaurant (Cubbon Pavilion, 4.9 on Zomato) of any hotel in this set.',
      dataPoints: [
        'LEED Platinum certified — India\'s first hotel to achieve this rating',
        'Cubbon Pavilion restaurant rated 4.9/5 on Zomato (700+ reviews)',
        '34% energy saving vs comparable luxury hotels per ITC annual report',
        'Business centre: 8 meeting rooms, 24hr tech support — top corporate choice',
      ],
      bestFor: 'Corporate travellers with sustainability mandates, food lovers who want Bangalore\'s best hotel dining, eco-conscious luxury seekers.',
      caveat: 'At Residency Road prices (₹₹₹₹), the rooms are slightly smaller than The Leela. You\'re paying partly for the brand and restaurant, not pure room size.',
    },
  },
  {
    id: 'h5', name: 'Bloom Hotel Indiranagar', address: '100 Feet Road, Bangalore', dist: 4.7,
    rating: 4.1, reviewCount: 540, priceLevel: '₹₹', openNow: true,
    tags: ['Boutique', 'Trendy', 'Central', 'WiFi'],
    aiNote: 'Hip micro-hotel in the trendiest neighbourhood — reviewers love the rooftop bar and the walkable café strip.',
    reviews: [
      { text: 'Perfect location in Indiranagar.', author: 'Sneha R.', location: 'Mumbai', stars: 4, ago: '1 week ago' },
      { text: 'Rooms are small but very stylish.', author: 'Kiran B.', location: 'Pune', stars: 4, ago: '2 weeks ago' },
      { text: 'Rooftop has great views.', author: 'Pooja M.', location: 'Chennai', stars: 4, ago: '3 weeks ago' },
    ],
    photoColor: 'bg-purple-600',
    aiDetail: {
      whyOverOthers: 'Wins purely on location — Indiranagar\'s 100 Feet Road puts you within walking distance of Bangalore\'s best café strip, bars, and restaurants. No other ₹₹ hotel in this set offers this neighbourhood access. Trade-off is room size.',
      dataPoints: [
        '100 Feet Road — walkable to 40+ cafés, bars, restaurants',
        'Rooftop bar mentioned in 71% of positive reviews',
        'Average room size: 18 sqm — smallest in the set (trade-off for location)',
        'Neighbourhood vibe score: highest in set for 25–35 age group reviewers',
      ],
      bestFor: 'Young travellers, solo explorers, food and nightlife-focused trips, anyone who wants to be in the thick of Bangalore\'s coolest neighbourhood.',
      caveat: 'Rooms are small — if you\'re travelling with luggage or staying 5+ nights, the space may feel cramped. The rooftop bar noise can carry to rooms on floors 4 and 5.',
    },
  },
];

export const MOCK_FOOD: PlaceResult[] = [
  {
    id: 'f1', name: 'MTR 1924', address: 'Lalbagh Road, Bangalore', dist: 0.8,
    rating: 4.7, reviewCount: 6500, priceLevel: '₹', openNow: true,
    tags: ['Pure Veg', 'Heritage', 'Breakfast', 'Iconic'],
    aiNote: 'A Bangalore institution since 1924 — the rava idli here was literally invented in this kitchen; no trip is complete without it.',
    reviews: [
      { text: 'The rava idli is life-changing.', author: 'Lakshmi D.', location: 'Chennai', stars: 5, ago: '3 days ago' },
      { text: 'Queue early — gets packed by 8am.', author: 'Gopal V.', location: 'Mysuru', stars: 4, ago: '1 week ago' },
      { text: 'Authentic old-Bangalore flavours.', author: 'Suma K.', location: 'Bengaluru', stars: 5, ago: '2 weeks ago' },
    ],
    photoColor: 'bg-yellow-600',
    aiDetail: {
      whyOverOthers: 'Ranked first not just for food quality but for cultural significance — this is where the rava idli was invented in 1943. No other restaurant in Bangalore carries that historical weight. Review sentiment on "authenticity" scores 9.2/10 — highest in this food set.',
      dataPoints: [
        '6,500 reviews — highest in this food set by a large margin',
        'Heritage since 1924 — over 100 years of continuous operation',
        'Authenticity sentiment score: 9.2/10 (AI analysis of 500 recent reviews)',
        'Price: ₹80–150 for a full breakfast — unbeatable value',
      ],
      bestFor: 'First-time Bangalore visitors wanting an authentic experience, heritage food enthusiasts, early-morning itinerary starts.',
      caveat: 'Gets very crowded by 8 AM on weekdays and all morning on weekends. If you dislike queuing, arrive by 7:30 AM or come for the 11 AM – 1 PM slot.',
    },
  },
  {
    id: 'f2', name: 'Karavalli', address: 'Taj Gateway Hotel, Residency Road', dist: 3.1,
    rating: 4.8, reviewCount: 2400, priceLevel: '₹₹₹', openNow: true,
    tags: ['Coastal', 'Seafood', 'Non-Veg', 'Fine Dining'],
    aiNote: 'Best coastal Indian cuisine in the city — the kori rotti and prawn gassi are cited in nearly every top review.',
    reviews: [
      { text: "Best seafood restaurant I've been to in India.", author: 'Vivek N.', location: 'Mumbai', stars: 5, ago: '5 days ago' },
      { text: 'The ambience under the trees is magical.', author: 'Rekha S.', location: 'Mangaluru', stars: 5, ago: '2 weeks ago' },
      { text: 'Portions are generous, flavours are perfect.', author: 'Ajay R.', location: 'Hyderabad', stars: 5, ago: '1 month ago' },
    ],
    photoColor: 'bg-cyan-700',
    aiDetail: {
      whyOverOthers: 'Highest-rated restaurant in this entire set at 4.8 — and specifically for coastal cuisine it has no peer in Bangalore. The open-air courtyard setting under century-old trees is mentioned in 83% of reviews as a defining experience.',
      dataPoints: [
        '4.8 average — highest rating in this food set',
        'Open-air courtyard mentioned in 83% of positive reviews',
        'Kori rotti and prawn gassi: #1 and #2 most mentioned dishes',
        'Average spend: ₹1,800–2,400 per person — justified by consistency',
      ],
      bestFor: 'Seafood lovers, special occasion dinners, travellers wanting to experience the best of Karnataka\'s coastal cuisine in one sitting.',
      caveat: 'Vegetarian options are limited — if your group is predominantly vegetarian, the ₹₹₹ price point may not justify the experience for them.',
    },
  },
  {
    id: 'f3', name: 'Vidyarthi Bhavan', address: 'Gandhi Bazaar, Basavanagudi', dist: 6.2,
    rating: 4.6, reviewCount: 9100, priceLevel: '₹', openNow: false,
    tags: ['Pure Veg', 'Breakfast', 'Quick', 'Iconic'],
    aiNote: 'Opened in 1943 — the crispy masala dosa here has a cult following; plan a weekend morning visit.',
    reviews: [
      { text: 'The dosa here is simply unmatched.', author: 'Harini G.', location: 'Bengaluru', stars: 5, ago: '1 week ago' },
      { text: 'Be ready for a 30-minute queue on weekends.', author: 'Mohan P.', location: 'Coimbatore', stars: 4, ago: '3 weeks ago' },
      { text: 'Worth every minute of the wait.', author: 'Usha B.', location: 'Mysuru', stars: 5, ago: '2 months ago' },
    ],
    photoColor: 'bg-orange-600',
    aiDetail: {
      whyOverOthers: 'Highest total review count in this set (9,100) — more people have reviewed this dosa counter than any restaurant on this list. That volume of consistent praise over decades is the signal. The masala dosa here is ranked in multiple national "India\'s best dosa" lists.',
      dataPoints: [
        '9,100 reviews — highest review volume in this food set',
        'Operating since 1943 — 80+ years of continuous service',
        'Masala dosa featured in 6 national "best of India" food guides',
        'Average wait time: 20 min weekdays, 40 min weekends — plan ahead',
      ],
      bestFor: 'Dosa purists, food bloggers, travellers with a weekend morning free, anyone who wants to eat at a living piece of Bangalore history.',
      caveat: 'Currently showing as closed — confirm opening hours before visiting (they close for 3-hour afternoon breaks). Open Tue–Sun only.',
    },
  },
  {
    id: 'f4', name: 'Truffles', address: 'Koramangala 5th Block', dist: 5.4,
    rating: 4.3, reviewCount: 4200, priceLevel: '₹₹', openNow: true,
    tags: ['Burgers', 'Non-Veg', 'Quick', 'Youth'],
    aiNote: 'The go-to for Bangalore\'s burger culture — reviewers rave about the saucy pulled-pork burger and the thick milkshakes.',
    reviews: [
      { text: 'Best burgers in Bangalore, hands down.', author: 'Nikhil T.', location: 'New Delhi', stars: 5, ago: '4 days ago' },
      { text: 'Always a crowd but worth it.', author: 'Anjali M.', location: 'Mumbai', stars: 4, ago: '1 week ago' },
      { text: 'The loaded fries are dangerous.', author: 'Ravi K.', location: 'Bengaluru', stars: 5, ago: '3 weeks ago' },
    ],
    photoColor: 'bg-red-600',
    aiDetail: {
      whyOverOthers: 'In the non-veg casual dining category, Truffles wins on crowd data — 4,200 reviews with sustained 4.3+ over 5+ years is rare for a mid-range burger joint. The pulled-pork burger has its own social media following with thousands of tagged posts.',
      dataPoints: [
        '4,200 reviews at 4.3 avg — exceptional consistency for a casual spot',
        'Pulled-pork burger: most Instagram-tagged dish in Koramangala (food category)',
        'Average wait: 15–25 min without reservation',
        'Milkshakes mentioned positively in 62% of reviews — a secondary draw',
      ],
      bestFor: 'Groups of friends, young travellers, anyone wanting a casual but high-quality non-veg meal without formal dining prices.',
      caveat: 'Not suitable for vegetarians or those avoiding pork — the menu is heavily non-veg focused. The loud atmosphere makes it poor for business conversations.',
    },
  },
  {
    id: 'f5', name: 'Ebony Rooftop', address: 'MG Road, Bangalore', dist: 2.3,
    rating: 4.5, reviewCount: 1800, priceLevel: '₹₹₹', openNow: true,
    tags: ['Rooftop', 'Multi-cuisine', 'Veg + Non-Veg', 'Leisure'],
    aiNote: 'Perfect for a slow leisurely lunch — the MG Road skyline view and the live jazz evenings create an unmatchable atmosphere.',
    reviews: [
      { text: 'Best sunset view in the city.', author: 'Deepika C.', location: 'Pune', stars: 5, ago: '2 days ago' },
      { text: 'Food and ambience are both exceptional.', author: 'Siddharth A.', location: 'Bengaluru', stars: 5, ago: '1 week ago' },
      { text: 'Great for a date night.', author: 'Kavya R.', location: 'Mumbai', stars: 5, ago: '2 weeks ago' },
    ],
    photoColor: 'bg-indigo-600',
    aiDetail: {
      whyOverOthers: 'The only restaurant in this set where the experience itself — not just the food — is the product. The MG Road rooftop view at sunset is cited as "the best in Bangalore" in 89% of 5-star reviews. Live jazz evenings add an element no other restaurant here offers.',
      dataPoints: [
        'Sunset view: mentioned in 89% of 5-star reviews as defining feature',
        'Live jazz: Wednesday–Sunday evenings (7–10 PM)',
        'Multi-cuisine menu — accommodates all dietary preferences',
        'Advance booking recommended: fully booked 3–4 days ahead on weekends',
      ],
      bestFor: 'Couples on date nights, groups wanting a memorable evening experience, travellers who want the city view with a quality meal.',
      caveat: 'Food quality, while good, is secondary to the experience. If you\'re purely food-focused, Karavalli at a similar price point delivers better cuisine. Book 3–4 days ahead for weekend evenings.',
    },
  },
];

export const MOCK_ITINERARY: ItineraryStop[] = [
  {
    stop: 'Cubbon Park',
    time: '7:00 AM',
    trafficNote: 'Light',
    tip: 'Enter from the Raj Bhavan gate for the widest tree-lined path; visit on weekdays to avoid jogger crowds.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    travelToNext: '12 min · Walk',
    departBy: '8:15 AM',
  },
  {
    stop: 'Vidhana Soudha',
    time: '8:30 AM',
    trafficNote: 'Moderate',
    tip: 'Photography is only allowed from the gates; best angle is from the road opposite the High Court.',
    currentTraffic: 'Moderate',
    yesterdayTraffic: 'Light',
    travelToNext: '8 min · Walk',
    departBy: '9:15 AM',
  },
  {
    stop: 'MTR 1924 (Breakfast)',
    time: '9:30 AM',
    trafficNote: 'Light',
    tip: 'Order the rava idli set — it\'s the dish that made this place famous. Arrive by 9:15 to avoid the queue.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    travelToNext: '25 min · Auto',
    departBy: '10:45 AM',
  },
  {
    stop: 'Lalbagh Botanical Garden',
    time: '11:00 AM',
    trafficNote: 'Light',
    tip: 'Head to the Glass House first thing — the 200-year-old trees near the rock are stunning in morning light.',
    currentTraffic: 'Light',
    yesterdayTraffic: 'Light',
    travelToNext: '30 min · Auto',
    departBy: '1:00 PM',
  },
  {
    stop: 'Commercial Street (Shopping)',
    time: '1:30 PM',
    trafficNote: 'Heavy',
    tip: 'Start from the Shivaji Nagar end and work south; the best silk and silver stores are on the western lanes.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Moderate',
    travelToNext: '20 min · Cab',
    departBy: '4:30 PM',
  },
  {
    stop: 'UB City Mall + Sunset',
    time: '5:00 PM',
    trafficNote: 'Heavy',
    tip: 'Go to the Ebony rooftop on Level 13 for the best MG Road sunset view in the city; book a table in advance.',
    currentTraffic: 'Heavy',
    yesterdayTraffic: 'Heavy',
  },
];

export const MOCK_EXPLORE: ExploreResult = {
  id: 'e1',
  name: 'Vidhana Soudha',
  address: 'Dr. Ambedkar Veedhi, Bangalore',
  rating: 4.6,
  openNow: true,
  openingHours: '10:00 AM – 5:00 PM',
  status: 'Open',
  insight: 'Visit between 10–11 AM on weekdays for the quietest experience; weekend afternoons attract large tourist groups and photography becomes crowded.',
  flow: '1. Enter from the main south gate (North Gate is government-only). 2. Security check — no bags larger than a sling bag. 3. Walk the outer courtyard freely. 4. Legislative Assembly visits require prior written permission from the Speaker\'s office. 5. Best photo spot is from the road opposite, facing north.',
  preparation: 'Carry a government-issued photo ID (mandatory for entry). Avoid large bags — lockers are not available. Wear covered footwear. No photography inside the assembly halls. Cash only for the small canteen inside.',
  tags: ['Landmark', 'Architecture', 'Photography', 'History'],
  reviews: [
    { text: 'The architecture at night with the lights is absolutely breathtaking.', author: 'Supriya V.', location: 'Hyderabad', stars: 5, ago: '1 week ago' },
    { text: "Entry is free but you need a valid ID — don't forget it.", author: 'Naveen K.', location: 'New Delhi', stars: 4, ago: '2 weeks ago' },
    { text: 'The neo-Dravidian pillars up close are stunning.', author: 'Preethi S.', location: 'Chennai', stars: 5, ago: '1 month ago' },
  ],
  photoColor: 'bg-stone-600',
};
