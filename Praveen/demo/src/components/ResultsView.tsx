import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Star, MapPin, Clock, Navigation, Share2, Compass,
  ChevronRight, ChevronDown, Sparkles, Info, RefreshCw, Bookmark, BookmarkCheck,
  Utensils, CheckCircle, AlertTriangle, RotateCcw, Hotel, Route,
  ImageIcon, ExternalLink, Map, X, Lightbulb,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Tab } from './ui/Tabs';
import { PlaceResult, ExploreResult, TrafficLevel, ReviewItem } from '../mock/data';
import type { LiveItineraryStop } from '../api/client';

// Accept both mock ItineraryStop and live LiveItineraryStop (structurally compatible)
type ItineraryStop = {
  stop: string; time: string; trafficNote: string; tip: string;
  currentTraffic: TrafficLevel; yesterdayTraffic: TrafficLevel;
  travelToNext?: string; departBy?: string; imgId?: string;
  duration?: string; crowdLevel?: 'Low' | 'Moderate' | 'High';
  reachNote?: string; entryFee?: string; highlights?: string[];
  cautionNote?: string; avoidNote?: string;
  reviews?: Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
} | LiveItineraryStop;
import { fetchPhoto } from '../api/client';
import { useToast } from './ui/Toast';
import { PlaceCardSkeleton } from './ui/Skeleton';

interface ResultsViewProps {
  tab: Tab;
  destination: string;
  searchArea?: string;
  hotels?: PlaceResult[];
  food?: PlaceResult[];
  itinerary?: (ItineraryStop | LiveItineraryStop)[];
  explore?: ExploreResult;
  apiError?: boolean;
  isLoadingMore?: boolean;
  onBack: () => void;
  onRegenerate: () => void;
  onSave: () => void;
  saved?: boolean;
  onSwitchTab?: (tab: Tab) => void;
  backLabel?: string;
  onExploreStop?: (target: string) => void;
  isFirstItinerary?: boolean;
  selectedTags?: string[];
  onCancelTag?: (tag: string) => void;
  pureVegFilter?: boolean;
  visitTime?: string;
}

/* ── Best restaurants near Thanjavur hotels ──────────────────────────── */
const NEARBY_RESTAURANTS = [
  { name: 'Sri Venkatramana Bhavan', dist: '0.4km', stars: 4.6, price: '₹',   cuisine: 'South Indian', dietVeg: true,  aiNote: 'Classic Thanjavur thali — banana-leaf meals, quick service, best before noon.' },
  { name: 'Hotel Sathars',           dist: '0.9km', stars: 4.4, price: '₹',   cuisine: 'Biryani',      dietVeg: false, aiNote: 'Famous Ambur-style biryani — rice portions are generous, busy at lunch hours.' },
  { name: 'Chola Mess',              dist: '1.3km', stars: 4.5, price: '₹',   cuisine: 'Chola Cuisine',dietVeg: true,  aiNote: 'Authentic Chola-era recipes — try the paal paniyaram and koozh for a heritage food experience.' },
  { name: 'Bombay Bakes',            dist: '1.8km', stars: 4.2, price: '₹₹',  cuisine: 'Bakery & Café',dietVeg: true,  aiNote: 'Best filter coffee in central Thanjavur — ideal breakfast stop before Big Temple visit.' },
  { name: 'Hotel Ramnath',           dist: '2.4km', stars: 4.3, price: '₹',   cuisine: 'South Indian', dietVeg: false, aiNote: 'Reliable local favourite — chicken curry and parotta combo is a crowd staple.' },
  { name: 'Kannapa Restaurant',      dist: '1.1km', stars: 4.5, price: '₹₹',  cuisine: 'Chettinad',    dietVeg: false, aiNote: 'Best Chettinad in Thanjavur — freshly ground kalpasi and marathi mokku. Mutton kuzhambu is unmissable.' },
];

/* ── Traffic styling ─────────────────────────────────────────────────── */
const TRAFFIC_LINE_BG: Record<TrafficLevel, string> = {
  Light:    'var(--color-success-medium)',
  Moderate: 'var(--color-warning-strong)',
  Heavy:    'var(--color-danger)',
};

const TRAFFIC_BADGE: Record<TrafficLevel, { bg: string; text: string; dot: string; border: string }> = {
  Light:    { bg: 'bg-success-soft',  text: 'text-success-strong',  dot: 'bg-success-medium',  border: 'border-success-medium/30' },
  Moderate: { bg: 'bg-warning-soft',  text: 'text-warning-strong',  dot: 'bg-warning',         border: 'border-warning-medium/40' },
  Heavy:    { bg: 'bg-danger-soft',   text: 'text-danger-strong',   dot: 'bg-danger-medium',   border: 'border-danger-medium/30'  },
};

/* ── GBP photo for itinerary stops ──────────────────────────────────── */
function ItineraryPhoto({ stopName, photoRef }: {
  stopName: string;
  photoRef?: string | null;
}) {
  const [uri, setUri] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current || uri) return;
    fetched.current = true;
    if (photoRef) {
      fetchPhoto(photoRef).then(u => { if (u) setUri(u); });
    } else {
      fetch(`/api/photo?placeName=${encodeURIComponent(stopName)}&city=Thanjavur`)
        .then(r => r.json())
        .then((d: { photoUri?: string }) => { if (d.photoUri) setUri(d.photoUri); })
        .catch(() => {});
    }
  }, [photoRef, stopName]);

  if (uri) {
    return <img src={uri} alt={stopName} className="absolute inset-0 w-full h-full object-cover" />;
  }
  return <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,var(--color-brand),var(--color-brand-active))' }} />;
}

const CROWD_BADGE: Record<'Low' | 'Moderate' | 'High', { bg: string; text: string; dot: string; border: string }> = {
  Low:      { bg: 'bg-success-soft',  text: 'text-success-strong',  dot: 'bg-success-medium',  border: 'border-success-medium/30' },
  Moderate: { bg: 'bg-warning-soft',  text: 'text-warning-strong',  dot: 'bg-warning',         border: 'border-warning-medium/40' },
  High:     { bg: 'bg-danger-soft',   text: 'text-danger-strong',   dot: 'bg-danger-medium',   border: 'border-danger-medium/30'  },
};

function PlacePhoto({ color, name, photoRef, autoLoad }: { color: string; name: string; photoRef?: string | null; autoLoad?: boolean }) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const triggered = useRef(false);

  const loadPhoto = async () => {
    if (!photoRef || loading || photoUri) return;
    setLoading(true);
    const uri = await fetchPhoto(photoRef);
    setPhotoUri(uri);
    setLoading(false);
  };

  useEffect(() => {
    if (autoLoad && photoRef && !triggered.current) {
      triggered.current = true;
      loadPhoto();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad, photoRef]);

  if (photoUri) {
    return (
      <div className="w-full h-full overflow-hidden">
        <img src={photoUri} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${color} flex items-center justify-center overflow-hidden relative`}>
      {loading && (
        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin absolute" />
      )}
      <span className="text-2xl font-display font-black text-white/70 uppercase tracking-widest drop-shadow">
        {name.charAt(0)}
      </span>
      {photoRef && !autoLoad && (
        <button
          onClick={loadPhoto}
          disabled={loading}
          className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 hover:bg-white text-xs font-semibold px-2 py-1 rounded-lg shadow transition-all"
        >
          {loading
            ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            : <ImageIcon className="w-3 h-3" />
          }
          {loading ? 'Loading…' : 'Show Photo'}
        </button>
      )}
    </div>
  );
}

const AVATAR_COLORS = [
  'var(--color-brand)', 'var(--color-itinerary)', 'var(--color-explore)',
  'var(--color-food)', 'var(--color-danger)', '#0891B2',
];

function ReviewCard({ review, idx, keywords = [] }: { review: ReviewItem; idx: number; keywords?: string[] }) {
  const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const positiveBadge = review.stars === 5
    ? <span className="text-xs font-medium text-success-strong bg-success-soft px-1.5 py-0.5 rounded-full border border-success-medium/30 shrink-0">✓ Loved it</span>
    : review.stars === 4
    ? <span className="text-xs font-medium text-warning-strong bg-warning-soft px-1.5 py-0.5 rounded-full border border-warning-medium/40 shrink-0">✓ Liked it</span>
    : null;
  const kws = [...(review.highlight ? [review.highlight] : []), ...keywords];
  return (
    <div className="bg-bg-app rounded-lg p-3 border border-border">
      <div className="flex items-start gap-2.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: avatarColor }}
        >
          <span className="text-xs font-black text-white">{review.author.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs font-semibold text-heading truncate">{review.author}</span>
              <span className="text-xs text-muted shrink-0">· {review.location}</span>
            </div>
            <span className="text-xs text-muted shrink-0">{review.ago}</span>
          </div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < review.stars ? 'fill-warning text-warning' : 'text-border'}`} />
              ))}
            </div>
            {positiveBadge}
          </div>
          <p className="text-xs text-body leading-relaxed italic">"{highlightKeywords(review.text, kws)}"</p>
          <p className="text-xs text-muted mt-1.5 font-medium">via Google Reviews</p>
        </div>
      </div>
    </div>
  );
}

