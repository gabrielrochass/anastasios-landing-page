"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

/**
 * Frase-manifesto com cascata palavra a palavra ao entrar na viewport
 * (adaptação do Text Reveal do 21st.dev). Deliberadamente whileInView em
 * vez de scrub por scroll: estados intermediários do scrub deixariam
 * palavras semi-transparentes reprovando contraste AA — na cascata cada
 * palavra vai de opacity 0 (ignorada pela auditoria, lida por AT) direto
 * a 1. Com prefers-reduced-motion renderiza tudo opaco. Uso único por
 * página.
 */
export function TextReveal({ text, className }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className={cn("flex flex-wrap", className)}
        >
          {words.map((word, index) => (
            <m.span
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: "easeOut" },
                },
              }}
              className="mr-[0.32em] inline-block"
            >
              {word}
            </m.span>
          ))}
        </m.p>
      </MotionConfig>
    </LazyMotion>
  );
}
