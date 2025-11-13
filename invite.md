# Complete Invite Team System - User Flow Plan
**From Start to End: Every Interaction Explained**

---

## 🎯 PLAN OVERVIEW

### What We're Building:
A professional team invitation system where:
1. Free users get **2 admin seats** (1 owner + 1 admin invite)
2. When they hit the limit, they see **upgrade options**
3. Real **emails are sent** with verification links
4. Team members **accept invitations** via email
5. Everything is **tracked and secure**

### Core Components:
```
┌─────────────────────────────────────────────────────────┐
│                    SYSTEM COMPONENTS                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Team Management Page (invite.html)                   │
│     └─ Shows current team members                       │
│     └─ Has "Invite Member" button                       │
│                                                          │
│  2. Invite Modal                                         │
│     └─ Email input field(s)                             │
│     └─ Role selector dropdown                           │
│     └─ Send button                                      │
│                                                          │
│  3. Backend API                                          │
│     └─ Validates seat limits                            │
│     └─ Generates invitation tokens                      │
│     └─ Saves to database                                │
│                                                          │
│  4. Email Service                                        │
│     └─ Sends invitation emails                          │
│     └─ Includes accept link with token                  │
│                                                          │
│  5. Upgrade Modal                                        │
│     └─ Shows when limit reached                         │
│     └─ Displays pricing options                         │
│     └─ Links to checkout                                │
│                                                          │
│  6. Invitation Accept Page                               │
│     └─ User lands here from email                       │
│     └─ Verifies token                                   │
│     └─ Adds user to team                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📍 STARTING POINT: User Account States

### State A: New User (Just Signed Up)
```
Account Status:
├─ Plan: Free
├─ Admin Seats: 1/2 used (just the owner)
├─ Viewer Seats: 0/unlimited
└─ Team Members: 1 (owner only)
```

### State B: User with 1 Admin Already Invited
```
Account Status:
├─ Plan: Free
├─ Admin Seats: 2/2 used (owner + 1 admin)
├─ Viewer Seats: 0/unlimited
└─ Team Members: 2
```

### State C: Paid User (Pro Plan)
```
Account Status:
├─ Plan: Pro ($29/month)
├─ Admin Seats: 3/10 used
├─ Viewer Seats: 5/unlimited
└─ Team Members: 8 total
```

---

## 🔄 COMPLETE USER FLOW #1: Successful Invite (Within Limit)

### Scenario: Free user wants to invite their first admin

```
┌────────────────────────────────────────────────────────────────┐
│                    FLOW 1: SUCCESSFUL INVITE                    │
└────────────────────────────────────────────────────────────────┘

STEP 1: User Lands on Team Page
──────────────────────────────────
📱 URL: /team/manage or /settings/team

🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│ 🔍 SearchVector    Team    [FREE PLAN]       │
│                           [+ Invite Member]  │
├──────────────────────────────────────────────┤
│ Team Members                                 │
│ Collaborate on all websites                  │
│                                              │
│ Seat Usage: 1 / 2 admins used               │
│ ████████████████░░░░░░░░░░░░  (50%)         │
│                                              │
│ ℹ️ You have 1 admin seat remaining          │
│                                              │
│ [Active (1)]  [Pending (0)]                 │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [YOU] You (Owner)                    │    │
│ │ john@company.com         [OWNER]     │    │
│ │ Account creator                      │    │
│ └──────────────────────────────────────┘    │
│                                              │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [+ Invite Member] button


STEP 2: Invite Modal Opens
──────────────────────────────────
⚡ Trigger: onClick="openInviteModal()"

🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│ Invite Team Member                      [×]  │
│ Send invitation to collaborate               │
├──────────────────────────────────────────────┤
│                                              │
│ Email Address *                              │
│ ┌────────────────────────────────────────┐  │
│ │ [cursor blinking]                      │  │ ← Auto-focused
│ └────────────────────────────────────────┘  │
│                                              │
│ Role *                              [ℹ️]    │
│ ┌────────────────────────────────────────┐  │
│ │ Admin - Manage websites & team    ▼   │  │
│ └────────────────────────────────────────┘  │
│   │                                          │
│   └─ Options:                                │
│      • Admin - Manage websites & team        │
│      • Member - Create & edit websites       │
│      • Viewer - View-only (Unlimited)        │
│                                              │
│ Summary:                                     │
│ • 1 invitation will be sent                  │
│ • Seat usage after: 2/2 admin seats         │
│                                              │
│             [Cancel]  [Send Invitation]     │
│                                              │
└──────────────────────────────────────────────┘

👆 User Action:
   1. Types: sarah@company.com
   2. Selects: Admin role
   3. Clicks [Send Invitation]


STEP 3: Frontend Validation
──────────────────────────────────
💻 What Happens (JavaScript):

