# Invite Team Page - Design Plan Summary
**Quick Reference Guide Based on Competitor Analysis**

---

## 🏆 WINNER: Best User Flow Model

### **HYBRID APPROACH** (Combining Best of Ahrefs + Semrush)

```
┌─────────────────────────────────────────────────────────────────┐
│                        RECOMMENDED FLOW                          │
└─────────────────────────────────────────────────────────────────┘

FREE PLAN (1 Seat)
    │
    ├─ Allow 1-3 free team invitations
    │  ✓ Low friction onboarding
    │  ✓ Viral growth potential
    │  ✓ Users see value before paying
    │
    ├─ Show seat usage: "2/3 free seats"
    │  ✓ Transparent limits
    │  ✓ Creates urgency
    │
    └─ Upgrade prompt when limit reached
       ✓ Clear pricing ($X per additional seat)
       ✓ One-click upgrade path
```

---

## 📊 COMPETITOR COMPARISON TABLE

| Feature | Semrush | Ahrefs | Mobile Action | Sensor Tower | data.ai |
|---------|---------|--------|---------------|--------------|---------|
| **Free Invitations** | ❌ No | ✅ Unlimited* | ❌ No | ❌ No | ❌ No |
| **Self-Service** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Sales-gated | ❌ Sales-gated |
| **Transparent Pricing** | ✅ Clear | ✅ Clear | ✅ Clear | ❌ Custom | ❌ Custom |
| **User Roles** | 4 tiers | 3 tiers | Basic | Custom | Custom |
| **Bulk Invitations** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Email Verification** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Usage-Based Billing** | ❌ No | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Accessibility Score** | 4/5 | 5/5 | 4/5 | 2/5 | 2/5 |
| **Reliability Score** | 5/5 | 4/5 | 4/5 | 4/5 | 3/5 |

*Ahrefs allows unlimited invites but charges only for active users (>5 reports/month)

---

## 🎯 KEY INSIGHTS FROM ANALYSIS

### 1. PRICING STRATEGIES

#### ⭐ Most Accessible: AHREFS
```
Invite Anyone → They use ≤5 reports/month = FREE
               → They use >5 reports/month = $40-80/month
```
**Why it works:** Zero friction, pay only for actual usage

#### ⭐ Most Predictable: SEMRUSH
```
Buy Seat ($20-100/month) → Invite User → Shared Limits
```
**Why it works:** Clear budgeting, no surprise costs

#### ❌ Least Accessible: SENSOR TOWER / DATA.AI
```
Contact Sales → Wait for Quote → Negotiate → Pay $25k+/year
```
**Why it fails:** High friction, enterprise-only, opaque

---

### 2. USER ROLE SYSTEMS

#### ✅ RECOMMENDED: 3-Tier System (Like Ahrefs)

```
┌─────────────────────────────────────────────────────────┐
│  OWNER                                                   │
│  • Billing & payment control                             │
│  • Add/remove all users                                  │
│  • Delete account                                        │
│  • Change all settings                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ├─────────────────────────────────┐
                        │                                  │
┌──────────────────────────────┐  ┌──────────────────────────────┐
│  ADMIN                        │  │  MEMBER                       │
│  • Add/remove members         │  │  • Use all features           │
│  • Edit team settings         │  │  • Create/edit projects       │
│  • View all projects          │  │  • Limited settings access    │
│  • No billing access          │  │  • Cannot manage users        │
└──────────────────────────────┘  └──────────────────────────────┘
```

**Why 3 tiers vs 4 tiers:**
- Simpler to understand
- Covers 95% of use cases
- Less dropdown clutter
- Faster onboarding

---

### 3. INVITATION FLOW PATTERNS

#### ✅ LOW-FRICTION (Use This)

```
Step 1: Click "Invite Team"
   │
Step 2: Enter email(s) + Select role
   │
Step 3: Click "Send Invitations"
   │
Step 4: ✓ Success! Email sent
   │
Step 5: User clicks link in email
   │
Step 6: Auto-added to team
```

