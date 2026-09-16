import React from 'react';
import { siteConfig } from '@/config/site.config';
import { HelpCircle, CheckCircle } from 'lucide-react';

export default function WhyUs() {
  return (
    <section id="por-que" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-primary block">
          Por Qué Existe {siteConfig.branding.appName}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tienes la moto.<br />
          <span className="text-slate-400 font-normal">Te faltaba todo lo demás.</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Casi nadie deja de salir por falta de ganas. Se deja de salir porque no sabes a dónde ir, las rutas de siempre aburren, o no tienes con quién coordinar.
        </p>
      </div>

      {/* 6-Card Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.whyUs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary/40 transition-all hover:bg-surface-light/70"
          >
            <div>
              {/* Problem */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <p className="text-sm font-semibold text-slate-200 italic">
                  {item.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
