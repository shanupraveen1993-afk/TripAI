# LANDING PAGE COMPONENT SPECIFICATIONS

## REFERENCE
**URL:** https://keywordtool.io/
**Industry:** Keyword Research / App Growth
**Analysis Date:** 2025-10-15

---

## COMPETITORS ANALYZED
1. Keyword Tool - https://keywordtool.io/
2. SEMrush - https://www.semrush.com/
3. Keywords Everywhere - https://keywordseverywhere.com/
4. Serpstat - https://serpstat.com/
5. KWFinder (Mangools) - https://mangools.com/kwfinder/

---

## FOLD 1: NAVIGATION/HEADER

### 🏆 BEST COMPONENT: Clean Horizontal Navigation
**Source:** Serpstat
**Score:** 18/20 (Clarity: 5, Hierarchy: 5, Conversion: 4, UX: 4)
**Why:** Clear information architecture with prominent CTAs, balanced spacing, clean language selector, strong visual hierarchy between navigation and action buttons.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width, fixed position, max-width 1440px, height 80px
- Padding: 0 48px
- Display: Flex, justify-content space-between, align-items center
- Background: #FFFFFF, border-bottom 1px solid #E5E7EB
- Shadow: 0 1px 3px 0 rgba(0,0,0,0.1)

**Logo:**
- Position: Left, 40px from edge
- Height: 40px
- Width: auto

**Navigation Links:**
- Display: Inline-flex, gap 32px, align-items center
- Font: 16px/500/Inter
- Color: #374151 (Neutral-700)
- Letter-spacing: normal
- Links: Features, Resources, Pricing

**Right Section:**
- Display: Flex, gap 16px, align-items center
- Language selector + Sign In + Primary CTA

**Language Selector:**
- Padding: 8px 12px
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Font: 14px/400/Inter
- Color: #6B7280

**Sign In Link:**
- Font: 16px/500/Inter
- Color: #374151
- Padding: 8px 16px

**CTA Button (Primary Solid):**
- Padding: 12px 24px
- Border-radius: 12px
- Min-width: 160px
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Font: 16px/600/Inter
- Shadow: 0 2px 4px -1px rgba(255,87,34,0.2), 0 4px 6px -1px rgba(255,87,34,0.15)

**Responsive:**
- 1440px+: Full horizontal layout
- 768-1439px: Gap reduced to 24px, padding 0 32px
- <768px: Hamburger menu icon (24×24px), full-screen overlay navigation

**Interactive States:**
- Link hover: Color #111827, transition 200ms ease
- Link active: Color #FF5722, font-weight 600
- CTA hover: scale(1.05), shadow 0 4px 8px -2px rgba(255,87,34,0.25), transition 200ms ease
- CTA active: scale(1.0)
- Focus: 2px #FF5722 outline, 2px offset

**Text Content:**
- Logo: "Keyword Tool"
- Nav link 1: "Features"
- Nav link 2: "Resources"
- Nav link 3: "Pricing"
- Language: "English ▾"
- Sign in: "Sign In"
- CTA button: "Try 7 days for free"

---

## FOLD 2: HERO SECTION

### 🏆 BEST COMPONENT: Search-Focused Hero with Trust Elements
**Source:** Serpstat
**Score:** 19/20 (Clarity: 5, Hierarchy: 5, Conversion: 5, UX: 4)
**Why:** Clear value proposition, immediate interaction opportunity with search input, strong trust signals (client logos + review stats), balanced 50-50 layout maintains visual interest.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Min-height: 700px
- Padding: 120px 48px 80px 48px
- Display: Grid, grid-template-columns 1fr 1fr, gap 64px
- Align-items: center
- Background: #F9FAFB (Neutral-50)

**Content Column (Left):**
- Max-width: 600px
- Display: Flex column, justify-content center

**Headline:**
- Font: 48px/700/Inter (5xl/bold)
- Color: #111827 (Neutral-900)
- Letter-spacing: -0.02em
- Line-height: 1.25
- Max-width: 540px
- Margin-bottom: 24px
- Text: "Speed up search marketing goals achievement"

**Subheadline:**
- Font: 18px/400/Inter (lg/normal)
- Color: #4B5563 (Neutral-600)
- Line-height: 1.5
- Max-width: 480px
- Margin-bottom: 32px
- Text: "Find the best keywords and accelerate your SEO with powerful keyword research tools"

**Search Input Group:**
- Display: Flex, gap 8px
- Margin-bottom: 24px
- Max-width: 520px

**Search Input:**
- Flex-grow: 1
- Height: 56px
- Border: 1px solid #D1D5DB
- Border-radius: 12px
- Padding: 16px 20px
- Background: white
- Font: 16px/400/Inter
- Placeholder: "Enter domain or keyword..."
- Shadow: inset 0 1px 2px 0 rgba(0,0,0,0.04)

**Search Dropdown:**
- Width: 120px
- Height: 56px
- Border: 1px solid #D1D5DB
- Border-radius: 12px
- Padding: 16px
- Background: white
- Font: 14px/500/Inter

**Primary CTA:**
- Padding: 16px 40px, Height: 56px
- Border-radius: 12px
- Min-width: 200px
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Font: 18px/600/Inter
- Shadow: 0 4px 8px -2px rgba(255,87,34,0.25), 0 6px 12px -2px rgba(255,87,34,0.2)
- Transition: all 200ms ease
- Text: "Start your analysis for free"

**Trust Elements:**
- Display: Flex, gap 32px, flex-wrap wrap
- Margin-top: 40px
- Align-items: center

**Trust Stat:**
- Display: Flex, gap 8px, align-items center
- Font: 14px/600/Inter
- Color: #111827

