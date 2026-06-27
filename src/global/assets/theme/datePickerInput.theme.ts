/**
 * @project MemoDevLab
 * @file src/global/assets/theme/datePickerInput.theme.ts
 * @description Tema Mantine para DatePickerInput (calendario completo)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del DatePickerInput: input con focus rojo, label mayúsculas,
 * cabecera del calendario, días, meses y años con hover y selección roja.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** Hover rojo suave (opacidad 0.05) para controles del calendario */
const redHover = {
  backgroundColor: functionalColors.action.hover,
  color: functionalColors.action.selected
};

/** Hover rojo suave (opacidad 0.06) para día/meses/años seleccionables */
const redHover06 = {
  backgroundColor: functionalColors.action.hoverStrong,
  color: functionalColors.action.selected
};

/** @constant datePickerInputTheme - Tema del componente DatePickerInput para MantineProvider */
export const datePickerInputTheme = {
  /** @property {Object} defaultProps - radio, tamaño y popoverProps (sombra, radio) */
  defaultProps: {
    ...sharedDefaultProps,
    popoverProps: {
      shadow: "xl",
      radius: "lg"
    }
  },
  /** @property {Object} styles - input, label, calendar (header, weekday, day), monthsList, yearsList, levelsGroup */
  styles: {
    input: baseInputStyles,
    label: labelStyles,
    calendarHeader: {
      marginBottom: "4px"
    },
    calendarHeaderLevel: {
      "fontSize": "13px",
      "fontWeight": 800,
      "color": functionalColors.text.main,
      "textTransform": "capitalize",
      "borderRadius": "8px",
      "transition": "all 150ms ease",
      "&:hover": redHover
    },
    calendarHeaderControl: {
      "borderRadius": "8px",
      "color": functionalColors.text.dimmed,
      "transition": "all 150ms ease",
      "&:hover": redHover
    },
    weekday: {
      fontSize: "10px",
      fontWeight: 700,
      color: functionalColors.text.weekday,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      paddingBottom: "8px"
    },
    day: {
      "borderRadius": "8px",
      "fontSize": "13px",
      "fontWeight": 500,
      "color": functionalColors.text.main,
      "transition": "all 150ms ease",
      "&:hover": redHover06,
      "&[data-selected]": {
        backgroundColor: functionalColors.action.selected,
        color: functionalColors.text.selected,
        fontWeight: 700
      },
      "&[data-selected]:hover": {
        backgroundColor: functionalColors.action.selectedHover
      },
      "&[data-today]": {
        border: `1px solid ${functionalColors.border.today}`
      }
    },
    monthsListControl: {
      "borderRadius": "8px",
      "fontSize": "13px",
      "fontWeight": 600,
      "color": functionalColors.text.main,
      "textTransform": "capitalize",
      "transition": "all 150ms ease",
      "&:hover": redHover06,
      "&[data-selected]": {
        backgroundColor: functionalColors.action.selected,
        color: functionalColors.text.selected,
        fontWeight: 700
      }
    },
    yearsListControl: {
      "borderRadius": "8px",
      "fontSize": "13px",
      "fontWeight": 600,
      "color": functionalColors.text.main,
      "transition": "all 150ms ease",
      "&:hover": redHover06,
      "&[data-selected]": {
        backgroundColor: functionalColors.action.selected,
        color: functionalColors.text.selected,
        fontWeight: 700
      }
    },
    levelsGroup: {
      padding: "4px"
    }
  }
};
