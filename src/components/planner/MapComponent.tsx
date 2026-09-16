'use client';

import React, { useEffect, useRef } from 'react';
import { Waypoint, RouteResult } from '@/types';
import L from 'leaflet';

interface MapComponentProps {
  waypoints: Waypoint[];
  routeResult: RouteResult | null;
  onMapClick: (lat: number, lng: number) => void;
}

export default function MapComponent({
  waypoints,
  routeResult,
  onMapClick,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Santiago default [-33.4489, -70.6693]
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([-33.4489, -70.6693], 11);

    // Dark Map Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    // Add Zoom control on top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Map click handler to place waypoints
    map.on('click', (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    });

    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onMapClick]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    waypoints.forEach((wp, index) => {
      let pinColor = '#3b82f6'; // via = blue
      let letter = `${index}`;

      if (wp.type === 'start') {
        pinColor = '#22c55e'; // start = green
        letter = 'A';
      } else if (wp.type === 'end') {
        pinColor = '#ef4444'; // end = red
        letter = 'B';
      }

      const iconHtml = `
        <div style="
          background-color: ${pinColor};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 12px;
          font-family: sans-serif;
        ">
          ${letter}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([wp.lat, wp.lng], { icon: customIcon });
      marker.bindPopup(`<strong>${wp.label}</strong><br><span style="font-size:11px;color:#94a3b8">Lat: ${wp.lat.toFixed(4)}, Lng: ${wp.lng.toFixed(4)}</span>`);
      markersGroup.addLayer(marker);
    });
  }, [waypoints]);

  // Update Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (routeResult && routeResult.coordinates.length > 0) {
      // Draw smooth curvy polyline
      const polyline = L.polyline(routeResult.coordinates, {
        color: '#22c55e',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      routeLayerRef.current = polyline;

      // Fit bounds to show complete route
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [routeResult]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Click tip banner overlay */}
      <div className="absolute top-4 left-4 z-10 bg-surface/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border text-[11px] text-slate-300 pointer-events-none shadow-md">
        💡 <strong className="text-primary">Tip:</strong> Haz clic en cualquier lugar del mapa para añadir un punto de ruta
      </div>
    </div>
  );
}
