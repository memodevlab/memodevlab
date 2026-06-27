/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/services/loadAppBusiness.ts
 * @description Inicialización de datos del sitio (carga directa, sin base de datos)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * El sitio carga directo desde el código: el contenido del landing vive en i18n y el
 * SEO en site.config.ts. Ya NO se consulta la tabla apps_business. Esta función se
 * conserva (la invocan entry-client/entry-server) y solo marca el estado como cargado.
 */

/** @import Store */
import { useAppBusiness } from "@store/appBusiness";

/**
 * @function loadAppBusiness
 * @description Marca la app como cargada. El contenido es estático (i18n + site.config).
 */
export async function loadAppBusiness(): Promise<void> {
  const state = useAppBusiness.getState();
  if (state.loaded) return;
  state.setLoaded();
}
