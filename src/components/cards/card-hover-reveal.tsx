import { cn } from "@/lib/utils";

interface CardHoverRevealProps {
  /** Conteúdo sempre visível. A altura do card é a dele — nunca muda. */
  summary: React.ReactNode;
  /** Painel que desliza sobre a base do card em hover/focus-within. */
  detail: React.ReactNode;
  className?: string;
}

/**
 * Hover-expand sem layout shift: o painel de detalhe é um overlay absoluto
 * (translateY + opacity), então vizinhos nunca se movem. Funciona por
 * :hover e :focus-within — CSS puro, sem JS.
 */
export function CardHoverReveal({
  summary,
  detail,
  className,
}: CardHoverRevealProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)}>
      {summary}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 rounded-b-lg border-t border-neutral-200 bg-surface-raised p-card opacity-0 shadow-card-hover transition-[opacity,translate] duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        {detail}
      </div>
    </div>
  );
}
