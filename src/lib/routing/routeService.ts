import { RouteResult, RoutingProfile, Waypoint } from '@/types';
import { generateProceduralRoute } from './offlineRoutingEngine';
import { fetchOpenRouteServiceRoute } from './openRouteServiceAdapter';

export async function calculateRoute(
  waypoints: Waypoint[],
  profile: RoutingProfile = 'curvy'
): Promise<RouteResult> {
  const apiKey = process.env.NEXT_PUBLIC_ROUTING_API_KEY;
  const provider = process.env.NEXT_PUBLIC_ROUTING_PROVIDER || 'offline_procedural';

  if (apiKey && provider === 'openrouteservice') {
    return fetchOpenRouteServiceRoute(waypoints, profile, apiKey);
  }

  // Built-in intelligent procedural curve generator
  return generateProceduralRoute(waypoints, profile);
}
