"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Rotas cujo hero é escuro (PhotoHero) — a navbar entra transparente por
 * cima da foto e vira sólida ao rolar. Demais rotas: navbar sólida sempre. */
function isOverlayRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/servicos") ||
    pathname === "/sobre" ||
    pathname === "/contato"
  );
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

  // Transparente só quando está sobre o hero escuro e no topo.
  const transparent = overlay && !scrolled;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-40 transition-colors duration-300",
        overlay ? "fixed" : "sticky",
        transparent
          ? "bg-linear-to-b from-petrol-950/85 via-petrol-950/50 to-transparent"
          : "border-b border-neutral-200 bg-surface/90 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 font-bold tracking-tight transition-colors",
            transparent ? "text-white" : "text-petrol-700",
          )}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            aria-hidden
            width={32}
            height={32}
            priority
            className="size-8 shrink-0"
          />
          {siteConfig.name}
        </Link>
        <MainNav light={transparent} />
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden bg-orange-400 text-ink hover:bg-orange-500 sm:inline-flex"
          >
            <Link href="/contato">Fale com um especialista</Link>
          </Button>
          <MobileNav light={transparent} />
        </div>
      </div>
    </header>
  );
}