function sendInvitation() {
    // 1. Get values
    email = "sarah@company.com"
    role = "admin"

    // 2. Validate email format
    if (!isValidEmail(email)) {
        ❌ Show error: "Invalid email format"
        return;
    }

    // 3. Check if already invited
    if (teamMembers.includes(email)) {
        ❌ Show error: "sarah@company.com already invited"
        return;
    }

    // 4. Get current seat usage
    currentAdmins = 1 (owner)
    planLimit = 2 (free plan)

    // 5. Check if would exceed limit
    if (currentAdmins + 1 > planLimit) {
        ❌ Block and show upgrade modal
        return;
    }

    // ✅ All checks passed
    // 6. Show loading state
    button.text = "Sending..."
    button.disabled = true

    // 7. Call backend API
    await sendToBackend()
}

⏳ User Sees: Button changes to "Sending..."


STEP 4: Backend API Call
──────────────────────────────────
🌐 Request Sent:

POST /api/v1/team/invitations
Headers:
  Authorization: Bearer <user_token>
  Content-Type: application/json

Body:
{
  "email": "sarah@company.com",
  "role": "admin"
}

📡 Backend Processing:

1. Authenticate user (verify token)
   ├─ ❌ If invalid: Return 401 Unauthorized
   └─ ✅ If valid: Continue

2. Get user's team & plan info
   teamId = 12345
   userId = 67890
   plan = "Free"
   adminLimit = 2

3. Count current admin seats
   currentAdmins = SELECT COUNT(*)
                   FROM team_members
                   WHERE team_id = 12345
                   AND role = 'admin'
                   AND status IN ('active', 'pending')

   currentAdmins = 1

4. Verify limit
   if (currentAdmins + 1 > adminLimit) {
       ❌ Return error:
       {
         "error": "SEAT_LIMIT_REACHED",
         "message": "You've reached your limit of 2 admin seats",
         "currentSeats": 2,
         "planLimit": 2,
         "upgradePath": "/pricing"
       }
   }

5. Check duplicate invitation
   existing = SELECT * FROM team_invitations
              WHERE email = 'sarah@company.com'
              AND team_id = 12345
              AND status = 'pending'

   if (existing) {
       ❌ Return error:
       {
         "error": "ALREADY_INVITED",
         "message": "sarah@company.com has already been invited"
       }
   }

6. ✅ All checks passed - Create invitation

   // Generate secure token
   token = crypto.randomBytes(32).toString('hex')
   // Example: "a3f9c8e2b1d5f7a9c4e6b8d2f5a7c9e4b6d8f1a3c5e7b9d2f4a6c8e1b3d5f7a9"

   // Set expiration (7 days from now)
   expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000)

   // Save to database
   INSERT INTO team_invitations (
       id,
       team_id,
       email,
       role,
       token,
       invited_by_user_id,
       status,
       created_at,
       expires_at
   ) VALUES (
       98765,
       12345,
       'sarah@company.com',
       'admin',
       'a3f9c8e2b1d5f7a9c4e6b8d2f5a7c9e4...',
       67890,
       'pending',
       '2025-11-11 10:30:00',
       '2025-11-18 10:30:00'
   )

7. Send invitation email (async)
   emailService.send({
       to: 'sarah@company.com',
       subject: 'You've been invited to join Acme Corp',
       template: 'team-invitation',
       data: {
           inviterName: 'John Doe',
           teamName: 'Acme Corp',
           role: 'Admin',
           acceptUrl: 'https://app.searchvector.com/invite/accept?token=a3f9c8e2b1d5f7a9...',
           expiresInDays: 7
       }
   })

8. ✅ Return success response
   {
     "success": true,
     "invitation": {
       "id": 98765,
       "email": "sarah@company.com",
       "role": "admin",
       "status": "pending",
       "invitedBy": "John Doe",
       "createdAt": "2025-11-11T10:30:00Z",
       "expiresAt": "2025-11-18T10:30:00Z"
     }
   }


STEP 5: Frontend Receives Success
──────────────────────────────────
💻 JavaScript Receives Response:

response = {
  success: true,
  invitation: { ... }
}

✅ Actions Taken:

1. Hide loading state
   button.text = "Send Invitation"
   button.disabled = false

2. Close modal
   document.getElementById('inviteModal').classList.remove('active')

3. Show success toast
   showToast('Success', 'Invitation sent to sarah@company.com')

4. Refresh team list
   await fetchTeamMembers()

5. Update UI counts
   updateSeatUsage() // Now shows 2/2

🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│              [Toast Notification]            │
│  ✅ Success                                   │
│  Invitation sent to sarah@company.com        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Team Members                                 │
│                                              │
│ Seat Usage: 2 / 2 admins used ⚠️            │
│ ████████████████████████████████  (100%)    │
│ ⚠️ At seat limit - Upgrade to add more      │
│                                              │
│ [Active (1)]  [Pending (1)] ← New           │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [YOU] You (Owner)                    │    │
│ │ john@company.com         [OWNER]     │    │
│ └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [Pending (1)] tab


