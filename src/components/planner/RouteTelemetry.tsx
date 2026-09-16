import React from 'react';
import { RouteResult } from '@/types';
import { Clock, Navigation, CornerUpRight, Flame, ListOrdered } from 'lucide-react';

interface RouteTelemetryProps {
  route: RouteResult;
}

export default function RouteTelemetry({ route }: RouteTelemetryProps) {
  const hours = Math.floor(route.durationMinutes / 60);
  const minutes = route.durationMinutes % 60;
  const timeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;

  return (
    <div className="space-y-4">
      {/* 4 Summary Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 rounded-2xl bg-surface border border-border">
          <span className="block text-[10px] uppercase font-bold text-slate-500">Distancia</span>
          <span className="text-base font-extrabold text-white">{route.distanceKm} km</span>
        </div>
        <div className="p-3 rounded-2xl bg-surface border border-border">
          <span className="block text-[10px] uppercase font-bold text-slate-500">Tiempo Est.</span>
          <span className="text-base font-extrabold text-white">{timeFormatted}</span>
        </div>
        <div className="p-3 rounded-2xl bg-surface border border-border">
          <span className="block text-[10px] uppercase font-bold text-slate-500">Curvas</span>
          <span className="text-base font-extrabold text-primary flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {route.curvyScore}%
          </span>
        </div>
      </div>

      {/* Instructions cue list */}
      {route.instructions && route.instructions.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-surface border border-border space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <ListOrdered className="w-4 h-4 text-primary" />
            <span>Instrucciones de Navegación</span>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {route.instructions.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-300 pb-2 border-b border-white/5 last:border-0"
              >
                <span className="w-4 h-4 rounded-full bg-surface-light border border-primary/30 text-primary flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="leading-snug">{step.text}</p>
                  {step.distanceM > 0 && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      por {(step.distanceM / 1000).toFixed(1)} km
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
