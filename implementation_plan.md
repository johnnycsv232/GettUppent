# Implementation Plan - Connect Frontend to CMS (Prompt 4)

The goal is to refactor the landing page (`src/app/page.tsx`) to fetch content dynamically from Firestore instead of using hardcoded data.

## User Review Required

> [!NOTE]
> **Client-Side Fetching**: Since `src/app/page.tsx` is already a Client Component (due to animations/interactive 3D elements), I will use a **custom hook** (`useCMS`) to fetch data on the client side. This avoids complex server-side setup with `firebase-admin` without a service account.
> **Loading States**: I will implement high-quality skeleton loaders to ensure a smooth visual experience while data loads.

## Proposed Changes

### 1. Data Fetching Hook
#### [NEW] `src/hooks/useCMS.ts`
-   **Purpose**: Fetch `hero`, `pricing`, and `portfolio` data from Firestore.
-   **Logic**:
    -   Use `getDoc` for singleton documents (`hero`, `pricing`, `portfolio`).
    -   Return structured data matching `src/types/content.ts`.
    -   Handle loading and error states.

### 2. Refactor Landing Page
#### [MODIFY] `src/app/page.tsx`
-   **Import**: `useCMS` hook.
-   **State**: Replace hardcoded `retainers` and `portfolio` arrays with data from the hook.
-   **Rendering**:
    -   If `loading`: Render `<LandingSkeleton />`.
    -   If `data`: Render the existing UI with dynamic values.
    -   **Hero**: Update headline/subheadline.
    -   **Pricing**: Map over fetched tiers.
    -   **Portfolio**: Map over fetched items.

### 3. Skeleton Component
#### [NEW] `src/components/LandingSkeleton.tsx`
-   **Design**: Match the dark theme/glassmorphism.
-   **Layout**: Placeholder blocks for Hero text, Pricing cards, and Portfolio grid.

## Verification Plan

### Manual Verification
1.  **Load Page**: Refresh `http://localhost:3000`.
2.  **Observe Loading**: Verify skeleton loader appears briefly.
3.  **Verify Content**: Ensure the text and cards match what was seeded in the database.
4.  **Performance**: Check for layout shifts or jank.
