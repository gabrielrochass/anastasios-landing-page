"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("pt-BR");

/**
 * Número que conta de 0 até o alvo ao entrar na viewport (adaptado do
 * Number Ticker do Magic UI). Largura reservada em `ch` + tabular-nums =
 * zero layout shift. O valor final real fica em sr-only; o animado é
 * decorativo. Com prefers-reduced-motion renderiza o valor final direto.
 */
export function NumberTicker({ value, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 45, stiffness: 120 });

  const formatted = formatter.format(value);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter.format(Math.round(latest));
      }
    });
  }, [spring]);

  if (reduceMotion) {
    return <span className={cn("tabular-stat", className)}>{formatted}</span>;
  }

  return (
    <>
      <span className="sr-only">{formatted}</span>
      <span
        ref={ref}
        aria-hidden
        style={{ minWidth: `${formatted.length}ch` }}
        className={cn("tabular-stat inline-block text-right", className)}
      >
        0
      </span>
    </>
  );
}
