# GettUpp OS - Testing & Verification Guide

## Overview
This document provides comprehensive testing procedures to verify all systems are functioning correctly before production launch.

---

## Prompt 13: E2E Test - Pilot Funnel

### Test Objective
Verify the complete user journey from lead submission to payment confirmation.

### Test Steps

#### Step 1: Lead Submission
1. Navigate to `/pilot-intake`
2. Fill out the intake form with test data:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `555-123-4567`
   - Instagram: `@testuser`
3. Submit the form
4. **Expected**: Success message displayed, redirect to thank you page

#### Step 2: Admin Lead Review
1. Log in to admin dashboard at `/admin`
2. Navigate to `/admin/leads`
3. **Expected**: New lead appears in the list with status "new"
4. Update lead status to "qualified"

#### Step 3: Lead-to-Client Conversion
1. Navigate to `/admin/clients`
2. Click "Convert Lead"
3. Select the test lead from the dropdown
4. Select "Pilot" tier
5. Click "Convert to Client"
6. **Expected**: 
   - Client created in Firestore
   - Lead status updated to "converted"
   - New client appears in clients list

#### Step 4: Invoice Generation
1. Find the new client in `/admin/clients`
2. Click "Send Invoice"
3. **Expected**: Stripe Checkout URL opens in new tab

#### Step 5: Payment (Test Mode)
1. In Stripe Checkout, use test card: `4242 4242 4242 4242`
2. Complete payment
3. **Expected**: 
   - Redirect to `/checkout/success`
   - Client status updated to "active"
   - Invoice status updated to "paid"

### Verification Checklist
- [ ] Lead created in Firestore `leads` collection
- [ ] Client created in Firestore `clients` collection
- [ ] Invoice created in Firestore `invoices` collection
- [ ] Stripe Customer created
- [ ] Stripe Payment Intent succeeded
- [ ] Webhook processed correctly

---

## Prompt 14: User Role & Permission Audit

### Test Matrix

| Route | Unauthenticated | Client | Admin | Expected |
|-------|-----------------|--------|-------|----------|
| `/` | ✅ | ✅ | ✅ | Public landing page |
| `/pilot-intake` | ✅ | ✅ | ✅ | Public form |
| `/login` | ✅ | ✅ | ✅ | Public |
| `/admin` | ❌ (redirect) | ❌ (redirect) | ✅ | Admin only |
| `/admin/leads` | ❌ | ❌ | ✅ | Admin only |
| `/admin/clients` | ❌ | ❌ | ✅ | Admin only |
| `/admin/shoots` | ❌ | ❌ | ✅ | Admin only |
| `/admin/invoices` | ❌ | ❌ | ✅ | Admin only |
| `/portal` | ❌ (login prompt) | ✅ | ✅ | Auth required |
| `/portal/[id]` | ❌ | ✅ (own only) | ✅ | Auth + ownership |
| `/api/admin/*` | 401 | 401 | 200 | Admin token required |
| `/api/checkout` | 401 | 401 | 200 | Admin token required |

### API Authentication Tests

```bash
# Test without token (should return 401)
curl -X GET http://localhost:3000/api/admin/clients

# Test with invalid token (should return 401)
curl -X GET http://localhost:3000/api/admin/clients \
  -H "Authorization: Bearer invalid_token"

# Test with valid token (should return 200)
curl -X GET http://localhost:3000/api/admin/clients \
  -H "Authorization: Bearer <VALID_FIREBASE_TOKEN>"
```

### Expected Results
All tests in the matrix should match expected behavior. Any deviation is a security vulnerability.

---

## Prompt 15: Onboarding Flow Audit

### Form Validation Tests

#### Pilot Intake Form
| Field | Test Case | Expected |
|-------|-----------|----------|
| Name | Empty | Error: "Name is required" |
| Name | "A" | Error: "Name too short" |
| Name | "Valid Name" | ✅ Pass |
| Email | Empty | Error: "Email is required" |
| Email | "invalid" | Error: "Invalid email format" |
| Email | "test@example.com" | ✅ Pass |
| Phone | Empty | ✅ Pass (optional) |
| Phone | "123" | Error: "Invalid phone" |
| Phone | "555-123-4567" | ✅ Pass |

#### Login Form
| Field | Test Case | Expected |
|-------|-----------|----------|
| Email | Empty | Error displayed |
| Password | Empty | Error displayed |
| Email | Wrong format | Error displayed |
| Credentials | Invalid | "Invalid credentials" |
| Credentials | Valid | Redirect to dashboard |

### Data Sync Verification
1. Submit pilot intake form
2. Check Firestore immediately
3. **Expected**: Document appears within 2 seconds
4. Check admin dashboard
5. **Expected**: New lead visible without refresh

---

## Prompt 16: Performance Benchmarking

### Lighthouse CI Configuration

Add to `.github/workflows/ci.yml`:

```yaml
  # Job 4: Lighthouse Performance Audit
  lighthouse:
    name: Performance Audit
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
        
      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
          
      - name: 📦 Install dependencies
        run: npm ci
        
      - name: 🏗️ Build
        run: npm run build
        
      - name: 🚀 Start server
        run: npm start &
        env:
          PORT: 3000
          
      - name: ⏳ Wait for server
        run: npx wait-on http://localhost:3000
        
      - name: 🔦 Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/pilot-intake
            http://localhost:3000/login
          uploadArtifacts: true
          temporaryPublicStorage: true
          
      - name: 📊 Upload Lighthouse Report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: .lighthouseci
          retention-days: 30
```

### Performance Targets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Performance Score | > 90 | 70-89 | < 70 |
| First Contentful Paint | < 1.8s | 1.8-3.0s | > 3.0s |
| Time to Interactive | < 3.8s | 3.8-7.3s | > 7.3s |
| Largest Contentful Paint | < 2.5s | 2.5-4.0s | > 4.0s |
| Cumulative Layout Shift | < 0.1 | 0.1-0.25 | > 0.25 |
| Total Blocking Time | < 200ms | 200-600ms | > 600ms |

### Manual Performance Checks
1. **Initial Load**: Page should render in < 2 seconds
2. **Navigation**: Route changes should feel instant
3. **Forms**: Submit actions should complete in < 3 seconds
4. **Admin Dashboard**: Data loads should be < 1 second

---

## Running Tests

### Quick Verification
```bash
# 1. Start dev server
npm run dev

# 2. Run lint checks
npm run lint

# 3. Run type checks
npx tsc --noEmit

# 4. Build for production
npm run build
```

### Full Test Suite
```bash
# Install testing dependencies (if needed)
npm install --save-dev playwright @playwright/test

# Run E2E tests
npx playwright test

# Generate coverage report
npx playwright show-report
```

---
*Last updated: Phase IV - Production Launch Protocol*
