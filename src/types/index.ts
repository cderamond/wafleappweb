export type TerrainType = 'asfalto' | 'mixto' | 'offroad';
export type DifficultyLevel = 'fácil' | 'intermedio' | 'avanzado' | 'experto';
export type RoutingProfile = 'curvy' | 'extra_curvy' | 'fastest' | 'scenic';

export interface RouteItem {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  terrain: TerrainType;
  difficulty: DifficultyLevel;
  distanceKm: number;
  durationHours: number;
  elevationGainM: number;
  meetingPoint: string;
  dateStr?: string;
  waypointsCount: number;
  tags: string[];
  coordinates?: [number, number][];
}

export interface Waypoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
  type: 'start' | 'via' | 'end';
}

export interface ElevationPoint {
  distanceKm: number;
  elevationM: number;
  lat: number;
  lng: number;
}

export interface RouteResult {
  id: string;
  profile: RoutingProfile;
  distanceKm: number;
  durationMinutes: number;
  ascentM: number;
  descentM: number;
  curvyScore: number; // 0 - 100%
  coordinates: [number, number][];
  elevationProfile: ElevationPoint[];
  instructions: Array<{
    text: string;
    distanceM: number;
    type: 'depart' | 'turn_left' | 'turn_right' | 'straight' | 'arrive';
  }>;
}

export interface SiteConfig {
  branding: {
    appName: string;
    tagline: string;
    leadDescription: string;
    subLeadDescription: string;
    targetAudience: string;
    accentColor: string;
    country: string;
  };
  appStoreLinks: {
    iosAppStoreUrl: string;
    googlePlayUrl: string;
    directApkUrl?: string;
    webPlannerUrl: string;
  };
  navigation: Array<{
    label: string;
    href: string;
    highlight?: boolean;
    isDownload?: boolean;
  }>;
  definition: {
    lead: string;
    subLead: string;
    features: string[];
  };
  whyUs: Array<{
    problem: string;
    answer: string;
  }>;
  featureCards: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  sampleRoutes: RouteItem[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  routePlanner: {
    defaultCenter: [number, number];
    defaultZoom: number;
    tileLayer: {
      name: string;
      url: string;
      attribution: string;
    };
    routingProvider: 'openrouteservice' | 'graphhopper' | 'mapbox' | 'offline_procedural';
  };
  footer: {
    disclaimer: string;
    contactEmail: string;
    copyrightYear: number;
  };
}