**Time to complete:** 30 seconds
**Used by:** Semrush, Ahrefs, Mobile Action

#### ❌ HIGH-FRICTION (Avoid This)

```
Step 1: Contact sales form
   │
Step 2: Wait 1-3 business days
   │
Step 3: Schedule demo call
   │
Step 4: Receive custom quote
   │
Step 5: Negotiate contract
   │
Step 6: Sign agreement
   │
Step 7: Manual provisioning
```

**Time to complete:** 1-4 weeks
**Used by:** Sensor Tower, data.ai

---

## 🎨 UI DESIGN SPECIFICATIONS

### Component 1: Team Management Page

```
┌───────────────────────────────────────────────────────────────┐
│  ← Back                    TEAM MANAGEMENT                     │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  👥 Team Members                    2/10 seats used     │  │
│  │                                                         │  │
│  │  Your team has access to all projects and data.        │  │
│  │                                      [+ Invite Team]   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  [Avatar] John Doe                           🔵 OWNER  │  │
│  │           john@company.com                             │  │
│  │           Last active: 5 minutes ago                   │  │
│  │                                                         │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │                                                         │  │
│  │  [Avatar] Jane Smith                        🟢 ADMIN   │  │
│  │           jane@company.com                  [···]      │  │
│  │           Last active: 2 hours ago                     │  │
│  │                                                         │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  💡 Need more seats?                                    │  │
│  │  Upgrade to Pro Plan for 50 seats                      │  │
│  │                                    [View Pricing →]    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

### Component 2: Invite Modal

```
┌─────────────────────────────────────────────────────────┐
│  Invite Team Members                                [×] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Email Addresses                                        │
│  ┌───────────────────────────────────────────────────┐ │
│  │ teammate@example.com                              │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │ another@example.com                               │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [+ Add Another] or [Upload CSV]                       │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Role                                                   │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Admin                                         ▼   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ℹ️ Admins can manage users and team settings          │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Summary                                                │
│  • 2 invitations will be sent                          │
│  • 4/10 seats will be used after acceptance            │
│  • No additional cost (within plan limit)              │
│                                                         │
│                                                         │
│  [Cancel]                    [Send Invitations] ← PRIMARY│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Component 3: Upgrade Prompt (When Limit Reached)

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ You've reached your seat limit                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  You're currently using all 10 seats on your plan.     │
│                                                         │
│  To invite more team members:                          │
│                                                         │
│  ┌──────────────────────────────┐                      │
│  │  📈 UPGRADE TO PRO PLAN       │                      │
│  │                               │                      │
│  │  • 50 user seats              │                      │
│  │  • Advanced features          │                      │
│  │  • Priority support           │                      │
│  │                               │                      │
│  │  $XX/month                    │                      │
│  │                               │                      │
│  │  [Upgrade Now →]             │                      │
│  └──────────────────────────────┘                      │
│                                                         │
│  Or [Remove inactive members] to free up seats         │
│                                                         │
│                                        [Close]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 USER FLOW DIAGRAM

```
┌──────────────────────────────────────────────────────────────┐
│                    COMPLETE USER JOURNEY                      │
└──────────────────────────────────────────────────────────────┘

START: User creates account (Free Plan - 1 seat)
    ↓
[1] Dashboard shows team badge/widget
    "Get started faster - Invite your team"
    ↓
[2] User clicks "Invite Team" button
    ↓
    ├─ IF: Within free seats (≤3 seats)
    │  └→ Show invite modal → Send emails → Success ✓
    │
    └─ IF: Exceeds free seats (>3 seats)
       └→ Show upgrade prompt
          ↓
          ├─ User clicks "Upgrade" → Pricing page → Purchase → Return to invite flow
          │
          └─ User clicks "Cancel" → Back to dashboard
             └→ Persistent badge reminder "Upgrade to invite more"

---

INVITEE JOURNEY
    ↓
[1] Receives email: "You've been invited to join [Team Name]"
    ↓
[2] Clicks "Accept Invitation" button in email
    ↓
    ├─ IF: Has existing account
    │  └→ Auto-join team → Redirect to dashboard → Show welcome banner
    │
    └─ IF: New user
       └→ Registration page (pre-filled email) → Create password
          → Auto-join team → Onboarding tour → Dashboard

---

POST-INVITATION
    ↓
Inviter sees:
  • Status: "Pending" → "Active" (after acceptance)
  • Seat count updates: "3/10 seats"
  • Can resend invitation if not accepted within 7 days
    ↓
New member sees:
  • Access to all shared projects
  • Welcome modal with quick tips
  • Personalized onboarding based on role
```

