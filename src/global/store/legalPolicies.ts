/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/store/legalPolicies.ts
 * @description Store de políticas legales (cargadas en SSR, hidratadas en cliente)
 * @author Guillermo Corredor
 *
 * @overview
 * Guarda las políticas de legal_policies indexadas por slug. En SSR/SSG el servidor
 * las carga antes de renderizar y las serializa en `window.__LEGAL_POLICIES__`; este
 * store se inicializa de ahí en el cliente para hidratar sin parpadeo.
 */

/** @import Zustand */
import { create } from "zustand";

/** @type LegalTranslations - title + content por idioma de una política */
export type LegalTranslations = Record<string, { title?: string; content?: string }>;

/** @type PoliciesMap - políticas indexadas por slug */
export type PoliciesMap = Record<string, LegalTranslations>;

declare global {
  interface Window {
    __LEGAL_POLICIES__?: PoliciesMap;
  }
}

/**
 * @interface LegalState
 * @description Estado del store de políticas legales
 */
interface LegalState {
  policies: PoliciesMap;
  loaded: boolean;
  setPolicies: (policies: PoliciesMap) => void;
}

/** Datos serializados por el servidor (presentes solo en el navegador) */
const initial: PoliciesMap = typeof window !== "undefined" && window.__LEGAL_POLICIES__ ? window.__LEGAL_POLICIES__ : {};

/**
 * @constant useLegalPolicies
 * @description Store de Zustand con las políticas legales
 */
export const useLegalPolicies = create<LegalState>((set) => ({
  policies: initial,
  loaded: Object.keys(initial).length > 0,
  setPolicies: (policies) => set({ policies, loaded: true })
}));

export default useLegalPolicies;
