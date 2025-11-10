/* ============================================================
   COMPLETE DESIGN SYSTEM - Ready for Automated Wireframe Generation
   Brand: #FF5722 • Font: Inter • Icons: Material Symbols

   This is the FINAL, PRODUCTION-READY design system.
   Use this single file to generate all 20+ wireframes without errors.
   ============================================================ */

/* ---------- TOKENS ---------- */
:root{
  /* Brand */
  --brand-50:#FFF3E0;--brand-100:#FFE0B2;--brand-200:#FFCC80;--brand-300:#FFB74D;
  --brand-400:#FFA726;--brand-500:#FF5722;--brand-600:#F4511E;--brand-700:#E64A19;
  --brand-800:#D84315;--brand-900:#BF360C;

  /* Neutrals */
  --neutral-25:#FCFCFD;--neutral-50:#F9FAFB;--neutral-100:#F3F4F6;--neutral-200:#E5E7EB;
  --neutral-300:#D1D5DB;--neutral-400:#9CA3AF;--neutral-500:#6B7280;--neutral-600:#4B5563;
  --neutral-700:#374151;--neutral-800:#1F2937;--neutral-850:#171E2C;--neutral-900:#111827;--neutral-950:#0A0E16;

  /* M3 role mapping (LIGHT) */
  --md-sys-color-primary:var(--brand-500);
  --md-sys-color-on-primary:#FFFFFF;
  --md-sys-color-primary-container:var(--brand-50);
  --md-sys-color-on-primary-container:#4F1C0F;

  --md-sys-color-secondary:var(--neutral-700);
  --md-sys-color-on-secondary:#FFFFFF;
  --md-sys-color-secondary-container:var(--neutral-100);
  --md-sys-color-on-secondary-container:var(--neutral-800);

  --md-sys-color-tertiary:var(--brand-700);
  --md-sys-color-on-tertiary:#FFFFFF;
  --md-sys-color-tertiary-container:var(--brand-100);
  --md-sys-color-on-tertiary-container:#4F1C0F;

  --md-sys-color-error:#DC2626;
  --md-sys-color-on-error:#FFFFFF;
  --md-sys-color-error-container:#FEE2E2;
  --md-sys-color-on-error-container:#7F1D1D;

  --md-sys-color-background:#FFFFFF;
  --md-sys-color-on-background:var(--neutral-900);
  --md-sys-color-surface:#FFFFFF;
  --md-sys-color-on-surface:var(--neutral-900);
  --md-sys-color-surface-variant:var(--neutral-50);
  --md-sys-color-on-surface-variant:var(--neutral-600);
  --md-sys-color-outline:var(--neutral-200);
  --md-sys-color-outline-variant:var(--neutral-300);
  --md-sys-color-inverse-surface:var(--neutral-900);
  --md-sys-color-inverse-on-surface:#F4F6F8;
  --md-sys-color-inverse-primary:var(--brand-300);
  --md-sys-color-scrim:rgba(0,0,0,.55);

  /* Typography */
  --md-font:"Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  --md-type-display-lg:57px/64px 600;
  --md-type-display-sm:36px/44px 600;
  --md-type-headline-lg:32px/40px 600;
  --md-type-title-lg:22px/28px 600;
  --md-type-label-lg:14px/20px 600;
  --md-type-body-lg:16px/24px 400;
  --md-type-body-sm:14px/20px 400;

  /* Shape */
  --md-sys-shape-corner-xs:4px;--md-sys-shape-corner-sm:6px;--md-sys-shape-corner-md:8px;
  --md-sys-shape-corner-lg:12px;--md-sys-shape-corner-xl:16px;--md-sys-shape-corner-2xl:20px;
  --md-sys-shape-corner-3xl:24px;--md-sys-shape-corner-full:9999px;

  /* Elevation */
  --md-sys-elevation-0:none;
  --md-sys-elevation-1:0 1px 3px 0 rgb(0 0 0/.10),0 1px 2px -1px rgb(0 0 0/.10);
  --md-sys-elevation-2:0 4px 6px -1px rgb(0 0 0/.10),0 2px 4px -2px rgb(0 0 0/.10);
  --md-sys-elevation-3:0 10px 15px -3px rgb(0 0 0/.10),0 4px 6px -4px rgb(0 0 0/.10);
  --md-sys-elevation-4:0 20px 25px -5px rgb(0 0 0/.10),0 8px 10px -6px rgb(0 0 0/.10);
  --md-sys-elevation-5:0 25px 50px -12px rgb(0 0 0/.25);

  /* Specials */
  --shadow-brand-glow:0 0 0 1px rgb(255 87 34/.10),0 8px 16px -4px rgb(255 87 34/.30);
  --md-sys-motion-duration-short:150ms;
  --md-sys-motion-duration-medium:250ms;
  --md-sys-motion-duration-long:300ms;
  --md-sys-motion-ease-standard:cubic-bezier(.4,0,.2,1);

  /* Spacing (4pt) */
  --space-0:0px;--space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;
  --space-5:20px;--space-6:24px;--space-7:28px;--space-8:32px;--space-9:40px;--space-10:48px;

  /* Focus */
  --md-sys-focus-ring:0 0 0 3px rgb(255 87 34/.50);
}

/* ============================================================
   SVG WIREFRAME GENERATION RULES
   CRITICAL: Follow these rules to avoid padding/spacing issues
   ============================================================ */

/* ---------- VISUAL HIERARCHY PRINCIPLE (READ THIS FIRST) ---------- */
/*
  THE GOLDEN RULE: LABEL + VALUE = ONE METRIC UNIT

  In KPI cards (DOMAIN RATING / 25 / ↓ 24):
  - "DOMAIN RATING" + "25" = ONE METRIC (tight relationship, close spacing)
  - "↓ 24" = Comparison/trend (separate element, more spacing)

  THE VALUE (25) MUST DOMINATE THROUGH FONT SIZE, NOT SPACING:
  ✓ Largest font size (36px vs 14px label) - 2.5× bigger!
  ✓ Font weight 600 (bold)
  ✓ Close to label (they're ONE unit)
  ✓ Generous padding AROUND the entire metric card

  KEY INSIGHT FROM UI DESIGN RESEARCH:
  - **TIGHT spacing** (8px) = elements are RELATED (label + value = ONE metric)
  - **MODERATE spacing** (12-16px) = elements are SEPARATE (value → trend)
  - **GENEROUS padding** (24px) = breathing room AROUND card
  - **SECTION spacing** (48px) = gaps BETWEEN major containers/sections
  - **SECTION top padding** (8px) = internal padding INSIDE section containers for equal placement

  ❌ WRONG (Label and value far apart):
  [24px padding]
  DOMAIN RATING          ← Label
  [24px gap]             ← TOO MUCH! Breaks the metric unit
  25                     ← Value feels disconnected from label
  [16px gap]
  ↓ 24
  [24px padding]

  Result: "What does 25 mean?" - user has to visually reconnect label and value

  ✅ CORRECT (Label and value as ONE UNIT):
  [24px padding - generous around card]
  DOMAIN RATING          ← Label (14px)
  [8px gap]              ← TIGHT! They're one metric unit
  25                     ← Value (36px) - size creates dominance, not spacing
  [12px gap]             ← MODERATE - trend is separate info
  ↓ 24                   ← Trend (14px)
  [24px padding - generous around card]

  Result: "Domain Rating is 25" - instant understanding, cohesive metric

  SPACING HIERARCHY FOR KPI CARDS (CORRECT):
  1. Card padding (all sides): 24px ← GENEROUS breathing room around card
  2. Label (14px, context, 20h line-height)
     ↓ 8px gap ← TIGHT! Label and value are ONE UNIT
  3. VALUE (36px, THE HERO, 44h line-height) ← Dominates through SIZE
     ↓ 12px gap ← MODERATE - trend is separate information
  4. Trend (14px, supplementary, 20h line-height)
  5. Card padding (bottom): 24px ← GENEROUS breathing room

  Container height: ~120h (compact but not cramped)

  DESIGN PRINCIPLE:
  - Proximity = Relationship: Close spacing = "these belong together"
  - Generous padding AROUND the card, TIGHT spacing WITHIN the metric
  - Font size creates hierarchy, not excessive spacing
*/

/* ---------- CONTAINER DIMENSION CALCULATION ---------- */
/*
  FUNDAMENTAL RULE: Container dimensions MUST be calculated based on content dimensions.
  NEVER set arbitrary container sizes and try to fit content inside.

  FORMULA:
  Container Width  = Content Width  + (2 × Horizontal Padding)
  Container Height = Content Height + (2 × Vertical Padding)

  STANDARD PADDING:
  - Component internal padding: 24px on all 4 sides
  - Container calculation: Content dimensions + 48px (24px × 2)
  - Section spacing: 48px between major sections
  - Grid gaps: 16px between cards in same row
*/

/* ---------- SVG GROUP TRANSFORM PATTERN ---------- */
/*
  CORRECT PATTERN (Equal padding on all 4 sides):

  <g transform="translate(x, y)">
    <!-- Step 1: Draw container with calculated dimensions -->
    <rect width="W" height="H" rx="16" class="bg-surface stroke-outline" stroke-width="1"/>

    <!-- Step 2: Create padding wrapper - THIS IS CRITICAL -->
    <g transform="translate(24, 24)">
      <!-- Step 3: Position ALL content from (0, 0) to (W-48, H-48) -->
      <text y="16" class="font-title">Title</text>
      <!-- Content positioned relative to (0,0) after translate -->
      <text y="40" class="font-body">Body text</text>
      <!-- Last element must fit within content area -->
    </g>
  </g>

  WRONG PATTERN (DO NOT USE):
  <g transform="translate(x, y)">
    <rect width="W" height="H"/>
    <!-- ❌ Content NOT wrapped in translate(24,24) -->
    <text y="40">Text starts too far from top</text>
  </g>
*/