STEP 6: User Views Pending Tab
──────────────────────────────────
🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│ [Active (1)]  [Pending (1)] ← Selected      │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [SA] Sarah                           │    │
│ │ sarah@company.com       [ADMIN]      │    │
│ │ Invited just now • Expires in 7 days │    │
│ │                                 [⋮]  │    │
│ └──────────────────────────────────────┘    │
│                                              │
└──────────────────────────────────────────────┘

Dropdown menu options:
├─ Copy Invitation Link
├─ Resend Email
└─ Cancel Invitation


STEP 7: Email Sent to Sarah
──────────────────────────────────
📧 Sarah receives email within seconds:

From: SearchVector <noreply@searchvector.com>
To: sarah@company.com
Subject: You've been invited to join Acme Corp on SearchVector

┌──────────────────────────────────────────────┐
│                                              │
│           🔍 SearchVector                    │
│                                              │
│  Hi Sarah!                                   │
│                                              │
│  John Doe has invited you to join           │
│  Acme Corp on SearchVector as an Admin.     │
│                                              │
│  As an Admin, you'll be able to:            │
│  ✅ Manage all websites                      │
│  ✅ Invite team members                      │
│  ✅ Access analytics & reports               │
│  ✅ Configure team settings                  │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │    Accept Invitation →            │     │
│  └────────────────────────────────────┘     │
│  Links to: https://app.searchvector.com/    │
│            invite/accept?token=a3f9c8e2...  │
│                                              │
│  This invitation expires in 7 days.         │
│                                              │
│  If you didn't expect this, you can safely  │
│  ignore this email.                          │
│                                              │
│  ──────────────────────────────────          │
│  © 2025 SearchVector                        │
│  Help Center | Privacy Policy               │
│                                              │
└──────────────────────────────────────────────┘

👆 Sarah's Action: Clicks [Accept Invitation] button


STEP 8: Sarah Lands on Accept Page
──────────────────────────────────
🌐 URL: https://app.searchvector.com/invite/accept?token=a3f9c8e2b1d5f7a9...

📡 Backend Processing:

1. Extract token from URL
   token = "a3f9c8e2b1d5f7a9c4e6b8d2f5a7c9e4b6d8f1a3c5e7b9d2f4a6c8e1b3d5f7a9"

2. Look up invitation
   invitation = SELECT * FROM team_invitations
                WHERE token = 'a3f9c8e2b1d5f7a9...'

   Found:
   {
     id: 98765,
     email: 'sarah@company.com',
     role: 'admin',
     status: 'pending',
     expiresAt: '2025-11-18 10:30:00'
   }

3. Validate invitation
   ├─ ❌ If not found: "Invalid invitation link"
   ├─ ❌ If already accepted: "Invitation already used"
   ├─ ❌ If expired: "Invitation has expired"
   └─ ✅ If valid: Show accept page

🖥️ What Sarah Sees:

IF SARAH DOESN'T HAVE ACCOUNT:
┌──────────────────────────────────────────────┐
│           Accept Team Invitation             │
├──────────────────────────────────────────────┤
│                                              │
│  You've been invited to join                 │
│  Acme Corp as an Admin                       │
│                                              │
│  Create your account to get started:         │
│                                              │
│  Email (pre-filled)                          │
│  [sarah@company.com          ] 🔒           │
│                                              │
│  Full Name *                                 │
│  [                            ]              │
│                                              │
│  Password *                                  │
│  [                            ]              │
│                                              │
│  [✓] I agree to Terms & Privacy Policy       │
│                                              │
│  [Accept Invitation & Create Account]       │
│                                              │
└──────────────────────────────────────────────┘

IF SARAH ALREADY HAS ACCOUNT:
┌──────────────────────────────────────────────┐
│           Accept Team Invitation             │
├──────────────────────────────────────────────┤
│                                              │
│  Welcome back, Sarah!                        │
│                                              │
│  You've been invited to join                 │
│  Acme Corp as an Admin                       │
│                                              │
│  Sign in to accept:                          │
│                                              │
│  Email                                       │
│  [sarah@company.com          ]              │
│                                              │
│  Password                                    │
│  [                            ]              │
│                                              │
│  [Sign In & Accept Invitation]              │
│                                              │
│  Or [Create New Account]                     │
│                                              │
└──────────────────────────────────────────────┘

👆 Sarah's Action:
   - Fills in form (if new user)
   - OR signs in (if existing user)
   - Clicks accept button


STEP 9: Invitation Accepted
──────────────────────────────────
📡 Backend Processing:

1. Create user account (if new)
   INSERT INTO users (
       id, email, name, password_hash, created_at
   ) VALUES (
       55555, 'sarah@company.com', 'Sarah Johnson',
       '$2b$10$...hashed...', '2025-11-11 10:45:00'
   )

2. Add to team members
   INSERT INTO team_members (
       id, team_id, user_id, role, status, joined_at
   ) VALUES (
       77777, 12345, 55555, 'admin', 'active', '2025-11-11 10:45:00'
   )

