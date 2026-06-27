/**
 * @project MemoDevLab
 * @file src/global/assets/theme/button.theme.ts
 * @description Tema Mantine para Button (altura, radio, hover)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Override del componente Button: radio md, altura 48px, peso 500 y transición
 * con scale(1.02) en hover para feedback visual.
 */

/** @constant buttonTheme - Tema del componente Button para MantineProvider */
export const buttonTheme = {
  /** @property {Object} defaultProps - radio, tamaño, altura y peso de fuente */
  defaultProps: {
    radius: "md",
    size: "md",
    h: 48,
    fw: 500
  },
  /** @property {Object} styles - transición y hover (scale) */
  styles: {
    root: {
      "transition": "transform 150ms ease, background-color 150ms ease",
      "&:hover": {
        transform: "scale(1.02)"
      },
      "&:disabled": {
        transform: "none !important",
        opacity: "0.6 !important",
        cursor: "not-allowed"
      }
    }
  }
};
