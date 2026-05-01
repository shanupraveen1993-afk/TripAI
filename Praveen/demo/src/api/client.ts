export interface PlanResult {
  id:          string;
  name:        string;
  address:     string;
  dist:        number;
  rating:      number;
  reviewCount: number;
  priceLevel:  '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹' | 'Free';
  openNow:     boolean;
  tags:        string[];
  aiNote:      string;
  trendVerdict:'improving' | 'declining' | 'stable';
  trendReason: string;
  reviews:     Array<{ text: string; author: string; location: string; stars: number; ago: string }>;
  photoColor:  string;
  photoRef:    string | null;
  aiDetail: {
    whyOverOthers: string;
    dataPoints:    string[];
    bestFor:       string;
    caveat?:       string;
  };
}

export async function fetchPlan(tab: string): Promise<PlanResult[]> {
  const r = await fetch('/api/plan', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tab }),
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const data = await r.json() as { results: PlanResult[] };
  return data.results ?? [];
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
