import React from 'react';
import { siteConfig } from '@/config/site.config';
import { Download, Navigation, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DownloadCta() {
  return (
    <section id="descargar" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-surface-light via-[#0b281b] to-surface border border-primary/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-emerald-950/80 text-center space-y-6">
        
        {/* Ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/40 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Comunidad 100% Gratuita</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
          ¿Listo para disfrutar las mejores curvas de la ruta?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Descarga {siteConfig.branding.appName} en tu smartphone o comienza a trazar y exportar tus recorridos directamente en el planificador web.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.appStoreLinks.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all shadow-lg hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Descargar en Google Play
          </a>

          <a
            href={siteConfig.appStoreLinks.iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-surface border border-white/20 text-white font-bold text-sm hover:border-primary transition-all hover:bg-surface-light hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Descargar en App Store
          </a>

          <Link
            href="/plan"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary text-black font-extrabold text-sm hover:bg-primary-light transition-all shadow-lg shadow-primary/30 hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            Abrir Planificador Web (Kurviger)
          </Link>
        </div>

        <p className="text-xs text-slate-400 pt-2">
          Sin suscripción mensual obligatoria • Sin spam • Diseñado para la comunidad
        </p>

      </div>
    </section>
  );
}
