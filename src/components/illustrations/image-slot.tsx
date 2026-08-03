import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ImageSlotProps {
  /** Referencia a entrada correspondente em ASSETS.md */
  slotId: string;
  ratio: "16/9" | "4/3" | "3/4" | "4/5" | "1/1";
  className?: string;
  /** O placeholder visual (uma das ilustrações) */
  children: ReactNode;
}

/**
 * Reserva de espaço para foto futura, com aspect-ratio fixo (zero CLS).
 * Quando o asset real chegar, basta trocar o children por um <Image>.
 */
export function ImageSlot({
  slotId,
  ratio,
  className,
  children,
}: ImageSlotProps) {
  return (
    <div
      data-slot-id={slotId}
      style={{ aspectRatio: ratio }}
      className={cn(
        // Canto reto. `rounded-lg` são 8px de raio de aplicativo, e todo
        // cartão, faixa e tabela deste site é canto vivo: o sistema define
        // --radius-badge em 0.125rem e a direção é linguagem de documento
        // técnico. Uma foto arredondada no meio disso lê como peça de outro
        // projeto.
        "relative overflow-hidden [&>*]:h-full [&>*]:w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
