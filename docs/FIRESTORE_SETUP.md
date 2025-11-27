# Firestore API Setup Guide

## P0 BLOCKER: Enable Firestore API

The application **will not function** without enabling the Firestore API. This is the most critical prerequisite.

---

## Step 1: Enable Firestore API in Google Cloud

### Option A: Direct Link (Recommended)
Click this link to go directly to the API page:

**[Enable Firestore API for gettuppent-production](https://console.cloud.google.com/apis/api/firestore.googleapis.com/overview?project=gettuppent-production)**

1. Click the blue **"ENABLE"** button
2. Wait for the API to be enabled (usually 10-30 seconds)

### Option B: Manual Navigation
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: `gettuppent-production`
3. Navigate: **APIs & Services** → **Library**
4. Search for "Firestore"
5. Click **Cloud Firestore API**
6. Click **ENABLE**

---

## Step 2: Create Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `gettuppent-production`
3. In the left sidebar, click **Firestore Database**
4. Click **Create database**
5. Select **Start in production mode**
6. Choose a location closest to your users (e.g., `us-central`)
7. Click **Enable**

---

## Step 3: Deploy Security Rules

After the database is created, deploy the security rules:

### Using Firebase CLI
```bash
firebase deploy --only firestore:rules
```

### Manual Deployment
1. Go to Firebase Console → Firestore → Rules
2. Copy contents of `firestore.rules` from the project
3. Click **Publish**

---

## Step 4: Verify Setup

Run these verification checks:

### Check 1: API Status
Visit: [Firestore API Status](https://console.cloud.google.com/apis/api/firestore.googleapis.com/overview?project=gettuppent-production)
- Should show: **"API enabled"**

### Check 2: Database Exists
Visit: Firebase Console → Firestore Database
- Should show the database dashboard (may be empty initially)

### Check 3: Application Test
```bash
npm run dev
# Navigate to admin dashboard and verify no PERMISSION_DENIED errors
```

---

## Required Collections

The application uses these Firestore collections:

| Collection | Purpose | Access |
|------------|---------|--------|
| `leads` | Pilot intake submissions | Public write, Admin read |
| `clients` | Converted paying clients | Admin only |
| `shoots` | Photo shoot scheduling | Admin only |
| `site_content` | Landing page content | Public read, Admin write |
| `knowledge_base` | Business intelligence | Admin only |
| `user_preferences` | User settings | Owner only |

---

## Common Errors & Solutions

### Error: `PERMISSION_DENIED: Cloud Firestore API has not been used`
**Solution:** Complete Step 1 above to enable the API.

### Error: `PERMISSION_DENIED: Missing or insufficient permissions`
**Solution:** 
1. Verify security rules are deployed
2. Check that the user is authenticated for protected routes
3. Verify Firebase Admin credentials in environment variables

### Error: `NOT_FOUND: Project not found`
**Solution:** 
1. Verify `FIREBASE_ADMIN_PROJECT_ID` matches your Firebase project
2. Ensure the service account belongs to the correct project

---

## Service Account Setup

If you haven't created a service account:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click **Generate new private key**
3. Save the JSON file securely
4. Extract these values for your `.env.local`:
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`

---
*Last updated: Phase I - Production Launch Protocol*
