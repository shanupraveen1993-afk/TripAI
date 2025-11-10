# UNIVERSAL WIREFRAME GENERATOR
## AI-Powered UI-Consistent Wireframes with Design System

**Purpose:** Generate 6-10 strategically-selected, UI-consistent wireframes by analyzing competitors and applying your design system.

**Key Features:**
- ✅ UI Consistency enforced across ALL screens
- ✅ Design system compliance (claude.md)
- ✅ AI determines optimal screen count (6-10 based on tool complexity)
- ✅ Component library included (shows all design system elements)
- ✅ Mobile variants for responsive design
- ✅ Quality over quantity approach

---

## 📥 INPUT (Fill This Only)

```yaml
# ============================================
# TOOL DEFINITION
# ============================================
TOOL_NAME: "Rank Tracker"
TOOL_PURPOSE: "Track keyword rankings for added apps on iOS and Android store"
TOOL_CATEGORY: "ASO"  # Options: SEO/ASO/Analytics/Marketing/Social

# ============================================
# DESIGN SYSTEM (Auto-loaded from claude.md)
# ============================================
DESIGN_SYSTEM_PATH: /home/coder/Praveen/SEO/Research/test3/claude.md

# Design System Key Values:
# - Brand Color: #FF5722
# - Font: Inter
# - Button Height: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
# - Card Padding: 24px
# - Border Radius: 12px (lg), 16px (xl), 20px (2xl)
# - Spacing: 4pt grid (4px, 8px, 12px, 16px, 24px, 32px, 48px)
# - Typography: Display 57px, Headline 32px, Title 22px, Body 16px, Label 14px
# - Component Classes: .btn-filled, .btn-outlined, .card, .table, .modal, etc.

# ============================================
# OUTPUT SETTINGS
# ============================================
OUTPUT_FOLDER: /home/coder/Praveen/SEO/Research/test3/wireframes
FILE_FORMAT: "SVG"  # High-fidelity SVG wireframes with design system styling
CANVAS_SIZE: "1440x900"  # Desktop viewport (mobile: 375x812)
save as rank1,rank2, rank3.... on coder/Praveen/SEO/Research/test3 as svg
```

---

## 🤖 STEP 1: AUTO-DISCOVER COMPETITORS (AI Task)

### **AI executes web search:**

```
Search Query: "[TOOL_NAME] [TOOL_CATEGORY] competitors 2025"
Example: "Rank Tracker ASO competitors 2025"

Expected Results (AI selects top 3-6):
1. [Competitor Name] - [URL to exact tool page]
2. [Competitor Name] - [URL to exact tool page]
3. [Competitor Name] - [URL to exact tool page]
```

**AI Output:**
```yaml
DISCOVERED_COMPETITORS:
  - NAME: "AppTweak"
    URL: "https://www.apptweak.com/aso-tools/rank-tracker"
    CATEGORY: "ASO"

  - NAME: "MobileAction"
    URL: "https://www.mobileaction.co/rank-tracker"
    CATEGORY: "ASO"

  - NAME: "AppFollow"
    URL: "https://appfollow.io/rank-tracking"
    CATEGORY: "ASO"
```

---

## 🔍 STEP 2: FEATURE EXTRACTION (AI Analyzes Each Competitor)

**CRITICAL**: Focus on FEATURES, not pixel measurements

### **Template for Each Competitor:**

