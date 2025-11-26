# Walkthrough - Connect Frontend to CMS

I have successfully connected the landing page to the Firestore CMS.

## Changes

### 1. Data Fetching
- **`src/hooks/useCMS.ts`**: Created a custom hook to fetch `hero`, `pricing`, and `portfolio` data from Firestore.
- **Logic**: Fetches singleton documents in parallel and handles loading/error states.

### 2. Loading State
- **`src/components/LandingSkeleton.tsx`**: Implemented a high-quality skeleton loader that matches the dark theme and layout of the landing page.

### 3. Landing Page Refactor
- **`src/app/page.tsx`**:
    -   Replaced hardcoded arrays with data from `useCMS`.
    -   Added conditional rendering to show `LandingSkeleton` while loading.
    -   Updated Hero section to use dynamic headline/subheadline.

## Verification Results

### Manual Verification Steps
1.  **Load Landing Page**:
    -   Navigate to `http://localhost:3000`.
    -   **Expected**: See the skeleton loader briefly, then the content appears.
2.  **Verify Content**:
    -   Ensure the text matches what was seeded in `/admin/seed`.
    -   Check that pricing tiers and portfolio items are rendered correctly.
3.  **Performance**:
    -   Verify that the page remains responsive and animations work smoothly.

## Next Steps
-   **Prompt 5**: Build the Admin CMS Editor to allow changing this content.
