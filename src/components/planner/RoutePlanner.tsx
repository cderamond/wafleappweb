'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Waypoint, RouteResult, RoutingProfile } from '@/types';
import { calculateRoute } from '@/lib/routing/routeService';
import { siteConfig } from '@/config/site.config';
import ProfileSelector from './ProfileSelector';
import WaypointPanel from './WaypointPanel';
import RouteTelemetry from './RouteTelemetry';
import ElevationChart from './ElevationChart';
import ExportModal from './ExportModal';
import { Compass, RotateCw, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Dynamically import MapComponent with ssr: false
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-background text-slate-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold">Cargando mapa interactivo...</span>
      </div>
    </div>
  ),
});

interface RoutePlannerProps {
  initialRouteId?: string;
}

export default function RoutePlanner({ initialRouteId }: RoutePlannerProps) {
  // Default waypoints: Santiago -> Farellones
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    {
      id: 'wp-1',
      label: 'Santiago (Partida)',
      lat: -33.3644,
      lng: -70.5186,
      type: 'start',
    },
    {
      id: 'wp-2',
      label: 'Curva 20 Farellones',
      lat: -33.3551,
      lng: -70.4721,
      type: 'via',
    },
    {
      id: 'wp-3',
      label: 'Valle Nevado (Destino)',
      lat: -33.3533,
      lng: -70.2815,
      type: 'end',
    },
  ]);

  const [profile, setProfile] = useState<RoutingProfile>('curvy');
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Recalculate route
  const handleCalculateRoute = useCallback(async () => {
    if (waypoints.length < 2) return;
    setIsCalculating(true);
    setErrorMsg(null);

    try {
      const res = await calculateRoute(waypoints, profile);
      setRouteResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error calculando ruta: ' + (err.message || 'Error desconocido'));
    } finally {
      setIsCalculating(false);
    }
  }, [waypoints, profile]);

  // Initial calculation and load route by query param if present
  useEffect(() => {
    if (initialRouteId) {
      const sample = siteConfig.sampleRoutes.find((r) => r.id === initialRouteId);
      if (sample && sample.coordinates && sample.coordinates.length >= 2) {
        const loadedWaypoints: Waypoint[] = sample.coordinates.map((c, i) => ({
          id: `sample-${i}`,
          label:
            i === 0
              ? `${sample.meetingPoint}`
              : i === sample.coordinates!.length - 1
              ? `${sample.title} (Meta)`
              : `Punto intermedio ${i}`,
          lat: c[0],
          lng: c[1],
          type: i === 0 ? 'start' : i === sample.coordinates!.length - 1 ? 'end' : 'via',
        }));
        setWaypoints(loadedWaypoints);
        return;
      }
    }

    handleCalculateRoute();
  }, [initialRouteId, handleCalculateRoute]);

  // Add waypoint when clicking on map
  const handleMapClick = (lat: number, lng: number) => {
    setWaypoints((prev) => {
      const updated = [...prev];
      // Insert before destination
      const last = updated[updated.length - 1];
      const newVia: Waypoint = {
        id: `wp-${Date.now()}`,
        label: `Parada ${updated.length}`,
        lat,
        lng,
        type: 'via',
      };
      updated.splice(updated.length - 1, 0, newVia);
      return updated;
    });
  };

  const handleAddVia = () => {
    // Generate point roughly between start and end
    if (waypoints.length < 2) return;
    const start = waypoints[0];
    const end = waypoints[waypoints.length - 1];
    const midLat = (start.lat + end.lat) / 2 + 0.02;
    const midLng = (start.lng + end.lng) / 2 - 0.02;

    const newVia: Waypoint = {
      id: `wp-${Date.now()}`,
      label: `Punto Intermedio ${waypoints.length}`,
      lat: midLat,
      lng: midLng,
      type: 'via',
    };

    setWaypoints((prev) => {
      const updated = [...prev];
      updated.splice(updated.length - 1, 0, newVia);
      return updated;
    });
  };

  const handleRemoveWaypoint = (id: string) => {
    setWaypoints((prev) => {
      if (prev.length <= 2) return prev;
      const filtered = prev.filter((w) => w.id !== id);
      // Re-tag start and end
      filtered[0].type = 'start';
      filtered[filtered.length - 1].type = 'end';
      return filtered;
    });
  };

  const handleReverseRoute = () => {
    setWaypoints((prev) => {
      const reversed = [...prev].reverse();
      return reversed.map((wp, index) => ({
        ...wp,
        type: index === 0 ? 'start' : index === reversed.length - 1 ? 'end' : 'via',
      }));
    });
  };

  const handleSelectPreset = (coords: [number, number][], names: string[]) => {
    const newWps: Waypoint[] = coords.map((c, i) => ({
      id: `preset-${i}`,
      label: names[i] || `Punto ${i + 1}`,
      lat: c[0],
      lng: c[1],
      type: i === 0 ? 'start' : i === coords.length - 1 ? 'end' : 'via',
    }));
    setWaypoints(newWps);
  };

  const handleImportWaypoints = (newWaypoints: Waypoint[]) => {
    setWaypoints(newWaypoints);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-background">
      
      {/* Left Sidebar: Controls, Waypoints, Telemetry */}
      <div className="w-full lg:w-[420px] xl:w-[460px] h-full overflow-y-auto border-r border-border bg-[#06130d] p-4 sm:p-5 flex flex-col justify-between space-y-6 shrink-0 shadow-xl z-10">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-primary transition-colors mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a la portada
              </Link>
              <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Planificador de Curvas
              </h1>
            </div>

            <button
              onClick={handleCalculateRoute}
              disabled={isCalculating}
              className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Recalcular ruta"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isCalculating ? 'animate-spin' : ''}`} />
              Calcular
            </button>
          </div>

          {/* Profile Selector */}
          <ProfileSelector
            currentProfile={profile}
            onProfileChange={(p) => setProfile(p)}
          />

          {/* Waypoints */}
          <WaypointPanel
            waypoints={waypoints}
            onAddVia={handleAddVia}
            onRemoveWaypoint={handleRemoveWaypoint}
            onReverseRoute={handleReverseRoute}
            onSelectPreset={handleSelectPreset}
          />

          {/* Error display */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Telemetry & Elevation */}
          {routeResult && (
            <>
              <RouteTelemetry route={routeResult} />
              <ElevationChart
                elevationProfile={routeResult.elevationProfile}
                ascentM={routeResult.ascentM}
                descentM={routeResult.descentM}
              />
            </>
          )}
        </div>

        {/* Bottom Export Actions */}
        <div className="pt-4 border-t border-border">
          <ExportModal
            route={routeResult}
            waypoints={waypoints}
            onImportWaypoints={handleImportWaypoints}
          />
        </div>
      </div>

      {/* Right Area: Interactive Map */}
      <div className="flex-1 h-[50vh] lg:h-full relative">
        <MapComponent
          waypoints={waypoints}
          routeResult={routeResult}
          onMapClick={handleMapClick}
        />
      </div>

    </div>
  );
}
