# TripAI

AI-powered travel planning — search any destination, get real hotel and restaurant data from Google Places, and AI-generated recommendations, itineraries, and insights from Google Gemini.

---

## What it does

Enter a destination, travel dates, group size, and budget. TripAI fetches real place data from Google Places API, passes it through Gemini AI, and returns:

- **Hotels** — real listings with ratings, price tiers, and AI recommendation notes
- **Restaurants** — filtered by diet preference, budget, and dining vibe
- **Itinerary** — a realistic day plan with traffic notes and local tips
- **Explore** — deep-dive on a specific landmark (status, flow, preparation guide)

All trips can be saved to a profile and revisited anytime.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 (Flowbite design system — see `design.md`) |
| Animations | motion/react (Framer Motion) |
| Backend | Express (TypeScript via tsx) |
| Real place data | Google Places API (New) |
| AI recommendations | Google Gemini AI (`gemini-2.0-flash`) |
| Auth | JWT + bcrypt |
| Database | SQLite (`better-sqlite3`) |

---

## Project Documents

| File | Purpose |
|---|---|
| `README.md` | This file — project overview and quick start |
| `APP_DEVELOPMENT_PLAN.md` | Full product spec: features, pages, schema, API routes |
| `execution.md` | Phase-by-phase build plan with specific tasks and exit checks |
| `INTEGRATIONS.md` | Google Places API + Gemini AI Studio setup and usage guide |
| `design.md` | Flowbite design system reference — colors, typography, components |

---

## Folder Structure

```
demo/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env                        # API keys — never commit
│
├── server/                     # Express backend (Node/TypeScript)
│   ├── index.ts                # App entry — listen on PORT 4000
│   ├── db.ts                   # SQLite init + schema
│   ├── middleware/auth.ts       # JWT verification
│   └── routes/
│       ├── auth.ts             # /api/signup  /api/login
│       ├── plan.ts             # /api/plan  (Places + Gemini proxy)
│       └── trips.ts            # /api/trips  CRUD
│
├── src/                        # React frontend
│   ├── main.tsx
│   ├── App.tsx                 # Root: routing between screens
│   ├── index.css               # Tailwind + design tokens
│   ├── constants.ts            # Type definitions only
│   ├── api/client.ts           # Fetch wrapper with auth header
│   ├── hooks/
│   │   ├── useAuth.ts          # Login/signup/logout state
│   │   └── useTrips.ts         # Saved trips CRUD
│   └── components/
│       ├── LandingPage.tsx     # Pre-login hero
│       ├── AuthForm.tsx        # Email + password login/signup
│       ├── Dashboard.tsx       # Search form + tab filters
│       ├── ResultsView.tsx     # AI + Places results display
│       ├── SavedTrips.tsx      # DB-backed trip history
│       └── Profile.tsx         # User stats + settings
│
└── public/
    ├── manifest.json           # PWA manifest
    └── sw.js                   # Service worker
```

---

## Environment Variables

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_google_ai_studio_key
GOOGLE_PLACES_API_KEY=your_google_cloud_places_key
JWT_SECRET=minimum_32_character_random_string
DB_PATH=./tripai.db
PORT=4000
```

> Both API keys come from Google — see `INTEGRATIONS.md` for setup steps.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start backend (Terminal 1)
npx tsx server/index.ts

# Start frontend (Terminal 2)
npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000`  
Vite proxies `/api/*` to the backend automatically.

---

## Build Order

Follow `execution.md` phases in order:

1. Secure backend (move API keys off the browser)
2. Google Places API integration (real place data)
3. Real authentication (JWT + bcrypt)
4. Save and persist trips (SQLite)
5. Website responsive layout (desktop + mobile)
6. PWA + polish
