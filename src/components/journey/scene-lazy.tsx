"use client";

import dynamic from "next/dynamic";
import type { MotionValue } from "motion/react";

/**
 * Carregamento tardio da cena.
 *
 * `ssr: false` em `next/dynamic` NÃO é permitido dentro de Server Component,
 * então este wrapper precisa ser client. É o padrão sancionado no Next 16.
 *
 * O `loading` reserva a caixa com o mesmo fundo sólido da cena, então a
 * montagem do canvas não é evento de layout shift, e quem não tem WebGL fica
 * com esse fundo para sempre, que é o fallback projetado e não um erro.
 */
const JourneyScene = dynamic(
  () => import("./scene").then((m) => m.JourneyScene),
  {
    ssr: false,
    loading: () => <div className="bg-ocean-950 absolute inset-0" />,
  },
);

export function JourneySceneLazy({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return <JourneyScene progress={progress} className={className} />;
}
