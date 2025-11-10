# UNIVERSAL WIREFRAME GENERATOR v3.0
## AI-Powered UI-Consistent Wireframes with Design System

**Purpose:** Generate minimum 10 strategically-selected, UI-consistent wireframes by analyzing competitors and applying your design system.

**Key Features:**
- ✅ UI Consistency enforced across ALL screens
- ✅ Design system compliance (claude.md)
- ✅ AI selects minimum 10 screens from 20-screen analysis
- ✅ Screenshot-based analysis for login-required tools
- ✅ Hallucination prevention checklist
- ✅ Design system verification before wireframe creation
- ✅ Component library included
- ✅ Quality over quantity approach

---

## 📥 INPUT SECTION (Fill All Fields Here)

```yaml
# ============================================
# TOOL DEFINITION
# ============================================
TOOL_NAME: "Rank Tracker"
TOOL_PURPOSE: "Track keyword rankings for added apps on iOS and Android store"
TOOL_CATEGORY: "ASO"  # Options: SEO/ASO/Analytics/Marketing/Social

# ============================================
# DESIGN SYSTEM (Auto-loaded from claude.md)
# ============================================
DESIGN_SYSTEM_PATH: /home/coder/Praveen/SEO/Research/test4/claude.md

# Design System Key Values (Auto-extracted):
# - Brand Color: #FF5722
# - Font: Inter
# - Button Height: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
# - Card Padding: 24px
# - Border Radius: 12px (lg), 16px (xl), 20px (2xl)
# - Spacing: 4pt grid (4px, 8px, 12px, 16px, 24px, 32px, 48px)
# - Typography: Display 57px, Headline 32px, Title 22px, Body 16px, Label 14px
# - Component Classes: .btn-filled, .btn-outlined, .card, .table, .modal, etc.

# ============================================
# OUTPUT SETTINGS
# ============================================
OUTPUT_FOLDER: /home/coder/Praveen/SEO/Research/test4/wireframes
FILE_FORMAT: "SVG"  # High-fidelity SVG wireframes with design system styling
CANVAS_SIZE: "1440x900"  # Desktop viewport (mobile: 375x812)
FILE_NAMING: "rank1.svg, rank2.svg, rank3.svg..." # Sequential numbering

# ============================================
# WIREFRAME SELECTION CRITERIA
# ============================================
MINIMUM_WIREFRAMES: 10  # AI will analyze all 20 screen types and select minimum 10
MAXIMUM_WIREFRAMES: 20  # Only if tool complexity requires all screens
AI_SELECTION: true  # AI determines optimal screen count based on tool complexity

# ============================================
# COMPETITOR ANALYSIS SETTINGS
# ============================================
AUTO_DISCOVER_COMPETITORS: true  # AI searches for top 3-4 competitors
MANUAL_COMPETITORS: []  # Optional: Override with manual competitor URLs
SCREENSHOT_COLLECTION: true  # Collect screenshots for login-required features
```

---

## 🔄 WORKFLOW OVERVIEW

### **Phase 1: Discovery & Analysis** (Steps 1-3)
1. Auto-discover competitors (AI search)
2. Extract features from each competitor (20 screen types)
3. Synthesize best-of-breed features

### **Phase 2: Design System Integration** (Step 4)
4. Load and verify design system from claude.md

### **Phase 3: Wireframe Planning** (Step 4.5 - NEW)
4.5. AI selects minimum 10 screens from 20-screen analysis
4.6. Create pre-wireframe checklist to prevent hallucination
4.7. Verify design system understanding before wireframe creation

### **Phase 4: Generation & Validation** (Steps 5-6)
5. Generate SVG wireframes with strict UI consistency
6. Validate and deliver final wireframe set

---

## 🤖 STEP 1: AUTO-DISCOVER COMPETITORS (AI Task)

### **AI executes web search:**

```
Search Query: "[TOOL_NAME] [TOOL_CATEGORY] competitors 2025"
Example: "Rank Tracker ASO competitors 2025"

Expected Results (AI selects top 3-6):
1. [Competitor Name] - [URL to exact tool page]
2. [Competitor Name] - [URL to exact tool page]
3. [Competitor Name] - [URL to exact tool page]
```

### **AI Output:**
```yaml
DISCOVERED_COMPETITORS:
  - NAME: "AppTweak"
    URL: "https://www.apptweak.com/aso-tools/rank-tracker"
    CATEGORY: "ASO"
    REQUIRES_LOGIN: true

  - NAME: "MobileAction"
    URL: "https://www.mobileaction.co/rank-tracker"
    CATEGORY: "ASO"
    REQUIRES_LOGIN: true

  - NAME: "AppFollow"
    URL: "https://appfollow.io/rank-tracking"
    CATEGORY: "ASO"
    REQUIRES_LOGIN: false
```

---

## 🔍 STEP 2: FEATURE EXTRACTION (AI Analyzes Each Competitor)

### **CRITICAL UPDATE: Handling Login-Required Tools**

**Problem:** Many competitor tools require login to access main features. We cannot analyze what we cannot see.

**Solution:** Comprehensive screenshot and content collection strategy:

#### **2.1 Content Collection Strategy**

For each competitor, collect information from ALL available sources:

**A. Public Marketing Pages (No Login Required):**
- Homepage: Value propositions, features list, screenshots/demos
- Features page: Detailed feature descriptions with UI examples
- Pricing page: Plan comparisons, feature matrices
- Demo videos: Screen recordings showing actual tool usage
- Blog posts: Tutorial articles with screenshots
- Help documentation: User guides with annotated screenshots
- Case studies: Real usage examples with UI screenshots

**B. Screenshot Collection Methods:**
1. **Marketing Screenshots:** Analyze all product screenshots from marketing materials
2. **Demo Videos:** Extract frames from product demo videos
3. **YouTube Tutorials:** Find third-party reviews and tutorials showing actual UI
4. **Product Hunt:** Screenshots and reviews from launch
5. **G2/Capterra Reviews:** User-submitted screenshots in reviews
6. **Documentation Images:** Help docs often contain detailed UI screenshots
7. **Social Media:** Twitter/LinkedIn posts showing product features

**C. Feature Discovery from Screenshots:**
When analyzing screenshots, extract:
- UI layout and structure
- Navigation patterns (sidebar, top nav, tabs)
- Data visualization types (charts, tables, cards)
- Form fields and input types
- Modal/popup designs
- Button styles and CTAs
- Color schemes and branding
- Typography choices
- Spacing and layout patterns

#### **2.2 ENHANCED Feature Extraction Template**

For each competitor, document:

```markdown
## COMPETITOR: [Name]
URL: [URL]
LOGIN_REQUIRED: [Yes/No]
ANALYSIS_SOURCES: [Marketing site, Demo video, YouTube tutorials, Documentation, etc.]

---

### CONTENT SOURCES ANALYZED:
1. **Homepage:** [URL] - [Key screenshots captured]
2. **Features Page:** [URL] - [UI examples found]
3. **Demo Video:** [URL] - [Timestamp references for key screens]
4. **Documentation:** [URL] - [Screenshot references]
5. **Third-party Reviews:** [URL] - [UI screenshots found]
6. **YouTube Tutorials:** [URL] - [Screen captures analyzed]

### SCREENSHOT INVENTORY:
- Landing Page: ✅ (Source: Homepage)
- Dashboard: ✅ (Source: Demo video at 1:23)
- Data Table: ✅ (Source: Documentation page)
- Detail View: ✅ (Source: YouTube tutorial at 3:45)
- Filter Panel: ✅ (Source: Features page screenshot)
- Settings: ⚠️ (Partial - from help docs)
- Mobile View: ✅ (Source: App store screenshots)

---

[Continue with 20 screen type analysis using collected screenshots and content]
```

---

### **2.3 Template for Each of 20 Screen Types:**

**IMPORTANT:** Focus on FEATURES and UI design from screenshots/content, not just guessing.

