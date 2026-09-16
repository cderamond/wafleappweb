import { RouteResult, Waypoint } from '@/types';
import { siteConfig } from '@/config/site.config';

export function exportRouteToGpx(route: RouteResult, waypoints: Waypoint[], routeName?: string): string {
  const name = routeName || `${siteConfig.branding.appName} - Ruta ${route.profile.toUpperCase()}`;
  const timeStr = new Date().toISOString();

  let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="${siteConfig.branding.appName} Kurviger Web Planner"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${name}</name>
    <desc>Generado con ${siteConfig.branding.appName} (${route.distanceKm} km, perfil: ${route.profile})</desc>
    <time>${timeStr}</time>
  </metadata>
`;

  // Add waypoints
  for (const wp of waypoints) {
    gpx += `  <wpt lat="${wp.lat.toFixed(6)}" lon="${wp.lng.toFixed(6)}">
    <name>${escapeXml(wp.label)}</name>
    <sym>${wp.type === 'start' ? 'Flag, Green' : wp.type === 'end' ? 'Flag, Red' : 'Pin, Blue'}</sym>
  </wpt>\n`;
  }

  // Add track and track points
  gpx += `  <trk>
    <name>${escapeXml(name)}</name>
    <type>Motorcycling</type>
    <trkseg>\n`;

  for (let i = 0; i < route.coordinates.length; i++) {
    const coord = route.coordinates[i];
    const elePoint = route.elevationProfile[i];
    const ele = elePoint ? elePoint.elevationM : 500;
    gpx += `      <trkpt lat="${coord[0].toFixed(6)}" lon="${coord[1].toFixed(6)}">
        <ele>${ele}</ele>
      </trkpt>\n`;
  }

  gpx += `    </trkseg>
  </trk>
</gpx>`;

  return gpx;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export function downloadGpxFile(gpxContent: string, fileName: string = 'ruta-waffle.gpx') {
  const blob = new Blob([gpxContent], { type: 'application/gpx+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith('.gpx') ? fileName : `${fileName}.gpx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
