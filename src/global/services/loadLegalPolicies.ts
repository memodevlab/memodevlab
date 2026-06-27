/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/global/services/loadLegalPolicies.ts
 * @description Carga las políticas legales desde Supabase (PostgREST, lectura pública)
 * @author Guillermo Corredor
 *
 * @overview
 * Se ejecuta en el servidor (entry-server) antes de renderToString para que el HTML
 * de SSR/SSG ya incluya el contenido legal, y como fallback en el cliente. Pobla el
 * store useLegalPolicies. Idempotente: si ya está cargado, devuelve lo cacheado.
 */

/** @import Store */
import { useLegalPolicies } from "@store/legalPolicies";
import type { PoliciesMap, LegalTranslations } from "@store/legalPolicies";

/**
 * @function loadLegalPolicies
 * @description Trae legal_policies (publicadas) y las guarda en el store
 * @returns {Promise<PoliciesMap>} Políticas indexadas por slug
 */
export async function loadLegalPolicies(): Promise<PoliciesMap> {
  const state = useLegalPolicies.getState();
  if (state.loaded) return state.policies;

  const baseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
  if (!baseUrl || !anon) return {};

  const url = `${baseUrl}/rest/v1/legal_policies?select=slug,translations&is_published=eq.true`;

  try {
    const res = await fetch(url, { headers: { apikey: anon, Authorization: `Bearer ${anon}` } });
    if (!res.ok) return {};
    const rows = (await res.json()) as { slug: string; translations: LegalTranslations }[];
    const map: PoliciesMap = {};
    for (const row of rows) map[row.slug] = row.translations;
    state.setPolicies(map);
    return map;
  } catch {
    return {};
  }
}
