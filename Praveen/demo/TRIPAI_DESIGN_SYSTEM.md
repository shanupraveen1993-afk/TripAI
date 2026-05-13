# TripAI Design System
> Complete Reference — React + Tailwind CSS v4 | Flowbite-derived tokens + custom semantic extension

---

## 1. Design Tokens

### 1.1 Color — Brand (Primary Blue)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand` | `#1C64F2` | Primary CTA, active tabs, links, focus rings |
| `--color-brand-strong` | `#1A56DB` | Hover on primary buttons |
| `--color-brand-active` | `#1E429F` | Pressed / active state |
| `--color-brand-softer` | `#EBF5FF` | Subtle hover background, chip bg |
| `--color-brand-soft` | `#E1EFFE` | Focus rings, badge background |
| `--color-brand-medium` | `#C3DDFD` | Hover-state backgrounds |
| `--color-brand-border` | `#A4CAFE` | Borders on brand elements |

### 1.2 Color — Tab Accents
Each tab carries its own full accent identity. These are the canonical values — do not swap.

| Tab | Token | Hex | Soft BG | Soft BG Hex |
|-----|-------|-----|---------|-------------|
| **Hotels** | `--color-brand` | `#1C64F2` | `--color-brand-softer` | `#EBF5FF` |
| **Food** | `--color-food` | `#D97706` | `--color-food-soft` | `#FFF7ED` |
| **Itinerary** | `--color-itinerary` | `#7C3AED` | `--color-itinerary-soft` | `#F5F3FF` |
| **Explore** | `--color-explore` | `#059669` | `--color-explore-soft` | `#ECFDF5` |

```css
/* index.css — add to @theme block */
--color-food:             #D97706;
--color-food-soft:        #FFF7ED;
--color-food-border:      #FDE68A;
--color-itinerary:        #7C3AED;
--color-itinerary-soft:   #F5F3FF;
--color-itinerary-medium: #DDD6FE;
--color-explore:          #059669;
--color-explore-soft:     #ECFDF5;
--color-explore-medium:   #A7F3D0;
```

### 1.3 Color — Accent (Purple)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#9061F9` | Secondary highlight, AI badges |
| `--color-accent-strong` | `#7E3AF2` | Accent hover (alias: `--color-vibe`) |
| `--color-accent-soft` | `#EDEBFE` | Badge backgrounds |
| `--color-accent-medium` | `#DCD7FE` | Accent borders |

> **Note:** `--color-vibe` (`#7E3AF2`) is a documented alias of `--color-accent-strong`. Use `--color-accent-strong` in new code; `vibe` is kept for backward compatibility only.

### 1.4 Color — Semantic
| Role | Token | Hex | Strong | Soft | Medium |
|------|-------|-----|--------|------|--------|
| Success | `--color-success` | `#0E9F6E` | `#057A55` | `#DEF7EC` | `#31C48D` |
| Danger | `--color-danger` | `#F05252` | `#E02424` | `#FDE8E8` | `#F98080` |
| Warning | `--color-warning` | `#FACA15` | `#E3A008` | `#FDF6B2` | `#FCE96A` |

Semantic usage rules:
- **Success** — "Open" badge, traffic Light, confirm CTA, directions button
- **Danger** — "Closed" badge, traffic Heavy, delete / logout, error state
- **Warning** — traffic Moderate, star ratings, cautionary banners

### 1.5 Color — Neutrals & Surfaces
| Token | Hex | Tailwind equiv. | Usage |
|-------|-----|-----------------|-------|
| `--color-bg-app` | `#F9FAFB` | gray-50 | Page background |
| `--color-surface` | `#FFFFFF` | white | Card surfaces, modals, inputs |
| `--color-heading` | `#111827` | gray-900 | Primary text, place names |
| `--color-body` | `#374151` | gray-700 | Body copy, descriptions |
| `--color-muted` | `#6B7280` | gray-500 | Secondary text, metadata |
| `--color-placeholder` | `#9CA3AF` | gray-400 | Input placeholders |
| `--color-border` | `#E5E7EB` | gray-200 | Default borders, dividers |
| `--color-border-medium` | `#D1D5DB` | gray-300 | Focused borders |
| `--color-card-border` | `#E1EFFE` | blue-100 | Card borders (brand-tinted) |
| `--color-dark` | `#1F2937` | gray-800 | Dark surface, profile hero |
| `--color-dark-surface` | `#111827` | gray-900 | Deepest dark sections |

