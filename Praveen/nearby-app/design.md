# NEARBY — Google Stitch Design System + Screen Prompts
### Hyperlocal On-Demand Service Marketplace · India Tier-2/Tier-3 Cities
### Color Theme: Brand Yellow Edition · v3.0

---

## ① COLOUR SYSTEM — BRAND YELLOW

### PRIMARY — Active Yellow `#EAB308`
> Optimism · Trust · Warmth · Indian market energy

| Shade | Hex | Name | Used For |
|---|---|---|---|
| 900 Dark | `#78350F` | yellow-900 | Text on light yellow bg, deep shadows |
| 700 Press | `#A16207` | yellow-dim | Button pressed state, CTA shadow colour |
| **500 Brand** | **`#EAB308`** | **active-yellow** | **Hero headers · Primary CTAs · Active tab · Progress bars · Selected chips** |
| 300 Light | `#FDE047` | yellow-light | Gradient end, decorative accents |
| 100 Container | `#FEF9C3` | yellow-container | Chip backgrounds · Promo banner tint · Trial card bg |
| 50 Surface | `#FFFBEB` | yellow-fixed | Faintest row tint · Highlight bg |
| On-Yellow | `#1a1c1e` | on-yellow | **DARK text/icons on yellow bg — NOT white (yellow fails white contrast)** |
| On-Container | `#78350F` | on-yellow-container | Text on yellow-container bg |

> ⚠️ CRITICAL RULE: Yellow `#EAB308` is a bright colour — ALWAYS pair with dark text `#1a1c1e` or dark icons. Never use white text on yellow backgrounds.

### SECONDARY — Brand Teal `#15767E` (unchanged)
| Shade | Hex | Used For |
|---|---|---|
| **500 Brand** | **`#15767E`** | Provider specialty · Info cards · Secondary CTAs |
| 700 Press | `#0F5A61` | Teal pressed state |
| 100 Container | `#D1EDEF` | Teal chip bg · explainer cards |
| 50 Surface | `#EBF7F8` | Educational callout bg |
| On-Teal | `#FFFFFF` | Text on teal bg |
| On-Container | `#0A4247` | Dark text on teal-container |

### ACCENT & STATUS

| Colour | Hex | Reserved For |
|---|---|---|
| Trust Blue | `#0056D2` | ONLY: Encrypted call screen bg · Aadhaar OTP active border |
| Aadhaar Gold | `#BF953F` | ONLY: Aadhaar badge · Verified Pro badge |
| Gold Light | `#FFF8E7` | Gold badge bg, gold tinted row |
| Success | `#00A389` | Online dot · Accept button · Verified checkmark |
| Success Light | `#E0F7F3` | Success row bg |
| Error | `#DC2626` | Logout · Missed/rejected calls · Destructive actions |
| Error Light | `#FEE2E2` | Error row bg |
| Warning | `#F59E0B` | Caution states, pending badges |

### SURFACES

| Token | Hex | Used For |
|---|---|---|
| surface | `#f9f9fc` | Screen background |
| card | `#ffffff` | Primary card background |
| surface-low | `#f3f3f6` | Card inner bg · Input field bg |
| surface-mid | `#eeeef0` | Dividers · Subtle separators |
| surface-high | `#e8e8ea` | Icon containers · Neutral chips · Inactive |
| on-surface | `#1a1c1e` | Primary text |
| on-surface-variant | `#424654` | Secondary text · Captions · Labels |
| outline | `#737785` | Disabled text · Placeholder |
| outline-variant | `#c3c6d6` | Card borders · Row dividers |
| primary-fixed | `#dae2ff` | Customer avatar bg (cool blue tint) |

---

## ② GOOGLE STITCH — MASTER SYSTEM PROMPT

> Copy this block at the TOP of every screen prompt in Stitch:

```
Design a mobile app screen for "Nearby" — a hyperlocal on-demand service
marketplace for India Tier-2/Tier-3 cities. Clean Material Design 3 style,
Inter font, 390px wide mobile frame.

COLOUR PALETTE:
┌─ PRIMARY YELLOW ────────────────────────────────────────────┐
│  #EAB308  Active Yellow  — headers, CTAs, active tab        │
│  #A16207  Yellow Dark    — CTA shadows, pressed states      │
│  #FEF9C3  Yellow Cont.   — chip bg, banner tint             │
│  #FFFBEB  Yellow Surface — faintest row tint, highlight bg  │
├─ SECONDARY TEAL ────────────────────────────────────────────┤
│  #15767E  Brand Teal     — provider labels, info cards      │
│  #0F5A61  Teal Dark      — teal pressed state               │
│  #D1EDEF  Teal Light     — teal chip bg, explainer cards    │
│  #EBF7F8  Teal Faint     — educational callout bg           │
├─ TRUST SIGNALS (reserved — do not use freely) ──────────────┤
│  #0056D2  Trust Blue     — ONLY encrypted call screen       │
│  #BF953F  Aadhaar Gold   — ONLY verification badges         │
│  #00A389  Success Teal   — online dots, accept button       │
│  #DC2626  Error Red      — logout, missed calls             │
├─ SURFACES ──────────────────────────────────────────────────┤
│  #ffffff  Card bg        — all content cards                │
│  #f9f9fc  Page bg        — screen background                │
│  #f3f3f6  Card inner     — input fields, inner sections     │
│  #e8e8ea  Icon container — neutral chip bg, inactive        │
│  #1a1c1e  Primary text                                      │
│  #424654  Secondary text                                    │
└────────────────────────────────────────────────────────────┘

COMPONENT RULES:
• ⚠️ YELLOW CONTRAST LAW: #EAB308 yellow MUST always use dark text #1a1c1e — NEVER white text on yellow
• White cards (#ffffff) on light gray bg (#f9f9fc)
• Icon containers: #e8e8ea neutral ONLY — never yellow/teal tinted
• Provider specialty text always in #15767E brand-teal
• Info/educational cards: #EBF7F8 bg + #0A4247 text
• Primary CTAs: #EAB308 yellow bg, dark text #1a1c1e bold, 56px height, 14px radius, shadow 0 4px 0 #A16207
• Secondary CTAs: #15767E teal outline OR #EAB308 yellow outline with #78350F dark text
• NO warm-tinted backgrounds on card interiors
• Bottom nav active: yellow pill #EAB308/15% + yellow icon #EAB308 + dark bold text #1a1c1e
• Customer app headers: #EAB308 yellow bg, ALL text/icons DARK #1a1c1e (not white)
• Provider app headers: white bg, brand title #92400E dark amber (readable on white), icons #424654 gray
• Toggle ON: #EAB308 yellow pill | Toggle OFF: #e8e8ea gray

[PASTE SCREEN SPEC BELOW]
```

---

## ③ SCREEN PROMPTS — ALL 28 SCREENS

---

### SCREEN 01 — Splash

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Splash
PERSONA: Both users | DURATION: 2 second auto-advance to Welcome | NO interaction

LAYOUT — Full screen yellow gradient:
Background: linear gradient from #A16207 top → #EAB308 center → #FDE047 bottom

CENTER STACK (vertically centered, center-aligned):
1. Nearby logomark — map pin merged with phone icon, dark fill #1a1c1e, 80×80px
2. "nearby" wordmark — #1a1c1e, 36px, weight 800, tracking -0.5px, mt-16px
3. "Your Neighbourhood, On Call" — #1a1c1e at 70% opacity, 14px, weight 400, mt-8px

BOTTOM STRIP (full-width, dark overlay 15%, py-16px px-20px):
Left: Aadhaar shield icon #BF953F gold (16px) + "All Providers are Aadhaar Verified" #1a1c1e/70%, 12px
Right: Rounded-full pill, #1a1c1e/15% bg — lock icon + "Secured by Aadhaar" #BF953F gold text, 11px

