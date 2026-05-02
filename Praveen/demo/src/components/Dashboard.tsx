import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Info, ChevronDown, ChevronRight, Sparkles, MapPin, Navigation, X,
  Hotel, Utensils, Route, Compass, Flame, Zap, Clock, Star,
} from 'lucide-react';
import { fetchCityTags } from '../api/client';
import { Tab } from './ui/Tabs';

const isThanjavur = (dest: string) =>
  /thanjavur|tanjore|tanjore/i.test(dest.trim()) || dest.trim() === '';

const uImg = (id: string, w = 320, h = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

type DietType      = 'Any' | 'Veg' | 'Non-Veg';
type DineMode      = 'Any' | 'Dine-in' | 'Takeout';
type MinRating     = 'Any' | '3.5+' | '4.0+' | '4.5+';
// Hotel price ranges (actual INR per night) and food cost tiers (keyword-based)
const HOTEL_PRICE_OPTIONS = ['Any', '₹1K-5K', '₹5K-10K', '₹15K+'] as const;
const FOOD_COST_OPTIONS   = ['Any', 'Low Cost', 'Medium Cost', 'High Cost', 'Expensive'] as const;
const FOOD_COST_LABELS: Record<string, string> = {
  'Any': 'Any', 'Low Cost': 'Low', 'Medium Cost': 'Mid', 'High Cost': 'High', 'Expensive': 'Fine',
};

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

/* ── Hotel tags — Thanjavur-relevant only ────────────────────────────── */
const HOTEL_TAGS = [
  // Location (high accuracy)
  'Temple Nearby', 'Near Railway Station', 'Near Bus Stand', 'City Centre',
  // Type
  'Heritage', 'Budget Friendly', 'Family', 'Business',
  // Amenities common in Thanjavur
  'AC Rooms', 'WiFi', 'Parking', 'In-House Restaurant',
  'Rooftop Restaurant', 'Veg Kitchen', 'Breakfast Included',
  // Guest type
  'Couple Friendly', 'Honeymoon',
];

/* ── Food tags ───────────────────────────────────────────────────────── */
const FOOD_TAGS = [
  'South Indian', 'North Indian', 'Chinese', 'Biryani', 'Seafood',
  'Street Food', 'Thali', 'Tiffin', 'Filter Coffee', 'Sweets',
  'Banana Leaf', 'Cafe', 'Bakery', 'Fast Food',
  'Rooftop Dining', 'Outdoor Seating', 'Buffet',
];

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
  overrides: { tab: Tab; hotelTags?: string[]; foodTags?: string[]; exploreTarget?: string };
}> = [
  { tab: 'Hotels',    label: 'Stay near Big Temple', desc: 'Top-rated · Walking distance',  emoji: '🛕', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTags: ['Temple Nearby'] } },
  { tab: 'Food',      label: 'Thanjavur thali',       desc: 'Authentic Chola cuisine',       emoji: '🍛', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Thali', 'South Indian'] } },
  { tab: 'Itinerary', label: '1-day plan',            desc: 'AI routed · Full day',          emoji: '🗺️', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
  { tab: 'Explore',   label: 'Brihadeeswarar',        desc: 'UNESCO · Chola masterpiece',    emoji: '🏛️', imgId: '1701665837448-cdbb9fab5a0d', overrides: { tab: 'Explore',   exploreTarget: 'Brihadeeswarar Temple' } },
];

/* ── Quick search override type ─────────────────────────────────────── */
interface QuickOverride {
  tab?: Tab;
  destination?: string;
  hotelTags?: string[];
  foodTags?: string[];
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
    { label: 'Near Big Temple',    sub: 'Hotels · Walking distance', emoji: '🛕', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTags: ['Temple Nearby'] } },
    { label: 'Thanjavur thali',    sub: 'Food · Authentic Chola',    emoji: '🍛', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Thali', 'South Indian'] } },
    { label: 'Brihadeeswarar',     sub: 'Explore · UNESCO site',     emoji: '🏛️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1701665837448-cdbb9fab5a0d', overrides: { tab: 'Explore',   exploreTarget: 'Brihadeeswarar Temple' } },
    { label: '1-day Thanjavur',    sub: 'Itinerary · AI routed',     emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'Filter coffee',      sub: 'Food · Local café culture', emoji: '☕', grad: 'linear-gradient(135deg,#D97706,#EF4444)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTags: ['Cafe'] } },
    { label: 'Royal Palace',       sub: 'Explore · Maratha heritage', emoji: '🏰', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1622018135960-249abd263aeb', overrides: { tab: 'Explore',   exploreTarget: 'Thanjavur Maratha Palace Royal Museum' } },
  ],
  bangalore: [
    { label: 'Best coffee & cafes',  sub: 'Quick · Near you',     emoji: '☕', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTags: ['Cafe'] } },
    { label: 'Heritage stays',        sub: 'Hotels · Curated',    emoji: '🏛️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
    { label: 'Plan my Bangalore day', sub: 'Full day · AI routed',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Itinerary' } },
    { label: 'Top landmarks',         sub: 'What to see · Ranked',emoji: '🏯', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore',   exploreTarget: 'Vidhana Soudha' } },
    { label: 'Budget stays <₹3k',     sub: 'Hotels · Best value', emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
    { label: 'Best biryani',          sub: 'Food · Non-veg',      emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Biryani'] } },
  ],
  goa: [
    { label: 'Beach hotels',         sub: 'Sea view · Rated',     emoji: '🌊', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTags: ['Sea View'] } },
    { label: 'Best seafood',         sub: 'Fresh · Near beach',   emoji: '🦞', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1624791596524-d989400f3241', overrides: { tab: 'Food',      foodTags: ['Seafood'] } },
    { label: '1-day Goa plan',       sub: 'Itinerary · Beaches',  emoji: '🛵', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see beaches',     sub: 'Explore · Ranked',     emoji: '🏖️', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Explore',   exploreTarget: 'Calangute Beach' } },
    { label: 'Rooftop & night bars', sub: 'Food · Nightlife',     emoji: '🍹', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining', 'Craft Beer'] } },
    { label: 'Budget beach stays',   sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
  ],
  mumbai: [
    { label: 'Bandra stays',         sub: 'Hotels · Trendy area', emoji: '🏙️', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelArea: 'Bandra' } },
    { label: 'Street food',          sub: 'Iconic Mumbai eats',   emoji: '🌯', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Street Food'] } },
    { label: 'Marine Drive',         sub: 'Explore · Landmark',   emoji: '🌆', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Explore',   exploreTarget: 'Marine Drive' } },
    { label: 'Full day Mumbai',      sub: 'Itinerary · AI plan',  emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Itinerary' } },
    { label: 'Rooftop dining',       sub: 'Food · Special eve',   emoji: '🍽️', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining'] } },
    { label: 'Business hotels',      sub: 'Hotels · Corporate',   emoji: '💼', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTags: ['Business'] } },
  ],
  jaipur: [
    { label: 'Heritage palaces',     sub: 'Explore · Pink City',  emoji: '🏰', grad: 'linear-gradient(135deg,#D97706,#EF4444)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Amber Fort' } },
    { label: 'Royal palace stays',   sub: 'Hotels · Heritage',    emoji: '🏯', grad: 'linear-gradient(135deg,#7C3AED,#A78BFA)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
    { label: 'Rajasthani thali',     sub: 'Food · Authentic',     emoji: '🍛', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Thali'] } },
    { label: 'Pink City walk',       sub: 'Itinerary · Full day', emoji: '🛺', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Itinerary' } },
    { label: 'Bazaar & markets',     sub: 'Explore · Shopping',   emoji: '🛍️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Johari Bazaar' } },
    { label: 'Rooftop with views',   sub: 'Food · Fort views',    emoji: '✨', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Food',      foodTags: ['Rooftop Dining'] } },
  ],
  delhi: [
    { label: 'Old Delhi heritage',   sub: 'Itinerary · Walk',     emoji: '🕌', grad: 'linear-gradient(135deg,#EF4444,#F97316)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'Budget central stays', sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
    { label: 'Chandni Chowk food',   sub: 'Street food · Iconic', emoji: '🥙', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Street Food'] } },
    { label: 'Red Fort',             sub: 'Explore · Must-see',   emoji: '🏰', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Explore',   exploreTarget: 'Red Fort' } },
    { label: 'Fine dining',          sub: 'Food · Top picks',     emoji: '🍽️', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTags: ['Buffet'] } },
    { label: 'Heritage hotels',      sub: 'Hotels · Old Delhi',   emoji: '🏛️', grad: 'linear-gradient(135deg,#EF4444,#D97706)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Hotels',    hotelTags: ['Heritage'] } },
  ],
  default: [
    { label: 'Top rated hotels',     sub: 'Hotels · AI ranked',   emoji: '🏨', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels' } },
    { label: 'Best eats nearby',     sub: 'Food · Highly rated',  emoji: '🍽️', grad: 'linear-gradient(135deg,#D97706,#F59E0B)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food' } },
    { label: 'Plan a full day',      sub: 'Itinerary · Optimised',emoji: '🗺️', grad: 'linear-gradient(135deg,#7C3AED,#6366F1)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary' } },
    { label: 'Must-see spots',       sub: 'Explore · Don\'t miss',emoji: '🧭', grad: 'linear-gradient(135deg,#059669,#10B981)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore' } },
    { label: 'Budget stays',         sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#6366F1,#A78BFA)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTags: ['Budget Friendly'] } },
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
  'Budget stays':    { tab: 'Hotels',    hotelTags: ['Budget Friendly'] },
  'Rooftop pool':    { tab: 'Hotels',    hotelTags: ['Rooftop', 'Pool'] },
  'Heritage hotels': { tab: 'Hotels',    hotelTags: ['Heritage'] },
  'Near airport':    { tab: 'Hotels',    hotelTags: ['Airport Shuttle'] },
  'Business hotels': { tab: 'Hotels',    hotelTags: ['Business'] },
  'Sea view rooms':  { tab: 'Hotels',    hotelTags: ['Sea View'] },
  'Biryani spots':   { tab: 'Food',      foodTags: ['Biryani'] },
  'Rooftop dining':  { tab: 'Food',      foodTags: ['Rooftop Dining'] },
  'Pure veg':        { tab: 'Food',      foodTags: ['Street Food'], dietType: 'Veg' },
  'Street food':     { tab: 'Food',      foodTags: ['Street Food'] },
  'Seafood':         { tab: 'Food',      foodTags: ['Seafood'] },
  'Craft beer bars': { tab: 'Food',      foodTags: ['Craft Beer'] },
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
function LocationBar({ value, onChange, placeholder, autoDetect }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoDetect?: boolean;
}) {
  const [detecting, setDetecting] = useState(false);
  const autoRan = useRef(false);

  const detect = () => {
    setDetecting(true);
    // Phase 1: simulate GPS resolving to Thanjavur
    setTimeout(() => { onChange('Thanjavur'); setDetecting(false); }, 1800);
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

/* ── Tab-style segmented selector ───────────────────────────────────── */
function ToggleGroup<T extends string>({ options, value, onChange, accent, renderLabel }: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  accent: string;
  renderLabel?: (o: T) => React.ReactNode;
}) {
  return (
    <div
      className="flex p-0.5 rounded-xl gap-0.5"
      style={{ background: '#F3F4F6' }}
    >
      {options.map(o => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[10px] text-[10px] font-bold transition-all duration-150"
          style={value === o
            ? { background: '#fff', color: accent, boxShadow: '0 1px 3px rgba(0,0,0,0.12)', fontWeight: 800 }
            : { background: 'transparent', color: '#9CA3AF' }
          }
        >
          {renderLabel ? renderLabel(o) : o}
        </button>
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
  // Trip metadata (saved in history — not used as search constraints)
  startDate: string;
  endDate: string;
  numPeople: number;
  budget: number;
  // Hotel filters
  hotelTags: string[];
  hotelArea: string;
  priceFilter: string;   // 'Any' | '₹' | '₹₹' | '₹₹₹'
  minRating: string;     // 'Any' | '4.0+' | '4.5+'
  openNow: boolean;      // hard-filtered via openNow boolean
  // Food filters
  foodLocation: string;
  foodTags: string[];
  dietType: DietType;
  dineMode: string;
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
  const today    = new Date().toISOString().split('T')[0];

  const [activeTab, setActiveTab]       = useState<Tab>(initialTab);
  const [hotelTags, setHotelTags]       = useState<string[]>([]);
  const [priceFilter, setPriceFilter]   = useState('Any');
  const [minRating, setMinRating]       = useState<MinRating>('Any');
  const [openNow, setOpenNow]           = useState(false);
  const [foodTags, setFoodTags]         = useState<string[]>([]);
  const [dietType, setDietType]         = useState<DietType>('Any');
  const [itinDate, setItinDate]         = useState(today);
  const [startPoint, setStartPoint]     = useState('');
  const [startTime, setStartTime]       = useState('09:00');
  const [exploreTarget, setExploreTarget] = useState('');
  const [visitTime, setVisitTime]       = useState('Morning');
  const [categorySticky, setCategorySticky] = useState(true);
  const ctaSentinelRef = useRef<HTMLDivElement>(null);

  // Dynamic tags — updated when city changes
  const [dynamicHotelTags, setDynamicHotelTags] = useState<string[]>(HOTEL_TAGS);
  const [dynamicFoodTags,  setDynamicFoodTags]  = useState<string[]>(FOOD_TAGS);
  const [tagsLoading, setTagsLoading]           = useState(false);
  const tagsCache = useRef<Record<string, { hotel: string[]; food: string[] }>>({});
  const tagsDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadTagsForCity = useCallback(async (city: string) => {
    const key = city.trim().toLowerCase();
    if (!key || key.length < 2) return;

    // Serve from cache instantly
    if (tagsCache.current[key]) {
      setDynamicHotelTags(tagsCache.current[key].hotel);
      setDynamicFoodTags(tagsCache.current[key].food);
      return;
    }

    setTagsLoading(true);
    // Fetch both tabs in parallel
    const [hotel, food] = await Promise.all([
      fetchCityTags(city, 'Hotels'),
      fetchCityTags(city, 'Food'),
    ]);

    const resolved = {
      hotel: hotel.length >= 4 ? hotel : HOTEL_TAGS,
      food:  food.length  >= 4 ? food  : FOOD_TAGS,
    };
    tagsCache.current[key] = resolved;
    setDynamicHotelTags(resolved.hotel);
    setDynamicFoodTags(resolved.food);
    setTagsLoading(false);
  }, []);

  // Debounce tag fetch; clear selected tags immediately on city change
  useEffect(() => {
    setHotelTags([]);
    setFoodTags([]);
    if (tagsDebounce.current) clearTimeout(tagsDebounce.current);
    tagsDebounce.current = setTimeout(() => loadTagsForCity(destination), 800);
    return () => { if (tagsDebounce.current) clearTimeout(tagsDebounce.current); };
  }, [destination, loadTagsForCity]);

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

  const toggleHotelTag = (t: string) => setHotelTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleFoodTag  = (t: string) => setFoodTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  const popularSpots = getSpotsForDestination(destination);
  const meta = TAB_META[activeTab];

  /* ── Core search builder ────────────────────────────────────────────── */
  const buildFilters = (ov: QuickOverride = {}): DashboardFilters => ({
    tab:          ov.tab          ?? activeTab,
    destination:  ov.destination  ?? destination,
    startDate: '', endDate: '', numPeople: 2, budget: 0,
    hotelTags:    ov.hotelTags    ?? hotelTags,
    hotelArea:    ov.hotelArea    ?? '',
    priceFilter,
    minRating,
    openNow,
    foodLocation: '',
    foodTags:     ov.foodTags     ?? foodTags,
    dietType:     (ov.dietType    ?? dietType) as DietType,
    dineMode:     'Any',
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
          {/* Price Range — per-night INR ranges */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Price / Night
              <Tooltip text="₹1K-5K = budget · ₹5K-10K = mid-range · ₹15K+ = luxury — hard-filtered before AI ranking." />
            </label>
            <ToggleGroup
              options={HOTEL_PRICE_OPTIONS}
              value={priceFilter}
              onChange={setPriceFilter}
              accent="#D97706"
            />
          </div>

          {/* Min Rating — star label, gold accent */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Min Rating
              <Tooltip text="Only shows hotels at or above this Google rating." />
            </label>
            <ToggleGroup
              options={['Any', '3.5+', '4.0+', '4.5+'] as const}
              value={minRating}
              onChange={setMinRating}
              accent="#D97706"
              renderLabel={o => o === 'Any'
                ? <span>Any</span>
                : <><Star className="w-2.5 h-2.5 fill-current" />{o}</>
              }
            />
          </div>

          {/* Hotel preference tags — dynamic per city */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Preferences
              <Tooltip text="Tags are drawn from real hotels in this city. 2–3 tags gives the sharpest result." />
              {tagsLoading && <span className="ml-auto text-[9px] text-brand font-semibold animate-pulse">Updating for {destination}…</span>}
            </label>
            <TagGrid tags={dynamicHotelTags} selected={hotelTags} onToggle={toggleHotelTag} accent="#1C64F2" />
          </div>
        </div>
      );

      /* ── Food ───────────────────────────────────────────────── */
      case 'Food': return (
        <div className="space-y-3">
          {/* Open Now chip */}
          <div>
            <button
              type="button"
              onClick={() => setOpenNow(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border-2 transition-all"
              style={openNow
                ? { borderColor: '#059669', background: '#ECFDF5', color: '#059669' }
                : { borderColor: '#E5E7EB', background: '#fff', color: '#6B7280' }}
            >
              <span className={`w-2 h-2 rounded-full ${openNow ? 'bg-green-500' : 'bg-gray-300'}`} />
              Open Now
            </button>
          </div>

          {/* Cost Tier — keyword-frequency based */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Cost Level
              <Tooltip text="Low = budget meals · Mid = everyday dining · High = premium · Fine = fine dining. Filtered by review keyword frequency, not just price symbol." />
            </label>
            <ToggleGroup
              options={FOOD_COST_OPTIONS}
              value={priceFilter}
              onChange={setPriceFilter}
              accent="#D97706"
              renderLabel={o => FOOD_COST_LABELS[o] ?? o}
            />
          </div>

          {/* Diet — green */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Diet
              <Tooltip text="Veg filters restaurants Google marks servesVegetarianFood = true." />
            </label>
            <ToggleGroup options={['Any', 'Veg', 'Non-Veg'] as const} value={dietType} onChange={setDietType} accent="#059669" />
          </div>

          {/* Cuisine tags — dynamic per city */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-heading uppercase tracking-wide mb-1">
              Cuisine
              <Tooltip text="Tags are drawn from real restaurants in this city — most popular first." />
              {tagsLoading && <span className="ml-auto text-[9px] text-brand font-semibold animate-pulse">Updating…</span>}
            </label>
            <TagGrid tags={dynamicFoodTags} selected={foodTags} onToggle={toggleFoodTag} accent="#D97706" />
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
                <option value="Brihadeeswarar Temple">🛕 Brihadeeswarar Temple (Big Temple)</option>
                <option value="Thanjavur Maratha Palace Royal Museum">🏰 Thanjavur Palace &amp; Royal Museum</option>
                <option value="Saraswathi Mahal Library">📚 Saraswathi Mahal Library</option>
                <option value="Thanjavur Art Gallery">🖼️ Thanjavur Art Gallery</option>
                <option value="Sivaganga Fort">🏯 Sivaganga Fort</option>
                <option value="Rajarajan Manimandapam">🏛️ Rajarajan Manimandapam</option>
                <option value="Schwartz Church">⛪ Schwartz Church</option>
                <option value="River Kaveri Thanjavur">🌊 River Kaveri &amp; Grand Anicut</option>
                <option value="Gangaikonda Cholapuram">🏛️ Gangaikonda Cholapuram (45km)</option>
                <option value="Airavatesvara Temple Darasuram">🛕 Airavatesvara Temple, Darasuram</option>
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
                ['Morning',   '🌅', '6am – 12pm'],
                ['Afternoon', '☀️', '12pm – 4pm'],
                ['Evening',   '🌆', '4pm – 8pm'],
              ] as const).map(([slot, emoji, range]) => (
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
                  <span className="text-lg">{emoji}</span>
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
      <div className="w-full max-w-[920px] mx-auto py-4 pb-24 lg:pb-4 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="city-lock"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center py-16 px-6 min-h-[60vh] gap-6"
          >
            {/* Glow ring behind the temple */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full opacity-20 animate-pulse"
                style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
              <span className="text-6xl relative z-10 drop-shadow-lg">🛕</span>
            </div>

            {/* Heading */}
            <div className="space-y-2 max-w-sm">
              <p className="font-display font-black text-2xl text-heading leading-tight">
                We're live in Thanjavur
              </p>
              <p className="text-sm text-body leading-relaxed">
                Rolling out to every city in India — <strong className="text-heading">{destination}</strong> is on the list.
                You'll be the first to explore it when it's ready.
              </p>
            </div>

            {/* Made in India badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide"
              style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFF3E0)', border: '1.5px solid #FDBA74', color: '#C2410C' }}>
              <span>🇮🇳</span>
              <span>#MadeInIndia · All cities coming soon</span>
            </div>

            {/* Try Thanjavur CTA */}
            <button
              type="button"
              onClick={() => onDestinationSelect?.('Thanjavur')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.97] text-white hover:brightness-110 shadow-md hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#1C64F2,#3B82F6)' }}
            >
              <span>Explore Thanjavur instead</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Soft footnote */}
            <p className="text-[10px] text-muted mt-2">
              Built with love for India · Expanding city by city 🇮🇳
            </p>
          </motion.div>
        </AnimatePresence>
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