```markdown
## COMPETITOR: [Name]
URL: [URL]

---

### 1. LANDING PAGE FEATURES

**Source:** [Homepage URL + marketing screenshots]

**Value Propositions:**
- Main headline: "[Extract exact text from screenshot]"
- Subheadline: "[Extract exact text]"
- Unique selling points:
  1. [Feature 1: e.g., "Track rankings in 150+ countries" - from screenshot]
  2. [Feature 2: e.g., "Real-time updates every hour" - from video demo]
  3. [Feature 3: e.g., "AI-powered keyword suggestions" - from features page]

**Social Proof:**
- Customer count: [e.g., "10,000+ developers" - visible in screenshot]
- Company logos: [Count from screenshot + notable companies]
- Testimonials: [Present Y/N, count if yes]

**Trial/Pricing Offer:**
- Free trial: [e.g., "7-day free trial" - from pricing page]
- Credit card required: [Yes/No]
- Starting price: [e.g., "$49/month" - from pricing page]

**Key Features Highlighted:**
1. [Feature name from screenshot] - [Description]
2. [Feature name from video demo] - [Description]
3. [Feature name from features page] - [Description]

**Call-to-Action:**
- Primary CTA text: "[e.g., 'Start Free Trial' - from screenshot]"
- Secondary CTA text: "[e.g., 'View Pricing' - from screenshot]"

---

### 2. SIGNUP / LOGIN FEATURES

**Source:** [Signup page URL + authentication screenshots]

**Authentication Methods:**
- Social OAuth: [Visible in screenshot: Google Y/N, LinkedIn Y/N, GitHub Y/N]
- Email/Password: [Y/N]
- SSO: [Y/N - from enterprise documentation]

**Form Fields:**
- Required fields: [List from screenshot: email, password, name, company, etc.]
- Optional fields: [List if visible]
- Password requirements: [e.g., "8+ characters" - from help text in screenshot]

**Password Features:**
- Show/hide toggle: [Y/N - visible in screenshot]
- Strength indicator: [Y/N - visible in screenshot]
- Forgot password link: [Y/N]

---

### 3. ONBOARDING / PROJECT SETUP FEATURES

**Source:** [Onboarding video timestamp 0:45-2:30 + help documentation]

**Onboarding Steps:**
- Total steps: [Count from video/screenshots]
- Step 1: [What info collected - visible in video at 0:45]
- Step 2: [What info collected - visible in video at 1:15]
- Step 3: [What info collected - visible in video at 1:45]

**Progress Indicator:**
- Type: [Dots / Progress bar / Step numbers - visible in screenshot]

---

### 4. GLOBAL DASHBOARD FEATURES

**Source:** [Demo video at 2:30-4:00 + product screenshots from features page]

**Navigation:**
- Type: [Sidebar left / Top nav - visible in screenshot]
- Menu items: [List all visible in screenshot]
- Collapsible: [Y/N - observable in demo video]

**Key Metrics (KPI Cards):**
- Metric 1: [Name + value from screenshot, e.g., "Total Keywords - 245 tracked"]
- Metric 2: [Name + value from screenshot]
- Metric 3: [Name + value from screenshot]
- Layout: [Grid columns: 2/3/4 - observable from screenshot]

**Recent Activity:**
- Display type: [Table / Cards - visible in screenshot]
- Data shown: [What's visible in the screenshot]
- Item count: [Visible count in screenshot]

---

### 5. TOOL DASHBOARD (MODULE OVERVIEW) FEATURES

**Source:** [YouTube tutorial at 3:20 + documentation screenshots]

**Filters & Controls:**
- Filter 1: [Name + type visible in screenshot, e.g., "Country - Dropdown"]
- Filter 2: [Name + type from screenshot]
- Filter position: [Top bar / Sidebar - visible in screenshot]

**Visualization:**
- Chart type: [Line / Bar / Area - visible in screenshot]
- Chart shows: [What data - label visible in screenshot]
- Interactive: [Hover tooltip visible Y/N in demo video]

---

### 6. DATA TABLE VIEW (UNIVERSAL LAYOUT) FEATURES

**Source:** [Product screenshot from features page + demo video at 5:00]

**Table Structure:**
- Columns:
  1. [Column name visible in screenshot + data type]
  2. [Column name visible in screenshot + styling notes]
  3. [Continue for all visible columns...]

**Sorting:**
- Sortable columns: [Which columns show sort arrows in screenshot]
- Default sort: [Observable from data order in screenshot]

**Row Actions:**
- Action 1: [Visible in screenshot, e.g., "Edit" icon]
- Action 2: [Visible in screenshot, e.g., "Delete" icon]
- Menu type: [3-dot / Icon buttons - visible in screenshot]

**Bulk Actions:**
- Bulk select: [Checkbox column visible Y/N]
- Bulk toolbar: [Visible in screenshot Y/N]

**Pagination:**
- Type: [Page numbers / Prev-Next - visible in screenshot]
- Position: [Bottom right/center - visible in screenshot]

---

### 7. DETAIL VIEW PAGE (ENTITY DEEP DIVE) FEATURES

**Source:** [Demo video at 6:15 + help documentation screenshots]

**Page Header:**
- Entity name: [Format visible in screenshot]
- Back button: [Y/N, position from screenshot]
- Actions: [List visible actions from screenshot]

**Navigation (Tabs/Sections):**
- Tab 1: [Name visible in screenshot, e.g., "Overview"]
- Tab 2: [Name visible in screenshot]
- Tab type: [Horizontal tabs / Vertical - visible in screenshot]

---

### 8. COMPARISON VIEW (A vs B ANALYSIS) FEATURES

**Source:** [Features page screenshot + competitor comparison visible at 7:30 in demo]

**Comparison Layout:**
- Layout: [Side-by-side / Stacked - visible in screenshot]
- Entity selectors: [Dropdown / Search - visible in screenshot]

**Metrics Compared:**
1. [Metric visible in comparison screenshot]
2. [Metric visible in comparison screenshot]

---

### 9. FILTER DRAWER / SIDEBAR PANEL FEATURES

**Source:** [Advanced filtering shown in video at 8:00 + filter documentation]

**Drawer Behavior:**
- Slide from: [Right / Left - visible in demo video]
- Overlay: [Dark backdrop visible Y/N]

**Filter Types:**
1. **[Filter name from screenshot]**
   - Control type: [Dropdown / Checkboxes - visible in screenshot]
   - Options: [Visible options in screenshot]

---

### 10. ADD / MANAGE DATA POPUP FEATURES

**Source:** [Modal screenshot from documentation + video at 9:00]

**Form Fields:**
1. **[Field name from screenshot]**
   - Type: [Text input / Dropdown - visible in screenshot]
   - Required: [Asterisk visible Y/N]
   - Placeholder: "[visible text in screenshot]"

---

### 11. EXPORT / REPORT POPUP FEATURES

**Source:** [Export modal from demo video at 10:30]

**Format Selector:**
- Formats available: [CSV/Excel/PDF checkboxes visible in screenshot]
- Default: [Selected option visible in screenshot]

---

### 12. UPGRADE / PAYWALL MODAL FEATURES

**Source:** [Pricing page + paywall screenshot from review]

**Plan Comparison:**
- Layout: [Side-by-side cards visible in screenshot]
- Plans shown: [Free/Pro/Enterprise visible]

---

### 13. SETTINGS PAGE (ACCOUNT & PREFERENCES) FEATURES

**Source:** [Settings screenshot from help docs]

**Navigation:**
- Layout: [Tab navigation / Sidebar - visible in screenshot]
- Sections visible: [Profile, Account, Notifications, etc.]

---

### 14. BILLING & SUBSCRIPTION PAGE FEATURES

**Source:** [Billing page from documentation screenshots]

**Current Plan Card:**
- Information displayed: [What's visible in screenshot]

---

### 15. TEAM MANAGEMENT PAGE FEATURES

**Source:** [Team management from enterprise documentation]

**Invite Section:**
- Form fields visible: [Email input, role selector from screenshot]

---

### 16. TOAST / SNACKBAR NOTIFICATIONS FEATURES

**Source:** [Notification examples from video demo at various timestamps]

**Notification Types:**
- SUCCESS: [Style visible in screenshot]
- ERROR: [Style visible in screenshot]

---

### 17. POPUP / CONFIRMATION DIALOGS FEATURES

**Source:** [Delete confirmation visible in demo at 12:00]

**Dialog Types:**
- DELETE CONFIRMATION: [Text and buttons visible in screenshot]

---

### 18. EMPTY / LOADING / ERROR STATES FEATURES

**Source:** [Empty state screenshot from documentation]

**Empty States:**
- Illustration: [Style visible in screenshot]
- Text: [Actual text from screenshot]

---

### 19. RESPONSIVE MOBILE VARIANTS FEATURES

**Source:** [App store screenshots + mobile demo video]

**Navigation (Mobile):**
- Type: [Bottom nav / Hamburger - visible in mobile screenshots]

---

### 20. EXPORT SUCCESS / DOWNLOAD COMPLETE SCREEN FEATURES

**Source:** [Success screen from demo video at 13:30]

**Success Icon:**
- Icon: [Type visible in screenshot]
- Message: [Actual text from screenshot]

---

## END COMPETITOR ANALYSIS
```