### 1.6 Color — Dark Mode (Overlay Layer)
| Token | Light | Dark |
|-------|-------|------|
| `--color-bg-app` | `#F9FAFB` | `#0B0F1E` |
| `--color-surface` | `#FFFFFF` | `#111827` |
| `--color-heading` | `#111827` | `#F9FAFB` |
| `--color-body` | `#374151` | `#9CA3AF` |
| `--color-muted` | `#6B7280` | `#6B7280` |
| `--color-border` | `#E5E7EB` | `#1F2937` |
| `--color-surface-elevated` | `#FFFFFF` | `#1F2937` |

---

## 2. Typography

### 2.1 Font Families
| Token | Value | Role |
|-------|-------|------|
| `--font-display` | `Outfit, sans-serif` | All headings H1–H3, hero text |
| `--font-sans` | `Inter, ui-sans-serif, system-ui` | Body, labels, buttons, metadata |

Loading order (index.html):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### 2.2 Type Scale
| Level | Font | Weight | Size | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|------|-------------|----------------|-------|
| **Display Hero** | Outfit | 900 | clamp(2rem, 5vw, 3.2rem) | 1 (none) | −0.03em | City-lock "LIVE IN THANJAVUR" |
| **H1** | Outfit | 900 | 2xl–4xl (1.5–2.25rem) | tight (1.25) | −0.025em | Landing hero, modal titles |
| **H2** | Outfit | 900 | xl–2xl (1.25–1.5rem) | tight (1.25) | −0.02em | Section headers, panel titles |
| **H3** | Outfit | 600 | base–lg (1–1.125rem) | snug (1.375) | 0 | Place names, card headings |
| **Body LG** | Inter | 500 | base (1rem / 16px) | relaxed (1.625) | 0 | Lead paragraphs, review text |
| **Body** | Inter | 400 | sm (0.875rem / 14px) | relaxed (1.625) | 0 | Descriptions, AI notes, tips |
| **Body SM** | Inter | 400 | xs (0.75rem / 12px) | relaxed (1.625) | 0 | Secondary metadata, timestamps |
| **Label** | Inter | 600 | xs (0.75rem / 12px) | tight (1.25) | +0.05em (wide) | Form labels — UPPERCASE |
| **Tab** | Inter | 700 | 10px | tight | +0.05em | Tab labels — UPPERCASE |
| **Badge / Mono** | Inter | 600 | xs (0.75rem) | tight | 0 | Prices, ratings, counts, badge text |
| **Caption** | Inter | 400 | xs (0.75rem) | relaxed | 0 | Helper text, fine print |

### 2.3 Gradient Text (Brand Signature)
```css
/* Blue → Purple → Green — hero headlines only */
.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 55%, #34D399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 2.4 Typography Do's & Don'ts
- **Do** use Outfit 900 for all hero + section headline moments
- **Do** use Inter 500 for body copy where readability matters
- **Do** use UPPERCASE + tracking-wide for labels and tab text
- **Don't** use Outfit for body paragraphs — Inter only below H3
- **Don't** mix font-weights on the same line without semantic reason
- **Don't** use gradient text on anything smaller than H2

---

## 3. Spacing System

### 3.1 Tokens
| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--spacing-1` | 4px | gap-1 | Icon-to-label gap, tight inline |
| `--spacing-1-5` | 6px | gap-1.5 | Badge internal padding |
| `--spacing-2` | 8px | gap-2 | Chip internal gap, small row gap |
| `--spacing-3` | 12px | gap-3 | Standard button gap, tag row gap |
| `--spacing-4` | 16px | gap-4 | Card internal section gap |
| `--spacing-5` | 20px | gap-5 | Card padding (sm) |
| `--spacing-6` | 24px | gap-6 | Card padding (md), section gap |
| `--spacing-8` | 32px | gap-8 | Section padding, large gap |
| `--spacing-10` | 40px | gap-10 | Page section top/bottom |
| `--spacing-12` | 48px | gap-12 | Hero padding |

### 3.2 Padding Conventions
| Context | Padding |
|---------|---------|
| Card (sm) | `p-4` (16px) |
| Card (md) | `p-5` (20px) — default |
| Card (lg) | `p-6` (24px) |
| Input field | `px-3 py-2.5` |
| Button (md) | `px-4 py-2.5` |
| Page wrapper | `px-4` → `sm:px-6` → `xl:px-[304px]` |
| Section vertical | `py-8` → `md:py-12` |

---