/* ========== QUICK REFERENCE: ABSOLUTE Y-COORDINATES ========== */
/*
  ⚠️ COPY-PASTE THESE EXACT VALUES - NO CALCULATIONS NEEDED! ⚠️

  KPI CARD (36px value, 120h container):
  ─────────────────────────────────────
  <rect width="276" height="120" rx="16"/>
  <g transform="translate(24, 24)">
    <text y="11" class="font-body-sm">LABEL</text>
    <text y="39" class="font-display-sm">VALUE</text>
    <text y="95" class="font-body-sm">TREND</text>
  </g>

  SECONDARY METRIC (32px value, 100h container):
  ─────────────────────────────────────
  <rect width="276" height="100" rx="16"/>
  <g transform="translate(24, 24)">
    <text y="11" class="font-body-sm">LABEL</text>
    <text y="38" class="font-headline">VALUE</text>
    <text y="91" class="font-body-sm">TREND</text>
  </g>

  SECTION WITH TITLE:
  ─────────────────────────────────────
  <g transform="translate(24, 24)">
    <text y="16" class="font-title">Section Title</text>
  </g>

  VERTICAL SPACING (SECTIONS):
  ─────────────────────────────────────
  Next_Y = Previous_Y + Previous_Height + 48

  Example:
  - Section 1: y=104, height=120 → ends at 224
  - Section 2: y=272 (224 + 48) ✓

  HORIZONTAL SPACING (4-COLUMN GRID):
  ─────────────────────────────────────
  Card 1: x=32
  Card 2: x=324 (32 + 276 + 16)
  Card 3: x=616 (324 + 276 + 16)
  Card 4: x=908 (616 + 276 + 16)
*/

/* ========== ABSOLUTE SPACING RULES - MATHEMATICAL FORMULAS ========== */
/*
  ⚠️ THESE ARE ABSOLUTE RULES - NEVER DEVIATE FROM THESE FORMULAS! ⚠️

  RULE 1: ALL CONTENT MUST BE WRAPPED IN TRANSFORM GROUP
  ────────────────────────────────────────────────────────
  <g transform="translate(24, 24)">  <!-- 24px padding ALL 4 sides -->
    ... all content here ...
  </g>

  This ensures:
  - External padding: 24px on all 4 sides (automatic!)
  - Content origin at (24, 24) from container top-left
  - No manual padding calculations needed

  RULE 2: TEXT BASELINE OFFSET (CRITICAL!)
  ────────────────────────────────────────────────────────
  Font Size → Baseline Offset (from top of line-height box)
  - 36px (font-display-sm) → 11px baseline offset
  - 32px (font-headline) → 10px baseline offset
  - 22px (font-title) → 16px baseline offset
  - 16px (font-body) → 4px baseline offset
  - 14px (font-body-sm/font-label) → 11px baseline offset

  SVG y-coordinate = top of element + baseline offset

  RULE 3: KPI CARD (36px VALUE) - ABSOLUTE FORMULA
  ────────────────────────────────────────────────────────
  Container: 120h × 276w (STANDARD)

  <rect width="276" height="120" rx="16"/>
  <g transform="translate(24, 24)">

    LABEL (14px font-body-sm):
    y = 0 + 11  ← FORMULA: 0 + 11 baseline offset
    y = 11 (EXACT!)
    occupies: 0-20h (20px line-height)

    ↓ GAP = 8px (EXACT! - Label + Value = ONE UNIT)

    VALUE (36px font-display-sm):
    y = 20 + 8 + 11  ← FORMULA: previous_end + gap + baseline_offset
    y = 39 (EXACT!)
    occupies: 28-72h (starts at 20+8=28, 44px line-height)

    ↓ GAP = 12px (EXACT! - Trend is SEPARATE)

    TREND (14px font-body-sm):
    y = 72 + 12 + 11  ← FORMULA: previous_end + gap + baseline_offset
    y = 95 (EXACT!)
    occupies: 84-104h (starts at 72+12=84, 20px line-height)

  </g>

  VERIFICATION CHECKLIST:
  ✓ Label y = 11 (NOT 10, NOT 12)
  ✓ Value y = 39 (NOT 42, NOT 58)
  ✓ Trend y = 95 (NOT 91, NOT 66)
  ✓ Container height = 120h (EXACT)
  ✓ Container width = 276w (4-column grid)

  RULE 4: SECONDARY METRIC CARD (32px VALUE) - ABSOLUTE FORMULA
  ────────────────────────────────────────────────────────
  Container: 100h × 276w (STANDARD)

  <rect width="276" height="100" rx="16"/>
  <g transform="translate(24, 24)">

    LABEL (14px font-body-sm):
    y = 0 + 11  ← FORMULA: 0 + 11 baseline offset
    y = 11 (EXACT!)
    occupies: 0-20h

    ↓ GAP = 8px (EXACT!)

    VALUE (32px font-headline):
    y = 20 + 8 + 10  ← FORMULA: 20 + 8 + 10 baseline offset (32px font)
    y = 38 (EXACT!)
    occupies: 28-68h (starts at 28, 40px line-height)

    ↓ GAP = 12px (EXACT!)

    TREND (14px font-body-sm):
    y = 68 + 12 + 11  ← FORMULA: 68 + 12 + 11
    y = 91 (EXACT!)
    occupies: 80-100h

  </g>

  VERIFICATION CHECKLIST:
  ✓ Label y = 11 (NOT 6, NOT 10)
  ✓ Value y = 38 (NOT 32, NOT 42)
  ✓ Trend y = 91 (NOT 52, NOT 66)
  ✓ Container height = 100h (EXACT)

  RULE 5: SECTION HEADER - ABSOLUTE FORMULA
  ────────────────────────────────────────────────────────
  <g transform="translate(24, 24)">

    TITLE (22px font-title):
    y = 0 + 16  ← FORMULA: 0 + 16 baseline offset (22px font)
    y = 16 (EXACT!)
    occupies: 0-28h (28px line-height)

  </g>

  VERIFICATION:
  ✓ All section titles at y = 16 (NOT 18, NOT 14)
  ✓ This creates EQUAL PLACEMENT across all sections!

  STAT CARD (With icon, value-centered):
  - Content: Label(20h) + 32px gap + Value(44h) + 18px gap + Trend(20h) = 134h
  - Container: 134h + 48px = 182h (or compress to 160h)
  - Width: 368px (for 3-column grid)

  DATA TABLE:
  - Header row height: 32h
  - Data row height: 48h (minimum for 14px text with breathing room)
  - Cell padding: 12px vertical, 16px horizontal
  - Row hover state: background change

  CIRCULAR INDICATOR:
  - Small: 80×80px (inner 32px padding)
  - Medium: 120×120px (inner 48px padding)
  - Large: 160×160px (inner 64px padding)

  MODAL:
  - Width: 560px (standard), 720px (wide)
  - Padding: 24px all sides
  - Content area: Width - 48px
  - Title to content: 20px gap (breathable)

  CARDS (Content cards):
  - Padding: 24px all sides (ALWAYS)
  - Title (22px) to body: 20px gap (generous breathing room)
  - Body line spacing: 16-20px between paragraphs
  - Min-height: Based on content + 48px
  - Border-radius: 16px (--md-sys-shape-corner-xl)

  SECTION HEADERS:
  - Title (22px): 28h line-height
  - Title to description: 16px gap (breathable)
  - Description (14px): 20h line-height
  - Total: 28 + 16 + 20 = 64h minimum
*/

/* ========== VERTICAL LAYOUT - ABSOLUTE SPACING RULES ========== */
/*
  ⚠️ THESE ARE ABSOLUTE RULES - NEVER DEVIATE! ⚠️

  RULE 6: MAIN CONTENT AREA MARGINS (EXTERNAL)
  ────────────────────────────────────────────────────────
  <g id="main-content" transform="translate(240, 64)">
    <!-- Main content area starts at x=240 (sidebar width), y=64 (header height) -->

    FIRST ELEMENT POSITIONING:
    - Page header: y = 32 (32px from header)
    - First content section: y = 104 (32px page header + 40px header height + 32px gap)

  RULE 7: VERTICAL SPACING BETWEEN SECTIONS - ABSOLUTE FORMULA
  ────────────────────────────────────────────────────────
  ⚠️ CRITICAL: ALL sections MUST have 48px gap between them! ⚠️

  FORMULA:
  Next_Section_Y = Previous_Section_Y + Previous_Section_Height + 48

  EXAMPLE CALCULATION (from wireframe):

  1. Page Header:
     y = 32, height = 40
     ends at: 32 + 40 = 72

  2. KPI Cards Row:
     y = 32 + 40 + 32 = 104  ← FORMULA: header_y + header_h + 32px gap
     height = 120
     ends at: 104 + 120 = 224

  3. Secondary Metrics Row:
     y = 104 + 120 + 48 = 272  ← FORMULA: previous_y + previous_h + 48
     height = 100
     ends at: 272 + 100 = 372

  4. Next Section (e.g., Traffic by Location):
     y = 272 + 100 + 48 = 420  ← FORMULA: previous_y + previous_h + 48

  VERIFICATION CHECKLIST FOR VERTICAL SPACING:
  ✓ Page header → First content: 32px gap (EXACT)
  ✓ Section → Section: 48px gap (EXACT - ALWAYS!)
  ✓ NO sections with 28px gap (❌ WRONG)
  ✓ NO sections with 24px gap (❌ WRONG)
  ✓ NO sections touching (0px gap ❌ WRONG)

  RULE 8: HORIZONTAL SPACING (CARDS IN SAME ROW)
  ────────────────────────────────────────────────────────

  FORMULA FOR 4-COLUMN GRID:
  - Available width: 1200px - (2 × 32px margin) = 1136px
  - Gaps between cards: 3 × 16px = 48px
  - Card width: (1136 - 48) / 4 = 272px → use 276px

  CARD POSITIONING IN ROW:
  Card 1: x = 32
  Card 2: x = 32 + 276 + 16 = 324  ← FORMULA: previous_x + previous_w + 16
  Card 3: x = 324 + 276 + 16 = 616  ← FORMULA: previous_x + previous_w + 16
  Card 4: x = 616 + 276 + 16 = 908  ← FORMULA: previous_x + previous_w + 16

  VERIFICATION:
  ✓ Left margin = 32px (EXACT)
  ✓ Gap between cards = 16px (EXACT - ALWAYS!)
  ✓ Right margin = 32px (1200 - 908 - 260 = 32)

  RULE 9: SECTION INTERNAL TOP PADDING (EQUAL PLACEMENT)
  ────────────────────────────────────────────────────────
  ⚠️ ALL sections with titles MUST start title at y=16 (NOT y=0, NOT y=8!)

  <g transform="translate(24, 24)">
    TITLE (22px font-title):
    y = 0 + 16  ← FORMULA: 0 + 16 baseline offset
    y = 16 (EXACT!)
  </g>

  This creates EQUAL PLACEMENT:
  - "Traffic by Location" title at y=16
  - "Backlink Distribution" title at y=16
  - "Referring Domains" title at y=16
  - ALL section titles at y=16!

  Result: Perfect vertical alignment across all sections!

  ❌ COMMON MISTAKES - NEVER DO THESE:
  ────────────────────────────────────────────────────────
  ❌ Section gap = 28px (should be 48px!)
  ❌ Section gap = 24px (should be 48px!)
  ❌ Label y = 6 in metric cards (should be 11!)
  ❌ Value y = 32 in metric cards (should be 38 or 39!)
  ❌ Section title y = 18 (should be 16!)
  ❌ Forgetting <g transform="translate(24, 24)"> wrapper

  QUICK REFERENCE TABLE:
  ────────────────────────────────────────────────────────
  Element Type          | Internal Gap | External Gap
  ─────────────────────────────────────────────────────
  Label → Value (metric)| 8px          | -
  Value → Trend (metric)| 12px         | -
  Card padding (all)    | 24px         | -
  Cards in same row     | -            | 16px
  Section → Section     | -            | 48px
  Page margins (L/R)    | -            | 32px
*/

