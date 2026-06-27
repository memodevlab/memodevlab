/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/entry-client.tsx
 * @description Punto de entrada del cliente — hydrate (SSR) o create (CSR) según el contenido
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Se ejecuta en el navegador. El servidor usa rendering híbrido (SSR/SSG/ISR/CSR)
 * por ruta. Para rutas SSR/SSG/ISR el `#root` viene con HTML pre-renderizado y se
 * usa hydrateRoot. Para rutas CSR el `#root` viene vacío (solo el comentario
 * `<!--ssr-outlet-->` literal) y se usa createRoot — hidratar contra un root vacío
 * provoca mismatch en MantineCssVariables que React 19 no puede recuperar (queda
 * pantalla en blanco).
 * El árbol de providers es idéntico al servidor (MantineProvider, DatesProvider,
 * Notifications) para evitar diferencias estructurales en la hydration.
 */

/** @import React */
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

/** @import React Router */
import { BrowserRouter } from "react-router-dom";

/** @import Mantine Providers */
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

/** @import Tema Mantine (colores, inputs, botones) */
import { theme } from "@assets/theme";

/** @import Locale de fechas */
import "dayjs/locale/es";

/** @import i18n (debe inicializarse antes del render) */
import "@i18n/i18n";

/** @import Estilos globales (Tailwind, Mantine, fuentes) */
import "@assets/index.css";

/** @import Carga de datos de la app de negocio */
import { loadAppBusiness } from "@global/services/loadAppBusiness";

/** @import Carga de políticas legales (fallback si el HTML no las trajo) */
import { loadLegalPolicies } from "@global/services/loadLegalPolicies";

/** @import Aplicación raíz */
import App from "./App";

/** Cargar datos antes de montar (políticas: no-op si ya vinieron serializadas del SSR) */
loadAppBusiness();
loadLegalPolicies();

/** Árbol de providers común a SSR/CSR */
const tree = (
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" zIndex={2000} />
        <DatesProvider settings={{ locale: "es", firstDayOfWeek: 1 }}>
          <App />
        </DatesProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);

/** Detección SSR vs CSR: en CSR el handler del servidor no reemplaza
 *  `<!--ssr-outlet-->`, así que el `#root` queda sin Element children. */
const container = document.getElementById("root")!;
const isCsrShell = container.firstElementChild === null;

if (isCsrShell) {
  /** CSR: renderizar desde cero. createRoot evita el mismatch de Mantine. */
  createRoot(container).render(tree);
} else {
  /** SSR/SSG/ISR: hidratar el HTML pre-renderizado.
   *  Silenciar errores de hydration recuperables causados por MantineProvider:
   *  Mantine v9 genera un <style data-mantine-styles> con CSS variables que
   *  difiere entre servidor y cliente. React se recupera automáticamente
   *  re-renderizando el sub-árbol afectado (mismatch cosmético, no funcional). */
  hydrateRoot(container, tree, {
    onRecoverableError(error) {
      if (error instanceof Error && error.message.includes("Hydration")) return;
      console.error(error);
    }
  });
}
