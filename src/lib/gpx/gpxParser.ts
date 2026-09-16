import { Waypoint } from '@/types';

export function parseGpxWaypoints(xmlContent: string): Waypoint[] {
  const waypoints: Waypoint[] = [];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

  // Check for <wpt>
  const wpts = xmlDoc.getElementsByTagName('wpt');
  for (let i = 0; i < wpts.length; i++) {
    const el = wpts[i];
    const lat = parseFloat(el.getAttribute('lat') || '0');
    const lng = parseFloat(el.getAttribute('lon') || '0');
    const nameEl = el.getElementsByTagName('name')[0];
    const label = nameEl?.textContent || `Punto ${i + 1}`;

    waypoints.push({
      id: `imported-wp-${i}`,
      label,
      lat,
      lng,
      type: i === 0 ? 'start' : i === wpts.length - 1 ? 'end' : 'via',
    });
  }

  // If no <wpt> but has <trkpt>, extract start, mid and end
  if (waypoints.length === 0) {
    const trkpts = xmlDoc.getElementsByTagName('trkpt');
    if (trkpts.length >= 2) {
      const first = trkpts[0];
      const last = trkpts[trkpts.length - 1];

      waypoints.push({
        id: 'imported-wp-start',
        label: 'Origen importado',
        lat: parseFloat(first.getAttribute('lat') || '0'),
        lng: parseFloat(first.getAttribute('lon') || '0'),
        type: 'start',
      });

      if (trkpts.length > 2) {
        const midIdx = Math.floor(trkpts.length / 2);
        const mid = trkpts[midIdx];
        waypoints.push({
          id: 'imported-wp-mid',
          label: 'Punto intermedio',
          lat: parseFloat(mid.getAttribute('lat') || '0'),
          lng: parseFloat(mid.getAttribute('lon') || '0'),
          type: 'via',
        });
      }

      waypoints.push({
        id: 'imported-wp-end',
        label: 'Destino importado',
        lat: parseFloat(last.getAttribute('lat') || '0'),
        lng: parseFloat(last.getAttribute('lon') || '0'),
        type: 'end',
      });
    }
  }

  return waypoints;
}
