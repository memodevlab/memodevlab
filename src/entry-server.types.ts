/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/entry-server.types.ts
 * @description Tipos compartidos entre entry-server.tsx y el servidor Fastify
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Aísla los tipos del módulo de render (entry-server.tsx) en un archivo .ts
 * sin JSX para que el código del servidor Node (tsconfig.node.json, sin "jsx")
 * pueda importarlos sin requerir configuración de React.
 */

/**
 * @interface RenderResult
 * @description Resultado del renderizado SSR
 */
export interface RenderResult {
  /** @property {string} html - HTML renderizado de la aplicación */
  html: string;
  /** @property {string} title - Título dinámico de la página */
  title: string;
  /** @property {string} head - Meta tags SEO dinámicos (description, og:*, twitter:*) */
  head: string;
}
