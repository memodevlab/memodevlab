/**
 * @project MemoDevLab
 * @file src/global/assets/theme/shared.theme.ts
 * @description Estilos compartidos para los temas de Mantine
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Centraliza estilos comunes como labels en mayúsculas y efectos de focus
 * para mantener la consistencia visual en todos los inputs del sistema.
 */

/** @import Colores funcionales */
import { functionalColors } from "./colors.ts";

/**
 * @constant inputFocus
 * @description Efecto visual de focus: borde rojo Davivienda y sombra difuminada
 */
export const inputFocus = {
  borderColor: functionalColors.border.focus,
  backgroundColor: functionalColors.bg.inputFocus,
  boxShadow: `0 0 0 4px ${functionalColors.action.focusShadow}`
};

/**
 * @constant labelStyles
 * @description Estilo premium para labels: minúsculas a mayúsculas, peso 800 y espaciado
 */
export const labelStyles = {
  fontSize: "10px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  color: functionalColors.text.label,
  marginBottom: "6px",
  marginLeft: "4px"
};

/**
 * @constant baseInputStyles
 * @description Estilos base para el elemento input: altura 42px y bordes sutiles
 */
export const baseInputStyles = {
  "height": 42,
  "borderRadius": "12px",
  "backgroundColor": functionalColors.bg.input,
  "border": `1px solid ${functionalColors.border.input}`,
  "fontSize": "13px",
  "fontWeight": 500,
  "color": functionalColors.text.main,
  "transition": "all 150ms ease",
  "&:focus": inputFocus
};

/**
 * @constant sharedDefaultProps
 * @description Configuración estándar para radios y tamaños de inputs
 */
export const sharedDefaultProps = {
  radius: "md",
  size: "md"
};

/**
 * @constant checkboxLabelStyles
 * @description Estilos específicos para labels de Checkbox
 */
export const checkboxLabelStyles = {
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 700,
  color: functionalColors.text.label,
  paddingLeft: "4px",
  letterSpacing: "0.02em",
  marginLeft: "4px"
};