---

## ⚡ TECHNICAL REQUIREMENTS

### Frontend Components (Priority Order)

1. **TeamManagementPage.tsx** - Main container
   - Display team member list
   - Show seat usage indicator
   - Invite button CTA

2. **InviteTeamModal.tsx** - Core feature
   - Email input fields (dynamic)
   - Role selector dropdown
   - Validation logic
   - API integration

3. **SeatUsageIndicator.tsx** - Visual feedback
   - Progress bar showing X/Y seats
   - Color coding (green → yellow → red)
   - Tooltip with plan details

4. **TeamMemberCard.tsx** - List item
   - Avatar + name + email
   - Role badge
   - Last active timestamp
   - Actions menu (edit/remove)

5. **UpgradePromptModal.tsx** - Conversion driver
   - Triggered when limit reached
   - Show pricing comparison
   - CTA to pricing page

6. **RoleSelector.tsx** - Reusable dropdown
   - 3 role options with icons
   - Hover tooltips for descriptions
   - Accessible keyboard navigation

### Backend API Endpoints

```
GET    /api/v1/teams/:teamId/members
POST   /api/v1/teams/:teamId/invitations
GET    /api/v1/teams/:teamId/invitations/pending
DELETE /api/v1/teams/:teamId/invitations/:invitationId
POST   /api/v1/invitations/:token/accept
PATCH  /api/v1/teams/:teamId/members/:memberId/role
DELETE /api/v1/teams/:teamId/members/:memberId
```

### Database Schema (Simplified)

```sql
teams
  - id (PK)
  - name
  - plan_id (FK)
  - seat_limit (from plan)
  - created_at

team_members
  - id (PK)
  - team_id (FK)
  - user_id (FK, nullable)
  - email
  - role ENUM('owner', 'admin', 'member')
  - status ENUM('pending', 'active', 'inactive')
  - invited_by (FK to users)
  - invited_at
  - joined_at

team_invitations
  - id (PK)
  - team_id (FK)
  - email
  - role
  - token (unique)
  - invited_by (FK)
  - expires_at
  - status ENUM('pending', 'accepted', 'expired', 'cancelled')
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: MVP (Week 1-2)
- [ ] Design UI mockups in Figma
- [ ] Create TeamManagementPage component
- [ ] Build InviteTeamModal component
- [ ] Set up backend API endpoints
- [ ] Implement email sending service
- [ ] Add seat limit validation
- [ ] Create pending invitation list
- [ ] Build acceptance flow

### Phase 2: Enhanced (Week 3-4)
- [ ] Add bulk CSV upload
- [ ] Implement role editing
- [ ] Add member removal feature
- [ ] Create UpgradePrompt modal
- [ ] Add "last active" tracking
- [ ] Implement resend invitation
- [ ] Add search/filter for large teams
- [ ] Create audit log

### Phase 3: Polish (Week 5-6)
- [ ] Add animations and transitions
- [ ] Implement loading states
- [ ] Add error handling & retry logic
- [ ] Create empty states
- [ ] Add tooltips and help text
- [ ] Accessibility testing (WCAG AA)
- [ ] Mobile responsive design
- [ ] Performance optimization

---

## 🔐 SECURITY CONSIDERATIONS

✅ **Email Verification**
- Send unique token per invitation
- Set expiration (7-14 days)
- Invalidate after acceptance

✅ **Role Permissions**
- Only Owner/Admin can invite
- Members cannot change roles
- Prevent self-promotion

✅ **Rate Limiting**
- Max 10 invitations per hour per user
- Max 3 resends per invitation
- Prevent spam abuse

✅ **Data Validation**
- Email format validation
- Duplicate email detection
- Domain whitelist (optional for enterprises)

---

## 📊 SUCCESS METRICS (KPIs)

### Adoption Metrics
- **Invitation Rate:** % of accounts that send ≥1 invitation
- **Target:** 40%+ within 30 days of signup

### Conversion Metrics
- **Acceptance Rate:** Invitations accepted / Invitations sent
- **Target:** 70%+

- **Time to First Invite:** Days from signup to first invitation sent
- **Target:** <7 days

### Upgrade Metrics
- **Free-to-Paid Conversion:** % of users who upgrade after hitting seat limit
- **Target:** 15-25%

### Engagement Metrics
- **Team Size at Upgrade:** Average seats used when users upgrade
- **Target:** 80%+ of free limit

---

## 🎨 DESIGN TOKENS

### Colors
```css
/* Seat usage indicator */
--seat-usage-low: #10B981     /* Green - 0-70% */
--seat-usage-medium: #F59E0B  /* Yellow - 71-90% */
--seat-usage-high: #EF4444    /* Red - 91-100% */

