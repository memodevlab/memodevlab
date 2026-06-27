/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/config/site.config.ts
 * @description Configuración estática del sitio y SEO (sin dependencia de base de datos)
 * @author Guillermo Corredor
 *
 * @overview
 * Fuente única de verdad del SEO del landing. Antes el SEO se cargaba desde la tabla
 * apps_business; ahora el sitio carga directo desde este archivo (más rápido, sin BD).
 * Define nombre, URL, imagen OG, handle social y el SEO por ruta (es/en).
 */

/** @constant SITE_NAME - Nombre de la marca (fallback de title) */
export const SITE_NAME = (import.meta.env.VITE_PLATFORM_NAME as string) || "MemoDevLab";

/** @constant SITE_URL - URL pública base (canonical, og:url, sitemap) */
export const SITE_URL =
  (import.meta.env.SITE_URL as string) ||
  (import.meta.env.VITE_SITE_URL as string) ||
  "https://memodevlab.com";

/** @constant DEFAULT_OG_IMAGE - Imagen por defecto para Open Graph / Twitter */
export const DEFAULT_OG_IMAGE = "/og-default.svg";

/** @constant TWITTER_HANDLE - Handle de Twitter/X (vacío si no aplica) */
export const TWITTER_HANDLE = "";

/** @constant DEFAULT_LOCALE - Idioma por defecto */
export const DEFAULT_LOCALE = "es";

/**
 * @interface RouteSeo
 * @description Meta SEO de una ruta para un idioma
 */
export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * @constant ROUTE_SEO
 * @description SEO por ruta e idioma. Las rutas no listadas usan DEFAULT_SEO.
 */
export const ROUTE_SEO: Record<string, Record<string, RouteSeo>> = {
  "/": {
    es: {
      title: "MemoDevLab — Desarrollo de software, apps y soluciones con IA",
      description:
        "Estudio de desarrollo de software. Creamos aplicaciones web y móviles a medida, contenido digital y soluciones potenciadas con inteligencia artificial para hacer crecer tu negocio.",
      keywords:
        "desarrollo de software, desarrollo de aplicaciones, apps a medida, aplicaciones web, aplicaciones móviles, inteligencia artificial, creación de contenido, programación, automatización, consultoría tecnológica"
    },
    en: {
      title: "MemoDevLab — Software development, apps and AI solutions",
      description:
        "Software development studio. We build custom web and mobile applications, digital content and AI-powered solutions to grow your business.",
      keywords:
        "software development, application development, custom apps, web applications, mobile applications, artificial intelligence, content creation, programming, automation, technology consulting"
    }
  },
  "/contact": {
    es: {
      title: "Contacto — MemoDevLab",
      description:
        "¿Tienes un proyecto de software, una app o una idea con IA? Escríbenos y conversemos cómo podemos ayudarte a construirlo.",
      keywords: "contacto, cotización software, desarrollo de apps, consultoría, MemoDevLab"
    },
    en: {
      title: "Contact — MemoDevLab",
      description:
        "Do you have a software project, an app or an AI idea? Get in touch and let us talk about how we can help you build it.",
      keywords: "contact, software quote, app development, consulting, MemoDevLab"
    }
  },
  "/legal": {
    es: {
      title: "Legal — MemoDevLab",
      description:
        "Términos y condiciones, política de privacidad, cookies y reembolsos de MemoDevLab.",
      noindex: false
    },
    en: {
      title: "Legal — MemoDevLab",
      description: "Terms and conditions, privacy policy, cookies and refunds of MemoDevLab.",
      noindex: false
    }
  },
  "/legal/terms": {
    es: { title: "Términos y condiciones — MemoDevLab", description: "Términos y condiciones de uso de los servicios de MemoDevLab." },
    en: { title: "Terms and Conditions — MemoDevLab", description: "Terms and conditions for the use of MemoDevLab services." }
  },
  "/legal/privacy": {
    es: { title: "Política de privacidad — MemoDevLab", description: "Cómo MemoDevLab recopila, usa y protege tus datos personales." },
    en: { title: "Privacy Policy — MemoDevLab", description: "How MemoDevLab collects, uses and protects your personal data." }
  },
  "/legal/cookies": {
    es: { title: "Política de cookies — MemoDevLab", description: "Uso de cookies en el sitio web de MemoDevLab." },
    en: { title: "Cookie Policy — MemoDevLab", description: "Use of cookies on the MemoDevLab website." }
  },
  "/legal/refund": {
    es: { title: "Política de reembolso — MemoDevLab", description: "Condiciones de reembolso de los servicios de MemoDevLab." },
    en: { title: "Refund Policy — MemoDevLab", description: "Refund conditions for MemoDevLab services." }
  }
};

/**
 * @constant DEFAULT_SEO
 * @description SEO de respaldo para rutas sin entrada en ROUTE_SEO
 */
export const DEFAULT_SEO: Record<string, RouteSeo> = ROUTE_SEO["/"];
