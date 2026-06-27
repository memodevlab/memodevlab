/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/handlers.ts
 * @description Handlers de estrategias de rendering (CSR, SSG, ISR, SSR)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Cada función implementa una estrategia de rendering diferente:
 * - CSR: template vacío + meta tags SEO, React renderiza en el browser
 * - SSG: archivo pre-generado en producción, SSR fallback en desarrollo
 * - ISR: cache en memoria con TTL, regenera en background al expirar
 * - SSR: renderiza en cada request
 */

import fs from "node:fs";
import path from "node:path";
import type { FastifyReply, FastifyInstance } from "fastify";
import {
  ROOT_DIR,
  isProduction,
  CACHE_SSG_MAX_SECONDS,
  CACHE_SSG_STALE_SECONDS,
  CACHE_SSG_FALLBACK_SECONDS
} from "./constants";
import { formatHtml } from "./formatHtml";
import { sendHtml } from "./sendHtml";
import { renderPage, renderEmptyShell } from "./renderPage";
import type { ServerState } from "./renderPage";

/** @constant isrCache - Cache en memoria para ISR { url: { html, timestamp } } */
const isrCache = new Map<string, { html: string; timestamp: number }>();

/**
 * @function handleCsr
 * @description Estrategia CSR: template vacío con meta tags SEO inyectados
 * @param {string} url - URL de la ruta
 * @param {FastifyReply} reply - Respuesta Fastify
 * @param {ServerState} state - Estado del servidor
 */
export async function handleCsr(url: string, reply: FastifyReply, state: ServerState): Promise<void> {
  let title = "MemoDevLab";
  let head = "";

  /** Obtener title y head tags SEO aunque no se renderice React */
  if (state.vite) {
    const { render } = await state.vite.ssrLoadModule("/src/entry-server.tsx");
    const result = await render(url);
    title = result.title;
    head = result.head;
  }

  const shell = await renderEmptyShell(url, state);
  const html = shell.replace("<title>MemoDevLab</title>", `<title>${title}</title>`).replace("<!--ssr-head-->", head);
  sendHtml(reply, html, "no-store");
}

/**
 * @function handleSsg
 * @description Estrategia SSG: archivo pre-generado en producción, SSR fallback en desarrollo
 * @param {string} url - URL de la ruta
 * @param {FastifyReply} reply - Respuesta Fastify
 * @param {ServerState} state - Estado del servidor
 * @returns {Promise<string>} Label del log (static o ssr-fallback)
 */
export async function handleSsg(url: string, reply: FastifyReply, state: ServerState): Promise<string> {
  if (isProduction) {
    /** Ruta relativa a la raíz de fastifyStatic (dist/client), sin query ni barras sobrantes */
    const cleanUrl = url.split("?")[0];
    const relPath =
      cleanUrl === "/" ? "index.html" : `${cleanUrl.replace(/^\/+/, "").replace(/\/+$/, "")}/index.html`;
    const staticPath = path.resolve(ROOT_DIR, "dist/client", relPath);

    if (fs.existsSync(staticPath)) {
      /**
       * Servir vía @fastify/static (reply.sendFile), IGUAL que el home. Enviar el string
       * con reply.send() hacía que @fastify/compress corrompiera la respuesta gzip (body
       * vacío / "premature close"); sendFile hace streaming + compresión correctos.
       */
      reply.header(
        "Cache-Control",
        `public, max-age=${CACHE_SSG_MAX_SECONDS}, stale-while-revalidate=${CACHE_SSG_STALE_SECONDS}`
      );
      await reply.sendFile(relPath);
      return "static";
    }
  }

  sendHtml(reply, await renderPage(url, state), `public, max-age=${CACHE_SSG_FALLBACK_SECONDS}`);
  return "ssr-fallback";
}

/**
 * @function handleIsr
 * @description Estrategia ISR: cache con TTL, regenera en background al expirar
 * @param {string} url - URL de la ruta
 * @param {FastifyReply} reply - Respuesta Fastify
 * @param {number} revalidateSeconds - TTL del cache en segundos
 * @param {ServerState} state - Estado del servidor
 * @param {FastifyInstance} app - Instancia de Fastify (para logs)
 * @returns {Promise<string>} Label del log (cache, stale o miss)
 */
export async function handleIsr(
  url: string,
  reply: FastifyReply,
  revalidateSeconds: number,
  state: ServerState,
  app: FastifyInstance
): Promise<string> {
  const revalidateMs = revalidateSeconds * 1000;
  const cached = isrCache.get(url);

  if (cached) {
    const age = Date.now() - cached.timestamp;
    const isStale = age >= revalidateMs;

    reply
      .header("Cache-Control", `public, max-age=${revalidateSeconds}, stale-while-revalidate=60`)
      .header("X-Cache", isStale ? "STALE" : "HIT")
      .type("text/html")
      .send(isProduction ? cached.html : formatHtml(cached.html));

    if (isStale) {
      renderPage(url, state)
        .then((newHtml) => {
          isrCache.set(url, { html: newHtml, timestamp: Date.now() });
          app.log.info(`🔄 ISR ${url} revalidated`);
        })
        .catch((err) => app.log.error(`🔄 ISR revalidation failed: ${err}`));
      return "stale, revalidating";
    }

    return "cache";
  }

  const html = await renderPage(url, state);
  isrCache.set(url, { html, timestamp: Date.now() });

  reply
    .header("Cache-Control", `public, max-age=${revalidateSeconds}, stale-while-revalidate=60`)
    .header("X-Cache", "MISS")
    .type("text/html")
    .send(html);
  return "miss";
}

/**
 * @function handleSsr
 * @description Estrategia SSR: renderiza en cada request
 * @param {string} url - URL de la ruta
 * @param {FastifyReply} reply - Respuesta Fastify
 * @param {ServerState} state - Estado del servidor
 */
export async function handleSsr(url: string, reply: FastifyReply, state: ServerState): Promise<void> {
  sendHtml(reply, await renderPage(url, state), "no-store");
}