---

## 🎯 STEP 3: SYNTHESIZE BEST-OF-BREED FEATURES

After analyzing all competitors using screenshots and content, AI creates master feature list:

```markdown
## MASTER FEATURE LIST (Best from All Competitors)

### METHODOLOGY:
- Analyzed 3-6 competitors using screenshots, demo videos, and documentation
- Extracted UI patterns and features from visual sources
- Selected best implementation for each of 20 screen types
- Prioritized patterns seen across multiple competitors (proven UX)

### LANDING PAGE
✅ Hero Headline: "Track App Rankings in Real-Time" (from [Competitor X] homepage)
✅ Value Props:
   - "150+ countries" (from [Competitor X] features list)
   - "AI keyword suggestions" (from [Competitor Y] demo video)
   - "Unlimited tracking" (from [Competitor Z] pricing page)
✅ Social Proof: "10,000+ developers" (from [Competitor X] homepage screenshot)
✅ Trial Offer: "7-day free trial, no credit card" (from [Competitor X] signup)
✅ Feature Cards: 3-column icon-top layout (from [Competitor Y] homepage screenshot)

### DASHBOARD
✅ KPI Cards (4 metrics from demo videos):
   - Current Rank (all competitors show this)
   - Rank Change ↑↓ (all competitors)
   - Best Rank (from [Competitor X] screenshot)
   - Visibility Score (from [Competitor X] screenshot)
✅ Line Chart: With 7d/30d/90d tabs (from [Competitor Y] video demo at 3:45)
✅ Quick Action: "Add Keyword" button in header (from [Competitor Z] screenshot)

### DATA TABLE
✅ Columns: Keyword, Rank, Change, Volume, Country, Last Updated, Actions (synthesized from all screenshots)
✅ Bulk Actions: Export, Delete, Add to Group (from [Competitor X] demo)
✅ Inline Edit: Click cell to edit (from [Competitor Y] video at 5:20)
✅ Row Menu: 3-dot dropdown (from [Competitor Z] screenshot)

[... Continue synthesizing for all 20 screen types based on collected evidence ...]
```

---

## 📐 STEP 4: LOAD DESIGN SYSTEM FROM claude.md

**AI automatically reads:** `[DESIGN_SYSTEM_PATH from INPUT]`

**Critical: Extract ALL design system values:**

### 4.1 COLOR TOKENS (MUST USE EXACT HEX VALUES)
```css
/* Brand Colors */
--brand-500: #FF5722 (PRIMARY - use for CTAs, links, active states)
--brand-50: #FFF3E0 (primary container background)
--brand-900: #BF360C (dark brand accent)

/* Neutral Grayscale */
--neutral-50: #F9FAFB (light surface backgrounds)
--neutral-100: #F3F4F6 (surface variant, card backgrounds)
--neutral-200: #E5E7EB (borders, dividers, outlines)
--neutral-400: #9CA3AF (disabled text, placeholders)
--neutral-500: #6B7280 (secondary text)
--neutral-700: #374151 (secondary buttons)
--neutral-900: #111827 (primary text, headings)
--neutral-950: #0A0E16 (dark mode surface)

/* Semantic Colors */
--md-sys-color-error: #DC2626 (error states, delete buttons)
--md-sys-color-error-container: #FEE2E2 (error backgrounds)

/* Surface & Background */
--md-sys-color-surface: #FFFFFF (card backgrounds, modals)
--md-sys-color-background: #FFFFFF (page background)
--md-sys-color-surface-variant: #F9FAFB (subtle backgrounds)
--md-sys-color-outline: #E5E7EB (borders, dividers)
```

### 4.2 TYPOGRAPHY SYSTEM (MUST USE EXACT SIZES & WEIGHTS)
```css
Font Family: "Inter" (ALL text must use Inter font)

/* Type Scale - USE EXACT PIXEL VALUES */
--md-type-display-lg: 57px font-size / 64px line-height / 600 weight (Hero headlines)
--md-type-display-sm: 36px / 44px / 600 (Sub-hero, section titles)
--md-type-headline-lg: 32px / 40px / 600 (Page titles, H1)
--md-type-title-lg: 22px / 28px / 600 (Card titles, H2, H3)
--md-type-body-lg: 16px / 24px / 400 (Body text, paragraphs, descriptions)
--md-type-body-sm: 14px / 20px / 400 (Small text, captions)
--md-type-label-lg: 14px / 20px / 600 (Button labels, form labels)
```

### 4.3 SPACING SYSTEM (4PT GRID - MUST USE EXACT VALUES)
```css
--space-0: 0px
--space-1: 4px (tiny gaps, icon spacing)
--space-2: 8px (compact spacing, chip padding)
--space-3: 12px (small gaps between related items)
--space-4: 16px (default gap, card internal spacing)
--space-5: 20px (medium spacing)
--space-6: 24px (section spacing, card padding)
--space-8: 32px (large section gaps, page padding)
--space-9: 40px
--space-10: 48px (extra large spacing, hero padding)
```

### 4.4 COMPONENT DIMENSIONS (EXACT MEASUREMENTS)
```css
/* Buttons */
.btn: min-height 40px, padding 10px 16px, border-radius 12px
.btn-sm: min-height 36px, padding 8px 12px
.btn-lg: min-height 48px, padding 12px 20px (PRIMARY CTAs)

/* Input Fields */
.textfield input: height 56px, padding 0 16px, border-radius 12px

/* Cards */
.card: border-radius 16px, padding 24px, box-shadow elevation-1
.card-hover: elevation-2 on hover

/* Headers & Navigation */
.topbar: height 64px, padding 0 16px
.sidebar: width 240px

/* Tables */
.table th: padding 12px 16px, height 48px
.table td: padding 16px

/* Modals */
.modal: max-width 560px, border-radius 20px, padding 24px

/* Avatars */
.avatar: 40px default, 32px small, 48px large, 64px xl

/* Icons */
.icon: 24px default, 16px small, 32px large, 40px xl
```

### 4.5 BORDER RADIUS (SHAPE TOKENS)
```css
--md-sys-shape-corner-xs: 4px (small elements)
--md-sys-shape-corner-sm: 6px
--md-sys-shape-corner-md: 8px
--md-sys-shape-corner-lg: 12px (buttons, inputs, cards)
--md-sys-shape-corner-xl: 16px (large cards)
--md-sys-shape-corner-2xl: 20px (modals)
--md-sys-shape-corner-3xl: 24px (hero sections)
--md-sys-shape-corner-full: 9999px (pills, badges, avatars)
```

### 4.6 SHADOWS (ELEVATION SYSTEM)
```css
--md-sys-elevation-0: none (flat elements)
--md-sys-elevation-1: 0 1px 3px rgba(0,0,0,0.10) (cards, slight lift)
--md-sys-elevation-2: 0 4px 6px rgba(0,0,0,0.10) (hover cards)
--md-sys-elevation-3: 0 10px 15px rgba(0,0,0,0.10) (dropdowns, menus)
--md-sys-elevation-4: 0 20px 25px rgba(0,0,0,0.10) (drawers)
--md-sys-elevation-5: 0 25px 50px rgba(0,0,0,0.25) (modals, popups)

--shadow-brand-glow: 0 0 0 1px rgb(255 87 34/0.10), 0 8px 16px rgb(255 87 34/0.30)
  (use for primary CTAs, featured cards)
```