```markdown
## COMPETITOR: [Name]
URL: [URL]

---

### 1. LANDING PAGE FEATURES

**Value Propositions:**
- Main headline: "[Extract exact text]"
- Subheadline: "[Extract exact text]"
- Unique selling points:
  1. [Feature 1: e.g., "Track rankings in 150+ countries"]
  2. [Feature 2: e.g., "Real-time updates every hour"]
  3. [Feature 3: e.g., "AI-powered keyword suggestions"]

**Social Proof:**
- Customer count: [e.g., "10,000+ developers"]
- Company logos: [Count + notable companies: e.g., "5 logos (Uber, Spotify)"]
- Testimonials: [Present Y/N, count if yes]

**Trial/Pricing Offer:**
- Free trial: [e.g., "7-day free trial"]
- Credit card required: [Yes/No]
- Starting price: [e.g., "$49/month" or "Free forever"]

**Key Features Highlighted:**
1. [Feature name] - [Description]
2. [Feature name] - [Description]
3. [Feature name] - [Description]
4. [Feature name] - [Description]

**Call-to-Action:**
- Primary CTA text: "[e.g., 'Start Free Trial']"
- Secondary CTA text: "[e.g., 'View Pricing' or 'Watch Demo']"

---

### 2. SIGNUP / LOGIN FEATURES

**Authentication Methods:**
- Social OAuth: [Google Y/N, LinkedIn Y/N, GitHub Y/N]
- Email/Password: [Y/N]
- SSO: [Y/N, for enterprise]

**Form Fields:**
- Required fields: [List: email, password, name, company, etc.]
- Optional fields: [List if any]
- Password requirements: [e.g., "8+ characters, 1 uppercase, 1 number"]

**Password Features:**
- Show/hide toggle: [Y/N]
- Strength indicator: [Y/N, levels: weak/medium/strong]
- Forgot password link: [Y/N]

**Terms & Privacy:**
- Checkbox required: [Y/N]
- Links inline: [Y/N]

**Success Flow:**
- Redirect to: [Dashboard / Onboarding / Email verification]

---

### 3. ONBOARDING / PROJECT SETUP FEATURES

**Onboarding Steps:**
- Total steps: [Count: 2/3/4/5]
- Step 1: [What info collected - e.g., "Project name and app URL"]
- Step 2: [What info collected - e.g., "Select competitors"]
- Step 3: [What info collected - e.g., "Add keywords to track"]
- Step 4: [What info collected if applicable]

**Skip Option:**
- Skip available: [Y/N]
- Skip button text: "[e.g., 'Skip for now' or 'Do this later']"

**Progress Indicator:**
- Type: [Dots / Progress bar / Step numbers / Breadcrumb]

**Completion:**
- Final CTA: "[e.g., 'Go to Dashboard' or 'Start Tracking']"

---

### 4. GLOBAL DASHBOARD FEATURES

**Navigation:**
- Type: [Sidebar left / Top nav / Hybrid]
- Menu items: [List all: Dashboard, Projects, Keywords, Reports, Settings, etc.]
- Collapsible: [Y/N for sidebar]

**Key Metrics (KPI Cards):**
- Metric 1: [Name + description, e.g., "Total Keywords - 245 tracked"]
- Metric 2: [Name + description, e.g., "Avg Rank - 12.5 (↑2.3)"]
- Metric 3: [Name + description, e.g., "Top 10 Keywords - 48 ranking"]
- Metric 4: [Name + description, e.g., "Visibility Score - 78/100"]
- Layout: [Grid columns: 2/3/4, or row layout]

**Recent Activity:**
- Display type: [Table / Cards / Timeline / List]
- Data shown: [e.g., "Last 5 rank changes with keyword name, old rank → new rank"]
- Item count: [5 / 10 / Infinite scroll]

**Quick Actions:**
- Action 1: [e.g., "Add New Keyword" button in header]
- Action 2: [e.g., "Export All Data" button]
- Action 3: [e.g., "Create Report" button]

**Empty State (if new user):**
- Message: "[Extract message: e.g., 'No keywords tracked yet']"
- CTA: "[e.g., 'Add Your First Keyword']"
- Illustration/Icon: [Present Y/N]

---

### 5. TOOL DASHBOARD (MODULE OVERVIEW) FEATURES

**Page Elements:**
- Page title: [e.g., "Rank Tracking"]
- Breadcrumbs: [Y/N, example: "Dashboard > Rank Tracking"]
- Description: [Y/N, example text if present]

**Filters & Controls:**
- Filter 1: [Name + type, e.g., "Country - Dropdown (150 countries)"]
- Filter 2: [Name + type, e.g., "Date Range - Date picker (last 7/30/90 days)"]
- Filter 3: [Name + type, e.g., "Keyword Group - Multi-select dropdown"]
- Filter 4: [Name + type if present]
- Filter position: [Top bar / Left sidebar / Collapsible drawer]
- Apply button: [Required Y/N or real-time filtering]

**Visualization:**
- Chart type: [Line / Bar / Area / Heatmap / Mixed]
- Chart shows: [e.g., "Rank over time for selected keyword"]
- Tabs/toggles: [Y/N, options: e.g., "7 days / 30 days / 90 days"]
- Interactive: [Hover tooltip Y/N, click to filter Y/N, zoom Y/N]

**Summary Metrics (above/below chart):**
- Metric 1: [e.g., "Current Rank: #5"]
- Metric 2: [e.g., "Best Rank: #1 (2 weeks ago)"]
- Metric 3: [e.g., "Change: ↑3 positions (vs last week)"]

**Actions Toolbar:**
- Action 1: [e.g., "Export" button]
- Action 2: [e.g., "Add Keyword" button]
- Action 3: [e.g., "Refresh Data" icon button]
- Position: [Top right / Above table / Inline]

---

### 6. DATA TABLE VIEW (UNIVERSAL LAYOUT) FEATURES

**Table Structure:**
- Columns:
  1. [Column name + data type, e.g., "Keyword - Text, clickable"]
  2. [Column name + data type, e.g., "Current Rank - Number with badge (#1-10 green, #11-50 yellow)"]
  3. [Column name + data type, e.g., "Change - Number with arrow (↑↓→)"]
  4. [Column name + data type, e.g., "Search Volume - Number formatted (12.5K)"]
  5. [Column name + data type, e.g., "Country - Flag icon + code"]
  6. [Column name + data type, e.g., "Last Updated - Relative time (2h ago)"]
  7. [Actions column - 3-dot menu / icon buttons]

**Sorting:**
- Sortable columns: [List which columns, e.g., "Rank, Change, Volume, Date"]
- Default sort: [e.g., "Rank ascending"]
- Sort indicator: [Arrow icon up/down in header]

**Row Actions:**
- Action 1: [e.g., "Edit" - opens edit modal]
- Action 2: [e.g., "Delete" - shows confirmation]
- Action 3: [e.g., "View History" - navigates to detail page]
- Action 4: [e.g., "Set Alert" - opens alert config]
- Menu type: [Dropdown (3-dot) / Icon buttons inline / Right-click context menu]

**Bulk Actions:**
- Bulk select: [Checkbox column Y/N]
- Select all: [Checkbox in header Y/N]
- Bulk actions available:
  1. [e.g., "Export Selected"]
  2. [e.g., "Delete Selected"]
  3. [e.g., "Add to Group"]
  4. [e.g., "Set Alerts for Selected"]
- Bulk toolbar: [Appears when items selected, position: top/bottom]

**Pagination:**
- Type: [Page numbers / Prev-Next only / Infinite scroll / Load more button]
- Rows per page: [Options: 10/25/50/100 or fixed]
- Position: [Bottom center / Bottom right]
- Total count shown: [Y/N, e.g., "Showing 1-25 of 245"]

**Search/Filter:**
- Search box: [Y/N, placeholder: e.g., "Search keywords..."]
- Quick filters: [Y/N, chips above table for active filters]
- Advanced filters: [Button/link opens filter drawer]

---

### 7. DETAIL VIEW PAGE (ENTITY DEEP DIVE) FEATURES

**Page Header:**
- Entity name: [e.g., Keyword name as H1]
- Metadata: [e.g., "Added on Jan 15, 2025 • Last checked 2h ago"]
- Back button: [Y/N, text: "← Back to Keywords"]
- Actions: [List: Edit / Delete / Duplicate / Share]

**Navigation (Tabs/Sections):**
- Tab 1: [e.g., "Overview" - shows summary metrics + chart]
- Tab 2: [e.g., "History" - shows full rank history table]
- Tab 3: [e.g., "Competitors" - shows who else ranks for this keyword]
- Tab 4: [e.g., "Alerts" - configure rank change notifications]
- Tab type: [Horizontal tabs / Vertical sidebar / Accordion sections]

**Main Content:**
- Visualization: [e.g., "Line chart showing rank over 90 days"]
- Data table: [e.g., "Daily rank snapshots with date, rank, change"]
- Related data: [e.g., "Top 10 apps ranking for this keyword"]

**Insights/Analysis:**
- Insights provided: [Y/N, examples: "Your rank improved by 5 positions this week"]
- Recommendations: [Y/N, examples: "Update your app description to improve rank"]

---

### 8. COMPARISON VIEW (A vs B ANALYSIS) FEATURES

**Comparison Setup:**
- Entity selector 1: [Type: Dropdown / Search / Autocomplete, label: "Select App A"]
- Entity selector 2: [Type: Dropdown / Search / Autocomplete, label: "Select App B"]
- Add more: [Y/N, can compare 3+ entities]
- Swap button: [Y/N, to swap A ↔ B]

**Comparison Layout:**
- Layout: [Side-by-side columns / Stacked / Tabbed]
- Responsive: [Mobile behavior: Tabs / Vertical stack / Swipe]

**Metrics Compared:**
1. [Metric name, e.g., "Current Rank" - shows side-by-side with winner highlighted]
2. [Metric name, e.g., "Rank Change (30d)" - shows comparison with arrows]
3. [Metric name, e.g., "Visibility Score" - shows with progress bars]
4. [Metric name, e.g., "Keywords Ranking" - shows count comparison]

**Visual Comparison:**
- Chart type: [Overlaid lines / Side-by-side bars / Dual-axis]
- Color coding: [App A color, App B color, e.g., "Blue vs Orange"]
- Legend: [Position: Top / Bottom / Inline]

**Winner Indicators:**
- Highlight method: [Green checkmark / Badge "Winner" / Bold text / Background color]
- Show differences: [Absolute numbers / Percentages / Both]

**Export Comparison:**
- Export option: [Y/N, format: PDF report / CSV / Screenshot]

---

### 9. FILTER DRAWER / SIDEBAR PANEL FEATURES

**Trigger:**
- Button text: "[e.g., 'Filters' or 'Advanced Filters' or icon only]"
- Icon: [Funnel icon / Sliders icon / Filter icon]
- Position: [Toolbar / Top right / Inline with search]
- Badge: [Shows active filter count Y/N]

**Drawer Behavior:**
- Slide from: [Right / Left / Bottom (mobile)]
- Width: [320px / 400px / 50% screen]
- Overlay: [Dark backdrop Y/N]
- Close on apply: [Y/N]

**Filter Types:**
1. **[Filter name]**
   - Control type: [Dropdown / Checkboxes / Radio / Range slider / Date picker]
   - Options: [List options or range, e.g., "Countries: All 150 countries listed"]
   - Multi-select: [Y/N]
   - Search within: [Y/N, if long list like countries]

2. **[Filter name]**
   - Control type: [...]
   - Options: [...]

3. **[Filter name]**
   - Control type: [...]
   - Options: [...]

[List all available filters]

**Active Filters Display:**
- Location: [Chips above results / Inside drawer / Both]
- Style: [Chips/pills with X to remove]
- Clear all: [Button text: "Clear All Filters" or "Reset"]

**Actions:**
- Apply button: [Text: "Apply Filters" / "Show Results"]
- Cancel/Close: [X icon / "Cancel" button / click outside]
- Reset: [Text: "Reset" / "Clear All", clears all filters to default]

---

### 10. ADD / MANAGE DATA POPUP FEATURES

**Modal Title:**
- Title: [e.g., "Add New Keyword" / "Edit Keyword" / "Import Keywords"]

**Form Fields:**
1. **[Field name]**
   - Type: [Text input / Dropdown / Multi-select / Date / Number / Toggle / Radio]
   - Required: [Y/N]
   - Placeholder: "[example text]"
   - Validation: [e.g., "Required" / "Must be valid URL" / "Max 100 characters"]
   - Help text: [e.g., "Enter the keyword you want to track"]

2. **[Field name]**
   - Type: [...]
   - Required: [...]
   - Placeholder: [...]
   - Validation: [...]

[List all form fields]

**File Upload (if applicable):**
- Upload method: [Button "Choose File" / Drag-drop zone / Both]
- File types: [e.g., "CSV, Excel (.xlsx)"]
- Max size: [e.g., "10 MB"]
- Preview: [Shows file name + size after upload Y/N]
- Bulk import: [Y/N, upload CSV to add multiple items]

**Form Layout:**
- Columns: [Single column / Two columns]
- Field grouping: [Sections with headings Y/N]

**Actions:**
- Primary button: [Text: "Save" / "Add" / "Update" / "Import"]
- Secondary button: [Text: "Cancel" / "Save Draft"]
- Delete button: [Y/N, text: "Delete", shown for edit mode]
- Loading state: [Button shows spinner + "Saving..." text]

**Validation:**
- Timing: [Real-time / On blur / On submit]
- Error display: [Red text below field / Red border + icon / Both]
- Success: [Green checkmark / Success message / Auto-close modal]

---

### 11. EXPORT / REPORT POPUP FEATURES

**Modal Title:**
- Title: [e.g., "Export Data" / "Generate Report" / "Download Results"]

**Format Selector:**
- Formats available:
  1. CSV [Y/N]
  2. Excel (.xlsx) [Y/N]
  3. PDF [Y/N]
  4. JSON (API) [Y/N]
  5. Google Sheets [Y/N]
- Selection type: [Radio buttons / Buttons / Dropdown]
- Default: [e.g., "CSV"]

**Column Selector:**
- Title: [e.g., "Select Columns to Export"]
- Selection UI: [Checkboxes / Multi-select dropdown / Drag-drop list]
- Layout: [Single column / Two columns]
- Select all: [Checkbox / Button]
- Columns listed: [All available columns from table]

**Row Selector:**
- Options:
  1. All results [Radio, shows count: e.g., "All results (1,234 rows)"]
  2. Filtered results [Radio, shows count: e.g., "Filtered results (456 rows)"]
  3. Selected rows [Radio, shows count: e.g., "Selected rows (12)"]
  4. Custom range [Radio + inputs: "From row X to row Y"]
- Default: [Which option pre-selected]

**Date Range (if applicable):**
- Presets: [Last 7 days / Last 30 days / Last 90 days / All time / Custom]
- Custom date picker: [Start date + End date]

**Additional Options:**
- Include chart/visualization: [Checkbox Y/N]
- Include summary statistics: [Checkbox Y/N]
- Email delivery: [Checkbox Y/N, input for email address]
- Schedule export: [Checkbox Y/N, frequency: Daily/Weekly/Monthly]

**Actions:**
- Export button: [Text: "Export" / "Download" / "Generate"]
- Loading state: [Progress bar 0-100% / Spinner + "Generating..."]
- Cancel button: [Text: "Cancel"]

**Success State:**
- Display: [Toast notification / Full modal screen / Inline message]
- Message: [e.g., "Your export is ready!"]
- Download: [Auto-download Y/N / Download button / Email sent confirmation]
- File info: [Shows file name, size, format]

**Limit Reached (Free Tier):**
- Trigger: [e.g., "Export limit reached (10/10 this month)"]
- Message: [Clear explanation of limit]
- Upgrade CTA: [Button text: "Upgrade to Pro" / "View Plans"]
- Redirect: [To pricing page / Opens upgrade modal]

---

### 12. UPGRADE / PAYWALL MODAL FEATURES

**Trigger Reasons:**
1. [e.g., "Export limit reached (10/month for free)"]
2. [e.g., "Keyword limit reached (25 for free)"]
3. [e.g., "Feature access blocked (API access, Pro only)"]
4. [e.g., "Search limit reached (100/month for free)"]
5. [e.g., "Team seats required (Enterprise only)"]

**Modal Title:**
- Title: [e.g., "Upgrade to Pro" / "Unlock Premium Features"]

**Limit Message:**
- Message: [e.g., "You've reached your monthly export limit (10/10)"]
- Context: [e.g., "Upgrade to Pro for unlimited exports"]

**Plan Comparison:**
- Layout: [Side-by-side cards / Stacked / Table]
- Plans shown: [Free vs Pro / Free vs Pro vs Enterprise]

**Current Plan (Free):**
- Features listed:
  1. [Feature + limit, e.g., "100 searches/month" ✓]
  2. [Feature + limit, e.g., "25 tracked keywords" ✓]
  3. [Feature + limit, e.g., "10 exports/month" ✓]
  4. [Locked feature, e.g., "API access" ✗]
  5. [Locked feature, e.g., "Email alerts" ✗]
- Icon for locked: [✗ / 🔒 / Grayed out]

**Target Plan (Pro):**
- Price: [e.g., "$49/month" / "$490/year (save 15%)"]
- Features listed:
  1. [Feature, e.g., "Unlimited searches" ✓]
  2. [Feature, e.g., "500 tracked keywords" ✓]
  3. [Feature, e.g., "Unlimited exports" ✓]
  4. [Feature, e.g., "API access" ✓]
  5. [Feature, e.g., "Email + Slack alerts" ✓]
- Highlight: [Border color / Glow shadow / Badge "Most Popular"]
- Icon for included: [✓ / ✔ / Green checkmark]

**Benefits Highlight:**
- Additional benefits:
  1. [e.g., "Priority support"]
  2. [e.g., "Advanced analytics"]
  3. [e.g., "Custom reports"]

**CTA:**
- Button text: [e.g., "Upgrade to Pro" / "Start 7-Day Trial" / "Unlock Now"]
- Button style: [Primary / Large / Brand color]
- Secondary link: [e.g., "View all plans" / "Compare plans"]

**Trust Elements:**
- Trial info: [e.g., "7-day free trial" / "Cancel anytime"]
- Payment info: [e.g., "No credit card required" / "Secure payment"]
- Money-back: [e.g., "30-day money-back guarantee"]

**Dismiss:**
- Close option: [X icon / "Maybe later" link / "Continue with Free"]
- Tracking: [Track dismissal for analytics]

---

### 13. SETTINGS PAGE (ACCOUNT & PREFERENCES) FEATURES

**Navigation:**
- Layout: [Tab navigation / Sidebar sections / Accordion]
- Tabs/Sections:
  1. [e.g., "Profile"]
  2. [e.g., "Account"]
  3. [e.g., "Notifications"]
  4. [e.g., "Integrations"]
  5. [e.g., "Security"]
  6. [e.g., "Billing" - or separate page]
  7. [e.g., "Team" - or separate page]

---

**PROFILE SECTION:**
- Avatar: [Upload Y/N, size limit, supported formats]
- Name: [Text input, editable Y/N]
- Email: [Text input, editable Y/N, requires verification Y/N]
- Company: [Text input, optional Y/N]
- Role/Title: [Text input, optional Y/N]
- Bio: [Textarea, optional Y/N, char limit]
- Save button: [Text: "Save Changes" / "Update Profile"]

---

**ACCOUNT SECTION:**
- Username: [Editable Y/N]
- Account type: [Display only: Free/Pro/Enterprise]
- Account created: [Display only: date]
- Account ID: [Display only: for support reference]
- Language: [Dropdown: English/Spanish/French/etc.]
- Timezone: [Dropdown: all timezones]
- Delete account: [Button/link, confirmation required]

---

**NOTIFICATIONS SECTION:**
- Email notifications:
  1. [Toggle: "Rank change alerts" - description: "Get notified when rank drops"]
  2. [Toggle: "Weekly summary" - description: "Receive weekly performance report"]
  3. [Toggle: "Product updates" - description: "New features and announcements"]
  4. [Toggle: "Marketing emails" - description: "Tips and best practices"]

- Slack notifications (if integrated):
  1. [Toggle: "Rank alerts"]
  2. [Toggle: "Daily summary"]
  3. [Channel selector: Dropdown or input]

- Webhook notifications (Pro+):
  1. [Toggle: "Enable webhooks"]
  2. [Input: Webhook URL]
  3. [Events selector: Checkboxes for which events to send]

- Notification frequency:
  - [Radio: Instant / Hourly digest / Daily digest / Weekly only]

---

**INTEGRATIONS SECTION:**
- Available integrations:
  1. [e.g., "Google Analytics" - Connect button / Connected status + Disconnect]
  2. [e.g., "Slack" - Connect button / Connected status]
  3. [e.g., "Zapier" - Connect button / API key shown]
  4. [e.g., "Webhook" - Configure button]
- Each integration shows:
  - Icon + name
  - Description: [Short description of what it does]
  - Status: [Not connected / Connected / Connected as [email]]
  - Action button: [Connect / Configure / Disconnect]

---

**SECURITY SECTION:**
- Change password:
  - Current password: [Input, password type]
  - New password: [Input, password type, strength indicator]
  - Confirm new password: [Input, password type]
  - Submit button: [Text: "Change Password"]

- Two-factor authentication:
  - Status: [Enabled / Disabled]
  - Toggle: [Enable 2FA / Disable 2FA]
  - Method: [Authenticator app / SMS / Email]
  - Setup flow: [QR code + backup codes if authenticator]

- Active sessions:
  - Table showing: [Device, Location, IP, Last active, Revoke button]
  - Current session: [Highlighted, "This device"]

- API keys (Pro+):
  - List of keys: [Name, Created, Last used, Revoke button]
  - Create new key: [Button, opens modal with name input]
  - Key display: [Shows once, copy button, regenerate option]

---

**PREFERENCES SECTION:**
- Theme: [Light / Dark / Auto (system)]
- Date format: [MM/DD/YYYY / DD/MM/YYYY / YYYY-MM-DD]
- Number format: [1,234.56 / 1.234,56 / 1 234,56]
- Default page: [Dropdown: Dashboard / Keywords / Reports]
- Rows per page: [Dropdown: 10/25/50/100]
- Export default format: [Dropdown: CSV/Excel/PDF]

---

### 14. BILLING & SUBSCRIPTION PAGE FEATURES

**Current Plan Card:**
- Plan name: [e.g., "Free" / "Pro" / "Enterprise"]
- Price: [e.g., "$49/month" / "$490/year"]
- Billing cycle: [Monthly / Yearly]
- Next billing date: [e.g., "Renews on Feb 15, 2025"]
- Status: [Active / Trial / Canceled / Past due]

**Usage Indicators:**
- Usage 1: [e.g., "Searches: 78/100 this month" - progress bar]
- Usage 2: [e.g., "Keywords: 23/25 tracked" - progress bar]
- Usage 3: [e.g., "Exports: 8/10 this month" - progress bar]
- Warning: [Shows if usage > 80%, e.g., "You're close to your limit. Upgrade?"]

**Plan Actions:**
- Upgrade button: [Text: "Upgrade Plan" / "View Plans"]
- Change plan: [Button/link to pricing page]
- Cancel subscription: [Link/button: "Cancel Subscription"]
- Cancel flow: [Confirmation modal + feedback form + retention offer]

**Payment Method:**
- Card displayed: [Last 4 digits, brand (Visa/Mastercard), expiry]
- Update button: [Text: "Update Payment Method"]
- Update flow: [Opens Stripe/payment modal]
- Remove option: [Y/N]

**Billing History:**
- Display: [Table / List]
- Columns:
  1. Date [e.g., "Jan 15, 2025"]
  2. Description [e.g., "Pro Plan - Monthly"]
  3. Amount [e.g., "$49.00"]
  4. Status [Paid / Failed / Refunded - badge]
  5. Invoice [Download link / View button]
- Pagination: [If more than 12 invoices]
- Download all: [Button to download all invoices]

**Billing Details:**
- Company name: [Editable input]
- VAT/Tax ID: [Input, optional]
- Billing address: [Multi-line input]
- Country: [Dropdown]
- Save button: [Text: "Update Billing Details"]

**Payment History:**
- Total spent: [e.g., "$588 since joining"]
- First payment: [Date]
- Payment method history: [List of previous cards used]

---

### 15. TEAM MANAGEMENT PAGE FEATURES

**Invite Section:**
- Email input: [Text input, placeholder: "colleague@company.com"]
- Role selector: [Dropdown: Admin / Editor / Viewer / Custom]
- Role descriptions:
  - Admin: [e.g., "Full access, can manage team and billing"]
  - Editor: [e.g., "Can add/edit data, no admin access"]
  - Viewer: [e.g., "Read-only access"]
- Message input: [Optional, textarea: "Add a personal message"]
- Send button: [Text: "Send Invite" / "Invite Team Member"]
- Bulk invite: [Upload CSV option Y/N]

**Team Members Table:**
- Columns:
  1. Name [Avatar + name]
  2. Email [email address]
  3. Role [Badge: Admin/Editor/Viewer]
  4. Status [Active / Invited / Suspended]
  5. Last active [Relative time: "2h ago" / "Never" if invited]
  6. Actions [Edit role / Remove / Resend invite]
- Sorting: [By name, role, last active]
- Search: [Search by name or email]

**Member Actions (3-dot menu or inline):**
- Change role: [Opens dropdown to select new role]
- Suspend/Activate: [Toggle user access without removing]
- Remove from team: [Confirmation: "Are you sure? This cannot be undone."]
- Resend invite: [For pending invites, sends new email]

**Pending Invites Section:**
- Separate table or section: [Shows invited but not accepted]
- Columns:
  1. Email
  2. Role
  3. Invited on [Date]
  4. Expires [Date or "in 7 days"]
  5. Actions [Resend / Cancel invite]

**Roles & Permissions:**
- Roles list: [Admin / Editor / Viewer]
- Permission matrix: [Table showing what each role can do]
- Custom roles: [Available Y/N, for Enterprise plans]
- Edit permissions: [Button to customize role permissions]

**Team Limits:**
- Current count: [e.g., "3 / 5 team members"]
- Plan limit: [e.g., "Free: 1 seat / Pro: 5 seats / Enterprise: Unlimited"]
- Upgrade prompt: [If limit reached, link to upgrade]

**Activity Log:**
- Team activity feed: [Who did what, when]
- Example entries:
  - "John invited Sarah as Editor - 2h ago"
  - "Sarah accepted invite - 1h ago"
  - "Mike changed role to Admin - Yesterday"
- Filter: [By member, by action type, by date range]

---

### 16. TOAST / SNACKBAR NOTIFICATIONS FEATURES

**Notification Types:**

**SUCCESS:**
- Background color: [hex code]
- Icon: [Checkmark / ✓ / ✔]
- Example messages:
  1. "[e.g., 'Keyword saved successfully']"
  2. "[e.g., 'Export ready for download']"
  3. "[e.g., 'Settings updated']"
- Duration: [3s / 5s / Manual dismiss]
- Action button: [Y/N, e.g., "View" or "Download"]

**ERROR:**
- Background color: [hex code]
- Icon: [X / ✗ / Error icon]
- Example messages:
  1. "[e.g., 'Failed to save keyword']"
  2. "[e.g., 'Export failed. Please try again.']"
  3. "[e.g., 'Something went wrong']"
- Duration: [5s / Manual dismiss only]
- Action button: [Y/N, e.g., "Retry" or "Contact Support"]

**WARNING:**
- Background color: [hex code]
- Icon: [⚠ / Warning triangle]
- Example messages:
  1. "[e.g., 'You're approaching your keyword limit (23/25)']"
  2. "[e.g., 'Session will expire in 5 minutes']"
  3. "[e.g., 'Some data may be outdated']"
- Duration: [5s / 7s]
- Action button: [Y/N, e.g., "Upgrade" or "Extend Session"]

**INFO:**
- Background color: [hex code]
- Icon: [ℹ / Info icon / 💡]
- Example messages:
  1. "[e.g., 'New feature available: Competitor tracking']"
  2. "[e.g., 'Data updated 5 minutes ago']"
  3. "[e.g., 'Tip: Use filters to narrow your search']"
- Duration: [5s / 7s]
- Action button: [Y/N, e.g., "Learn More" or "Dismiss"]

**PROGRESS:**
- Background color: [hex code]
- Icon: [Spinner / Loading icon]
- Example messages:
  1. "[e.g., 'Generating report... 45%']"
  2. "[e.g., 'Importing keywords... (23/100)']"
  3. "[e.g., 'Syncing data...']"
- Progress indicator: [Progress bar Y/N, percentage shown]
- Cancel option: [Y/N, button: "Cancel"]

---

**Toast Behavior:**
- Position: [Top-right / Top-center / Bottom-right / Bottom-center]
- Width: [360px / 400px / Auto / Full-width on mobile]
- Animation: [Slide from side / Fade in / Slide from top / Scale in]
- Stacking: [Multiple toasts stack Y/N, max count: 3/5/unlimited]
- Close button: [X icon Y/N, always visible / visible on hover]
- Auto-dismiss: [Y/N, duration varies by type]
- Pause on hover: [Y/N, timer pauses when hovering]
- Click to dismiss: [Y/N, entire toast clickable to close]

---

### 17. POPUP / CONFIRMATION DIALOGS FEATURES

**Dialog Types:**

**DELETE CONFIRMATION:**
- Icon: [Warning triangle / Trash icon / ⚠]
- Icon color: [Red / Orange]
- Title: "[e.g., 'Delete Keyword?']"
- Message: "[e.g., 'This will permanently delete \"app ranking\" from your tracked keywords. This action cannot be undone.']"
- Checkbox: [Optional, "Don't ask again" or "I understand this is permanent"]
- Buttons:
  - Destructive: [Text: "Delete" / "Remove", color: Red, position: Right]
  - Cancel: [Text: "Cancel", style: Secondary/ghost, position: Left]

**UNSAVED CHANGES:**
- Icon: [Info / Question mark / 💾]
- Title: "[e.g., 'Unsaved Changes']"
- Message: "[e.g., 'You have unsaved changes. Do you want to save before leaving?']"
- Buttons:
  - Primary: [Text: "Save Changes", position: Right]
  - Secondary: [Text: "Discard", position: Center]
  - Tertiary: [Text: "Cancel", position: Left]

**CONFIRMATION (Generic):**
- Icon: [Question mark / Info / ✓]
- Title: "[e.g., 'Are you sure?']"
- Message: "[e.g., 'This will apply changes to 12 keywords. Continue?']"
- Buttons:
  - Confirm: [Text: "Yes" / "Confirm" / "Continue", primary style]
  - Cancel: [Text: "No" / "Cancel", secondary style]

**SUCCESS CONFIRMATION:**
- Icon: [Checkmark / ✓, color: Green]
- Title: "[e.g., 'Success!']"
- Message: "[e.g., '12 keywords have been added to your tracking list.']"
- Buttons:
  - Primary: [Text: "View Keywords" / "Go to Dashboard"]
  - Secondary: [Text: "Add More" / "Done"]
- Auto-close: [Y/N, after 3s if no buttons]

**ERROR DIALOG:**
- Icon: [X / Error icon, color: Red]
- Title: "[e.g., 'Something Went Wrong']"
- Message: "[e.g., 'We couldn't process your request. Please try again or contact support if the problem persists.']"
- Error details: [Collapsible section Y/N, shows technical error code/message]
- Buttons:
  - Primary: [Text: "Retry" / "Try Again"]
  - Secondary: [Text: "Contact Support" / "Cancel"]

---

**Dialog Behavior:**
- Modal size: [Small: 400px / Medium: 480px / Large: 560px]
- Backdrop: [Dark overlay Y/N, opacity: 50%/60%]
- Close on outside click: [Y/N, depends on dialog type]
- Close on Escape key: [Y/N, depends on dialog type]
- Focus trap: [Y/N, prevents tabbing outside modal]
- Animation: [Fade + scale / Slide from top / Fade only]

---

### 18. EMPTY / LOADING / ERROR STATES FEATURES

---

**EMPTY STATES:**

**No Data Yet:**
- Illustration: [Style: Line art / 3D / Flat / Icon only]
- Illustration size: [120px / 160px / 200px]
- Illustration color: [Gray / Brand color / Multi-color]
- Heading: "[e.g., 'No keywords tracked yet']"
- Heading size: [20px / 24px / 28px]
- Subtext: "[e.g., 'Add your first keyword to start tracking rankings']"
- Subtext size: [14px / 16px]
- CTA button: [Text: "Add Keyword" / "Get Started", style: Primary]
- Secondary action: [Link: "Import from CSV" / "Learn More"]

**No Results Found:**
- Illustration: [Search icon / Empty box / Magnifying glass]
- Heading: "[e.g., 'No results found']"
- Subtext: "[e.g., 'Try adjusting your filters or search terms']"
- Suggestions:
  1. [e.g., "Clear all filters"]
  2. [e.g., "Try a different keyword"]
  3. [e.g., "Check your spelling"]
- CTA: [Button: "Clear Filters" / Link: "View All"]

**Access Denied:**
- Illustration: [Lock icon / 🔒]
- Heading: "[e.g., 'Access Restricted']"
- Subtext: "[e.g., 'This feature is only available on Pro plans']"
- CTA: [Button: "Upgrade to Pro", style: Primary]
- Secondary: [Link: "Learn More" / "View Plans"]

**Offline Mode:**
- Illustration: [Cloud with slash / WiFi off icon]
- Heading: "[e.g., 'You're Offline']"
- Subtext: "[e.g., 'Check your internet connection and try again']"
- CTA: [Button: "Retry", icon: Refresh]
- Auto-retry: [Y/N, shows countdown "Retrying in 5s..."]

---

**LOADING STATES:**

**Page Load:**
- Type: [Skeleton screen / Spinner / Progress bar]
- Skeleton: [Mimics actual content layout Y/N]
- Skeleton elements:
  - Header: [Y/N]
  - Sidebar: [Y/N]
  - Cards: [Count: 4]
  - Table rows: [Count: 10]
- Animation: [Pulse / Shimmer / Fade]
- Duration: [Shows until content loads, typical: 1-3s]

**Component Load (lazy loading):**
- Type: [Spinner / Skeleton / Placeholder]
- Spinner size: [24px / 32px / 40px]
- Spinner position: [Centered in container]
- Text: [Y/N, e.g., "Loading..." below spinner]

**Button Loading:**
- Indicator: [Spinner / Dots / Progress bar]
- Spinner size: [16px / 20px]
- Spinner position: [Left of text / Replace text / Right of text]
- Text change: [Y/N, e.g., "Save" → "Saving..."]
- Button disabled: [Y/N during loading]

**Inline Loading:**
- Type: [Spinner / Dots / Skeleton text]
- Context: [e.g., "Fetching latest data..." with spinner]
- Position: [Inline with content / Below last item]

**Progress Loading (long operations):**
- Type: [Progress bar / Percentage / Step indicator]
- Progress bar: [Linear / Circular]
- Percentage: [Shown Y/N, e.g., "45%"]
- Time remaining: [Shown Y/N, e.g., "About 2 minutes remaining"]
- Cancel option: [Button: "Cancel" Y/N]
- Background processing: [Can user navigate away Y/N]

---

**ERROR STATES:**

**Page Error (critical):**
- Illustration: [Broken robot / Error icon / 500 graphic]
- Illustration size: [160px / 200px]
- Error code: [Shown Y/N, e.g., "Error 500"]
- Heading: "[e.g., 'Something Went Wrong']"
- Subtext: "[e.g., 'We're having trouble loading this page. Please try again or contact support.']"
- Technical details: [Collapsible Y/N, shows error ID, timestamp]
- Actions:
  - Primary: [Button: "Refresh Page" / "Try Again"]
  - Secondary: [Link: "Go to Dashboard" / "Contact Support"]

**Component Error (non-critical):**
- Display: [Inline alert / Toast / Banner]
- Icon: [X / Warning triangle]
- Message: "[e.g., 'Failed to load chart data']"
- Action: [Link/button: "Retry" / "Refresh"]
- Dismissible: [X icon Y/N]

**Form Error:**
- Display: [Inline below field / Summary at top]
- Field error:
  - Border color: [Red]
  - Icon: [X / Error icon next to field]
  - Message: "[e.g., 'This field is required' / 'Invalid email format']"
  - Message color: [Red]
- Form summary (if multiple errors):
  - Position: [Top of form, before fields]
  - Style: [Red banner / Alert box]
  - Content: [List of all errors / "Please fix X errors below"]

**API Error:**
- Display: [Toast / Modal / Inline]
- Message types:
  - Network: "[e.g., 'Connection lost. Retrying...']"
  - Server: "[e.g., 'Server error. Please try again.']"
  - Validation: "[e.g., 'Invalid input. Check your data.']"
  - Rate limit: "[e.g., 'Too many requests. Please wait 30s.']"
- Retry logic: [Auto-retry Y/N, manual retry button]

**404 Error:**
- Illustration: [404 graphic / Lost astronaut / Empty space]
- Heading: "[e.g., 'Page Not Found']"
- Subtext: "[e.g., 'The page you're looking for doesn't exist or has been moved.']"
- CTA: [Button: "Go to Dashboard" / "Back to Home"]
- Search: [Search box Y/N, "Search for..."]

---

### 19. RESPONSIVE MOBILE VARIANTS FEATURES

**Breakpoints:**
- Mobile: [< 640px]
- Tablet: [640px - 1024px]
- Desktop: [> 1024px]

**Navigation (Mobile):**
- Type: [Hamburger menu / Bottom nav / Tabs / Drawer]
- Hamburger: [Icon position: Top-left / Top-right]
- Drawer: [Slide from: Left / Right, width: Full-width / 80%]
- Bottom nav: [Icons only / Icons + labels, items count: 4-5]
- Active indicator: [Color fill / Underline / Badge]

**Tables (Mobile):**
- Display: [Horizontal scroll / Card view / Accordion / Stacked]
- Horizontal scroll: [Shows X columns at once, swipe to see more]
- Card view: [Each row becomes a card, key data prominent]
- Accordion: [Row header + expand to see details]
- Column priority: [Which columns shown first on small screens]

**Filters (Mobile):**
- Display: [Bottom sheet / Full-screen modal / Collapsible section]
- Bottom sheet: [Slides up from bottom, drag to dismiss]
- Full-screen: [Takes full viewport, close X top-right]
- Apply position: [Sticky footer / Inline at bottom]

**Charts (Mobile):**
- Display: [Full-width / Scrollable horizontally / Simplified / Stacked]
- Interaction: [Touch gestures: Pinch to zoom / Swipe / Tap for tooltip]
- Legend: [Below chart / Hidden (show on toggle) / Scrollable]

**Forms (Mobile):**
- Input width: [Full-width]
- Input height: [Slightly larger: 48px vs 40px desktop]
- Labels: [Above input / Floating label]
- Keyboard: [Correct keyboard type: email/number/tel/url]
- Submit button: [Full-width / Fixed at bottom / Inline]

**Modals (Mobile):**
- Display: [Full-screen / Bottom sheet / Reduced padding modal]
- Full-screen: [Header with back/close, scrollable content]
- Bottom sheet: [Slides up, shows 60-80% of screen, swipe to dismiss]
- Header: [Sticky, close button top-left or top-right]

**Cards (Mobile):**
- Layout: [Stacked (1 column) / 2 columns for small cards]
- Padding: [Reduced: 16px vs 24px desktop]
- Font sizes: [Slightly smaller for headings]

**Spacing (Mobile):**
- Container padding: [16px vs 32px desktop]
- Section spacing: [32px vs 64px desktop]
- Element gaps: [12px vs 24px desktop]

**Touch Targets:**
- Minimum size: [44px × 44px for all interactive elements]
- Buttons: [Full-width / 48px height minimum]
- Spacing between: [8px minimum for adjacent buttons]

**Typography (Mobile):**
- Hero font size: [36px vs 57px desktop]
- H1: [28px vs 36px desktop]
- Body: [16px, same as desktop for readability]

---

### 20. EXPORT SUCCESS / DOWNLOAD COMPLETE SCREEN FEATURES

**Display Type:**
- Format: [Full modal / Toast notification / Inline banner / Dedicated page]

**Modal/Page Content:**

**Success Icon:**
- Icon: [Checkmark / ✓ / Download icon / Success animation]
- Icon size: [64px / 80px / 100px]
- Icon color: [Green / Brand color]
- Animation: [Scale in / Fade in / Checkmark draw animation / Confetti]

**Heading:**
- Text: "[e.g., 'Your Export is Ready!' / 'Download Complete' / 'Report Generated']"
- Font size: [24px / 28px / 32px]

**Subtext:**
- Text: "[e.g., 'Your file has been generated and is ready to download.' / 'Your report includes 245 keywords.']"
- Font size: [16px]

**File Information:**
- File name: [e.g., "keywords-export-2025-01-15.csv"]
- File size: [e.g., "2.3 MB"]
- Format: [e.g., "CSV" / "Excel" / "PDF"]
- Rows/items: [e.g., "245 keywords"]
- Generated: [Timestamp: "Jan 15, 2025 at 3:42 PM"]

**Download Actions:**
- Primary button: [Text: "Download Now" / "Download CSV", style: Primary, auto-download on click]
- Secondary button: [Text: "Download Again" (if already downloaded)]
- Open in app: [Y/N, button: "Open in Excel" / "View in Google Sheets"]
- Copy link: [Y/N, button: "Copy Link", link expires in: 24h/7d]

**Share Options:**
- Share link: [Y/N, generates shareable URL]
- Link expiry: [Shows expiration: "Link expires in 24 hours"]
- Copy link button: [Click to copy, shows "Copied!" confirmation]
- Email: [Y/N, button: "Email to...", opens email input modal]

**Additional Actions:**
- Export another: [Button: "Export More Data" / "Create Another Report"]
- Go to data: [Link: "View in Dashboard" / "Go to Keywords"]
- Schedule export: [Link: "Schedule regular exports" (Pro feature)]

**Email Delivery (if applicable):**
- Message: "[e.g., 'We've also sent this file to your email (user@example.com)']"
- Resend option: [Link: "Resend email"]

**Feedback:**
- Was this helpful: [Thumbs up/down / Star rating]
- Improve exports: [Link: "Suggest improvements"]

**Close/Dismiss:**
- Auto-close: [Y/N, after download initiated + 3s]
- Close button: [X icon top-right / "Done" button]
- Background action: [Can continue using app while download in progress]

**Download Progress (large files):**
- Progress bar: [Y/N, shows 0-100%]
- Download speed: [Y/N, shows "2.5 MB/s"]
- Time remaining: [Y/N, shows "About 5 seconds remaining"]
- Pause/Cancel: [Buttons if download is pauseable]

**Error Handling:**
- Download failed: [Shows error message with retry button]
- Link expired: [Message: "This link has expired. Generate a new export."]
- Retry button: [Regenerates export with same settings]

---

## END COMPETITOR ANALYSIS
```

