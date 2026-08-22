# LevelUpDev Codebase & Route Audit Report

This report provides a comprehensive audit of all routes, pages, components, design inconsistency issues, dead code, and Firestore schema redundancies across the LevelUpDev application prior to UI refactoring.

---

## 1. Page & Route Audit

### 1. Root Redirect (`/` → `src/app/page.tsx`)
- **What it currently does**: Checks authentication state from `AuthContext` while displaying a loading spinner, then redirects to `/home` if authenticated or `/login` if unauthenticated.
- **Redundant / Half-built / Confusing**: Uses old dark slate theme background (`bg-slate-950`) during loading transition, creating a brief dark flash before loading sage-white pages.
- **Recommendation**: **Keep as-is** (with minor background color alignment) — Essential root route authentication router.

---

### 2. Login Page (`/login` → `src/app/login/page.tsx`)
- **What it currently does**: Handles user login via Firebase email/password, supports instant demo mode sign-in, displays validation errors, renders custom gold trailing cursor (`LoginCursor`), and provides a sign-up link.
- **Redundant / Half-built / Confusing**: Brand logo image uses a hardcoded external Google usercontent URL (`lh3.googleusercontent.com/aida-public/...`) instead of a local SVG icon or asset.
- **Recommendation**: **Keep as-is** — Fully functional, styled in the soft sage-white topographic theme.

---

### 3. Signup Page (`/signup` → `src/app/signup/page.tsx`)
- **What it currently does**: Provides account registration (Name, Email, Password) with Firebase authentication and demo mode fallback.
- **Redundant / Half-built / Confusing**: Outdated dark slate aesthetic (`bg-slate-900`, `from-slate-900 via-slate-950 to-black`) that clashes completely with the new sage-white topographic design system used on `/login` and `/home`.
- **Recommendation**: **Needs redesign** — Update layout and colors to match the sage-white topographic aesthetic of `/login`.

---

### 4. Home / Portfolio Page (`/home` → `src/app/home/page.tsx`)
- **What it currently does**: Serves as the central student dashboard. Renders TopAppBar navigation, profile card with daily streak counter, social links, activity heatmap, bento grid skill cards, empty field projects section, profile edit modal, and footer.
- **Redundant / Half-built / Confusing**:
  - `WelcomeScreen` popup triggers after login via `sessionStorage`, but its full-screen plain white overlay feels jarring and visually disconnected from the topographic canvas.
  - "Field Projects" section is a static empty state placeholder with no underlying data model or functionality.
  - Duplicate profile edit triggers: TopAppBar settings icon and profile card pencil icon open the exact same modal.
  - `lockedSkills` logic is unused since `getAllSkills()` returns only 2 unlocked skills (Python and JS).
- **Recommendation**: **Needs redesign** — Clean up redundant edit buttons, integrate/remove WelcomeScreen, and refine bento grid layout.

---

### 5. Skill Path Map Page (`/skills/[skillId]` → `src/app/skills/[skillId]/page.tsx`)
- **What it currently does**: Renders a topographic winding roadmap for a specific skill (Python, JS) showing sequential module nodes (Completed, Current/In-Progress with glowing pulse ring, and Locked).
- **Redundant / Half-built / Confusing**:
  - The SVG background path uses fixed viewBox bezier control points (`M 500,50 Q 800,200 500,350 T 500,650`), whereas node cards alternate margins (`md:-ml-32`, `md:-mr-32`), which can cause subtle SVG line misalignment on different screen widths.
  - "3.0 ECTS" tag on the current module card is hardcoded static text.
- **Recommendation**: **Keep as-is** (with minor SVG path alignment) — Visually accurate to exported spec and correctly wired to Firebase progress.

---

### 6. Module Detail & Assessment Page (`/skills/[skillId]/[moduleId]` → `src/app/skills/[skillId]/[moduleId]/page.tsx`)
- **What it currently does**: Displays module topic summaries and a multiple-choice assessment form. Validates answers, updates score, toggles module completion state in Firestore (`toggleModuleProgress`), and unlocks the next module.
- **Redundant / Half-built / Confusing**:
  - Completely styled in old dark slate theme (`bg-slate-950`, `bg-slate-900`), breaking visual continuity from the `/skills/[skillId]` map.
  - Questions and topics are static JSON strings inside `content/skills/`.
- **Recommendation**: **Needs redesign** — Re-style to match the soft sage-white topographic design system.

---

### 7. Daily DSA Challenge Page (`/daily` → `src/app/daily/page.tsx`)
- **What it currently does**: Loads today's LeetCode problem from `daily-challenges.json`, provides problem notes, link to LeetCode, solution code textarea, records daily solve state (increments streak & updates `solvedDates`), and renders the HeatmapCalendar.
- **Redundant / Half-built / Confusing**:
  - Outdated dark slate theme (`bg-slate-950`).
  - Textarea solution submission accepts any string without code syntax validation (trust-based solver).
- **Recommendation**: **Needs redesign** — Update styling to match the sage-white topographic aesthetic.

---

### 8. Group Leaderboard Page (`/leaderboard` → `src/app/leaderboard/page.tsx`)
- **What it currently does**: Displays a group ranking table sorted by current streak and total mastered skills, featuring top 3 rank badges (Crown, Medal, Award) and current user highlighting.
- **Redundant / Half-built / Confusing**:
  - Outdated dark slate theme (`bg-slate-950`).
  - `fetchLeaderboardUsers` injects 3 hardcoded mock users ("Priya Patel", "Rohan Mehta", "Ananya Iyer") whenever Firestore has fewer than 3 users.
- **Recommendation**: **Needs redesign** — Update styling to match the sage-white topographic aesthetic.

---

### 9. Style Guide Page (`/style-guide` → `src/app/style-guide/page.tsx`)
- **What it currently does**: Displays color token swatches, typography family samples, button/card patterns, and a token availability checklist.
- **Redundant / Half-built / Confusing**:
  - Mixes legacy custom CSS variable names (`--ink`, `--mist`, `--gold`) with newer Tailwind v4 utility tokens.
  - Internal developer reference page not meant for end users.
- **Recommendation**: **Consider removing** (or keeping strictly for dev reference) — Not part of the user-facing product flow.

---

## 2. Dead Code & Unused Components Audit

1. **`WelcomeScreen.tsx` & `useTypewriter.ts`**:
   - Full-screen typewriter overlay shown on `/home` after login.
   - Feels intrusive and uses a plain white background (`bg-white text-slate-900`) that breaks the sage-white design language.
2. **Hardcoded External Assets**:
   - `page.tsx` (Login, Home) use external Google usercontent URLs (`lh3.googleusercontent.com/aida-public/...`) for logo/avatar images. Should be replaced with inline SVGs or clean asset fallbacks.
3. **Unused Imports & Utilities**:
   - `lockedSkills` filtering in `/home/page.tsx` is effectively dead code because `getAllSkills()` returns only 2 skills (both unlocked).

---

## 3. Firestore Schema & Data Redundancy Audit

1. **`unlockedSkills` (Array on User Doc)**:
   - Updated by `unlockSkill()` in `AuthContext.tsx`.
   - **Redundant**: Unlocked status can be calculated dynamically based on whether previous modules in `userData.progress` are `true`.
2. **`skillsCompleted` (Array on User Doc)**:
   - Updated by `toggleModuleProgress()` when all modules in a skill map are completed.
   - **Redundant**: Can be derived on the fly from `userData.progress`.
3. **`lastActiveModule` (Object on User Doc)**:
   - Stores `{ skillId, moduleId, moduleTitle, updatedAt }`.
   - Only used for a small "Currently on:" chip fallback on `/home`.
