"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-11 border-rule-strong text-content md:hidden"
          aria-label="Abrir menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      {/* O painel é sempre modo doc, mesmo aberto por cima do herói escuro.
          Menu é leitura, não cena. */}
      <SheetContent side="right" data-mode="doc" className="bg-surface">
        <SheetHeader>
          <SheetTitle className="font-serif text-content">Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Principal" className="px-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-rule">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-mono text-xs uppercase tracking-[0.14em] text-content"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsappButton
            context="mobile-nav"
            variant="solid"
            className="mt-6 w-full justify-center"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
