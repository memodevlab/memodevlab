/**
 * @project MemoDevLab
 * @file src/global/assets/theme/checkbox.theme.ts
 * @description Tema Mantine para Checkbox (input y label)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del Checkbox: color rojo, checked y hover con sombra roja, label
 * con cursor pointer y tipografía consistente.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { checkboxLabelStyles } from "./shared.theme.ts";

/** @constant checkboxTheme - Tema del componente Checkbox para MantineProvider */
export const checkboxTheme = {
  /** @property {Object} defaultProps - radio, tamaño y color rojo */
  defaultProps: {
    radius: "sm",
    size: "sm",
    color: "red"
  },
  /** @property {Object} styles - input (checked, hover) y label */
  styles: {
    input: {
      "cursor": "pointer",
      "transition": "all 150ms ease",
      "&:checked": {
        backgroundColor: functionalColors.action.selected,
        borderColor: functionalColors.action.selected
      },
      "&:hover": {
        boxShadow: `0 0 0 4px ${functionalColors.action.hover}`
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "1 !important",
        backgroundColor: "#f2f2f2 !important",
        borderColor: "#d0d0d0 !important"
      }
    },
    label: checkboxLabelStyles
  }
};
