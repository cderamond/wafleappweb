'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { RouteItem } from '@/types';
import { MapPin, Navigation, Clock, Mountain, ArrowUpRight } from 'lucide-react';

export default function LiveRoutes() {
  const [filterTerrain, setFilterTerrain] = useState<string>('todos');

  const filteredRoutes =
    filterTerrain === 'todos'
      ? siteConfig.sampleRoutes
      : siteConfig.sampleRoutes.filter((r) => r.terrain === filterTerrain);

  return (
    <section id="rutas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
            Catálogo Comunitario
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Salidas y rutas que están <span className="text-primary">pasando ahora</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Cada ruta fue creada y validada por moteros reales. Elige una para ver su trazado, curva a curva, o cargarla en el planificador.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 bg-surface rounded-xl border border-border">
          {['todos', 'asfalto', 'mixto'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterTerrain(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterTerrain === filter
                  ? 'bg-primary text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRoutes.map((route: RouteItem) => (
          <div
            key={route.id}
            className="rounded-3xl bg-surface border border-border p-5 flex flex-col justify-between hover:border-primary/40 transition-all hover:-translate-y-1 group"
          >
            <div>
              {/* Badges row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    route.terrain === 'asfalto'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : route.terrain === 'mixto'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  }`}
                >
                  {route.terrain}
                </span>

                <span className="text-[10px] text-slate-400 font-medium">
                  {route.region}
                </span>
              </div>

              {/* Title & description */}
              <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug mb-1">
                {route.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {route.subtitle}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center mb-4">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Distancia</span>
                  <span className="font-bold text-xs text-slate-200">{route.distanceKm} km</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Tiempo</span>
                  <span className="font-bold text-xs text-slate-200">{route.durationHours}h</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Desnivel</span>
                  <span className="font-bold text-xs text-primary">+{route.elevationGainM}m</span>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="flex items-start gap-2 text-xs text-slate-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span className="truncate">{route.meetingPoint}</span>
              </div>
            </div>

            {/* Action CTA */}
            <Link
              href={`/plan?routeId=${route.id}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-surface-light hover:bg-primary hover:text-black text-white text-xs font-bold transition-all border border-border"
            >
              <span>Ver en Planificador</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Explore More Banner */}
      <div className="mt-12 text-center">
        <Link
          href="/plan"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-light border border-border-light text-slate-200 text-sm font-bold hover:border-primary/50 transition-all hover:bg-surface"
        >
          <Navigation className="w-4 h-4 text-primary" />
          <span>Diseñar mi propia ruta personalizada</span>
        </Link>
      </div>
    </section>
  );
}
