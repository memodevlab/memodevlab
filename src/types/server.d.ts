/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/types/server.d.ts
 * @description Declaraciones de tipos para módulos del servidor generados en build time
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Declara los tipos de módulos que solo existen después del build (dist/).
 * Permite que TypeScript conozca la firma del módulo sin necesitar el archivo físico.
 * El shape de RenderResult se referencia con import inline para mantener este
 * archivo como ambient (.d.ts sin imports a nivel de módulo) y que el wildcard
 * en `declare module "*..."` siga funcionando.
 */

/** Módulo compilado del entry-server generado por vite build --ssr */
declare module "*/dist/server/entry-server.js" {
  export function render(url: string): Promise<import("../entry-server.types").RenderResult>;
}
