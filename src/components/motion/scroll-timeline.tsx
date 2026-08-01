"use client";

import { useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollTimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface ScrollTimelineProps {
  entries: ScrollTimelineEntry[];
  className?: string;
}

/**
 * Timeline vertical com "beam" que preenche conforme o scroll (adaptado do
 * Timeline do Aceternity UI, via 21st.dev, re-skinado para o design system:
 * light-only, gradiente petróleo→laranja, nó = célula da matriz de risco).
 * Com prefers-reduced-motion o beam renderiza 100% preenchido, sem scrub.
 */
export function ScrollTimeline({ entries, className }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  // ResizeObserver (não medição one-shot): fontes e conteúdo tardio mudam a
  // altura — o trilho precisa acompanhar para não desalinhar.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div ref={containerRef} className={cn("w-full", className)}>
          <div ref={listRef} className="relative">
            {entries.map((entry) => (
              <div
                key={entry.title}
                className="flex justify-start pt-14 first:pt-0 md:gap-16 md:pt-36 md:first:pt-4"
              >
                {/* Coluna esquerda: nó + título decorativo desktop (sticky) */}
                <div className="sticky top-28 z-10 flex shrink-0 items-center self-start md:w-72 lg:w-80">
                  <span
                    aria-hidden
                    className="absolute left-1 flex size-7 items-center justify-center rounded-md bg-surface"
                  >
                    <span className="size-2.5 rounded-xs border border-orange-500 bg-orange-400" />
                  </span>
                  <p
                    aria-hidden
                    className="text-h2 hidden pl-14 font-semibold text-petrol-700 md:block"
                  >
                    {entry.title}
                  </p>
                </div>

                {/* Conteúdo (o heading real vive aqui; no desktop vira sr-only
                    porque o título decorativo sticky já está visível) */}
                <div className="relative w-full max-w-2xl pl-14 md:pl-0">
                  <h3 className="text-h3 mb-4 text-petrol-700 md:sr-only">
                    {entry.title}
                  </h3>
                  {entry.content}
                </div>
              </div>
            ))}

            {/* Trilho + beam */}
            <div
              aria-hidden
              style={{ height: `${height}px` }}
              className="absolute left-4 top-0 w-0.5 overflow-hidden bg-neutral-200 [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
            >
              {reduceMotion ? (
                <div className="absolute inset-0 bg-linear-to-b from-petrol-700 via-petrol-500 to-orange-400" />
              ) : (
                <m.div
                  style={{ height: beamHeight, opacity: beamOpacity }}
                  className="absolute inset-x-0 top-0 rounded-full bg-linear-to-b from-petrol-700 via-petrol-500 to-orange-400"
                />
              )}
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
