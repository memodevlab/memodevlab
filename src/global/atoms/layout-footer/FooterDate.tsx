/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-footer/FooterDate.tsx
 * @description Atomo de copyright con ano dinamico y nombre de app
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Renderiza el texto de copyright con el ano actual y nombre de la app.
 * Acepta appName como prop opcional; si no se pasa, lo lee del store.
 */

/** @import Motor de traduccion i18n */
import { useTranslation } from "react-i18next";

/** @import Componentes Mantine */
import { Text } from "@mantine/core";

/** @import Store de la app de negocio */
import useAppBusiness from "@store/appBusiness";

interface FooterDateProps {
  appName?: string;
}

/**
 * @function FooterDate
 * @description Renderiza el texto de copyright con ano dinamico y nombre de la app
 */
export default function FooterDate({ appName }: Readonly<FooterDateProps> = {}) {
  const { t } = useTranslation();
  const storeApp = useAppBusiness((s) => s.app);

  const name = appName || storeApp?.seo?.es?.title?.split(" - ")[0] || storeApp?.slug || "MemoDevLab";

  return (
    <Text size="xs" c="gray.6" fw={500}>
      {t("footer.copyright", { year: new Date().getFullYear(), appName: name })}
    </Text>
  );
}
