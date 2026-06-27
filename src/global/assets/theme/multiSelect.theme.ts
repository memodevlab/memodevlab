/**
 * @project MemoDevLab
 * @file src/global/assets/theme/multiSelect.theme.ts
 * @description Tema Mantine para MultiSelect (input, label, option, dropdown, pill)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del MultiSelect: input con focus rojo, label mayúsculas, opciones,
 * dropdown y pills (chips) en azul claro. Consistente con Select.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant multiSelectTheme - Tema del componente MultiSelect para MantineProvider */
export const multiSelectTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input, label, option, dropdown y pill */
  styles: {
    input: {
      ...baseInputStyles,
      minHeight: 42,
      height: "auto"
    },
    label: labelStyles,
    option: {
      color: functionalColors.text.option,
      fontSize: "13px",
      fontWeight: 500
    },
    dropdown: {
      borderRadius: "12px",
      boxShadow: functionalColors.shadow.dropdown,
      border: `1px solid ${functionalColors.border.dropdown}`
    },
    pill: {
      backgroundColor: functionalColors.bg.pill,
      color: functionalColors.text.pill,
      fontWeight: 700,
      fontSize: "11px",
      textTransform: "uppercase"
    }
  }
};
