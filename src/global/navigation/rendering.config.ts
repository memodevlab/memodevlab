/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/navigation/rendering.config.ts
 * @description Configuración de estrategia de rendering por ruta (SSR, SSG, ISR, CSR)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Define qué estrategia de rendering usa cada ruta del sistema:
 * - SSR: Renderiza en el servidor en cada request (default)
 * - SSG: Pre-genera HTML en build time, se sirve estático desde CDN
 * - ISR: Como SSG pero se regenera en background cada N segundos
 * - CSR: No hace SSR, envía HTML vacío y React renderiza en el browser
 *
 * Las rutas no definidas aquí usan SSR por defecto.
 */

/**
 * @type RenderStrategy
 * @description Estrategias de rendering disponibles
 */
export type RenderStrategy = "ssr" | "ssg" | "isr" | "csr";

/**
 * @interface RouteRenderConfig
 * @description Configuración de rendering para una ruta
 */
export interface RouteRenderConfig {
  /** @property {string} path - Patrón de ruta (exacta o con wildcard *) */
  path: string;
  /** @property {RenderStrategy} strategy - Estrategia de rendering */
  strategy: RenderStrategy;
  /** @property {number} [revalidate] - Segundos para ISR (solo aplica si strategy = "isr") */
  revalidate?: number;
}

/**
 * @constant routeRenderConfig
 * @description Mapa de rutas con su estrategia de rendering
 */
export const routeRenderConfig: RouteRenderConfig[] = [
  /** Páginas públicas — SSG (pre-generadas, ultrarrápidas, SEO perfecto) */
  { path: "/", strategy: "ssg" },
  { path: "/legal", strategy: "ssg" },
  { path: "/legal/terms", strategy: "ssg" },
  { path: "/legal/privacy", strategy: "ssg" },
  { path: "/legal/cookies", strategy: "ssg" },
  { path: "/legal/refund", strategy: "ssg" },
  { path: "/contact", strategy: "ssg" }
];

/**
 * @constant ssgRoutes
 * @description Rutas que deben pre-generarse en build time (SSG)
 */
export const ssgRoutes = routeRenderConfig.filter((r) => r.strategy === "ssg").map((r) => r.path);

/**
 * @function getRouteStrategy
 * @description Determina la estrategia de rendering para una URL
 * @param {string} url - URL del request
 * @returns {RouteRenderConfig} Configuración de rendering (default: SSR)
 */
export function getRouteStrategy(url: string): RouteRenderConfig {
  /** Buscar match exacto o con wildcard */
  const match = routeRenderConfig.find((route) => {
    if (route.path.endsWith("/*")) {
      return url.startsWith(route.path.slice(0, -2));
    }
    return url === route.path || url === route.path + "/";
  });

  /** Default: SSR */
  return match || { path: url, strategy: "ssr" };
}
