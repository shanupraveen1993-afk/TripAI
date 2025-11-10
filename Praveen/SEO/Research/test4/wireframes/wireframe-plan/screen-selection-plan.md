# WIREFRAME SELECTION PLAN
## Rank Tracker ASO Tool

**Date**: 2025-10-22
**Tool Category**: ASO (App Store Optimization)
**Complexity Assessment**: MEDIUM (focused keyword tracking with competitor intelligence)
**Competitors Analyzed**: 4 (AppTweak, Mobile Action, App Radar, AppFollow)

---

## ANALYSIS SUMMARY

### Tool Characteristics:
- **Primary Function**: Keyword rank tracking for iOS and Android apps
- **Core Users**: App developers, ASO specialists, mobile marketers
- **Key Differentiators**: Real-time tracking, AI insights, competitor monitoring, multi-market support
- **Monetization**: Freemium SaaS model (Free → Pro → Enterprise)
- **Complexity Level**: Medium
  - Not as simple as single-purpose trackers
  - Not as complex as full marketing analytics suites
  - Focus on ASO with depth in keyword intelligence

### Competitor Screen Frequency Analysis:
- **All 4 competitors have**: Landing page, Dashboard, Keyword tracking, Data tables, Settings, Alerts
- **3/4 competitors have**: Detail views, Mobile variants, Competitor comparison, Export features
- **2/4 competitors have**: Onboarding flows, Upgrade modals, Filter drawers, Review management
- **1/4 competitors have (unique)**: Apple Ads intelligence (Mobile Action), 45M database showcase (App Radar)

### Recommended Wireframe Count: **12 screens**
- Minimum viable: 10 screens (covers complete user journey)
- Selected: 12 screens (adds monetization + UX quality)
- Maximum: 15-20 (only if adding advanced features like team management, billing details)

---

## SCREEN SCORING MATRIX

Using the specification's scoring algorithm (frequency + complexity + journey criticality + tool relevance):

| # | Screen Type | Frequency | Complexity | Journey Critical | Tool Relevance | **SCORE** | **STATUS** |
|---|-------------|-----------|------------|------------------|----------------|-----------|------------|
| 1 | Landing Page | 4/4 | HIGH | ESSENTIAL | HIGH | **100** | ✅ SELECTED |
| 2 | Signup/Login | 4/4 | MEDIUM | ESSENTIAL | HIGH | **90** | ✅ SELECTED |
| 3 | Onboarding/Setup | 2/4 | MEDIUM | MEDIUM | MEDIUM | **65** | ❌ SKIP |
| 4 | Global Dashboard | 4/4 | HIGH | ESSENTIAL | HIGH | **100** | ✅ SELECTED |
| 5 | Tool Dashboard (Rank Tracker) | 4/4 | HIGH | ESSENTIAL | HIGH | **100** | ✅ SELECTED |
| 6 | Data Table View | 4/4 | HIGH | ESSENTIAL | HIGH | **100** | ✅ SELECTED |
| 7 | Detail View (Keyword Deep Dive) | 3/4 | MEDIUM | HIGH | HIGH | **85** | ✅ SELECTED |
| 8 | Comparison View | 3/4 | HIGH | MEDIUM | HIGH | **70** | ❌ SKIP (included in detail view) |
| 9 | Filter Drawer | 3/4 | MEDIUM | MEDIUM | MEDIUM | **65** | ❌ SKIP (inline filters) |
| 10 | Add/Manage Keyword Popup | 4/4 | MEDIUM | HIGH | HIGH | **90** | ✅ SELECTED |
| 11 | Export/Report Popup | 3/4 | MEDIUM | MEDIUM | HIGH | **75** | ❌ SKIP (modal only) |
| 12 | Upgrade/Paywall Modal | 4/4 | MEDIUM | MEDIUM | HIGH | **75** | ✅ SELECTED |
| 13 | Settings Page | 4/4 | MEDIUM | MEDIUM | HIGH | **80** | ✅ SELECTED |
| 14 | Billing Page | 2/4 | MEDIUM | LOW | MEDIUM | **45** | ❌ SKIP (in settings) |
| 15 | Team Management | 2/4 | MEDIUM | LOW | MEDIUM | **50** | ❌ SKIP (enterprise only) |
| 16 | Toast Notifications | 4/4 | LOW | LOW | LOW | **30** | ❌ SKIP (component only) |
| 17 | Confirmation Dialogs | 4/4 | LOW | LOW | LOW | **30** | ❌ SKIP (component only) |
| 18 | Empty/Loading/Error States | 4/4 | MEDIUM | MEDIUM | HIGH | **70** | ✅ SELECTED |
| 19 | Mobile Variants | 4/4 | HIGH | HIGH | HIGH | **85** | ✅ SELECTED (Dashboard) |
| 20 | Export Success Screen | 1/4 | LOW | LOW | LOW | **25** | ❌ SKIP (toast sufficient) |
| **COMPONENT LIBRARY** | N/A | N/A | HIGH | HIGH | HIGH | **100** | ✅ **MANDATORY** |