---

## 🎯 STEP 3: SYNTHESIZE BEST-OF-BREED FEATURES

After analyzing all competitors, AI creates master feature list:

```markdown
## MASTER FEATURE LIST (Best from All Competitors)

### LANDING PAGE
✅ Hero Headline: "Track App Rankings in Real-Time" (from [Competitor X])
✅ Value Props:
   - "150+ countries" (from [Competitor X])
   - "AI keyword suggestions" (from [Competitor Y])
   - "Unlimited tracking" (from [Competitor Z])
✅ Social Proof: "10,000+ developers" (highest from all competitors)
✅ Trial Offer: "7-day free trial, no credit card" (from [Competitor X])
✅ Feature Cards: 3-column icon-top layout (from [Competitor Y])

### DASHBOARD
✅ KPI Cards (4 metrics):
   - Current Rank (all competitors)
   - Rank Change ↑↓ (all competitors)
   - Best Rank (from [Competitor X])
   - Visibility Score (from [Competitor X])
✅ Line Chart: With 7d/30d/90d tabs (from [Competitor Y])
✅ Quick Action: "Add Keyword" button in header (from [Competitor Z])

### DATA TABLE
✅ Columns: Keyword, Rank, Change, Volume, Country, Last Updated, Actions
✅ Bulk Actions: Export, Delete, Add to Group (from [Competitor X])
✅ Inline Edit: Click cell to edit (from [Competitor Y])
✅ Row Menu: 3-dot dropdown (from [Competitor Z])

[... Continue for all 20 screens ...]
```

