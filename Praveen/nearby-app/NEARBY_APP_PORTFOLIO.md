# NEARBY — Complete App Portfolio for Google Stitch
### Hyperlocal On-Demand Service Marketplace · India Tier-2/Tier-3 Cities

---

## ① DESIGN SYSTEM

**App Name:** Nearby  
**Tagline:** Your Neighbourhood, On Call  
**Platform:** Mobile-first · iOS + Android · 390px reference frame  
**Font:** Inter — 400 / 500 / 600 / 700 / 800  
**Language:** English (Hinglish copy acceptable)  
**Style:** Clean Material Design 3 · White card-based · Warm-cool dual brand

---

## ② COLOUR PALETTE

### PRIMARY — Active Orange `#FF9900`
> Energy · Speed · Action · Indian market warmth

| Shade | Hex | Name | Used For |
|---|---|---|---|
| 900 Dark | `#995C00` | orange-900 | Text on light orange bg, deep shadows |
| 700 Press | `#CC7A00` | orange-dim | Button pressed state, CTA shadow colour |
| **500 Brand** | **`#FF9900`** | **active-orange** | **Hero headers · Primary CTA buttons · Active tab · Progress bars · Selected chips** |
| 300 Light | `#FFB84D` | orange-light | Gradient end, decorative accents |
| 100 Container | `#FFF0D6` | orange-container | Chip backgrounds · Promo banner tint · Trial card bg |
| 50 Surface | `#FFF8EE` | orange-fixed | Faintest row tint · Highlight bg |
| On-Orange | `#FFFFFF` | on-orange | Text / icons on any orange bg |
| On-Container | `#7A4500` | on-orange-container | Text on orange-container bg |

---

### SECONDARY — Brand Teal `#15767E`
> Trust · Professionalism · Reliability · Provider identity

| Shade | Hex | Name | Used For |
|---|---|---|---|
| 900 Dark | `#0A4247` | teal-900 | Text on light teal bg |
| 700 Press | `#0F5A61` | brand-teal-dim | Button pressed state |
| **500 Brand** | **`#15767E`** | **brand-teal** | **Provider specialty label · Info cards · Secondary CTAs · Section accents · Progress steps** |
| 300 Light | `#1A9AA5` | teal-light | Decorative gradient, hover state |
| 100 Container | `#D1EDEF` | teal-container | Teal chip bg · "How it works" banner bg · Info block tint |
| 50 Surface | `#EBF7F8` | teal-fixed | Faintest teal surface · Educational callout bg |
| On-Teal | `#FFFFFF` | on-teal | Text / icons on brand-teal bg |
| On-Container | `#0A4247` | on-teal-container | Dark teal text on teal-container bg |

---

### ACCENT & STATUS COLOURS

| Colour | Hex | Token | Reserved For |
|---|---|---|---|
| Trust Blue | `#0056D2` | trust-blue | **ONLY:** In-app encrypted call screen bg · Aadhaar OTP active box border |
| Aadhaar Gold | `#BF953F` | aadhaar-gold | **ONLY:** Aadhaar badge · Verified Pro corner badge |
| Aadhaar Gold Light | `#FFF8E7` | gold-fixed | Gold badge bg, gold tinted row |
| Success | `#00A389` | success-teal | Online dot · Accept button · Verified checkmark |
| Success Light | `#E0F7F3` | success-container | Success row bg |
| Error | `#D92D20` | error-red | Logout · Missed/rejected calls · Destructive actions |
| Error Light | `#FFF5F5` | error-container | Error row bg |
| Warning | `#F59E0B` | warning | Caution states, pending badges |

---

### SURFACE & BACKGROUND

| Token | Hex | Used For |
|---|---|---|
| surface | `#f9f9fc` | Page / screen background |
| surface-container-lowest | `#ffffff` | Primary card background |
| surface-container-low | `#f3f3f6` | Card inner bg · Input field bg |
| surface-container | `#eeeef0` | Divider-level bg · Subtle separators |
| surface-container-high | `#e8e8ea` | Icon containers · Neutral chips · Inactive states |
| surface-container-highest | `#e2e2e5` | Strongest surface |
| on-surface | `#1a1c1e` | Primary text |
| on-surface-variant | `#424654` | Secondary text · Captions · Labels |
| outline | `#737785` | Disabled text · Placeholder |
| outline-variant | `#c3c6d6` | Card borders · Row dividers |
| primary-fixed | `#dae2ff` | Customer avatar bg (cool blue tint) |

---

### FULL PALETTE VISUAL REFERENCE

```
╔══════════════════════════════════════════════════════════════════╗
║  NEARBY — DUAL BRAND COLOUR SYSTEM                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  PRIMARY ORANGE                   SECONDARY TEAL                 ║
║  ┌──────────────────────┐         ┌──────────────────────┐       ║
║  │ ██████  #995C00  900 │         │ ██████  #0A4247  900 │       ║
║  │ ██████  #CC7A00  700 │         │ ██████  #0F5A61  700 │       ║
║  │ ██████  #FF9900  500 │ PRIMARY │ ██████  #15767E  500 │ SEC.  ║
║  │ ██████  #FFB84D  300 │         │ ██████  #1A9AA5  300 │       ║
║  │ ██████  #FFF0D6  100 │         │ ██████  #D1EDEF  100 │       ║
║  │ ██████  #FFF8EE   50 │         │ ██████  #EBF7F8   50 │       ║
║  └──────────────────────┘         └──────────────────────┘       ║
║                                                                  ║
║  TRUST & STATUS SIGNALS                                          ║
║  ┌──────────┬──────────┬──────────┬──────────┬──────────┐        ║
║  │ ████████ │ ████████ │ ████████ │ ████████ │ ████████ │        ║
║  │ #0056D2  │ #BF953F  │ #00A389  │ #D92D20  │ #F59E0B  │        ║
║  │  TRUST   │ AADHAAR  │ SUCCESS  │  ERROR   │ WARNING  │        ║
║  │  BLUE    │   GOLD   │   TEAL   │   RED    │          │        ║
║  │ Call     │ Verified │ Online/  │ Logout/  │ Caution  │        ║
║  │ Screen   │ Badges   │ Accept   │ Missed   │ Pending  │        ║
║  └──────────┴──────────┴──────────┴──────────┴──────────┘        ║
║                                                                  ║
║  SURFACES  (lightest → darkest)                                  ║
║  #ffffff → #f9f9fc → #f3f3f6 → #eeeef0 → #e8e8ea → #e2e2e5     ║
║  card       page      low       mid       high      highest      ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### COLOUR USAGE MAP — Where Each Brand Colour Appears

| UI Element | Primary Orange `#FF9900` | Secondary Teal `#15767E` |
|---|---|---|
| Page header bg | ✅ Customer app headers | ✗ (white headers for Provider) |
| Primary CTA button | ✅ All primary actions | ✗ |
| Secondary CTA button | ✅ Orange outline variant | ✅ Teal outline (contrast pairing) |
| Active tab indicator | ✅ Bottom nav active pill | ✗ |
| Progress bar | ✅ Trial progress, upload | ✅ Provider onboarding steps |
| Selected chip | ✅ Orange bg + white text | ✅ Teal bg (educational tags) |
| Provider specialty text | ✗ | ✅ "Expert Plumber" label |
| Info / "How it works" card | ✗ | ✅ Teal-fixed bg + on-teal-container text |
| Dashboard stat accent | ✅ Calls Received count | ✅ Messages / Activity count |
| Promo banner bg | ✅ Orange gradient | ✗ |
| Map pin / location | ✅ Orange pin (customer map) | ✗ |
| Rating stars | ✅ Gold-orange fill | ✗ |
| Toggle switch ON | ✅ Orange pill | ✗ |
| Plan card border (active) | ✅ Orange border + glow | ✗ |
| Section label text | ✅ "View All" links, orange labels | ✅ Provider section headings |
| Trust badges | ✗ (gold only) | ✗ (gold only) |
| Encrypted call screen | ✗ (trust-blue only) | ✗ |

