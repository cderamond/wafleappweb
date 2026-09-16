# Waffle App Web — Implementation Walkthrough

We have designed, built, and verified the complete web platform for **Waffle App**, inspired by the promotional structure and UI/UX of **[RutApp](https://rutapp.org/)** with 100% whitelabel parametrization, alongside a full-featured motorcycle route planner inspired by **[Kurviger Plan](https://kurviger.com/en/plan)**.

---

## 1. Antigravity Workspace Context Documents

To ensure continuous, seamless context for any AI agent working on this repository, we established:

| File | Purpose |
| :--- | :--- |
| [`AGENTS.md`](./AGENTS.md) | Enforces strict whitelabel parametrization (zero hardcoded app names or links), architectural boundaries, and coding standards. |
| [`.agents/skills/waffle-web-builder/SKILL.md`](./.agents/skills/waffle-web-builder/SKILL.md) | Agent skill providing runbooks for modifying branding, customizing route presets, tuning the curvy routing engine, and managing GPX parsers. |
| [`.env.example`](./.env.example) | Template for API keys (`NEXT_PUBLIC_ROUTING_API_KEY`, `NEXT_PUBLIC_ROUTING_PROVIDER`). |

---

## 2. 100% Whitelabel Parametrization Architecture

All branding, copy, store links, colors, FAQ entries, and sample routes are isolated in [`src/config/site.config.ts`](./src/config/site.config.ts):

* **Branding**: `appName`, `tagline`, `leadDescription`, `targetAudience`, `accentColor`, `country`.
* **Store Badges & Links**: `iosAppStoreUrl`, `googlePlayUrl`, `directApkUrl`, `webPlannerUrl`.
* **Navigation & Footer**: Dynamic links, contacts, copyright.
* **Content Collections**: `definition`, `whyUs` (problem/solution matrix), `featureCards`, `sampleRoutes`, `faqs`.

Changing any of these fields automatically re-brands the entire website without touching component code.

---

## 3. Implemented Modules & Features

### Module A: Promotional Landing Page (RutApp Design System)
* **Navbar**: Sticky glassmorphism header with logo, dynamic links, mobile drawer, highlighted "Planificador" badge, and "Descargar" action.
* **Hero Section**: High-impact value proposition ("Descubre dónde ir. Y con quién rodar"), App Store & Google Play badges, and a simulated 3-screen mobile device preview.
* **Qué es Waffle App**: Definitional answer box with bulleted capability checklist.
* **Live Community Routes**: Interactive route cards with terrain badges (*asfalto*, *mixto*, *off-road*), difficulty levels, distance, elevation gain, and a button to inspect in the planner.
* **Split Detail Section**: Deep dive into route details, meeting points, and GPS synchronization.
* **Por Qué Existe**: 6-card problem vs. solution grid addressing rider pain points.
* **Biker Features**: Emergency medical profiles, instant route alerts, and club walls.
* **FAQ Accordion**: Interactive expandable Q&A accordion.
* **Download CTA**: Bottom conversion banner with store download buttons.

### Module B: Kurviger-Style Route Planner (`/plan`)
* **Interactive Full-Screen Map**: Built with Leaflet, dark mode tiles, and click-to-add waypoint capabilities.
* **Waypoint Management**: Start (A), intermediate Via points, and Destination (B) with drag-to-reorder, reverse route, and preset one-click routes (Farellones, Cuesta La Dormida, Cajón del Maipo).
* **Kurviger Routing Profiles**:
  * 🚀 **Rápido (Fastest)**
  * 🏍️ **Curvado (Curvy / Kurviger algorithm)**
  * 🏔️ **Super Curvas (Extra Curvy)**
  * 🌲 **Panorámico (Scenic)**
* **Procedural Curvy Routing Engine & API Key Support**: Works out of the box with realistic curved trajectories and elevation simulation, while also supporting external APIs (OpenRouteService, GraphHopper, Mapbox) via `NEXT_PUBLIC_ROUTING_API_KEY`.
* **Telemetry & Elevation Chart**: Distance (km), duration, curvy score (%), ascent/descent metrics, turn-by-turn guidance cues, and an interactive SVG elevation profile chart.
* **GPX Export & Import**:
  * Download RFC-compliant `.gpx` tracks directly for Garmin, BMW Navigator, OsmAnd, and Waffle App.
  * Drag-and-drop GPX file upload to inspect external tracks.
  * Direct "Open in Google Maps" link.

---

## 4. Verification & Validation Results

1. **Runtime Verification**: Node.js LTS v24.19 and npm v11.17 installed and operational.
2. **Type Safety**: `tsc --noEmit` passed with **0 errors**.
3. **Production Build**: `npm run build` compiled all static pages and dynamic routes successfully.
4. **Automated Unit Tests**: Executed `tests/test-app.mjs`:
   * Distance calculation verified: `22.06 km`
   * GPX XML schema generation verified
   * Parametrization string injection verified

---

## 5. How to Run & Configure

### Start the Development Server:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Add a Live Routing API Key (Optional):
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_ROUTING_PROVIDER=openrouteservice
NEXT_PUBLIC_ROUTING_API_KEY=your_ors_api_key_here
```
*(If omitted, the built-in procedural engine runs automatically).*
