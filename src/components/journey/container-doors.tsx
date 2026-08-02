"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";
import { cn } from "@/lib/utils";

/**
 * As portas do contêiner abrindo.
 *
 * Este é o único lugar do site que usa CSS 3D de verdade. A jornada inteira
 * roda em escala pura (ver dolly-act.tsx) porque `preserve-3d` achata o
 * contexto quando um filho tem opacity, filter ou mask. Aqui não preciso de
 * nada disso nos painéis, e preciso de rotação real com duas faces, então
 * `rotateY` é a ferramenta certa.
 *
 * Três detalhes que separam isso de uma porta de tutorial:
 *
 * 1. O ease é cúbico de saída, então os últimos 20 graus são lentos. Aço é
 *    pesado, e velocidade constante lê como papel.
 * 2. A iluminação falsa vive num pseudo-elemento, nunca no painel. Colocar
 *    opacity no painel achataria o contexto 3D e a face de trás sumiria.
 * 3. O conteúdo é IRMÃO do conjunto de portas, nunca filho. Filho herdaria o
 *    contexto 3D e a rasterização do texto ficaria mole.
 */

interface ContainerDoorsProps {
  /** Progresso local, de 0 a 1. */
  progress: MotionValue<number>;
  /** Faixa de progresso em que as portas abrem. */
  range?: [number, number];
  /** Legenda estampada na face externa. */
  code?: string;
  children: React.ReactNode;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function ContainerDoors({
  progress,
  range = [0.18, 0.62],
  code,
  children,
  className,
}: ContainerDoorsProps) {
  const reduced = useReducedMotion();

  const open = useTransform(progress, range, [0, 1], {
    clamp: true,
    ease: easeOutCubic,
  });

  /**
   * Sob movimento reduzido as portas ainda saem do caminho, mas rápido e sem
   * rotação: viram uma revelação de máscara do centro para fora. O conteúdo
   * precisa ficar acessível de qualquer forma, e manter a porta fechada
   * esconderia informação.
   */
  const reducedOpen = useTransform(progress, [0.18, 0.3], [0, 1], {
    clamp: true,
  });

  const openValue = reduced ? reducedOpen : open;

  return (
    <div className={cn("relative", className)}>
      <m.div
        aria-hidden="true"
        className="container-face pointer-events-none absolute inset-0"
        style={{ "--open": openValue } as React.CSSProperties}
      >
        <div className="door-shadow" />
        <Door side="l" code={code} />
        <Door side="r" />
      </m.div>

      {/*
        Irmão, não filho. Se isto entrasse dentro de .container-face, herdaria
        o contexto 3D e o texto rasterizaria borrado.
      */}
      <m.div
        className="reveal relative"
        style={{ "--reveal": openValue } as React.CSSProperties}
      >
        {children}
      </m.div>
    </div>
  );
}

function Door({ side, code }: { side: "l" | "r"; code?: string }) {
  return (
    <div className={cn("door", side === "l" ? "door--l" : "door--r")}>
      <div className="door__face">
        {/* Corrugação: o perfil real de uma porta de contêiner. Repeating
            gradient em vez de imagem, então escala sem peso. */}
        <div className="door__corrugation" />
        {code && side === "l" ? (
          <span className="door__code">{code}</span>
        ) : null}
      </div>
      <div className="door__back" />
    </div>
  );
}
