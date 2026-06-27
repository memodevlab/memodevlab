/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/App.tsx
 * @description Componente raíz: renderiza el router y la carga inicial de datos
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * La aplicación usa react-router para la navegación. Tras montar (post-hidratación)
 * rehidrata el store de preferencias persistidas para evitar mismatch de SSR.
 */

/** @import React */
import { useEffect } from "react";

/** @import Navegación */
import { AppRouter } from "@navigation/AppRouter";

/** @import SEO dinámico (actualiza meta tags al cambiar ruta/idioma) */
import { useDynamicSeo } from "@hooks/useDynamicSeo";

/** @import Límite de error (evita pantalla en blanco) */
import { ErrorBoundary } from "@global/components/ErrorBoundary";

/** @import Store de preferencias (locale/moneda) persistido */
import { coreLayout } from "@store/coreLayout";

/**
 * @function App
 * @description Componente raíz que monta AppRouter y SEO dinámico
 * @returns {JSX.Element} Fragment con AppRouter
 */
function App() {
  /** Actualizar meta tags del <head> al cambiar de ruta o idioma */
  useDynamicSeo();

  /**
   * Rehidratar las preferencias persistidas DESPUÉS de la hidratación de React.
   * coreLayout usa skipHydration: el primer render (cliente) coincide con el servidor
   * (locale por defecto); aquí aplicamos lo guardado en localStorage sin romper SSR.
   */
  useEffect(() => {
    void coreLayout.persist.rehydrate();
  }, []);

  /** Renderizar árbol de rutas dentro del límite de error */
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
