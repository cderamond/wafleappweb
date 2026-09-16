# AGENTS.md — Waffle App Web Guidelines

This document provides instructions for AI agents working on the **Waffle App Web** codebase.

---

## 1. Architectural Philosophy: 100% Parametrization

The primary requirement of this project is **complete whitelabel encapsulation**.
* **Zero Hardcoded Branding**: Never hardcode the app name ("Waffle App"), taglines, store links, contact email, social handles, or feature copy directly inside UI components or templates.
* **Single Source of Truth**: All dynamic metadata, branding parameters, sample routes, navigation items, and feature toggles must be imported from `@/config/site.config.ts`.
* **Modularity**: Any re-branding or fork of this repository should only require editing `src/config/site.config.ts` and replacing visual assets in `public/assets/`.

---

## 2. Tech Stack & Directory Structure

* **Framework**: Next.js 14+ (App Router) with TypeScript.
* **Styling**: Tailwind CSS (dark mode optimized, emerald/lime accents inspired by [RutApp](https://rutapp.org/)).
* **Icons**: `lucide-react`.
* **Map & Route Planner**: `leaflet` / `react-leaflet` with modular routing services (supporting API keys like OpenRouteService, Mapbox, or GraphHopper, alongside a built-in offline procedural curve generator).

```
src/
├── app/                  # Next.js App Router (page.tsx, layout.tsx, plan/page.tsx)
├── components/
│   ├── landing/          # Hero, RutasGrid, WhyUs, AppPreview, FAQ, Footer
│   ├── planner/          # Full-screen Kurviger-style Route Planner components
│   ├── ui/               # Reusable UI elements (Badges, Buttons, Drawers, Cards)
│   └── common/           # Navbar, Footer, MetaHead
├── config/
│   └── site.config.ts    # MASTER CONFIGURATION (Whitelabel parameters)
├── lib/
│   ├── routing/          # Routing services, API key adapters, curvy route engine
│   └── gpx/              # GPX parser and generator
└── types/                # Core TypeScript interfaces
```

---

## 3. Coding Guidelines

* **TypeScript Strictness**: Always define explicit interfaces for component props and data models. Avoid `any`.
* **Responsive Design**: Mobile-first design. Test all components on standard mobile (375px), tablet (768px), and wide desktop viewports.
* **Component Encapsulation**: Keep landing page components strictly decoupled from route planner logic.
* **Client Components**: When using Leaflet or browser-only APIs (window, localStorage, navigator), use dynamic imports with `{ ssr: false }` or mark files with `'use client'`.

---

## 4. Verification Workflow

Before reporting completion on any feature:
1. Run `npm run lint` or `npx tsc --noEmit` to ensure zero type errors.
2. Run `npm run build` to verify production compilation.
3. Test that modifying a field in `site.config.ts` updates the entire UI cleanly.
