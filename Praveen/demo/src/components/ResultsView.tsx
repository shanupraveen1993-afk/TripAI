import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Star, MapPin, Clock, Navigation, Share2, Compass,
  ChevronRight, ChevronDown, Sparkles, Info, RefreshCw, Bookmark, BookmarkCheck,
  Utensils, CheckCircle, AlertTriangle, RotateCcw, Hotel, Route,
  TrendingUp, TrendingDown, Minus, ImageIcon, ExternalLink, Map,
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
} | LiveItineraryStop;
import { fetchPhoto } from '../api/client';
import { useToast } from './ui/Toast';
import { PlaceCardSkeleton } from './ui/Skeleton';

interface ResultsViewProps {
  tab: Tab;
  destination: string;
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
}

/* ── Best restaurants near Thanjavur hotels ──────────────────────────── */
const NEARBY_RESTAURANTS = [
  { name: 'Sri Venkatramana Bhavan', dist: '0.4km', stars: 4.6, price: '₹',   cuisine: 'South Indian', dietVeg: true,  aiNote: 'Classic Thanjavur thali — banana-leaf meals, quick service, best before noon.' },
  { name: 'Hotel Sathars',           dist: '0.9km', stars: 4.4, price: '₹',   cuisine: 'Biryani',      dietVeg: false, aiNote: 'Famous Ambur-style biryani — rice portions are generous, busy at lunch hours.' },
  { name: 'Chola Mess',              dist: '1.3km', stars: 4.5, price: '₹',   cuisine: 'Chola Cuisine',dietVeg: true,  aiNote: 'Authentic Chola-era recipes — try the paal paniyaram and koozh for a heritage food experience.' },
  { name: 'Bombay Bakes',            dist: '1.8km', stars: 4.2, price: '₹₹',  cuisine: 'Bakery & Café',dietVeg: true,  aiNote: 'Best filter coffee in central Thanjavur — ideal breakfast stop before Big Temple visit.' },
  { name: 'Hotel Ramnath',           dist: '2.4km', stars: 4.3, price: '₹',   cuisine: 'South Indian', dietVeg: false, aiNote: 'Reliable local favourite — chicken curry and parotta combo is a crowd staple.' },
];

/* ── Traffic styling ─────────────────────────────────────────────────── */
const TRAFFIC_LINE_BG: Record<TrafficLevel, string> = {
  Light:    '#22C55E',
  Moderate: '#F59E0B',
  Heavy:    '#EF4444',
};

