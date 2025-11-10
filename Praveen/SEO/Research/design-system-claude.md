# Complete Design System - Ready for Automated Wireframe Generation

**Brand:** #FF5722 • **Font:** Inter • **Icons:** Material Symbols

This file combines the base system + all supplements. Use this single file to generate all 20+ wireframes without errors.

---

## ✅ What's Included

### Core Tokens
- **Colors:** Brand palette (50-900), Neutrals, Material 3 semantic roles
- **Typography:** Display, Headline, Title, Label, Body (lg/sm)
- **Shape:** Corner radius (xs to 3xl, full)
- **Elevation:** 5 levels of shadows + brand glow
- **Spacing:** 4pt grid system (0-10)
- **Motion:** Duration + easing curves

### Layout System
- **Grid utilities:** `.grid`, `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto`
- **Flex utilities:** `.flex`, `.flex-col`, `.flex-between`, `.flex-center`, `.items-center`
- **Spacing utilities:** Margin/padding (`.mt-4`, `.mb-6`, `.px-4`, `.py-6`, etc.)
- **Width/Display:** `.w-full`, `.max-w-lg`, `.block`, `.hidden`
- **Responsive:** `.hide-mobile`, `.hide-desktop`

### App Structure
- **App Shell:** Sidebar + header + main layout (`.app-shell`)
- **Sidebar Navigation:** `.sidebar-nav`, `.sidebar-nav__item` with active states
- **Topbar:** Sticky header component
- **Breadcrumbs:** Navigation trail component

### Components

#### Buttons & Actions
- **Buttons:** `.btn`, `.btn-filled`, `.btn-outlined`, `.btn-text`, `.btn-sm`, `.btn-lg`
- **Icon buttons:** `.icon-btn`

#### Forms & Inputs
- **Text fields:** `.textfield` with label, input, helper text, error states
- **Select dropdowns:** Custom styled selects
- **Checkbox/Radio:** `.control`
- **Switch:** `.switch` toggle component
- **Chips:** `.chip` filter pills with pressed states
- **File upload:** `.file-upload` dropzone with drag support
- **Date picker:** `.date-picker`, `.date-range`
- **Search:** `.search` with icon, clear button, results dropdown

#### Data Display
- **Cards:** `.card`, `.card-hover`
- **Tables:** `.table` with responsive mobile view
- **Badges:** `.badge`, `.badge--success`, `.badge--warn`, `.badge--danger`
- **Tags:** `.tag` with color variants
- **KPIs:** `.kpi` metric cards
- **Stat cards:** `.stat-card` with trend indicators (↑↓)
- **Comparison view:** `.comparison` side-by-side layout
- **Avatar:** `.avatar`, `.avatar--sm/lg/xl`, `.avatar-group`
- **List group:** `.list-group`, `.list-group__item`

#### Navigation
- **Tabs:** `.tabs`, `.tab` with active indicator
- **Breadcrumbs:** `.breadcrumb` with separators
- **Pagination:** `.pager`, `.page`

#### Overlays
- **Modal:** `.modal-root`, `.modal`
- **Drawer:** `.drawer` side panel
- **Popover:** `.popover` with arrow
- **Tooltip:** `.tooltip`
- **Menu:** `.menu`, `.menu__item`
- **Snackbar:** `.snackbar` toast notification
- **Bottom sheet:** `.bottom-sheet` (mobile)

#### Feedback & States
- **Alert/Banner:** `.alert`, `.alert--info/success/warning/error`
- **Empty state:** `.empty-state` with icon, title, description, actions
- **Loading spinner:** `.spinner`, `.spinner--sm/lg`
- **Skeleton loaders:** `.skeleton`, `.skeleton--text/title/circle/rect`
- **Progress bar:** `.progress`, `.progress__bar`, `.progress--indeterminate`
- **Stepper:** `.stepper` for onboarding flows

#### Other
- **Pricing cards:** `.pricing`, `.price-card`, `.price-card--popular`
- **Page header:** `.page-header` with title, subtitle, actions
- **Divider:** `.divider`, `.divider--vertical`
- **Logo:** `.logo` brand component
- **Overflow menu:** `.overflow-menu` (3-dot menu)
- **Toolbar:** `.toolbar` action bar
- **Filter bar:** `.filterbar`

### Icon System
- **Sizes:** `.icon`, `.icon--sm`, `.icon--md`, `.icon--lg`, `.icon--xl`

