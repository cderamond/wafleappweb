import { RouteResult, RoutingProfile, Waypoint, ElevationPoint } from '@/types';

// Haversine distance in km
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function generateProceduralRoute(
  waypoints: Waypoint[],
  profile: RoutingProfile = 'curvy'
): RouteResult {
  if (waypoints.length < 2) {
    throw new Error('At least 2 waypoints are required to calculate a route');
  }

  const coordinates: [number, number][] = [];
  const elevationProfile: ElevationPoint[] = [];
  let totalDistanceKm = 0;
  let totalAscentM = 0;
  let totalDescentM = 0;

  // Curvature parameters based on profile
  let curveFrequency = 4;
  let curveAmplitudeFactor = 0.003; // degrees offset (~300m)
  let speedKmh = 65;
  let curvyScore = 75;

  if (profile === 'fastest') {
    curveFrequency = 1;
    curveAmplitudeFactor = 0.0005;
    speedKmh = 95;
    curvyScore = 30;
  } else if (profile === 'extra_curvy') {
    curveFrequency = 7;
    curveAmplitudeFactor = 0.006;
    speedKmh = 50;
    curvyScore = 95;
  } else if (profile === 'scenic') {
    curveFrequency = 5;
    curveAmplitudeFactor = 0.004;
    speedKmh = 60;
    curvyScore = 80;
  }

  // Base elevation simulation around 600m - 2200m
  let currentElevation = 650;
  let prevElevation = currentElevation;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];

    const segDist = calculateDistanceKm(start.lat, start.lng, end.lat, end.lng);
    const steps = Math.max(12, Math.floor(segDist * 5)); // point every 200m

    // Direction vector
    const dLat = end.lat - start.lat;
    const dLng = end.lng - start.lng;
    const length = Math.sqrt(dLat * dLat + dLng * dLng) || 0.0001;

    // Normal vector perpendicular to trajectory
    const nLat = -dLng / length;
    const nLng = dLat / length;

    for (let step = 0; step < steps; step++) {
      const t = step / steps;
      // Winding curve perturbation using sinusoidal harmonic combinations
      const sineWave = Math.sin(t * Math.PI * curveFrequency) * Math.cos(t * Math.PI * 2);
      const perpOffset = sineWave * curveAmplitudeFactor;

      const lat = start.lat + dLat * t + nLat * perpOffset;
      const lng = start.lng + dLng * t + nLng * perpOffset;

      if (coordinates.length > 0) {
        const lastCoord = coordinates[coordinates.length - 1];
        const stepDist = calculateDistanceKm(lastCoord[0], lastCoord[1], lat, lng);
        totalDistanceKm += stepDist;

        // Simulate elevation change
        const eleDelta = Math.sin(t * Math.PI * 3) * 15 + (Math.random() - 0.48) * 8;
        currentElevation = Math.max(200, currentElevation + eleDelta);

        if (currentElevation > prevElevation) {
          totalAscentM += currentElevation - prevElevation;
        } else {
          totalDescentM += prevElevation - currentElevation;
        }
        prevElevation = currentElevation;
      }

      coordinates.push([lat, lng]);
      elevationProfile.push({
        distanceKm: Math.round(totalDistanceKm * 10) / 10,
        elevationM: Math.round(currentElevation),
        lat,
        lng,
      });
    }
  }

  // Add final destination point
  const lastWp = waypoints[waypoints.length - 1];
  coordinates.push([lastWp.lat, lastWp.lng]);
  elevationProfile.push({
    distanceKm: Math.round(totalDistanceKm * 10) / 10,
    elevationM: Math.round(currentElevation),
    lat: lastWp.lat,
    lng: lastWp.lng,
  });

  const durationMinutes = Math.round((totalDistanceKm / speedKmh) * 60);

  // Generate turn-by-turn guidance
  const instructions: RouteResult['instructions'] = [
    { text: `Inicio en ${waypoints[0].label || 'Punto de partida'}`, distanceM: 0, type: 'depart' },
    { text: 'Continúa por camino sinuoso disfrutando de las curvas', distanceM: Math.round(totalDistanceKm * 350), type: 'straight' },
    { text: 'Sucesión de curvas pronunciadas en montaña', distanceM: Math.round(totalDistanceKm * 450), type: 'turn_right' },
    { text: `Llegada a ${waypoints[waypoints.length - 1].label || 'Destino final'}`, distanceM: 0, type: 'arrive' },
  ];

  return {
    id: `route-${Date.now()}`,
    profile,
    distanceKm: Math.round(totalDistanceKm * 10) / 10,
    durationMinutes,
    ascentM: Math.round(totalAscentM),
    descentM: Math.round(totalDescentM),
    curvyScore,
    coordinates,
    elevationProfile,
    instructions,
  };
}
