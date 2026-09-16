# Waffle App Web 🧇🏍️

> **La plataforma web y planificador de rutas de curvas para motociclistas.** Inspirada en el sistema promocional de **[RutApp](https://rutapp.org/)** y en el potente planificador de curvas de **[Kurviger](https://kurviger.com/en/plan)**.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet)](https://leafletjs.com/)
[![Whitelabel](https://img.shields.io/badge/Architecture-100%25_Whitelabel-emerald?style=flat-square)](./AGENTS.md)
[![Product Backlog](https://img.shields.io/badge/Product-Backlog_&_Roadmap-f59e0b?style=flat-square)](./BACKLOG.md)

---

## 🌟 Características Principales

### 1. Landing Promocional (Estilo RutApp)
* **Arquitectura 100% Whitelabel**: Todo el branding, textos, enlaces de descarga, redes sociales y rutas provienen de una única fuente de verdad: `src/config/site.config.ts`.
* **Diseño Biker Dark-Mode**: Interfaz optimizada para alto contraste, colores esmeralda/lima y experiencia mobile-first.
* **Catálogo de Rutas Destacadas**: Tarjetas dinámicas con dificultad, desnivel, kilometraje, tipo de superficie (asfalto, mixto, off-road) y botón de inspección directa.
* **Matriz de Valor (Por Qué Existe)**: Cuadrícula comparativa problema vs. solución para motociclistas.
* **Componentes de Conversión**: Badges oficiales de App Store / Google Play y acordeón interactivo de FAQs.

### 2. Planificador de Rutas de Curvas Kurviger-Style (`/plan`)
* **Mapa Interactivo Full-Screen**: Diseñado con Leaflet y soporte para añadir puntos de inicio, paradas intermedias (*Via points*) y destino con un solo click.
* **Algoritmos de Enrutamiento Motociclista**:
  * 🚀 **Rápido (Fastest)**: Autopistas y vías directas.
  * 🏍️ **Curvado (Curvy)**: Preferencia por curvas y carreteras secundarias.
  * 🏔️ **Super Curvas (Extra Curvy)**: Máxima sinuosidad y desnivel montañoso.
  * 🌲 **Panorámico (Scenic)**: Evita congestión urbana y prioriza paisajes naturales.
* **Motor Híbrido Procedural & API Adapters**: Funciona 100% fuera de línea o sin credenciales mediante curvas procedurales paramétricas y altimetría sintética, con soporte *plug & play* para OpenRouteService, Mapbox y GraphHopper vía variables de entorno.
* **Telemetría en Vivo & Perfil Altimétrico**: Métrica de índice de curvas (*Curvy Score %*), desnivel positivo/negativo acumulado, distancia, tiempo estimado y gráfico SVG de elevación interactivo.
* **Exportación & Importación GPX**: Descarga de tracks RFC-compliant compatibles con Garmin, BMW Navigator, OsmAnd y Waffle App, además de carga drag-and-drop de archivos GPX externos y enlace directo a Google Maps.

---

## 📋 Product Backlog & Roadmap

El ciclo de desarrollo y las futuras versiones de Waffle App Web se encuentran documentadas en detalle en el backlog del proyecto:

👉 **[Consultar el Product Backlog Oficial (BACKLOG.md)](./BACKLOG.md)**

### Resumen del Roadmap:
* **v1.1 (Next Release)**:
  * 🔗 Compartir rutas por enlace único y QR ([EP2-01](./BACKLOG.md#ep2-01-compartir-rutas-por-enlace-único--deep-linking)).
  * 📱 Viewport móvil `100dvh` y controles táctiles de 48px para guantes ([EP3-01](./BACKLOG.md#ep3-01-optimización-de-viewport-móvil-100dvh-y-gestos-táctiles)).
  * 🛑 Motor de evitaciones de peajes y ripio ([EP1-02](./BACKLOG.md#ep1-02-motor-de-evitaciones-avoidances-engine)).
  * ⚡ Parser GPX en Web Worker & Fallback resiliente de APIs ([EP5-02](./BACKLOG.md#ep5-02-procesamiento-de-gpx-en-web-worker)).
* **v1.2 (Community & Pro Planner)**:
  * 🔄 Generador automático de rutas circulares / Loops ([EP1-01](./BACKLOG.md#ep1-01-generador-de-rutas-circulares-round-trip-generator)).
  * ⛽ Capas de POIs moto-friendly: bencineras, miradores y paradas moteras ([EP1-03](./BACKLOG.md#ep1-03-capas-de-puntos-de-interés-moto-friendly-pois)).
  * 🌐 Catálogo comunitario con filtros por tipo de moto ([EP2-02](./BACKLOG.md#ep2-02-catálogo-comunitario-de-rutas-con-filtros-dinámicos)).
  * 🌍 Internacionalización (i18n: ES / EN / PT) ([EP4-01](./BACKLOG.md#ep4-01-internacionalización-i18n-español--inglés--portugués)).
* **v2.0 (Ecosystem & Connected App)**:
  * 📶 PWA & modo offline en ruta para zonas sin cobertura ([EP3-02](./BACKLOG.md#ep3-02-progressive-web-app-pwa--caché-offline-de-tracks)).
  * ☁️ Cuentas de usuario y sincronización bidireccional móvil-web ([EP2-03](./BACKLOG.md#ep2-03-autenticación-liviana-y-sincronización-en-la-nube)).
  * 📍 Navegación GPS en vivo con seguimiento y Screen Wake Lock ([EP3-03](./BACKLOG.md#ep3-03-modo-conducción--posición-gps-en-vivo-follow-me)).

---

## 🏗️ Estructura del Proyecto

```
├── .github/
│   ├── ISSUE_TEMPLATE/     # Plantillas para bugs y feature requests
│   └── workflows/ci.yml    # Pipeline CI automático en GitHub Actions
├── .agents/skills/         # Antigravity agent skills para mantenimiento
├── AGENTS.md               # Directrices arquitectónicas de parametrización
├── BACKLOG.md              # Product Backlog oficial y roadmap
├── src/
│   ├── app/                # Rutas Next.js App Router (/, /plan)
│   ├── components/
│   │   ├── landing/        # Componentes promocionales estilo RutApp
│   │   ├── planner/        # Componentes del planificador estilo Kurviger
│   │   ├── common/         # Navbar, Footer y layout compartido
│   │   └── ui/             # Botones, drawers y elementos base
│   ├── config/
│   │   └── site.config.ts  # MAESTRO DE CONFIGURACIÓN (100% Whitelabel)
│   ├── lib/
│   │   ├── routing/        # Motor procedural de curvas y adaptadores API
│   │   └── gpx/            # Generador y parser GPX RFC-compliant
│   └── types/              # Interfaces TypeScript compartidas
└── tests/
    └── test-app.mjs        # Suite de pruebas automatizadas
```

---

## 🚀 Inicio Rápido (Local Setup)

### Requisitos Previos:
* **Node.js**: v18.17+ o LTS v20+
* **npm**: v9+

### Instalación y Ejecución:
```bash
# 1. Clonar el repositorio
git clone https://github.com/cderamond/wafleappweb.git
cd wafleappweb

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la landing page o [http://localhost:3000/plan](http://localhost:3000/plan) para el planificador de rutas.

### Configuración Opcional de Proveedores de Ruteo:
Copia el archivo de ejemplo para usar una clave de API externa:
```bash
cp .env.example .env.local
```
Configura tu proveedor preferido:
```env
NEXT_PUBLIC_ROUTING_PROVIDER=openrouteservice # Opciones: 'openrouteservice' | 'graphhopper' | 'mapbox'
NEXT_PUBLIC_ROUTING_API_KEY=tu_api_key_aqui
```
*(Si no configuras ninguna API key, el motor procedural calculará automáticamente las trayectorias de curvas).*

---

## 🧪 Pruebas & Verificación

```bash
# Validar tipos de TypeScript
npx tsc --noEmit

# Ejecutar pruebas automatizadas unitarias
node tests/test-app.mjs

# Compilar para producción
npm run build
```

---

## 🤝 Cómo Contribuir

1. Revisa el [Product Backlog (BACKLOG.md)](./BACKLOG.md) para conocer las prioridades actuales.
2. Abre un [Issue](../../issues) utilizando nuestras plantillas de propuestas o reporte de bugs.
3. Asegúrate de que cualquier cambio respete las directrices de [`AGENTS.md`](./AGENTS.md).
4. Envía un Pull Request hacia la rama `main`.