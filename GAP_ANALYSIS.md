# GAP ANALYSIS: BUSINESS REQUIREMENTS VS. CURRENT STATE

| Feature Area | Requirement | Current State | Gap Status | Effort |
| :--- | :--- | :--- | :--- | :--- |
| **Lead Mgmt** | Track Deal Stages (Prospect -> Closed) | Basic "Status" field exists (Pending/Qualified/Booked). | 🟡 PARTIAL | Low |
| **Lead Mgmt** | Lead Source/UTM Tracking | Not captured in intake form. | 🔴 MISSING | Low |
| **Client Mgmt** | Client Records (separate from Leads) | No `clients` collection. | 🔴 MISSING | High |
| **Client Mgmt** | Tier Assignment (Pilot/T1/T2/T3) | No logic for tiers beyond pricing text. | 🔴 MISSING | Medium |
| **Shoot Mgmt** | Create/Schedule Shoots | `shoots` collection exists but is empty. No UI to create shoots. | 🔴 CRITICAL | High |
| **Shoot Mgmt** | ShotClock Alerts (T-12h, T-2h) | Logic exists in Ops Dashboard, but no data to drive it. | 🟡 PARTIAL | Medium |
| **Finance** | Stripe Integration (Subscriptions) | No Stripe code found. | 🔴 CRITICAL | High |
| **Finance** | Invoicing (Pilot/Retainer) | No invoicing capability. | 🔴 CRITICAL | High |
| **Delivery** | Photo Upload & Storage | No file upload system. | 🔴 CRITICAL | High |
| **Delivery** | Client Galleries | No gallery view. | 🔴 MISSING | High |
| **KPIs** | Dashboard | Ops Dashboard exists with placeholders. | 🟡 PARTIAL | Medium |
| **Shop** | GettUpp Girls Shop | `/shop` directory exists but likely empty/static. | 🔴 MISSING | High |
| **Legal** | Terms of Service / Agreements | No acceptance flow in intake. | 🔴 MISSING | Low |

## PRIORITIZED BACKLOG

### 🚨 CRITICAL (Must Have for Revenue)
1.  **Stripe Integration**: Need to collect money.
2.  **Shoot Management UI**: Need to schedule the work we sold.
3.  **Client Conversion**: Need to turn a "Lead" into a "Client" record.
4.  **Basic Delivery**: Need a way to send files to clients (even if manual at first, we need a "Deliver" status).

### 🔸 HIGH PRIORITY (Operational Efficiency)
1.  **ShotClock Alerts**: To ensure we don't miss SLAs.
2.  **Terms of Service**: Legal protection on intake.
3.  **Lead Source Tracking**: To know where marketing works.

### 🔹 NICE TO HAVE (Scale)
1.  **Automated Galleries**: Can use Google Drive/Dropbox manually for now.
2.  **GettUpp Girls Shop**: Secondary revenue stream.
3.  **Full KPI Automation**: Can track manually in spreadsheet for first month.
