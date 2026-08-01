"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * A home abre com o herói em modo ocean, então a navbar entra transparente por
 * cima do mar e vira sólida ao rolar. As demais rotas são modo doc do topo,
 * então a navbar é sólida desde o começo.
 */
function isOverlayRoute(pathname: string): boolean {
  return pathname === "/";
}

export function SiteHeader() {
  const pathname = usePathname();
  const overlay = isOverlayRoute(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlay && !scrolled;

  return (
    <header
      // Enquanto está sobre o herói escuro, o header inteiro é uma ilha em
      // modo ocean. Assim o anel de foco e o texto leem a mesma paleta do que
      // está atrás, sem nenhum componente precisar saber disso.
      data-mode={transparent ? "ocean" : undefined}
      className={cn(
        "inset-x-0 top-0 z-40 transition-colors duration-300",
        overlay ? "fixed" : "sticky",
        transparent
          ? "bg-linear-to-b from-ocean-950/85 via-ocean-950/45 to-transparent"
          : "border-b border-rule bg-surface/90 backdrop-blur-sm",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-content transition-colors"
        >
          <span className="font-serif text-xl tracking-tight">
            {siteConfig.name}
          </span>
          <span
            aria-hidden
            className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-content-muted sm:inline"
          >
            comex
          </span>
        </Link>
        <MainNav />
        <div className="flex items-center gap-2">
          <WhatsappButton
            context="header"
            className="hidden sm:inline-flex"
            label="Falar no WhatsApp"
          />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
