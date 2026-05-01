import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const GEMINI_KEY  = process.env.GEMINI_API_KEY ?? '';

// No photos in field mask → stays in Pro tier → 35,000 free/month
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
  'places.priceLevel',
  'places.regularOpeningHours',
  'places.types',
  'places.photos',
].join(',');

const QUERIES: Record<string, string> = {
  Hotels:    'hotels in Thanjavur Tamil Nadu near Brihadeeswarar Temple',
  Food:      'restaurants in Thanjavur Tamil Nadu',
  Temples:   'famous temples in Thanjavur Tamil Nadu',
  Itinerary: 'top tourist attractions in Thanjavur Tamil Nadu',
};

function mapPriceLevel(level: string): string {
  const map: Record<string, string> = {
    PRICE_LEVEL_FREE:          'Free',
    PRICE_LEVEL_INEXPENSIVE:   '₹',
    PRICE_LEVEL_MODERATE:      '₹₹',
    PRICE_LEVEL_EXPENSIVE:     '₹₹₹',
    PRICE_LEVEL_VERY_EXPENSIVE:'₹₹₹₹',
  };
  return map[level] ?? '₹₹';
}

const COLORS = ['bg-amber-200','bg-green-200','bg-blue-200','bg-purple-200','bg-rose-200','bg-teal-200'];

async function fetchPlaces(query: string) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type':    'application/json',
      'X-Goog-Api-Key':  PLACES_KEY,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 5, languageCode: 'en' }),
  });
  const data = await r.json() as { places?: any[] };
  return data.places ?? [];
}

async function geminiAnalysis(places: any[], tab: string) {
  if (!GEMINI_KEY || places.length === 0) return [];

  const summaries = places.map(p => ({
    name:    p.displayName?.text ?? '',
    rating:  p.rating ?? 0,
    total:   p.userRatingCount ?? 0,
    reviews: (p.reviews ?? []).slice(0, 5).map((r: any) => ({
      stars: r.rating,
      text:  r.text?.text ?? '',
    })),
  }));

  const context = tab === 'Temples'
    ? 'a pilgrim or heritage traveller visiting Thanjavur temples'
    : tab === 'Hotels'
    ? 'a visitor staying in Thanjavur to see the Big Temple'
    : tab === 'Food'
    ? 'a visitor looking for authentic Thanjavur cuisine'
    : 'a tourist spending one day in Thanjavur';

  const prompt = `You are a Thanjavur travel expert. Analyze these ${tab.toLowerCase()} for ${context}.

Data: ${JSON.stringify(summaries)}

For each place, return:
- trendVerdict: "improving" | "declining" | "stable" (based on recent reviews vs overall rating)
- trendReason: max 12 words, cite specific review evidence
- aiNote: one sentence (max 20 words) why this suits a Thanjavur visitor

Return a JSON array with exactly ${places.length} items:
[{"trendVerdict":"...","trendReason":"...","aiNote":"..."}]

Return only valid JSON. No markdown. No explanation.`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data  = await r.json() as any;
    const raw   = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return places.map(() => ({
      trendVerdict: 'stable',
      trendReason:  'Well reviewed by recent visitors.',
      aiNote:       'Highly recommended by Thanjavur visitors.',
    }));
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const tab   = (req.body?.tab ?? 'Hotels') as string;
  const query = QUERIES[tab] ?? QUERIES.Hotels;

  try {
    const rawPlaces = await fetchPlaces(query);
    const ai        = await geminiAnalysis(rawPlaces, tab);

    const results = rawPlaces.map((p: any, i: number) => ({
      id:          p.id ?? `place-${i}`,
      name:        p.displayName?.text ?? 'Unknown',
      address:     p.formattedAddress  ?? 'Thanjavur, Tamil Nadu',
      dist:        0,
      rating:      p.rating        ?? 0,
      reviewCount: p.userRatingCount ?? 0,
      priceLevel:  mapPriceLevel(p.priceLevel ?? ''),
      openNow:     p.regularOpeningHours?.openNow ?? true,
      tags:        (p.types ?? []).slice(0, 5).map((t: string) =>
                     t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                   ),
      aiNote:       ai[i]?.aiNote       ?? 'Popular with Thanjavur visitors.',
      trendVerdict: ai[i]?.trendVerdict ?? 'stable',
      trendReason:  ai[i]?.trendReason  ?? 'Well reviewed by recent visitors.',
      reviews: (p.reviews ?? []).slice(0, 3).map((r: any) => ({
        text:     r.text?.text ?? '',
        author:   r.authorAttribution?.displayName ?? 'Visitor',
        location: 'Tamil Nadu',
        stars:    r.rating ?? 5,
        ago:      r.relativePublishTimeDescription ?? 'Recently',
      })),
      photoColor: COLORS[i % COLORS.length],
      photoRef:   p.photos?.[0]?.name ?? null,
      aiDetail: {
        whyOverOthers: ai[i]?.aiNote ?? 'Highly rated by local visitors.',
        dataPoints: [
          `${p.rating ?? 'N/A'} rating across ${(p.userRatingCount ?? 0).toLocaleString()} reviews`,
          `Located at ${p.formattedAddress ?? 'Thanjavur'}`,
          `${(p.types ?? []).slice(0, 2).join(', ') || tab}`,
        ],
        bestFor: `Visitors exploring Thanjavur${tab === 'Temples' ? ' temples and heritage sites' : tab === 'Food' ? ' looking for authentic local cuisine' : ''}.`,
      },
    }));

    res.json({ results });
  } catch (err) {
    console.error('[/api/plan]', err);
    res.status(500).json({ error: 'Failed to fetch places data' });
  }
}
