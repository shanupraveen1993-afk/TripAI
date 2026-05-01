import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name } = req.query;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Missing photo name' });
  }

  const key = process.env.GOOGLE_PLACES_API_KEY ?? '';
  if (!key) return res.status(500).json({ error: 'API key not configured' });

  try {
    const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=400&skipHttpRedirect=true&key=${key}`;
    const r    = await fetch(url);
    const data = await r.json() as { photoUri?: string };
    res.json({ photoUri: data.photoUri ?? null });
  } catch (err) {
    console.error('[/api/photo]', err);
    res.status(500).json({ error: 'Photo fetch failed' });
  }
}
