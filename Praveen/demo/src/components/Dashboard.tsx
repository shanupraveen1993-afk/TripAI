import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, ChevronDown, ChevronRight, Sparkles, MapPin, Navigation, X,
  Hotel, Utensils, Route, Compass, Flame, Clock,
} from 'lucide-react';
import { fetchCityTags, fetchAutocomplete, AutocompleteSuggestion, CityTagsResult } from '../api/client';
import { Tab } from './ui/Tabs';
import { Button } from './ui/Button';

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
    headline:    'Best stays',
    sub:         'Price · reviews · AI-ranked',
    trending:    ['Near Big Temple', 'Heritage hotels', 'Temple Nearby', 'Family rooms', 'AC rooms'],
  },
  Food: {
    icon:        <Utensils     className="w-4 h-4" />,
    bigIcon:     <Utensils     className="w-6 h-6" />,
    accent:      '#1C64F2',
    accentBg:    '#EBF5FF',
    accentBorder:'#1C64F2',
    accentSoft:  '#1C64F215',
    label:       'Food',
    headline:    'Best eats',
    sub:         'Thali · coffee · AI-picked',
    trending:    ['Thanjavur thali/meals', 'Filter coffee', 'Pure veg', 'South Indian', 'Street food', 'Biryani spots'],
  },
  Itinerary: {
    icon:        <Route        className="w-4 h-4" />,
    bigIcon:     <Route        className="w-6 h-6" />,
    accent:      '#1C64F2',
    accentBg:    '#EBF5FF',
    accentBorder:'#1C64F2',
    accentSoft:  '#1C64F215',
    label:       'Itinerary',
    headline:    'Day planned',
    sub:         'Stops · traffic · optimised',
    trending:    ['Big Temple morning', 'Full day heritage', 'Family outing', 'Couple getaway', '1-day plan', 'Photography walk'],
  },
  Explore: {
    icon:        <Compass className="w-4 h-4" />,
    bigIcon:     <Compass className="w-6 h-6" />,
    accent:      '#1C64F2',
    accentBg:    '#EBF5FF',
    accentBorder:'#1C64F2',
    accentSoft:  '#1C64F215',
    label:       'Explore',
    headline:    'Explore spots',
    sub:         'Pick spot · instant guide',
    trending:    ['Brihadeeswarar Temple', 'Thanjavur Maratha Palace Royal Museum', 'Saraswathi Mahal', 'Gangaikonda', 'Morning visit', 'Evening visit'],
  },
};

const TABS: Tab[] = ['Hotels', 'Food', 'Itinerary', 'Explore'];

/* ── Advanced food keywords — from real 50-restaurant review analysis ─── */
// Items ordered by restaurant coverage from food-items.ts analysis (Thanjavur top-50)
const FOOD_ADVANCED: { group: string; items: string[] }[] = [
  { group: 'Rice & Meals',   items: ['Thali/Meals', 'Biryani', 'Dosa', 'Tea', 'Idli'] },
  { group: 'Non-Veg',        items: ['Mutton', 'Chicken', 'Fish Curry', 'Prawn', 'Crab'] },
  { group: 'Tiffin',         items: ['Vada', 'Pongal', 'Parotta', 'Idiyappam', 'Sambar'] },
  { group: 'Veg Dishes',     items: ['Paneer', 'Noodles', 'Filter Coffee', 'Soup', 'Sweets'] },
  { group: 'Specials',       items: ['Mandi', 'Shawarma', 'BBQ & Grills', 'Alfaham', 'Buffet'] },
];

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
  { label: 'Near Big Temple', emoji: '🛕', tab: 'Hotels',    imgId: '1686310894901-d326b8722c13', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)' },
  { label: 'Local thali',     emoji: '🍛', tab: 'Food',      imgId: '1711153419402-336ee48f2138', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)' },
  { label: 'Plan my day',     emoji: '🗺️', tab: 'Itinerary', imgId: '1713729991304-d0b6c328560e', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)' },
  { label: 'Top locations',   emoji: '🧭', tab: 'Explore',   imgId: '1708782462555-b3af03b4b3d2', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)' },
  { label: 'Filter coffee',   emoji: '☕', tab: 'Food',      imgId: '1509042239860-f550ce710b93', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)' },
];

