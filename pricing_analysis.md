# Pricing Card Analysis - Industry Standards

## Current test16.svg Structure:

### Pro Plan Card (336x420px):
- Top padding to title: 44px
- Title ("Pro Plan"): 24px font at y=84
- Title to price gap: 20px
- Price section: y=104 (48px "$49" + 18px "/month" + 14px "Billed monthly")
- Price to features gap: 32px  
- Features start: y=176
- 5 features with 36px spacing each
- Button: y=364 (height 48px)
- Bottom padding: 8px

## Industry Standards (Stripe, Vercel, Linear):

### Typical Pricing Card Spacing:
- **Top padding**: 24-32px (not 44px!)
- **Title to price**: 12-16px (not 20px!)
- **Price to features**: 24-32px (current 32px is OK)
- **Feature spacing**: 16-20px (not 36px!)
- **Bottom padding**: 24-32px (not 8px!)

## Issues Found:

1. ❌ **Excessive top padding** (44px vs 24-32px standard)
2. ❌ **Features too far apart** (36px vs 16-20px standard)
3. ❌ **Insufficient bottom padding** (8px vs 24-32px standard)
4. ❌ **Card feels vertically unbalanced**

## Recommendation:

Reduce top padding, tighten feature spacing, increase bottom padding
