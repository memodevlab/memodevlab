/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/hooks/useDynamicSeo.ts
 * @description Hook que actualiza los meta tags del <head> al cambiar de ruta o idioma
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Escucha cambios de ruta (useLocation) y de idioma (coreLayout.locale) para
 * actualizar dinámicamente document.title y los meta tags de SEO en el cliente.
 * Lee el SEO desde seo.config.ts (config estático, sin base de datos).
 */

/** @import React */
import { useEffect } from "react";

/** @import React Router */
import { useLocation } from "react-router-dom";

/** @import Store del layout (idioma) */
import { coreLayout } from "@store/coreLayout";

/** @import SEO config */
import { getSeoForRoute } from "@navigation/seo.config";

/**
 * @function upsertMeta
 * @description Crea o actualiza un meta tag por selector
 */
function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * @function useDynamicSeo
 * @description Actualiza document.title y meta tags al cambiar ruta o idioma
 */
export function useDynamicSeo() {
  const location = useLocation();
  const locale = coreLayout((s) => s.locale);

  useEffect(() => {
    /** Solo ejecutar en el cliente (no en SSR) */
    if (typeof globalThis.window === "undefined") return;

    const seo = getSeoForRoute(location.pathname, locale);

    /** Title */
    document.title = seo.title;

    /** Description + Open Graph + Twitter */
    upsertMeta('meta[name="description"]', "name", "description", seo.description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);

    /** Keywords (si la ruta las define) */
    if (seo.keywords) {
      upsertMeta('meta[name="keywords"]', "name", "keywords", seo.keywords);
    }
  }, [location.pathname, locale]);
}
