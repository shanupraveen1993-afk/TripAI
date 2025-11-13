# KeywordTool Landing Page

A modern, accessible landing page built with the Carbon Design System principles, featuring semantic HTML, tokenized CSS variables, and WCAG AA compliance.

## 🎨 Design System

This project follows the **Carbon Design System** specification with a custom orange brand palette:

### Color Tokens
- **Primary Brand**: Orange (#FF5722 - #FF9800)
- **Background Layers**: White to warm orange tints
- **Interactive Elements**: Orange gradient highlights
- **Support Colors**: Success (green), Info (blue), Warning (orange), Error (red)

### Typography
- **Font Family**: IBM Plex Sans
- **Scale**: 14px - 42px with tight/normal line heights
- **Weights**: Regular (400), Semibold (600), Bold (700)

### Spacing
- **Base Unit**: 2px increments
- **Scale**: 2px → 64px
- **Border Radius**: 4px (sm), 6px (md), 8px (lg)

### Motion
- **Easing**: Cubic Bezier (0.2, 0, 0.38, 0.9)
- **Duration**: 120ms (fast), 240ms (med), 360ms (slow)
- **Focus Ring**: 3px orange glow with 35% opacity

## 📁 File Structure

```
/
├── index.html          # Main landing page with semantic HTML5
├── styles.css          # Tokenized CSS with Carbon Design System
├── icons/
│   └── hero-dashboard.svg  # Dashboard mockup illustration
└── README.md           # This file
```

## 🚀 Features

### Accessibility (WCAG AA)
- ✅ Semantic HTML5 elements (`header`, `nav`, `section`, `article`, `footer`)
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators with high contrast
- ✅ Screen reader optimized
- ✅ Color contrast ratios meet WCAG AA standards

### Components
- **Header**: Sticky navigation with logo and CTA buttons
- **Hero**: Main value proposition with feature badges
- **Features Grid**: 6 feature tiles with icons
- **Benefits**: Additional value props in tile format
- **Testimonials**: Social proof with 5-star ratings
- **Pricing**: 3-tier pricing cards with featured highlight
- **FAQ**: Accordion-style questions
- **CTA**: Gradient background conversion section
- **Footer**: Comprehensive site navigation

### Responsive Design
- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**:
  - Small: < 480px (4-column grid)
  - Medium: 480px - 672px (8-column grid)
  - Large: 672px - 1056px (8-column grid)
  - XLarge: > 1056px (16-column grid)

## 🎯 Usage

### Local Development

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. No build process required - pure HTML & CSS

### Customization

All design tokens are defined as CSS custom properties in `styles.css`:

```css
:root {
  /* Brand Colors */
  --brand-500: #FF9800;
  --interactive-01: #FF5722;

  /* Typography */
  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --type-02: 16px;

  /* Spacing */
  --spacing-05: 16px;

  /* Motion */
  --duration-med: 240ms;
}
```

### Adding Custom Sections

Use the Carbon Design System classes:

```html
<section class="section">
  <div class="container">
    <div class="grid">
      <article class="col-span-8 tile">
        <h3 class="tile__title">Your Title</h3>
        <p class="tile__description">Your description</p>
      </article>
    </div>
  </div>
</section>
```

## 🎨 Component Classes

### Buttons
```html
<a href="#" class="btn btn--primary">Primary Action</a>
<a href="#" class="btn btn--secondary">Secondary</a>
<a href="#" class="btn btn--ghost">Ghost</a>
<a href="#" class="btn btn--large">Large Button</a>
```

### Tiles
```html
<article class="tile">
  <div class="tile__icon"><!-- SVG icon --></div>
  <h3 class="tile__title">Title</h3>
  <p class="tile__description">Description</p>
</article>
```

### Grid System
```html
<div class="grid">
  <div class="col-span-4">4 columns</div>
  <div class="col-span-8">8 columns</div>
  <div class="col-span-16">16 columns (full width)</div>
</div>
```

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari/Chrome

Requires CSS Custom Properties (CSS Variables) support.

## 🔧 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **SVG**: Inline icons with `currentColor`
- **IBM Plex Sans**: Google Fonts integration

## 📝 Content Sections

1. **Hero** - Main headline with CTA
2. **Features** - 6 key features in grid
3. **Benefits** - Additional value propositions
4. **Testimonials** - Customer social proof
5. **Pricing** - 3-tier pricing table
6. **FAQ** - Collapsible questions
7. **CTA** - Final conversion section
8. **Footer** - Site navigation & legal

## 🎯 SEO Optimized

- Semantic HTML structure
- Meta description
- Proper heading hierarchy (H1 → H4)
- Descriptive alt text for images
- Clean, descriptive URLs (when deployed)

## 📦 Dependencies

**Zero runtime dependencies** - Pure HTML and CSS

**Development/Optional**:
- IBM Plex Sans font (loaded from Google Fonts)
- Modern browser with CSS Grid support

## 🚀 Deployment

Upload all files to your web server:
- `index.html` (entry point)
- `styles.css` (stylesheet)
- `icons/` (folder with SVG assets)

Or use static hosting services:
- **Netlify**: Drag & drop folder
- **Vercel**: Connect to git repo
- **GitHub Pages**: Push to gh-pages branch

## 📖 Carbon Design System Resources

- [Carbon Design System](https://carbondesignsystem.com/)
- [IBM Plex Fonts](https://www.ibm.com/plex/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎨 Color Palette Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `--interactive-01` | #FF5722 | Primary buttons, links |
| `--interactive-02` | #F4511E | Secondary actions |
| `--brand-500` | #FF9800 | Focus states, highlights |
| `--layer-01` | #FFF7F2 | Card backgrounds |
| `--layer-02` | #FFF3E0 | Elevated surfaces |
| `--text-primary` | #1A1A1A | Body text |
| `--text-secondary` | #4A4A4A | Supporting text |

## 📐 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-03` | 8px | Tight spacing |
| `--spacing-05` | 16px | Default spacing |
| `--spacing-06` | 24px | Section padding |
| `--spacing-07` | 32px | Large spacing |
| `--spacing-10` | 64px | Section dividers |

## 🎭 Performance

- **No JavaScript**: Pure HTML/CSS = Fast load times
- **Minimal CSS**: ~20KB uncompressed
- **SVG Icons**: Scalable, small file sizes
- **System Fonts Fallback**: Instant text rendering

## 📄 License

This is a demonstration project. Feel free to use and modify for your own projects.

---

**Built with ❤️ using Carbon Design System principles**
