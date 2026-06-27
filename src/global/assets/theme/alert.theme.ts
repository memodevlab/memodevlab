/**
 * @project MemoDevLab
 * @file src/global/assets/theme/alert.theme.ts
 * @description Tema personalizado para el componente Alert de Mantine
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Aplica estilos consistentes al Alert usado para mensajes de error/info:
 * bordes redondeados, tipografía ajustada.
 */

/**
 * @constant alertTheme
 * @description Tema para Alert con estilos premium
 */
export const alertTheme = {
  defaultProps: {
    radius: "md",
    variant: "light"
  },
  styles: () => ({
    root: {
      borderRadius: "12px"
    },
    title: {
      fontSize: "13px",
      fontWeight: 700
    },
    message: {
      fontSize: "13px",
      fontWeight: 500
    }
  })
};
