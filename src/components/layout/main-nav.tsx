"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ServicesDropdown } from "@/components/layout/services-dropdown";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site-config";

/** `light` = renderizado sobre hero escuro transparente (texto claro). */
export function MainNav({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const rest = navLinks.filter((link) => link.label !== "Serviços");

  return (
    <nav aria-label="Navegação principal" className="hidden md:block">
      <ul className="flex items-center gap-1">
        <ServicesDropdown light={light} />
        {rest.map((link) => {
          const isActive = pathname.startsWith(
            link.href.split("/").slice(0, 2).join("/"),
          );
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  light
                    ? "text-petrol-100 hover:bg-white/10 hover:text-white aria-[current=page]:text-white"
                    : "text-ink-muted hover:bg-petrol-50 hover:text-petrol-700 aria-[current=page]:text-petrol-700",
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
