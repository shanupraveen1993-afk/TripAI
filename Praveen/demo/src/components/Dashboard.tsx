import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, ChevronDown, ChevronRight, Sparkles, MapPin, Navigation, X,
  Hotel, Utensils, Route, Compass, Flame, Clock,
} from 'lucide-react';
import { fetchCityTags } from '../api/client';
import { Tab } from './ui/Tabs';

const isThanjavur = (dest: string) =>
  /thanjavur|tanjore|tanjore/i.test(dest.trim()) || dest.trim() === '';

const uImg = (id: string, w = 320, h = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

type DietType = 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg';
type MealTime = 'Any' | 'Breakfast' | 'Lunch' | 'Dinner';

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
    icon:        <Hotel        className="w-4 h-4" />,
    bigIcon:     <Hotel        className="w-6 h-6" />,
    accent:      '#1C64F2',
    accentBg:    '#EBF5FF',
    accentBorder:'#1C64F2',
    accentSoft:  '#1C64F215',
    label:       'Hotels',
    headline:    'Best hotel in Thanjavur for you?',
    sub:         'AI ranks by budget, distance to the Big Temple, and what reviewers actually say.',
    trending:    ['Near Big Temple', 'Budget stays', 'Heritage hotels', 'Temple Nearby', 'Family rooms', 'AC rooms'],
  },
  Food: {
    icon:        <Utensils     className="w-4 h-4" />,
    bigIcon:     <Utensils     className="w-6 h-6" />,
    accent:      '#D97706',
    accentBg:    '#FFFBEB',
    accentBorder:'#D97706',
    accentSoft:  '#D9770615',
    label:       'Food',
    headline:    'What\'s worth eating in Thanjavur?',
    sub:         'Authentic Chola-era cuisine, filter coffee, and local thali — ranked before you see them.',
    trending:    ['Thanjavur thali', 'Filter coffee', 'Pure veg', 'South Indian', 'Street food', 'Biryani spots'],
  },
  Itinerary: {
    icon:        <Route        className="w-4 h-4" />,
    bigIcon:     <Route        className="w-6 h-6" />,
    accent:      '#7C3AED',
    accentBg:    '#F5F3FF',
    accentBorder:'#7C3AED',
    accentSoft:  '#7C3AED15',
    label:       'Itinerary',
    headline:    'Your perfect day in Thanjavur.',
    sub:         'Big Temple → Palace → Art Gallery → Saraswathi Mahal — timed so you don\'t miss anything.',
    trending:    ['Big Temple morning', 'Full day heritage', 'Family outing', 'Couple getaway', '1-day plan', 'Photography walk'],
  },
  Explore: {
    icon:        <Compass className="w-4 h-4" />,
    bigIcon:     <Compass className="w-6 h-6" />,
    accent:      '#059669',
    accentBg:    '#ECFDF5',
    accentBorder:'#059669',
    accentSoft:  '#05966915',
    label:       'Explore',
    headline:    'Your AI guide to any Thanjavur location.',
    sub:         'Pick a top spot, choose your time slot — Gemini reads real reviews and gives you a personalised visit guide.',
    trending:    ['Brihadeeswarar Temple', 'Thanjavur Maratha Palace Royal Museum', 'Saraswathi Mahal', 'Gangaikonda', 'Morning visit', 'Evening visit'],
  },
};

const TABS: Tab[] = ['Hotels', 'Food', 'Itinerary', 'Explore'];

