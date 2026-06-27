/**
 * @project MemoDevLab Web (Vite SSR)
 * @file vite.config.ts
 * @description Configuración de Vite con SSR, React y aliases
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Configura Vite para SSR con React. Define los alias de paths
 * idénticos al dashboard para mantener consistencia de imports.
 */

/** @import Vite */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    /** Plugins de Vite */
    plugins: [react(), tailwindcss()],

    /** Alias de rutas — idénticos al dashboard */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@global": path.resolve(__dirname, "src/global"),
        "@assets": path.resolve(__dirname, "src/global/assets"),
        "@images": path.resolve(__dirname, "src/global/assets/images"),
        "@sounds": path.resolve(__dirname, "src/global/assets/sounds"),
        "@theme": path.resolve(__dirname, "src/global/assets/theme"),
        "@atoms": path.resolve(__dirname, "src/global/atoms"),
        "@hooks": path.resolve(__dirname, "src/global/hooks"),
        "@i18n": path.resolve(__dirname, "src/global/i18n"),
        "@navigation": path.resolve(__dirname, "src/global/navigation"),
        "@store": path.resolve(__dirname, "src/global/store"),
        "@home": path.resolve(__dirname, "src/home")
      }
    },

    /** Servidor de desarrollo — HMR en puerto desde .env para evitar colisiones */
    server: {
      hmr: { port: Number(env.HMR_PORT) || 24678 }
    },

    /** Configuracion de SSR */
    ssr: {
      /** Dependencias que NO deben externalizarse (necesitan compartir contexto React) */
      noExternal: ["react-router", "react-router-dom"],
      /** Forzar resolución de condiciones ESM para evitar CJS module.exports */
      resolve: {
        conditions: ["import", "module", "browser", "default"]
      }
    }
  };
});