### 4.7 COMPONENT MAPPING (CSS CLASS REFERENCE)
```css
/* Use these exact class styles when drawing components */
.btn-filled: background #FF5722, color white, shadow elevation-1
.btn-outlined: background transparent, color #FF5722, border 1px #E5E7EB
.btn-text: background transparent, color #FF5722, no border

.card: white background, 16px radius, 24px padding, elevation-1
.kpi: card + grid layout for metrics
.stat-card: card with trend indicators

.table: full width, border-collapse, th background #F9FAFB
.badge: inline-flex, 9999px radius, 4px 8px padding
.chip: like badge but clickable, toggle state

.modal-root: fixed overlay with scrim (backdrop)
.drawer: slide-in panel from right, 420px width
.snackbar: fixed bottom center, 12px radius, inverse colors

.alert: flex layout, 16px padding, 12px radius, 4px left border
.empty-state: centered grid, 120px icon, centered text
.spinner: 40px circle with rotating border
```

### 4.8 LAYOUT SYSTEM
```css
/* Grid System */
.grid-2: 2 columns, 16px gap
.grid-3: 3 columns, 16px gap (feature cards)
.grid-4: 4 columns, 16px gap (KPI cards)
.grid-auto: responsive auto-fit, 280px min column width

/* Flexbox Utilities */
.flex: display flex, 16px gap
.flex-between: justify-content space-between
.flex-center: center both axes
.items-center: align-items center

/* Container */
.container: max-width 1200px, responsive padding (16px mobile, 24px tablet, 32px desktop)
.section: 56px top/bottom padding
.hero: 56px top/bottom padding
```

### 4.9 RESPONSIVE BREAKPOINTS
```css
Mobile: < 599px (single column, bottom nav, full-width buttons)
Tablet: 600px - 1023px (2 columns, hybrid nav)
Desktop: ≥ 1024px (3-4 columns, sidebar nav)

/* Mobile Adjustments */
- Stack grids to 1 column
- Hamburger menu instead of sidebar
- Full-width buttons (48px min height for touch)
- Bottom sheets instead of modals
- Horizontal scroll tables or card view
```

---

## 🎯 STEP 4.5: AI WIREFRAME SELECTION (NEW)

### **AI Strategy: Minimum 10 from 20-Screen Analysis**

**Approach:**
1. **Analyze all 20 screen types** from competitor research
2. **Score each screen** based on:
   - Frequency across competitors (how many show this screen)
   - Complexity of features (how unique/valuable is this screen)
   - User journey criticality (essential vs optional)
   - Tool-specific relevance (does this tool need this screen?)
3. **Select minimum 10 screens** that provide:
   - Complete user journey coverage
   - Design system representation
   - Tool-specific value
   - Quality over quantity

### **Scoring Matrix:**

```yaml
SCREEN_SCORING:
  1_Landing_Page:
    frequency: 6/6  # All competitors have this
    complexity: HIGH  # Marketing entry point
    journey_criticality: ESSENTIAL  # First touchpoint
    tool_relevance: HIGH
    SCORE: 100  # Always include

  2_Signup_Login:
    frequency: 6/6
    complexity: MEDIUM
    journey_criticality: ESSENTIAL
    tool_relevance: HIGH
    SCORE: 90  # Always include

  3_Onboarding:
    frequency: 4/6  # Not all have multi-step onboarding
    complexity: MEDIUM
    journey_criticality: MEDIUM  # Nice to have
    tool_relevance: [AI evaluates based on tool complexity]
    SCORE: [60-80]  # Conditional

  4_Dashboard:
    frequency: 6/6
    complexity: HIGH  # Main app screen
    journey_criticality: ESSENTIAL
    tool_relevance: HIGH
    SCORE: 100  # Always include

  5_Tool_Dashboard:
    frequency: 6/6
    complexity: HIGH  # Core tool functionality
    journey_criticality: ESSENTIAL
    tool_relevance: HIGH
    SCORE: 100  # Always include

  6_Data_Table:
    frequency: 6/6
    complexity: HIGH
    journey_criticality: ESSENTIAL
    tool_relevance: HIGH
    SCORE: 100  # Always include

  7_Detail_View:
    frequency: 5/6
    complexity: MEDIUM
    journey_criticality: HIGH  # Deep dive into data
    tool_relevance: HIGH
    SCORE: 85  # Almost always include

  8_Comparison_View:
    frequency: 3/6  # Not all tools have A vs B comparison
    complexity: HIGH
    journey_criticality: MEDIUM
    tool_relevance: [AI evaluates]
    SCORE: [50-70]  # Conditional

  9_Filter_Drawer:
    frequency: 5/6
    complexity: MEDIUM
    journey_criticality: MEDIUM  # Can be part of main view
    tool_relevance: [AI evaluates]
    SCORE: [60-75]  # Conditional

  10_Add_Manage_Popup:
    frequency: 6/6
    complexity: MEDIUM
    journey_criticality: HIGH  # Core CRUD operation
    tool_relevance: HIGH
    SCORE: 90  # Almost always include

  11_Export_Report:
    frequency: 5/6
    complexity: MEDIUM
    journey_criticality: MEDIUM
    tool_relevance: [AI evaluates]
    SCORE: [65-80]  # Conditional

  12_Upgrade_Paywall:
    frequency: 6/6
    complexity: MEDIUM
    journey_criticality: MEDIUM  # Monetization important
    tool_relevance: HIGH
    SCORE: 75  # Often include

  13_Settings:
    frequency: 6/6
    complexity: MEDIUM
    journey_criticality: MEDIUM
    tool_relevance: HIGH
    SCORE: 80  # Often include

  14_Billing:
    frequency: 4/6
    complexity: MEDIUM
    journey_criticality: LOW  # Can be part of Settings
    tool_relevance: MEDIUM
    SCORE: [40-60]  # Rarely as separate screen

  15_Team_Management:
    frequency: 3/6
    complexity: MEDIUM
    journey_criticality: LOW  # Only for team/enterprise tools
    tool_relevance: [AI evaluates]
    SCORE: [30-70]  # Highly conditional

  16_Notifications:
    frequency: 2/6  # Usually just toast examples, not full screen
    complexity: LOW
    journey_criticality: LOW  # Component, not screen
    tool_relevance: LOW
    SCORE: [10-30]  # Rarely as separate screen

  17_Dialogs:
    frequency: 2/6  # Component, not screen
    complexity: LOW
    journey_criticality: LOW
    tool_relevance: LOW
    SCORE: [10-30]  # Component library only

  18_Empty_Loading_Error:
    frequency: 6/6  # Important UI states
    complexity: MEDIUM
    journey_criticality: MEDIUM  # UX quality
    tool_relevance: HIGH
    SCORE: 70  # Often include as component showcase

  19_Mobile_Variants:
    frequency: 6/6  # Responsive is essential
    complexity: HIGH
    journey_criticality: HIGH
    tool_relevance: HIGH
    SCORE: 85  # Almost always include 1-2 mobile screens

  20_Export_Success:
    frequency: 3/6
    complexity: LOW
    journey_criticality: LOW  # Nice confirmation
    tool_relevance: LOW
    SCORE: [20-40]  # Rarely needed

  COMPONENT_LIBRARY:
    frequency: N/A  # Our addition for design system
    complexity: HIGH
    journey_criticality: HIGH  # Shows all components
    tool_relevance: HIGH
    SCORE: 100  # ALWAYS include
```

### **Selection Algorithm:**

