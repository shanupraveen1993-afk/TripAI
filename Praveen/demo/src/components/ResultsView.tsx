import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Star, MapPin, Clock, Navigation, Share2,
  ChevronRight, ChevronDown, Sparkles, Info, RefreshCw, Bookmark, BookmarkCheck,
  Utensils, LandmarkIcon, CheckCircle, AlertTriangle, RotateCcw, Hotel, Route,
  TrendingUp, TrendingDown, Minus, ImageIcon,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Tab } from './ui/Tabs';
import { PlaceResult, ItineraryStop, ExploreResult, TrafficLevel, ReviewItem } from '../mock/data';
import { fetchPhoto } from '../api/client';
import { useToast } from './ui/Toast';

interface ResultsViewProps {
  tab: Tab;
  destination: string;
  hotels?: PlaceResult[];
  food?: PlaceResult[];
  temples?: PlaceResult[];
  itinerary?: ItineraryStop[];
  explore?: ExploreResult;
  apiError?: boolean;
  onBack: () => void;
  onRegenerate: () => void;
  onSave: () => void;
  saved?: boolean;
  onSwitchTab?: (tab: Tab) => void;
}

/* ── Best restaurants near the hotel ─────────────────────────────────── */
const NEARBY_RESTAURANTS = [
  { name: 'Toit Brewpub',       dist: '0.8km', stars: 4.6, price: '₹₹₹', cuisine: 'Craft Beer',   dietVeg: false, aiNote: 'Lively rooftop spot — perfect after check-in, no reservation needed on weekdays.' },
  { name: 'Meghana Foods',      dist: '1.2km', stars: 4.5, price: '₹₹',  cuisine: 'Biryani',      dietVeg: false, aiNote: 'Best biryani in the area — quick service, always fresh, cash preferred.' },
  { name: 'Vidyarthi Bhavan',   dist: '1.5km', stars: 4.7, price: '₹',   cuisine: 'South Indian', dietVeg: true,  aiNote: 'Legendary pure-veg dosa spot — go before 9am to avoid a 30-min queue.' },
  { name: 'Truffles',           dist: '2.1km', stars: 4.4, price: '₹₹',  cuisine: 'Continental',  dietVeg: false, aiNote: 'Great burgers and shakes — popular with families, open till midnight.' },
  { name: 'The Permit Room',    dist: '2.8km', stars: 4.3, price: '₹₹₹', cuisine: 'Modern Indian', dietVeg: false, aiNote: 'Craft cocktails + modern Indian small plates — ideal for a dinner out.' },
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

function PlacePhoto({ color, name, photoRef }: { color: string; name: string; photoRef?: string | null }) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  const loadPhoto = async () => {
    if (!photoRef || loading || photoUri) return;
    setLoading(true);
    const uri = await fetchPhoto(photoRef);
    setPhotoUri(uri);
    setLoading(false);
  };

  if (photoUri) {
    return (
      <div className="w-full h-28 rounded-t-xl overflow-hidden">
        <img src={photoUri} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`w-full h-28 rounded-t-xl ${color} flex items-center justify-center overflow-hidden relative`}>
      <span className="text-3xl font-display font-black text-white/40 uppercase tracking-widest">
        {name.charAt(0)}
      </span>
      {photoRef && (
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

function PlaceCard({ place, tab, rank = 0 }: { place: PlaceResult; tab: Tab; rank?: number }) {
  const [expanded, setExpanded]         = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showNearby, setShowNearby]     = useState(false);
  const [openAiRow, setOpenAiRow]       = useState<number | null>(null);
  const [bookmarked, setBookmarked]     = useState(false);
  const { toast } = useToast();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-card-border rounded-xl overflow-hidden shadow-sm card-hover"
    >
      <div className="relative">
        <PlacePhoto color={place.photoColor} name={place.name} photoRef={place.photoRef} />
        {rank === 1 && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-brand px-2.5 py-1 rounded-lg shadow-sm">
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Top Pick</span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm text-heading truncate-1">{place.name}</h3>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate-1 text-[11px]">{place.address}</span>
              <span className="shrink-0 text-[11px]">· {place.dist}km</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${bookmarked ? 'text-brand bg-brand-softer' : 'text-muted hover:text-brand hover:bg-brand-softer'}`}
              title={bookmarked ? 'Saved' : 'Save this place'}
            >
              {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
            <button onClick={share} className="p-1.5 text-muted hover:text-brand hover:bg-brand-softer rounded-lg transition-colors">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stats + tags row combined */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-0.5 rounded-md text-[11px] font-bold">
            <Star className="w-2.5 h-2.5 fill-current" /> {place.rating}
            <span className="font-normal opacity-80">({place.reviewCount.toLocaleString()})</span>
          </div>
          <Badge variant={place.openNow ? 'success' : 'danger'} dot pill>
            {place.openNow ? 'Open' : 'Closed'}
          </Badge>
          <Badge variant="neutral" pill>{place.priceLevel}</Badge>
          {place.tags.slice(0, 2).map(t => (
            <span key={t} className="text-[10px] font-semibold bg-bg-app text-muted px-1.5 py-0.5 rounded border border-border uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        {/* AI Note */}
        <div className="bg-brand-softer border border-brand-soft/30 rounded-lg px-3 py-2.5 relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3 h-3 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-widest">Why ranked here</span>
          </div>
          <p className="text-[11px] text-body leading-relaxed italic">"{place.aiNote}"</p>
        </div>

        {/* Gemini Trend Badge */}
        {place.trendVerdict && (
          <div className={`flex items-start gap-2 rounded-lg px-3 py-2 border ${
            place.trendVerdict === 'improving' ? 'bg-green-50 border-green-200' :
            place.trendVerdict === 'declining' ? 'bg-amber-50 border-amber-200' :
                                                 'bg-gray-50 border-gray-200'
          }`}>
            {place.trendVerdict === 'improving'
              ? <TrendingUp  className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
              : place.trendVerdict === 'declining'
              ? <TrendingDown className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              : <Minus       className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5"  />
            }
            <div>
              <span className={`text-[10px] font-black uppercase tracking-wide ${
                place.trendVerdict === 'improving' ? 'text-green-700' :
                place.trendVerdict === 'declining' ? 'text-amber-700' : 'text-gray-600'
              }`}>
                {place.trendVerdict === 'improving' ? 'Trending up lately' :
                 place.trendVerdict === 'declining' ? 'Mixed recent reviews' : 'Consistently rated'}
              </span>
              <p className="text-[10px] text-body mt-0.5">{place.trendReason}</p>
            </div>
          </div>
        )}

        {/* Reviews accordion — social proof first */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-semibold text-muted hover:text-brand transition-colors py-1"
        >
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-yellow-400" /> What real guests say
          </span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-1">
                {place.reviews.map((r, i) => (
                  <ReviewCard key={i} review={r} idx={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full analysis expander */}
        <button
          onClick={() => setShowAnalysis(v => !v)}
          className="w-full flex items-center justify-between text-xs font-bold text-brand hover:text-brand/80 bg-brand-softer hover:bg-brand-soft/30 border border-brand-soft/40 rounded-lg px-3 py-2 transition-all duration-200"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {showAnalysis ? 'Hide full analysis ↑' : 'Show full analysis ↓'}
          </span>
          <span className="text-[9px] font-black bg-brand text-white px-2 py-0.5 rounded-full uppercase tracking-wide">AI Deep Dive</span>
        </button>

        <AnimatePresence>
          {showAnalysis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-1">
                {/* Why over others */}
                <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
                  <p className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-1.5">
                    <Trophy className="w-3 h-3" /> Why ranked above others
                  </p>
                  <p className="text-xs text-body leading-relaxed">{place.aiDetail.whyOverOthers}</p>
                </div>

                {/* Data signals */}
                <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
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

                {/* Best for */}
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Best for
                  </p>
                  <p className="text-xs text-green-800 leading-relaxed">{place.aiDetail.bestFor}</p>
                </div>

                {/* Caveat */}
                {place.aiDetail.caveat && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Watch out for
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">{place.aiDetail.caveat}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </div>

      {/* ── Get directions — primary action footer (Food only) ── */}
      {tab === 'Food' && (
        <div className="px-3 pb-3 pt-3 border-t border-border">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] border-2 border-brand text-brand bg-white hover:bg-brand hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-soft"
          >
            <Navigation className="w-4 h-4" />
            Get directions
            <span className="text-white/55 text-[11px] font-normal ml-0.5">· {place.dist}km away</span>
          </a>
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

function ItineraryView({ stops, onRegenerate }: { stops: ItineraryStop[]; onRegenerate: () => void }) {
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToStop = (idx: number) => {
    const next = idx === activeStop ? null : idx;
    setActiveStop(next);
    if (next !== null) {
      setTimeout(() => {
        cardRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  };

  return (
    <div className="space-y-4">

      {/* ── Route map strip ─────────────────────────────────────── */}
      <div className="bg-surface border border-card-border rounded-xl p-4">
        <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-brand" />
          Your route — tap a stop
        </p>

        <div className="overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center min-w-max px-1 gap-0">

            {/* Start node */}
            <div className="flex flex-col items-center gap-1 shrink-0 px-1">
              <div className="w-8 h-8 rounded-full bg-brand-softer border-2 border-brand flex items-center justify-center shrink-0">
                <span className="text-[10px] font-black text-brand">▶</span>
              </div>
              <span className="text-[8px] font-bold text-brand text-center">Start</span>
            </div>

            {stops.map((stop, idx) => {
              const mode = stop.travelToNext ? getTravelMode(stop.travelToNext) : null;
              const timePart = stop.travelToNext?.split('·')[0]?.trim() ?? '';
              const isActive = activeStop === idx;

              return (
                <React.Fragment key={idx}>
                  {/* Leg connector: traffic line + mode badge */}
                  <div className="flex flex-col items-center gap-1 shrink-0 mx-1" style={{ minWidth: 60 }}>
                    {/* Coloured traffic line */}
                    <div
                      className="h-1.5 w-full rounded-full"
                      style={{ background: TRAFFIC_LINE_BG[stop.currentTraffic] }}
                    />
                    {/* Mode + time chip */}
                    {mode && (
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: mode.bg, color: mode.color }}
                      >
                        {mode.emoji} {timePart}
                      </span>
                    )}
                    {/* Traffic trend dot */}
                    <span
                      className="text-[7px] font-semibold px-1 py-0.5 rounded-full"
                      style={{
                        background: TRAFFIC_LINE_BG[stop.currentTraffic] + '22',
                        color: TRAFFIC_LINE_BG[stop.currentTraffic],
                      }}
                    >
                      {stop.currentTraffic}
                    </span>
                  </div>

                  {/* Stop circle */}
                  <button
                    onClick={() => scrollToStop(idx)}
                    className="flex flex-col items-center gap-1 shrink-0 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-200 ${
                        isActive
                          ? 'bg-brand text-white border-brand scale-110'
                          : 'bg-white text-heading border-border hover:border-brand hover:text-brand'
                      }`}
                      style={isActive ? { boxShadow: '0 4px 14px rgba(28,100,242,0.35)' } : {}}
                    >
                      {idx + 1}
                    </div>
                    <span className={`text-[8px] font-bold text-center leading-tight max-w-[52px] ${isActive ? 'text-brand' : 'text-muted'}`}>
                      {stop.stop.split(' (')[0].split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className={`text-[7px] ${isActive ? 'text-brand/70 font-bold' : 'text-muted/60'}`}>
                      {stop.time}
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Traffic legend */}
        <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-border flex-wrap">
          <span className="text-[9px] font-black text-muted uppercase tracking-widest">Traffic:</span>
          {(['Light', 'Moderate', 'Heavy'] as TrafficLevel[]).map(lvl => (
            <span key={lvl} className="flex items-center gap-1 text-[9px] font-semibold text-muted">
              <span className="w-4 h-1.5 rounded-full" style={{ background: TRAFFIC_LINE_BG[lvl], display: 'inline-block' }} />
              {lvl}
            </span>
          ))}
        </div>
      </div>

      {/* ── Another plan CTA ─────────────────────────────────────── */}
      <button
        onClick={onRegenerate}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-brand/30 text-xs font-bold text-brand hover:bg-brand-softer hover:border-brand/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Generate another plan
      </button>

      {/* ── Stop cards ──────────────────────────────────────────── */}
      {stops.map((item, idx) => {
        const isActive = activeStop === idx;
        const mode = item.travelToNext ? getTravelMode(item.travelToNext) : null;
        const traffic = TRAFFIC_BADGE[item.currentTraffic];

        return (
          <motion.div
            key={idx}
            ref={el => { cardRefs.current[idx] = el; }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            onClick={() => scrollToStop(idx)}
            className={`bg-surface rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-200 ${
              isActive ? 'border-2 border-brand' : 'border border-card-border hover:border-brand/40'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between gap-3 border-b ${
              isActive ? 'bg-brand-softer border-brand/20' : 'border-card-border'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  isActive ? 'bg-brand text-white' : 'bg-brand-softer text-brand'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-heading leading-tight">{item.stop}</h3>
                  <p className="text-[10px] text-muted mt-0.5">Arrive {item.time}</p>
                </div>
              </div>
              {item.departBy && (
                <div className="text-right shrink-0">
                  <p className="text-[9px] text-muted uppercase tracking-wide font-bold">Depart by</p>
                  <p className="text-xs font-black text-heading">{item.departBy}</p>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              {/* Tip */}
              <p className="text-xs text-body leading-relaxed italic border-l-2 border-brand/30 pl-3">
                "{item.tip}"
              </p>

              {/* Traffic trend — single pill */}
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${traffic.bg} ${traffic.border} ${traffic.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${traffic.dot}`} />
                  {item.currentTraffic} traffic
                </span>
              </div>

              {/* Connection to next stop */}
              {mode && item.travelToNext && idx < stops.length - 1 && (
                <div
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold"
                  style={{ background: mode.bg, color: mode.color }}
                >
                  <span className="text-base leading-none">{mode.emoji}</span>
                  <span className="flex-1">{item.travelToNext} to next stop</span>
                  <span
                    className="text-[9px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: TRAFFIC_LINE_BG[item.currentTraffic] + '25', color: TRAFFIC_LINE_BG[item.currentTraffic] }}
                  >
                    {item.currentTraffic}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Phase 2 note */}
      <div className="flex items-start gap-3 px-4 py-3 bg-bg-app border border-border rounded-xl">
        <Info className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted leading-relaxed">
          <span className="font-bold text-heading">Phase 2:</span> Live navigation via Google Maps. Traffic updates in real time via Google Directions API.
        </p>
      </div>
    </div>
  );
}

function ExploreView({ place }: { place: ExploreResult }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Photo + header */}
      <div className={`${place.photoColor} rounded-2xl h-52 flex items-end p-4`}>
        <div>
          <h2 className="font-display font-black text-xl text-white drop-shadow">{place.name}</h2>
          <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {place.address}
          </p>
        </div>
      </div>

      {/* Status + hours */}
      <div className="flex items-center justify-between px-1">
        <Badge variant={place.status === 'Open' ? 'success' : place.status === 'Busy' ? 'warning' : 'danger'} dot pill>
          {place.status}
        </Badge>
        <span className="flex items-center gap-1 text-xs text-muted">
          <Clock className="w-3 h-3" /> {place.openingHours}
        </span>
        <div className="flex items-center gap-1 text-xs text-yellow-600 font-bold">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {place.rating}
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

      {/* Reviews */}
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between text-xs font-semibold text-muted hover:text-brand transition-colors py-1">
        <span className="flex items-center gap-1.5"><Star className="w-3 h-3 text-yellow-400" /> What guests say</span>
        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="space-y-2">
              {place.reviews.map((r, i) => (
                <ReviewCard key={i} review={r} idx={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ResultsView({
  tab, destination, hotels, food, temples = [], itinerary, explore, apiError,
  onBack, onRegenerate, onSave, saved = false, onSwitchTab,
}: ResultsViewProps) {
  const { toast } = useToast();
  const results = tab === 'Hotels' ? hotels : tab === 'Food' ? food : tab === 'Temples' ? temples : [];
  const count = tab === 'Itinerary' ? itinerary?.length : results?.length;

  const handleSave = () => { onSave(); toast('Plan saved — find it under Trips.', 'success'); };

  return (
    <div className="w-full px-4 sm:px-6 xl:px-[304px] py-4 pb-28 lg:pb-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted hover:text-heading text-sm font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-xs font-bold text-brand bg-brand-softer border border-brand-soft/30 px-3 py-1.5 rounded-full">
          {destination} · {count} result{(count ?? 0) !== 1 ? 's' : ''}
        </span>
      </div>

      {/* API Error banner */}
      {apiError && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Showing sample data — API keys not yet configured. Results will be real once you add your keys.</span>
        </div>
      )}

      {/* Results */}
      <div className={tab === 'Hotels' || tab === 'Food' || tab === 'Temples' ? 'flex flex-col gap-5 mb-5' : 'space-y-4 mb-5'}>
        {(tab === 'Hotels' || tab === 'Food' || tab === 'Temples') && results?.map((p, idx) => (
          <PlaceCard key={p.id} place={p} tab={tab} rank={idx + 1} />
        ))}
        {tab === 'Itinerary' && itinerary && <ItineraryView stops={itinerary} onRegenerate={onRegenerate} />}
        {explore && tab !== 'Hotels' && tab !== 'Food' && tab !== 'Temples' && tab !== 'Itinerary' && <ExploreView place={explore} />}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRegenerate} icon={<RefreshCw className="w-4 h-4" />} className="flex-1">
          Try a different set
        </Button>
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
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Find food nearby
              </button>
              <button onClick={() => onSwitchTab('Itinerary')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Route className="w-3.5 h-3.5" /> Build my itinerary
              </button>
            </>}
            {tab === 'Food' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find a hotel
              </button>
              <button onClick={() => onSwitchTab('Itinerary')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Route className="w-3.5 h-3.5" /> Plan my day
              </button>
            </>}
            {tab === 'Itinerary' && <>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels
              </button>
              <button onClick={() => onSwitchTab('Food')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Find food
              </button>
            </>}
            {tab === 'Temples' && <>
              <button onClick={() => onSwitchTab('Itinerary')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Route className="w-3.5 h-3.5" /> Plan a full day
              </button>
              <button onClick={() => onSwitchTab('Hotels')} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors">
                <Hotel className="w-3.5 h-3.5" /> Find hotels nearby
              </button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
