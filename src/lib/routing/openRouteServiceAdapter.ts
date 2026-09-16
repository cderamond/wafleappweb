import { RouteResult, RoutingProfile, Waypoint } from '@/types';
import { generateProceduralRoute } from './offlineRoutingEngine';

export async function fetchOpenRouteServiceRoute(
  waypoints: Waypoint[],
  profile: RoutingProfile,
  apiKey: string
): Promise<RouteResult> {
  // Map profile to ORS profile
  const orsProfile = profile === 'fastest' ? 'driving-car' : 'driving-car'; // OpenRouteService standard profile
  const coordinates = waypoints.map((w) => [w.lng, w.lat]);

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${orsProfile}/geojson`,
      {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates,
          elevation: true,
          instructions: true,
          preference: profile === 'fastest' ? 'fastest' : 'recommended',
        }),
      }
    );

    if (!response.ok) {
      console.warn('OpenRouteService API request failed, falling back to procedural engine.');
      return generateProceduralRoute(waypoints, profile);
    }

    const data = await response.json();
    const feature = data.features?.[0];
    if (!feature) {
      return generateProceduralRoute(waypoints, profile);
    }

    const coords: [number, number][] = feature.geometry.coordinates.map(
      (c: [number, number, number?]) => [c[1], c[0]] // convert [lng, lat] to [lat, lng]
    );

    const summary = feature.properties.summary;
    const distanceKm = Math.round((summary.distance / 1000) * 10) / 10;
    const durationMinutes = Math.round(summary.duration / 60);

    const elevationProfile = feature.geometry.coordinates.map(
      (c: [number, number, number?], idx: number) => ({
        distanceKm: Math.round(((idx / feature.geometry.coordinates.length) * distanceKm) * 10) / 10,
        elevationM: Math.round(c[2] || 500),
        lat: c[1],
        lng: c[0],
      })
    );

    return {
      id: `ors-${Date.now()}`,
      profile,
      distanceKm,
      durationMinutes,
      ascentM: Math.round(feature.properties.ascent || 450),
      descentM: Math.round(feature.properties.descent || 420),
      curvyScore: profile === 'extra_curvy' ? 95 : profile === 'curvy' ? 80 : 40,
      coordinates: coords,
      elevationProfile,
      instructions: (feature.properties.segments?.[0]?.steps || []).map((step: any) => ({
        text: step.instruction,
        distanceM: step.distance,
        type: step.type === 0 ? 'depart' : step.type === 10 ? 'arrive' : 'turn_left',
      })),
    };
  } catch (err) {
    console.error('Error fetching ORS route:', err);
    return generateProceduralRoute(waypoints, profile);
  }
}
