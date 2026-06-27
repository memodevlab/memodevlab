/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/constants.ts
 * @description Constantes de configuración del servidor
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Centraliza las constantes de entorno y configuración usadas
 * por el servidor Fastify y las funciones de rendering. Toda la
 * configuración tunable proviene de variables de entorno (.env);
 * los valores por defecto sirven solo como fallback de desarrollo.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

/** @constant __dirname - Directorio del archivo server.ts */
export const SERVER_DIR = path.dirname(fileURLToPath(import.meta.url));

/** @constant ROOT_DIR - Raíz del proyecto (dos niveles arriba de server/utils/) */
export const ROOT_DIR = path.resolve(SERVER_DIR, "../..");

/** @constant isProduction - Flag de entorno de producción */
export const isProduction = process.env.NODE_ENV === "production";

/** @constant PORT - Puerto del servidor HTTP */
export const PORT = Number.parseInt(process.env.PORT || "3000", 10);

/** @constant HOST - Interfaz de red a la que se enlaza el servidor */
export const HOST = process.env.HOST || "0.0.0.0";

/** @constant SITE_URL - URL base del sitio para SEO y sitemap */
export const SITE_URL = process.env.SITE_URL || "https://memodevlab.com";

/** @constant STATIC_EXTENSIONS - Extensiones de archivos estáticos que no pasan por rendering */
export const STATIC_EXTENSIONS = /\.(js|css|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map|json|webp|avif)$/;

/** @constant RATE_LIMIT_MAX - Máximo de requests permitidos por ventana */
export const RATE_LIMIT_MAX = Number.parseInt(process.env.RATE_LIMIT_MAX || "100", 10);

/** @constant RATE_LIMIT_WINDOW - Tamaño de la ventana de rate limit (string parseable) */
export const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW || "1 minute";

/** @constant FONTS_CSS_URL - Origen del stylesheet de fuentes (allowlist CSP styleSrc) */
export const FONTS_CSS_URL = process.env.FONTS_CSS_URL || "https://fonts.googleapis.com";

/** @constant FONTS_FILES_URL - Origen de los archivos de fuentes (allowlist CSP fontSrc) */
export const FONTS_FILES_URL = process.env.FONTS_FILES_URL || "https://fonts.gstatic.com";

/** @constant SUPABASE_HTTP_ORIGIN - Origen HTTPS de Supabase (allowlist CSP connectSrc).
 *  Derivado del proyecto en VITE_SUPABASE_URL para evitar wildcard genérico. */
export const SUPABASE_HTTP_ORIGIN = process.env.VITE_SUPABASE_URL || "";

/** @constant SUPABASE_WS_ORIGIN - Origen WSS de Supabase Realtime (allowlist CSP connectSrc).
 *  Mismo host que el HTTP, con esquema wss:// */
export const SUPABASE_WS_ORIGIN = SUPABASE_HTTP_ORIGIN.replace(/^https:/i, "wss:");

/** @constant CACHE_SITEMAP_SECONDS - TTL de Cache-Control para /sitemap.xml */
export const CACHE_SITEMAP_SECONDS = Number.parseInt(process.env.CACHE_SITEMAP_SECONDS || "3600", 10);

/** @constant CACHE_ROBOTS_SECONDS - TTL de Cache-Control para /robots.txt */
export const CACHE_ROBOTS_SECONDS = Number.parseInt(process.env.CACHE_ROBOTS_SECONDS || "86400", 10);

/** @constant CACHE_SSG_MAX_SECONDS - max-age de Cache-Control para SSG estático */
export const CACHE_SSG_MAX_SECONDS = Number.parseInt(process.env.CACHE_SSG_MAX_SECONDS || "3600", 10);

/** @constant CACHE_SSG_STALE_SECONDS - stale-while-revalidate de Cache-Control para SSG estático */
export const CACHE_SSG_STALE_SECONDS = Number.parseInt(process.env.CACHE_SSG_STALE_SECONDS || "86400", 10);

/** @constant CACHE_SSG_FALLBACK_SECONDS - max-age cuando SSG cae a SSR fallback */
export const CACHE_SSG_FALLBACK_SECONDS = Number.parseInt(process.env.CACHE_SSG_FALLBACK_SECONDS || "60", 10);
