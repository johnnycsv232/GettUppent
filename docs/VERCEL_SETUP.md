# Vercel Environment Variable Setup

## Overview
This document outlines all environment variables required for production deployment on Vercel.

## Quick Setup URL
Navigate to: **Your Vercel Project → Settings → Environment Variables**

---

## Required Environment Variables

### 1. Firebase Client-Side (Public)
These are safe to expose to the browser.

| Variable | Type | Example |
|----------|------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Plain Text | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Plain Text | `gettuppent-production.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Plain Text | `gettuppent-production` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Plain Text | `gettuppent-production.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Plain Text | `633333837038` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Plain Text | `1:633333837038:web:...` |
| `NEXT_PUBLIC_APP_URL` | Plain Text | `https://yourdomain.com` |

### 2. Firebase Admin (Server-Side, Sensitive)
Mark these as **Sensitive** in Vercel.

| Variable | Type | Source |
|----------|------|--------|
| `FIREBASE_ADMIN_PROJECT_ID` | Sensitive | Firebase Console → Project Settings |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | Sensitive | Service Account JSON → `client_email` |
| `FIREBASE_ADMIN_PRIVATE_KEY` | Sensitive | Service Account JSON → `private_key` |

**Important:** For `FIREBASE_ADMIN_PRIVATE_KEY`, ensure newlines are properly escaped (`\n`) and the entire value is wrapped in quotes.

### 3. Stripe Integration (Server-Side, Sensitive)
Mark these as **Sensitive** in Vercel.

| Variable | Type | Source |
|----------|------|--------|
| `STRIPE_SECRET_KEY` | Sensitive | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Sensitive | Stripe Dashboard → Webhooks → Your Endpoint |
| `STRIPE_PRICE_PILOT` | Plain Text | After running `scripts/setup-stripe.js` |
| `STRIPE_PRICE_T1` | Plain Text | After running `scripts/setup-stripe.js` |
| `STRIPE_PRICE_T2` | Plain Text | After running `scripts/setup-stripe.js` |
| `STRIPE_PRICE_VIP` | Plain Text | After running `scripts/setup-stripe.js` |

---

## Environment Scopes

For each variable, set the appropriate environment scope:

- **Production**: All variables
- **Preview**: All variables (use test keys for Stripe)
- **Development**: All variables (use test keys for Stripe)

---

## Verification Steps

After adding all variables:

1. **Trigger a new deployment** to apply changes
2. **Check build logs** for any missing variable warnings
3. **Test the deployed site**:
   - [ ] Landing page loads
   - [ ] Admin login works
   - [ ] Firestore read/write operations succeed
   - [ ] Stripe checkout flow redirects correctly

---

## Troubleshooting

### "PERMISSION_DENIED" Errors
- Ensure Firestore API is enabled (see `FIRESTORE_SETUP.md`)
- Verify `FIREBASE_ADMIN_PRIVATE_KEY` is correctly formatted

### "Invalid API Key" Errors
- Double-check Stripe keys match your environment (test vs live)
- Ensure no extra whitespace in variable values

### "Auth Failed" Errors
- Verify Firebase Auth is enabled in Firebase Console
- Check that the auth domain matches your Vercel domain

---
*Last updated: Phase I - Production Launch Protocol*
