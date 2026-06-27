/**
 * @project MemoDevLab
 * @file src/global/assets/theme/passwordInput.theme.ts
 * @description Tema Mantine para PasswordInput (input y label)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Estilos del PasswordInput: input con altura 42px, focus-within rojo y label
 * en mayúsculas. Misma línea visual que TextInput.
 */

/** @import Estilos compartidos */
/** @import Estilos compartidos */
import { baseInputStyles, inputFocus, labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant passwordInputTheme - Tema del componente PasswordInput para MantineProvider */
export const passwordInputTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - innerInput, input (focus-within) y label */
  styles: {
    innerInput: {
      height: 42
    },
    input: {
      ...baseInputStyles,
      "&:focus": undefined, // Desactivar focus estándar
      "&:focusWithin": inputFocus
    },
    label: labelStyles
  }
};
