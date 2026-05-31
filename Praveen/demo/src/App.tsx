import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Compass, MapPin, Search, X } from 'lucide-react';
import { PlaceCardSkeleton, ItineraryItemSkeleton } from './components/ui/Skeleton';
import { LandingPage } from './components/LandingPage';
import { Navbar, MainSection } from './components/Navbar';
import { Dashboard, DashboardFilters } from './components/Dashboard';
import { ResultsView } from './components/ResultsView';
import { SavedTrips, SavedTrip } from './components/SavedTrips';
import { Profile } from './components/Profile';
import { Modal } from './components/ui/Modal';
import { AuthForm } from './components/AuthForm';
import { Button } from './components/ui/Button';
import { Tab } from './components/ui/Tabs';
import {
  MOCK_HOTELS, MOCK_FOOD, MOCK_ITINERARY,
  MOCK_ITINERARY_AFTERNOON, MOCK_ITINERARY_EVENING,
  MOCK_EXPLORE, EXPLORE_PRESETS,
  PlaceResult,
} from './mock/data';

const SLOT_MOCK: Record<string, typeof MOCK_ITINERARY> = {
  Morning:   MOCK_ITINERARY,
  Afternoon: MOCK_ITINERARY_AFTERNOON,
  Evening:   MOCK_ITINERARY_EVENING,
};
import {
  fetchPlan, fetchItinerary,
  PlanResult, LiveItineraryStop,
} from './api/client';
import { isThanjavurCity } from './utils/city';

type AppScreen = 'landing' | 'browse' | 'app';
type ContentScreen = 'dashboard' | 'loading' | 'results';

/* ── Static skeleton index arrays — defined outside component to avoid realloc ── */
const ITIN_SKELETONS = Array.from({ length: 5 }, (_, i) => i);
const PLACE_SKELETONS = Array.from({ length: 3 }, (_, i) => i);

/* ── App background gradient ──────────────────────────────────────────────── */
const APP_BG_STYLE = {
  background: 'linear-gradient(145deg, var(--color-brand-softer) 0%, var(--color-bg-app) 45%, var(--color-brand-softer) 100%)',
} as const;