## 4. Border Radius

### 4.1 Scale
| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--radius-sm` | 6px | rounded | Micro chips, tight badges |
| `--radius-md` | 8px | rounded-lg | Buttons, inputs, small cards |
| `--radius-lg` | 12px | rounded-xl | Cards, panels, modals sections |
| `--radius-xl` | 16px | rounded-2xl | Modals, large panels, hero cards |
| `--radius-2xl` | 20px | rounded-[20px] | Bottom sheet, drawer edges |
| `--radius-full` | 9999px | rounded-full | Pills, badges, avatars, toggle |

```css
/* index.css — @theme block */
--radius-sm:   6px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  20px;
--radius-full: 9999px;
```

### 4.2 Usage Rules
- **Buttons** → `rounded-lg` (8px) default; `rounded-full` for pill variants
- **Inputs** → `rounded-lg` (8px)
- **Cards** → `rounded-xl` (12px)
- **Modals** → `rounded-2xl` (16px)
- **Badges / Tags / Pills** → `rounded-full` (9999px)
- **Avatars** → `rounded-full` always
- **Images inside cards** → `rounded-t-xl` top only, or `rounded-xl` when standalone

---

## 5. Shadow System

### 5.1 Scale
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | Cards default |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)` | Card hover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)` | Dropdowns, autocomplete |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.08), 0 10px 10px rgba(0,0,0,0.04)` | Modals |
| `shadow-brand` | `0 0 32px rgba(28,100,242,0.35)` | Brand CTA glow |
| `shadow-none` | none | Flat surfaces |

### 5.2 Elevation Rules
- Level 0 (flat) — page background, dividers
- Level 1 (`shadow-sm`) — resting cards, filter panels
- Level 2 (`shadow-md`) — hovered cards, active chips
- Level 3 (`shadow-lg`) — dropdowns, popovers, tooltips
- Level 4 (`shadow-xl`) — modals, drawers, bottom sheets
- Brand glow — primary CTA button only, on hover

---

## 6. Button System

### 6.1 Variants
| Variant | Background | Text | Hover BG | Focus Ring | Usage |
|---------|-----------|------|----------|-----------|-------|
| **brand** | `bg-brand` | white | `bg-brand-strong` | `ring-4 ring-brand-soft` | Primary CTA |
| **outline** | transparent + `border-border` | heading | `bg-bg-app` | `ring-2 ring-border-medium` | Secondary, Google sign-in |
| **ghost** | transparent | muted | `bg-bg-app` | `ring-2 ring-border-medium` | Cancel, soft action |
| **danger** | `bg-danger` | white | `bg-danger-strong` | `ring-4 ring-danger-soft` | Delete, destructive |
| **success** | `bg-success` | white | `bg-success-strong` | `ring-4 ring-success-soft` | Confirm, directions |

### 6.2 Sizes
| Size | Padding | Font | Icon size | Min-height | Usage |
|------|---------|------|-----------|------------|-------|
| xs | `px-3 py-1.5` | text-xs | 12px | 28px | Inline actions, chip buttons |
| sm | `px-3 py-2` | text-sm | 14px | 32px | Compact UI, side panels |
| **md** | `px-4 py-2.5` | text-sm | 16px | 38px | Default — most CTAs |
| lg | `px-5 py-3` | text-base | 18px | 44px | Hero CTAs, prominent actions |
| xl | `px-6 py-3.5` | text-base | 20px | 52px | Landing page hero button |

### 6.3 States
| State | Treatment |
|-------|-----------|
| Default | Base variant styles |
| Hover | BG color shift + `shadow-sm` |
| Active / Tap | `scale-95` (CSS) / `whileTap={{ scale: 0.97 }}` |
| Focus | Focus ring per variant, `outline-none` |
| Loading | `Loader2` spinner replaces left icon; `disabled opacity-50` |
| Disabled | `opacity-50 cursor-not-allowed` — no scale, no shadow |

### 6.4 Modifiers
- **Pill** — append `rounded-full` (overrides default `rounded-lg`)
- **Full-width** — append `w-full`
- **Icon-only** — `p-2.5` with no text, `rounded-lg` or `rounded-full`
- **With left icon** — `gap-2`, icon 16px, label aligned center

---

## 7. Form Elements

