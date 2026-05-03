export interface PlanResult {
  id:           string;
  name:         string;
  address:      string;
  dist:         number;
  rating:       number;
  reviewCount:  number;
  priceLevel:   '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free';
  openNow:      boolean;
  tags:         string[];
  reviewSummary:      string;
  aiNote:             string;
  filterVerification: string | null;
  trendVerdict: 'improving' | 'declining' | 'stable';
  trendReason:  string;
  reviews:      Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  photoColor:   string;
  photoRef:     string | null;
  websiteUri:   string | null;
  googleMapsUri:string | null;
  aiDetail: {
    whyOverOthers: string;
    dataPoints:    string[];
    bestFor:       string;
    caveat?:       string;
  };
}

export interface LiveItineraryStop {
  stop:             string;
  time:             string;
  duration?:        string;
  tip:              string;
  trafficNote:      string;
  currentTraffic:   'Light' | 'Moderate' | 'Heavy';
  yesterdayTraffic: 'Light' | 'Moderate' | 'Heavy';
  crowdLevel?:      'Low' | 'Moderate' | 'High';
  travelToNext?:    string;
  departBy?:        string;
  entryFee?:        string | null;
  highlights?:      string[];
  reachNote?:       string;
  imgId?:           string;
}

export interface ExploreGuide {
  id:           string;
  name:         string;
  address:      string;
  rating:       number;
  openNow:      boolean;
  openingHours: string;
  status:       'Open' | 'Busy' | 'Closed';
  insight:      string;
  flow:         string;
  preparation:  string;
  tags:         string[];
  reviews:      Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  photoColor:   string;
  timeSlot:     string;
}

interface PlanFilters {
  city?:        string;   // city name — used in Places API queries + locationBias
  hotelTag?:    string;   // single hotel tag (Heritage, Business, etc.)
  hotelArea?:   string;   // free-text area within city
  persona?:     string;   // 'Solo' | 'Couple' | 'Family' | 'Business' | ''
  foodTag?:     string;   // single cuisine/type tag
  priceFilter?: string;   // 'Any' | PRICE_LEVEL_* enum
  minRating?:   number;   // 0 = any
  openNow?:     boolean;
  dietType?:    string;   // 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg'
  dineMode?:    string;   // 'Any' | 'Dine-in' | 'Takeout'
  mealTime?:    string;   // 'Any' | 'Breakfast' | 'Lunch' | 'Dinner'
}

export interface PlanResponse {
  results: PlanResult[];   // AI-selected best 5–10, ranked by Gemini
}

export async function fetchPlan(tab: string, seed = 0, filters: PlanFilters = {}, city = 'Thanjavur'): Promise<PlanResponse> {
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab, searchSeed: seed, city: filters.city ?? city, ...filters }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as PlanResponse;
  return { results: data.results ?? [] };
}

export async function fetchItinerary(timeSlot = 'Morning', seed = 0): Promise<LiveItineraryStop[]> {
  const timeMap: Record<string, string> = { Morning: '07:00', Afternoon: '12:00', Evening: '16:00' };
  const stopMap: Record<string, number> = { Morning: 5, Afternoon: 3, Evening: 2 };
  const startTime = timeMap[timeSlot] ?? '07:00';
  const stopCount = stopMap[timeSlot] ?? 5;
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab: 'Itinerary', startTime, stopCount, searchSeed: seed }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as { itinerary: LiveItineraryStop[] };
  return data.itinerary ?? [];
}

export async function fetchExploreGuide(exploreTarget: string, timeSlot = 'Morning'): Promise<ExploreGuide | null> {
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab: 'Explore', exploreTarget, timeSlot }),
  });
  if (!r.ok) return null;
  const data = await r.json() as { exploreResult?: ExploreGuide };
  return data.exploreResult ?? null;
}

export async function fetchCityTags(
  city: string,
  tab: 'Hotels' | 'Food',
): Promise<string[]> {
  try {
    const r = await fetch('/api/tags', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ city, tab }),
    });
    if (!r.ok) return [];
    const data = await r.json() as { tags: Array<{ tag: string; count: number }> };
    return (data.tags ?? []).map(t => t.tag);
  } catch {
    return [];
  }
}

export interface AutocompleteSuggestion {
  main:      string;
  secondary: string;
  full:      string;
}

export async function fetchAutocomplete(input: string, city: string): Promise<AutocompleteSuggestion[]> {
  if (!input || input.trim().length < 2) return [];
  try {
    const r = await fetch('/api/autocomplete', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ input: input.trim(), city }),
    });
    if (!r.ok) return [];
    const data = await r.json() as { suggestions: AutocompleteSuggestion[] };
    return data.suggestions ?? [];
  } catch {
    return [];
  }
}

export async function fetchPhoto(photoRef: string): Promise<string | null> {
  try {
    const r = await fetch(`/api/photo?name=${encodeURIComponent(photoRef)}`);
    if (!r.ok) return null;
    const data = await r.json() as { photoUri?: string };
    return data.photoUri ?? null;
  } catch {
    return null;
  }
}
