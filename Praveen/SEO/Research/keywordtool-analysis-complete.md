# LANDING PAGE COMPONENT SPECIFICATIONS - KEYWORDTOOL.IO

## REFERENCE SITE
**URL**: https://keywordtool.io/
**Industry**: Keyword Research / App Growth
**Analysis Date**: 2024-10-15

---

## COMPETITOR LIST
1. Ahrefs - https://ahrefs.com/
2. SEMrush - https://www.semrush.com/
3. Ubersuggest - https://neilpatel.com/ubersuggest/
4. Moz Keyword Explorer - https://moz.com/explorer
5. AnswerThePublic - https://answerthepublic.com/
6. Keywords Everywhere - https://keywordseverywhere.com/
7. Google Keyword Planner - https://ads.google.com/intl/en_us/home/tools/keyword-planner/

---

## FOLD 1: NAVIGATION/HEADER

### 🏆 BEST COMPONENT: Navigation Structure
**Source**: Ahrefs
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 5/5
- Conversion Potential: 4/5
- User Experience: 4/5

**Why Selected**: Clean horizontal layout with prominent CTA, clear navigation hierarchy with excellent visual separation between navigation links and primary action. Strong brand presence with logo left-aligned. CTA button has high contrast and clear call-to-action.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width, fixed position
- Max-width: 1440px
- Height: 80px
- Padding: 0 48px
- Display: Flex
- Justify-content: Space-between
- Align-items: Center
- Background: White with subtle shadow

**Component Arrangement**:
- Logo: Left-aligned, 48px from left edge
- Navigation links: Center region, horizontal layout
- Secondary action (Login): 24px gap before CTA
- CTA button: Right-aligned, 48px from right edge

**Navigation Links**:
- Display: Inline-flex
- Gap between items: 32px
- Alignment: Center
- Text decoration: None

**CTA Button**:
- Padding: 12px 32px
- Border-radius: 8px
- Min-width: 140px
- Border: None
- Box-shadow: Brand shadow

**Responsive Behavior**:
- Desktop (1440px+): Full horizontal layout
- Tablet (768px-1439px): Condensed spacing, gap reduced to 24px
- Mobile (<768px): Hamburger menu icon, full-screen overlay navigation

**Interactive States**:
- Link hover: Underline appears with 0.2s transition
- Link active: Persistent underline
- CTA hover: Slight elevation increase, scale 1.02
- Focus state: 2px outline for accessibility

**Text Content**:
- Logo text: "KeywordTool"
- Nav link 1: "Features"
- Nav link 2: "Pricing"
- Nav link 3: "API"
- Nav link 4: "Resources"
- Secondary action: "Log In"
- CTA button text: "Start Free Trial"

---

## FOLD 2: HERO SECTION (Above the Fold)

### 🏆 BEST COMPONENT: Hero Layout
**Source**: SEMrush
**Score**: 19/20
- Clarity: 5/5
- Visual Hierarchy: 5/5
- Conversion Potential: 5/5
- User Experience: 4/5

**Why Selected**: Exceptional 2-column layout with perfect balance between content and visual. Strong value proposition immediately visible. Multiple CTAs provide clear path forward. Trust elements positioned strategically below CTAs to reinforce credibility. Visual on right shows actual product interface, helping users understand what they're signing up for.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Min-height: 700px
- Padding: 120px 48px 80px 48px
- Display: Grid
- Grid-template-columns: 1fr 1fr (50% text, 50% visual)
- Gap: 64px
- Align-items: Center
- Background: White

**Content Column (Left)**:
- Max-width: 600px
- Padding-right: 32px
- Display: Flex column
- Justify-content: Center

**Headline**:
- Max-width: 540px
- Margin-bottom: 24px
- Line-height: 1.2

**Subheadline**:
- Max-width: 520px
- Margin-bottom: 40px
- Line-height: 1.6
- Opacity: 0.85

**CTA Group**:
- Display: Flex
- Gap: 16px
- Margin-bottom: 48px
- Flex-wrap: Wrap

**Primary CTA**:
- Padding: 18px 40px
- Border-radius: 8px
- Min-width: 180px
- Border: None
- Height: 56px

**Secondary CTA**:
- Padding: 18px 32px
- Border: 2px solid
- Border-radius: 8px
- Min-width: 160px
- Background: Transparent
- Height: 56px

**Trust Elements**:
- Display: Flex
- Gap: 32px
- Align-items: Center
- Margin-top: 48px
- Flex-wrap: Wrap

**Trust Item**:
- Display: Flex
- Gap: 8px
- Align-items: Center

**Visual Column (Right)**:
- Position: Relative
- Display: Flex
- Justify-content: Center
- Align-items: Center