STATUS BAR: Dark content (dark icons) — transparent bg (yellow bg behind it)
```

---

### SCREEN 02 — Welcome

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Welcome
PERSONA: Both users | EXIT: Tap CTA → Role Select screen

TOP 55% — Yellow hero block (full bleed, rounded-none):
Background: gradient #EAB308 → #A16207
Content (center-aligned, px-24px, pt-56px):
  • Decorative illustration — abstract city skyline / floating map pins, dark #1a1c1e line art, 120px tall
  • "Welcome to" — #1a1c1e/70%, 13px, uppercase, letter-spacing 0.1em, mt-16px
  • "nearby" — #1a1c1e, 36px, weight 800, tracking -0.5px
  • "Your Neighbourhood, On Call" — #1a1c1e/70%, 14px, mt-8px

BOTTOM 45% — White slide-up card:
Shape: rounded-tl-3xl rounded-tr-3xl, bg #ffffff, px-24px, pt-28px, pb-32px
Content:
  • "Find trusted local professionals" — #1a1c1e, 22px, weight 700, mb-4px
  • "Aadhaar-verified plumbers, electricians, carpenters and more — just a call away." — #424654, 14px, mb-20px

  FEATURE LIST (3 rows, icon left + text right, gap-12px):
  Row 1: Phone icon circle (#FEF9C3 bg, #A16207 icon, 36px) + "Direct call — no middleman" #1a1c1e 14px 500
  Row 2: Shield icon circle (#EBF7F8 bg, #15767E icon, 36px) + "Aadhaar-verified professionals" #1a1c1e 14px 500
  Row 3: MapPin icon circle (#FEF9C3 bg, #A16207 icon, 36px) + "Within 5 km of you" #1a1c1e 14px 500

  PRIMARY CTA: Full-width button, #EAB308 bg, "Get Started →" #1a1c1e 14px bold, 56px height, 14px radius, shadow 0 4px 0 #A16207
  FOOTER: "Already have an account? Sign In" — 12px, center-aligned, #A16207 text link, mt-16px
```

---

### SCREEN 03 — Role Select

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Role Select
PERSONA: Both users | EXIT: Selection + tap Continue → Customer Signup OR Provider Signup

