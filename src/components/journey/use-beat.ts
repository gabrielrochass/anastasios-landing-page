"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import type { Beat } from "./beats";

/**
 * Estado discreto da jornada, derivado da posição do scroll.
 *
 * Este arquivo existe para evitar um bug específico e muito comum: batida
 * pulada em scroll rápido.
 *
 * O bug aparece quando o estado discreto é BASEADO EM EVENTO, com
 * IntersectionObserver disparando onEnter e onLeave, ou com um useEffect que
 * acumula delta. Scroll rápido, salto por âncora, Ctrl+End, ou restauração de
 * scroll no reload podem atravessar três seções dentro de um único frame. O
 * observer coalesce, dispara as bordas fora de ordem ou não dispara, e o
 * acumulador dessincroniza para sempre.
 *
 * A correção não é throttle. Throttle piora, porque descarta justamente os
 * frames em que a travessia rápida aconteceu. A correção é PARAR DE ACUMULAR:
 * a batida vira função pura da posição. Qualquer valor de progresso mapeia
 * para exatamente uma batida, então pular é impossível por construção.
 */

/**
 * Zona morta na fronteira entre batidas.
 *
 * Sem isso, um usuário que para o scroll exatamente em cima de uma fronteira
 * faz o estado oscilar entre duas batidas a cada micro-movimento do trackpad,
 * o que pisca `inert` e `aria-current` dezenas de vezes por segundo.
 */
const HYSTERESIS = 0.008;

function resolveBeat(
  value: number,
  beats: readonly Beat[],
  current: number,
): number {
  for (let i = 0; i < beats.length; i++) {
    // A batida atual defende o próprio território com uma margem extra.
    const isCurrent = i === current;
    const isLast = i === beats.length - 1;
    const low = beats[i].start - (isCurrent ? HYSTERESIS : 0);
    const high = beats[i].end + (isCurrent ? HYSTERESIS : 0);
    // A última batida inclui o extremo direito, senão o progresso exatamente
    // igual a 1 não cairia em nenhuma faixa.
    const inside = isLast ? value >= low && value <= high : value >= low && value < high;
    if (inside) return i;
  }
  return value < beats[0].start ? 0 : beats.length - 1;
}

export function useBeat(
  progress: MotionValue<number>,
  beats: readonly Beat[],
): number {
  const currentRef = useRef(0);
  const [index, setIndex] = useState(0);

  const sync = useCallback(
    (value: number) => {
      const next = resolveBeat(value, beats, currentRef.current);
      if (next !== currentRef.current) {
        currentRef.current = next;
        setIndex(next);
      }
    },
    [beats],
  );

  /**
   * Sincroniza ANTES do primeiro paint.
   *
   * `useScroll` reporta 0 até medir, e o navegador pode ter restaurado o
   * scroll no meio da página num reload. Sem este passe, a página pisca a
   * batida 1 por um frame antes de corrigir, o que é feio e conta como
   * instabilidade visual.
   */
  useLayoutEffect(() => {
    sync(progress.get());
  }, [sync, progress]);

  /**
   * O frameloop do motion já é agrupado por rAF. Não adicionar throttle aqui:
   * seria reintroduzir exatamente o bug que este arquivo evita.
   */
  useMotionValueEvent(progress, "change", sync);

  return index;
}
