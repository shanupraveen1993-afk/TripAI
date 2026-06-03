export interface PlanResult {
  id:           string;
  name:         string;
  address:      string;
  lat:          number | null;
  lng:          number | null;
  dist:         number;
  rating:       number;
  reviewCount:  number;
  priceLevel:   '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free';
  priceRange?:  string;
  openNow:      boolean;
  tags:         string[];
  reviewSummary:      string;
  aiNote:             string;
  filterVerification: string | null;
  matchedKeyword:     string | null;
  trendVerdict: 'improving' | 'declining' | 'stable';
  trendReason:  string;
  reviews:      Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  photoColor:   string;
  photoRef:     string | null;
  websiteUri:   string | null;
  googleMapsUri:string | null;
  whenToVisit?: string;
  mustTry?:     string;
  aiDetail: {
    whyOverOthers: string;
    dataPoints:    string[];
    bestFor:       string;
    caveat?:       string;
    insiderTip?:   string;
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
  cautionNote?:     string;
  avoidNote?:       string;
  reviews?:         Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  imgId?:           string;
  photoRef?:        string | null;
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
  bestTime?:    string | null;
  avoidNote?:   string | null;
  tags:         string[];
  reviews:      Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  photoColor:   string;
  photoRef?:    string | null;
  timeSlot:     string;
}

interface PlanFilters {
  city?:        string;   // city name — used in Places API queries + locationBias
  hotelTag?:    string;   // legacy single tag — kept for quick-override paths
  hotelTags?:   string[]; // multi-select hotel tags (max 3) — overrides hotelTag when set
  hotelArea?:   string;   // free-text area within city
  foodTag?:     string;   // single cuisine/type tag (legacy)
  foodTags?:    string[]; // multi-select food tags (max 3) — overrides foodTag when set
  priceFilter?: string;   // 'Any' | PRICE_LEVEL_* enum
  minRating?:   number;   // 0 = any
  openNow?:     boolean;
  dietType?:    string;   // 'Any' | 'Veg' | 'Non-Veg' | 'Pure Veg'
  dineMode?:    string;   // 'Any' | 'Dine-in' | 'Takeout'
  mealTime?:    string;   // 'Any' | 'Breakfast' | 'Lunch' | 'Dinner'
  searchQuery?: string;   // free-text override — bypasses tag-based query building
}

export interface PlanResponse {
  results: PlanResult[];   // AI-selected best 5–10, ranked by Gemini
}

const API_TIMEOUT_MS = 25_000;
const TAGS_TTL = 3_600_000;  // 1 hour
const PLAN_TTL = 1_800_000;  // 30 min

function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), API_TIMEOUT_MS);
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(tid));
}

function ssGet<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: T; ts: number };
    if (Date.now() - ts > PLAN_TTL) return null;
    return data;
  } catch { return null; }
}

function ssSet(key: string, data: unknown): void {
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

function ssGetTags<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: T; ts: number };
    if (Date.now() - ts > TAGS_TTL) return null;
    return data;
  } catch { return null; }
}

export async function fetchPlan(tab: string, seed = 0, filters: PlanFilters = {}, city = 'Thanjavur'): Promise<PlanResponse> {
  const cacheKey = `plan:${tab}:${filters.city ?? city}:${seed}:${JSON.stringify(filters)}`;
  const cached = ssGet<PlanResponse>(cacheKey);
  if (cached) return cached;

  const r = await fetchWithTimeout('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab, searchSeed: seed, city: filters.city ?? city, ...filters }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as PlanResponse;
  const result: PlanResponse = { results: data.results ?? [] };
  ssSet(cacheKey, result);
  return result;
}

export async function fetchItinerary(
  timeSlot = 'Morning',
  seed = 0,
  city = 'Thanjavur',
  itinDate?: string,
  startPoint?: string,
): Promise<LiveItineraryStop[]> {
  const timeMap: Record<string, string> = { Morning: '07:00', Afternoon: '14:00', Evening: '17:00' };
  const stopMap: Record<string, number> = { Morning: 10, Afternoon: 4, Evening: 2 };
  const startTime = timeMap[timeSlot] ?? '07:00';
  const stopCount = stopMap[timeSlot] ?? 5;
  const r = await fetchWithTimeout('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab: 'Itinerary', startTime, stopCount, searchSeed: seed, city, itinDate, startPoint }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as { itinerary: LiveItineraryStop[] };
  return data.itinerary ?? [];
}


export interface CityTagsResult {
  tags:      string[];
  segments?: Record<string, string[]>;  // segment name → ordered tag list
  groupA?:   string[];                  // location-anchor tags (drive targeted API call)
}

export async function fetchCityTags(
  city: string,
  tab: 'Hotels' | 'Food',
): Promise<CityTagsResult> {
  const cacheKey = `tags:${city}:${tab}`;
  const cached = ssGetTags<CityTagsResult>(cacheKey);
  if (cached) return cached;

  try {
    const r = await fetch('/api/tags', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ city, tab }),
    });
    if (!r.ok) return { tags: [] };
    const data = await r.json() as {
      tags:      Array<{ tag: string; count: number }>;
      segments?: Record<string, string[]>;
      groupA?:   string[];
    };
    const result: CityTagsResult = {
      tags:      (data.tags ?? []).map(t => t.tag),
      segments:  data.segments,
      groupA:    data.groupA,
    };
    ssSet(cacheKey, result);
    return result;
  } catch {
    return { tags: [] };
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

const _photoCache: Map<string, string> = new Map();
const _photoPending: Map<string, Promise<string | null>> = new Map();

export function fetchPhoto(photoRef: string): Promise<string | null> {
  const hit = _photoCache.get(photoRef);
  if (hit) return Promise.resolve(hit);
  const inflight = _photoPending.get(photoRef);
  if (inflight) return inflight;

  const p = fetch(`/api/photo?name=${encodeURIComponent(photoRef)}`)
    .then(r => r.ok ? r.json() as Promise<{ photoUri?: string }> : null)
    .then(data => {
      const uri = data?.photoUri ?? null;
      _photoPending.delete(photoRef);
      if (uri) _photoCache.set(photoRef, uri);
      return uri;
    })
    .catch(() => { _photoPending.delete(photoRef); return null; });

  _photoPending.set(photoRef, p);
  return p;
}