---

## 📐 STEP 4: LOAD DESIGN SYSTEM FROM claude.md

**AI automatically reads:** `/home/coder/Praveen/SEO/Research/test3/claude.md`

**Critical: Extract ALL design system values and apply them precisely to wireframes:**

### 4.1 COLOR TOKENS (MUST USE EXACT HEX VALUES)
```css
/* Brand Colors */
--brand-500: #FF5722 (PRIMARY - use for CTAs, links, active states)
--brand-50: #FFF3E0 (primary container background)
--brand-900: #BF360C (dark brand accent)

/* Neutral Grayscale */
--neutral-50: #F9FAFB (light surface backgrounds)
--neutral-100: #F3F4F6 (surface variant, card backgrounds)
--neutral-200: #E5E7EB (borders, dividers, outlines)
--neutral-400: #9CA3AF (disabled text, placeholders)
--neutral-500: #6B7280 (secondary text)
--neutral-700: #374151 (secondary buttons)
--neutral-900: #111827 (primary text, headings)
--neutral-950: #0A0E16 (dark mode surface)

/* Semantic Colors */
--md-sys-color-error: #DC2626 (error states, delete buttons)
--md-sys-color-error-container: #FEE2E2 (error backgrounds)

/* Surface & Background */
--md-sys-color-surface: #FFFFFF (card backgrounds, modals)
--md-sys-color-background: #FFFFFF (page background)
--md-sys-color-surface-variant: #F9FAFB (subtle backgrounds)
--md-sys-color-outline: #E5E7EB (borders, dividers)
```

