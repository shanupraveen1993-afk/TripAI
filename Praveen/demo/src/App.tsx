import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, MapPin, Search, X } from 'lucide-react';
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
  MOCK_HOTELS, MOCK_FOOD, MOCK_ITINERARY, MOCK_EXPLORE,
  PlaceResult,
} from './mock/data';
import {
  fetchPlan, fetchItinerary, fetchExploreGuide,
  PlanResult, ExploreGuide, LiveItineraryStop,
} from './api/client';

type AppScreen = 'landing' | 'browse' | 'app';
type ContentScreen = 'dashboard' | 'loading' | 'results';

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
  const [liveExplore, setLiveExplore]       = useState<ExploreGuide | null>(null);
  const [liveItinerary, setLiveItinerary]   = useState<LiveItineraryStop[] | null>(null);
  const [apiError, setApiError]             = useState(false);
  const [searchSeed, setSearchSeed]         = useState(0);
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
  const handleAuthSuccess = (u: User, dest?: string) => {
    setUser(u);
    if (dest) setSearchLocation(dest);
    setInitialTab('Hotels');
    setActiveTab('Hotels');
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

  const handleLogout = () => {
    try { localStorage.removeItem('tripai_user'); } catch {}
    setUser(null);
    setAppScreen('landing');
    setMainSection('home');
    setContent('dashboard');
    setInitialTab(undefined);
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
    setActiveTab(filters.tab);
    setSearchLocation('Thanjavur');
    setLastSearchFilters(filters);
    setContent('loading');
    setIsSaved(false);
    setLiveResults(null);
    setLiveExplore(null);
    setLiveItinerary(null);
    setApiError(false);
    try {
      if (filters.tab === 'Explore') {
        const guide = await fetchExploreGuide(filters.exploreTarget, filters.visitTime);
        if (guide) setLiveExplore(guide);
        else setApiError(true);
      } else if (filters.tab === 'Itinerary') {
        const stops = await fetchItinerary(filters.startTime, seed);
        if (stops.length > 0) { setLiveItinerary(stops); setItineraryGenCount(c => c + 1); }
        else setApiError(true);
      } else {
        const results = await fetchPlan(filters.tab, seed, {
          hotelTags:  filters.hotelTags,
          hotelArea:  filters.hotelArea,
          budget:     filters.budget,
          dietType:   filters.dietType,
          foodBudget: filters.foodBudget,
          diningVibe: filters.diningVibe,
        });
        setLiveResults(results);
      }
    } catch {
      setApiError(true);
    }
    setAiCount(c => c + 1);
    setContent('results');
    // auto-log to history
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
    setSearchLocation(trip.destination);
    setMainSection('home');
    setContent('results');
  };

  // ── Drill-down: Itinerary stop → Explore ───────────────────────────────
  const handleExploreStop = async (target: string) => {
    setBackContext('itinerary-results');
    const filters: DashboardFilters = {
      tab: 'Explore', destination: searchLocation,
      startDate: '', endDate: '', numPeople: 2, budget: 5000,
      hotelTags: [], hotelArea: '', foodLocation: '', foodTags: [],
      foodBudget: 'Medium', dietType: 'Veg', diningVibe: 'Family',
      itinDate: '', startPoint: '', startTime: '09:00',
      exploreTarget: target, visitTime: 'Morning',
    };
    await runSearch(filters, searchSeed);
  };

  const handleDestinationSelect = (dest: string) => {
    setSearchLocation(dest);
  };

  const recentSearches = savedTrips
    .filter(t => t.type === 'history')
    .slice(0, 3)
    .map(t => ({ destination: t.destination, tab: t.tab }));

  // ── Render helpers ───────────────────────────────────────────────────────
  const LOADING_LABELS: Record<string, string> = {
    Hotels:    `Ranking hotels in ${searchLocation} by your preferences…`,
    Food:      `Filtering what's actually worth eating in ${searchLocation}…`,
    Itinerary: `Building your AI-sequenced day plan for ${searchLocation}…`,
    Explore:   `Building your personalised visit guide…`,
  };

  const renderLoading = () => (
    <div className="w-full px-4 sm:px-5 py-4 space-y-4">
      <p className="text-sm font-semibold text-brand animate-pulse text-center py-2">
        {LOADING_LABELS[activeTab] ?? 'AI is on it…'}
      </p>
      {activeTab === 'Itinerary' ? (
        Array.from({ length: 5 }).map((_, i) => <ItineraryItemSkeleton key={i} />)
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <PlaceCardSkeleton key={i} />)}
        </div>
      )}
    </div>
  );

  // Merge live itinerary type with ItineraryStop for ResultsView compatibility
  const itineraryToDisplay = liveItinerary ?? MOCK_ITINERARY;

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
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard
              destination={searchLocation}
              initialTab={initialTab}
              onSearch={handleSearch}
              loading={false}
              recentSearches={recentSearches}
              onDestinationSelect={handleDestinationSelect}
            />
          </motion.div>
        )}

        {contentScreen === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderLoading()}
          </motion.div>
        )}

        {contentScreen === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <ResultsView
              tab={activeTab}
              destination="Thanjavur"
              isFirstItinerary={itineraryGenCount === 1}
              hotels={activeTab === 'Hotels' ? (liveResults as PlaceResult[] ?? MOCK_HOTELS) : MOCK_HOTELS}
              food={activeTab === 'Food'    ? (liveResults as PlaceResult[] ?? MOCK_FOOD)   : MOCK_FOOD}
              itinerary={activeTab === 'Itinerary' ? itineraryToDisplay : MOCK_ITINERARY}
              explore={activeTab === 'Explore' ? (liveExplore as ExploreGuide ?? MOCK_EXPLORE) : MOCK_EXPLORE}
              apiError={apiError && !(activeTab === 'Itinerary' && itineraryGenCount <= 1)}
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
              onExploreStop={handleExploreStop}
              onRegenerate={() => {
                // Compute new seed directly to avoid async state race condition
                const newSeed = searchSeed + 1;
                setSearchSeed(newSeed);
                setLiveResults(null);
                setLiveExplore(null);
                setLiveItinerary(null);
                setContent('loading');
                runSearch(
                  lastSearchFilters ?? {
                    tab: activeTab, destination: 'Thanjavur',
                    startDate: '', endDate: '', numPeople: 2, budget: 5000,
                    hotelTags: [], hotelArea: '', foodLocation: '', foodTags: [],
                    foodBudget: 'Medium', dietType: 'Veg', diningVibe: 'Family',
                    itinDate: '', startPoint: '', startTime: '09:00',
                    exploreTarget: 'Brihadeeswarar Temple', visitTime: 'Morning',
                  },
                  newSeed,
                );
              }}
              onSave={handleSave}
              saved={isSaved}
              onSwitchTab={tab => { setInitialTab(tab); setActiveTab(tab); setContent('dashboard'); }}
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
      />
    );
  }

  // Browse mode: user came from a category click without signing in
  if (appScreen === 'browse') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #EFF6FF 0%, #F9FAFB 45%, #F5F3FF 100%)' }}>
        {/* Browse header with universal location bar */}
        <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(249,250,251,0.88)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(28,100,242,0.06)' }}>
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
                className="w-full pl-8 pr-8 py-2 border border-border rounded-lg text-sm bg-bg-app focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors"
              />
              {searchLocation && (
                <button
                  type="button"
                  onClick={() => setSearchLocation('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
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

        <main className="pt-2">
          <Dashboard
            destination={searchLocation}
            initialTab={initialTab}
            onSearch={handleSearch}
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
      </div>
    );
  }

  // Authenticated app
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #EFF6FF 0%, #F9FAFB 45%, #F5F3FF 100%)' }}>
      <Navbar
        section={mainSection}
        onSectionChange={s => { setMainSection(s); if (s === 'home') setContent('dashboard'); }}
        onLogout={handleLogout}
        userName={user?.name ?? ''}
        searchLocation={searchLocation}
        onSearchChange={setSearchLocation}
      />

      <main className="pt-2">
        {renderContent()}
      </main>
    </div>
  );
}