3. Update invitation status
   UPDATE team_invitations
   SET status = 'accepted',
       accepted_at = '2025-11-11 10:45:00',
       accepted_by_user_id = 55555
   WHERE id = 98765

4. Send welcome email to Sarah
   emailService.send({
       to: 'sarah@company.com',
       subject: 'Welcome to Acme Corp on SearchVector',
       template: 'welcome-team-member'
   })

5. Send notification to John (inviter)
   emailService.send({
       to: 'john@company.com',
       subject: 'Sarah accepted your invitation',
       template: 'invitation-accepted'
   })

✅ Return success, create session for Sarah


STEP 10: Sarah Redirected to Dashboard
──────────────────────────────────────
🖥️ What Sarah Sees:
┌──────────────────────────────────────────────┐
│           Welcome to SearchVector! 🎉        │
├──────────────────────────────────────────────┤
│                                              │
│  You're now part of Acme Corp               │
│                                              │
│  Quick Start Guide:                          │
│  1. View your team's websites                │
│  2. Check latest analytics                   │
│  3. Invite more team members                 │
│                                              │
│  [Go to Dashboard]                           │
│                                              │
└──────────────────────────────────────────────┘

👆 Clicks [Go to Dashboard]

🖥️ Sarah Now Sees:
┌──────────────────────────────────────────────┐
│ 🔍 SearchVector    Dashboard    [Acme Corp]  │
│                                              │
│ Welcome, Sarah! (Admin)                      │
│                                              │
│ Websites (3)                                 │
│ ├─ acmecorp.com                             │
│ ├─ products.acme.com                        │
│ └─ blog.acme.com                            │
│                                              │
└──────────────────────────────────────────────┘


STEP 11: John (Inviter) Sees Update
──────────────────────────────────────
Meanwhile, John checks his team page:

🖥️ What John Sees:
┌──────────────────────────────────────────────┐
│ Team Members                                 │
│                                              │
│ Seat Usage: 2 / 2 admins used               │
│ ████████████████████████████████  (100%)    │
│ ⚠️ At seat limit - [Upgrade Now]            │
│                                              │
│ [Active (2)]  [Pending (0)]                 │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [YOU] You (Owner)                    │    │
│ │ john@company.com         [OWNER]     │    │
│ └──────────────────────────────────────┘    │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [SA] Sarah Johnson         [ADMIN]   │    │ ← NEW!
│ │ sarah@company.com                    │    │
│ │ Joined 5 minutes ago                 │    │
│ │                                 [⋮]  │    │
│ └──────────────────────────────────────┘    │
│                                              │
└──────────────────────────────────────────────┘

✅ FLOW COMPLETE - Invitation successful!
```

---

## 🔄 COMPLETE USER FLOW #2: Invite Blocked (At Limit)

### Scenario: Free user tries to invite 2nd admin (exceeds limit)

```
┌────────────────────────────────────────────────────────────────┐
│              FLOW 2: INVITATION BLOCKED AT LIMIT                │
└────────────────────────────────────────────────────────────────┘

STARTING STATE:
├─ Plan: Free
├─ Admin Seats: 2/2 used (owner + 1 active admin)
└─ User wants to invite another admin

STEP 1: User on Team Page
──────────────────────────────────
🖥️ Visual Warning Already Visible:

┌──────────────────────────────────────────────┐
│ Team Members                                 │
│                                              │
│ Seat Usage: 2 / 2 admins used               │
│ ████████████████████████████████  (100%)    │ ← RED bar
│ ⚠️ At seat limit - Upgrade to add more      │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ 💡 Need more admin seats?              │  │
│ │ Upgrade to Pro for 10 admin seats      │  │
│ │                      [View Plans →]   │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ [Active (2)]  [Pending (0)]                 │
│                                              │
│ [+ Invite Member] button is still visible   │
└──────────────────────────────────────────────┘

⚠️ Note: Button NOT disabled - we want to capture intent

👆 User Action: Clicks [+ Invite Member]


STEP 2: Invite Modal Opens
──────────────────────────────────
🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│ Invite Team Member                      [×]  │
├──────────────────────────────────────────────┤
│                                              │
│ Email Address *                              │
│ [mike@company.com            ]              │
│                                              │
│ Role *                                       │
│ [Admin - Manage websites ▼   ]             │
│                                              │
│ Summary:                                     │
│ • 1 invitation will be sent                  │
│ • ⚠️ Seat usage after: 3/2 EXCEEDS LIMIT    │ ← Warning
│                                              │
│             [Cancel]  [Send Invitation]     │
│                                              │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [Send Invitation]


STEP 3: Frontend Check BLOCKS Immediately
──────────────────────────────────────────
💻 JavaScript:

