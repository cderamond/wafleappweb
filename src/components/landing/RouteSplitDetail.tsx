import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { CheckCircle, Navigation, Layers, Compass } from 'lucide-react';

export default function RouteSplitDetail() {
  return (
    <section className="py-20 border-t border-border bg-[#091b12]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">
              Detalle Integral de Cada Salida
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Cada ruta en moto,<br />
              con su trazado y curvas al detalle.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Filtra las salidas por región, tipo de terreno (asfalto, mixto u off-road) y cilindrada recomendada. Cada trayecto muestra su punto de reunión con enlace a Google/Apple Maps, perfil de desniveles y waypoints paso a paso.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                <span className="text-sm text-slate-200">
                  <strong>Terreno especificado:</strong> asfalto impecable, curvas mixtas o huellas de tierra con nivel de dificultad claro.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                <span className="text-sm text-slate-200">
                  <strong>Punto de encuentro directo:</strong> abre las coordenadas exactas en Waze, Google Maps o tu navegador favorito.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                <span className="text-sm text-slate-200">
                  <strong>Exportación GPX universal:</strong> compatible con Garmin, BMW Motorrad Connected, OsmAnd y {siteConfig.branding.appName}.
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Explorar Planificador de Curvas Kurviger</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-surface border border-border p-6 shadow-2xl shadow-emerald-950/60 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" />
                  <span className="font-bold text-white text-sm">Ficha Técnica de Ruta</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-semibold">
                  Modo: Sinuoso
                </span>
              </div>

              {/* Waypoints visual list */}
              <div className="py-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-black font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">Santiago — Bomba Copec</p>
                    <p className="text-[11px] text-slate-400">Punto de encuentro 08:30 hrs</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">0 km</span>
                </div>

                <div className="ml-3 pl-3 border-l-2 border-dashed border-primary/40 py-1 space-y-1">
                  <p className="text-[11px] text-primary font-semibold">
                    ~ 40 curvas consecutivas de montaña (asfalto de adherencia media)
                  </p>
                  <p className="text-[10px] text-slate-400">Ascenso de 750m a 2,250m de altitud</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                    Via
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">Mirador Curva 32</p>
                    <p className="text-[11px] text-slate-400">Parada fotográfica & descanso</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">46 km</span>
                </div>

                <div className="ml-3 pl-3 border-l-2 border-dashed border-primary/40 py-1 space-y-1">
                  <p className="text-[11px] text-primary font-semibold">
                    Descenso pronunciado hacia Valle Nevado
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center">
                    B
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">Destino: Refugio de Montaña</p>
                    <p className="text-[11px] text-slate-400">Almuerzo y retorno grupal</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">92 km</span>
                </div>
              </div>

              {/* Bottom telemetry */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-slate-400">
                <span>Tiempo estimado: <strong>3h 30m</strong></span>
                <span className="text-primary font-semibold">Curvy Score: 94/100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
