import React from 'react';
import { siteConfig } from '@/config/site.config';
import { MapPin, Bell, ShieldAlert, Users } from 'lucide-react';

const iconMap = {
  MapPin: MapPin,
  Navigation: MapPin,
  ShieldAlert: ShieldAlert,
  Users: Users,
};

export default function FeatureCards() {
  return (
    <section id="funciones" className="py-20 border-t border-border bg-[#07170f]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block">
            Experiencia Biker Completa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Todo lo necesario para rodar seguro y en grupo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Diseñado sin distracciones. Información técnica clara, mapas precisos y comunicación directa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.featureCards.map((card, idx) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap] || MapPin;

            return (
              <div
                key={idx}
                className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary/40 transition-all hover:bg-surface-light group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-black flex items-center justify-center transition-all mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
