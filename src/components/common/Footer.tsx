import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { Compass, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#050e0a] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                {siteConfig.branding.appName}
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              {siteConfig.footer.disclaimer}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Mail className="w-4 h-4 text-primary" />
              <span>{siteConfig.footer.contactEmail}</span>
            </div>
          </div>

          {/* Nav Col */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#rutas" className="hover:text-primary transition-colors">
                  Rutas Populares
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-primary hover:underline font-medium">
                  Planificador de Curvas (Kurviger)
                </Link>
              </li>
              <li>
                <Link href="/#por-que" className="hover:text-primary transition-colors">
                  Por qué {siteConfig.branding.appName}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Stores Col */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Descargar App
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.appStoreLinks.iosAppStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  iOS (App Store)
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.appStoreLinks.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Android (Google Play)
                </a>
              </li>
              <li>
                <Link href="/plan" className="hover:text-primary transition-colors">
                  Versión Web (Sin instalación)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {siteConfig.footer.copyrightYear} {siteConfig.branding.appName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span>Hecho para apasionados de las dos ruedas con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
