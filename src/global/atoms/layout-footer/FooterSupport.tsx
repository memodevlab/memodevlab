/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-footer/FooterSupport.tsx
 * @description Atomo de enlace a centro de ayuda/soporte
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Renderiza un enlace interactivo al centro de ayuda y soporte.
 * Navega a /contact para mostrar el formulario de contacto.
 */

/** @import Motor de traduccion i18n */
import { useTranslation } from "react-i18next";

/** @import React Router */
import { useNavigate } from "react-router-dom";

/** @import Componentes Mantine */
import { Text, Group } from "@mantine/core";

/** @import Iconos */
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

/**
 * @function FooterSupport
 * @description Renderiza el enlace interactivo al centro de soporte
 */
export default function FooterSupport() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Group gap={4} className="cursor-pointer group select-none" onClick={() => navigate("/contact")}>
      <HiOutlineQuestionMarkCircle size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
      <Text size="xs" c="gray.6" fw={500} className="group-hover:text-gray-600 transition-colors">
        {t("footer.support")}
      </Text>
    </Group>
  );
}
