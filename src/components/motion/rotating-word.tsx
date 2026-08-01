"use client";

import { useEffect, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
  words: string[];
  className?: string;
  intervalMs?: number;
}

/**
 * Palavra que troca em ciclo com animação de mola (adaptado do animated-hero
 * do 21st.dev). A largura/altura é reservada pela palavra mais longa
 * (invisível) — zero layout shift. Com prefers-reduced-motion mostra a
 * primeira palavra, estática.
 */
export function RotatingWord({
  words,
  className,
  intervalMs = 2200,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % words.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [words.length, intervalMs, reduce]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  if (reduce) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <span
        className={cn(
          "relative inline-flex justify-center overflow-hidden align-bottom",
          className,
        )}
      >
        <span aria-hidden className="invisible">
          {longest}
        </span>
        {words.map((word, i) => (
          <m.span
            key={word}
            aria-hidden={index !== i}
            className="absolute inset-0 flex justify-center whitespace-nowrap"
            initial={{ opacity: 0, y: 44 }}
            animate={
              index === i
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: index > i ? -44 : 44 }
            }
            transition={{ type: "spring", stiffness: 55, damping: 12 }}
          >
            {word}
          </m.span>
        ))}
      </span>
    </LazyMotion>
  );
}