### 7.1 Text Input
```
Label:     text-xs font-semibold text-heading uppercase tracking-wide mb-1.5
Input:     bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-heading
           w-full transition-colors duration-150
Focus:     border-brand ring-2 ring-brand-soft outline-none
Error:     border-danger ring-2 ring-danger-soft
Disabled:  bg-bg-app opacity-60 cursor-not-allowed
Helper:    text-xs text-muted mt-1
Error msg: text-xs text-danger mt-1
```

### 7.2 Search Input
```
Container: relative flex items-center
Icon left: absolute left-3 text-muted (16px)
Input:     pl-9 pr-4 py-2.5 bg-bg-app border border-border rounded-xl
           text-sm text-heading placeholder-placeholder
Focus:     border-brand ring-2 ring-brand-soft
Clear btn: absolute right-3 text-muted hover:text-heading (×)
```

### 7.3 Autocomplete Dropdown
```
Container: absolute top-full left-0 right-0 mt-1 z-dropdown
           bg-surface border border-border rounded-xl shadow-lg
Item:      flex items-center gap-3 px-4 py-3 text-sm text-heading
           hover:bg-bg-app cursor-pointer border-b border-border last:border-0
Icon:      text-muted (14px)
Active:    bg-brand-softer text-brand
```

### 7.4 Select / Filter Chip
```
Base:    border border-border rounded-full px-3 py-1.5 text-xs font-semibold
         text-muted bg-surface cursor-pointer transition-all duration-150
Hover:   bg-bg-app text-heading
Active:  bg-brand-softer border-brand-border text-brand
Maxed:   opacity-40 cursor-not-allowed
```

---

## 8. Badge System

### 8.1 Variants
| Variant | BG | Text | Border |
|---------|----|------|--------|
| brand | `bg-brand-soft` | `text-brand` | `border-brand-medium/30` |
| success | `bg-success-soft` | `text-success-strong` | `border-success-medium/30` |
| danger | `bg-danger-soft` | `text-danger` | `border-danger-medium/30` |
| warning | `bg-warning-soft` | `text-warning-strong` | `border-warning-medium/40` |
| neutral | `bg-bg-app` | `text-muted` | `border-border` |
| accent | `bg-accent-soft` | `text-accent-strong` | `border-accent-medium/30` |

### 8.2 Anatomy
```
Wrapper:  inline-flex items-center gap-1.5 px-2 py-0.5
          text-xs font-semibold rounded-full border
Dot:      w-1.5 h-1.5 rounded-full (matching color fill)
Icon:     12px, left of text
```

