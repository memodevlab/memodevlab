/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/App.tsx
 * @description Componente raíz: renderiza el router y la carga inicial de datos
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * La aplicación usa react-router para la navegación.
 */

/** @import Navegación */
import { AppRouter } from "@navigation/AppRouter";

/** @import SEO dinámico (actualiza meta tags al cambiar ruta/idioma) */
import { useDynamicSeo } from "@hooks/useDynamicSeo";

/**
 * @function App
 * @description Componente raíz que monta AppRouter y SEO dinámico
 * @returns {JSX.Element} Fragment con AppRouter
 */
function App() {
  /** Actualizar meta tags del <head> al cambiar de ruta o idioma */
  useDynamicSeo();

  /** Renderizar árbol de rutas: públicas (/), auth (/auth) y protegidas (dashboard, profile) */
  return <AppRouter />;
}

export default App;
