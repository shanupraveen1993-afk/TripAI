# Master Wireframe Generation Prompt - ASO Keyword Research Tool

## Purpose
Use this prompt to generate high-fidelity SVG wireframes for an ASO (App Store Optimization) keyword research SaaS tool. This prompt includes all design system specifications, spacing standards, and user flow details.

---

## Design System Specifications

### Brand & Colors
- **Primary Brand Color**: #FF5722 (vibrant orange)
- **Background**: #F9FAFB (light gray)
- **Card Background**: #FFFFFF (white)
- **Text Primary**: #111827 (near black)
- **Text Secondary**: #6B7280 (gray)
- **Text Tertiary**: #9CA3AF (light gray)
- **Success**: #10B981 (green)
- **Warning**: #FBBF24 (amber)
- **Error**: #EF4444 (red)
- **Accent Background**: #FFF3E0 (light orange tint)

### Typography
- **Font Family**: Inter, sans-serif
- **Font Sizes**:
  - Headlines (H1): 56px, weight 700, line-height 70px
  - Headlines (H2): 36px, weight 600, line-height 44px
  - Headlines (H3): 30px, weight 600, line-height 38px
  - Subheadings: 24px, weight 600, line-height 32px
  - Body Large: 20px, weight 400, line-height 30px
  - Body: 16px, weight 400-500, line-height 24px
  - Body Small: 14px, weight 400-500, line-height 21px
  - Caption: 12px, weight 500-600, line-height 18px
  - Tiny: 11px, weight 500, line-height 16px

### Spacing System (4px Grid)
- **Base unit**: 4px
- **Common spacing**: 8px, 12px, 16px, 20px, 24px, 28px, 32px, 48px, 64px
- **Card padding**: 24-32px on all sides
- **Section spacing**: 48-64px between major sections

### Text Spacing Standards (CRITICAL)
**Apply these rules to prevent text overlap:**

1. **Minimum line spacing**: 1.5× the larger font size
   - Example: 14px + 11px fonts need minimum 21px spacing
   - Example: 16px + 12px fonts need minimum 24px spacing

2. **Multi-line text spacing**:
   - Title to subtitle: 20-24px minimum
   - List item title to count: 22px minimum
   - Card text lines: 24-28px minimum

3. **Button text centering**:
   - Text baseline position: button_y + (button_height × 0.625)
   - 32px button: text at y+20
   - 40px button: text at y+25
   - 48px button: text at y+30

### Button Specifications
- **Height Options**: 32px (small), 40px (default), 48px (large)
- **Border Radius**: 8px (small), 10px (default), 12px (large)
- **Padding**: Minimum 16px horizontal, 8-12px vertical
- **Text Alignment**: Vertically centered at 62.5% of height, horizontally centered
- **Primary Button**: #FF5722 background, white text, brand-glow filter
- **Secondary Button**: Transparent background, #E5E7EB border, gray text
- **Touch Target**: Minimum 40px height for accessibility

### Card Specifications
- **Border Radius**: 12-16px (standard), 20px (modals)
- **Border**: 1px solid #E5E7EB (standard), 2px for emphasis
- **Padding**: 24px minimum, 32px for spacious layouts
- **Shadow Levels**:
  - Subtle: 0 1px 2px rgba(0,0,0,0.04) + 0 2px 4px rgba(0,0,0,0.04)
  - Medium: 0 4px 6px rgba(0,0,0,0.06) + 0 8px 12px rgba(0,0,0,0.08)
  - High: 0 12px 24px rgba(0,0,0,0.12) + 0 24px 48px rgba(0,0,0,0.08)
  - Brand Glow: 0 4px 12px rgba(255,87,34,0.25)

### Pricing Card Spacing (Industry Standard)
**Based on Stripe, Vercel, Linear, Notion:**

- **Card dimensions**: 336×420px per card
- **Top padding**: 32px (7.6% of height)
- **Title to price**: 20px
- **Price to features**: 72px (maintains price prominence)
- **Feature spacing**: 28px between items (6.7% of height)
- **Button position**: 76px from bottom (344px from top)
- **Bottom padding**: 28px (6.7% of height)

### List Item Spacing
- **Item height**: 56-60px for two-line items
- **Title position**: 20-22px from top
- **Subtitle position**: 38-42px from top (22px gap)
- **Item spacing**: 8px between items