### 8.3 Usage Rules
- "Open" status → success
- "Busy" status → warning
- "Closed" status → danger
- AI-generated content → accent (Sparkles icon)
- Rank numbers (#1, #2…) → brand
- Traffic Light → success | Moderate → warning | Heavy → danger

---

## 9. Card System

### 9.1 Base Card
```
bg-surface border border-card-border rounded-xl shadow-sm overflow-hidden
transition-all duration-200
```

### 9.2 Hover State
```
hover:-translate-y-0.5 hover:shadow-md hover:border-brand-medium/50
```

### 9.3 Card Variants
| Variant | Additional styles | Usage |
|---------|------------------|-------|
| **flat** | No shadow, `border-border` | Filter panels, sections |
| **elevated** | `shadow-sm` + hover lift | Place result cards |
| **brand-tinted** | `border-card-border bg-brand-softer/30` | Featured / AI pick |
| **dark** | `bg-dark text-white` | Profile hero, city lock |
| **glass** | `bg-white/10 backdrop-blur-md border-white/20` | Hero overlays |

### 9.4 Card Anatomy
```
┌─ Image (optional, full-width, aspect-video or aspect-[4/3]) ──────┐
│  [Badge top-right: Open/Closed]                                    │
└────────────────────────────────────────────────────────────────────┘
┌─ Body (p-5) ───────────────────────────────────────────────────────┐
│  Row 1: Place name (H3) + Rank badge                               │
│  Row 2: Rating stars + review count + price level                  │
│  Row 3: Tags (chips)                                               │
│  Row 4: AI note (body-sm, accent-tinted bg)                        │
│  Row 5: CTA buttons (directions + details)                         │
└────────────────────────────────────────────────────────────────────┘
```

---

## 10. Tab System

### 10.1 Container
```
bg-bg-app rounded-xl p-1 flex gap-1
```

### 10.2 Tab Item
```
Base:     flex-1 py-2 px-1 rounded-lg text-[10px] font-bold uppercase
          tracking-wide transition-all duration-150 cursor-pointer
Inactive: text-muted hover:text-heading hover:bg-border/30
```

### 10.3 Active State — Web Tab Pills (canonical, do not swap)
Per-tab accent colors apply **only on web** inside the tab content area pill selector:

| Tab | Active class | Hex |
|-----|-------------|-----|
| Hotels | `bg-brand text-white shadow-sm` | `#1C64F2` |
| Food | `bg-food text-white shadow-sm` | `#D97706` |
| Itinerary | `bg-itinerary text-white shadow-sm` | `#7C3AED` |
| Explore | `bg-explore text-white shadow-sm` | `#059669` |

### 10.4 Mobile Bottom Navigation Bar (industry standard pattern)

> **Rule: ALL active tabs use `colors.brand` (#1C64F2) in the bottom nav bar — never per-tab accent colors.**

This matches the single-primary-color pattern used by every top-tier consumer app:

| App | Active nav color | Notes |
|-----|-----------------|-------|
| Swiggy | Single orange `#FF5200` | All 5 tabs same color |
| Zomato | Single red `#E23744` | All 4 tabs same color |
| Google Maps | Single blue `#1A73E8` | All 5 tabs same color |
| Airbnb | Single red `#FF385C` | All 4 tabs same color |
| Material Design 3 | `md.sys.color.primary` | Spec: one primary for all nav items |

**Rationale**: Multiple accent colors in a navigation bar create visual noise and fight for hierarchy. The nav bar is wayfinding infrastructure — it should recede. Per-tab accents live inside the content so the user recognises which tab they are on from context, not from the nav dot color.

#### Mobile nav bar token usage
```tsx
// ✅ Correct — all active states use brand
const color = focused ? colors.brand : colors.muted;
iconWrapActive: { backgroundColor: colors.brandSofter, borderRadius: radius.md }

// ❌ Wrong — per-tab accent in nav bar
const color = focused ? colors.food : colors.muted;  // Never do this
```

#### Where per-tab accents ARE used (content area only)
| Context | Token |
|---------|-------|
| CTA button on each tab | `colors.food` / `colors.itinerary` / `colors.explore` |
| Active filter chip border | Same accent |
| Hero gradient stop | Same accent + opacity |
| Section heading accent | Same accent |
| Loading indicator inside tab | Same accent |

---

## 11. Icon System

### 11.1 Library
**Lucide React** — `lucide-react` package. All icons are 24px viewport, 2px stroke by default.

### 11.2 Size Scale
| Size | px | Usage |
|------|----|-------|
| xs | 12px | Badge dots, inline text decorators |
| sm | 14px | Chip icons, label icons |
| **md** | 16px | Default — buttons, inputs, cards |
| lg | 18px | Section headers, tab icons |
| xl | 20px | Hero section icons |
| 2xl | 24px | Empty states, standalone icon |
| 3xl | 32px | Feature icons, large UI moments |

### 11.3 Stroke Width
| Context | strokeWidth |
|---------|-------------|
| Default UI | `1.5` |
| Bold / emphasis | `2` |
| Hero / display | `1.5` |
| Micro / badge | `2` |

### 11.4 Canonical Icons per Feature
| Feature | Icon | Color |
|---------|------|-------|
| Hotels tab | `Hotel` | brand |
| Food tab | `Utensils` | food |
| Itinerary tab | `Route` | itinerary |
| Explore tab | `Compass` | explore |
| Search | `Search` | muted |
| Location / map | `MapPin` | muted |
| AI / Gemini | `Sparkles` | accent |
| Rating | `Star` | warning-strong (filled) |
| Open status | `CheckCircle2` | success |
| Closed status | `XCircle` | danger |
| Traffic | `Circle` (filled dot) | semantic |
| Time | `Clock` | muted |
| Navigation | `Navigation` | brand |
| Filter | `SlidersHorizontal` | heading |
| Back | `ArrowLeft` | heading |
| External link | `ExternalLink` | muted |
| User / Profile | `User` | muted |
| Logout | `LogOut` | danger |

---

## 12. Modal & Overlay System

### 12.1 Modal
```
Overlay:   fixed inset-0 bg-dark/50 backdrop-blur-sm z-modal flex items-end sm:items-center justify-center
Container: bg-surface rounded-2xl shadow-xl w-full max-w-md mx-4
Header:    px-6 pt-6 pb-4 border-b border-border
Body:      px-6 py-5
Footer:    px-6 pb-6 pt-4 flex gap-3 justify-end
```

### 12.2 Bottom Sheet (mobile)
```
Container: fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-xl z-modal
Handle:    w-10 h-1 bg-border-medium rounded-full mx-auto mt-3 mb-4
```

### 12.3 Tooltip
```
Container: absolute z-tooltip bg-dark text-white text-xs px-2.5 py-1.5
           rounded-lg shadow-lg whitespace-nowrap pointer-events-none
Arrow:     4px triangle pointing toward target
```

---

## 13. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default document flow |
| `z-raised` | 10 | Cards on hover, sticky elements |
| `z-dropdown` | 100 | Autocomplete, select menus |
| `z-sticky` | 200 | Sticky nav, filter bar |
| `z-overlay` | 300 | Backdrop overlays |
| `z-modal` | 400 | Modals, bottom sheets |
| `z-tooltip` | 500 | Tooltips, popovers |
| `z-toast` | 600 | Toast notifications |
| `z-max` | 9999 | Critical overlays only |

```css
/* index.css — @theme block */
--z-base:     0;
--z-raised:   10;
--z-dropdown: 100;
--z-sticky:   200;
--z-overlay:  300;
--z-modal:    400;
--z-tooltip:  500;
--z-toast:    600;
--z-max:      9999;
```

---

## 14. Animation & Motion System

### 14.1 Duration Tokens
```css
--duration-instant:  50ms;
--duration-fast:    150ms;
--duration-normal:  200ms;
--duration-slow:    350ms;
--duration-xslow:   500ms;
```

### 14.2 Easing Standards
| Name | Value | Usage |
|------|-------|-------|
| `ease-ui` | `cubic-bezier(0.4, 0, 0.2, 1)` | All UI micro-interactions (150–200ms) |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering viewport (200–350ms) |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving viewport (150–200ms) |
| `ease-spring` | `spring(damping:25, stiffness:300)` | Modals, toasts, drawers |

### 14.3 CSS Keyframes
| Animation | Duration | Timing | Usage |
|-----------|----------|--------|-------|
| `shimmer` | 1.5s | linear infinite | Skeleton loaders |
| `pulse-soft` | 2s | ease-in-out infinite | Location found pulse |
| `marquee` | 36s | linear infinite | City poster carousel |
| `aurora-drift` | 14s | ease-in-out infinite | Landing hero orbs |
| `fade-in` | 200ms | ease-out | General fade entry |
| `slide-up` | 250ms | ease-out | Bottom sheet, toast |

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 14.4 Framer Motion Patterns
| Interaction | initial | animate | transition |
|-------------|---------|---------|------------|
| Modal open | `{opacity:0, y:20, scale:0.96}` | `{opacity:1, y:0, scale:1}` | spring(damping:25, stiffness:300) |
| Toast entry | `{opacity:0, x:80, scale:0.9}` | `{opacity:1, x:0, scale:1}` | spring(damping:20, stiffness:300) |
| Page section | `{opacity:0, y:12}` | `{opacity:1, y:0}` | duration:0.3, ease-out |
| Card expand | `{height:0}` | `{height:'auto'}` | duration:0.22, ease-in-out |
| City rotator | `{opacity:0, y:'-60%', filter:'blur(4px)'}` | `{opacity:1, y:0, filter:'blur(0)'}` | duration:0.35, ease-in-out |
| Hero image | `{opacity:0, scale:1.04}` | `{opacity:1, scale:1}` | duration:0.6, ease-out |
| CTA tap | — | — | `whileTap:{scale:0.97}` |

### 14.5 Motion Rules
- **Never animate** color alone — pair with opacity or transform
- **Max 2 simultaneous** animated properties per element
- **Respect prefers-reduced-motion** — wrap ambient animations in media query
- **Skeleton duration** 1.5s — any faster feels jittery; any slower feels broken

---

## 15. Gradient System

### 15.1 Brand Gradients
```css
/* Brand → Accent (Blue → Purple) */
linear-gradient(135deg, #1C64F2, #9061F9)

/* Hero text gradient (Blue → Purple → Green) */
linear-gradient(135deg, #60A5FA 0%, #A78BFA 55%, #34D399 100%)

/* Dark hero page background */
linear-gradient(160deg, #06080F 0%, #0B0F1E 50%, #100816 100%)

/* Photo overlay (cards with images) */
linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.30), transparent)

/* Subtle brand tint (section headers) */
linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)
```

### 15.2 City Gradients (place-specific)
| City | From | To |
|------|------|----|
| Bangalore | `#16a34a` | `#34d399` |
| Goa | `#0d9488` | `#67e8f9` |
| Jaipur | `#ec4899` | `#fda4af` |
| Mumbai | `#f97316` | `#fcd34d` |
| Delhi | `#ef4444` | `#fb923c` |
| Hyderabad | `#f59e0b` | `#fde047` |
| Chennai | `#2563eb` | `#7dd3fc` |
| Udaipur | `#7c3aed` | `#c4b5fd` |
| Thanjavur | `#1C64F2` | `#9061F9` |

---

## 16. Glass Morphism

| Context | Background | Blur | Border |
|---------|-----------|------|--------|
| Hero overlay badges | `rgba(255,255,255,0.15)` | `backdrop-blur-md` (12px) | `rgba(255,255,255,0.25)` |
| AI pick box (landing) | `rgba(255,255,255,0.08)` | `backdrop-blur-xl` (24px) | `rgba(255,255,255,0.15)` |
| Navbar (sticky) | `rgba(249,250,251,0.88)` | `blur(20px)` | none |
| Testimonial cards | `rgba(255,255,255,0.04)` | none | `rgba(255,255,255,0.08)` |
| City-lock panels | `rgba(255,255,255,0.04)` | `backdrop-blur-[12px]` | `rgba(255,255,255,0.09)` |

Blur levels: **sm** = 8px · **md** = 12px · **lg** = 20px · **xl** = 24px — use only these 4 values.

---

## 17. Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-border-medium) 25%,
    rgba(255,255,255,0.7) 50%,
    var(--color-border-medium) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
  border-radius: var(--radius-md);
}
```

Rules:
- Match skeleton dimensions to the content it replaces (same height/width)
- Use `rounded-full` for avatar skeletons
- Never stack more than 3 skeleton lines without a visual break
- Fade in with 150ms delay to avoid skeleton flash on fast connections

---

## 18. Toast Notifications

| Type | BG | Border | Icon | Auto-dismiss |
|------|----|--------|------|-------------|
| success | `bg-success-soft` | `border-success-medium/40` | `CheckCircle2` success | 3.5s |
| error | `bg-danger-soft` | `border-danger-medium/40` | `XCircle` danger | 5s (longer — needs reading) |
| info | `bg-accent-soft` | `border-accent-medium/30` | `Info` accent | 3.5s |
| warning | `bg-warning-soft` | `border-warning-medium/40` | `AlertTriangle` warning-strong | 4s |

```
Position:  fixed top-4 right-4 z-toast
Container: flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-lg
           min-w-[280px] max-w-[360px]
Title:     text-sm font-semibold text-heading
Body:      text-xs text-body mt-0.5
Close:     text-muted hover:text-heading ml-auto (×)
```

---

## 19. Layout System

### 19.1 Breakpoints
| Name | Width | Behaviour |
|------|-------|-----------|
| (mobile) | < 640px | Stacked single-column, full-width cards |
| `sm` | 640px | Minor padding adjustments, 2-col small grids |
| `md` | 768px | 2-column card grids, side panels |
| `lg` | 1024px | Desktop nav, 3-column card layout |
| `xl` | 1280px | Max content width, large padding |

### 19.2 Content Width
| Context | Class |
|---------|-------|
| Max content | `max-w-[920px] mx-auto` |
| Narrow (forms, modals) | `max-w-sm` (384px) |
| Page padding (mobile) | `px-4` |
| Page padding (tablet) | `sm:px-6` |
| Page padding (desktop) | `xl:px-[304px]` |

### 19.3 Grid Patterns
| Pattern | Class |
|---------|-------|
| 1-col → 2-col | `grid grid-cols-1 md:grid-cols-2 gap-4` |
| 1-col → 3-col | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` |
| Masonry-style cards | `columns-1 md:columns-2 gap-4` |
| Interest image grid | `grid grid-cols-2 gap-3` |

---

## 20. Per-Tab Design Reference

Per-tab accent colors apply **inside the tab content only** — never in the bottom navigation bar (see Section 10.4).

| Tab | Accent | Token | Soft BG | Active Button | Logo Icon | Filter Label |
|-----|--------|-------|---------|---------------|-----------|-------------|
| **Hotels** | `#1C64F2` | `colors.brand` | `#EBF5FF` | `bg-brand` | `Hotel` | "Best stays" |
| **Food** | `#D97706` | `colors.food` | `#FFF7ED` | `bg-food` | `Utensils` | "Best eats" |
| **Itinerary** | `#7C3AED` | `colors.itinerary` | `#F5F3FF` | `bg-itinerary` | `Route` | "Day plan" |
| **Explore** | `#059669` | `colors.explore` | `#ECFDF5` | `bg-explore` | `Compass` | "Explore" |

Each tab's **content area** has:
- Accent-colored active filter chips
- Accent-colored CTA button
- Accent-colored section headings
- Accent-colored loading indicators (ActivityIndicator / spinner)
- Soft BG for selected tag chips and info boxes
- Hero gradient stop uses accent + `BF` (0.75 opacity)
- Consistent card border `card-border` (#E1EFFE) across all tabs

---

## 21. Accessibility Standards

| Rule | Requirement |
|------|-------------|
| Color contrast (text) | Minimum 4.5:1 (AA) for body; 3:1 for large text |
| Color contrast (UI) | Minimum 3:1 for interactive components |
| Focus ring | Visible `ring-2` on all interactive elements — never `outline-none` alone |
| Touch target | Minimum 44×44px on mobile |
| Semantic HTML | `<button>` for actions, `<a>` for navigation |
| Reduced motion | Wrap ambient animations in `@media (prefers-reduced-motion: reduce)` |
| Alt text | Required on all `<img>` — place photos use place name + city |
| ARIA | `aria-label` on icon-only buttons; `role="status"` on loading spinners |

---

## 22. Complete CSS Token Reference

```css
/* Paste into index.css inside @theme {} */

/* Colors */
--color-brand:           #1C64F2;
--color-brand-strong:    #1A56DB;
--color-brand-active:    #1E429F;
--color-brand-softer:    #EBF5FF;
--color-brand-soft:      #E1EFFE;
--color-brand-medium:    #C3DDFD;
--color-brand-border:    #A4CAFE;
--color-brand-light:     #93C5FD;   /* blue-300 — light text on dark bg */

--color-food:            #D97706;
--color-food-dark:       #92400E;   /* amber-800 — hero gradient stop */
--color-food-soft:       #FFF7ED;
--color-food-border:     #FDE68A;

--color-itinerary:       #7C3AED;
--color-itinerary-soft:  #F5F3FF;
--color-itinerary-medium:#DDD6FE;

--color-explore:         #059669;
--color-explore-soft:    #ECFDF5;
--color-explore-medium:  #A7F3D0;

--color-accent:          #9061F9;
--color-accent-strong:   #7E3AF2;
--color-accent-soft:     #EDEBFE;
--color-accent-medium:   #DCD7FE;
--color-vibe:            #7E3AF2; /* alias of accent-strong */
--color-vibe-soft:       #F6F5FF;

--color-success:         #0E9F6E;
--color-success-strong:  #057A55;
--color-success-soft:    #DEF7EC;
--color-success-medium:  #31C48D;

--color-danger:          #F05252;
--color-danger-strong:   #E02424;
--color-danger-soft:     #FDE8E8;
--color-danger-medium:   #F98080;

--color-warning:         #FACA15;
--color-warning-strong:  #E3A008;
--color-warning-soft:    #FDF6B2;
--color-warning-medium:  #FCE96A;

--color-bg-app:          #F9FAFB;
--color-surface:         #FFFFFF;
--color-heading:         #111827;
--color-body:            #374151;
--color-muted:           #6B7280;
--color-placeholder:     #9CA3AF;
--color-border:          #E5E7EB;
--color-border-medium:   #D1D5DB;
--color-card-border:     #E1EFFE;
--color-dark:            #1F2937;
--color-dark-surface:    #111827;
--color-darkest:         #06080F;   /* near-black — city picker / fullscreen dark bg */

/* Typography */
--font-display:          'Outfit', sans-serif;
--font-sans:             'Inter', ui-sans-serif, system-ui, sans-serif;

/* Radius */
--radius-sm:             6px;
--radius-md:             8px;
--radius-lg:             12px;
--radius-xl:             16px;
--radius-2xl:            20px;
--radius-full:           9999px;

/* Z-index */
--z-base:                0;
--z-raised:              10;
--z-dropdown:            100;
--z-sticky:              200;
--z-overlay:             300;
--z-modal:               400;
--z-tooltip:             500;
--z-toast:               600;
--z-max:                 9999;

/* Duration */
--duration-instant:      50ms;
--duration-fast:         150ms;
--duration-normal:       200ms;
--duration-slow:         350ms;
--duration-xslow:        500ms;
```
