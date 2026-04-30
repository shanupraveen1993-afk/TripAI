import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Compass, Search, MapPin, Star, Sparkles, ArrowRight,
  Shield, Globe, CheckCircle, Zap, Quote,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { AuthForm } from './AuthForm';
import { Tab } from './ui/Tabs';

interface LandingPageProps {
  onTabSelect: (tab: Tab, dest?: string) => void;
  isLoggedIn: boolean;
  onAuthSuccess?: (user: { name: string; email: string; avatar?: string }, dest?: string) => void;
}

/* ── City rotator — controlled, driven by shared heroActive index ─────── */
function CityRotator({ city }: { city: string }) {
  return (
    <span className="block h-[1.15em] relative overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.span
          key={city}
          initial={{ opacity: 0, y: '60%', filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-60%', filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="gradient-text-hero absolute left-0 top-0 whitespace-nowrap"
        >
          {city}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── City poster slider ───────────────────────────────────────────────── */
const CITY_POSTERS = [
  { city: 'Bangalore', gradient: 'from-green-600 to-emerald-400',  emoji: '🏨' },
  { city: 'Goa',       gradient: 'from-teal-500 to-cyan-300',      emoji: '🍽️' },
  { city: 'Jaipur',    gradient: 'from-pink-500 to-rose-300',      emoji: '🏯' },
  { city: 'Mumbai',    gradient: 'from-orange-500 to-amber-300',   emoji: '🌆' },
  { city: 'Delhi',     gradient: 'from-red-500 to-orange-300',     emoji: '🏨' },
  { city: 'Hyderabad', gradient: 'from-amber-500 to-yellow-300',   emoji: '🍛' },
  { city: 'Chennai',   gradient: 'from-blue-600 to-sky-300',       emoji: '🦞' },
  { city: 'Udaipur',   gradient: 'from-purple-600 to-violet-300',  emoji: '🏰' },
  { city: 'Kochi',     gradient: 'from-lime-600 to-green-300',     emoji: '🌊' },
  { city: 'Kolkata',   gradient: 'from-indigo-600 to-blue-400',    emoji: '🍜' },
  { city: 'Pune',      gradient: 'from-stone-500 to-amber-300',    emoji: '☕' },
  { city: 'Rishikesh', gradient: 'from-sky-600 to-blue-300',       emoji: '🏕️' },
];

function CityPosterSlider() {
  const doubled = [...CITY_POSTERS, ...CITY_POSTERS];
  return (
    <div className="overflow-hidden w-full">
      <div className="animate-marquee flex gap-3" style={{ width: 'max-content' }}>
        {doubled.map((p, i) => (
          <div key={i} className={`bg-gradient-to-br ${p.gradient} rounded-2xl flex-shrink-0 w-36 h-44 relative overflow-hidden flex flex-col justify-end p-3 shadow-lg`}>
            <span className="absolute top-3 right-3 text-2xl">{p.emoji}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full rounded-2xl"
              style={{ animation: 'shimmer 3.5s ease-in-out infinite' }} />
            <p className="relative z-10 text-white font-display font-black text-sm leading-tight">{p.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero destinations — single source of truth for both left + right ── */
export const HERO_DESTINATIONS = [
  { city: 'Goa',       subtitle: 'Restaurant · Calangute · AI #1 pick',  gradient: 'from-orange-800 via-amber-700 to-yellow-500', emoji: '🍽️', badge: '4.7★ · Most Reviewed',        aiPick: 'Top seafood pick near your hotel — open late, matches your casual beachside dining preference.',       tags: ['Restaurant','Seafood','Beach']   },
  { city: 'Jaipur',    subtitle: 'Hotel · Civil Lines · AI #1 pick',     gradient: 'from-pink-800 via-rose-700 to-pink-400',      emoji: '🏨', badge: '4.9★ · Heritage Stay',        aiPick: 'Only property in your budget with rooftop dining + heritage rating + 4.9★ Google score.',            tags: ['Hotel','Heritage','Rooftop']     },
  { city: 'Bangalore', subtitle: 'Hotel · Indiranagar · AI #1 pick',     gradient: 'from-slate-800 via-slate-700 to-blue-600',    emoji: '🏨', badge: '4.8★ · Top Rated Hotel',      aiPick: 'Best match for business stays — rooftop pool, free breakfast, 0.3km from MG Road metro.',            tags: ['Hotel','Business','Pool']        },
  { city: 'Mumbai',    subtitle: 'Restaurant · Bandra West · AI #1',     gradient: 'from-indigo-800 via-blue-700 to-sky-500',     emoji: '🍽️', badge: '4.6★ · AI Recommended',       aiPick: 'Best pure-veg pick in Bandra — family-friendly, quick service, matches your diet & budget.',         tags: ['Restaurant','Pure Veg','Family'] },
  { city: 'Delhi',     subtitle: 'Itinerary · Old Delhi · AI #1 pick',   gradient: 'from-red-900 via-rose-800 to-orange-600',     emoji: '🏯', badge: '4.8★ · Heritage Walk',        aiPick: 'Sequenced around Jama Masjid → Chandni Chowk → Red Fort — avoids noon heat, starts at 7am.',        tags: ['Itinerary','Heritage','History'] },
  { city: 'Udaipur',   subtitle: 'Hotel · Lake Pichola · AI #1 pick',    gradient: 'from-violet-900 via-purple-800 to-fuchsia-600',emoji: '🏰', badge: '4.9★ · Lake View Palace',    aiPick: 'Only heritage property with unobstructed lake view under ₹8000/night — books out fast on weekends.', tags: ['Hotel','Lake View','Heritage']   },
  { city: 'Hyderabad', subtitle: 'Food · Banjara Hills · AI #1 pick',    gradient: 'from-amber-900 via-yellow-800 to-orange-500', emoji: '🍛', badge: '4.7★ · Biryani Capital',      aiPick: 'Highest-rated dum biryani within 2km — reviewers say this is the closest thing to Paradise Biryani.', tags: ['Food','Biryani','Non-Veg']       },
  { city: 'Chennai',   subtitle: 'Explore · Marina Beach · AI #1 pick',  gradient: 'from-cyan-900 via-sky-800 to-blue-500',       emoji: '🌊', badge: '4.6★ · Coastal Landmark',    aiPick: 'Best visited at 6am — AI identified Tuesday mornings as the quietest slot before weekend crowds.',    tags: ['Explore','Beach','Landmark']    },
];

/* ── Hero photo panel — controlled by shared heroActive index ─────────── */
function HeroPhotoPanel({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const d = HERO_DESTINATIONS[active];
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
      className="relative w-full rounded-3xl overflow-hidden"
      style={{ height: '560px', boxShadow: '0 0 60px rgba(59,130,246,0.18), 0 30px 60px rgba(0,0,0,0.6)' }}
    >
      <AnimatePresence mode="sync">
        <motion.div key={active} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} className={`absolute inset-0 bg-gradient-to-br ${d.gradient}`} />
      </AnimatePresence>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute top-5 left-5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-full">{d.badge}</div>
      <div className="absolute top-4 right-5 text-5xl drop-shadow-lg select-none">{d.emoji}</div>
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {d.tags.map(tag => (
                <span key={tag} className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[11px] font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <p className="text-white/65 text-sm font-medium mb-1">{d.subtitle}</p>
            <h3 className="text-white font-display font-black text-4xl tracking-tight leading-none">{d.city}</h3>
          </motion.div>
        </AnimatePresence>
        <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ boxShadow: '0 0 16px rgba(59,130,246,0.55)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">AI Pick · Why ranked #1</p>
            <p className="text-white/90 text-sm leading-relaxed">{d.aiPick}</p>
          </div>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="City navigation">
          {HERO_DESTINATIONS.map((d, i) => (
            <button key={i} onClick={() => setActive(i)}
              aria-label={`View ${d.city}`}
              aria-current={i === active ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${i === active ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`} />
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
  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % TESTIMONIALS.length), 3800);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[active];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative" style={{ minHeight: '220px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl p-7 border"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <Quote className="w-8 h-8 mb-4 text-blue-500/55" />
            <p className="text-base leading-relaxed italic mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>"{t.text}"</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center"
                  style={{ boxShadow: '0 0 14px rgba(59,130,246,0.35)' }}>{t.avatar}</div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    <MapPin className="w-3 h-3" />{t.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 border rounded-xl px-3 py-1.5"
                  style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.22)' }}>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-bold text-blue-300">{t.highlight}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
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
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            style={{
              width: i === active ? '28px' : '8px',
              height: '8px',
              background: i === active ? '#3B82F6' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
      <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
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

function HotelScene() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes hw-blink{0%,100%{opacity:1}50%{opacity:.12}}
        .hw1{animation:hw-blink 2.3s ease-in-out infinite}
        .hw2{animation:hw-blink 2.3s ease-in-out infinite .38s}
        .hw3{animation:hw-blink 2.3s ease-in-out infinite .76s}
        .hw4{animation:hw-blink 2.3s ease-in-out infinite 1.14s}
        .hw5{animation:hw-blink 2.3s ease-in-out infinite 1.52s}
        .hw6{animation:hw-blink 2.3s ease-in-out infinite 1.9s}
      `}</style>
      {/* ground glow */}
      <ellipse cx="50" cy="94" rx="26" ry="3" fill="rgba(59,130,246,.18)"/>
      {/* main body */}
      <rect x="22" y="28" width="56" height="62" rx="2" fill="rgba(59,130,246,.11)" stroke="rgba(96,165,250,.55)" strokeWidth="1.5"/>
      {/* top block */}
      <rect x="30" y="18" width="40" height="12" rx="1" fill="rgba(59,130,246,.18)" stroke="rgba(96,165,250,.4)" strokeWidth="1"/>
      {/* flag */}
      <line x1="50" y1="7" x2="50" y2="18" stroke="rgba(96,165,250,.7)" strokeWidth="1.2"/>
      <polygon points="50,7 62,11 50,15" fill="rgba(96,165,250,.9)"/>
      {/* windows row 1 */}
      <rect className="hw1" x="30" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw2" x="45" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw3" x="60" y="35" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      {/* windows row 2 */}
      <rect className="hw4" x="30" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw5" x="45" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw6" x="60" y="48" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      {/* windows row 3 */}
      <rect className="hw2" x="30" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw3" x="45" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      <rect className="hw4" x="60" y="61" width="9" height="7" rx="1" fill="rgba(250,204,21,.95)"/>
      {/* door */}
      <rect x="41" y="75" width="17" height="15" rx="1" fill="rgba(59,130,246,.35)" stroke="rgba(96,165,250,.5)" strokeWidth="1"/>
    </svg>
  );
}

function FoodScene() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes fs-rise{0%{transform:translateY(0) scaleX(1);opacity:.8}100%{transform:translateY(-22px) scaleX(1.25);opacity:0}}
        .fs1{animation:fs-rise 2.1s ease-out infinite}
        .fs2{animation:fs-rise 2.1s ease-out infinite .68s}
        .fs3{animation:fs-rise 2.1s ease-out infinite 1.36s}
      `}</style>
      {/* ground glow */}
      <ellipse cx="50" cy="90" rx="20" ry="2.5" fill="rgba(245,158,11,.2)"/>
      {/* steam */}
      <path className="fs1" d="M37 46 Q39 39 37 32" stroke="rgba(251,146,60,.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path className="fs2" d="M50 43 Q52 36 50 29" stroke="rgba(251,146,60,.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path className="fs3" d="M63 46 Q65 39 63 32" stroke="rgba(251,146,60,.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* bowl body */}
      <path d="M17 58 Q17 84 50 86 Q83 84 83 58 Z" fill="rgba(245,158,11,.16)" stroke="rgba(251,191,36,.6)" strokeWidth="1.5"/>
      {/* rim */}
      <ellipse cx="50" cy="58" rx="33" ry="7" fill="rgba(245,158,11,.26)" stroke="rgba(251,191,36,.65)" strokeWidth="1.5"/>
      {/* content */}
      <ellipse cx="50" cy="58" rx="29" ry="5.5" fill="rgba(251,146,60,.42)"/>
      {/* noodle swirl */}
      <path d="M33 58 Q41 51 49 58 Q57 65 65 58 Q70 52 68 59" stroke="rgba(254,215,170,.85)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* chopsticks */}
      <line x1="70" y1="38" x2="60" y2="65" stroke="rgba(251,191,36,.85)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="76" y1="38" x2="66" y2="65" stroke="rgba(251,191,36,.85)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ItinScene() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes it-draw{0%{stroke-dashoffset:230}100%{stroke-dashoffset:0}}
        @keyframes it-pin{0%,25%{transform:translateY(-14px);opacity:0}40%{transform:translateY(2px);opacity:1}50%{transform:translateY(-1px)}60%,100%{transform:translateY(0);opacity:1}}
        .ir{animation:it-draw 3.6s ease-in-out infinite}
        .ip1{animation:it-pin 3.6s ease-in-out infinite}
        .ip2{animation:it-pin 3.6s ease-in-out infinite 1.1s}
        .ip3{animation:it-pin 3.6s ease-in-out infinite 2.2s}
      `}</style>
      {/* map bg */}
      <rect x="12" y="18" width="76" height="64" rx="4" fill="rgba(139,92,246,.08)" stroke="rgba(167,139,250,.22)" strokeWidth="1"/>
      {/* grid */}
      <line x1="12" y1="37" x2="88" y2="37" stroke="rgba(167,139,250,.11)" strokeWidth=".5"/>
      <line x1="12" y1="56" x2="88" y2="56" stroke="rgba(167,139,250,.11)" strokeWidth=".5"/>
      <line x1="36" y1="18" x2="36" y2="82" stroke="rgba(167,139,250,.11)" strokeWidth=".5"/>
      <line x1="60" y1="18" x2="60" y2="82" stroke="rgba(167,139,250,.11)" strokeWidth=".5"/>
      {/* animated route */}
      <path className="ir" d="M27 73 Q27 56 42 56 Q57 56 57 37 Q57 27 73 27"
        stroke="rgba(167,139,250,.9)" strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="7 4" strokeDashoffset="230"/>
      {/* pins */}
      <g className="ip1"><circle cx="27" cy="73" r="5.5" fill="rgba(139,92,246,.95)"/><text x="27" y="76.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">A</text></g>
      <g className="ip2"><circle cx="57" cy="37" r="5.5" fill="rgba(139,92,246,.85)"/><text x="57" y="40.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">B</text></g>
      <g className="ip3"><circle cx="73" cy="27" r="5.5" fill="rgba(139,92,246,.75)"/><text x="73" y="30.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">C</text></g>
      <ellipse cx="50" cy="84" rx="22" ry="2" fill="rgba(139,92,246,.14)"/>
    </svg>
  );
}

function ExploreScene() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ex-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes ex-pulse{0%,100%{opacity:.4;r:36}50%{opacity:.08;r:40}}
        @keyframes ex-pulse2{0%,100%{opacity:.5;r:27}50%{opacity:.1;r:31}}
        .en{transform-origin:50px 50px;animation:ex-spin 9s linear infinite}
        .er1{animation:ex-pulse 2.6s ease-in-out infinite}
        .er2{animation:ex-pulse2 2.6s ease-in-out infinite .7s}
      `}</style>
      <circle className="er1" cx="50" cy="50" r="36" stroke="rgba(16,185,129,.3)" strokeWidth="1" fill="none"/>
      <circle className="er2" cx="50" cy="50" r="27" stroke="rgba(16,185,129,.4)" strokeWidth="1" fill="none"/>
      <circle cx="50" cy="50" r="22" fill="rgba(16,185,129,.07)" stroke="rgba(52,211,153,.5)" strokeWidth="1.5"/>
      <text x="50" y="27"  textAnchor="middle" fill="rgba(52,211,153,.95)" fontSize="7" fontWeight="bold">N</text>
      <text x="50" y="79"  textAnchor="middle" fill="rgba(52,211,153,.4)"  fontSize="6">S</text>
      <text x="79" y="53"  textAnchor="middle" fill="rgba(52,211,153,.4)"  fontSize="6">E</text>
      <text x="21" y="53"  textAnchor="middle" fill="rgba(52,211,153,.4)"  fontSize="6">W</text>
      <g className="en">
        <polygon points="50,30 47,50 50,54 53,50" fill="rgba(52,211,153,.95)"/>
        <polygon points="50,70 47,50 50,46 53,50" fill="rgba(255,255,255,.2)"/>
      </g>
      <circle cx="50" cy="50" r="3.5" fill="rgba(52,211,153,1)"/>
      <circle cx="50" cy="50" r="1.8" fill="white"/>
      <ellipse cx="50" cy="84" rx="14" ry="2" fill="rgba(16,185,129,.17)"/>
    </svg>
  );
}

/* ── 3D Tilt card ─────────────────────────────────────────────────────── */
function TiltCard({ label, desc, glow, illustration, onClick }: {
  label: string; desc: string; glow: string;
  illustration: React.ReactNode; onClick: () => void;
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
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        onClick={onClick}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.035)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cursor-pointer relative group rounded-2xl overflow-hidden border border-white/10 p-7 flex flex-col items-center text-center gap-4 select-none h-full"
      >
        {/* Top glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 50% -10%, ${glow}22 0%, transparent 65%)` }} />

        {/* Top edge line */}
        <div className="absolute top-0 left-[18%] right-[18%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }} />

        {/* Illustration */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {illustration}
        </div>

        {/* Label */}
        <h3 className="relative z-10 font-display font-black text-xl text-white">{label}</h3>

        {/* Desc */}
        <p className="relative z-10 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{desc}</p>

        {/* CTA arrow */}
        <div className="relative z-10 flex items-center gap-1 text-xs font-bold mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: glow }}>
          Search now <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${glow}70, transparent)` }} />
      </motion.div>
    </div>
  );
}

/* ── Category metadata ────────────────────────────────────────────────── */
const CATEGORIES: { label: Tab; desc: string; glow: string; illustration: React.ReactNode }[] = [
  { label: 'Hotels',    glow: '#3B82F6', illustration: <HotelScene />,   desc: 'Not 150 unfiltered options. AI-ranked picks by budget, area, and what you care about — applied before you see a single result.' },
  { label: 'Food',      glow: '#F59E0B', illustration: <FoodScene />,    desc: 'Worth the queue or skip it? Diet, vibe, and distance — filtered before you open another app.' },
  { label: 'Itinerary', glow: '#8B5CF6', illustration: <ItinScene />,    desc: 'Your whole day, no backtracking. Stops sequenced around your hotel — so you\'re not zigzagging across the city like a tourist.' },
  { label: 'Explore',   glow: '#10B981', illustration: <ExploreScene />, desc: 'The spots Google Maps buries. Entry costs, best visit times, crowd flow — before you show up and figure it out the hard way.' },
];

/* ══════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════ */
export function LandingPage({ onTabSelect, isLoggedIn, onAuthSuccess }: LandingPageProps) {
  const [authOpen, setAuthOpen]     = useState(false);
  const [pendingTab, setPendingTab] = useState<Tab | null>(null);
  const [demoSearch, setDemoSearch] = useState('');
  const pendingDestRef = useRef<string>('');

  /* ── Single shared timer — drives both CityRotator (left) and
     HeroPhotoPanel (right) so they always show the same city ── */
  const [heroActive, setHeroActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setHeroActive(i => (i + 1) % HERO_DESTINATIONS.length),
      3800,
    );
    return () => clearInterval(id);
  }, []);

  const handleCategoryClick = (tab: Tab) => { onTabSelect(tab, demoSearch || undefined); };

  const handleCtaClick = () => {
    if (isLoggedIn) { onTabSelect('Hotels', demoSearch || undefined); return; }
    pendingDestRef.current = demoSearch;
    setPendingTab(null);
    setAuthOpen(true);
  };

  const handleAuthSuccess = (user: { name: string; email: string; avatar?: string }) => {
    setAuthOpen(false);
    onAuthSuccess?.(user, pendingDestRef.current || undefined);
    pendingDestRef.current = '';
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: '#06080F' }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background: 'rgba(6,8,15,0.82)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
              style={{ boxShadow: '0 0 18px rgba(59,130,246,0.55)' }}>
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-black text-xl text-white tracking-tight">
              Trip<span className="text-blue-400">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCtaClick}
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
              Log in
            </button>
            <Button size="sm" onClick={handleCtaClick}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Mesh orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-25%] left-[-15%] w-[680px] h-[680px] rounded-full blur-[140px] animate-aurora"
            style={{ background: 'rgba(59,130,246,0.21)' }} />
          <div className="absolute top-[5%] right-[-20%] w-[580px] h-[580px] rounded-full blur-[140px] animate-aurora-reverse"
            style={{ background: 'rgba(139,92,246,0.15)' }} />
          <div className="absolute bottom-[-15%] left-[28%] w-[480px] h-[480px] rounded-full blur-[120px] animate-aurora-slow"
            style={{ background: 'rgba(16,185,129,0.09)' }} />
        </div>

        <div className="relative max-w-screen-xl mx-auto w-full px-4 md:px-8 pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-7">
              <div className="inline-flex items-center gap-2 border text-blue-300 text-xs font-bold px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.28)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                Your AI travel co-pilot
              </div>

              <h1 className="text-[2.6rem] md:text-5xl lg:text-[3.25rem] font-display font-black text-white leading-[1.1] tracking-tight">
                <span className="block">Still on tab 6?</span>
                <span className="block">AI picks the best in</span>
                <CityRotator city={HERO_DESTINATIONS[heroActive].city} />
                <span className="block text-2xl md:text-3xl font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  so you don't have to.
                </span>
              </h1>

              <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.52)' }}>
                Tell TripAI where you're headed and what matters to you. It scans 100+ places on Google, AI-ranks every result, and tells you exactly why each one fits — in under 10 seconds.
              </p>

              {/* Glassmorphic search */}
              <div className="space-y-3 max-w-[440px]">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <input
                    type="text"
                    value={demoSearch}
                    onChange={e => setDemoSearch(e.target.value)}
                    placeholder="Where are you headed? Goa, Jaipur, Bangalore…"
                    className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-400/40"
                    style={{
                      background: 'rgba(255,255,255,0.055)',
                      border: '1px solid rgba(255,255,255,0.11)',
                      backdropFilter: 'blur(16px)',
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleCtaClick()}
                  />
                </div>
                <Button onClick={handleCtaClick} size="lg" className="w-full justify-center py-4 text-[15px] rounded-2xl">
                  Show me the best <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm pt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />No credit card needed</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />Live Google ratings</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-blue-400 shrink-0" />Under 10 seconds</span>
              </div>
            </motion.div>

            {/* Right */}
            <div className="hidden md:block">
              <HeroPhotoPanel active={heroActive} setActive={setHeroActive} />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-y" style={{ background: 'rgba(255,255,255,0.018)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-black text-white mb-3">Three steps. Zero tab-switching.</h2>
            <p className="max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.42)' }}>From where you're going to what's worth booking — without opening another tab.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {HOW.map((h, i) => (
              <motion.div key={h.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto"
                  style={{ boxShadow: '0 0 22px rgba(59,130,246,0.4)' }}>{h.icon}</div>
                <div className="text-xs font-black text-blue-400 uppercase tracking-widest">{h.step}</div>
                <h3 className="font-display font-bold text-sm text-white">{h.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── City poster slider ─────────────────────────────────────── */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-6">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
            We've got eyes on these cities
          </p>
        </div>
        <CityPosterSlider />
      </section>

      {/* ── 3D Category cards ──────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-3">One search. Four answers.</h2>
            <p style={{ color: 'rgba(255,255,255,0.42)' }}>Pick what you need — AI ranks the best options in under 10 seconds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {CATEGORIES.map(c => (
              <TiltCard
                key={c.label}
                label={c.label}
                desc={c.desc}
                glow={c.glow}
                illustration={c.illustration}
                onClick={() => handleCategoryClick(c.label)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-y" style={{ background: 'rgba(255,255,255,0.018)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-black text-white mb-3">From people who stopped tab-switching</h2>
            <p style={{ color: 'rgba(255,255,255,0.42)' }}>Real searches. Real relief.</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-black text-white mb-3">Built different. Works better.</h2>
            <p style={{ color: 'rgba(255,255,255,0.42)' }}>Every detail exists to save you time, not waste it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-6 h-6" />,    title: 'Real ratings, not old ones',   desc: 'Every result is pulled live from Google Places — actual hours, actual ratings, no reviews from 2019 telling you a place is "great."' },
              { icon: <Sparkles className="w-6 h-6" />, title: 'AI that explains itself',      desc: 'Not just a ranked list. Every pick comes with the exact reason it matches you — so you book with zero second-guessing.' },
              { icon: <Shield className="w-6 h-6" />,   title: 'Your shortlist, not a search', desc: 'Save what the AI found. Compare options side by side. Share with whoever\'s joining. Revisit when plans change.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0"
                  style={{ boxShadow: '0 0 18px rgba(59,130,246,0.38)' }}>{f.icon}</div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[110px]"
            style={{ background: 'rgba(59,130,246,0.16)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-black text-white">
            Your next trip is<br />10 seconds away.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)' }}>AI-ranked. Google-verified. Always free.</p>
          <Button size="xl" onClick={handleCtaClick} className="mx-auto">
            Start for free <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t py-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="font-display font-black text-white">TripAI</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>Powered by Google Places + Gemini AI</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>© 2026 TripAI</p>
        </div>
      </footer>

      {/* ── Auth modal ─────────────────────────────────────────────── */}
      <Modal open={authOpen} onClose={() => setAuthOpen(false)} title="Let's get you started" size="sm">
        <AuthForm onSuccess={handleAuthSuccess} asModal />
      </Modal>
    </div>
  );
}
