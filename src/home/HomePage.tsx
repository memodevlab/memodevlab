/**
 * @project MemoDevLab Web (Vite SSR)
 * @file src/home/HomePage.tsx
 * @description Landing (hero): logo al centro, servicios alrededor y CTA a contacto
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Hero único del sitio: el logo de MemoDevLab al centro, rodeado por los servicios
 * que ofrecemos (software, web, móvil, IA, contenido, automatización) y un enlace a
 * la página de contacto. Bilingüe (es/en) según el idioma del layout.
 */

/** @import React Router */
import { Link } from "react-router-dom";

/** @import Iconos */
import {
  HiOutlineCodeBracket,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineBolt,
  HiOutlineArrowRight
} from "react-icons/hi2";
import type { IconType } from "react-icons";

/** @import Layout y store de idioma */
import LayoutHome from "./layout/LayoutHome";
import { coreLayout } from "@store/coreLayout";

/** @import Logo */
import logo from "@images/logo-memodevlab.svg";

/**
 * @interface Service
 * @description Servicio mostrado alrededor del logo
 */
interface Service {
  icon: IconType;
  title: string;
  desc: string;
}

/** @constant CONTENT - Textos del hero por idioma */
const CONTENT: Record<string, { title: string; subtitle: string; cta: string; left: Service[]; right: Service[] }> = {
  es: {
    title: "Construimos software, apps y soluciones con IA",
    subtitle: "Estudio de desarrollo que convierte tus ideas en productos digitales.",
    cta: "Contáctanos",
    left: [
      { icon: HiOutlineCodeBracket, title: "Software a medida", desc: "Sistemas y plataformas para tu negocio" },
      { icon: HiOutlineGlobeAlt, title: "Aplicaciones web", desc: "Webs rápidas, modernas y escalables" },
      { icon: HiOutlineDevicePhoneMobile, title: "Apps móviles", desc: "Aplicaciones iOS y Android" }
    ],
    right: [
      { icon: HiOutlineSparkles, title: "Soluciones con IA", desc: "Integramos inteligencia artificial" },
      { icon: HiOutlineDocumentText, title: "Creación de contenido", desc: "Contenido digital para tu marca" },
      { icon: HiOutlineBolt, title: "Automatización", desc: "Procesos que trabajan por ti" }
    ]
  },
  en: {
    title: "We build software, apps and AI solutions",
    subtitle: "A development studio that turns your ideas into digital products.",
    cta: "Contact us",
    left: [
      { icon: HiOutlineCodeBracket, title: "Custom software", desc: "Systems and platforms for your business" },
      { icon: HiOutlineGlobeAlt, title: "Web applications", desc: "Fast, modern and scalable websites" },
      { icon: HiOutlineDevicePhoneMobile, title: "Mobile apps", desc: "iOS and Android applications" }
    ],
    right: [
      { icon: HiOutlineSparkles, title: "AI solutions", desc: "We integrate artificial intelligence" },
      { icon: HiOutlineDocumentText, title: "Content creation", desc: "Digital content for your brand" },
      { icon: HiOutlineBolt, title: "Automation", desc: "Processes that work for you" }
    ]
  }
};

/**
 * @function ServiceItem
 * @description Tarjeta de un servicio. `align` orienta el icono hacia el centro (logo).
 */
function ServiceItem({ service, align }: Readonly<{ service: Service; align: "left" | "right" }>) {
  const Icon = service.icon;
  const reverse = align === "left";
  return (
    <div className={`flex items-center gap-3 ${reverse ? "md:flex-row-reverse md:text-right" : "md:text-left"}`}>
      <span className="shrink-0 grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
        <Icon size={24} />
      </span>
      <div>
        <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">{service.title}</p>
        <p className="text-gray-500 text-xs sm:text-sm leading-snug">{service.desc}</p>
      </div>
    </div>
  );
}

/**
 * @function HomePage
 * @description Renderiza el hero con el logo al centro y los servicios alrededor
 */
export default function HomePage() {
  const locale = coreLayout((s) => s.locale);
  const c = CONTENT[locale] ?? CONTENT.es;

  return (
    <LayoutHome>
      <section
        className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16"
        aria-labelledby="hero-title"
      >
        {/* Glow morado de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl"
        />

        {/* Logo + servicios alrededor */}
        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-6">
            {/* Servicios izquierda */}
            <div className="order-2 flex flex-col gap-7 md:order-1 md:items-end">
              {c.left.map((s) => (
                <ServiceItem key={s.title} service={s} align="left" />
              ))}
            </div>

            {/* Logo central */}
            <div className="order-1 flex justify-center md:order-2">
              <img
                src={logo}
                alt="MemoDevLab"
                className="h-44 w-44 drop-shadow-2xl sm:h-52 sm:w-52 md:h-64 md:w-64"
              />
            </div>

            {/* Servicios derecha */}
            <div className="order-3 flex flex-col gap-7 md:items-start">
              {c.right.map((s) => (
                <ServiceItem key={s.title} service={s} align="right" />
              ))}
            </div>
          </div>
        </div>

        {/* Título + CTA a contacto */}
        <div className="relative mt-14 max-w-2xl text-center">
          <h1 id="hero-title" className="text-3xl font-black tracking-tight text-gray-800 sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">{c.subtitle}</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
          >
            {c.cta}
            <HiOutlineArrowRight size={20} />
          </Link>
        </div>
      </section>
    </LayoutHome>
  );
}
