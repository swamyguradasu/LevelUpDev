# LevelUpDev QA Test Report

## Testing Date
**August 30, 2026**

## Project Environment
- **Framework**: Next.js 16.3.2 (Turbopack, App Router, React 19, TypeScript, Tailwind CSS)
- **Node Environment**: Node.js v20+ / Windows 11
- **Server Status**: Running locally on `http://localhost:3000`

## Database
- **Primary Database**: Google Firebase Cloud Firestore (`user_activity`, `internship_applications`, `users`)
- **Local Fallback**: Client `localStorage` dynamic caching with auto-resync
- **Master Static Roster**: `LevelUpDev – Portfolio Profile.csv` parsed server-side via `src/lib/csvRoster.ts`

## Authentication System
- **Authentication Method**: Custom registration-number password authentication against server-parsed CSV roster
- **Role Authorization**: `admin` role assigned strictly to `swamy@levelupdev.com`; `member` role for verified students
- **Session Persistence**: Client-side storage of active verified email + server route authorization guards

## Accounts Tested
- **Account A (Learning & Modules Test)**: `dhanisha@levelupdev.com` (Registration: `25A21A6130`)
- **Account B (DSA & Challenges Test)**: `abdul@levelupdev.com` (Registration: `24A21A61A4`)
- **Account C (Internships Test)**: `srivallika@levelupdev.com` (Registration: `25A21A6165`)
- **Account D (Projects Test)**: `ramanamaharshi@levelupdev.com` (Registration: `25A21A6198`)
- **Account E (Progress, Streaks & Admin Consistency Test)**: `swamy@levelupdev.com` (Registration: `24A21A6145` / Admin)

---

## Features Tested

### Authentication
- **Status**: ✅ PASS
- **Result**: Validated successful login for students and admin. Verified 401 Unauthorized for incorrect passwords, 404 Not Found for non-roster emails, and 404 for removed legacy dummy admin accounts (`levelupdev@admin.com`).
- **Issues**: None.

### Student Dashboard
- **Status**: ✅ PASS
- **Result**: The `/dashboard` route dynamically calculates and renders Career Readiness percentage (0–100%), 7 competency pillar bars, DSA problem solve metrics, and prioritized Next Actions based exclusively on the student's authentic dynamic data.
- **Issues**: None.

### Learning Modules
- **Status**: ✅ PASS
- **Result**: Successfully completed `python/mod-py-1` for student Dhanisha via `POST /api/db/progress`. Progress was saved to Firestore/LocalStorage, and completion status persisted across page refresh, navigation, and re-login.
- **Issues**: None.

### DSA Challenges
- **Status**: ✅ PASS
- **Result**: Verified Daily Challenge ("Two Sum") rendering, solution submission flow, LeetCode problem deep-links, and streak activity recording.
- **Issues**: None.

### DSA Statistics
- **Status**: ✅ PASS
- **Result**: Dynamically aggregates verified platform solves, CS Foundations topic coverage, and live LeetCode API synchronization (`/api/leetcode?username=...`). Verified topic-wise breakdown (13 topics) with zero hardcoded values.
- **Issues**: None.

### Projects
- **Status**: ✅ PASS
- **Result**: Submitted mini-project ("Document Intelligence & Extraction API") for student Ramana via `POST /api/db/projects`. Verified GitHub URL and Live Demo URL format validation (rejection of non-HTTP URLs with 400 Bad Request). Status persisted cleanly.
- **Issues**: None.

### Internship
- **Status**: ✅ PASS
- **Result**: Submitted application for Sri Vallika ("Applied AI & ML Research Intern") via `POST /api/db/internships`. Verified student retrieval of own application, admin review status updates (Under Review / Selected), and 403 Forbidden rejection when non-admin attempts to update status.
- **Issues**: Discovered and fixed BUG-001 (Firestore rejected `undefined` in `admin_notes`).

### Streaks
- **Status**: ✅ PASS
- **Result**: Streak engine calculates consecutive active dates dynamically from `calendarActivity` and daily challenges. Prevents duplicate same-day increments. Streak persisted across session reloads.
- **Issues**: None.

### Career Readiness
- **Status**: ✅ PASS
- **Result**: Unified 7-pillar career readiness engine accurately computes scores based on Programming, DSA, CS Fundamentals, Projects, Git/GitHub, Communication, and Interview readiness.
- **Issues**: None.

### Admin Dashboard
- **Status**: ✅ PASS
- **Result**: Admin Console at `/admin` correctly loads all 5 authentic roster students with live synced metrics matching student-side state (Dhanisha: 1 module, Ramana: 1 project). Verified unified JSON backup export and student roster table export. Non-admin export requests rejected with 403 Forbidden.
- **Issues**: None.

### Database Persistence
- **Status**: ✅ PASS
- **Result**: Verified complete roundtrip: User Action → Next.js API Route → Firestore Document Update → Local Storage Fallback → Page Reload → Session Relogin. All records remained intact and consistent.
- **Issues**: None.

---

## Bugs Found & Fixed

### BUG-001
- **Feature**: Internship Application Submission (`POST /api/db/internships`)
- **Severity**: High
- **Steps to reproduce**: Submit an internship application with default/omitted admin notes.
- **Expected result**: Application document is saved to Firestore collection `internship_applications` with status 201.
- **Actual result**: Firebase Firestore SDK threw `FirebaseError: Function setDoc() called with invalid data. Unsupported field value: undefined (found in field admin_notes)`.
- **Root cause**: `admin_notes` property in `InternshipApplication` object was explicitly initialized with `undefined`. Firestore document writer rejects objects containing `undefined` values.
- **Fix applied**: Changed `admin_notes` initialization to `''` (empty string) in `src/app/api/db/internships/route.ts`.
- **Retest result**: ✅ PASS. Applications submit successfully with status 201, generate unique application IDs, and persist in Firestore.

---

## Features That Worked
1. **Roster Authentication & Credential Verification** (CSV-backed login with registration number).
2. **Role-Based Authorization & Security Guards** (Admin vs Member access).
3. **Data-Driven Student Progress Dashboard** (Live Career Readiness, 7-pillar breakdown, DSA stats, recommended next actions).
4. **Learning Module Tracking & Streak Updating** (`POST /api/db/progress`).
5. **Project Submission & URL Integrity Verification** (`POST /api/db/projects`).
6. **Internship Application Submission & Admin Review Workflow** (`/api/db/internships`).
7. **Live LeetCode Stats Synchronization** (`/api/leetcode`).
8. **Admin Database Export & Student Roster Management** (`/api/admin/export-db`).
9. **Multi-Account Data Isolation** (No cross-contamination of student progress).
10. **Session Persistence across Refresh & Re-login**.

---

## Features That Failed
- **None**. All 22 automated integration tests passed (100% pass rate) and all visual browser checks passed.

---

## Remaining Issues
- None blocking. All core features, authentication flows, dynamic calculations, and admin tools are fully functional.

---

## Final QA Summary

- **Overall status**: **PASS**
- **Testing coverage**:
  - **What was tested**: Authentication (valid, invalid, non-existent, legacy admin), Profile retrieval, Module progress, Streak calculation, Project submission & validation, Internship application submission, retrieval, and admin review, Admin DB export & security, LeetCode sync, Student Progress Dashboard, Multi-account data isolation, and Refresh/Relogin persistence.
  - **What was not tested**: Third-party payment gateways (none configured in project).