### Shadow System (SVG Filters)
```xml
<filter id="subtle">
  <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.04"/>
  <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.04"/>
</filter>
<filter id="medium">
  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.06"/>
  <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.08"/>
</filter>
<filter id="high">
  <feDropShadow dx="0" dy="12" stdDeviation="24" flood-opacity="0.12"/>
  <feDropShadow dx="0" dy="24" stdDeviation="48" flood-opacity="0.08"/>
</filter>
<filter id="brand-glow">
  <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#FF5722" flood-opacity="0.25"/>
</filter>
```

### Layout Grid
- **Desktop Width**: 1440px viewport
- **Sidebar Width**: 240px (fixed)
- **Main Content**: 1200px (or 1136px with padding)
- **Content Max Width**: 1120px centered
- **Gutter**: 32px on sides
- **Column Gap**: 24px between columns

---

## User Flow & Wireframes

### Flow Overview
```
1. Pre-Login Landing → 2. Dashboard → 3. Advanced Filters
                    ↓
                4. Keyword Detail → 5. Export Modal
                    ↓
                6. Upgrade Modal (Paywall)
                    ↓
                7. Error States → 8. Mobile View
                    ↓
                9. Lists Management → 10. Competitor Analysis
```

---

## Wireframe 1: Pre-Login Landing Page
**File**: test1.svg (1440×3200px)

### Purpose
Marketing landing page with limited keyword preview to encourage sign-ups.

### Layout Structure
1. **Top Navigation** (72px height)
   - Logo: Circle #FF5722 (40px) + "SearchVector" text
   - Nav links: Features, Pricing, Resources
   - Buttons: "Sign In" (secondary), "Get Started" (primary)

2. **Hero Section** (600px)
   - Headline: "Discover High-Impact ASO Keywords" (56px)
   - Subheadline: Description text (20px)
   - Platform selector: iOS/Android toggle (300×48px)
   - Search input: Large search box with button (760×64px)
   - Trust badges: "Free keyword research" + "No credit card required"

3. **Limited Results Preview** (520px)
   - Section title: "KEYWORD SUGGESTIONS" + count
   - Preview table: 5 keywords only
   - Columns: KEYWORD | SEARCH VOLUME | DIFFICULTY | TREND | OPPORTUNITY
   - Row height: 64px
   - Show difficulty bars, trend arrows, opportunity badges

4. **Email Capture Gate** (300px overlay)
   - Gradient fade over results
   - CTA card with lock icon
   - "Sign up to see all 127 keywords"
   - Email input + "Get Free Access" button

5. **Value Propositions** (400px)
   - 3 feature cards in row (346×240px each)
   - Icons: 🔍 📊 💡
   - Titles + descriptions

