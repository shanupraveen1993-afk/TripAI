# CLAUDE.md - ASO Keyword Research Design Guide

This file provides guidance to Claude Code when working with wireframes and UI designs for the ASO Keyword Research feature.

## Purpose

This directory contains SVG wireframes and UI designs for SearchVector.io's ASO Keyword Research tool, which helps users discover and analyze keywords for optimizing their app store presence on Google Play Store and iOS App Store.

## File Conventions

Design Files:
- Format: SVG .svg files only
- Naming: YYYYMMDD_HHMM_v1.2.3_[feature]_[variant].svg
- Always save to file (never output to terminal)
- Each wireframe should be self-contained and renderable

Versioning:
- Increment patch (v1.2.3) for minor visual tweaks
- Increment minor (v1.2.0) for component additions or removals
- Increment major (1.0.0) for complete redesigns

## Competitor UI References

### For Keyword Research Features
1. **AppTweak** (https://www.apptweak.com)
   - Go to: ASO Intelligence → Keyword Research
   - Reference: Keyword table layout, column structure, metrics display
   - Note: Their 5-column table with inline actions

2. **App Radar** (https://appradar.com) 
   - Go to: Keywords → Keyword Spy
   - Reference: Filter sidebar, keyword grouping, opportunity scoring
   - Note: Left sidebar filter design, tag-based filtering

3. **Sensor Tower** (https://sensortower.com)
   - Go to: Keyword Intelligence
   - Reference: Advanced filters, data visualization, trend charts
   - Note: Multi-select filters, date range selectors

4. **Mobile Action** (https://www.mobileaction.io)
   - Go to: ASO Intelligence → Keyword Research
   - Reference: Platform toggle, keyword suggestions layout
   - Note: iOS/Android toggle at top, card-based suggestions

5. **The Tool** (https://thetool.io)
   - Go to: Keyword Tool
   - Reference: Simple search interface, clean results
   - Note: Minimalist approach, focus on essentials

### For General Patterns
- **Ahrefs** (https://ahrefs.com/keywords-explorer) - Search input patterns, export options
- **SEMrush** (https://www.semrush.com/analytics/keywordmagic) - Keyword grouping, bulk actions
- **Stripe Dashboard** (https://dashboard.stripe.com) - Clean tables, empty states, error messages
- **Linear** (https://linear.app) - Inline editing, keyboard shortcuts, filters

## ASO Keyword Research - Design Context

Core User Flows:
1. Keyword discovery (seed keyword input)
2. Keyword suggestions/recommendations  
3. Keyword metrics analysis (search volume, difficulty, trends)
4. Competitor keyword analysis
5. Keyword filtering and sorting
6. Keyword list export

Key Data Points to Visualize:
- Keyword text
- Search volume (with number formatting: 45.2K)
- Keyword difficulty/competition score (0-100)
- Trend indicators (↑ ↓ → with percentage)
- Relevance score
- Current app ranking for keyword
- Competitor presence for keyword
- Platform indicators (iOS/Android/Both)
- Opportunity score (High/Medium/Low)

## Mandatory UI Components

Every wireframe must include:

### Navigation
- **Side navigation bar** - Reference: AppTweak's sidebar
  - Logo at top
  - ASO features menu items
  - Account/billing at bottom
- **Top navigation bar** - Reference: Stripe Dashboard header
  - User account dropdown
  - Notifications icon
  - Search/help
  - Usage indicator (e.g., "250/500 keywords")

### Data Display
- **Primary keyword table/list** - Reference: App Radar's keyword table
  - Checkbox column for multi-select
  - Sortable columns
  - Inline actions per row
  - Hover states
- **Filters panel** - Reference: Sensor Tower's filter sidebar
  - Collapsible sections
  - Applied filters badges
  - Clear all option
- **Search/input field** - Reference: Ahrefs keyword explorer
  - Large, prominent placement
  - Placeholder with example
  - Search button

### Mobile Responsive Breakpoints
- Desktop: 1440px (full features)
- Tablet: 768px (condensed layout)
- Mobile: 375px (stacked layout)

### Action Elements
- **Export buttons** - Reference: SEMrush export menu
  - CSV download
  - Google Sheets integration
  - Copy to clipboard
- **Consultation CTA** - SearchVector unique feature
  - Prominent placement above/below results
  - "Book free ASO consultation" messaging
  - Use contrasting color
- **Add to list/Save** - Reference: Mobile Action's save feature
  - Per-keyword action
  - Bulk selection option

### User Guidance
- **Tooltips** - Reference: Linear's hover tooltips
  - For metric explanations
  - Keyboard shortcuts
- **Empty state** - Reference: Stripe's empty states
  - Illustration or icon
  - "Enter a keyword to begin" message
  - Suggested actions
- **Video demo placeholder** - Reference: Loom's embed style
  - Play button overlay
  - "Watch 2-min demo" text
- **Help link** - Reference: Intercom widget style
  - "?" icon in corner
  - Links to documentation

### Business Elements
- **Plan usage indicator** - Reference: Vercel's usage bar
  - "250/500 keywords used this month"
  - Progress bar visualization
  - Upgrade prompt at 80%
- **Upgrade prompts** - Reference: Notion's upgrade prompts
  - Soft blocks for premium features
  - "Upgrade to unlock" messaging
  - Plan comparison modal

### Authentication States

#### Pre-login (Landing/Mini Tool)
Reference: Mobile Action's free tool
- Limited to 5-10 keyword suggestions
- Email capture before full results
- "Sign up to see all 127 keywords" CTA
- Value proposition bullets
- Trust badges (users, reviews)

#### Post-login (Full Feature)
Reference: AppTweak's logged-in experience
- Full keyword results (based on plan)
- All metrics visible
- Export functionality enabled
- Save/organize keywords
- Historical search tracking

## Error States to Design

Reference: Stripe Dashboard error patterns

1. **No data found**
   - Empty illustration
   - "No keywords found for '[search term]'"
   - Suggestion to try different term
   - Alternative keyword suggestions

2. **Mandatory fields missing**
   - Inline field validation
   - "Please enter a keyword to search"
   - Field highlight in red

3. **Access denied**
   - Lock icon on restricted features
   - "Upgrade to access competitor analysis"
   - Show pricing/upgrade button

4. **Plan limitation**
   - Usage exceeded illustration
   - "You've reached your monthly keyword search limit"
   - Upgrade options displayed

5. **API/Connection error**
   - Connection error icon
   - "Unable to load keyword data"
   - Retry button
   - Support contact option

6. **Invalid input**
   - Inline validation message
   - "Please enter a valid keyword (min 2 characters)"
   - Example of valid input

## Platform-Specific Design Considerations

### iOS App Store vs Google Play Store
Reference: Mobile Action's platform toggle
- Toggle/tabs at top of interface
- Platform-specific metrics
- Visual indicators (Apple/Android logos)
- Combined view option
- Character limit indicators for optimization

### Localization
Reference: App Radar's country selector
- Country/region dropdown
- Flag icons for visual recognition
- Popular markets quick-select
- Multi-language keyword support

## Design Patterns

### Tables/Lists
Reference: Ahrefs keyword explorer table
- Sticky header on scroll
- Zebra striping for rows
- Hover state highlighting
- Checkbox selection
- Pagination controls
- 20/50/100 items per page option

### Filters
Reference: Sensor Tower's filter system
- Collapsible accordion sections
- Number badges for active filters
- Range sliders for metrics
- Multi-select checkboxes
- Quick filter presets

### Data Visualization
Reference: AppTweak's trend displays
- Sparkline charts for trends
- Color-coded difficulty (green/yellow/red)
- Progress bars for scores
- Up/down arrows with percentages

### Loading States
Reference: Linear's loading patterns
- Skeleton screens for tables
- Shimmer effect on placeholders
- Progress bar for long operations
- Inline spinners for actions

## Accessibility Requirements
- Color contrast: 4.5:1 minimum (WCAG AA)
- Touch targets: 44x44px minimum
- Focus indicators: 2px solid outline
- Screen reader labels: All interactive elements
- Keyboard navigation: Tab order defined

## Content Placeholders

Use realistic sample data:
- Keywords: "fitness tracker", "workout app", "calorie counter"
- Search volumes: 12.5K, 45.2K, 128K
- Difficulty: 23/100, 67/100, 89/100
- Trends: ↑ 12%, ↓ 5%, → 0%
- App names: "YourApp", "Competitor A"

## Required Wireframes to Create

1. **Dashboard View** (Post-login)
   - Full keyword research interface
   - All filters and features visible
   - Sample data populated

2. **Pre-login Landing**
   - Mini keyword tool
   - Limited results (5 keywords)
   - Sign-up CTA prominent

3. **Mobile Responsive (375px)**
   - Hamburger menu
   - Stacked layout
   - Bottom sheet filters

4. **Error States Collection**
   - All 6 error states in one file
   - Consistent error pattern

5. **Filter Panel Expanded**
   - All filter options visible
   - Applied filters shown

6. **Export/Actions Modal**
   - Export format options
   - Bulk action selections

## Wireframe Checklist

Before finalizing any wireframe, ensure it includes:
- [ ] Navigation elements (side + top bar)
- [ ] Platform selector (iOS/Android)
- [ ] Search input field
- [ ] Filter controls
- [ ] Data table/list
- [ ] Export options (CSV, Google Sheets)
- [ ] Plan usage indicator
- [ ] Consultation CTA (at least one)
- [ ] Empty or error state
- [ ] Loading state indication
- [ ] Mobile responsive variant
- [ ] Proper spacing (8px grid)
- [ ] Valid SVG syntax
- [ ] File naming convention followed

## Implementation Notes

When creating wireframes:
1. Start by checking 2-3 competitor references
2. Adapt patterns for SearchVector's simpler approach
3. Always include consultation CTAs (differentiator)
4. Reduce complexity compared to competitors
5. Focus on indie developer needs vs enterprise

## Related Files
- Product specs: ../product/
- Parent ASO guidelines: ../../CLAUDE.md
- Root project guidelines: ../../../CLAUDE.md 

generate high fidelity wirframe by this design system - /home/coder/aso-design-system.md

save all the wireframes as svg