/**
 * @project MemoDevLab
 * @file src/global/assets/theme/dateInput.theme.ts
 * @description Tema Mantine para DateInput (input, label, calendarHeader)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del DateInput: input con focus rojo, label mayúsculas y controles
 * del calendario con hover rojo. Consistente con TextInput.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant dateInputTheme - Tema del componente DateInput para MantineProvider */
export const dateInputTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input, label, calendarHeaderLevel y calendarHeaderControl */
  styles: {
    input: baseInputStyles,
    label: labelStyles,
    calendarHeaderLevel: {
      fontSize: "13px",
      fontWeight: 700,
      color: functionalColors.text.option
    },
    calendarHeaderControl: {
      "color": functionalColors.text.option,
      "transition": "all 150ms ease",
      "&:hover": {
        backgroundColor: functionalColors.action.hover
      }
    }
  }
};