const TRAFFIC_BADGE: Record<TrafficLevel, { bg: string; text: string; dot: string; border: string }> = {
  Light:    { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500',  border: 'border-green-200' },
  Moderate: { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500',  border: 'border-amber-200' },
  Heavy:    { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500',    border: 'border-red-200'   },
};

const uItinImg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=360&fit=crop&auto=format&q=85`;

/* ── Preset images for first-generation itinerary stops ─────────────── */
const PRESET_ITIN_IMAGES: Array<[string[], string]> = [
  [['brihadeeswarar', 'big temple'],                    '1686310894901-d326b8722c13'],
  [['palace', 'royal museum', 'maratha'],               '1622018135960-249abd263aeb'],
  [['saraswathi', 'library'],                           '1568045919115-f2dacbaa1899'],
  [['art gallery', 'chola bronze', 'nataraja'],         '1541781774459-bb2af2f05b55'],
  [['airavatesvara', 'darasuram'],                      '1701665837448-cdbb9fab5a0d'],
  [['gangaikonda'],                                     '1567529684892-09290a1b2d05'],
  [['lunch', 'thali', 'mess', 'bhavan'],                '1711153419402-336ee48f2138'],
  [['sivaganga', 'fort'],                               '1477587458883-47145ed94245'],
  [['kaveri', 'river', 'anicut'],                       '1506905925346-21bda4d32df4'],
];
const FALLBACK_ITIN_IMGS = [
  '1686310894901-d326b8722c13',
  '1622018135960-249abd263aeb',
  '1701665837448-cdbb9fab5a0d',
  '1711153419402-336ee48f2138',
  '1568045919115-f2dacbaa1899',
];
function getPresetImgId(stopName: string, idx: number): string {
  const lower = stopName.toLowerCase();
  for (const [kws, id] of PRESET_ITIN_IMAGES) {
    if (kws.some(k => lower.includes(k))) return id;
  }
  return FALLBACK_ITIN_IMGS[idx % FALLBACK_ITIN_IMGS.length];
}

const CROWD_BADGE: Record<'Low' | 'Moderate' | 'High', { bg: string; text: string; dot: string; border: string }> = {
  Low:      { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500',  border: 'border-green-200' },
  Moderate: { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500',  border: 'border-amber-200' },
  High:     { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500',    border: 'border-red-200'   },
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
      <div className="w-full h-28 rounded-t-xl overflow-hidden">
        <img src={photoUri} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`w-full h-28 rounded-t-xl ${color} flex items-center justify-center overflow-hidden relative`}>
      {loading && (
        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin absolute" />
      )}
      <span className="text-3xl font-display font-black text-white/70 uppercase tracking-widest drop-shadow">
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
  '#1C64F2', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2',
];

function ReviewCard({ review, idx }: { review: ReviewItem; idx: number }) {
  const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  return (
    <div className="bg-bg-app rounded-xl p-3 border border-border">
      <div className="flex items-start gap-2.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: avatarColor }}
        >
          <span className="text-[11px] font-black text-white">{review.author.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[11px] font-bold text-heading truncate">{review.author}</span>
              <span className="text-[10px] text-muted shrink-0">· {review.location}</span>
            </div>
            <span className="text-[9px] text-muted shrink-0">{review.ago}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 ${i < review.stars ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
            ))}
          </div>
          <p className="text-[11px] text-body leading-relaxed italic">"{review.text}"</p>
          <p className="text-[9px] text-muted/70 mt-1.5 font-semibold">via Google Reviews</p>
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place, tab, rank = 0, animDelay = 0, defaultCollapsed = false, selectedTags = [] }: {
  place: PlaceResult; tab: Tab; rank?: number; animDelay?: number; defaultCollapsed?: boolean; selectedTags?: string[];
}) {
  // rank-1 AI Top Pick cards start collapsed to save space; all others start expanded
  const [cardCollapsed, setCardCollapsed] = useState(defaultCollapsed);
  const [expanded, setExpanded]         = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showNearby, setShowNearby]     = useState(false);
  const [openAiRow, setOpenAiRow]       = useState<number | null>(null);
  const [bookmarked, setBookmarked]     = useState(false);
  const { toast } = useToast();

  // Only surface 3★+ reviews, best first — 1-2★ signals are captured in trendVerdict/trendReason
  const displayReviews = [...place.reviews]
    .filter(r => r.stars >= 3)
    .sort((a, b) => b.stars - a.stars);

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
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand/90 transition-colors active:scale-[0.97] shadow-sm">
          <ExternalLink className="w-3.5 h-3.5" />Book
        </a>
        <a href={place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border-2 border-slate-200 text-slate-600 hover:border-brand hover:text-brand transition-colors active:scale-[0.97]">
          <Map className="w-3.5 h-3.5" />Map
        </a>
      </>)}
      {tab === 'Food' && (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors active:scale-[0.97] shadow-sm">
          <Navigation className="w-3.5 h-3.5" />Directions
        </a>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.35, ease: 'easeOut' }}
      className="bg-surface border border-card-border rounded-xl overflow-hidden shadow-sm card-hover"
    >

      {/* ══ COMPACT STATE ══════════════════════════════════════════════ */}
      {cardCollapsed && (
        <div>
          {/* Top row: rank badge + name/address + action buttons */}
          <div className="flex items-start gap-3 px-3 pt-3 pb-2">
            {/* Rank badge */}
            <div className="shrink-0 mt-0.5">
              {rank === 1
                ? <div className="flex items-center gap-1 bg-brand px-2 py-1 rounded-lg"><Sparkles className="w-3 h-3 text-white" /><span className="text-[9px] font-black text-white uppercase tracking-widest">Top Pick</span></div>
                : <div className="w-6 h-6 rounded-full bg-bg-app border border-border flex items-center justify-center"><span className="text-[10px] font-black text-muted">#{rank}</span></div>
              }
            </div>
            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm text-heading leading-snug truncate">{place.name}</h3>
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[11px] font-black text-heading">{place.rating}</span>
                  <span className="text-[10px] text-muted ml-0.5">({place.reviewCount.toLocaleString()})</span>
                </div>
                <span className="text-muted text-[10px]">·</span>
                <Badge variant={place.openNow ? 'success' : 'danger'} dot pill>{place.openNow ? 'Open' : 'Closed'}</Badge>
                <Badge variant="neutral" pill>{place.priceLevel}</Badge>
                {place.dist > 0 && <span className="text-[10px] text-muted">· {place.dist}km</span>}
              </div>
              <p className="text-[10px] text-muted flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 shrink-0" />{place.address}
              </p>
            </div>
            {/* Action buttons — right side */}
            {actionButtons}
          </div>

          {/* AI insight line */}
          <div className="px-3 pb-2">
            <p className="text-[11px] text-body leading-relaxed line-clamp-2 flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 text-brand shrink-0 mt-0.5" />
              {place.aiNote}
            </p>
          </div>

          {/* Verified by AI badge — shown only when filterVerification is present */}
          {place.filterVerification && (
            <div className="px-3 pb-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold"
                style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
                <CheckCircle className="w-3 h-3 shrink-0" />
                {place.filterVerification}
              </span>
            </div>
          )}

          {/* Matched filter chips */}
          {(() => {
            const matched = selectedTags.filter(t =>
              place.tags.some(pt => pt.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(pt.toLowerCase()))
            );
            return matched.length > 0 ? (
              <div className="px-3 pb-2.5 flex flex-wrap gap-1">
                {matched.map(t => (
                  <span key={t} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide border"
                    style={{ background: '#EBF5FF', borderColor: '#1C64F220', color: '#1C64F2' }}>
                    <Sparkles className="w-2 h-2" /> {t}
                  </span>
                ))}
              </div>
            ) : null;
          })()}

          {/* Subtle expand — NOT a styled button, just a text row */}
          <button
            onClick={() => setCardCollapsed(false)}
            className="w-full flex items-center justify-between px-3 py-2.5 border-t border-border text-muted hover:text-brand transition-colors group"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-brand/60 group-hover:text-brand transition-colors shrink-0" />
              Why AI recommended it? · Show full analysis &amp; reviews
            </span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 group-hover:text-brand transition-colors" />
          </button>
        </div>
      )}

      {/* ══ EXPANDED STATE ══════════════════════════════════════════════ */}
      {!cardCollapsed && (
      <div>

        {/* Photo */}
        <div className="relative">
          <PlacePhoto color={place.photoColor} name={place.name} photoRef={place.photoRef} autoLoad={rank <= 3} />
          {rank === 1 && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-brand px-2.5 py-1 rounded-lg shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Top Pick</span>
            </div>
          )}
        </div>

        <div className="p-3 space-y-3">
          {/* Name + action buttons */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm text-heading leading-snug">{place.name}</h3>
              <div className="flex items-center gap-1 mt-0.5 text-muted">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="text-[11px] truncate">{place.address}</span>
                {place.dist > 0 && <span className="shrink-0 text-[11px]">· {place.dist}km</span>}
              </div>
            </div>
            {actionButtons}
          </div>

        {/* ── Rating metric block ───────────────────────────────── */}
        <div className="flex items-stretch gap-3 bg-bg-app rounded-xl p-3 border border-border">
          {/* Big rating number + star bar */}
          <div className="flex flex-col items-center justify-center shrink-0 min-w-[52px]">
            <span className="text-[28px] font-black text-heading leading-none tracking-tight">{place.rating}</span>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${
                  i < Math.floor(place.rating)       ? 'fill-yellow-400 text-yellow-400' :
                  i < place.rating                   ? 'fill-yellow-200 text-yellow-300' :
                                                       'text-border'
                }`} />
              ))}
            </div>
            <span className="text-[9px] text-muted font-semibold mt-1 uppercase tracking-wide">Google</span>
          </div>

          {/* Divider */}
          <div className="w-px bg-border shrink-0" />

          {/* Review count + trend signal */}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-heading">{place.reviewCount.toLocaleString()}</span>
              <span className="text-[11px] text-muted">verified reviews</span>
            </div>
            {place.trendVerdict && (
              <div className="flex items-center gap-1.5">
                {place.trendVerdict === 'improving'
                  ? <TrendingUp  className="w-3 h-3 text-success shrink-0" />
                  : place.trendVerdict === 'declining'
                  ? <TrendingDown className="w-3 h-3 text-warning shrink-0" />
                  : <Minus       className="w-3 h-3 text-muted shrink-0"   />
                }
                <span className={`text-[10px] font-bold ${
                  place.trendVerdict === 'improving' ? 'text-success' :
                  place.trendVerdict === 'declining' ? 'text-warning' : 'text-muted'
                }`}>
                  {place.trendVerdict === 'improving' ? 'Rising' :
                   place.trendVerdict === 'declining' ? 'Falling' : 'Proven'}
                </span>
                <span className="text-[10px] text-muted/80 truncate">· {place.trendReason}</span>
              </div>
            )}
          </div>

          {/* Open + price, stacked */}
          <div className="flex flex-col items-end justify-center gap-1 shrink-0">
            <Badge variant={place.openNow ? 'success' : 'danger'} dot pill>
              {place.openNow ? 'Open' : 'Closed'}
            </Badge>
            <Badge variant="neutral" pill>{place.priceLevel}</Badge>
          </div>
        </div>

        {/* Tags row */}
        {place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {place.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] font-semibold bg-bg-app text-muted px-1.5 py-0.5 rounded border border-border uppercase tracking-wide">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ── Review summary — social proof first ──────────────── */}
        <div className="bg-bg-app border border-border rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 border-b border-border">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
            <span className="text-[10px] font-black text-heading uppercase tracking-widest">What guests say</span>
            <span className="ml-auto text-[9px] font-bold text-muted bg-border/40 px-1.5 py-0.5 rounded-full shrink-0">
              {place.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* Summary paragraph */}
          <div className="px-3 py-2.5">
            <p className="text-[12px] text-body leading-relaxed">
              {place.reviewSummary || place.aiNote}
            </p>
          </div>

          {/* Best 3 reviews — always visible */}
          {displayReviews.length > 0 && (
            <div className="border-t border-border divide-y divide-border">
              {displayReviews.slice(0, 3).map((r, i) => (
                <div key={i} className="px-3 py-2.5 space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black text-white"
                      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    >
                      {r.author.charAt(0)}
                    </div>
                    <span className="text-[11px] font-bold text-heading">{r.author}</span>
                    <span className="text-[10px] text-muted">· {r.location}</span>
                    <div className="ml-auto flex gap-0.5 shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-2.5 h-2.5 ${j < r.stars ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-body leading-relaxed italic line-clamp-2">"{r.text}"</p>
                  <p className="text-[9px] text-muted">{r.ago} · via Google</p>
                </div>
              ))}
            </div>
          )}

          {/* Explore all reviews — bottom-right subtle link */}
          <div className="px-3 py-2 border-t border-border flex items-center justify-between">
            <span className="text-[9px] text-muted">Showing top 3★+ reviews</span>
            {(place.googleMapsUri) && (
              <a
                href={place.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted hover:text-brand transition-colors flex items-center gap-1 font-medium"
              >
                Explore all reviews <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            )}
          </div>
        </div>

          {/* ── Why AI recommended it — always visible section ── */}
          <div className="space-y-2 border-t border-border pt-3">
            <p className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Why AI recommended it
            </p>

            {/* Matched filter chips — highlighted in this review */}
            {(() => {
              const matched = selectedTags.filter(t =>
                place.tags.some(pt => pt.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(pt.toLowerCase()))
              );
              return matched.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  <span className="text-[9px] text-muted font-semibold self-center">Highlighted for:</span>
                  {matched.map(t => (
                    <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide border"
                      style={{ background: '#EBF5FF', borderColor: '#1C64F240', color: '#1C64F2' }}>
                      <Sparkles className="w-2 h-2" /> {t}
                    </span>
                  ))}
                </div>
              ) : null;
            })()}

            {/* Trend */}
            {place.trendVerdict && (
              <div className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 border ${
                place.trendVerdict === 'improving' ? 'bg-success-soft border-success-medium/30' :
                place.trendVerdict === 'declining' ? 'bg-warning-soft border-warning-medium/30' :
                                                     'bg-bg-app border-border'
              }`}>
                {place.trendVerdict === 'improving'
                  ? <TrendingUp  className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                  : place.trendVerdict === 'declining'
                  ? <TrendingDown className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
                  : <Minus       className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5"   />
                }
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-wide ${
                    place.trendVerdict === 'improving' ? 'text-success' :
                    place.trendVerdict === 'declining' ? 'text-warning' : 'text-muted'
                  }`}>
                    {place.trendVerdict === 'improving' ? 'Rising — recent reviews score higher'
                      : place.trendVerdict === 'declining' ? 'Falling — recent reviews score lower'
                      : 'Proven — consistent ratings over time'}
                  </p>
                  <p className="text-[11px] text-body mt-0.5 leading-relaxed">{place.trendReason}</p>
                </div>
              </div>
            )}

            {/* Why over others */}
            <div className="bg-surface border border-border rounded-xl p-3 space-y-1">
              <p className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="w-3 h-3" /> Why ranked above others
              </p>
              <p className="text-xs text-body leading-relaxed">{place.aiDetail.whyOverOthers}</p>
            </div>

            {/* Data signals */}
            <div className="bg-surface border border-border rounded-xl p-3 space-y-2">
              <p className="text-[10px] font-black text-heading uppercase tracking-widest">Data signals</p>
              <ul className="space-y-1.5">
                {place.aiDetail.dataPoints.map((dp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                    {dp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Best for + Caveat row */}
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-success-soft border border-success-medium/30 rounded-xl px-3 py-2.5">
                <p className="text-[10px] font-black text-success uppercase tracking-widest mb-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Best for
                </p>
                <p className="text-xs text-body leading-relaxed">{place.aiDetail.bestFor}</p>
              </div>
              {place.aiDetail.caveat && (
                <div className="bg-warning-soft border border-warning-medium/30 rounded-xl px-3 py-2.5">
                  <p className="text-[10px] font-black text-warning uppercase tracking-widest mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Watch out for
                  </p>
                  <p className="text-xs text-body leading-relaxed">{place.aiDetail.caveat}</p>
                </div>
              )}
            </div>
          </div>

        {/* Best restaurants nearby — Hotels tab only */}
        {tab === 'Hotels' && (
          <div className="border-t border-border pt-3 mt-1">
            <button
              onClick={() => setShowNearby(!showNearby)}
              className="w-full flex items-center justify-between text-xs font-semibold hover:text-brand transition-colors py-0.5 group"
            >
              <span className="flex items-center gap-1.5 text-muted group-hover:text-brand">
                <Utensils className="w-3.5 h-3.5" />
                Best restaurants nearby
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-muted group-hover:text-brand transition-transform duration-200 ${showNearby ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showNearby && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5 pt-2">
                    {NEARBY_RESTAURANTS.map((r, i) => (
                      <div key={i}>
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 bg-bg-app rounded-xl p-2.5 border border-border hover:border-brand/40 transition-colors cursor-pointer"
                          onClick={() => setOpenAiRow(openAiRow === i ? null : i)}
                        >
                          <span className="w-5 h-5 rounded-full bg-warning-soft text-warning text-[9px] font-black flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-heading truncate leading-tight">{r.name}</p>
                            <p className="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 shrink-0" />{r.dist} · {r.cuisine}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${r.dietVeg ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-orange-50 text-orange-600 border border-orange-200'}`}>
                              {r.dietVeg ? '🥗 Veg' : '🍽️ All'}
                            </span>
                            <span className="flex items-center gap-0.5 text-[9px] font-black bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full">
                              <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />{r.stars}
                            </span>
                            <span className="text-[9px] text-muted font-semibold">{r.price}</span>
                            <button
                              title="AI overview"
                              className={`p-1 rounded-lg transition-colors ${openAiRow === i ? 'bg-brand text-white' : 'text-muted hover:text-brand hover:bg-brand-softer'}`}
                            >
                              <Sparkles className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>

                        <AnimatePresence>
                          {openAiRow === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="mx-1 mb-1 bg-brand-softer border border-brand-soft/40 rounded-xl p-3 flex gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                                <p className="text-[11px] text-body leading-relaxed">{r.aiNote}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        </div>{/* end p-3 space-y-3 */}

        {/* Subtle collapse — same style as compact expand row */}
        <button
          onClick={() => setCardCollapsed(true)}
          className="w-full flex items-center justify-between px-3 py-2.5 border-t border-border text-muted hover:text-brand transition-colors group"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-medium">
            <ChevronDown className="w-3 h-3 rotate-180 text-brand/60 group-hover:text-brand transition-colors shrink-0" />
            Collapse
          </span>
          <ChevronDown className="w-3.5 h-3.5 shrink-0 rotate-180 group-hover:text-brand transition-colors" />
        </button>

      </div>
      )}

    </motion.div>
  );
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
/* ── Travel mode parser ──────────────────────────────────────────────── */
function getTravelMode(leg: string): { emoji: string; bg: string; color: string } {
  const l = leg.toLowerCase();
  if (l.includes('walk'))  return { emoji: '🚶', bg: '#F0FDF4', color: '#16A34A' };
  if (l.includes('metro')) return { emoji: '🚇', bg: '#EEF2FF', color: '#4F46E5' };
  if (l.includes('bus'))   return { emoji: '🚌', bg: '#F5F3FF', color: '#7C3AED' };
  if (l.includes('auto'))  return { emoji: '🛺', bg: '#FFFBEB', color: '#D97706' };
  return                          { emoji: '🚗', bg: '#EFF6FF', color: '#1C64F2' };
}

function ItineraryView({ stops, onRegenerate, onExploreStop, showPresetImages }: {
  stops: (ItineraryStop | LiveItineraryStop)[];
  onRegenerate: () => void;
  onExploreStop?: (target: string) => void;
  showPresetImages?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const displayStops = showPresetImages
    ? stops.map((s, i) => ({ ...s, imgId: (s as any).imgId ?? getPresetImgId(s.stop, i) }))
    : stops;

  return (
    <div>

      {/* ── Day overview — vertical timeline ─────────────────── */}
      <div className="mb-4 rounded-2xl overflow-hidden border border-card-border shadow-sm" style={{ background: 'linear-gradient(160deg,#F5F3FF 0%,#EFF6FF 60%,#F9FAFB 100%)' }}>

        {/* Header bar — click to collapse/expand */}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className="w-full px-4 py-3 flex items-center justify-between focus:outline-none"
          style={{ background: 'linear-gradient(90deg,#7C3AED,#6366F1)', borderBottom: collapsed ? 'none' : '1px solid #7C3AED30' }}
        >
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-white/90" />
            <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
              Thanjavur · {stops.length}-stop day plan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-[10px] font-bold text-white/90">
                {stops[0]?.time} – {stops[stops.length - 1]?.departBy ?? stops[stops.length - 1]?.time}
              </span>
            </div>
            <span className="text-white/70 transition-transform duration-300" style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* Vertical timeline — collapsible */}
        <AnimatePresence initial={false}>
        {!collapsed && (
        <motion.div
          key="timeline-body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
        <div className="px-4 py-4">
          {stops.map((stop, idx) => {
            const isLast = idx === stops.length - 1;
            const traffic = TRAFFIC_BADGE[stop.currentTraffic];
            const crowd = stop.crowdLevel ? CROWD_BADGE[stop.crowdLevel] : null;
            const tMode = stop.travelToNext ? getTravelMode(stop.travelToNext) : null;
            const connectorColor = TRAFFIC_LINE_BG[stop.currentTraffic];

            return (
              <React.Fragment key={idx}>
                {/* Stop row */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => document.getElementById(`itin-stop-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full text-left flex items-start gap-3 group focus:outline-none"
                >
                  {/* Left: node + vertical line */}
                  <div className="flex flex-col items-center shrink-0" style={{ width: 36 }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-md ring-2 ring-white transition-transform group-hover:scale-110"
                      style={{ background: 'linear-gradient(135deg,#7C3AED,#6366F1)', color: '#fff' }}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  {/* Right: stop info */}
                  <div className="flex-1 pb-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-[13px] font-bold text-heading leading-tight group-hover:text-purple-700 transition-colors truncate max-w-[200px]">
                        {stop.stop}
                      </span>
                      <span className="bg-white border border-purple-100 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 shadow-sm" style={{ color: '#7C3AED' }}>
                        {stop.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {stop.duration && (
                        <span className="flex items-center gap-0.5 bg-white border border-border text-[9px] font-bold text-muted px-1.5 py-0.5 rounded-full shadow-sm">
                          <Clock className="w-2.5 h-2.5" />
                          {stop.duration}
                        </span>
                      )}
                      <span className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${traffic.bg} ${traffic.text} ${traffic.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${traffic.dot}`} />
                        {stop.currentTraffic}
                      </span>
                      {crowd && (
                        <span className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${crowd.bg} ${crowd.text} ${crowd.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${crowd.dot}`} />
                          {stop.crowdLevel} crowd
                        </span>
                      )}
                      {stop.entryFee && (
                        <span className="bg-white border border-border text-[9px] font-semibold text-muted px-1.5 py-0.5 rounded-full shadow-sm">
                          {stop.entryFee}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>

                {/* Connector between stops */}
                {!isLast && stop.travelToNext && (
                  <div className="flex items-stretch gap-3 py-0.5">
                    {/* Colored vertical line */}
                    <div className="flex flex-col items-center shrink-0" style={{ width: 36 }}>
                      <div className="w-0.5 flex-1 rounded-full mx-auto" style={{ background: connectorColor, minHeight: 28 }} />
                    </div>
                    {/* Travel pill */}
                    <div className="flex items-center gap-1.5 self-center py-1">
                      <span className="text-base leading-none">{tMode?.emoji ?? '🚗'}</span>
                      <span className="text-[9px] font-semibold text-muted">{stop.travelToNext}</span>
                      {stop.departBy && (
                        <span className="text-[9px] font-bold bg-white border border-border px-1.5 py-0.5 rounded-full shadow-sm" style={{ color: '#7C3AED' }}>
                          depart {stop.departBy}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Spacer between rows with no connector */}
                {!isLast && !stop.travelToNext && (
                  <div className="flex items-stretch gap-3 py-0.5">
                    <div className="flex flex-col items-center shrink-0" style={{ width: 36 }}>
                      <div className="w-0.5 flex-1 rounded-full mx-auto bg-border" style={{ minHeight: 16 }} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Finish node */}
          <div className="flex items-center gap-3 mt-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-base border-2 shadow-sm shrink-0" style={{ borderColor: '#22C55E', background: '#F0FDF4' }}>🏁</div>
            <span className="text-[11px] font-bold text-green-700">Day complete</span>
          </div>
        </div>

        {/* Footer: traffic legend */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-t border-border/60 flex-wrap" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <span className="text-[9px] font-black text-muted uppercase tracking-widest">Traffic:</span>
          {(['Light', 'Moderate', 'Heavy'] as TrafficLevel[]).map(lvl => (
            <span key={lvl} className="flex items-center gap-1 text-[9px] font-semibold text-muted">
              <span className="w-3 h-1.5 rounded-full inline-block" style={{ background: TRAFFIC_LINE_BG[lvl] }} />
              {lvl}
            </span>
          ))}
        </div>
        </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* ── Stop cards ───────────────────────────────────────── */}
      <div className="space-y-1">
        {displayStops.map((stop, idx) => {
          const isLast = idx === stops.length - 1;
          const mode = stop.travelToNext ? getTravelMode(stop.travelToNext) : null;
          const traffic = TRAFFIC_BADGE[stop.currentTraffic];
          const crowd = stop.crowdLevel ? CROWD_BADGE[stop.crowdLevel] : null;

          return (
            <div key={idx} id={`itin-stop-${idx}`}>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                onClick={() => onExploreStop?.(stop.stop)}
                className="w-full text-left rounded-2xl overflow-hidden border border-card-border shadow-sm group hover:border-brand/40 hover:shadow-md transition-all duration-200 focus:outline-none"
              >
                {/* ── Photo zone ──────────────────────────── */}
                <div className="relative h-[185px]">
                  {stop.imgId
                    ? (
                      <img
                        src={uItinImg(stop.imgId)}
                        alt={stop.stop}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    )
                    : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#7C3AED,#6366F1)' }} />
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

                  {/* Top: stop# + time + duration */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    <span className="bg-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm leading-none" style={{ color: '#7C3AED' }}>
                      Stop {idx + 1}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">
                        {stop.time}
                      </span>
                      {stop.duration && (
                        <span className="bg-black/55 backdrop-blur-sm text-white/80 text-[9px] font-semibold px-2 py-0.5 rounded-full leading-none">
                          ⏱ {stop.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: name + badges + explore hint */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                    <div className="flex items-end justify-between gap-2 mb-2">
                      <h3 className="text-white font-display font-black text-[17px] leading-tight drop-shadow truncate">
                        {stop.stop}
                      </h3>
                      <div className="shrink-0 flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[9px] font-black px-2 py-1 rounded-full">
                        <Compass className="w-2.5 h-2.5" /> Explore
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${traffic.bg} ${traffic.border} ${traffic.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${traffic.dot}`} />
                        {stop.currentTraffic} traffic
                      </span>
                      {crowd && stop.crowdLevel && (
                        <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${crowd.bg} ${crowd.border} ${crowd.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${crowd.dot}`} />
                          {stop.crowdLevel} crowd
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Info below photo ─────────────────────── */}
                <div className="bg-surface px-3.5 pt-3 pb-3.5 space-y-2.5">
                  <p className="text-xs text-body leading-relaxed italic border-l-2 border-brand/30 pl-2.5">
                    "{stop.tip}"
                  </p>
                  {stop.reachNote && (
                    <div className="flex items-start gap-1.5">
                      <Navigation className="w-3 h-3 text-muted shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted leading-relaxed">{stop.reachNote}</p>
                    </div>
                  )}
                  {(stop.entryFee || (stop.highlights && stop.highlights.length > 0)) && (
                    <div className="flex flex-wrap gap-1.5">
                      {stop.entryFee && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-success-soft text-success border border-success-medium/30">
                          🎟 {stop.entryFee}
                        </span>
                      )}
                      {stop.highlights?.map(h => (
                        <span key={h} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-bg-app text-muted border border-border">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.button>

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
                  <div className="flex-1 flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: mode.bg, color: mode.color }}>
                    <span>{stop.travelToNext}</span>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] + '25', color: TRAFFIC_LINE_BG[stop.currentTraffic] }}>
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

function ExploreView({ place }: { place: ExploreResult }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Photo + header */}
      <div className={`${place.photoColor} rounded-2xl h-52 flex items-end p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-2xl" />
        <div className="relative z-10">
          <h2 className="font-display font-black text-xl text-white drop-shadow">{place.name}</h2>
          <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {place.address}
          </p>
        </div>
      </div>

      {/* Rating metric block + status */}
      <div className="flex items-stretch gap-3 bg-bg-app rounded-xl p-3 border border-border">
        <div className="flex flex-col items-center justify-center shrink-0 min-w-[52px]">
          <span className="text-[28px] font-black text-heading leading-none tracking-tight">{place.rating}</span>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${
                i < Math.floor(place.rating) ? 'fill-yellow-400 text-yellow-400' :
                i < place.rating            ? 'fill-yellow-200 text-yellow-300' : 'text-border'
              }`} />
            ))}
          </div>
          <span className="text-[9px] text-muted font-semibold mt-1 uppercase tracking-wide">Google</span>
        </div>
        <div className="w-px bg-border shrink-0" />
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock className="w-3 h-3 shrink-0" /> {place.openingHours}
          </span>
          <span className="text-[11px] text-muted">Based on Google reviews</span>
        </div>
        <div className="flex flex-col items-end justify-center shrink-0">
          <Badge variant={place.status === 'Open' ? 'success' : place.status === 'Busy' ? 'warning' : 'danger'} dot pill>
            {place.status}
          </Badge>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-brand-softer border border-brand-soft/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand" />
          <span className="text-xs font-black text-brand uppercase tracking-widest">AI Insight</span>
        </div>
        <p className="text-sm text-body leading-relaxed italic">"{place.insight}"</p>
      </div>

      {/* Operational Flow */}
      <div className="bg-accent-soft border border-accent/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="w-4 h-4 text-accent" />
          <span className="text-xs font-black text-accent uppercase tracking-widest">Operational Flow</span>
        </div>
        <p className="text-sm text-body leading-relaxed italic whitespace-pre-line">{place.flow}</p>
      </div>

      {/* Preparation */}
      <div className="bg-warning-soft border border-warning-medium/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-warning" />
          <span className="text-xs font-black text-warning uppercase tracking-widest">How to Prepare</span>
        </div>
        <p className="text-sm text-body leading-relaxed italic">{place.preparation}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {place.tags.map(t => (
          <span key={t} className="text-[10px] font-semibold bg-bg-app text-muted px-2.5 py-1 rounded-full border border-border uppercase tracking-wide">
            #{t}
          </span>
        ))}
      </div>

      {/* Reviews — top review always visible */}
      {place.reviews.length > 0 && (
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 border-b border-border bg-bg-app">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-black text-heading uppercase tracking-widest">What guests say</span>
          </div>
          <div className="p-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black text-white"
                style={{ background: AVATAR_COLORS[0] }}
              >
                {place.reviews[0].author.charAt(0)}
              </div>
              <span className="text-[11px] font-bold text-heading">{place.reviews[0].author}</span>
              <span className="text-[10px] text-muted">· {place.reviews[0].location}</span>
              <div className="ml-auto flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < place.reviews[0].stars ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-body leading-relaxed italic line-clamp-2">"{place.reviews[0].text}"</p>
            <p className="text-[9px] text-muted font-medium">{place.reviews[0].ago} · via Google Reviews</p>
          </div>
          {place.reviews.length > 1 && (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-3 py-2 border-t border-border text-[10px] font-bold text-brand hover:bg-brand-softer transition-colors"
              >
                <span>{expanded ? 'Hide reviews' : `See all ${place.reviews.length} reviews`}</span>
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
                      {place.reviews.slice(1).map((r, i) => (
                        <ReviewCard key={i} review={r} idx={i + 1} />
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

export function ResultsView({
  tab, destination, hotels, food, itinerary, explore, apiError,
  isLoadingMore = false,
  onBack, onRegenerate, onSave, saved = false, onSwitchTab,
  backLabel, onExploreStop, isFirstItinerary = false, selectedTags = [],
}: ResultsViewProps) {
  const { toast } = useToast();
  const results = tab === 'Hotels' ? hotels : tab === 'Food' ? food : [];
  const count = tab === 'Itinerary' ? itinerary?.length : tab === 'Explore' ? 1 : results?.length;

  const handleSave = () => { onSave(); toast('Plan saved — find it under Trips.', 'success'); };

  return (
    <div className="w-full max-w-[920px] mx-auto px-4 py-4 pb-28 lg:pb-8">

      {/* Top bar — breadcrumb navigation */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-xl border border-border bg-surface hover:bg-brand-softer hover:border-brand transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-muted group-hover:text-brand transition-colors" />
            <span className="text-xs font-bold text-muted group-hover:text-brand transition-colors">{backLabel ?? tab}</span>
          </button>
          <ChevronRight className="w-3 h-3 text-muted/40 shrink-0" />
          <span className="text-xs font-bold text-heading truncate">{destination}</span>
        </div>
        <span className="shrink-0 text-xs font-bold text-brand bg-brand-softer border border-brand-soft/30 px-3 py-1.5 rounded-full">
          {destination} · {tab === 'Explore' ? 'AI guide' : `${count ?? 0} result${(count ?? 0) !== 1 ? 's' : ''}`}
        </span>
      </div>


      {/* Demo mode banner — API failed but we're showing sample fallback data */}
      {(tab === 'Hotels' || tab === 'Food') && apiError && (results?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-warning-soft border border-warning-medium/40 mb-4"
        >
          <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-warning">Demo mode — live search unavailable</p>
            <p className="text-[11px] text-muted mt-0.5 leading-relaxed">Showing sample Thanjavur data. Add a valid Google Places API key in Vercel to get live results.</p>
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
            <p className="font-display font-bold text-sm text-heading">No results match your filters</p>
            <p className="text-xs text-muted leading-relaxed">
              No places in Thanjavur matched all your selected filters. Try removing the price range, rating, or diet restriction.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-brand text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all"
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
            <p className="font-display font-bold text-sm text-heading">Search unavailable</p>
            <p className="text-xs text-muted leading-relaxed">
              Could not connect to the search service. Check your API key configuration or try again.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-brand text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all"
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
                <span className="text-[10px] font-black text-brand uppercase tracking-widest">AI Recommended</span>
                <div className="flex-1 h-px bg-brand/20" />
              </div>
            )}
            {idx === 1 && (
              <div className="flex items-center gap-2 -mb-2">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Best Options</span>
                <div className="flex-1 h-px bg-amber-200" />
              </div>
            )}
            {idx === 3 && (results?.length ?? 0) > 3 && (
              <div className="flex items-center gap-2 -mb-2">
                <Info className="w-3.5 h-3.5 text-muted" />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Also Consider</span>
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
            />
          </React.Fragment>
        ))}
        {tab === 'Itinerary' && itinerary && <ItineraryView stops={itinerary} onRegenerate={onRegenerate} onExploreStop={onExploreStop} showPresetImages={isFirstItinerary} />}
        {tab === 'Explore' && explore && <ExploreView place={explore} />}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {tab === 'Itinerary' && (
          <Button variant="outline" onClick={onRegenerate} disabled={isLoadingMore} icon={<RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />} className="flex-1">
            {isLoadingMore ? 'Regenerating…' : 'Try Different Set'}
          </Button>
        )}
        <Button onClick={handleSave} icon={saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} className="flex-1" variant={saved ? 'success' : 'brand'}>
          {saved ? 'Plan saved' : 'Save this plan'}
        </Button>
      </div>

      {/* Cross-tab nudge */}
      {onSwitchTab && (
        <div className="pt-4 mt-2 border-t border-border">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2.5 text-center">Complete your plan</p>
          <div className="grid grid-cols-2 gap-2">
            {tab === 'Hotels' && <>
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Explore nearby foods
              </button>
              <button onClick={() => onSwitchTab('Explore')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Compass className="w-3.5 h-3.5" /> Explore places
              </button>
            </>}
            {tab === 'Food' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Explore hotels
              </button>
              <button onClick={() => onSwitchTab('Explore')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Compass className="w-3.5 h-3.5" /> Explore places nearby
              </button>
            </>}
            {tab === 'Itinerary' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels
              </button>
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Find food
              </button>
            </>}
            {tab === 'Explore' && <>
              <button onClick={() => onSwitchTab('Itinerary')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Route className="w-3.5 h-3.5" /> Plan a full day
              </button>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-brand-softer transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels nearby
              </button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
