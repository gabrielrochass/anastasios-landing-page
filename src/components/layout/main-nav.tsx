"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Navegação de desktop. A landing é uma página só, então quase tudo aqui é
 * âncora. A única rota separada é o Painel de Inteligência.
 *
 * Sem prop `light`: o header declara data-mode quando está sobre o herói e a
 * herança de token cuida da cor. Um componente a menos sabendo de tema.
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className="hidden md:block">
      <ul className="flex items-center gap-7">
        {navLinks.map((link) => {
          const isRoute = !link.href.includes("#");
          const current = isRoute && pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                  current
                    ? "text-accent"
                    : "text-content-muted hover:text-content",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
