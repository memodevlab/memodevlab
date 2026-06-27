/**
 * @project MemoDevLab
 * @file src/atoms/layout-header/HeaderSystem.tsx
 * @description Botón de configuración regional (idioma y moneda) en el DashboardHeader
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Átomo que renderiza el icono de globo en la barra superior del dashboard.
 * Al hacer click abre el SystemPopover que permite seleccionar idioma y moneda.
 * Se posiciona en la sección derecha del header antes del icono de notificaciones.
 */

/** @import React y Tipados */
import { useState } from "react";

/** @import Motor de traducción i18n */
import { useTranslation } from "react-i18next";

/** @import Componentes Mantine */
import { ActionIcon, Popover } from "@mantine/core";

/** @import Iconos */
import { HiOutlineGlobeAlt } from "react-icons/hi2";

/** @import Componente del Popover */
import SystemPopover from "@atoms/layout-system/SystemPopover";

/**
 * @function HeaderSystem
 * @description Renderiza el botón de configuración regional que abre el SystemPopover
 * @returns {JSX.Element} ActionIcon con Popover de idioma y moneda
 */
export default function HeaderSystem() {
  /** Hook de traducción para aria-labels */
  const { t } = useTranslation();

  /** Estado local de apertura del popover */
  const [opened, setOpened] = useState(false);

  /** Renderizar botón de configuración regional con popover */
  return (
    <Popover opened={opened} onChange={setOpened} position="bottom-end" offset={8} shadow="lg" radius="lg" width={300}>
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={() => setOpened((o) => !o)}
          aria-label={t("header.system_aria")}
        >
          <HiOutlineGlobeAlt size={22} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown p={0} className="border border-gray-100 overflow-hidden">
        <SystemPopover />
      </Popover.Dropdown>
    </Popover>
  );
}
