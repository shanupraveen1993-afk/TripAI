import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Star, MapPin, Clock, Navigation, Share2, Compass,
  ChevronRight, ChevronDown, Sparkles, Info, RefreshCw, Bookmark, BookmarkCheck,
  Utensils, CheckCircle, AlertTriangle, RotateCcw, Hotel, Route,
  ImageIcon, ExternalLink, Map, X, Lightbulb, DollarSign, Flame, TrendingUp, ThumbsUp,
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
import { STOPS } from '../itineraryPreset';

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
    return <img src={uri} alt={`${stopName}, Thanjavur`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />;
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
        <img src={photoUri} alt={`${name}, Thanjavur`} loading="lazy" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${color} flex items-center justify-center overflow-hidden relative`}>
      {loading && (
        <span role="status" aria-label="Loading photo" className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin absolute" />
      )}
      <span className="text-2xl font-black text-white/70 uppercase tracking-widest drop-shadow">
        {name.charAt(0)}
      </span>
      {photoRef && !autoLoad && (
        <button
          onClick={loadPhoto}
          disabled={loading}
          aria-label="Load photo"
          className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 hover:bg-white text-xs font-semibold px-2 py-1 rounded-lg shadow transition-all min-h-[44px]"
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
  'var(--color-brand)', 'var(--color-brand-strong)', '#0891B2',
  'var(--color-success)', 'var(--color-danger)', '#6366F1',
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
                <Star key={i} className={`w-2.5 h-2.5 ${i < review.stars ? 'fill-warning-strong text-warning-strong' : 'text-border'}`} />
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
          <ExternalLink className="w-3.5 h-3.5" />Book
        </a>
        <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-border text-muted hover:border-brand hover:text-brand transition-colors active:scale-[0.97]">
          <Map className="w-3.5 h-3.5" />Map
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
  const ratingColor = place.rating >= 4.5 ? 'var(--color-success-strong)' : place.rating >= 4.0 ? 'var(--color-brand)' : place.rating >= 3.5 ? 'var(--color-warning-strong)' : 'var(--color-danger-strong)';
  const ratingLabel = place.rating >= 4.5 ? 'Excellent' : place.rating >= 4.0 ? 'Very Good' : place.rating >= 3.5 ? 'Good' : 'Fair';
  const recentRatingsArr = place.recentRatings ?? [];
  const recentAvgMain = recentRatingsArr.length > 0
    ? +(recentRatingsArr.reduce((s: number, r: number) => s + r, 0) / recentRatingsArr.length).toFixed(1)
    : null;
  const trendColorMain = place.trendVerdict === 'improving' ? 'var(--color-success-strong)' : place.trendVerdict === 'declining' ? 'var(--color-warning-strong)' : 'var(--color-muted)';
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
      className="bg-surface border border-card-border rounded-xl shadow-sm card-hover overflow-hidden"
      style={dimmed ? { opacity: 0.35, filter: 'grayscale(0.7)', pointerEvents: 'none', transition: 'opacity 0.3s, filter 0.3s' } : undefined}
    >

      {/* ══ MOBILE CARD LAYOUT (< sm) ══ */}
      <div className="sm:hidden flex flex-col">

        {/* Row 1: Photo + Info — tap anywhere to expand */}
        <div className="flex min-h-[110px] cursor-pointer" onClick={() => setExpanded(v => !v)}>

          {/* Col 1: Photo */}
          <div className="w-[90px] shrink-0 relative">
            <div className="absolute inset-0">
              <PlacePhoto
                color={place.photoColor}
                name={place.name}
                photoRef={place.photoRef ?? null}
                autoLoad={rank === 1}
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggleBookmark(); }}
              aria-label={bookmarked ? 'Remove from saved' : 'Save this place'}
              className="absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/50 z-10 active:scale-90 transition-transform"
            >
              {bookmarked
                ? <BookmarkCheck className="w-3.5 h-3.5 text-white" />
                : <Bookmark className="w-3.5 h-3.5 text-white" />
              }
            </button>
            <span className={`absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1 py-0.5 rounded-full text-xs font-semibold leading-none ${place.openNow ? 'bg-success/90 text-white' : 'bg-black/60 text-white/80'}`}>
              <span className={`w-1 h-1 rounded-full shrink-0 ${place.openNow ? 'bg-white' : 'bg-white/60'}`} />
              {place.openNow ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Col 2: Info */}
          <div className="flex-1 min-w-0 px-2.5 py-2 flex flex-col gap-1">
            <div className="flex items-baseline gap-1 flex-wrap">
              <h3 className="font-display font-bold text-sm text-heading leading-snug line-clamp-1" title={place.name}>{place.name}</h3>
              {selectedTags.length > 0 && place.matchScore !== undefined && (
                <span className={`text-xs font-bold shrink-0 ${place.matchScore >= 80 ? 'text-success-strong' : place.matchScore >= 55 ? 'text-brand' : 'text-muted'}`}>
                  {place.matchScore}% match
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(place.rating) ? 'fill-warning-strong text-warning-strong' : i < place.rating ? 'fill-warning-medium text-warning-medium' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-xs text-muted ml-0.5">(<span className="tabular-nums">{place.reviewCount.toLocaleString()}</span>)</span>
            </div>
            {(confirmed.length > 0 || unconfirmed.length > 0) && (
              <div className="flex gap-1 flex-wrap">
                {confirmed.slice(0, 2).map((t, i) => (
                  <span key={t} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium border ${
                    i === 0
                      ? 'bg-success text-white border-success'
                      : 'bg-success-soft border-success-medium text-success-strong'
                  }`}>
                    <CheckCircle className="w-2 h-2" />{t}
                  </span>
                ))}
                {unconfirmed.slice(0, 1).map(t => (
                  <span key={t} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium border bg-bg-app border-border-medium text-muted">~{t}</span>
                ))}
              </div>
            )}
            {/* Latest Sentiment mini */}
            {(() => {
              function agoToDaysCo(ago: string): number {
                const m = ago.match(/(\d+)\s+(day|week|month)/);
                if (!m) return 0;
                const n = parseInt(m[1], 10);
                return m[2] === 'day' ? n : m[2] === 'week' ? n * 7 : n * 30;
              }
              const sorted2 = [...place.reviews].sort((a, b) => agoToDaysCo(a.ago) - agoToDaysCo(b.ago));
              const last15 = sorted2.slice(0, 15);
              if (last15.length === 0 && !place.trendReason) return null;
              const posCount = last15.filter(r => r.stars >= 4).length;
              const negCount = last15.filter(r => r.stars <= 2).length;
              const isUp = place.trendVerdict === 'improving';
              const isDown = place.trendVerdict === 'declining';
              const verdict = isUp ? 'Guests Love It' : isDown ? 'Mixed Feedback' : 'Reliable Pick';
              const sentimentMsg = place.trendReason
                ? place.trendReason
                : isUp
                ? `${posCount} of last ${last15.length} reviews are 4★+`
                : isDown
                ? `${negCount} of last ${last15.length} flag concerns`
                : `Recent visitors steady — no major shifts.`;
              return (
                <div className={`rounded-lg px-2 py-1.5 border ${isUp ? 'bg-success-soft border-success-medium/40' : isDown ? 'bg-warning-soft border-warning-medium/40' : 'bg-brand-softer border-brand-soft'}`}>
                  <p className={`text-xs font-bold leading-none mb-0.5 ${isUp ? 'text-success-strong' : isDown ? 'text-warning-strong' : 'text-brand'}`}>{verdict}</p>
                  <p className="text-xs leading-snug text-body">{sentimentMsg}</p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Row 2: Full-width CTA buttons */}
        {(() => {
          const ctaLockedM = selectedTags.length === 0;
          return (
            <div className="border-t border-border">
              {ctaLockedM ? (
                <div className="flex flex-col gap-1.5 px-3 py-2">
                  <div className="flex gap-2">
                    {tab === 'Hotels' && (
                      <button
                        onClick={() => toast('Select a filter tag above to unlock Map & Booking', 'info')}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border border-border text-muted bg-bg-app active:scale-[0.97]"
                      >
                        <Map className="w-3.5 h-3.5 shrink-0" />Map
                      </button>
                    )}
                    <button
                      onClick={() => toast('Select a filter tag above to unlock Map & Booking', 'info')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold active:scale-[0.97] ${tab === 'Hotels' ? 'bg-brand/25 text-brand/70' : 'bg-success/25 text-success/70'}`}
                    >
                      {tab === 'Hotels' ? <><ExternalLink className="w-3.5 h-3.5 shrink-0" />Book Now</> : <><Navigation className="w-3.5 h-3.5 shrink-0" />Directions</>}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-softer border border-brand-soft/40">
                    <Info className="w-3 h-3 text-brand shrink-0" />
                    <p className="text-xs text-brand font-semibold">Select a tag or filter to unlock</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 px-3 py-2">
                  {tab === 'Hotels' && (
                    <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border border-border text-body active:scale-[0.97]">
                      <Map className="w-3.5 h-3.5 shrink-0" />Map
                    </a>
                  )}
                  {tab === 'Hotels' && (
                    <a href={place.websiteUri ?? `https://www.booking.com/search.html?ss=${encodeURIComponent(place.name + ' Thanjavur')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold bg-brand text-white active:scale-[0.97] shadow-sm">
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />Book Now
                    </a>
                  )}
                  {tab === 'Food' && (
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold bg-success text-white active:scale-[0.97] shadow-sm">
                      <Navigation className="w-3.5 h-3.5 shrink-0" />Directions
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* Row 3: Detailed Analysis toggle */}
        <div className="border-t border-border">
          <button onClick={() => setExpanded(v => !v)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-brand active:scale-[0.97] min-h-[44px]">
            <Sparkles className="w-3 h-3 shrink-0" />
            Detailed Analysis
            <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
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
              photoRef={place.photoRef ?? null}
              autoLoad={rank === 1}
            />
          </div>
          <button
            onClick={toggleBookmark}
            aria-label={bookmarked ? 'Remove from saved' : 'Save this place'}
            className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 z-10 hover:bg-black/70 active:scale-90 transition-all"
          >
            {bookmarked
              ? <BookmarkCheck className="w-4 h-4 text-white" />
              : <Bookmark className="w-4 h-4 text-white" />
            }
          </button>
          {/* Open/Closed — top right */}
          <span className={`absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-semibold leading-none ${place.openNow ? 'bg-success/90 text-white' : 'bg-black/60 text-white/80'}`}>
            <span className={`w-1 h-1 rounded-full shrink-0 ${place.openNow ? 'bg-white' : 'bg-white/60'}`} />
            {place.openNow ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Col 2: Info */}
        <div className="flex-1 min-w-0 px-2.5 py-2.5 flex flex-col gap-1.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <h3 className="font-display font-bold text-sm text-heading leading-snug line-clamp-1" title={place.name}>{place.name}</h3>
            {selectedTags.length > 0 && place.matchScore !== undefined && (
              <span className={`text-xs font-bold shrink-0 ${place.matchScore >= 80 ? 'text-success-strong' : place.matchScore >= 55 ? 'text-brand' : 'text-muted'}`}>
                {place.matchScore}% match
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(place.rating) ? 'fill-warning-strong text-warning-strong' : i < place.rating ? 'fill-warning-medium text-warning-medium' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-xs text-muted ml-0.5">(<span className="tabular-nums">{place.reviewCount.toLocaleString()}</span>)</span>
          </div>
          {(confirmed.length > 0 || unconfirmed.length > 0) && (
            <div className="flex gap-1 flex-wrap">
              {confirmed.slice(0, 2).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border bg-success-soft border-success-medium text-success-strong">
                  <CheckCircle className="w-2.5 h-2.5" />{t}
                </span>
              ))}
              {unconfirmed.slice(0, 1).map(t => (
                <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border bg-bg-app border-border-medium text-muted">
                  ~{t}
                </span>
              ))}
            </div>
          )}
          {/* Latest Sentiment mini — inline in L1 card */}
          {(() => {
            function agoToDaysCo(ago: string): number {
              const m = ago.match(/(\d+)\s+(day|week|month)/);
              if (!m) return 0;
              const n = parseInt(m[1], 10);
              return m[2] === 'day' ? n : m[2] === 'week' ? n * 7 : n * 30;
            }
            const sorted2 = [...place.reviews].sort((a, b) => agoToDaysCo(a.ago) - agoToDaysCo(b.ago));
            const last15 = sorted2.slice(0, 15);
            if (last15.length === 0 && !place.trendReason) return null;
            const posCount = last15.filter(r => r.stars >= 4).length;
            const negCount = last15.filter(r => r.stars <= 2).length;
            const isUp = place.trendVerdict === 'improving';
            const isDown = place.trendVerdict === 'declining';
            const verdict = isUp ? 'Guests Love It' : isDown ? 'Mixed Feedback' : 'Reliable Pick';
            const sentimentMsg = place.trendReason
              ? place.trendReason
              : isUp
              ? `${posCount} of last ${last15.length} reviews are 4★+ — guests consistently happy.`
              : isDown
              ? `${negCount} of last ${last15.length} reviews flag concerns — check before booking.`
              : `Recent visitors are steady — no major shifts in guest experience.`;
            return (
              <div className={`rounded-lg px-2.5 py-2 border ${isUp ? 'bg-success-soft border-success-medium/40' : isDown ? 'bg-warning-soft border-warning-medium/40' : 'bg-brand-softer border-brand-soft'}`}>
                <p className={`text-xs font-bold leading-none mb-1 ${isUp ? 'text-success-strong' : isDown ? 'text-warning-strong' : 'text-brand'}`}>{verdict}</p>
                <p className="text-xs leading-snug text-body">{sentimentMsg}</p>
              </div>
            );
          })()}
        </div>

        {/* Col 3: Buttons */}
        {(() => {
          const ctaLocked = selectedTags.length === 0;
          return (
            <div className="w-[220px] shrink-0 flex flex-col items-stretch justify-between px-3 py-3">
              <div className="flex flex-col gap-2">
                {ctaLocked ? (
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => toast('Select a filter tag above to unlock Map & Booking', 'info')}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border border-border text-muted bg-bg-app active:scale-[0.97]"
                    >
                      <Map className="w-3.5 h-3.5 shrink-0" />Map
                    </button>
                    <button
                      onClick={() => toast('Select a filter tag above to unlock Map & Booking', 'info')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold active:scale-[0.97] ${tab === 'Hotels' ? 'bg-brand/25 text-brand/70' : 'bg-success/25 text-success/70'}`}
                    >
                      {tab === 'Hotels' ? <><ExternalLink className="w-3.5 h-3.5 shrink-0" />Book</> : <><Navigation className="w-3.5 h-3.5 shrink-0" />Directions</>}
                    </button>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-brand-softer border border-brand-soft/40">
                      <Info className="w-2.5 h-2.5 text-brand shrink-0" />
                      <p className="text-xs text-brand font-semibold leading-snug">Select a tag to unlock</p>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
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
          );
        })()}

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
            <div className="border-t border-border divide-y divide-border">

              {/* ── CARD 1: Why This Fits ── */}
              {!!(place.aiDetail?.dataPoints?.length || place.reviewCount) && (
                <div className="px-3 py-3 bg-brand-softer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-brand-soft flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-brand" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-brand">Why This Fits</span>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-2">
                    {(() => {
                      const pct = place.rating > 0 ? Math.round(((place.rating - 1) / 4) * 100) : null;
                      return pct !== null ? (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-brand-medium/40">
                          <ThumbsUp className="w-3.5 h-3.5 text-brand shrink-0" />
                          <span className="text-xs font-semibold text-heading">
                            {pct}% of guests rated 4★ or higher
                          </span>
                        </div>
                      ) : null;
                    })()}
                    {place.aiDetail?.dataPoints?.[0] && (
                      <div className="flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-brand-medium/40">
                        <Sparkles className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-heading leading-snug">{place.aiDetail.dataPoints[0]}</span>
                      </div>
                    )}
                  </div>
                  {(() => {
                    const stopWords = new Set(['the','a','an','is','it','was','were','are','for','to','of','in','at','on','and','or','but','with','from','very','good','great','nice','this','that','we','our','my','me','had','has','have','been','be','by','as','so','no','not','all','one','here','there','when','which','who','what','how','more','also','well','just','than','about','up','out','they','their','hotel','room','rooms','stay','place','i']);
                    const wordCount: Record<string, number> = {};
                    place.reviews.filter(r => r.stars >= 4).forEach(r => {
                      r.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
                        .filter(w => w.length >= 4 && !stopWords.has(w))
                        .forEach(w => { wordCount[w] = (wordCount[w] || 0) + 1; });
                    });
                    const topKws = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));
                    if (topKws.length < 3) return null;
                    return (
                      <div className="flex flex-wrap gap-1">
                        {topKws.map(kw => (
                          <span key={kw} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-soft text-brand border border-brand-medium/40">{kw}</span>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ── CARD 3: What to Be Aware Of ── */}
              {(place.aiDetail?.caveat || (place as any).cautionNote) && (
                <div className="px-3 py-3 bg-warning-soft">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-warning-soft flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning-strong" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-warning-strong">What to Be Aware Of</span>
                  </div>
                  <p className="text-xs text-body leading-relaxed">
                    {place.aiDetail?.caveat || (place as any).cautionNote}
                  </p>
                </div>
              )}

              {/* ── CARD 4: What Guests Say (tag-matched, highlighted) ── */}
              {(() => {
                function agoToDays(ago: string): number {
                  const m = ago.match(/(\d+)\s+(day|week|month)/);
                  if (!m) return 0;
                  const n = parseInt(m[1], 10);
                  return m[2] === 'day' ? n : m[2] === 'week' ? n * 7 : n * 30;
                }
                const kws = [...reviewKeywords, ...(place.matchedKeyword ? [place.matchedKeyword] : [])];
                const candidates = place.reviews
                  .map(r => ({
                    r,
                    days: agoToDays(r.ago),
                    hits: kws.filter(k => r.text.toLowerCase().includes(k.toLowerCase())).length,
                  }))
                  .filter(x => x.r.stars >= 4)
                  .sort((a, b) => b.hits - a.hits || a.days - b.days);

                // Review 1: best keyword match (any age), 4★+
                const review1 = candidates[0] ?? null;

                // Review 2: recent (15–60 days) with keyword hit preferred; never pick a zero-hit fallback if a hit exists
                const others        = candidates.filter(x => x.r !== review1?.r);
                const withHits      = others.filter(x => x.hits > 0);
                const recentHit     = withHits.filter(x => x.days >= 15 && x.days <= 150);
                const anyHit        = withHits;
                const recentNoHit   = others.filter(x => x.days >= 15 && x.days <= 150);
                const review2 = (recentHit[0] ?? anyHit[0] ?? recentNoHit[0] ?? others[0]) ?? null;

                const scored = [review1, review2].filter(Boolean) as typeof candidates;
                if (scored.length === 0) return null;
                return (
                  <div className="px-3 py-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-warning-strong text-warning-strong" />
                        <span className="text-sm font-bold text-heading">{place.rating}★</span>
                        <span className="text-xs text-muted">(<span className="tabular-nums">{place.reviewCount.toLocaleString()}</span>)</span>
                      </div>
                      {place.googleMapsUri && (
                        <a href={place.googleMapsUri} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-bold text-brand flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />Explore all reviews
                        </a>
                      )}
                    </div>
                    <div className="space-y-2.5">
                      {scored.map(({ r }, i) => (
                        <div key={i} className="bg-surface border border-card-border rounded-lg p-2.5 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white"
                              style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                              {r.author.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold text-heading">{r.author}</span>
                            <span className="text-xs text-muted">· {r.location}</span>
                            <div className="ml-auto flex items-center gap-1 shrink-0">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star key={j} className={`w-2.5 h-2.5 ${j < r.stars ? 'fill-warning-strong text-warning-strong' : 'text-border'}`} />
                                ))}
                              </div>
                              {r.stars === 5 && <span className="text-xs font-semibold text-success-strong bg-success-soft px-1.5 py-0.5 rounded-full border border-success-medium/30">✓ Loved it</span>}
                              {r.stars === 4 && <span className="text-xs font-semibold text-warning-strong bg-warning-soft px-1.5 py-0.5 rounded-full border border-warning-medium/40">✓ Liked it</span>}
                            </div>
                          </div>
                          <p className="text-xs text-body leading-relaxed line-clamp-3">
                            "{highlightKeywords(r.text, [...(r.highlight ? [r.highlight] : []), ...kws])}"
                          </p>
                          <p className="text-xs text-muted">{r.ago} · via Google</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ── CARD 5: Insider Tip (if available) ── */}
              {place.aiDetail?.insiderTip && (
                <div className="px-3 py-3 bg-brand-softer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-3.5 h-3.5 text-brand" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-brand">Insider Tip</span>
                  </div>
                  <p className="text-xs text-body leading-relaxed">{place.aiDetail.insiderTip}</p>
                </div>
              )}

              {/* ── Share + Save ── */}
              <div className="px-3 py-3 border-t border-border flex gap-2">
                <button
                  onClick={share}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-muted border border-border rounded-lg hover:border-brand hover:text-brand transition-colors active:scale-[0.97]"
                >
                  <Share2 className="w-3.5 h-3.5" />Share
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg border transition-colors active:scale-[0.97] ${bookmarked ? 'bg-brand-softer border-brand-soft text-brand' : 'border-border text-muted hover:border-brand hover:text-brand'}`}
                >
                  {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );

  // suppress unused-var warnings for state vars no longer used in JSX
  void cardCollapsed; void setCardCollapsed; void showNearby; void setShowNearby; void openAiRow; void setOpenAiRow; void actionButtons; void showAnalysis; void setShowAnalysis;
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
function getTravelMode(leg: string): { emoji: React.ReactNode; bg: string; color: string } {
  const l = leg.toLowerCase();
  if (l.includes('walk'))  return { emoji: <><span aria-hidden="true">🚶</span><span className="sr-only">Walk</span></>, bg: 'var(--color-success-soft)',  color: 'var(--color-success)' };
  if (l.includes('metro')) return { emoji: <><span aria-hidden="true">🚇</span><span className="sr-only">Metro</span></>, bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  if (l.includes('bus'))   return { emoji: <><span aria-hidden="true">🚌</span><span className="sr-only">Bus</span></>, bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  if (l.includes('auto'))  return { emoji: <><span aria-hidden="true">🛺</span><span className="sr-only">Auto</span></>, bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
  return                          { emoji: <><span aria-hidden="true">🚗</span><span className="sr-only">Car</span></>, bg: 'var(--color-brand-softer)',  color: 'var(--color-brand)' };
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
      <div className="mb-4 rounded-xl bg-surface border border-card-border shadow-sm overflow-hidden">
        {/* Single compact header row */}
        <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Route className="w-3.5 h-3.5 text-brand shrink-0" />
            <span className="text-sm font-bold text-heading whitespace-nowrap">Day Plan</span>
            <span className="text-xs text-muted whitespace-nowrap">· {stops.length} stops</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span>{wx.emoji} <span className="font-semibold text-body">{wx.temp}</span></span>
            <span className="w-px h-3 bg-border" />
            <span className="font-semibold" style={{ color: crowdStyle.text }}>{worstCrowd} crowd</span>
            <span className="w-px h-3 bg-border" />
            <span className="font-bold text-brand">{stops[0]?.time} – {stops[stops.length - 1]?.time}</span>
          </div>
        </div>

        {/* Timeline — scrollable, number + time only */}
        <div className="overflow-x-auto no-scrollbar px-4 py-4">
          <div className="flex items-center" style={{ minWidth: `${stops.length * 56 + (stops.length - 1) * 52}px` }}>
            {stops.map((stop, idx) => {
              const isLast = idx === stops.length - 1;
              const travelMin = stop.travelToNext?.match(/\d+\s*min/)?.[0] ?? '';
              return (
                <React.Fragment key={idx}>
                  {/* Stop node: circle + time */}
                  <button
                    type="button"
                    onClick={() => document.getElementById(`itin-stop-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none group"
                    style={{ width: 56 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base shadow-sm ring-2 ring-white transition-transform group-hover:scale-110 group-active:scale-95"
                      style={{ background: 'linear-gradient(135deg,var(--color-brand),var(--color-brand-active))', color: '#fff' }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[10px] font-semibold text-muted whitespace-nowrap">{stop.time}</span>
                  </button>

                  {/* Connector: line + travel time */}
                  {!isLast && (
                    <div className="flex-1 flex flex-col items-center gap-1" style={{ minWidth: 52 }}>
                      {travelMin && (
                        <span className="text-[10px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded-full"
                          style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] + '20', color: TRAFFIC_LINE_BG[stop.currentTraffic] }}>
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
                className="rounded-xl overflow-hidden border border-card-border shadow-sm"
              >
                {/* ── Photo zone ──────────────────────────── */}
                <div className="relative h-[185px]">
                  <ItineraryPhoto
                    stopName={stop.stop}
                    photoRef={(stop as any).photoRef}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

                  {/* Top: stop# + time + duration + explore arrow */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    <span className="bg-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm leading-none text-brand">
                      Place {idx + 1}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        type="button"
                        aria-label={`Explore ${stop.stop}`}
                        onClick={() => onExploreStop?.(stop.stop)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/35 transition-colors rounded-full p-1 leading-none"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                      <span className="bg-black/55 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full leading-none">
                        {stop.time}
                      </span>
                      {stop.duration && (
                        <span className="bg-black/55 backdrop-blur-sm text-white/80 text-xs font-semibold px-2 py-0.5 rounded-full leading-none">
                          <span aria-hidden="true">⏱</span> {stop.duration}
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
                          <span aria-hidden="true">🎟</span> {stop.entryFee}
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
                    {(() => {
                      const isFirst = idx === 0;
                      const enc = (s: string) => encodeURIComponent(s + ', Thanjavur');
                      const url = isFirst
                        ? `https://www.google.com/maps/dir/?api=1&destination=${enc(stop.stop)}&travelmode=driving`
                        : `https://www.google.com/maps/dir/?api=1&origin=${enc(displayStops[idx - 1].stop)}&destination=${enc(stop.stop)}&travelmode=driving`;
                      return (
                        <button
                          type="button"
                          onClick={() => window.open(url, '_blank', 'noopener')}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                          style={{ background: 'var(--color-brand)' }}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          {isFirst ? 'Start Here' : 'Get Directions'}
                        </button>
                      );
                    })()}
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

                      {/* Timing & Crowd / Good to Know — tab switcher */}
                      <StopInfoTabs stop={stop} crowd={crowd} />

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
                          .filter(r => r.stars >= 4 && r.text)
                          .sort((a, b) => scoreReviewForTime(b.text, 'Morning') - scoreReviewForTime(a.text, 'Morning'))
                          .slice(0, 2);
                        if (!displayed.length) return null;
                        return (
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-muted flex items-center gap-1">
                              <Star className="w-3 h-3 fill-warning-strong text-warning-strong" /> Visitor Reviews
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
                            <span className="text-xs font-bold text-body">Next place: </span>
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
                    <div className="w-8 h-8 rounded-full bg-success/15 border-2 border-success flex items-center justify-center text-sm"><span aria-hidden="true">🏁</span></div>
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

const EXPLORE_TABS = ['Overview', 'Plan', 'Reviews'] as const;
type ExploreTab = typeof EXPLORE_TABS[number];

function ExploreView({ place, visitTime = 'Morning' }: { place: ExploreResult; visitTime?: string }) {
  const [activeTab, setActiveTab] = useState<ExploreTab>('Overview');
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
      <div className={`${place.photoColor} rounded-2xl h-56 relative overflow-hidden`}>
        {photoUri && (
          <img src={photoUri} alt={`${place.name}, Thanjavur`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
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
              <Star className="w-3 h-3 fill-warning-strong text-warning-strong" />
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

      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className="flex gap-1 bg-bg-app rounded-xl p-1 border border-border" role="tablist">
        {EXPLORE_TABS.map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={activeTab === t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === t
                ? 'bg-brand text-white shadow-sm'
                : 'text-muted hover:text-heading hover:bg-border/30'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab panels ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {activeTab === 'Overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="space-y-3">

            {/* AI Insight */}
            <div className="rounded-lg p-3.5 border bg-brand-softer border-brand-medium">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span className="text-xs font-semibold text-brand">AI Insight</span>
              </div>
              <p className="text-xs text-body leading-relaxed">"{place.insight}"</p>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-surface p-3 flex flex-col gap-1">
                <span className="text-xs text-muted font-medium">Google Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-warning-strong text-warning-strong" />
                  <span className="text-base font-black text-heading">{place.rating}</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3 flex flex-col gap-1">
                <span className="text-xs text-muted font-medium">Hours</span>
                <span className="text-xs font-bold text-heading leading-snug">{place.openingHours}</span>
              </div>
            </div>

            {/* Tags */}
            {place.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {place.tags.map(t => (
                  <span key={t} className="text-xs font-semibold bg-brand-softer text-brand px-2.5 py-1 rounded-full border border-brand-medium/40">
                    {t}
                  </span>
                ))}
              </div>
            )}

          </motion.div>
        )}

        {activeTab === 'Plan' && (
          <motion.div key="plan" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="space-y-3">

            {/* Best Time */}
            {(place as any).bestTime && (
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-brand-softer border-brand-medium/40">
                <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-brand" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand block mb-0.5">Best Time to Visit</span>
                  <p className="text-xs leading-snug text-body">{(place as any).bestTime}</p>
                </div>
              </div>
            )}

            {/* Visit Guide */}
            <div className="rounded-lg border border-success-medium/50 bg-success-soft p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-success/15 flex items-center justify-center shrink-0">
                  <Navigation className="w-3 h-3 text-success-strong" />
                </div>
                <span className="text-xs font-bold text-success-strong">Visit Guide</span>
              </div>
              <p className="text-xs text-body leading-relaxed whitespace-pre-line">{place.flow}</p>
            </div>

            {/* Good to Know */}
            <div className="rounded-lg border border-warning-medium bg-warning-soft p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-warning/15 flex items-center justify-center shrink-0">
                  <Info className="w-3 h-3 text-muted" />
                </div>
                <span className="text-xs font-bold text-muted">Good to Know</span>
              </div>
              <p className="text-xs text-body leading-relaxed">{place.preparation}</p>
            </div>

            {/* Avoid These */}
            {(place as any).avoidNote && (
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-danger-soft border-danger-medium/50">
                <div className="w-7 h-7 rounded-lg bg-danger/15 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-danger-strong" />
                </div>
                <div>
                  <span className="text-xs font-bold block mb-0.5 text-danger-strong">Avoid These</span>
                  <p className="text-xs leading-snug text-danger">{(place as any).avoidNote}</p>
                </div>
              </div>
            )}

          </motion.div>
        )}

        {activeTab === 'Reviews' && (
          <motion.div key="reviews" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="space-y-2">

            {sortedReviews.length === 0 ? (
              <p className="text-xs text-muted text-center py-6">No reviews available yet.</p>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-3 h-3 fill-warning-strong text-warning-strong" />
                  <span className="text-xs font-semibold text-heading">What visitors say</span>
                  <span className="ml-auto text-xs font-semibold text-brand bg-brand-softer px-2 py-0.5 rounded-full border border-brand-medium/40">{visitTime}</span>
                </div>
                {sortedReviews.map((r, i) => (
                  <ReviewCard key={i} review={r} idx={i} keywords={timeKeywords} />
                ))}
              </>
            )}

          </motion.div>
        )}

      </AnimatePresence>

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

function StopInfoTabs({
  stop, crowd,
}: {
  stop: any;
  crowd: { bg: string; text: string; dot: string } | null;
}) {
  return (
    <div className="-mx-3.5 space-y-px">
      {/* Timing & Crowd */}
      <div className="px-3.5 py-3 bg-brand-softer">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-md bg-brand-soft flex items-center justify-center shrink-0">
            <Clock className="w-3 h-3 text-brand" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-brand">Timing &amp; Crowd</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-body">
          <span className="flex items-center gap-1">
            <span aria-hidden="true">🕐</span>
            <span className="font-semibold">{stop.time}</span>
            {stop.departBy && <span className="text-muted">→ {stop.departBy}</span>}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true">⏱</span>
            <span className="font-semibold">{stop.duration ?? '1–2 hrs'}</span>
          </span>
          {stop.entryFee && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true">🎟</span>
              <span className="font-semibold">{stop.entryFee}</span>
            </span>
          )}
          {crowd && stop.crowdLevel && (
            <span className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${crowd.bg} ${crowd.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${crowd.dot}`} />
              {stop.crowdLevel} crowd
            </span>
          )}
        </div>
      </div>

      {/* Good to Know */}
      <div className="px-3.5 py-3 bg-warning-soft">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-md bg-warning-soft flex items-center justify-center shrink-0">
            <Info className="w-3 h-3 text-warning-strong" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-warning-strong">Good to Know</span>
        </div>
        <p className="text-xs text-body leading-relaxed">
          {stop.cautionNote || stop.reachNote || 'Plan to arrive a few minutes before your scheduled time.'}
        </p>
      </div>
    </div>
  );
}

function resolveStopCoords(stopName: string): { lat: number; lng: number } | null {
  const lower = stopName.toLowerCase();
  for (const stop of Object.values(STOPS)) {
    if (lower.includes(stop.label.toLowerCase()) || stop.aliases.some(a => lower.includes(a))) {
      return { lat: stop.lat, lng: stop.lng };
    }
  }
  return null;
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
          {destination} · {tab === 'Explore' ? 'AI guide' : tab === 'Itinerary' ? `${count ?? 0} place${(count ?? 0) !== 1 ? 's' : ''}` : `${count ?? 0} result${(count ?? 0) !== 1 ? 's' : ''}`}
        </span>
      </div>


      {/* Pure Veg active indicator — shown when filter is on */}
      {tab === 'Food' && pureVegFilter && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3 bg-brand-softer border border-brand-medium">
          <span role="img" aria-label="Active" className="text-sm leading-none">🟢</span>
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

      {/* Demo mode banner — Hotels/Food API failed, showing sample fallback */}
      {(tab === 'Hotels' || tab === 'Food') && apiError && (results?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-warning-soft border border-warning-medium/40 mb-4"
        >
          <AlertTriangle className="w-4 h-4 text-warning-strong shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-warning-strong">Demo mode — live search unavailable</p>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">Showing sample Thanjavur data. Add a valid Google Places API key in Vercel to get live results.</p>
          </div>
        </motion.div>
      )}

      {/* Demo mode banner — Itinerary AI failed, showing sample fallback */}
      {tab === 'Itinerary' && apiError && (itinerary?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-warning-soft border border-warning-medium/40 mb-4"
        >
          <AlertTriangle className="w-4 h-4 text-warning-strong shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-warning-strong">Sample itinerary — AI planner unavailable</p>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">Showing a curated Thanjavur day plan. Configure your API key to generate a personalised live itinerary.</p>
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
            <Info className="w-8 h-8 text-muted" />
          </div>
          <div className="space-y-1.5 max-w-xs">
            <p className="font-semibold text-sm text-heading">No results match your filters</p>
            <p className="text-xs text-muted leading-relaxed">
              No places in Thanjavur matched all your selected filters. Try removing the price range, rating, or diet restriction.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-strong text-white text-sm font-semibold rounded-lg transition-colors duration-150"
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
            <AlertTriangle className="w-6 h-6 text-warning-strong" />
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
                <Star className="w-3.5 h-3.5 text-warning-strong fill-warning-strong" />
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
        {tab === 'Explore' && !explore && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16 px-6 gap-5"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-brand-softer border-brand-medium/40">
              <Compass className="w-7 h-7 text-brand" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <p className="font-display font-semibold text-sm text-heading">Guide unavailable</p>
              <p className="text-xs text-muted leading-relaxed">
                Could not load the explore guide for this location. Try selecting a different spot or check back shortly.
              </p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-brand text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Pick another spot
            </button>
          </motion.div>
        )}
      </div>

      {/* End-of-results marker */}
      {(tab === 'Hotels' || tab === 'Food') && (results?.length ?? 0) > 0 && (
        <div className="flex items-center gap-3 py-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted shrink-0">
            Showing all {results!.length} result{results!.length !== 1 ? 's' : ''} for {destination}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
      )}

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
