/**
 * @project MemoDevLab
 * @file src/global/assets/theme/pinInput.theme.ts
 * @description Tema personalizado para el componente PinInput de Mantine
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Aplica estilos consistentes al PinInput usado en la verificación OTP:
 * bordes redondeados, focus rojo y tamaño adecuado para 6 dígitos.
 */

/** @import Estilos compartidos */
import { inputFocus } from "./shared.theme";

/** @import Colores funcionales */
import { functionalColors } from "./colors";

/**
 * @constant pinInputTheme
 * @description Tema para PinInput con estilos premium
 */
export const pinInputTheme = {
  defaultProps: {
    radius: "md",
    size: "md"
  },
  styles: () => ({
    input: {
      "height": 52,
      "width": 48,
      "borderRadius": "12px",
      "backgroundColor": functionalColors.bg.input,
      "border": `1px solid ${functionalColors.border.input}`,
      "fontSize": "20px",
      "fontWeight": 700,
      "textAlign": "center" as const,
      "color": functionalColors.text.main,
      "transition": "all 150ms ease",
      "&:focus": inputFocus
    }
  })
};
