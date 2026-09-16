import Hero from '@/components/landing/Hero';
import AppDefinition from '@/components/landing/AppDefinition';
import LiveRoutes from '@/components/landing/LiveRoutes';
import RouteSplitDetail from '@/components/landing/RouteSplitDetail';
import WhyUs from '@/components/landing/WhyUs';
import FeatureCards from '@/components/landing/FeatureCards';
import FaqAccordion from '@/components/landing/FaqAccordion';
import DownloadCta from '@/components/landing/DownloadCta';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <AppDefinition />
      <LiveRoutes />
      <RouteSplitDetail />
      <WhyUs />
      <FeatureCards />
      <FaqAccordion />
      <DownloadCta />
    </div>
  );
}
