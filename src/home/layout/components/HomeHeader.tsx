/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/home/layout/components/HomeHeader.tsx
 * @description Encabezado de la web publica (landing): logo y selector regional
 * @author Guillermo Corredor
 * @created 04/04/2026
 *
 * @overview
 * Barra superior del landing con el logo corporativo y el selector de idioma/moneda.
 * Sin CTAs de autenticacion ni navegacion a planes (la web es solo vitrina informativa).
 * Reutiliza HeaderLogo y HeaderSystem del sistema de atomos compartidos.
 */

/** @import React Router */
import { Link } from "react-router-dom";

/** @import Componentes Atomicos del Header */
import HeaderLogo from "@atoms/layout-header/HeaderLogo";
import HeaderSystem from "@atoms/layout-header/HeaderSystem";

/**
 * @function HomeHeader
 * @description Renderiza la barra superior del landing con logo y selector de idioma/moneda.
 */
export default function HomeHeader() {
  return (
    <header
      className="h-16 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between shrink-0"
      role="banner"
    >
      {/* Seccion izquierda: logo */}
      <Link to="/" aria-label="MemoDevLab">
        <HeaderLogo className="h-9 w-auto" />
      </Link>

      {/* Seccion derecha: selector de idioma/moneda */}
      <div className="flex items-center gap-3">
        <HeaderSystem />
      </div>
    </header>
  );
}
