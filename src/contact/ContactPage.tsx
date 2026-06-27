/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/contact/ContactPage.tsx
 * @description Página de contacto: formulario que crea un lead vía Edge Function
 * @author Guillermo Corredor
 * @created 04/04/2026
 *
 * @overview
 * Formulario público (nombre, email, teléfono, empresa, asunto, mensaje). Al enviar hace
 * POST a la Edge Function `memodevlab-crm-contact`, que crea el lead en el CRM, guarda el
 * envío y el mensaje. Captura locale, URL de origen y parámetros UTM para atribución.
 */

/** @import React */
import { useState } from "react";

/** @import Motor de traducción i18n */
import { useTranslation } from "react-i18next";

/** @import Layout de la web pública */
import LayoutHome from "@home/layout/LayoutHome";

/** @import Store del layout (idioma) */
import { coreLayout } from "@store/coreLayout";

/** @constant CONTACT_ENDPOINT - Edge Function que recibe el formulario */
const CONTACT_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/memodevlab-crm-contact`;

/** @constant ANON_KEY - apikey pública para invocar la función */
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * @function collectUtm
 * @description Extrae parámetros UTM de la URL actual (solo en cliente)
 */
function collectUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = params.get(key);
    if (value) utm[key.replace("utm_", "")] = value;
  }
  return utm;
}

/**
 * @function ContactPage
 * @description Renderiza el formulario de contacto y lo envía a la Edge Function
 */
export default function ContactPage() {
  const { t } = useTranslation();
  const locale = coreLayout((s) => s.locale);

  /** Estado del formulario */
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  /** Actualizar campo del formulario */
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /** Validación: nombre, mensaje, y al menos email o teléfono */
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isValid =
    form.name.trim().length >= 2 && form.message.trim().length >= 10 && (emailOk || form.phone.trim().length >= 7);

  /** Enviar formulario a la Edge Function */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || sending) return;

    setSending(true);
    setError(false);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: ANON_KEY },
        body: JSON.stringify({
          full_name: form.name.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          company_name: form.company.trim() || undefined,
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
          locale,
          source_url: typeof window !== "undefined" ? window.location.href : undefined,
          utm: collectUtm()
        })
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <LayoutHome>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t("contact.title")}</h1>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="text-center py-16 bg-green-50 rounded-2xl border border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{t("contact.sent_title")}</h2>
                <p className="text-gray-500">{t("contact.sent_message")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Banner de error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-bold text-red-700">{t("contact.error_title")}</p>
                    <p className="text-sm text-red-600">{t("contact.error_message")}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      placeholder={t("contact.name_placeholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="email@ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                      {t("contact.phone")}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder={t("contact.phone_placeholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder={t("contact.subject_placeholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-600 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                    {t("contact.message")}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    required
                    rows={6}
                    placeholder={t("contact.message_placeholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-600 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid || sending}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            )}
          </div>

          {/* Info de contacto */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                {t("contact.info_title")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t("contact.response_time", { appName: "MemoDevLab" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
}
