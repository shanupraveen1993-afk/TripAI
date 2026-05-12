import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.GOOGLE_PLACES_API_KEY ?? '';
  if (!key) return res.status(500).json({ error: 'API key not configured' });

  const { name, placeName, city } = req.query;

  try {
    // Path A: direct photo resource name (used by live API results)
    if (name && typeof name === 'string') {
      const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=800&skipHttpRedirect=true&key=${key}`;
      const r    = await fetch(url);
      const data = await r.json() as { photoUri?: string };
      return res.json({ photoUri: data.photoUri ?? null });
    }

    // Path B: search by place name + city (used by preset itinerary stops and explore presets)
    if (placeName && typeof placeName === 'string') {
      const searchCity = typeof city === 'string' ? city : 'Thanjavur';
      const textQuery  = `${placeName} ${searchCity} Tamil Nadu India`;

      // Coordinates and city-to-location map for known cities
      const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
        Thanjavur: { lat: 10.787, lng: 79.1378 },
        Chennai:   { lat: 13.083, lng: 80.2705 },
        Madurai:   { lat:  9.925, lng: 78.1198 },
        Trichy:    { lat: 10.805, lng: 78.6868 },
      };
      const coord = CITY_COORDS[searchCity] ?? CITY_COORDS['Thanjavur'];

      const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method:  'POST',
        headers: {
          'Content-Type':    'application/json',
          'X-Goog-Api-Key':  key,
          'X-Goog-FieldMask': 'places.photos',
        },
        body: JSON.stringify({
          textQuery,
          maxResultCount: 1,
          locationBias: {
            circle: {
              center:  { latitude: coord.lat, longitude: coord.lng },
              radius:  40000,   // 40 km — covers Thanjavur district + Darasuram
            },
          },
        }),
      });
      const searchData = await searchRes.json() as { places?: Array<{ photos?: Array<{ name: string }> }> };
      const photoName  = searchData?.places?.[0]?.photos?.[0]?.name;
      if (!photoName) return res.json({ photoUri: null });

      const mediaUrl  = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&skipHttpRedirect=true&key=${key}`;
      const mediaRes  = await fetch(mediaUrl);
      const mediaData = await mediaRes.json() as { photoUri?: string };
      return res.json({ photoUri: mediaData.photoUri ?? null });
    }

    return res.status(400).json({ error: 'Provide either name or placeName query param' });
  } catch (err) {
    console.error('[/api/photo]', err);
    res.status(500).json({ error: 'Photo fetch failed' });
  }
}