HEADER (white bg, bottom border #eeeef0):
Left: gray back chevron (24px)
Center: "Join Nearby" — #1a1c1e, 18px, weight 700
Right: empty (balanced)

BODY (px-20px, pt-24px):
Heading: "I am a..." — #1a1c1e, 24px, weight 700, mb-4px
Subheading: "Choose your role to get started" — #424654, 14px, mb-24px

CARD 1 — Customer (full-width, mb-12px):
UNSELECTED state: white bg, rounded-2xl, p-20px, border 1px #eeeef0
SELECTED state: bg #FFFBEB, border 2px #EAB308, rounded-2xl, p-20px
  Left: 56×56px circle (#EBF7F8 bg, Home icon #15767E, 24px icon)
  Middle: "Looking for Services" #1a1c1e 16px 700 + "Find and call verified local professionals nearby" #424654 13px
  Right: Radio circle — empty when unselected | filled #EAB308 with dark dot when selected

CARD 2 — Provider (full-width):
UNSELECTED state: white bg, rounded-2xl, p-20px, border 1px #eeeef0
SELECTED state: bg #FFFBEB, border 2px #EAB308, rounded-2xl, p-20px
  Left: 56×56px circle (#FEF9C3 bg, Wrench icon #A16207, 24px icon)
  Middle: "I'm a Professional" #1a1c1e 16px 700 + "Get discovered and receive calls from customers nearby" #424654 13px
  Right: Radio circle — empty/filled same as above

PRIMARY CTA (fixed bottom, px-20px, pb-32px):
"Continue →" — full-width, #EAB308 bg, #1a1c1e text 14px bold, 56px height, 14px radius, shadow 0 4px 0 #A16207
State: 40% opacity until a card is selected, full opacity after selection
```

---

### SCREEN 04 — Customer Signup

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer Signup
PERSONA: Customer | EXIT: Tap Send OTP → Customer OTP screen

HEADER (white bg, bottom border #eeeef0):
Left: gray back chevron
Center: "Sign Up" #1a1c1e 18px 700

ILLUSTRATION BLOCK (mx-20px, mt-16px, h-160px, #FEF9C3 bg, rounded-2xl, overflow hidden):
Center: phone + lock illustration, #A16207 dark amber line art, 80px
Bottom-right overlay pill: white bg, shadow, rounded-full, px-12px py-6px
  Shield icon #15767E (14px) + "Secure Sign-up" #15767E 11px 600

FORM (px-20px, mt-20px, gap-16px):
Field 1:
  Label: "YOUR FULL NAME" — #424654, 11px, weight 600, uppercase, tracking 0.08em, mb-4px
  Input: full-width, 56px, rounded-xl, border 1px #eeeef0, bg #ffffff, px-16px
  Placeholder: "Enter your full name" — #737785
  Focus: border #EAB308, glow shadow 0 0 0 3px #FEF9C3

Field 2:
  Label: "MOBILE NUMBER" — same label style
  Input row: #FEF9C3 bg pill with "+91" #78350F 13px 600 (left, 48px wide, non-editable, rounded-l-xl) + number input (rounded-r-xl, border, flex-1)
  Placeholder: "10-digit mobile number"

Checkbox row (mt-8px):
  Custom checkbox 20×20px — unchecked: border #c3c6d6 rounded-sm | checked: #EAB308 fill, dark #1a1c1e tick
  Label: "I agree to Terms & Privacy Policy" — #424654 13px, "#A16207 underline" on "Terms & Privacy Policy"

PRIMARY CTA (mt-24px): "Send OTP →" full-width #EAB308, #1a1c1e bold, 56px, 14px radius, shadow 0 4px 0 #A16207
FOOTER NOTE: Lock icon #737785 + "By continuing you agree to our Terms of Service" — #737785 11px center-aligned, mt-12px
```

---

### SCREEN 05 — Customer OTP

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer OTP
PERSONA: Customer | EXIT: 4-digit entry + Verify → Customer Address Setup

HEADER (white bg, bottom border #eeeef0):
Left: gray back chevron
Center: "Verify Mobile" #1a1c1e 18px 700

BODY (px-20px, pt-32px, center-aligned):
"Enter OTP" — #1a1c1e, 22px, weight 700, mb-8px
"Sent to +91 98765 43210" — #424654, 14px
"Change number" link — #A16207 underline, inline, mb-32px

OTP INPUT ROW (4 boxes, gap-12px, center-aligned):
Each box: 56×64px, rounded-xl, border 1.5px
  EMPTY state: border #c3c6d6
  FILLED state: border #EAB308, text #78350F 24px 700, bg #FFFBEB
  FOCUS state: border #EAB308, glow shadow 0 0 0 3px #FEF9C3

TIMER (mt-20px, center):
"Resend OTP in" #424654 14px + "0:42" #A16207 14px bold (countdown)
After 0:00: "Resend OTP" #A16207 14px underline replaces timer

PRIMARY CTA (mt-28px): "Verify & Continue →" full-width #EAB308 bg, #1a1c1e bold, 56px
  State: 40% opacity until all 4 boxes filled, fully opaque when complete

TRUST NOTE (mt-16px, row center-aligned):
Lock icon #15767E (14px) + "Your number is never shared with providers" — #737785 12px
```

---

### SCREEN 06 — Customer Address Setup

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer Address Setup
PERSONA: Customer | EXIT: Confirm → Customer Home

HEADER (white bg, bottom border #eeeef0):
Left: back chevron gray
Center: "Your Location" #1a1c1e 18px 700

MAP AREA (mx-20px, mt-16px, h-280px, bg #f3f3f6, rounded-2xl, overflow hidden):
Background: light gray with subtle grid hairlines rgba(21,118,126,0.06)
Center element: Large map pin icon, 48px, #EAB308 fill with dark outline, with pulsing yellow ring animation (2 rings: rgba(234,179,8,0.15) at 60px and rgba(234,179,8,0.08) at 80px)
Bottom center floating pill (white bg, rounded-full, shadow, px-16px py-8px):
  MapPin icon #EAB308 14px + "Detecting your location..." #424654 13px

BELOW MAP (px-20px, mt-16px):
"Confirm your service area" — #1a1c1e, 16px, weight 600, mb-4px
"Sriram Nagar Phase 2, Thanjavur" — #424654, 14px

ADDRESS TYPE CHIPS (horizontal scroll row, mt-16px, gap-8px):
🏠 Home | 🏢 Office | 📍 Other
UNSELECTED chip: white bg, border 1px #eeeef0, #424654 text, rounded-full, px-16px py-8px, 13px
SELECTED chip: #EAB308 bg, #1a1c1e text bold, rounded-full, px-16px py-8px, 13px

PRIMARY CTA (fixed bottom, px-20px, pb-32px):
"Confirm & Start →" full-width #EAB308 bg, #1a1c1e 14px bold, 56px, 14px radius
```

---

### SCREEN 07 — Customer Home

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer Home
PERSONA: Customer | BOTTOM NAV: Home active / History / Profile

HEADER (white bg, bottom border #eeeef0, px-16px, py-12px):
Left column: "Hi Praveen 👋" #1a1c1e 20px 700 | row below: MapPin #EAB308 14px + "Sriram nagar, Thiruvaiyaru" #424654 13px
Right: circular avatar 36px, #dae2ff bg, "P" initial #0056D2 14px 700

SEARCH BAR (mx-16px, mt-12px, mb-16px):
#f3f3f6 bg, rounded-xl, 56px height, border 1px #eeeef0
Left: magnifier icon #737785 | Placeholder: "Search for plumbing, electrical..." #737785 14px
Focus state: border #EAB308, glow shadow 0 0 0 3px #FEF9C3

PROMO BANNER (mx-16px, rounded-2xl, p-20px, gradient #EAB308 → #A16207, overflow hidden):
Top-left: "OFFER" pill — #1a1c1e/20% bg, #1a1c1e 11px bold uppercase, rounded-full, px-8px py-3px
"180 Days Free Trial" — #1a1c1e, 20px, weight 700, mt-8px
"Premium service calls at ₹0 for 6 months" — #1a1c1e/80%, 14px, mt-4px
CTA button: white bg, rounded-xl, "Claim Now" #A16207 13px bold, px-16px py-8px, mt-12px
Decorative: 2 white/10% circles blurred, positioned top-right and bottom-right

TRUST BADGE ROW (mx-16px, mt-16px, #f3f3f6 bg, rounded-xl, px-16px py-12px, border 1px #eeeef0):
ShieldCheck icon #00A389 16px + "All 500+ local professionals are Aadhaar-verified." #424654 12px

SERVICES SECTION (mt-20px, px-16px):
Row: "Our Services" #1a1c1e 16px 700 | "View All" #A16207 13px 600
3×3 GRID (mt-12px, gap-10px):
9 tiles, each: white bg, rounded-xl, border 1px #eeeef0, shadow 0 2px 8px rgba(0,0,0,0.04), aspect-square, p-12px
  Service icon in colored circle (40px), service name 12px 700 center, mt-6px
  Icon circle colours:
    Plumbing #EBF0FF | Electrical #FEF3C7 | Carpentry #FDF3E7
    Painting #FCE7F3 | Civil Mason #F1F5F9 | Tile Mason #ECFEFF
    Appliance #EEF2FF | Bike Mech #FEF2F2 | Puncture #F5F5F4

TOP RATED SECTION (mt-20px, px-16px):
"Top Rated Nearby" #1a1c1e 16px 700, mb-12px
WHITE CARD (rounded-2xl, p-16px, shadow, border 1px #eeeef0):
  Left: 80×80px rounded-xl avatar, #e8e8ea bg, verified teal dot bottom-right 12px circle #00A389
  Right of avatar:
    "Ramesh Kumar" #1a1c1e 18px 700
    "Master Electrician" #15767E 13px 500
    Row: 5 stars #BF953F 12px + "4.9" #1a1c1e 13px bold + "(0.8 km)" #737785 12px, mt-4px
  Action row (mt-12px, gap-8px):
    "Book Service" #EAB308 bg, #1a1c1e 13px bold, rounded-xl, 40px height, flex-1
    Phone icon button: border 1px #EAB308, #A16207 icon, 40×40px, rounded-xl

BOTTOM NAVIGATION (fixed bottom, white bg, top border #eeeef0, height 64px):
3 tabs equally spaced:
  HOME (active): #FEF9C3 pill bg, Home icon #EAB308, "Home" #1a1c1e 11px bold
  HISTORY: PhoneCall icon #737785, "History" #737785 11px
  PROFILE: User icon #737785, "Profile" #737785 11px
```

---

### SCREEN 08 — Plumbing (Service Category)

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Plumbing — Service Category
PERSONA: Customer | EXIT: Tap service card → Providers List

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron 24px (dark, NOT white)
Center: "Plumbing Services" #1a1c1e 18px 700
Right: search icon #1a1c1e 22px

HERO (continues yellow bg, pb-24px, center-aligned):
White circle 60px, centered, Pipe icon #A16207 28px inside
"Book a Plumber" — #1a1c1e, 22px, weight 700, mt-12px
"Tap a service to call verified plumbers nearby" — #1a1c1e/70%, 14px, mt-6px

CONTENT (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-20px, gap-12px):
6 SERVICE CARDS (each: white bg, rounded-2xl, p-16px, shadow 0 2px 8px rgba(0,0,0,0.04), border 1px #eeeef0):

Card structure (horizontal layout):
  Left: 48×48px rounded-xl icon container + service icon 24px
  Center: service name #1a1c1e 14px 700 + description #424654 12px mt-2px
  Right: price pill — #FEF9C3 bg, #78350F text, rounded-full, 11px 600, px-8px py-3px

SERVICES LIST:
1. Pipe Leakage Repair | #FEF9C3 icon bg | "₹150–₹400"
2. Tap / Faucet Fixing | #FEF9C3 icon bg | "₹100–₹250"
3. Bathroom Fitting | #EBF7F8 icon bg | "₹500–₹1,200"
4. Water Tank Cleaning | #EBF7F8 icon bg | "₹400–₹800"
5. Drainage Unclogging | #FEF9C3 icon bg | "₹200–₹500"
6. Geyser Installation | #EBF7F8 icon bg | "₹300–₹700"
```

---

### SCREEN 09 — Providers List

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Providers List
PERSONA: Customer | EXIT: Tap provider card → Provider Detail

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Plumbers Nearby" #1a1c1e 18px 700
Right: filter icon #1a1c1e (sliders icon, 22px)

FILTER CHIPS (horizontal scroll, bg #EAB308 continues, pt-12px, pb-16px, px-20px, gap-8px):
"All" | "Available Now" | "Top Rated" | "Nearest"
ACTIVE chip: white bg, #1a1c1e text, rounded-full, px-16px py-8px, 13px 600
INACTIVE chip: #1a1c1e/20% bg, #1a1c1e/80% text, rounded-full, px-16px py-8px, 13px 400

PROVIDER CARDS LIST (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-16px, gap-12px):
Each card (white bg, rounded-2xl, p-16px, shadow, border 1px #eeeef0):
  LEFT: 48×48px rounded-xl avatar, #dae2ff bg, blue initial letter 16px 700
    Online status dot 10px: #00A389 green (available) or #e8e8ea gray (offline)
  CENTER:
    "Ramesh Kumar" #1a1c1e 15px 700
    "Expert Plumber · 12 yrs" #15767E 12px 500, mt-2px
    Row: 5 stars #BF953F 11px + "4.9" #1a1c1e 12px bold + "(450+)" #737785 12px, mt-4px
    Row: MapPin #EAB308 12px + "0.8 km away" #737785 11px, mt-2px
  RIGHT:
    "Call" button: #EAB308 bg, Phone icon #1a1c1e + "Call" #1a1c1e 13px bold, rounded-xl, px-16px, 40px height

SHOW 4 PROVIDER CARDS in the list
```

---

### SCREEN 10 — Provider Detail

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Detail
PERSONA: Customer | EXIT: Tap bottom CTA → Call Screen

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron
Center: "Rajesh Kumar" #1a1c1e 18px 700
Right: share icon #1a1c1e 22px

HERO SECTION (yellow bg continues, pb-24px, center-aligned):
Avatar: 80×80px circle, #1a1c1e/20% bg, "R" initial #1a1c1e 32px 700
"Verified Pro" badge: #BF953F bg, shield icon white 12px + "Verified Pro" white 11px bold, rounded-full, px-12px py-5px, mb-12px
"Rajesh Kumar" — #1a1c1e, 22px, weight 700
"Electrician · 12 yrs experience" — #1a1c1e/70%, 14px, mt-4px
Stars row: 5 #BF953F stars 16px + "4.9" #1a1c1e 16px bold + "(450+ reviews)" #1a1c1e/60% 13px, mt-8px

CONTENT (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-20px):

STATS ROW (3 equal white cards, rounded-xl, p-12px, border 1px #eeeef0, gap-8px, mb-12px):
Card 1: "128" #A16207 22px 800 + "Jobs Done" #737785 11px below
Card 2: "4.9★" #A16207 22px 800 + "Rating" #737785 11px below
Card 3: "12 yrs" #15767E 22px 800 + "Experience" #737785 11px below

SERVICE AREA CARD (white, rounded-xl, p-16px, border 1px #eeeef0, mb-12px, horizontal row):
MapPin #EAB308 16px + "2.4 km away · Sriram Nagar, Thanjavur" #424654 14px

MAP PLACEHOLDER (h-144px, #f3f3f6 bg, rounded-xl, mb-12px):
Center: 40px yellow circle + MapPin #1a1c1e inside + "2.4 km away" #A16207 12px 600 below pin

SERVICES OFFERED CARD (white, rounded-xl, p-16px, border 1px #eeeef0, mb-12px):
"Services Offered" #1a1c1e 14px 700, mb-8px
Chip row: #e8e8ea bg chips, icon + label, rounded-full, 12px, gap-6px
Chips: Pipe Leakage | Tap Fixing | Bathroom Fitting | Drainage

REVIEWS CARD (white, rounded-xl, p-16px, border 1px #eeeef0):
Header row: "Customer Reviews" #1a1c1e 14px 700 | "4.9/5.0" #A16207 18px 800 right
5 stars #BF953F 14px, mt-4px
2 review rows (divider between):
  40px avatar #dae2ff | "Anitha S" bold + stars + "2 days ago" gray | review text 13px gray

FIXED BOTTOM CTA (white bg, border-top #eeeef0, px-16px, py-12px):
"Call Rajesh Kumar" — full-width #EAB308, Phone icon #1a1c1e left, "Call Rajesh Kumar" #1a1c1e 14px bold, 56px height, shadow 0 4px 0 #A16207
```

---

### SCREEN 11 — In-App Call Screen

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: In-App Call Screen
PERSONA: Customer | EXIT: End Call → Review Status
⚠️ THIS IS THE ONLY SCREEN WITH #0056D2 TRUST BLUE DOMINANT — signals encrypted secure call

FULL SCREEN BACKGROUND: #0056D2 trust blue (NOT yellow — this is deliberate security signal, unchanged)

TOP SECTION (pt-64px, center-aligned):
"Nearby" wordmark — white, 14px, weight 700, letter-spacing 0.05em
"Secure & Encrypted" pill: white/20% bg, lock icon white 12px + "Secure & Encrypted" white 11px, rounded-full, px-12px py-5px, mt-8px

PROVIDER INFO (mt-32px, center):
Avatar: 96×96px circle, white/25% bg, "R" initial white 40px 700
"Rajesh Kumar" — white, 24px, weight 700, mt-16px
"Expert Electrician" — white/70%, 14px, mt-4px

CALLING ANIMATION (mt-24px, center):
"Calling..." text — white/90%, 18px + 3 animated dots (...) pulsing
3 concentric pulsing rings: outer 120px rgba(255,255,255,0.05), mid 80px rgba(255,255,255,0.10), inner 56px rgba(255,255,255,0.15)

INFO CARD (mx-20px, white bg, rounded-3xl, p-20px, shadow 0 20px 60px rgba(0,0,0,0.3), mb-32px):
"Encrypted call via Nearby proxy" — #424654 12px, center, mb-12px
Row: ShieldCheck #00A389 16px + "Your real number is NEVER shared" #00A389 13px 700
Row: Clock #424654 16px + "Usually answers in under 2 min" #424654 12px, mt-8px

ACTION BUTTONS (fixed bottom, pb-40px, center, gap-40px, horizontal row):
Decline: 64×64px circle, #FEE2E2 bg, X icon #DC2626 28px — "End Call" #737785 11px below
Mute: 64×64px circle, #f3f3f6 bg, Mic icon #424654 28px — "Mute" #737785 11px below
```

---

### SCREEN 12 — Review Status

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Review Status (Post-Call)
PERSONA: Customer | ENTRY: Auto after every call | EXIT: → Rating OR → Finding Provider

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Call Review" #1a1c1e 18px 700

BODY (bg #f9f9fc, px-20px, pt-24px):
"How did the call go?" — #1a1c1e, 24px, weight 700, mb-8px
"Let us know so we can help you better" — #424654, 14px, mb-20px

PROVIDER MINI CARD (white, rounded-2xl, p-16px, border 1px #eeeef0, mb-20px):
Left: 48px avatar #dae2ff bg + "R" blue initial
Right: "Rajesh Kumar" #1a1c1e 15px 700 + "Electrician · Called 2 mins ago" #737785 12px

3 OPTION CARDS (gap-12px):

CARD A — Service Accepted:
#E0F7F3 bg, rounded-2xl, p-16px, border 1px #00A389/20%
Left: 48px circle #00A389/15% bg, CheckCircle #00A389 24px
Right: "Service Accepted" #1a1c1e 14px 700 + "Provider is on the way" #424654 12px
→ Navigates to Rating screen

CARD B — Not Answered:
#f3f3f6 bg, rounded-2xl, p-16px, border 1px #eeeef0
Left: 48px circle #e8e8ea bg, Clock #737785 24px
Right: "Not Answered" #1a1c1e 14px 700 + "Call was not answered" #424654 12px
→ Shows Finding Provider state, NO rating

CARD C — Service Rejected:
#FEE2E2 bg, rounded-2xl, p-16px, border 1px #DC2626/20%
Left: 48px circle #DC2626/15% bg, XCircle #DC2626 24px
Right: "Service Rejected" #1a1c1e 14px 700 + "Provider couldn't take the call" #424654 12px
→ Shows Finding Provider state, NO rating

FINDING PROVIDER STATE (alternate full-screen, center-aligned, bg #f9f9fc):
80×80px circle #FEF9C3 bg, Search icon #EAB308 36px, center
"Finding Another Provider" #1a1c1e 22px 700, mt-20px
"We're looking for available providers nearby. Usually under 30 seconds." #424654 14px center, mt-8px, mx-32px
"Back to Home" #EAB308 bg, #1a1c1e bold, px-32px py-14px, rounded-xl, mt-24px
```

---

### SCREEN 13 — Rating

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Rating
PERSONA: Customer | ENTRY: From Review Status → Accepted | EXIT: Submit → Home

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Rate Your Experience" #1a1c1e 17px 700

CONTENT (bg #f9f9fc, px-20px, pt-20px):

PROVIDER CARD (white, rounded-2xl, p-16px, border 1px #eeeef0, mb-24px):
Left: 48px avatar #dae2ff bg + "R" blue initial
Right: "Rajesh Kumar" #1a1c1e 15px 700 + "Electrician" #15767E 13px (teal specialty text)
Below name: "Service completed · Today, 3:45 PM" #737785 12px

STAR RATING (center-aligned, mt-8px, mb-8px):
5 stars, 44×44px each, horizontal row with gap-12px
UNSELECTED: star outline #e8e8ea
SELECTED: star solid fill #EAB308
Dynamic label below: 1★ "Poor" | 2★ "Below average" | 3★ "Average" | 4★ "Good service" | 5★ "Excellent! 🎉"
Label style: #A16207 15px 600, center-aligned, mt-12px

QUALITY CHIPS (mt-24px):
Label: "What went well?" #1a1c1e 14px 600, mb-8px
Horizontal scroll row, gap-8px:
  UNSELECTED chip: #e8e8ea bg, #424654 text, rounded-full, px-16px py-8px, 13px
  SELECTED chip: #EAB308 bg, #1a1c1e text bold, rounded-full, px-16px py-8px, 13px
Chips: "On Time" | "Skilled Work" | "Friendly" | "Clean" | "Fair Price"

COMMENT BOX (mt-20px):
#f3f3f6 bg, rounded-xl, h-80px, border 1px #eeeef0, px-16px, py-12px
Placeholder: "Add a comment (optional)" #737785 14px

PRIMARY CTA (mt-24px):
"Submit Review" full-width #EAB308 bg, #1a1c1e 14px bold, 56px, shadow 0 4px 0 #A16207
```

---

### SCREEN 14 — Customer Call History

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer Call History
PERSONA: Customer | BOTTOM NAV: Home / History active / Profile

HEADER (#EAB308 yellow bg, pt-56px, pb-20px, px-20px):
"Call History" — #1a1c1e, 20px, weight 700, mb-12px
Stats row (gap-12px):
  Pill 1: #1a1c1e/15% bg, rounded-full, px-16px py-8px — "Total Calls:" #1a1c1e/60% 12px + "12" #1a1c1e 14px bold
  Pill 2: same style — "Avg Rating:" #1a1c1e/60% 12px + "4.8★" #1a1c1e 14px bold

CONTENT (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-20px):
Month label: "OCTOBER 2023" — #A16207, 11px, weight 600, uppercase, tracking 0.12em, mb-8px

WHITE CARD (rounded-2xl, overflow hidden, border 1px #eeeef0):
3 ROWS with dividers (border-bottom #eeeef0 between rows):
Each row (p-16px, horizontal):
  Left: 48×48px avatar #dae2ff bg + blue initial
  Center: provider name #1a1c1e 14px 700 + service type #424654 12px + timestamp #737785 11px
  Right column:
    Status badge (rounded-full, px-8px py-3px, 11px 600):
      Answered: #E0F7F3 bg, #00A389 text
      Missed: #eeeef0 bg, #737785 text
      Rejected: #FEE2E2 bg, #DC2626 text
    Action button below:
      "Rate →" #A16207 12px (answered)
      "Find Again" #15767E 12px (missed/rejected)

BOTTOM NAVIGATION (fixed bottom, white bg, top border #eeeef0, height 64px):
Home: icon #737785 | HISTORY (active): PhoneCall #EAB308 + "History" #1a1c1e 11px bold + #FEF9C3 pill bg | Profile: icon #737785
```

---

### SCREEN 15 — Customer Profile

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Customer Profile
PERSONA: Customer | BOTTOM NAV: Home / History / Profile active

HEADER (white bg, bottom border #eeeef0, px-16px, py-12px):
Left: 32px avatar thumbnail #dae2ff bg + "Profile" #92400E 18px 700 (beside avatar — dark amber on white)
Right: Bell icon #424654 22px

PROFILE CARD (mx-16px, mt-16px, white, rounded-xl, p-16px, border 1px #eeeef0, center-aligned):
Avatar: 80px circle, #dae2ff bg, 3px border ring #EAB308, #00A389 verified dot (12px) bottom-right
"Praveen Kumar" #1a1c1e 20px 700, mt-8px
"+91 98765 43210" #424654 14px, mt-2px
"AADHAAR VERIFIED" badge: #FFF8E7 bg, shield icon #BF953F 12px + "AADHAAR VERIFIED" #BF953F 11px 600, rounded-full, px-12px py-4px, mt-8px
"Edit" link #A16207 13px, mt-4px

PLAN CARD (mx-16px, mt-12px, rounded-xl, p-16px, gradient #EAB308 → #A16207, overflow hidden):
Decorative #1a1c1e/10% circles blurred (2 positions top-right, bottom-left)
"CURRENT PLAN" #1a1c1e/70% 11px uppercase tracking-wide
"Free Tier" #1a1c1e 24px 700, mt-4px
Row: "3" #1a1c1e 36px 800 + "Calls Left This Month" #1a1c1e/70% 12px
"Upgrade" button: white bg, #A16207 text 13px bold, rounded-xl, px-16px py-8px, mt-12px

SAVED ADDRESSES CARD (mx-16px, mt-12px, white, rounded-xl, border 1px #eeeef0, p-16px):
Header row: MapPin #EAB308 16px + "Saved Addresses" #1a1c1e 15px 700
Address row: Home icon in #e8e8ea circle (32px) + "Home" #1a1c1e 14px bold + "Sriram Nagar, Thanjavur" #424654 13px
"+ Add New Address": border 1px #EAB308 dashed, #A16207 text 13px, rounded-xl, p-12px, mt-8px, center

SETTINGS LIST (mx-16px, mt-12px, white, rounded-xl, border 1px #eeeef0):
4 rows with dividers:
Row 1: #e8e8ea circle (36px) Bell #424654 | "Notification Settings" #1a1c1e 14px 600 + "Manage alerts" #737785 12px | ChevronRight
Row 2: #e8e8ea circle #00A389 Share | "Share with Friends" + "Invite friends" | ChevronRight
Row 3: #e8e8ea circle #BF953F Help | "Help & Support" + "FAQs & contact" | ChevronRight
Row 4: #e8e8ea circle #737785 Info | "About Nearby" + "Version 1.0.0" | ChevronRight

LOGOUT BUTTON (mx-16px, mt-12px, #FEE2E2 bg, border 1px #DC2626/30%, rounded-xl, p-16px, center):
LogOut icon #DC2626 16px + "Logout" #DC2626 14px bold

FOOTER (center, mt-12px, pb-24px): "App Version 1.0.0 · Proudly Made in India" #737785 11px

BOTTOM NAVIGATION (fixed bottom): Home / History / PROFILE active — User #EAB308 + "Profile" #1a1c1e bold + #FEF9C3 pill
```

---

### SCREEN 16 — Notification Settings

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Notification Settings
PERSONA: Customer | EXIT: Back → Profile

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Notifications" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-16px, pt-20px):

GROUP LABEL: "SERVICE ALERTS" — #737785, 11px, uppercase, tracking 0.1em, mb-8px
WHITE CARD (rounded-2xl, border 1px #eeeef0):
4 TOGGLE ROWS (p-16px each, dividers between):
Each row: Toggle left + label column right
  Row 1: Toggle ON (#EAB308 pill, dark knob #78350F) | "Service Updates" #1a1c1e 14px 600 + "Status of your active bookings" #737785 12px
  Row 2: Toggle OFF (#e8e8ea pill) | "Promotions" + "Special offers & discounts"
  Row 3: Toggle ON | "Account Activity" + "Login alerts & security"
  Row 4: Toggle ON | "App Tips" + "Feature guides"

TOGGLE SPEC: 48×24px pill shape, knob = white circle shadow, ON=#EAB308, OFF=#e8e8ea

GROUP LABEL: "CHANNELS" — same style, mt-20px, mb-8px
WHITE CARD (rounded-2xl, border):
3 TOGGLE ROWS:
  Row 1: ON | "Push Notifications" + "In-app & device alerts"
  Row 2: OFF | "SMS" + "Text message updates"
  Row 3: ON | "WhatsApp" + "Messages on WhatsApp"

LOCKED ROW (opacity-60, mt-12px, white card, rounded-xl, p-16px):
Left: Lock icon #737785 in #e8e8ea circle (32px)
Center: "Scheduled Quiet Hours" #1a1c1e 14px + "Pause notifications at specific times" #737785 12px
Right: "Pro" pill — #FEF9C3 bg, #A16207 text, 11px bold, rounded-full
```

---

### SCREEN 17 — Help Center

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Help Center
PERSONA: Customer | EXIT: Back → Profile

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Help Center" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-16px, pt-20px):

SEARCH BAR (white, rounded-2xl, border 1px #eeeef0, h-52px, px-16px):
Magnifier icon #737785 left + "Search help articles..." #737785 14px placeholder

BROWSE BY TOPIC (mt-20px):
Label: "Browse by Topic" #1a1c1e 15px 700, mb-12px

LARGE CARD (full-width, #FEF9C3 bg, rounded-2xl, p-20px, mb-10px):
56×56px circle white/70% bg, CreditCard #A16207 28px
"Payments" #1a1c1e 16px 700, mt-8px
"Billing, refunds & transactions" #424654 13px

2-COL ROW (gap-10px):
Left card: #E0F7F3 bg, rounded-2xl, p-16px — Star #00A389 24px + "Service Quality" #1a1c1e 14px 700 + "Ratings & feedback" #424654 12px
Right card: #EBF7F8 bg, rounded-2xl, p-16px — Shield #15767E 24px + "Account Access" #1a1c1e 14px 700 + "Login & security" #424654 12px

FAQs (mt-20px, white card, rounded-2xl, border 1px #eeeef0):
Header: "Frequently Asked" #1a1c1e 15px 700, p-16px
3 ACCORDION ROWS (dividers):
Q1: "How do I book a service?" — A: "Tap any service from home, browse providers, tap 'Call' to connect."
Q2: "Is my call secure?" — A: "Yes — calls route via encrypted proxy. Your number is never shared."
Q3: "What if provider doesn't answer?" — A: "Select 'Not Answered' — we instantly find another nearby provider."
ChevronDown/Up right per row.

CONTACT BANNER (mt-12px, white card, rounded-2xl, p-16px, border 1px #eeeef0):
"Still need help?" #1a1c1e 16px 700 + "Mon–Sat, 9am–7pm" #737785 13px, mb-12px
Row gap-8px:
  "Chat with Us" #EAB308 bg, #1a1c1e 13px bold, rounded-xl, h-44px, flex-1
  "Call Support" border 1px #15767E, #15767E text 13px bold, rounded-xl, h-44px, flex-1
```

---

### SCREEN 18 — Provider Signup

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Signup
PERSONA: Provider | EXIT: Continue → Aadhaar Verification

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Join as Pro" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-20px, pt-20px):

ILLUSTRATION BLOCK (h-144px, #FEF9C3 bg, rounded-2xl, overflow hidden, mb-24px):
Center: toolbox / professional briefcase illustration, #A16207 line art, 72px
Bottom-right pill: #EAB308 bg, #1a1c1e "10,000+ Pros Joined" 12px bold, rounded-full, px-12px py-5px

FORM (gap-16px):
Field 1: Label "FULL NAME" + text input
Field 2: Label "MOBILE NUMBER" + +91 prefix input (#FEF9C3 pill bg, #78350F text)
Field 3: Label "PROFESSION / TRADE" + dropdown (ChevronDown right)

TRUST CARD (#FFF8E7 bg, rounded-xl, p-14px, border 1px #BF953F/30%, mb-8px):
Aadhaar shield icon #BF953F 20px + "Aadhaar verification required for safety" #8B6914 13px 500

CHECKBOX: custom #EAB308 fill (dark tick) + "I agree to Terms & Privacy Policy" #424654 13px

PRIMARY CTA (mt-20px): "Continue →" full-width #EAB308 bg, #1a1c1e bold, 56px, shadow 0 4px 0 #A16207
```

---

### SCREEN 19 — Aadhaar Verification

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Aadhaar Verification
PERSONA: Provider | EXIT: Verify OTP → Provider Address Setup

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Verify Identity" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-20px, pt-32px, center-aligned):

SHIELD BADGE (center, mb-20px):
96×96px circle, border 4px #BF953F gold ring, bg #FFF8E7
Shield icon #BF953F 48px centered inside

"Aadhaar Verification" — #1a1c1e, 22px, weight 700, center
"Your identity is kept secure and private" — #424654, 14px, center, mt-6px, mb-28px

AADHAAR INPUT:
Label: "AADHAAR NUMBER" #424654 11px uppercase tracking-wide, mb-4px
Input: 56px, rounded-xl, border 1px #eeeef0, bg white, px-16px
Placeholder: "XXXX XXXX XXXX" — #737785
Right: lock icon #737785

"Get OTP →" full-width #EAB308 bg, #1a1c1e bold, 56px, mt-16px

OTP STATE (shown after Get OTP tap):
"OTP sent to Aadhaar-linked mobile" #424654 13px center, mt-16px mb-12px
4-BOX OTP: 56×64px each, rounded-xl
  ⚠️ ACTIVE BOX: border 2px #0056D2 TRUST BLUE (deliberate exception — government verification context)
  FILLED BOX: border #EAB308, text #78350F
Timer: "Resend in" + countdown #A16207 bold

INFO CARD (mt-20px, #FFF8E7 bg, rounded-xl, p-14px, border 1px #BF953F/20%):
Shield #BF953F 16px + "Your Aadhaar data is encrypted and never stored" #8B6914 12px 500
```

---

### SCREEN 20 — Provider Address Setup

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Address / Service Area Setup
PERSONA: Provider | EXIT: Set Area → Services Selection

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Service Area" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-20px, pt-24px):
"Where do you serve?" — #1a1c1e, 22px, weight 700, mb-6px
"Set your primary work area" — #424654, 14px, mb-20px

MAP AREA (h-176px, #f3f3f6 bg, rounded-2xl, overflow hidden, mb-20px):
Grid hairlines rgba(21,118,126,0.06)
Center: 48px #EAB308 map pin (filled, dark outline), with 2 pulsing rings (rgba(234,179,8,0.15) at 64px and rgba(234,179,8,0.08) at 84px)
Bottom-center floating pill: white bg, rounded-full, shadow, px-16px py-8px
  "Greater Noida, Uttar Pradesh" #1a1c1e 13px 500

RADIUS CHIPS (horizontal scroll, gap-8px, mb-24px):
"2 km" | "5 km" | "10 km" | "15 km"
SELECTED: #EAB308 bg, #1a1c1e text bold, rounded-full, px-20px py-10px, 14px 600
UNSELECTED: white bg, border 1px #eeeef0, #424654 text, same size

PRIMARY CTA: "Set My Area →" full-width #EAB308 bg, #1a1c1e bold, 56px
```

---

### SCREEN 21 — Services Selection

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Services Selection (Provider Onboarding)
PERSONA: Provider | EXIT: Continue → Skills & Experience

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Your Services" #1a1c1e 18px 700

CONTENT (bg #f9f9fc, px-16px, pt-24px):
"What services do you offer?" — #1a1c1e, 22px, weight 700, mb-6px
"Select all that apply · up to 5" — #424654, 14px, mb-20px

3×3 GRID (gap-10px):
Each tile: white bg, rounded-2xl, border 1px #eeeef0, aspect-square, p-14px, shadow

UNSELECTED tile: white bg, service icon in colored circle (40px), service name #1a1c1e 13px 700 center-bottom
SELECTED tile: border 2px #EAB308, bg #FFFBEB, CheckCircle #EAB308 18px fill at bottom-right corner

9 SERVICES:
Plumbing (#EBF0FF) | Electrical (#FEF3C7) | Carpentry (#FDF3E7)
Painting (#FCE7F3) | Civil Mason (#F1F5F9) | Tile Mason (#ECFEFF)
Appliance (#EEF2FF) | Bike Mech (#FEF2F2) | Puncture (#F5F5F4)

Show Plumbing + Electrical as SELECTED, rest unselected

PRIMARY CTA (fixed bottom, px-20px, pb-32px):
"Continue (2 selected) →" full-width #EAB308 bg, #1a1c1e bold, 56px
```

---

### SCREEN 22 — Skills & Experience

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Skills & Experience (Provider Onboarding Step 3)
PERSONA: Provider | EXIT: Preview Profile → Profile Preview screen

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Your Skills" #1a1c1e 18px 700

PROGRESS STEPS (yellow bg continues, pb-20px, px-20px):
4 dots in horizontal row with connecting lines:
  Step 1 (done): 12px circle #EAB308 fill — Step 2 (done): 12px circle #EAB308 fill — Step 3 (current): 12px circle #15767E fill — Step 4 (pending): 12px circle #e8e8ea
  Lines: #EAB308 for completed segments, #e8e8ea for pending

CONTENT (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-24px):

YEARS OF EXPERIENCE:
"Years of Experience" #1a1c1e 14px 600, mb-8px
CHIP ROW (flex-wrap, gap-8px):
"1 yr" | "2 yrs" | "3 yrs" | "5 yrs" | "8 yrs" | "10+ yrs" | "15+ yrs"
SELECTED chip: #EAB308 bg, #1a1c1e 13px 600, rounded-full, px-16px py-8px
UNSELECTED: #e8e8ea bg, #424654 13px, rounded-full, px-16px py-8px

YOUR SKILLS:
"Your Skills" #1a1c1e 14px 600, mb-8px
WHITE CARD (rounded-xl, border 1px #eeeef0):
7 ROWS with dividers, each p-14px:
  Checkbox: unchecked=border #c3c6d6 | checked=#EAB308 fill, dark tick #78350F
  Skill name #1a1c1e 14px 600 + cert note #737785 12px
  Show 3 checked: Pipe Fitting | Bathroom Renovation | Tap Repair
  Show 4 unchecked: Leak Detection | Drain Cleaning | Tank Installation | Geyser Service

CERTIFICATIONS:
"Certifications (optional)" #1a1c1e 14px 600, mb-8px
Input: #f3f3f6 bg, rounded-xl, h-52px, border 1px #eeeef0
Placeholder: "e.g. ITI Plumbing, NSDC Certificate" #737785

PRIMARY CTA: "Preview Profile →" full-width #EAB308 bg, #1a1c1e bold, 56px
```

---

### SCREEN 23 — Profile Preview

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Profile Preview
PERSONA: Provider | EXIT: Finish Setup → Provider Dashboard

HEADER (#EAB308 yellow bg, pt-56px, pb-16px, px-20px):
Left: #1a1c1e back chevron (dark)
Center: "Preview" #1a1c1e 18px 700
Right: edit pencil icon #1a1c1e

CONTENT (bg #f9f9fc, px-16px, pt-20px):

PROFILE CARD (white, rounded-2xl, p-20px, border 1px #eeeef0, center-aligned):
Avatar: 80×80px circle, #e8e8ea bg, #00A389 verified dot 14px bottom-right
"Ramesh Kumar" #1a1c1e 20px 700, mt-8px
"Expert Plumber" #15767E 14px 500 + " · 12 yrs" #737785 14px
Stars: 5 stars #EAB308 14px + "4.9" #1a1c1e 14px bold + "0 reviews" #737785, mt-6px

SKILLS CHIPS (mt-12px, horizontal scroll, gap-6px):
#e8e8ea bg, rounded-full, 12px: Pipe Fitting | Bathroom Renovation | Tap Repair

SERVICE AREA (white card, rounded-xl, p-16px, border 1px #eeeef0, mt-12px):
MapPin #EAB308 16px + "Greater Noida · 5 km radius" #424654 14px

HOW IT WORKS CARD (mt-12px, #EBF7F8 bg, rounded-2xl, p-16px, border 1px dashed #D1EDEF):
Info icon #15767E 20px, mb-8px
"Once live, customers see your profile when searching for plumbers. They tap 'Call' — the call comes directly to your phone."
Text: #0A4247, 13px, 400, line-height 1.5

2-BUTTON ROW (mt-24px, gap-10px):
"Edit Profile" — border 1px #EAB308, #A16207 text 14px 600, rounded-xl, h-52px, flex-1
"Finish Setup →" — #EAB308 bg, #1a1c1e 14px bold, rounded-xl, h-52px, flex-1
```

---

### SCREEN 24 — Provider Dashboard

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Dashboard
PERSONA: Provider | BOTTOM NAV: Dashboard active / Calls / Account

HEADER (white bg, bottom border #eeeef0, px-16px, py-12px):
Left: 32px avatar #e8e8ea bg + "R" initial + "Dashboard" #92400E 18px 700 (dark amber on white)
Right: "VERIFIED" badge — #FEF9C3 bg, Shield icon #A16207 12px + "VERIFIED" #78350F 11px bold, rounded-full, px-10px py-4px

BODY (px-16px, bg #f9f9fc, gap-12px):
"Welcome back," — #424654, 14px, mt-16px
"Hi Ramesh" — #A16207, 32px, weight 800, mt-2px

TRIAL CTA CARD (#FEF9C3 bg, rounded-xl, p-20px, border 1px #FDE047/60%, overflow hidden):
Decorative #1a1c1e/05% circle top-right, blurred
"180 Days Free Trial" #1a1c1e 16px 700
"Enjoy premium features & priority leads" #424654 14px, mt-4px
"Check Status" button: white bg, #A16207 text 13px bold, rounded-xl, px-16px py-8px, mt-12px

MARKET DEMAND CARD (white, rounded-xl, p-20px, border 1px #eeeef0):
Left: 56×56px circle #FEF9C3 bg, Users icon #A16207 24px
Right: "MARKET DEMAND" #737785 11px uppercase + "150+ customers nearby" #1a1c1e 22px 700

MONTHLY REPORT CARD (#f3f3f6 bg, rounded-xl, p-20px, border 1px #eeeef0):
Header: BarChart #A16207 20px + "Monthly Report" #1a1c1e 16px 700 + "Details →" #A16207 13px right
3-STAT ROW (mt-16px, equal columns):
  Col 1: "42" #A16207 28px 800 + "Calls Received" #737785 11px center
  Col 2: "5" #DC2626 28px 800 + "Missed" #737785 11px center
  Col 3: "12" #15767E 28px 800 + "Messages" #737785 11px center

RECENT REQUESTS:
"Recent Requests" #1a1c1e 16px 700 + "View All" #A16207 13px right
3 REQUEST CARDS (gap-8px, each white, rounded-xl, p-14px, border 1px #eeeef0):
  Left: 48px avatar #dae2ff bg + green online dot
  Center: name #1a1c1e 14px 700 + "Plumber requested" #15767E 12px + "0.8 km away" #737785 11px
  Right: 44×44px circle #EAB308 bg, Phone #1a1c1e 20px

BOTTOM NAVIGATION (fixed bottom, white bg, top border #eeeef0, 64px):
DASHBOARD active: #FEF9C3 pill, LayoutDashboard #EAB308, "Dashboard" #1a1c1e bold
CALLS: PhoneCall #737785 | ACCOUNT: User #737785
```

---

### SCREEN 25 — Incoming Call (Provider Side)

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Incoming Call — Provider Side
PERSONA: Provider | EXIT: Accept → Calls / Decline → Dashboard

FULL SCREEN BACKGROUND: #FFFBEB yellow-fixed (warm, soft yellow — provider side)

MAP GRID (absolute layer): hairlines rgba(234,179,8,0.08) yellow tint

HEADER PILL (center, pt-56px):
White rounded-full, shadow, px-20px py-10px
Green dot #00A389 10px + "Incoming Request" #1a1c1e 15px 600

CENTER ANIMATION (absolute center):
Outer ring: 160px circle rgba(234,179,8,0.08)
Middle ring: 96px circle rgba(234,179,8,0.15)
Core: 64px circle #EAB308 bg, MapPin #1a1c1e 28px, yellow glow shadow 0 0 30px rgba(234,179,8,0.5)
Below: white rounded-full pill, shadow — "1.2 km away" #A16207 13px bold

REQUEST CARD (mx-16px, absolute bottom-safe, white bg, rounded-3xl, p-20px, shadow 0 20px 60px rgba(234,179,8,0.2)):
Header: "INCOMING REQUEST" #737785 11px uppercase | Rating badge: #FFF3CD bg, gold star + "4.9" #8B6914 13px right
"Praveen Kumar" #1a1c1e 20px 700, mt-4px

SERVICE ROW (#f3f3f6 bg, rounded-2xl, p-14px, mt-12px):
40×40px #FEF9C3 bg rounded-xl, MapPin #A16207 20px
"Plumbing - Tap Fixing" #1a1c1e 14px 700 + "Sriram Nagar Phase 2" #424654 12px

Job value (mt-10px): "Estimated job value:" #737785 13px + "₹250–₹400" #00A389 14px 700

ACTION BUTTONS (mt-16px, gap-10px, h-56px each):
DECLINE: #e8e8ea bg, X icon #737785 + "Decline" #737785 14px, rounded-2xl, flex-1
ACCEPT: #00A389 bg, PhoneCall white + "Accept" white 14px 700, rounded-2xl, flex-1, shadow 0 4px 0 #007A66
```

---

### SCREEN 26 — Provider Call History

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Call History
PERSONA: Provider | BOTTOM NAV: Dashboard / Calls active / Account

HEADER (#EAB308 yellow bg, pt-56px, pb-20px, px-20px):
Profile row: 48×48px avatar #1a1c1e/20% bg + "R" #1a1c1e initial + "Ramesh Kumar" #1a1c1e 15px 700
Right: Bell icon #1a1c1e/70% in #1a1c1e/15% circle
"Expert Plumber" #1a1c1e/60% 12px

"Call History" #1a1c1e 20px 700, mt-16px
Stats row (gap-12px):
  Pill: #1a1c1e/15% bg, rounded-full, px-16px py-8px — "128" #1a1c1e 14px bold + " Total Calls" #1a1c1e/60% 12px
  Pill: same — "92%" #1a1c1e 14px bold + " Answer Rate" #1a1c1e/60% 12px

CONTENT (bg #f9f9fc, rounded-tl-3xl rounded-tr-3xl, px-16px, pt-20px):
Month label: "OCTOBER 2023" #A16207 11px 600 uppercase tracking-widest, mb-8px

WHITE CARD (rounded-2xl, border 1px #eeeef0, overflow hidden):
3 CALL ROWS (p-16px each, dividers):
  Left: 40×40px avatar #dae2ff bg + blue initial
  Center: customer name #1a1c1e 14px 700 + service #424654 12px
  Right:
    Answered: CheckCircle #00A389 + "Answered" #00A389 + "₹550" #15767E bold
    Missed: PhoneMissed #737785 + "Missed" #737785
    Rejected: XCircle #DC2626 + "Rejected" #DC2626
    Call-back btn 36px: answered=#FEF9C3 bg Phone #A16207 | missed=#e8e8ea bg Phone #737785

TRUST CARD (mt-16px, #FFF8E7 bg, rounded-2xl, p-16px, border 1px #BF953F/20%):
ShieldCheck #BF953F 24px + "Aadhaar Verified Professional" #8B6914 14px 700 + sub-note #8B6914/70% 12px

BOTTOM NAVIGATION: Dashboard / CALLS active (#FEF9C3 pill, PhoneCall #EAB308, "Calls" #1a1c1e bold) / Account
```

---

### SCREEN 27 — Provider Account

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Provider Account
PERSONA: Provider | BOTTOM NAV: Dashboard / Calls / Account active

HEADER (white bg, bottom border #eeeef0, px-16px, py-12px):
Left: 32px avatar + "Account" #92400E 18px 700 (dark amber on white)
Right: Edit pencil #424654 22px

PROFILE HEADER CARD (mx-16px, mt-16px, white, rounded-xl, p-16px, border 1px #eeeef0, overflow hidden):
TOP-RIGHT CORNER BADGE: #BF953F bg, "Verified Pro" shield white + text white 11px bold, rounded-bl-xl, px-12px py-6px, absolute
Avatar: 96×96px circle #e8e8ea bg, #00A389 dot bottom-right glow
"Ramesh Kumar" #1a1c1e 22px 700 + pencil #737785 16px, mt-8px
"Expert Plumber" #15767E 14px 500 + " · 12+ Years Exp." #737785 14px
Stars #EAB308 + "4.9" #1a1c1e 14px bold + "(450+ Reviews)" #737785, mt-6px

SUBSCRIPTION CARD (mx-16px, mt-12px, #FEF9C3/40% bg, rounded-xl, border 1px #FDE047/40%, p-16px):
"ACTIVE PLAN" pill: #EAB308 bg, #78350F text 11px bold, rounded-full, px-10px py-3px, mb-8px
"Introductory Trial" #1a1c1e 16px 700
"Unlimited leads until end of the month." #424654 14px, mt-4px
"Upgrade to Premium" full-width #EAB308 bg, #1a1c1e bold, 56px, mt-12px

SERVICE AREAS (mx-16px, mt-12px, white, rounded-xl, p-16px, border 1px #eeeef0):
"Service Areas" #1a1c1e 15px 700 + MapPin in #FEF9C3 circle (#A16207) right
"Greater Noida & Noida West" #424654 13px, mt-4px
Map mock (h-112px, #e8e8ea bg, rounded-xl): pulsing #EAB308 dot center

SERVICES OFFERED (mx-16px, mt-12px, white, rounded-xl, p-16px, border 1px #eeeef0):
"Services Offered" #1a1c1e 15px 700 + "Edit" #A16207 13px right
Chip grid: #e8e8ea bg, rounded-full, icon + label

SETTINGS LIST (mx-16px, mt-12px, white, rounded-xl, border 1px #eeeef0):
Row 1: #00A389/10% circle, ShieldCheck #00A389 — "Verification Status" + "100% Verified" #00A389
Row 2: #15767E/10% circle, Globe #15767E — "Language Preference" + "English, Tamil"
Row 3: #e8e8ea circle, HelpCircle #737785 — "Help & Support"
Row 4: #DC2626/10% circle, LogOut #DC2626 — "Logout" #DC2626 bold
All rows: ChevronRight + dividers

BOTTOM NAVIGATION: Dashboard / Calls / ACCOUNT active (#FEF9C3 pill, User #EAB308, "Account" #1a1c1e bold)
```

---

### SCREEN 28 — Growth Plans

```
[PASTE MASTER SYSTEM PROMPT ABOVE THIS LINE]

SCREEN: Growth Plans
PERSONA: Provider | ENTRY: Account → Upgrade | EXIT: Back → Account

HEADER (white bg, bottom border #eeeef0, px-16px, py-12px):
Left: back chevron #424654
Center: "Account" #92400E 18px 700 (dark amber on white)

CONTENT (px-16px, pt-20px):
"Grow Your Business" #1a1c1e 24px 700, mb-6px
"Choose a plan that fits your growth goals." #424654 14px, mb-20px

PLAN CARD 1 — Introductory Trial (ACTIVE):
white bg, border 2px #EAB308, rounded-xl, p-20px, box-shadow 0 0 20px rgba(234,179,8,0.15)
TOP-RIGHT TAB: #EAB308 bg, "ACTIVE" #1a1c1e 11px bold, rounded-bl-xl, px-12px py-6px
"Introductory Trial" #1a1c1e 16px 700 + "2 Months Validity" #A16207 12px 600
"₹0" #1a1c1e 32px 800 right-aligned
Feature: CheckCircle #00A389 14px + "Basic listing in local area" #424654 13px
Progress bar (h-8px): #eeeef0 track, #EAB308 fill 65%, rounded-full
"42 days remaining in your trial" #737785 11px, mt-6px

PLAN CARD 2 — Growth Portfolio:
white bg, border 1px #eeeef0, rounded-xl, p-20px, shadow
"Growth Portfolio" #1a1c1e 16px 700 | "POPULAR" badge #dae2ff bg #0056D2 text 11px
"6 Months Validity" #15767E 12px + "₹1,000" #1a1c1e 24px 700 right
3 features: Star #EAB308 + text | Zap #EAB308 + text | ShieldCheck #EAB308 + text
"Select Plan" full-width #EAB308 bg, #1a1c1e bold, 56px, mt-16px

PLAN CARD 3 — Enterprise (dark card):
#2f3133 bg, rounded-xl, p-20px, shadow-xl
Decorative blur: rgba(234,179,8,0.15) circle 80px top-right
"Enterprise Business" white 16px 700 | "1 Year Validity" #FDE047 12px + "₹2,000" white 24px 700 right
3 features: TrendingUp #EAB308 + "Maximum search prominence" white
             BarChart #EAB308 + "Full business analytics" white/80%
             Headphones #EAB308 + "Dedicated support manager" white/80%
"Choose Enterprise" #EAB308 bg, #1a1c1e bold, rounded-xl, 56px, shadow 0 4px 0 #A16207, mt-16px

TRUST FOOTER (#f3f3f6 bg, rounded-xl, p-16px, border 1px dashed #D1EDEF, mt-12px):
ShieldCheck #BF953F 24px + "Secure" #8B6914 11px | divider | "Trusted by 50,000+ Technicians across India." #424654 13px

FIXED BOTTOM (white/90% bg, border-top #eeeef0, px-16px, py-12px):
"Go Premium →" full-width #EAB308 bg, #1a1c1e bold, 56px
```

---

## ④ QUICK COLOUR SWAP REFERENCE

| Previous Red | New Yellow | Context |
|---|---|---|
| `#E8312A` | `#EAB308` | Brand primary — all CTA/header uses |
| `#B91C1C` | `#A16207` | Shadow / pressed state |
| `#F87171` | `#FDE047` | Light gradient accent |
| `#FEE2E2` | `#FEF9C3` | Container / banner tint |
| `#FFF5F5` | `#FFFBEB` | Surface / faintest tint |
| `#7F1D1D` | `#78350F` | Text on container bg |
| white on red | `#1a1c1e` dark on yellow | ⚠️ CRITICAL: yellow needs dark text |
| `#C0392B` error | `#DC2626` | Error (now distinct from yellow brand) |

**Provider white-bg headers:** Brand title uses `#92400E` (dark amber) — yellow `#EAB308` on white has poor contrast.

Everything unchanged:
- Teal: `#15767E` ✓
- Trust Blue: `#0056D2` ✓ (call screen only)
- Aadhaar Gold: `#BF953F` ✓
- Success: `#00A389` ✓
- All surfaces ✓

---

*Nearby App · Yellow Edition · 28 Screens*
*Primary: #EAB308 Active Yellow · Secondary: #15767E Brand Teal*
*Customer Flow: Screens 01–17 · Provider Flow: Screens 18–28*