### Utility Classes
- **Text:** `.text-left`, `.text-center`, `.text-right`, `.truncate`, `.line-clamp-2/3`
- **Font:** `.font-bold`, `.font-normal`, `.uppercase`, `.capitalize`
- **Border:** `.border`, `.border-top`, `.border-bottom`, `.rounded`, `.rounded-full`
- **Position:** `.relative`, `.absolute`, `.fixed`, `.sticky`
- **Z-index:** `.z-10`, `.z-20`, `.z-50`
- **Cursor:** `.cursor-pointer`, `.cursor-not-allowed`
- **Opacity:** `.opacity-50`, `.opacity-75`
- **Overflow:** `.overflow-hidden`, `.overflow-auto`, `.overflow-scroll`
- **Pointer events:** `.pointer-events-none`, `.select-none`
- **Colors:** `.text-primary`, `.text-error`, `.text-success`, `.bg-surface`

### Responsive Features
- **Container:** Responsive padding at breakpoints (600px, 1024px)
- **Grid:** Auto-collapse to single column on mobile
- **App shell:** Sidebar becomes slide-out drawer on mobile
- **Tables:** Stack columns vertically on mobile with data labels
- **Stepper:** Hide labels on mobile, show dots only

### Dark Mode
- Automatic dark mode support via `prefers-color-scheme: dark`
- All semantic colors automatically switch

### Accessibility
- **Focus rings:** Consistent focus indicators
- **ARIA states:** `[aria-busy]`, `[aria-pressed]`, `[aria-selected]`, `[aria-current]`
- **Disabled states:** `[disabled]` styling
- **Hidden utility:** `.visually-hidden` for screen readers

### Density Variants
- **Compact mode:** `.compact` class reduces spacing for data-heavy pages

### Print Styles
- Hides overlays (modals, drawers, tooltips)
- Removes shadows from cards
- Print-optimized layout

---

## 🎯 Coverage for Your 20 Wireframes

### ✅ Fully Covered
1. **Landing Page (Marketing)** - Hero, sections, cards, pricing, CTA buttons
2. **Signup/Login/Forgot Password** - Text fields, buttons, error states
3. **Onboarding/Project Setup** - Stepper, forms, progress bars
4. **Global Dashboard Overview** - App shell, stat cards, grid layout, KPIs
5. **Tool Dashboard (Module Overview)** - Sidebar nav, cards, metrics
6. **Data Table View** - Table, pagination, toolbar, filters, badges
7. **Detail View Page** - Breadcrumbs, page header, tabs, content sections
8. **Comparison View** - `.comparison` side-by-side layout
9. **Filter Drawer/Sidebar Panel** - Drawer component with filters
10. **Add/Manage Data Popup** - Modal, form fields, file upload
11. **Export/Report Popup** - Modal, date range, dropdowns
12. **Upgrade/Paywall Modal** - Modal, pricing cards, CTAs
13. **Settings Page** - Forms, switches, sections
14. **Billing & Subscription** - Pricing cards, payment forms
15. **Team Management** - Table, avatars, badges, actions
16. **Toast/Snackbar Notifications** - Snackbar component
17. **Popup/Confirmation Dialogs** - Modal, alert variants
18. **Empty/Loading/Error States** - Empty state, spinner, skeleton, alerts
19. **Responsive Mobile Variants** - All components have mobile styles
20. **Export Success/Download Screen** - Alert, empty state with success icon

---

## 🚀 Usage for AI Wireframe Generation

When your AI system generates wireframes, it can reference components like this:

```html
<!-- Dashboard Layout -->
<div class="app-shell">
  <aside class="app-shell__sidebar">
    <nav class="sidebar-nav">
      <a class="sidebar-nav__item" aria-current="page">Dashboard</a>
      <a class="sidebar-nav__item">Keywords</a>
    </nav>
  </aside>

  <header class="app-shell__header">
    <div class="search">
      <input class="search__input" placeholder="Search...">
    </div>
  </header>

  <main class="app-shell__main">
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Dashboard</h1>
        <p class="page-header__subtitle">Overview of your metrics</p>
      </div>
      <div class="page-header__actions">
        <button class="btn btn-filled">Export Report</button>
      </div>
    </div>

    <div class="grid grid-4 gap-4">
      <div class="stat-card">
        <div class="stat-card__label">Total Keywords</div>
        <div class="stat-card__value">1,234</div>
        <div class="stat-card__trend stat-card__trend--up">
          ↑ 12%
        </div>
      </div>
      <!-- More stat cards... -->
    </div>
  </main>
</div>
```

---

---


