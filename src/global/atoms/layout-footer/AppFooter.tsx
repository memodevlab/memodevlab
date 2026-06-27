/**
 * @project MemoDevLab
 * @file src/dashboard/layout/components/DashboardFooter.tsx
 * @description Pie de pagina del dashboard (barra inferior)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Barra inferior del sistema que replica la estructura visual del DashboardHeader.
 * Compone atomos de copyright y links legales.
 */

/** @import Componentes Atomicos del Footer */
import FooterDate from "@atoms/layout-footer/FooterDate";
import FooterTerms from "@atoms/layout-footer/FooterTerms";
import FooterPrivacy from "@atoms/layout-footer/FooterPrivacy";
import FooterSupport from "@atoms/layout-footer/FooterSupport";

/**
 * @function DashboardFooter
 * @description Renderiza la barra inferior del dashboard con copyright y links legales
 */
export default function DashboardFooter() {
  return (
    <footer className="h-11 px-4 bg-white border-t border-gray-200 sticky bottom-0 z-50 flex items-center justify-between shrink-0">
      {/* Seccion izquierda: copyright */}
      <div className="flex items-center gap-2">
        <FooterDate />
      </div>

      {/* Seccion derecha: enlaces legales */}
      <div className="flex items-center gap-3">
        <FooterTerms />
        <FooterPrivacy />
        <FooterSupport />
      </div>
    </footer>
  );
}