**Review Badge:**
- Display: Flex, gap 4px, align-items center
- Padding: 6px 12px
- Background: white
- Border: 1px solid #E5E7EB
- Border-radius: 20px
- Font: 14px/600/Inter
- Icon: Star (20px, #F59E0B)
- Text: "4.6/5 from 600+ reviews"

**Visual Column (Right):**
- Max-width: 600px
- Display: Flex, justify-content center, align-items center
- Position: relative

**Hero Visual:**
- Width: 100%, Max-width: 600px
- Aspect-ratio: 16:9
- Border-radius: 16px
- Shadow: 0 12px 24px -4px rgba(0,0,0,0.12), 0 8px 16px -4px rgba(0,0,0,0.08)
- Background: #E5E7EB (placeholder for dashboard screenshot)
- Border: 1px solid #D1D5DB

**Client Logos Row:**
- Display: Flex, gap 40px, justify-content center, flex-wrap wrap
- Margin-top: 48px
- Padding: 32px 0
- Border-top: 1px solid #E5E7EB

**Client Logo:**
- Height: 32px, Width: auto
- Opacity: 0.5
- Filter: grayscale(100%)
- Transition: all 300ms ease

**Responsive:**
- 1440px+: 2-column grid layout
- 768-1439px: 2-column grid, gap 32px, padding 80px 32px 64px, headline 36px (4xl)
- <768px: Single column stacked, visual below content, padding 64px 24px 48px, headline 30px (3xl)

**Interactive States:**
- Input focus: border #FF5722, shadow 0 0 0 1px #FF5722
- Dropdown hover: border #9CA3AF
- Primary CTA hover: scale(1.05), shadow increases, transition 200ms
- Primary CTA active: scale(0.98)
- Client logo hover: opacity 1, grayscale(0%)

**Text Content:**
- Headline: "Speed up search marketing goals achievement"
- Subheadline: "Find the best keywords and accelerate your SEO with powerful keyword research tools"
- Placeholder: "Enter domain or keyword..."
- Dropdown: "Google ▾"
- Primary CTA: "Start your analysis for free"
- Trust stat: "Trusted by 30,000+ marketers"
- Review badge: "4.6/5 from 600+ reviews"
- Client logos: Deloitte, Rakuten, Visa, Uber, Shopify, Samsung

**Screenshot/Image Placeholder:**
- Description: "Keyword research dashboard showing search volume data, keyword difficulty scores, and SERP analysis with colorful charts and data tables"
- Key visual elements: "Search bar, data table with keywords, trend graphs, competitive analysis metrics, filter sidebar"
- Visual style: "Modern SaaS interface with vibrant data visualizations and clean typography"

---

## FOLD 3: VALUE PROPOSITION / BENEFITS

### 🏆 BEST COMPONENT: Icon-Led Benefit Cards
**Source:** Keywords Everywhere
**Score:** 18/20 (Clarity: 5, Hierarchy: 5, Conversion: 4, UX: 4)
**Why:** Clear scannable layout with icons, focused benefits, good spacing, supports quick understanding of value across multiple use cases.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Background: #FFFFFF

**Section Headline:**
- Font: 36px/700/Inter (4xl/bold)
- Color: #111827
- Letter-spacing: -0.02em
- Line-height: 1.25
- Text-align: center
- Max-width: 800px
- Margin: 0 auto 16px auto
- Text: "Everything you need for keyword research"

**Section Subheadline:**
- Font: 18px/400/Inter
- Color: #4B5563
- Line-height: 1.6
- Text-align: center
- Max-width: 700px
- Margin: 0 auto 64px auto
- Text: "Powerful tools to help you find profitable keywords, analyze competitors, and grow your organic traffic"

**Benefits Grid:**
- Display: Grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 32px
- Margin-top: 64px

**Benefit Card:**
- Padding: 40px
- Border-radius: 16px
- Border: 1px solid #F3F4F6
- Background: #FFFFFF
- Text-align: left
- Min-height: 320px
- Display: Flex column
- Shadow: 0 4px 8px -2px rgba(0,0,0,0.1), 0 6px 12px -2px rgba(0,0,0,0.12)
- Transition: all 250ms ease

**Icon Container:**
- Width: 64px, Height: 64px
- Border-radius: 12px
- Background: #FFF3E0 (Brand-50)
- Display: Flex, align-items center, justify-content center
- Margin-bottom: 24px

**Icon:**
- Width: 32px, Height: 32px
- Color: #FF5722

**Card Headline:**
- Font: 20px/600/Inter (xl/semibold)
- Color: #111827
- Line-height: 1.3
- Margin-bottom: 12px

**Card Description:**
- Font: 16px/400/Inter
- Color: #4B5563
- Line-height: 1.6
- Margin-bottom: 24px

**Feature List:**
- Display: Flex column
- Gap: 8px
- Margin-top: auto

**Feature Item:**
- Display: Flex, gap 8px, align-items flex-start
- Font: 14px/400/Inter
- Color: #374151

**Checkmark Icon:**
- Width: 16px, Height: 16px
- Color: #10B981
- Flex-shrink: 0
- Margin-top: 2px

**Responsive:**
- 1440px+: 3 columns
- 768-1439px: 2 columns, gap 24px
- <768px: 1 column, full-width cards, padding 64px 24px

**Interactive States:**
- Card hover: translateY(-8px), shadow 0 12px 24px -4px rgba(0,0,0,0.12), border #E5E7EB
- Icon container hover: scale(1.1), rotate(5deg)

**Text Content:**
- Section headline: "Everything you need for keyword research"
- Section subheadline: "Powerful tools to help you find profitable keywords, analyze competitors, and grow your organic traffic"

**Benefit Card 1:**
- Icon: "Search magnifying glass icon"
- Headline: "SEO Keyword Research"
- Description: "Discover long-tail keywords with low competition and high search volume to rank faster"
- Feature 1: "Search volume data"
- Feature 2: "Keyword difficulty scores"
- Feature 3: "SERP analysis"

**Benefit Card 2:**
- Icon: "Users group icon"
- Headline: "Competitor Analysis"
- Description: "Analyze what keywords your competitors rank for and find gaps in their strategy"
- Feature 1: "Competitor keyword tracking"
- Feature 2: "Traffic estimation"
- Feature 3: "Content gap analysis"

**Benefit Card 3:**
- Icon: "Document lines icon"
- Headline: "Content Marketing"
- Description: "Generate content ideas based on what people are actually searching for"
- Feature 1: "Topic clustering"
- Feature 2: "Question keywords"
- Feature 3: "Related searches"

**Benefit Card 4:**
- Icon: "Shopping cart icon"
- Headline: "E-commerce Optimization"
- Description: "Find product keywords to optimize your listings and increase sales"
- Feature 1: "Product keyword research"
- Feature 2: "Amazon keyword data"
- Feature 3: "Buying intent keywords"

**Benefit Card 5:**
- Icon: "Globe icon"
- Headline: "Local SEO"
- Description: "Target location-specific keywords to dominate local search results"
- Feature 1: "65,000+ locations"
- Feature 2: "Local search volume"
- Feature 3: "Geo-specific data"

**Benefit Card 6:**
- Icon: "Chart bar icon"
- Headline: "PPC Campaign Planning"
- Description: "Build profitable ad campaigns with cost-per-click and competition data"
- Feature 1: "CPC estimates"
- Feature 2: "Ad competition level"
- Feature 3: "Trend analysis"

---

## FOLD 4: FEATURES SHOWCASE

### 🏆 BEST COMPONENT: Alternating Feature Blocks with Screenshots
**Source:** KWFinder (Mangools)
**Score:** 19/20 (Clarity: 5, Hierarchy: 5, Conversion: 5, UX: 4)
**Why:** Alternating layout maintains visual interest, features expert testimonials for credibility, clear screenshots demonstrate actual product value, strong headline-description-quote structure.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Background: #F9FAFB

**Section Headline:**
- Font: 36px/700/Inter
- Color: #111827
- Letter-spacing: -0.02em
- Text-align: center
- Max-width: 800px
- Margin: 0 auto 80px auto
- Text: "Powerful features for smarter keyword research"

**Feature Block (Repeating):**
- Display: Grid, grid-template-columns 1fr 1fr
- Gap: 80px
- Margin-bottom: 120px
- Align-items: center

**Alternating Layout:**
- Odd features (1,3): Visual left, content right
- Even features (2,4): Content left, visual right

**Content Column:**
- Max-width: 540px
- Padding: 40px 0
- Display: Flex column, justify-content center

**Feature Badge:**
- Display: inline-block
- Padding: 6px 12px
- Border-radius: 20px
- Background: #FFF3E0
- Color: #E64A19
- Font: 12px/600/Inter
- Letter-spacing: 0.025em
- Margin-bottom: 16px
- Text-transform: uppercase

**Feature Headline:**
- Font: 30px/700/Inter (3xl/bold)
- Color: #111827
- Line-height: 1.3
- Margin-bottom: 16px

**Feature Description:**
- Font: 16px/400/Inter
- Color: #4B5563
- Line-height: 1.6
- Margin-bottom: 24px

**Testimonial Quote:**
- Padding: 24px
- Border-left: 4px solid #FF5722
- Background: #FFFFFF
- Border-radius: 8px
- Margin-bottom: 24px

**Quote Text:**
- Font: 16px/400/Inter
- Color: #374151
- Line-height: 1.6
- Font-style: italic
- Margin-bottom: 16px

**Quote Author:**
- Display: Flex, gap 12px, align-items center

**Author Photo:**
- Width: 40px, Height: 40px
- Border-radius: 50%
- Background: #E5E7EB (placeholder)

**Author Name:**
- Font: 14px/600/Inter
- Color: #111827

**Author Title:**
- Font: 14px/400/Inter
- Color: #6B7280

**Feature CTA:**
- Padding: 12px 24px
- Border: 2px solid #FF5722
- Border-radius: 12px
- Background: transparent
- Color: #F4511E
- Font: 16px/600/Inter
- Display: inline-flex
- Align-items: center
- Gap: 8px

**Visual Column:**
- Max-width: 600px
- Display: Flex, justify-content center

**Feature Visual:**
- Width: 100%, Max-width: 600px
- Border-radius: 12px
- Shadow: 0 12px 24px -4px rgba(0,0,0,0.12), 0 8px 16px -4px rgba(0,0,0,0.08)
- Background: #E5E7EB (placeholder)
- Border: 1px solid #D1D5DB

**Responsive:**
- 1440px+: 2-column alternating
- 768-1439px: 2-column, gap 48px, margin-bottom 80px
- <768px: Single column stacked, visual always below, gap 32px, padding 64px 24px

**Interactive States:**
- CTA hover: background #FFF3E0, border #F4511E, scale(1.02)
- CTA focus: outline #FF5722
- Visual hover: scale(1.02) subtle

**Text Content:**

**Section Headline:** "Powerful features for smarter keyword research"

**Feature 1:**
- Badge: "KEYWORD ANALYSIS"
- Headline: "Find long tail keywords with low SEO difficulty"
- Description: "Discover hundreds of great keyword ideas with accurate search volumes and difficulty scores. Filter by metrics like search volume, CPC, and competition to find the perfect keywords for your strategy."
- Quote: "KWFinder has lots of the features that other tools have. But unlike most other tools, it's VERY intuitive."
- Author name: "Brian Dean"
- Author title: "Founder, Backlinko"
- CTA text: "Try keyword analysis →"
- Screenshot: "Keyword analysis interface showing a list of keywords with search volume bars, difficulty scores in colored badges, trend sparklines, and filter options on the left sidebar"
- Visual elements: "Data table with columns for keyword, volume, difficulty, CPC; colored difficulty badges (green/yellow/red); mini trend graphs; filter panel"

**Feature 2:**
- Badge: "COMPETITOR RESEARCH"
- Headline: "Uncover your competitors' best keywords"
- Description: "Enter any competitor's domain to see exactly which keywords they rank for. Discover their top pages, estimated traffic, and opportunities they're missing that you can capitalize on."
- Quote: "Super-effective tool for finding easy-to-rank keywords. I've used KWFinder for years and it never disappoints."
- Author name: "Matt Diggity"
- Author title: "SEO Expert & Blogger"
- CTA text: "Analyze competitors →"
- Screenshot: "Competitor analysis dashboard showing domain overview with top keywords, position distribution graph, and a list of ranked keywords with metrics"
- Visual elements: "Domain input field, pie chart of ranking positions, table of keywords with positions and volumes, traffic estimate widget"

**Feature 3:**
- Badge: "SEARCH TRENDS"
- Headline: "Track search volumes and seasonal trends"
- Description: "Get historical search data and identify seasonal keyword opportunities. Understand when demand peaks so you can plan your content calendar and campaigns at the perfect time."
- Quote: "Using KWFinder to find a gold mine of keyword opportunities is incredibly easy and the data is reliable."
- Author name: "Julia McCoy"
- Author title: "CEO, Content Hacker"
- CTA text: "View trend data →"
- Screenshot: "Trend analysis view showing line graph of search volume over 12 months, year-over-year comparison, and keyword list with trend indicators"
- Visual elements: "Monthly trend line chart, YoY comparison bars, seasonal indicators, keyword table with mini trend icons"

**Feature 4:**
- Badge: "LOCAL SEO"
- Headline: "Target any location with precision"
- Description: "Research keywords for 65,000+ locations worldwide. Get location-specific search volumes and competition levels to dominate local search results in any market."
- Quote: "Love how simple KWFinder makes the entire process of keyword research. The interface is so clean and intuitive."
- Author name: "Nathaniell Brenes"
- Author title: "Founder, One More Cup of Coffee"
- CTA text: "Explore local keywords →"
- Screenshot: "Local keyword interface with map showing location, city selector dropdown, and keywords with location-specific volumes"
- Visual elements: "Interactive map, location dropdown with search, keyword table with geo-specific metrics, population data widget"

---

## FOLD 5: SOCIAL PROOF / TESTIMONIALS

### 🏆 BEST COMPONENT: Expert Testimonial Cards with Photos
**Source:** KWFinder (Mangools)
**Score:** 18/20 (Clarity: 5, Hierarchy: 4, Conversion: 5, UX: 4)
**Why:** Strong credibility through named SEO experts with photos, clean card design, good balance of quote length, expert credentials add authority, trust logos from publications reinforce credibility.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Background: #FFFFFF

**Section Headline:**
- Font: 36px/700/Inter
- Color: #111827
- Text-align: center
- Margin: 0 auto 16px auto
- Text: "Trusted by SEO professionals worldwide"

**Section Subheadline:**
- Font: 18px/400/Inter
- Color: #4B5563
- Text-align: center
- Max-width: 700px
- Margin: 0 auto 64px auto
- Text: "Join thousands of marketers who rely on our tools every day"

**Testimonials Grid:**
- Display: Grid, grid-template-columns repeat(3, 1fr)
- Gap: 32px
- Margin-top: 48px

**Testimonial Card:**
- Padding: 32px
- Border-radius: 16px
- Border: 1px solid #F3F4F6
- Background: #FFFFFF
- Display: Flex column
- Min-height: 300px
- Shadow: 0 4px 8px -2px rgba(0,0,0,0.1), 0 6px 12px -2px rgba(0,0,0,0.12)
- Transition: all 250ms ease

**Rating Display:**
- Display: Flex, gap 4px
- Margin-bottom: 16px

**Star Icon:**
- Width: 20px, Height: 20px
- Color: #F59E0B (Amber-500)

**Testimonial Quote:**
- Font: 16px/400/Inter
- Color: #374151
- Line-height: 1.6
- Margin-bottom: 24px
- Flex-grow: 1
- Position: relative

**Quote Mark:**
- Font: 48px/700/Inter
- Color: #FF5722
- Opacity: 0.2
- Position: absolute
- Top: -8px
- Left: -8px

**Customer Info Section:**
- Display: Flex, gap 16px, align-items center
- Margin-top: auto
- Border-top: 1px solid #E5E7EB
- Padding-top: 20px

**Customer Photo:**
- Width: 48px, Height: 48px
- Border-radius: 50%
- Object-fit: cover
- Background: #E5E7EB (placeholder)
- Border: 2px solid #F9FAFB

**Customer Details:**
- Display: Flex column
- Gap: 4px

**Customer Name:**
- Font: 16px/600/Inter
- Color: #111827
- Line-height: 1.2

**Customer Title:**
- Font: 14px/400/Inter
- Color: #6B7280
- Line-height: 1.2

**Trust Badge Section:**
- Margin-top: 80px
- Padding-top: 64px
- Border-top: 1px solid #E5E7EB

**Badge Headline:**
- Font: 14px/600/Inter
- Color: #6B7280
- Text-align: center
- Letter-spacing: 0.05em
- Text-transform: uppercase
- Margin-bottom: 32px
- Text: "Featured In"

**Logo Grid:**
- Display: Flex, justify-content center, gap 48px, flex-wrap wrap
- Align-items: center

**Publication Logo:**
- Height: 32px, Width: auto
- Opacity: 0.5
- Filter: grayscale(100%)
- Transition: all 300ms ease

**Responsive:**
- 1440px+: 3 columns
- 768-1439px: 2 columns, gap 24px
- <768px: 1 column, padding 64px 24px

**Interactive States:**
- Card hover: translateY(-4px), shadow increases, border #D1D5DB
- Logo hover: opacity 1, grayscale(0%)

**Text Content:**

**Section Headline:** "Trusted by SEO professionals worldwide"
**Section Subheadline:** "Join thousands of marketers who rely on our tools every day"

**Testimonial 1:**
- Rating: 5 stars
- Quote: "KWFinder has lots of the features that other tools have. But unlike most other tools, it's VERY intuitive. The keyword research process is straightforward and the interface is clean."
- Name: "Brian Dean"
- Title: "Founder, Backlinko"
- Photo: "Professional headshot, smiling, business casual"

**Testimonial 2:**
- Rating: 5 stars
- Quote: "Super-effective tool for finding easy-to-rank keywords. I've used KWFinder for years and it never disappoints. The accuracy of the difficulty scores is impressive."
- Name: "Matt Diggity"
- Title: "SEO Expert & Blogger"
- Photo: "Professional headshot, confident pose"

**Testimonial 3:**
- Rating: 5 stars
- Quote: "Using KWFinder to find a gold mine of keyword opportunities is incredibly easy and the data is reliable. It's become an essential part of my content strategy workflow."
- Name: "Julia McCoy"
- Title: "CEO, Content Hacker"
- Photo: "Professional headshot, business attire"

**Testimonial 4:**
- Rating: 5 stars
- Quote: "Love how simple KWFinder makes the entire process of keyword research. The interface is so clean and intuitive, even beginners can use it effectively from day one."
- Name: "Nathaniell Brenes"
- Title: "Founder, One More Cup of Coffee"
- Photo: "Casual professional photo"

**Testimonial 5:**
- Rating: 5 stars
- Quote: "The local keyword research feature is a game-changer for our agency. Being able to target specific cities and regions with accurate data has helped us deliver better results for clients."
- Name: "Sarah Johnson"
- Title: "Digital Marketing Manager"
- Photo: "Professional headshot, office background"

**Testimonial 6:**
- Rating: 5 stars
- Quote: "Best keyword tool for the price. The data is just as good as more expensive alternatives but at a fraction of the cost. Great for agencies and solo consultants alike."
- Name: "Michael Chen"
- Title: "SEO Consultant"
- Photo: "Professional headshot, friendly"

**Trust Logos:**
- Logo 1: "Forbes"
- Logo 2: "Entrepreneur"
- Logo 3: "HubSpot"
- Logo 4: "Search Engine Journal"
- Logo 5: "Neil Patel"

---

## FOLD 6: HOW IT WORKS / PROCESS

### 🏆 BEST COMPONENT: Simple 3-Step Process Visualization
**Source:** Keyword Tool
**Score:** 17/20 (Clarity: 5, Hierarchy: 4, Conversion: 4, UX: 4)
**Why:** Clear step progression with numbered circles, concise descriptions, visual connecting line shows flow, easy to scan and understand, encourages user to take action.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Background: #F9FAFB

**Section Headline:**
- Font: 36px/700/Inter
- Color: #111827
- Text-align: center
- Margin: 0 auto 16px auto
- Text: "How it works"

**Section Subheadline:**
- Font: 18px/400/Inter
- Color: #4B5563
- Text-align: center
- Max-width: 700px
- Margin: 0 auto 64px auto
- Line-height: 1.6
- Text: "Get started with keyword research in three simple steps"

**Steps Container:**
- Display: Flex, direction row, gap 48px
- Justify-content space-between
- Position: relative
- Max-width: 1000px
- Margin: 0 auto

**Connecting Line:**
- Position: absolute, top 48px, left 96px
- Width: calc(100% - 192px), Height: 2px
- Background: linear-gradient(to right, #FF5722, #F4511E)
- Opacity: 0.3
- Z-index: 0

**Step Item:**
- Width: calc(33.333% - 32px)
- Display: Flex column, align-items center, text-align center
- Position: relative, z-index 1

**Step Number Container:**
- Width: 96px, Height: 96px
- Border-radius: 50%
- Border: 4px solid #FF5722
- Background: #FFFFFF
- Display: Flex, align-items center, justify-content center
- Margin-bottom: 24px
- Box-shadow: 0 4px 12px rgba(255,87,34,0.2)
- Position: relative
- Z-index: 2

**Step Number:**
- Font: 36px/700/Inter
- Color: #FF5722

**Step Headline:**
- Font: 20px/600/Inter
- Color: #111827
- Line-height: 1.3
- Margin-bottom: 12px

**Step Description:**
- Font: 16px/400/Inter
- Color: #4B5563
- Line-height: 1.6

**Responsive:**
- 1440px+: Horizontal row with connecting line
- 768-1439px: Horizontal row, reduced spacing, smaller circles (80px)
- <768px: Vertical stack, vertical line on left (left: 48px, height: auto), circles aligned left (width: 80px)

**Text Content:**

**Section Headline:** "How it works"
**Section Subheadline:** "Get started with keyword research in three simple steps"

**Step 1:**
- Number: 1
- Headline: "Enter your keyword"
- Description: "Type in your seed keyword or domain name to start discovering keyword opportunities"

**Step 2:**
- Number: 2
- Headline: "Analyze the results"
- Description: "Review search volume, difficulty scores, trends, and competition for hundreds of keyword suggestions"

**Step 3:**
- Number: 3
- Headline: "Export and optimize"
- Description: "Export your keyword list and start creating content that ranks on search engines"

---

## FOLD 7: PRICING

### 🏆 BEST COMPONENT: Three-Tier Pricing with Highlighted Best Value
**Source:** KWFinder (Mangools)
**Score:** 19/20 (Clarity: 5, Hierarchy: 5, Conversion: 5, UX: 4)
**Why:** Clear tier differentiation with "Best value" badge, comprehensive feature comparison, transparent pricing with money-back guarantee builds trust, scalable tiers for different user types.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Background: #FFFFFF

**Section Headline:**
- Font: 36px/700/Inter
- Color: #111827
- Text-align: center
- Margin: 0 auto 16px auto
- Text: "Simple, transparent pricing"

**Section Subheadline:**
- Font: 18px/400/Inter
- Color: #4B5563
- Text-align: center
- Max-width: 700px
- Margin: 0 auto 32px auto
- Text: "Choose the plan that fits your needs. All plans include 7-day free trial."

**Toggle Switch:**
- Display: Flex, justify-content center, gap 16px
- Padding: 4px
- Border-radius: 40px
- Background: #E5E7EB
- Width: fit-content
- Margin: 32px auto 64px

**Toggle Option:**
- Padding: 12px 32px
- Border-radius: 36px
- Font: 16px/500/Inter
- Color: #6B7280
- Cursor: pointer
- Transition: all 200ms ease

**Toggle Active:**
- Background: #FFFFFF
- Color: #111827
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

**Savings Badge:**
- Position: absolute
- Top: -28px
- Right: -12px
- Padding: 4px 12px
- Border-radius: 20px
- Background: #10B981
- Color: white
- Font: 12px/600/Inter
- Letter-spacing: 0.025em
- Text: "SAVE 40%"

**Pricing Grid:**
- Display: Grid, grid-template-columns repeat(3, 1fr)
- Gap: 32px
- Align-items: start

**Pricing Card:**
- Padding: 48px 40px
- Border-radius: 16px
- Border: 2px solid #E5E7EB
- Background: #FFFFFF
- Display: Flex column
- Position: relative
- Transition: all 250ms ease
- Min-height: 600px

**Recommended Card:**
- Transform: scale(1.05)
- Z-index: 2
- Border: 2px solid #FF5722
- Shadow: 0 12px 24px -4px rgba(255,87,34,0.2)

**Recommended Badge:**
- Position: absolute, top -16px, left 50%, transform translateX(-50%)
- Padding: 8px 20px
- Border-radius: 20px
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Font: 12px/600/Inter
- Letter-spacing: 0.05em
- Text-transform: uppercase
- Text: "BEST VALUE"
- White-space: nowrap

**Plan Name:**
- Font: 24px/700/Inter
- Color: #111827
- Margin-bottom: 8px
- Text-align: center

**Plan Description:**
- Font: 14px/400/Inter
- Color: #6B7280
- Margin-bottom: 24px
- Text-align: center
- Line-height: 1.5

**Price Container:**
- Display: Flex, align-items baseline, justify-content center, gap 8px
- Margin-bottom: 8px

**Currency Symbol:**
- Font: 24px/700/Inter
- Color: #111827

**Price Amount:**
- Font: 48px/700/Inter
- Color: #111827
- Line-height: 1

**Billing Period:**
- Font: 16px/400/Inter
- Color: #6B7280
- Text-align: center
- Margin-bottom: 32px

**CTA Button:**
- Width: 100%
- Padding: 16px 32px
- Border-radius: 12px
- Margin-bottom: 32px
- Font: 16px/600/Inter
- Transition: all 200ms ease

**Primary Plan CTA (Recommended):**
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Shadow: 0 4px 8px -2px rgba(255,87,34,0.25)
- Border: none

**Secondary Plan CTA:**
- Border: 2px solid #E5E7EB
- Color: #111827
- Background: transparent

**Features List:**
- Display: Flex column, gap 16px
- Padding-top: 32px
- Border-top: 1px solid #E5E7EB

**Feature Item:**
- Display: Flex, gap 12px, align-items flex-start
- Font: 14px/400/Inter
- Color: #374151
- Line-height: 1.5

**Checkmark Icon:**
- Width: 20px, Height: 20px
- Color: #10B981
- Flex-shrink: 0
- Margin-top: 2px

**Guarantee Section:**
- Margin-top: 64px
- Text-align: center
- Padding: 32px
- Background: #F9FAFB
- Border-radius: 12px
- Border: 1px solid #E5E7EB

**Guarantee Icon:**
- Width: 48px, Height: 48px
- Color: #10B981
- Margin: 0 auto 16px

**Guarantee Text:**
- Font: 16px/600/Inter
- Color: #111827
- Margin-bottom: 8px
- Text: "48-hour money-back guarantee"

**Guarantee Description:**
- Font: 14px/400/Inter
- Color: #6B7280
- Text: "Not satisfied? Get a full refund within 48 hours, no questions asked."

**Responsive:**
- 1440px+: All tiers side-by-side, recommended scaled
- 768-1439px: 3 columns, recommended same scale
- <768px: Single column stacked, recommended same size, padding 64px 24px

**Interactive States:**
- Card hover: translateY(-4px), shadow increases (non-recommended only)
- CTA hover: scale(1.05), shadow increases
- CTA active: scale(0.98)
- Toggle option hover: color #111827

**Text Content:**

**Section Headline:** "Simple, transparent pricing"
**Section Subheadline:** "Choose the plan that fits your needs. All plans include 7-day free trial."
**Toggle:** "Monthly" / "Yearly" (with "SAVE 40%" badge on Yearly)

**Tier 1 - Basic:**
- Plan: "Basic"
- Description: "Perfect for freelancers and small businesses"
- Price: "$49"
- Period: "per month"
- CTA: "Start 7-day trial"
- Feature 1: "100 keyword lookups per 24 hours"
- Feature 2: "200 keyword suggestions per search"
- Feature 3: "25 competitor keywords per search"
- Feature 4: "Unlimited keyword lists"
- Feature 5: "SERP analysis"
- Feature 6: "Historical data"

**Tier 2 - Premium (Recommended):**
- Badge: "BEST VALUE"
- Plan: "Premium"
- Description: "For growing agencies and marketers"
- Price: "$69"
- Period: "per month"
- CTA: "Start 7-day trial"
- Feature 1: "500 keyword lookups per 24 hours"
- Feature 2: "700 keyword suggestions per search"
- Feature 3: "70 competitor keywords per search"
- Feature 4: "Unlimited keyword lists"
- Feature 5: "SERP analysis"
- Feature 6: "Historical data"
- Feature 7: "Search volume trends"
- Feature 8: "Email support"

**Tier 3 - Agency:**
- Plan: "Agency"
- Description: "For large teams and enterprises"
- Price: "$129"
- Period: "per month"
- CTA: "Start 7-day trial"
- Feature 1: "1,200 keyword lookups per 24 hours"
- Feature 2: "700 keyword suggestions per search"
- Feature 3: "150 competitor keywords per search"
- Feature 4: "Unlimited keyword lists"
- Feature 5: "SERP analysis"
- Feature 6: "Historical data"
- Feature 7: "Search volume trends"
- Feature 8: "Priority support"
- Feature 9: "API access"

**Guarantee:**
- Headline: "48-hour money-back guarantee"
- Description: "Not satisfied? Get a full refund within 48 hours, no questions asked."

---

## FOLD 8: FAQ

### 🏆 BEST COMPONENT: Clean Accordion FAQ
**Source:** Keyword Tool
**Score:** 17/20 (Clarity: 5, Hierarchy: 4, Conversion: 4, UX: 4)
**Why:** Clean accordion design with clear expand indicators, well-organized questions, easy to scan, good balance between comprehensive answers and conciseness.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 900px
- Padding: 96px 48px
- Margin: 0 auto
- Background: #F9FAFB

**Section Headline:**
- Font: 36px/700/Inter
- Color: #111827
- Text-align: center
- Margin-bottom: 16px
- Text: "Frequently asked questions"

**Section Subheadline:**
- Font: 18px/400/Inter
- Color: #4B5563
- Text-align: center
- Margin-bottom: 48px
- Line-height: 1.6
- Text: "Everything you need to know about keyword research"

**FAQ Container:**
- Display: Flex column, gap 16px

**FAQ Item:**
- Border: 1px solid #E5E7EB
- Border-radius: 12px
- Padding: 24px
- Background: #FFFFFF
- Cursor: pointer
- Transition: all 200ms ease

**Question Container:**
- Display: Flex, justify-content space-between, gap 24px
- Align-items flex-start

**Question Text:**
- Font: 18px/600/Inter
- Color: #111827
- Line-height: 1.4
- Flex-grow: 1

**Expand Icon:**
- Width: 24px, Height: 24px
- Color: #6B7280
- Flex-shrink: 0
- Transition: transform 300ms ease

**Icon Collapsed:**
- Transform: rotate(0deg)
- SVG: Plus icon or chevron down

**Icon Expanded:**
- Transform: rotate(180deg) for chevron, rotate(45deg) for plus
- Color: #FF5722

**Answer Container:**
- Max-height: 0 (collapsed)
- Max-height: 500px (expanded)
- Overflow: hidden
- Padding-top: 0 (collapsed)
- Padding-top: 20px (expanded)
- Transition: all 300ms ease

**Answer Text:**
- Font: 16px/400/Inter
- Color: #4B5563
- Line-height: 1.6

**Additional CTA Section:**
- Margin-top: 64px
- Text-align: center
- Padding: 40px
- Background: #FFFFFF
- Border-radius: 12px
- Border: 1px solid #E5E7EB

**CTA Headline:**
- Font: 20px/600/Inter
- Color: #111827
- Margin-bottom: 16px
- Text: "Still have questions?"

**CTA Description:**
- Font: 16px/400/Inter
- Color: #4B5563
- Margin-bottom: 24px
- Text: "Can't find the answer you're looking for? Our support team is here to help."

**CTA Button:**
- Padding: 12px 32px
- Border: 2px solid #FF5722
- Border-radius: 12px
- Background: transparent
- Color: #F4511E
- Font: 16px/600/Inter
- Display: inline-flex
- Text: "Contact support"

**Responsive:**
- 1440px+: Full layout
- 768-1439px: Padding 24px
- <768px: Padding 20px, margin 64px 24px

**Interactive States:**
- Item hover: border #D1D5DB, background #F9FAFB
- Expanded state: border #FF5722, icon rotated and colored
- Focus: outline #FF5722 for accessibility
- CTA button hover: background #FFF3E0

**Text Content:**

**Section Headline:** "Frequently asked questions"
**Section Subheadline:** "Everything you need to know about keyword research"

**FAQ 1:**
- Question: "What is keyword research and why is it important?"
- Answer: "Keyword research is the process of finding and analyzing search terms that people enter into search engines. It's crucial for SEO because it helps you understand what your target audience is searching for, allowing you to create content that matches their intent and ranks well in search results."

**FAQ 2:**
- Question: "How many keyword suggestions will I get?"
- Answer: "The number of suggestions depends on your plan. Basic plans provide up to 200 suggestions per search, while Premium and Agency plans can provide up to 700 suggestions. The tool uses Google Autocomplete and related searches to generate comprehensive keyword ideas."

**FAQ 3:**
- Question: "Can I track keywords in multiple locations?"
- Answer: "Yes! Our tool supports keyword research for 65,000+ locations worldwide. You can target specific countries, states, or cities to get location-specific search volume and competition data, which is essential for local SEO strategies."

**FAQ 4:**
- Question: "What's the difference between search volume and keyword difficulty?"
- Answer: "Search volume shows how many times a keyword is searched per month on average. Keyword difficulty (KD) is a score from 0-100 that estimates how hard it would be to rank in the top 10 for that keyword, based on the authority of currently ranking pages."

**FAQ 5:**
- Question: "Do you offer a free trial?"
- Answer: "Yes! All plans come with a 7-day free trial. You can explore all features without entering credit card details. If you decide it's not for you, simply cancel before the trial ends with no charges."

**FAQ 6:**
- Question: "Can I export my keyword lists?"
- Answer: "Absolutely. You can export your keyword research data to CSV files with all metrics included (search volume, difficulty, CPC, etc.). This makes it easy to share with your team or import into other tools for further analysis."

**FAQ 7:**
- Question: "How accurate is your search volume data?"
- Answer: "Our search volume data comes directly from Google's API and is updated regularly. While no tool can be 100% accurate due to how search engines work, our data is as precise as what's available from Google and is used by thousands of SEO professionals worldwide."

**FAQ 8:**
- Question: "What payment methods do you accept?"
- Answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for annual plans. All payments are processed securely through our PCI-compliant payment gateway."

**Additional CTA:**
- Headline: "Still have questions?"
- Description: "Can't find the answer you're looking for? Our support team is here to help."
- Button text: "Contact support"

---

## FOLD 9: FINAL CTA

### 🏆 BEST COMPONENT: Gradient Background CTA with Trust Elements
**Source:** Serpstat
**Score:** 18/20 (Clarity: 5, Hierarchy: 5, Conversion: 4, UX: 4)
**Why:** Strong visual treatment with gradient background, compelling urgency without pressure, trust elements reinforce no-risk trial, centered layout focuses attention on action.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 96px 48px
- Text-align: center
- Background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)
- Border-radius: 24px (if contained section)
- Margin: 0 48px (if contained)

**Content Container:**
- Max-width: 800px
- Margin: 0 auto
- Display: Flex column, align-items center

**CTA Headline:**
- Font: 48px/700/Inter (5xl/bold)
- Color: #111827
- Line-height: 1.2
- Margin-bottom: 16px
- Letter-spacing: -0.02em
- Text: "Start finding better keywords today"

**CTA Subheadline:**
- Font: 20px/400/Inter (xl/normal)
- Color: #4B5563
- Line-height: 1.6
- Max-width: 600px
- Margin-bottom: 40px
- Text: "Join 30,000+ marketers who use our tools to grow their organic traffic"

**CTA Button Group:**
- Display: Flex, gap 16px, justify-content center, flex-wrap wrap
- Margin-bottom: 32px

**Primary CTA:**
- Padding: 18px 48px, Height: 56px
- Border-radius: 12px
- Min-width: 220px
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Font: 18px/600/Inter
- Shadow: 0 4px 8px -2px rgba(255,87,34,0.25), 0 8px 16px -4px rgba(255,87,34,0.3)
- Text: "Start free trial"

**Secondary CTA:**
- Padding: 18px 48px, Height: 56px
- Border: 2px solid #FF5722
- Border-radius: 12px
- Min-width: 220px
- Background: white
- Color: #F4511E
- Font: 18px/600/Inter
- Text: "View pricing"

**Supporting Text:**
- Font: 14px/400/Inter
- Color: #6B7280
- Margin-top: 24px
- Display: flex, gap 16px, justify-content center, flex-wrap wrap

**Support Item:**
- Display: flex, gap 6px, align-items center
- Font: 14px/500/Inter
- Color: #374151

**Checkmark Icon (small):**
- Width: 16px, Height: 16px
- Color: #10B981

**Trust Elements:**
- Display: Flex, gap 32px, justify-content center, flex-wrap wrap
- Margin-top: 40px
- Padding-top: 40px
- Border-top: 1px solid rgba(255,87,34,0.2)

**Trust Item:**
- Display: Flex column, align-items center, gap 8px

**Trust Icon:**
- Width: 40px, Height: 40px
- Color: #FF5722
- Margin-bottom: 8px

**Trust Stat:**
- Font: 24px/700/Inter
- Color: #111827

**Trust Label:**
- Font: 14px/400/Inter
- Color: #6B7280

**Responsive:**
- 1440px+: All centered, buttons side-by-side, margin 0 48px
- 768-1439px: Same layout, margin 0 32px
- <768px: Buttons stack vertically, full-width (max 320px), padding 64px 24px, headline 36px (4xl), margin 0 16px

**Interactive States:**
- Primary CTA hover: scale(1.05), shadow increases to 0 8px 16px -2px rgba(255,87,34,0.35)
- Primary CTA active: scale(0.98)
- Secondary CTA hover: background #FFF3E0, border #F4511E, transform translateY(-2px)
- Secondary CTA active: background #FFE0B2, scale(0.98)

**Text Content:**
- Headline: "Start finding better keywords today"
- Subheadline: "Join 30,000+ marketers who use our tools to grow their organic traffic"
- Primary CTA: "Start free trial"
- Secondary CTA: "View pricing"
- Support item 1: "✓ No credit card required"
- Support item 2: "✓ 7-day free trial"
- Support item 3: "✓ Cancel anytime"
- Trust stat 1: "30,000+" / "Active users"
- Trust stat 2: "1.5B+" / "Keywords tracked"
- Trust stat 3: "4.6/5" / "Average rating"

---

## FOLD 10: FOOTER

### 🏆 BEST COMPONENT: Comprehensive Multi-Column Footer
**Source:** Serpstat
**Score:** 17/20 (Clarity: 4, Hierarchy: 5, Conversion: 4, UX: 4)
**Why:** Well-organized link structure across logical categories, clear visual hierarchy, includes all essential links, social media integration, good balance between comprehensive and overwhelming.

### SPECIFICATIONS:

**Layout:**
- Container: Full-width section, max-width 1440px
- Padding: 80px 48px 32px
- Background: #111827 (dark footer)
- Border-top: 1px solid #1F2937

**Footer Grid:**
- Display: Grid, grid-template-columns 2fr 1fr 1fr 1fr 1fr
- Gap: 48px
- Margin-bottom: 48px

**Footer Column:**
- Display: Flex column, gap 16px

**Column Headline:**
- Font: 16px/600/Inter
- Color: #F9FAFB
- Margin-bottom: 16px
- Letter-spacing: 0.025em

**Footer Link:**
- Font: 14px/400/Inter
- Color: #9CA3AF
- Line-height: 2
- Display: block
- Transition: color 200ms ease
- Text-decoration: none

**Logo Column (First):**
- Display: Flex column, gap 16px

**Footer Logo:**
- Width: 160px, Height: auto
- Margin-bottom: 16px
- Filter: brightness(0) invert(1) (for dark background)

**Footer Description:**
- Font: 14px/400/Inter
- Color: #9CA3AF
- Line-height: 1.6
- Max-width: 280px
- Margin-bottom: 24px
- Text: "The ultimate keyword research tool for SEO professionals and marketers."

**Social Links Container:**
- Display: Flex, gap 16px
- Margin-top: 24px

**Social Icon:**
- Width: 40px, Height: 40px
- Border-radius: 50%
- Border: 1px solid #374151
- Background: transparent
- Display: Flex, align-items center, justify-content center
- Transition: all 300ms ease
- Color: #9CA3AF

**Newsletter Section (in Logo Column):**
- Margin-top: 32px
- Padding-top: 32px
- Border-top: 1px solid #374151

**Newsletter Headline:**
- Font: 14px/600/Inter
- Color: #F9FAFB
- Margin-bottom: 12px
- Text: "Stay updated"

**Newsletter Form:**
- Display: Flex, gap 8px

**Newsletter Input:**
- Flex-grow: 1
- Height: 40px
- Border: 1px solid #374151
- Border-radius: 8px
- Padding: 10px 16px
- Background: #1F2937
- Color: #F9FAFB
- Font: 14px/400/Inter
- Placeholder color: #6B7280

**Newsletter Button:**
- Padding: 10px 20px
- Height: 40px
- Border-radius: 8px
- Background: linear-gradient(to-br, #FF5722, #F4511E)
- Color: white
- Font: 14px/600/Inter
- Border: none
- White-space: nowrap
- Text: "Subscribe"

**Footer Bottom:**
- Border-top: 1px solid #374151
- Padding-top: 32px
- Display: Flex, justify-content space-between, align-items center
- Flex-wrap: wrap
- Gap: 24px

**Copyright Text:**
- Font: 14px/400/Inter
- Color: #6B7280
- Text: "© 2024 Keyword Tool. All rights reserved."

**Legal Links:**
- Display: Flex, gap 32px, flex-wrap wrap

**Legal Link:**
- Font: 14px/400/Inter
- Color: #9CA3AF
- Transition: color 200ms ease
- Text-decoration: none

**Responsive:**
- 1440px+: 5-column grid (2fr 1fr 1fr 1fr 1fr)
- 768-1439px: 3-column grid (logo full-width row 1, then 2 columns)
- <768px: Single column stacked, all columns full-width, centered text, padding 64px 24px 32px

**Interactive States:**
- Link hover: color #F9FAFB, transform translateX(2px)
- Social icon hover: background #374151, border #6B7280, scale(1.1)
- Legal link hover: color #F9FAFB
- Newsletter button hover: scale(1.05), shadow increases
- Newsletter input focus: border #FF5722

**Text Content:**

**Logo Column:**
- Logo: "Keyword Tool" (text or image)
- Description: "The ultimate keyword research tool for SEO professionals and marketers."
- Newsletter headline: "Stay updated"
- Newsletter placeholder: "Enter your email"
- Newsletter button: "Subscribe"

**Column 1 - Product:**
- Headline: "Product"
- Link 1: "Features"
- Link 2: "Pricing"
- Link 3: "API Access"
- Link 4: "Integrations"
- Link 5: "Changelog"

**Column 2 - Resources:**
- Headline: "Resources"
- Link 1: "Blog"
- Link 2: "Case Studies"
- Link 3: "Help Center"
- Link 4: "Video Tutorials"
- Link 5: "Webinars"

**Column 3 - Company:**
- Headline: "Company"
- Link 1: "About Us"
- Link 2: "Careers"
- Link 3: "Contact"
- Link 4: "Press Kit"
- Link 5: "Partners"

**Column 4 - Legal:**
- Headline: "Legal"
- Link 1: "Privacy Policy"
- Link 2: "Terms of Service"
- Link 3: "Cookie Policy"
- Link 4: "GDPR"
- Link 5: "Security"

**Social Links:**
- Platform 1: "Twitter"
- Platform 2: "LinkedIn"
- Platform 3: "Facebook"
- Platform 4: "YouTube"
- Platform 5: "Instagram"

**Footer Bottom:**
- Copyright: "© 2024 Keyword Tool. All rights reserved."
- Legal 1: "Privacy Policy"
- Legal 2: "Terms of Service"
- Legal 3: "Cookie Settings"

---

## COMPONENT SUMMARY

**Total Folds Analyzed:** 10
**Best Components Selected:** 10 (one per fold)

**Selection Overview:**
1. **Navigation:** From Serpstat (Clean horizontal with prominent CTAs)
2. **Hero:** From Serpstat (Search-focused with trust elements)
3. **Benefits:** From Keywords Everywhere (Icon-led benefit cards)
4. **Features:** From KWFinder (Alternating blocks with testimonials)
5. **Testimonials:** From KWFinder (Expert cards with photos)
6. **Process:** From Keyword Tool (Simple 3-step visualization)
7. **Pricing:** From KWFinder (Three-tier with best value highlight)
8. **FAQ:** From Keyword Tool (Clean accordion)
9. **Final CTA:** From Serpstat (Gradient background with trust elements)
10. **Footer:** From Serpstat (Comprehensive multi-column)

**Overall Design Philosophy:**
- Clean, modern SaaS aesthetic
- Strong use of brand orange (#FF5722) for CTAs and accents
- Emphasis on trust signals and social proof throughout
- Clear information hierarchy with generous white space
- Interactive elements with smooth transitions
- Mobile-first responsive design
- Accessibility considerations (focus states, keyboard navigation)

---

## NEXT STEP: CREATE SVG WIREFRAME

Now proceeding to Phase 2: Generate the high-fidelity SVG wireframe based on these specifications.
