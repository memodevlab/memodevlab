/**
 * @project MemoDevLab Web (Vite SSR)
 * @file eslint.config.js
 * @description Configuración de ESLint para el proyecto MemoDevLab Web (Vite SSR)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Este archivo configura ESLint con el formato flat config. Incluye reglas para
 * JavaScript/TypeScript, React Hooks, React Refresh y optimización para Vite.
 */

/** @import core */
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

/** @import plugins */
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @import globals */
import globals from "globals";

/** Configuración principal - defineConfig retorna array de configs */
export default defineConfig([
  /**
   * 1. Ignorados globales
   * Directorios excluidos del análisis (dist, build, etc.)
   */
  globalIgnores(["dist"]),

  {
    /**
     * 2. Archivos objetivo
     * Patrones de archivos TypeScript/TSX a los que aplica esta configuración.
     */
    files: ["**/*.{ts,tsx}"],

    /**
     * 3. Configuraciones extendidas
     * Base: JS recomendado, TypeScript, React Hooks, React Refresh (Vite).
     */
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier
    ],

    /**
     * 4. Opciones de lenguaje
     * ecmaVersion y globals para el entorno de navegador.
     */
    languageOptions: {
      /** Versión ECMAScript soportada */
      ecmaVersion: 2020,

      /** Variables globales del navegador (window, document, etc.) */
      globals: globals.browser
    },

    /**
     * 5. Reglas personalizadas
     */
    rules: {
      /** useReactTable retorna funciones no memoizables por diseño de TanStack Table */
      "react-hooks/incompatible-library": "off"
    }
  }
]);