**Hero Visual**:
- Type: Product screenshot
- Width: 100%
- Max-width: 540px
- Aspect-ratio: 16:10
- Border-radius: 12px
- Box-shadow: Elevation high

**Responsive Behavior**:
- Desktop (1440px+): 2-column grid layout
- Tablet (768px-1439px): 2-column grid, gap reduced to 40px
- Mobile (<768px): Single column stacked, visual below content, padding 24px

**Interactive States**:
- Primary CTA hover: Transform scale(1.03), box-shadow increases
- Primary CTA active: Transform scale(0.98)
- Secondary CTA hover: Background opacity 0.05, border emphasis
- Trust element hover: None (informational only)

**Text Content**:
- Headline: "Find The Right Keywords To Grow Your Business"
- Subheadline: "Discover thousands of long-tail keywords with accurate search volume data. Start ranking higher on Google, YouTube, Amazon, and more."
- Primary CTA: "Get Started Free"
- Secondary CTA: "Watch Demo"
- Trust element 1: "✓ No credit card required"
- Trust element 2: "✓ 10,000+ active users"
- Trust element 3: "✓ 4.8/5 rating"

**Screenshot/Image Placeholder**:
- Description: "Keyword research dashboard showing search results table with columns for keyword, search volume, CPC, competition, and trend graph"
- Key elements visible: "Search input at top, data table with multiple rows, metric columns, trend sparklines, export button"
- Visual style: "Clean modern interface with data visualization, professional color scheme"

---

## FOLD 3: VALUE PROPOSITION / BENEFITS

### 🏆 BEST COMPONENT: Benefit Cards Layout
**Source**: Ubersuggest
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 5/5
- User Experience: 4/5

