/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-system/SystemLanguage.tsx
 * @description Selector de idioma con banderas para el SystemPopover
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Átomo que renderiza la lista de idiomas disponibles (Español / Inglés)
 * con banderas emoji como identificador visual. El idioma activo se resalta
 * con fondo púrpura sutil, borde y punto indicador. La selección se persiste
 * en el store coreLayout.
 */

/** @import Motor de traducción i18n */
import { useTranslation } from "react-i18next";

/** @import Store del Layout */
import { coreLayout } from "@store/coreLayout";

/**
 * @constant LANGUAGES
 * @description Opciones de idioma disponibles con banderas emoji
 */
const LANGUAGES = [
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "en", label: "English", flag: "🇺🇸" }
] as const;

/**
 * @function SystemLanguage
 * @description Renderiza la sección de selección de idioma con banderas
 * @returns {JSX.Element} Div con título y lista de botones de idioma
 */
export default function SystemLanguage() {
  /** Hook de traducción para etiqueta de sección */
  const { t } = useTranslation();

  /** @store coreLayout - Idioma seleccionado y acción de cambio */
  const locale = coreLayout((s) => s.locale);
  const setLocale = coreLayout((s) => s.setLocale);

  /** Renderizar sección de selección de idioma con banderas */
  return (
    <div className="px-4 py-2">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t("system.language_label")}</p>
      <div className="space-y-1">
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => setLocale(lang.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-purple-50 text-gray-900 border border-purple-100"
                  : "bg-white text-gray-600 border border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {/* Bandera */}
              <span className="text-xl leading-none">{lang.flag}</span>
              {/* Label */}
              <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{lang.label}</span>
              {/* Indicador activo */}
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-purple-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
