"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

/**
 * Filete de progresso de leitura no topo (páginas longas: artigo, políticas).
 * `scaleX` acompanha o progresso de scroll da página. É indicador de posição
 * (responde ao scroll do usuário, não animação autônoma); em reduced-motion
 * usa o valor cru, sem mola. Decorativo (aria-hidden).
 */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        aria-hidden
        style={{ scaleX }}
        className="bg-accent fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      />
    </LazyMotion>
  );
}
