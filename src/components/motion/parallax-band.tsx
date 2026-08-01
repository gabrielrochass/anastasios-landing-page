"use client";

import { useRef } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Photo } from "@/components/photo/photo";
import type { StockPhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

interface ParallaxBandProps {
  photo: StockPhotoKey;
  children?: React.ReactNode;
  className?: string;
  /** Deslocamento máximo da foto em % (default 10, sutil). */
  speed?: number;
}

/**
 * Banda de foto com parallax sutil por seção: a camada de foto desloca em `y`
 * conforme a seção cruza a viewport, dando profundidade sem sequestrar o
 * scroll. Foto em `scale-110` dentro de `overflow-hidden` (nunca mostra borda).
 * Leitura por `target` ref (padrão do projeto). Reduced-motion → foto estática.
 * Altura fixa reservada → zero CLS.
 */
export function ParallaxBand({
  photo,
  children,
  className,
  speed = 10,
}: ParallaxBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed}%`, `${speed}%`],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <section
          ref={ref}
          className={cn(
            "relative flex min-h-[52vh] items-center overflow-hidden bg-surface-inverse",
            className,
          )}
        >
          <m.div
            aria-hidden
            className="absolute inset-0 scale-110"
            style={reduce ? undefined : { y, scale: 1.1 }}
          >
            <Photo photo={photo} treatment="grade" sizes="100vw" />
            <span className="absolute inset-0 bg-petrol-950/62" />
          </m.div>
          {children && (
            <div className="relative mx-auto w-full max-w-6xl px-4 text-ink-on-inverse sm:px-6">
              {children}
            </div>
          )}
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
