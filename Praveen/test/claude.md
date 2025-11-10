# Premium SaaS Design System - Wireframe Guidelines

## 🎯 Core Design Philosophy
**Think premium, think sophisticated, think minimal.**

Our design system embodies a premium SaaS experience with an emphasis on clean aesthetics, subtle interactions, and professional polish. Every element should feel intentional and refined.

---

## 🎨 Color System

### Primary Brand Color
- **Main Orange**: `#FF5722` - Use this as your primary accent color
- **Think carefully** about brand color usage - it should draw attention to key actions only
- Use brand color sparingly for CTAs, active states, and important highlights

### Neutral Palette (Think in layers)
**Light Mode Backgrounds:**
- Pure White: `#FFFFFF` - Primary background
- Near White: `#FCFCFD` - Subtle separation
- Light Gray: `#F9FAFB` - Secondary backgrounds
- Gray 100: `#F3F4F6` - Tertiary backgrounds

**Dark Mode Backgrounds:**
- Deep Black: `#0A0E16` - Primary background
- Near Black: `#111827` - Cards and surfaces
- Dark Gray: `#171E2C` - Elevated surfaces
- Gray 800: `#1F2937` - Hover states

### Text Colors
**Think hierarchy, think contrast:**
- Primary Text: Dark mode `#F9FAFB` / Light mode `#111827`
- Secondary Text: Dark mode `#9CA3AF` / Light mode `#4B5563`
- Tertiary Text: `#6B7280` - Use for meta information
- Disabled Text: 60% opacity of secondary

---

## 📐 Spacing & Layout System

### Base Unit: 4px Grid
**Think in multiples of 4 - always:**
- `4px` (0.25rem) - Tight spacing
- `8px` (0.5rem) - Compact elements
- `12px` (0.75rem) - Default small spacing
- `16px` (1rem) - Standard spacing
- `24px` (1.5rem) - Section spacing
- `32px` (2rem) - Large spacing
- `48px` (3rem) - Extra large spacing
- `64px` (4rem) - Section dividers

### Container Widths
- Max width: `1280px` for main content
- Sidebar: `240-280px`
- Modal widths: `480px` (small), `640px` (medium), `960px` (large)

---

## 🔤 Typography System

### Font Family
**Primary Font**: Inter (or system font stack)
- Headings: 600-700 weight
- Body text: 400-500 weight
- Think clean, think readable

### Size Scale (Think hierarchy)
- **Hero/Display**: `48-72px` (3-4.5rem)
- **H1**: `36px` (2.25rem) - Page titles
- **H2**: `30px` (1.875rem) - Section headers
- **H3**: `24px` (1.5rem) - Subsections
- **H4**: `20px` (1.25rem) - Card titles
- **Body Large**: `18px` (1.125rem)
- **Body**: `16px` (1rem) - Default
- **Small**: `14px` (0.875rem) - Secondary text
- **Caption**: `12px` (0.75rem) - Meta info

### Line Heights
- Headings: `1.25` (tighter)
- Body text: `1.5-1.625`
- Think readability over density

---

## 🔲 Component Patterns

### Buttons (Think intentional actions)
**Hierarchy:**
1. **Primary (Solid)** - Main CTA, one per view
   - Orange gradient background
   - White text
   - Subtle shadow on hover
   - Think: "What's the ONE thing we want users to do?"

2. **Secondary (Outline)** - Supporting actions
   - 2px border
   - Transparent background
   - Brand color border and text

3. **Tertiary (Ghost)** - Low-priority actions
   - No border
   - Hover background only

**Sizes:**
- Small: `32px` height
- Medium: `40px` height (default)
- Large: `48px` height

### Cards (Think elevation)
**Three elevation levels:**
1. **Flat** - Embedded content, no shadow
2. **Elevated** - Default cards with subtle shadow
3. **Floating** - Modals, dropdowns with pronounced shadow

