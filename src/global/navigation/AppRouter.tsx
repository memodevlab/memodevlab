/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/navigation/AppRouter.tsx
 * @description Router principal del sitio publico (landing + legal + contacto)
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Define las rutas publicas del sitio vitrina:
 *   - "/"        landing (SSR/SSG)
 *   - "/legal"   terminos, privacidad, cookies, reembolso
 *   - "/contact" formulario de contacto
 * Cualquier otra ruta redirige al landing.
 */

/** @import React Router */
import { Navigate, Route, Routes } from "react-router-dom";

/** @import Paginas publicas (import directo — renderToString no soporta Suspense) */
import HomePage from "@home/HomePage";
import LegalPage from "../../legal/LegalPage";
import ContactPage from "../../contact/ContactPage";

/**
 * @function AppRouter
 * @description Router del sitio publico. Todas las rutas son SSR.
 * @returns {JSX.Element} Arbol de Routes con redireccion al landing
 */
export function AppRouter() {
  return (
    <Routes>
      {/* Raiz: landing publica (SSR/SSG) */}
      <Route path="/" element={<HomePage />} />

      {/* Legal: terminos, privacidad, cookies, reembolso (URL limpia por seccion) */}
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/legal/:section" element={<LegalPage />} />

      {/* Contacto: formulario de contacto */}
      <Route path="/contact" element={<ContactPage />} />

      {/* Fallback: cualquier otra ruta vuelve al landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
