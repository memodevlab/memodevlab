/**
 * @project MemoDevLab
 * @file src/global/assets/theme/colorInput.theme.ts
 * @description Tema Mantine para ColorInput (input y label)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del ColorInput alineados con TextInput: input con altura 42px,
 * borde rojo en focus y label en mayúsculas.
 */

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant colorInputTheme - Tema del componente ColorInput para MantineProvider */
export const colorInputTheme = {
  defaultProps: sharedDefaultProps,
  styles: {
    input: baseInputStyles,
    label: labelStyles
  }
};