/* ── Non-Thanjavur city notice modal ─────────────────────────────────────── */
function CityNoticeModal({ city, onDismiss }: {
  city: string | null;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {city && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-5"
          style={{ background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(6px)' }}
          onClick={onDismiss}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-notice-title"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="rounded-2xl p-6 max-w-sm w-full relative bg-surface border border-border"
            style={{ boxShadow: 'var(--shadow-l, 0 20px 60px rgba(0,0,0,0.18))' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onDismiss}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-lg text-muted hover:text-heading hover:bg-bg-app transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-brand-softer border border-brand-medium/40 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-brand" aria-hidden="true" />
            </div>
            <h3 id="city-notice-title" className="font-display font-bold text-lg text-heading mb-2">{city} isn't live yet</h3>
            <p className="text-sm text-body leading-relaxed mb-5">
              TripAI is fully live in <span className="font-semibold text-brand">Thanjavur</span> — hotels, restaurants, and landmarks AI-ranked in seconds. {city} is next on our roadmap.
            </p>
            <Button onClick={onDismiss} className="w-full justify-center">
              Try Thanjavur <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface User { name: string; email: string; avatar?: string; }

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('tripai_user');
      return stored ? (JSON.parse(stored) as User) : null;
    } catch { return null; }
  });
  const [appScreen, setAppScreen]     = useState<AppScreen>(() => {
    try {
      return localStorage.getItem('tripai_user') ? 'app' : 'landing';
    } catch { return 'landing'; }
  });
  const [mainSection, setMainSection] = useState<MainSection>('home');
  const [contentScreen, setContent]   = useState<ContentScreen>('dashboard');
  const [searchLocation, setSearchLocation] = useState('Thanjavur');
  const [liveResults, setLiveResults]       = useState<PlanResult[] | null>(null);
  const [liveItinerary, setLiveItinerary]   = useState<LiveItineraryStop[] | null>(null);
  const [apiError, setApiError]             = useState(false);
  const [searchSeed, setSearchSeed]         = useState(0);
  const [searchArea, setSearchArea]         = useState('');
  const [activeTab, setActiveTab]     = useState<Tab>('Hotels');
  const [initialTab, setInitialTab]   = useState<Tab | undefined>(undefined);
  const [savedTrips, setSavedTrips]   = useState<SavedTrip[]>(() => {
    try {
      const stored = localStorage.getItem('tripai_saved');
      return stored ? (JSON.parse(stored) as SavedTrip[]) : [];
    } catch { return []; }
  });
  const [isSaved, setIsSaved]         = useState(false);
  const [aiCount, setAiCount]         = useState(0);
  const [itineraryGenCount, setItineraryGenCount] = useState(0);
  const [lastSearchFilters, setLastSearchFilters] = useState<DashboardFilters | null>(null);
  const [backContext, setBackContext] = useState<'dashboard' | 'itinerary-results'>('dashboard');
  const [itinStopCount, setItinStopCount] = useState(5);
  const [nonThanjavurNotice, setNonThanjavurNotice] = useState<string | null>(null);

  const dismissCityNotice = () => {
    setNonThanjavurNotice(null);
    setSearchLocation('Thanjavur');
  };

  // Disable browser scroll restoration — always start at top on load/back
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Scroll to top on every screen transition (dashboard, loading, results)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [contentScreen]);

  // Also scroll to top when navigating between main sections (history, profile)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [mainSection]);

  // Push a history entry when results are shown so browser back button works
  useEffect(() => {
    if (contentScreen === 'results') {
      window.history.pushState({ screen: 'results' }, '');
    }
  }, [contentScreen]);

  // Listen for browser back button — pop back to dashboard
  useEffect(() => {
    const onPop = () => {
      if (contentScreen === 'results') {
        setBackContext('dashboard');
        setInitialTab(activeTab);
        setContent('dashboard');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [contentScreen, activeTab]);

  // Persist user session and saved trips across page refreshes
  useEffect(() => {
    try {
      if (user) localStorage.setItem('tripai_user', JSON.stringify(user));
      else localStorage.removeItem('tripai_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem('tripai_saved', JSON.stringify(savedTrips)); } catch {}
  }, [savedTrips]);

  // Browse mode: auth modal shown when user tries to search
  const [browseAuthOpen, setBrowseAuthOpen]     = useState(false);
  const [pendingFilters, setPendingFilters]     = useState<DashboardFilters | null>(null);

  // ── Auth (from landing CTA) ─────────────────────────────────────────────
  const handleAuthSuccess = (u: User, dest?: string, tab?: Tab) => {
    setUser(u);
    if (dest) setSearchLocation(dest);
    setInitialTab(tab ?? 'Hotels');
    setActiveTab(tab ?? 'Hotels');
    setContent('dashboard');
    setAppScreen('app');
  };

  // ── Auth (from browse-mode search gate) ────────────────────────────────
  const handleBrowseAuthSuccess = async (u: User) => {
    setUser(u);
    setBrowseAuthOpen(false);
    setAppScreen('app');
    if (pendingFilters) {
      await runSearch(pendingFilters, searchSeed);
      setPendingFilters(null);
    }
  };

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => setLogoutConfirmOpen(true);

  const confirmLogout = () => {
    try { localStorage.removeItem('tripai_user'); } catch {}
    setUser(null);
    setAppScreen('landing');
    setMainSection('home');
    setContent('dashboard');
    setInitialTab(undefined);
    setLogoutConfirmOpen(false);
  };

  // ── Tab selection from landing page categories ──────────────────────────
  const handleTabSelect = (tab: Tab, dest?: string) => {
    if (dest) setSearchLocation(dest);
    setInitialTab(tab);
    setActiveTab(tab);
    setContent('dashboard');
    if (user !== null) {
      setAppScreen('app');
    } else {
      setAppScreen('browse');
    }
  };

  // ── Core search logic ───────────────────────────────────────────────────

  const runSearch = async (filters: DashboardFilters, seed: number) => {
    // Non-Thanjavur city → show notice popup, stay on dashboard
    if (filters.destination && !isThanjavurCity(filters.destination)) {
      setNonThanjavurNotice(filters.destination);
      return;
    }
    setActiveTab(filters.tab);
    if (filters.destination) setSearchLocation('Thanjavur');
    setLastSearchFilters(filters);
    setContent('loading');
    setIsSaved(false);
    setLiveResults(null);
    setLiveItinerary(null);
    setApiError(false);
    try {
      if (filters.tab === 'Explore') {
        // Explore always uses preset data — no API call needed
      } else if (filters.tab === 'Itinerary') {
        const timeSlot = filters.startTime || 'Morning';
        const slotStopMap: Record<string, number> = { Morning: 10, Afternoon: 4, Evening: 2 };
        setItinStopCount(slotStopMap[timeSlot] ?? 10);
        const ITIN_TIMES: Record<string, string[]> = {
          Morning:   ['7:00 AM','9:15 AM','10:45 AM','11:45 AM','12:30 PM','1:30 PM','2:45 PM','3:45 PM','5:00 PM','7:00 PM'],
          Afternoon: ['2:00 PM','3:15 PM','4:30 PM','5:30 PM'],
          Evening:   ['5:00 PM','7:00 PM'],
        };
        const ITIN_DEPART: Record<string, Array<string|undefined>> = {
          Morning:   ['9:00 AM','10:45 AM','11:30 AM','12:15 PM','1:15 PM','2:30 PM','3:30 PM','4:15 PM','6:30 PM',undefined],
          Afternoon: ['3:00 PM','4:15 PM','5:15 PM',undefined],
          Evening:   ['6:30 PM',undefined],
        };
        const applySlotTimes = (arr: typeof MOCK_ITINERARY) =>
          arr.map((s, i) => ({ ...s, time: ITIN_TIMES[timeSlot]?.[i] ?? s.time, departBy: ITIN_DEPART[timeSlot]?.[i] }));

        const stops = await fetchItinerary(
          timeSlot, seed,
          filters.destination || searchLocation || 'Thanjavur',
          filters.itinDate,
          filters.startPoint,
        );
        if (stops.length > 0) {
          setLiveItinerary(stops);
          setItinStopCount(stops.length);
          setItineraryGenCount(c => c + 1);
        } else {
          setLiveItinerary(applySlotTimes(SLOT_MOCK[timeSlot] ?? MOCK_ITINERARY.slice(0, slotStopMap[timeSlot] ?? 5)));
          setApiError(true);
        }
      } else {
        // Hotels / Food — fetch 20, Gemini splits into recommended + secondary
        const { results } = await fetchPlan(filters.tab, seed, {
          city:        filters.destination,
          hotelTag:    filters.hotelTag,
          hotelTags:   filters.hotelTags?.length ? filters.hotelTags : undefined,
          hotelArea:   filters.hotelArea || searchArea,
          foodTag:     filters.foodTag,
          foodTags:    filters.foodTags?.length ? filters.foodTags : undefined,
          priceFilter: filters.priceFilter,
          minRating:   filters.minRating === '4.5+' ? 4.5 : filters.minRating === '4.0+' ? 4.0 : filters.minRating === '3.5+' ? 3.5 : 0,
          openNow:     filters.openNow,
          dietType:    filters.dietType,
          dineMode:    filters.dineMode,
          mealTime:    filters.mealTime,
          searchQuery: filters.searchQuery || undefined,
        });
        setLiveResults(results);
      }
    } catch {
      // API completely failed — fall back to sample data so the demo still works
      if (filters.tab === 'Hotels') {
        const q = filters.searchQuery?.toLowerCase();
        const matched = q ? MOCK_HOTELS.filter(h => h.name.toLowerCase().includes(q)) : MOCK_HOTELS;
        setLiveResults((matched.length ? matched : MOCK_HOTELS).slice(0, 10) as unknown as PlanResult[]);
      }
      else if (filters.tab === 'Food') {
        const activeTags = [...(filters.foodTags ?? []), ...(filters.foodTag ? [filters.foodTag] : [])].filter(Boolean);
        // Keywords grounded in real review frequency from top-50 Thanjavur restaurants
        const KEYWORD_MAP: Record<string, string[]> = {
          // Cuisine & Dish
          'Biryani':         ['biryani', 'biriyani', 'dum biryani', 'mandi biryani'],
          'South Indian':    ['dosa', 'idli', 'sambar', 'thali', 'tiffin', 'banana leaf', 'south indian', 'pongal', 'rasam', 'dosai'],
          'Chettinad':       ['chettinad', 'kuzhambu', 'pepper chicken', 'nattu kozhi', 'chettinad cuisine'],
          'North Indian':    ['paneer', 'north indian', 'naan', 'roti', 'butter chicken', 'tandoor'],
          'Cafe & Snacks':   ['cafe', 'coffee', 'filter coffee', 'bakery', 'snacks', 'noodles', 'dessert', 'sweet'],
          'Veg Biryani':     ['veg biryani', 'vegetable biryani', 'veg biriyani'],
          'Multi Cuisine':   ['multi cuisine', 'variety', 'continental'],
          // Meal & Timing
          'Breakfast':       ['breakfast', 'morning', 'tiffin', 'idli', 'dosa', 'pongal'],
          'Lunch':           ['lunch', 'lunch meals', 'lunch thali', 'afternoon meals'],
          'Dinner':          ['dinner', 'night', 'evening'],
          'Quick Bites':     ['quick', 'fast service', 'takeaway', 'parcel', 'street food'],
          'All Day':         ['variety', 'all day', 'menu', 'options', 'buffet'],
          // Taste & Quality — use specific phrases to avoid matching everything
          'Authentic':       ['authentic', 'traditional', 'original', 'homemade'],
          'Delicious':       ['delicious', 'tasty', 'flavorful', 'flavour', 'yummy'],
          'Fresh':           ['fresh', 'freshly cooked', 'freshly prepared', 'hot and fresh'],
          'Good Quantity':   ['quantity', 'generous', 'good quantity', 'generous portions', 'filling'],
          'Spicy':           ['spicy', 'spice', 'masala', 'pepper', 'tangy'],
          // Dining Experience
          'Family Dining':   ['family', 'spacious', 'kids', 'comfortable seating', 'group dining'],
          'Good Ambience':   ['ambience', 'ambiance', 'atmosphere', 'decor', 'cozy'],
          'Clean':           ['clean', 'hygienic', 'neat', 'tidy', 'cleanliness'],
          'Friendly Staff':  ['friendly staff', 'helpful staff', 'attentive staff', 'courteous'],
          'AC Dine-in':      ['fully ac', 'air conditioned', 'ac restaurant', 'air conditioning'],
          // Value & Price
          'Affordable':      ['affordable', 'cheap', 'pocket friendly', 'budget', 'inexpensive'],
          'Value for Money': ['value for money', 'worth it', 'good value', 'worth the price'],
          'Good Portions':   ['quantity', 'generous portions', 'good quantity', 'filling meal'],
          'Highly Rated':    ['highly recommended', 'must visit', 'must try', 'top rated'],
          'Top Pick':        ['favourite', 'popular', 'local favourite', 'crowd favourite'],
          // Legacy aliases
          'Filter Coffee':   ['filter coffee', 'kaapi', 'coffee', 'cafe'],
          'Thali':           ['thali', 'meals', 'banana leaf'],
          'Thali/Meals':     ['thali', 'meals', 'banana leaf'],
          'Tiffin':          ['tiffin', 'idli', 'dosa'],
          'Non-Veg':         ['chicken', 'mutton', 'fish', 'non-veg', 'chettinad'],
          'Pure Veg':        ['pure veg', 'veg only', 'vegetarian'],
        };
        let filtered = MOCK_FOOD;
        const fq = filters.searchQuery?.toLowerCase();
        if (fq) {
          filtered = MOCK_FOOD.filter(item => item.name.toLowerCase().includes(fq));
        } else if (activeTags.length > 0) {
          filtered = MOCK_FOOD.filter(item => {
            const corpus = [...item.tags, item.name, item.aiNote ?? ''].join(' ').toLowerCase();
            return activeTags.some(tag => {
              const kws = KEYWORD_MAP[tag] ?? [tag.toLowerCase()];
              return kws.some(kw => corpus.includes(kw)) || item.tags.some(t => t.toLowerCase() === tag.toLowerCase());
            });
          });
        }
        setLiveResults((filtered.length > 0 ? filtered : MOCK_FOOD).slice(0, 10) as unknown as PlanResult[]);
      } else if (filters.tab === 'Itinerary') {
        const ts = filters.startTime || 'Morning';
        const times: Record<string, string[]> = { Morning: ['7:00 AM','9:15 AM','10:45 AM','11:45 AM','12:30 PM'], Afternoon: ['2:00 PM','3:15 PM','4:30 PM'], Evening: ['5:00 PM','7:00 PM'] };
        const depts: Record<string, Array<string|undefined>> = { Morning: ['9:00 AM','10:45 AM','11:30 AM','12:15 PM',undefined], Afternoon: ['3:00 PM','4:15 PM',undefined], Evening: ['6:30 PM',undefined] };
        const preset = SLOT_MOCK[ts] ?? MOCK_ITINERARY;
        setLiveItinerary(preset.map((s, i) => ({ ...s, time: times[ts]?.[i] ?? s.time, departBy: depts[ts]?.[i] })));
      }
      setApiError(true);
    }
    setAiCount(c => c + 1);
    setContent('results');
    // auto-log to history
    const activeTags =
      filters.tab === 'Hotels' ? (filters.hotelTags?.length ? filters.hotelTags : filters.hotelTag ? [filters.hotelTag] : undefined)
      : filters.tab === 'Food' ? (filters.foodTags?.length  ? filters.foodTags  : filters.foodTag  ? [filters.foodTag]  : undefined)
      : undefined;
    const historyEntry: SavedTrip = {
      id: `h-${Date.now()}`,
      tab: filters.tab,
      destination: filters.destination,
      startDate: filters.startDate,
      endDate: filters.endDate,
      numPeople: filters.numPeople,
      budget: filters.budget,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'history',
      tags: activeTags,
    };
    setSavedTrips(prev => [historyEntry, ...prev.slice(0, 49)]);
  };

  // ── Search handler: gate on auth when in browse mode ───────────────────
  const handleSearch = async (filters: DashboardFilters) => {
    if (user === null) {
      setPendingFilters(filters);
      setBrowseAuthOpen(true);
      return;
    }
    const newSeed = searchSeed + 1;
    setSearchSeed(newSeed);
    await runSearch(filters, newSeed);
  };

  // ── Save trip ───────────────────────────────────────────────────────────
  const handleSave = () => {
    if (isSaved) return;
    const f = lastSearchFilters;
    const trip: SavedTrip = {
      id: Date.now().toString(),
      tab: f?.tab ?? activeTab,
      destination: f?.destination ?? searchLocation,
      startDate: f?.startDate ?? new Date().toLocaleDateString(),
      endDate: f?.endDate,
      numPeople: f?.numPeople ?? 2,
      budget: f?.budget ?? 15000,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'saved',
    };
    setSavedTrips(prev => [trip, ...prev]);
    setIsSaved(true);
  };

  const handleDeleteTrip = (id: string) =>
    setSavedTrips(prev => prev.filter(t => t.id !== id));

  const handleViewTrip = (trip: SavedTrip) => {
    setActiveTab(trip.tab);
    setSearchLocation('Thanjavur');
    setMainSection('home');
    setContent('results');
  };

  // ── Cancel a tag from results → re-search with remaining tags ──────────
  const handleCancelTag = async (tag: string) => {
    if (!lastSearchFilters) return;
    const remainingTags     = (lastSearchFilters.hotelTags ?? []).filter(t => t !== tag);
    const remainingFoodTags = (lastSearchFilters.foodTags  ?? []).filter(t => t !== tag);
    const remainingFood     = lastSearchFilters.foodTag === tag ? '' : lastSearchFilters.foodTag;
    const hasFood = remainingFoodTags.length > 0 || !!remainingFood;
    if (remainingTags.length === 0 && !hasFood) {
      // No tags left — go back to dashboard
      setInitialTab(activeTab);
      setContent('dashboard');
      return;
    }
    const newFilters: DashboardFilters = {
      ...lastSearchFilters,
      hotelTags: remainingTags,
      hotelTag:  remainingTags[0] ?? '',
      foodTags:  remainingFoodTags,
      foodTag:   remainingFood,
    };
    const newSeed = searchSeed + 1;
    setSearchSeed(newSeed);
    await runSearch(newFilters, newSeed);
  };

  // ── Drill-down: Itinerary stop → Explore ───────────────────────────────
  const handleExploreStop = async (target: string) => {
    setBackContext('itinerary-results');
    const filters: DashboardFilters = {
      tab: 'Explore', destination: searchLocation,
      startDate: '', endDate: '', numPeople: 2, budget: 0,
      hotelTag: '', hotelTags: [], hotelArea: '', priceFilter: 'Any', minRating: 'Any', openNow: false,
      foodTag: '', foodTags: [], dietType: 'Any', dineMode: 'Any', mealTime: 'Any',
      itinDate: '', startPoint: '', startTime: '',
      exploreTarget: target, visitTime: 'Morning', searchQuery: '',
    };
    await runSearch(filters, searchSeed);
  };

  // ── Bento card handler — instant preset for Itinerary/Explore, live API for Hotels/Food ──
  const handleBentoAction = async (tab: Tab, overrides: { hotelTag?: string; foodTag?: string; dietType?: string; startTime?: string; exploreTarget?: string; usePreset?: boolean; searchQuery?: string }) => {
    if (user === null) { setBrowseAuthOpen(true); return; }
    const seed = searchSeed + 1;
    setActiveTab(tab);
    setSearchSeed(seed);
    setLastSearchFilters({
      tab, destination: searchLocation,
      startDate: '', endDate: '', numPeople: 2, budget: 0,
      hotelTag: overrides.hotelTag ?? '', hotelTags: overrides.hotelTag ? [overrides.hotelTag] : [],
      hotelArea: '', priceFilter: 'Any', minRating: 'Any', openNow: false,
      foodTag: overrides.foodTag ?? '', foodTags: overrides.foodTag ? [overrides.foodTag] : [],
      dietType: (overrides.dietType ?? 'Any') as 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg', dineMode: 'Any', mealTime: 'Any',
      itinDate: '', startPoint: '', startTime: overrides.startTime ?? 'Morning',
      exploreTarget: overrides.exploreTarget ?? 'Brihadeeswarar Temple',
      visitTime: 'Morning', searchQuery: overrides.searchQuery ?? '',
    });
    setLiveResults(null);
    setLiveItinerary(null);
    setApiError(false);
    setIsSaved(false);

    if (tab === 'Explore') {
      setContent('results');
      return;
    }

    if (tab === 'Itinerary') {
      const ts = overrides.startTime ?? 'Morning';
      const times: Record<string, string[]> = { Morning: ['7:00 AM','9:15 AM','10:45 AM','11:45 AM','12:30 PM'], Afternoon: ['2:00 PM','3:15 PM','4:30 PM'], Evening: ['5:00 PM','7:00 PM'] };
      const depts: Record<string, Array<string|undefined>> = { Morning: ['9:00 AM','10:45 AM','11:30 AM','12:15 PM',undefined], Afternoon: ['3:00 PM','4:15 PM',undefined], Evening: ['6:30 PM',undefined] };
      const preset = SLOT_MOCK[ts] ?? MOCK_ITINERARY;
      setItinStopCount(preset.length);
      setLiveItinerary(preset.map((s, i) => ({ ...s, time: times[ts]?.[i] ?? s.time, departBy: depts[ts]?.[i] })));
      setContent('results');
      return;
    }

    setContent('loading');
    try {
      const { results } = await fetchPlan(tab, seed, {
        city: searchLocation || 'Thanjavur',
        hotelTag:    overrides.hotelTag,
        hotelTags:   overrides.hotelTag ? [overrides.hotelTag] : undefined,
        foodTag:     overrides.foodTag,
        foodTags:    overrides.foodTag  ? [overrides.foodTag]  : undefined,
        dietType:    overrides.dietType,
        searchQuery: overrides.searchQuery || undefined,
      });
      if (results && results.length > 0) {
        setLiveResults(results);
      } else {
        const sq = overrides.searchQuery?.toLowerCase();
        const fallback = tab === 'Hotels'
          ? (sq ? MOCK_HOTELS.filter(h => h.name.toLowerCase().includes(sq)) : MOCK_HOTELS)
          : (sq ? MOCK_FOOD.filter(f => f.name.toLowerCase().includes(sq))   : MOCK_FOOD);
        setLiveResults((fallback.length ? fallback : (tab === 'Hotels' ? MOCK_HOTELS : MOCK_FOOD)).slice(0, 10) as unknown as PlanResult[]);
        setApiError(true);
      }
    } catch {
      const sq = overrides.searchQuery?.toLowerCase();
      const fallback = tab === 'Hotels'
        ? (sq ? MOCK_HOTELS.filter(h => h.name.toLowerCase().includes(sq)) : MOCK_HOTELS)
        : (sq ? MOCK_FOOD.filter(f => f.name.toLowerCase().includes(sq))   : MOCK_FOOD);
      setLiveResults((fallback.length ? fallback : (tab === 'Hotels' ? MOCK_HOTELS : MOCK_FOOD)).slice(0, 10) as unknown as PlanResult[]);
      setApiError(true);
    }
    setContent('results');
  };

  const handleDestinationSelect = (dest: string) => {
    if (dest && !isThanjavurCity(dest)) {
      setNonThanjavurNotice(dest);
    } else {
      setSearchLocation(dest);
      setContent('dashboard');
    }
  };

  // Landing page hero: non-Thanjavur city → navigate to dashboard + show notice
  const handleNonThanjavurCity = (city: string) => {
    setSearchLocation('Thanjavur');
    setInitialTab('Hotels');
    setActiveTab('Hotels');
    setContent('dashboard');
    setAppScreen(user !== null ? 'app' : 'browse');
    setNonThanjavurNotice(city);
  };

  const recentSearches = savedTrips
    .filter(t => t.type === 'history')
    .slice(0, 3)
    .map(t => ({ destination: t.destination, tab: t.tab, tag: t.tags?.[0] }));

  // ── Render helpers ───────────────────────────────────────────────────────
  const LOADING_LABELS: Record<string, string> = {
    Hotels:    'Ranking hotels in Thanjavur by your preferences…',
    Food:      'Filtering what\'s actually worth eating in Thanjavur…',
    Itinerary: 'Building your AI-sequenced day plan for Thanjavur…',
    Explore:   'Building your personalised visit guide…',
  };

  const renderLoading = () => (
    <div className="w-full px-4 sm:px-5 py-4 space-y-4">
      <p className="text-sm font-semibold text-brand animate-pulse text-center py-2">
        {LOADING_LABELS[activeTab] ?? 'AI is on it…'}
      </p>
      {activeTab === 'Itinerary' ? (
        ITIN_SKELETONS.map(i => <ItineraryItemSkeleton key={i} />)
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {PLACE_SKELETONS.map(i => <PlaceCardSkeleton key={i} />)}
        </div>
      )}
    </div>
  );

  // Merge live itinerary type with ItineraryStop for ResultsView compatibility
  const itineraryToDisplay = liveItinerary ?? MOCK_ITINERARY.slice(0, itinStopCount);

  const renderContent = () => {
    if (mainSection === 'history') {
      return (
        <SavedTrips
          trips={savedTrips}
          onDelete={handleDeleteTrip}
          onView={handleViewTrip}
        />
      );
    }
    if (mainSection === 'profile') {
      return (
        <Profile
          user={user!}
          tripCount={savedTrips.length}
          aiCount={aiCount}
          onLogout={handleLogout}
          onSavedPlaces={() => setMainSection('history')}
        />
      );
    }

    return (
      <AnimatePresence mode="wait">
        {contentScreen === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <Dashboard
              destination={searchLocation}
              initialTab={initialTab}
              onSearch={handleSearch}
              onBentoAction={handleBentoAction}
              loading={false}
              recentSearches={recentSearches}
              onDestinationSelect={handleDestinationSelect}
              userName={user?.name ?? ''}
            />
          </motion.div>
        )}

        {contentScreen === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {renderLoading()}
          </motion.div>
        )}

        {contentScreen === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <ResultsView
              tab={activeTab}
              searchArea={searchArea}
              hotels={activeTab === 'Hotels' ? (liveResults as PlaceResult[] ?? []) : []}
              food={activeTab === 'Food'    ? (liveResults as PlaceResult[] ?? []) : []}
              itinerary={activeTab === 'Itinerary' ? itineraryToDisplay : MOCK_ITINERARY}
              explore={EXPLORE_PRESETS[lastSearchFilters?.exploreTarget ?? ''] ?? MOCK_EXPLORE}
              visitTime={lastSearchFilters?.visitTime ?? 'Morning'}
              apiError={apiError && activeTab !== 'Explore'}
              selectedTags={
                activeTab === 'Hotels' ? (
                  (lastSearchFilters?.hotelTags?.length ?? 0) > 0 ? lastSearchFilters!.hotelTags :
                  lastSearchFilters?.hotelTag ? [lastSearchFilters.hotelTag] : []
                ) :
                activeTab === 'Food' ? (
                  (lastSearchFilters?.foodTags?.length ?? 0) > 0 ? lastSearchFilters!.foodTags! :
                  lastSearchFilters?.foodTag ? [lastSearchFilters.foodTag] : []
                ) : []
              }
              onBack={() => {
                if (backContext === 'itinerary-results') {
                  setBackContext('dashboard');
                  setActiveTab('Itinerary');
                  setInitialTab('Itinerary');
                  setContent('results');
                } else {
                  setInitialTab(activeTab);
                  setContent('dashboard');
                }
              }}
              backLabel={backContext === 'itinerary-results' ? 'Itinerary' : undefined}
              onCancelTag={handleCancelTag}
              onExploreStop={handleExploreStop}
              onRegenerate={() => {
                const newSeed = searchSeed + 1;
                setSearchSeed(newSeed);
                setLiveItinerary(null);
                setContent('loading');
                runSearch(
                  lastSearchFilters ?? {
                    tab: activeTab, destination: searchLocation,
                    startDate: '', endDate: '', numPeople: 2, budget: 0,
                    hotelTag: '', hotelTags: [], hotelArea: '', priceFilter: 'Any', minRating: 'Any', openNow: false,
                    foodTag: '', foodTags: [], dietType: 'Any', dineMode: 'Any', mealTime: 'Any',
                    itinDate: '', startPoint: '', startTime: 'Morning',
                    exploreTarget: 'Brihadeeswarar Temple', visitTime: 'Morning', searchQuery: '',
                  },
                  newSeed,
                );
              }}
              onSave={handleSave}
              saved={isSaved}
              onSwitchTab={tab => { setInitialTab(tab); setActiveTab(tab); setApiError(false); setContent('dashboard'); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // ── Screen routing ──────────────────────────────────────────────────────

  if (appScreen === 'landing') {
    return (
      <LandingPage
        onTabSelect={handleTabSelect}
        isLoggedIn={user !== null}
        onAuthSuccess={handleAuthSuccess}
        onNonThanjavurCity={handleNonThanjavurCity}
      />
    );
  }

  // Browse mode: user came from a category click without signing in
  if (appScreen === 'browse') {
    return (
      <div className="min-h-dvh overflow-x-clip" style={APP_BG_STYLE}>
        {/* Browse header with universal location bar */}
        <header className="sticky top-0 z-[200] border-b" style={{ background: 'rgba(249,250,251,0.88)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(28,100,242,0.06)' }}>
          <div className="w-full max-w-[920px] mx-auto px-4 h-14 grid items-center gap-3" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
            {/* Logo */}
            <button
              onClick={() => setAppScreen('landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
            >
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-black text-lg text-heading tracking-tight hidden sm:block">
                Trip<span className="text-brand">AI</span>
              </span>
            </button>

            {/* City search bar — centered column */}
            <div className="relative w-full max-w-sm mx-auto">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
              <input
                type="text"
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
                placeholder="Search city…"
                className="w-full pl-8 pr-8 py-2 border border-border rounded-lg text-base bg-bg-app focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const v = searchLocation.trim();
                    if (v && !isThanjavurCity(v)) { setNonThanjavurNotice(v); }
                  }
                }}
              />
              {searchLocation && (
                /* p-2 = 8px padding → effective hit area ~30px, still small but better — C-03 */
                <button
                  type="button"
                  onClick={() => setSearchLocation('')}
                  aria-label="Clear city"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-heading rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="shrink-0">
              <Button size="sm" onClick={() => setBrowseAuthOpen(true)}>
                Sign in to search
              </Button>
            </div>
          </div>
        </header>

        <main id="main-content" className="pt-2">
          <Dashboard
            destination={searchLocation}
            initialTab={initialTab}
            onSearch={handleSearch}
            onBentoAction={handleBentoAction}
            loading={false}
            onDestinationSelect={handleDestinationSelect}
          />
        </main>

        {/* Auth modal triggered at search time */}
        <Modal
          open={browseAuthOpen}
          onClose={() => { setBrowseAuthOpen(false); setPendingFilters(null); }}
          title="Sign in to get your AI plan"
        >
          <AuthForm asModal onSuccess={handleBrowseAuthSuccess} />
        </Modal>

        {/* Non-Thanjavur city notice */}
        <CityNoticeModal city={nonThanjavurNotice} onDismiss={dismissCityNotice} />
      </div>
    );
  }

  // Authenticated app
  return (
    <div className="min-h-dvh overflow-x-clip" style={APP_BG_STYLE}>
      <Navbar
        section={mainSection}
        onSectionChange={s => { setMainSection(s); if (s === 'home') setContent('dashboard'); }}
        onLogout={handleLogout}
        userName={user?.name ?? ''}
        searchLocation={searchLocation}
        onSearchChange={v => {
          if (v && !isThanjavurCity(v)) { setNonThanjavurNotice(v); }
          else { setSearchLocation('Thanjavur'); setSearchArea(''); }
        }}
        onLocationPick={(display, area) => {
          if (display && !isThanjavurCity(display)) { setNonThanjavurNotice(display); }
          else { setSearchLocation('Thanjavur'); setSearchArea(area); }
        }}
        showBack={contentScreen === 'results'}
        onBack={() => {
          if (backContext === 'itinerary-results') {
            setBackContext('dashboard');
            setActiveTab('Itinerary');
            setInitialTab('Itinerary');
            setContent('results');
          } else {
            setInitialTab(activeTab);
            setContent('dashboard');
          }
        }}
        backLabel="Back"
      />

      {/* Screen-reader live region — announces when AI results are ready (M-05) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {contentScreen === 'results' && `Results ready for ${activeTab} in ${searchLocation}`}
        {contentScreen === 'loading' && 'AI is building your plan, please wait'}
      </div>

      <main id="main-content" className="pt-2">
        {renderContent()}
      </main>

      {/* Non-Thanjavur city notice */}
      <CityNoticeModal city={nonThanjavurNotice} onDismiss={dismissCityNotice} />

      {/* Logout confirmation */}
      <Modal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        title="Sign out?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLogoutConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmLogout}>Sign out</Button>
          </>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          You'll be taken back to the home screen. Your saved trips are stored locally and will still be here when you sign back in.
        </p>
      </Modal>
    </div>
  );
}
