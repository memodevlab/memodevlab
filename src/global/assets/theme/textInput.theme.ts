/**
 * @project MemoDevLab
 * @file src/global/assets/theme/textInput.theme.ts
 * @description Tema Mantine para TextInput (input y label)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del TextInput: input con altura 42px, borde rojo en focus y label
 * en mayúsculas. Usado en formularios de auth y módulos.
 */

/** @import Estilos compartidos */
import { baseInputStyles, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant textInputTheme - Tema del componente TextInput para MantineProvider */
export const textInputTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input (altura, focus) y label (mayúsculas) */
  styles: {
    input: baseInputStyles,
    label: labelStyles
  }
};