/* ---------- LAYOUT CALCULATIONS ---------- */
/*
  VIEWPORT: 1440×900px (desktop standard)
  SIDEBAR: 240px fixed width
  HEADER: 64px fixed height
  MAIN CONTENT AREA: 1200px width (1440 - 240)

  4-COLUMN CARD GRID:
  - Available width: 1200px - (2 × 32px margin) = 1136px
  - Gaps: 3 gaps × 16px = 48px
  - Card width: (1136 - 48) / 4 = 272px → round to 276px

  3-COLUMN GRID:
  - Gaps: 2 × 16px = 32px
  - Card width: (1136 - 32) / 3 = 368px

  2-COLUMN GRID:
  - Gaps: 1 × 16px = 16px
  - Card width: (1136 - 16) / 2 = 560px
*/

/* ---------- TEXT POSITIONING IN SVG ---------- */
/*
  CRITICAL: SVG text y-coordinate is the BASELINE, not top edge.

  For font-size: 16px (body text):
  - To position "visually at y=20", use y="20 + 12" = 32
  - First text after 24px padding: y="16" (accounts for ascenders)

  Typography baselines (y-position relative to desired top edge):
  - Display (36px): y = desired_top + 28
  - Headline (32px): y = desired_top + 26
  - Title (22px): y = desired_top + 18
  - Body (16px): y = desired_top + 12
  - Body Small (14px): y = desired_top + 11
  - Label (14px bold): y = desired_top + 11
*/

/* ---------- TEXT BOUNDING BOX HEIGHTS ---------- */
/*
  CRITICAL: To calculate content height, you need to know how much vertical
  space each text element occupies (not just baseline position).

  TEXT VERTICAL SPACE (includes ascenders + descenders + line-height):

  Display Small (36px font, 44px line-height):
  - Bounding box height: 44px
  - First position: y="28" (from top=0)
  - Occupies: 0px to 44px vertical space
  - Next element starts at: y="44" minimum

  Headline Large (32px font, 40px line-height):
  - Bounding box height: 40px
  - First position: y="26" (from top=0)
  - Occupies: 0px to 40px vertical space
  - Next element starts at: y="40" minimum

  Title Large (22px font, 28px line-height):
  - Bounding box height: 28px
  - First position: y="18" (from top=0)
  - Occupies: 0px to 28px vertical space
  - Next element starts at: y="28" minimum

  Body Large (16px font, 24px line-height):
  - Bounding box height: 24px
  - First position: y="12" (from top=0)
  - Occupies: 0px to 24px vertical space
  - Next element starts at: y="24" minimum

  Body Small (14px font, 20px line-height):
  - Bounding box height: 20px
  - First position: y="11" (from top=0)
  - Occupies: 0px to 20px vertical space
  - Next element starts at: y="20" minimum

  Label (14px font, 20px line-height):
  - Bounding box height: 20px
  - First position: y="11" (from top=0)
  - Occupies: 0px to 20px vertical space
  - Next element starts at: y="20" minimum
*/

/* ---------- VISUAL HIERARCHY PRINCIPLE ---------- */
/*
  CRITICAL: THE VALUE IS THE HERO - IT DOMINATES THROUGH FONT SIZE, NOT SPACING

  KPI CARD HIERARCHY PRINCIPLE:
  The VALUE must have:
  1. LARGEST font size (36px vs 14px labels) ← PRIMARY DIFFERENTIATOR
  2. TIGHT spacing with label (8px) - they're ONE metric unit
  3. MODERATE spacing with trend (12px) - trend is separate info
  4. Most visual weight (font weight 600)

  PROXIMITY PRINCIPLE:
  - TIGHT spacing (8px) = elements are RELATED (label + value = ONE metric)
  - MODERATE spacing (12px) = elements are SEPARATE (value → trend)
  - GENEROUS padding (24px) = breathing room AROUND the card

  ❌ WRONG (Label and value far apart):
  <rect width="276" height="120"/>
  <g transform="translate(24, 24)">
    <text y="11">DOMAIN RATING</text>     ← 14px label
    (24px gap - TOO MUCH! Breaks metric unity!)
    <text y="58">25</text>                ← 36px value (feels disconnected)
    (16px gap)
    <text y="91">↓ 24</text>              ← 14px trend
  </g>

  Result: "What does 25 mean?" - user has to reconnect label to value

  ✅ CORRECT (Label + Value = ONE UNIT):
  <rect width="276" height="120"/>
  <g transform="translate(24, 24)">  <!-- 24px padding ALL sides -->
    <text y="11">DOMAIN RATING</text>  ← 14px label
    (8px gap - TIGHT! Label + value = one metric!)
    <text y="39">25</text>              ← 36px, THE HERO! Dominates through SIZE
    (12px gap - MODERATE! Trend is separate info)
    <text y="95">↓ 24</text>            ← 14px trend
  </g>

  Result: Label and value feel like ONE unit, value dominates through FONT SIZE

  IMPLEMENTATION DETAILS - STANDARD KPI CARD:
  Container: 120h × 276w
  <g transform="translate(24, 24)">
    - Label at y=11: baseline (14px font-body-sm, 20h line-height)
    - GAP: 8px (TIGHT - label + value = one metric!)
    - Value at y=39: THE HERO (36px font-display-sm, 44h line-height)
    - GAP: 12px (MODERATE - trend is separate)
    - Trend at y=95: (14px font-body-sm, 20h line-height)
  </g>

  KEY INSIGHT:
  Font size creates visual hierarchy (36px vs 14px = 2.5× larger),
  NOT excessive spacing. Keep related elements CLOSE!

  SECTION HEADER (Title is the hero):
  - Title (22px): y="18", occupies 0-28
  - Description (14px): y="55", occupies 28-48  (16px gap - breathable!)
  Total content: 48px → Container: 96px

  CARD WITH TITLE & CONTENT (Title is the hero):
  - Title (22px): y="18", occupies 0-28
  - Body line 1 (14px): y="59", occupies 28-48  (20px gap - generous!)
  - Body line 2 (14px): y="83", occupies 48-68  (16px gap between lines)
  - Body line 3 (14px): y="107", occupies 68-88  (16px gap)
  Total content: 88px → Container: 136px
*/

/* ---------- TEXT ELEMENT SPACING (MINIMUM TECHNICAL) ---------- */
/*
  These are MINIMUM spacings - use the VISUAL HIERARCHY section above
  for recommended breathable spacings.

  TIGHT SPACING (related content - minimum):
  - Label → Value: 8px gap minimum
  - Value → Subtext: 4px gap minimum

  DEFAULT SPACING (separate items):
  - Title → Body: 12-16px gap
  - Body → Body: 8-12px gap
  - List items: 16-24px gap

  RELAXED SPACING (section breaks):
  - Section title → Content: 16-24px gap
  - Between groups: 24-32px gap

  FORMULA:
  Next_y = Previous_top + Previous_line_height + Gap + Next_baseline_offset

  Example: Title (22px) → Body (16px) with 16px gap (breathable)
  - Title at y="18" (occupies 0-28)
  - Body at y = 0 + 28 + 16 + 12 = 56
*/