```python
# Pseudo-code for AI selection

1. Score all 20 screen types using matrix above
2. Sort by score (highest to lowest)
3. Select top screens until minimum 10 reached:

   ALWAYS_INCLUDE (Score 90-100):
   - Landing Page (100)
   - Dashboard (100)
   - Tool Dashboard (100)
   - Data Table (100)
   - Signup/Login (90)
   - Add/Manage Popup (90)
   - Component Library (100)
   = 7 screens guaranteed

   ALMOST_ALWAYS (Score 75-89):
   - Detail View (85)
   - Mobile Variants (85)
   - Settings (80)
   = 10 screens total

   CONDITIONAL (Score 50-74):
   - Upgrade/Paywall (75)
   - Empty/Loading States (70)
   - Export/Report (65-80)
   - Filter Drawer (60-75)
   - Comparison View (50-70)
   - Onboarding (60-80)

   If tool complexity requires more:
   - Add top conditional screens up to 15 total
   - Maximum 20 only for extremely complex tools

4. Validate selection covers:
   ✅ Complete user journey (login → use → settings)
   ✅ Design system showcase (component library)
   ✅ Responsive design (at least 1 mobile)
   ✅ Key differentiators (tool-specific features)

5. Output: Wireframe Plan Document
```

### **AI Output: Wireframe Selection Plan**

```markdown
## WIREFRAME SELECTION PLAN
Tool: [TOOL_NAME]
Category: [TOOL_CATEGORY]
Complexity: [SIMPLE / MEDIUM / COMPLEX]

### ANALYSIS SUMMARY:
- Competitors analyzed: 6
- Common screens found: 18/20
- Tool-specific needs: [List unique requirements]
- Recommended wireframe count: 12

### SELECTED SCREENS (Sorted by Priority):

**TIER 1: Essential Journey (7 screens)**
1. ✅ Landing Page (Score: 100)
   - Reason: Marketing entry point, all competitors have this
   - Features: Hero, value props, pricing, social proof
   - Design focus: Brand consistency, CTAs

2. ✅ Global Dashboard (Score: 100)
   - Reason: Main app screen, central hub
   - Features: KPI cards, recent activity, quick actions
   - Design focus: Data visualization, navigation

3. ✅ Tool Dashboard - Rank Tracker (Score: 100)
   - Reason: Core tool functionality
   - Features: Filters, charts, summary metrics
   - Design focus: Data viz, interactive controls

4. ✅ Data Table - Keywords List (Score: 100)
   - Reason: Primary data view, universal pattern
   - Features: Sorting, filtering, bulk actions, pagination
   - Design focus: Table design, responsive patterns

5. ✅ Add Keyword Popup (Score: 90)
   - Reason: Core CRUD operation
   - Features: Form validation, multi-field inputs
   - Design focus: Modal design, form patterns

6. ✅ Signup / Login (Score: 90)
   - Reason: Authentication required
   - Features: OAuth, email/password, validation
   - Design focus: Form design, security UX

7. ✅ Component Library (Score: 100)
   - Reason: Design system showcase
   - Features: All UI components in context
   - Design focus: Consistency demonstration

**TIER 2: Enhanced Experience (3 screens)**
8. ✅ Detail View - Keyword Deep Dive (Score: 85)
   - Reason: 5/6 competitors have this
   - Features: Detailed metrics, history chart, related data
   - Design focus: Content layout, tabs/sections

9. ✅ Mobile Dashboard (Score: 85)
   - Reason: Responsive design essential
   - Features: Dashboard adapted for 375px
   - Design focus: Mobile navigation, touch targets

10. ✅ Settings - Account & Preferences (Score: 80)
    - Reason: User management essential
    - Features: Profile, notifications, integrations
    - Design focus: Form layouts, section organization

**TIER 3: Tool-Specific Value (2 screens)**
11. ✅ Upgrade / Paywall Modal (Score: 75)
    - Reason: Freemium model common in ASO tools
    - Features: Plan comparison, feature matrix
    - Design focus: Pricing cards, persuasive design

12. ✅ Empty States & Loading (Score: 70)
    - Reason: Important UX quality signals
    - Features: Empty, loading, error states
    - Design focus: Illustrations, helpful messaging

### EXCLUDED SCREENS (Reasons):
- ❌ Billing Page (40): Merged into Settings
- ❌ Team Management (30): Single-user tool
- ❌ Comparison View (50): Not core to rank tracking
- ❌ Export Success (30): Toast notification sufficient
- ❌ Onboarding (60): Single-step setup sufficient
- ❌ Filter Drawer (60): Filters inline in table
- ❌ Notifications Screen (20): Component only, not full screen
- ❌ Dialogs Screen (20): Component library covers this

### WIREFRAME SET COMPOSITION:
- Desktop screens: 10
- Mobile screens: 2 (Dashboard + optional Navigation)
- Total: 12 wireframes

### DESIGN COVERAGE:
✅ Complete user journey: Landing → Signup → Dashboard → Add Data → View Details → Settings
✅ Component showcase: Component Library screen
✅ Responsive design: Mobile Dashboard
✅ Key interactions: Modals, tables, forms, charts
✅ UI states: Empty, loading, error (dedicated screen)
✅ Monetization: Upgrade modal

### NEXT STEP: Pre-Wireframe Checklist (Step 4.6)
```

---

## ✅ STEP 4.6: PRE-WIREFRAME CREATION CHECKLIST (NEW)

### **Purpose:** Prevent AI hallucination by verifying data and constraints before generation.

**MANDATORY: AI must complete this checklist BEFORE generating ANY wireframes.**

