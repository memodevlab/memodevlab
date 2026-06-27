/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-footer/FooterTerms.tsx
 * @description Atomo de enlace a terminos y condiciones
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Renderiza un enlace interactivo a la pagina de terminos y condiciones.
 * Navega a /legal/terms usando React Router.
 */

/** @import Motor de traduccion i18n */
import { useTranslation } from "react-i18next";

/** @import React Router */
import { useNavigate } from "react-router-dom";

/** @import Componentes Mantine */
import { Text, Group } from "@mantine/core";

/** @import Iconos */
import { HiOutlineDocumentText } from "react-icons/hi2";

/**
 * @function FooterTerms
 * @description Renderiza el enlace interactivo con icono a los terminos de uso
 */
export default function FooterTerms() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Group gap={4} className="cursor-pointer group select-none" onClick={() => navigate("/legal/terms")}>
      <HiOutlineDocumentText size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
      <Text size="xs" c="gray.6" fw={500} className="group-hover:text-gray-600 transition-colors">
        {t("footer.terms")}
      </Text>
    </Group>
  );
}
