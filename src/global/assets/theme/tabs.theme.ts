/**
 * @project MemoDevLab
 * @file src/global/assets/theme/tabs.theme.ts
 * @description Tema Mantine para Tabs (variante pills personalizada)
 * @author Guillermo Corredor
 * @created 25/03/2026
 *
 * @overview
 * Override del componente Tabs: variante pills con estilo limpio.
 * Tab activo con fondo azul claro y texto azul oscuro.
 * Tab inactivo en gris con hover sutil. Sin bordes inferiores.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors";

/** @constant tabsTheme - Tema del componente Tabs para MantineProvider */
export const tabsTheme = {
  /** @property {Object} defaultProps - variante unstyled para control total vía CSS */
  defaultProps: {
    variant: "unstyled"
  },
  /** @property {Object} styles - estilos base (pseudo-selectores vía index.css) */
  styles: {
    list: {
      border: "none",
      gap: "6px"
    },
    tab: {
      padding: "7px 14px",
      borderRadius: "9999px",
      fontSize: "13px",
      fontWeight: 600,
      color: functionalColors.text.dimmed,
      border: "none",
      transition: "all 150ms ease",
      backgroundColor: "transparent"
    }
  }
};
