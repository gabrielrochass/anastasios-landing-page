"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Entrada de hero: filhos (EntranceItem) revelam em cascata com blur+y no
 * primeiro viewport (once). Blur só na entrada única, nunca em animação
 * contínua. Reduced motion via MotionConfig (transforms zerados).
 */
export function Entrance({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className={cn(className)}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}

export function EntranceItem({
  children,
  className,
  eager = false,
}: {
  children: React.ReactNode;
  className?: string;
  /**
   * Renderiza no estado final desde o SSR (sem fade/blur de entrada). Use no
   * elemento LCP do hero (o título): assim ele pinta nítido de imediato e não
   * atrasa o Largest Contentful Paint, enquanto os demais itens ainda entram
   * em cascata.
   */
  eager?: boolean;
}) {
  if (eager) return <div className={cn(className)}>{children}</div>;
  return (
    <m.div variants={itemVariants} className={cn(className)}>
      {children}
    </m.div>
  );
}
