/**
 * @project MemoDevLab
 * @file src/global/i18n/i18n.ts
 * @description Configuración e inicialización de i18next para la aplicación
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Inicializa i18next con react-i18next como binding de React.
 * Carga las traducciones de español (por defecto) e inglés.
 * Se sincroniza con el store coreLayout para respetar la preferencia
 * de idioma del usuario. La instancia se importa en main.tsx antes
 * de montar la aplicación.
 */

/** @import Librerías */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/** @import Traducciones */
import es from "./locales/es";
import en from "./locales/en";

/** @import Store del Layout (lectura inicial del locale persistido) */
import { coreLayout } from "@store/coreLayout";

/**
 * @constant savedLocale
 * @description Locale guardado en el store (persistido en localStorage)
 */
const savedLocale = coreLayout.getState().locale || "es";

/**
 * @function i18n.init
 * @description Inicializa i18next con recursos, idioma y configuración
 */
i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en }
  },
  lng: savedLocale,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false
  }
});

/**
 * @subscription coreLayout.subscribe
 * @description Sincroniza el idioma de i18next cuando cambia el locale en el store.
 * Escucha cambios en coreLayout y llama i18n.changeLanguage si el locale cambió.
 */
coreLayout.subscribe((state) => {
  if (state.locale !== i18n.language) {
    i18n.changeLanguage(state.locale);
  }
});

export default i18n;
