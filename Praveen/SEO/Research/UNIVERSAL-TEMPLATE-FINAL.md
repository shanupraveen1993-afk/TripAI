# 🎯 UNIVERSAL LANDING PAGE WIREFRAME GENERATOR
## HIGH-FIDELITY OUTPUT WITH COMPETITIVE ANALYSIS

---

## ⚡ QUICK START - ONLY 2 INPUTS NEEDED

```yaml
REFERENCE_WEBPAGE_URL: [Rank tracker]
PAGE_DESCRIPTION: [track the ranks for mobile aps for both android and ios]
```

---

## 🔄 COMPLETE EXECUTION WORKFLOW

### PHASE 1: COMPETITIVE IDENTIFICATION
**Objective**: Find and list 4-5 direct competitors

**Steps**:
1. Analyze reference landing page structure
2. Identify industry/niche automatically
3. Find 4-5 exact match competitors with similar:
   - Product features ( example if my tool is keyword research ,https://keywordtool.io/ this my competitor-1, https://www.apptweak.com/en/aso-tools/keyword-research-suggestions-2nd competitor and ... )
4. Output competitor URLs

**Deliverable**:
```markdown
## COMPETITOR LIST
1. [Competitor 1 Name] - [URL]
2. [Competitor 2 Name] - [URL]
3. [Competitor 3 Name] - [URL]
4. [Competitor 4 Name] - [URL]
5. [Competitor 5 Name] - [URL]

```

---

### PHASE 2: FOLD-BY-FOLD COMPONENT EXTRACTION
**Objective**: Extract all UI components from each fold across ALL competitors

**Folds to Analyze**:
1. **Navigation/Header**
2. **Hero Section** (above the fold)
3. **Value Proposition/Benefits**( functionality )
4. **Features Showcase**
6. **How It Works/Process**
7. **Pricing** (if applicable)
8. **FAQ Section if available**
9. **Final CTA**
10. **Footer**

**For Each Fold, Document**:
- Layout structure (grid, flexbox, columns)
- Spacing and padding values
- Text content (exact copy)
- Visual elements (images, icons, screenshots)
- Interactive elements (buttons, links, forms)
- Component hierarchy

---

### PHASE 3: COMPONENT EVALUATION & SCORING
**Objective**: Rate each component and select the BEST per fold

**Scoring System** (1-5 scale for each criterion):

1. **Clarity (1-5)**: Is the message clear and easy to understand?
   - 1: Confusing, unclear messaging
   - 3: Adequate clarity
   - 5: Crystal clear, immediate understanding

2. **Visual Hierarchy (1-5)**: Does it guide the eye effectively?
   - 1: No clear hierarchy, cluttered
   - 3: Basic hierarchy present
   - 5: Perfect flow, clear focal points

3. **Conversion Potential (1-5)**: Does it drive user action?
   - 1: No clear CTA or value prop
   - 3: CTA present but not compelling
   - 5: Strong urgency, clear next step

4. **User Experience (1-5)**: Is it intuitive and accessible?
   - 1: Confusing navigation, poor usability
   - 3: Functional but not exceptional
   - 5: Delightful, seamless experience

**Total Score**: Sum of 4 criteria (max 20 points)

**Selection Rule**: Choose the component with the HIGHEST total score per fold (no duplicates from same competitor across all folds)

---

### PHASE 4: DETAILED UI SPECIFICATION
**Objective**: Document complete specifications for each winning component

**For Each Best Component, Document**:

#### Layout Structure
- Container properties (width, max-width, height)
- Display type (flex, grid, block)
- Padding and margins (specific px/rem values)
- Grid/flex properties (columns, gap, alignment)

#### Component Arrangement
- Element positioning (left, center, right)
- Spacing between elements
- Hierarchy and nesting

#### Responsive Behavior
- Desktop (1440px+): Full layout
- Tablet (768px-1439px): Adjusted layout
- Mobile (<768px): Mobile-optimized layout

#### Interactive States
- Hover effects
- Active states
- Focus states (for accessibility)
- Transition timings

#### Text Content
- **Exact copy** from winning component
- All headlines, body text, button labels
- Trust elements, social proof numbers

#### Visual Elements
- Image/screenshot descriptions
- Icon descriptions
- Placeholder specifications

**IMPORTANT**: Exclude colors, fonts, font weights, font sizes (these will be applied from design system later)

---

### PHASE 5: HIGH-FIDELITY SVG GENERATION

After completing competitive analysis, generate SVG wireframe using **Premium Design System**

---

## 🎨 PREMIUM DESIGN SYSTEM (AUTO-APPLIED TO SVG OUTPUT)

### Color Palette

```javascript
// Brand Colors (Primary)
brand.500: #FF5722  // Main CTAs, primary actions
brand.600: #F4511E  // Hover states
brand.700: #E64A19  // Active/pressed states
brand.50:  #FFF3E0  // Subtle backgrounds, icon containers

// Brand Gradient
brandGradient: linear-gradient(135deg, #FF5722 0%, #F4511E 100%)

// Neutral Colors (Professional UI)
neutral.25:  #FCFCFD  // Page background
neutral.50:  #F9FAFB  // Alternate section backgrounds
neutral.100: #F3F4F6  // Card backgrounds, input fills
neutral.200: #E5E7EB  // Borders, dividers
neutral.300: #D1D5DB  // Input borders, inactive states
neutral.400: #9CA3AF  // Placeholder text
neutral.500: #6B7280  // Secondary text
neutral.600: #4B5563  // Body text
neutral.700: #374151  // Subheadings
neutral.800: #1F2937  // Headings
neutral.900: #111827  // Hero text, emphasis

// Accent Colors (Icons, Badges, Status Indicators)
blue.500:   #3B82F6  // Trust, information
green.500:  #10B981  // Success, checkmarks, growth
purple.500: #8B5CF6  // Premium features
amber.500:  #F59E0B  // Warnings, highlights
```

### Typography System

```javascript
// Font Family
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

// Font Sizes (Responsive Scaling)
Hero Headline:       56-60px (desktop) / 36-42px (mobile)
Section Headline:    42px (desktop) / 28-32px (mobile)
Subsection:          32px / 24px (mobile)
Card Headline:       22-24px
Body Large:          18px
Body Text:           16px (base)
Small Text:          14px
Caption/Label:       12px

// Font Weights
Headings:            700 (Bold)
Subheadings:         600 (Semibold)
Medium Emphasis:     500 (Medium)
Body:                400 (Regular)
Light:               300 (Light) - use sparingly

// Line Heights
Headings:            1.2 (tight)
Subheadings:         1.3
Body:                1.6 (relaxed, readable)
Small:               1.5

// Letter Spacing
Headings:            -0.02em (tight, modern)
Body:                0 (normal)
Uppercase Labels:    0.025em (wide)
```

### Spacing Scale (8px Base Unit)

```javascript
xs:   4px   // Tight gaps within components
sm:   8px   // Small gaps
md:   16px  // Default gap between elements
lg:   24px  // Medium spacing
xl:   32px  // Large spacing, card gaps
2xl:  48px  // Section padding (horizontal)
3xl:  64px  // Between major sections
4xl:  80px  // Section padding (vertical)
5xl:  120px // Hero section padding (vertical)
```

### Shadow System (Elevation & Depth)

```javascript
// Card & Component Shadows
elevationLow:
  box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1)

elevationMedium:
  box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.12)

elevationHigh:
  box-shadow: 0 12px 24px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)

elevationFloat:
  box-shadow: 0 16px 32px rgba(0,0,0,0.14), 0 12px 24px rgba(0,0,0,0.1)

// Brand CTA Shadows (Orange Glow)
brandShadow:
  box-shadow: 0 4px 8px rgba(255,87,34,0.25), 0 6px 12px rgba(255,87,34,0.2)

brandGlow:
  box-shadow: 0 0 0 1px rgba(255,87,34,0.1), 0 8px 16px rgba(255,87,34,0.3)
```

### Border Radius

```javascript
sm:   4px    // Badges, pills, small elements
md:   8px    // Buttons, inputs, small cards
lg:   12px   // Standard cards, feature images
xl:   16px   // Large cards, modals
2xl:  20px   // Hero sections, large containers
full: 9999px // Circular avatars, toggle pills
```

---

## 📐 SVG GENERATION RULES - CRITICAL FOR HIGH-FIDELITY

### STRUCTURE TEMPLATE

```xml
<svg width="1440" height="[AUTO_CALCULATED]" xmlns="http://www.w3.org/2000/svg">

  <!-- ========== DEFS SECTION (REQUIRED) ========== -->
  <defs>
    <!-- Brand Gradient -->
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF5722;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F4511E;stop-opacity:1" />
    </linearGradient>

    <!-- Shadow Filters -->
    <filter id="elevationLow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
      <feOffset dx="0" dy="2"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.1"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="elevationMedium" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="4"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.12"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="elevationHigh" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
      <feOffset dx="0" dy="8"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.14"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="brandShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="4"/>
      <feFlood flood-color="#FF5722" flood-opacity="0.25"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- ========== PAGE BACKGROUND ========== -->
  <rect width="1440" height="[FULL_HEIGHT]" fill="#FCFCFD"/>

  <!-- ========== SECTIONS ========== -->
  <g id="navigation">...</g>
  <g id="hero">...</g>
  <g id="benefits">...</g>
  <g id="features">...</g>
  <g id="social-proof">...</g>
  <g id="pricing">...</g>
  <g id="faq">...</g>
  <g id="final-cta">...</g>
  <g id="footer">...</g>
</svg>
```

---

## 🎯 COMPONENT RENDERING STANDARDS

### 1. NAVIGATION BAR

```xml
<g id="navigation">
  <!-- Background with subtle shadow -->
  <rect x="0" y="0" width="1440" height="80" fill="#FFFFFF" filter="url(#elevationLow)"/>

  <!-- Logo (left, 48px padding) -->
  <text x="48" y="48" font-family="Inter, sans-serif" font-size="24" font-weight="700" fill="#111827">
    [Logo Text from Analysis]
  </text>

  <!-- Nav Links (center-aligned or left of CTA) -->
  <text x="500" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#4B5563">[Nav 1]</text>
  <text x="600" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#4B5563">[Nav 2]</text>
  <text x="700" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#4B5563">[Nav 3]</text>
  <text x="800" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="500" fill="#4B5563">[Nav 4]</text>

  <!-- CTA Button (right, 48px padding) -->
  <rect x="1240" y="24" width="152" height="40" rx="8" fill="url(#brandGradient)" filter="url(#brandShadow)"/>
  <text x="1316" y="49" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">
    [CTA Text from Analysis]
  </text>
</g>
```

### 2. HERO SECTION (2-Column Layout)

```xml
<g id="hero" transform="translate(0, 80)">
  <!-- Section Background -->
  <rect x="0" y="0" width="1440" height="700" fill="#FFFFFF"/>

  <!-- ===== LEFT COLUMN: CONTENT ===== -->
  <g id="hero-content" transform="translate(120, 150)">

    <!-- Headline (Multi-line with proper wrapping) -->
    <text font-family="Inter, sans-serif" font-size="56" font-weight="700" fill="#111827" letter-spacing="-0.02em">
      <tspan x="0" dy="0">[Headline Line 1 from Analysis]</tspan>
      <tspan x="0" dy="67">[Headline Line 2 from Analysis]</tspan>
      <tspan x="0" dy="67">[Headline Line 3 if exists]</tspan>
    </text>

    <!-- Subheadline (offset by headline height + 24px margin) -->
    <text font-family="Inter, sans-serif" font-size="18" font-weight="400" fill="#6B7280" opacity="0.9">
      <tspan x="0" dy="[CALC: headline_height + 24px]">[Subheadline text from Analysis]</tspan>
      <tspan x="0" dy="29">[Second line if wrapped]</tspan>
    </text>

    <!-- CTA Group -->
    <g transform="translate(0, [CALC: content_height + 32px])">
      <!-- Primary CTA -->
      <rect x="0" y="0" width="[from specs]" height="56" rx="8" fill="url(#brandGradient)" filter="url(#brandShadow)"/>
      <text x="[width/2]" y="36" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">
        [Primary CTA from Analysis]
      </text>

      <!-- Secondary CTA (if exists) -->
      <rect x="[gap: 16px]" y="0" width="[from specs]" height="56" rx="8" fill="transparent" stroke="#FF5722" stroke-width="2"/>
      <text x="[x + width/2]" y="36" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#FF5722" text-anchor="middle">
        [Secondary CTA from Analysis]
      </text>
    </g>

    <!-- Trust Elements -->
    <g transform="translate(0, [CALC: CTA_y + 80px])">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#10B981">✓</text>
      <text x="24" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="400" fill="#6B7280">[Trust 1 from Analysis]</text>

      <text x="[gap: 24px from prev]" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#10B981">✓</text>
      <text x="[x + 24]" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="400" fill="#6B7280">[Trust 2 from Analysis]</text>

      <text x="[gap: 24px from prev]" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#10B981">✓</text>
      <text x="[x + 24]" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="400" fill="#6B7280">[Trust 3 from Analysis]</text>
    </g>
  </g>

  <!-- ===== RIGHT COLUMN: VISUAL ===== -->
  <g id="hero-visual" transform="translate(780, 100)">
    <!-- Image placeholder with shadow and border -->
    <rect x="0" y="0" width="540" height="500" rx="12" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationHigh)"/>

    <!-- Placeholder description (from analysis) -->
    <text x="270" y="230" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">
      [Screenshot Description from Analysis]
    </text>
    <text x="270" y="250" font-family="Inter, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle">
      [Key elements visible from Analysis]
    </text>
  </g>
</g>
```

### 3. BENEFIT CARDS (3-Column Grid)

```xml
<g id="benefits" transform="translate(0, 780)">
  <!-- Alternate section background -->
  <rect x="0" y="0" width="1440" height="[AUTO_HEIGHT]" fill="#F9FAFB"/>

  <!-- Section Headline -->
  <text x="720" y="80" font-family="Inter, sans-serif" font-size="42" font-weight="700" fill="#111827" text-anchor="middle">
    [Section Headline from Analysis]
  </text>
  <text x="720" y="120" font-family="Inter, sans-serif" font-size="18" fill="#6B7280" opacity="0.8" text-anchor="middle">
    [Section Subheadline from Analysis]
  </text>

  <!-- CARD 1 -->
  <g id="benefit-card-1" transform="translate(120, 180)">
    <rect x="0" y="0" width="360" height="[from specs]" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>

    <!-- Icon Container with background -->
    <rect x="40" y="40" width="64" height="64" rx="12" fill="#FFF3E0"/>
    <text x="72" y="82" font-size="32" text-anchor="middle">[Icon/Emoji from Analysis]</text>

    <!-- Card Headline -->
    <text x="40" y="148" font-family="Inter, sans-serif" font-size="22" font-weight="600" fill="#111827">
      [Card 1 Headline from Analysis]
    </text>

    <!-- Card Description (properly wrapped) -->
    <text x="40" y="188" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#6B7280">
      <tspan x="40" dy="0">[Description Line 1 from Analysis]</tspan>
      <tspan x="40" dy="26">[Description Line 2 from Analysis]</tspan>
      <tspan x="40" dy="26">[Description Line 3 if exists]</tspan>
    </text>
  </g>

  <!-- CARD 2 (x=520) -->
  <g id="benefit-card-2" transform="translate(520, 180)">
    <rect x="0" y="0" width="360" height="[from specs]" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>

    <rect x="40" y="40" width="64" height="64" rx="12" fill="#EFF6FF"/>
    <text x="72" y="82" font-size="32" text-anchor="middle">[Icon 2 from Analysis]</text>

    <text x="40" y="148" font-family="Inter, sans-serif" font-size="22" font-weight="600" fill="#111827">
      [Card 2 Headline from Analysis]
    </text>

    <text x="40" y="188" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#6B7280">
      <tspan x="40" dy="0">[Card 2 Description from Analysis]</tspan>
      <tspan x="40" dy="26">[Wrapped properly]</tspan>
    </text>
  </g>

  <!-- CARD 3 (x=920) -->
  <g id="benefit-card-3" transform="translate(920, 180)">
    <rect x="0" y="0" width="360" height="[from specs]" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>

    <rect x="40" y="40" width="64" height="64" rx="12" fill="#ECFDF5"/>
    <text x="72" y="82" font-size="32" text-anchor="middle">[Icon 3 from Analysis]</text>

    <text x="40" y="148" font-family="Inter, sans-serif" font-size="22" font-weight="600" fill="#111827">
      [Card 3 Headline from Analysis]
    </text>

    <text x="40" y="188" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#6B7280">
      <tspan x="40" dy="0">[Card 3 Description from Analysis]</tspan>
      <tspan x="40" dy="26">[Wrapped properly]</tspan>
    </text>
  </g>
</g>
```

### 4. FEATURES (Alternating Layout)

```xml
<g id="features" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="[AUTO_HEIGHT]" fill="#FFFFFF"/>

  <text x="720" y="80" font-family="Inter, sans-serif" font-size="42" font-weight="700" fill="#111827" text-anchor="middle">
    [Features Section Headline from Analysis]
  </text>

  <!-- FEATURE 1: Visual Left, Content Right -->
  <g id="feature-1" transform="translate(0, 160)">
    <!-- Visual Column (Left) -->
    <g transform="translate(120, 0)">
      <rect x="0" y="0" width="540" height="[from specs]" rx="12" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>
      <text x="270" y="[center_y]" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">
        [Feature 1 Screenshot Description from Analysis]
      </text>
    </g>

    <!-- Content Column (Right) -->
    <g transform="translate(720, 40)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="32" font-weight="600" fill="#111827">
        [Feature 1 Headline from Analysis]
      </text>

      <text x="0" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#6B7280">
        <tspan x="0" dy="0">[Feature 1 Description from Analysis]</tspan>
        <tspan x="0" dy="26">[Wrapped properly]</tspan>
      </text>

      <!-- Feature Points -->
      <g transform="translate(0, 140)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 1 from Analysis]</text>

        <text x="0" y="36" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="36" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 2 from Analysis]</text>

        <text x="0" y="72" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="72" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 3 from Analysis]</text>
      </g>
    </g>
  </g>

  <!-- FEATURE 2: Content Left, Visual Right (Alternating) -->
  <g id="feature-2" transform="translate(0, [prev_height + 120px])">
    <!-- Content Column (Left) -->
    <g transform="translate(120, 40)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="32" font-weight="600" fill="#111827">
        [Feature 2 Headline from Analysis]
      </text>

      <text x="0" y="48" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#6B7280">
        <tspan x="0" dy="0">[Feature 2 Description from Analysis]</tspan>
        <tspan x="0" dy="26">[Wrapped properly]</tspan>
      </text>

      <g transform="translate(0, 140)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 1 from Analysis]</text>

        <text x="0" y="36" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="36" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 2 from Analysis]</text>

        <text x="0" y="72" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="72" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Point 3 from Analysis]</text>
      </g>
    </g>

    <!-- Visual Column (Right) -->
    <g transform="translate(780, 0)">
      <rect x="0" y="0" width="540" height="[from specs]" rx="12" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>
      <text x="270" y="[center_y]" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">
        [Feature 2 Screenshot Description from Analysis]
      </text>
    </g>
  </g>

  <!-- Repeat for Feature 3, 4, etc. with alternating layout -->
</g>
```

### 5. PRICING (Highlighted Recommended Tier)

```xml
<g id="pricing" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="[AUTO_HEIGHT]" fill="#F9FAFB"/>

  <text x="720" y="80" font-family="Inter, sans-serif" font-size="42" font-weight="700" fill="#111827" text-anchor="middle">
    [Pricing Section Headline from Analysis]
  </text>

  <!-- PRICING TIER (Recommended - Highlighted) -->
  <g id="pricing-recommended" transform="translate([CENTER_X], 200)">
    <!-- Floating Badge -->
    <rect x="[center - badge_width/2]" y="-16" width="180" height="32" rx="16" fill="url(#brandGradient)" filter="url(#brandShadow)"/>
    <text x="[center]" y="6" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.025em">
      [Badge Text from Analysis - e.g., "MOST POPULAR"]
    </text>

    <!-- Card with Brand Border -->
    <rect x="0" y="0" width="380" height="[from specs]" rx="12" fill="#FFFFFF" stroke="#FF5722" stroke-width="2" filter="url(#elevationHigh)"/>

    <!-- Plan Name -->
    <text x="40" y="56" font-family="Inter, sans-serif" font-size="24" font-weight="700" fill="#111827">
      [Plan Name from Analysis]
    </text>

    <!-- Plan Description -->
    <text x="40" y="88" font-family="Inter, sans-serif" font-size="14" fill="#6B7280">
      [Plan Description from Analysis]
    </text>

    <!-- Price -->
    <text x="40" y="150" font-family="Inter, sans-serif" font-size="56" font-weight="700" fill="#111827">[Price from Analysis]</text>
    <text x="[price_width + 50]" y="150" font-family="Inter, sans-serif" font-size="18" fill="#6B7280">[Billing Period from Analysis]</text>

    <!-- CTA Button (Full Width) -->
    <rect x="40" y="190" width="300" height="56" rx="8" fill="url(#brandGradient)" filter="url(#brandShadow)"/>
    <text x="190" y="223" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">
      [CTA Text from Analysis]
    </text>

    <!-- Divider -->
    <line x1="40" y1="276" x2="340" y2="276" stroke="#E5E7EB" stroke-width="1"/>

    <!-- Features List -->
    <g transform="translate(40, 300)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#6B7280" letter-spacing="0.025em">
        [Features Header from Analysis]
      </text>

      <!-- Feature Items (from analysis) -->
      <g transform="translate(0, 32)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Feature 1 from Analysis]</text>
      </g>

      <g transform="translate(0, 64)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Feature 2 from Analysis]</text>
      </g>

      <g transform="translate(0, 96)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Feature 3 from Analysis]</text>
      </g>

      <g transform="translate(0, 128)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Feature 4 from Analysis]</text>
      </g>

      <g transform="translate(0, 160)">
        <text x="0" y="0" font-size="16" fill="#10B981">✓</text>
        <text x="28" y="0" font-family="Inter, sans-serif" font-size="14" fill="#4B5563">[Feature 5 from Analysis]</text>
      </g>

      <!-- Add more features as needed from analysis -->
    </g>
  </g>

  <!-- Add other pricing tiers (Basic, Enterprise) if present in analysis -->
</g>
```

### 6. SOCIAL PROOF / TESTIMONIALS

```xml
<g id="social-proof" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="[AUTO_HEIGHT]" fill="#FFFFFF"/>

  <text x="720" y="80" font-family="Inter, sans-serif" font-size="42" font-weight="700" fill="#111827" text-anchor="middle">
    [Testimonials Section Headline from Analysis]
  </text>

  <!-- TESTIMONIAL CARD 1 -->
  <g id="testimonial-1" transform="translate(120, 160)">
    <rect x="0" y="0" width="360" height="[from specs]" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" filter="url(#elevationMedium)"/>

    <!-- Rating Stars -->
    <g transform="translate(40, 40)">
      <text x="0" y="0" font-size="20" fill="#F59E0B">★</text>
      <text x="24" y="0" font-size="20" fill="#F59E0B">★</text>
      <text x="48" y="0" font-size="20" fill="#F59E0B">★</text>
      <text x="72" y="0" font-size="20" fill="#F59E0B">★</text>
      <text x="96" y="0" font-size="20" fill="#F59E0B">★</text>
    </g>

    <!-- Quote -->
    <text x="40" y="90" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="#4B5563">
      <tspan x="40" dy="0">"[Quote Line 1 from Analysis]</tspan>
      <tspan x="40" dy="26">[Quote Line 2 from Analysis]</tspan>
      <tspan x="40" dy="26">[Quote Line 3 if exists]"</tspan>
    </text>

    <!-- Divider -->
    <line x1="40" y1="[quote_height + 24]" x2="320" y2="[quote_height + 24]" stroke="#E5E7EB" stroke-width="1"/>

    <!-- Customer Info -->
    <g transform="translate(40, [quote_height + 48])">
      <!-- Avatar Placeholder -->
      <circle cx="24" cy="24" r="24" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1"/>
      <text x="24" y="30" font-family="Inter, sans-serif" font-size="16" fill="#9CA3AF" text-anchor="middle">[Initial]</text>

      <!-- Customer Details -->
      <text x="64" y="20" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">
        [Customer Name from Analysis]
      </text>
      <text x="64" y="38" font-family="Inter, sans-serif" font-size="12" fill="#6B7280">
        [Customer Title/Company from Analysis]
      </text>
    </g>
  </g>

  <!-- TESTIMONIAL CARD 2 (x=520) -->
  <!-- TESTIMONIAL CARD 3 (x=920) -->
  <!-- Repeat structure with content from analysis -->
</g>
```

### 7. FAQ SECTION

```xml
<g id="faq" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="[AUTO_HEIGHT]" fill="#F9FAFB"/>

  <text x="720" y="80" font-family="Inter, sans-serif" font-size="42" font-weight="700" fill="#111827" text-anchor="middle">
    [FAQ Section Headline from Analysis]
  </text>

  <!-- FAQ Items (Accordion-style placeholders) -->
  <g transform="translate(420, 160)">
    <!-- FAQ Item 1 -->
    <rect x="0" y="0" width="600" height="[from specs]" rx="8" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
    <text x="24" y="36" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">
      [FAQ Question 1 from Analysis]
    </text>
    <!-- Expand icon placeholder -->
    <text x="560" y="36" font-size="20" fill="#9CA3AF">+</text>

    <!-- FAQ Item 2 (y += item_height + 16px gap) -->
    <rect x="0" y="[prev_y + gap]" width="600" height="[from specs]" rx="8" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
    <text x="24" y="[prev_y + 36]" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">
      [FAQ Question 2 from Analysis]
    </text>
    <text x="560" y="[prev_y + 36]" font-size="20" fill="#9CA3AF">+</text>

    <!-- Continue for all FAQ items from analysis -->
  </g>
</g>
```

### 8. FINAL CTA

```xml
<g id="final-cta" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="400" fill="#FFFFFF"/>

  <g transform="translate(720, 120)">
    <!-- Headline -->
    <text x="0" y="0" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="#111827" text-anchor="middle">
      [Final CTA Headline from Analysis]
    </text>

    <!-- Subheadline -->
    <text x="0" y="60" font-family="Inter, sans-serif" font-size="18" fill="#6B7280" opacity="0.9" text-anchor="middle">
      [Final CTA Subheadline from Analysis]
    </text>

    <!-- CTA Button -->
    <g transform="translate(-100, 120)">
      <rect x="0" y="0" width="200" height="56" rx="8" fill="url(#brandGradient)" filter="url(#brandShadow)"/>
      <text x="100" y="36" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">
        [CTA Button Text from Analysis]
      </text>
    </g>

    <!-- Supporting Text -->
    <text x="0" y="210" font-family="Inter, sans-serif" font-size="14" fill="#6B7280">
      [Supporting Text from Analysis]
    </text>
  </g>
</g>
```

### 9. FOOTER

```xml
<g id="footer" transform="translate(0, [Y_POSITION])">
  <rect x="0" y="0" width="1440" height="500" fill="#1F2937"/>

  <g transform="translate(120, 80)">
    <!-- Logo -->
    <text x="0" y="0" font-family="Inter, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">
      [Logo from Analysis]
    </text>

    <!-- Footer Description -->
    <text x="0" y="40" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">
      <tspan x="0" dy="0">[Footer Description Line 1 from Analysis]</tspan>
      <tspan x="0" dy="20">[Footer Description Line 2 from Analysis]</tspan>
    </text>

    <!-- Footer Columns -->
    <g transform="translate(400, 0)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">[Column 1 Title from Analysis]</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 1 from Analysis]</text>
      <text x="0" y="60" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 2 from Analysis]</text>
      <text x="0" y="88" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 3 from Analysis]</text>
    </g>

    <g transform="translate(600, 0)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">[Column 2 Title from Analysis]</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 1 from Analysis]</text>
      <text x="0" y="60" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 2 from Analysis]</text>
      <text x="0" y="88" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 3 from Analysis]</text>
    </g>

    <g transform="translate(800, 0)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">[Column 3 Title from Analysis]</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 1 from Analysis]</text>
      <text x="0" y="60" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 2 from Analysis]</text>
      <text x="0" y="88" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Link 3 from Analysis]</text>
    </g>

    <!-- Bottom Bar -->
    <g transform="translate(0, 240)">
      <line x1="0" y1="0" x2="1200" y2="0" stroke="#374151" stroke-width="1"/>
      <text x="0" y="40" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">
        [Copyright Text from Analysis]
      </text>
      <text x="900" y="40" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Privacy Policy]</text>
      <text x="1050" y="40" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">[Terms of Service]</text>
    </g>
  </g>
</g>
```

---

## ✅ QUALITY CHECKLIST

Before finalizing SVG output, verify:

- [ ] **Canvas**: 1440px width, calculated height
- [ ] **Filters & Gradients**: All defined in `<defs>` section
- [ ] **Colors**: Exact hex codes from design system
- [ ] **Typography**: Proper font-family, sizes, weights
- [ ] **Shadows**: Applied to all cards (elevationMedium), CTAs (brandShadow), nav (elevationLow)
- [ ] **Spacing**: All padding/margins in 8px increments
- [ ] **Border Radius**: Consistent (8px buttons, 12px cards, 16px large cards)
- [ ] **Text Wrapping**: Multi-line text uses `<tspan>` with proper `dy`
- [ ] **Visual Hierarchy**: Hero largest → sections → cards → body
- [ ] **Grouping**: All sections in `<g>` tags with descriptive IDs
- [ ] **Brand Gradient**: On all primary CTAs
- [ ] **Section Backgrounds**: Alternating white (#FFFFFF) and light gray (#F9FAFB)
- [ ] **Content**: All text from competitive analysis, not placeholder Lorem Ipsum
- [ ] **Image Descriptions**: All screenshot placeholders have descriptions from analysis

---

## 🚀 FINAL GENERATION COMMAND

After completing the full competitive analysis (Phases 1-4), use this command:

```
Generate a high-fidelity SVG wireframe (1440px × auto height) with the following specifications:

1. **Canvas & Structure**:
   - 1440px width, auto-calculated height
   - All filters and gradients in <defs> section
   - Proper <g> grouping with IDs for each section

2. **Design System Application**:
   - Use exact colors from Premium Design System
   - Apply brand gradient (#FF5722 → #F4511E) to all primary CTAs
   - Elevation shadows: elevationLow (nav), elevationMedium (cards), elevationHigh (hero images, recommended pricing)
   - Brand shadow (orange glow) on all primary CTA buttons
   - Typography: Inter font family, proper sizes/weights from system

3. **Content from Competitive Analysis**:
   - Use EXACT text content from best-performing components
   - Include all headlines, descriptions, CTAs, feature lists, testimonials
   - Screenshot placeholders with descriptions from analysis
   - Trust elements, social proof numbers, pricing details

4. **Layout & Components**:
   - Navigation (sticky header with logo, nav links, CTA)
   - Hero (2-column: content left, visual right)
   - Benefits (3-column card grid)
   - Features (alternating 2-column layout)
   - Social Proof (testimonial cards)
   - Pricing (3-tier with highlighted recommended plan)
   - FAQ (accordion-style placeholders)
   - Final CTA (centered)
   - Footer (multi-column with links)

5. **Quality Standards**:
   - All spacing in 8px increments
   - Section backgrounds alternate: white → #F9FAFB → white
   - Proper text wrapping with <tspan>
   - Border radius: 8px (buttons), 12px (cards)
   - Professional, production-ready output

Output filename: [page-description]-wireframe-hifi.svg
```

---

## 📊 OUTPUT EXAMPLE FORMAT

```markdown
# LANDING PAGE COMPONENT SPECIFICATIONS

## REFERENCE SITE
**URL**: https://keywordtool.io/
**Industry**: Keyword Research / App Growth
**Analysis Date**: 2024-10-15

---

## COMPETITOR LIST
1. Ahrefs - https://ahrefs.com/
2. SEMrush - https://www.semrush.com/
3. Moz - https://moz.com/
4. Ubersuggest - https://neilpatel.com/ubersuggest/
5. Keyword Surfer - https://surferseo.com/keyword-surfer/
6. AnswerThePublic - https://answerthepublic.com/
7. Keywords Everywhere - https://keywordseverywhere.com/

---

## FOLD 1: NAVIGATION/HEADER

### 🏆 BEST COMPONENT: Navigation Structure
**Source**: Ahrefs
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 5/5
- User Experience: 4/5

**Why Selected**: Clean horizontal layout with prominent CTA, clear navigation hierarchy, balanced spacing, excellent contrast between nav links and primary action button.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width, fixed position
- Max-width: 1440px
- Height: 80px
- Padding: 0 48px
- Display: Flex
- Justify-content: Space-between
- Align-items: Center

[... continue with full specifications for all 10 folds ...]

---

## WIREFRAME GENERATION COMMAND

[After all analysis is complete, include the generation command]

Generate high-fidelity SVG wireframe using specifications above...
```

---

## 🎯 USAGE INSTRUCTIONS

**Step 1**: Input your reference URL and page description at the top

**Step 2**: AI executes full competitive analysis workflow:
- Identifies 5-7 competitors
- Extracts components from each fold
- Scores each component (Clarity, Hierarchy, Conversion, UX)
- Selects best component per fold
- Documents full UI specifications

**Step 3**: AI generates high-fidelity SVG using:
- Premium design system (colors, typography, shadows)
- Exact content from competitive analysis
- Professional structure and spacing

**Output**: Production-ready high-fidelity wireframe SVG

---

**Ready to use! Just provide the 2 inputs and let the system run the full analysis → generation workflow.** 🚀
