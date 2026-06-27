/**
 * @project MemoDevLab
 * @file src/global/assets/theme/colors.ts
 * @description Paleta y configuración base del tema Mantine (Davivienda)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Define la paleta roja corporativa (10 tonos) y la configuración base del tema
 * (fontFamily Montserrat, primaryColor red, defaultRadius md) usada por theme.ts.
 */

export const themeColors = {
  /** @property {string[]} red - Paleta roja Davivienda (10 tonos obligatorios para Mantine) */
  red: [
    "#fff1f1", // 0: Light
    "#fff1f1", // 1
    "#ffa3a3", // 2: Accent
    "#ffa3a3", // 3
    "#ffa3a3", // 4
    "#e60000", // 5
    "#e60000", // 6: Brand (Mantine Default)
    "#e60000", // 7
    "#b30000", // 8: Dark
    "#b30000" // 9: Deep
  ] as const,

  /** @property {string[]} green - Variación verde (10 tonos obligatorios) */
  green: [
    "#e8f9e7", // 0: Light
    "#e8f9e7", // 1
    "#21cb12", // 2: Base
    "#21cb12", // 3
    "#21cb12", // 4
    "#21cb12", // 5
    "#21cb12", // 6: Default
    "#1bab0e", // 7: Dark
    "#1bab0e", // 8
    "#116d09" // 9: Deep
  ] as const,

  /** @property {string[]} blue - Variación azul (10 tonos obligatorios) */
  blue: [
    "#e7f2f9", // 0: Light
    "#e7f2f9", // 1
    "#127acb", // 2: Base
    "#127acb", // 3
    "#127acb", // 4
    "#127acb", // 5
    "#127acb", // 6: Default
    "#0f67ac", // 7: Dark
    "#0f67ac", // 8
    "#0a416d" // 9: Deep
  ] as const,

  /** @property {string[]} purple - Paleta púrpura corporativa (10 tonos obligatorios para Mantine) */
  purple: [
    "#fdfaff", // 0: Lightest
    "#f3e8ff", // 1: Light
    "#e9d5ff", // 2: Accent Light
    "#d8b4fe", // 3: Accent
    "#c084fc", // 4: Soft
    "#a855f7", // 5: Base
    "#9333ea", // 6: Brand (Mantine Default)
    "#7e22ce", // 7: Dark
    "#6b21a8", // 8: Deep Dark
    "#581c87" // 9: Deeper
  ] as const
};

/** @constant functionalColors - Colores funcionales por propiedad para componentes UI */
export const functionalColors = {
  /** @property {Object} bg - Colores de fondo para inputs, dropdowns y pills */
  bg: {
    input: "#f9fafb",
    inputFocus: "#ffffff",
    dropdown: "#ffffff",
    pill: "var(--mantine-color-blue-0)"
  },
  /** @property {Object} border - Colores de borde para estados normales, focus y especiales */
  border: {
    input: "#d0d0d0",
    dropdown: "#f3f4f6",
    focus: "var(--mantine-color-purple-6)",
    today: "var(--mantine-color-purple-2)"
  },
  /** @property {Object} text - Colores de texto para labels, opciones, weekdays y estados */
  text: {
    label: "#787777",
    main: "#374151",
    dimmed: "#6b7280",
    disabled: "#525252", // Antes #d1d5db - oscurecido para mejor legibilidad en estado disabled
    weekday: "#9ca3af",
    option: "#525252",
    pill: "#525252",
    selected: "#ffffff"
  },
  /** @property {Object} action - Colores para hovers, sombras de focus y selecciones */
  action: {
    hover: "rgba(147, 51, 234, 0.05)",
    hoverStrong: "rgba(147, 51, 234, 0.08)",
    focusShadow: "rgba(147, 51, 234, 0.1)",
    selected: "var(--mantine-color-purple-6)",
    selectedHover: "var(--mantine-color-purple-8)"
  },
  /** @property {Object} shadow - Sombras para dropdowns y popovers */
  shadow: {
    dropdown: "0 10px 30px -5px rgba(0,0,0,0.1)"
  }
} as const;

/** @constant themeBase - Configuración base del tema (fuente, colores, primaryColor, defaultRadius) */
export const themeBase = {
  fontFamily: "Montserrat, sans-serif",
  colors: themeColors,
  primaryColor: "purple" as const,
  defaultRadius: "md" as const
};
