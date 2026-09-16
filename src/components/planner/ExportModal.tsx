'use client';

import React, { useRef } from 'react';
import { RouteResult, Waypoint } from '@/types';
import { exportRouteToGpx, downloadGpxFile } from '@/lib/gpx/gpxGenerator';
import { parseGpxWaypoints } from '@/lib/gpx/gpxParser';
import { Download, Upload, ExternalLink, FileCode } from 'lucide-react';

interface ExportModalProps {
  route: RouteResult | null;
  waypoints: Waypoint[];
  onImportWaypoints: (newWaypoints: Waypoint[]) => void;
}

export default function ExportModal({
  route,
  waypoints,
  onImportWaypoints,
}: ExportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadGpx = () => {
    if (!route) return;
    const gpxStr = exportRouteToGpx(route, waypoints);
    downloadGpxFile(gpxStr, `ruta-curvas-${route.distanceKm}km.gpx`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const imported = parseGpxWaypoints(content);
        if (imported.length > 0) {
          onImportWaypoints(imported);
        } else {
          alert('No se encontraron waypoints o coordenadas válidas en este archivo GPX.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Open destination in Google Maps
  const handleOpenGoogleMaps = () => {
    if (waypoints.length < 2) return;
    const origin = `${waypoints[0].lat},${waypoints[0].lng}`;
    const destination = `${waypoints[waypoints.length - 1].lat},${waypoints[waypoints.length - 1].lng}`;
    const waypointsParam = waypoints
      .slice(1, -1)
      .map((w) => `${w.lat},${w.lng}`)
      .join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypointsParam ? `&waypoints=${waypointsParam}` : ''
    }&travelmode=driving`;

    window.open(url, '_blank');
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Export GPX Button */}
        <button
          onClick={handleDownloadGpx}
          disabled={!route}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-primary-light transition-all shadow-md disabled:opacity-40 disabled:pointer-events-none"
        >
          <Download className="w-4 h-4" />
          Exportar Archivo GPX
        </button>

        {/* Open in Google Maps */}
        <button
          onClick={handleOpenGoogleMaps}
          disabled={waypoints.length < 2}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface border border-border text-white font-bold text-xs hover:border-primary transition-all disabled:opacity-40"
        >
          <ExternalLink className="w-4 h-4 text-primary" />
          Abrir en Google Maps
        </button>
      </div>

      {/* Import GPX File Button */}
      <div className="pt-1">
        <input
          ref={fileInputRef}
          type="file"
          accept=".gpx"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-border hover:border-primary/50 text-slate-300 hover:text-white text-xs font-semibold transition-all bg-surface/40"
        >
          <Upload className="w-4 h-4 text-primary" />
          Importar ruta desde archivo GPX existente
        </button>
      </div>
    </div>
  );
}
