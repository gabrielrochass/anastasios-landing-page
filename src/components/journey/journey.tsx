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
import { useBeat } from "./use-beat";
import { JourneySceneLazy } from "./scene-lazy";
import { JourneyProgress } from "./journey-progress";

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
      // Cena de dia: o texto vira tinta sobre claro, que é onde leitura
      // longa funciona melhor.
      data-mode="doc"
      data-journey-track=""
      className="relative bg-surface text-content"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/*
          UMA cena para os sete atos, não sete cenas coladas. Em 3D a câmera
          atravessa o mundo inteiro de forma contínua, então o corte por
          abertura entre atos deixou de ser necessário: não existe costura
          para esconder.
        */}
        <JourneySceneLazy
          progress={scrollYProgress}
          className="absolute inset-0"
        />


        {/*
          O conteúdo. Todas as batidas montadas, sempre, em ordem narrativa.
          Batida inativa recebe `inert`, nunca `display: none`: leitor de tela
          lineariza a página e usuário de teclado tabula por ela, e os dois
          precisam alcançar a última batida sem depender de scroll.
        */}
        <JourneyProgress
          progress={scrollYProgress}
          activeBeat={activeBeat}
          reduced={reduced}
        />

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
      // Mobile: o texto vive na metade de BAIXO, porque o objeto ocupa a de
      // cima. Desktop: centrado, com o objeto à direita.
      // Mobile: o texto começa logo abaixo da faixa do objeto, não colado na
      // base. Preso na base sobravam cerca de 290px de vazio no meio.
      className="pointer-events-none absolute inset-0 flex items-start pt-[44svh] pb-16 md:items-center md:pt-0 md:pb-12"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-6xl px-5 sm:px-6">
        {children}
      </div>
    </m.section>
  );
}
