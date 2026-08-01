"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * O WhatsApp é o canal único de contato do site, então este botão é peça
 * central, não acessório.
 *
 * O `context` é o que faz a analytics valer alguma coisa: sem ele sabemos
 * quantas conversas começaram, com ele sabemos qual argumento da página
 * converteu. Todo ponto de origem passa um contexto distinto.
 */

interface WhatsappButtonProps {
  /** Origem do clique: hero, credito, cta-final, flutuante, header */
  context: string;
  message?: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site e quero estruturar uma operação de importação.";

export function WhatsappButton({
  context,
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
      onClick={() => trackEvent("whatsapp_click", { context })}
      className={cn(
        // min-h-11 são os 44px de alvo de toque. Não é o mínimo da WCAG 2.2,
        // que é 24, mas é o número que evita erro de polegar de verdade.
        "inline-flex min-h-11 items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors",
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