---

## ③ TYPOGRAPHY SCALE

| Style | Size | Weight | Line-height | Tracking | Used For |
|---|---|---|---|---|---|
| Display | 32px | 800 | 40px | -0.02em | Hero numbers, plan prices |
| Headline LG | 24px | 700 | 32px | — | Screen titles, card headers |
| Headline Mobile | 20px | 700 | 28px | — | Section headings, app bar title |
| Title MD | 18px | 600 | 24px | — | Card titles, provider names |
| Body LG | 16px | 400 | 24px | — | Primary body text |
| Body MD | 14px | 400 | 20px | — | Descriptions, sublabels |
| Label MD | 12px | 600 | 16px | +0.05em | UPPERCASE badges, tab labels, captions |
| Caption SM | 11px | 500 | 14px | — | Timestamps, footnotes |

---

## ④ COMPONENT SYSTEM

**Cards**
- White bg `#ffffff` · 12–16px radius · 1px border `#eeeef0` · Shadow `0 2px 8px rgba(0,0,0,0.04)`
- Hover/active: `bg-surface-container-low` transition

**Primary CTA Button**
- Bg: `#FF9900` orange · Height: 56px · Radius: 14px · Text: white 14px bold
- Shadow: `0 4px 0 #CC7A00` (tactile depth) · Active: `translateY(2px)` + shadow collapses

**Secondary CTA — Orange Outline**
- White bg · Border: `#FF9900` · Text: `#FF9900` · Height: 48px · Radius: 12px

**Secondary CTA — Teal Outline**
- White bg · Border: `#15767E` · Text: `#15767E` · Height: 48px · Radius: 12px
- Use when a page already has an orange primary CTA (avoids same-colour repetition)

**Icon Containers**
- Bg: `#e8e8ea` neutral gray · Size: 40–48px · Radius: 10–12px
- NEVER orange-tinted or teal-tinted on neutral lists

**Service Chips — Neutral**
- Bg: `#e8e8ea` · Text: `#424654` · Border: none · Radius: 8px
- For browsing/filtering states

**Service Chips — Orange Selected**
- Bg: `#FF9900` · Text: `#ffffff` · Radius: full

**Tag Chips — Teal**
- Bg: `#D1EDEF` · Text: `#0A4247` · Radius: full
- For educational labels, provider categories, "How it works" tags

**Info / Explainer Cards**
- Bg: `#EBF7F8` (teal-fixed) · Border: dashed `#D1EDEF` · Radius: 16px
- Icon: `#15767E` brand-teal · Body text: `#0A4247`
- Use for onboarding help, feature explanations, "How the platform works"

**Toggle Switch**
- Track: OFF = `#e8e8ea` · ON = `#FF9900` orange · Knob: white circle with shadow
- Size: 48px × 24px pill

**Bottom Navigation**
- 3 tabs · Height: 64px · Bg: white · Top border: `#eeeef0`
- Active: orange pill bg `#FF9900/10` + orange icon/text `#FF9900` bold
- Inactive: `#737785` gray icon/text

**Headers — Customer App**
- Bg: `#FF9900` orange · All text/icons: white · Height: auto (pt-14 + content)

**Headers — Provider App**
- Bg: `#ffffff` white · Bottom border: `#e8e8ea` · Brand title: `#FF9900` orange bold · Utility icons: `#424654` gray

**Provider Specialty Text**
- Colour: `#15767E` brand-teal · Used under provider name on every card/profile

---

## ⑤ NAVIGATION ARCHITECTURE

```
SHARED ONBOARDING
├── 01. Splash
├── 02. Welcome
└── 03. Role Select
       │
       ├── CUSTOMER FLOW ─────────────────────────────────────────
       │   ├── 04. Customer Signup
       │   ├── 05. Customer OTP
       │   └── 06. Customer Address Setup
       │          └── CUSTOMER APP  [Bottom Nav: Home · History · Profile]
       │               ├── 07. Home
       │               │    ├── 08. Plumbing (Service Category)
       │               │    ├── 09. Providers List
       │               │    │    └── 10. Provider Detail
       │               │    │          └── 11. Call Screen
       │               │    │                └── 12. Review Status
       │               │    │                      └── 13. Rating
       │               ├── 14. Call History
       │               └── 15. Profile
       │                    ├── 16. Notification Settings
       │                    └── 17. Help Center
       │
       └── PROVIDER FLOW ─────────────────────────────────────────
           ├── 18. Provider Signup
           ├── 19. Aadhaar Verification
           ├── 20. Provider Address Setup
           ├── 21. Services Selection
           ├── 22. Skills & Experience
           └── 23. Profile Preview
                  └── PROVIDER APP  [Bottom Nav: Dashboard · Calls · Account]
                       ├── 24. Dashboard
                       │    └── 25. Incoming Call
                       ├── 26. Call History
                       └── 27. Account
                            └── 28. Growth Plans
```

---

## ⑥ SCREEN PORTFOLIO

---

### SCREEN 01 — Splash
**Persona:** Both · **Duration:** 2s auto → Welcome · **No interaction**

**Full-screen orange gradient:**  `#CC7A00` top → `#FF9900` center → `#FFB84D` bottom

**Center — stacked:**
- Nearby logomark (map pin + phone merged) · white · 80px
- "nearby" wordmark · white · 36px · 800 · tracking -0.5px
- "Your Neighbourhood, On Call" · white/80% · 14px · mt-2

