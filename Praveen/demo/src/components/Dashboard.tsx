import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Info, ChevronDown, Sparkles, MapPin, Navigation, X,
  Hotel, Utensils, Route, Compass, Flame, Zap, Clock, SlidersHorizontal,
} from 'lucide-react';
import { Tab } from './ui/Tabs';

type FoodBudget = 'Low' | 'Medium' | 'High';
type DietType   = 'Veg' | 'Non-Veg' | 'Pure Veg';
type DiningVibe = 'Family' | 'Quick' | 'Leisure';

/* ── Tab metadata ─────────────────────────────────────────────────────── */
const TAB_META: Record<Tab, {
  icon: React.ReactNode;
  bigIcon: React.ReactNode;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentSoft: string;
  label: string;
  headline: string;
  sub: string;
  trending: string[];
}> = {
  Hotels: {
    icon:        <Hotel    className="w-4 h-4" />,
    bigIcon:     <Hotel    className="w-6 h-6" />,
    accent:      '#1C64F2',
    accentBg:    '#EBF5FF',
    accentBorder:'#1C64F2',
    accentSoft:  '#1C64F215',
    label:       'Hotels',
    headline:    'What\'s the best hotel here for you?',
    sub:         'AI ranks every option by budget, area, and what you actually care about.',
    trending:    ['Budget stays', 'Rooftop pool', 'Heritage hotels', 'Near airport', 'Business hotels', 'Sea view rooms'],
  },
  Food: {
    icon:        <Utensils className="w-4 h-4" />,
    bigIcon:     <Utensils className="w-6 h-6" />,
    accent:      '#D97706',
    accentBg:    '#FFFBEB',
    accentBorder:'#D97706',
    accentSoft:  '#D9770615',
    label:       'Food',
    headline:    'What\'s actually worth eating here?',
    sub:         'Diet, vibe, distance — filtered in before you see a result. Not after.',
    trending:    ['Biryani spots', 'Rooftop dining', 'Pure veg', 'Street food', 'Seafood', 'Craft beer bars'],
  },
  Itinerary: {
    icon:        <Route    className="w-4 h-4" />,
    bigIcon:     <Route    className="w-6 h-6" />,
    accent:      '#7C3AED',
    accentBg:    '#F5F3FF',
    accentBorder:'#7C3AED',
    accentSoft:  '#7C3AED15',
    label:       'Itinerary',
    headline:    'Build a day that doesn\'t waste yours.',
    sub:         'AI routes your stops around your hotel — less commuting, more actually being there.',
    trending:    ['Family day out', 'Couple getaway', 'Solo explorer', 'Heritage walk', '1-day plan', 'Hidden gems'],
  },
  Explore: {
    icon:        <Compass  className="w-4 h-4" />,
    bigIcon:     <Compass  className="w-6 h-6" />,
    accent:      '#059669',
    accentBg:    '#ECFDF5',
    accentBorder:'#059669',
    accentSoft:  '#05966915',
    label:       'Explore',
    headline:    'What\'s actually worth your time here?',
    sub:         'Entry costs, crowd times, what to skip — so you don\'t figure it out after walking 2km.',
    trending:    ['Monuments', 'Nature spots', 'Night markets', 'Art galleries', 'Adventure parks', 'Viewpoints'],
  },
};

const TABS: Tab[] = ['Hotels', 'Food', 'Itinerary', 'Explore'];

/* ── Dynamic popular spots per destination ───────────────────────────── */
const DESTINATION_SPOTS: Record<string, string[]> = {
  bangalore: ['Lalbagh Botanical Garden', 'Cubbon Park', 'Vidhana Soudha', 'Bangalore Palace', 'ISKCON Temple', 'Commercial Street', 'Nandi Hills', 'Bull Temple'],
  paris:     ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Musée d\'Orsay', 'Sacré-Cœur', 'Versailles', 'Seine River Cruise'],
  mumbai:    ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Bandra-Worli Sea Link', 'Chhatrapati Shivaji Museum', 'Juhu Beach', 'Siddhivinayak Temple', 'Dharavi'],
  delhi:     ['Red Fort', 'India Gate', 'Qutub Minar', 'Humayun\'s Tomb', 'Lotus Temple', 'Chandni Chowk', 'Akshardham', 'Connaught Place'],
  bali:      ['Tanah Lot Temple', 'Ubud Monkey Forest', 'Tegallalang Rice Terraces', 'Kuta Beach', 'Seminyak', 'Mount Batur', 'Uluwatu Temple', 'Nusa Penida'],
  tokyo:     ['Shibuya Crossing', 'Senso-ji Temple', 'Mount Fuji', 'Shinjuku Gyoen', 'TeamLab Borderless', 'Akihabara', 'Tsukiji Market', 'Imperial Palace'],
  dubai:     ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Gold Souk', 'Desert Safari', 'Dubai Frame', 'Jumeirah Beach', 'Miracle Garden'],
  default:   ['City Centre', 'Main Market', 'Historic District', 'Cultural Museum', 'Local Park', 'Famous Street'],
};

