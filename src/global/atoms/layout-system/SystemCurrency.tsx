/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-system/SystemCurrency.tsx
 * @description Selector de moneda para el SystemPopover
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Átomo que renderiza la lista de monedas disponibles (USD / COP)
 * con símbolo en badge gris como identificador visual. La moneda activa se resalta
 * con fondo púrpura sutil, borde y punto indicador. La selección se persiste
 * en el store coreLayout.
 */

/** @import Motor de traducción i18n */
import { useTranslation } from "react-i18next";

/** @import Store del Layout */
import { coreLayout } from "@store/coreLayout";

/**
 * @constant CURRENCIES
 * @description Opciones de moneda disponibles con símbolo
 */
const CURRENCIES = [
  { id: "USD", label: "Dólar (USD)", symbol: "$" },
  { id: "COP", label: "Pesos (COP)", symbol: "$" }
] as const;

/**
 * @function SystemCurrency
 * @description Renderiza la sección de selección de moneda con símbolos
 * @returns {JSX.Element} Div con título y lista de botones de moneda
 */
export default function SystemCurrency() {
  /** Hook de traducción para etiqueta de sección */
  const { t } = useTranslation();

  /** @store coreLayout - Moneda seleccionada y acción de cambio */
  const currency = coreLayout((s) => s.currency);
  const setCurrency = coreLayout((s) => s.setCurrency);

  /** Renderizar sección de selección de moneda con símbolos */
  return (
    <div className="px-4 py-2">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t("system.currency_label")}</p>
      <div className="space-y-1">
        {CURRENCIES.map((curr) => {
          const isActive = currency === curr.id;
          return (
            <button
              key={curr.id}
              type="button"
              onClick={() => setCurrency(curr.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-purple-50 text-gray-900 border border-purple-100"
                  : "bg-white text-gray-600 border border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {/* Símbolo de moneda */}
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700">
                {curr.symbol}
              </span>
              {/* Label */}
              <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{curr.label}</span>
              {/* Indicador activo */}
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-purple-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
