"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

interface RevealProps {
  children: React.ReactNode;
  /** Atraso em segundos (para sequências curtas manuais). */
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: 8 | 12 | 16;
  className?: string;
}

/**
 * Scroll-reveal padrão do site: opacity + translateY quando entra no
 * viewport, uma única vez. Única infra client de reveal — seções continuam
 * Server Components e envolvem o conteúdo com <Reveal>.
 */
export function Reveal({ children, delay = 0, y = 12, className }: RevealProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay, ease: EASE }}
          className={cn(className)}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
