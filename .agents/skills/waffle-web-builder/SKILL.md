---
name: waffle-web-builder
description: >-
  Workflows, conventions, and procedures for extending and maintaining the Waffle App Web platform.
  Covers whitelabel parametrization, RutApp-style promotional components, and Kurviger-style route planning.
---

# Waffle App Web Builder Skill

This skill guides agents and developers in building, updating, and validating the **Waffle App Web** application.

---

## 1. Whitelabel Parametrization Workflow

When asked to rebrand, rename, or update promotional links:

1. Open `src/config/site.config.ts`.
2. Modify the corresponding fields under `siteConfig.branding`, `siteConfig.appStoreLinks`, or `siteConfig.seo`.
3. Never edit JSX templates directly to change app name or copy.
4. If new assets (logos, screenshots) are provided, place them in `public/assets/branding/` and update the paths in `site.config.ts`.
5. Verify changes with `npm run build` and visual preview.

---

## 2. Kurviger-Style Route Planner Guidelines

The route planner module is located at `src/components/planner/` and routed at `/plan`.

### Key Components:
* `RouteMap.tsx`: Interactive Leaflet map container with tile layer selector, click-to-add-waypoint handlers, and polyline renderer.
* `WaypointPanel.tsx`: Sidebar/drawer allowing users to add, remove, re-order, and search waypoints (Origin, Via points, Destination).
* `RoutingControls.tsx`: Profile selector (Curvy, Fastest, Scenic, Off-road) and Round-trip generator button.
* `ElevationChart.tsx`: SVG/Canvas elevation chart displaying distance vs. altitude profile.
* `ExportModal.tsx`: GPX file generation and direct download trigger.

### Routing Providers & API Key Handling:
* Routing requests route through `src/lib/routing/routeService.ts`.
* If `NEXT_PUBLIC_ROUTING_API_KEY` is present in `.env.local`, the service queries the configured external provider (OpenRouteService, Mapbox, or GraphHopper).
* If no API key is provided, the service falls back gracefully to `offlineRoutingEngine.ts` which computes realistic curved path geometries between waypoints using Catmull-Rom or cubic spline interpolation along road networks with simulated elevations.

---

## 3. GPX Utilities

* Located in `src/lib/gpx/`.
* `generateGpx(route: RouteResult): string`: Produces standard XML GPX track (`<gpx><trk><trkseg><trkpt lat="..." lon="..."><ele>...</ele></trkpt></trkseg></trk></gpx>`).
* `parseGpx(xmlString: string): RouteResult`: Parses uploaded GPX tracks and renders them on the map.

---

## 4. Quality & Build Checklist

Always execute before finishing:
```bash
npm run lint
npm run build
```
Ensure responsive behavior across mobile (375px), tablet (768px), and desktop (1280px+).