**Properties:**
- Border radius: `12-16px` (0.75-1rem)
- Padding: `16-24px`
- Border: 1px in subtle neutral color
- Think white space - don't crowd content

### Input Fields
- Height: `40px` (medium), `32px` (small), `48px` (large)
- Border radius: `8px`
- Border: 1px, darker on focus
- Focus state: Brand color border with subtle glow
- Think accessibility - clear focus states

### Tables (Think scannable)
- Row height: Minimum `48px`
- Hover state: Subtle background change
- Borders: Horizontal only, very subtle
- Header: Small caps, 12px, semibold, neutral 600

---

## ✨ Interaction Patterns

### Transitions (Think smooth, think fast)
- Default: `200ms` ease
- Hover states: `150ms`
- Page transitions: `300ms`
- Never exceed `400ms`

### Hover States
- Elevation change: Lift by `2px`
- Shadow enhancement: Increase shadow opacity
- Background shift: 5-10% darker/lighter
- Think subtle - users should feel, not see

### Focus States
- Brand color outline: `3px` with 50% opacity
- Never remove focus indicators
- Think accessibility first

---

## 💡 Shadow System (Think depth)

### Elevation Scale
1. **Subtle**: Small cards, inline elements
2. **Medium**: Default cards, dropdowns
3. **High**: Modals, floating elements
4. **Brand Glow**: CTA buttons, important actions

**Dark Mode Shadows**: Increase opacity by 20-30%

---

## 📱 Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`
- Wide: `> 1280px`

**Think mobile-first, but optimize for desktop productivity**

---

## ⚡ Design Principles to Remember

### 1. Hierarchy Through Restraint
- Think hard about what needs emphasis
- Use brand color sparingly
- Let white space create focus

### 2. Consistency Over Creativity
- Think system, not one-offs
- Reuse patterns extensively
- Innovation should enhance, not replace

### 3. Premium Feel
- Think subtle animations
- Think refined shadows
- Think generous spacing
- No harsh corners (use radius)

### 4. Professional Polish
- Align everything to the 4px grid
- Consistent border weights (1px or 2px)
- Think about micro-interactions
- Loading states for every action

### 5. Accessibility First
- Minimum contrast ratio: 4.5:1 for body text
- Focus indicators on all interactive elements
- Think keyboard navigation
- Think screen readers

---

## 🚫 What to Avoid

- **Don't use more than 3 font sizes per view**
- **Don't mix border radius styles**
- **Don't use pure black (#000000)**
- **Don't use more than one primary CTA per screen**
- **Don't forget hover/focus states**
- **Don't use shadows on dark backgrounds**
- **Don't crowd elements - think breathing room**

---

## 📋 Wireframe Checklist

Before finalizing any wireframe, think through:

- [ ] Is the primary action obvious?
- [ ] Are all spacings multiples of 4px?
- [ ] Do all interactive elements have hover states defined?
- [ ] Is the text hierarchy clear?
- [ ] Are shadows consistent with elevation system?
- [ ] Does it work on mobile?
- [ ] Are focus states accessible?
- [ ] Is brand color used purposefully?
- [ ] Does it feel premium and polished?

---

## 🎯 Quick Reference for AI Tools

When prompting AI design tools, use these exact specifications:

```
Design System: Premium SaaS
Primary Color: #FF5722 (Orange)
Font: Inter
Base Unit: 4px grid
Border Radius: 8px (inputs), 12-16px (cards)
Button Height: 40px default
Shadow: Multi-layered elevation system
Style: Clean, minimal, professional
Background: Light #FFFFFF, Dark #111827
Card Background: Light #FFFFFF with border, Dark #171E2C
Text: High contrast, clear hierarchy
Spacing: Generous white space, 16-24px padding standard
```

**Think premium. Think polished. Think purposeful.**

Every element should earn its place on the screen.

**Generate high fidelity wireframe for keyword landing page by this command - /home/coder/Praveen/test/kw.screen.md**