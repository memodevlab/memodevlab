/**
 * @project MemoDevLab Web (Vite SSR)
 * @file jest.setup.ts
 * @description Configuración inicial para Jest (matchers y setup global)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Este archivo se ejecuta antes de cada archivo de test. Importa los matchers
 * personalizados de @testing-library/jest-dom (toBeInTheDocument, toHaveClass, etc.)
 * para extender las aserciones de Jest en pruebas de componentes React.
 */

/** @import matchers - Extiende expect() con matchers DOM (toBeInTheDocument, etc.) */
import "@testing-library/jest-dom";
