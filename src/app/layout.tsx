import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site.config';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: `${siteConfig.branding.appName} — ${siteConfig.branding.tagline}`,
  description: siteConfig.branding.leadDescription,
  keywords: ['rutas en moto', 'curvas moto', 'kurviger', 'calimoto', 'moto rutas chile', 'gpx rutas'],
  openGraph: {
    title: `${siteConfig.branding.appName} — ${siteConfig.branding.tagline}`,
    description: siteConfig.branding.leadDescription,
    siteName: siteConfig.branding.appName,
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-slate-100 antialiased selection:bg-primary selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
