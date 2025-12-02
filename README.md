# 🚀 GettUpp ENT | Nightlife Content Engine

> **"Time is the Business."** — The operating system for nightlife content creation, automation, and business intelligence.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

---

## 📋 Overview

**GettUpp ENT** is a specialized platform designed to replace flaky freelancers with a predictable content engine for Minneapolis nightlife venues. It combines high-end aesthetics with powerful automation to streamline booking, content delivery, and business operations.

### Core Value Proposition
- **Predictable Delivery**: 24-72h turnaround time
- **ROI Focused**: Interactive tools to demonstrate value
- **Automation First**: Integrated booking, payments, and client management

---

## ✨ Features

### 🎮 Interactive Experience
- **ROI Calculator**: Real-time business value estimation
- **Comparison Slider**: Before/After visual showcase of editing quality
- **Magnetic UI**: Interactive buttons and elements using Framer Motion
- **Live Notifications**: Real-time social proof and engagement alerts

### 🤖 AI & Automation
- **Knowledge RAG Assistant**: Context-aware AI assistant for business intelligence
- **Smart Booking**: Integrated scheduling and Tally intake forms
- **Exit Intent**: Conversion-optimized popup on exit

### 🛍️ Commerce & Operations
- **Stripe Integration**: Secure checkout and payment processing
- **Admin Dashboard**: Full CMS for managing content and clients
- **Client Portal**: Dedicated area for deliverables

### 🎨 Premium Design System ("Aggressive Luxury")
- **Glassmorphism**: Modern, translucent UI with `backdrop-blur`
- **Brand Identity**: Rich Black (`#0B0B0D`), Gold (`#D9AE43`), Neon Pink (`#FF3C93`)
- **Typography**: Oswald (Headings) & Inter (Body)

---

## 🏗️ Architecture

```
src/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Landing (Hero + 12 sections)
│   ├── services/                 # Pricing tiers
│   ├── about/                    # Founder bio
│   ├── case-studies/             # Venue ROI results
│   ├── faq/                      # 8-item accordion
│   ├── contact/                  # SMS CTA + form
│   ├── gallery/                  # Public portfolio
│   ├── shop/                     # E-commerce store
│   ├── schedule/                 # Booking flow
│   ├── pilot-intake/             # Tally form integration
│   ├── checkout/                 # Stripe checkout
│   ├── login/ & register/        # Firebase Auth
│   ├── terms/ & privacy/         # Legal pages
│   ├── admin/                    # Protected dashboard
│   │   ├── dashboard/            # Analytics
│   │   ├── clients/              # Client management
│   │   ├── shoots/               # Scheduling
│   │   ├── invoices/             # Billing
│   │   ├── content/              # CMS editor
│   │   ├── knowledge/            # RAG knowledge base
│   │   ├── leads/                # Lead pipeline
│   │   └── settings/             # Config
│   ├── portal/[clientId]/        # Client portals
│   ├── ops/                      # Operations
│   └── api/                      # API routes
│       ├── assistant/            # AI chat
│       ├── booking/              # Booking handler
│       ├── checkout/             # Stripe sessions
│       ├── public-checkout/      # Guest checkout
│       └── webhooks/tally/       # Tally webhooks
│
├── components/
│   ├── ui/                       # Conversion Infrastructure
│   │   ├── MagneticButton.tsx    # Physics-based button
│   │   ├── AnimatedCounter.tsx   # Spring-animated stats
│   │   ├── LiveNotification.tsx  # Social proof popups
│   │   ├── ExitIntentPopup.tsx   # Exit intent modal
│   │   └── ScrollProgressBar.tsx # Progress indicator
│   │
│   ├── interactive/              # "Holy Shit" Components
│   │   ├── RoiCalculator.tsx     # Revenue calculator
│   │   └── ComparisonSlider.tsx  # Before/after slider
│   │
│   ├── client/                   # Client components
│   │   └── PilotIntakeForm.tsx   # Tally embed
│   │
│   ├── landing/                  # Homepage sections
│   ├── sections/                 # Page sections
│   └── admin/                    # Admin components
│
├── context/                      # React contexts
├── hooks/                        # Custom hooks
├── lib/                          # Core utilities
└── types/                        # TypeScript types
```

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `brandGold` | `#D9AE43` | Primary accent, CTAs |
| `gold-light` | `#FCF6BA` | Gradient highlights |
| `gold-dark` | `#BF953F` | Gradient anchors |
| `brandPink` | `#FF3C93` | Secondary accent |
| `ink` | `#0B0B0D` | Background |
| `surface` | `#1F1F24` | Cards, containers |

### Typography
- **Headings**: Oswald (bold, uppercase)
- **Body**: Inter (clean, readable)

---

## ⚡ Conversion Infrastructure

### Global Engines (via `layout.tsx`)
| Component | Description |
|-----------|-------------|
| `ScrollProgressBar` | Gold-to-pink gradient at viewport top |
| `LiveNotification` | Rotating Minneapolis venue social proof |
| `ExitIntentPopup` | "$1.6K waste" pilot offer on exit |

### Interactive Components
| Component | Description |
|-----------|-------------|
| `MagneticButton` | Physics-based button (Fitts's Law) |
| `AnimatedCounter` | Spring-animated numbers on scroll |
| `RoiCalculator` | Slider-driven revenue projection |
| `ComparisonSlider` | Draggable before/after reveal |

---

## 📄 Routes

### Public
| Route | Description |
|-------|-------------|
| `/` | Landing with 12 conversion sections |
| `/services` | Pricing tiers |
| `/about` | Founder profile |
| `/case-studies` | 3 venue ROI cases |
| `/faq` | 8-item accordion |
| `/contact` | SMS CTA + form |
| `/gallery` | Portfolio grid |
| `/shop` | E-commerce |
| `/schedule` | Booking flow |
| `/pilot-intake` | Tally intake form |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |

### Protected
| Route | Description |
|-------|-------------|
| `/admin/*` | Admin dashboard |
| `/portal/[clientId]` | Client portal |
| `/ops` | Operations |

---

## 🔌 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/assistant` | POST | AI chat |
| `/api/booking` | POST | Booking handler |
| `/api/checkout` | POST | Stripe session |
| `/api/public-checkout` | POST | Guest checkout |
| `/api/webhooks/tally` | POST | Tally submissions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4 |
| **Animation** | Framer Motion |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **Payments** | Stripe |
| **Forms** | Tally Forms |
| **Icons** | Lucide React |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit **http://localhost:3000**

---

## 🔐 Environment Variables

Create `.env.local`:

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Tally
TALLY_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💰 Business Model

### Pricing Tiers
| Tier | Price | Deliverables |
|------|-------|--------------|
| **Pilot Night** | $345 | 1 shoot, 30 photos, 72h delivery |
| **Weekend Warrior** | $695/mo | 2 shoots, 60 photos + 2 reels |
| **VIP Partner** | $995/mo | 3 shoots, 90 photos + 4 reels |

---

## 📄 License

Private & Proprietary - © 2025 GettUpp ENT

---

<div align="center">

**Made with 💎 and ⚡ in Minneapolis**

</div>
