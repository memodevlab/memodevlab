/**
 * @project MemoDevLab
 * @file src/dashboard/store/coreLayout.ts
 * @description Store de datos para la gestión del layout del dashboard
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Orquesta el estado visual y de interacción del dashboard.
 * Centraliza el control de componentes globales como el Sidebar (Aside Nav),
 * los paneles laterales (Drawers de perfil y notificaciones), y la configuración
 * regional (idioma/moneda). Utiliza Zustand con middleware de persistencia
 * para asegurar que las preferencias del usuario se mantengan tras recargar la página.
 */

/** @import Librerías de Estado */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * @interface LayoutState
 * @description Estructura de datos que define el estado visual del dashboard
 */
type LayoutState = {
  /** @property {boolean} isOpen - Estado de visibilidad del Sidebar principal */
  isOpen: boolean;
  /** @property {string | null} activeModuleId - ID del módulo actualmente seleccionado en el Sidebar */
  activeModuleId: string | null;
  /** @property {boolean} isProfileDrawerOpen - Indica si el panel de perfil está desplegado */
  isProfileDrawerOpen: boolean;
  /** @property {boolean} isNotificationDrawerOpen - Indica si el panel de notificaciones está desplegado */
  isNotificationDrawerOpen: boolean;
  /** @property {string} locale - Código de idioma actual del sistema (ej: 'es', 'en') */
  locale: string;
  /** @property {string} currency - Código de moneda para visualización (ej: 'USD', 'COP') */
  currency: string;
  /** @property {boolean} isMobileAsideOpen - Visibilidad del aside de iconos en móvil */
  isMobileAsideOpen: boolean;
};

/**
 * @interface LayoutActions
 * @description Métodos para manipular el estado del layout y cerrar/abrir vistas
 */
type LayoutActions = {
  /** @method openDrawer - Abre el sidebar configurando el módulo activo */
  openDrawer: (moduleId: string) => void;
  /** @method closeDrawer - Cierra el sidebar y limpia el módulo activo */
  closeDrawer: () => void;
  /** @method toggleDrawer - Alterna la visibilidad del sidebar */
  toggleDrawer: () => void;
  /** @method toggleModule - Cierra el módulo si es el mismo, o lo abre si es diferente */
  toggleModule: (moduleId: string) => void;
  /** @method openProfileDrawer - Despliega el drawer derecho de perfil */
  openProfileDrawer: () => void;
  /** @method closeProfileDrawer - Oculta el drawer derecho de perfil */
  closeProfileDrawer: () => void;
  /** @method openNotificationDrawer - Despliega el drawer de notificaciones */
  openNotificationDrawer: () => void;
  /** @method closeNotificationDrawer - Oculta el drawer de notificaciones */
  closeNotificationDrawer: () => void;
  /** @method setLocale - Actualiza el idioma global (sincronizado con i18next) */
  setLocale: (locale: string) => void;
  /** @method setCurrency - Actualiza la moneda global de la cuenta */
  setCurrency: (currency: string) => void;
  /** @method toggleMobileAside - Alterna el aside de iconos en móvil */
  toggleMobileAside: () => void;
  /** @method closeMobileAside - Cierra el aside de iconos en móvil */
  closeMobileAside: () => void;
  /** @method resetLayout - Restaura el estado inicial de toda la interfaz */
  resetLayout: () => void;
};

/**
 * @constant INITIAL_STATE
 * @description Valores por defecto de la interfaz al iniciar el sistema
 */
const INITIAL_STATE: LayoutState = {
  isOpen: false,
  activeModuleId: null,
  isProfileDrawerOpen: false,
  isNotificationDrawerOpen: false,
  isMobileAsideOpen: false,
  locale: "es",
  currency: "USD"
};

/**
 * @constant STORAGE_KEY
 * @description Clave única para persistencia en LocalStorage
 */
const STORAGE_KEY = "layout-storage";

/**
 * @constant coreLayout
 * @description Store maestro con persistencia selectiva para el Layout del Dashboard
 */
export const coreLayout = create<LayoutState & LayoutActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      /** Lógica de navegación principal */
      openDrawer: (moduleId) => {
        set({ activeModuleId: moduleId, isOpen: true });
      },

      closeDrawer: () => {
        set({ isOpen: false, activeModuleId: null });
      },

      toggleDrawer: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      toggleModule: (moduleId) => {
        /** 1. Obtener estado actual mediante get() */
        const { isOpen, activeModuleId } = get();

        /** 2. Si ya está abierto con el mismo módulo: cerrar */
        if (isOpen && activeModuleId === moduleId) {
          set({ isOpen: false, activeModuleId: null });
        } else {
          /** 3. Caso contrario: abrir con el nuevo módulo */
          set({ activeModuleId: moduleId, isOpen: true });
        }
      },

      /** Lógica de Paneles Laterales (Drawers) */
      openProfileDrawer: () => {
        set({ isProfileDrawerOpen: true });
      },

      closeProfileDrawer: () => {
        set({ isProfileDrawerOpen: false });
      },

      openNotificationDrawer: () => {
        set({ isNotificationDrawerOpen: true });
      },

      closeNotificationDrawer: () => {
        set({ isNotificationDrawerOpen: false });
      },

      /** Lógica de Preferencias Regionales */
      setLocale: (locale) => {
        set({ locale });
      },

      setCurrency: (currency) => {
        set({ currency });
      },

      /** Lógica de aside móvil */
      toggleMobileAside: () => {
        set((state) => ({ isMobileAsideOpen: !state.isMobileAsideOpen }));
      },

      closeMobileAside: () => {
        set({ isMobileAsideOpen: false });
      },

      /** Limpieza de estado */
      resetLayout: () => {
        set(INITIAL_STATE);
      }
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      /**
       * skipHydration: NO leer localStorage en la creación del store.
       * En SSR el servidor renderiza con los valores por defecto (locale "es"); si el
       * cliente leyera localStorage en el primer render, el árbol diferiría del servidor
       * y React abortaría la hidratación (pantalla en blanco). La rehidratación se dispara
       * manualmente tras el montaje (App.tsx → coreLayout.persist.rehydrate()).
       */
      skipHydration: true,
      /** Persistencia selectiva: solo guardar preferencias críticas del usuario */
      partialize: (state) => ({
        isOpen: state.isOpen,
        activeModuleId: state.activeModuleId,
        locale: state.locale,
        currency: state.currency
      })
    }
  )
);

/** @export default - Acceso compatible con importación directa del store */
export default coreLayout;
