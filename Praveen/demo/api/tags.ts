import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

const FIELD_MASK = [
  'places.displayName',
  'places.types',
  'places.reviews',
  'places.formattedAddress',
].join(',');

// Keywords per hotel tag — only tags with a real Places API field, type, or strong query signal
const HOTEL_TAG_KEYWORDS: Record<string, string[]> = {
  'Heritage':             ['heritage', 'historical', 'palace', 'traditional', 'fort', 'vintage', 'colonial'],
  'Business':             ['business', 'corporate', 'conference', 'meeting', 'executive', 'work'],
  'Family':               ['family', 'kids', 'children', 'spacious', 'suite', 'bunk'],
  'Near Temple':          ['temple', 'mandir', 'kovil', 'big temple', 'shiva', 'gopuram'],
  'Near Railway Station': ['railway', 'station', 'junction', 'rail'],
  'Near Bus Stand':       ['bus stand', 'bus stop', 'bus terminal'],
  'City Centre':          ['city centre', 'main road', 'central', 'city center', 'town centre'],
  'Rooftop':              ['rooftop', 'terrace', 'top floor', 'sky'],
  'In-House Restaurant':  ['restaurant', 'dining', 'food court', 'kitchen', 'in-house'],
  'Parking':              ['parking', 'car park', 'valet', 'garage'],
  'Pool':                 ['pool', 'swimming', 'swim'],
  'Spa':                  ['spa', 'wellness', 'massage', 'ayurvedic', 'ayurveda'],
  'Luxury':               ['luxury', 'premium', '5 star', 'five star', 'lavish', 'resort'],
  'River View':           ['river view', 'river facing', 'waterfront', 'riverside'],
  'Mountain View':        ['mountain view', 'hill view', 'valley view'],
  'Sea View':             ['sea view', 'ocean view', 'beach view', 'sea facing'],
};

// Food tags — only tags with a Google Place type or strong query signal
// Pure Veg / Non-Veg excluded — handled by the dedicated Diet filter
const FOOD_TAG_KEYWORDS: Record<string, string[]> = {
  'South Indian':  ['south indian', 'idli', 'dosa', 'sambar', 'vada', 'pongal', 'uttapam', 'idly'],
  'North Indian':  ['north indian', 'roti', 'naan', 'paneer', 'dal', 'sabzi', 'chapati', 'butter chicken'],
  'Biryani':       ['biryani', 'briyani', 'dum biryani', 'biryani rice', 'chicken biryani'],
  'Thali':         ['thali', 'meals', 'full meals', 'banana leaf', 'unlimited meals'],
  'Tiffin':        ['tiffin', 'morning tiffin', 'light meal', 'idli tiffin'],
  'Cafe':          ['café', 'cafe', 'coffee shop', 'coffee house', 'barista'],
  'Street Food':   ['street food', 'chaat', 'stall', 'roadside', 'snacks'],
  'Seafood':       ['seafood', 'fish curry', 'prawn', 'crab', 'lobster'],
  'Sweets':        ['sweets', 'mithai', 'halwa', 'laddu', 'sweet shop', 'mysore pak'],
  'Bakery':        ['bakery', 'bread', 'cake', 'pastry', 'baked'],
  'Chinese':       ['chinese', 'noodles', 'fried rice', 'manchurian', 'hakka'],
  'Fast Food':     ['fast food', 'burger', 'pizza', 'quick bite', 'wrap'],
  'Chaat':         ['chaat', 'pani puri', 'golgappa', 'samosa', 'bhel'],
  'Juice & Shakes':['juice', 'milkshake', 'smoothie', 'fresh juice', 'lassi'],
};

// Fallback tags — reliable, universal across any Indian city
const HOTEL_FALLBACKS = ['Heritage', 'City Centre', 'Parking', 'In-House Restaurant', 'Business', 'Family'];
const FOOD_FALLBACKS  = ['South Indian', 'Biryani', 'Cafe', 'Thali', 'Street Food', 'Sweets'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const city = ((req.body?.city as string) ?? 'Thanjavur').trim();
  const tab  = (req.body?.tab ?? 'Hotels') as 'Hotels' | 'Food';

  const query    = tab === 'Hotels' ? `hotels in ${city}` : `restaurants in ${city}`;
  const keywords = tab === 'Hotels' ? HOTEL_TAG_KEYWORDS : FOOD_TAG_KEYWORDS;
  const fallbacks = tab === 'Hotels' ? HOTEL_FALLBACKS : FOOD_FALLBACKS;

  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method:  'POST',
      headers: {
        'Content-Type':     'application/json',
        'X-Goog-Api-Key':   PLACES_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery:      query,
        maxResultCount: 20,
        languageCode:   'en',
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      console.error('[/api/tags] Places error', r.status, body);
      throw new Error(`Places ${r.status}`);
    }
    const data   = await r.json() as { places?: any[] };
    const places = data.places ?? [];

    // Score each tag: count how many of the 20 places mention its keywords
    const tagScores: Record<string, number> = {};
    for (const [tag, kws] of Object.entries(keywords)) {
      let count = 0;
      for (const p of places) {
        const corpus = [
          (p.displayName?.text ?? '').toLowerCase(),
          (p.formattedAddress  ?? '').toLowerCase(),
          ...(p.reviews ?? []).slice(0, 3).map((rv: any) => (rv.text?.text ?? '').slice(0, 200).toLowerCase()),
          ...(p.types   ?? []).map((t: string) => t.replace(/_/g, ' ').toLowerCase()),
        ].join(' ');
        if (kws.some(k => corpus.includes(k))) count++;
      }
      tagScores[tag] = count;
    }

    // Sort by frequency — tags mentioned by most places come first
    const sorted = Object.entries(tagScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    // Build final tag list: top data-backed tags, then fallbacks to fill gaps
    const result: Array<{ tag: string; count: number }> = [];
    const seen = new Set<string>();

    for (const [tag, count] of sorted) {
      if (count > 0 && !seen.has(tag)) { result.push({ tag, count }); seen.add(tag); }
      if (result.length >= 14) break;
    }
    // Always include fallbacks so there are always usable tags
    for (const fb of fallbacks) {
      if (!seen.has(fb)) { result.push({ tag: fb, count: 0 }); seen.add(fb); }
      if (result.length >= 14) break;
    }

    return res.json({ tags: result, city, total: places.length });
  } catch (err) {
    console.error('[/api/tags]', err);
    return res.status(500).json({ error: 'Failed to fetch tags' });
  }
}
