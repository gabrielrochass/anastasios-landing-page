import Image from "next/image";
import Link from "next/link";
import {
  legalLinks,
  navLinks,
  serviceLinks,
  siteConfig,
} from "@/lib/site-config";
import { WhatsappButton } from "@/components/layout/whatsapp-button";

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse text-ink-on-inverse">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="flex items-center gap-2.5 font-bold tracking-tight">
            <Image
              src="/images/logo-mark.png"
              alt=""
              aria-hidden
              width={40}
              height={40}
              className="size-10 shrink-0"
            />
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted-on-inverse">
            {siteConfig.description}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted-on-inverse">
            <span>
              {siteConfig.address.addressLocality}/
              {siteConfig.address.addressRegion}
            </span>
            <span>{siteConfig.email}</span>
          </p>
          <div className="mt-5">
            <WhatsappButton context="footer" />
          </div>
        </div>
        <nav aria-label="Serviços">
          <p className="text-eyebrow text-petrol-300">Serviços</p>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-muted-on-inverse transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className="text-eyebrow text-petrol-300">Institucional</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks
              .filter((link) => link.label !== "Serviços")
              .concat(legalLinks)
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted-on-inverse transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-petrol-900">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-petrol-300 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.legalName}. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