function sendInvitation() {
    email = "mike@company.com"
    role = "admin"

    // Get current usage
    currentAdmins = 2  // owner + 1 active
    planLimit = 2      // free plan

    // CHECK LIMIT
    if (role === 'admin' && currentAdmins >= planLimit) {
        ❌ BLOCKED!

        // Close invite modal
        closeInviteModal()

        // Show upgrade modal instead
        showUpgradeModal({
            currentSeats: 2,
            planLimit: 2,
            attemptedEmail: 'mike@company.com',
            attemptedRole: 'admin'
        })

        return; // STOP - Don't call API
    }
}

⚡ Invite modal closes
⚡ Upgrade modal opens


STEP 4: Upgrade Modal Appears
──────────────────────────────────
🖥️ What User Sees:

┌──────────────────────────────────────────────────────────┐
│  ⚠️ You've Reached Your Seat Limit                  [×] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  You're currently using all 2 admin seats on your       │
│  Free plan. To invite mike@company.com, upgrade now:    │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │  🌟 PRO PLAN         │  │  TEAM PLAN           │    │
│  │  RECOMMENDED         │  │                      │    │
│  │                      │  │                      │    │
│  │  $29/month           │  │  $79/month           │    │
│  │                      │  │                      │    │
│  │  ✅ 10 admin seats   │  │  ✅ 50 admin seats   │    │
│  │  ✅ Unlimited viewers│  │  ✅ All Pro features │    │
│  │  ✅ Advanced reports │  │  ✅ Priority support │    │
│  │  ✅ Priority support │  │  ✅ Dedicated manager│    │
│  │                      │  │                      │    │
│  │  [Upgrade to Pro →] │  │  [Upgrade to Team →]│    │
│  └──────────────────────┘  └──────────────────────┘    │
│                                                          │
│  Alternative:                                            │
│  • Remove inactive admin to free up a seat              │
│  • Or invite as Viewer (unlimited & free)               │
│                                                          │
│  [Go Back]                [Compare All Plans →]         │
│                                                          │
└──────────────────────────────────────────────────────────┘

Now User Has 4 Choices:


CHOICE A: User Clicks [Upgrade to Pro]
─────────────────────────────────────────
🌐 Redirect to: /pricing?plan=pro&source=invite_limit

🖥️ Pricing Page Loads:
┌──────────────────────────────────────────────┐
│  Choose Your Plan                            │
│                                              │
│  Currently inviting: mike@company.com        │ ← Context shown
│                                              │
│  [Free]  [PRO ✓]  [Team]  [Enterprise]      │
│                                              │
│  Pro Plan - $29/month                        │
│  ✅ 10 admin seats (you need 3)             │
│  ✅ Unlimited viewers                        │
│  ✅ Advanced analytics                       │
│  ✅ Priority support                         │
│                                              │
│  [Continue to Checkout →]                    │
└──────────────────────────────────────────────┘

👆 User completes checkout
✅ Plan upgraded
✅ Returns to team page
✅ Can now send invitation to Mike


CHOICE B: User Clicks [Go Back]
─────────────────────────────────────────
🖥️ Modal closes, back to team page

User can:
├─ Try inviting as Viewer instead (allowed)
├─ Remove an admin to free up space
└─ Come back later


CHOICE C: User Removes Inactive Admin
─────────────────────────────────────────
🖥️ User clicks [⋮] on existing admin
└─ Clicks "Remove from Team"

Confirmation:
┌──────────────────────────────────────────────┐
│  Remove Team Member?                         │
│                                              │
│  Are you sure you want to remove             │
│  Sarah from your team?                       │
│                                              │
│  She will lose access to all websites.       │
│                                              │
│  [Cancel]  [Yes, Remove]                     │
└──────────────────────────────────────────────┘

✅ Admin removed
✅ Seat freed: Now 1/2 used
✅ User can invite Mike now


CHOICE D: User Invites as Viewer Instead
─────────────────────────────────────────
🖥️ User opens invite modal again
└─ Changes role dropdown to "Viewer"

Summary shows:
• Seat usage after: 2/2 admins, 1/∞ viewers ✅

✅ Invitation allowed (viewers unlimited)
✅ Email sent to Mike as Viewer


END OF FLOW 2 ✅
```

---

## 🔄 COMPLETE USER FLOW #3: Resend Invitation

### Scenario: Invitee didn't receive/see email

```
┌────────────────────────────────────────────────────────────────┐
│                  FLOW 3: RESEND INVITATION                      │
└────────────────────────────────────────────────────────────────┘

STEP 1: John Checks Pending Tab
──────────────────────────────────
3 days have passed since invitation sent

🖥️ What John Sees:
┌──────────────────────────────────────────────┐
│ [Active (2)]  [Pending (1)]                 │
│                                              │
│ ┌──────────────────────────────────────┐    │
│ │ [TE] Terry                           │    │
│ │ terry@company.com       [ADMIN]      │    │
│ │ Invited 3 days ago • Expires in 4 days│   │ ← Still pending
│ │                                 [⋮]  │    │
│ └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [⋮] dropdown