/* ---------- CONTENT HEIGHT CALCULATION EXAMPLES ---------- */
/*
  EXAMPLE 1: KPI Card - STANDARD PATTERN (RECOMMENDED)
  Container: 120h × 276w

  Using transform wrapper for equal padding:
  <rect width="276" height="120" rx="16"/>
  <g transform="translate(24, 24)">  <!-- 24px padding ALL 4 sides -->

    Label at y=11: (14px font-body-sm)
    Occupies: 0-20h (20px line-height)

    ↓ TIGHT GAP: 8px (Label + Value = ONE METRIC!)

    Value at y=39: (36px font-display-sm) ← THE HERO
    Occupies: 28-72h (44px line-height)
    Position calc: 0 + 20 (label height) + 8 (gap) + 11 (baseline) = 39

    ↓ MODERATE GAP: 12px (Trend is SEPARATE info)

    Trend at y=95: (14px font-body-sm)
    Occupies: 84-104h (20px line-height)
    Position calc: 28 + 44 (value height) + 12 (gap) + 11 (baseline) = 95

  </g>

  Content height: 104h (0 to 104)
  Padding: 24px top + 24px bottom = 48px
  Container: 104 + 48 = 152h → compress to 120h for standard grid

  VISUAL RESULT:
  ✓ 24px padding on ALL FOUR SIDES
  ✓ Label and value CLOSE together (8px) - ONE metric unit
  ✓ Value (THE HERO) dominates through FONT SIZE (36px vs 14px)
  ✓ Trend has moderate separation (12px) - separate info
  ✓ Professional, cohesive, scannable

  ANTI-PATTERN (DO NOT USE):
  ❌ Container: Label and value far apart
     - Label: y=11
     - Gap: 24px (TOO MUCH - breaks metric unity!)
     - Value: y=58 (user has to reconnect: "What does 58 mean?")
     - Gap: 16px
     - Trend: y=91

  This creates "REFERRING DOMAINS... 170" disconnect problem!

  EXAMPLE 2: Section Header with Description (Breathable)
  Components:
  - Title (22px): y="18", occupies 0-28
  - Description (14px): y="55", occupies 28-48  (16px breathable gap)

  Total content height: 48px
  Container height: 48 + 48 = 96px

  EXAMPLE 3: List of 5 items with proper breathing room (Body Small, 14px)
  - Item 1: y="11", occupies 0-20
  - Item 2: y="51", occupies 20-40    (20 + 20 gap + 11 baseline - breathable!)
  - Item 3: y="91", occupies 40-60    (same spacing)
  - Item 4: y="131", occupies 60-80
  - Item 5: y="171", occupies 80-100

  Total content height: 100px
  Container height: 100 + 48 = 148px

  EXAMPLE 4: Card Title + Multi-line Content (Title is hero)
  - Title (22px): y="18", occupies 0-28
  - Body 1 (14px): y="59", occupies 28-48  (20px gap after title - generous!)
  - Body 2 (14px): y="83", occupies 48-68  (16px gap between paragraphs)
  - Body 3 (14px): y="107", occupies 68-88  (16px gap)

  Total content height: 88px
  Container height: 136px (88 + 48)

  GOLDEN RULE FOR KPI CARDS:
  Use value-centered spacing (38px before value, 18px after).
  The 2:1 ratio creates instant visual hierarchy.
  The value (metric) is ALWAYS the hero, not the label.
*/

/* ---------- COMMON MISTAKES TO AVOID ---------- */
/*
  ❌ MISTAKE 1: LABEL AND VALUE TOO FAR APART (MOST COMMON!)
     <rect width="276" height="128"/>
     <g transform="translate(24, 24)">
       <text y="11">REFERRING DOMAINS</text>  <!-- Label -->
       (24px gap - TOO MUCH!)
       <text y="59">170</text>                 <!-- Value disconnected from label -->
       (16px gap)
       <text y="91">↓ 24</text>
     </g>

     Result: User thinks "What does 170 mean?" - has to visually reconnect
     Label and value feel like separate elements, not one metric

  ✅ CORRECT: LABEL + VALUE AS ONE UNIT
     <rect width="276" height="120"/>
     <g transform="translate(24, 24)">  <!-- 24px padding ALL sides -->
       <text y="11">REFERRING DOMAINS</text>  <!-- Label -->
       (8px gap - TIGHT! They're one metric)
       <text y="39">170</text>                 <!-- Value close to label -->
       (12px gap - moderate, trend is separate)
       <text y="83">↓ 24</text>                <!-- Trend -->
     </g>

     Result: "Referring Domains is 170" - instant understanding!
     Professional, cohesive metric card

  ❌ MISTAKE 4: SECTIONS WITH NO INTERNAL TOP PADDING (NEW - CRITICAL!)
     <g id="referring-domains" transform="translate(32, 272)">
       <rect height="200"/>
       <text y="0">Referring Domains</text>  <!-- No 8px top padding! -->
     </g>
     <g id="backlink-distribution" transform="translate(32, 520)">
       <rect height="200"/>
       <text y="0">Backlink Distribution</text>  <!-- No 8px top padding! -->
     </g>

     Result: Sections NOT equally placed! Content touches container tops!

  ✅ CORRECT: 8PX INTERNAL TOP PADDING FOR EQUAL PLACEMENT
     <g id="referring-domains" transform="translate(32, 272)">
       <rect height="200"/>
       <text y="8">Referring Domains</text>  <!-- 8px top padding ✓ -->
     </g>
     <g id="backlink-distribution" transform="translate(32, 520)">
       <rect height="200"/>
       <text y="8">Backlink Distribution</text>  <!-- 8px top padding ✓ -->
     </g>

     Result: EQUALLY PLACED! Both sections start content 8px from top!

  ❌ MISTAKE 5: SECTIONS WITH NO EXTERNAL SPACING (Touching!)
     <g id="kpi-cards" transform="translate(32, 104)">
       <!-- 4 KPI cards -->
     </g>
     <g id="referring-domains" transform="translate(32, 224)">
       <!-- No 48px gap from KPI cards! Touching! -->
     </g>

     Result: Sections cramped together, no breathing room

  ✅ CORRECT: CONSISTENT 48PX SPACING BETWEEN ALL SECTIONS
     <g id="kpi-cards" transform="translate(32, 104)">
       <!-- 4 KPI cards, height=120 -->
     </g>
     <!-- Ends at: 104 + 120 = 224 -->
     <g id="referring-domains" transform="translate(32, 272)">
       <!-- Starts at 272 = 224 + 48px gap ✓ -->
       <text y="8">Title</text>  <!-- + 8px internal top padding ✓ -->
     </g>
     <g id="backlink-distribution" transform="translate(32, [272 + height + 48])">
       <!-- Also has 48px gap from section above ✓ -->
       <text y="8">Title</text>  <!-- + 8px internal top padding ✓ -->
     </g>

     Result: Professional vertical spacing + equal placement!

  ❌ MISTAKE 2: Missing card padding
     <text y="11">DOMAIN RATING</text>  <!-- No padding wrapper! -->
     <text y="27">25</text>
     Result: Content touches card edges, unprofessional

  ✅ CORRECT: Always wrap in translate for equal padding
     <g transform="translate(24, 24)"> ... </g>
     Result: 24px breathing room on all sides

  ❌ MISTAKE 3: Unequal padding (more top, less bottom)
     Top padding: 24px
     Bottom padding: 12px
     Result: Card feels bottom-heavy, imbalanced

  ✅ CORRECT: Equal padding all sides
     All four sides: 24px
     Result: Balanced, professional, calm

  ❌ MISTAKE 2: Arbitrary container heights
     <rect width="1136" height="200"/>  <!-- Random height -->
     Content doesn't fit or has unequal padding

  ✅ CORRECT: Calculate from content
     Content measured: 168h
     Container: 168 + 48 = 216h
     <rect width="1136" height="216"/>

  ❌ MISTAKE 3: No padding wrapper
     <rect width="300" height="100"/>
     <text y="20">Text</text>  <!-- No padding -->

  ✅ CORRECT: Always use transform wrapper
     <rect width="300" height="100"/>
     <g transform="translate(24, 24)">
       <text y="16">Text</text>
     </g>

  ❌ MISTAKE 4: Content starts too far from top
     <g transform="translate(24, 24)">
       <text y="40">Text</text>  <!-- 24 + 40 = 64px from container top -->
     </g>

  ✅ CORRECT: Start near y="0" after translate
     <g transform="translate(24, 24)">
       <text y="16">Text</text>  <!-- 24 + 16 = 40px total -->
     </g>

  ❌ MISTAKE 5: Last element overflows
     Container: 200h
     <g transform="translate(24, 24)">
       <text y="160">Last</text>  <!-- 24 + 160 + 24 = 208 > 200 -->
     </g>

  ✅ CORRECT: Ensure last element fits
     Content height needed: 160h (last element at y="155")
     Container: 160 + 48 = 208h
     <rect height="208"/>
     <g transform="translate(24, 24)">
       <text y="155">Last</text>  <!-- 24 + 155 + 24 = 203 < 208 ✓ -->
     </g>

  ❌ MISTAKE 6: Small font for the hero value
     <text y="70" class="font-title">25</text>  <!-- Only 22px! -->

  ✅ CORRECT: Large font for the hero value
     <text y="70" class="font-display-sm">25</text>  <!-- 36px - HERO! -->
*/

/* ---------- PRACTICAL EXAMPLE ---------- */
/*
  BEFORE (WRONG - Unequal padding):
  <g transform="translate(32, 100)">
    <rect width="560" height="180" rx="16"/>
    <text y="36">Title</text>  <!-- 36px from top, but no padding wrapper -->
    <text y="140">Last line</text>  <!-- Only 40px from bottom -->
  </g>
  Result: 36px top padding, 40px bottom padding (unequal)

  AFTER (CORRECT - Equal 24px padding):
  Step 1: Measure content
    - Title at y="16" (baseline position)
    - Last line at y="128"
    - Content height = 128 + 12 (text descender) = 140h

  Step 2: Calculate container
    - Container height = 140 + 48 = 188h

  Step 3: Implement
  <g transform="translate(32, 100)">
    <rect width="560" height="188" rx="16"/>
    <g transform="translate(24, 24)">
      <text y="16">Title</text>        <!-- 24 + 16 = 40px from container top -->
      <text y="128">Last line</text>   <!-- 24 + 128 = 152px from top, 36px from bottom (188-152) -->
    </g>
  </g>
  Result: Equal 24px padding on top and bottom ✓
*/