**Bottom strip (dark overlay 20%):**
- Aadhaar shield icon `#BF953F` gold + "All Providers are Aadhaar Verified" · white/70% · 12px
- Pill badge: lock icon + "Secured by Aadhaar" · white/15% bg · `#BF953F` gold text

---

### SCREEN 02 — Welcome
**Persona:** Both · **Exit:** → Role Select

**Top 55% — Orange hero (full bleed `#FF9900` → `#CC7A00` gradient):**
- Decorative illustration · abstract city skyline / map pins · white outlines
- "Welcome to" · white/80% · 13px · uppercase · tracking-wide
- "nearby" · white · 36px · 800 · tracking -0.5px
- Tagline: "Your Neighbourhood, On Call" · white/80% · 14px

**Bottom 45% — White card (slides up, rounded-top-3xl, p-6):**
- Heading: "Find trusted local professionals" · 22px · 700 · dark
- Body: "Aadhaar-verified plumbers, electricians, carpenters and more — just a call away." · 14px · gray
- Feature list (3 rows, icon + text):
  - `#FF9900` Phone icon · "Direct call — no middleman"
  - `#15767E` Shield icon · "Aadhaar-verified professionals"
  - `#FF9900` MapPin icon · "Within 5 km of you"
- **Primary CTA:** "Get Started →" · full-width · orange · 56px
- **Footer link:** "Already have an account? Sign In" · 12px · centered · `#FF9900`

---

### SCREEN 03 — Role Select
**Persona:** Both · **Exit:** Customer Signup OR Provider Signup

**Header:** White · back chevron · "Join Nearby" centered bold

**Body:**
- "I am a..." · 24px · 700
- "Choose your role to get started" · 14px · gray · mb-6

**Card 1 — Customer (full-width):**
- White bg · rounded-2xl · p-5 · `border-2 border-[#eeeef0]`
- Left: 56px circle · `#EBF7F8` teal-fixed bg · Home icon `#15767E`
- Title: "Looking for Services" · 16px · 700
- Desc: "Find and call verified local professionals nearby" · 13px · gray
- Right: radio circle · **When selected:** `border-2 border-[#FF9900] bg-[#FFF8EE]` · radio filled orange

**Card 2 — Provider (full-width):**
- White bg · same base styling
- Left: 56px circle · `#FFF0D6` orange-container bg · Wrench icon `#FF9900`
- Title: "I'm a Professional" · 16px · 700
- Desc: "Get discovered and receive calls from customers nearby" · 13px · gray
- **When selected:** `border-2 border-[#FF9900] bg-[#FFF8EE]` · radio filled orange

**Primary CTA:** "Continue →" · full-width orange · enabled after selection only

---

### SCREEN 04 — Customer Signup
**Persona:** Customer · **Exit:** → Customer OTP

**Header:** White · back chevron · "Sign Up" title

**Illustration block (h-40 · `#FFF0D6` bg · rounded-2xl):**
- Phone + lock illustration · white/teal tones
- Badge overlay: shield icon + "Secure Sign-up" · `#15767E` teal text · `#EBF7F8` bg pill

**Form:**
- "YOUR FULL NAME" · 11px · uppercase · `#424654` · mb-1
- Text input · 56px · rounded-xl · border `#eeeef0`
- "MOBILE NUMBER" · same label style
- `+91` prefix · `#FF9900` orange non-editable + 10-digit input
- Checkbox row: "I agree to Terms & Privacy Policy" · orange checkbox tick when checked

**Primary CTA:** "Send OTP →" · full-width orange  
**Footer note:** "By continuing you agree to our Terms of Service" · 11px · centered · gray

---

### SCREEN 05 — Customer OTP
**Persona:** Customer · **Exit:** → Customer Address Setup

**Header:** White · back chevron · "Verify Mobile"

**Body (centered):**
- "Enter OTP" · 22px · 700
- "Sent to +91 98765 43210" · 14px · gray · "Change number" link `#FF9900`
- 4-box OTP row (56×64px each · rounded-xl):
  - Empty state: border `#c3c6d6` gray
  - Filled state: border `#FF9900` + text `#FF9900` orange
  - Focus: same as filled + faint orange shadow
- Timer: "Resend OTP in **0:42**" · gray · bold timer digits `#FF9900`
- Resend link (after 0:00): "Resend OTP" · `#FF9900` underline
- **Primary CTA:** "Verify & Continue →" · orange · disabled until all 4 filled
- Trust note: Lock icon `#15767E` + "Your number is never shared with providers" · 12px · gray

---

### SCREEN 06 — Customer Address Setup
**Persona:** Customer · **Exit:** → Customer Home

**Header:** White · back chevron · "Your Location"

**Map area (h-72 · `bg-surface-container-low` · rounded-2xl · overflow-hidden):**
- Grid lines: horizontal + vertical hairlines `rgba(21,118,126,0.08)` teal tint
- Center: large `#FF9900` map pin (filled) with pulsing orange ring
- Floating address pill (bottom): white · rounded-full · shadow · "Detecting your location..."

**Below map:**
- "Confirm your service area" · 16px · 600
- "Sriram Nagar Phase 2, Thanjavur" · 14px · gray

**Address type chips (horizontal scroll):**
- 🏠 Home · 🏢 Office · 📍 Other
- Unselected: white bg · gray border · gray text
- **Selected:** `#FF9900` bg · white text

**Primary CTA:** "Confirm & Start →" · full-width orange

---

### SCREEN 07 — Customer Home
**Persona:** Customer · **Bottom Nav:** Home ✅ / History / Profile

**Header (white · bottom border `#eeeef0`):**
- Left: "Hi Praveen" · 20px · 700 · dark + MapPin `#FF9900` + "Sriram nagar, Thiruvaiyaru" · 14px · gray
- Right: avatar circle (`#dae2ff` primary-fixed bg · "P" initial `#0056D2`) → taps to Profile

**Search bar:**
- `#f3f3f6` bg · rounded-xl · 56px · border `#eeeef0`
- Magnifier icon gray left · "Search for plumbing, electrical..." placeholder
- Focus: border `#FF9900` orange ring

**Promo Banner (`#FF9900` → `#CC7A00` gradient · rounded-2xl · p-5):**
- "OFFER" pill: white/20% bg · white 11px bold uppercase
- "180 Days Free Trial" · 20px · white · 700
- "Premium service calls at ₹0 for 6 months" · 14px · white/90%
- CTA button: white bg · rounded-xl · "Claim Now" · `#FF9900` bold
- Decorative blobs: white/10% circles blurred

**Trusted Badge row (`#f3f3f6` bg · rounded-xl · px-4 py-3 · border):**
- ShieldCheck `#00A389` icon + "All 500+ local professionals are Aadhaar-verified." · 12px · gray