### 4.2 TYPOGRAPHY SYSTEM (MUST USE EXACT SIZES & WEIGHTS)
```css
Font Family: "Inter" (ALL text must use Inter font)

/* Type Scale - USE EXACT PIXEL VALUES */
--md-type-display-lg: 57px font-size / 64px line-height / 600 weight (Hero headlines)
--md-type-display-sm: 36px / 44px / 600 (Sub-hero, section titles)
--md-type-headline-lg: 32px / 40px / 600 (Page titles, H1)
--md-type-title-lg: 22px / 28px / 600 (Card titles, H2, H3)
--md-type-body-lg: 16px / 24px / 400 (Body text, paragraphs, descriptions)
--md-type-body-sm: 14px / 20px / 400 (Small text, captions)
--md-type-label-lg: 14px / 20px / 600 (Button labels, form labels)
```

### 4.3 SPACING SYSTEM (4PT GRID - MUST USE EXACT VALUES)
```css
--space-0: 0px
--space-1: 4px (tiny gaps, icon spacing)
--space-2: 8px (compact spacing, chip padding)
--space-3: 12px (small gaps between related items)
--space-4: 16px (default gap, card internal spacing)
--space-5: 20px (medium spacing)
--space-6: 24px (section spacing, card padding)
--space-8: 32px (large section gaps, page padding)
--space-9: 40px
--space-10: 48px (extra large spacing, hero padding)
```

