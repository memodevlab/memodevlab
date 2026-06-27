/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/home/layout/LayoutHome.tsx
 * @description Estructura maestra (Layout) para las paginas publicas de la web
 * @author Guillermo Corredor
 * @created 04/04/2026
 *
 * @overview
 * Orquesta la composicion de la interfaz publica (landing): header con logo y
 * selector regional, area de contenido con scroll y footer con links legales.
 */

/** @import React y Primitivos de Tipados */
import type { ReactNode } from "react";

/** @import Componentes del layout */
import HomeHeader from "./components/HomeHeader";
import AppFooter from "@atoms/layout-footer/AppFooter";

/**
 * @interface LayoutHomeProps
 * @description Atributos requeridos para la composicion del layout publico
 */
interface LayoutHomeProps {
  /** @property {ReactNode} children - Contenido de la pagina publica */
  children: ReactNode;
}

/**
 * @function LayoutHome
 * @description Layout de la web publica con header, contenido scrollable y footer
 */
export default function LayoutHome({ children }: Readonly<LayoutHomeProps>) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Cabecera: logo y selector regional */}
      <HomeHeader />

      {/* Contenido principal con footer al fondo */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
        <AppFooter />
      </main>
    </div>
  );
}
