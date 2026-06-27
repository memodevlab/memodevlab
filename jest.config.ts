/**
 * @project MemoDevLab Web (Vite SSR)
 * @file jest.config.ts
 * @description Configuración de Jest para pruebas unitarias
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Este archivo configura Jest para el proyecto App Videos Dashboard. Incluye soporte para
 * TypeScript, React, cobertura de código (85%) y mocks para assets.
 */

export default {
  /**
   * @property preset
   * @description Preset de ts-jest para TypeScript
   * @type {string}
   */
  preset: "ts-jest",

  /**
   * @property testEnvironment
   * @description Entorno de pruebas (jsdom para React/DOM)
   * @type {string}
   */
  testEnvironment: "jsdom",

  /**
   * @property watchman
   * @description Desactiva Watchman para evitar conflictos en sandbox
   * @type {boolean}
   */
  watchman: false,

  /**
   * @property roots
   * @description Directorios raíz donde Jest busca tests
   * @type {string[]}
   */
  roots: ["<rootDir>/src"],

  /**
   * @property testMatch
   * @description Patrones de archivos de test a ejecutar
   * @type {string[]}
   */
  testMatch: ["**/__tests__/**/*.{ts,tsx}", "**/*.{spec,test}.{ts,tsx}"],

  /**
   * @property moduleFileExtensions
   * @description Extensiones de módulos reconocidas
   * @type {string[]}
   */
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  /**
   * @property moduleNameMapper
   * @description Mapeo de módulos (CSS, assets, alias @/)
   * @type {Object}
   */
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif|webp|ico)$": "<rootDir>/src/__mocks__/fileMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1"
  },

  /**
   * @property setupFilesAfterEnv
   * @description Archivos ejecutados después de configurar el entorno
   * @type {string[]}
   */
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  /**
   * @property collectCoverageFrom
   * @description Patrones de archivos para recopilar cobertura
   * @type {string[]}
   */
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/**/__tests__/**",
    "!src/**/*.spec.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}"
  ],

  /**
   * @property coverageDirectory
   * @description Directorio de salida para reportes de cobertura
   * @type {string}
   */
  coverageDirectory: "coverage",

  /**
   * @property coverageReporters
   * @description Formatos de reporte de cobertura (text, lcov, html)
   * @type {string[]}
   */
  coverageReporters: ["text", "lcov", "html"],

  /**
   * @property coverageThreshold
   * @description Umbral mínimo de cobertura (85% global)
   * @type {Object}
   */
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },

  /**
   * @property transform
   * @description Transformadores para TypeScript/TSX
   * @type {Object}
   */
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: "tsconfig.jest.json"
      }
    ]
  }
};