### 4.4 COMPONENT DIMENSIONS (EXACT MEASUREMENTS)
```css
/* Buttons */
.btn: min-height 40px, padding 10px 16px, border-radius 12px
.btn-sm: min-height 36px, padding 8px 12px
.btn-lg: min-height 48px, padding 12px 20px (PRIMARY CTAs)

/* Input Fields */
.textfield input: height 56px, padding 0 16px, border-radius 12px

/* Cards */
.card: border-radius 16px, padding 24px, box-shadow elevation-1
.card-hover: elevation-2 on hover

/* Headers & Navigation */
.topbar: height 64px, padding 0 16px
.sidebar: width 240px

/* Tables */
.table th: padding 12px 16px, height 48px
.table td: padding 16px

/* Modals */
.modal: max-width 560px, border-radius 20px, padding 24px

/* Avatars */
.avatar: 40px default, 32px small, 48px large, 64px xl

/* Icons */
.icon: 24px default, 16px small, 32px large, 40px xl
```

### 4.5 BORDER RADIUS (SHAPE TOKENS)
```css
--md-sys-shape-corner-xs: 4px (small elements)
--md-sys-shape-corner-sm: 6px
--md-sys-shape-corner-md: 8px
--md-sys-shape-corner-lg: 12px (buttons, inputs, cards)
--md-sys-shape-corner-xl: 16px (large cards)
--md-sys-shape-corner-2xl: 20px (modals)
--md-sys-shape-corner-3xl: 24px (hero sections)
--md-sys-shape-corner-full: 9999px (pills, badges, avatars)
```

### 4.6 SHADOWS (ELEVATION SYSTEM)
```css
--md-sys-elevation-0: none (flat elements)
--md-sys-elevation-1: 0 1px 3px rgba(0,0,0,0.10) (cards, slight lift)
--md-sys-elevation-2: 0 4px 6px rgba(0,0,0,0.10) (hover cards)
--md-sys-elevation-3: 0 10px 15px rgba(0,0,0,0.10) (dropdowns, menus)
--md-sys-elevation-4: 0 20px 25px rgba(0,0,0,0.10) (drawers)
--md-sys-elevation-5: 0 25px 50px rgba(0,0,0,0.25) (modals, popups)

--shadow-brand-glow: 0 0 0 1px rgb(255 87 34/0.10), 0 8px 16px rgb(255 87 34/0.30)
  (use for primary CTAs, featured cards)
```

### 4.7 COMPONENT MAPPING (CSS CLASS REFERENCE)
```css
/* Use these exact class styles when drawing components */
.btn-filled: background #FF5722, color white, shadow elevation-1
.btn-outlined: background transparent, color #FF5722, border 1px #E5E7EB
.btn-text: background transparent, color #FF5722, no border

.card: white background, 16px radius, 24px padding, elevation-1
.kpi: card + grid layout for metrics
.stat-card: card with trend indicators

.table: full width, border-collapse, th background #F9FAFB
.badge: inline-flex, 9999px radius, 4px 8px padding
.chip: like badge but clickable, toggle state

.modal-root: fixed overlay with scrim (backdrop)
.drawer: slide-in panel from right, 420px width
.snackbar: fixed bottom center, 12px radius, inverse colors

.alert: flex layout, 16px padding, 12px radius, 4px left border
.empty-state: centered grid, 120px icon, centered text
.spinner: 40px circle with rotating border
```

### 4.8 LAYOUT SYSTEM
```css
/* Grid System */
.grid-2: 2 columns, 16px gap
.grid-3: 3 columns, 16px gap (feature cards)
.grid-4: 4 columns, 16px gap (KPI cards)
.grid-auto: responsive auto-fit, 280px min column width

/* Flexbox Utilities */
.flex: display flex, 16px gap
.flex-between: justify-content space-between
.flex-center: center both axes
.items-center: align-items center

/* Container */
.container: max-width 1200px, responsive padding (16px mobile, 24px tablet, 32px desktop)
.section: 56px top/bottom padding
.hero: 56px top/bottom padding
```

### 4.9 RESPONSIVE BREAKPOINTS
```css
Mobile: < 599px (single column, bottom nav, full-width buttons)
Tablet: 600px - 1023px (2 columns, hybrid nav)
Desktop: ≥ 1024px (3-4 columns, sidebar nav)

/* Mobile Adjustments */
- Stack grids to 1 column
- Hamburger menu instead of sidebar
- Full-width buttons (48px min height for touch)
- Bottom sheets instead of modals
- Horizontal scroll tables or card view
```

---

## 🎨 STEP 5: GENERATE UI-CONSISTENT WIREFRAME SET

**STRATEGIC APPROACH - Quality Over Quantity:**

Instead of generating 20 random screens, AI will analyze competitor patterns and create a **coherent, UI-consistent wireframe system** based on:
1. Core user journeys (most critical flows)
2. Reusable component patterns (consistent UI language)
3. Responsive design system (desktop + mobile variants)

### 5.1 WIREFRAME STRATEGY (AI DETERMINES OPTIMAL COUNT)

**Phase 1: Analyze Competitor UI Patterns**
AI identifies:
- Common layout structures (sidebar nav, top nav, card grids, etc.)
- Repeated component patterns (buttons, cards, tables, modals)
- Design consistency across screens (same header, same nav, same spacing)
- Essential user flows (minimum screens needed for complete journey)

**Phase 2: Plan UI-Consistent Set**
AI creates wireframe plan covering:

**Core Screens (Essential Flow):**
1. **Landing/Marketing** - Entry point, hero, features, CTA
2. **Dashboard** - Main app screen after login (nav + content + widgets)
3. **Data View** - Primary data/content screen (table or card grid)
4. **Detail View** - Single item deep dive
5. **Settings** - User preferences, account management

**Reusable Components (Design System Showcase):**
6. **Component Library Screen** - Shows all UI elements in context:
   - Navigation (header, sidebar, breadcrumbs)
   - Forms (inputs, selects, checkboxes, validation)
   - Buttons (primary, secondary, outlined, disabled states)
   - Cards (default, hover, selected states)
   - Tables (with sorting, filters, pagination)
   - Modals/Dialogs (confirmation, forms, alerts)
   - Notifications (toast, banner, inline alerts)
   - Empty states, loading states, error states