STEP 2: Dropdown Menu Opens
──────────────────────────────────
🖥️ What User Sees:
┌────────────────────────────┐
│ 🔗 Copy Invitation Link    │
│ 📧 Resend Email           │ ← This one
│ ❌ Cancel Invitation       │
└────────────────────────────┘

👆 User Action: Clicks [Resend Email]


STEP 3: Confirmation Dialog
──────────────────────────────────
🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│  Resend Invitation Email?                    │
│                                              │
│  Send another email to terry@company.com?    │
│                                              │
│  The original invitation link will still     │
│  work. Expires in 4 days.                    │
│                                              │
│  [Cancel]  [Yes, Resend Email]              │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [Yes, Resend Email]


STEP 4: API Call
──────────────────────────────────
📡 Request:

POST /api/v1/team/invitations/98765/resend
Headers:
  Authorization: Bearer <user_token>

Backend:
1. Find invitation by ID
2. Check it's still pending
3. Check not expired
4. ✅ Resend same email with same token
5. Update resent_count and last_sent_at

Response:
{
  "success": true,
  "message": "Invitation resent",
  "resentAt": "2025-11-14 15:20:00"
}


STEP 5: Success Feedback
──────────────────────────────────
🖥️ Toast appears:
┌──────────────────────────────────────────────┐
│  ✅ Success                                   │
│  Invitation resent to terry@company.com      │
└──────────────────────────────────────────────┘

🖥️ Pending card updates:
┌──────────────────────────────────────────┐
│ [TE] Terry                               │
│ terry@company.com       [ADMIN]          │
│ Resent just now • Expires in 4 days      │ ← Updated
└──────────────────────────────────────────┘


STEP 6: Terry Receives New Email
──────────────────────────────────
📧 Same email as before sent again
└─ Same token, still valid

👆 Terry clicks link
✅ Normal acceptance flow continues

END OF FLOW 3 ✅
```

---

## 🔄 COMPLETE USER FLOW #4: Cancel Invitation

```
┌────────────────────────────────────────────────────────────────┐
│                  FLOW 4: CANCEL INVITATION                      │
└────────────────────────────────────────────────────────────────┘

STEP 1: John Decides to Cancel
──────────────────────────────────
Reason: Invited wrong person

🖥️ Clicks [⋮] on pending invitation
└─ Clicks [Cancel Invitation]


STEP 2: Confirmation
──────────────────────────────────
┌──────────────────────────────────────────────┐
│  Cancel Invitation?                          │
│                                              │
│  Cancel invitation to terry@company.com?     │
│                                              │
│  They will no longer be able to accept.      │
│  You can invite them again later.            │
│                                              │
│  [Go Back]  [Yes, Cancel Invitation]        │
└──────────────────────────────────────────────┘

👆 User Action: Clicks [Yes, Cancel Invitation]


STEP 3: API Call
──────────────────────────────────
DELETE /api/v1/team/invitations/98765

Backend:
1. Update status to 'cancelled'
2. Invalidate token
3. Update cancelled_by and cancelled_at

Response:
{
  "success": true,
  "message": "Invitation cancelled"
}


STEP 4: UI Updates
──────────────────────────────────
✅ Card removed from Pending tab
✅ Toast shows: "Invitation cancelled"
✅ Seat freed: 1/2 used (if was admin)
✅ Can invite someone else now

If Terry tries to click old email link:
❌ "This invitation has been cancelled"

END OF FLOW 4 ✅
```

---

## 🔄 COMPLETE USER FLOW #5: Invitation Expired

```
┌────────────────────────────────────────────────────────────────┐
│                  FLOW 5: EXPIRED INVITATION                     │
└────────────────────────────────────────────────────────────────┘

DAY 0: Invitation sent
DAY 7: Invitation expires (auto)
DAY 8: Terry finally clicks email link


STEP 1: Terry Clicks Expired Link
──────────────────────────────────
🌐 URL: /invite/accept?token=a3f9c8e2...

Backend checks:
if (invitation.expiresAt < now) {
    ❌ EXPIRED
}


STEP 2: Error Page Shown
──────────────────────────────────
🖥️ What Terry Sees:
┌──────────────────────────────────────────────┐
│  ⚠️ Invitation Expired                       │
├──────────────────────────────────────────────┤
│                                              │
│  This invitation from Acme Corp expired      │
│  on November 18, 2025.                       │
│                                              │
│  Contact john@company.com to request a       │
│  new invitation.                             │
│                                              │
│  [Contact Support] [Go to Homepage]         │
│                                              │
└──────────────────────────────────────────────┘


STEP 3: John's Dashboard Shows
──────────────────────────────────
🖥️ Pending tab shows:
┌──────────────────────────────────────────┐
│ [TE] Terry                               │
│ terry@company.com       [ADMIN]          │
│ ⚠️ Expired 1 day ago                     │ ← Red warning
│                                    [⋮]   │
│ └─ [Remove]                              │ ← Only option
│    [Resend disabled - expired]           │
└──────────────────────────────────────────┘

OR: Auto-removed after 30 days


