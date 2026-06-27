/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/seoRoutes.ts
 * @description Rutas de SEO: sitemap.xml y robots.txt
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Registra las rutas /sitemap.xml y /robots.txt en la instancia de Fastify.
 * Genera contenido dinámico basado en las rutas SSG configuradas.
 */

import type { FastifyInstance } from "fastify";
import { SITE_URL, CACHE_SITEMAP_SECONDS, CACHE_ROBOTS_SECONDS } from "./constants";
import { ssgRoutes } from "../../src/global/navigation/rendering.config";

/**
 * @function registerSeoRoutes
 * @description Registra las rutas de sitemap.xml y robots.txt
 * @param {FastifyInstance} app - Instancia de Fastify
 */
export function registerSeoRoutes(app: FastifyInstance): void {
  /** GET /sitemap.xml — Genera sitemap XML dinámico */
  app.get("/sitemap.xml", async (_request, reply) => {
    const urls = ssgRoutes.map(
      (route) =>
        `  <url>\n    <loc>${SITE_URL}${route === "/" ? "" : route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
    );
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
    reply.type("application/xml").header("Cache-Control", `public, max-age=${CACHE_SITEMAP_SECONDS}`).send(xml);
  });

  /** GET /robots.txt — Genera robots.txt con reglas de crawling */
  app.get("/robots.txt", async (_request, reply) => {
    const robots = [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`
    ].join("\n");
    reply.type("text/plain").header("Cache-Control", `public, max-age=${CACHE_ROBOTS_SECONDS}`).send(robots);
  });
}
