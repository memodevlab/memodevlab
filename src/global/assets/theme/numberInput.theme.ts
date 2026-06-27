/**
 * @project MemoDevLab
 * @file src/global/assets/theme/numberInput.theme.ts
 * @description Tema Mantine para NumberInput (input y label)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del NumberInput alineados con TextInput: input con altura 42px,
 * borde rojo en focus y label en mayúsculas.
 */

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant numberInputTheme - Tema del componente NumberInput para MantineProvider */
export const numberInputTheme = {
  defaultProps: sharedDefaultProps,
  styles: {
    input: baseInputStyles,
    label: labelStyles
  }
};