6. **Consultation CTA** (200px)
   - Orange banner (#FF5722)
   - "Schedule Free Consultation" button

7. **Social Proof** (200px)
   - Stats: "2,500+ Active Users" | "1.2M+ Keywords" | "4.9/5 Rating"

8. **Footer** (280px)
   - Logo + link columns
   - Product | Resources | Company

### Key Spacing
- Hero top padding: 120px
- Section gaps: 64px
- Card gaps: 24px

---

## Wireframe 2: Post-Login Dashboard
**File**: test2.svg (1440×2000px)

### Purpose
Main keyword research interface with full functionality.

### Layout Structure
1. **Side Navigation** (240×2000px, left side)
   - Logo at top
   - Nav items: Dashboard, Keyword Research, My Keywords, Settings
   - Active state: #FFF3E0 background
   - Progress bar showing usage

2. **Top Bar** (1200×72px)
   - Breadcrumbs/page title
   - Actions: Notifications, user menu, "Book Consultation" button

3. **Platform Toggle** (300×48px)
   - iOS (active) | Android tabs

4. **Search & Filters Bar** (1136px width)
   - Search input (760px wide)
   - "Search" button (100×36px)
   - Filter chips: Platform, Difficulty, Volume range
   - "⚙️ Filters" button, "📤 Export" button

5. **Results Table** (1136px)
   - Full table with pagination
   - 10-12 rows visible
   - Columns: KEYWORD | SEARCH VOLUME | DIFFICULTY | TREND | OPPORTUNITY | ACTIONS
   - Row height: 64px
   - Hover states on rows
   - Checkboxes for bulk selection

6. **Pagination** (bottom)
   - "Showing 1-50 of 347 results"
   - Page numbers + navigation

### Key Features
- Real-time search updates
- Sortable columns
- Bulk actions toolbar when items selected

---

## Wireframe 3: Advanced Filters Panel
**File**: test3.svg (1440×2000px)

### Purpose
Slide-in filter panel from right side (400px width).

### Layout Structure
1. **Filter Panel** (400×2000px, slides from right)
   - Header: "Advanced Filters" + Close button
   - Sticky "Apply Filters" + "Reset" buttons at top

2. **Filter Sections** (scrollable)
   
   **Search Volume Range**
   - Min/Max inputs
   - Dual-handle slider
   
   **Difficulty Score**
   - Radio buttons: All, Easy (0-30), Medium (31-60), Hard (61-100)
   - Visual difficulty bars
   
   **Trend**
   - Checkboxes: Growing, Stable, Declining
   - Trend arrows
   
   **Opportunity Rating**
   - Checkboxes: High, Medium, Low
   - Color-coded badges
   
   **Competition Level**
   - Dropdown: All levels, Low, Medium, High, Very High
   
   **Keyword Length**
   - Slider: 1-5+ words
   
   **Categories** (if applicable)
   - Multi-select dropdown
   
   **Date Range**
   - Date picker: Last 7 days, 30 days, 90 days, Custom

3. **Bottom Actions**
   - "Apply Filters" (primary button)
   - "Reset All" (text link)
   - Show "X results found" count

### Backdrop
- Rest of page dimmed with 40% black overlay

---

## Wireframe 4: Keyword Detail View
**File**: test4.svg (1440×2000px)

### Purpose
Slide-in detail panel showing full keyword metrics.

### Layout Structure
1. **Detail Panel** (500px width, slides from right)
   - Header: Keyword name + Close button
   - Platform badge (iOS/Android)

2. **Metrics Cards** (stacked)
   
   **Overview Card**
   - Search Volume: Large number + trend
   - Difficulty Score: Progress bar + score
   - Opportunity Rating: Badge
   - Current Trend: Chart preview
   
   **Historical Data Card**
   - Line chart showing 90-day trend
   - Volume over time
   
   **Competition Analysis Card**
   - Top 5 competing apps
   - App icon + name + rating
   - Their ranking for this keyword
   
   **Related Keywords Card**
   - 10 related keyword suggestions
   - Clickable to view their details

3. **Actions Bar** (bottom sticky)
   - "Add to List" (dropdown)
   - "Export" button
   - "Track Keyword" toggle

### Key Details
- Fixed XML escaping: Use &amp; instead of & (e.g., "Health &amp; Fitness")
- Remove emojis from ratings to prevent parsing errors
- Card padding: 24px

---

## Wireframe 5: Export & Bulk Actions
**File**: test5.svg (1440×1800px)

### Purpose
Shows export dropdown menu, modal, and bulk actions toolbar.

### Layout Structure
1. **Export Dropdown Menu** (triggered from "📤 Export")
   - Menu items:
     - Export as CSV
     - Export as JSON
     - Export as Excel
     - Email Report
     - Schedule Report
   - Menu: 240×220px, shadow medium

2. **Export Modal** (center overlay)
   - Title: "Export Keywords"
   - File format selector: CSV, JSON, Excel (radio buttons)
   - Options:
     - Include all metrics (checkbox)
     - Include historical data (checkbox)
     - Include competitor data (checkbox)
   - Selected count: "87 keywords selected"
   - Actions: "Cancel" + "Export" button

3. **Bulk Actions Toolbar** (appears when items selected)
   - "87 keywords selected"
   - Actions: "Add to List", "Export", "Delete"
   - "Clear Selection" link

### Backdrop
- 60% black overlay for modal

---

## Wireframe 6: Upgrade/Paywall Modal
**File**: test6.svg (1440×1400px)

### Purpose
Pricing comparison modal when user hits free plan limits.

### Layout Structure
1. **Modal** (800×1240px, centered)
   - Close button (top right)
   
2. **Header** (116px)
   - Lock icon: Circle #FFF3E0 background, orange lock
   - Title: "Upgrade to Continue" (30px)
   - Subtitle: "You've reached your free plan limit" (16px)

3. **Warning Card** (120px height)
   - Red background #FEF2F2
   - Warning icon: Red circle with "!"
   - Message: "Export Limit Reached"
   - Details: "Free: 10 keywords | Your selection: 347"
   - "Upgrade for unlimited →" link (proper 20px spacing!)

4. **Pricing Cards** (side by side)
   
   **Pro Plan Card** (336×420px) - MOST POPULAR badge
   - **Top padding**: 32px ✓
   - Title: "Pro Plan" at y=72
   - Price: "$49" (48px) + "/month" (18px) at y=92
   - Price to features gap: 72px
   - **Features** (starting y=164):
     - ✓ Unlimited keyword searches (y=164)
     - ✓ Unlimited exports (y=192, 28px spacing)
     - ✓ Advanced filters and analytics (y=220, 28px spacing)
     - ✓ Competitor analysis (y=248, 28px spacing)
     - ✓ Priority email support (y=276, 28px spacing)
   - Button: "Upgrade to Pro" at y=344
   - **Bottom padding**: 28px ✓
   - Background: #FFF3E0, border: 2px #FF5722
   
   **Enterprise Card** (336×420px)
   - Same spacing as Pro card
   - Title: "Enterprise"
   - Price: "Custom" + "Contact us for pricing"
   - Features: "Everything in Pro, plus:" + 5 more
   - Button: "Contact Sales" (secondary)

5. **Bottom Actions**
   - "Continue with Free" button
   - "14-day money-back guarantee" badge

### Critical Spacing (Based on Stripe/Vercel)
- Top padding: 32px (not 44px!)
- Feature spacing: 28px (not 36px!)
- Bottom padding: 28px (not 8px!)

---

## Wireframe 7: Error States Collection
**File**: test7.svg (1440×2400px)

### Purpose
Comprehensive view of all error/empty states in one mockup.

### States Included
1. **Empty State** (No keywords yet)
   - Large icon
   - "No keywords found"
   - "Start by searching for keywords above"
   - Primary CTA

2. **No Results State** (Search returned nothing)
   - Search icon
   - "No results for 'xyz'"
   - Suggestions to try different terms

3. **Network Error**
   - Warning icon
   - "Connection error"
   - "Try Again" button

4. **Server Error (500)**
   - Error icon
   - "Something went wrong"
   - "Contact Support" link

5. **Validation Error** (inline)
   - Form field with red border
   - "Please enter a valid keyword" message

6. **Toast Notifications** (top right)
   - Success: Green with checkmark
   - Error: Red with X
   - Info: Blue with info icon
   - Auto-dismiss after 5 seconds

### Layout
- Grid layout: 2 columns
- Each state: 500×400px card
- Card padding: 48px
- Centered content

---

## Wireframe 8: Mobile Responsive View
**File**: test8.svg (375×2000px)

### Purpose
Mobile-optimized layout for 375px viewport (iPhone standard).

### Layout Adaptations
1. **Top Bar** (375×56px)
   - Hamburger menu (left)
   - Logo (center)
   - User avatar (right)

2. **Search Section**
   - Full-width search input
   - Platform toggle below
   - "Search" button full width

3. **Filter Button**
   - Floating "Filters" button
   - Opens bottom sheet

4. **Results List**
   - Card-based layout (not table)
   - Each keyword: Card (343×120px)
   - Vertical stack: Name, Volume, Difficulty, Trend
   - Tap to see details

5. **Bottom Sheet Filters**
   - Slides up from bottom
   - Sticky header with "Filters" + Close
   - Scrollable filter options
   - "Apply" button at bottom

6. **Bottom Navigation** (56px fixed)
   - 4 tabs: Search, Lists, Alerts, Profile
   - Icons + labels
   - Active state: Orange color

### Key Adaptations
- Touch targets: 44px minimum
- Font sizes: Slightly larger for readability
- Spacing: More generous for thumb usage
- Bottom sheet instead of sidebars

---

## Wireframe 9: Keyword Lists Management
**File**: test9.svg (1440×2000px)

### Purpose
Organize keywords into custom lists/collections.

### Layout Structure
1. **Side Navigation** (240px)
   - Regular nav items
   - "MY LISTS" section header
   - "+ Create New List" button
   - List items (56×52px each):
     - Active list: #FFF3E0 background
     - Title + keyword count
     - ⋯ menu icon
     - **Proper spacing**: Title at y=20, count at y=42 (22px gap) ✓

2. **Main Content** (1136px)
   
   **Header**
   - List name: "Fitness App Keywords" (20px)
   - Actions: "↗️ Share", "📤 Export", "+ Add Keywords"
   
   **Stats Cards** (3 cards in row)
   - Total Keywords: 87
   - Avg Search Volume: 64.2K
   - Avg Difficulty: Medium
   - Cards: 260×100px each
   
   **Keywords Table**
   - Same as main dashboard table
   - Additional column: "Remove from list" action
   - Drag handles for reordering
   
   **Bulk Actions**
   - "Move to another list"
   - "Export selected"
   - "Remove from list"

3. **Context Menu** (on ⋯ click)
   - Rename list
   - Duplicate list
   - Share list
   - Delete list

### Key Feature
- List items have proper text spacing (22px between title/count)
- Drag & drop to reorder keywords
- Color coding for lists (optional)

---

## Wireframe 10: Competitor Analysis View
**File**: test10.svg (1440×2200px)

### Purpose
Compare your app's keywords with competitors.

### Layout Structure
1. **Competitor Selector** (top section)
   
   **Your App Card** (360×80px)
   - Label: "YOUR APP"
   - App icon (40×40px)
   - App name: "MyFitness App" at y=14
   - Rating: "⭐ 4.2 (12.4K)" at y=34
   - **Proper 20px spacing** ✓
   
   **VS Badge** (center)
   - Circle with "VS" text
   
   **Competitor Card** (360×80px)
   - Label: "COMPETITOR"
   - App icon (40×40px)
   - Name: "Fitbit" at y=14
   - Rating + downloads at y=34
   - **Proper 20px spacing** ✓
   - "Change →" button
   
   **Add More** (+) button
   - Dashed border card to add 3rd competitor

2. **Overview Comparison Cards**
   - 4 metric cards in row:
     - Total Keywords
     - Avg Search Volume
     - Top Category
     - Market Share
   - Cards: 268×100px each

3. **Keyword Overlap Section**
   - Venn diagram visualization
   - "Common Keywords: 43"
   - "Your unique: 44"
   - "Their unique: 83"

4. **Opportunity Keywords Table**
   - Keywords competitor ranks for but you don't
   - Columns: KEYWORD | THEIR RANK | VOLUME | DIFFICULTY | OPPORTUNITY
   - Sorted by opportunity score
   - "Add to my keywords" action

5. **Gap Analysis Charts**
   - Bar chart: Keyword distribution by difficulty
   - Line chart: Search volume comparison
   - Pie chart: Category distribution

### Key Details
- Fixed XML: "health &amp; fitness tracker" instead of "&"
- Proper text spacing in app cards (20px between name and rating)
- Focus on actionable insights

---

## Technical Requirements

### XML/SVG Standards
1. **Proper XML Escaping** (CRITICAL)
   - Always use `&amp;` instead of `&`
   - Use `&lt;` instead of `<`
   - Use `&gt;` instead of `>`
   - Example: "Health & Fitness" → "Health &amp; Fitness"

2. **SVG Structure**
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 WIDTH HEIGHT" width="WIDTH" height="HEIGHT">
     <defs>
       <!-- Filters, gradients here -->
     </defs>
     
     <!-- Content organized in groups -->
     <g id="section-name">
       <!-- Elements -->
     </g>
   </svg>
   ```

3. **Text Positioning**
   - Use absolute coordinates or transform groups
   - text-anchor="middle" for centered text
   - Calculate y position for proper baseline alignment

4. **Performance**
   - Use filters efficiently (define once, reuse)
   - Group related elements with <g>
   - Use transform for positioning instead of absolute coordinates

### Validation Checklist
Before finalizing any wireframe, verify:

- [ ] All `&` properly escaped to `&amp;`
- [ ] No emojis in critical text (they can break parsers)
- [ ] Button text vertically centered at 62.5% height
- [ ] Text spacing minimum 1.5× larger font size
- [ ] Pricing card spacing: 32px top, 28px features, 28px bottom
- [ ] List items: 22px between title and subtitle
- [ ] All cards have minimum 24px padding
- [ ] Touch targets minimum 40px (mobile)
- [ ] XML validates without errors
- [ ] Shadow filters defined and referenced correctly

---

## Common Mistakes to Avoid

### ❌ Text Spacing Errors
```xml
<!-- BAD: Text will overlap -->
<text y="28" font-size="14">Title</text>
<text y="34" font-size="11">Subtitle</text>
<!-- Only 6px gap for 14px text! -->

<!-- GOOD: Proper spacing -->
<text y="20" font-size="14">Title</text>
<text y="42" font-size="11">Subtitle</text>
<!-- 22px gap = comfortable reading -->
```

### ❌ Button Text Alignment
```xml
<!-- BAD: Text not centered -->
<rect y="0" height="48"/>
<text y="28">Button Text</text>
<!-- Should be at y=30 for 48px button -->

<!-- GOOD: Properly centered -->
<rect y="0" height="48"/>
<text y="30">Button Text</text>
<!-- 30 = 48 × 0.625 ✓ -->
```

### ❌ Pricing Card Spacing
```xml
<!-- BAD: Unbalanced spacing -->
<text y="84">Pro Plan</text>  <!-- 44px from top -->
<g transform="translate(0, 176)">  <!-- Features -->
  <g transform="translate(0, 36)">  <!-- 36px spacing -->
<rect y="364"/>  <!-- Button, only 8px bottom padding -->

<!-- GOOD: Balanced spacing -->
<text y="72">Pro Plan</text>  <!-- 32px from top -->
<g transform="translate(0, 164)">  <!-- Features -->
  <g transform="translate(0, 28)">  <!-- 28px spacing -->
<rect y="344"/>  <!-- Button, 28px bottom padding -->
```

### ❌ XML Escaping
```xml
<!-- BAD: Will cause parse error -->
<text>Health & Fitness</text>

<!-- GOOD: Properly escaped -->
<text>Health &amp; Fitness</text>
```

---

## Export Instructions

### SVG File Format
- **Format**: SVG 1.1
- **Encoding**: UTF-8
- **Namespace**: http://www.w3.org/2000/svg
- **Optimization**: Clean SVG (remove unnecessary attributes)

### File Naming Convention
- test1.svg - test10.svg (or test11.svg - test20.svg for fixed versions)
- Use descriptive comments in SVG for sections

### Quality Assurance
1. Validate XML using xmllint or online validator
2. Check visual rendering in browser
3. Test at different zoom levels (100%, 125%, 150%)
4. Verify all text is readable (no overlaps)
5. Check all interactive states (hover, active, disabled)

---

## Usage Examples

### To Generate New Wireframes
1. Copy this entire prompt
2. Add specific screen requirements at the end
3. Specify any custom variations needed
4. Request SVG output with proper escaping

### To Modify Existing Wireframes
1. Reference this design system
2. Specify which spacing/alignment rules to apply
3. Mention specific fixes needed (e.g., "apply pricing card spacing standards")

### For Different Tools
This prompt works for:
- SVG generation
- Figma/Sketch wireframes (adapt measurements)
- HTML/CSS prototypes (convert to rem/em)
- Design documentation

---

## Version History

**Version 1.0** - Initial wireframes
- 10 screens generated
- Basic design system applied

**Version 1.1** - XML & Spacing Fixes
- Fixed all XML escaping issues (& → &amp;)
- Fixed text overlapping (applied 1.5× spacing rule)
- Fixed button text alignment (62.5% rule)

**Version 1.2** - Pricing Card Refinement
- Applied industry standards from Stripe/Vercel
- Fixed top padding (44px → 32px)
- Fixed feature spacing (36px → 28px)
- Fixed bottom padding (8px → 28px)

**Version 1.3** - Final Polish
- All cards use consistent spacing
- List items properly spaced (22px gaps)
- App comparison cards fixed (20px spacing)
- Production-ready quality

---

## Contact & Support

For questions about this design system or wireframe specifications, refer to:
- FIXES_SUMMARY.md - XML and overlap fixes
- BUTTON_ALIGNMENT_FIXES.md - Button centering details
- TEXT_SPACING_FIXES_SUMMARY.md - Text spacing standards
- PRICING_CARD_FIXES.md - Pricing card analysis

---

**END OF MASTER PROMPT**

Use this prompt as the single source of truth for generating ASO keyword research tool wireframes with professional quality and industry-standard spacing.
