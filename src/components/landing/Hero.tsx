import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { Navigation, ArrowRight, ShieldCheck, Map, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface-light/80 border border-primary/30 text-primary shadow-sm backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{siteConfig.branding.targetAudience}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Descubre dónde ir.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary-light">
                Y con quién rodar.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {siteConfig.branding.leadDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary text-black font-extrabold text-sm hover:bg-primary-light transition-all shadow-lg shadow-primary/25 hover:scale-105"
              >
                <Navigation className="w-4 h-4" />
                Planificador de Curvas Web
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={siteConfig.appStoreLinks.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-surface-light border border-border-light text-white text-sm font-semibold hover:border-primary/50 transition-all hover:bg-surface"
              >
                <svg className="w-4 h-4 fill-current text-primary" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.35 0 .68.12.95.33l14.2 9.5c.67.45.85 1.35.4 2.02-.12.18-.28.32-.46.42L5.45 23.17c-.27.21-.6.33-.95.33-.83 0-1.5-.67-1.5-1.5z"/>
                </svg>
                Google Play
              </a>

              <a
                href={siteConfig.appStoreLinks.iosAppStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-surface-light border border-border-light text-white text-sm font-semibold hover:border-primary/50 transition-all hover:bg-surface"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.67-.82 1.13-1.96 1-3.1-.97.04-2.17.65-2.87 1.47-.61.71-1.14 1.87-.99 2.98 1.08.08 2.2-.53 2.86-1.35z"/>
                </svg>
                App Store
              </a>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Gratuita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Map className="w-4 h-4 text-primary" />
                <span>Rutas en {siteConfig.branding.country}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative phone container */}
              <div className="relative mx-auto rounded-[40px] border-[6px] border-surface-light bg-black p-4 shadow-2xl shadow-emerald-950/80 ring-1 ring-white/10">
                
                {/* Phone Speaker Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-surface-light rounded-full" />

                {/* Mock Phone Screen Content */}
                <div className="mt-3 rounded-[30px] overflow-hidden bg-background border border-white/5 p-4 space-y-4">
                  {/* Top Status */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
                    <span>9:41</span>
                    <span className="text-primary">{siteConfig.branding.appName}</span>
                    <span className="flex items-center gap-1">5G 100%</span>
                  </div>

                  {/* Active Route Header in Mockup */}
                  <div className="p-3.5 rounded-2xl bg-surface border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        Salida de Sábado
                      </span>
                      <span className="text-xs text-slate-400">09:00 hrs</span>
                    </div>
                    <p className="font-bold text-sm text-white">
                      Curvas de Farellones & Mirador
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-white/5">
                      <div>
                        <span className="block text-[10px] text-slate-400">Distancia</span>
                        <span className="font-bold text-xs text-white">92 km</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">Curvas</span>
                        <span className="font-bold text-xs text-primary">Intensas</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">Pilotos</span>
                        <span className="font-bold text-xs text-white">14 van</span>
                      </div>
                    </div>
                  </div>

                  {/* Curvy Route Map Mini Visualizer */}
                  <div className="relative h-44 rounded-2xl bg-[#091a13] border border-primary/20 overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full p-3" viewBox="0 0 200 120" fill="none">
                      <path
                        d="M 20 100 C 50 100, 40 40, 80 50 C 120 60, 110 20, 150 25 C 170 28, 180 60, 185 70"
                        stroke="#22c55e"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <circle cx="20" cy="100" r="5" fill="#22c55e" />
                      <circle cx="185" cy="70" r="5" fill="#ef4444" />
                      <text x="28" y="103" fill="#cbd5e1" fontSize="8" fontWeight="bold">Partida</text>
                      <text x="145" y="85" fill="#ef4444" fontSize="8" fontWeight="bold">Mirador</text>
                    </svg>

                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-black/60 backdrop-blur px-2.5 py-1.5 rounded-lg text-[10px]">
                      <span className="text-slate-300">Modo Sinuoso Kurviger</span>
                      <span className="text-primary font-bold">95% Curvas</span>
                    </div>
                  </div>

                  {/* Bottom Action in Mockup */}
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">¿Te unes a la ruta?</span>
                    <span className="px-3 py-1 rounded-lg bg-primary text-black font-bold text-xs">
                      Unirme
                    </span>
                  </div>
                </div>

                {/* Home Indicator Bar */}
                <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-3" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
