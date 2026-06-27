/**
 * @project MemoDevLab
 * @file src/global/assets/theme/autocomplete.theme.ts
 * @description Tema Mantine para Autocomplete (input y label)
 * @author Guillermo Corredor
 * @created 27/03/2026
 *
 * @overview
 * Estilos del Autocomplete: input con altura 42px, borde en focus y label
 * en mayúsculas. Consistente con TextInput y Select.
 */

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant autocompleteTheme - Tema del componente Autocomplete para MantineProvider */
export const autocompleteTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input (altura, focus) y label (mayúsculas) */
  styles: {
    input: baseInputStyles,
    label: labelStyles
  }
};