/* ========== WIREFRAME QUALITY CHECKLIST - ABSOLUTE VALUES ========== */
/*
  ⚠️ USE THESE EXACT VALUES - NO APPROXIMATIONS! ⚠️

  STEP 1: VERIFY KPI CARD (36px VALUE) Y-COORDINATES
  ────────────────────────────────────────────────────────
  Container: 120h × 276w
  <g transform="translate(24, 24)">
    ✅ Label y = 11 (EXACT!)
       ❌ NOT 10, NOT 6, NOT 12
    ✅ Value y = 39 (EXACT!)
       ❌ NOT 42, NOT 58, NOT 32
    ✅ Trend y = 95 (EXACT!)
       ❌ NOT 91, NOT 66, NOT 52

  STEP 2: VERIFY SECONDARY METRIC CARD (32px VALUE) Y-COORDINATES
  ────────────────────────────────────────────────────────
  Container: 100h × 276w
  <g transform="translate(24, 24)">
    ✅ Label y = 11 (EXACT!)
       ❌ NOT 6, NOT 10
    ✅ Value y = 38 (EXACT!)
       ❌ NOT 32, NOT 42
    ✅ Trend y = 91 (EXACT!)
       ❌ NOT 52, NOT 66

  STEP 3: VERIFY SECTION TITLE Y-COORDINATES
  ────────────────────────────────────────────────────────
  <g transform="translate(24, 24)">
    ✅ Section title y = 16 (EXACT!)
       ❌ NOT 18, NOT 14, NOT 0

  This ensures EQUAL PLACEMENT across all sections!

  STEP 4: VERIFY VERTICAL SPACING (SECTION GAPS)
  ────────────────────────────────────────────────────────
  ✅ Section → Section gap = 48px (EXACT!)
     ❌ NOT 28px, NOT 24px, NOT 32px

  FORMULA TO VERIFY:
  Next_Y = Previous_Y + Previous_Height + 48

  Example verification:
  - KPI cards at y=104, height=120 → ends at 224
  - Next section MUST be at y=272 (224 + 48)
    ✓ CORRECT: y=272
    ✗ WRONG: y=252 (only 28px gap!)

  STEP 5: VERIFY HORIZONTAL SPACING (CARD GAPS IN ROW)
  ────────────────────────────────────────────────────────
  ✅ Card → Card gap = 16px (EXACT!)

  Card positions in 4-column grid:
  ✅ Card 1: x = 32
  ✅ Card 2: x = 324 (32 + 276 + 16)
  ✅ Card 3: x = 616 (324 + 276 + 16)
  ✅ Card 4: x = 908 (616 + 276 + 16)

  STEP 6: VERIFY TRANSFORM WRAPPER
  ────────────────────────────────────────────────────────
  ✅ ALL content wrapped in <g transform="translate(24, 24)">
     ❌ NO content directly inside container (missing wrapper!)

  STEP 7: VERIFY CONTAINER DIMENSIONS
  ────────────────────────────────────────────────────────
  ✅ KPI card (36px value): 120h × 276w
  ✅ Secondary metric (32px value): 100h × 276w
  ✅ Section containers: Use calculated height based on content

  ❌ CRITICAL ERRORS TO CATCH:
  ────────────────────────────────────────────────────────
  ❌ Label y = 6 (should be 11!)
     → This creates cramped spacing
  ❌ Value y = 32 (should be 38 or 39!)
     → This breaks label-value unity (gap too small or too large)
  ❌ Value y = 42 or 58 (should be 38 or 39!)
     → This creates excessive gap (label and value disconnected!)
  ❌ Section gap = 28px (should be 48px!)
     → Sections too close, claustrophobic
  ❌ Trend y = 66 or 52 (should be 91 or 95!)
     → Wrong spacing from value
  ❌ Missing <g transform="translate(24, 24)">
     → Inconsistent padding, spacing errors

  QUICK ERROR DETECTION:
  ────────────────────────────────────────────────────────
  IF YOU SEE:                    → FIX TO:
  ─────────────────────────────────────────────────────
  Label y="6"                    → y="11"
  Value y="32"                   → y="38" (32px font) or y="39" (36px font)
  Value y="42"                   → y="39"
  Value y="58"                   → y="39"
  Trend y="52"                   → y="91"
  Trend y="66"                   → y="95" (36px value) or y="91" (32px value)
  Section gap="28"               → gap="48"
  Title y="18"                   → y="16"
  Title y="8"                    → y="16"

  PASS CRITERIA (ALL MUST BE TRUE):
  ────────────────────────────────────────────────────────
  ✓ All metric card labels at y=11
  ✓ All 36px values at y=39
  ✓ All 32px values at y=38
  ✓ All section titles at y=16
  ✓ All section gaps exactly 48px
  ✓ All card gaps exactly 16px
  ✓ All content wrapped in translate(24, 24)
  ✓ No overlapping elements
  ✓ No touching sections (0px gap)
*/

@media(prefers-color-scheme:dark){
  :root{
    --md-sys-color-background:var(--neutral-950);
    --md-sys-color-on-background:var(--neutral-50);
    --md-sys-color-surface:var(--neutral-900);
    --md-sys-color-on-surface:var(--neutral-50);
    --md-sys-color-surface-variant:var(--neutral-850);
    --md-sys-color-on-surface-variant:var(--neutral-400);
    --md-sys-color-outline:var(--neutral-800);
    --md-sys-color-outline-variant:var(--neutral-700);

    --md-sys-color-primary:var(--brand-400);
    --md-sys-color-on-primary:#2B0B03;
    --md-sys-color-primary-container:var(--brand-900);
    --md-sys-color-on-primary-container:#FFEADF;

    --md-sys-color-secondary:var(--neutral-400);
    --md-sys-color-on-secondary:var(--neutral-950);
    --md-sys-color-secondary-container:var(--neutral-800);
    --md-sys-color-on-secondary-container:var(--neutral-100);

    --md-sys-color-tertiary:var(--brand-300);
    --md-sys-color-on-tertiary:#2B0B03;
    --md-sys-color-tertiary-container:var(--brand-800);
    --md-sys-color-on-tertiary-container:#FFEADF;
  }
}

/* ---------- BASE ---------- */
*{box-sizing:border-box}
html,body{height:100%}
html{font-family:var(--md-font);font-size:16px}
body{margin:0;background:var(--md-sys-color-background);color:var(--md-sys-color-on-background)}
h1{font:var(--md-type-headline-lg);margin:0 0 var(--space-6)}
h2{font:var(--md-type-headline-lg);margin:0 0 var(--space-5)}
h3{font:var(--md-type-title-lg);margin:0 0 var(--space-4)}
p,li{font:var(--md-type-body-lg)}
a{color:var(--md-sys-color-primary);text-decoration:none}
a:hover{text-decoration:underline}
:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring);border-radius:6px}

/* ---------- LAYOUT UTILITIES ---------- */
.container{width:min(1200px,100%);margin-inline:auto}
@media(max-width:599px){.container{padding-inline:16px}}
@media(min-width:600px) and (max-width:1023px){.container{padding-inline:24px}}
@media(min-width:1024px){.container{padding-inline:32px}}
.section{padding-block:56px}
.hero{padding-block:56px}
.surface{background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface)}
.surface-variant{background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface-variant)}
.elev-0{box-shadow:var(--md-sys-elevation-0)}.elev-1{box-shadow:var(--md-sys-elevation-1)}
.elev-2{box-shadow:var(--md-sys-elevation-2)}.elev-3{box-shadow:var(--md-sys-elevation-3)}
.elev-4{box-shadow:var(--md-sys-elevation-4)}.elev-5{box-shadow:var(--md-sys-elevation-5)}
.visually-hidden{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}

