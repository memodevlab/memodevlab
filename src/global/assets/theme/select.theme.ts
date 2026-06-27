/**
 * @project MemoDevLab
 * @file src/global/assets/theme/select.theme.ts
 * @description Tema Mantine para Select (input, label, option, dropdown)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del Select: input con focus rojo, label mayúsculas, opciones y
 * dropdown con borde y sombra. Consistente con TextInput.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant selectTheme - Tema del componente Select para MantineProvider */
export const selectTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input, label, option y dropdown */
  styles: {
    input: baseInputStyles,
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
    }
  }
};
