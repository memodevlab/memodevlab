/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/entry-server.tsx
 * @description Punto de entrada del servidor — renderiza la app a HTML con SEO dinámico
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Se ejecuta en Node.js (Fastify). Renderiza la aplicación React a HTML string
 * usando renderToString de react-dom/server. El servidor inyecta este HTML
 * en el template index.html reemplazando <!--ssr-outlet-->.
 * Genera meta tags SEO dinámicos por ruta (title, description, og:*, twitter:*).
 * Usa StaticRouter (no BrowserRouter) porque no hay DOM en el servidor.
 * Incluye MantineProvider para que los componentes Mantine rendericen en SSR.
 */

/** @import React */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

/** @import React Router (StaticRouter para SSR) */
import { StaticRouter } from "react-router";

/** @import Mantine Providers (árbol idéntico al cliente para hydration correcta) */
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

/** @import Tema Mantine */
import { theme } from "@assets/theme";

/** @import i18n (debe inicializarse antes del render para traducciones SSR) */
import "@i18n/i18n";

/** @import Carga de datos de la app de negocio */
import { loadAppBusiness } from "@global/services/loadAppBusiness";

/** @import Carga de políticas legales (para SSR/SSG) */
import { loadLegalPolicies } from "@global/services/loadLegalPolicies";

/** @import Aplicación raíz */
import App from "./App";

/** @import SEO dinámico por ruta */
import { generateHeadTags } from "@navigation/seo.config";

/** @import Tipos compartidos (extraídos a .ts para que el servidor Node los importe sin JSX) */
import type { RenderResult } from "./entry-server.types";
export type { RenderResult };

/**
 * @function render
 * @description Renderiza la aplicación React a HTML string con meta tags SEO por ruta
 * @param {string} url - URL de la petición (para StaticRouter y SEO)
 * @returns {RenderResult} HTML renderizado y meta tags
 */
export async function render(url: string): Promise<RenderResult> {
  /** Cargar datos antes de renderizar: negocio (SEO) y políticas legales (contenido SSR) */
  await loadAppBusiness();
  const policies = await loadLegalPolicies();

  /** Renderizar la app con MantineProvider (necesario para componentes Mantine en SSR) */
  const rawHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" zIndex={2000} />
          <DatesProvider settings={{ locale: "es", firstDayOfWeek: 1 }}>
            <App />
          </DatesProvider>
        </MantineProvider>
      </StaticRouter>
    </StrictMode>
  );

  /**
   * Eliminar <style data-mantine-styles> del HTML para evitar hydration mismatch.
   * MantineProvider genera CSS variables como <style> inline en SSR.
   * El cliente inyecta las suyas al montar — si las del servidor están en el HTML,
   * React detecta que el cliente quiere reemplazarlas y hace re-render completo (flash).
   * Al eliminarlas, el HTML del servidor coincide con lo que el cliente espera antes
   * de que MantineProvider inyecte las suyas. Los estilos vienen del stylesheet CSS.
   */
  const html = rawHtml.replaceAll(/<style data-mantine-styles[^>]*>[\s\S]*?<\/style>/g, "");

  /** Generar título y meta tags SEO dinámicos según la ruta */
  const { title, meta } = generateHeadTags(url);

  /** Serializar las políticas al HTML para que el cliente hidrate sin re-fetch
   *  (escapa "<" para no romper el <script>). */
  const serialized = JSON.stringify(policies).replace(/</g, "\\u003c");
  const head = `${meta}\n    <script>window.__LEGAL_POLICIES__=${serialized}</script>`;

  return { html, title, head };
}
