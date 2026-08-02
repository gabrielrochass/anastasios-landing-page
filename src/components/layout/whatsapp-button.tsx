"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * O WhatsApp é o canal único de contato do site, então este botão é peça
 * central, não acessório.
 *
 * Sem analytics: o botão só abre a conversa. Nenhum evento é disparado
 * e nenhum dado sai do navegador.
 */

interface WhatsappButtonProps {
  message?: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site e quero estruturar uma operação de importação.";

export function WhatsappButton({
  message = DEFAULT_MESSAGE,
  label = "Falar no WhatsApp",
  variant = "outline",
  className,
}: WhatsappButtonProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // min-h-11 são os 44px de alvo de toque. Não é o mínimo da WCAG 2.2,
        // que é 24, mas é o número que evita erro de polegar de verdade.
        "inline-flex min-h-11 items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-colors",
        variant === "solid"
          ? "bg-accent text-accent-contrast hover:opacity-90"
          : "border border-rule-strong text-content hover:bg-surface-raised",
        className,
      )}
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden />
      {label}
    </a>
  );
}