STEP 4: John Sends New Invitation
──────────────────────────────────
1. Remove expired invitation
2. Send fresh invitation (new token, new 7 days)
3. Terry can now accept

END OF FLOW 5 ✅
```

---

## 🔄 COMPLETE USER FLOW #6: Bulk Invitation

```
┌────────────────────────────────────────────────────────────────┐
│                  FLOW 6: BULK INVITATION                        │
└────────────────────────────────────────────────────────────────┘

Scenario: User wants to invite 5 people at once


STEP 1: Open Invite Modal
──────────────────────────────────
🖥️ What User Sees:
┌──────────────────────────────────────────────┐
│ Invite Team Members                     [×]  │ ← Plural
├──────────────────────────────────────────────┤
│                                              │
│ Email Addresses *                            │
│ [person1@company.com          ]             │
│ [person2@company.com          ] [×]         │ ← Remove button
│ [person3@company.com          ] [×]         │
│                                              │
│ [+ Add Another Email]                        │
│                                              │
│ Role for all *                               │
│ [Admin ▼]                                   │
│                                              │
│ Summary:                                     │
│ • 3 invitations will be sent                 │
│ • Seat usage after: 4/10 admin seats        │
│ • Cost: Included in your plan               │
│                                              │
│             [Cancel]  [Send Invitations]    │
│                                              │
└──────────────────────────────────────────────┘

👆 User Actions:
1. Types 3 email addresses
2. Clicks [+ Add Another Email] twice more
3. Adds 2 more emails (total: 5)
4. Selects "Admin" role
5. Clicks [Send Invitations]


STEP 2: Frontend Validation
──────────────────────────────────
💻 JavaScript:

emails = [
  "person1@company.com",
  "person2@company.com",
  "person3@company.com",
  "person4@company.com",
  "person5@company.com"
]

// Check all emails valid
invalidEmails = emails.filter(e => !isValidEmail(e))
if (invalidEmails.length > 0) {
    ❌ Show error: "Invalid email: person4@company.com"
    return
}

// Check duplicates in list
duplicates = findDuplicates(emails)
if (duplicates.length > 0) {
    ❌ Show error: "Duplicate email in list"
    return
}

// Check seat limits
currentAdmins = 3
planLimit = 10
if (currentAdmins + emails.length > planLimit) {
    ❌ Show upgrade modal
    return
}

✅ All checks passed


STEP 3: Batch API Call
──────────────────────────────────
📡 Request:

POST /api/v1/team/invitations/bulk
Body:
{
  "invitations": [
    { "email": "person1@company.com", "role": "admin" },
    { "email": "person2@company.com", "role": "admin" },
    { "email": "person3@company.com", "role": "admin" },
    { "email": "person4@company.com", "role": "admin" },
    { "email": "person5@company.com", "role": "admin" }
  ]
}

Backend processes each:
├─ person1: ✅ Success
├─ person2: ✅ Success
├─ person3: ❌ Already invited
├─ person4: ✅ Success
└─ person5: ✅ Success

Response:
{
  "success": true,
  "results": {
    "successful": 4,
    "failed": 1,
    "details": [
      { "email": "person1@...", "status": "sent" },
      { "email": "person2@...", "status": "sent" },
      { "email": "person3@...", "status": "error", "reason": "Already invited" },
      { "email": "person4@...", "status": "sent" },
      { "email": "person5@...", "status": "sent" }
    ]
  }
}


STEP 4: Results Summary
──────────────────────────────────
🖥️ Toast shows:
┌──────────────────────────────────────────────┐
│  ✅ Partial Success                           │
│  4 invitations sent, 1 failed                │
│  [View Details]                              │
└──────────────────────────────────────────────┘

Click [View Details]:
┌──────────────────────────────────────────────┐
│  Invitation Results                          │
├──────────────────────────────────────────────┤
│  ✅ person1@company.com - Sent               │
│  ✅ person2@company.com - Sent               │
│  ❌ person3@company.com - Already invited    │
│  ✅ person4@company.com - Sent               │
│  ✅ person5@company.com - Sent               │
│                                              │
│  [Done]                                      │
└──────────────────────────────────────────────┘


STEP 5: Pending Tab Updated
──────────────────────────────────
🖥️ Shows 4 new pending invitations:
┌──────────────────────────────────────────┐
│ [Pending (4)]                            │
│                                          │
│ [P1] person1@company.com    [ADMIN]     │
│ [P2] person2@company.com    [ADMIN]     │
│ [P4] person4@company.com    [ADMIN]     │
│ [P5] person5@company.com    [ADMIN]     │
└──────────────────────────────────────────┘

✅ All 4 emails sent simultaneously
✅ Each recipient gets their own accept link

