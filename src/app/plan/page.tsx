import { Suspense } from 'react';
import RoutePlanner from '@/components/planner/RoutePlanner';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Planificador de Curvas Kurviger — ${siteConfig.branding.appName}`,
  description: 'Traza rutas con curvas para moto, calcula altimetría, evita autopistas y exporta archivos GPX compatibles con Garmin y Waffle App.',
};

export default function PlanPage({
  searchParams,
}: {
  searchParams: { routeId?: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-slate-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Iniciando planificador de curvas...</span>
          </div>
        </div>
      }
    >
      <RoutePlanner initialRouteId={searchParams.routeId} />
    </Suspense>
  );
}
