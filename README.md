# 🚀 GettUpp Business OS

> **"Time is the Business."** — A comprehensive business operating system built with AI-powered agents, stunning design, and automation-first philosophy.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![CI/CD Pipeline](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml)
[![CodeQL](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml)
[![Deploy](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml)

---

## 📋 Overview

**GettUpp Business OS** is a next-generation business management platform that combines:
- 🤖 **AI Agent Workforce** - Autonomous agents for marketing, finance, operations, and more
- 💎 **Premium Design System** - Glassmorphic UI with brand gold & neon pink aesthetics
- 📊 **Knowledge RAG Assistant** - Relationship-aware AI assistant for business intelligence
- 🎯 **Automation-First** - Every feature designed for speed, ROI, and scalability

Built for **GettUpp ENT** - a nightlife photography and content creation business that needed to scale operations through intelligent automation.

---

## ✨ Features

### 🤖 AI Agent Fleet
- **Social Media Agent** - Automated content creation and posting
- **Carousel Agent** - Instagram carousel generation with data-driven design
- **Marketing Agent** - Campaign management and analytics
- **Finance Agent** - Invoice generation and financial tracking
- **Operations Agent** - Asset tracking and workflow automation
- **Legal Agent** - Policy management and compliance
- **HR Agent** - Team management and documentation
- **Website Agent** - CRO optimization and analytics
- **Outbound Agent** - Lead processing and outreach automation

### 💬 Knowledge RAG Assistant
- Relationship-aware context understanding
- Multi-agent conversation routing
- Admin knowledge base management
- Real-time search and retrieval

### 🎨 Premium UI/UX
- **Glassmorphic Design** - Modern, translucent interfaces
- **Magnetic Buttons** - Interactive, reactive components
- **Reveal Animations** - Smooth scroll-triggered effects
- **Dark Mode First** - Rich black (#080808) with gold (#D9AE43) and pink (#FF3C93) accents

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Data** | Flat-file JSON + Node.js Agents |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johnnycsv232/GettUppent.git
   cd GettUppent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard
│   │   ├── api/                # API routes
│   │   ├── ops/                # Operations dashboard
│   │   ├── pilot-intake/       # Client intake forms
│   │   └── shop/               # E-commerce pages
│   ├── components/             # Reusable UI components
│   │   └── landing/            # Landing page components
│   ├── lib/                    # Helper functions & business logic
│   ├── types/                  # TypeScript interfaces
│   └── gettupp-ent/            # Agent scripts & backend
│       ├── agents/             # AI agent implementations
│       ├── carousel_output/    # Generated carousel content
│       ├── crm-scripts/        # Lead processing
│       ├── docs/               # Business documentation
│       └── ops-tools/          # Operational utilities
├── public/                     # Static assets
├── BRAND ASSETS/               # Brand identity files
└── PROJECT_RULES.md            # Development standards
```

---

## 🎨 Design System

### Color Palette
```css
--background: #080808    /* Rich Black */
--surface: #1A1A1D       /* Dark Grey */
--brand-gold: #D9AE43    /* Metallic Gold */
--brand-pink: #FF3C93    /* Neon Pink */
--text-primary: #FFFFFF  /* White */
--text-secondary: #9CA3AF /* Gray-400 */
```

### Typography
- **Headings**: Oswald (Uppercase, Bold, Condensed)
- **Body**: Inter / System Sans
- **Code**: JetBrains Mono

### UI Patterns
- **Glassmorphism**: `bg-white/5 backdrop-blur-md`
- **Borders**: `border-white/10`
- **Hover Effects**: Magnetic and reactive interactions
- **Gradients**: Gold/Pink accents for CTAs

---

## 🤖 Agent System

### Running Agents

**Via CLI (manage.js)**
```bash
cd src/gettupp-ent
node manage.js
```

**Individual Agent Execution**
```bash
node src/gettupp-ent/agents/CarouselAgent.js
node src/gettupp-ent/agents/FinanceAgent.js
```

### Agent Architecture
All agents extend a base autonomous framework:
- **Autonomous Decision Making** - Agents decide when to act
- **Tool Integration** - External API and service connections
- **Logging & Monitoring** - Console and file-based tracking
- **Modular Design** - Easy to add/remove agents

---

## 📊 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with portfolio showcase |
| `/admin` | Knowledge base management dashboard |
| `/ops` | Operations and agent control panel |
| `/pilot-intake` | Client onboarding form |
| `/shop` | E-commerce storefront |
| `/api/assistant` | RAG assistant API endpoint |
| `/api/admin/knowledge` | Knowledge CRUD operations |

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com
# GEMINI_API_KEY=your_api_key_here
```

---

## 📝 Development Standards

### Code Quality
- ✅ **Type Safety**: No `any` types - define interfaces in `src/types`
- ✅ **Component Size**: Keep components focused and under 200 lines
- ✅ **Server vs Client**: Use `'use client'` only when necessary
- ✅ **Performance**: Optimize images, lazy load components

### Naming Conventions
- **Components**: PascalCase (`PricingCard.tsx`)
- **Functions**: camelCase (`calculateRoi`)
- **Files**: kebab-case for utilities, PascalCase for components

See [PROJECT_RULES.md](./PROJECT_RULES.md) for complete standards.

---

## 🎯 Roadmap

- [ ] Firebase integration for real-time data
- [ ] Stripe payment processing
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-tenant support
- [ ] API marketplace for agents

---

## 🤝 Contributing

This is a proprietary project for **GettUpp ENT**. For collaboration inquiries, please contact the team.

---

## 📄 License

Private & Proprietary - © 2025 GettUpp ENT

---

## 👨‍💻 Author

**GettUpp ENT**  
Built with ⚡ by the GettUpp team

---

## 🙏 Acknowledgments

- Next.js team for the incredible framework
- Vercel for hosting and deployment
- The open-source community for amazing tools

---

<div align="center">

**[Website](https://gettupp.com)** • **[Instagram](https://instagram.com/gettupp)** • **[Contact](mailto:finan@gettupp.com)**

Made with 💎 and ⚡ in the USA

</div>