/* ── Destination inspiration cards ──────────────────────────────────── */
const INSPIRATION_CITIES = [
  { city: 'Big Temple',       emoji: '🛕', hook: 'UNESCO · Chola masterpiece', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1686310894901-d326b8722c13', exploreTarget: 'Brihadeeswarar Temple'         },
  { city: 'Royal Palace',     emoji: '🏰', hook: 'Maratha history & art',      grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1622018135960-249abd263aeb', exploreTarget: 'Thanjavur Maratha Palace Royal Museum'        },
  { city: 'Saraswathi Mahal', emoji: '📚', hook: '60,000 rare manuscripts',    grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1568045919115-f2dacbaa1899', exploreTarget: 'Saraswathi Mahal Library'      },
  { city: 'Kumbakonam',       emoji: '🌊', hook: 'Temple tanks & ghats',       grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1701665837448-cdbb9fab5a0d', exploreTarget: 'Kumbakonam Temple Tanks'       },
  { city: 'Gangaikonda',      emoji: '🏛️', hook: 'Hidden Chola capital',       grad: 'linear-gradient(135deg,#6366F1,#3B82F6)', imgId: '1567529684892-09290a1b2d05', exploreTarget: 'Gangaikonda Cholapuram'        },
  { city: 'Darasuram',        emoji: '🪔', hook: 'Airavatesvara Temple',       grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1541781774459-bb2af2f05b55', exploreTarget: 'Airavatesvara Temple Darasuram' },
];

/* ── Discover destinations — Booking.com style photo grid ────────────── */
const DISCOVER_DESTINATIONS = [
  { city: 'Goa',       tag: 'Beaches · Seafood · Sunsets',    imgId: '1512343879784-a960bf40e7f2', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', tab: 'Hotels'    as Tab, featured: true  },
  { city: 'Jaipur',    tag: 'Pink City · Forts · Heritage',   imgId: '1477587458883-47145ed94245', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Itinerary' as Tab, featured: false },
  { city: 'Udaipur',   tag: 'Lakes · Palaces',                imgId: 'tV2nFA7slEk',                grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', tab: 'Hotels'    as Tab, featured: false },
  { city: 'Mumbai',    tag: 'City Life · Nightlife',          imgId: 'xH43OxDSXYw',               grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', tab: 'Hotels'    as Tab, featured: false },
  { city: 'Rishikesh', tag: 'Adventure · Yoga · Rivers',      imgId: '1506905925346-21bda4d32df4', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Explore'   as Tab, featured: false },
  { city: 'Kochi',     tag: 'Backwaters · Spice Coast',       imgId: 'RPCQYqLBoYE',               grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Food'      as Tab, featured: false },
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
  { city: 'Jaipur',    sub: 'Pink City · Forts',        imgId: '1477587458883-47145ed94245', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Itinerary' },
  { city: 'Delhi',     sub: 'Red Fort · Chandni Chowk', imgId: '1713729991304-d0b6c328560e', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Itinerary' },
  { city: 'Hyderabad', sub: 'Charminar · Biryani',      imgId: '1657981630164-769503f3a9a8', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', tab: 'Food'      },
  { city: 'Bangalore', sub: 'Tech Hub · Gardens',       imgId: '1708782462555-b3af03b4b3d2', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Hotels'    },
  { city: 'Udaipur',   sub: 'City of Lakes · Palaces',  imgId: '1622018135960-249abd263aeb', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', tab: 'Hotels'    },
  { city: 'Kochi',     sub: 'Backwaters · Spice Coast', imgId: '1602216056096-3b40cc0c9944', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', tab: 'Food'      },
];

/* ── Thanjavur action grid (Segment 1) ──────────────────────────────── */
const THANJAVUR_ACTIONS: Array<{
  tab: Tab; label: string; desc: string; emoji: string; imgId: string;
  overrides: QuickOverride;
}> = [
  { tab: 'Hotels',    label: 'Stay near Big Temple', desc: 'Top-rated · Walking distance',  emoji: '🛕', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTag: 'Near Big Temple' } },
  { tab: 'Food',      label: 'Thanjavur thali/meals',       desc: 'Authentic Chola cuisine',       emoji: '🍛', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali/Meals' } },
  { tab: 'Itinerary', label: '1-day plan',            desc: 'AI routed · Full day',          emoji: '🗺️', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
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
  startTime?: string;
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

/* ── Popular searches — shown below the filter card ─────────────────── */
const POPULAR_QUERIES: { label: string; overrides: QuickOverride }[] = [
  { label: 'best hotel in thanjavur',                      overrides: { tab: 'Hotels' } },
  { label: 'best hotel near big temple in thanjavur',      overrides: { tab: 'Hotels', hotelTag: 'Near Big Temple' } },
  { label: 'best family hotel in thanjavur',               overrides: { tab: 'Hotels', hotelTag: 'Friendly Staff' } },
  { label: 'best highly recommended hotel in thanjavur',   overrides: { tab: 'Hotels', hotelTag: 'Highly Recommended' } },
  { label: 'best hotel near railway station thanjavur',    overrides: { tab: 'Hotels', hotelTag: 'Near Railway Station' } },
];

const SMART_PICKS: Record<string, SmartPick[]> = {
  thanjavur: [
    { label: 'Near Big Temple',    sub: 'Hotels · Walking distance', emoji: '🛕', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels',    hotelTag: 'Near Big Temple' } },
    { label: 'Thanjavur thali/meals',    sub: 'Food · Authentic Chola',    emoji: '🍛', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali/Meals' } },
    { label: 'Brihadeeswarar',     sub: 'Explore · UNESCO site',     emoji: '🏛️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1701665837448-cdbb9fab5a0d', overrides: { tab: 'Explore',   exploreTarget: 'Brihadeeswarar Temple' } },
    { label: '1-day Thanjavur',    sub: 'Itinerary · AI routed',     emoji: '🗺️', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Filter coffee',      sub: 'Food · Local café culture', emoji: '☕', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'Royal Palace',       sub: 'Explore · Maratha heritage', emoji: '🏰', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1622018135960-249abd263aeb', overrides: { tab: 'Explore',   exploreTarget: 'Thanjavur Maratha Palace Royal Museum' } },
  ],
  bangalore: [
    { label: 'Best coffee & cafes',  sub: 'Quick · Near you',     emoji: '☕', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1509042239860-f550ce710b93', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'Heritage stays',        sub: 'Hotels · Curated',    emoji: '🏛️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
    { label: 'Plan my Bangalore day', sub: 'Full day · AI routed',emoji: '🗺️', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Top landmarks',         sub: 'What to see · Ranked',emoji: '🏯', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore',   exploreTarget: 'Vidhana Soudha' } },
    { label: 'City centre stays',     sub: 'Hotels · Best value', emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Best biryani',          sub: 'Food · Non-veg',      emoji: '🍛', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Biryani' } },
  ],
  goa: [
    { label: 'Beach hotels',         sub: 'Sea view · Rated',     emoji: '🌊', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTag: 'Sea View' } },
    { label: 'Best seafood',         sub: 'Fresh · Near beach',   emoji: '🦞', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1624791596524-d989400f3241', overrides: { tab: 'Food',      foodTag: 'Seafood' } },
    { label: '1-day Goa plan',       sub: 'Itinerary · Beaches',  emoji: '🛵', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Must-see beaches',     sub: 'Explore · Ranked',     emoji: '🏖️', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Explore',   exploreTarget: 'Calangute Beach' } },
    { label: 'Cafe & street eats',   sub: 'Food · Nightlife',     emoji: '🍹', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Food',      foodTag: 'Cafe' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1496442226666-8d4d0e62e6e9', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
  ],
  mumbai: [
    { label: 'Bandra stays',         sub: 'Hotels · Trendy area', emoji: '🏙️', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelArea: 'Bandra' } },
    { label: 'Street food',          sub: 'Iconic Mumbai eats',   emoji: '🌯', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
    { label: 'Marine Drive',         sub: 'Explore · Landmark',   emoji: '🌆', grad: 'linear-gradient(135deg,#0284C7,#06B6D4)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Explore',   exploreTarget: 'Marine Drive' } },
    { label: 'Full day Mumbai',      sub: 'Itinerary · AI plan',  emoji: '🗺️', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Best biryani',         sub: 'Food · Special pick',  emoji: '🍽️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Food',      foodTag: 'Biryani' } },
    { label: 'Business hotels',      sub: 'Hotels · Corporate',   emoji: '💼', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'Business' } },
  ],
  jaipur: [
    { label: 'Heritage palaces',     sub: 'Explore · Pink City',  emoji: '🏰', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Amber Fort' } },
    { label: 'Royal palace stays',   sub: 'Hotels · Heritage',    emoji: '🏯', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
    { label: 'Rajasthani thali',     sub: 'Food · Authentic',     emoji: '🍛', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali/Meals' } },
    { label: 'Pink City walk',       sub: 'Itinerary · Full day', emoji: '🛺', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Bazaar & markets',     sub: 'Explore · Shopping',   emoji: '🛍️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Explore',   exploreTarget: 'Johari Bazaar' } },
    { label: 'Street food',          sub: 'Food · Iconic eats',   emoji: '✨', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1477587458883-47145ed94245', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
  ],
  delhi: [
    { label: 'Old Delhi heritage',   sub: 'Itinerary · Walk',     emoji: '🕌', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Chandni Chowk food',   sub: 'Street food · Iconic', emoji: '🥙', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Street Food' } },
    { label: 'Red Fort',             sub: 'Explore · Must-see',   emoji: '🏰', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Explore',   exploreTarget: 'Red Fort' } },
    { label: 'North Indian thali',   sub: 'Food · Top picks',     emoji: '🍽️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      foodTag: 'Thali/Meals' } },
    { label: 'Heritage hotels',      sub: 'Hotels · Old Delhi',   emoji: '🏛️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Hotels',    hotelTag: 'Heritage' } },
  ],
  default: [
    { label: 'Top rated hotels',     sub: 'Hotels · AI ranked',   emoji: '🏨', grad: 'linear-gradient(135deg,#1C64F2,#3B82F6)', imgId: '1686310894901-d326b8722c13', overrides: { tab: 'Hotels' } },
    { label: 'Best eats nearby',     sub: 'Food · Highly rated',  emoji: '🍽️', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food' } },
    { label: 'Plan a full day',      sub: 'Itinerary · Optimised',emoji: '🗺️', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1713729991304-d0b6c328560e', overrides: { tab: 'Itinerary', startTime: 'Morning' } },
    { label: 'Must-see spots',       sub: 'Explore · Don\'t miss',emoji: '🧭', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1708782462555-b3af03b4b3d2', overrides: { tab: 'Explore' } },
    { label: 'City centre stays',    sub: 'Hotels · Best value',  emoji: '💰', grad: 'linear-gradient(135deg,#1C64F2,#1E429F)', imgId: '1598434192043-71111c1b3f41', overrides: { tab: 'Hotels',    hotelTag: 'City Centre' } },
    { label: 'Pure veg options',     sub: 'Food · Filtered',      emoji: '🥗', grad: 'linear-gradient(135deg,#1C64F2,#1A56DB)', imgId: '1711153419402-336ee48f2138', overrides: { tab: 'Food',      dietType: 'Veg' } },
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
  'Family day out':  { tab: 'Itinerary', startTime: 'Morning' },
  'Couple getaway':  { tab: 'Itinerary', startTime: 'Morning' },
  'Solo explorer':   { tab: 'Itinerary', startTime: 'Morning' },
  'Heritage walk':   { tab: 'Itinerary', startTime: 'Morning' },
  '1-day plan':      { tab: 'Itinerary', startTime: 'Morning' },
  'Brihadeeswarar Temple':       { tab: 'Explore', exploreTarget: 'Brihadeeswarar Temple' },
  'Thanjavur Maratha Palace Royal Museum':            { tab: 'Explore', exploreTarget: 'Thanjavur Maratha Palace Royal Museum' },
  'Saraswathi Mahal':            { tab: 'Explore', exploreTarget: 'Saraswathi Mahal Library' },
  'Gangaikonda':                 { tab: 'Explore', exploreTarget: 'Gangaikonda Cholapuram' },
  'Morning visit':               { tab: 'Explore' },
  'Evening visit':               { tab: 'Explore' },
  'Photography walk':            { tab: 'Itinerary', startTime: 'Morning' },
  'Big Temple morning':          { tab: 'Itinerary', startTime: 'Morning' },
  'Full day heritage':           { tab: 'Itinerary', startTime: 'Morning' },
};

/* ── Location bar ────────────────────────────────────────────────────── */
function LocationBar({ value, onChange, placeholder, autoDetect, mockResolvedLocation = 'Thanjavur' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoDetect?: boolean;
  mockResolvedLocation?: string;
}) {
  const [phase, setPhase] = useState<'idle' | 'locating' | 'found'>('idle');
  const autoRan = useRef(false);

  const detect = () => {
    setPhase('locating');
    setTimeout(() => {
      setPhase('found');
      setTimeout(() => {
        onChange(mockResolvedLocation);
        setPhase('idle');
      }, 900);
    }, 1600);
  };

  useEffect(() => {
    if (autoDetect && !value && !autoRan.current) {
      autoRan.current = true;
      detect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDetect]);

  const detecting = phase !== 'idle';

  return (
    <div className="relative">
      {/* Left icon */}
      {phase === 'locating' && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-[1.5px] border-brand border-t-transparent rounded-full animate-spin" />
      )}
      {phase === 'found' && (
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success animate-pulse" />
      )}
      {phase === 'idle' && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      )}

      <input
        type="text"
        value={detecting ? '' : value}
        onChange={e => !detecting && onChange(e.target.value)}
        placeholder={
          phase === 'locating' ? 'Locating…'
          : phase === 'found'  ? `📍 ${mockResolvedLocation} — location found`
          : placeholder
        }
        readOnly={detecting}
        className={`w-full pl-9 pr-28 py-2 border rounded-lg text-xs focus:outline-none transition-all duration-300 ${
          phase === 'found'
            ? 'border-success bg-success-soft text-success font-semibold'
            : phase === 'locating'
            ? 'border-brand bg-brand-softer text-brand italic'
            : 'border-border focus:ring-2 focus:ring-brand-soft focus:border-brand'
        }`}
      />

      {/* Current location button */}
      <button
        type="button"
        onClick={detect}
        disabled={detecting}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 text-xs font-bold px-2 py-1 rounded-md transition-all duration-200 disabled:pointer-events-none"
        style={phase === 'found'
          ? { background: 'var(--color-success-soft)', color: 'var(--color-success-strong)' }
          : { background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
        }
        title="Use current location"
      >
        {phase === 'locating' && <span className="w-3.5 h-3.5 border-[1.5px] border-current border-t-transparent rounded-full animate-spin" />}
        {phase === 'found'    && <span className="text-xs">✓</span>}
        {phase === 'idle'     && <Navigation className="w-3 h-3" />}
        <span className="ml-0.5 whitespace-nowrap">
          {phase === 'locating' ? 'Locating…' : phase === 'found' ? 'Located' : 'Current location'}
        </span>
      </button>

      {!detecting && value && (
        <button type="button" onClick={() => onChange('')} className="absolute right-28 top-1/2 -translate-y-1/2 text-muted hover:text-heading">
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
      className="rounded-lg p-1 flex gap-1"
      style={{ background: 'var(--color-brand)', boxShadow: '0 4px 16px rgba(28,100,242,0.30)' }}
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
              ? { background: '#fff', boxShadow: 'var(--shadow-xs)' }
              : { background: 'transparent' }
            }
            whileTap={{ scale: 0.96 }}
          >
            <span className="flex items-center" style={{ color: isActive ? 'var(--color-brand)' : 'rgba(255,255,255,0.9)' }}>
              {meta.icon}
            </span>
            <span
              className="text-xs font-semibold transition-colors duration-200"
              style={{ color: isActive ? 'var(--color-brand)' : 'rgba(255,255,255,0.9)' }}
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
  hotelTag: string;      // legacy single tag (kept for quick-override compat)
  hotelTags: string[];   // multi-select tags (max 2) — primary filter
  hotelArea: string;
  priceFilter: string;
  minRating: string;
  openNow: boolean;
  // Food
  foodTag: string;       // legacy single tag — kept for quick-override compat
  foodTags: string[];    // multi-select tags (max 2) — primary filter
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
  // Free-text search override
  searchQuery: string;
}

interface DashboardProps {
  destination: string;
  initialTab?: Tab;
  onSearch: (filters: DashboardFilters) => void;
  loading: boolean;
  recentSearches?: Array<{ destination: string; tab: Tab }>;
  onDestinationSelect?: (destination: string) => void;
  userName?: string;
}

export function Dashboard({ destination, initialTab = 'Hotels', onSearch, loading, recentSearches = [], onDestinationSelect, userName = '' }: DashboardProps) {
  const [activeTab, setActiveTab]           = useState<Tab>(initialTab);
  // Hotels
  const [priceFilter, setPriceFilter]       = useState('Any');
  const [hotelTags, setHotelTags]           = useState<string[]>([]);
  const [hotelTag, setHotelTag]             = useState('');  // legacy, kept for quick-override compat
  const [hotelArea, setHotelArea]           = useState('');
  const [locationToast, setLocationToast]   = useState('');
  const [areaFocused, setAreaFocused]       = useState(false);
  const [areaSuggestions, setAreaSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const areaDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openNow, setOpenNow]               = useState(false);
  // Free-text search (Hotels + Food)
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchFocused, setSearchFocused]   = useState(false);
  // Food
  const [foodTag, setFoodTag]               = useState('');
  const [foodTags, setFoodTags]             = useState<string[]>([]);
  const [dietType, setDietType]             = useState<DietType>('Any');
  const [mealTime, setMealTime]             = useState<MealTime>('Any');
  const [advancedOpen, setAdvancedOpen]     = useState(false);
  // Itinerary
  const [itinDate, setItinDate]             = useState<string>('today');
  const [startPoint, setStartPoint]         = useState('');
  const [startTime, setStartTime]           = useState<string>('');
  const [showTimeError, setShowTimeError]   = useState(false);
  // Explore
  const [exploreTarget, setExploreTarget]   = useState('Brihadeeswarar Temple');
  const [visitTime, setVisitTime]           = useState('Morning');

  const [categorySticky, setCategorySticky] = useState(true);
  const ctaSentinelRef = useRef<HTMLDivElement>(null);

  // GBP hero photos per tab — iconic, photogenic Thanjavur locations per context
  const TAB_HERO_PLACE: Record<Tab, string> = {
    Hotels:    'Hotel Sangam Thanjavur Tamil Nadu',
    Food:      'Chola Mess Thanjavur Tamil Nadu',
    Itinerary: 'Brihadeeswarar Temple Thanjavur',
    Explore:   'Thanjavur Maratha Palace Royal Museum',
  };
  const [heroPhotos, setHeroPhotos] = useState<Partial<Record<Tab, string>>>({});
  const heroFetched = useRef<Set<Tab>>(new Set());
  useEffect(() => {
    if (heroFetched.current.has(activeTab)) return;
    heroFetched.current.add(activeTab);
    fetch(`/api/photo?placeName=${encodeURIComponent(TAB_HERO_PLACE[activeTab])}&city=Thanjavur&photoIndex=1`)
      .then(r => r.json())
      .then((d: { photoUri?: string }) => {
        if (d.photoUri) setHeroPhotos(prev => ({ ...prev, [activeTab]: d.photoUri }));
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Scroll to top and reset state on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPriceFilter('Any');
  }, [activeTab]);

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

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
  const [hotelTagData, setHotelTagData] = useState<CityTagsResult>({ tags: [] });
  const [foodTagData,  setFoodTagData]  = useState<CityTagsResult>({ tags: [] });
  const [tagsLoading,  setTagsLoading]  = useState(false);

  const FOOD_TAG_FALLBACK: CityTagsResult = {
    tags: [
      'Biryani', 'South Indian', 'Non-Veg', 'Pure Veg', 'Tiffin & Snacks',
      'Fresh & Hot', 'Authentic', 'Good Quantity', 'Spicy', 'Chettinad Style',
      'Affordable', 'Value for Money', 'Family Dining', 'Quick Service', 'Highly Rated',
    ],
    segments: {
      'Cuisine & Dish':     ['Biryani', 'South Indian', 'Non-Veg', 'Pure Veg', 'Tiffin & Snacks'],
      'Taste & Quality':    ['Fresh & Hot', 'Authentic', 'Good Quantity', 'Spicy', 'Chettinad Style'],
      'Value & Experience': ['Affordable', 'Value for Money', 'Family Dining', 'Quick Service', 'Highly Rated'],
    },
  };

  useEffect(() => {
    if (!destination) return;
    setTagsLoading(true);
    setHotelTags([]);
    setHotelTag('');
    setFoodTag('');
    Promise.all([
      fetchCityTags(destination, 'Hotels'),
      fetchCityTags(destination, 'Food'),
    ]).then(([ht, ft]) => {
      setHotelTagData(ht);
      setFoodTagData(ft.segments ? ft : FOOD_TAG_FALLBACK);
    }).catch(() => {
      setHotelTagData({ tags: ['Near Big Temple', 'Near Railway Station', 'City Centre', 'Easy Parking', 'Walkable Distance', 'Spacious Rooms', 'Good Amenities', 'In-House Restaurant', 'Quiet & Peaceful', 'Breakfast Included', 'Value for Money', 'Budget-Friendly', 'Prompt Service', 'Good Hospitality', 'Highly Recommended'] });
      setFoodTagData(FOOD_TAG_FALLBACK);
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
    return {
      tab:          ov.tab          ?? activeTab,
      destination:  ov.destination  ?? destination,
      startDate: '', endDate: '', numPeople: 2, budget: 0,
      hotelTag:     ov.hotelTag ?? hotelTag,
      hotelTags:    ov.hotelTag ? [ov.hotelTag] : hotelTags,
      hotelArea:    ov.hotelArea ?? hotelArea,
      priceFilter,
      minRating:    'Any',
      openNow,
      foodTag:      ov.foodTag ?? foodTag,
      foodTags:     ov.foodTag ? [ov.foodTag] : foodTags,
      dietType:     (ov.dietType ?? dietType) as DietType,
      dineMode:     'Any',
      mealTime,
      itinDate:     dateMap[itinDate] ?? itinDate,
      startPoint,
      startTime:    ov.startTime ?? startTime,
      exploreTarget: ov.exploreTarget ?? exploreTarget,
      visitTime,
      searchQuery:   searchQuery.trim(),
    };
  };

  const triggerSearch = (ov: QuickOverride = {}) => {
    if (ov.tab) setActiveTab(ov.tab);
    onSearch(buildFilters(ov));
  };

  const [showExploreError, setShowExploreError] = useState(false);

  const handleSearch = () => {
    if (activeTab === 'Itinerary' && !startTime) {
      setShowTimeError(true);
      return;
    }
    if (activeTab === 'Explore' && !exploreTarget) {
      setShowExploreError(true);
      return;
    }
    setShowTimeError(false);
    setShowExploreError(false);
    onSearch(buildFilters());
  };

  const renderFilters = () => {
    switch (activeTab) {

      /* ── Hotels ─────────────────────────────────────────────── */
      case 'Hotels': return (
        <div className="space-y-4">

          {/* Hotel keyword tags — multi-select up to 2, segmented */}
          {hotelTagData.tags.length > 0 && (
            <div>
              {/* Header with counter + subtitle */}
              <div className="mb-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-heading">
                    What matters to you?
                    {tagsLoading && <span className="ml-1.5 inline-block w-2.5 h-2.5 border border-muted border-t-transparent rounded-full animate-spin align-middle" />}
                  </label>
                  {hotelTags.length > 0 && (
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }}>
                      {hotelTags.length}/2
                    </span>
                  )}
                </div>
              </div>

              {/* Location toast */}
              {locationToast && (
                <div className="mb-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  style={{ background: 'var(--color-brand-softer)', color: 'var(--color-brand)', border: '1px solid var(--color-brand-soft)' }}>
                  <MapPin className="w-3 h-3 shrink-0" />
                  {locationToast}
                </div>
              )}

              {/* Segmented tag display */}
              {hotelTagData.segments
                ? Object.entries(hotelTagData.segments).map(([segName, segTags]) => (
                  <div key={segName} className="mb-3">
                    <div className="text-xs font-normal text-muted mb-1.5">
                      {segName}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {segTags.map(tag => {
                        const isSelected = hotelTags.includes(tag);
                        const isMaxed    = hotelTags.length >= 2 && !isSelected;
                        return (
                          <button
                            key={tag}
                            type="button"
                            disabled={isMaxed}
                            onClick={() => {
                              setHotelTags(prev => {
                                if (prev.includes(tag)) return prev.filter(t => t !== tag);
                                if (prev.length >= 2)   return [...prev.slice(1), tag];
                                return [...prev, tag];
                              });
                              // Toast for location tags (Group A)
                              const groupATags = hotelTagData.groupA ?? [];
                              if (groupATags.includes(tag) && !hotelTags.includes(tag)) {
                                const toastMap: Record<string,string> = {
                                  'Near Big Temple':      'Focusing within 2km of Big Temple',
                                  'Near Railway Station': 'Focusing near Railway Station',
                                  'City Centre':          'Focusing on central Thanjavur',
                                  'Walkable Area':        'Showing hotels in walkable areas',
                                  'Near Bus Stand':       'Focusing near Bus Stand',
                                  'Near Palace':          'Focusing near Thanjavur Palace',
                                  'Near Market':          'Focusing near city market area',
                                };
                                setLocationToast(toastMap[tag] ?? `Focusing near ${tag}`);
                                setTimeout(() => setLocationToast(''), 3000);
                              }
                            }}
                            className="px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all"
                            style={
                              isSelected
                                ? { borderColor: 'var(--color-brand)', background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                                : isMaxed
                                  ? { borderColor: 'var(--color-border)', background: 'var(--color-bg-app)', color: 'var(--color-border-medium)', cursor: 'not-allowed' }
                                  : { borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-muted)' }
                            }
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
                : (
                  // Fallback: flat list when no segments
                  <div className="flex flex-wrap gap-1.5">
                    {hotelTagData.tags.map(tag => {
                      const isSelected = hotelTags.includes(tag);
                      const isMaxed    = hotelTags.length >= 2 && !isSelected;
                      return (
                        <button
                          key={tag}
                          type="button"
                          disabled={isMaxed}
                          onClick={() => setHotelTags(prev =>
                            prev.includes(tag) ? prev.filter(t => t !== tag)
                              : prev.length >= 2 ? [...prev.slice(1), tag]
                              : [...prev, tag]
                          )}
                          className="px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all"
                          style={
                            isSelected
                              ? { borderColor: 'var(--color-brand)', background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                              : isMaxed
                                ? { borderColor: 'var(--color-border)', background: 'var(--color-bg-app)', color: 'var(--color-border-medium)', cursor: 'not-allowed' }
                                : { borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-muted)' }
                          }
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                )
              }

              {/* Clear tags */}
              {hotelTags.length > 0 && (
                <button type="button" onClick={() => setHotelTags([])}
                  className="mt-1.5 text-xs font-medium text-muted underline underline-offset-2">
                  Clear tags
                </button>
              )}
            </div>
          )}

        </div>
      );

      /* ── Food ───────────────────────────────────────────────── */
      case 'Food': return (
        <div className="space-y-4">

          {/* Segmented food tags — multi-select up to 3, 5×5 from real review data */}
          {foodTagData.tags.length > 0 && (
            <div>
              {/* Header with counter */}
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-heading">
                  What I'm looking for
                  {tagsLoading && <span className="ml-1.5 inline-block w-2.5 h-2.5 border border-muted border-t-transparent rounded-full animate-spin align-middle" />}
                </label>
                {foodTags.length > 0 && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }}>
                    {foodTags.length}/2
                  </span>
                )}
              </div>

              {foodTagData.segments && Object.keys(foodTagData.segments).length > 0
                ? Object.entries(foodTagData.segments).map(([seg, tags]) => (
                  <div key={seg} className="mb-2">
                    <p className="text-xs font-normal text-muted mb-1.5">{seg}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag: string) => {
                        const isSelected = foodTags.includes(tag);
                        const isMaxed    = foodTags.length >= 2 && !isSelected;
                        return (
                          <button
                            key={tag}
                            type="button"
                            disabled={isMaxed}
                            onClick={() => setFoodTags(prev =>
                              prev.includes(tag) ? prev.filter(t => t !== tag)
                                : prev.length >= 2 ? [...prev.slice(1), tag]
                                : [...prev, tag]
                            )}
                            className="px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all"
                            style={isSelected
                              ? { borderColor: 'var(--color-brand)', background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                              : isMaxed
                                ? { borderColor: 'var(--color-border)', background: 'var(--color-bg-app)', color: 'var(--color-border-medium)', cursor: 'not-allowed' }
                                : { borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-muted)' }
                            }
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
                : (
                  <div className="flex flex-wrap gap-1.5">
                    {foodTagData.tags.map(t => {
                      const isSelected = foodTags.includes(t);
                      const isMaxed    = foodTags.length >= 2 && !isSelected;
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={isMaxed}
                          onClick={() => setFoodTags(prev =>
                            prev.includes(t) ? prev.filter(x => x !== t)
                              : prev.length >= 2 ? [...prev.slice(1), t]
                              : [...prev, t]
                          )}
                          className="px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all"
                          style={isSelected
                            ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                            : isMaxed
                              ? { borderColor: '#E5E7EB', background: '#F9FAFB', color: '#D1D5DB', cursor: 'not-allowed' }
                              : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                          }
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )
              }

              {/* Clear tags */}
              {foodTags.length > 0 && (
                <button type="button" onClick={() => setFoodTags([])}
                  className="mt-1.5 text-xs font-medium text-muted underline underline-offset-2">
                  Clear tags
                </button>
              )}
            </div>
          )}

          {/* Advanced — collapsible specific dish names */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setAdvancedOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-surface hover:bg-brand-softer transition-colors"
            >
              <span className="text-xs font-normal text-muted">Advanced · Dish names</span>
              <ChevronDown
                className="w-3.5 h-3.5 text-muted transition-transform duration-200"
                style={{ transform: advancedOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {advancedOpen && (
              <div className="px-3 py-2.5 space-y-2.5 border-t border-border">
                {FOOD_ADVANCED.map(({ group, items }) => (
                  <div key={group}>
                    <p className="text-xs font-normal text-muted mb-1">{group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map(item => {
                        const isSelected = foodTags.includes(item);
                        const isMaxed    = foodTags.length >= 2 && !isSelected;
                        return (
                          <button
                            key={item}
                            type="button"
                            disabled={isMaxed}
                            onClick={() => setFoodTags(prev =>
                              prev.includes(item) ? prev.filter(t => t !== item)
                                : prev.length >= 2 ? [...prev.slice(1), item]
                                : [...prev, item]
                            )}
                            className="px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all"
                            style={isSelected
                              ? { borderColor: 'var(--color-brand)', background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                              : isMaxed
                                ? { borderColor: 'var(--color-border)', background: 'var(--color-bg-app)', color: 'var(--color-border-medium)', cursor: 'not-allowed' }
                                : { borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-muted)' }
                            }
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      );

      /* ── Itinerary ──────────────────────────────────────────── */
      case 'Itinerary': return (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-heading uppercase tracking-wide mb-1">Starting Location</label>
            <LocationBar value={startPoint} onChange={setStartPoint} placeholder="e.g. Railway Station, Hotel name…" />
          </div>

          {/* Date — Today / Tomorrow / Day After */}
          <div>
            <label className="block text-xs font-semibold text-heading uppercase tracking-wide mb-1">Date</label>
            <div className="flex gap-1.5">
              {(['today', 'tomorrow', 'dayafter'] as const).map(d => {
                const labels: Record<string, string> = { today: 'Today', tomorrow: 'Tomorrow', dayafter: 'Day After' };
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setItinDate(d)}
                    className="flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all"
                    style={itinDate === d
                      ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
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
            <label className="block text-xs font-semibold text-heading uppercase tracking-wide mb-1">
              Time Slot <span className="text-danger">*</span>
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
                      ? { borderColor: '#1C64F2', background: '#EBF5FF', color: '#1C64F2' }
                      : showTimeError
                        ? { borderColor: '#EF4444', background: '#FEF2F2', color: '#6B7280' }
                        : { borderColor: '#E5E7EB', background: '#fff',    color: '#6B7280' }
                    }
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide">{t}</span>
                    <span className="text-xs opacity-60">{stops[t]} stops</span>
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
                  className="text-xs text-danger font-bold mt-1.5 flex items-center gap-1"
                >
                  <span>⚠</span> Please select a time slot to continue
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="rounded-lg p-2.5 border border-border" style={{ background: '#EBF5FF' }}>
            <p className="text-xs text-muted leading-relaxed">
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
            <label className="block text-xs font-semibold text-heading uppercase tracking-wide mb-1">
              Top Location in Thanjavur
            </label>
            <div className="relative">
              <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
              <select
                value={exploreTarget}
                onChange={e => { setExploreTarget(e.target.value); setShowExploreError(false); }}
                className={`w-full pl-9 pr-8 py-2 border rounded-lg text-xs focus:outline-none focus:ring-2 bg-surface appearance-none transition-colors ${showExploreError ? 'border-danger focus:ring-danger/30' : 'border-border focus:ring-brand-soft focus:border-brand'}`}
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
            {showExploreError && (
              <p className="text-xs text-danger font-bold mt-1.5 flex items-center gap-1">
                <span>⚠</span> Please select a location to continue
              </p>
            )}
          </div>

          {/* Time slot */}
          <div>
            <label className="block text-xs font-semibold text-heading uppercase tracking-wide mb-2">
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
                  className="flex flex-col items-center gap-0.5 py-2.5 rounded-lg border-2 transition-all"
                  style={visitTime === slot
                    ? { borderColor: 'var(--color-brand)', background: 'var(--color-brand-softer)', color: 'var(--color-brand)' }
                    : { borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-muted)' }
                  }
                >
                  <span className="text-xs font-semibold uppercase tracking-wide">{slot}</span>
                  <span className="text-xs font-normal opacity-70">{range}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-2.5 border border-border bg-success-soft">
            <p className="text-xs text-body leading-relaxed flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-success-strong shrink-0 mt-0.5" />
              <span><span className="font-bold text-heading">AI Visit Guide</span> — Gemini reads real reviews and crowd data to build a time-specific plan for your chosen spot.</span>
            </p>
          </div>
        </div>
      );
    }
  };

  const smartPicks = getSmartPicks(destination);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = userName?.split(' ')[0] || '';

  const TAB_HERO: Record<Tab, { headline: string; sub: string }> = {
    Hotels:    { headline: 'Find your perfect stay', sub: 'AI-ranked by price, distance & reviews' },
    Food:      { headline: 'Discover the best eats',  sub: 'Authentic Thanjavur cuisine, ranked for you' },
    Itinerary: { headline: 'Plan your perfect day',   sub: 'AI-routed itinerary, timed to perfection' },
    Explore:   { headline: 'Explore every landmark',  sub: 'Deep-dive guides powered by real reviews' },
  };
  const hero = TAB_HERO[activeTab];

  // Swipe gesture to switch tabs
  const swipeTouchX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { swipeTouchX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (swipeTouchX.current === null) return;
    const delta = e.changedTouches[0].clientX - swipeTouchX.current;
    if (Math.abs(delta) < 60) return;
    const idx  = TABS.indexOf(activeTab);
    if (delta < 0 && idx < TABS.length - 1) setActiveTab(TABS[idx + 1]);
    if (delta > 0 && idx > 0)               setActiveTab(TABS[idx - 1]);
    swipeTouchX.current = null;
  };

  return (
    <div
      className="w-full max-w-[920px] mx-auto pb-24 lg:pb-4 px-4 space-y-3"
      style={{ paddingTop: 0 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* ── Hero — all tabs (no remount on tab switch, crossfade images) ─── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ minHeight: 220 }}
      >
        {/* Gradient fallback — always underneath */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1E429F 0%,#1C64F2 100%)' }} />
        {/* All fetched tab photos kept mounted; opacity crossfade on tab switch */}
        {(Object.entries(heroPhotos) as [Tab, string][]).map(([tab, uri]) => (
          <img
            key={tab}
            src={uri}
            alt={tab}
            draggable={false}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500"
            style={{ opacity: tab === activeTab ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.62) 100%)' }} />
        {/* Greeting */}
        {firstName && (
          <div className="absolute top-4 left-5 text-white/80 text-xs font-semibold">
            {greeting}, {firstName} 👋
          </div>
        )}
        {/* Hero text — animate on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-text'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-5 left-5 right-5"
          >
            <p className="text-white font-display font-black text-lg leading-tight drop-shadow">{hero.headline}</p>
            <p className="text-white/75 text-xs mt-0.5 leading-snug">{hero.sub}</p>
          </motion.div>
        </AnimatePresence>
        {/* Location pill */}
        <div className="absolute top-4 right-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            {destination || 'Thanjavur'}
          </div>
        </div>
      </div>

      {/* ── Category selector — always sticky below header ── */}
      <div
        className="sticky z-30 pb-2 pt-1"
        style={{ top: 'calc(57px + env(safe-area-inset-top))' }}
      >
        <CategorySelector active={activeTab} onChange={t => setActiveTab(t)} />
      </div>

      {/* ── Filter card — white below ──────────────────────────── */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden relative z-10 bg-white"
        style={{ border: '1px solid var(--color-border)' }}
      >
        {/* Search override — Hotels + Food only */}
        {(activeTab === 'Hotels' || activeTab === 'Food') && (() => {
          const SUGGESTIONS: Record<string, string[]> = {
            Hotels: [
              'hotel near new bus stand',
              'hotel near big temple',
              'hotel near railway station',
              'budget hotel in Thanjavur',
              'hotel near city centre',
              'AC hotel near palace',
              'family hotel Thanjavur',
              'hotel with parking near temple',
            ],
            Food: [
              'biryani near bus stand',
              'pure veg restaurant Thanjavur',
              'breakfast tiffin centre',
              'mutton biryani near railway station',
              'filter coffee cafe',
              'south indian thali lunch',
              'Chettinad restaurant',
              'family restaurant with AC',
            ],
          };
          const suggestions = (SUGGESTIONS[activeTab] ?? []).filter(s =>
            !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const showSuggestions = searchFocused && suggestions.length > 0 && !(!searchQuery && false);
          return (
            <div className="px-4 pt-3 pb-2 relative">
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${searchQuery ? 'ring-2 ring-brand' : 'ring-1 ring-border'}`} style={{ background: 'var(--color-bg-app)' }}>
                <Search className="w-3.5 h-3.5 shrink-0 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchQuery.trim()) { setSearchFocused(false); handleSearch(); } }}
                  placeholder={activeTab === 'Hotels' ? 'Search hotels… e.g. near bus stand' : 'Search food… e.g. pure veg biryani'}
                  className="flex-1 bg-transparent text-sm text-heading placeholder-muted outline-none min-w-0"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="shrink-0 text-muted hover:text-heading transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {showSuggestions && (
                <div className="absolute left-4 right-4 top-full z-50 mt-0.5 rounded-lg overflow-hidden" style={{ background: '#fff', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-m)' }}>
                  {suggestions.slice(0, 6).map(s => (
                    <button
                      key={s}
                      type="button"
                      onMouseDown={() => { setSearchQuery(s); setSearchFocused(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm text-heading hover:bg-blue-50 transition-colors"
                    >
                      <Search className="w-3 h-3 shrink-0 text-muted" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* Header — shown on all tabs */}
        <div className="px-4 py-3 flex items-center gap-3 border-b border-border" style={{ background: '#F9FAFB' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: meta.accent }}>
            <span style={{ color: '#fff' }}>{meta.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold text-sm text-heading leading-tight">{meta.headline}</p>
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
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold uppercase tracking-[0.04em] text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-soft disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'var(--color-brand)', color: '#fff' }}
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              : <Search className="w-4 h-4" />
            }
            {loading ? 'AI is on it…' : (
              searchQuery.trim() && activeTab === 'Hotels'  ? `Search "${searchQuery.trim()}"` :
              searchQuery.trim() && activeTab === 'Food'    ? `Search "${searchQuery.trim()}"` :
              activeTab === 'Hotels'    ? 'Search Hotels' :
              activeTab === 'Food'      ? 'Search Food' :
              activeTab === 'Itinerary' ? 'Build Day Plan' :
              'Get Visit Guide'
            )}
          </button>
        </div>
        {/* sentinel — category bar unsticks once this exits top of viewport */}
        <div ref={ctaSentinelRef} className="h-px" />
      </motion.div>

      {/* ── Popular searches ───────────────────────────────────── */}
      <div className="relative z-10">
        <p className="text-xs font-normal text-muted mb-2 flex items-center gap-1.5">
          <Search className="w-3 h-3" /> People also search for
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {POPULAR_QUERIES.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => triggerSearch(q.overrides)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium text-body hover:border-brand hover:text-brand transition-colors"
            >
              <Search className="w-3 h-3 text-muted shrink-0" />
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Recent searches ────────────────────────────────────── */}
      {recentSearches.length > 0 && (
        <div className="relative z-10">
          <p className="text-xs font-normal text-muted mb-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> Recent
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onDestinationSelect?.(s.destination); triggerSearch({ tab: s.tab, destination: s.destination }); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium text-body hover:border-brand hover:text-brand transition-colors"
              >
                <MapPin className="w-3 h-3 text-muted shrink-0" />
                {s.destination}
                <span className="text-xs text-muted">· {s.tab}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Social proof ────────────────────────────────────────── */}
      <div className="flex items-center gap-2 py-1 px-1 relative z-10">
        <div className="flex -space-x-1.5">
          {['#1C64F2','#1E429F','#3F83F8'].map((c,i) => (
            <div key={i} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-[7px] font-black" style={{ background: c }}>
              {['K','P','R'][i]}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted">
          <span className="text-heading font-bold">127 AI trip plans</span> generated today in {destination || 'Thanjavur'}
        </p>
      </div>

      {/* ══ SEGMENT 1 — Bento smart picks ══════════════════════════════════ */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-semibold text-lg text-heading">Plan your visit</h2>
            <p className="text-xs text-muted mt-0.5">Tap a card — AI builds your shortlist</p>
          </div>
        </div>

        {/* Bento: 1 large hero card + 3 smaller cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Large featured card — spans 2 cols */}
          {THANJAVUR_ACTIONS[0] && (() => {
            const item = THANJAVUR_ACTIONS[0];
            return (
              <motion.button
                key="bento-hero"
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => triggerSearch(item.overrides)}
                className="col-span-2 relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group text-left"
                style={{ height: 180 }}
              >
                <img src={uImg(item.imgId, 800, 360)} alt={item.label}
                  loading="eager" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: TAB_META[item.tab].accent, opacity: 0.2 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-white text-xs font-black uppercase tracking-wide px-2 py-1 rounded-full" style={{ background: TAB_META[item.tab].accent }}>{item.tab}</span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-white text-xs font-black px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}>⭐ Featured</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <span className="text-2xl leading-none drop-shadow">{item.emoji}</span>
                  <p className="text-white font-display font-black text-lg leading-tight mt-1.5 drop-shadow">{item.label}</p>
                  <p className="text-white/70 text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.button>
            );
          })()}

          {/* 3 smaller cards */}
          {THANJAVUR_ACTIONS.slice(1).map(item => (
            <motion.button
              key={item.tab}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => triggerSearch(item.overrides)}
              className="relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group text-left"
              style={{ height: 138 }}
            >
              <img src={uImg(item.imgId, 440, 280)} alt={item.label}
                loading="eager" decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 rounded-2xl" style={{ background: TAB_META[item.tab].accent, opacity: 0.25 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent rounded-2xl" />
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-white text-xs font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full" style={{ background: TAB_META[item.tab].accent }}>{item.tab}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <span className="text-lg leading-none drop-shadow">{item.emoji}</span>
                <p className="text-white font-display font-black text-sm leading-tight mt-1 drop-shadow">{item.label}</p>
                <p className="text-white/70 text-xs mt-0.5 leading-tight">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ SEGMENT 2 — Discover Thanjavur (landmark scroll) ═══════════════ */}
      <div className="relative z-10 border-t border-border pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-semibold text-lg text-heading">Discover Thanjavur</h2>
            <p className="text-xs text-muted mt-0.5">Must-see landmarks · Opens Explore</p>
          </div>
          <span className="text-xs text-muted shrink-0 flex items-center gap-0.5">Swipe <ChevronRight className="w-3 h-3" /></span>
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
                  loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute top-3 right-3 z-10">
                <span className="text-white text-xs font-black uppercase tracking-wide px-2 py-1 rounded-full"
                  style={{ background: TAB_META.Explore.accent }}>
                  Explore
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="text-2xl leading-none drop-shadow">{c.emoji}</span>
                <p className="text-white font-display font-black text-base leading-tight mt-1.5 drop-shadow">{c.city}</p>
                <p className="text-white/75 text-xs mt-0.5 leading-tight">{c.hook}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ══ SEGMENT 3 — Plan another city (destination scroll) ═════════════ */}
      <div className="relative z-10 border-t border-border pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-semibold text-lg text-heading">Plan another city</h2>
            <p className="text-xs text-muted mt-0.5">Tap to switch destination</p>
          </div>
          <span className="text-xs text-muted shrink-0 flex items-center gap-0.5">Swipe <ChevronRight className="w-3 h-3" /></span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {POPULAR_DESTINATIONS.map(c => (
            <motion.button
              key={c.city}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onDestinationSelect?.(c.city)}
              className="shrink-0 w-[220px] h-[150px] rounded-2xl overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand group"
            >
              <img
                src={uImg(c.imgId, 440, 300)}
                alt={c.city}
                loading="lazy" decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0" style={{ background: c.grad, opacity: 0.3 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Coming soon badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm"
                  style={{ background: 'rgba(250,202,21,0.18)', border: '1px solid rgba(250,202,21,0.40)', color: 'var(--color-warning)' }}>
                  Coming Soon
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-white font-display font-black text-xl leading-tight drop-shadow">{c.city}</p>
                <p className="text-white/75 text-xs mt-0.5 leading-tight">{c.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Trending chips ─────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
            <h2 className="font-display font-semibold text-lg text-heading">
              Trending in {destination || 'your city'}
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {meta.trending.map(topic => (
            <motion.button
              key={topic}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerSearch(TRENDING_OVERRIDES[topic] ?? { tab: activeTab })}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-white text-body hover:border-brand hover:text-brand hover:bg-brand-softer active:scale-95 active:bg-brand-softer transition-all duration-150 select-none"
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
}
