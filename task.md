# GettUpp OS - Antigravity Migration Tasks

## Prompt 1: Rewire Admin Dashboard (Critical)
- [x] Analyze `src/app/admin/page.tsx` and identify data structures <!-- id: 0 -->
- [x] Check for existing Firebase configuration and dependencies <!-- id: 1 -->
- [x] Create implementation plan for Firebase integration <!-- id: 2 -->
- [x] Install Firebase SDK if missing <!-- id: 3 -->
- [x] Create `.env.local.example` and `src/lib/firebase.ts` <!-- id: 4 -->
- [x] Move `src/app/admin/page.tsx` to `src/app/admin/knowledge/page.tsx` <!-- id: 5 -->
- [x] Create `src/app/admin/layout.tsx` with sidebar navigation <!-- id: 6 -->
- [x] Implement `src/app/admin/leads/page.tsx` with real-time Firestore fetching <!-- id: 7 -->
- [x] Update `src/app/pilot-intake/page.tsx` to save to Firestore <!-- id: 8 -->
- [x] Verify functionality (Intake -> Admin Leads -> Status Update) <!-- id: 9 -->

## Prompt 2: Lock the Doors (Critical)
## Prompt 2: Lock the Doors (Critical)
- [x] Implement Firebase Auth (Login page, AuthGuard) <!-- id: 10 -->
  - [x] Create `src/context/AuthContext.tsx` <!-- id: 10.1 -->
  - [x] Create `src/components/AuthGuard.tsx` <!-- id: 10.2 -->
  - [x] Create `src/app/login/page.tsx` <!-- id: 10.3 -->
  - [x] Update `src/app/admin/layout.tsx` with AuthGuard and Sign Out <!-- id: 10.4 -->
  - [x] Create `scripts/create-admin.js` for user creation <!-- id: 10.5 -->
  - [x] Verify Login/Logout flow <!-- id: 10.6 -->

## Prompt 3: CMS Migration (Polish)
- [x] Analyze content structure (`GETTUPP_MASTER_UNIFIED...json`) <!-- id: 11 -->
- [x] Design Firestore schema for `site_content` <!-- id: 12 -->
- [x] Create migration script `src/app/admin/seed/page.tsx` <!-- id: 13 -->
- [x] Execute migration and verify data <!-- id: 14 -->
- [x] Create type definitions `src/types/content.ts` <!-- id: 15 -->

## Prompt 4: Connect Frontend to CMS (Polish)
- [x] Create server actions `src/lib/fetch-content.ts` (Used client hook instead) <!-- id: 16 -->
- [x] Refactor `src/app/page.tsx` to use dynamic data <!-- id: 17 -->
- [x] Implement loading states (skeleton UI) <!-- id: 18 -->
- [x] Verify performance and design preservation <!-- id: 19 -->

## Prompt 5: Connect Admin to CMS Editor (Polish)
- [x] Create `src/app/admin/content/page.tsx` <!-- id: 20 -->
- [x] Build edit forms with React Hook Form <!-- id: 21 -->
- [x] Implement save functionality with Firestore updates <!-- id: 22 -->
- [x] Verify end-to-end editing flow <!-- id: 23 -->
