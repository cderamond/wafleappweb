'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { Compass, Download, Menu, X, Navigation } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white block">
              {siteConfig.branding.appName}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-primary block -mt-1">
              Rutas & Curvas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.navigation.map((item) => {
            if (item.isDownload) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-black hover:bg-primary-light transition-all shadow-md shadow-primary/20 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            }

            if (item.highlight) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-light border border-primary/40 text-primary hover:bg-primary/20 transition-all ml-1 mr-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.isDownload
                  ? 'bg-primary text-black font-bold text-center flex items-center justify-center gap-2'
                  : item.highlight
                  ? 'bg-surface-light border border-primary/40 text-primary'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.isDownload && <Download className="w-4 h-4" />}
              {item.highlight && <Navigation className="w-4 h-4 inline mr-1" />}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
