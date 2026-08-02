"use client";

import { useMemo } from "react";
import { m, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";

/**
 * Um ato da jornada: vários planos vetoriais recuando em profundidade,
 * com a câmera avançando conforme o scroll.
 *
 * A ilusão inteira é uma linha de matemática. Câmera pinhole, objeto na
 * profundidade z, câmera avançando t:
 *
 *     escala(t) = z / (z - t)
 *
 * Por que essa e não `escala = 1 + k * p`, que é o que quase todo mundo faz:
 *
 * 1. Em t = 0 toda camada vale exatamente 1. Nenhum plano precisa de passe de
 *    setup, e o estado inicial é o desenho como foi autorado.
 * 2. Planos próximos aceleram forte, planos distantes quase não se movem. Isso
 *    é perspectiva correta, não aproximação, e é o que faz ler como câmera de
 *    verdade em vez de zoom de foto.
 *
 * Restrição dura: DOLLY < menor z do ato. Senão divide por zero e o plano mais
 * próximo explode na tela.
 *
 * Por que escala pura e não CSS 3D com preserve-3d, que daria a câmera de
 * graça: qualquer propriedade de agrupamento num filho de um contexto 3D o
 * ACHATA. Isso inclui opacity abaixo de 1, filter, mask, clip-path e
 * mix-blend-mode. Como os planos precisam de opacidade individual para o
 * descarte e para a névoa, preserve-3d está fora. Ele sobrevive só na porta,
 * que é um volume isolado (ver container-doors.tsx).
 */

export interface Plate {
  id: string;
  /**
   * Profundidade em unidades de câmera. Precisa ser maior que DOLLY.
   * Use progressão geométrica de razão perto de 0,7: é o que faz a
   * profundidade ler como contínua em vez de escalonada.
   */
  z: number;
  /** O desenho. SVG absoluto preenchendo o palco. */
  node: React.ReactNode;
}

/** Quanto a câmera avança ao longo de um ato. */
export const DOLLY = 0.95;

/** Escala em que um plano é considerado "passou pela lente" e some. */
const CULL_SCALE = 6;

/** Coeficiente de extinção da névoa de profundidade (Beer-Lambert). */
const FOG_DENSITY = 0.18;

/**
 * Ponto de fuga levemente acima do centro geométrico.
 *
 * A grade de perspectiva de todos os sete atos é desenhada contra este valor.
 * Deslocar 4% para cima coloca o horizonte no terço superior, e é a diferença
 * entre "a foto está dando zoom" e "eu estou voando".
 */
export const VANISHING_POINT = "50% 46%";

interface DollyActProps {
  /** Progresso local do ato, de 0 a 1. */
  progress: MotionValue<number>;
  plates: readonly Plate[];
  /** Cor da névoa, em "r g b". Padrão: ocean-950. */
  fogColor?: string;
  /** Aplica will-change. Só no ato ativo, nunca em todos. */
  active?: boolean;
}

export function DollyAct({
  progress,
  plates,
  fogColor = "7 20 27",
  active = false,
}: DollyActProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {plates.map((plate) => (
        <PlateLayer
          key={plate.id}
          progress={progress}
          plate={plate}
          fogColor={fogColor}
          active={active}
        />
      ))}
    </div>
  );
}

function PlateLayer({
  progress,
  plate,
  fogColor,
  active,
}: {
  progress: MotionValue<number>;
  plate: Plate;
  fogColor: string;
  active: boolean;
}) {
  const { z } = plate;
  const reduced = useReducedMotion();

  const scale = useTransform(progress, (p) => {
    if (reduced) return 1;
    return z / (z - p * DOLLY);
  });

  /**
   * Descarte. Resolve z/(z-t) = CULL_SCALE para achar em que progresso o plano
   * passa pela lente, e desvanece nos 12% anteriores. Sem isso o plano cresce
   * indefinidamente e vira uma parede de cor.
   */
  const cullAt = useMemo(
    () => (z * (CULL_SCALE - 1)) / (CULL_SCALE * DOLLY),
    [z],
  );
  const opacity = useTransform(
    progress,
    [Math.max(cullAt - 0.12, 0), Math.min(cullAt, 1)],
    [1, 0],
    { clamp: true },
  );

  /**
   * Névoa de profundidade por Beer-Lambert, que é a mesma lei da atmosfera
   * real. Um div de cor sólida com opacidade calculada, e não
   * `filter: brightness()`: filtro rasteriza a camada de novo a cada frame e
   * custa cerca de 10x mais no mobile, para um resultado visualmente igual.
   */
  const fog = useTransform(progress, (p) => {
    const depth = reduced ? z : Math.max(z - p * DOLLY, 0);
    return 1 - Math.exp(-FOG_DENSITY * depth);
  });

  return (
    <m.div
      className="absolute inset-0"
      style={{
        scale,
        opacity,
        transformOrigin: VANISHING_POINT,
        // will-change só no ato ativo. Uma camada composta em tela cheia com
        // DPR 3 custa cerca de 14 MB; promover os 38 planos da página passaria
        // de 500 MB e o iOS mataria a aba.
        willChange: active ? "transform, opacity" : undefined,
      }}
    >
      {plate.node}
      <m.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: fog, backgroundColor: `rgb(${fogColor})` }}
      />
    </m.div>
  );
}
