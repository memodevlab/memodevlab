/**
 * @project MemoDevLab Web (Vite SSR)
 * @file .prettierrc.js
 * @description Configuración de Prettier para el formateo de código
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Este archivo configura las opciones de Prettier para el proyecto MemoDevLab Web (Vite SSR).
 * Define reglas de estilo y formateo automático para mantener consistencia
 * visual en todos los archivos del proyecto.
 */

export default {
  /**
   * @property printWidth
   * @description Longitud máxima de línea antes de ajustar
   * @type {number}
   */
  printWidth: 120,

  /**
   * @property tabWidth
   * @description Número de espacios por nivel de indentación
   * @type {number}
   */
  tabWidth: 2,

  /**
   * @property semi
   * @description Añade punto y coma al final de las sentencias
   * @type {boolean}
   */
  semi: true,

  /**
   * @property singleQuote
   * @description Usa comillas simples en lugar de dobles
   * @type {boolean}
   */
  singleQuote: false,

  /**
   * @property quoteProps
   * @description Cambia las comillas en las propiedades de objetos
   * @type {string}
   */
  quoteProps: "consistent",

  /**
   * @property trailingComma
   * @description Añade comas finales donde sea posible
   * @type {string}
   */
  trailingComma: "none",

  /**
   * @property arrowParens
   * @description Incluye paréntesis en funciones de flecha con un solo parámetro
   * @type {string}
   */
  arrowParens: "always",

  /**
   * @property proseWrap
   * @description Cómo ajustar el texto en archivos markdown
   * @type {string}
   */
  proseWrap: "never",

  /**
   * @property useTabs
   * @description Indenta las líneas con tabuladores en lugar de espacios
   * @type {boolean}
   */
  useTabs: false,

  /**
   * @property bracketSpacing
   * @description Imprime espacios entre corchetes en literales de objeto
   * @type {boolean}
   */
  bracketSpacing: true,

  /**
   * @property htmlWhitespaceSensitivity
   * @description Especifica la sensibilidad global a los espacios en blanco para HTML
   * @type {string}
   */
  htmlWhitespaceSensitivity: "ignore",

  /**
   * @property jsxSingleQuote
   * @description Usa comillas simples en lugar de dobles en JSX
   * @type {boolean}
   */
  jsxSingleQuote: false,

  /**
   * @property endOfLine
   * @description Formato de fin de línea a utilizar
   * @type {string}
   */
  endOfLine: "lf",

  /**
   * @property rangeStart
   * @description Formatea el código a partir de este índice (inclusive)
   * @type {number}
   */
  rangeStart: 0,

  /**
   * @property insertPragma
   * @description Inserta un marcador especial de formato en la parte superior de los archivos
   * @type {boolean}
   */
  insertPragma: false,

  /**
   * @property requirePragma
   * @description Solo formatea archivos que contienen un marcador especial de formato
   * @type {boolean}
   */
  requirePragma: false,

  /**
   * @property overrides
   * @description Permite configuraciones específicas para ciertos tipos de archivos
   * @type {Object[]}
   */
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 80
      }
    }
  ]
};