```markdown
## PRE-WIREFRAME CREATION CHECKLIST

### SECTION 1: DATA VERIFICATION

**1.1 Competitor Analysis Complete**
- [ ] All selected competitors analyzed (minimum 3)
- [ ] Features extracted from ACTUAL screenshots/videos/content
- [ ] 20 screen types documented for each competitor
- [ ] Best-of-breed synthesis completed
- [ ] No guessed features - everything backed by evidence

**Evidence Check:**
- [ ] Screenshot inventory created for each competitor
- [ ] Source URLs documented for each feature
- [ ] Video timestamps noted for dynamic features
- [ ] Third-party sources consulted (YouTube, reviews, docs)

**Red Flags (STOP if true):**
- ❌ Features described without screenshot evidence
- ❌ "Assume" or "probably" language in feature extraction
- ❌ Incomplete competitor analysis (< 3 competitors)
- ❌ Missing source attribution for features

---

### SECTION 2: DESIGN SYSTEM UNDERSTANDING

**2.1 Design System File Loaded**
- [ ] claude.md file read successfully
- [ ] Path confirmed: [Insert actual path]
- [ ] File size verified: [Insert size] (should be > 10KB)
- [ ] Content parsed: All tokens extracted

**2.2 Color Tokens Extracted**
- [ ] Brand primary: [Insert hex] (should be #FF5722 or similar)
- [ ] Neutral grays: [Count] shades extracted (should be 7-10)
- [ ] Semantic colors: Error, success, warning defined
- [ ] All hex values are 6 characters (no shortcuts like #FFF)

**2.3 Typography Tokens Extracted**
- [ ] Font family: [Insert name] (should be Inter or similar)
- [ ] Display sizes: [Insert values] (e.g., 57px, 36px)
- [ ] Body sizes: [Insert values] (e.g., 16px, 14px)
- [ ] Line heights: [Insert values] (e.g., 64px, 44px, 28px)
- [ ] Font weights: [Insert values] (e.g., 400, 600)

**2.4 Spacing Tokens Extracted**
- [ ] Spacing unit: [Insert value] (should be 4px for 4pt grid)
- [ ] Spacing scale: [List all values] (e.g., 4, 8, 12, 16, 24, 32, 48)
- [ ] NO odd numbers present (no 5px, 15px, 25px)
- [ ] NO arbitrary values (no 13px, 17px, 23px)

**2.5 Component Dimensions Extracted**
- [ ] Button heights: [Insert values] (e.g., 36px, 40px, 48px)
- [ ] Input heights: [Insert value] (e.g., 56px)
- [ ] Card padding: [Insert value] (e.g., 24px)
- [ ] Border radius values: [List] (e.g., 12px, 16px, 20px)
- [ ] Icon sizes: [List] (e.g., 16px, 24px, 32px, 40px)

**2.6 Component Classes Documented**
- [ ] Button classes: .btn-filled, .btn-outlined, .btn-text
- [ ] Card classes: .card, .kpi, .stat-card
- [ ] Table classes: .table, row/column styling
- [ ] Modal classes: .modal-root, .drawer
- [ ] Form classes: .textfield, .select, .checkbox

**Red Flags (STOP if true):**
- ❌ Design system file not found or empty
- ❌ Fewer than 20 design tokens extracted
- ❌ Spacing values include odd numbers (5, 15, 25)
- ❌ No component dimension specifications
- ❌ Missing critical tokens (colors, typography, spacing)

---

### SECTION 3: WIREFRAME PLAN VALIDATION

**3.1 Screen Selection Justified**
- [ ] 10-20 screens selected from 20 analyzed
- [ ] Selection based on scoring matrix
- [ ] All essential screens included (landing, dashboard, table, component library)
- [ ] At least 1 mobile screen selected
- [ ] Component library screen ALWAYS included

**3.2 User Journey Coverage**
- [ ] Entry point: Landing page ✓
- [ ] Authentication: Signup/Login ✓
- [ ] Main experience: Dashboard + Tool Dashboard ✓
- [ ] Data interaction: Table + Detail view ✓
- [ ] Settings/account: Settings page ✓
- [ ] Mobile: At least 1 mobile variant ✓

**3.3 Design System Coverage**
- [ ] Component Library screen will show:
  - [ ] All button styles (.btn-filled, .btn-outlined, .btn-text)
  - [ ] All card styles (.card, .kpi, .stat-card)
  - [ ] Form elements (inputs, selects, checkboxes, radios)
  - [ ] Tables with all states
  - [ ] Modals and drawers
  - [ ] Notifications (toast, banner, inline)
  - [ ] Empty/loading/error states
  - [ ] Navigation patterns
  - [ ] Icons and avatars
  - [ ] Typography scale (all 7 sizes)

**Red Flags (STOP if true):**
- ❌ Fewer than 10 screens selected
- ❌ Component Library screen not included
- ❌ No mobile screens selected
- ❌ User journey has gaps (can't get from login to core feature)
- ❌ No justification for screen selection

---

### SECTION 4: CONTENT PREPARATION

**4.1 Realistic Content Ready**
- [ ] Tool-specific terminology documented (not "Metric 1, Metric 2")
- [ ] Actual metric names from competitors (e.g., "Current Rank", "Visibility Score")
- [ ] Realistic data ranges (e.g., "Rank: #5", "Volume: 12.5K")
- [ ] Proper date formats (e.g., "Jan 15, 2025", "2h ago")
- [ ] Industry-specific vocabulary (ASO terms for ASO tool)

**4.2 Component Text**
- [ ] Button labels: Action-oriented (e.g., "Add Keyword", not "Submit")
- [ ] Empty states: Helpful (e.g., "No keywords yet. Add your first keyword to start tracking.")
- [ ] Error messages: Specific (e.g., "This field is required", not "Error")
- [ ] Placeholder text: Contextual (e.g., "Enter keyword to track...")

**4.3 Data Variety**
- [ ] Tables show varied data (not all same rank, all same date)
- [ ] Charts show realistic trends (not just straight lines)
- [ ] KPIs show change indicators (↑↓→ with colors)
- [ ] Lists include different states (active, pending, error)

**Red Flags (STOP if true):**
- ❌ Generic placeholders ("Lorem ipsum", "Metric 1")
- ❌ Unrealistic data (rank of 999, volume of 1000000000)
- ❌ No variety in data presentation
- ❌ Vague labels ("Click here", "Submit", "Button")

---

### SECTION 5: TECHNICAL CONSTRAINTS

**5.1 Canvas Specifications**
- [ ] Desktop size: 1440x900 confirmed
- [ ] Mobile size: 375x812 confirmed
- [ ] Output format: SVG confirmed
- [ ] Output folder: Path verified and exists

**5.2 SVG Generation Rules**
- [ ] Use <text>, <rect>, <circle>, <path> elements
- [ ] No ASCII art or hand-drawn mockups
- [ ] Group related elements with <g> tags
- [ ] Include <style> block with design tokens
- [ ] Use exact hex colors (no color names like "red")
- [ ] Use exact pixel values (no percentages for fixed layouts)

**5.3 Accessibility Requirements**
- [ ] Text contrast ratio ≥ 4.5:1 for body text (WCAG AA)
- [ ] Text contrast ratio ≥ 3:1 for UI elements (WCAG AA)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Focus states defined for interactive elements
- [ ] Text readable at specified sizes (minimum 14px body)

**Red Flags (STOP if true):**
- ❌ Output folder doesn't exist
- ❌ Canvas sizes not confirmed
- ❌ Planning to use ASCII art or sketches
- ❌ No accessibility validation planned

---

### SECTION 6: CONSISTENCY ENFORCEMENT

**6.1 Global Elements Defined**
- [ ] Header/navigation: Same height (64px) across all screens
- [ ] Logo: Same size and position
- [ ] Navigation items: Same structure
- [ ] User menu: Same placement
- [ ] Footer: Same content and styling (if applicable)

**6.2 Component Patterns Locked**
- [ ] All buttons: Same heights (36/40/48px), same radius (12px), same brand color
- [ ] All cards: Same radius (16px), same padding (24px), same shadow (elevation-1)
- [ ] All inputs: Same height (56px), same radius (12px), same focus state
- [ ] All tables: Same header style, same row height, same borders
- [ ] All modals: Same max-width (560px), same radius (20px), same backdrop

**6.3 Layout Structure Locked**
- [ ] Sidebar width: 240px (if sidebar layout)
- [ ] Main content padding: 32px
- [ ] Page max-width: 1200px
- [ ] Section spacing: 56px vertical
- [ ] Grid gaps: 16px (default)

**Red Flags (STOP if true):**
- ❌ Different button heights planned for same screen type
- ❌ Varying card styles without justification
- ❌ No global element specifications
- ❌ Layout measurements not documented

---

### CHECKLIST COMPLETION VERIFICATION

**AI MUST ANSWER:**

1. **Data Quality:** Rate 1-10 how confident you are that all features are backed by evidence (not guessed).
   - Answer: [Insert 1-10]
   - If < 8, STOP and improve competitor analysis

2. **Design System:** Rate 1-10 how well you understand the design system tokens.
   - Answer: [Insert 1-10]
   - If < 9, STOP and re-read claude.md

3. **Consistency:** Rate 1-10 how confident you are that all wireframes will be visually consistent.
   - Answer: [Insert 1-10]
   - If < 9, STOP and document global patterns

4. **Completeness:** Rate 1-10 how complete your wireframe plan is.
   - Answer: [Insert 1-10]
   - If < 8, STOP and refine plan

**Final Check:**
- [ ] All checklist items marked complete
- [ ] All red flags avoided
- [ ] All confidence scores ≥ 8/10
- [ ] Wireframe plan document created
- [ ] Ready to proceed to STEP 5

**SIGN-OFF:**
- Checklist completed by: [AI Model]
- Date: [Current Date]
- Status: ✅ READY TO GENERATE / ⚠️ NEEDS REVISION

**If ANY red flags present or confidence scores < 8, DO NOT PROCEED to wireframe generation.**
**Return to relevant section and complete missing work.**
```

---

## 🎨 STEP 5: GENERATE UI-CONSISTENT WIREFRAME SET

### **5.1 UI CONSISTENCY REQUIREMENTS (MANDATORY)**

**Global Elements (MUST appear consistently across all wireframes):**

**Header/Navigation:**
- Same height (64px) on all screens
- Same logo position and size
- Same navigation structure
- Same user menu placement
- Same search bar (if present)
- Same styling (background, borders, shadows)

**Layout Structure:**
- Consistent sidebar width (240px) if using sidebar layout
- Consistent main content padding (32px)
- Consistent page header pattern (title + actions)
- Consistent breadcrumb format (if used)
- Consistent max-width containers (1200px)

**Component Styling:**
- ALL buttons use same heights: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
- ALL buttons use same radius: 12px
- ALL buttons use same brand color: #FF5722
- ALL cards use same radius: 16px
- ALL cards use same padding: 24px
- ALL cards use same shadow: elevation-1
- ALL text uses same font: Inter
- ALL text uses same size scale: 57px, 36px, 32px, 22px, 16px, 14px
- ALL spacing uses same 4pt grid: 4px, 8px, 12px, 16px, 24px, 32px, 48px

