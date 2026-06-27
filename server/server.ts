/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/server.ts
 * @description Servidor HTTP Fastify con rendering híbrido (SSR/SSG/ISR/CSR)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Punto de entrada del servidor. Configura Fastify con plugins de seguridad
 * (Helmet, CORS, Rate Limit, Compress), registra rutas SEO (sitemap, robots)
 * y delega el rendering a handlers especializados por estrategia.
 * La lógica de cada función está en server/utils/ para facilitar el mantenimiento.
 */

/** @import Carga de variables de entorno (.env) */
import "dotenv/config";

/** @import Node.js */
import fs from "node:fs";
import path from "node:path";

/** @import Fastify y plugins */
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyMiddie from "@fastify/middie";
import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyCors from "@fastify/cors";

/** @import Vite (solo en desarrollo) */
import type { ViteDevServer } from "vite";

/** @import Configuración de rendering */
import { getRouteStrategy } from "../src/global/navigation/rendering.config";

/** @import Constantes del servidor */
import {
  ROOT_DIR,
  isProduction,
  PORT,
  HOST,
  SITE_URL,
  STATIC_EXTENSIONS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW,
  FONTS_CSS_URL,
  FONTS_FILES_URL,
  SUPABASE_HTTP_ORIGIN,
  SUPABASE_WS_ORIGIN
} from "./utils/constants";

/** @import Handlers de estrategias de rendering */
import { handleCsr, handleSsg, handleIsr, handleSsr } from "./utils/handlers";

/** @import Rutas SEO (sitemap.xml, robots.txt) */
import { registerSeoRoutes } from "./utils/seoRoutes";

/** @import Tipos */
import type { ServerState, ProdRender } from "./utils/renderPage";

/** Instancia de Fastify con logs limpios (sin ruido de assets ni premature close) */
const app = Fastify({
  logger: {
    level: "info",
    transport: isProduction
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname,reqId,req,res,responseTime"
          }
        }
  },
  disableRequestLogging: true
});

/** Silenciar errores de "premature close" (browser reload, HMR) */
app.setErrorHandler((error: Error, _request, reply) => {
  if (error.message === "premature close") return;
  app.log.error(error);
  const statusCode = "statusCode" in error ? (error as { statusCode: number }).statusCode : 500;
  reply.code(statusCode).send({ error: error.message });
});

/** Compresión Brotli/Gzip (solo producción) */
if (isProduction) {
  await app.register(fastifyCompress, { global: true });
}

/** Headers de seguridad (CSP, HSTS, X-Frame-Options, X-Content-Type-Options).
 *  Hosts del allowlist provienen de variables de entorno; el origen de Supabase
 *  se deriva de VITE_SUPABASE_URL para no usar wildcard genérico en producción. */
await app.register(fastifyHelmet, {
  contentSecurityPolicy: isProduction
    ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", FONTS_CSS_URL],
          fontSrc: ["'self'", FONTS_FILES_URL],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", SUPABASE_HTTP_ORIGIN, SUPABASE_WS_ORIGIN].filter(Boolean)
        }
      }
    : false,
  crossOriginEmbedderPolicy: false
});

/** CORS — permitir orígenes configurados */
await app.register(fastifyCors, {
  origin: isProduction ? [SITE_URL] : true,
  credentials: true
});

/** Rate limiting — protección contra abuso (configurable vía RATE_LIMIT_*) */
await app.register(fastifyRateLimit, {
  max: RATE_LIMIT_MAX,
  timeWindow: RATE_LIMIT_WINDOW
});

/** Variable para el servidor de desarrollo de Vite */
let vite: ViteDevServer | undefined;

/** Template y render pre-cargados para producción */
let prodTemplate: string | undefined;
let prodRender: ProdRender | undefined;

/** Configurar Vite middleware (desarrollo) o archivos estáticos (producción) */
if (isProduction) {
  /** Producción: servir assets estáticos compilados con cache inmutable de 1 año */
  await app.register(fastifyStatic, {
    root: path.resolve(ROOT_DIR, "dist/client"),
    prefix: "/",
    wildcard: false,
    maxAge: "1y",
    immutable: true
  });

  /** Pre-cargar template HTML y función de render */
  prodTemplate = fs.readFileSync(path.resolve(ROOT_DIR, "dist/client/index.html"), "utf-8");
  const serverModule = await import("../dist/server/entry-server.js");
  prodRender = serverModule.render;
} else {
  /** Desarrollo: Vite en middleware mode con HMR */
  await app.register(fastifyMiddie);
  const { createServer: createViteServer } = await import("vite");
  vite = await createViteServer({ server: { middlewareMode: true }, appType: "custom" });
  app.use(vite.middlewares);
}

/** Estado compartido del servidor para los handlers */
const serverState: ServerState = { vite, prodTemplate, prodRender };

/** Registrar rutas SEO (sitemap.xml, robots.txt) */
registerSeoRoutes(app);

/** Handler catch-all que delega a la estrategia de rendering de cada ruta */
app.get("*", async (request, reply) => {
  const url = request.url;

  /** Ignorar requests de assets estáticos (los maneja Vite middleware o fastifyStatic) */
  if (STATIC_EXTENSIONS.test(url)) return;

  const start = Date.now();
  const routeConfig = getRouteStrategy(url);
  const { strategy } = routeConfig;

  /** Mapa de iconos por estrategia para el log */
  const icons: Record<string, string> = { csr: "⚡", ssg: "📦", isr: "🔄", ssr: "✅" };
  const icon = icons[strategy] || "✅";

  try {
    let label = "";

    switch (strategy) {
      case "csr":
        await handleCsr(url, reply, serverState);
        break;
      case "ssg":
        label = ` [${await handleSsg(url, reply, serverState)}]`;
        break;
      case "isr":
        label = ` [${await handleIsr(url, reply, routeConfig.revalidate || 60, serverState, app)}]`;
        break;
      default:
        await handleSsr(url, reply, serverState);
        break;
    }

    app.log.info(`${icon} ${strategy.toUpperCase()} ${request.method} ${url} → 200 (${Date.now() - start}ms)${label}`);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    if (vite) vite.ssrFixStacktrace(error);
    app.log.error(`❌ ${strategy.toUpperCase()} ${request.method} ${url} → 500`);
    app.log.error(error);
    reply.code(500).send("Internal Server Error");
  }
});

/** Iniciar servidor HTTP */
await app.listen({ port: PORT, host: HOST });

/** Banner de inicio */
console.log("");
console.log("  🚀 MemoDevLab Web (Vite SSR + Fastify)");
console.log(`  ➜ Local:   http://localhost:${PORT}`);
console.log(`  ➜ Mode:    ${isProduction ? "production" : "development"}`);
console.log("  ➜ Render:  SSR | SSG | ISR | CSR");
console.log("  ➜ Security: Helmet | CORS | Rate Limit | Compress");
console.log("");
