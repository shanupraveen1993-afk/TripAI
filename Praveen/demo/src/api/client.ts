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
  reviewSummary: string;
  aiNote:       string;
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
  hotelTags?:   string[];
  hotelArea?:   string;
  priceFilter?: string;   // 'Any' | '₹' | '₹₹' | '₹₹₹'
  minRating?:   number;   // 0 = any
  openNow?:     boolean;
  dietType?:    string;   // 'Any' | 'Veg' | 'Non-Veg'
  dineMode?:    string;   // 'Any' | 'Dine-in' | 'Takeout'
}

export async function fetchPlan(tab: string, seed = 0, filters: PlanFilters = {}): Promise<PlanResult[]> {
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab, searchSeed: seed, ...filters }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as { results: PlanResult[] };
  return data.results ?? [];
}

export async function fetchItinerary(startTime = '09:00', seed = 0): Promise<LiveItineraryStop[]> {
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab: 'Itinerary', startTime, searchSeed: seed }),
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