**Why Selected**: Excellent 3-column card grid with clear icon-driven benefits. Each card is scannable with icon, headline, and concise description. Icons are colorful and immediately communicate the benefit. Balanced spacing and consistent card heights create visual harmony.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 80px 48px
- Background: Light gray (#F9FAFB)

**Section Headline**:
- Text-align: Center
- Max-width: 700px
- Margin: 0 auto 16px auto

**Section Subheadline**:
- Text-align: Center
- Max-width: 600px
- Margin: 0 auto 64px auto
- Line-height: 1.6
- Opacity: 0.8

**Benefits Grid**:
- Display: Grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 32px
- Margin-top: 64px

**Benefit Card**:
- Padding: 40px
- Border-radius: 12px
- Border: 1px solid rgba(0,0,0,0.08)
- Background: White
- Text-align: Left
- Min-height: 340px
- Display: Flex column
- Transition: All 0.3s ease

**Icon Container**:
- Width: 64px
- Height: 64px
- Margin-bottom: 24px
- Display: Flex
- Align-items: Center
- Justify-content: Center
- Border-radius: 12px
- Background: Light tint (varies per card)

**Icon**:
- Width: 32px
- Height: 32px
- Or emoji at 32px size

**Card Headline**:
- Margin-bottom: 16px
- Line-height: 1.3

**Card Description**:
- Line-height: 1.7
- Opacity: 0.85
- Flex-grow: 1

**Responsive Behavior**:
- Desktop (1440px+): 3 columns
- Tablet (768px-1439px): 2 columns
- Mobile (<768px): 1 column, full-width cards

**Interactive States**:
- Card hover: Transform translateY(-4px), box-shadow increases to elevation-high
- Icon container hover: None (static)

**Text Content**:
- Section headline: "Powerful Keyword Research Made Simple"
- Section subheadline: "Everything you need to dominate search rankings and grow your organic traffic"

**Benefit Card 1**:
- Icon: 🌐 (globe emoji, representing multi-platform)
- Icon background: #FFF3E0 (brand.50)
- Headline: "Multi-Platform Support"
- Description: "Find keywords for Google, YouTube, Amazon, Instagram, Twitter, App Store, and more. All platforms covered in one powerful tool."

**Benefit Card 2**:
- Icon: 🎯 (target emoji, representing accuracy)
- Icon background: #EFF6FF (blue.50)
- Headline: "Real-Time Accurate Data"
- Description: "Get reliable search volume, competition metrics, and CPC data updated in real-time from multiple data sources."

**Benefit Card 3**:
- Icon: 📈 (chart emoji, representing growth)
- Icon background: #ECFDF5 (green.50)
- Headline: "Long-Tail Keywords"
- Description: "Discover thousands of profitable long-tail keyword opportunities with lower competition and higher conversion rates."

---

## FOLD 4: FEATURES SHOWCASE

### 🏆 BEST COMPONENT: Feature Presentation Style
**Source**: Ahrefs
**Score**: 19/20
- Clarity: 5/5
- Visual Hierarchy: 5/5
- Conversion Potential: 4/5
- User Experience: 5/5

**Why Selected**: Outstanding alternating layout that maintains visual interest throughout the scroll. Each feature gets dedicated space with clear product screenshot. Feature points are bulleted with checkmarks for scannability. Content-to-visual ratio is perfectly balanced. Generous white space makes each feature feel important.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 80px 48px
- Background: White

**Section Headline**:
- Text-align: Center
- Max-width: 800px
- Margin: 0 auto 80px auto

**Feature Block** (Repeating Pattern):
- Display: Grid
- Grid-template-columns: 1fr 1fr
- Gap: 80px
- Margin-bottom: 120px
- Align-items: Center

**Alternating Layout**:
- Feature 1: Visual left, content right
- Feature 2: Content left, visual right
- Feature 3: Visual left, content right
- Pattern continues

**Content Column**:
- Max-width: 540px
- Padding: 0
- Display: Flex column
- Justify-content: Center

**Feature Headline**:
- Margin-bottom: 20px
- Line-height: 1.3

**Feature Description**:
- Line-height: 1.7
- Margin-bottom: 32px
- Opacity: 0.85

**Feature Points List**:
- Display: Flex column
- Gap: 16px
- Margin-bottom: 0

**Point Item**:
- Display: Flex
- Gap: 12px
- Align-items: Start

**Checkmark Icon**:
- Width: 20px
- Height: 20px
- Flex-shrink: 0
- Margin-top: 2px
- Color: Green (#10B981)

**Visual Column**:
- Position: Relative
- Display: Flex
- Justify-content: Center
- Align-items: Center

**Feature Visual**:
- Width: 100%
- Max-width: 580px
- Border-radius: 12px
- Box-shadow: Elevation medium

**Responsive Behavior**:
- Desktop (1440px+): 2-column alternating layout
- Tablet (768px-1439px): 2-column, gap 48px, margin-bottom 80px
- Mobile (<768px): Single column stacked, visual always below content, gap 32px

**Interactive States**:
- Visual hover: None (static images)
- Checkmark hover: None (static)

**Text Content**:

**Section Headline**: "Advanced Features for Serious Marketers"

**Feature 1**:
- Headline: "Google Autocomplete Suggestions"
- Description: "Access Google's autocomplete database instantly. See what people are actually searching for in real-time across all Google properties and countries."
- Point 1: "Instant keyword suggestions as you type"
- Point 2: "Support for 192 countries and languages"
- Point 3: "Export unlimited results to CSV"
- Screenshot description: "Google autocomplete interface showing a search input with dropdown list of related keyword suggestions, each with search volume indicator"
- Key visual elements: "Search bar at top, dropdown list with 10-15 suggestions, each row showing keyword phrase and mini metrics"

**Feature 2**:
- Headline: "Question-Based Keywords"
- Description: "Discover questions people are asking about your topics. Perfect for creating content that answers user intent and captures featured snippets."
- Point 1: "Filter by Who, What, Where, When, Why, How"
- Point 2: "Ideal for FAQ sections and blog content"
- Point 3: "Voice search optimization ready"
- Screenshot description: "Question keywords results table showing 'how to', 'what is', 'why does' type queries with search volumes"
- Key visual elements: "Filter tabs at top (Who, What, Why, etc.), data table showing question keywords, search volume column, trend indicators"

**Feature 3**:
- Headline: "Search Volume & Competition Data"
- Description: "Get accurate monthly search volume, cost-per-click estimates, and competition metrics for every keyword you discover."
- Point 1: "Real-time search volume data"
- Point 2: "CPC and competition analysis"
- Point 3: "Historical trend graphs"
- Screenshot description: "Detailed metrics dashboard showing keyword with search volume graph over 12 months, CPC range, competition score gauge"
- Key visual elements: "Line graph showing volume trends, metric cards for CPC and competition, monthly breakdown table"

---

## FOLD 5: SOCIAL PROOF / TESTIMONIALS

### 🏆 BEST COMPONENT: Testimonial Card Design
**Source**: SEMrush
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 5/5
- User Experience: 4/5

**Why Selected**: Strong credibility through customer photos and detailed attribution. 5-star ratings are prominent. Quote is long enough to provide substance but not overwhelming. Clean card design with subtle shadows. Customer info section clearly separated from quote. Mix of company sizes and industries adds authenticity.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 80px 48px
- Background: Light gray (#F9FAFB)

**Section Headline**:
- Text-align: Center
- Max-width: 700px
- Margin: 0 auto 64px auto

**Testimonials Grid**:
- Display: Grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 32px
- Margin-top: 64px

**Testimonial Card**:
- Padding: 40px
- Border-radius: 12px
- Border: 1px solid rgba(0,0,0,0.06)
- Background: White
- Display: Flex column
- Min-height: 380px
- Transition: All 0.3s ease

**Rating Display**:
- Margin-bottom: 20px
- Display: Flex
- Gap: 4px

**Star Icon**:
- Width: 18px
- Height: 18px
- Color: Amber (#F59E0B)

**Testimonial Quote**:
- Line-height: 1.7
- Margin-bottom: 32px
- Flex-grow: 1
- Position: Relative
- Opacity: 0.9

**Customer Info Section**:
- Display: Flex
- Gap: 16px
- Align-items: Center
- Margin-top: Auto
- Border-top: 1px solid rgba(0,0,0,0.06)
- Padding-top: 24px

**Customer Photo**:
- Width: 48px
- Height: 48px
- Border-radius: 50%
- Object-fit: Cover
- Flex-shrink: 0
- Background: Light gray (placeholder)
- Border: 1px solid rgba(0,0,0,0.08)

**Customer Details**:
- Display: Flex column
- Gap: 4px

**Customer Name**:
- Line-height: 1.2
- Font-weight: 600

**Customer Title/Company**:
- Line-height: 1.2
- Opacity: 0.7

**Responsive Behavior**:
- Desktop (1440px+): 3 columns
- Tablet (768px-1439px): 2 columns
- Mobile (<768px): 1 column, cards stack vertically

**Interactive States**:
- Card hover: Transform translateY(-4px), box-shadow increases to elevation-high

**Text Content**:

**Section Headline**: "Trusted by 10,000+ Marketers Worldwide"

**Testimonial 1**:
- Rating: 5 stars
- Quote: "KeywordTool has completely transformed our SEO strategy. We've discovered hundreds of long-tail keywords we never would have found otherwise. Our organic traffic has grown 250% in just 6 months."
- Customer name: "Sarah Mitchell"
- Customer title: "Head of SEO"
- Company: "TechStartup Inc"
- Photo: Circle placeholder with initials "SM"

**Testimonial 2**:
- Rating: 5 stars
- Quote: "The multi-platform keyword research is a game-changer. We optimize for YouTube, Amazon, and Google all from one tool. The time savings alone have paid for the subscription many times over."
- Customer name: "David Chen"
- Customer title: "Digital Marketing Manager"
- Company: "E-commerce Solutions"
- Photo: Circle placeholder with initials "DC"

**Testimonial 3**:
- Rating: 5 stars
- Quote: "Finally, accurate search volume data we can trust. The question-based keywords feature helps us create content that actually answers what our audience is searching for. Highly recommended!"
- Customer name: "Emily Rodriguez"
- Customer title: "Content Director"
- Company: "Marketing Agency Pro"
- Photo: Circle placeholder with initials "ER"

---

## FOLD 6: HOW IT WORKS / PROCESS

### 🏆 BEST COMPONENT: Process Visualization
**Source**: AnswerThePublic
**Score**: 17/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 4/5
- User Experience: 4/5

**Why Selected**: Clear 4-step horizontal process with connecting line showing progression. Numbered circles provide strong visual anchors. Each step is concise and action-oriented. The linear flow makes it immediately obvious how the tool works. Simple and effective without being cluttered.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 80px 48px
- Background: White

**Section Headline**:
- Text-align: Center
- Max-width: 700px
- Margin: 0 auto 16px auto

**Section Subheadline**:
- Text-align: Center
- Max-width: 600px
- Margin: 0 auto 64px auto
- Line-height: 1.6
- Opacity: 0.8

**Steps Container**:
- Display: Flex
- Direction: Row (horizontal)
- Gap: 0
- Justify-content: Space-between
- Align-items: Flex-start
- Position: Relative
- Padding: 0 60px

**Connecting Line** (between steps):
- Position: Absolute
- Top: 40px
- Left: 120px
- Width: calc(100% - 240px)
- Height: 2px
- Z-index: 0
- Background: Light gray with opacity

**Step Item**:
- Width: 25%
- Display: Flex column
- Align-items: Center
- Text-align: Center
- Position: Relative
- Z-index: 1

**Step Number Container**:
- Width: 80px
- Height: 80px
- Border-radius: 50%
- Display: Flex
- Align-items: Center
- Justify-content: Center
- Margin-bottom: 24px
- Border: 3px solid
- Background: White

**Step Number**:
- Font-size: 32px
- Font-weight: 700

**Step Headline**:
- Margin-bottom: 12px
- Line-height: 1.3
- Font-weight: 600

**Step Description**:
- Line-height: 1.6
- Opacity: 0.8
- Max-width: 240px

**Responsive Behavior**:
- Desktop (1440px+): Horizontal row, all steps visible with connecting line
- Tablet (768px-1439px): 2x2 grid, connecting line adjusted vertically
- Mobile (<768px): Vertical stack, single column, vertical connecting line on left

**Text Content**:

**Section Headline**: "Get Started in 4 Simple Steps"
**Section Subheadline**: "Start finding better keywords in minutes"

**Step 1**:
- Number: 1
- Headline: "Enter Your Keyword"
- Description: "Type in your seed keyword or topic to get started"

**Step 2**:
- Number: 2
- Headline: "Choose Platform"
- Description: "Select Google, YouTube, Amazon, or any supported platform"

**Step 3**:
- Number: 3
- Headline: "Get Results"
- Description: "Instantly see hundreds of keyword suggestions with data"

**Step 4**:
- Number: 4
- Headline: "Export & Optimize"
- Description: "Export your keywords and start optimizing your content"

---

## FOLD 7: PRICING

### 🏆 BEST COMPONENT: Pricing Card Layout
**Source**: Moz
**Score**: 19/20
- Clarity: 5/5
- Visual Hierarchy: 5/5
- Conversion Potential: 5/5
- User Experience: 4/5

**Why Selected**: Exceptional 3-tier pricing with clear recommended option highlighted. Pricing is transparent with no hidden information. Feature comparison is comprehensive yet scannable. "Most Popular" badge draws attention effectively. CTA buttons are prominent. Good balance of features listed without overwhelming. Annual/monthly toggle adds flexibility.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 80px 48px
- Background: Light gray (#F9FAFB)

**Section Headline**:
- Text-align: Center
- Max-width: 700px
- Margin: 0 auto 16px auto

**Section Subheadline**:
- Text-align: Center
- Max-width: 600px
- Margin: 0 auto 48px auto
- Line-height: 1.6
- Opacity: 0.8

**Pricing Grid**:
- Display: Grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 32px
- Align-items: Start
- Margin-top: 64px

**Pricing Card**:
- Padding: 40px
- Border-radius: 12px
- Border: 2px solid rgba(0,0,0,0.08)
- Background: White
- Display: Flex column
- Position: Relative
- Transition: All 0.3s ease
- Min-height: 640px

**Recommended Card** (Middle tier):
- Transform: Scale(1.05)
- Z-index: 2
- Box-shadow: Elevation high
- Border: 2px solid brand color

**Recommended Badge**:
- Position: Absolute
- Top: -16px
- Left: 50%
- Transform: translateX(-50%)
- Padding: 8px 24px
- Border-radius: 20px
- White-space: Nowrap
- Background: Brand gradient
- Box-shadow: Brand shadow

**Plan Name**:
- Margin-bottom: 12px
- Font-size: 24px
- Font-weight: 700

**Plan Description**:
- Margin-bottom: 32px
- Line-height: 1.5
- Opacity: 0.7

**Price Container**:
- Margin-bottom: 32px
- Display: Flex
- Align-items: Baseline
- Gap: 8px

**Price Amount**:
- Line-height: 1
- Font-size: 56px
- Font-weight: 700

**Billing Period**:
- Opacity: 0.7
- Font-size: 18px

**CTA Button**:
- Width: 100%
- Padding: 16px 32px
- Border-radius: 8px
- Margin-bottom: 40px
- Border: 2px solid (or none for primary)
- Transition: All 0.3s ease
- Height: 56px

**Features List**:
- Display: Flex column
- Gap: 16px
- Padding-top: 40px
- Border-top: 1px solid rgba(0,0,0,0.08)

**Feature Item**:
- Display: Flex
- Gap: 12px
- Align-items: Start

**Checkmark Icon**:
- Width: 18px
- Height: 18px
- Flex-shrink: 0
- Margin-top: 2px
- Color: Green (#10B981)

**Feature Text**:
- Line-height: 1.6
- Flex-grow: 1
- Font-size: 14px

**Responsive Behavior**:
- Desktop (1440px+): All tiers side-by-side in grid
- Tablet (768px-1439px): Recommended card top row full-width, other 2 below
- Mobile (<768px): Single column stacked, recommended card same size

**Interactive States**:
- Card hover: Transform translateY(-4px), box-shadow increases
- CTA hover: Background emphasis, slight scale
- CTA active: Transform scale(0.98)

**Text Content**:

**Section Headline**: "Choose Your Plan"
**Section Subheadline**: "Start free, upgrade when you're ready. All plans include 7-day free trial."

**Pricing Tier 1: Basic**:
- Plan name: "Basic"
- Plan description: "Perfect for individuals and bloggers"
- Price: "$29"
- Billing period: "/month"
- CTA text: "Start Free Trial"
- Feature 1: "✓ 500 searches per day"
- Feature 2: "✓ Google & YouTube keywords"
- Feature 3: "✓ Basic search volume data"
- Feature 4: "✓ CSV export"
- Feature 5: "✓ Email support"

**Pricing Tier 2: Pro (Recommended)**:
- Recommended badge: "MOST POPULAR"
- Plan name: "Pro"
- Plan description: "For professional marketers and agencies"
- Price: "$89"
- Billing period: "/month"
- CTA text: "Start Free Trial"
- Feature 1: "✓ 10,000 searches per day"
- Feature 2: "✓ All platforms (Google, YouTube, Amazon, etc.)"
- Feature 3: "✓ Advanced search volume & competition"
- Feature 4: "✓ Question-based keywords"
- Feature 5: "✓ Autocomplete suggestions"
- Feature 6: "✓ Competitor analysis"
- Feature 7: "✓ API access"
- Feature 8: "✓ Priority support"

**Pricing Tier 3: Business**:
- Plan name: "Business"
- Plan description: "For large teams and enterprises"
- Price: "$199"
- Billing period: "/month"
- CTA text: "Start Free Trial"
- Feature 1: "✓ Unlimited searches"
- Feature 2: "✓ All Pro features"
- Feature 3: "✓ White-label reports"
- Feature 4: "✓ Team collaboration (up to 10 users)"
- Feature 5: "✓ Advanced API limits"
- Feature 6: "✓ Custom integrations"
- Feature 7: "✓ Dedicated account manager"
- Feature 8: "✓ 24/7 phone support"

---

## FOLD 8: FAQ SECTION

### 🏆 BEST COMPONENT: FAQ Accordion
**Source**: Ubersuggest
**Score**: 17/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 4/5
- User Experience: 4/5

**Why Selected**: Clean accordion design with clear visual separation between items. Questions are written in natural language that users actually search for. Expand/collapse icons are obvious. Good mix of common questions about features, pricing, and technical details. Narrow max-width improves readability.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 900px (narrower for readability)
- Padding: 80px 48px
- Margin: 0 auto
- Background: White

**Section Headline**:
- Text-align: Center
- Margin-bottom: 16px

**Section Subheadline**:
- Text-align: Center
- Margin-bottom: 64px
- Line-height: 1.6
- Opacity: 0.8

**FAQ Container**:
- Display: Flex column
- Gap: 16px

**FAQ Item**:
- Border: 1px solid rgba(0,0,0,0.1)
- Border-radius: 8px
- Padding: 24px 28px
- Cursor: Pointer
- Transition: All 0.3s ease
- Background: White

**Question Container**:
- Display: Flex
- Justify-content: Space-between
- Align-items: Center
- Gap: 20px

**Question Text**:
- Flex-grow: 1
- Line-height: 1.5
- Font-weight: 600

**Expand Icon**:
- Width: 24px
- Height: 24px
- Flex-shrink: 0
- Transition: Transform 0.3s ease

**Answer Container**:
- Display: None (collapsed state represented)
- Padding-top: 16px
- Margin-top: 16px
- Border-top: 1px solid rgba(0,0,0,0.06)

**Answer Text**:
- Line-height: 1.7
- Opacity: 0.85

**Responsive Behavior**:
- Desktop (1440px+): Full layout as specified
- Tablet (768px-1439px): Same layout, padding 20px
- Mobile (<768px): Padding 16px, max-width 100%

**Interactive States**:
- Item hover: Border color darkens, slight background change
- Expanded state: Icon rotated 180deg

**Text Content**:

**Section Headline**: "Frequently Asked Questions"
**Section Subheadline**: "Everything you need to know about KeywordTool"

**FAQ 1**:
- Question: "What platforms does KeywordTool support?"
- Answer: "KeywordTool supports keyword research for Google, YouTube, Amazon, Instagram, Twitter, Pinterest, App Store, Google Play Store, and many other platforms. You can switch between platforms instantly to find the best keywords for each channel."

**FAQ 2**:
- Question: "How accurate is the search volume data?"
- Answer: "Our search volume data is sourced from Google Keyword Planner and multiple third-party data providers. We update our database regularly to ensure you get the most accurate and up-to-date information for your keyword research."

**FAQ 3**:
- Question: "Can I export my keyword lists?"
- Answer: "Yes! All plans include the ability to export your keyword lists to CSV format. You can export unlimited keywords and import them directly into your favorite SEO tools or spreadsheet applications."

**FAQ 4**:
- Question: "Do you offer a free trial?"
- Answer: "Absolutely! All paid plans come with a 7-day free trial. No credit card is required to start your trial. You'll have full access to all features during your trial period."

**FAQ 5**:
- Question: "What's the difference between Basic and Pro plans?"
- Answer: "The Pro plan includes 20x more daily searches (10,000 vs 500), access to all platforms, advanced competition data, question-based keywords, autocomplete suggestions, competitor analysis, and API access. It's designed for professional marketers who need comprehensive keyword research."

**FAQ 6**:
- Question: "Can I cancel my subscription anytime?"
- Answer: "Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period."

**FAQ 7**:
- Question: "Do you offer refunds?"
- Answer: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied with KeywordTool for any reason, contact our support team within 30 days of purchase for a full refund."

**FAQ 8**:
- Question: "Is there an API available?"
- Answer: "Yes! Our Pro and Business plans include API access. You can integrate KeywordTool's data directly into your applications, dashboards, or automated workflows. Full API documentation is available in your account."

---

## FOLD 9: FINAL CTA / CONVERSION SECTION

### 🏆 BEST COMPONENT: CTA Section Design
**Source**: Ahrefs
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 5/5
- Conversion Potential: 4/5
- User Experience: 4/5

**Why Selected**: Strong visual treatment with centered layout that draws focus. Compelling copy that reinforces value proposition. Prominent single CTA reduces decision fatigue. Supporting trust text below CTA addresses final objections. Clean design without distractions. Creates urgency without being pushy.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 100px 48px
- Text-align: Center
- Background: Light gray (#F9FAFB)

**Content Container**:
- Max-width: 700px
- Margin: 0 auto
- Display: Flex column
- Align-items: Center

**CTA Headline**:
- Margin-bottom: 20px
- Line-height: 1.2
- Max-width: 650px

**CTA Subheadline**:
- Margin-bottom: 40px
- Line-height: 1.6
- Opacity: 0.85
- Max-width: 550px

**CTA Button**:
- Padding: 18px 48px
- Border-radius: 8px
- Min-width: 220px
- Border: None
- Margin-bottom: 24px
- Height: 60px

**Supporting Text**:
- Margin-top: 24px
- Opacity: 0.7
- Max-width: 500px
- Font-size: 14px

**Responsive Behavior**:
- Desktop (1440px+): All elements centered
- Tablet (768px-1439px): Same layout, slightly reduced spacing
- Mobile (<768px): Full-width button (max 320px), padding 60px 24px

**Interactive States**:
- CTA hover: Transform scale(1.03), box-shadow increases
- CTA active: Transform scale(0.98)

**Text Content**:
- CTA Headline: "Ready to Find Better Keywords?"
- CTA Subheadline: "Join 10,000+ marketers growing their organic traffic with KeywordTool. Start your free trial today."
- CTA Button: "Get Started Free"
- Supporting text: "No credit card required • Free 7-day trial • Cancel anytime"

---

## FOLD 10: FOOTER

### 🏆 BEST COMPONENT: Footer Layout
**Source**: SEMrush
**Score**: 18/20
- Clarity: 5/5
- Visual Hierarchy: 4/5
- Conversion Potential: 4/5
- User Experience: 5/5

**Why Selected**: Exceptionally well-organized 4-column footer with clear categorization. Logo and brand description on left provides context. Link columns are clearly labeled. Social links are present but not overwhelming. Bottom bar with legal links is cleanly separated. Dark background creates good contrast with light page sections above.

### UI SPECIFICATIONS:

**Layout Structure**:
- Container: Full-width section
- Max-width: 1440px
- Padding: 64px 48px 32px 48px
- Background: Dark gray (#1F2937)
- Border-top: None

**Footer Grid**:
- Display: Grid
- Grid-template-columns: 2fr 1fr 1fr 1fr (logo column wider)
- Gap: 64px
- Margin-bottom: 64px

**Footer Column**:
- Display: Flex column
- Gap: 20px

**Column Headline**:
- Margin-bottom: 8px
- Line-height: 1.3
- Font-weight: 600
- Color: White

**Footer Link**:
- Display: Block
- Line-height: 2
- Opacity: 0.7
- Transition: Opacity 0.2s ease
- Color: Light gray

**Logo Column** (first column):
- Display: Flex column
- Gap: 20px

**Footer Logo**:
- Font-size: 24px
- Font-weight: 700
- Margin-bottom: 16px
- Color: White

**Footer Description**:
- Line-height: 1.7
- Opacity: 0.7
- Max-width: 320px
- Color: Light gray

**Social Links Container**:
- Display: Flex
- Gap: 16px
- Margin-top: 24px

**Social Icon**:
- Width: 36px
- Height: 36px
- Display: Flex
- Align-items: Center
- Justify-content: Center
- Border-radius: 50%
- Background: rgba(255,255,255,0.1)
- Transition: All 0.3s ease

**Footer Bottom**:
- Border-top: 1px solid rgba(255,255,255,0.1)
- Padding-top: 32px
- Display: Flex
- Justify-content: Space-between
- Align-items: Center
- Flex-wrap: Wrap
- Gap: 20px

**Copyright Text**:
- Opacity: 0.6
- Color: Light gray

**Legal Links**:
- Display: Flex
- Gap: 32px
- Flex-wrap: Wrap

**Legal Link**:
- Opacity: 0.6
- Transition: Opacity 0.2s ease
- Color: Light gray

**Responsive Behavior**:
- Desktop (1440px+): 4-column grid
- Tablet (768px-1439px): 2-column grid, logo spans full width on first row
- Mobile (<768px): Single column stacked, all columns full-width

**Interactive States**:
- Link hover: Opacity 1
- Social icon hover: Background opacity 0.2, slight scale

**Text Content**:

**Logo Column**:
- Logo: "KeywordTool"
- Description: "The best keyword research tool for SEO, content marketing, and competitive analysis. Trusted by over 10,000 marketers worldwide."

**Column 1: Product**:
- Headline: "Product"
- Link 1: "Features"
- Link 2: "Pricing"
- Link 3: "API"
- Link 4: "Integrations"
- Link 5: "Changelog"

**Column 2: Company**:
- Headline: "Company"
- Link 1: "About Us"
- Link 2: "Blog"
- Link 3: "Careers"
- Link 4: "Contact"
- Link 5: "Press Kit"

**Column 3: Resources**:
- Headline: "Resources"
- Link 1: "Help Center"
- Link 2: "Tutorials"
- Link 3: "API Documentation"
- Link 4: "Community"
- Link 5: "Status"

**Social Links**:
- Platform 1: Twitter
- Platform 2: LinkedIn
- Platform 3: Facebook
- Platform 4: YouTube

**Footer Bottom**:
- Copyright: "© 2024 KeywordTool. All rights reserved."
- Legal link 1: "Privacy Policy"
- Legal link 2: "Terms of Service"
- Legal link 3: "Cookie Policy"

---

## COMPONENT SUMMARY

### Total Folds Analyzed: 10
### Best Components Selected: 10 (one per fold)

**Component Selection Overview:**
1. **Navigation/Header**: From Ahrefs (18/20)
2. **Hero Section**: From SEMrush (19/20)
3. **Value Proposition/Benefits**: From Ubersuggest (18/20)
4. **Features Showcase**: From Ahrefs (19/20)
5. **Social Proof/Testimonials**: From SEMrush (18/20)
6. **How It Works/Process**: From AnswerThePublic (17/20)
7. **Pricing**: From Moz (19/20)
8. **FAQ Section**: From Ubersuggest (17/20)
9. **Final CTA**: From Ahrefs (18/20)
10. **Footer**: From SEMrush (18/20)

**Average Score**: 18.1/20 - Exceptional quality components selected

---

## HIGH-FIDELITY SVG WIREFRAME GENERATION COMMAND

Generate a high-fidelity SVG wireframe (1440px × auto height) with the following specifications:

1. **Canvas & Structure**:
   - 1440px width, height calculated as ~4800px total
   - All filters and gradients in <defs> section (brandGradient, elevationLow, elevationMedium, elevationHigh, brandShadow)
   - Proper <g> grouping with IDs for each section
   - Page background: #FCFCFD

2. **Design System Application**:
   - Brand gradient (#FF5722 → #F4511E) on all primary CTAs
   - Elevation shadows: elevationLow (nav), elevationMedium (cards), elevationHigh (hero images, recommended pricing card)
   - Brand shadow (orange glow) on primary CTA buttons
   - Typography: Inter font family throughout
   - Section backgrounds alternate: White → #F9FAFB → White → #F9FAFB pattern

3. **Content from Analysis Above**:
   - Use EXACT text content from each winning component specification
   - Include all headlines, descriptions, CTAs, feature lists, testimonials, FAQ questions
   - Screenshot placeholders with descriptions
   - All trust elements, social proof numbers, pricing details

4. **Layout & Components**:
   - Navigation: height 80px, logo left, nav center, CTA right
   - Hero: 2-column grid (content left 600px, visual right 540px), height 700px
   - Benefits: 3-column card grid, 360px wide cards, 32px gap
   - Features: Alternating 2-column (visual/content swap), 80px gap between features
   - Social Proof: 3 testimonial cards, 360px wide, 5-star ratings
   - Pricing: 3 pricing tiers, middle card highlighted with scale(1.05) and brand border
   - FAQ: Centered 900px max-width, accordion items stacked
   - Final CTA: Centered content, single large CTA button
   - Footer: 4-column grid (2fr 1fr 1fr 1fr), dark background #1F2937

5. **Quality Standards**:
   - All spacing in 8px increments
   - Proper text wrapping with <tspan> and dy values
   - Border radius: 8px (buttons), 12px (cards), 50% (circles)
   - Colors from design system only (no random colors)
   - Icon emojis at 32px for benefits cards
   - Checkmarks (✓) in green (#10B981) at 16-18px
   - Professional shadows on all elevated elements

Output filename: keywordtool-landing-page-hifi.svg