/* ── Dynamic popular spots per destination ───────────────────────────── */
const DESTINATION_SPOTS: Record<string, string[]> = {
  thanjavur: ['Brihadeeswarar Temple', 'Royal Palace Museum', 'Saraswathi Mahal Library', 'Thanjavur Art Gallery', 'Vijayanagara Fort', 'Gangaikonda Cholapuram', 'Airavatesvara Temple', 'River Kaveri'],
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

// Tags are loaded dynamically from /api/tags based on city — no hardcoded lists

/* ── Quick presets — image cards ────────────────────────────────────── */
const QUICK_PRESETS: Array<{ label: string; emoji: string; tab: Tab; imgId: string; grad: string }> = [
  { label: 'Near Big Temple', emoji: '🛕', tab: 'Hotels',    imgId: '1686310894901-d326b8722c13', grad: 'linear-gradient(135deg,#D97706,#F59E0B)' },
  { label: 'Local thali',     emoji: '🍛', tab: 'Food',      imgId: '1711153419402-336ee48f2138', grad: 'linear-gradient(135deg,#EF4444,#F97316)' },
  { label: 'Plan my day',     emoji: '🗺️', tab: 'Itinerary', imgId: '1713729991304-d0b6c328560e', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)' },
  { label: 'Top locations',   emoji: '🧭', tab: 'Explore',   imgId: '1708782462555-b3af03b4b3d2', grad: 'linear-gradient(135deg,#059669,#10B981)' },
  { label: 'Filter coffee',   emoji: '☕', tab: 'Food',      imgId: '1509042239860-f550ce710b93', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)' },
];

/* ── Destination inspiration cards ──────────────────────────────────── */
const INSPIRATION_CITIES = [
  { city: 'Big Temple',       emoji: '🛕', hook: 'UNESCO · Chola masterpiece', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1686310894901-d326b8722c13', exploreTarget: 'Brihadeeswarar Temple'         },
  { city: 'Royal Palace',     emoji: '🏰', hook: 'Maratha history & art',      grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', imgId: '1622018135960-249abd263aeb', exploreTarget: 'Thanjavur Maratha Palace Royal Museum'        },
  { city: 'Saraswathi Mahal', emoji: '📚', hook: '60,000 rare manuscripts',    grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1568045919115-f2dacbaa1899', exploreTarget: 'Saraswathi Mahal Library'      },
  { city: 'Kumbakonam',       emoji: '🌊', hook: 'Temple tanks & ghats',       grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1701665837448-cdbb9fab5a0d', exploreTarget: 'Kumbakonam Temple Tanks'       },
  { city: 'Gangaikonda',      emoji: '🏛️', hook: 'Hidden Chola capital',       grad: 'linear-gradient(135deg,#6366F1,#3B82F6)', imgId: '1567529684892-09290a1b2d05', exploreTarget: 'Gangaikonda Cholapuram'        },
  { city: 'Darasuram',        emoji: '🪔', hook: 'Airavatesvara Temple',       grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1541781774459-bb2af2f05b55', exploreTarget: 'Airavatesvara Temple Darasuram' },
];

/* ── Discover destinations — Booking.com style photo grid ────────────── */
const DISCOVER_DESTINATIONS = [
  { city: 'Goa',       tag: 'Beaches · Seafood · Sunsets',    imgId: '1512343879784-a960bf40e7f2', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', tab: 'Hotels'    as Tab, featured: true  },
  { city: 'Jaipur',    tag: 'Pink City · Forts · Heritage',   imgId: '1477587458883-47145ed94245', grad: 'linear-gradient(135deg,#D97706,#EF4444)', tab: 'Itinerary' as Tab, featured: false },
  { city: 'Udaipur',   tag: 'Lakes · Palaces',                imgId: 'tV2nFA7slEk',                grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', tab: 'Hotels'    as Tab, featured: false },
  { city: 'Mumbai',    tag: 'City Life · Nightlife',          imgId: 'xH43OxDSXYw',               grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', tab: 'Hotels'    as Tab, featured: false },
  { city: 'Rishikesh', tag: 'Adventure · Yoga · Rivers',      imgId: '1506905925346-21bda4d32df4', grad: 'linear-gradient(135deg,#059669,#0284C7)', tab: 'Explore'   as Tab, featured: false },
  { city: 'Kochi',     tag: 'Backwaters · Spice Coast',       imgId: 'RPCQYqLBoYE',               grad: 'linear-gradient(135deg,#059669,#10B981)', tab: 'Food'      as Tab, featured: false },
];

/* ── Popular destination city cards with real photos ────────────────── */
interface PopularCity {
  city: string;
  sub: string;
  imgId: string;
  grad: string;
  tab: Tab;
}

const POPULAR_DESTINATIONS: PopularCity[] = [
  { city: 'Mumbai',    sub: 'Gateway · Marine Drive',  imgId: '1598434192043-71111c1b3f41', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', tab: 'Hotels'    },
  { city: 'Goa',       sub: 'Beaches · Sunsets',        imgId: '1496442226666-8d4d0e62e6e9', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', tab: 'Hotels'    },
  { city: 'Jaipur',    sub: 'Pink City · Forts',        imgId: '1477587458883-47145ed94245', grad: 'linear-gradient(135deg,#D97706,#EF4444)', tab: 'Itinerary' },
  { city: 'Delhi',     sub: 'Red Fort · Chandni Chowk', imgId: '1713729991304-d0b6c328560e', grad: 'linear-gradient(135deg,#EF4444,#F97316)', tab: 'Itinerary' },
  { city: 'Hyderabad', sub: 'Charminar · Biryani',      imgId: '1657981630164-769503f3a9a8', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', tab: 'Food'      },
  { city: 'Bangalore', sub: 'Tech Hub · Gardens',       imgId: '1708782462555-b3af03b4b3d2', grad: 'linear-gradient(135deg,#059669,#10B981)', tab: 'Hotels'    },
  { city: 'Udaipur',   sub: 'City of Lakes · Palaces',  imgId: '1622018135960-249abd263aeb', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', tab: 'Hotels'    },
  { city: 'Kochi',     sub: 'Backwaters · Spice Coast', imgId: '1602216056096-3b40cc0c9944', grad: 'linear-gradient(135deg,#059669,#0284C7)', tab: 'Food'      },
];

/* ── Thanjavur action grid (Segment 1) ──────────────────────────────── */
const THANJAVUR_ACTIONS: Array<{
  tab: Tab; label: string; desc: string; emoji: string; imgId: string;
  overrides: { tab: Tab; hotelTag?: string; foodTag?: string; exploreTarget?: string };
}> = [
  { tab: 'Hotels',    label: 'Stay near Big Temple', desc: 'Top-rated · Walking distance',  emoji: '🛕', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTag: 'Near Temple' } },
  { tab: 'Food',      label: 'Thanjavur thali',       desc: 'Authentic Chola cuisine',       emoji: '🍛', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali' } },
  { tab: 'Itinerary', label: '1-day plan',            desc: 'AI routed · Full day',          emoji: '🗺️', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
  { tab: 'Explore',   label: 'Brihadeeswarar',        desc: 'UNESCO · Chola masterpiece',    emoji: '🏛️', imgId: '1701665837448-cdbb9fab5a0d', overrides: { tab: 'Explore',   exploreTarget: 'Brihadeeswarar Temple' } },
];

/* ── Quick search override type ─────────────────────────────────────── */
interface QuickOverride {
  tab?: Tab;
  destination?: string;
  hotelTag?: string;
  foodTag?: string;
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
  imgId?: string;
  overrides: QuickOverride;
}

const SMART_PICKS: Record<string, SmartPick[]> = {
  thanjavur: [
    { label: 'Near Big Temple',    sub: 'Hotels · Walking distance', emoji: '🛕', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTag: 'Near Temple' } },
    { label: 'Thanjavur thali',    sub: 'Food · Authentic Chola',    emoji: '🍛', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali' } },
    { label: 'Brihadeeswarar',     sub: 'Explore · UNESCO site',     emoji: '🏛️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1701665837448-cdbb9fab5a0d', overrides: { tab: 'Explore',   exploreTarget: 'Brihadeeswarar Temple' } },
    { label: '1-day Thanjavur',    sub: 'Itinerary · AI routed',     emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'Filter coffee',      sub: 'Food · Local café culture', emoji: '☕', grad: 'linear-gradient(135deg,#D97706,#EF4444)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'Royal Palace',       sub: 'Explore · Maratha heritage', emoji: '🏰', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1622018135960-249abd263aeb', overrides: { tab: 'Explore',   exploreTarget: 'Thanjavur Maratha Palace Royal Museum' } },
  ],
  bangalore: [
    { label: 'Best coffee & cafes',  sub: 'Quick · Near you',     emoji: '☕', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'Heritage stays',        sub: 'Hotels · Curated',    emoji: '🏛️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
    { label: 'Plan my Bangalore day', sub: 'Full day · AI routed',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Itinerary' } },
    { label: 'Top landmarks',         sub: 'What to see · Ranked',emoji: '🏯', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore',   exploreTarget: 'Vidhana Soudha' } },
    { label: 'City centre stays',     sub: 'Hotels · Best value', emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Best biryani',          sub: 'Food · Non-veg',      emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Biryani' } },
  ],
  goa: [
    { label: 'Beach hotels',         sub: 'Sea view · Rated',     emoji: '🌊', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTag: 'Sea View' } },
    { label: 'Best seafood',         sub: 'Fresh · Near beach',   emoji: '🦞', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1624791596524-d989400f3241', overrides: { tab: 'Food',      foodTag: 'Seafood' } },
    { label: '1-day Goa plan',       sub: 'Itinerary · Beaches',  emoji: '🛵', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see beaches',     sub: 'Explore · Ranked',     emoji: '🏖️', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Explore',   exploreTarget: 'Calangute Beach' } },
    { label: 'Cafe & street eats',   sub: 'Food · Nightlife',     emoji: '🍹', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
  ],
  mumbai: [
    { label: 'Bandra stays',         sub: 'Hotels · Trendy area', emoji: '🏙️', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelArea: 'Bandra' } },
    { label: 'Street food',          sub: 'Iconic Mumbai eats',   emoji: '🌯', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
    { label: 'Marine Drive',         sub: 'Explore · Landmark',   emoji: '🌆', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Explore',   exploreTarget: 'Marine Drive' } },
    { label: 'Full day Mumbai',      sub: 'Itinerary · AI plan',  emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Itinerary' } },
    { label: 'Best biryani',         sub: 'Food · Special pick',  emoji: '🍽️', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Food',      foodTag: 'Biryani' } },
    { label: 'Business hotels',      sub: 'Hotels · Corporate',   emoji: '💼', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'Business' } },
  ],
  jaipur: [
    { label: 'Heritage palaces',     sub: 'Explore · Pink City',  emoji: '🏰', grad: 'linear-gradient(135deg,#D97706,#EF4444)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Amber Fort' } },
    { label: 'Royal palace stays',   sub: 'Hotels · Heritage',    emoji: '🏯', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
    { label: 'Rajasthani thali',     sub: 'Food · Authentic',     emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali' } },
    { label: 'Pink City walk',       sub: 'Itinerary · Full day', emoji: '🛺', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Itinerary' } },
    { label: 'Bazaar & markets',     sub: 'Explore · Shopping',   emoji: '🛍️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Johari Bazaar' } },
    { label: 'Street food',          sub: 'Food · Iconic eats',   emoji: '✨', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
  ],
  delhi: [
    { label: 'Old Delhi heritage',   sub: 'Itinerary · Walk',     emoji: '🕌', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Chandni Chowk food',   sub: 'Street food · Iconic', emoji: '🥙', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
    { label: 'Red Fort',             sub: 'Explore · Must-see',   emoji: '🏰', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Explore',   exploreTarget: 'Red Fort' } },
    { label: 'North Indian thali',   sub: 'Food · Top picks',     emoji: '🍽️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali' } },
    { label: 'Heritage hotels',      sub: 'Hotels · Old Delhi',   emoji: '🏛️', grad: 'linear-gradient(135deg,#EF4444,#D97706)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
  ],
  default: [
    { label: 'Top rated hotels',     sub: 'Hotels · AI ranked',   emoji: '🏨', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels' } },
    { label: 'Best eats nearby',     sub: 'Food · Highly rated',  emoji: '🍽️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food' } },
    { label: 'Plan a full day',      sub: 'Itinerary · Optimised',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see spots',       sub: 'Explore · Don\'t miss',emoji: '🧭', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Pure veg options',     sub: 'Food · Filtered',      emoji: '🥗', grad: 'linear-gradient(135deg,#059669,#34D399)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      dietType: 'Veg' } },
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
  'Budget stays':    { tab: 'Hotels',    hotelTag: 'City Centre' },
  'Rooftop pool':    { tab: 'Hotels',    hotelTag: 'Rooftop' },
  'Heritage hotels': { tab: 'Hotels',    hotelTag: 'Heritage' },
  'Near airport':    { tab: 'Hotels',    hotelTag: 'City Centre' },
  'Business hotels': { tab: 'Hotels',    hotelTag: 'Business' },
  'Sea view rooms':  { tab: 'Hotels',    hotelTag: 'Sea View' },
  'Biryani spots':   { tab: 'Food',      foodTag: 'Biryani' },
  'Rooftop dining':  { tab: 'Food',      foodTag: 'Street Food' },
  'Pure veg':        { tab: 'Food',      foodTag: 'Street Food', dietType: 'Veg' },
  'Street food':     { tab: 'Food',      foodTag: 'Street Food' },
  'Seafood':         { tab: 'Food',      foodTag: 'Seafood' },
  'Craft beer bars': { tab: 'Food',      foodTag: 'Cafe' },
  'Family day out':  { tab: 'Itinerary' },
  'Couple getaway':  { tab: 'Itinerary' },
  'Solo explorer':   { tab: 'Itinerary' },
  'Heritage walk':   { tab: 'Itinerary' },
  '1-day plan':      { tab: 'Itinerary' },
  'Brihadeeswarar Temple':       { tab: 'Explore', exploreTarget: 'Brihadeeswarar Temple' },
  'Thanjavur Maratha Palace Royal Museum':            { tab: 'Explore', exploreTarget: 'Thanjavur Maratha Palace Royal Museum' },
  'Saraswathi Mahal':            { tab: 'Explore', exploreTarget: 'Saraswathi Mahal Library' },
  'Gangaikonda':                 { tab: 'Explore', exploreTarget: 'Gangaikonda Cholapuram' },
  'Morning visit':               { tab: 'Explore' },
  'Evening visit':               { tab: 'Explore' },
  'Photography walk':            { tab: 'Itinerary' },
  'Big Temple morning':          { tab: 'Itinerary' },
  'Full day heritage':           { tab: 'Itinerary' },
};

/* ── Location bar ────────────────────────────────────────────────────── */
function LocationBar({ value, onChange, placeholder, autoDetect, mockResolvedLocation = 'Thanjavur' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoDetect?: boolean;
  mockResolvedLocation?: string;
}) {
  const [detecting, setDetecting] = useState(false);
  const autoRan = useRef(false);

  const detect = () => {
    setDetecting(true);
    setTimeout(() => { onChange(mockResolvedLocation); setDetecting(false); }, 1800);
  };

  // Auto-trigger on mount when autoDetect=true and no value yet
  useEffect(() => {
    if (autoDetect && !value && !autoRan.current) {
      autoRan.current = true;
      detect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDetect]);

  return (
    <div className="relative">
      {/* Left icon — spinner when detecting, pin otherwise */}
      {detecting
        ? <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-[1.5px] border-brand border-t-transparent rounded-full animate-spin" />
        : <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      }

      <input
        type="text"
        value={detecting ? '' : value}
        onChange={e => !detecting && onChange(e.target.value)}
        placeholder={detecting ? 'Detecting current location…' : placeholder}
        readOnly={detecting}
        className={`w-full pl-9 pr-20 py-2 border rounded-lg text-xs focus:outline-none transition-colors ${
          detecting
            ? 'border-brand bg-brand-softer text-brand italic'
            : 'border-border focus:ring-2 focus:ring-brand-soft focus:border-brand'
        }`}
      />

      {/* Near me button */}
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

/* ── Category selector — sleek horizontal pill bar ──────────────────── */
function CategorySelector({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      className="rounded-xl p-1 flex gap-1"
      style={{ background: '#1C64F2', boxShadow: '0 4px 16px rgba(28,100,242,0.30)' }}
    >
      {TABS.map(tab => {
        const meta = TAB_META[tab];
        const isActive = active === tab;
        return (
          <motion.button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all duration-200"
            style={isActive
              ? { background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }
              : { background: 'transparent' }
            }
            whileTap={{ scale: 0.96 }}
          >
            <span className="flex items-center" style={{ color: isActive ? '#1C64F2' : 'rgba(255,255,255,0.9)' }}>
              {meta.icon}
            </span>
            <span
              className="text-[11px] font-bold tracking-wide transition-colors duration-200"
              style={{ color: isActive ? '#1C64F2' : 'rgba(255,255,255,0.9)' }}
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
  // Hotel
  hotelTag: string;      // single tag — city-personalised from /api/tags
  hotelArea: string;
  priceFilter: string;
  minRating: string;
  openNow: boolean;
  persona: string;       // Solo | Couple | Family | Business | ''
  // Food
  foodTag: string;       // single cuisine/type tag — city-personalised from /api/tags
  dietType: DietType;
  dineMode: string;
  mealTime: MealTime;
  // Itinerary
  itinDate: string;
  startPoint: string;
  startTime: string;
  // Explore
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
  const [activeTab, setActiveTab]           = useState<Tab>(initialTab);
  // Hotels
  const [priceFilter, setPriceFilter]       = useState('Any');
  const [hotelTag, setHotelTag]             = useState('');
  const [hotelArea, setHotelArea]           = useState('');
  const [areaFocused, setAreaFocused]       = useState(false);
  const [persona, setPersona]               = useState('');
  const [openNow, setOpenNow]               = useState(false);
  // Food
  const [foodTag, setFoodTag]               = useState('');
  const [dietType, setDietType]             = useState<DietType>('Any');
  const [mealTime, setMealTime]             = useState<MealTime>('Any');
  // Itinerary
  const [itinDate, setItinDate]             = useState<string>('today');
  const [startPoint, setStartPoint]         = useState('');
  const [startTime, setStartTime]           = useState<string>('');
  const [showTimeError, setShowTimeError]   = useState(false);
  // Explore
  const [exploreTarget, setExploreTarget]   = useState('');
  const [visitTime, setVisitTime]           = useState('Morning');

  const [categorySticky, setCategorySticky] = useState(true);
  const ctaSentinelRef = useRef<HTMLDivElement>(null);

  // Reset per-tab selections when switching tabs
  useEffect(() => { setPriceFilter('Any'); }, [activeTab]);

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  // Reset price filter when switching tabs — hotel ranges and food cost tiers are different
  useEffect(() => { setPriceFilter('Any'); }, [activeTab]);

  useEffect(() => {
    const el = ctaSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCategorySticky(true);
      } else {
        /* sticky only while CTA is ahead (below) or visible; unstick once scrolled past */
        setCategorySticky(entry.boundingClientRect.top > 0);
      }
    }, { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamic city-specific tags loaded from /api/tags
  const [hotelTagOptions, setHotelTagOptions] = useState<string[]>([]);
  const [foodTagOptions,  setFoodTagOptions]  = useState<string[]>([]);
  const [tagsLoading,     setTagsLoading]     = useState(false);

  useEffect(() => {
    if (!destination) return;
    setTagsLoading(true);
    // Reset selections when city changes
    setHotelTag('');
    setFoodTag('');
    Promise.all([
      fetchCityTags(destination, 'Hotels'),
      fetchCityTags(destination, 'Food'),
    ]).then(([ht, ft]) => {
      setHotelTagOptions(ht.slice(0, 8));
      setFoodTagOptions(ft.slice(0, 8));
    }).catch(() => {
      // Fallback to universal defaults on error
      setHotelTagOptions(['Heritage', 'Business', 'Family', 'City Centre', 'Parking', 'Near Temple', 'Luxury', 'In-House Restaurant']);
      setFoodTagOptions(['South Indian', 'Biryani', 'Cafe', 'Thali', 'Street Food', 'Sweets', 'North Indian', 'Bakery']);
    }).finally(() => setTagsLoading(false));
  }, [destination]);

  const popularSpots = getSpotsForDestination(destination);
  const meta = TAB_META[activeTab];

  /* ── Core search builder ────────────────────────────────────────────── */
  const buildFilters = (ov: QuickOverride = {}): DashboardFilters => {
    const today = new Date();
    const dateMap: Record<string, string> = {
      today:    today.toISOString().split('T')[0],
      tomorrow: new Date(today.getTime() + 86400000).toISOString().split('T')[0],
      dayafter: new Date(today.getTime() + 2 * 86400000).toISOString().split('T')[0],
    };
    const resolvedPersona = ov.tab === 'Hotels' ? persona : (ov.tab ? '' : persona);
    return {
      tab:          ov.tab          ?? activeTab,
      destination:  ov.destination  ?? destination,
      startDate: '', endDate: '', numPeople: 2, budget: 0,
      hotelTag:     ov.hotelTag     ?? hotelTag,
      hotelArea:    ov.hotelArea    ?? hotelArea,
      priceFilter,
      minRating:    'Any',
      openNow,
      persona:      resolvedPersona,
      foodTag:      ov.foodTag ?? foodTag,
      dietType:     (ov.dietType ?? dietType) as DietType,
      dineMode:     'Any',
      mealTime,
      itinDate:     dateMap[itinDate] ?? itinDate,
      startPoint,
      startTime,
      exploreTarget: ov.exploreTarget ?? exploreTarget,
      visitTime,
    };
  };

  const triggerSearch = (ov: QuickOverride = {}) => {
    if (ov.tab) setActiveTab(ov.tab);
    onSearch(buildFilters(ov));
  };

  const handleSearch = () => {
    if (activeTab === 'Itinerary' && !startTime) {
      setShowTimeError(true);
      return;
    }
    setShowTimeError(false);
    onSearch(buildFilters());
  };

  const renderFilters = () => {
    switch (activeTab) {

      /* ── Hotels ─────────────────────────────────────────────── */
      case 'Hotels': return (
        <div className="space-y-4">

          {/* Who's staying — persona picker */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
              Who's staying?
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {([
                { label: 'Solo',     sub: 'Value & proximity'  },
                { label: 'Couple',   sub: 'Ambience & comfort' },
                { label: 'Family',   sub: 'Space & safety'     },
                { label: 'Business', sub: 'WiFi & central'     },
              ] as const).map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPersona(prev => prev === p.label ? '' : p.label)}
                  className="flex flex-col items-start px-3 py-2 rounded-xl border-2 text-left transition-all"
                  style={persona === p.label
                    ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                    : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                  }
                >
                  <p className="text-[11px] font-black leading-tight">{p.label}</p>
                  <p className="text-[9px] opacity-60 leading-tight">{p.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Budget per night */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
              Budget per night
            </label>
            <div className="flex gap-1.5">
              {([
                { label: 'Economy',  sub: 'Budget stay',  val: 'PRICE_LEVEL_INEXPENSIVE' },
                { label: 'Standard', sub: 'Mid-range',    val: 'PRICE_LEVEL_MODERATE'    },
                { label: 'Premium',  sub: 'Luxury / Spa', val: 'PRICE_LEVEL_EXPENSIVE'   },
              ] as const).map(o => (
                <button
                  key={o.val}
                  type="button"
                  onClick={() => setPriceFilter(prev => prev === o.val ? 'Any' : o.val)}
                  className="flex-1 flex flex-col items-center py-2.5 rounded-xl border-2 transition-all"
                  style={priceFilter === o.val
                    ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                    : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                  }
                >
                  <span className="text-[11px] font-black">{o.label}</span>
                  <span className="text-[9px] opacity-60 mt-0.5">{o.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stay area — free-text with suggestions */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
              Area / Locality
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
              <input
                type="text"
                value={hotelArea}
                onChange={e => setHotelArea(e.target.value)}
                onFocus={() => setAreaFocused(true)}
                onBlur={() => setTimeout(() => setAreaFocused(false), 150)}
                placeholder="e.g. Medical College, Big Temple area…"
                className="w-full pl-9 pr-8 py-2 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors"
              />
              {hotelArea && (
                <button type="button" onClick={() => setHotelArea('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {!hotelArea && (
              <p className="text-[9px] text-muted mt-1">Type any area — search radius adjusts automatically</p>
            )}
          </div>

          {/* Hotel type — single-select city-personalised tags */}
          {hotelTagOptions.length > 0 && (
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
                Hotel type
                {tagsLoading && <span className="ml-1.5 inline-block w-2.5 h-2.5 border border-muted border-t-transparent rounded-full animate-spin align-middle" />}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {hotelTagOptions.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setHotelTag(prev => prev === tag ? '' : tag)}
                    className="px-3 py-1.5 rounded-full border-2 text-[10px] font-bold transition-all"
                    style={hotelTag === tag
                      ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                      : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      );

      /* ── Food ───────────────────────────────────────────────── */
      case 'Food': return (
        <div className="space-y-4">

          {/* Meal Moment — 3 pills */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
              Meal Moment
            </label>
            <div className="flex gap-1.5">
              {([
                { label: 'Breakfast', sub: 'Tiffin / Idli'  },
                { label: 'Lunch',     sub: 'Thali / Meals'  },
                { label: 'Dinner',    sub: 'Biryani / Full' },
              ] as const).map(m => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMealTime(prev => prev === m.label ? 'Any' : m.label)}
                  className="flex-1 flex flex-col items-center py-2.5 rounded-xl border-2 transition-all"
                  style={mealTime === m.label
                    ? { borderColor: '#D97706', background: '#FFFBEB', color: '#D97706' }
                    : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                  }
                >
                  <span className="text-[10px] font-black">{m.label}</span>
                  <span className="text-[9px] opacity-60 mt-0.5">{m.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* What I'm craving — single-select city-personalised tags */}
          {foodTagOptions.length > 0 && (
            <div>
              <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
                What I'm craving
                {tagsLoading && <span className="ml-1.5 inline-block w-2.5 h-2.5 border border-muted border-t-transparent rounded-full animate-spin align-middle" />}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {foodTagOptions.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFoodTag(prev => prev === tag ? '' : tag)}
                    className="flex items-center justify-center py-2.5 rounded-xl border-2 transition-all"
                    style={foodTag === tag
                      ? { borderColor: '#D97706', background: '#FFFBEB', color: '#D97706' }
                      : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                    }
                  >
                    <span className="text-[9px] font-bold text-center leading-tight px-1">{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Diet — simplified 3-way */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1.5">
              Diet
            </label>
            <div className="flex gap-1.5">
              {(['Any', 'Veg', 'Non-Veg'] as const).map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDietType(d as DietType)}
                  className="flex-1 flex items-center justify-center py-2 rounded-xl border-2 transition-all"
                  style={dietType === d
                    ? { borderColor: '#059669', background: '#ECFDF5', color: '#059669' }
                    : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                  }
                >
                  <span className="text-[10px] font-bold">{d}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      );

      /* ── Itinerary ──────────────────────────────────────────── */
      case 'Itinerary': return (
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Starting Location</label>
            <LocationBar value={startPoint} onChange={setStartPoint} placeholder="e.g. Railway Station, Hotel name…" />
          </div>

          {/* Date — Today / Tomorrow / Day After */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">Date</label>
            <div className="flex gap-1.5">
              {(['today', 'tomorrow', 'dayafter'] as const).map(d => {
                const labels: Record<string, string> = { today: 'Today', tomorrow: 'Tomorrow', dayafter: 'Day After' };
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setItinDate(d)}
                    className="flex-1 py-2 rounded-lg text-[10px] font-bold border-2 transition-all"
                    style={itinDate === d
                      ? { borderColor: '#7C3AED', background: '#F5F3FF', color: '#7C3AED' }
                      : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                    }
                  >
                    {labels[d]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slot — Morning / Afternoon / Evening + mandatory validation */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Time Slot <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1.5">
              {(['Morning', 'Afternoon', 'Evening'] as const).map(t => {
                const stops: Record<string, number> = { Morning: 5, Afternoon: 3, Evening: 2 };
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setStartTime(t); setShowTimeError(false); }}
                    className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg border-2 transition-all"
                    style={startTime === t
                      ? { borderColor: '#7C3AED', background: '#F5F3FF', color: '#7C3AED' }
                      : showTimeError
                        ? { borderColor: '#EF4444', background: '#FEF2F2', color: '#6B7280' }
                        : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                    }
                  >
                    <span className="text-[10px] font-black uppercase tracking-wide">{t}</span>
                    <span className="text-[9px] opacity-60">{stops[t]} stops</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {showTimeError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[10px] text-red-500 font-bold mt-1.5 flex items-center gap-1"
                >
                  <span>⚠</span> Please select a time slot to continue
                </motion.p>
              )}
            </AnimatePresence>
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
          {/* Location dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Top Location in Thanjavur
            </label>
            <div className="relative">
              <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
              <select
                value={exploreTarget}
                onChange={e => setExploreTarget(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand bg-surface appearance-none transition-colors"
              >
                <option value="">Select a location…</option>
                <option value="Brihadeeswarar Temple">Brihadeeswarar Temple (Big Temple)</option>
                <option value="Thanjavur Maratha Palace Royal Museum">Thanjavur Palace &amp; Royal Museum</option>
                <option value="Saraswathi Mahal Library">Saraswathi Mahal Library</option>
                <option value="Airavatesvara Temple Darasuram">Airavatesvara Temple, Darasuram</option>
                <option value="Sivaganga Fort">Sivaganga Fort</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
            </div>
          </div>

          {/* Time slot */}
          <div>
            <label className="block text-[10px] font-bold text-heading uppercase tracking-wide mb-2">
              When are you visiting?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                ['Morning',   '6am – 12pm'],
                ['Afternoon', '12pm – 4pm'],
                ['Evening',   '4pm – 8pm'],
              ] as const).map(([slot, range]) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setVisitTime(slot)}
                  className="flex flex-col items-center gap-0.5 py-2.5 rounded-xl border-2 transition-all"
                  style={visitTime === slot
                    ? { borderColor: '#059669', background: '#ECFDF5', color: '#059669' }
                    : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                  }
                >
                  <span className="text-[10px] font-black uppercase tracking-wide">{slot}</span>
                  <span className="text-[9px] font-normal opacity-70">{range}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-2.5 border border-border" style={{ background: '#ECFDF5' }}>
            <p className="text-[11px] text-body leading-relaxed flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><span className="font-bold text-heading">AI Visit Guide</span> — Gemini reads real reviews and crowd data to build a time-specific plan for your chosen spot.</span>
            </p>
          </div>
        </div>
      );
    }
  };

  const smartPicks = getSmartPicks(destination);

  /* ── City-lock full screen — shown when destination ≠ Thanjavur ─── */
  if (!isThanjavur(destination) && destination.trim() !== '') {
    return (
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[92vh] px-5 py-12"
        style={{ background: 'linear-gradient(160deg,#06080F 0%,#0B0F1E 50%,#100816 100%)' }}
      >
        {/* ── Keyframe injection ─────────────────────────────────────── */}
        <style>{`
          @keyframes cl-ring { 0%,100%{transform:scale(1);opacity:.18} 50%{transform:scale(1.08);opacity:.32} }
          @keyframes cl-ring2 { 0%,100%{transform:scale(1);opacity:.10} 50%{transform:scale(1.12);opacity:.22} }
          @keyframes cl-ring3 { 0%,100%{transform:scale(1);opacity:.06} 50%{transform:scale(1.18);opacity:.14} }
          @keyframes cl-scan { 0%{top:-4px;opacity:0} 10%{opacity:.6} 90%{opacity:.2} 100%{top:100%;opacity:0} }
          @keyframes cl-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
          @keyframes cl-dot { 0%,100%{opacity:.15} 50%{opacity:.55} }
        `}</style>

        {/* ── Dot grid ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(251,146,60,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
        }} />

        {/* ── Scan line ────────────────────────────────────────────── */}
        <div className="absolute left-0 right-0 h-[2px] pointer-events-none z-10" style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.5), transparent)',
          animation: 'cl-scan 4s ease-in-out infinite',
        }} />

        {/* ── Floating ambient orbs ───────────────────────────────── */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.07), transparent 70%)', filter: 'blur(40px)',
        }} />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)', filter: 'blur(40px)',
        }} />

        {/* ── Pulsing concentric rings + temple ─────────────────── */}
        <div className="relative flex items-center justify-center mb-8" style={{ animation: 'cl-float 4s ease-in-out infinite' }}>
          {/* Ring 3 — outermost */}
          <div className="absolute rounded-full border border-orange-400/20" style={{
            width: 200, height: 200, animation: 'cl-ring3 3.6s ease-in-out infinite 0.8s',
          }} />
          {/* Ring 2 */}
          <div className="absolute rounded-full border border-orange-400/30" style={{
            width: 148, height: 148, animation: 'cl-ring2 3.6s ease-in-out infinite 0.4s',
          }} />
          {/* Ring 1 — inner */}
          <div className="absolute rounded-full border-2 border-orange-400/40" style={{
            width: 104, height: 104, animation: 'cl-ring 3.6s ease-in-out infinite',
          }} />
          {/* Core glow disk */}
          <div className="absolute w-16 h-16 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.35), transparent 70%)',
            filter: 'blur(12px)',
          }} />
          {/* Temple emoji */}
          <span className="relative z-10 select-none" style={{
            fontSize: '3.5rem', lineHeight: 1,
            filter: 'drop-shadow(0 0 18px rgba(251,146,60,0.9)) drop-shadow(0 0 40px rgba(251,146,60,0.4))',
          }}>🛕</span>
        </div>

        {/* ── City signal badge ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-mono font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(239,68,68,0.35)',
            color: '#F87171',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Signal not found · {destination}
        </motion.div>

        {/* ── Headline ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-center mb-4"
        >
          <h1 className="font-display font-black tracking-tight leading-none mb-1" style={{
            fontSize: 'clamp(2rem, 7vw, 3.2rem)',
            background: 'linear-gradient(135deg, #FB923C 0%, #FBBF24 50%, #FB923C 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto', backgroundClip: 'text',
          }}>
            LIVE IN THANJAVUR
          </h1>
          <p className="text-[11px] font-mono tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(251,191,36,0.5)' }}>
            AI · Travel · India
          </p>
        </motion.div>

        {/* ── Glass info card ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          className="w-full max-w-xs text-center px-5 py-4 rounded-2xl mb-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every city in India is on its way.
            <span className="font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}> {destination}</span> will be live soon —
            you'll be the first to explore it.
          </p>
        </motion.div>

        {/* ── Made in India badge ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(251,146,60,0.08)',
            border: '1px solid rgba(251,146,60,0.3)',
            color: 'rgba(251,146,60,0.85)',
          }}
        >
          <span>🇮🇳</span>
          <span>#MadeInIndia · All Cities Coming Soon</span>
        </motion.div>

        {/* ── CTA button ───────────────────────────────────────────── */}
        <motion.button
          type="button"
          onClick={() => onDestinationSelect?.('Thanjavur')}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.33 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F97316, #FB923C)',
            boxShadow: '0 0 32px rgba(249,115,22,0.45), 0 0 8px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <span className="relative z-10">Try Thanjavur</span>
          <ChevronRight className="w-4 h-4 relative z-10" />
          {/* Button shine */}
          <div className="absolute inset-0 opacity-20" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }} />
        </motion.button>

        {/* ── Floating pixel dots ───────────────────────────────────── */}
        {[
          { top: '12%', left: '8%',  delay: '0s',    size: 3 },
          { top: '22%', left: '88%', delay: '0.8s',  size: 2 },
          { top: '72%', left: '6%',  delay: '1.4s',  size: 2 },
          { top: '80%', left: '90%', delay: '0.4s',  size: 3 },
          { top: '45%', left: '4%',  delay: '2s',    size: 2 },
          { top: '55%', left: '94%', delay: '1.2s',  size: 2 },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            background: '#FB923C',
            animation: `cl-dot 2.5s ease-in-out infinite ${d.delay}`,
          }} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[920px] mx-auto py-4 pb-24 lg:pb-4 px-4 space-y-3">

      {/* ── Blue category selector — sticky until CTA scrolled past ── */}
      <div
        className={`${categorySticky ? 'sticky top-[57px] z-30' : 'relative z-10'} -mx-4 px-4 pb-2 pt-1 transition-shadow`}
        style={categorySticky ? { background: 'rgba(249,250,251,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 1px 0 rgba(0,0,0,0.06)' } : {}}
      >
        <CategorySelector active={activeTab} onChange={t => setActiveTab(t)} />
      </div>

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
              activeTab === 'Hotels'    ? 'Find my hotel in Thanjavur' :
              activeTab === 'Food'      ? 'Find restaurants in Thanjavur' :
              activeTab === 'Itinerary' ? 'Build my Thanjavur day plan' :
              'Get my AI visit guide'
            )}
          </button>
        </div>
        {/* sentinel — category bar unsticks once this exits top of viewport */}
        <div ref={ctaSentinelRef} className="h-px" />
      </motion.div>

      {/* ── Recent searches ────────────────────────────────────── */}
      {recentSearches.length > 0 && (
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> Recent
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onDestinationSelect?.(s.destination); triggerSearch({ tab: s.tab, destination: s.destination }); }}
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

      {/* ══ SEGMENT 1 — Plan your visit (2×2 action grid) ══════════════════ */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-black text-base text-heading">Plan your visit</h2>
            <p className="text-[10px] text-muted mt-0.5">Tap a card — AI builds your shortlist</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {THANJAVUR_ACTIONS.map(item => (
            <motion.button
              key={item.tab}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => triggerSearch(item.overrides)}
              className="relative overflow-hidden rounded-2xl h-[162px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group text-left"
            >
              <img
                src={uImg(item.imgId, 440, 324)}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 rounded-2xl" style={{ background: TAB_META[item.tab].accent, opacity: 0.25 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent rounded-2xl" />
              {/* Tab pill */}
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="text-white text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-full"
                  style={{ background: TAB_META[item.tab].accent }}
                >
                  {item.tab}
                </span>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                <span className="text-2xl leading-none drop-shadow">{item.emoji}</span>
                <p className="text-white font-display font-black text-base leading-tight mt-1.5 drop-shadow">{item.label}</p>
                <p className="text-white/70 text-[10px] mt-0.5 leading-tight">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ SEGMENT 2 — Discover Thanjavur (landmark scroll) ═══════════════ */}
      <div className="relative z-10 border-t border-border pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-black text-base text-heading">Discover Thanjavur</h2>
            <p className="text-[10px] text-muted mt-0.5">Must-see landmarks · Opens Explore</p>
          </div>
          <span className="text-[10px] text-muted shrink-0">Swipe →</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {INSPIRATION_CITIES.map(c => (
            <button
              key={c.city}
              type="button"
              onClick={() => triggerSearch({ tab: 'Explore', exploreTarget: c.exploreTarget })}
              className="shrink-0 w-[220px] h-[150px] rounded-2xl overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group"
              style={{ background: c.grad }}
            >
              {c.imgId && (
                <img
                  src={uImg(c.imgId, 440, 300)}
                  alt={c.city}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute top-3 right-3 z-10">
                <span className="text-white text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-full"
                  style={{ background: TAB_META.Explore.accent }}>
                  Explore
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="text-2xl leading-none drop-shadow">{c.emoji}</span>
                <p className="text-white font-display font-black text-base leading-tight mt-1.5 drop-shadow">{c.city}</p>
                <p className="text-white/75 text-[11px] mt-0.5 leading-tight">{c.hook}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ══ SEGMENT 3 — Plan another city (destination scroll) ═════════════ */}
      <div className="relative z-10 border-t border-border pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-black text-base text-heading">Plan another city</h2>
            <p className="text-[10px] text-muted mt-0.5">Tap to switch destination</p>
          </div>
          <span className="text-[10px] text-muted shrink-0">Swipe →</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {POPULAR_DESTINATIONS.map(c => (
            <motion.button
              key={c.city}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => { onDestinationSelect?.(c.city); triggerSearch({ tab: c.tab, destination: c.city }); }}
              className="shrink-0 w-[220px] h-[150px] rounded-2xl overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group"
            >
              <img
                src={uImg(c.imgId, 440, 300)}
                alt={c.city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0" style={{ background: c.grad, opacity: 0.3 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 z-10">
                <span className="text-white text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-full"
                  style={{ background: TAB_META[c.tab].accent }}>
                  {c.tab}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-white font-display font-black text-xl leading-tight drop-shadow">{c.city}</p>
                <p className="text-white/75 text-[11px] mt-0.5 leading-tight">{c.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Trending chips ─────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border pt-5 pb-2">
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
  );
}
