# GettUpp Business OS - Project Rules & Standards

## 1. Philosophy
**"Time is the Business."**
We build tools that automate, accelerate, and monetize. Every feature must have a clear ROI.
We prioritize **Speed**, **Aesthetics**, and **Reliability**.

## 2. Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS (Utility-first)
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Data**: Flat-file JSON (`GETTUPP_MASTER_UNIFIED_Q4_2025_FULL.json`) + Node.js Agents

## 3. Design System ("The GettUpp Look")
### Colors
- **Background**: `#080808` (Rich Black)
- **Surface**: `#1A1A1D` (Dark Grey)
- **Brand Gold**: `#D9AE43` (Metallic Gold)
- **Brand Pink**: `#FF3C93` (Neon Pink)
- **Text**: White (Primary), `#9CA3AF` (Secondary/Gray-400)

### Typography
- **Headings**: `Oswald` (Uppercase, Bold, Condensed)
- **Body**: `Inter` or System Sans (Clean, Readable)
- **Code/Data**: `JetBrains Mono`

### UI Patterns
- **Glassmorphism**: Subtle backdrops (`bg-white/5 backdrop-blur-md`).
- **Borders**: Thin, subtle borders (`border-white/10`).
- **Interactive**: Hover effects on everything. Buttons should feel magnetic or reactive.
- **Gradients**: Use Gold/Pink gradients sparingly for accents.

## 4. Coding Standards
### File Structure
- `src/app`: Routes and Pages.
- `src/components`: Reusable UI components.
- `src/lib`: Helper functions and business logic.
- `src/types`: TypeScript interfaces.
- `src/gettupp-ent`: Agent scripts and backend logic.

### Naming Conventions
- **Components**: PascalCase (e.g., `PricingCard.tsx`)
- **Functions**: camelCase (e.g., `calculateRoi`)
- **Files**: kebab-case for utilities, PascalCase for components.

### Best Practices
- **Type Safety**: No `any`. Define interfaces in `src/types`.
- **Server vs Client**: Use `'use client'` only when necessary (hooks, interactivity).
- **Performance**: Optimize images, use lazy loading.
- **Clean Code**: Comment complex logic. Keep components small.

## 5. Agent Protocol
- Agents reside in `src/gettupp-ent/agents`.
- Agents must be autonomous but controllable via the `manage.js` CLI.
- Agents should log their actions clearly to the console (or a log file).
