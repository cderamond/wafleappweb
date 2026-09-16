import React from 'react';
import { siteConfig } from '@/config/site.config';
import { CheckCircle2, Navigation2, Smartphone } from 'lucide-react';

export default function AppDefinition() {
  return (
    <section id="que-es" className="py-16 md:py-24 border-y border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Definition Header Box */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
            Qué es {siteConfig.branding.appName}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {siteConfig.branding.appName} es donde decides a dónde ir, cuándo y con quién rodar.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            {siteConfig.definition.lead}
          </p>
          <p className="text-slate-400 text-sm italic">
            {siteConfig.definition.subLead}
          </p>
        </div>

        {/* 2-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {siteConfig.definition.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-200">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Quick highlight banner */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-surface to-surface-light border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <Navigation2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                ¿Quieres trazar tu propia ruta ahora mismo?
              </h4>
              <p className="text-slate-400 text-xs">
                Prueba nuestro planificador interactivo de curvas y descarga tu GPX sin costo.
              </p>
            </div>
          </div>

          <a
            href="/plan"
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary-light transition-all shadow-md"
          >
            Abrir Planificador Web &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
