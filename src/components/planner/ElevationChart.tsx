'use client';

import React from 'react';
import { ElevationPoint } from '@/types';
import { Mountain } from 'lucide-react';

interface ElevationChartProps {
  elevationProfile: ElevationPoint[];
  ascentM: number;
  descentM: number;
}

export default function ElevationChart({
  elevationProfile,
  ascentM,
  descentM,
}: ElevationChartProps) {
  if (!elevationProfile || elevationProfile.length < 2) {
    return null;
  }

  const minEle = Math.min(...elevationProfile.map((p) => p.elevationM));
  const maxEle = Math.max(...elevationProfile.map((p) => p.elevationM));
  const totalDist = elevationProfile[elevationProfile.length - 1].distanceKm;
  const eleRange = Math.max(100, maxEle - minEle);

  const width = 400;
  const height = 110;
  const padding = 15;

  // Generate SVG points
  const points = elevationProfile
    .map((p) => {
      const x = padding + (p.distanceKm / (totalDist || 1)) * (width - padding * 2);
      const y = height - padding - ((p.elevationM - minEle) / eleRange) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Gradient area path
  const areaPath = `M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`;

  return (
    <div className="space-y-2 p-3.5 rounded-2xl bg-surface border border-border">
      <div className="flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-1.5 text-white">
          <Mountain className="w-4 h-4 text-primary" />
          <span>Perfil Altimétrico</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-emerald-400">▲ +{ascentM} m</span>
          <span className="text-amber-400">▼ -{descentM} m</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-24 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="eleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background area fill */}
          <path d={areaPath} fill="url(#eleGradient)" />

          {/* Line stroke */}
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>

        {/* Labels */}
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>0 km ({minEle}m)</span>
          <span>{totalDist} km ({maxEle}m máx)</span>
        </div>
      </div>
    </div>
  );
}