function highlightKeywords(text: string, keywords: string[]): React.ReactNode {
  if (!keywords.length || !text) return text;
  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some(k => k.toLowerCase() === part.toLowerCase())
      ? <mark key={i} className="bg-warning-soft text-heading rounded px-0.5 not-italic font-semibold">{part}</mark>
      : part
  );
}

const TAG_KEYWORD_MAP: Record<string, string[]> = {
  // ── Food: Cuisine (5) ────────────────────────────────────────────────────
  'South Indian':    ['dosa', 'idli', 'sambar', 'thali', 'banana leaf', 'pongal', 'rasam', 'dosai', 'vada', 'vadai', 'idiyappam', 'south indian'],
  'Biryani':         ['biryani', 'biriyani', 'dum biryani', 'mandi biryani', 'chicken biryani', 'mutton biryani'],
  'Chettinad':       ['chettinad', 'nattu kozhi', 'kuzhambu', 'pepper chicken', 'country chicken', 'anjappar', 'chettinad style', 'chettinad cuisine'],
  'North Indian':    ['north indian', 'paneer', 'butter masala', 'naan', 'roti', 'dal makhani', 'kadai'],
  'Mess & Meals':    ['mess', 'meals', 'full meals', 'thali', 'banana leaf', 'saapadu', 'lunch thali'],
  // ── Food: Dining Style (5) ───────────────────────────────────────────────
  'Tiffin':          ['tiffin', 'tiffin center', 'tiffin centre', 'idli', 'dosa', 'vada', 'pongal', 'upma', 'morning tiffin', 'breakfast'],
  'Fine Dining':     ['fine dine', 'fine dining', 'fine-dine', 'elegant', 'upscale dining', 'fine cuisine', 'ambience', 'ambiance', 'atmosphere', 'romantic', 'classy', 'fancy', 'interiors', 'decor', 'premium dining', 'special occasion'],
  'Buffet':          ['buffet', 'unlimited buffet', 'all you can eat', 'unlimited spread', 'buffet lunch', 'buffet dinner'],
  'Cafe & Drinks':   ['cafe', 'filter coffee', 'filter kaapi', 'degree coffee', 'kaapi', 'strong tea', 'coffee shop', 'coffee', 'tea', 'chai', 'cold coffee', 'juice', 'shakes', 'milkshake', 'espresso', 'latte'],
  'Family Dining':   ['family dining', 'family restaurant', 'family friendly', 'good for families', 'kids', 'children'],
  // ── Food: Preference (5) ─────────────────────────────────────────────────
  'Fresh & Hot':     ['fresh', 'freshly cooked', 'hot and fresh', 'made fresh', 'steaming hot', 'piping hot', 'hot food', 'served hot', 'warm food', 'just cooked', 'freshly prepared', 'hot dish', 'made to order'],
  'Budget Friendly': ['affordable', 'cheap', 'budget', 'pocket friendly', 'economical', 'low price', 'affordable price', 'reasonable', 'worth it', 'good price', 'inexpensive', 'cost effective', 'cheap rate', 'value', 'cheap food'],
  'Authentic':       ['authentic', 'authentic taste', 'traditional', 'original', 'since 1964', 'authentic south', 'old recipe', 'generations', 'age old', 'traditional taste', 'heritage', 'original taste', 'classic', 'old school', 'timeless'],
  'Lunch Spot':      ['lunch', 'lunch thali', 'afternoon', 'noon', 'lunch time', 'lunch crowd', 'midday', 'banana leaf'],
  'Dinner Special':  ['dinner', 'evening', 'night', 'dinner menu', 'dinner special', 'serves dinner', 'late night', 'dinner time', 'evenings', 'night time', 'open late', 'dinner crowd', 'dinner buffet', 'evening meal', 'night dining'],
  // ── Hotels: Cleanliness ──────────────────────────────────────────────────
  'Spotlessly Clean':   ['clean', 'spotless', 'cleanliness', 'hygienic', 'hygiene', 'sanitized', 'immaculate', 'neat', 'tidy', 'very clean', 'squeaky clean', 'well cleaned', 'neatly'],
  'Well Maintained':    ['maintained', 'well-maintained', 'maintenance', 'neat', 'tidy', 'neatly kept', 'well kept', 'good condition', 'looks new', 'renovated', 'well managed', 'upkeep'],
  'Fresh Rooms':        ['fresh', 'odour free', 'smell', 'bathroom', 'toilet', 'shower', 'towels', 'fresh rooms', 'linen', 'bed sheets', 'bedding', 'airy', 'ventilated', 'fresh linen', 'clean sheets', 'mattress'],
  // ── Hotels: Location ─────────────────────────────────────────────────────
  'Near Big Temple':    ['big temple', 'brihadeeswarar', 'near temple', 'temple proximity', 'walking distance', 'temple view', 'close to temple', 'temple nearby', '5 minutes', '10 minutes', 'few minutes'],
  'Near Railway Station': ['railway station', 'railway', 'junction', 'station road', 'station', 'near station', 'train station', 'walking distance', 'walk from station', 'close to station', '5 min', '10 min', 'minutes away'],
  'Central & Walkable': ['city centre', 'central', 'walkable', 'walk', 'walking distance', 'main road', 'convenient', 'nearby', 'prime location', 'good location', 'great location', 'central location', 'well located', 'near everything'],
  'City Centre':        ['city centre', 'city center', 'central', 'main road', 'heart of city', 'bus stand', 'prime location', 'good location'],
  'Quiet & Peaceful':   ['quiet', 'peaceful', 'calm', 'serene', 'tranquil', 'noise-free', 'no noise', 'undisturbed', 'relaxing', 'silent', 'restful'],
  'Easy Parking':       ['parking', 'car park', 'car parking', 'parking available', 'free parking', 'two wheeler', 'bike stand', 'vehicle parking', 'ample parking'],
  'Free Parking':       ['parking', 'car park', 'free parking', 'car parking', 'parking available', 'two wheeler', 'bike stand', 'complimentary parking'],
  // ── Hotels: Staff & Service ──────────────────────────────────────────────
  'Friendly & Helpful': ['friendly', 'helpful', 'warm', 'welcoming', 'attentive', 'cooperative', 'caring', 'supportive', 'kind', 'polite', 'courteous', 'nice staff', 'good staff', 'excellent staff', 'great staff'],
  'Warm Hospitality':   ['hospitality', 'courteous', 'polite', 'professional', 'heartwarming', 'outstanding service', 'warm welcome', 'felt at home', 'great hospitality', 'excellent hospitality', 'welcoming'],
  'Quick Response':     ['prompt', 'quick service', 'fast service', 'smooth check', 'responsive', 'efficient', 'quick check-in', 'smooth check-in', 'hassle free', 'no waiting', 'fast check', 'easy check-in'],
  'Good Hospitality':   ['hospitality', 'welcoming', 'courteous', 'polite', 'hospitable', 'warm welcome', 'felt at home', 'great hospitality'],
  'Highly Recommended': ['recommend', 'recommended', 'must stay', 'must visit', 'excellent', 'outstanding', 'highly recommend', 'would recommend'],
  // ── Hotels: Rooms & Comfort ──────────────────────────────────────────────
  'Spacious Rooms':     ['spacious', 'large room', 'big room', 'roomy', 'good space', 'huge room', 'enough space', 'good room size', 'nice room', 'spacious room', 'big rooms'],
  'Comfortable & Quiet':['comfortable', 'comfort', 'cozy', 'quiet', 'peaceful', 'calm', 'serene', 'relaxing', 'good sleep', 'slept well', 'no noise'],
  'Good WiFi':          ['wifi', 'wi-fi', 'free wifi', 'internet', 'fast wifi', 'wifi available', 'good wifi', 'wifi working', 'internet access', 'high speed', 'connectivity'],
  // ── Hotels: Amenities & Food ─────────────────────────────────────────────
  'Good Amenities':     ['amenities', 'wifi', 'lift', 'pool', 'facilities', 'generator', 'power backup', 'all facilities', 'basic amenities', 'all amenities', 'tv', 'fridge', 'geyser', 'equipped', 'well equipped', 'elevator', 'ac'],
  'In-House Restaurant':['in-house restaurant', 'hotel restaurant', 'hotel dining', 'dining hall', 'restaurant in hotel', 'food court', 'restaurant', 'dining', 'canteen', 'food available', 'meals served', 'room service', 'attached restaurant', 'food at hotel'],
  'Breakfast Included': ['breakfast included', 'complimentary breakfast', 'free breakfast', 'breakfast provided', 'breakfast', 'morning meal', 'breakfast was', 'breakfast served', 'buffet breakfast'],
  'Good Food':          ['food', 'tasty', 'delicious', 'good food', 'fresh food', 'recommend', 'amazing'],
  // ── Hotels: Value ────────────────────────────────────────────────────────
  'Budget-Friendly':    ['budget', 'affordable', 'cheap', 'economical', 'low cost', 'lodge', 'reasonable', 'worth', 'good price', 'value for money'],
  // ── Hotels: Stay Type ────────────────────────────────────────────────────
  'Budget Stay':        ['budget', 'affordable', 'economical', 'lodge', 'inn', 'value for money', 'cheap', 'reasonable'],
  'Premium Stay':       ['luxury', 'premium', 'five star', '5 star', 'upscale', 'elite', 'suite', 'luxurious', 'high-end', 'top class'],
  'Heritage Stay':      ['heritage', 'boutique', 'historic', 'traditional', 'old charm', 'colonial', 'vintage', 'antique', 'old building'],
  'Swimming Pool':      ['swimming pool', 'pool', 'swim', 'pool side'],
  'Pure Veg Hotel':     ['pure veg', 'veg only', 'vegetarian only', 'sattvic'],
  'Pilgrim Friendly':   ['pilgrim', 'darshan', 'devotee', 'religious', 'temple town'],
  // ── Legacy ───────────────────────────────────────────────────────────────
  'Thali/Meals':        ['thali', 'meals', 'banana leaf', 'full meals'],
  'Pure Veg':           ['pure veg', 'veg only', 'vegetarian', 'no non-veg', 'bhavan', 'sattvic'],
  'Non-Veg':            ['chicken', 'mutton', 'fish', 'non-veg', 'prawn', 'crab', 'kozhi', 'meat'],
};