---

## SELECTED SCREENS (12 Total)

### **TIER 1: Essential Journey (7 screens)** — Complete user flow from discovery to usage

#### 1. ✅ Landing Page (Score: 100)
**Purpose**: Marketing entry point, conversion-focused
**Reason**: All 4 competitors have comprehensive landing pages. Critical for user acquisition.
**Key Features** (from synthesis):
- Hero headline: "Track App Rankings in Real-Time Across 150+ Countries"
- Value props: Real-time tracking, AI insights, competitor intelligence
- Social proof: "Trusted by 5,000+ developers" + logos
- Feature cards: 3-column grid with icons
- Free trial CTA: "Start 14-Day Free Trial"
- Navigation: Features, Pricing, Resources, Blog

**Design Focus**: Brand consistency, strong CTAs, social proof, feature highlights

---

#### 2. ✅ Signup / Login (Score: 90)
**Purpose**: User authentication and account creation
**Reason**: Essential gatekeeping screen. All competitors require authentication.
**Key Features**:
- OAuth-first: Google, Apple ID
- Email/password fallback
- App URL validation (ensures legitimate developers)
- Split screen: Form + feature highlight
- "Remember me", "Forgot password"

**Design Focus**: Minimal friction, OAuth prominence, trust signals

---

#### 3. ✅ Global Dashboard (Score: 100)
**Purpose**: Central hub after login, overview of all tracked apps/keywords
**Reason**: Main app screen, navigation center. All 4 competitors use dashboard as primary view.
**Key Features**:
- Sidebar navigation (240px): Dashboard, Rankings, Competitors, Reports, Settings
- 4 KPI cards: Current Avg Rank, Search Visibility Score, Keywords Tracked, Est. Organic Downloads
- Ranking performance chart (line chart, 7D/30D/90D tabs)
- Recent activity feed
- Top performing keywords table
- Quick action: "+ Add Keyword" button

**Design Focus**: Data visualization, clear hierarchy, actionable insights, navigation structure

---

