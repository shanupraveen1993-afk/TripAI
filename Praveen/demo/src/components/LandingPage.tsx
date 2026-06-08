import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import {
  Compass, Search, MapPin, Star, ArrowRight,
  Shield, Globe, CheckCircle, Zap, Quote, X,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { AuthForm } from './AuthForm';
import { Tab } from './ui/Tabs';
import { isThanjavurCity } from '../utils/city';

const uImg = (id: string, w = 800, h = 560) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

interface LandingPageProps {
  onTabSelect: (tab: Tab, dest?: string) => void;
  isLoggedIn: boolean;
  onAuthSuccess?: (user: { name: string; email: string; avatar?: string }, dest?: string, tab?: Tab) => void;
  onNonThanjavurCity?: (city: string) => void;
}

/* ── City rotator — controlled, driven by shared heroActive index ─────── */
function CityRotator({ city }: { city: string }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <span className="block h-[1.15em] relative overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.span
          key={city}
          initial={{ opacity: 0, y: prefersReducedMotion ? '0%' : '60%', filter: prefersReducedMotion ? undefined : 'blur(4px)' }}
          animate={{ opacity: 1, y: '0%', filter: prefersReducedMotion ? undefined : 'blur(0px)' }}
          exit={{ opacity: 0, y: prefersReducedMotion ? '0%' : '-60%', filter: prefersReducedMotion ? undefined : 'blur(4px)' }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: 'easeInOut' }}
          className="gradient-text-hero absolute left-0 top-0 whitespace-nowrap"
        >
          {city}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── City poster slider ───────────────────────────────────────────────── */
const CITY_POSTERS: Array<{ city: string; gradient: string; emoji: string; imgId: string }> = [
  { city: 'Bangalore', gradient: 'from-green-600 to-emerald-400',  emoji: '🏨', imgId: '1708782462555-b3af03b4b3d2' },
  { city: 'Goa',       gradient: 'from-teal-500 to-cyan-300',      emoji: '🍽️', imgId: '1512343879784-a960bf40e7f2' },
  { city: 'Jaipur',    gradient: 'from-pink-500 to-rose-300',      emoji: '🏯', imgId: '1477587458883-47145ed94245' },
  { city: 'Mumbai',    gradient: 'from-orange-500 to-amber-300',   emoji: '🌆', imgId: '1598434192043-71111c1b3f41' },
  { city: 'Delhi',     gradient: 'from-red-500 to-orange-300',     emoji: '🏨', imgId: '1587474260584-136574528ed5' },
  { city: 'Hyderabad', gradient: 'from-amber-500 to-yellow-300',   emoji: '🍛', imgId: '1657981630164-769503f3a9a8' },
  { city: 'Chennai',   gradient: 'from-blue-600 to-sky-300',       emoji: '🦞', imgId: '1602216056096-3b40cc0c9944' },
  { city: 'Udaipur',   gradient: 'from-purple-600 to-violet-300',  emoji: '🏰', imgId: '1622018135960-249abd263aeb' },
  { city: 'Kochi',     gradient: 'from-lime-600 to-green-300',     emoji: '🌊', imgId: '1590123727499-3c2a4b5dc30a' },
  { city: 'Kolkata',   gradient: 'from-indigo-600 to-blue-400',    emoji: '🍜', imgId: '1558618666-fcd25c85cd64' },
  { city: 'Pune',      gradient: 'from-stone-500 to-amber-300',    emoji: '☕', imgId: '1509042239860-f550ce710b93' },
  { city: 'Rishikesh', gradient: 'from-sky-600 to-blue-300',       emoji: '🏕️', imgId: '1506905925346-21bda4d32df4' },
];

function CityPosterSlider({ onCityClick }: { onCityClick?: (city: string, emoji: string) => void }) {
  const doubled = [...CITY_POSTERS, ...CITY_POSTERS];
  return (
    <div className="overflow-hidden w-full">
      <div className="animate-marquee flex gap-3" style={{ width: 'max-content' }}>
        {doubled.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onCityClick?.(p.city, p.emoji)}
            className={`bg-gradient-to-br ${p.gradient} rounded-xl flex-shrink-0 w-36 h-44 relative overflow-hidden flex flex-col justify-end p-3 shadow-lg cursor-pointer hover:scale-[1.05] transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none`}
          >
            <img src={uImg(p.imgId, 144, 176)} alt={p.city} width={144} height={176} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <span className="absolute top-3 right-3 text-2xl z-10" aria-hidden="true">{p.emoji}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/20 rounded-2xl" />
            <p className="relative z-10 text-white font-display font-black text-sm leading-tight">{p.city}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Hero destinations — single source of truth for both left + right ── */
export const HERO_DESTINATIONS = [
  { city: 'Goa',       subtitle: 'Restaurant · Calangute · AI #1 pick',  gradient: 'from-orange-800 via-amber-700 to-yellow-500', emoji: '🍽️', badge: '4.7★ · Most Reviewed',        aiPick: 'Top seafood pick near your hotel — open late, matches your casual beachside dining preference.',       tags: ['Restaurant','Seafood','Beach'],   imgId: '1496442226666-8d4d0e62e6e9' },
  { city: 'Jaipur',    subtitle: 'Hotel · Civil Lines · AI #1 pick',     gradient: 'from-pink-800 via-rose-700 to-pink-400',      emoji: '🏨', badge: '4.9★ · Heritage Stay',        aiPick: 'Only property in your budget with rooftop dining + heritage rating + 4.9★ Google score.',            tags: ['Hotel','Heritage','Rooftop'],     imgId: '1477587458883-47145ed94245' },
  { city: 'Bangalore', subtitle: 'Hotel · Indiranagar · AI #1 pick',     gradient: 'from-slate-800 via-slate-700 to-blue-600',    emoji: '🏨', badge: '4.8★ · Top Rated Hotel',      aiPick: 'Best match for business stays — rooftop pool, free breakfast, 0.3km from MG Road metro.',            tags: ['Hotel','Business','Pool'],        imgId: '1708782462555-b3af03b4b3d2' },
  { city: 'Mumbai',    subtitle: 'Restaurant · Bandra West · AI #1',     gradient: 'from-indigo-800 via-blue-700 to-sky-500',     emoji: '🍽️', badge: '4.6★ · AI Recommended',       aiPick: 'Best pure-veg pick in Bandra — family-friendly, quick service, matches your diet & budget.',         tags: ['Restaurant','Pure Veg','Family'], imgId: '1598434192043-71111c1b3f41' },
  { city: 'Delhi',     subtitle: 'Itinerary · Old Delhi · AI #1 pick',   gradient: 'from-red-900 via-rose-800 to-orange-600',     emoji: '🏯', badge: '4.8★ · Heritage Walk',        aiPick: 'Sequenced around Jama Masjid → Chandni Chowk → Red Fort — avoids noon heat, starts at 7am.',        tags: ['Itinerary','Heritage','History'], imgId: '1587474260584-136574528ed5' },
  { city: 'Udaipur',   subtitle: 'Hotel · Lake Pichola · AI #1 pick',    gradient: 'from-violet-900 via-purple-800 to-fuchsia-600',emoji: '🏰', badge: '4.9★ · Lake View Palace',    aiPick: 'Only heritage property with unobstructed lake view under ₹8000/night — books out fast on weekends.', tags: ['Hotel','Lake View','Heritage'],   imgId: '1622018135960-249abd263aeb' },
  { city: 'Hyderabad', subtitle: 'Food · Banjara Hills · AI #1 pick',    gradient: 'from-amber-900 via-yellow-800 to-orange-500', emoji: '🍛', badge: '4.7★ · Biryani Capital',      aiPick: 'Highest-rated dum biryani within 2km — reviewers say this is the closest thing to Paradise Biryani.', tags: ['Food','Biryani','Non-Veg'],       imgId: '1657981630164-769503f3a9a8' },
  { city: 'Chennai',   subtitle: 'Explore · Marina Beach · AI #1 pick',  gradient: 'from-cyan-900 via-sky-800 to-blue-500',       emoji: '🌊', badge: '4.6★ · Coastal Landmark',    aiPick: 'Best visited at 6am — AI identified Tuesday mornings as the quietest slot before weekend crowds.',    tags: ['Explore','Beach','Landmark'],    imgId: '1602216056096-3b40cc0c9944' },
];

/* ── Hero photo panel — controlled by shared heroActive index ─────────── */
function HeroPhotoPanel({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const prefersReducedMotion = useReducedMotion();
  const d = HERO_DESTINATIONS[active];
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden h-[260px] md:h-[560px]"
      style={{ boxShadow: '0 0 60px rgba(59,130,246,0.18), 0 30px 60px rgba(0,0,0,0.6)' }}
    >
      {/* All images pre-rendered so browser loads them all in parallel on mount.
          Stable keys mean no remount on transition — just opacity/scale update. */}
      {HERO_DESTINATIONS.map((dest, i) => (
        <motion.img
          key={i}
          src={uImg(dest.imgId, 900, 580)}
          alt={dest.city}
          loading={i === active ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1 }}
          animate={i === active
            ? { opacity: 1, scale: prefersReducedMotion ? 1 : 1.08 }
            : { opacity: 0, scale: 1 }
          }
          transition={i === active
            ? { opacity: { duration: 0.6, ease: 'easeOut' }, scale: prefersReducedMotion ? { duration: 0 } : { duration: 6, ease: 'easeOut' } }
            : { opacity: { duration: 0.5, ease: 'easeOut' }, scale: { duration: 0.5, ease: 'easeOut' } }
          }
          style={{ willChange: 'opacity, transform', zIndex: i === active ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute top-5 left-5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-full" style={{ zIndex: 3 }}>{d.badge}</div>
      <div className="absolute top-4 right-5 text-5xl drop-shadow-lg select-none" style={{ zIndex: 3 }} aria-hidden="true">{d.emoji}</div>
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4" style={{ zIndex: 3 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {d.tags.map(tag => (
                <span key={tag} className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <p className="text-white/75 text-sm font-medium mb-1">{d.subtitle}</p>
            <h3 className="text-white font-display font-black text-4xl tracking-tight leading-none">{d.city}</h3>
          </motion.div>
        </AnimatePresence>
        <div className="hidden md:flex bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-4 items-start gap-3">
          <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ boxShadow: '0 0 16px rgba(28,100,242,0.55)' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-white/75 text-xs font-normal">AI Pick · Why ranked #1</p>
            <p className="text-white/90 text-sm leading-relaxed">{d.aiPick}</p>
          </div>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="City navigation">
          {HERO_DESTINATIONS.map((d, i) => (
            <button key={i} onClick={() => setActive(i)}
              aria-label={`View ${d.city}`}
              aria-current={i === active ? 'true' : undefined}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span className={`block rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Testimonials — 9 for social proof carousel ───────────────────────── */
const TESTIMONIALS = [
  { name: 'Ananya R.',   location: 'Bangalore', avatar: 'A', stars: 5, text: 'I used to spend 3 hours comparing hotels on different apps. TripAI showed me the top 5 with exact reasons why each one suited me — took 10 seconds.',                                           highlight: 'Saved 3 hours of research'     },
  { name: 'Karthik M.',  location: 'Chennai',   avatar: 'K', stars: 5, text: 'The personalisation is insane. It picked a pure veg restaurant with a family vibe near my hotel — exactly what I needed without me typing any of that.',                                          highlight: 'Zero manual filtering'         },
  { name: 'Shreya P.',   location: 'Hyderabad', avatar: 'S', stars: 5, text: 'The AI tells you WHY it picked a place — real review quotes, Google rating, what matches your preference. I actually trust it more than reading 200 reviews myself.',                               highlight: 'Trustable recommendations'     },
  { name: 'Rahul V.',    location: 'Mumbai',    avatar: 'R', stars: 5, text: 'Searched "Bandra hotels" and got 5 ranked results with the exact reason each matched my requirements. Booked the #1 pick — it was perfect. Never going back to Google Maps for this.',             highlight: 'Booked AI #1 pick — no regrets'},
  { name: 'Priya M.',    location: 'Delhi',     avatar: 'P', stars: 5, text: 'The itinerary feature sequenced our whole Jaipur day by location — we saved 2 hours of commute time we\'d have wasted jumping around the city.',                                                  highlight: 'Saved 2 hours of commute'      },
  { name: 'Arun K.',     location: 'Pune',      avatar: 'A', stars: 5, text: 'I typed "budget hotel near Baner with pool" and TripAI found 4 options under ₹3000 with pools — something I couldn\'t find in 20 minutes of Booking.com filtering.',                              highlight: 'Found what Booking.com missed' },
  { name: 'Divya S.',    location: 'Kochi',     avatar: 'D', stars: 5, text: 'As a solo female traveller, safety context matters a lot. TripAI\'s AI notes actually mentioned which areas were well-lit and safe at night. That detail changed everything for me.',              highlight: 'Safety context included'       },
  { name: 'Vikram N.',   location: 'Jaipur',    avatar: 'V', stars: 5, text: 'The "Best restaurants nearby my hotel" feature is a game changer. It found 5 restaurants within 1km of my stay that I would never have discovered on my own. All were brilliant.',                highlight: 'Discovered hidden gems nearby' },
  { name: 'Meera T.',    location: 'Kolkata',   avatar: 'M', stars: 5, text: 'My husband is diabetic and needs specific food. I told TripAI my diet constraints and it filtered down to 3 restaurants that genuinely fit — with notes on menu items. That\'s real AI.',         highlight: 'Handles complex dietary needs' },
];

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setActive(i => (i + 1) % TESTIMONIALS.length), 3800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);
  const t = TESTIMONIALS[active];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative" style={{ minHeight: '220px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, filter: prefersReducedMotion ? undefined : 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: prefersReducedMotion ? undefined : 'blur(0px)' }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16, filter: prefersReducedMotion ? undefined : 'blur(4px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-xl p-7 border border-border bg-surface shadow-[var(--shadow-xs)]"
          >
            <Quote className="w-8 h-8 mb-4 text-brand/55" />
            <p className="text-base leading-relaxed italic mb-5 text-body">"{t.text}"</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-bold flex items-center justify-center"
                  style={{ boxShadow: '0 0 14px rgba(28,100,242,0.35)' }}>{t.avatar}</div>
                <div>
                  <p className="font-semibold text-heading text-sm">{t.name}</p>
                  <p className="text-xs flex items-center gap-1 text-muted">
                    <MapPin className="w-3 h-3" />{t.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 border rounded-lg px-3 py-1.5 bg-brand-softer border-brand-soft">
                  <CheckCircle className="w-3.5 h-3.5 text-brand" />
                  <span className="text-xs font-bold text-brand">{t.highlight}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-warning-strong text-warning-strong" />)}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6" role="group" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}
            aria-label={`View review from ${t.name}`}
            aria-current={i === active ? 'true' : undefined}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border/60"
          >
            <span className={`block rounded-full transition-all duration-300 h-2 ${i === active ? 'w-7 bg-brand' : 'w-2 bg-border-medium'}`} />
          </button>
        ))}
      </div>
      <p className="text-center text-xs mt-3 text-muted">
        {active + 1} of {TESTIMONIALS.length} reviews
      </p>
    </div>
  );
}

/* ── How it works ────────────────────────────────────────────────────── */
const HOW = [
  { step: '01', icon: <Search className="w-5 h-5" />,      title: 'Drop a city',            desc: 'Type where you\'re headed — any city in India or beyond. Add your dates, budget, and vibe.' },
  { step: '02', icon: <Zap className="w-5 h-5" />,         title: 'AI does the digging',    desc: 'Gemini reads real Google Places data — ratings, reviews, distance, hours — and ranks what actually fits. Not sponsored. Not padded.' },
  { step: '03', icon: <CheckCircle className="w-5 h-5" />, title: 'Pick with zero doubt',   desc: 'Every result comes with the exact reason it was chosen. Save your shortlist. Send it to whoever\'s coming.' },
];

/* ══════════════════════════════════════════════════════════════════════
   SVG Mood Illustrations
══════════════════════════════════════════════════════════════════════ */

export function HotelScene({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="94" rx="26" ry="3" fill="rgba(96,165,250,.25)"/>
      <rect x="22" y="28" width="56" height="62" rx="2" fill="rgba(28,100,242,.22)" stroke="rgba(96,165,250,.75)" strokeWidth="1.5"/>
      <rect x="30" y="18" width="40" height="12" rx="1" fill="rgba(28,100,242,.30)" stroke="rgba(96,165,250,.60)" strokeWidth="1"/>
      <line x1="50" y1="7" x2="50" y2="18" stroke="rgba(147,197,253,.85)" strokeWidth="1.2"/>
      <polygon points="50,7 62,11 50,15" fill="rgba(147,197,253,.95)"/>
      <rect className="hw1" x="30" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw2" x="45" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw3" x="60" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw4" x="30" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw5" x="45" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw6" x="60" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw2" x="30" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw3" x="45" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw4" x="60" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect x="41" y="75" width="17" height="15" rx="1" fill="rgba(28,100,242,.50)" stroke="rgba(96,165,250,.75)" strokeWidth="1"/>
    </svg>
  );
}

export function FoodScene({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="90" rx="20" ry="2.5" fill="rgba(96,165,250,.30)"/>
      <path className="fs1" d="M37 46 Q39 39 37 32" stroke="rgba(147,197,253,.90)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path className="fs2" d="M50 43 Q52 36 50 29" stroke="rgba(147,197,253,.90)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path className="fs3" d="M63 46 Q65 39 63 32" stroke="rgba(147,197,253,.90)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M17 58 Q17 84 50 86 Q83 84 83 58 Z" fill="rgba(28,100,242,.28)" stroke="rgba(96,165,250,.80)" strokeWidth="1.5"/>
      <ellipse cx="50" cy="58" rx="33" ry="7" fill="rgba(28,100,242,.38)" stroke="rgba(96,165,250,.85)" strokeWidth="1.5"/>
      <ellipse cx="50" cy="58" rx="29" ry="5.5" fill="rgba(59,130,246,.55)"/>
      <path d="M33 58 Q41 51 49 58 Q57 65 65 58 Q70 52 68 59" stroke="rgba(191,219,254,.95)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <line x1="70" y1="38" x2="60" y2="65" stroke="rgba(147,197,253,.95)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="76" y1="38" x2="66" y2="65" stroke="rgba(147,197,253,.95)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function ItinScene({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="76" height="64" rx="4" fill="rgba(28,100,242,.18)" stroke="rgba(96,165,250,.45)" strokeWidth="1"/>
      <line x1="12" y1="37" x2="88" y2="37" stroke="rgba(96,165,250,.22)" strokeWidth=".5"/>
      <line x1="12" y1="56" x2="88" y2="56" stroke="rgba(96,165,250,.22)" strokeWidth=".5"/>
      <line x1="36" y1="18" x2="36" y2="82" stroke="rgba(96,165,250,.22)" strokeWidth=".5"/>
      <line x1="60" y1="18" x2="60" y2="82" stroke="rgba(96,165,250,.22)" strokeWidth=".5"/>
      <path className="ir" d="M27 73 Q27 56 42 56 Q57 56 57 37 Q57 27 73 27"
        stroke="rgba(147,197,253,.95)" strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="7 4" strokeDashoffset="230"/>
      <g className="ip1"><circle cx="27" cy="73" r="5.5" fill="#1C64F2"/><text x="27" y="76.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">A</text></g>
      <g className="ip2"><circle cx="57" cy="37" r="5.5" fill="#1A56DB"/><text x="57" y="40.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">B</text></g>
      <g className="ip3"><circle cx="73" cy="27" r="5.5" fill="#1E429F"/><text x="73" y="30.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">C</text></g>
      <ellipse cx="50" cy="84" rx="22" ry="2" fill="rgba(96,165,250,.25)"/>
    </svg>
  );
}

export function ExploreScene({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle className="er1" cx="50" cy="50" r="36" stroke="rgba(96,165,250,.55)" strokeWidth="1" fill="none"/>
      <circle className="er2" cx="50" cy="50" r="27" stroke="rgba(96,165,250,.65)" strokeWidth="1" fill="none"/>
      <circle cx="50" cy="50" r="22" fill="rgba(28,100,242,.20)" stroke="rgba(96,165,250,.80)" strokeWidth="1.5"/>
      <text x="50" y="27"  textAnchor="middle" fill="rgba(147,197,253,.95)" fontSize="7" fontWeight="bold">N</text>
      <text x="50" y="79"  textAnchor="middle" fill="rgba(147,197,253,.60)"  fontSize="6">S</text>
      <text x="79" y="53"  textAnchor="middle" fill="rgba(147,197,253,.60)"  fontSize="6">E</text>
      <text x="21" y="53"  textAnchor="middle" fill="rgba(147,197,253,.60)"  fontSize="6">W</text>
      <g className="en">
        <polygon points="50,30 47,50 50,54 53,50" fill="rgba(147,197,253,.98)"/>
        <polygon points="50,70 47,50 50,46 53,50" fill="rgba(255,255,255,.35)"/>
      </g>
      <circle cx="50" cy="50" r="3.5" fill="#1C64F2"/>
      <circle cx="50" cy="50" r="1.8" fill="white"/>
      <ellipse cx="50" cy="84" rx="14" ry="2" fill="rgba(96,165,250,.30)"/>
    </svg>
  );
}

/* ── 3D Tilt card ─────────────────────────────────────────────────────── */
function TiltCard({ label, desc, glow, image, onClick, animDelay = 0 }: {
  label: string; desc: string; glow: string;
  image: string; onClick: () => void; animDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 350, damping: 26 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 350, damping: 26 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          background: 'var(--color-darkest)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 16px 48px rgba(0,0,0,0.50)',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: animDelay }}
        viewport={{ once: true, amount: 0.2 }}
        className="cursor-pointer relative group rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center text-center select-none h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {/* Full-bleed hero image */}
        <div className="relative w-full h-44 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Dark gradient so text below stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content area */}
        <div className="relative z-10 flex flex-col items-center text-center gap-3 p-6 flex-1">
          {/* Top glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% -10%, ${glow}22 0%, transparent 65%)` }} />

          {/* Label */}
          <h3 className="relative z-10 font-display font-bold text-xl text-white">{label}</h3>

          {/* Desc */}
          <p className="relative z-10 text-sm leading-relaxed" style={{ color: 'var(--color-on-dark-body)' }}>{desc}</p>

          {/* CTA arrow */}
          <div className="relative z-10 flex items-center gap-1 text-xs font-bold mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ color: glow }}>
            Search now <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Top edge line */}
        <div className="absolute top-0 left-[18%] right-[18%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }} />

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${glow}70, transparent)` }} />
      </motion.div>
    </div>
  );
}

/* ── Category metadata ────────────────────────────────────────────────── */
const CATEGORIES: { label: Tab; desc: string; glow: string; image: string }[] = [
  { label: 'Hotels',    glow: 'var(--color-brand)', image: '/hotel.webp',     desc: 'Not 150 unfiltered options. AI-ranked picks by budget, area, and what you care about — applied before you see a single result.' },
  { label: 'Food',      glow: 'var(--color-brand)', image: '/food.webp',      desc: 'Worth the queue or skip it? Diet, vibe, and distance — filtered before you open another app.' },
  { label: 'Itinerary', glow: 'var(--color-brand)', image: '/itinerary.webp', desc: 'Your whole day, no backtracking. Stops sequenced around your hotel — so you\'re not zigzagging across the city like a tourist.' },
  { label: 'Explore',   glow: 'var(--color-brand)', image: '/explore.webp',   desc: 'Brihadeeswarar to Airavatesvara. Entry times, dress code, crowd patterns — so you don\'t figure it out after the 2km walk.' },
];

/* ══════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════ */
export function LandingPage({ onTabSelect, isLoggedIn, onAuthSuccess, onNonThanjavurCity }: LandingPageProps) {
  const [authOpen, setAuthOpen]     = useState(false);
  const [pendingTab, setPendingTab] = useState<Tab | null>(null);
  const [demoSearch, setDemoSearch] = useState('');
  const [cityNotice, setCityNotice] = useState<{ city: string; emoji: string } | null>(null);
  const [cityInputError, setCityInputError] = useState<string | null>(null);
  const pendingDestRef = useRef<string>('');

  const prefersReducedMotion = useReducedMotion();

  /* ── Single shared timer — drives both CityRotator (left) and
     HeroPhotoPanel (right) so they always show the same city ── */
  const [heroActive, setHeroActive] = useState(0);
  const [heroTab,   setHeroTab]   = useState<Tab>('Hotels');
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setHeroActive(i => (i + 1) % HERO_DESTINATIONS.length),
      3800,
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const handleCategoryClick = (tab: Tab) => { onTabSelect(tab, demoSearch || undefined); };

  const handleTryThanjavur = () => {
    setCityNotice(null);
    if (isLoggedIn) {
      onTabSelect('Hotels', 'Thanjavur');
    } else {
      pendingDestRef.current = 'Thanjavur';
      setAuthOpen(true);
    }
  };

  const handleCtaClick = () => {
    const dest = demoSearch.trim();
    if (dest && !isThanjavurCity(dest)) {
      setCityInputError(`Only Thanjavur is live right now — try searching "Thanjavur"`);
      onNonThanjavurCity?.(dest);
      return;
    }
    setCityInputError(null);
    if (isLoggedIn) { onTabSelect(heroTab, dest || undefined); return; }
    pendingDestRef.current = dest;
    setPendingTab(heroTab);
    setAuthOpen(true);
  };

  const handleAuthSuccess = (user: { name: string; email: string; avatar?: string }) => {
    setAuthOpen(false);
    onAuthSuccess?.(user, pendingDestRef.current || undefined, pendingTab ?? undefined);
    pendingDestRef.current = '';
    setPendingTab(null);
  };

  return (
    <div className="min-h-dvh flex flex-col overflow-x-hidden bg-bg-app">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-[200] border-b"
        style={{ background: 'rgba(249,250,251,0.92)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(28,100,242,0.06)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center"
              style={{ boxShadow: '0 0 12px rgba(28,100,242,0.30)' }}>
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-heading tracking-tight">
              Trip<span className="text-brand">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleCtaClick}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-darkest" style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(28,100,242,0.20) 0%, transparent 70%)' }}>
        {/* Mesh orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-25%] left-[-15%] w-[680px] h-[680px] rounded-full blur-[140px] animate-aurora"
            style={{ background: 'rgba(28,100,242,0.28)' }} />
          <div className="absolute top-[5%] right-[-20%] w-[580px] h-[580px] rounded-full blur-[160px] animate-aurora-reverse"
            style={{ background: 'rgba(28,100,242,0.14)' }} />
          <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full blur-[130px] animate-aurora-slow"
            style={{ background: 'rgba(28,100,242,0.09)' }} />
        </div>

        <div className="relative max-w-screen-xl mx-auto w-full px-4 md:px-8 pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 border text-brand-soft text-xs font-bold px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(28,100,242,0.1)', borderColor: 'rgba(28,100,242,0.28)' }}>
                AI that explains every pick
              </div>

              {/* Headline — short + direct */}
              <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-[1.1] tracking-tight">
                <span className="block">Find the best in</span>
                <CityRotator city={HERO_DESTINATIONS[heroActive].city} />
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-on-dark-body)' }}>
                AI-ranked results with the reason behind every pick — in 10 seconds.
              </p>

              {/* Tab selector */}
              <div className="flex gap-2 flex-wrap mt-2">
                {(['Hotels', 'Food', 'Itinerary', 'Explore'] as Tab[]).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setHeroTab(tab)}
                    className={`px-4 min-h-[44px] rounded-xl text-sm font-semibold transition-all duration-200 ${
                      heroTab === tab
                        ? 'bg-brand text-white'
                        : 'text-white/65 hover:text-white hover:bg-white/10'
                    }`}
                    style={heroTab === tab ? {} : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="space-y-3 max-w-[440px]">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand pointer-events-none" />
                  <label htmlFor="hero-search" className="sr-only">Search city</label>
                  <input
                    id="hero-search"
                    type="text"
                    value={demoSearch}
                    onChange={e => { setDemoSearch(e.target.value); if (cityInputError) setCityInputError(null); }}
                    onBlur={() => {
                      const v = demoSearch.trim();
                      if (v && !isThanjavurCity(v)) setCityInputError(`Only Thanjavur is live right now — try "Thanjavur"`);
                    }}
                    placeholder="City — try Thanjavur"
                    aria-describedby={cityInputError ? 'city-error' : undefined}
                    aria-invalid={!!cityInputError}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl text-base text-heading placeholder:text-muted outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand/30"
                    style={{
                      background: 'rgba(255,255,255,0.97)',
                      border: cityInputError ? '1.5px solid #F05252' : '1.5px solid rgba(255,255,255,1)',
                      boxShadow: cityInputError ? '0 4px 24px rgba(240,82,82,0.18)' : '0 4px 24px rgba(0,0,0,0.18)',
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleCtaClick()}
                  />
                </div>
                <AnimatePresence>
                  {cityInputError && (
                    <motion.p
                      id="city-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-1.5 text-xs font-medium text-danger"
                    >
                      <X className="w-3.5 h-3.5 shrink-0" />
                      {cityInputError}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button onClick={handleCtaClick} size="lg" className="w-full justify-center py-4 text-base">
                  Show me the best <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: 'var(--color-on-dark-body)' }}>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-warning-strong text-warning-strong shrink-0" />Live Google ratings</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-brand-border shrink-0" />Under 10 seconds</span>
                <span className="flex items-center gap-1.5"><span className="text-base leading-none shrink-0" aria-hidden="true">🇮🇳</span>Built for India</span>
              </div>
            </motion.div>

            {/* Right */}
            <div className="mt-6 md:mt-0">
              <HeroPhotoPanel active={heroActive} setActive={setHeroActive} />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-y border-border bg-surface">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-3">Three steps. Zero tab-switching.</h2>
            <p className="max-w-md mx-auto text-body">From where you're going to what's worth booking — without opening another tab.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {HOW.map((h, i) => (
              <motion.div key={h.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center mx-auto"
                  style={{ boxShadow: '0 0 14px rgba(28,100,242,0.25)' }}>{h.icon}</div>
                <div className="text-xs font-semibold text-brand">{h.step}</div>
                <h3 className="font-display font-bold text-base text-heading">{h.title}</h3>
                <p className="text-sm font-normal leading-relaxed text-body">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── City poster slider ─────────────────────────────────────── */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-6">
          <p className="text-xs font-normal text-muted">
            We've got eyes on these cities
          </p>
        </div>
        <CityPosterSlider onCityClick={(city, emoji) => setCityNotice({ city, emoji })} />
      </section>

      {/* ── 3D Category cards ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-darkest">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">One search. Four answers.</h2>
            <p style={{ color: 'var(--color-on-dark-body)' }}>Pick what you need — AI ranks the best options in under 10 seconds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {CATEGORIES.map((c, i) => (
              <TiltCard
                key={c.label}
                label={c.label}
                desc={c.desc}
                glow={c.glow}
                image={c.image}
                onClick={() => handleCategoryClick(c.label)}
                animDelay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-y border-border bg-surface">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-3">From people who stopped tab-switching</h2>
            <p className="text-body">Real searches. Real relief.</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-bg-app border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-3">Built different. Works better.</h2>
            <p className="text-body">Every detail exists to save you time, not waste it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-6 h-6" />,    title: 'Real ratings, not old ones',   desc: 'Every result is pulled live from Google Places — actual hours, actual ratings, no reviews from 2019 telling you a place is "great."' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'AI that explains itself',      desc: 'Not just a ranked list. Every pick comes with the exact reason it matches you — so you book with zero second-guessing.' },
              { icon: <Shield className="w-6 h-6" />,   title: 'Your shortlist, not a search', desc: 'Save what the AI found. Compare options side by side. Share with whoever\'s joining. Revisit when plans change.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand text-white flex items-center justify-center shrink-0"
                  style={{ boxShadow: '0 0 12px rgba(28,100,242,0.25)' }}>{f.icon}</div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-heading">{f.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-body">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-darkest">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] rounded-full blur-[120px]"
            style={{ background: 'rgba(28,100,242,0.22)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Your next trip is<br />10 seconds away.
          </h2>
          <p style={{ color: 'var(--color-on-dark-body)' }}>India's AI travel ranker — Google-verified, always free.</p>
          <Button size="xl" onClick={handleCtaClick} className="mx-auto">
            Start for free <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t py-10 bg-darkest" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 space-y-6">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-border" />
              <span className="font-display font-bold text-white">TripAI</span>
              <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(28,100,242,0.15)', color: 'var(--color-brand-light)', border: '1px solid rgba(28,100,242,0.25)' }}>
                <span aria-hidden="true">🇮🇳</span> India's AI travel ranker
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-on-dark-muted)' }}>
              Powered by Google Places + Gemini AI
            </p>
          </div>
          {/* Bottom row — links + copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-5 text-xs" style={{ color: 'var(--color-on-dark-muted)' }}>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-on-dark-muted)' }}>© 2026 TripAI · All rights reserved</p>
          </div>
        </div>
      </footer>

      </main>

      {/* ── Auth modal ─────────────────────────────────────────────── */}
      <Modal open={authOpen} onClose={() => setAuthOpen(false)} title="Let's get you started" size="sm">
        <AuthForm onSuccess={handleAuthSuccess} asModal />
      </Modal>

      {/* ── City notice modal — shown when a non-Thanjavur city is clicked ── */}
      <AnimatePresence>
        {cityNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[400] flex items-center justify-center p-5"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={() => setCityNotice(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="city-notice-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="rounded-2xl p-6 max-w-sm w-full relative"
              style={{ background: 'rgba(10,14,30,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setCityNotice(null)}
                aria-label="Close"
                className="absolute top-3 right-3 p-2.5 rounded-lg text-white/40 hover:text-white/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-4xl block mb-3" aria-hidden="true">{cityNotice.emoji}</span>
              <h3 id="city-notice-title" className="text-white font-display font-bold text-xl mb-2">
                {cityNotice.city} isn't live yet
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-on-dark-body)' }}>
                TripAI is fully live in{' '}
                <span className="font-semibold" style={{ color: 'var(--color-warning)' }}>Thanjavur</span>{' '}
                — hotels, restaurants, and landmarks AI-ranked in seconds.{' '}
                {cityNotice.city} is next on our roadmap. Try what's live while we build for you.
              </p>
              <Button onClick={handleTryThanjavur} className="w-full justify-center">
                Try Thanjavur <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
