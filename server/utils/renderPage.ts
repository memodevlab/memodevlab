/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/renderPage.ts
 * @description Renderizado SSR completo (React → HTML string)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Renderiza una página con SSR completo: carga entry-server,
 * ejecuta renderToString de React, e inyecta el HTML y los meta tags
 * SEO en el template index.html.
 */

import fs from "node:fs";
import path from "node:path";
import type { ViteDevServer } from "vite";
import { ROOT_DIR, isProduction } from "./constants";
import type { RenderResult } from "../../src/entry-server.types";

/** @type ProdRender - Función de render del bundle de producción de entry-server */
export type ProdRender = (url: string) => RenderResult | Promise<RenderResult>;

/** @type ServerState - Estado compartido del servidor (vite, prodTemplate, prodRender) */
export interface ServerState {
  vite?: ViteDevServer;
  prodTemplate?: string;
  prodRender?: ProdRender;
}

/**
 * @function renderPage
 * @description Renderiza una página con SSR completo
 * @param {string} url - URL de la ruta a renderizar
 * @param {ServerState} state - Estado del servidor
 * @returns {Promise<string>} HTML completo con app renderizada y meta tags SEO
 */
export async function renderPage(url: string, state: ServerState): Promise<string> {
  if (isProduction && state.prodRender && state.prodTemplate) {
    const { html, title, head } = await state.prodRender(url);
    return state.prodTemplate
      .replace("<title>MemoDevLab</title>", `<title>${title}</title>`)
      .replace("<!--ssr-head-->", head)
      .replace("<!--ssr-outlet-->", html);
  }

  const rawTemplate = fs.readFileSync(path.resolve(ROOT_DIR, "index.html"), "utf-8");
  const template = await state.vite!.transformIndexHtml(url, rawTemplate);
  const { render } = await state.vite!.ssrLoadModule("/src/entry-server.tsx");
  const { html, title, head } = await render(url);

  return template
    .replace("<title>MemoDevLab</title>", `<title>${title}</title>`)
    .replace("<!--ssr-head-->", head)
    .replace("<!--ssr-outlet-->", html);
}

/**
 * @function renderEmptyShell
 * @description Retorna el template HTML vacío para CSR (sin rendering React)
 * @param {string} url - URL para transformaciones de Vite en desarrollo
 * @param {ServerState} state - Estado del servidor
 * @returns {Promise<string>} HTML vacío con scripts para el cliente
 */
export async function renderEmptyShell(url: string, state: ServerState): Promise<string> {
  if (isProduction && state.prodTemplate) return state.prodTemplate;

  const rawTemplate = fs.readFileSync(path.resolve(ROOT_DIR, "index.html"), "utf-8");
  return await state.vite!.transformIndexHtml(url, rawTemplate);
}
