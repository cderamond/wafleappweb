import React from 'react';
import { Waypoint } from '@/types';
import { Plus, Trash2, ArrowUpDown, MapPin, Sparkles } from 'lucide-react';

interface WaypointPanelProps {
  waypoints: Waypoint[];
  onAddVia: () => void;
  onRemoveWaypoint: (id: string) => void;
  onReverseRoute: () => void;
  onSelectPreset: (coords: [number, number][], names: string[]) => void;
}

export default function WaypointPanel({
  waypoints,
  onAddVia,
  onRemoveWaypoint,
  onReverseRoute,
  onSelectPreset,
}: WaypointPanelProps) {
  const presets = [
    {
      name: 'Curvas Farellones',
      coords: [
        [-33.3644, -70.5186],
        [-33.3551, -70.4721],
        [-33.3533, -70.2815],
      ] as [number, number][],
      names: ['Copec La Dehesa', 'Curva 20 Farellones', 'Valle Nevado'],
    },
    {
      name: 'Cuesta La Dormida',
      coords: [
        [-33.2842, -70.8711],
        [-33.1512, -70.9984],
        [-33.0012, -71.1856],
      ] as [number, number][],
      names: ['Lampa', 'Cumbre Cuesta', 'Olmué'],
    },
    {
      name: 'Cajón del Maipo',
      coords: [
        [-33.5855, -70.5688],
        [-33.6421, -70.3541],
        [-33.6765, -70.0894],
      ] as [number, number][],
      names: ['Las Vizcachas', 'San José de Maipo', 'Embalse El Yeso'],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Waypoint list header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Puntos de la Ruta ({waypoints.length})
        </label>
        <button
          onClick={onReverseRoute}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          title="Invertir sentido de la ruta"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Invertir Ruta
        </button>
      </div>

      {/* Waypoint Rows */}
      <div className="space-y-2">
        {waypoints.map((wp, index) => {
          let badge = 'Via';
          let badgeColor = 'bg-blue-500 text-white';

          if (wp.type === 'start') {
            badge = 'A';
            badgeColor = 'bg-primary text-black';
          } else if (wp.type === 'end') {
            badge = 'B';
            badgeColor = 'bg-red-500 text-white';
          }

          return (
            <div
              key={wp.id}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border"
            >
              <div
                className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${badgeColor}`}
              >
                {badge}
              </div>

              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-white truncate">
                  {wp.label}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono">
                  {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
                </span>
              </div>

              {waypoints.length > 2 && (
                <button
                  onClick={() => onRemoveWaypoint(wp.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  title="Eliminar punto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Waypoint Button */}
      <button
        onClick={onAddVia}
        className="w-full py-2 px-3 rounded-xl border border-dashed border-border hover:border-primary/50 text-slate-300 hover:text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-surface/50"
      >
        <Plus className="w-4 h-4" />
        Añadir Parada Intermedia (Via)
      </button>

      {/* Preset Quick Loader */}
      <div className="pt-2 border-t border-border">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mb-2">
          <Sparkles className="w-3 h-3 text-primary" />
          Rutas Clásicas Rápidas:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onSelectPreset(preset.coords, preset.names)}
              className="px-2.5 py-1 rounded-lg bg-surface-light border border-border text-[11px] font-medium text-slate-200 hover:border-primary hover:text-primary transition-all"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
