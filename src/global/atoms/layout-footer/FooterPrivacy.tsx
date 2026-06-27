/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-footer/FooterPrivacy.tsx
 * @description Atomo de enlace a politicas de privacidad
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Renderiza un enlace interactivo a la pagina de politicas de privacidad.
 * Navega a /legal/privacy usando React Router.
 */

/** @import Motor de traduccion i18n */
import { useTranslation } from "react-i18next";

/** @import React Router */
import { useNavigate } from "react-router-dom";

/** @import Componentes Mantine */
import { Text, Group } from "@mantine/core";

/** @import Iconos */
import { HiOutlineShieldCheck } from "react-icons/hi2";

/**
 * @function FooterPrivacy
 * @description Renderiza el enlace interactivo con icono a las politicas de privacidad
 */
export default function FooterPrivacy() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Group gap={4} className="cursor-pointer group select-none" onClick={() => navigate("/legal/privacy")}>
      <HiOutlineShieldCheck size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
      <Text size="xs" c="gray.6" fw={500} className="group-hover:text-gray-600 transition-colors">
        {t("footer.privacy")}
      </Text>
    </Group>
  );
}