**Color Palette (Strict Adherence):**
- Primary brand: #FF5722 (all CTAs, links, active states)
- Text primary: #111827 (headings, body text)
- Text secondary: #6B7280 (captions, descriptions)
- Surface: #FFFFFF (cards, modals, backgrounds)
- Borders: #E5E7EB (dividers, outlines)
- Surface variant: #F9FAFB (subtle backgrounds)

**Typography Hierarchy:**
```
Display Large (57px/600): Hero headlines only
Display Small (36px/600): Sub-heroes, major section titles
Headline Large (32px/600): Page titles, H1
Title Large (22px/600): Card titles, section headers, H2
Body Large (16px/400): Body text, descriptions, table content
Body Small (14px/400): Captions, helper text, meta info
Label Large (14px/600): Button labels, form labels, badges
```

---

### **5.2 SVG GENERATION RULES (MANDATORY)**

**Format Requirements:**
- Output format: Clean, semantic SVG (not ASCII, not hand-drawn)
- Canvas size: 1440×900 (desktop) or 375×812 (mobile)
- Use <text>, <rect>, <circle>, <path> SVG elements
- Group related elements with <g> tags
- Add CSS <style> block with design system colors/fonts
- Include component annotations layer (hidden, for dev reference)

**Design System Application (NON-NEGOTIABLE):**
- ALL colors MUST use exact hex values from Step 4.1
- ALL text MUST use Inter font family
- ALL font sizes MUST match typography scale from Step 4.2
- ALL spacing MUST use 4pt grid from Step 4.3 (no 5px, no 15px, no odd numbers!)
- ALL component dimensions MUST match Step 4.4
- ALL border radius MUST use values from Step 4.5 (4px, 6px, 8px, 12px, 16px, 20px, 9999px)
- ALL shadows MUST use elevation system from Step 4.6

**Quality Standards:**
- Pixel-perfect alignment to 4pt grid
- Consistent visual hierarchy (size, color, weight)
- Professional spacing (not cramped, not excessive)
- Realistic content (no lorem ipsum, use actual tool-specific text)
- Proper contrast ratios (WCAG AA minimum: 4.5:1 text, 3:1 UI)

**Wireframe Generation Order:**
```
Generate in this sequence to maintain consistency:

1. Component Library (FIRST)
   - Establishes all component patterns
   - Reference for all subsequent screens
   - Validates design system understanding

2. Core Screens (reference Component Library)
   - Complete Landing Page
   - Signup/Login
   - Dashboard
   - Tool Dashboard
   - Data Table

3. Secondary Screens (reuse components from #1 and #2)
   - Detail View
   - Settings
   - Modals/Popups

4. Mobile Screens (adapt desktop patterns)
   - Mobile Dashboard
   - Mobile Navigation (optional)

5. Specialized Screens (tool-specific)
   - Upgrade Modal
   - Empty States
   - Comparison View (if selected)
   - Export Flow (if selected)
```

**File Naming Convention:**
```
[tool-name][number].svg

Examples:
rank1.svg  # Complete Landing Page
rank2.svg  # Signup/Login
rank3.svg  # Dashboard
rank4.svg  # Tool Dashboard
rank5.svg  # Data Table
rank6.svg  # Detail View
rank7.svg  # Add Keyword Modal
rank8.svg  # Settings
rank9.svg  # Component Library
rank10.svg # Mobile Dashboard
rank11.svg # Upgrade Modal (if selected)
rank12.svg # Empty States (if selected)
```

---

## ✅ STEP 6: VALIDATION & DELIVERY

### **6.1 Validation Checklist**

**Completeness Check:**
- [ ] All selected screens generated (minimum 10)
- [ ] Component Library screen included
- [ ] At least 1 mobile screen included
- [ ] File naming convention followed
- [ ] All files in output folder

**Design System Compliance:**
- [ ] All colors use exact hex values from claude.md
- [ ] All typography uses exact sizes from claude.md
- [ ] All spacing uses 4pt grid (no odd numbers)
- [ ] All components use defined dimensions
- [ ] All border radius values match tokens
- [ ] All shadows use elevation system

**UI Consistency Verification:**
- [ ] Header height same across all screens (64px)
- [ ] Logo same size/position across all screens
- [ ] Navigation structure consistent
- [ ] Button styles identical across all screens
- [ ] Card styles identical across all screens
- [ ] Typography hierarchy consistent
- [ ] Color usage consistent

**Content Quality:**
- [ ] No "Lorem ipsum" or placeholder text
- [ ] Tool-specific terminology used
- [ ] Realistic data values and ranges
- [ ] Varied data presentation (not repetitive)
- [ ] Proper date/time formats
- [ ] Industry-appropriate vocabulary

**Accessibility Validation:**
- [ ] Text contrast ≥ 4.5:1 for body text
- [ ] Text contrast ≥ 3:1 for UI elements
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Focus states visible
- [ ] Text readable at specified sizes

**Technical Quality:**
- [ ] All SVGs valid and renderable
- [ ] No syntax errors in SVG code
- [ ] File sizes reasonable (< 500KB each)
- [ ] All referenced fonts embedded or web-safe
- [ ] Clean code (properly indented, commented)

---

### **6.2 Deliverables**

**Output Folder Structure:**
```
/home/coder/Praveen/SEO/Research/test4/wireframes/
├── competitor-analysis/
│   ├── competitor-list.yaml
│   ├── competitor-1-analysis.md
│   ├── competitor-2-analysis.md
│   ├── competitor-3-analysis.md
│   └── best-of-breed-features.md
├── design-system/
│   ├── design-system-reference.json
│   └── design-tokens-extracted.css
├── wireframe-plan/
│   ├── screen-selection-plan.md
│   ├── scoring-matrix.yaml
│   └── pre-wireframe-checklist.md (COMPLETED)
├── wireframes/
│   ├── rank1.svg  # Complete Landing Page
│   ├── rank2.svg  # Signup/Login
│   ├── rank3.svg  # Dashboard
│   ├── rank4.svg  # Tool Dashboard
│   ├── rank5.svg  # Data Table
│   ├── rank6.svg  # Detail View
│   ├── rank7.svg  # Add Keyword Modal
│   ├── rank8.svg  # Settings
│   ├── rank9.svg  # Component Library ⭐
│   ├── rank10.svg # Mobile Dashboard
│   ├── rank11.svg # Upgrade Modal (optional)
│   └── rank12.svg # Empty States (optional)
└── README.md  # Usage instructions
```

**README.md Contents:**
```markdown
# [TOOL_NAME] Wireframes

## Overview
This package contains [COUNT] high-fidelity wireframes for [TOOL_NAME], an [TOOL_CATEGORY] tool.

## Methodology
- Analyzed [COUNT] competitors: [List names]
- Extracted features from 20 screen types using screenshots and demos
- Selected best-of-breed patterns from competitor analysis
- Applied design system from claude.md
- Generated UI-consistent SVG wireframes

## Wireframe Set
**Total Screens:** [COUNT]
**Desktop:** [COUNT]
**Mobile:** [COUNT]

### Screen List:
1. `rank1.svg` - Complete Landing Page
2. `rank2.svg` - Signup/Login
3. `rank3.svg` - Dashboard
4. `rank4.svg` - Tool Dashboard
5. `rank5.svg` - Data Table
6. `rank6.svg` - Detail View
7. `rank7.svg` - Add Keyword Modal
8. `rank8.svg` - Settings
9. `rank9.svg` - **Component Library** ⭐ (Design system showcase)
10. `rank10.svg` - Mobile Dashboard
[... additional screens if generated ...]

## Design System
- **Brand Color:** #FF5722
- **Font:** Inter
- **Spacing:** 4pt grid (4, 8, 12, 16, 24, 32, 48px)
- **Typography:** 57px, 36px, 32px, 22px, 16px, 14px
- **Border Radius:** 4px, 8px, 12px, 16px, 20px, 9999px
- **Shadows:** 5 elevation levels

## Quality Assurance
✅ All screens use exact design system values
✅ UI consistency verified across all wireframes
✅ No placeholder content (tool-specific terminology)
✅ WCAG AA accessibility compliance
✅ 4pt grid alignment (no odd numbers)
✅ Responsive design (mobile variants included)

## Usage
1. Open SVG files in browser or design tool (Figma, Sketch, Adobe XD)
2. Reference Component Library (rank9.svg) for design patterns
3. Use as specification for development
4. Adapt as needed for your specific use case

## Files Included
- `/competitor-analysis/` - Research and feature extraction
- `/design-system/` - Design tokens and references
- `/wireframe-plan/` - Selection strategy and checklist
- `/wireframes/` - SVG wireframe files
- `README.md` - This file

## Next Steps
1. Review all wireframes for completeness
2. Validate against project requirements
3. Gather stakeholder feedback
4. Iterate as needed
5. Hand off to development team

---

Generated by UNIVERSAL WIREFRAME GENERATOR v3.0
Date: [GENERATION_DATE]
```

