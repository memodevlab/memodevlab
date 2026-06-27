/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/navigation/seo.config.ts
 * @description Configuracion SEO por ruta (desde site.config estático, sin base de datos)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Genera los meta tags (title, description, canonical, Open Graph, Twitter, hreflang,
 * JSON-LD, keywords) para cada ruta. El contenido proviene de site.config.ts —
 * el sitio carga directo, sin consultar apps_business.
 */

/** @import Configuración estática del sitio */
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  ROUTE_SEO,
  DEFAULT_SEO
} from "../config/site.config";

/**
 * @interface SeoMeta
 * @description Meta tags SEO para una ruta
 */
export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

/**
 * @function normalizePath
 * @description Quita query string y barra final para resolver la ruta base
 */
function normalizePath(url: string): string {
  const path = url.split("?")[0].split("#")[0];
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * @function buildJsonLd
 * @description Structured data (schema.org) para el landing
 */
function buildJsonLd(description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": description,
    "logo": `${SITE_URL}/favicon.svg`,
    "sameAs": []
  };
}

/**
 * @function getSeoForRoute
 * @description Retorna los meta tags SEO para una ruta, desde site.config
 * @param {string} url - URL de la petición
 * @param {string} [lang] - Idioma (es | en)
 * @returns {SeoMeta} Meta tags resueltos
 */
export function getSeoForRoute(url: string, lang = "es"): SeoMeta {
  const path = normalizePath(url);
  const entry = ROUTE_SEO[path];
  const data = entry?.[lang] ?? entry?.es ?? DEFAULT_SEO[lang] ?? DEFAULT_SEO.es;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    image: data.ogImage || DEFAULT_OG_IMAGE,
    type: "website",
    noindex: data.noindex ?? false,
    jsonLd: path === "/" ? buildJsonLd(data.description) : undefined
  };
}

/**
 * @function generateHeadTags
 * @description Genera el string HTML de meta tags para inyectar en <head>
 * @param {string} url - URL de la petición
 * @param {string} [lang] - Idioma (es | en)
 * @returns {{ title: string; meta: string }} title y bloque de meta tags
 */
export function generateHeadTags(url: string, lang = "es"): { title: string; meta: string } {
  const seo = getSeoForRoute(url, lang);
  const path = normalizePath(url);
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  const tags: string[] = [
    `<meta name="description" content="${seo.description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${seo.title}" />`,
    `<meta property="og:description" content="${seo.description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${seo.type || "website"}" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${seo.title}" />`,
    `<meta name="twitter:description" content="${seo.description}" />`
  ];

  if (TWITTER_HANDLE) {
    tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}" />`);
  }

  tags.push(
    `<link rel="alternate" hreflang="es" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`
  );

  if (seo.image) {
    const imageUrl = seo.image.startsWith("http") ? seo.image : `${SITE_URL}${seo.image}`;
    tags.push(
      `<meta property="og:image" content="${imageUrl}" />`,
      `<meta property="og:image:alt" content="${seo.title}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:image" content="${imageUrl}" />`,
      `<meta name="twitter:image:alt" content="${seo.title}" />`
    );
  }

  tags.push(
    seo.noindex
      ? `<meta name="robots" content="noindex, nofollow" />`
      : `<meta name="robots" content="index, follow" />`
  );

  if (seo.keywords) {
    tags.push(`<meta name="keywords" content="${seo.keywords}" />`);
  }

  if (seo.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`);
  }

  return { title: seo.title, meta: tags.join("\n    ") };
}