function expandTagsToKeywords(tags: string[]): string[] {
  const kws = new Set<string>();
  for (const tag of tags) {
    const mapped = TAG_KEYWORD_MAP[tag];
    if (mapped) mapped.forEach(k => kws.add(k));
    else kws.add(tag.toLowerCase());
  }
  return [...kws];
}

const TIME_REVIEW_KEYWORDS: Record<string, string[]> = {
  Morning:   ['morning', 'sunrise', 'dawn', 'early', 'puja', 'cool', 'fresh', 'few people', 'peaceful', 'quiet', 'mist', 'less crowd'],
  Afternoon: ['afternoon', 'midday', 'noon', 'hot', 'bright', 'sunny', 'lunch', 'busy', 'heat', 'warm', 'day'],
  Evening:   ['evening', 'sunset', 'dusk', 'lamp', 'golden', 'dark', 'night', 'lights', 'illuminat', 'peaceful', 'atmosphere', 'crowd', 'lamps', 'lit'],
};

function scoreReviewForTime(text: string, timeSlot: string): number {
  const kws = TIME_REVIEW_KEYWORDS[timeSlot] ?? [];
  const lower = text.toLowerCase();
  return kws.reduce((n, kw) => n + (lower.includes(kw) ? 1 : 0), 0);
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function PlaceCard({ place, tab, rank = 0, animDelay = 0, defaultCollapsed = false, selectedTags = [], refLat, refLng, refLabel, dimmed = false }: {
  place: PlaceResult; tab: Tab; rank?: number; animDelay?: number; defaultCollapsed?: boolean; selectedTags?: string[];
  refLat?: number; refLng?: number; refLabel?: string; dimmed?: boolean;
}) {
  // rank-1 AI Top Pick cards start collapsed to save space; all others start expanded
  const [cardCollapsed, setCardCollapsed] = useState(defaultCollapsed);
  const [expanded, setExpanded]         = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showNearby, setShowNearby]     = useState(false);
  const [openAiRow, setOpenAiRow]       = useState<number | null>(null);
  const [bookmarked, setBookmarked]     = useState(false);
  const { toast } = useToast();

  // Distance from reference point (header-selected area or city centre)
  const distKm = (place.lat && place.lng && refLat && refLng)
    ? haversineKm(refLat, refLng, place.lat, place.lng)
    : null;
  const distLabel = distKm !== null
    ? `${distKm < 1 ? `${Math.round(distKm * 1000)}m` : `${distKm.toFixed(1)} km`}`
    : null;

  // Expand tag names → actual words that appear in review text
  const reviewKeywords = expandTagsToKeywords(selectedTags);


  const share = () => {
    if (navigator.share) {
      navigator.share({ title: place.name, text: `Check out ${place.name}!`, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('Link copied to clipboard', 'success');
    }
  };

  const toggleBookmark = () => {
    setBookmarked(v => !v);
    toast(bookmarked ? `Removed ${place.name}` : `${place.name} saved`, bookmarked ? 'info' : 'success');
  };

  const actionButtons = (
    <div className="flex items-center gap-1.5 shrink-0">
      {tab === 'Hotels' && (<>
        <a href={place.websiteUri ?? `https://www.booking.com/search.html?ss=${encodeURIComponent(place.name + ' Thanjavur')}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand/90 transition-colors active:scale-[0.97] shadow-sm">
          <ExternalLink className="w-3 h-3" />Book
        </a>
        <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 text-slate-600 hover:border-brand hover:text-brand transition-colors active:scale-[0.97]">
          <Map className="w-3 h-3" />Map
        </a>
      </>)}
      {tab === 'Food' && (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-success text-white hover:bg-success-strong transition-colors active:scale-[0.97] shadow-sm">
          <Navigation className="w-3 h-3" />Directions
        </a>
      )}
    </div>
  );

  // Competitor-style coloured rating badge (Booking.com / Goibibo pattern)
  const ratingColor = place.rating >= 4.5 ? 'var(--color-success-strong)' : place.rating >= 4.0 ? 'var(--color-brand)' : place.rating >= 3.5 ? 'var(--color-food)' : 'var(--color-danger-strong)';
  const ratingLabel = place.rating >= 4.5 ? 'Excellent' : place.rating >= 4.0 ? 'Very Good' : place.rating >= 3.5 ? 'Good' : 'Fair';
  const recentRatingsArr = place.recentRatings ?? [];
  const recentAvgMain = recentRatingsArr.length > 0
    ? +(recentRatingsArr.reduce((s: number, r: number) => s + r, 0) / recentRatingsArr.length).toFixed(1)
    : null;
  const trendColorMain = place.trendVerdict === 'improving' ? '#057A55' : place.trendVerdict === 'declining' ? '#B45309' : '#6B7280';
  const trendLabelMain = place.trendVerdict === 'improving' ? '↑ Rising' : place.trendVerdict === 'declining' ? '↓ Slipping' : '— Consistent';
  const confirmed   = place.confirmedTags ?? [];
  const matched     = place.matchedTags   ?? [];
  const unconfirmed = matched.filter(t => !confirmed.includes(t));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.35, ease: 'easeOut', layout: { duration: 0.28, ease: 'easeInOut' } }}
      className="bg-surface border border-card-border rounded-2xl shadow-sm card-hover overflow-hidden"
      style={dimmed ? { opacity: 0.35, filter: 'grayscale(0.7)', pointerEvents: 'none', transition: 'opacity 0.3s, filter 0.3s' } : undefined}
    >

      {/* ══ MOBILE CARD LAYOUT (< sm) ══ */}
      <div className="sm:hidden">

        {/* Full-width banner photo with overlaid badges */}
        <div className="relative w-full h-[160px] overflow-hidden">
          <PlacePhoto
            color={place.photoColor}
            name={place.name}
            photoRef={rank === 1 ? (place.photoRef ?? null) : null}
            autoLoad={rank === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
          {rank === 1 && (
            <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(99,102,241,0.88)' }}>
              <Sparkles className="w-2.5 h-2.5" />AI Top Pick
            </span>
          )}
          {rank === 2 && (
            <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(5,150,105,0.88)' }}>
              💰 Best Value
            </span>
          )}
          {rank === 3 && (
            <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(217,119,6,0.88)' }}>
              ⭐ Highly Rated
            </span>
          )}
          {rank === 4 && (
            <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(220,38,38,0.88)' }}>
              🔥 Popular Pick
            </span>
          )}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
            <span className="text-white text-sm font-black px-2 py-0.5 rounded-lg shadow" style={{ background: ratingColor }}>{place.rating}</span>
            <span className="text-white text-xs font-semibold drop-shadow">{ratingLabel}</span>
          </div>
          {distLabel && (
            <span className="absolute bottom-2.5 right-2.5 text-white/90 text-xs font-medium drop-shadow">{distLabel}</span>
          )}
        </div>

        {/* Info */}
        <div className="px-3 pt-2.5 pb-1 flex flex-col gap-1.5">
          <h3 className="font-display font-bold text-lg text-heading leading-snug">{place.name}</h3>
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(place.rating) ? 'fill-warning text-warning' : i < place.rating ? 'fill-warning-medium text-warning-medium' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-xs text-muted ml-0.5">({place.reviewCount.toLocaleString()})</span>
            {recentAvgMain !== null && (
              <>
                <span className="text-xs text-placeholder">·</span>
                <span className="text-xs font-medium" style={{ color: trendColorMain }}>{recentAvgMain}★ recent</span>
                <span className="text-xs text-placeholder">·</span>
                <span className="text-xs font-medium" style={{ color: trendColorMain }}>{trendLabelMain}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={place.openNow ? 'success' : 'danger'} dot pill>{place.openNow ? 'Open' : 'Closed'}</Badge>
            <Badge variant="neutral" pill>{place.priceLevel}</Badge>
            {selectedTags.length > 0 && place.matchScore !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold"
                style={place.matchScore >= 80 ? { background: 'var(--color-success-soft)', color: 'var(--color-success-strong)' }
                  : place.matchScore >= 55 ? { background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                  : { background: 'var(--color-bg-app)', color: 'var(--color-muted)' }}>
                {place.matchScore}% match
              </span>
            )}
          </div>
          {(confirmed.length > 0 || unconfirmed.length > 0) && (
            <div className="flex gap-1 flex-wrap">
              {confirmed.slice(0, 2).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border"
                  style={{ background: 'var(--color-success-soft)', borderColor: 'var(--color-success-medium)', color: 'var(--color-success-strong)' }}>
                  <CheckCircle className="w-2.5 h-2.5" />{t}
                </span>
              ))}
              {unconfirmed.slice(0, 1).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border"
                  style={{ background: 'var(--color-bg-app)', borderColor: 'var(--color-border-medium)', color: 'var(--color-muted)' }}>
                  ~{t}
                </span>
              ))}
            </div>
          )}
          {place.aiDetail?.whyOverOthers && (
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 text-brand shrink-0 mt-0.5" />
              <p className="text-xs text-brand font-medium leading-snug line-clamp-2">{highlightKeywords(place.aiDetail.whyOverOthers, reviewKeywords)}</p>
            </div>
          )}
          {place.aiDetail?.insiderTip && (
            <div className="flex items-start gap-1.5">
              <Lightbulb className="w-3 h-3 shrink-0 mt-0.5 text-brand" />
              <p className="text-xs leading-snug line-clamp-1 text-brand">{place.aiDetail.insiderTip}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-2 px-3 py-2.5">
          <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold border border-border text-body active:scale-[0.97]">
            <Map className="w-4 h-4 shrink-0" />Map
          </a>
          {tab === 'Hotels' && (
            <a href={place.websiteUri ?? `https://www.booking.com/search.html?ss=${encodeURIComponent(place.name + ' Thanjavur')}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold bg-brand text-white active:scale-[0.97] shadow-sm">
              <ExternalLink className="w-4 h-4 shrink-0" />Book Now
            </a>
          )}
          {tab === 'Food' && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold bg-success text-white active:scale-[0.97] shadow-sm">
              <Navigation className="w-4 h-4 shrink-0" />Directions
            </a>
          )}
        </div>

        {/* Detailed Analysis toggle */}
        <div className="border-t border-border">
          <button onClick={() => setExpanded(v => !v)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-brand active:scale-[0.97]">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            Detailed Analysis
            <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>

      {/* ══ DESKTOP CARD LAYOUT (≥ sm) ══ */}
      <div className="hidden sm:flex min-h-[130px]">

        {/* Col 1: Photo */}
        <div className="w-[130px] shrink-0 relative">
          <div className="absolute inset-0">
            <PlacePhoto
              color={place.photoColor}
              name={place.name}
              photoRef={rank === 1 ? (place.photoRef ?? null) : null}
              autoLoad={rank === 1}
            />
          </div>
          {rank === 1 && <span className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(99,102,241,0.88)' }}><Sparkles className="w-2.5 h-2.5" />Top Pick</span>}
          {rank === 2 && <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(5,150,105,0.88)' }}>💰 Best Value</span>}
          {rank === 3 && <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(217,119,6,0.88)' }}>⭐ Highly Rated</span>}
          {rank === 4 && <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(220,38,38,0.88)' }}>🔥 Popular</span>}
        </div>

        {/* Col 2: Info */}
        <div className="flex-1 min-w-0 px-2.5 py-2.5 flex flex-col gap-1.5">
          {rank === 1 && (
            <span className="flex items-center gap-1 text-xs font-semibold text-brand tracking-wide leading-none">
              <Sparkles className="w-2.5 h-2.5" /> AI Top Pick
            </span>
          )}
          <h3 className="font-display font-bold text-sm text-heading leading-snug line-clamp-2">{place.name}</h3>
          <div className="flex items-center gap-1.5">
            <div className="text-white text-sm font-black px-2.5 py-0.5 rounded-lg" style={{ background: ratingColor }}>{place.rating}</div>
            <span className="text-xs text-muted font-semibold">{ratingLabel}</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(place.rating) ? 'fill-warning text-warning' : i < place.rating ? 'fill-warning-medium text-warning-medium' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-xs text-muted">({place.reviewCount.toLocaleString()})</span>
            {recentAvgMain !== null && (
              <>
                <span className="text-xs text-placeholder">·</span>
                <span className="text-xs font-medium" style={{ color: trendColorMain }}>{recentAvgMain}★ recent</span>
                <span className="text-xs text-placeholder">·</span>
                <span className="text-xs font-medium" style={{ color: trendColorMain }}>{trendLabelMain}</span>
              </>
            )}
            {distLabel && <span className="text-xs text-muted shrink-0">· {distLabel}</span>}
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <Badge variant={place.openNow ? 'success' : 'danger'} dot pill>{place.openNow ? 'Open' : 'Closed'}</Badge>
            <Badge variant="neutral" pill>{place.priceLevel}</Badge>
            {selectedTags.length > 0 && place.matchScore !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold"
                style={place.matchScore >= 80 ? { background: 'var(--color-success-soft)', color: 'var(--color-success-strong)' }
                  : place.matchScore >= 55 ? { background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                  : { background: 'var(--color-bg-app)', color: 'var(--color-muted)' }}>
                {place.matchScore}% match
              </span>
            )}
          </div>
          {(confirmed.length > 0 || unconfirmed.length > 0) && (
            <div className="flex gap-1 flex-wrap">
              {confirmed.slice(0, 2).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border"
                  style={{ background: 'var(--color-success-soft)', borderColor: 'var(--color-success-medium)', color: 'var(--color-success-strong)' }}>
                  <CheckCircle className="w-2.5 h-2.5" />{t}
                </span>
              ))}
              {unconfirmed.slice(0, 1).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border"
                  style={{ background: 'var(--color-bg-app)', borderColor: 'var(--color-border-medium)', color: 'var(--color-muted)' }}>
                  ~{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Col 3: Buttons */}
        <div className="w-[220px] shrink-0 flex flex-col items-stretch justify-between px-3 py-3">
          <div className="flex flex-col gap-2">
            <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border border-border text-body hover:border-brand hover:text-brand transition-colors active:scale-[0.97]">
              <Map className="w-3.5 h-3.5 shrink-0" />Map
            </a>
            {tab === 'Hotels' && (
              <a href={place.websiteUri ?? `https://www.booking.com/search.html?ss=${encodeURIComponent(place.name + ' Thanjavur')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand/90 transition-colors active:scale-[0.97] shadow-sm">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />Book
              </a>
            )}
            {tab === 'Food' && (
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-success text-white hover:bg-success-strong transition-colors active:scale-[0.97] shadow-sm">
                <Navigation className="w-3.5 h-3.5 shrink-0" />Directions
              </a>
            )}
          </div>
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-brand hover:text-brand/70 transition-colors active:scale-[0.97]"
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            Detailed Analysis
            <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>

      {/* ── EXPANDABLE DETAIL: Guest Pulse + AI Deep Dive ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-3 space-y-2.5">

              {/* ── 1. Top insight ── */}
              {place.aiDetail?.whyOverOthers && (
                <p className="text-xs text-body leading-relaxed">
                  {highlightKeywords(place.aiDetail.whyOverOthers, reviewKeywords)}
                </p>
              )}

              {/* ── 2. Be Cautious + Best For cards ── */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg p-3 flex flex-col gap-1.5 border"
                  style={{ background: 'var(--color-warning-soft, #fffbeb)', borderColor: 'var(--color-warning-medium, #fcd34d)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1 text-amber-700">
                    <Info className="w-2.5 h-2.5" />Good to Know
                  </span>
                  <p className="text-xs text-body leading-relaxed">
                    {(place as any).cautionNote || place.aiDetail?.caveat || 'Most visitors had a smooth experience here.'}
                  </p>
                </div>

                <div className="rounded-lg p-3 flex flex-col gap-1.5 border"
                  style={{ background: 'var(--color-brand-softer)', border: '1px solid var(--color-food-border)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1 text-brand">
                    <CheckCircle className="w-2.5 h-2.5" />Best For
                  </span>
                  <p className="text-xs text-body leading-relaxed">
                    {place.aiDetail?.bestFor || '—'}
                  </p>
                </div>
              </div>

              {/* ── 3. Recent pulse — consistency + rating trend ── */}
              {(() => {
                const ratings = place.recentRatings ?? [];
                const recentAvg = ratings.length > 0
                  ? +(ratings.reduce((s: number, r: number) => s + r, 0) / ratings.length).toFixed(1)
                  : null;
                const trendColor =
                  place.trendVerdict === 'improving' ? '#057A55'
                  : place.trendVerdict === 'declining' ? '#92400E'
                  : '#6B7280';
                const trendLabel =
                  place.trendVerdict === 'improving' ? 'Rising recently'
                  : place.trendVerdict === 'declining' ? 'Slipping recently'
                  : 'Consistent lately';
                const bullets: string[] = (place as any).recentSentiment ?? [];
                if (recentAvg === null && bullets.length === 0) return null;
                return (
                  <div className="rounded-lg border border-border bg-bg-app overflow-hidden divide-y divide-border">
                    {recentAvg !== null && (
                      <div className="flex items-center gap-2 px-3 py-2">
                        <span className="text-sm font-bold" style={{ color: trendColor }}>{recentAvg}★</span>
                        <span className="text-xs text-muted">recent avg</span>
                        <span className="text-xs text-placeholder">·</span>
                        <span className="text-xs text-muted">{place.rating}★ all-time</span>
                        <span className="ml-auto text-xs font-medium" style={{ color: trendColor }}>{trendLabel}</span>
                      </div>
                    )}
                    {bullets.map((b: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1.5" />
                        <span className="text-xs text-body leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* ── 4. Reviews — last 5 months, recent first, highlighted ── */}
              {(() => {
                function agoToDays(ago: string): number {
                  const m = ago.match(/(\d+)\s+(day|week|month)/);
                  if (!m) return 0;
                  const n = parseInt(m[1], 10);
                  if (m[2] === 'day')   return n;
                  if (m[2] === 'week')  return n * 7;
                  if (m[2] === 'month') return n * 30;
                  return 0;
                }
                const recentReviews = place.reviews
                  .filter(r => r.stars >= 3 && agoToDays(r.ago) <= 150)
                  .sort((a, b) => agoToDays(a.ago) - agoToDays(b.ago))
                  .slice(0, 3);
                if (recentReviews.length === 0) return null;
                return (
                  <div className="bg-bg-app border border-border rounded-lg overflow-hidden divide-y divide-border">
                    {recentReviews.map((r, i) => (
                      <div key={i} className="px-3 py-2.5 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white"
                            style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                            {r.author.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-heading">{r.author}</span>
                          <span className="text-xs text-muted">· {r.location}</span>
                          <div className="ml-auto flex items-center gap-1.5 shrink-0">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`w-2.5 h-2.5 ${j < r.stars ? 'fill-warning text-warning' : 'text-border'}`} />
                              ))}
                            </div>
                            {r.stars === 5 && <span className="text-xs font-medium text-success-strong bg-success-soft px-1.5 py-0.5 rounded-full border border-success-medium/30">✓ Loved it</span>}
                            {r.stars === 4 && <span className="text-xs font-medium text-warning-strong bg-warning-soft px-1.5 py-0.5 rounded-full border border-warning-medium/40">✓ Liked it</span>}
                          </div>
                        </div>
                        <p className="text-xs text-body leading-relaxed italic line-clamp-3">
                          "{highlightKeywords(r.text, [...(r.highlight ? [r.highlight] : []), ...reviewKeywords, ...(place.matchedKeyword ? [place.matchedKeyword] : [])])}"
                        </p>
                        <p className="text-xs text-muted">{r.ago} · via Google</p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* All reviews link */}
              {place.googleMapsUri && (
                <div className="flex justify-end">
                  <a href={place.googleMapsUri} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-brand transition-colors flex items-center gap-1 font-medium">
                    All {place.reviewCount.toLocaleString()} reviews <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );

  // suppress unused-var warnings for state vars no longer used in JSX
  void cardCollapsed; void setCardCollapsed; void showNearby; void setShowNearby; void openAiRow; void setOpenAiRow; void bookmarked; void share; void actionButtons; void showAnalysis; void setShowAnalysis;
}

/* ── Trophy icon (not in lucide default set, use inline) ─────────────── */
function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}

/* ── Itinerary route map + stop cards ────────────────────────────────── */
/* ── Seasonal weather for Thanjavur (month-derived) ─────────────────── */
function getThanjavurWeather(): { emoji: string; label: string; temp: string } {
  const m = new Date().getMonth(); // 0=Jan
  if (m >= 2 && m <= 5)  return { emoji: '☀️', label: 'Hot & sunny',    temp: '36–38°C' };
  if (m >= 6 && m <= 9)  return { emoji: '🌧️', label: 'Monsoon showers', temp: '28–32°C' };
  return                        { emoji: '⛅', label: 'Pleasant',         temp: '26–30°C' };
}

/* ── Short label for progress strip ─────────────────────────────────── */
function stopShortName(name: string): string {
  const paren = name.match(/\(([^)]+)\)/);
  if (paren) return paren[1];
  return name.split(' — ')[0].split(' & ')[0].replace(/^Thanjavur\s+/i, '').trim();
}

/* ── Travel mode parser ──────────────────────────────────────────────── */
function getTravelMode(leg: string): { emoji: string; bg: string; color: string } {
  const l = leg.toLowerCase();
  if (l.includes('walk'))  return { emoji: '🚶', bg: 'var(--color-success-soft)',  color: 'var(--color-success)' };
  if (l.includes('metro')) return { emoji: '🚇', bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  if (l.includes('bus'))   return { emoji: '🚌', bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  if (l.includes('auto'))  return { emoji: '🛺', bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  return                          { emoji: '🚗', bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
}

function ItineraryView({ stops, onRegenerate, onExploreStop }: {
  stops: (ItineraryStop | LiveItineraryStop)[];
  onRegenerate: () => void;
  onExploreStop?: (target: string) => void;
}) {
  void onRegenerate;
  const [expandedStops, setExpandedStops] = useState<Set<number>>(new Set());

  const displayStops = stops;

  const toggleStop = (idx: number) => setExpandedStops(prev => {
    const next = new Set(prev);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    return next;
  });

  const wx = getThanjavurWeather();
  const crowdOrder: Record<string, number> = { Low: 0, Moderate: 1, High: 2 };
  const worstCrowd = stops.reduce<'Low' | 'Moderate' | 'High'>((w, s) => {
    const sc = (s as any).crowdLevel as 'Low' | 'Moderate' | 'High' | undefined;
    return sc && crowdOrder[sc] > crowdOrder[w] ? sc : w;
  }, 'Low');
  const crowdStyle = worstCrowd === 'High'
    ? { bg: 'var(--color-danger-soft)',   text: 'var(--color-danger-strong)',   dot: 'var(--color-danger)' }
    : worstCrowd === 'Moderate'
    ? { bg: 'var(--color-brand-softer)',  text: 'var(--color-brand)',           dot: 'var(--color-warning-strong)' }
    : { bg: 'var(--color-success-soft)',  text: 'var(--color-success)',         dot: 'var(--color-success-medium)' };

  return (
    <div>

      {/* ── Day progress strip ────────────────────────────────── */}
      <div className="mb-4 rounded-2xl bg-surface border border-card-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-3.5 pb-2.5 border-b border-border/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Route className="w-3.5 h-3.5 text-brand" />
              <span className="text-sm font-semibold text-heading">Day Plan</span>
              <span className="text-xs text-muted font-medium">· {stops.length} stops</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-body">
              <Clock className="w-3 h-3 text-muted" />
              <span>{stops[0]?.time}</span>
              <span className="text-muted">–</span>
              <span>{stops[stops.length - 1]?.departBy ?? stops[stops.length - 1]?.time}</span>
            </div>
          </div>
          {/* Context row: weather + crowd */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-bg-app">
              <span className="text-sm leading-none">{wx.emoji}</span>
              <span className="text-xs font-semibold text-body">{wx.temp}</span>
              <span className="text-xs text-muted">{wx.label}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
              style={{ background: crowdStyle.bg, borderColor: crowdStyle.dot + '40' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: crowdStyle.dot }} />
              <span className="text-xs font-semibold" style={{ color: crowdStyle.text }}>{worstCrowd} crowd</span>
            </div>
          </div>
        </div>

        {/* Timeline row — scrollable */}
        <div className="overflow-x-auto no-scrollbar px-4 py-4">
          <div className="flex items-start" style={{ minWidth: `${stops.length * 100 + 60}px` }}>
            {stops.map((stop, idx) => {
              const isLast = idx === stops.length - 1;
              const travelMin = stop.travelToNext?.match(/\d+\s*min/)?.[0] ?? '';
              return (
                <React.Fragment key={idx}>
                  {/* Stop node */}
                  <button
                    type="button"
                    onClick={() => document.getElementById(`itin-stop-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="flex flex-col items-center gap-1 shrink-0 focus:outline-none group"
                    style={{ width: 72 }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[15px] shadow ring-2 ring-white transition-transform group-hover:scale-110"
                      style={{ background: 'linear-gradient(135deg,var(--color-brand),var(--color-brand-active))', color: '#fff' }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-xs font-bold text-heading text-center leading-tight w-full px-1"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 26 }}>
                      {stopShortName(stop.stop)}
                    </span>
                    <span className="text-xs font-medium text-muted whitespace-nowrap">{stop.time}</span>
                  </button>

                  {/* Connector */}
                  {!isLast && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-1 mx-1" style={{ paddingTop: 10 }}>
                      {travelMin && (
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                          style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] + '22', color: TRAFFIC_LINE_BG[stop.currentTraffic] }}>
                          {travelMin}
                        </span>
                      )}
                      <div className="w-full h-[2px] rounded-full" style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Stop cards ───────────────────────────────────────── */}
      <div className="space-y-1">
        {displayStops.map((stop, idx) => {
          const isLast = idx === stops.length - 1;
          const mode = stop.travelToNext ? getTravelMode(stop.travelToNext) : null;
          const traffic = TRAFFIC_BADGE[stop.currentTraffic];
          const crowd = stop.crowdLevel ? CROWD_BADGE[stop.crowdLevel] : null;
          const isExpanded = expandedStops.has(idx);

          return (
            <div key={idx} id={`itin-stop-${idx}`}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-2xl overflow-hidden border border-card-border shadow-sm"
              >
                {/* ── Photo zone ──────────────────────────── */}
                <div className="relative h-[185px]">
                  <ItineraryPhoto
                    stopName={stop.stop}
                    photoRef={(stop as any).photoRef}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

                  {/* Top: stop# + time + duration */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    <span className="bg-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm leading-none text-brand">
                      Stop {idx + 1}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-black/55 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full leading-none">
                        {stop.time}
                      </span>
                      {stop.duration && (
                        <span className="bg-black/55 backdrop-blur-sm text-white/80 text-xs font-semibold px-2 py-0.5 rounded-full leading-none">
                          ⏱ {stop.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: name + traffic/crowd badges */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                    <h3 className="text-white font-display font-black text-lg leading-tight drop-shadow mb-2">
                      {stop.stop}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full border ${traffic.bg} ${traffic.border} ${traffic.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${traffic.dot}`} />
                        {stop.currentTraffic} traffic
                      </span>
                      {crowd && stop.crowdLevel && (
                        <span className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full border ${crowd.bg} ${crowd.border} ${crowd.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${crowd.dot}`} />
                          {stop.crowdLevel} crowd
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Info + CTA row ─────────────────────── */}
                <div className="bg-surface px-3.5 pt-3 pb-3.5 space-y-3">
                  {/* AI tip */}
                  <p className="text-xs text-body leading-relaxed italic border-l-2 border-brand/30 pl-2.5">
                    "{stop.tip}"
                  </p>

                  {/* Highlights + entry fee */}
                  {(stop.entryFee || (stop.highlights && stop.highlights.length > 0)) && (
                    <div className="flex flex-wrap gap-1.5">
                      {stop.entryFee && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-success-soft text-success border border-success-medium/30">
                          🎟 {stop.entryFee}
                        </span>
                      )}
                      {stop.highlights?.map(h => (
                        <span key={h} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-bg-app text-muted border border-border">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA row */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onExploreStop?.(stop.stop)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-brand border border-brand/30 bg-brand-softer hover:bg-brand-soft transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5" /> Explore Place
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStop(idx)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border transition-colors"
                      style={isExpanded
                        ? { background: 'var(--color-brand-softer)', borderColor: 'var(--color-brand-soft)', color: 'var(--color-brand)' }
                        : { background: 'var(--color-bg-app)', borderColor: 'var(--color-border)', color: 'var(--color-body)' }
                      }
                    >
                      Know More
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* ── Know More expanded section ─────────── */}
                <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`itin-expand-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-3.5 pb-3.5 border-t border-border/50 pt-3 space-y-2.5 bg-bg-app">

                      {/* 2-card grid: Timing & Crowd + Good to Know */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Card 1: Timing & Crowd */}
                        <div className="rounded-lg p-3 flex flex-col gap-2 border bg-brand-softer border-brand-medium">
                          <span className="text-xs font-semibold text-brand flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Timing & Crowd
                          </span>
                          <div className="flex flex-col gap-1.5 text-xs text-body">
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted">🕐</span>
                              <span className="font-semibold">{stop.time}</span>
                              {stop.departBy && <span className="text-muted">→ {stop.departBy}</span>}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted">⏱</span>
                              <span className="font-semibold">{stop.duration ?? '1–2 hrs'}</span>
                            </div>
                            {stop.entryFee && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-muted">🎟</span>
                                <span className="font-semibold">{stop.entryFee}</span>
                              </div>
                            )}
                            {crowd && stop.crowdLevel && (
                              <div className={`flex items-center gap-1.5 font-semibold px-2 py-1 rounded-lg mt-0.5 ${crowd.bg} ${crowd.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${crowd.dot}`} />
                                {stop.crowdLevel} crowd
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card 2: Good to Know */}
                        <div className="rounded-lg p-3 flex flex-col gap-2 border" style={{ background: '#FFFBEB', borderColor: '#FCD34D' }}>
                          <span className="text-xs font-semibold flex items-center gap-1" style={{ color: '#92400E' }}>
                            <Info className="w-3 h-3" /> Good to Know
                          </span>
                          <p className="text-xs leading-snug" style={{ color: '#78350F' }}>
                            {(stop as any).cautionNote || stop.reachNote || 'Plan to arrive a few minutes before your scheduled time.'}
                          </p>
                        </div>
                      </div>

                      {/* Avoid These — if avoidNote exists */}
                      {(stop as any).avoidNote && (
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border bg-danger-soft border-danger-medium/50">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-danger-strong" />
                          <div>
                            <span className="text-xs font-bold block mb-0.5 text-danger-strong">Avoid</span>
                            <p className="text-xs leading-snug text-danger">{(stop as any).avoidNote}</p>
                          </div>
                        </div>
                      )}

                      {/* Reviews — time-slot highlighted */}
                      {(() => {
                        const stopReviews: Array<{ text: string; author: string; location: string; stars: number; ago: string }> =
                          (stop as any).reviews ?? [];
                        const timeKws = TIME_REVIEW_KEYWORDS['Morning'] ?? [];
                        const displayed = stopReviews
                          .filter(r => r.stars >= 3 && r.text)
                          .sort((a, b) => scoreReviewForTime(b.text, 'Morning') - scoreReviewForTime(a.text, 'Morning'))
                          .slice(0, 2);
                        if (!displayed.length) return null;
                        return (
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-muted flex items-center gap-1">
                              <Star className="w-3 h-3 fill-warning text-warning" /> Visitor Reviews
                            </span>
                            {displayed.map((r, i) => (
                              <ReviewCard
                                key={i}
                                review={r as ReviewItem}
                                idx={i}
                                keywords={timeKws}
                              />
                            ))}
                          </div>
                        );
                      })()}

                      {/* Travel note to next stop */}
                      {stop.travelToNext && (
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border border-border bg-surface">
                          <Navigation className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-body">Next stop: </span>
                            <span className="text-xs text-muted">{stop.travelToNext}</span>
                            {stop.departBy && (
                              <span className="text-xs font-bold ml-1 text-brand">· leave by {stop.departBy}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>

              {/* Travel connector */}
              {!isLast && mode && stop.travelToNext && (
                <div className="flex items-center gap-3 py-2 px-1">
                  <div className="flex flex-col items-center w-8 shrink-0">
                    <div className="w-px h-3 bg-border" />
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: mode.bg }}>
                      {mode.emoji}
                    </div>
                    <div className="w-px h-3 bg-border" />
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: mode.bg, color: mode.color }}>
                    <span>{stop.travelToNext}</span>
                    <span className="text-xs font-black px-1.5 py-0.5 rounded-full" style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] + '25', color: TRAFFIC_LINE_BG[stop.currentTraffic] }}>
                      {stop.currentTraffic}
                    </span>
                  </div>
                </div>
              )}

              {isLast && (
                <div className="flex items-center gap-3 py-2 px-1">
                  <div className="flex flex-col items-center w-8 shrink-0">
                    <div className="w-px h-3 bg-border" />
                    <div className="w-8 h-8 rounded-full bg-success/15 border-2 border-success flex items-center justify-center text-sm">🏁</div>
                  </div>
                  <span className="text-xs font-bold text-muted">Day complete · {stop.departBy ?? stop.time}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

function ExploreView({ place, visitTime = 'Morning' }: { place: ExploreResult; visitTime?: string }) {
  const [expanded, setExpanded] = useState(false);
  // Sort reviews — most time-slot-relevant first
  const sortedReviews = [...place.reviews].sort(
    (a, b) => scoreReviewForTime(b.text, visitTime) - scoreReviewForTime(a.text, visitTime)
  );
  const timeKeywords = TIME_REVIEW_KEYWORDS[visitTime] ?? [];
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    if (place.photoRef) {
      fetchPhoto(place.photoRef).then(u => { if (u) setPhotoUri(u); });
    } else {
      fetch(`/api/photo?placeName=${encodeURIComponent(place.name)}&city=Thanjavur`)
        .then(r => r.json())
        .then((d: { photoUri?: string }) => { if (d.photoUri) setPhotoUri(d.photoUri); })
        .catch(() => {});
    }
  }, [place.photoRef, place.name]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

      {/* ── Hero photo ──────────────────────────────────────── */}
      <div className={`${place.photoColor} rounded-2xl h-64 relative overflow-hidden`}>
        {photoUri && (
          <img src={photoUri} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h2 className="font-display font-black text-xl text-white drop-shadow leading-tight flex-1">{place.name}</h2>
            <Badge variant={place.status === 'Open' ? 'success' : place.status === 'Busy' ? 'warning' : 'danger'} dot pill>
              {place.status}
            </Badge>
          </div>
          <p className="text-xs text-white/80 flex items-center gap-1 mb-2.5">
            <MapPin className="w-3 h-3 shrink-0" /> {place.address}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span className="text-[12px] font-black text-white">{place.rating}</span>
              <span className="text-xs text-white/70">Google</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Clock className="w-3 h-3 text-white/70" />
              <span className="text-xs font-semibold text-white/90">{place.openingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Insight (full width) ──────────────────────────── */}
      <div className="rounded-lg p-3.5 border bg-brand-softer border-brand-medium">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs font-semibold text-brand">AI Insight</span>
        </div>
        <p className="text-xs text-body leading-relaxed">"{place.insight}"</p>
      </div>

      {/* ── Best Time row ────────────────────────────────────── */}
      {(place as any).bestTime && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg border" style={{ background: '#F0FDF4', borderColor: '#A7F3D0' }}>
          <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-success-strong" />
          <div>
            <span className="text-xs font-bold text-success-strong block mb-0.5">Best Time to Visit</span>
            <p className="text-xs leading-snug text-body">{(place as any).bestTime}</p>
          </div>
        </div>
      )}

      {/* ── 2-card: Visit Guide + How to Prepare ────────────── */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg p-3 flex flex-col gap-2 border bg-success-soft border-success-medium/50">
          <span className="text-xs font-semibold text-success-strong flex items-center gap-1">
            <Navigation className="w-3 h-3" /> Visit Guide
          </span>
          <p className="text-xs text-body leading-relaxed whitespace-pre-line">{place.flow}</p>
        </div>
        <div className="rounded-lg p-3 flex flex-col gap-2 border bg-warning-soft border-warning-medium">
          <span className="text-xs font-semibold flex items-center gap-1 text-food-dark">
            <Info className="w-3 h-3" /> Good to Know
          </span>
          <p className="text-xs leading-relaxed text-food-dark">{place.preparation}</p>
        </div>
      </div>

      {/* ── Avoid These ──────────────────────────────────────── */}
      {(place as any).avoidNote && (
        <div className="flex items-start gap-2 p-3 rounded-lg border bg-danger-soft border-danger-medium/50">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-danger-strong" />
          <div>
            <span className="text-xs font-bold block mb-0.5 text-danger-strong">Avoid These</span>
            <p className="text-xs leading-snug text-danger">{(place as any).avoidNote}</p>
          </div>
        </div>
      )}

      {/* ── Tags ────────────────────────────────────────────── */}
      {place.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {place.tags.map(t => (
            <span key={t} className="text-xs font-semibold bg-bg-app text-muted px-2.5 py-1 rounded-full border border-border">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* ── Reviews — most time-relevant first ─────────────── */}
      {sortedReviews.length > 0 && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 border-b border-border bg-bg-app">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span className="text-xs font-semibold text-heading">What visitors say</span>
            <span className="ml-auto text-xs font-semibold text-brand bg-brand-softer px-2 py-0.5 rounded-full">{visitTime}</span>
          </div>
          <div className="p-3">
            <ReviewCard review={sortedReviews[0]} idx={0} keywords={timeKeywords} />
          </div>
          {sortedReviews.length > 1 && (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-3 py-2 border-t border-border text-xs font-bold text-brand hover:bg-brand-softer transition-colors"
              >
                <span>{expanded ? 'Hide reviews' : `See ${sortedReviews.length - 1} more review${sortedReviews.length > 2 ? 's' : ''}`}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-2 pt-2">
                      {sortedReviews.slice(1).map((r, i) => (
                        <ReviewCard key={i} review={r} idx={i + 1} keywords={timeKeywords} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      )}

    </motion.div>
  );
}

// Thanjavur centre — default reference when no area is selected
const THANJAVUR_CENTER = { lat: 10.787, lng: 79.1378 };

const PURE_VEG_NAME_SIGNALS = ['bhavan', 'bhawan', 'saravana', 'adyar', 'brahmin', 'sweets', 'pure veg', 'veg only'];
function isPureVegPlace(p: PlaceResult): boolean {
  const name = p.name.toLowerCase();
  const tags = p.tags.join(' ').toLowerCase();
  return PURE_VEG_NAME_SIGNALS.some(s => name.includes(s) || tags.includes(s));
}

export function ResultsView({
  tab, destination, searchArea, hotels, food, itinerary, explore, apiError,
  isLoadingMore = false,
  onBack, onRegenerate, onSave, saved = false, onSwitchTab,
  backLabel, onExploreStop, isFirstItinerary = false, selectedTags = [], onCancelTag,
  pureVegFilter = false, visitTime = 'Morning',
}: ResultsViewProps) {
  const { toast } = useToast();
  const results = tab === 'Hotels' ? hotels : tab === 'Food' ? food : [];
  const refLat   = THANJAVUR_CENTER.lat;
  const refLng   = THANJAVUR_CENTER.lng;
  const refLabel = searchArea || undefined;
  const count = tab === 'Itinerary' ? itinerary?.length : tab === 'Explore' ? 1 : results?.length;

  const TAB_ACCENT: Record<string, { accent: string; accentBg: string }> = {
    Hotels:    { accent: 'var(--color-brand)', accentBg: 'var(--color-brand-softer)' },
    Food:      { accent: 'var(--color-brand)', accentBg: 'var(--color-brand-softer)' },
    Itinerary: { accent: 'var(--color-brand)', accentBg: 'var(--color-brand-softer)' },
    Explore:   { accent: 'var(--color-brand)', accentBg: 'var(--color-brand-softer)' },
  };
  const { accent, accentBg } = TAB_ACCENT[tab] ?? TAB_ACCENT.Hotels;

  const handleSave = () => { onSave(); toast('Plan saved — find it under Trips.', 'success'); };

  return (
    <div className="w-full max-w-[920px] mx-auto px-4 py-4 pb-28 lg:pb-8">

      {/* Top bar — back button + result count */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 text-muted group-hover:text-heading transition-colors" />
          <span className="text-sm font-semibold text-muted group-hover:text-heading transition-colors">Back</span>
        </button>
        <span className="shrink-0 text-xs font-bold text-brand bg-brand-softer border border-brand-soft/30 px-3 py-1.5 rounded-full">
          {destination} · {tab === 'Explore' ? 'AI guide' : `${count ?? 0} result${(count ?? 0) !== 1 ? 's' : ''}`}
        </span>
      </div>


      {/* Pure Veg active indicator — shown when filter is on */}
      {tab === 'Food' && pureVegFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3 bg-explore-soft border border-explore">
          <span className="text-sm leading-none">🟢</span>
          <span className="text-xs font-bold text-brand">Pure Veg — non-veg places are dimmed</span>
        </div>
      )}

      {/* Active tag chips — shown when hotel/food tags are applied */}
      {(tab === 'Hotels' || tab === 'Food') && selectedTags.length > 0 && onCancelTag && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: accentBg, color: accent, border: `1.5px solid ${accent}` }}
            >
              <span>{tag}</span>
              <button
                onClick={() => onCancelTag(tag)}
                className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-brand-medium transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Demo mode banner — API failed but we're showing sample fallback data */}
      {(tab === 'Hotels' || tab === 'Food') && apiError && (results?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-warning-soft border border-warning-medium/40 mb-4"
        >
          <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-warning">Demo mode — live search unavailable</p>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">Showing sample Thanjavur data. Add a valid Google Places API key in Vercel to get live results.</p>
          </div>
        </motion.div>
      )}

      {/* Empty state — no results from working API (filters too strict) */}
      {(tab === 'Hotels' || tab === 'Food') && !apiError && (results?.length ?? 0) === 0 && !isLoadingMore && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-16 px-6 gap-5 mb-5"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-bg-app border-border">
            <Info className="w-6 h-6 text-muted" />
          </div>
          <div className="space-y-1.5 max-w-xs">
            <p className="font-display font-semibold text-sm text-heading">No results match your filters</p>
            <p className="text-xs text-muted leading-relaxed">
              No places in Thanjavur matched all your selected filters. Try removing the price range, rating, or diet restriction.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-brand text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Adjust filters
          </button>
        </motion.div>
      )}

      {/* Fatal error state — API failed AND no fallback data */}
      {(tab === 'Hotels' || tab === 'Food') && apiError && (results?.length ?? 0) === 0 && !isLoadingMore && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-16 px-6 gap-5 mb-5"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-warning-soft border-warning-medium/30">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div className="space-y-1.5 max-w-xs">
            <p className="font-display font-semibold text-sm text-heading">Search unavailable</p>
            <p className="text-xs text-muted leading-relaxed">
              Could not connect to the search service. Check your API key configuration or try again.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-brand text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Adjust filters
          </button>
        </motion.div>
      )}

      {/* Results */}
      <div className={tab === 'Hotels' || tab === 'Food' ? 'flex flex-col gap-5 mb-5' : 'space-y-4 mb-5'}>
        {(tab === 'Hotels' || tab === 'Food') && results?.map((p, idx) => (
          <React.Fragment key={p.id}>
            {/* Section headers between result tiers */}
            {idx === 0 && (
              <div className="flex items-center gap-2 -mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span className="text-xs font-semibold text-brand">AI Recommended</span>
                <div className="flex-1 h-px bg-brand/20" />
              </div>
            )}
            {idx === 1 && (
              <div className="flex items-center gap-2 -mb-2">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="text-xs font-semibold text-warning-strong">Best Options</span>
                <div className="flex-1 h-px bg-warning-medium" />
              </div>
            )}
            {idx === 3 && (results?.length ?? 0) > 3 && (
              <div className="flex items-center gap-2 -mb-2">
                <Info className="w-3.5 h-3.5 text-muted" />
                <span className="text-xs font-semibold text-muted">Also Consider</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}
            <PlaceCard
              place={p}
              tab={tab}
              rank={idx + 1}
              animDelay={0}
              defaultCollapsed={true}
              selectedTags={selectedTags}
              refLat={refLat}
              refLng={refLng}
              refLabel={refLabel}
              dimmed={tab === 'Food' && pureVegFilter && !isPureVegPlace(p)}
            />
          </React.Fragment>
        ))}
        {tab === 'Itinerary' && itinerary && <ItineraryView stops={itinerary} onRegenerate={onRegenerate} onExploreStop={onExploreStop} />}
        {tab === 'Explore' && explore && <ExploreView place={explore} visitTime={visitTime} />}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {false && tab === 'Itinerary' && (
          <Button variant="outline" onClick={onRegenerate} disabled={isLoadingMore} icon={<RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />} className="flex-1">
            {isLoadingMore ? 'Regenerating…' : 'Try Different Set'}
          </Button>
        )}
        <Button onClick={handleSave} icon={saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} className="flex-1" variant={saved ? 'success' : 'outline'}>
          {saved ? 'Plan saved' : 'Save this plan'}
        </Button>
      </div>

      {/* Cross-tab nudge */}
      {onSwitchTab && (
        <div className="pt-4 mt-2 border-t border-border">
          <p className="text-xs font-normal text-muted mb-2.5 text-center">Complete your plan</p>
          <div className="grid grid-cols-2 gap-2">
            {tab === 'Hotels' && <>
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Explore nearby foods
              </button>
              <button onClick={() => onSwitchTab('Explore')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Compass className="w-3.5 h-3.5" /> Explore places
              </button>
            </>}
            {tab === 'Food' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Explore hotels
              </button>
              <button onClick={() => onSwitchTab('Explore')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Compass className="w-3.5 h-3.5" /> Explore places nearby
              </button>
            </>}
            {tab === 'Itinerary' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels
              </button>
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Find food
              </button>
            </>}
            {tab === 'Explore' && <>
              <button onClick={() => onSwitchTab('Itinerary')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Route className="w-3.5 h-3.5" /> Plan a full day
              </button>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels nearby
              </button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
