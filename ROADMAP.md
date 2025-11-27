# 30-DAY ROADMAP TO LAUNCH

**Goal:** Transform GettUppent from a "Lead Gen Site" to a "Business Operating System" capable of processing revenue and managing operations.

## WEEK 1: THE REVENUE ENGINE (Finance & Clients)
**Focus:** Being able to take money and define a "Client".
- [ ] **Stripe Integration**: Set up Stripe Connect or Standard. Implement `stripe-node`.
- [ ] **Client Schema**: Create `clients` collection.
- [ ] **Conversion Flow**: Add "Convert to Client" button in Lead Admin.
- [ ] **Invoicing**: Generate a Stripe Invoice for the $345 Pilot fee upon conversion.

## WEEK 2: THE OPERATIONS ENGINE (Shoots)
**Focus:** Managing the work we sold.
- [ ] **Shoot Schema**: Finalize `shoots` collection structure.
- [ ] **Shoot Manager UI**: Create `/admin/shoots` to add/edit shoots.
- [ ] **Calendar View**: Simple list or calendar of upcoming shoots.
- [ ] **ShotClock Activation**: Connect Ops Dashboard to real `shoots` data.

## WEEK 3: DELIVERY & LEGAL
**Focus:** Fulfilling the service and protection.
- [ ] **Delivery Status**: Add "Editing" and "Delivered" statuses to Shoots.
- [ ] **Manual Delivery Link**: Add field to Shoot record to paste Google Drive/Pixieset link.
- [ ] **Terms of Service**: Add checkbox to Pilot Intake form.
- [ ] **Email Triggers**: Send "Welcome" email upon conversion (using SendGrid or Firebase Extensions).

## WEEK 4: POLISH & LAUNCH
**Focus:** End-to-end testing and refinement.
- [ ] **End-to-End Test**: Create a lead -> Convert -> Pay -> Schedule -> Deliver.
- [ ] **RAG Assistant Hookup**: Connect the API to OpenAI/Gemini for real answers.
- [ ] **Mobile Polish**: Ensure Admin/Ops pages work on phone (for on-the-go checks).
- [ ] **GO LIVE**: Deploy to production URL.

---

## GO/NO-GO DECISION
**Recommendation:** 🛑 **NO-GO** (for today)

**Reasoning:**
You cannot currently accept payment or manage the fulfillment of the service. Launching now would result in leads that you have to manually invoice and manually track via spreadsheet, defeating the purpose of the OS.

**Fastest Path to Revenue:**
Complete **Week 1** (Stripe & Client Conversion). Once you can take money, you can launch and manage operations manually/messily if needed. But do not launch without Payments.
