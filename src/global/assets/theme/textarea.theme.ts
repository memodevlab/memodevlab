/**
 * @project MemoDevLab
 * @file src/global/assets/theme/textarea.theme.ts
 * @description Tema Mantine para Textarea (input y label)
 * @author Guillermo Corredor
 * @created 19/03/2026
 *
 * @overview
 * Estilos del Textarea: bordes redondeados, borde rojo en focus y label
 * en mayúsculas. Replica los estilos visuales de TextInput adaptados
 * para textarea con altura automática (autosize). No usa minHeight
 * ya que es incompatible con TextareaAutosize de Mantine.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/** @import Estilos compartidos */
import { labelStyles, sharedDefaultProps } from "./shared.theme.ts";

/** @constant textareaTheme - Tema del componente Textarea para MantineProvider */
export const textareaTheme = {
  /** @property {Object} defaultProps - radio y tamaño */
  defaultProps: sharedDefaultProps,
  /** @property {Object} styles - input (estilos base adaptados a textarea) y label (mayúsculas) */
  styles: {
    input: {
      borderRadius: "12px",
      backgroundColor: functionalColors.bg.input,
      border: `1px solid ${functionalColors.border.input}`,
      fontSize: "13px",
      fontWeight: 500,
      color: functionalColors.text.main,
      transition: "all 150ms ease",
      paddingTop: "10px",
      paddingBottom: "10px",
      resize: "none" as const
    },
    label: labelStyles
  }
};