END OF FLOW 6 ✅
```

---

## 📊 COMPLETE SYSTEM STATE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                     SYSTEM STATES                                │
└─────────────────────────────────────────────────────────────────┘

USER ACCOUNT STATES:
┌──────────────┐
│  New Account │ (Plan: Free, 1/2 seats)
└──────┬───────┘
       │
       ├─ Invites 1st admin → Within limit
       │  └─> [1 Pending Invitation]
       │      │
       │      ├─ Accepted → [1 Active Admin]
       │      │              └─> 2/2 seats used
       │      │                  └─> At limit state
       │      │
       │      ├─ Cancelled → Back to 1/2
       │      │
       │      └─ Expired → Back to 1/2
       │
       └─ Tries to invite 2nd admin → BLOCKED
          └─> [Upgrade Modal Shown]
              │
              ├─ Upgrades → [Pro Plan]
              │              └─> 2/10 seats
              │                  └─> Can invite more
              │
              └─ Doesn't upgrade → Stays at 2/2


INVITATION STATES:
┌─────────┐     Sent      ┌─────────┐
│ Created │ ───────────> │ Pending │
└─────────┘               └────┬────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
            Accepted       Cancelled      Expired
                │              │              │
                ▼              ▼              ▼
          ┌─────────┐    ┌──────────┐   ┌─────────┐
          │ Active  │    │ Cancelled│   │ Expired │
          │ Member  │    └──────────┘   └─────────┘
          └─────────┘

TEAM MEMBER STATES:
┌────────┐    Accepted    ┌────────┐    Removed    ┌─────────┐
│ Invited│ ─────────────> │ Active │ ────────────> │ Removed │
└────────┘                └────────┘               └─────────┘
```

---

## 📋 COMPLETE INTERACTION CHECKLIST

Every possible user action and system response:

### Team Management Page:
```
☐ View team members list
☐ See seat usage indicator (visual bar)
☐ Click [+ Invite Member] button
☐ Switch between Active/Pending tabs
☐ Click [⋮] on member card
☐ Click [Upgrade] when at limit
☐ Filter/search team members (future)
```

### Invite Modal:
```
☐ Type email address
☐ Add multiple email fields
☐ Remove email field
☐ Select role from dropdown
☐ View role permissions (ℹ️ icon)
☐ See real-time seat usage preview
☐ Click [Send Invitation]
☐ Click [Cancel]
☐ Close modal (×)
```

### Upgrade Modal:
```
☐ See current seat usage
☐ View pricing tier options
☐ Click [Upgrade to Pro]
☐ Click [Upgrade to Team]
☐ Click [Compare All Plans]
☐ Click [Go Back]
☐ Close modal (×)
```

### Member Dropdown Menu:
```
Active Members:
☐ Change role
☐ Remove from team

Pending Invitations:
☐ Copy invitation link
☐ Resend email
☐ Cancel invitation
```

### Invitation Accept Page:
```
☐ View invitation details
☐ Create new account
☐ Sign in to existing account
☐ Accept invitation
☐ Decline invitation (future)
```

### Email Interactions:
```
☐ Receive invitation email
☐ Click [Accept Invitation] button
☐ Receive welcome email (after accepting)
☐ Receive acceptance notification (inviter)
☐ Receive reminder email (optional, 3 days)
```

---

## 🎯 SUMMARY: The Complete Picture

### What Happens in Each Flow:

**Flow 1 - Success (Most Common):**
```
User clicks invite → Modal opens → Enters email →
Backend validates → Email sent → Invitee clicks link →
Creates account → Joins team → Everyone notified
```

**Flow 2 - Blocked (Monetization):**
```
User clicks invite → Modal opens → Enters email →
Frontend checks limit → BLOCKED → Upgrade modal →
User sees pricing → Upgrades OR goes back
```

**Flow 3 - Resend:**
```
User sees pending invitation → Clicks resend →
Confirms → Same email resent → Invitee receives again
```

**Flow 4 - Cancel:**
```
User sees pending invitation → Clicks cancel →
Confirms → Invitation invalidated → Seat freed
```

**Flow 5 - Expired:**
```
7 days pass → Auto-expires → Invitee clicks old link →
Error shown → Must request new invitation
```

**Flow 6 - Bulk:**
```
User enters 5 emails → Backend processes batch →
Some succeed, some fail → Results shown →
Multiple emails sent at once
```

---

## 🔄 Data Flow Summary

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ◄──────> │   Backend   │ ◄──────> │  Database   │
│  (invite.   │  HTTPS   │   API       │   SQL    │  (Tables)   │
│   html)     │          │  (Node.js)  │          │             │
└──────┬──────┘         └──────┬──────┘         └─────────────┘
       │                       │
       │                       │
       ▼                       ▼
┌─────────────┐         ┌─────────────┐
│  Email      │         │  Email      │
│  Service    │ ◄────── │  Queue      │
│  (SendGrid) │  SMTP   │  (Job)      │
└─────────────┘         └─────────────┘
       │
       ▼
┌─────────────┐
│  Invitee's  │
│  Inbox      │
└─────────────┘
```

---

**Document Complete!**
**All flows explained from start to finish.**
**Every interaction covered.**