**Our Services (3×3 grid):**
- Header: "Our Services" · 16px · 700 left + "View All" `#FF9900` right
- 9 tiles · white bg · rounded-xl · border · shadow
- Each tile: colored circular icon bg + service icon + name 12px bold centered
- Icon circle colours by category:
  - Plumbing: `#EBF0FF` blue tint / Electrical: `#FEF3C7` amber / Carpentry: `#FDF3E7` brown
  - Painting: `#FCE7F3` pink / Civil Mason: `#F1F5F9` slate / Tile Mason: `#ECFEFF` cyan
  - Appliance: `#EEF2FF` indigo / Bike Mech: `#FEF2F2` red / Puncture: `#F5F5F4` stone

**Top Rated Nearby:**
- "Top Rated Nearby" · 16px · 700 · mb-3
- White card · rounded-xl · p-4 · shadow:
  - Left: 80×80 rounded-xl avatar · `#e8e8ea` bg · verified teal badge bottom-right
  - Name: "Ramesh Kumar" · 18px · 700 + Specialty: "Master Electrician" · **`#15767E`** teal
  - Rating: `#BF953F` gold stars + "4.9" + "(0.8 km)" gray
  - Action row: "Book Service" orange btn (flex-1) + Phone icon btn (orange outline · 40×40)

---

### SCREEN 08 — Plumbing (Service Category)
**Persona:** Customer · **Exit:** → Providers List

**Header:** `#FF9900` orange · white back chevron + "Plumbing Services" + search icon

**Hero (orange bg · pb-6):**
- 60px circle · white bg · pipe icon `#FF9900`
- "Book a Plumber" · 22px · white · 700
- "Tap a service to call verified plumbers nearby" · 14px · white/80%

**Service cards (white · rounded-2xl · p-4 · shadow · gap-3):**

| Service | Price Range | Icon Bg |
|---|---|---|
| Pipe Leakage Repair | ₹150–₹400 | `#FFF0D6` |
| Tap / Faucet Fixing | ₹100–₹250 | `#FFF0D6` |
| Bathroom Fitting | ₹500–₹1,200 | `#EBF7F8` |
| Water Tank Cleaning | ₹400–₹800 | `#EBF7F8` |
| Drainage Unclogging | ₹200–₹500 | `#FFF0D6` |
| Geyser Installation | ₹300–₹700 | `#EBF7F8` |

Each card: icon container (48px rounded-xl) + name bold + desc gray + price tag pill (`#FFF0D6` bg · `#FF9900` text · rounded-full)

---

### SCREEN 09 — Providers List
**Persona:** Customer · **Exit:** → Provider Detail

**Header:** `#FF9900` orange · back + "Plumbers Nearby" + filter icon (white)

**Filter chips (horizontal scroll · pt-3 px-5):**
- "All" / "Available Now" / "Top Rated" / "Nearest"
- Active: `#FF9900` bg · white text · rounded-full
- Inactive: white bg · gray text · border `#eeeef0`

**Provider cards (white · rounded-2xl · p-4 · shadow · gap-3):**
- Avatar (48px · `#dae2ff` bg · blue initial) + online dot (green `#00A389` / gray `#e8e8ea`)
- Name · 15px · 700 dark
- Specialty: e.g. "Expert Plumber · 12 yrs" · **`#15767E` teal** · 12px
- Rating: 5 `#BF953F` gold stars + "4.9" + "(450+)" gray
- Distance: MapPin `#FF9900` + "0.8 km away" · 11px gray
- Right: "Call" button · `#FF9900` bg · phone icon + "Call" · white bold · rounded-xl · 40px height

---

### SCREEN 10 — Provider Detail
**Persona:** Customer · **Exit:** → Call Screen

**Header:** `#FF9900` orange · back + "Rajesh Kumar" white bold + share icon

**Hero (orange bg · pb-6 · center-aligned):**
- Avatar 80px · white/25% bg · large "R" white initial
- "Verified Pro" badge · `#BF953F` gold bg · shield icon · white text · rounded-full · mb-3
- "Rajesh Kumar" · 22px · white · 700
- Specialty: "Electrician · 12 yrs experience" · 14px · white/80%
- 5 gold stars + "4.9" bold white + "(450+ reviews)" white/70%

**Quick stats row (3 equal white cards · rounded-xl · p-3 · border):**
- "128" `#FF9900` bold + "Jobs Done" gray caption
- "4.9★" `#FF9900` bold + "Rating" gray caption
- "12 yrs" `#15767E` bold + "Experience" gray caption

**Service area (white card · row):**
- MapPin `#FF9900` + "2.4 km away · Sriram Nagar, Thanjavur"

**Map placeholder (h-36 · `#f3f3f6` bg):**
- Orange pin circle (40px) center + "2.4 km away" `#FF9900` caption

**Services offered (white card):**
- "Services Offered" · 14px · 700 · mb-2
- Chips: `#e8e8ea` neutral bg · icon + label (Pipe Leakage, Tap Fixing, etc.)

**Reviews (white card):**
- "Customer Reviews" + "4.9/5.0" `#FF9900` large + star row
- 2 review rows: avatar + name + stars + date + text

**Fixed bottom:** "Call Rajesh Kumar" · full-width `#FF9900` · phone icon · white bold · 56px · shadow

---

### SCREEN 11 — In-App Call Screen
**Persona:** Customer · **Exit:** → Review Status  
⚠️ **ONLY screen with `#0056D2` trust-blue dominant — encrypted secure call signal**

**Full screen:** `bg-[#0056D2]` trust-blue

**Top (centered · pt-16):**
- "Nearby" wordmark · small · white
- "Secure & Encrypted" pill · white/20% bg · lock icon + text · rounded-full
- Avatar 96px · white/25% circle · large "R" initial
- "Rajesh Kumar" · 24px · white · 700
- "Expert Electrician" · 14px · white/70%

**Center (animated):**
- "Calling..." · 18px · white/90% + 3 dot pulse
- 3 pulsing rings: white/5% → white/10% → white/15%

**Info card (white · rounded-3xl · mx-5 · mb-8 · large shadow):**
- "Encrypted call via Nearby proxy" · gray · 12px
- ShieldCheck `#00A389` + "Your real number is NEVER shared" · green bold
- Clock icon + "Usually answers in under 2 min" · gray

**Action buttons (2 circles · bottom-safe):**
- Left: 64px · `#FFF5F5` bg · X icon `#D92D20` · "End Call" gray label below
- Right: 64px · `#f3f3f6` bg · Mic icon gray · "Mute" gray label

---

### SCREEN 12 — Review Status
**Persona:** Customer · **Entry:** Mandatory after every call · **Exit:** → Rating OR Finding Provider