**Responsive Variants (Mobile Adaptations):**
7. **Mobile Dashboard** - Key desktop screen adapted for 375px mobile
8. **Mobile Navigation** - Bottom nav or hamburger menu pattern

**Total Wireframes: 6-10 screens** (AI determines exact number based on complexity)

---

### 5.2 UI CONSISTENCY REQUIREMENTS (MANDATORY)

**Global Elements (MUST appear consistently across all wireframes):**

**Header/Navigation:**
- Same height (64px) on all screens
- Same logo position and size
- Same navigation structure
- Same user menu placement
- Same search bar (if present)
- Same styling (background, borders, shadows)

**Layout Structure:**
- Consistent sidebar width (240px) if using sidebar layout
- Consistent main content padding (32px)
- Consistent page header pattern (title + actions)
- Consistent breadcrumb format (if used)
- Consistent max-width containers (1200px)

**Component Styling:**
- ALL buttons use same heights: 40px (.btn), 48px (.btn-lg), 36px (.btn-sm)
- ALL buttons use same radius: 12px
- ALL buttons use same brand color: #FF5722
- ALL cards use same radius: 16px
- ALL cards use same padding: 24px
- ALL cards use same shadow: elevation-1
- ALL text uses same font: Inter
- ALL text uses same size scale: 57px, 36px, 32px, 22px, 16px, 14px
- ALL spacing uses same 4pt grid: 4px, 8px, 12px, 16px, 24px, 32px, 48px

**Color Palette (Strict Adherence):**
- Primary brand: #FF5722 (all CTAs, links, active states)
- Text primary: #111827 (headings, body text)
- Text secondary: #6B7280 (captions, descriptions)
- Surface: #FFFFFF (cards, modals, backgrounds)
- Borders: #E5E7EB (dividers, outlines)
- Surface variant: #F9FAFB (subtle backgrounds)

**Typography Hierarchy:**
```
Display Large (57px/600): Hero headlines only
Display Small (36px/600): Sub-heroes, major section titles
Headline Large (32px/600): Page titles, H1
Title Large (22px/600): Card titles, section headers, H2
Body Large (16px/400): Body text, descriptions, table content
Body Small (14px/400): Captions, helper text, meta info
Label Large (14px/600): Button labels, form labels, badges
```

---

### 5.3 SVG GENERATION RULES (MANDATORY)

**Format Requirements:**
- Output format: Clean, semantic SVG (not ASCII, not hand-drawn)
- Canvas size: 1440×900 (desktop) or 375×812 (mobile)
- Use <text>, <rect>, <circle>, <path> SVG elements
- Group related elements with <g> tags
- Add CSS <style> block with design system colors/fonts
- Include component annotations layer (hidden, for dev reference)

**Design System Application (NON-NEGOTIABLE):**
- ALL colors MUST use exact hex values from Step 4.1
- ALL text MUST use Inter font family
- ALL font sizes MUST match typography scale from Step 4.2
- ALL spacing MUST use 4pt grid from Step 4.3 (no 5px, no 15px, no odd numbers!)
- ALL component dimensions MUST match Step 4.4
- ALL border radius MUST use values from Step 4.5 (4px, 6px, 8px, 12px, 16px, 20px, 9999px)
- ALL shadows MUST use elevation system from Step 4.6

**Quality Standards:**
- Pixel-perfect alignment to 4pt grid
- Consistent visual hierarchy (size, color, weight)
- Professional spacing (not cramped, not excessive)
- Realistic content (no lorem ipsum, use actual tool-specific text)
- Proper contrast ratios (WCAG AA minimum: 4.5:1 text, 3:1 UI)

---

## ✅ STEP 6: VALIDATION & DELIVERY

**AI verifies all requirements met:**
- [x] Competitors auto-discovered (3-6 tools)
- [x] Features extracted from each competitor
- [x] Best-of-breed synthesis completed
- [x] Design system loaded from claude.md
- [x] Optimal wireframe count determined (6-10 screens)
- [x] Wireframe strategy documented in wireframe-plan.md
- [x] All wireframes generated with strict UI consistency
- [x] Component library screen includes all design system elements
- [x] Mobile variants included
- [x] Design system compliance validated (exact values only)
- [x] 4pt grid alignment verified (no odd numbers)

---

## 📤 OUTPUT STRUCTURE

```
OUTPUT_FOLDER: /home/coder/Praveen/SEO/Research/test3/wireframes/[tool-name]/

📁 CORE SCREENS (5-7 files)
├── 01-landing-page.svg
├── 02-dashboard.svg
├── 03-data-view.svg
├── 04-detail-view.svg
├── 05-settings.svg
└── [06-07: additional core screens if needed]

📁 COMPONENT LIBRARY (1 file - MANDATORY)
└── 10-component-library.svg
    ├── Navigation (header 64px, sidebar 240px, breadcrumbs)
    ├── Buttons (.btn 40px, .btn-lg 48px, .btn-sm 36px)
    ├── Forms (inputs 56px, validation, states)
    ├── Cards (16px radius, 24px padding)
    ├── Tables (header 48px, pagination)
    ├── Modals (560px width, 20px radius)
    ├── Alerts (toast, banner, inline)
    └── States (empty, loading, error)

📁 MOBILE VARIANTS (1-2 files)
├── 20-mobile-dashboard.svg (375px canvas)
└── [21-mobile-navigation.svg if complex]

📁 RESEARCH & DOCUMENTATION
├── wireframe-plan.md (AI's strategy for this tool)
├── competitor-analysis.md (full feature extraction)
├── best-of-breed-features.md (synthesis)
├── design-system-reference.json (tokens from claude.md)
├── consistency-guide.md (global elements across screens)
└── README.md (usage instructions)

TOTAL WIREFRAMES: 6-10 screens (AI determined, quality over quantity)
```

---

---

## 🚀 USAGE INSTRUCTIONS

### Step 1: Configure Input
Edit the INPUT section at the top of this file:
```yaml
TOOL_NAME: "Your Tool Name"
TOOL_PURPOSE: "What the tool does"
TOOL_CATEGORY: "SEO/ASO/Analytics/Marketing/Social"
DESIGN_SYSTEM_PATH: /path/to/claude.md
OUTPUT_FOLDER: /path/to/output
```

### Step 2: Run AI Wireframe Generator
The AI will automatically execute all 6 steps:

**Step 1: Auto-Discover Competitors (2-3 minutes)**
- Web search: "[TOOL_NAME] [TOOL_CATEGORY] competitors 2025"
- Identifies top 3-6 competitors with exact URLs
- Output: `competitor-list.yaml`

**Step 2: Extract Features (5-10 minutes per competitor)**
- Analyzes each competitor's UI screens
- Documents FEATURES (not pixel measurements)
- Covers all 20 screen types (landing, signup, dashboard, etc.)
- Output: `competitor-analysis-[name].md` for each competitor

**Step 3: Synthesize Best-of-Breed Features (3-5 minutes)**
- Compares features across all competitors
- Selects best patterns for each screen
- Creates master feature list
- Output: `best-of-breed-features.md`

**Step 4: Load Design System (instant)**
- Reads `/home/coder/Praveen/SEO/Research/test3/claude.md`
- Extracts all tokens (colors, typography, spacing, components)
- Creates design system reference map
- Output: `design-system-reference.json`

**Step 5: Generate SVG Wireframes (2-3 minutes per wireframe)**
- Combines features (Step 3) + design system (Step 4)
- Creates 20 high-fidelity SVG files
- Applies exact design system values
- Output: 20 × `.svg` files

**Step 6: Validation & Packaging**
- Verifies all 20 wireframes generated
- Checks design system compliance
- Creates README with usage instructions
- Output: `README.md` + complete wireframe set

### Step 3: Review Output
Navigate to output folder:
```
/home/coder/Praveen/SEO/Research/test3/wireframes/rank-tracker/

📁 Core Screens (5-7 wireframes)
├── 01-landing-page.svg
├── 02-dashboard.svg
├── 03-data-view.svg
├── 04-detail-view.svg
├── 05-settings.svg
└── [additional core screens based on tool complexity]

📁 Component Library (1-2 wireframes)
├── 10-component-library.svg (comprehensive design system showcase)
└── [optional: 11-component-states.svg for interaction states]

📁 Mobile Variants (1-2 wireframes)
├── 20-mobile-dashboard.svg
└── [optional: 21-mobile-navigation.svg]

📁 Research & Documentation
├── competitor-analysis.md (full feature extraction)
├── best-of-breed-features.md (synthesis)
├── design-system-reference.json (extracted tokens)
├── wireframe-plan.md (AI's strategic plan for this tool)
└── README.md (usage instructions)

Total Wireframes: 6-10 screens (AI determines optimal count)
```

---

## ✅ SUCCESS CRITERIA

Your wireframes are production-ready when they meet ALL criteria:

### Strategic Planning
- [ ] AI analyzed competitor patterns and identified optimal wireframe count (6-10 screens)
- [ ] AI documented wireframe strategy in `wireframe-plan.md`
- [ ] Core user journey covered (landing → dashboard → data → detail → settings)
- [ ] Component library screen shows all design system elements
- [ ] Mobile variants included for key responsive patterns

### Feature Completeness
- [ ] Each screen includes features from competitor analysis (best-of-breed)
- [ ] Features are not copy-paste from one competitor (synthesized approach)
- [ ] Realistic content (tool-specific terminology, no lorem ipsum)
- [ ] Essential user flows covered (minimum viable wireframes)
- [ ] No redundant screens (every wireframe serves a distinct purpose)

