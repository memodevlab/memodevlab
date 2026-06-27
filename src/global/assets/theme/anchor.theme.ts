/**
 * @project MemoDevLab
 * @file src/global/assets/theme/anchor.theme.ts
 * @description Tema personalizado para el componente Anchor de Mantine
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Aplica estilos consistentes al Anchor usado en links de navegación:
 * sin subrayado por defecto, transición suave.
 */

/**
 * @constant anchorTheme
 * @description Tema para Anchor con estilos premium
 */
export const anchorTheme = {
  defaultProps: {
    underline: "never" as const
  },
  styles: () => ({
    root: {
      "fontWeight": 700,
      "transition": "opacity 150ms ease",
      "&:hover": {
        opacity: 0.8
      }
    }
  })
};
