/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/prerender.ts
 * @description Script de pre-rendering para SSG — genera HTML estático en build time
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Se ejecuta después del build (client + server). Lee las rutas SSG definidas
 * en rendering.config.ts, renderiza cada una con entry-server y guarda
 * el HTML resultante como archivos estáticos en dist/client/.
 * Estos archivos se sirven directamente sin pasar por el servidor SSR.
 *
 * @usage npm run build && npm run prerender
 */

/** @import Node.js */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** @import Tipos compartidos del entry-server (.ts sin JSX) */
import type { RenderResult } from "../src/entry-server.types";

/** @type EntryServerModule - Forma del bundle compilado por vite build --ssr */
type EntryServerModule = {
  render: (url: string) => Promise<RenderResult>;
};

/** @constant __dirname - Directorio actual del archivo */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Importar rutas SSG desde la configuración */
const { ssgRoutes } = await import("../src/global/navigation/rendering.config.ts");

/** Importar la función de render del servidor compilado.
 *  Se castea explícitamente porque el archivo no existe en tiempo de análisis
 *  estático (solo tras `vite build --ssr`), así que sin cast tanto TS como
 *  SonarQube tratan `render` como `any` y disparan falsos positivos. */
const { render } = (await import("../dist/server/entry-server.js")) as EntryServerModule;

/** Leer el template HTML compilado */
const template = fs.readFileSync(path.resolve(__dirname, "../dist/client/index.html"), "utf-8");

/** Banner de inicio del pre-rendering */
console.log("");
console.log("  📦 Pre-rendering SSG routes...");
console.log("");

for (const route of ssgRoutes) {
  /** Renderizar la ruta (render es async; sin await el tipo era Promise y los
   *  campos html/head salían undefined en el HTML pre-generado). */
  const { html: appHtml, title, head } = await render(route);

  /** Inyectar en el template (título dinámico + head + app), igual que renderPage */
  const finalHtml = template
    .replace("<title>MemoDevLab</title>", `<title>${title}</title>`)
    .replace("<!--ssr-outlet-->", appHtml)
    .replace("<!--ssr-head-->", head);

  /** Determinar path del archivo de salida */
  const filePath =
    route === "/"
      ? path.resolve(__dirname, "../dist/client/index.html")
      : path.resolve(__dirname, `../dist/client${route}/index.html`);

  /** Crear directorio si no existe */
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  /** Escribir HTML pre-renderizado */
  fs.writeFileSync(filePath, finalHtml);
  console.log(`  ✅ ${route} → ${path.relative(__dirname, filePath)}`);
}

/** Resumen de rutas pre-renderizadas */
console.log("");
console.log(`  📦 ${ssgRoutes.length} routes pre-rendered`);
console.log("");
