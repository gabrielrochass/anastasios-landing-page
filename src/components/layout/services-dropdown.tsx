"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { serviceLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Dropdown de Serviços no desktop — paridade com o submenu do mobile. */
export function ServicesDropdown({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active = pathname.startsWith("/servicos");

  function openNow() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <li
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          light
            ? "text-petrol-100 hover:bg-white/10 hover:text-white"
            : "text-ink-muted hover:bg-petrol-50 hover:text-petrol-700",
          active && (light ? "text-white" : "text-petrol-700"),
        )}
      >
        Serviços
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          role="menu"
          aria-label="Serviços"
          className="absolute left-0 top-full mt-1 w-64 rounded-lg border border-neutral-200 bg-surface-raised p-1.5 shadow-card-hover"
        >
          {serviceLinks.map((service) => (
            <li key={service.href} role="none">
              <Link
                role="menuitem"
                href={service.href}
                className="block rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-petrol-50 hover:text-petrol-700"
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
