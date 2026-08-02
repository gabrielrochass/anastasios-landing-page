"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";
import { BEATS, BEAT_HEIGHT_SVH, BEAT_HEIGHT_SVH_REDUCED, type Beat } from "./beats";
import { Atmosphere } from "./atmosphere";
import { DollyAct, type Plate } from "./dolly-act";
import { useBeat } from "./use-beat";
import {
  arrivalPlates,
  corridorActPlates,
  deckPlates,
  departurePlates,
  doorPlates,
  hullPlates,
  manifestPlates,
} from "./plates";

/**
 * A jornada. Sete atos contínuos, do mar aberto ao porto.
 *
 * O palco é sticky com altura fixa em svh, e tudo dentro dele é
 * `absolute inset-0`. Isso dá CLS zero por construção, não por sorte: nada
 * ali pode empurrar nada.
 *
 * A altura do track é função pura de BEATS.length, então nunca muda, então o
 * `useScroll` nunca precisa remedir.
 */

const ACT_PLATES: Record<string, readonly Plate[]> = {
  chegada: arrivalPlates,
  casco: hullPlates,
  conves: deckPlates,
  corredor: corridorActPlates,
  abertura: doorPlates,
  manifesto: manifestPlates,
  partida: departurePlates,
};

interface JourneyProps {
  /** Uma seção de conteúdo por batida, na mesma ordem de BEATS. */
  children: React.ReactNode[];
}

export function Journey({ children }: JourneyProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <JourneyInner>{children}</JourneyInner>
    </LazyMotion>
  );
}

function JourneyInner({ children }: JourneyProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const activeBeat = useBeat(scrollYProgress, BEATS);

  const perBeat = reduced ? BEAT_HEIGHT_SVH_REDUCED : BEAT_HEIGHT_SVH;

  return (
    <div
      ref={trackRef}
      // A altura NUNCA muda, então useScroll nunca remede. `svh` porque `vh`
      // ignora a barra de URL do mobile e `dvh` redimensiona durante o scroll,
      // que gera CLS justamente no Android intermediário.
      style={{ height: `${BEATS.length * perBeat}svh` }}
      data-mode="ocean"
      className="relative bg-surface text-content"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {BEATS.map((beat, index) => (
          <Act
            key={beat.id}
            beat={beat}
            progress={scrollYProgress}
            active={index === activeBeat}
          />
        ))}

        <Atmosphere dolly={scrollYProgress} />

        {/*
          O conteúdo. Todas as batidas montadas, sempre, em ordem narrativa.
          Batida inativa recebe `inert`, nunca `display: none`: leitor de tela
          lineariza a página e usuário de teclado tabula por ela, e os dois
          precisam alcançar a última batida sem depender de scroll.
        */}
        {BEATS.map((beat, index) => (
          <BeatSection
            key={beat.id}
            beat={beat}
            progress={scrollYProgress}
            isActive={index === activeBeat}
          >
            {children[index]}
          </BeatSection>
        ))}
      </div>
    </div>
  );
}

function Act({
  beat,
  progress,
  active,
}: {
  beat: Beat;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const plates = ACT_PLATES[beat.id] ?? [];

  // Progresso local do ato. Fora da faixa fica travado em 0 ou 1, então o ato
  // que ainda não chegou já está montado no estado inicial correto.
  const local = useTransform(progress, [beat.start, beat.end], [0, 1], {
    clamp: true,
  });

  // Só o ato ativo e o vizinho seguinte ficam visíveis. Manter os sete
  // desenhados ao mesmo tempo passaria do orçamento de camadas compostas.
  const visibility = useTransform(progress, (p) =>
    p >= beat.start - 0.06 && p <= beat.end + 0.02 ? 1 : 0,
  );

  return (
    <m.div className="absolute inset-0" style={{ opacity: visibility }}>
      <DollyAct progress={local} plates={plates} active={active} />
    </m.div>
  );
}

function BeatSection({
  beat,
  progress,
  isActive,
  children,
}: {
  beat: Beat;
  progress: MotionValue<number>;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  // A copy entra e sai com o ato, mas nunca chega a zero enquanto está ativa,
  // e nunca some da árvore de acessibilidade.
  const opacity = useTransform(
    progress,
    [beat.start, beat.start + 0.03, beat.end - 0.03, beat.end],
    reduced ? [1, 1, 1, 1] : [0, 1, 1, 0],
    { clamp: true },
  );

  return (
    <m.section
      id={beat.id}
      inert={!isActive}
      aria-current={isActive ? "step" : undefined}
      aria-label={beat.label}
      style={{ opacity, scrollMarginTop: "6rem" }}
      className="pointer-events-none absolute inset-0 flex items-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-6xl px-4 sm:px-6">
        {children}
      </div>
    </m.section>
  );
}