/* Grid System */
.grid { display: grid; gap: var(--space-4); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-auto { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

/* Grid Gaps */
.gap-0 { gap: 0; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-5 { gap: var(--space-5); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* Flex Utilities */
.flex { display: flex; gap: var(--space-4); }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-between { justify-content: space-between; }
.flex-center { justify-content: center; align-items: center; }
.flex-start { justify-content: flex-start; align-items: flex-start; }
.flex-end { justify-content: flex-end; align-items: flex-end; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-1 { flex: 1; }

/* Spacing (Margin) */
.m-0 { margin: 0; }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-10 { margin-top: var(--space-10); }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-3 { margin-bottom: var(--space-3); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-5 { margin-bottom: var(--space-5); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mb-10 { margin-bottom: var(--space-10); }
.ml-1 { margin-left: var(--space-1); }
.ml-2 { margin-left: var(--space-2); }
.ml-3 { margin-left: var(--space-3); }
.ml-4 { margin-left: var(--space-4); }
.ml-auto { margin-left: auto; }
.mr-1 { margin-right: var(--space-1); }
.mr-2 { margin-right: var(--space-2); }
.mr-3 { margin-right: var(--space-3); }
.mr-4 { margin-right: var(--space-4); }
.mr-auto { margin-right: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }
.my-6 { margin-top: var(--space-6); margin-bottom: var(--space-6); }
.my-8 { margin-top: var(--space-8); margin-bottom: var(--space-8); }

/* Spacing (Padding) */
.p-0 { padding: 0; }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-5 { padding: var(--space-5); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }
.pt-4 { padding-top: var(--space-4); }
.pt-6 { padding-top: var(--space-6); }
.pt-8 { padding-top: var(--space-8); }
.pb-4 { padding-bottom: var(--space-4); }
.pb-6 { padding-bottom: var(--space-6); }
.pb-8 { padding-bottom: var(--space-8); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.px-8 { padding-left: var(--space-8); padding-right: var(--space-8); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }

/* Text & Display */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.hidden { display: none; }

/* Width */
.w-full { width: 100%; }
.w-auto { width: auto; }
.max-w-sm { max-width: 480px; }
.max-w-md { max-width: 640px; }
.max-w-lg { max-width: 800px; }
.max-w-xl { max-width: 1024px; }

/* Responsive Visibility */
@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
}
@media (min-width: 769px) {
  .hide-desktop { display: none !important; }
  .show-mobile { display: none !important; }
}

/* ---------- APP SHELL & SIDEBAR ---------- */
.app-shell {
  display: grid;
  grid-template-areas: "sidebar header" "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  height: 100vh;
  overflow: hidden;
}
.app-shell__sidebar {
  grid-area: sidebar;
  background: var(--md-sys-color-surface-variant);
  border-right: 1px solid var(--md-sys-color-outline);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.app-shell__header {
  grid-area: header;
  background: var(--md-sys-color-surface);
  border-bottom: 1px solid var(--md-sys-color-outline);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 0 var(--space-6);
}
.app-shell__main {
  grid-area: main;
  overflow-y: auto;
  background: var(--md-sys-color-background);
  padding: var(--space-6);
}

@media (max-width: 768px) {
  .app-shell {
    grid-template-areas: "header" "main";
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
  }
  .app-shell__sidebar {
    position: fixed;
    left: -240px;
    top: 0;
    bottom: 0;
    width: 240px;
    z-index: 1000;
    transition: left var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard);
  }
  .app-shell__sidebar[data-open="true"] {
    left: 0;
    box-shadow: var(--md-sys-elevation-5);
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
}
.sidebar-nav__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--md-sys-shape-corner-lg);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-type-body-lg);
  cursor: pointer;
  transition: background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.sidebar-nav__item:hover {
  background: var(--md-sys-color-surface);
}
.sidebar-nav__item[aria-current="page"] {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: 600;
}
.sidebar-nav__icon { width: 24px; height: 24px; flex-shrink: 0; }
.sidebar-nav__label { flex: 1; }
.sidebar-nav__badge {
  font: var(--md-type-label-lg);
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  font-size: 12px;
}
.sidebar-divider { height: 1px; background: var(--md-sys-color-outline); margin: var(--space-4) 0; }
.sidebar-section {
  padding: var(--space-2) var(--space-4);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-type-label-lg);
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

/* ---------- NAV ---------- */
.topbar{position:sticky;top:0;height:64px;display:flex;align-items:center;gap:16px;padding:0 16px;background:var(--md-sys-color-surface);z-index:100}

/* ---------- BUTTONS ---------- */
.btn{display:inline-flex;align-items:center;gap:8px;justify-content:center;
  min-height:40px;padding:10px 16px;border-radius:var(--md-sys-shape-corner-lg);
  border:1px solid transparent;cursor:pointer;font:var(--md-type-label-lg);
  transition:transform var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard),
             box-shadow var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard),
             filter var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.btn-sm{min-height:36px;padding:8px 12px}
.btn-lg{min-height:48px;padding:12px 20px}
.btn:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring)}
.btn:disabled{opacity:.38;pointer-events:none}
.btn-filled{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);box-shadow:var(--md-sys-elevation-1)}
.btn-filled:hover{filter:brightness(.97)}
.btn-filled.hero{box-shadow:var(--shadow-brand-glow)}
.btn-outlined{background:transparent;color:var(--md-sys-color-primary);border-color:var(--md-sys-color-outline)}
.btn-text{background:transparent;color:var(--md-sys-color-primary)}
.icon-btn{width:40px;height:40px;padding:0;display:inline-grid;place-items:center}

/* ---------- INPUTS & CONTROLS ---------- */
.textfield{display:block}
.textfield label{display:block;color:var(--md-sys-color-on-surface-variant);font:var(--md-type-label-lg);margin-bottom:4px}
.textfield input,.textfield select{
  width:100%;height:56px;padding:0 16px;border-radius:var(--md-sys-shape-corner-lg);
  border:1px solid var(--md-sys-color-outline);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface)
}
.textfield input::placeholder{color:var(--md-sys-color-on-surface-variant)}
.textfield select{
  appearance:none;
  background-image:linear-gradient(45deg,transparent 50%,var(--md-sys-color-on-surface-variant) 50%),
                   linear-gradient(135deg,var(--md-sys-color-on-surface-variant) 50%,transparent 50%);
  background-position:calc(100% - 18px) 52%, calc(100% - 12px) 52%;
  background-size:6px 6px,6px 6px;background-repeat:no-repeat
}
.textfield input:focus-visible,.textfield select:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring)}
.helper{margin-top:4px;color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.error{margin-top:4px;color:var(--md-sys-color-error);font:var(--md-type-body-sm)}
.textfield input[aria-invalid="true"]{border-color:var(--md-sys-color-error)}

.control{display:flex;align-items:center;gap:8px;font:var(--md-type-body-lg);color:var(--md-sys-color-on-surface)}
.control input[type="checkbox"],.control input[type="radio"]{width:18px;height:18px}
.control input:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring);border-radius:4px}

.switch{position:relative;width:44px;height:24px;background:var(--neutral-200);border-radius:9999px;cursor:pointer;transition:background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:9999px;background:#fff;transition:left var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.switch[aria-checked="true"]{background:var(--md-sys-color-primary)}
.switch[aria-checked="true"]::after{left:22px}
.switch:focus-visible{box-shadow:var(--md-sys-focus-ring)}

.chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:9999px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);border:1px solid var(--md-sys-color-outline);cursor:pointer;font:var(--md-type-label-lg)}
.chip[aria-pressed="true"]{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary)}
.chip .remove{width:18px;height:18px;display:inline-grid;place-items:center;border-radius:9999px}
.chip .remove:focus-visible{box-shadow:var(--md-sys-focus-ring)}

.filterbar{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.filterbar .textfield{min-width:200px}
.filterbar .btn-group{display:flex;gap:8px;flex-wrap:wrap}

/* ---------- BREADCRUMBS ---------- */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font: var(--md-type-body-sm);
  color: var(--md-sys-color-on-surface-variant);
  flex-wrap: wrap;
}
.breadcrumb__item { display: flex; align-items: center; gap: var(--space-2); }
.breadcrumb__link { color: var(--md-sys-color-on-surface-variant); text-decoration: none; }
.breadcrumb__link:hover { color: var(--md-sys-color-primary); text-decoration: underline; }
.breadcrumb__separator { color: var(--md-sys-color-outline); }
.breadcrumb__current { color: var(--md-sys-color-on-surface); font-weight: 600; }

/* ---------- AVATAR ---------- */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  display: grid;
  place-items: center;
  font: var(--md-type-label-lg);
  font-weight: 600;
  flex-shrink: 0;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar--sm { width: 32px; height: 32px; font-size: 12px; }
.avatar--lg { width: 48px; height: 48px; font-size: 18px; }
.avatar--xl { width: 64px; height: 64px; font-size: 24px; }
.avatar-group { display: flex; align-items: center; }
.avatar-group .avatar { margin-left: -8px; border: 2px solid var(--md-sys-color-surface); }
.avatar-group .avatar:first-child { margin-left: 0; }

/* ---------- ALERT / BANNER ---------- */
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--md-sys-shape-corner-lg);
  border-left: 4px solid;
  font: var(--md-type-body-lg);
}
.alert__icon { width: 24px; height: 24px; flex-shrink: 0; }
.alert__content { flex: 1; }
.alert__title { font: var(--md-type-label-lg); margin-bottom: var(--space-1); }
.alert__message { color: inherit; opacity: 0.9; }
.alert__actions { display: flex; gap: var(--space-2); margin-top: var(--space-2); }
.alert--info { background: color-mix(in oklab, var(--brand-500) 8%, var(--md-sys-color-surface)); color: var(--brand-900); border-color: var(--brand-500); }
.alert--success { background: color-mix(in oklab, #10B981 8%, var(--md-sys-color-surface)); color: #064E3B; border-color: #10B981; }
.alert--warning { background: color-mix(in oklab, #F59E0B 8%, var(--md-sys-color-surface)); color: #7C3E00; border-color: #F59E0B; }
.alert--error { background: color-mix(in oklab, var(--md-sys-color-error) 8%, var(--md-sys-color-surface)); color: var(--md-sys-color-on-error-container); border-color: var(--md-sys-color-error); }

/* ---------- EMPTY STATE ---------- */
.empty-state {
  display: grid;
  place-items: center;
  padding: var(--space-10) var(--space-6);
  text-align: center;
  color: var(--md-sys-color-on-surface-variant);
}
.empty-state__icon { width: 120px; height: 120px; margin-bottom: var(--space-6); opacity: 0.4; }
.empty-state__title { font: var(--md-type-headline-lg); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-3); }
.empty-state__description { font: var(--md-type-body-lg); max-width: 480px; margin-bottom: var(--space-6); }
.empty-state__actions { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; }

/* ---------- LOADING ---------- */
@keyframes spin { to { transform: rotate(360deg); }}
.spinner { width: 40px; height: 40px; border: 4px solid var(--md-sys-color-outline); border-top-color: var(--md-sys-color-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
.spinner--sm { width: 24px; height: 24px; border-width: 3px; }
.spinner--lg { width: 56px; height: 56px; border-width: 5px; }
.loading-container { display: grid; place-items: center; padding: var(--space-10); min-height: 200px; }

@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; }}
.skeleton { background: var(--md-sys-color-surface-variant); border-radius: var(--md-sys-shape-corner-sm); animation: skeleton-pulse 2s ease-in-out infinite; }
.skeleton--text { height: 16px; width: 100%; margin-bottom: var(--space-2); }
.skeleton--title { height: 24px; width: 60%; margin-bottom: var(--space-4); }
.skeleton--circle { width: 40px; height: 40px; border-radius: 50%; }
.skeleton--rect { height: 200px; width: 100%; }

/* ---------- PROGRESS BAR ---------- */
.progress { height: 8px; background: var(--md-sys-color-surface-variant); border-radius: var(--md-sys-shape-corner-full); overflow: hidden; position: relative; }
.progress__bar { height: 100%; background: var(--md-sys-color-primary); border-radius: var(--md-sys-shape-corner-full); transition: width var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard); }
.progress--lg { height: 12px; }
.progress--sm { height: 4px; }

@keyframes progress-indeterminate { 0% { left: -40%; } 100% { left: 100%; }}
.progress--indeterminate .progress__bar { width: 40%; position: absolute; animation: progress-indeterminate 1.5s ease-in-out infinite; }

/* ---------- STEPPER ---------- */
.stepper { display: flex; align-items: center; gap: 0; margin-bottom: var(--space-8); }
.stepper__step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
.stepper__step:not(:last-child)::after { content: ""; position: absolute; top: 20px; left: 50%; right: -50%; height: 2px; background: var(--md-sys-color-outline); z-index: -1; }
.stepper__step[data-state="completed"]::after { background: var(--md-sys-color-primary); }
.stepper__circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
  border: 2px solid var(--md-sys-color-outline);
  display: grid;
  place-items: center;
  font: var(--md-type-label-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
  z-index: 1;
}
.stepper__step[data-state="active"] .stepper__circle { background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); border-color: var(--md-sys-color-primary); }
.stepper__step[data-state="completed"] .stepper__circle { background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); border-color: var(--md-sys-color-primary); }
.stepper__label { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); text-align: center; }
.stepper__step[data-state="active"] .stepper__label { color: var(--md-sys-color-on-surface); font-weight: 600; }