**Header:** `#FF9900` orange · back white + "Call Review" white bold

**Body (px-5 pt-5):**
- "How did the call go?" · 24px · 700 · dark
- "Let us know so we can help you better" · 14px · gray
- Provider card (white · rounded-2xl · border):
  - Avatar + "Rajesh Kumar" bold + "Electrician · Called 2 mins ago" gray

**3 option cards (gap-3):**

**Card A — Service Accepted:**
- `#E0F7F3` success-container bg · CheckCircle `#00A389` (48px tinted circle)
- "Service Accepted" · 14px · 700 + "Provider is on the way" · 12px · gray
- → Navigates to Rating screen ✅

**Card B — Not Answered:**
- `#f3f3f6` gray bg · Clock `#737785` icon
- "Not Answered" · 14px · 700 + "Call was not answered" · 12px · gray
- → Shows "Finding Provider" state · **NO rating** ❌

**Card C — Service Rejected:**
- `#FFF5F5` error-container bg · XCircle `#D92D20` icon
- "Service Rejected" · 14px · 700 + "Provider couldn't take the call" · 12px · gray
- → Shows "Finding Provider" state · **NO rating** ❌

**Finding Another Provider state (full-screen centered, no scroll):**
- 80px circle · `#FFF0D6` bg · Search icon `#FF9900`
- "Finding Another Provider" · 22px · 700
- "We're looking for available providers nearby. Usually under 30 seconds." · 14px · gray centered
- "Back to Home" · orange button · px-8

---

### SCREEN 13 — Rating
**Persona:** Customer · **Entry:** From Review Status → Accepted · **Exit:** → Home

**Header:** `#FF9900` orange · back + "Rate Your Experience" white bold

**Provider card (white · rounded-2xl · border):**
- Avatar + "Rajesh Kumar" bold + "Electrician" · **`#15767E` teal**
- "Service completed · Today, 3:45 PM" · gray caption

**Star rating (centered · mt-6):**
- 5 stars · 44px each · tappable
- Unselected: outline `#e8e8ea` / Selected: solid `#FF9900` fill
- Dynamic label below: 1★ "Poor" · 2★ "Below average" · 3★ "Average" · 4★ "Good service" · 5★ "Excellent! 🎉"

**Quality chips ("What went well?" · horizontal scroll · multi-select):**
- Unselected: `#e8e8ea` bg · gray text
- Selected: `#FF9900` bg · white text
- Chips: "On Time" / "Skilled Work" / "Friendly" / "Clean" / "Fair Price"

**Comment box:**
- `#f3f3f6` bg · rounded-xl · h-20 · "Add a comment (optional)" placeholder

**Primary CTA:** "Submit Review" · full-width orange

---

### SCREEN 14 — Customer Call History
**Persona:** Customer · **Bottom Nav:** Home / History ✅ / Profile

**Header:** `#FF9900` orange
- "Call History" · 20px · white · 700
- Stats row (2 pills `bg-white/20`):
  - "Total Calls: 12" · white bold + label white/70%
  - "Avg Rating: 4.8★" · white bold + label white/70%

**Grouped list (px-5 · pt-5):**
Month label: "OCTOBER 2023" · 11px · `#FF9900` · uppercase · tracking-widest

White card (rounded-2xl · overflow-hidden) per month:
Each row (divider between):
- Avatar (48px · `#dae2ff` bg · blue initial)
- Provider name bold + service gray + timestamp gray caption
- Status badge right: Answered `#00A389` teal / Missed `#737785` gray / Rejected `#D92D20` red
- Action button: "Rate →" `#FF9900` (answered) · "Find Again" `#15767E` teal outline (missed/rejected)

---

### SCREEN 15 — Customer Profile
**Persona:** Customer · **Bottom Nav:** Home / History / Profile ✅

**Header (white · bottom border):**
- Left: avatar thumbnail + "Profile" · `#FF9900` bold
- Right: Bell icon `#424654`

**Profile card (white · rounded-xl · p-4 · border):**
- Large avatar (80px · `#dae2ff` bg · orange border ring · teal verified dot)
- "Praveen Kumar" · 20px · 700 + "+91 98765 43210" gray
- "AADHAAR VERIFIED" gold badge: `#FFF8E7` bg · `#BF953F` text · rounded-full
- "Edit" link: `#FF9900`

**Plan card (`#FF9900` gradient · rounded-xl · p-4):**
- Decorative white/10% blobs
- "CURRENT PLAN" · white/80% · 11px · uppercase
- "Free Tier" · 24px · white · 700
- "3" · 36px · white · 800 + "Calls Left This Month" · white/80% · 12px
- "Upgrade" button: white bg · `#FF9900` text · rounded-xl

**Saved addresses (white card · rounded-xl · border):**
- MapPin `#FF9900` + "Saved Addresses" bold
- Address row: Home icon `#e8e8ea` circle + "Home" bold + address gray + dashed border
- "+ Add New Address": `#FF9900` border + text · rounded-xl

**Settings list (white card · stacked rows):**
| Icon | Colour | Label | Sub |
|---|---|---|---|
| Bell | `#424654` gray | Notification Settings | Manage alerts |
| Share | `#00A389` teal | Share with Friends | Invite friends |
| HelpCircle | `#BF953F` gold | Help & Support | FAQs & contact |
| Info | `#737785` gray | About Nearby | Version 1.0.0 |

Icons in `#e8e8ea` gray circle containers. ChevronRight right.

**Logout:** `#FFF5F5` bg · red border · LogOut `#D92D20` + "Logout" red bold · centered  
**Footer:** "App Version 1.0.0 · Proudly Made in India" · 11px · centered · `#737785`

---

### SCREEN 16 — Notification Settings
**Persona:** Customer · **Exit:** → Profile

**Header:** `#FF9900` orange · back + "Notifications" white bold

**Group label: "SERVICE ALERTS"** · 11px · uppercase · `#737785` · tracking-widest

White card (rows with dividers):
| Toggle | Label | Sub | Default |
|---|---|---|---|
| 🟠 ON | Service Updates | Status of your active bookings | ON |
| ⚫ OFF | Promotions | Special offers & discounts | OFF |
| 🟠 ON | Account Activity | Login alerts & security | ON |
| 🟠 ON | App Tips | Feature guides | ON |

**Group label: "CHANNELS"**
| Toggle | Label | Sub | Default |
|---|---|---|---|
| 🟠 ON | Push Notifications | In-app & device alerts | ON |
| ⚫ OFF | SMS | Text message updates | OFF |
| 🟠 ON | WhatsApp | Messages on WhatsApp | ON |