function getSpotsForDestination(destination: string): string[] {
  const key = destination.trim().toLowerCase().split(',')[0];
  for (const [city, spots] of Object.entries(DESTINATION_SPOTS)) {
    if (city !== 'default' && key.includes(city)) return spots;
  }
  return DESTINATION_SPOTS.default;
}

/* ── Hotel tags ──────────────────────────────────────────────────────── */
const HOTEL_TAGS = [
  'Heritage', 'Pool', 'Family', 'Business', 'Quiet', 'Spa',
  'WiFi', 'Eco', 'Pet-Friendly', 'Rooftop', 'Sea View', 'Mountain View',
  'Airport Shuttle', 'Gym', 'Parking', 'Temple Nearby',
  'Breakfast Included', 'Late Checkout', 'Honeymoon', 'Budget Friendly',
];

/* ── Food tags ───────────────────────────────────────────────────────── */
const FOOD_TAGS = [
  'South Indian', 'North Indian', 'Chinese', 'Biryani', 'Seafood',
  'Street Food', 'Thali', 'Cafe', 'Bakery', 'Fast Food',
  'Rooftop Dining', 'Live Music', 'Outdoor Seating', 'Buffet', 'Craft Beer',
];

/* ── Quick presets ───────────────────────────────────────────────────── */
const QUICK_PRESETS: Array<{ label: string; emoji: string; tab: Tab }> = [
  { label: 'Weekend trip',   emoji: '🏖️', tab: 'Hotels' },
  { label: 'Business stay',  emoji: '💼', tab: 'Hotels' },
  { label: 'Family outing',  emoji: '👨‍👩‍👧', tab: 'Itinerary' },
  { label: 'Best eats',      emoji: '🍽️', tab: 'Food' },
  { label: 'Plan my day',    emoji: '🗺️', tab: 'Itinerary' },
];

