/**
 * @project MemoDevLab
 * @file src/global/atoms/layout-header/HeaderLogo.tsx
 * @description Logo corporativo del encabezado, dinamico desde apps_business
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Renderiza el logo de la app de negocio. Prioriza:
 * 1. apps_business.branding.logo_url (imagen configurada)
 * 2. Fallback tipografico con el nombre de la app desde seo.es.title
 */

/** @import Store de la app de negocio */
import useAppBusiness from "@store/appBusiness";

interface HeaderLogoProps {
  className?: string;
}

/**
 * @function HeaderLogo
 * @description Renderiza el logo de la app: imagen si existe, tipografico si no
 */
export default function HeaderLogo({ className = "" }: Readonly<HeaderLogoProps>) {
  const app = useAppBusiness((s) => s.app);

  const logoUrl = app?.branding?.logo_url || null;
  const appName = app?.seo?.es?.title?.split(" - ")[0] || app?.slug || "MemoDevLab";

  if (logoUrl) {
    return (
      <div className={`flex items-center ${className}`}>
        <img src={logoUrl} alt={appName} className="h-8 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
        {appName}
        <span className="text-purple-500 ml-0.5">.</span>
      </h1>
    </div>
  );
}
