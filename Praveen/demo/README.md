# TripAI

AI-powered travel planning — enter a destination, get real hotel and restaurant data from Google Places, plus AI-generated recommendations and itineraries from Google Gemini.

---

## What it does

Enter a destination, travel dates, group size, and budget. TripAI fetches live place data and returns:

- **Hotels** — real listings with ratings, price tiers, and AI recommendation notes
- **Restaurants** — filtered by diet preference, budget, and dining vibe
- **Itinerary** — a realistic day plan with traffic notes and local tips
- **Explore** — deep-dive on a specific landmark (status, crowd flow, preparation guide)

Trips can be saved to a profile and revisited anytime.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (`motion/react`) |
| API routes | Vercel Serverless Functions (`api/`) |
| Place data | Google Places API (New) |
| AI | Google Gemini (`gemini-2.0-flash`) |
| Deploy | Vercel |

---

## Folder Structure

```
demo/
├── api/                        # Vercel serverless functions
│   ├── plan.ts                 # POST /api/plan — Places + Gemini proxy
│   └── photo.ts                # GET  /api/photo — Places photo proxy
│
├── src/
│   ├── App.tsx                 # Root routing between screens
│   ├── main.tsx
│   ├── index.css               # Tailwind + design tokens
│   ├── api/client.ts           # Fetch wrapper
│   ├── mock/data.ts            # Type definitions + mock data
│   ├── hooks/                  # Custom React hooks
│   └── components/
│       ├── LandingPage.tsx
│       ├── AuthForm.tsx
│       ├── Dashboard.tsx
│       ├── ResultsView.tsx
│       ├── SavedTrips.tsx
│       ├── Navbar.tsx
│       ├── Profile.tsx
│       └── ui/                 # Shared UI primitives
│           ├── Badge.tsx
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Input.tsx
│           ├── Modal.tsx
│           ├── Skeleton.tsx
│           ├── Tabs.tsx
│           └── Toast.tsx
│
├── public/                     # PWA assets
│   ├── manifest.json
│   ├── icon-192.png
│   └── icon-512.png
│
├── index.html                  # Vite entry
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── .env.local                  # API keys — never commit
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```
GEMINI_API_KEY=your_google_ai_studio_key
GOOGLE_PLACES_API_KEY=your_google_cloud_places_key
```

Both keys are from Google:
- **Gemini** → [aistudio.google.com](https://aistudio.google.com)
- **Places** → [Google Cloud Console](https://console.cloud.google.com) → enable *Places API (New)*

---

## Running Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

For API routes locally, use the Vercel CLI:

```bash
npx vercel dev
```

---

## Deploying

```bash
npx vercel --prod
```

Set `GEMINI_API_KEY` and `GOOGLE_PLACES_API_KEY` in your Vercel project environment variables before deploying.
