"use client";

import { useMotionToggle } from "@/hooks/use-motion-preference";
import { cn } from "@/lib/utils";

/**
 * Botão de reduzir animações, no rodapé.
 *
 * Nem todo mundo sabe que a preferência existe no sistema operacional, e a
 * WCAG 2.2 SC 2.2.2 pede um mecanismo na própria página para qualquer coisa
 * que se move sozinha. Aqui isso vale para o mar do herói.
 *
 * Quando o sistema já pede movimento reduzido, o botão fica desabilitado e
 * explica o motivo, em vez de oferecer uma ação que não deveria funcionar.
 * Ligar o site de volta contra a preferência do sistema seria justamente o
 * comportamento errado.
 */
export function MotionToggle({ className }: { className?: string }) {
  const { reduced, systemLocked, toggle } = useMotionToggle();

  if (systemLocked) {
    return (
      <p className={cn("text-content-muted eyebrow", className)}>
        Animações reduzidas pela preferência do seu sistema.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className={cn(
        "text-content-muted hover:text-content eyebrow inline-flex min-h-11 items-center gap-2 transition-colors",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-3 w-6 rounded-full border transition-colors",
          reduced ? "border-accent bg-accent" : "border-rule-strong",
        )}
      >
        <span
          className={cn(
            "block size-2 translate-y-px rounded-full transition-transform",
            reduced
              ? "bg-accent-contrast translate-x-3.5"
              : "bg-rule-strong translate-x-0.5",
          )}
        />
      </span>
      Reduzir animações
    </button>
  );
}
