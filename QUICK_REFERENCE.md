# Quick Reference - Wireframe Generation

## How to Use the Master Prompt

### For AI Tools (Claude, ChatGPT, etc.)
```
1. Copy MASTER_WIREFRAME_PROMPT.md
2. Paste at the beginning of your conversation
3. Add: "Generate [screen name] following the above specifications"
4. AI will create wireframes with all fixes applied
```

### For Design Tools (Figma, Sketch)
```
1. Use the Design System section as style guide
2. Apply spacing values directly
3. Create components matching button/card specs
4. Use color palette from Brand & Colors section
```

### For Development
```
1. Convert px to rem (divide by 16)
2. Use CSS variables for colors
3. Apply spacing system as utility classes
4. Implement responsive breakpoints
```

---

## Critical Rules (Must Follow)

### ✅ Always Do:
- [ ] Escape `&` as `&amp;` in XML/SVG
- [ ] Button text at 62.5% of button height
- [ ] Text spacing minimum 1.5× larger font
- [ ] Pricing cards: 32px top, 28px features, 28px bottom
- [ ] List items: 22px between title/subtitle
- [ ] Cards: 24-32px padding

### ❌ Never Do:
- [ ] Use unescaped `&` character
- [ ] Space text less than 1.5× font size
- [ ] Put button text at 50% height
- [ ] Use 44px top padding on pricing cards
- [ ] Use 36px feature spacing on pricing cards
- [ ] Use 8px bottom padding on cards

---

## Common Issues & Fixes

| Issue | Wrong | Right |
|-------|-------|-------|
| XML parse error | `Health & Fitness` | `Health &amp; Fitness` |
| Button text off-center | y=24 (48px button) | y=30 (48px × 0.625) |
| Text overlapping | 6px gap (14px font) | 22px gap minimum |
| Pricing unbalanced | 44px/36px/8px | 32px/28px/28px |
| List items cramped | Height 44px, 6px gap | Height 56px, 22px gap |

---

## Design System At-a-Glance

**Colors**
- Brand: #FF5722
- Text: #111827, #6B7280, #9CA3AF
- Success: #10B981 | Warning: #FBBF24 | Error: #EF4444

**Typography**
- H1: 56px/700 | H2: 36px/600 | H3: 30px/600
- Body: 16px/400-500 | Small: 14px/400-500 | Caption: 12px/500-600

**Spacing**
- Grid: 4px base
- Common: 8, 12, 16, 20, 24, 28, 32, 48, 64px

**Buttons**
- Small: 32px | Default: 40px | Large: 48px
- Radius: 8px, 10px, 12px
- Text: 62.5% of height

---

## Files Reference

**Main Prompt**: MASTER_WIREFRAME_PROMPT.md (7000+ lines, complete spec)

**Supporting Docs**:
- FIXES_SUMMARY.md - XML & text overlap fixes
- BUTTON_ALIGNMENT_FIXES.md - Button centering
- TEXT_SPACING_FIXES_SUMMARY.md - Text spacing rules
- PRICING_CARD_FIXES.md - Pricing card analysis

**Wireframes**:
- test1-10.svg - Original (with issues)
- test11-20.svg - Fixed versions (production-ready)

---

## 10-Screen Flow Summary

1. **Landing** - Pre-login, limited preview, email gate
2. **Dashboard** - Main interface, full table, search
3. **Filters** - Slide-in panel, advanced options
4. **Detail** - Keyword metrics, charts, actions
5. **Export** - Modal, format options, bulk actions
6. **Pricing** - Upgrade modal, Pro vs Enterprise
7. **Errors** - Empty states, error messages, toasts
8. **Mobile** - 375px, bottom nav, cards
9. **Lists** - Organize keywords, stats, drag-drop
10. **Competitor** - Compare apps, gap analysis

---

## Version Control

**Current**: v1.3 (Production Ready)
- All XML escaping fixed
- All text spacing corrected
- All buttons properly aligned
- Pricing cards match industry standards

**To Generate Same Quality**:
Use MASTER_WIREFRAME_PROMPT.md in its entirety

**To Modify**:
Update specific sections, maintain consistency

---

## Contact

Created: 2025 (based on your project)
For: ASO Keyword Research SaaS Tool
Quality: Stripe/Vercel/Linear standard
Status: Production-ready
