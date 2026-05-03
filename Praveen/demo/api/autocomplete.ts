import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

// City centre coordinates — same table as plan.ts
const CITY_CONFIG: Record<string, { lat: number; lng: number }> = {
  'Thanjavur':  { lat: 10.787,  lng: 79.1378 },
  'Tanjore':    { lat: 10.787,  lng: 79.1378 },
  'Bangalore':  { lat: 12.9716, lng: 77.5946 },
  'Bengaluru':  { lat: 12.9716, lng: 77.5946 },
  'Chennai':    { lat: 13.0827, lng: 80.2707 },
  'Coimbatore': { lat: 11.0168, lng: 76.9558 },
  'Madurai':    { lat: 9.9252,  lng: 78.1198 },
  'Mysore':     { lat: 12.2958, lng: 76.6394 },
  'Mysuru':     { lat: 12.2958, lng: 76.6394 },
  'Hyderabad':  { lat: 17.3850, lng: 78.4867 },
  'Kochi':      { lat: 9.9312,  lng: 76.2673 },
  'Trivandrum': { lat: 8.5241,  lng: 76.9366 },
  'Pondicherry':{ lat: 11.9416, lng: 79.8083 },
  'Mumbai':     { lat: 19.0760, lng: 72.8777 },
  'Delhi':      { lat: 28.6139, lng: 77.2090 },
  'Jaipur':     { lat: 26.9124, lng: 75.7873 },
  'Goa':        { lat: 15.2993, lng: 74.1240 },
  'Udaipur':    { lat: 24.5854, lng: 73.7125 },
  'Rishikesh':  { lat: 30.0869, lng: 78.2676 },
};

function getCityCenter(city: string): { lat: number; lng: number } {
  const key = city.trim().toLowerCase();
  for (const [name, cfg] of Object.entries(CITY_CONFIG)) {
    if (name.toLowerCase() === key) return cfg;
  }
  return { lat: 10.787, lng: 79.1378 }; // default Thanjavur
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const input = ((req.body?.input as string) ?? '').trim();
  const city  = ((req.body?.city  as string) ?? 'Thanjavur').trim();

  if (!input || input.length < 2) return res.json({ suggestions: [] });

  const center = getCityCenter(city);

  try {
    const r = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'X-Goog-Api-Key': PLACES_KEY,
      },
      body: JSON.stringify({
        input,
        // Hard restriction: only show places within 15km of city centre
        locationRestriction: {
          circle: {
            center: { latitude: center.lat, longitude: center.lng },
            radius: 15000,
          },
        },
        // Prefer address/region types over global POIs
        includedPrimaryTypes: ['geocode', 'street_address', 'sublocality', 'neighborhood', 'route', 'establishment'],
        languageCode: 'en',
        regionCode:   'IN',
      }),
    });

    if (!r.ok) {
      const body = await r.text();
      console.error('[/api/autocomplete] Places error', r.status, body);
      return res.json({ suggestions: [] });
    }

    const data = await r.json() as {
      suggestions?: Array<{
        placePrediction?: {
          text?: { text?: string };
          structuredFormat?: {
            mainText?:      { text?: string };
            secondaryText?: { text?: string };
          };
        };
      }>;
    };

    const suggestions = (data.suggestions ?? [])
      .map(s => {
        const pp   = s.placePrediction;
        const main = pp?.structuredFormat?.mainText?.text ?? '';
        const sec  = pp?.structuredFormat?.secondaryText?.text ?? '';
        const full = pp?.text?.text ?? '';
        return { main, secondary: sec, full };
      })
      .filter(s => s.full)
      .slice(0, 6);

    return res.json({ suggestions });
  } catch (err) {
    console.error('[/api/autocomplete]', err);
    return res.json({ suggestions: [] });
  }
}