Toggle: 48×24px pill · OFF = `#e8e8ea` gray · ON = `#FF9900` orange · white knob

**Locked row (opacity-60):**
Lock `#737785` + "Scheduled Quiet Hours" + "Pause notifications at specific times" + "Pro" pill `#FF9900`/20% bg · `#FF9900` text

---

### SCREEN 17 — Help Center
**Persona:** Customer · **Exit:** → Profile

**Header:** `#FF9900` orange · back + "Help Center" white bold

**Search bar:** white · rounded-2xl · border `#eeeef0` · magnifier gray + "Search help articles..."

**Browse by Topic:**
Large card (full-width · `#FFF0D6` bg · rounded-2xl · p-5):
- 56px circle (white/70%) · CreditCard `#FF9900` · "Payments" 16px bold · "Billing, refunds & transactions" gray

2-col row:
- Service Quality: `#E0F7F3` bg · Star `#00A389` · "Service Quality" bold
- Account Access: `#EBF7F8` bg · Shield `#15767E` · "Account Access" bold

**FAQs (white card · rounded-2xl · accordion):**

| Q | A |
|---|---|
| How do I book a service? | Tap any service from home, browse providers, tap 'Call' to connect. |
| Is my call secure? | Yes — calls route via encrypted proxy. Your number is never shared. |
| What if provider doesn't answer? | Select 'Not Answered' — we instantly find another nearby provider. |

ChevronDown/Up toggle per row.

**Contact banner (white card · border):**
- "Still need help?" · 16px · 700 + "Mon–Sat, 9am–7pm" gray
- Row: "Chat with Us" `#FF9900` btn + "Call Support" `#15767E` teal outline btn

---

### SCREEN 18 — Provider Signup
**Persona:** Provider · **Exit:** → Aadhaar Verification

**Header:** `#FF9900` orange · back + "Join as Pro" white bold

**Illustration block (h-36 · `#FFF0D6` bg · rounded-2xl):**
- Toolbox / briefcase illustration
- "10,000+ Pros Joined" pill · `#FF9900` bg · white bold

**Form:**
- "Full Name" · "Mobile Number" (+91 prefix) · "Profession/Trade" dropdown
- Trust card: `#FFF8E7` gold-fixed bg · Aadhaar icon `#BF953F` + "Aadhaar verification required for safety"
- Orange checkbox: "I agree to Terms & Privacy Policy"

**Primary CTA:** "Continue →" · full-width orange

---

### SCREEN 19 — Aadhaar Verification
**Persona:** Provider · **Exit:** → Provider Address Setup

**Header:** `#FF9900` orange · back + "Verify Identity" white bold

**Body (centered · px-5):**
- Shield badge (96px · border-4 `#BF953F` gold ring · shield icon `#BF953F` inside)
- "Aadhaar Verification" · 22px · 700 · centered
- "Your identity is kept secure and private" · 14px · gray · centered

- Aadhaar number input: 56px · rounded-xl · `XXXX XXXX XXXX` format · lock icon suffix
- "Get OTP →" · full-width orange

- OTP sent state: 4-box OTP input
  - ⚠️ **DELIBERATE EXCEPTION: boxes use `border-[#0056D2]` trust-blue when active** — government verification context
  - "OTP sent to Aadhaar-linked mobile" caption
  - Timer `#FF9900` countdown

- Info card `#FFF8E7` gold-fixed bg:
  - Shield `#BF953F` + "Your Aadhaar data is encrypted and never stored"

---

### SCREEN 20 — Provider Address Setup
**Persona:** Provider · **Exit:** → Services Selection

**Header:** `#FF9900` orange · back + "Service Area" white bold

**Body:**
- "Where do you serve?" · 22px · 700
- "Set your primary work area" · 14px · gray

**Map area (h-44 · `#f3f3f6` bg · rounded-2xl):**
- Grid hairlines: `rgba(21,118,126,0.08)` teal tint
- Center: `#FF9900` orange map pin (filled, large) + pulsing orange ring
- Floating pill: white · "Greater Noida, Uttar Pradesh"

**Radius chips (horizontal scroll):**
- "2 km" / "5 km" / "10 km" / "15 km"
- Selected: `#FF9900` bg white text · Unselected: white bg gray text border

**Primary CTA:** "Set My Area →" · full-width orange

---

### SCREEN 21 — Services Selection
**Persona:** Provider · **Exit:** → Skills & Experience

**Header:** `#FF9900` orange · back + "Your Services" white bold

**Body:**
- "What services do you offer?" · 22px · 700
- "Select all that apply · up to 5" · 14px · gray

**3×3 tile grid (white cards · rounded-2xl · border · aspect-square):**
Each: colored icon circle (40px) + service name 13px bold
- When selected: `border-2 border-[#FF9900] bg-[#FFF0D6]` + CheckCircle `#FF9900` fill at bottom-right

Services: Plumbing · Electrical · Carpentry · Painting · Civil Mason · Tile Mason · Appliance · Bike Mech · Puncture

**Primary CTA:** "Continue (N selected) →" · full-width orange

---

### SCREEN 22 — Skills & Experience
**Persona:** Provider · **Exit:** → Profile Preview

**Header:** `#FF9900` orange · back + "Your Skills" white bold

**Progress steps (px-5 · pt-3 · 4 dots/steps):**
- Completed steps: `#FF9900` orange filled dot
- Current step: `#15767E` teal filled dot
- Pending steps: `#e8e8ea` gray dot
- Connecting line: orange for completed, gray for pending

**Body:**
- "Years of Experience" · 14px · 600 · mb-2
- Year chips: "1 yr" "2 yrs" "3 yrs" "5 yrs" "8 yrs" "10+ yrs" "15+ yrs"
  - Selected: `#FF9900` bg white · Unselected: `#e8e8ea` bg gray text

- "Your Skills" · 14px · 600 · mt-5
- Skill checkboxes (white card · rows + dividers):
  Each: checkbox (filled `#FF9900` when checked) + skill name + ITI/certification sub-note
  Skills: Pipe Fitting · Leak Detection · Bathroom Renovation · Tap Repair · Drain Cleaning · Tank Installation · Geyser Service

- "Certifications (optional)" · 14px · 600 · mt-4
  - Text input: `#f3f3f6` bg · "e.g. ITI Plumbing, NSDC Certificate" placeholder

**Primary CTA:** "Preview Profile →" · full-width orange

---

### SCREEN 23 — Profile Preview
**Persona:** Provider · **Exit:** → Provider Dashboard

**Header:** `#FF9900` orange · back + edit icon white + "Preview" white bold

