/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/legal/LegalPage.tsx
 * @description Página de textos legales desde la tabla legal_policies (Supabase)
 * @author Guillermo Corredor
 * @created 04/04/2026
 *
 * @overview
 * Renderiza el contenido legal (términos, privacidad, cookies, reembolso) según el
 * parámetro de ruta ?section=terms|privacy|cookies|refund. Los textos se cargan de la
 * tabla public.legal_policies (lectura pública anon, solo políticas publicadas).
 */

/** @import React Router */
import { useParams, useSearchParams, Link } from "react-router-dom";

/** @import Layout de la web pública */
import LayoutHome from "@home/layout/LayoutHome";

/** @import Stores (idioma + políticas legales cargadas en SSR) */
import { coreLayout } from "@store/coreLayout";
import { useLegalPolicies } from "@store/legalPolicies";

/** @constant Secciones legales (coinciden con legal_policies.slug) */
const SECTIONS = ["terms", "privacy", "cookies", "refund"] as const;
type Section = (typeof SECTIONS)[number];

/** @constant Etiquetas de respaldo del nav (antes de cargar de la BD) */
const LABELS: Record<string, Record<Section, string>> = {
  es: {
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
    cookies: "Política de cookies",
    refund: "Política de reembolso"
  },
  en: {
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    refund: "Refund Policy"
  }
};

/** @constant Textos de UI por idioma */
const UI: Record<string, { empty: string; hint: string }> = {
  es: { empty: "Contenido no disponible.", hint: "Pronto publicaremos esta sección." },
  en: { empty: "Content not available.", hint: "We will publish this section soon." }
};

/**
 * @function LegalPage
 * @description Renderiza el contenido legal según la sección seleccionada
 */
export default function LegalPage() {
  const { section: routeSection } = useParams();
  const [searchParams] = useSearchParams();
  const locale = coreLayout((s) => s.locale);

  /** Políticas cargadas en SSR (serializadas) o en el cliente como fallback */
  const policies = useLegalPolicies((s) => s.policies);

  /** Sección: desde la ruta (/legal/privacy) o, por compatibilidad, ?section=privacy */
  const raw = routeSection || searchParams.get("section") || "terms";
  const section = (SECTIONS.includes(raw as Section) ? raw : "terms") as Section;
  const ui = UI[locale] ?? UI.es;
  const labels = LABELS[locale] ?? LABELS.es;

  /** Traducción de una política para el idioma activo (con fallback a es) */
  const trFor = (slug: Section) => policies[slug]?.[locale] ?? policies[slug]?.es;
  const activeTr = trFor(section);
  const activeTitle = activeTr?.title ?? labels[section];

  return (
    <LayoutHome>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navegación entre secciones legales */}
        <nav className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              to={`/legal/${s}`}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                section === s ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {trFor(s)?.title ?? labels[s]}
            </Link>
          ))}
        </nav>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">{activeTitle}</h1>
        <p className="text-sm text-gray-400 mb-8">MemoDevLab</p>

        {/* Contenido */}
        {activeTr?.content ? (
          <div
            className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600"
            dangerouslySetInnerHTML={{ __html: activeTr.content }}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{ui.empty}</p>
            <p className="text-gray-300 text-sm mt-2">{ui.hint}</p>
          </div>
        )}
      </div>
    </LayoutHome>
  );
}