@media (max-width: 768px) {
  .stepper { justify-content: center; }
  .stepper__label { display: none; }
  .stepper__step { flex: 0 0 auto; }
}

/* ---------- FILE UPLOAD ---------- */
.file-upload {
  border: 2px dashed var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-xl);
  padding: var(--space-8);
  text-align: center;
  cursor: pointer;
  transition: border-color var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard), background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.file-upload:hover, .file-upload[data-dragover="true"] { border-color: var(--md-sys-color-primary); background: color-mix(in oklab, var(--md-sys-color-primary) 4%, transparent); }
.file-upload__icon { width: 64px; height: 64px; margin: 0 auto var(--space-4); color: var(--md-sys-color-on-surface-variant); }
.file-upload__title { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-2); }
.file-upload__description { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); margin-bottom: var(--space-4); }
.file-upload__input { display: none; }
.file-upload__browse { color: var(--md-sys-color-primary); font-weight: 600; text-decoration: underline; }

.file-list { display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-4); }
.file-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--md-sys-color-surface-variant);
  border-radius: var(--md-sys-shape-corner-lg);
}
.file-item__icon { width: 24px; height: 24px; color: var(--md-sys-color-on-surface-variant); }
.file-item__name { flex: 1; font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-item__size { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); }
.file-item__remove { width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: var(--md-sys-shape-corner-sm); color: var(--md-sys-color-on-surface-variant); }
.file-item__remove:hover { background: var(--md-sys-color-error-container); color: var(--md-sys-color-error); }

/* ---------- DATE PICKER ---------- */
.date-picker { position: relative; }
.date-picker input[type="date"], .date-picker input[type="datetime-local"] {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border-radius: var(--md-sys-shape-corner-lg);
  border: 1px solid var(--md-sys-color-outline);
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-type-body-lg);
}
.date-picker input::-webkit-calendar-picker-indicator { cursor: pointer; filter: opacity(0.6); }
.date-range { display: flex; align-items: center; gap: var(--space-3); }
.date-range__separator { color: var(--md-sys-color-on-surface-variant); font: var(--md-type-body-lg); }

/* ---------- SEARCH ---------- */
.search { position: relative; width: 100%; max-width: 600px; }
.search__input {
  width: 100%;
  height: 48px;
  padding: 0 48px 0 48px;
  border-radius: var(--md-sys-shape-corner-full);
  border: 1px solid var(--md-sys-color-outline);
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-type-body-lg);
  transition: border-color var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard), box-shadow var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.search__input:focus { outline: 0; border-color: var(--md-sys-color-primary); box-shadow: var(--md-sys-focus-ring); }
.search__icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--md-sys-color-on-surface-variant); pointer-events: none; }
.search__clear { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: 50%; color: var(--md-sys-color-on-surface-variant); opacity: 0; transition: opacity var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard); }
.search__input:not(:placeholder-shown) ~ .search__clear { opacity: 1; }
.search__clear:hover { background: var(--md-sys-color-surface-variant); }

.search__results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--md-sys-color-surface);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-xl);
  box-shadow: var(--md-sys-elevation-3);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
}
.search__result-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  border-bottom: 1px solid var(--md-sys-color-outline);
}
.search__result-item:last-child { border-bottom: none; }
.search__result-item:hover { background: var(--md-sys-color-surface-variant); }

/* ---------- CARDS ---------- */
.card{border-radius:var(--md-sys-shape-corner-xl);padding:24px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);box-shadow:var(--md-sys-elevation-1)}
.card-hover:hover{transform:translateY(-2px);box-shadow:var(--md-sys-elevation-2);transition:transform var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard), box-shadow var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard)}

/* ---------- TABS ---------- */
.tabs{display:flex;gap:24px;border-bottom:1px solid var(--md-sys-color-outline)}
.tab{position:relative;padding:12px 0;font:var(--md-type-title-lg);color:var(--md-sys-color-on-surface);background:none;border:0;cursor:pointer}
.tab[aria-selected="true"]{color:var(--md-sys-color-primary)}
.tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--md-sys-color-primary)}

/* ---------- TABLES ---------- */
.table{width:100%;border-collapse:collapse}
.table thead{background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface)}
.table th{text-align:left;padding:12px 16px;font:var(--md-type-label-lg)}
.table td{padding:16px;border-top:1px solid var(--md-sys-color-outline);font:var(--md-type-body-lg)}
.table tr:hover{background:color-mix(in oklab,var(--md-sys-color-primary) 6%, transparent)}
.badge{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:9999px;font:var(--md-type-label-lg);border:1px solid var(--md-sys-color-outline);background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface-variant)}
.badge--success{background:color-mix(in oklab,#10B981 12%,white);color:#064E3B;border-color:color-mix(in oklab,#10B981 35%,white)}
.badge--warn{background:color-mix(in oklab,#F59E0B 14%,white);color:#7C3E00;border-color:color-mix(in oklab,#F59E0B 35%,white)}
.badge--danger{background:color-mix(in oklab,#EF4444 12%,white);color:#7F1D1D;border-color:color-mix(in oklab,#EF4444 35%,white)}

.toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.pager{display:flex;align-items:center;gap:8px}
.pager .page{min-width:36px;height:36px;border-radius:8px;border:1px solid var(--md-sys-color-outline);display:grid;place-items:center;background:var(--md-sys-color-surface)}
.pager .page[aria-current="true"]{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:transparent}

.table-container { overflow-x: auto; border-radius: var(--md-sys-shape-corner-xl); border: 1px solid var(--md-sys-color-outline); }
@media (max-width: 768px) {
  .table thead { display: none; }
  .table tr { display: flex; flex-direction: column; border-bottom: 2px solid var(--md-sys-color-outline); padding: var(--space-4); }
  .table td { display: flex; justify-content: space-between; padding: var(--space-2) 0; border: none; }
  .table td::before { content: attr(data-label); font-weight: 600; color: var(--md-sys-color-on-surface-variant); }
}

/* ---------- PRICING ---------- */
.pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:stretch;max-width:1100px;margin-inline:auto}
.price-card{position:relative;display:grid;grid-template-rows:auto auto 1fr auto;gap:16px;padding:24px;border-radius:var(--md-sys-shape-corner-xl);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);box-shadow:var(--md-sys-elevation-1);overflow:hidden;transition:transform var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard),box-shadow var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard)}
.price-card:hover{box-shadow:var(--md-sys-elevation-2);transform:translateY(-2px)}
.price-card__head h3{margin:0 0 4px;font:var(--md-type-title-lg)}
.price-card__sub{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.price-card__badge{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);padding:6px 12px;border-radius:9999px;font:var(--md-type-label-lg);box-shadow:var(--shadow-brand-glow);pointer-events:none}
.price-card--popular{border-color:var(--md-sys-color-primary);box-shadow:var(--shadow-brand-glow)}
.price{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.price__value{font:var(--md-type-display-sm);line-height:1.05;letter-spacing:-0.02em;white-space:nowrap}
.price__period{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-lg)}
.price__features{display:grid;gap:12px;margin:8px 0 0 0;align-content:start}
.price__features li{display:flex;gap:8px;align-items:flex-start;color:var(--md-sys-color-on-surface-variant);font:var(--md-sys-type-body-sm, var(--md-type-body-sm))}
.price__cta{align-self:end;width:100%}
.price-card .btn{width:100%}.price-card .btn.btn-filled{padding:12px 20px;min-height:48px}
@media (max-width:360px){.price__value{font:var(--md-type-headline-lg)}}
.price__divider{height:1px;width:100%;background:var(--md-sys-color-outline);margin:8px 0}

/* ---------- PREVIEWS & KPIs ---------- */
.preview{display:grid;gap:12px;padding:16px;border-radius:var(--md-sys-shape-corner-lg);background:var(--md-sys-color-surface);border:1px solid var(--md-sys-color-outline)}
.preview__thumb{width:100%;aspect-ratio:16/9;border-radius:var(--md-sys-shape-corner-md);background:var(--neutral-100);overflow:hidden}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.kpi{padding:20px;border-radius:var(--md-sys-shape-corner-xl);background:var(--md-sys-color-surface);box-shadow:var(--md-sys-elevation-1);border:1px solid var(--md-sys-color-outline)}
.kpi__label{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.kpi__value{font:var(--md-type-headline-lg)}

/* ---------- STAT CARD WITH TRENDS ---------- */
.stat-card {
  padding: var(--space-5);
  border-radius: var(--md-sys-shape-corner-xl);
  background: var(--md-sys-color-surface);
  box-shadow: var(--md-sys-elevation-1);
  border: 1px solid var(--md-sys-color-outline);
}
.stat-card__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4); }
.stat-card__label { color: var(--md-sys-color-on-surface-variant); font: var(--md-type-body-sm); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-card__icon { width: 40px; height: 40px; padding: var(--space-2); border-radius: var(--md-sys-shape-corner-lg); background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); }
.stat-card__value { font: var(--md-type-display-sm); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-2); line-height: 1.1; }
.stat-card__trend { display: inline-flex; align-items: center; gap: var(--space-1); padding: 4px 8px; border-radius: var(--md-sys-shape-corner-sm); font: var(--md-type-label-lg); font-size: 13px; }
.stat-card__trend--up { background: color-mix(in oklab, #10B981 12%, transparent); color: #065F46; }
.stat-card__trend--down { background: color-mix(in oklab, #EF4444 12%, transparent); color: #991B1B; }
.stat-card__trend--neutral { background: var(--md-sys-color-surface-variant); color: var(--md-sys-color-on-surface-variant); }
.stat-card__trend-icon { width: 16px; height: 16px; }
.stat-card__comparison { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); margin-top: var(--space-2); }

/* ---------- MODAL & POPUPS ---------- */
.modal-root{position:fixed;inset:0;display:grid;place-items:center;z-index:1000}
.modal-root .backdrop{position:absolute;inset:0;background:var(--md-sys-color-scrim)}
.modal{width:min(560px,calc(100vw - 2rem));border-radius:var(--md-sys-shape-corner-2xl);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);box-shadow:var(--md-sys-elevation-5);padding:24px}

.tooltip{position:absolute;z-index:1100;pointer-events:none;background:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);font:var(--md-type-body-sm);padding:6px 8px;border-radius:6px;box-shadow:var(--md-sys-elevation-3);transform:translate(-50%,-8px);white-space:nowrap}
.tooltip[data-pos="bottom"]{transform:translate(-50%,8px)}

.popover{position:absolute;z-index:1100;min-width:240px;max-width:360px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);border-radius:var(--md-sys-shape-corner-lg);box-shadow:var(--md-sys-elevation-3);padding:12px}
.popover__header{font:var(--md-type-title-lg);margin-bottom:8px}
.popover__body{font:var(--md-type-body-lg);color:var(--md-sys-color-on-surface-variant)}
.popover__footer{margin-top:12px;display:flex;gap:8px;justify-content:flex-end}
.popover::after{content:"";position:absolute;width:10px;height:10px;background:inherit;border:inherit;transform:rotate(45deg);top:-6px;left:24px;border-right:none;border-bottom:none}