/* ── Destination inspiration cards ──────────────────────────────────── */
const INSPIRATION_CITIES = [
  { city: 'Goa',          emoji: '🌊', hook: 'Beaches & night vibes',    grad: 'linear-gradient(135deg,#3B82F6,#06B6D4)' },
  { city: 'Jaipur',       emoji: '🏰', hook: 'Forts, food & royalty',    grad: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
  { city: 'Manali',       emoji: '⛰️', hook: 'Snow, silence & pine',     grad: 'linear-gradient(135deg,#6366F1,#3B82F6)' },
  { city: 'Coorg',        emoji: '🌿', hook: 'Coffee, mist & calm',      grad: 'linear-gradient(135deg,#059669,#10B981)' },
  { city: 'Pondicherry',  emoji: '🛵', hook: 'French quarter & beaches', grad: 'linear-gradient(135deg,#D97706,#F59E0B)' },
  { city: 'Mysuru',       emoji: '🪔', hook: 'Palaces & filter coffee',  grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)' },
];

/* ── Quick search override type ─────────────────────────────────────── */
interface QuickOverride {
  tab?: Tab;
  destination?: string;
  hotelTags?: string[];
  foodTags?: string[];
  budget?: number;
  hotelArea?: string;
  dietType?: DietType;
  exploreTarget?: string;
}

/* ── Smart picks per city ────────────────────────────────────────────── */
interface SmartPick {
  label: string;
  sub: string;
  emoji: string;
  grad: string;
  overrides: QuickOverride;
}

const SMART_PICKS: Record<string, SmartPick[]> = {
  bangalore: [
    { label: 'Best coffee & cafes',  sub: 'Quick · Near you',     emoji: '☕', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', overrides: { tab: 'Food',      foodTags: ['Cafe'] } },
    { label: 'Heritage stays',        sub: 'Hotels · Curated',    emoji: '🏛️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
    { label: 'Plan my Bangalore day', sub: 'Full day · AI routed',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', overrides: { tab: 'Itinerary' } },
    { label: 'Top landmarks',         sub: 'What to see · Ranked',emoji: '🏯', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Explore',   exploreTarget: 'Vidhana Soudha' } },
    { label: 'Budget stays <₹3k',     sub: 'Hotels · Best value', emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Hotels',    budget: 3000, hotelTags: ['Budget Friendly'] } },
    { label: 'Best biryani',          sub: 'Food · Non-veg',      emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', overrides: { tab: 'Food',      foodTags: ['Biryani'] } },
  ],
  goa: [
    { label: 'Beach hotels',         sub: 'Sea view · Rated',     emoji: '🌊', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', overrides: { tab: 'Hotels',    hotelTags: ['Sea View'] } },
    { label: 'Best seafood',         sub: 'Fresh · Near beach',   emoji: '🦞', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Food',      foodTags: ['Seafood'] } },
    { label: '1-day Goa plan',       sub: 'Itinerary · Beaches',  emoji: '🛵', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see beaches',     sub: 'Explore · Ranked',     emoji: '🏖️', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', overrides: { tab: 'Explore',   exploreTarget: 'Calangute Beach' } },
    { label: 'Rooftop & night bars', sub: 'Food · Nightlife',     emoji: '🍹', grad: 'linear-gradient(135deg,#EF4444,#F97316)', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining', 'Craft Beer'] } },
    { label: 'Budget beach stays',   sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Hotels',    budget: 4000, hotelTags: ['Budget Friendly'] } },
  ],
  mumbai: [
    { label: 'Bandra stays',         sub: 'Hotels · Trendy area', emoji: '🏙️', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Hotels',    hotelArea: 'Bandra' } },
    { label: 'Street food',          sub: 'Iconic Mumbai eats',   emoji: '🌯', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', overrides: { tab: 'Food',      foodTags: ['Street Food'] } },
    { label: 'Marine Drive',         sub: 'Explore · Landmark',   emoji: '🌆', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', overrides: { tab: 'Explore',   exploreTarget: 'Marine Drive' } },
    { label: 'Full day Mumbai',      sub: 'Itinerary · AI plan',  emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', overrides: { tab: 'Itinerary' } },
    { label: 'Rooftop dining',       sub: 'Food · Special eve',   emoji: '🍽️', grad: 'linear-gradient(135deg,#EF4444,#F97316)', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining'] } },
    { label: 'Business hotels',      sub: 'Hotels · Corporate',   emoji: '💼', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Hotels',    hotelTags: ['Business'] } },
  ],
  jaipur: [
    { label: 'Heritage palaces',     sub: 'Explore · Pink City',  emoji: '🏰', grad: 'linear-gradient(135deg,#D97706,#EF4444)', overrides: { tab: 'Explore',   exploreTarget: 'Amber Fort' } },
    { label: 'Royal palace stays',   sub: 'Hotels · Heritage',    emoji: '🏯', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
    { label: 'Rajasthani thali',     sub: 'Food · Authentic',     emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', overrides: { tab: 'Food',      foodTags: ['Thali'] } },
    { label: 'Pink City walk',       sub: 'Itinerary · Full day', emoji: '🛺', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Itinerary' } },
    { label: 'Bazaar & markets',     sub: 'Explore · Shopping',   emoji: '🛍️', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Explore',   exploreTarget: 'Johari Bazaar' } },
    { label: 'Rooftop with views',   sub: 'Food · Fort views',    emoji: '✨', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining'] } },
  ],
  delhi: [
    { label: 'Old Delhi heritage',   sub: 'Itinerary · Walk',     emoji: '🕌', grad: 'linear-gradient(135deg,#EF4444,#F97316)', overrides: { tab: 'Itinerary' } },
    { label: 'Budget central stays', sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
    { label: 'Chandni Chowk food',   sub: 'Street food · Iconic', emoji: '🥙', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', overrides: { tab: 'Food',      foodTags: ['Street Food'] } },
    { label: 'Red Fort',             sub: 'Explore · Must-see',   emoji: '🏰', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', overrides: { tab: 'Explore',   exploreTarget: 'Red Fort' } },
    { label: 'Fine dining',          sub: 'Food · Top picks',     emoji: '🍽️', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Food',      foodTags: ['Buffet'] } },
    { label: 'Heritage hotels',      sub: 'Hotels · Old Delhi',   emoji: '🏛️', grad: 'linear-gradient(135deg,#EF4444,#D97706)', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
  ],
  default: [
    { label: 'Top rated hotels',     sub: 'Hotels · AI ranked',   emoji: '🏨', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', overrides: { tab: 'Hotels' } },
    { label: 'Best eats nearby',     sub: 'Food · Highly rated',  emoji: '🍽️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', overrides: { tab: 'Food' } },
    { label: 'Plan a full day',      sub: 'Itinerary · Optimised',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see spots',       sub: 'Explore · Don\'t miss',emoji: '🧭', grad: 'linear-gradient(135deg,#059669,#10B981)', overrides: { tab: 'Explore' } },
    { label: 'Budget stays',         sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
    { label: 'Pure veg options',     sub: 'Food · Filtered',      emoji: '🥗', grad: 'linear-gradient(135deg,#059669,#34D399)', overrides: { tab: 'Food',      dietType: 'Pure Veg' } },
  ],
};

function getSmartPicks(destination: string): SmartPick[] {
  const key = destination.trim().toLowerCase().split(',')[0];
  for (const [city, picks] of Object.entries(SMART_PICKS)) {
    if (city !== 'default' && key.includes(city)) return picks;
  }
  return SMART_PICKS.default;
}

/* ── Trending → filter overrides ────────────────────────────────────── */
const TRENDING_OVERRIDES: Record<string, QuickOverride> = {
  'Budget stays':    { tab: 'Hotels',    hotelTags: ['Budget Friendly'] },
  'Rooftop pool':    { tab: 'Hotels',    hotelTags: ['Rooftop', 'Pool'] },
  'Heritage hotels': { tab: 'Hotels',    hotelTags: ['Heritage'] },
  'Near airport':    { tab: 'Hotels',    hotelTags: ['Airport Shuttle'] },
  'Business hotels': { tab: 'Hotels',    hotelTags: ['Business'] },
  'Sea view rooms':  { tab: 'Hotels',    hotelTags: ['Sea View'] },
  'Biryani spots':   { tab: 'Food',      foodTags: ['Biryani'] },
  'Rooftop dining':  { tab: 'Food',      foodTags: ['Rooftop Dining'] },
  'Pure veg':        { tab: 'Food',      foodTags: ['Street Food'], dietType: 'Pure Veg' },
  'Street food':     { tab: 'Food',      foodTags: ['Street Food'] },
  'Seafood':         { tab: 'Food',      foodTags: ['Seafood'] },
  'Craft beer bars': { tab: 'Food',      foodTags: ['Craft Beer'] },
  'Family day out':  { tab: 'Itinerary' },
  'Couple getaway':  { tab: 'Itinerary' },
  'Solo explorer':   { tab: 'Itinerary' },
  'Heritage walk':   { tab: 'Itinerary' },
  '1-day plan':      { tab: 'Itinerary' },
  'Hidden gems':     { tab: 'Explore' },
  'Monuments':       { tab: 'Explore',   exploreTarget: 'Monuments' },
  'Nature spots':    { tab: 'Explore',   exploreTarget: 'Nature spots' },
  'Night markets':   { tab: 'Explore',   exploreTarget: 'Night markets' },
  'Art galleries':   { tab: 'Explore',   exploreTarget: 'Art galleries' },
  'Adventure parks': { tab: 'Explore',   exploreTarget: 'Adventure parks' },
  'Viewpoints':      { tab: 'Explore',   exploreTarget: 'Viewpoints' },
};

/* ── Tooltip ─────────────────────────────────────────────────────────── */
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-muted hover:text-brand transition-colors"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-dark text-white text-xs rounded-xl p-3 shadow-xl z-50 leading-relaxed"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ── Location bar ────────────────────────────────────────────────────── */
function LocationBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const [detecting, setDetecting] = useState(false);

  const detect = () => {
    setDetecting(true);
    navigator.geolocation?.getCurrentPosition(
      () => { onChange('Current Location'); setDetecting(false); },
      () => { onChange(''); setDetecting(false); },
    );
    if (!navigator.geolocation) { onChange(''); setDetecting(false); }
  };

  return (
    <div className="relative">
      {/* Left icon — spinner when detecting, search otherwise */}
      {detecting
        ? <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-[1.5px] border-brand border-t-transparent rounded-full animate-spin" />
        : <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      }

      <input
        type="text"
        value={detecting ? '' : value}
        onChange={e => !detecting && onChange(e.target.value)}
        placeholder={detecting ? 'Detecting your location…' : placeholder}
        readOnly={detecting}
        className={`w-full pl-9 pr-20 py-2 border rounded-lg text-xs focus:outline-none transition-colors ${
          detecting
            ? 'border-brand bg-brand-softer text-brand italic'
            : 'border-border focus:ring-2 focus:ring-brand-soft focus:border-brand'
        }`}
      />

      {/* Near me button — icon-only while detecting */}
      <button
        type="button"
        onClick={detect}
        disabled={detecting}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-0.5 bg-brand-softer text-brand text-[10px] font-bold px-2 py-1 rounded-md hover:bg-brand hover:text-white transition-colors disabled:pointer-events-none"
        title="Detect my location"
      >
        {detecting
          ? <span className="w-3.5 h-3.5 border-[1.5px] border-current border-t-transparent rounded-full animate-spin" />
          : <><Navigation className="w-3 h-3" /><span className="ml-0.5">Near me</span></>
        }
      </button>

      {!detecting && value && (
        <button type="button" onClick={() => onChange('')} className="absolute right-20 top-1/2 -translate-y-1/2 text-muted hover:text-heading">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/* ── Toggle group ────────────────────────────────────────────────────── */
function ToggleGroup<T extends string>({ options, value, onChange, accent }: {
  options: readonly T[]; value: T; onChange: (v: T) => void; accent: string;
}) {
  return (
    <div className="flex gap-1">
      {options.map(o => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className="flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all"
          style={value === o
            ? { background: accent, borderColor: accent, color: '#fff' }
            : { background: '#fff', borderColor: '#E5E7EB', color: '#6B7280' }
          }
        >{o}</button>
      ))}
    </div>
  );
}

/* ── Tag chip grid ───────────────────────────────────────────────────── */
function TagGrid({ tags, selected, onToggle, accent }: {
  tags: string[]; selected: string[]; onToggle: (t: string) => void; accent: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <button key={tag} type="button" onClick={() => onToggle(tag)}
          className="px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all"
          style={selected.includes(tag)
            ? { background: accent, borderColor: accent, color: '#fff' }
            : { background: '#fff', borderColor: '#E5E7EB', color: '#6B7280' }
          }
        >{tag}</button>
      ))}
    </div>
  );
}

/* ── Category selector — blue background, Booking.com style ─────────── */
function CategorySelector({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      className="rounded-2xl p-2 flex gap-1 relative z-10"
      style={{ background: '#1C64F2', boxShadow: '0 4px 20px rgba(28,100,242,0.35)' }}
    >
      {TABS.map(tab => {
        const meta = TAB_META[tab];
        const isActive = active === tab;
        return (
          <motion.button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl transition-all duration-200"
            style={isActive
              ? { background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.14)' }
              : { background: 'transparent' }
            }
            whileTap={{ scale: 0.96 }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 flex items-center justify-center transition-all duration-200"
              style={{ color: isActive ? '#1C64F2' : '#fff' }}
            >
              {meta.bigIcon}
            </div>

            {/* Label */}
            <span
              className="text-[11px] font-bold uppercase tracking-wide transition-colors duration-200"
              style={{ color: isActive ? '#1C64F2' : '#fff' }}
            >
              {meta.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── Exports ─────────────────────────────────────────────────────────── */
export interface DashboardFilters {
  tab: Tab;
  destination: string;
  startDate: string;
  endDate: string;
  numPeople: number;
  budget: number;
  hotelTags: string[];
  hotelArea: string;
  foodLocation: string;
  foodTags: string[];
  foodBudget: FoodBudget;
  dietType: DietType;
  diningVibe: DiningVibe;
  itinDate: string;
  startPoint: string;
  startTime: string;
  exploreTarget: string;
  visitTime: string;
}

interface DashboardProps {
  destination: string;
  initialTab?: Tab;
  onSearch: (filters: DashboardFilters) => void;
  loading: boolean;
  recentSearches?: Array<{ destination: string; tab: Tab }>;
  onDestinationSelect?: (destination: string) => void;
}

export function Dashboard({ destination, initialTab = 'Hotels', onSearch, loading, recentSearches = [], onDestinationSelect }: DashboardProps) {
  const today    = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [activeTab, setActiveTab]       = useState<Tab>(initialTab);
  const [startDate, setStartDate]       = useState(today);
  const [endDate, setEndDate]           = useState(tomorrow);
  const [numPeople, setNumPeople]       = useState(2);
  const [budget, setBudget]             = useState(15000);
  const [hotelTags, setHotelTags]       = useState<string[]>([]);
  const [hotelArea, setHotelArea]       = useState('');
  const [foodLocation, setFoodLocation] = useState('');
  const [foodTags, setFoodTags]         = useState<string[]>([]);
  const [foodBudget, setFoodBudget]     = useState<FoodBudget>('Medium');
  const [dietType, setDietType]         = useState<DietType>('Veg');
  const [diningVibe, setDiningVibe]     = useState<DiningVibe>('Family');
  const [itinDate, setItinDate]         = useState(today);
  const [startPoint, setStartPoint]     = useState('');
  const [startTime, setStartTime]       = useState('09:00');
  const [exploreTarget, setExploreTarget] = useState('');
  const [visitTime, setVisitTime]       = useState('');
  const [hotelAdvOpen, setHotelAdvOpen] = useState(false);
  const [foodAdvOpen, setFoodAdvOpen]   = useState(false);

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  const toggleHotelTag = (t: string) => setHotelTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleFoodTag  = (t: string) => setFoodTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  const popularSpots = getSpotsForDestination(destination);
  const meta = TAB_META[activeTab];

  /* ── Core search builder ────────────────────────────────────────────── */
  const buildFilters = (ov: QuickOverride = {}): DashboardFilters => ({
    tab:          ov.tab          ?? activeTab,
    destination:  ov.destination  ?? destination,
    startDate, endDate, numPeople,
    budget:       ov.budget       ?? budget,
    hotelTags:    ov.hotelTags    ?? hotelTags,
    hotelArea:    ov.hotelArea    ?? hotelArea,
    foodLocation,
    foodTags:     ov.foodTags     ?? foodTags,
    foodBudget,
    dietType:     ov.dietType     ?? dietType,
    diningVibe,
    itinDate, startPoint, startTime,
    exploreTarget: ov.exploreTarget ?? exploreTarget,
    visitTime,
  });

  const triggerSearch = (ov: QuickOverride = {}) => {
    if (ov.tab) setActiveTab(ov.tab);
    onSearch(buildFilters(ov));
  };

  const handleSearch = () => onSearch(buildFilters());

  const renderFilters = () => {
    switch (activeTab) {

      /* ── Hotels ─────────────────────────────────────────────── */
      case 'Hotels': return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Check-in</label>
              <input type="date" value={startDate} onChange={e => {
                  const v = e.target.value;
                  setStartDate(v);
                  if (v >= endDate) {
                    const d = new Date(v);
                    d.setDate(d.getDate() + 1);
                    setEndDate(d.toISOString().split('T')[0]);
                  }
                }}
                className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Check-out</label>
              <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Travellers</label>
              <input type="number" min={1} max={20} value={numPeople} onChange={e => setNumPeople(parseInt(e.target.value))}
                className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-heading uppercase tracking-wide">Total Budget</label>
              <span className="text-xs font-black text-brand">₹{budget.toLocaleString()}</span>
            </div>
            <input type="range" min={2000} max={100000} step={1000} value={budget} onChange={e => setBudget(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-brand" />
            <div className="flex justify-between mt-0.5"><span className="text-[10px] text-muted">₹2k</span><span className="text-[10px] text-muted">₹1,00,000</span></div>
          </div>

          {/* ── Advanced toggle ─────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setHotelAdvOpen(v => !v)}
            className="w-full flex items-center justify-between py-2 transition-opacity hover:opacity-80"
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3" style={{ color: '#1C64F2' }} />
              <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: '#1C64F2' }}>
                Advanced filters
              </span>
              {(hotelTags.length + (hotelArea ? 1 : 0)) > 0 && (
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: '#1C64F2', color: '#fff' }}>
                  {hotelTags.length + (hotelArea ? 1 : 0)}
                </span>
              )}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200`} style={{ color: '#1C64F2', transform: hotelAdvOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          <AnimatePresence>
            {hotelAdvOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-1 border-t border-border mt-1">
                  <div className="pt-2">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
                      Preferences
                      <Tooltip text="Select tags to personalise your results. Each tag refines the AI ranking — 2–3 tags gives the sharpest output." />
                    </label>
                    <TagGrid tags={HOTEL_TAGS} selected={hotelTags} onToggle={toggleHotelTag} accent="#1C64F2" />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
                      Visiting area
                      <Tooltip text="We'll recommend hotels near your visiting place — so you spend less time commuting." />
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                      <input type="text" placeholder="e.g. Lalbagh, MG Road, near airport…"
                        value={hotelArea} onChange={e => setHotelArea(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );

      /* ── Food ───────────────────────────────────────────────── */
      case 'Food': return (
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Where are you right now?
            </label>
            <LocationBar value={foodLocation} onChange={setFoodLocation} placeholder="Area, street, or landmark…" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Budget</label>
              <ToggleGroup options={['Low', 'Medium', 'High'] as const} value={foodBudget} onChange={setFoodBudget} accent="#1C64F2" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Diet</label>
              <ToggleGroup options={['Veg', 'Non-Veg', 'Pure Veg'] as const} value={dietType} onChange={setDietType} accent="#1C64F2" />
            </div>
          </div>

          {/* ── Advanced toggle ─────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setFoodAdvOpen(v => !v)}
            className="w-full flex items-center justify-between py-2 transition-opacity hover:opacity-80"
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3" style={{ color: '#1C64F2' }} />
              <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: '#1C64F2' }}>
                Advanced filters
              </span>
              {(foodTags.length + (diningVibe !== 'Family' ? 1 : 0)) > 0 && (
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: '#1C64F2', color: '#fff' }}>
                  {foodTags.length + (diningVibe !== 'Family' ? 1 : 0)}
                </span>
              )}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200`} style={{ color: '#1C64F2', transform: foodAdvOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          <AnimatePresence>
            {foodAdvOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-1 border-t border-border mt-1">
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Dining Vibe</label>
                    <div className="flex gap-1.5">
                      {([['Family', '👨‍👩‍👧‍👦'], ['Quick', '⚡'], ['Leisure', '✨']] as const).map(([v, e]) => (
                        <button key={v} type="button" onClick={() => setDiningVibe(v as DiningVibe)}
                          className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg border-2 text-[10px] font-bold uppercase transition-all"
                          style={diningVibe === v
                            ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                            : { borderColor: '#E5E7EB', background: '#fff', color: '#6B7280' }
                          }
                        >
                          <span className="text-base">{e}</span>{v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
                      Cuisine & Vibe
                      <Tooltip text="Tag any cuisine or vibe that fits. The AI filters and ranks before results load." />
                    </label>
                    <TagGrid tags={FOOD_TAGS} selected={foodTags} onToggle={toggleFoodTag} accent="#1C64F2" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );

      /* ── Itinerary ──────────────────────────────────────────── */
      case 'Itinerary': return (
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Starting Location</label>
            <LocationBar value={startPoint} onChange={setStartPoint} placeholder="e.g. Railway Station, Hotel name…" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Date</label>
              <input type="date" value={itinDate} onChange={e => setItinDate(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Start Time</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors" />
            </div>
          </div>

          <div className="rounded-lg p-2.5 border border-border" style={{ background: '#EBF5FF' }}>
            <p className="text-[11px] text-muted leading-relaxed">
              <span className="font-bold text-heading">Visual day planner</span> — AI sequences stops by proximity, avoids peak traffic hours, and shows entry tips per location.
            </p>
          </div>
        </div>
      );

      /* ── Explore ─────────────────────────────────────────────── */
      case 'Explore': return (
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Popular in {destination || 'your destination'}
            </label>
            <div className="relative">
              <select value={exploreTarget} onChange={e => setExploreTarget(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors">
                <option value="">Select a popular spot…</option>
                {popularSpots.map(s => <option key={s} value={s}>{s}</option>)}
                <option value="custom">Other — type below</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
            </div>
          </div>

          {(exploreTarget === '' || exploreTarget === 'custom') && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Search any place</label>
              <div className="relative">
                <input type="text" placeholder="Type any place name…"
                  value={exploreTarget === 'custom' ? '' : exploreTarget}
                  onChange={e => setExploreTarget(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors" />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Visit Time <span className="font-normal text-muted normal-case">(optional)</span>
            </label>
            <input type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors" />
          </div>
        </div>
      );
    }
  };

  const smartPicks = getSmartPicks(destination);

  return (
    <div className="w-full py-4 pb-24 lg:pb-4 px-4 sm:px-6 xl:px-[304px] space-y-3">

      {/* ── Blue category selector ─────────────────────────────── */}
      <CategorySelector active={activeTab} onChange={t => setActiveTab(t)} />

      {/* ── Filter card — white below ──────────────────────────── */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl overflow-hidden relative z-10 bg-white"
        style={{ border: '1px solid #E5E7EB' }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-3 border-b border-border" style={{ background: '#FAFAFA' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#1C64F2' }}>
            <span style={{ color: '#fff' }}>{meta.icon}</span>
          </div>
          <div className="min-w-0">
            <p className="font-display font-black text-sm text-heading leading-tight">{meta.headline}</p>
            <p className="text-xs text-muted mt-0.5 truncate">{meta.sub}</p>
          </div>
          <Sparkles className="w-3.5 h-3.5 ml-auto shrink-0 text-brand" />
        </div>

        <div className="p-4">
          {renderFilters()}
        </div>

        {/* ── CTA inside card ───────────────────────────────────── */}
        <div className="px-4 pb-4 pt-3 border-t border-border">
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border-2 border-brand text-brand bg-white hover:bg-brand hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-soft disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              : <Search className="w-4 h-4" />
            }
            {loading ? 'AI is on it…' : (
              activeTab === 'Hotels'    ? 'Find my hotel' :
              activeTab === 'Food'      ? 'Find restaurants' :
              activeTab === 'Itinerary' ? 'Build my day plan' :
              'Find what\'s worth seeing'
            )}
          </button>
        </div>
      </motion.div>

      {/* ── Recent + Quick start ───────────────────────────────── */}
      <div className="relative z-10 space-y-3">

        {recentSearches.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Recent
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onDestinationSelect?.(s.destination);
                    triggerSearch({ tab: s.tab, destination: s.destination });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-body hover:border-brand hover:text-brand transition-colors"
                >
                  <MapPin className="w-3 h-3 text-muted shrink-0" />
                  {s.destination}
                  <span className="text-[10px] text-muted">· {s.tab}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Quick start
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PRESETS.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => triggerSearch({ tab: p.tab })}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-border text-xs font-semibold text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                <span>{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ══ AI Smart Picks ══════════════════════════════════════════════════ */}
      <div className="relative z-10 pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand shrink-0" />
          <span className="text-xs font-bold text-heading">
            Try in {destination || 'your city'}
          </span>
          <span className="text-[10px] text-muted ml-auto">Tap → instant AI picks</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {smartPicks.map((pick, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => triggerSearch(pick.overrides)}
              className="shrink-0 w-[132px] h-[88px] rounded-2xl relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              style={{ background: pick.grad }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xl leading-none">{pick.emoji}</span>
                  <Sparkles className="w-3 h-3 text-white/50" />
                </div>
                <div>
                  <p className="text-white font-black text-[11px] leading-tight">{pick.label}</p>
                  <p className="text-white/65 text-[9px] mt-0.5 leading-tight">{pick.sub}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ Discover more ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-border pt-5 space-y-5">

        {/* Where to next */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-black text-base text-heading">Where to next?</h2>
            <span className="text-[10px] text-muted">Tap to explore</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {INSPIRATION_CITIES.map(c => (
              <button
                key={c.city}
                type="button"
                onClick={() => {
                  onDestinationSelect?.(c.city);
                  triggerSearch({ tab: 'Hotels', destination: c.city });
                }}
                className="shrink-0 w-32 h-20 rounded-xl overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group"
                style={{ background: c.grad }}
              >
                <div className="absolute inset-0 flex flex-col items-start justify-end p-2.5">
                  <span className="text-xl mb-0.5 drop-shadow">{c.emoji}</span>
                  <p className="text-white font-black text-xs leading-tight">{c.city}</p>
                  <p className="text-white/80 text-[9px] leading-tight">{c.hook}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
            <span className="text-xs font-bold text-heading">
              Trending in {destination || 'your city'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.trending.map(topic => (
              <motion.button
                key={topic}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerSearch(TRENDING_OVERRIDES[topic] ?? { tab: activeTab })}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-white text-body hover:border-brand hover:text-brand hover:bg-blue-50 transition-colors duration-150"
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