---

## 📚 APPENDIX A: TROUBLESHOOTING

### **Issue: Competitors not found**
- **Solution:** Manually specify competitor URLs in Step 1
- Try different search terms or categories
- Look for "[TOOL_CATEGORY] tools" or "[TOOL_CATEGORY] software"
- Check Product Hunt, G2, Capterra for competitors

### **Issue: Cannot access competitor features (login required)**
- **Solution:** Use multi-source content collection:
  - Analyze marketing screenshots from homepage/features pages
  - Extract frames from demo videos on YouTube
  - Find third-party reviews with UI screenshots
  - Check documentation for annotated screenshots
  - Look at app store screenshots for mobile views

### **Issue: Design system values incorrect**
- **Solution:**
  - Verify claude.md path is correct
  - Check that all tokens are properly defined in claude.md
  - Re-run Step 4 design system extraction
  - Validate extracted tokens against original file

### **Issue: SVG not rendering properly**
- **Solution:**
  - Validate SVG syntax using online validator
  - Check that all fonts are embedded or web-safe
  - Verify hex colors are 6 characters (#FF5722, not #F57)
  - Ensure no special characters in text elements

### **Issue: Wireframes don't match competitors**
- **Solution:**
  - Review Step 2 feature extraction
  - Ensure features are documented with evidence (screenshots)
  - Check that synthesis (Step 3) properly combines competitor patterns
  - Verify wireframe plan references specific competitor examples

### **Issue: Inconsistent spacing or sizing**
- **Solution:**
  - Re-check Step 4 design system mapping
  - Use exact pixel values from tokens (no rounding)
  - Validate 4pt grid alignment (no 5px, 15px, 25px)
  - Run pre-wireframe checklist (Step 4.6) again

### **Issue: AI hallucinating features**
- **Solution:**
  - Complete pre-wireframe checklist (Step 4.6) BEFORE generation
  - Ensure all features backed by screenshot evidence
  - Remove "assume" or "probably" language from analysis
  - Add source attribution for every feature claim

### **Issue: Wireframes lack UI consistency**
- **Solution:**
  - Generate Component Library FIRST (establishes patterns)
  - Lock global element specifications before starting
  - Use same measurements for same components across all screens
  - Validate each wireframe against Component Library

### **Issue: Too many/too few wireframes**
- **Solution:**
  - Follow scoring matrix in Step 4.5
  - Minimum 10 screens (including Component Library)
  - Maximum 20 screens (only for very complex tools)
  - Focus on quality over quantity

---

## 📚 APPENDIX B: SCREEN SELECTION REFERENCE

### **ALWAYS INCLUDE (Minimum 7 screens):**
1. **Complete Landing Page** - Marketing entry point
2. **Global Dashboard** - Main app screen after login
3. **Tool Dashboard** - Core tool functionality view
4. **Data Table** - Primary data display (universal pattern)
5. **Signup/Login** - Authentication
6. **Add/Manage Modal** - Core CRUD operation
7. **Component Library** - Design system showcase ⭐

### **ALMOST ALWAYS INCLUDE (Choose 2-3):**
8. **Detail View** - Single entity deep dive
9. **Mobile Variant** - Responsive design (usually Dashboard)
10. **Settings** - User preferences/account management

### **CONDITIONAL (Choose 0-3 based on tool):**
11. **Upgrade/Paywall Modal** - If freemium model
12. **Empty/Loading States** - If UX quality important
13. **Export/Report** - If data export is core feature
14. **Filter Drawer** - If complex filtering needed
15. **Comparison View** - If A vs B analysis is core feature
16. **Onboarding** - If multi-step setup required
17. **Team Management** - If collaboration features exist
18. **Billing** - If separate from Settings (usually merge)
19. **Mobile Navigation** - If navigation pattern is complex
20. **Export Success** - Rarely needed (toast sufficient)

---

## 📚 APPENDIX C: DESIGN SYSTEM QUICK REFERENCE

**Colors:**
- Brand: #FF5722
- Text: #111827 (primary), #6B7280 (secondary)
- Surface: #FFFFFF
- Border: #E5E7EB
- Error: #DC2626

**Typography:**
- Display: 57px / 36px
- Headline: 32px
- Title: 22px
- Body: 16px / 14px
- Weight: 400 (normal), 600 (bold)

**Spacing (4pt grid):**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px
- NO: 5px, 15px, 25px (odd numbers)

**Components:**
- Button: 40px height, 12px radius
- Card: 16px radius, 24px padding
- Input: 56px height, 12px radius
- Modal: 560px max-width, 20px radius
- Icon: 24px default

**Shadows:**
- Card: elevation-1 (0 1px 3px rgba(0,0,0,0.10))
- Hover: elevation-2 (0 4px 6px rgba(0,0,0,0.10))
- Modal: elevation-5 (0 25px 50px rgba(0,0,0,0.25))

---

## 🚀 QUICK START GUIDE

### **1. Configure Input (2 minutes)**
Edit INPUT section at top of this file:
- TOOL_NAME
- TOOL_PURPOSE
- TOOL_CATEGORY
- DESIGN_SYSTEM_PATH
- OUTPUT_FOLDER

### **2. Run Workflow (30-60 minutes total)**

**Step 1: Auto-Discover (3 min)**
→ AI searches for competitors
→ Output: competitor-list.yaml

**Step 2: Feature Extraction (15-20 min)**
→ AI analyzes screenshots/demos for 20 screen types per competitor
→ Output: competitor-analysis-[name].md for each

**Step 3: Synthesize (5 min)**
→ AI selects best features from all competitors
→ Output: best-of-breed-features.md

**Step 4: Load Design System (1 min)**
→ AI reads claude.md and extracts tokens
→ Output: design-system-reference.json

**Step 4.5: Select Screens (3 min)**
→ AI scores 20 screen types and selects minimum 10
→ Output: screen-selection-plan.md

**Step 4.6: Pre-Wireframe Checklist (5 min)**
→ AI validates data, design system, content before generation
→ Output: pre-wireframe-checklist.md (COMPLETED)

**Step 5: Generate Wireframes (2-3 min per wireframe = 20-30 min)**
→ AI creates SVG wireframes with strict UI consistency
→ Output: rank1.svg, rank2.svg, ..., rank10.svg (or more)

**Step 6: Validate (5 min)**
→ AI verifies compliance, consistency, quality
→ Output: README.md + complete wireframe set

### **3. Review Output**
Navigate to: `[OUTPUT_FOLDER]/wireframes/`
Open: `rank9.svg` (Component Library) FIRST to see design system
Then: Review all other screens for consistency

---

**END OF UNIVERSAL WIREFRAME GENERATOR v3.0**

**Version:** 3.0 - Enhanced with Screenshot Analysis, AI Selection, Hallucination Prevention
**Last Updated:** 2025-10-22
**Status:** Production Ready ✅

**Key Improvements in v3.0:**
✅ Input section moved to top
✅ Screenshot-based analysis for login-required tools
✅ AI selects minimum 10 from 20-screen analysis
✅ Pre-wireframe checklist prevents hallucination
✅ Design system verification step added
✅ Enhanced quality controls and validation
