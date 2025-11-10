# Universal Wireframe Generator - Updated ✅

## What This Does

Generates **6-10 UI-consistent wireframes** for any SaaS tool by:
1. Analyzing competitor UIs
2. Extracting best features
3. Applying your design system (claude.md)
4. Ensuring strict UI consistency across ALL screens

---

## Key Changes Made

### ✅ Flexible Count (Not Fixed 20)
- AI determines optimal count: **6-10 screens**
- Based on tool complexity (simple tool = 6, complex tool = 10)
- Quality over quantity

### ✅ UI Consistency ENFORCED
**All screens MUST use:**
- Same header: 64px height
- Same sidebar: 240px width (if using sidebar)
- Same buttons: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
- Same brand color: #FF5722
- Same spacing: 4pt grid (4, 8, 12, 16, 24, 32, 48px only!)
- Same typography: 57, 36, 32, 22, 16, 14px only!
- Same font: Inter
- Same card style: 16px radius, 24px padding
- Same border radius: 4, 6, 8, 12, 16, 20, 9999px only!

### ✅ Component Library Included
- One screen showing ALL design system components
- Serves as developer reference
- Guarantees consistency

### ✅ Strategic Screen Selection
**Always Generated (6 minimum):**
1. Landing Page
2. Dashboard
3. Data View
4. Detail View
5. Settings
6. Component Library

**Highly Recommended (+1-2):**
7. Mobile Dashboard
8. Mobile Navigation

**Tool-Specific (+0-3):**
- Onboarding (if complex signup)
- Comparison (if core feature)
- Reports (if key functionality)
- Team Management (if multi-user)
- Pricing/Upgrade (if freemium)

---

## File Structure

```
/home/coder/Praveen/SEO/Research/test3/
├── claude.md (your design system - DO NOT MODIFY)
├── UNIVERSAL copy.md (the updated generator prompt)
└── README-UPDATED.md (this file)
```

---

## How to Use

### 1. Edit Input Section
Open `UNIVERSAL copy.md` and update:
```yaml
TOOL_NAME: "Your Tool Name"
TOOL_PURPOSE: "What it does"
TOOL_CATEGORY: "SEO/ASO/Analytics/etc"
```

### 2. Give to AI
Copy the entire `UNIVERSAL copy.md` content and paste into Claude/AI

### 3. AI Executes
- Discovers 3-6 competitors
- Extracts features from each
- Synthesizes best patterns
- Loads design system from claude.md
- Determines optimal screen count (6-10)
- Generates UI-consistent wireframes

### 4. Review Output
```
wireframes/[tool-name]/
├── Core Screens (5-7)
├── Component Library (1)
├── Mobile Variants (1-2)
└── Documentation
```

---

## Success Criteria

### ✅ UI Consistency
- [ ] Same header (64px) across ALL screens
- [ ] Same sidebar (240px) across ALL screens
- [ ] Same button sizes (40/48/36px) across ALL screens
- [ ] Same brand color (#FF5722) across ALL screens
- [ ] Same spacing (4pt grid) across ALL screens
- [ ] Same typography scale across ALL screens

### ✅ Design System Compliance
- [ ] All values from claude.md (no arbitrary numbers)
- [ ] No spacing like 15px, 25px, 35px (must be 4pt grid!)
- [ ] No font sizes like 18px, 20px, 24px (must use scale!)
- [ ] No button heights like 42px, 45px (must be 40/48/36px!)

### ✅ Strategic Selection
- [ ] AI documented wireframe plan (wireframe-plan.md)
- [ ] Optimal count (6-10) based on tool complexity
- [ ] Every screen has distinct purpose
- [ ] No redundant screens

---

## What Makes This Better

### Before:
- 20 fixed screens
- No consistency guarantee
- Many redundant screens
- Different button sizes, spacing, colors across screens
- Felt like 20 separate designs

### After:
- 6-10 strategic screens (AI decides)
- **UI consistency MANDATORY**
- Every screen has purpose
- Same components, same styling, same spacing
- Feels like ONE cohesive product ✅

---

## File Details

- **File**: `UNIVERSAL copy.md`
- **Lines**: 1,956 lines
- **Version**: 2.0 (UI Consistency Edition)
- **Last Updated**: 2025-10-17
- **Status**: Production Ready ✅

---

## Quick Reference

### Design System (claude.md)
```css
Brand: #FF5722
Font: Inter
Buttons: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
Cards: 16px radius, 24px padding
Spacing: 4, 8, 12, 16, 24, 32, 48px
Typography: 57, 36, 32, 22, 16, 14px
Border Radius: 4, 6, 8, 12, 16, 20, 9999px
```

### Wireframe Count Logic
```
Simple Tool: 6 screens (5 core + 1 library)
Medium Tool: 7-8 screens (+ 1-2 mobile + 0-1 extra)
Complex Tool: 9-10 screens (+ 1-2 mobile + 2-3 extra)
Maximum: 10 screens (quality over quantity)
```

---

## Support

If wireframes are inconsistent:
1. Check wireframe-plan.md for AI's strategy
2. Verify design system compliance (exact values only)
3. Ensure 4pt grid alignment (no odd numbers)
4. Review consistency-guide.md for global elements

---

**Ready to Generate!** 🚀

Just copy `UNIVERSAL copy.md` and paste into Claude.
