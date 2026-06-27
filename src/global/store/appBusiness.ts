/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/store/appBusiness.ts
 * @description Store global con los datos de la app de negocio
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Carga los datos de apps_business para la app identificada por VITE_APP_BUSINESS_ID.
 * Toda la configuracion (SEO, branding, landing, legal, social, emails, settings)
 * vive en una sola tabla y un solo store. Se carga una vez al iniciar la app.
 */

/** @import Zustand */
import { create } from "zustand";

/**
 * @interface AppBusiness
 * @description Datos completos de la app de negocio (tabla apps_business)
 */
export interface AppBusiness {
  id: string;
  slug: string;
  is_active: boolean;
  display_order: number | null;
  seo: Record<string, Record<string, string>>;
  legal: Record<string, Record<string, string>>;
  branding: Record<string, string>;
  domains: Record<string, unknown>;
  analytics: Record<string, string>;
  landing: Record<string, unknown>;
  social: Record<string, string>;
  emails: Record<string, string>;
  settings: Record<string, unknown>;
  enabled_modules: string[];
  configuration: Record<string, unknown>;
  features: Record<string, unknown>;
}

/**
 * @interface AppModule
 * @description Modulo del sistema con traducciones SEO (de apps_modules)
 */
export interface AppModule {
  id: string;
  slug: string;
  is_active: boolean;
  translations: Record<string, { name?: string; description?: string; keywords?: string; og_title?: string }>;
}

/**
 * @interface AppBusinessState
 * @description Estado del store
 */
interface AppBusinessState {
  /** @property {AppBusiness | null} app - Datos de la app de negocio */
  app: AppBusiness | null;
  /** @property {boolean} loaded - Si los datos ya se cargaron */
  loaded: boolean;
  /** @property {boolean} loading - Si esta cargando */
  loading: boolean;
  /** @property {string | null} error - Error de carga */
  error: string | null;
  /** @property {AppModule[]} modules - Modulos del sistema con traducciones SEO */
  modules: AppModule[];
  /** @method setApp - Establece los datos de la app */
  setApp: (app: AppBusiness) => void;
  /** @method setModules - Establece los modulos */
  setModules: (modules: AppModule[]) => void;
  /** @method setLoaded - Marca como cargado */
  setLoaded: () => void;
  /** @method setLoading - Establece estado de carga */
  setLoading: (loading: boolean) => void;
  /** @method setError - Establece error */
  setError: (error: string) => void;
}

/**
 * @constant useAppBusiness
 * @description Store de Zustand para la app de negocio actual
 */
export const useAppBusiness = create<AppBusinessState>((set) => ({
  app: null,
  modules: [],
  loaded: false,
  loading: false,
  error: null,
  setApp: (app) => set({ app }),
  setModules: (modules) => set({ modules }),
  setLoaded: () => set({ loaded: true, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false })
}));

export default useAppBusiness;