**Profile card (white · rounded-2xl · p-5 · center-aligned):**
- Large avatar 80px · `#dae2ff` bg · teal `#00A389` verified dot
- "Ramesh Kumar" · 20px · 700
- "Expert Plumber" · **`#15767E` brand-teal** · 14px + " · 12 yrs" gray
- 5 orange stars + "4.9" · "0 reviews" gray

**Skills chips (horizontal scroll):**
- `#e8e8ea` neutral bg · icon + label (Pipe Fitting, Bathroom Renovation, etc.)

**Service Area card (white · rounded-xl):**
- MapPin `#FF9900` + "Greater Noida · 5 km radius" gray

**"How it works" info card (`#EBF7F8` teal-fixed bg · rounded-2xl · border dashed `#D1EDEF`):**
- Info icon `#15767E` teal
- "Once live, customers see your profile when searching for plumbers. They tap 'Call' — the call comes directly to your phone."
- Text: `#0A4247` on-teal-container

**2-button row:**
- "Edit Profile" · `#FF9900` border + text · rounded-xl · flex-1
- "Finish Setup →" · `#FF9900` bg white text · flex-1

---

### SCREEN 24 — Provider Dashboard
**Persona:** Provider · **Bottom Nav:** Dashboard ✅ / Calls / Account

**Header (white · bottom border):**
- Left: avatar 32px + "Dashboard" · `#FF9900` bold
- Right: "VERIFIED" badge · `#FFF0D6` bg · `#FF9900` text · shield icon

**Body (px-4 · gap-4):**
- "Welcome back," · 14px · gray
- "Hi Ramesh" · 32px · `#FF9900` · 800

**Trial CTA card (`#FFF0D6` bg · rounded-xl · p-5 · border `#FFB84D`):**
- Decorative white/30% circle overlay
- "180 Days Free Trial" · 16px · 700 + "Enjoy premium features & priority leads" · 14px · gray
- "Check Status" button: white bg · `#FF9900` text · rounded-xl

**Stats bento (2 full-width sections):**

Section A — Market Demand (white · rounded-xl · p-5 · border):
- 56px circle · `#FFF0D6` bg · Users icon `#FF9900`
- "MARKET DEMAND" · 11px · uppercase · gray + "150+ customers nearby" · 22px · 700

Section B — Monthly Report (`#f3f3f6` bg · rounded-xl · p-5 · border):
- BarChart icon `#FF9900` + "Monthly Report" 16px bold + "Details" `#FF9900` link
- 3-stat row:
  - "42" `#FF9900` orange + "Calls Received"
  - "5" `#D92D20` red + "Missed"
  - "12" **`#15767E` teal** + "Messages"

**Recent Requests:**
- "Recent Requests" 16px bold + "View All" `#FF9900`
- 3 cards (white · rounded-xl · border · shadow):
  - Avatar 48px + online dot (green/gray) + name bold + service · **`#15767E` teal** + distance
  - Right: 44px circle `#FF9900` bg · Phone white icon

---

### SCREEN 25 — Incoming Call (Provider)
**Persona:** Provider · **Exit:** Accept → Calls / Decline → Dashboard

**Full screen:** `#FFF8EE` orange-fixed warm bg (NOT blue — provider side only)

**Map grid (absolute):** hairlines `rgba(255,153,0,0.10)` orange tint

**Header pill (centered · pt-14):**
- White rounded-full · green dot `#00A389` + "Incoming Request" dark semibold

**Center animation:**
- Outer ring: 160px circle · `rgba(255,153,0,0.10)`
- Middle ring: 96px · `rgba(255,153,0,0.15)`
- Core: 64px circle · `#FF9900` · MapPin white · orange glow shadow
- Below: white pill · "1.2 km away" · `#FF9900` bold

**Request card (white · rounded-3xl · mx-5 · mb-8 · p-5 · deep shadow):**
- "INCOMING REQUEST" · 11px · gray · uppercase + "Praveen Kumar" · 20px · 700
- Rating badge right: `#FFF3CD` bg · gold star + "4.9"
- Service row (`#f3f3f6` bg · rounded-2xl · p-3):
  - 40px icon box `#FFF0D6` · MapPin `#FF9900` + "Plumbing - Tap Fixing" bold + "Sriram Nagar Phase 2" gray
- "Estimated job value: ₹250–₹400" · gray label + `#00A389` teal bold value
- 2 buttons:
  - "Decline" · `#e8e8ea` bg · X `#737785` · gray text · flex-1 · 56px
  - "Accept" · `#00A389` bg · PhoneCall white · "Accept" white bold · flex-1 · 56px · teal shadow

---

### SCREEN 26 — Provider Call History
**Persona:** Provider · **Bottom Nav:** Dashboard / Calls ✅ / Account

**Header:** `#FF9900` orange
- Row: avatar 48px (white/25% bg · "R") + "Ramesh Kumar" white bold + "Expert Plumber" white/70%
- Bell icon · white · `bg-white/20` rounded-full
- "Call History" · 20px · white · 700 · mt-4
- Stats row (2 pills `bg-white/20`):
  - "128" white bold + "Total Calls" white/70%
  - "92%" white bold + "Answer Rate" white/70%

**Grouped list (px-5 · pt-5):**
Month: "OCTOBER 2023" · 11px · `#FF9900` · uppercase · tracking-widest

White card (rounded-2xl) per month · rows with dividers:
- Avatar 40px (`#dae2ff` bg · blue initial)
- Name bold + service gray
- Status right:
  - Answered: CheckCircle + "Answered" `#00A389` + "₹550" teal bold
  - Missed: PhoneMissed + "Missed" `#737785` gray
  - Rejected: XCircle + "Rejected" `#D92D20` red
- Call-back btn (36px · rounded-xl):
  - Answered: `#FF9900/20%` bg · Phone `#FF9900`
  - Missed/Rejected: `#e8e8ea` bg · Phone gray

**Trust card (`#FFF8E7` gold-fixed bg · rounded-2xl):**
- ShieldCheck `#BF953F` + "Aadhaar Verified Professional" bold `#8B6914` + "Your identity is verified and trusted" `#8B6914/70%`

---

### SCREEN 27 — Provider Account
**Persona:** Provider · **Bottom Nav:** Dashboard / Calls / Account ✅

**Header (white · border):**
- Left: avatar 32px + "Account" · `#FF9900` bold
- Right: Edit `#424654`

**Profile header card (white · rounded-xl · p-4 · border · overflow-hidden):**
- Top-right corner badge: `#BF953F` bg · "Verified Pro" shield white · rounded-bl-xl
- Large avatar 96px · `#e8e8ea` bg · teal dot bottom-right (glow)
- "Ramesh Kumar" · 22px · 700 + edit pencil `#737785`
- "Expert Plumber" · **`#15767E` brand-teal** + " · 12+ Years Exp." gray
- Stars `#FF9900` + "4.9" bold + "(450+ Reviews)" gray

