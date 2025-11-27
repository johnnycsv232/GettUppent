# GettUpp OS - Production Launch Protocol

## 🚀 Launch Readiness Matrix

### Prompt 17: Production Readiness Checklist

| Category | Item | Status | Notes |
|----------|------|--------|-------|
| **Infrastructure** ||||
| | Firestore API enabled | ⬜ | [Enable here](https://console.cloud.google.com/apis/api/firestore.googleapis.com) |
| | Firestore database created | ⬜ | Production mode |
| | Security rules deployed | ⬜ | `firebase deploy --only firestore:rules` |
| | Firebase Auth enabled | ⬜ | Email/password provider |
| **Environment** ||||
| | All env vars in Vercel | ⬜ | See `VERCEL_SETUP.md` |
| | STRIPE_SECRET_KEY (production) | ⬜ | Live key for production |
| | STRIPE_WEBHOOK_SECRET | ⬜ | Production webhook |
| | STRIPE_PRICE_* configured | ⬜ | Run `npm run setup:stripe` |
| | NEXT_PUBLIC_APP_URL set | ⬜ | Production domain |
| **Payments** ||||
| | Stripe products created | ⬜ | 4 tiers: Pilot, T1, T2, VIP |
| | Webhook endpoint configured | ⬜ | `/api/webhooks/stripe` |
| | Test payment successful | ⬜ | Use test card `4242...` |
| **Security** ||||
| | Next.js updated (14.2.33+) | ✅ | CVEs patched |
| | npm audit clean | ✅ | 0 vulnerabilities |
| | Branch protection enabled | ⬜ | See `BRANCH_PROTECTION.md` |
| | HTTPS/HSTS enforced | ✅ | vercel.json configured |
| **Testing** ||||
| | E2E pilot flow tested | ⬜ | See `TESTING_GUIDE.md` |
| | Permission matrix verified | ⬜ | All roles tested |
| | Performance baseline set | ⬜ | Lighthouse > 70 |

### Launch Verdict Criteria

**GO FOR LAUNCH** requires:
- ✅ All Infrastructure items checked
- ✅ All Environment items checked  
- ✅ All Payments items checked
- ✅ All Security items checked
- ✅ At least 80% of Testing items checked

---

## Prompt 18: Security Hardening for Vercel

### Vercel Security Configuration

#### 1. Enable HTTPS Only
```
# vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

#### 2. CORS Configuration
API routes already enforce authentication. No additional CORS config needed for same-origin requests.

#### 3. Rate Limiting (Recommended)
Consider adding Vercel Edge Config or middleware for rate limiting on:
- `/api/checkout` - 10 req/min per IP
- `/api/admin/*` - 100 req/min per user
- `/pilot-intake` - 5 submissions/min per IP

### Security Compliance Report

| Check | Status | Details |
|-------|--------|---------|
| HTTPS Enforced | ✅ | Vercel default |
| HSTS Header | ✅ | max-age=31536000 |
| XSS Protection | ✅ | X-XSS-Protection header |
| Clickjacking Protection | ✅ | X-Frame-Options: DENY |
| API Authentication | ✅ | Firebase Admin SDK |
| Secrets in Env Vars | ✅ | No hardcoded secrets |
| Input Validation | ✅ | Server-side validation |

---

## Prompt 19: Staging Deployment & Smoke Test

### Staging Environment Setup

1. **Create Vercel Preview Deployment**
   ```bash
   # Push to a feature branch
   git checkout -b staging
   git push origin staging
   ```
   Vercel will auto-deploy to a preview URL.

2. **Configure Staging Environment**
   - Use Stripe TEST keys
   - Point to production Firestore (or separate staging project)
   - Set `NEXT_PUBLIC_APP_URL` to staging URL

### Smoke Test Checklist

#### Public Routes
- [ ] Landing page (`/`) loads correctly
- [ ] Pilot intake (`/pilot-intake`) form works
- [ ] Login page (`/login`) displays
- [ ] Checkout success/cancelled pages render

#### Authenticated Routes
- [ ] Admin login successful
- [ ] Admin dashboard loads
- [ ] Leads page shows data
- [ ] Clients page functional
- [ ] Shoots page functional
- [ ] Invoices page loads

#### Core Workflows
- [ ] Submit pilot intake form → Lead created
- [ ] Convert lead to client → Client created
- [ ] Generate invoice → Stripe Checkout opens
- [ ] Complete payment → Client activated
- [ ] Schedule shoot → Shoot created

#### Error Handling
- [ ] Invalid login shows error
- [ ] Unauthenticated API calls return 401
- [ ] 404 page displays for invalid routes

---

## Prompt 20: Production Launch & Monitoring

### Launch Sequence

#### T-24 Hours
- [ ] Final code review complete
- [ ] All tests passing
- [ ] Staging smoke test complete
- [ ] Stripe switched to LIVE keys
- [ ] DNS configured (if custom domain)

#### T-1 Hour
- [ ] Team notified
- [ ] Monitoring dashboards open
- [ ] Rollback plan documented

#### Launch (T-0)
```bash
# Merge to main (triggers production deploy)
git checkout main
git merge staging
git push origin main
```

#### T+15 Minutes
- [ ] Verify deployment successful
- [ ] Test landing page loads
- [ ] Test pilot intake submission
- [ ] Verify Firestore receives data

#### T+1 Hour
- [ ] Monitor error rates
- [ ] Check Stripe webhook events
- [ ] Review Vercel analytics

### Post-Launch Monitoring

#### Key Metrics to Watch
1. **Error Rate**: Target < 0.1%
2. **Response Time**: Target < 500ms p95
3. **Conversion Rate**: Leads → Clients
4. **Payment Success Rate**: Target > 95%

#### Monitoring Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Vercel Logs**: Real-time function logs
- **Stripe Dashboard**: Payment monitoring
- **Firebase Console**: Auth and Firestore monitoring

#### Alert Thresholds
| Metric | Warning | Critical |
|--------|---------|----------|
| Error rate | > 1% | > 5% |
| P95 latency | > 1s | > 3s |
| Failed payments | > 5% | > 10% |
| Auth failures | > 10/hour | > 50/hour |

### Rollback Procedure

If critical issues are detected:

1. **Immediate Rollback**
   ```bash
   # In Vercel Dashboard
   # Deployments → Select previous deployment → Promote to Production
   ```

2. **Code Rollback**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Notify Team**
   - Document issue
   - Create incident report
   - Schedule post-mortem

---

## 🎉 Launch Announcement Template

```
🚀 GettUpp OS is LIVE!

We're excited to announce the official launch of our new Business OS platform.

What's new:
✅ Streamlined pilot intake process
✅ Client management dashboard
✅ Integrated payment processing
✅ Shoot scheduling system
✅ Client portal (coming soon)

Book your session at: [YOUR_DOMAIN]

#GettUpp #Launch #Photography
```

---
*GettUpp OS - Production Launch Protocol v1.0*
