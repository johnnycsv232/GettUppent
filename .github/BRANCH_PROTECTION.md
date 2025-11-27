# Branch Protection Setup Guide

## Overview
This guide documents the required branch protection rules for the GettUpp OS repository to ensure code quality and prevent direct pushes to the main branch.

## Setup Instructions

### Step 1: Navigate to Branch Protection Settings
1. Go to your GitHub repository
2. Click **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule**

### Step 2: Configure Protection for `main` Branch

**Branch name pattern:** `main`

#### Required Settings (Check all):

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1` (minimum)
  - [x] Dismiss stale pull request approvals when new commits are pushed
  
- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - **Required status checks:**
    - `Build & Test (18.x)`
    - `Build & Test (20.x)`
    - `Code Quality`
    - `Security Audit`

- [x] **Require conversation resolution before merging**

- [x] **Do not allow bypassing the above settings**

- [ ] **Allow force pushes** (Keep UNCHECKED)
- [ ] **Allow deletions** (Keep UNCHECKED)

### Step 3: Save the Rule
Click **Create** or **Save changes**

## Verification

After setup, verify protection is working:

1. **Test Direct Push Block:**
   ```bash
   git checkout main
   git commit --allow-empty -m "test"
   git push origin main
   # Should fail with: "protected branch hook declined"
   ```

2. **Test PR Requirements:**
   - Create a new branch and PR
   - Verify status checks appear as "Required"
   - Confirm merge is blocked until checks pass

## Quick Link
[Repository Branch Settings](https://github.com/YOUR_ORG/YOUR_REPO/settings/branches)

Replace `YOUR_ORG/YOUR_REPO` with your actual repository path.

---
*Last updated: Phase I - Production Launch Protocol*