**Subscription card (`#FFF0D6/30%` bg · rounded-xl · border `#FFB84D/30%`):**
- "ACTIVE PLAN" pill: `#FF9900` bg · dark orange text
- "Introductory Trial" · 16px · 700
- "Unlimited leads until end of the month." · 14px · gray
- "Upgrade to Premium" · full-width `#FF9900` · 56px · shadow

**Service Areas (white card · rounded-xl · border):**
- Header: "Service Areas" bold + MapPin `#FF9900` circle right
- "Greater Noida & Noida West" gray
- Map mock (h-28 · `#e8e8ea` rounded-xl): pulsing `#FF9900` dot center

**Services Offered (white card · rounded-xl · p-4 · border):**
- "Services Offered" bold + Edit `#FF9900` link
- Chip grid: `#e8e8ea` bg · icon + label for each service

**Settings list (white card · rounded-xl · border):**
- Verification: `#00A389/10%` circle · teal shield + "Verification Status" + "100% Verified" `#00A389`
- Language: `#15767E/10%` circle · globe `#15767E` + "Language Preference" + "English, Tamil" 
- Help: `#e8e8ea` circle · help icon + "Help & Support"
- Logout: `#D92D20/10%` circle · LogOut `#D92D20` + "Logout" red bold

All rows: ChevronRight · dividers `border-[#eeeef0]`

---

### SCREEN 28 — Growth Plans
**Persona:** Provider · **Entry:** Account → Upgrade · **Exit:** → Account

**Header (white · border):**
- Back chevron gray + "Account" · `#FF9900` bold

**Body (px-4 · pt-5):**
- "Grow Your Business" · 24px · 700
- "Choose a plan that fits your growth goals." · 14px · gray

**Plan Card 1 — Introductory Trial (ACTIVE):**
- `bg-white border-2 border-[#FF9900]` · rounded-xl
- Glow: `box-shadow: 0 0 20px rgba(255,153,0,0.15)`
- Top-right tab: `#FF9900` bg · "ACTIVE" white bold · rounded-bl-xl
- "Introductory Trial" · 16px · 700 + "2 Months Validity" · `#FF9900` · 12px
- "₹0" · 32px · 800 · dark · right-aligned
- Feature: Check `#00A389` + "Basic listing in local area"
- Progress bar (h-2 · `#eeeef0` track · `#FF9900` fill 65%)
- "42 days remaining in your trial" · 11px · gray

**Plan Card 2 — Growth Portfolio:**
- White · rounded-xl · border `#eeeef0` · shadow
- "Growth Portfolio" · 16px · 700 + "POPULAR" badge · `#dae2ff` bg · blue text
- "6 Months Validity" · **`#15767E`** · 12px + "₹1,000" · 24px · 700 · right
- Features (3 rows):
  - Star `#FF9900` fill + "Premium visibility"
  - Zap `#FF9900` + "Unlimited incoming requests"
  - ShieldCheck `#FF9900` + "Trust Badge on profile"
- CTA: "Select Plan" · `#FF9900` · full-width · 56px

**Plan Card 3 — Enterprise Business (dark):**
- `bg-[#2f3133]` inverse-surface · rounded-xl · shadow-xl
- Decorative blur: `#0040a1/20%` circle top-right
- "Enterprise Business" · 16px · white · 700
- "1 Year Validity" · `#FFB84D` amber · 12px + "₹2,000" · 24px · white · right
- Features (3 rows with `#FF9900` icons):
  - TrendingUp + "Maximum search prominence" white
  - BarChart + "Full business analytics" white/80%
  - Headphones + "Dedicated support manager" white/80%
- CTA: "Choose Enterprise" · `#FF9900` bg · white bold · shadow `#CC7A00` bottom

**Trust footer (`#f3f3f6` bg · rounded-xl · dashed border `#D1EDEF`):**
- ShieldCheck `#BF953F` 28px + "Secure" caption | divider | "Trusted by 50,000+ Technicians across India." gray

**Fixed bottom CTA:**
- White/90% bg · border top `#eeeef0`
- "Go Premium →" · `#FF9900` bg · full-width · 56px · shadow

---

## ⑦ GOOGLE STITCH — COPY-PASTE SYSTEM PROMPT

> Paste this block at the top of every Stitch screen prompt:

```
Design a mobile app screen for "Nearby" — a hyperlocal on-demand service 
marketplace for India Tier-2/Tier-3 cities. Clean Material Design 3 style, 
Inter font, 390px wide mobile frame.

COLOUR PALETTE:
┌─ PRIMARY ──────────────────────────────────────────────────┐
│  #FF9900  Active Orange  — headers, CTAs, active states    │
│  #CC7A00  Orange Dark    — shadows, pressed states         │
│  #FFF0D6  Orange Light   — chip bg, banner tint            │
├─ SECONDARY ─────────────────────────────────────────────────┤
│  #15767E  Brand Teal     — provider labels, info cards     │
│  #0F5A61  Teal Dark      — teal pressed state              │
│  #D1EDEF  Teal Light     — teal chip bg, explainer cards   │
│  #EBF7F8  Teal Faint     — educational callout bg          │
├─ TRUST SIGNALS (reserved — do not use freely) ──────────────┤
│  #0056D2  Trust Blue     — ONLY encrypted call screen      │
│  #BF953F  Aadhaar Gold   — ONLY verification badges        │
│  #00A389  Success Teal   — online dots, accept button      │
│  #D92D20  Error Red      — logout, missed calls            │
├─ SURFACES ──────────────────────────────────────────────────┤
│  #ffffff  Card bg        — all content cards               │
│  #f9f9fc  Page bg        — screen background               │
│  #f3f3f6  Card inner bg  — input fields, inner sections    │
│  #e8e8ea  Icon containers— neutral chip bg, inactive       │
│  #1a1c1e  Primary text                                     │
│  #424654  Secondary text                                   │
└────────────────────────────────────────────────────────────┘

RULES:
• White cards (#ffffff) on light gray bg (#f9f9fc)
• Icon containers: #e8e8ea neutral ONLY — never orange/teal tinted
• Provider specialty text always in #15767E brand-teal
• Info/educational cards: #EBF7F8 bg + #0A4247 text
• Primary CTAs: #FF9900 orange, 56px height, 14px radius
• Secondary CTAs: #15767E teal outline or #FF9900 orange outline
• NO warm-tinted backgrounds on card interiors

[PASTE SCREEN SPEC BELOW]
```

---

*Nearby App Portfolio · 28 Screens · Version 2.0*  
*Primary: #FF9900 Orange · Secondary: #15767E Brand Teal*  
*Customer: 17 screens · Provider: 11 screens*