/* Role badges */
--role-owner: #8B5CF6        /* Purple */
--role-admin: #3B82F6        /* Blue */
--role-member: #6B7280       /* Gray */

/* Status indicators */
--status-active: #10B981     /* Green */
--status-pending: #F59E0B    /* Yellow */
--status-inactive: #9CA3AF   /* Gray */
```

### Typography
```css
/* Page title */
font-size: 24px
font-weight: 600
line-height: 32px

/* Section headers */
font-size: 18px
font-weight: 600
line-height: 24px

/* Body text */
font-size: 14px
font-weight: 400
line-height: 20px

/* Labels */
font-size: 12px
font-weight: 500
line-height: 16px
text-transform: uppercase
```

### Spacing
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
```

---

## 💡 FINAL RECOMMENDATIONS

### ✅ MUST HAVE (High Priority)

1. **Free tier allows 1-3 invitations**
   - Reduces friction
   - Viral growth potential
   - Users test before paying

2. **Clear seat usage indicator everywhere**
   - Dashboard widget
   - Team page header
   - Invite modal
   - Settings page

3. **Simple 3-role system**
   - Owner, Admin, Member
   - Clear permission differences
   - Easy to understand

4. **Email-based invitations**
   - Industry standard
   - Secure verification
   - Professional experience

5. **Upgrade prompt at limit**
   - Non-blocking
   - Shows value proposition
   - One-click to pricing

### 🚀 NICE TO HAVE (Medium Priority)

1. **CSV bulk upload**
2. **Usage analytics per member**
3. **Custom role creation**
4. **SSO integration**
5. **Slack/Teams notifications**

### 🔮 FUTURE ENHANCEMENTS (Low Priority)

1. **Guest access for clients**
2. **Project-level permissions**
3. **API access for automation**
4. **White-label team pages**
5. **Advanced audit logs**

---

## 📚 RESOURCES & REFERENCES

### Competitor Examples
- **Semrush User Management:** semrush.com/corporate/account/users
- **Ahrefs Workspace:** ahrefs.com/workspace
- **Mobile Action:** mobileaction.co/pricing

### Design Inspiration
- Notion team settings
- Slack workspace management
- Linear team page
- GitHub organization settings

### Technical References
- JWT for invitation tokens
- SendGrid for transactional emails
- React Hook Form for validation
- Radix UI for accessible components

---

**Document Version:** 1.0
**Last Updated:** November 11, 2025
**Status:** Ready for Implementation