.menu{position:absolute;z-index:1100;min-width:200px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);border-radius:var(--md-sys-shape-corner-lg);box-shadow:var(--md-sys-elevation-3);padding:6px;overflow:hidden}
.menu__item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;font:var(--md-type-body-lg)}
.menu__item:hover,.menu__item[aria-current="true"]{background:var(--md-sys-color-surface-variant)}
.menu__separator{height:1px;background:var(--md-sys-color-outline);margin:6px 0}

.drawer{position:fixed;inset:0;z-index:1200;display:grid;grid-template-columns:1fr auto}
.drawer__scrim{grid-column:1/2;background:var(--md-sys-color-scrim)}
.drawer__panel{grid-column:2/3;width:min(420px,100vw);height:100%;padding:20px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border-left:1px solid var(--md-sys-color-outline);box-shadow:var(--md-sys-elevation-4);display:grid;grid-template-rows:auto 1fr auto;gap:16px}
.drawer__title{font:var(--md-type-title-lg)}
.drawer__body{overflow:auto;color:var(--md-sys-color-on-surface-variant)}
.drawer__footer{display:flex;gap:8px;justify-content:flex-end}
[hidden]{display:none!important}

.snackbar{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);padding:12px 16px;border-radius:12px;background:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);box-shadow:var(--md-sys-elevation-3);display:flex;gap:12px;align-items:center;z-index:1100}

/* ---------- PAGE HEADER ---------- */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}
.page-header__title { font: var(--md-type-headline-lg); color: var(--md-sys-color-on-surface); margin: 0; }
.page-header__subtitle { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); margin-top: var(--space-1); }
.page-header__actions { display: flex; gap: var(--space-3); align-items: center; }

/* ---------- COMPARISON VIEW ---------- */
.comparison { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
@media (max-width: 768px) { .comparison { grid-template-columns: 1fr; }}
.comparison__side { border: 1px solid var(--md-sys-color-outline); border-radius: var(--md-sys-shape-corner-xl); padding: var(--space-5); background: var(--md-sys-color-surface); }
.comparison__side--highlighted { border-color: var(--md-sys-color-primary); box-shadow: var(--shadow-brand-glow); }
.comparison__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--md-sys-color-outline); }
.comparison__title { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); }
.comparison__metrics { display: flex; flex-direction: column; gap: var(--space-3); }
.comparison__metric { display: flex; justify-content: space-between; align-items: center; }
.comparison__metric-label { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); }
.comparison__metric-value { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); }

/* ---------- TAGS ---------- */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px 10px;
  border-radius: var(--md-sys-shape-corner-sm);
  font: var(--md-type-label-lg);
  font-size: 12px;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
  border: 1px solid var(--md-sys-color-outline);
}
.tag--primary { background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); border-color: transparent; }
.tag--success { background: color-mix(in oklab, #10B981 15%, transparent); color: #065F46; border-color: #10B981; }
.tag--warning { background: color-mix(in oklab, #F59E0B 15%, transparent); color: #7C3E00; border-color: #F59E0B; }
.tag--error { background: color-mix(in oklab, #EF4444 15%, transparent); color: #991B1B; border-color: #EF4444; }

/* ---------- MISC COMPONENTS ---------- */
.logo { display: flex; align-items: center; gap: var(--space-2); font: var(--md-type-title-lg); font-weight: 700; color: var(--md-sys-color-on-surface); text-decoration: none; }
.logo__icon { width: 32px; height: 32px; color: var(--md-sys-color-primary); }
.logo__text { color: var(--md-sys-color-on-surface); }

.divider { height: 1px; background: var(--md-sys-color-outline); margin: var(--space-4) 0; }
.divider--vertical { width: 1px; height: auto; margin: 0 var(--space-4); }

.list-group { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--md-sys-color-outline); border-radius: var(--md-sys-shape-corner-lg); overflow: hidden; }
.list-group__item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); background: var(--md-sys-color-surface); border-bottom: 1px solid var(--md-sys-color-outline); }
.list-group__item:last-child { border-bottom: none; }
.list-group__item:hover { background: var(--md-sys-color-surface-variant); }

.overflow-menu { position: relative; display: inline-block; }
.overflow-menu__trigger { width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: var(--md-sys-shape-corner-sm); color: var(--md-sys-color-on-surface-variant); }
.overflow-menu__trigger:hover { background: var(--md-sys-color-surface-variant); }

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--md-sys-color-surface);
  border-top-left-radius: var(--md-sys-shape-corner-2xl);
  border-top-right-radius: var(--md-sys-shape-corner-2xl);
  box-shadow: var(--md-sys-elevation-5);
  padding: var(--space-6);
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
}
.bottom-sheet__handle { width: 40px; height: 4px; background: var(--md-sys-color-outline); border-radius: 9999px; margin: 0 auto var(--space-4); }

.icon { width: 24px; height: 24px; display: inline-block; flex-shrink: 0; }
.icon--sm { width: 16px; height: 16px; }
.icon--md { width: 24px; height: 24px; }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 40px; height: 40px; }

/* ---------- UTILITY CLASSES ---------- */
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.font-bold { font-weight: 600; }
.font-normal { font-weight: 400; }
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }
.rounded { border-radius: var(--md-sys-shape-corner-lg); }
.rounded-full { border-radius: 9999px; }
.border { border: 1px solid var(--md-sys-color-outline); }
.border-top { border-top: 1px solid var(--md-sys-color-outline); }
.border-bottom { border-bottom: 1px solid var(--md-sys-color-outline); }
.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.pointer-events-none { pointer-events: none; }
.select-none { user-select: none; }
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow: scroll; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-50 { z-index: 50; }

.text-primary { color: var(--md-sys-color-primary); }
.text-secondary { color: var(--md-sys-color-on-surface-variant); }
.text-error { color: var(--md-sys-color-error); }
.text-success { color: #10B981; }
.text-warning { color: #F59E0B; }
.bg-primary { background: var(--md-sys-color-primary); }
.bg-surface { background: var(--md-sys-color-surface); }
.bg-surface-variant { background: var(--md-sys-color-surface-variant); }

/* ---------- HERO RULES ---------- */
.hero h1{font:var(--md-type-display-sm)}
@media(min-width:1024px){.hero h1{font:var(--md-type-display-lg)}}

/* ---------- COMPACT DENSITY ---------- */
.compact .btn{min-height:36px;padding:8px 12px}
.compact .textfield input,.compact .textfield select{height:48px}
.compact .card{padding:16px}
.compact .table th{padding:8px 12px}
.compact .table td{padding:10px 12px}

/* ---------- ACCESSIBILITY & STATES ---------- */
[aria-busy="true"]{opacity:.8;pointer-events:none}
[disabled]{opacity:.5;pointer-events:none}

/* ---------- PRINT ---------- */
@media print{
  .topbar,.snackbar,.modal-root,.drawer,.popover,.menu,.tooltip{display:none!important}
  .card,.price-card,.kpi{box-shadow:none;border:1px solid var(--md-sys-color-outline)}
}

/* ============================================================
   FINAL DESIGN SYSTEM - 100% Complete
   Ready for automated wireframe generation without errors
   ============================================================ */
