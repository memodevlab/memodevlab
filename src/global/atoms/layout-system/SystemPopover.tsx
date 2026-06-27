/**
 * @project MemoDevLab
 * @file src/dashboard/layout/components/SystemPopover.tsx
 * @description Popover de configuración regional (idioma y moneda)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Panel flotante que permite al usuario seleccionar el idioma de la interfaz
 * y la moneda preferida. Se despliega desde el botón HeaderSystem en el DashboardHeader.
 * Compone los átomos SystemLanguage y SystemCurrency con un separador visual.
 */

/** @import Átomos del sistema */
import SystemLanguage from "@atoms/layout-system/SystemLanguage";
import SystemCurrency from "@atoms/layout-system/SystemCurrency";

/**
 * @function SystemPopover
 * @description Renderiza las secciones de idioma y moneda componiendo átomos especializados
 * @returns {JSX.Element} Panel con dos secciones: idioma y moneda
 */
export default function SystemPopover() {
  /** Renderizar panel con secciones de idioma y moneda */
  return (
    <div className="py-2">
      {/* Sección idioma */}
      <SystemLanguage />

      {/* Separador visual */}
      <div className="h-px bg-gray-100 mx-4 my-1" />

      {/* Sección moneda */}
      <SystemCurrency />
    </div>
  );
}
