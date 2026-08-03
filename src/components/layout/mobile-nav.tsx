"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
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
        {/*
          Botão nativo, não a primitiva do shadcn. O bloco :root do shadcn
          mapeia background, border e input à paleta clara e NÃO segue o
          data-mode, então dentro do header em modo ocean a primitiva
          renderizava um quadrado branco vazio.
        */}
        <button
          type="button"
          aria-label="Abrir menu"
          className="border-rule-strong text-content hover:bg-surface-raised inline-flex size-11 items-center justify-center rounded-sm border bg-transparent transition-colors md:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </SheetTrigger>
      {/* O painel é sempre modo doc, mesmo aberto por cima do herói escuro.
          Menu é leitura, não cena. */}
      <SheetContent side="right" data-mode="doc" className="bg-surface">
        <SheetHeader>
          <SheetTitle className="text-content">Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Principal" className="px-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-rule border-b">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-content text-meta flex min-h-14 items-center font-mono tracking-[0.14em] uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsappButton
            variant="solid"
            className="mt-6 w-full justify-center"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
