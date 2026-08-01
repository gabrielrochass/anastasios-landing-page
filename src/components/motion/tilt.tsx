"use client";

import { useRef } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Inclinação máxima em graus (default 6, contido). */
  max?: number;
}

/**
 * Tilt 3D sutil por ponteiro (o "3D" via CSS transforms do motion, não WebGL):
 * o filho inclina em rotateX/rotateY seguindo o mouse, com mola, e volta ao
 * repouso ao sair. Só `transform`, não altera layout. Em reduced-motion ou em
 * ponteiro por toque (sem mousemove) renderiza o filho parado.
 */
export function Tilt({ children, className, max = 6 }: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 15, mass: 0.2 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          style={{ perspective: 900 }}
          className={cn("h-full", className)}
        >
          <m.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="h-full"
          >
            {children}
          </m.div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