### Design System Compliance (CRITICAL)
- [ ] **Color Consistency**: All colors use exact hex values from claude.md (#FF5722, #111827, #6B7280, #FFFFFF, #E5E7EB)
- [ ] **Typography Consistency**: All text uses Inter font family
- [ ] **Font Size Consistency**: All sizes match typography scale (57px, 36px, 32px, 22px, 16px, 14px) - NO other sizes!
- [ ] **Spacing Consistency**: All spacing uses 4pt grid (4px, 8px, 12px, 16px, 24px, 32px, 48px) - NO odd numbers!
- [ ] **Component Consistency**: All buttons are 40px/48px/36px height, all cards have 24px padding, all inputs 56px height
- [ ] **Border Radius Consistency**: Only use 4px, 6px, 8px, 12px, 16px, 20px, or 9999px - NO other values!
- [ ] **Shadow Consistency**: All shadows use elevation-1 through elevation-5 system
- [ ] **UI Consistency**: Same header (64px), same sidebar (240px), same layout padding (32px) across all screens

### Technical Quality
- [ ] Valid SVG format (opens in browsers, Figma, Sketch)
- [ ] Semantic markup (<g> groups, proper naming)
- [ ] Embedded CSS styles (no external dependencies)
- [ ] Responsive layouts (desktop 1440px, mobile 375px)
- [ ] Accessibility considerations (contrast, focus states, labels)

### Professional Standards
- [ ] Pixel-perfect alignment to 4pt grid
- [ ] Consistent visual hierarchy
- [ ] Professional spacing (not cramped, not excessive)
- [ ] WCAG AA contrast ratios (4.5:1 text, 3:1 UI)
- [ ] Print-ready (clean, vector-based graphics)

---

## 📊 DELIVERABLES CHECKLIST

When generation is complete, you should have:

**Research Artifacts:**
- [ ] `competitor-list.yaml` - List of 3-6 competitors with URLs
- [ ] `competitor-analysis-[name].md` - Feature extraction for each competitor
- [ ] `best-of-breed-features.md` - Synthesized master feature list
- [ ] `design-system-reference.json` - Extracted design tokens from claude.md
- [ ] `wireframe-plan.md` - AI's strategic plan (why these screens, optimal count)

**Wireframe Files (6-10 total - AI determines optimal count):**

**Core Screens (5-7 files):**
- [ ] 01-landing-page.svg (hero, features, CTAs, social proof)
- [ ] 02-dashboard.svg (main app screen, nav, KPI cards, widgets)
- [ ] 03-data-view.svg (table/grid, filters, sorting, pagination)
- [ ] 04-detail-view.svg (single entity, tabs, related data)
- [ ] 05-settings.svg (profile, account, preferences)
- [ ] [AI adds 2-3 more based on tool complexity: onboarding, comparison, reports, etc.]

**Component Library (1-2 files):**
- [ ] 10-component-library.svg (comprehensive showcase of all design system components)
  - Navigation (header 64px, sidebar 240px, breadcrumbs)
  - Buttons (primary .btn-lg 48px, default .btn 40px, small .btn-sm 36px)
  - Forms (inputs 56px, selects, checkboxes, validation states)
  - Cards (16px radius, 24px padding, elevation-1)
  - Tables (header 48px, row padding 16px, sorting, pagination)
  - Modals (560px max-width, 20px radius, elevation-5)
  - Alerts & Notifications (toast, banner, inline)
  - States (empty, loading, error)
- [ ] [Optional: 11-component-states.svg for interaction states and animations]

**Mobile Variants (1-2 files):**
- [ ] 20-mobile-dashboard.svg (375px canvas, bottom nav OR hamburger, card stacking)
- [ ] [Optional: 21-mobile-data-view.svg for complex table/grid responsive patterns]

**Documentation:**
- [ ] `README.md` - How to use wireframes (import to Figma, dev handoff)
- [ ] `design-system-mapping.md` - Which CSS classes map to which wireframe elements
- [ ] `feature-sources.md` - Which features came from which competitors
- [ ] `consistency-guide.md` - Global elements that appear across all screens

---

## 🎯 NEXT STEPS AFTER GENERATION

### For Designers:
1. **Import to Figma/Sketch:**
   - Drag SVG files into design tool
   - Create components from repeated patterns
   - Add interactions and prototyping

2. **Refine Visual Design:**
   - Add images, icons, illustrations
   - Fine-tune micro-interactions
   - Create high-fidelity mockups

3. **Create Design Specs:**
   - Annotate spacing and dimensions
   - Document interaction states
   - Export assets for development

### For Developers:
1. **Study Component Structure:**
   - Review SVG markup for component hierarchy
   - Map wireframe elements to HTML/CSS
   - Identify reusable components

2. **Implement with Design System:**
   - Use `claude.md` CSS classes directly
   - Build React/Vue/Web components
   - Match exact dimensions and spacing

3. **Add Functionality:**
   - Wire up forms and validation
   - Implement data fetching and state
   - Add interactions and animations

### For Product Managers:
1. **Validate User Flows:**
   - Review all 20 screens for completeness
   - Identify missing features or edge cases
   - Prioritize features for MVP

2. **Plan Implementation:**
   - Break down into sprints
   - Define acceptance criteria
   - Estimate development effort

3. **Stakeholder Review:**
   - Present wireframes to leadership
   - Gather feedback from users
   - Iterate on feature set

---

## 🔄 ITERATION & REFINEMENT

If wireframes need updates:

**To add/modify features:**
1. Edit Step 2 competitor analysis
2. Re-run Step 3 synthesis
3. Regenerate affected wireframes

**To change design system:**
1. Update `claude.md` with new tokens
2. Re-run Step 4 design system load
3. Regenerate all 20 wireframes

**To add new screens:**
1. Define new screen type in Step 2 template
2. Extract features from competitors
3. Generate new wireframe using system

---

## 📝 NOTES & BEST PRACTICES

**Quality over Speed:**
- Don't rush competitor analysis (garbage in = garbage out)
- Be thorough in feature extraction (capture every detail)
- Validate design system compliance (use exact values)

**Competitive Intelligence:**
- Study top competitors, not struggling ones
- Look for patterns across multiple competitors
- Identify unique differentiators to copy

**Design System Discipline:**
- Never deviate from design tokens
- Use CSS classes as documented
- Maintain 4pt grid alignment

**Realistic Content:**
- Use actual tool-specific terminology
- Include real metric names (not "Metric 1")
- Show realistic data ranges and formats

**Accessibility First:**
- Check color contrast (use WebAIM checker)
- Include focus states and keyboard navigation
- Label all interactive elements

---

## 🛠️ TROUBLESHOOTING

**Issue: Competitors not found**
- Solution: Manually specify competitor URLs in Step 1
- Try different search terms or categories

**Issue: Design system values incorrect**
- Solution: Verify `claude.md` path is correct
- Check that all tokens are properly defined

**Issue: SVG not rendering properly**
- Solution: Validate SVG syntax (use validator)
- Check that all fonts are embedded or web-safe

**Issue: Wireframes don't match competitors**
- Solution: Review Step 2 feature extraction
- Ensure features are documented, not just copied

**Issue: Inconsistent spacing or sizing**
- Solution: Re-check Step 4 design system mapping
- Use exact pixel values from tokens

---

## 📚 APPENDIX: WIREFRAME SELECTION FRAMEWORK

AI uses this framework to determine optimal wireframe set (6-10 screens):

### ALWAYS INCLUDE (5 Core Screens):
1. **Landing Page** - Marketing entry point
2. **Dashboard** - Main app screen after login
3. **Data View** - Primary data/content display
4. **Detail View** - Single entity deep dive
5. **Settings** - User preferences/account

### COMPONENT LIBRARY (1 Required):
6. **Component Library** - Complete design system showcase
   - Shows ALL components in one screen
   - Demonstrates consistency and reusability
   - Serves as developer reference

### MOBILE RESPONSIVE (1-2 Recommended):
7. **Mobile Dashboard** - Key screen adapted for 375px width
8. **Mobile Navigation** (optional) - If nav pattern is complex

### ADDITIONAL SCREENS (0-3 based on tool complexity):

**If tool has complex onboarding:**
- Onboarding Wizard (multi-step signup flow)

**If tool has data comparison features:**
- Comparison View (side-by-side analysis)

**If tool has reporting/export features:**
- Reports Page or Export Flow

**If tool has team/collaboration:**
- Team Management or Collaboration View

**If tool has complex filtering:**
- Advanced Filter Panel (if not part of Data View)

**If tool has monetization:**
- Upgrade/Pricing Modal

**If tool has complex workflows:**
- Workflow Builder or Process View

---

### AI DECISION CRITERIA:

**Simple Tool (6 screens):**
- 5 core + 1 component library
- Example: Simple rank tracker with basic features

**Medium Tool (7-8 screens):**
- 5 core + 1 component library + 1-2 mobile + 0-1 additional
- Example: ASO tool with basic reports and comparison

**Complex Tool (9-10 screens):**
- 5 core + 1 component library + 1-2 mobile + 2-3 additional
- Example: Full marketing platform with team features, reports, integrations

**Maximum: 10 screens** (quality over quantity)

---

### PRIORITY ORDER FOR ADDITIONAL SCREENS:

1. Mobile variants (essential for responsive design)
2. Onboarding (if signup flow is complex)
3. Comparison/Reports (if core to tool value proposition)
4. Team/Collaboration (if multi-user tool)
5. Monetization (if freemium model)

---

**END OF UNIVERSAL WIREFRAME GENERATOR**

**Version:** 2.0 - Design System Edition
**Last Updated:** 2025-10-17
**Status:** Production Ready ✅