#### 4. ✅ Tool Dashboard - Rank Tracker Module (Score: 100)
**Purpose**: Core functionality - keyword ranking interface with charts and tables
**Reason**: This IS the product. All 4 competitors center around rank tracking.
**Key Features**:
- Filters bar: Market, Platform, Date range, Keyword type, Rank range, Volume slider
- View toggle: Table / Chart
- Multi-line chart: Rank history for selected keywords (inverted Y-axis, #1 at top)
- Data table with columns: Keyword, Current Rank, Change (↑↓), Best/Worst/Avg Rank, Volume, Difficulty, Est. Downloads, Type, Last Updated, Actions
- Bulk actions: Select rows, export, delete, add to group
- Pagination: 25/50/100 rows per page

**Design Focus**: Data density, powerful filtering, sortable tables, visual rank trends

---

#### 5. ✅ Data Table View (Score: 100)
**Purpose**: Universal pattern for displaying keyword lists
**Reason**: Already covered in screen #4. This is the primary table interface.
**Note**: This screen is integrated into Tool Dashboard above. No separate wireframe needed.

**Instead, we'll create:**
#### 5. ✅ Competitor Analysis View (Alternative)
**Purpose**: Side-by-side competitor keyword tracking
**Reason**: Competitor intelligence is a key differentiator (all 4 competitors offer this).
**Key Features**:
- Competitor selector: Add up to 3 competitor apps
- Comparison table: Shared keywords with rank comparison
- Metadata comparison: Title, Subtitle, Keywords (side-by-side)
- Gap analysis: "You rank #12, competitors rank #5, #7"
- Competitor ranking chart (overlaid lines)

**Design Focus**: Comparison visualization, difference highlighting, actionable insights

---

#### 6. ✅ Detail View - Keyword Deep Dive (Score: 85)
**Purpose**: Single keyword analysis with full history and insights
**Reason**: 3/4 competitors have dedicated detail views. Essential for deep analysis.
**Key Features**:
- Header: Keyword name, favorite star, actions dropdown
- Quick metrics bar: Current Rank, Best Rank, Avg Rank, Volume, Difficulty, Est. Downloads
- Tabs: Overview, Ranking History, Competitor Analysis, Optimization Suggestions
- **Tab 1 - Overview**:
  - Ranking trend chart (90 days, with metadata update annotations)
  - Keyword insights card: Type, relevance, trending, seasonality
  - Performance summary: Days in Top 10, volatility
- **Tab 2 - Ranking History**: Extended chart + history table
- **Tab 3 - Competitor Analysis**: Who else ranks for this keyword + metadata comparison
- **Tab 4 - Optimization Suggestions**: AI recommendations (App Radar feature)

**Design Focus**: Tab navigation, chart annotations, insights synthesis, timeline correlation

---

#### 7. ✅ Add Keyword Popup (Score: 90)
**Purpose**: Core CRUD operation - adding keywords to track
**Reason**: All 4 competitors have keyword addition flows. Essential interaction.
**Key Features**:
- Modal (600px width, centered)
- Tabs: Manual Entry, Bulk Import (CSV), From Competitors
- **Manual Entry tab**:
  - Keyword input (tags-style, press Enter to add)
  - AI suggestions: "Recommended keywords" (App Radar feature)
  - Preview metrics: Volume, Difficulty, Current Rank
  - Market multi-select
- **Bulk Import tab**: CSV upload with validation
- **From Competitors tab**: Competitor selector + keyword picker
- Footer: Keyword count, plan limit progress bar, "Add Keywords" CTA

**Design Focus**: Modal design, form patterns, multi-method input, AI suggestions

---

### **TIER 2: Enhanced Experience (3 screens)** — Monetization & UX quality

#### 8. ✅ Upgrade / Paywall Modal (Score: 75)
**Purpose**: Freemium monetization, plan comparison
**Reason**: All 4 competitors use freemium models. Critical for revenue.
**Key Features**:
- Trigger: Reach limit, click locked feature, trial expiring
- Header: "Unlock unlimited keyword tracking and advanced insights"
- Billing toggle: Monthly / Annual (save 20%)
- 3-column plan comparison table:
  - Free/Trial: 50 keywords, 3 markets, daily updates
  - Pro ($79/mo): 500 keywords, 10 markets, hourly updates, AI insights
  - Enterprise (contact sales): Unlimited everything, API, dedicated support
- Feature matrix with checkmarks
- CTAs: "Start 14-day Pro trial", "Contact Sales"
- Trust badges: "Cancel anytime", "14-day money-back guarantee"

**Design Focus**: Pricing cards, feature differentiation, persuasive design, clear value prop

---

#### 9. ✅ Settings Page (Score: 80)
**Purpose**: Account management, preferences, integrations
**Reason**: All 4 competitors have settings. Essential for customization.
**Key Features**:
- Tab navigation: Account, Preferences, Integrations, Notifications, Billing
- **Account tab**: Profile photo, name, email, password change, 2FA
- **Preferences tab**: Default market, currency, timezone, date format, dashboard preferences
- **Integrations tab**: App Store Connect, Google Play Console, Slack, Analytics tools (Firebase, Amplitude)
- **Notifications tab**: Alert settings (rank drops, competitor updates), digest emails, quiet hours
- **Billing tab**: Current plan card, payment method, billing history, usage metrics
- Auto-save behavior

**Design Focus**: Tabbed organization, form layouts, integration cards, clear section hierarchy

---

#### 10. ✅ Empty / Loading / Error States (Score: 70)
**Purpose**: UX quality showcase - how the app handles edge cases
**Reason**: All 4 competitors show these states. Demonstrates polish.
**Key Features**:
- **Empty states**:
  - No keywords tracked: Illustration + "Add your first keyword" CTA
  - No data for filters: "No keywords match your filters" + "Clear filters" button
  - No ranking history: "Check back in 24 hours" + helpful tips
- **Loading states**:
  - Skeleton screens: Animated placeholders for cards, tables, charts
  - Spinner with message: "Analyzing keywords..."
  - Progress bar for long operations
- **Error states**:
  - Network error: "Unable to connect. Check your internet."
  - API error 500: "Something went wrong. Our team has been notified."
  - Permission error 403: "Access denied. Upgrade to Pro."
  - 404: "Page not found"

**Design Focus**: Illustrations, helpful messaging, clear CTAs, progressive states

---

### **TIER 3: Responsive Design (2 screens)** — Mobile experience

#### 11. ✅ Mobile Dashboard (Score: 85)
**Purpose**: Responsive mobile adaptation of dashboard
**Reason**: All 4 competitors have mobile responsiveness. Essential for modern apps.
**Key Features** (375px viewport):
- Top app bar: Hamburger menu, app selector, search, notifications
- Bottom navigation: Home, Rankings, Add (+), Competitors, More
- KPI cards: Stacked single column with full-width cards
- Chart: Simplified, touch-optimized (pinch zoom, swipe)
- Pull-to-refresh
- Card-based keyword list (instead of table)
- Swipe actions: Left (delete), Right (favorite)

**Design Focus**: Touch targets (44px min), bottom nav, gesture support, simplified UI

---

### **MANDATORY: Design System Showcase**

#### 12. ✅ Component Library (Score: 100) ⭐
**Purpose**: Design system documentation and component showcase
**Reason**: ALWAYS included per spec. Shows all UI components for developer handoff.
**Key Features**:
- **Typography section**: All 7 sizes (Display 57px, Headline 32px, Title 22px, Body 16/14px, Label 14px)
- **Color palette**: Brand colors (#FF5722 variants), neutrals, semantic colors
- **Buttons**: All variants (filled, outlined, text) in all sizes (sm 36px, default 40px, lg 48px)
- **Form elements**: Inputs (56px), selects, checkboxes, radio buttons, switches, chips
- **Cards**: Standard card (16px radius, 24px padding), KPI card, stat card with trends
- **Tables**: Table with all states (header, rows, sorting, pagination)
- **Navigation**: Sidebar nav, topbar, breadcrumbs, tabs
- **Modals**: Modal (560px), drawer (420px), bottom sheet
- **Notifications**: Toast (success, error, warning, info), snackbar, alerts
- **Data visualization**: Example charts, badges, tags, progress bars
- **Icons & Avatars**: Icon sizes (16/24/32/40px), avatar sizes (32/40/48/64px)
- **Empty states**: Illustration + messaging examples
- **Loading**: Spinners, skeleton screens, progress indicators

**Design Focus**: Complete component inventory, consistent styling, annotated for developers

---

## EXCLUDED SCREENS (Reasons)

### ❌ Onboarding/Setup (Score: 65)
- **Reason**: Only 2/4 competitors have multi-step onboarding
- **Alternative**: Simple signup → immediate dashboard access with helpful empty states
- **Could add later**: If user testing shows confusion

### ❌ Comparison View (Score: 70)
- **Reason**: Functionality covered in Detail View (Tab 3) and Competitor Analysis View
- **Alternative**: Integrated into Detail View as a tab
- **Could add later**: If standalone A vs B comparison is needed

### ❌ Filter Drawer (Score: 65)
- **Reason**: Filters can be inline in Tool Dashboard (sticky filters bar)
- **Alternative**: Inline filters with "Advanced" expansion
- **Mobile**: Bottom sheet for filters

### ❌ Export/Report Popup (Score: 75)
- **Reason**: Not demonstrating as standalone screen
- **Alternative**: Mentioned in Component Library
- **Could add later**: If export flows need detailed specification

### ❌ Billing Page (Score: 45)
- **Reason**: Integrated into Settings > Billing tab
- **Alternative**: Part of Settings screen (Tab 5)

### ❌ Team Management (Score: 50)
- **Reason**: Enterprise feature, not core to initial product
- **Alternative**: Settings > Team tab (basic mention)
- **Could add later**: For Enterprise tier specification

### ❌ Toast Notifications, Confirmation Dialogs (Scores: 30)
- **Reason**: Component-level, not full screens
- **Alternative**: Covered in Component Library

### ❌ Export Success Screen (Score: 25)
- **Reason**: Toast notification is sufficient
- **Alternative**: Toast with download link

---

## WIREFRAME SET COMPOSITION

**Total Wireframes**: 12

### Breakdown by Type:
- **Desktop screens**: 10
  1. Landing Page
  2. Signup/Login
  3. Global Dashboard
  4. Tool Dashboard (Rank Tracker)
  5. Competitor Analysis View
  6. Detail View (Keyword Deep Dive)
  7. Add Keyword Popup
  8. Upgrade/Paywall Modal
  9. Settings Page
  10. Empty/Loading/Error States

- **Mobile screens**: 1
  11. Mobile Dashboard (375px)

- **Component showcase**: 1
  12. Component Library ⭐

### File Naming Convention:
```
rank1.svg   — Landing Page
rank2.svg   — Signup/Login
rank3.svg   — Global Dashboard
rank4.svg   — Tool Dashboard (Rank Tracker)
rank5.svg   — Competitor Analysis View
rank6.svg   — Detail View (Keyword Deep Dive)
rank7.svg   — Add Keyword Popup
rank8.svg   — Upgrade/Paywall Modal
rank9.svg   — Settings Page
rank10.svg  — Empty/Loading/Error States
rank11.svg  — Mobile Dashboard
rank12.svg  — Component Library
```

---

## DESIGN COVERAGE VALIDATION

✅ **Complete User Journey**:
- Entry: Landing Page (rank1.svg)
- Authentication: Signup/Login (rank2.svg)
- First Use: Global Dashboard → Add Keywords (rank3.svg → rank7.svg)
- Core Usage: Tool Dashboard → Detail View (rank4.svg → rank6.svg)
- Advanced: Competitor Analysis (rank5.svg)
- Monetization: Upgrade Modal (rank8.svg)
- Management: Settings (rank9.svg)
- Mobile: Mobile Dashboard (rank11.svg)

✅ **Design System Showcase**:
- Component Library (rank12.svg) demonstrates all UI patterns

✅ **Responsive Design**:
- Desktop: 1440x900 (10 screens)
- Mobile: 375x812 (1 screen)

✅ **Key Interactions**:
- Modals: Add Keyword, Upgrade
- Tables: Sortable, filterable, paginated
- Forms: Inputs, selects, chips
- Charts: Line charts with annotations
- Navigation: Sidebar, tabs, breadcrumbs

✅ **UI States**:
- Empty states, loading states, error states (dedicated screen: rank10.svg)

✅ **Monetization**:
- Freemium upgrade path (rank8.svg)
- Plan comparison and pricing

---

## SCREEN SELECTION JUSTIFICATION

### Why 12 Screens (Not 10, Not 20)?

**Minimum Viable (10)** would be:
- Landing, Signup, Dashboard, Tool Dashboard, Detail View, Add Keyword, Settings, Component Library, Mobile, Empty States
- **Missing**: Monetization strategy, competitor intelligence

**Selected (12)** adds:
- Upgrade Modal (monetization critical for SaaS)
- Competitor Analysis (key differentiator)
- **Perfect balance**: Complete product story without over-specifying

**Maximum (15-20)** would add:
- Onboarding flow
- Standalone export modal
- Team management
- Billing details
- Filter drawer
- Comparison view
- **Overkill for MVP**: Can add later based on feedback

### Confidence Level: HIGH ✅

**Rationale**:
- Tool complexity: Medium (not simple tracker, not full suite)
- Competitor patterns: Strong consensus on core screens (4/4 for dashboard, tracking, tables)
- User journey: Complete flow from discovery to power usage
- Monetization: Clear freemium model
- Design coverage: All major UI patterns represented
- Mobile: Responsive design demonstrated

---

## NEXT STEP: Pre-Wireframe Checklist (Step 4.6)

Before generating wireframes, complete the pre-wireframe checklist to verify:
1. ✅ Data verification (competitor analysis complete)
2. ✅ Design system understanding (claude.md extracted)
3. ✅ Wireframe plan validation (this document)
4. ⏳ Content preparation (realistic terminology)
5. ⏳ Technical constraints (canvas sizes, SVG rules)
6. ⏳ Consistency enforcement (global patterns locked)

**Status**: Ready to proceed to Pre-Wireframe Checklist ✅