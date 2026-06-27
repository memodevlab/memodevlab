/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/components/ErrorBoundary.tsx
 * @description Límite de error: evita que un fallo de render deje la página en blanco
 * @author Guillermo Corredor
 *
 * @overview
 * Captura errores de render en el árbol hijo y muestra un fallback mínimo en vez de una
 * pantalla en blanco. Registra el error en consola para diagnóstico.
 */

/** @import React */
import { Component, type ReactNode } from "react";

/**
 * @interface Props
 * @description Hijos a proteger
 */
interface Props {
  children: ReactNode;
}

/**
 * @interface State
 * @description Estado del boundary
 */
interface State {
  hasError: boolean;
}

/**
 * @class ErrorBoundary
 * @description Captura errores de render y muestra un fallback en lugar de blanco
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error("[ErrorBoundary]", error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-black text-gray-800">Algo salió mal</h1>
          <p className="mt-2 text-gray-500">No pudimos cargar esta sección.</p>
          <a href="/" className="mt-6 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700">
            Volver al inicio
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
