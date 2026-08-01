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

interface FanSlot {
  width: string;
  layout: string;
  rotate: number;
  x: number;
  y: number;
}

/** Card central maior e por cima; laterais convergem do centro na entrada. */
const fanSlots: FanSlot[] = [
  { width: "w-[38%]", layout: "-mr-8 z-10", rotate: -6, x: 56, y: 20 },
  { width: "w-[42%]", layout: "z-20", rotate: 0, x: 0, y: -10 },
  { width: "w-[38%]", layout: "-ml-8 z-10", rotate: 6, x: -56, y: 20 },
];

const cardVariants: Variants = {
  hidden: (slot: FanSlot) => ({
    x: slot.x,
    y: slot.y + 16,
    rotate: 0,
    opacity: 0,
  }),
  visible: (slot: FanSlot) => ({
    x: 0,
    y: slot.y,
    rotate: slot.rotate,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  }),
};

interface CardFanProps {
  /** Até 3 cards; o segundo é o central (maior, por cima). */
  cards: React.ReactNode[];
  className?: string;
}

/**
 * Leque de 3 cards (inspirado no image-fan do 21st.dev, redesenhado): os
 * cards nascem empilhados no centro e abrem em leque na entrada; hover
 * levanta o card. Conteúdo livre (ImageSlot, pattern, card de curso).
 * Reduced motion: renderiza o leque aberto, estático.
 */
export function CardFan({ cards, className }: CardFanProps) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ delayChildren: 0.25, staggerChildren: 0.08 }}
          className={cn(
            "relative flex w-full items-center justify-center",
            className,
          )}
        >
          {cards.slice(0, 3).map((card, index) => {
            const slot = fanSlots[index] ?? fanSlots[1];
            return (
              <m.div
                key={index}
                custom={slot}
                variants={cardVariants}
                whileHover={reduceMotion ? undefined : { y: slot.y - 10 }}
                className={cn(
                  "relative aspect-4/5 shrink-0 overflow-hidden rounded-lg shadow-card-hover outline outline-petrol-950/10",
                  slot.width,
                  slot.layout,
                )}
              >
                {card}
              </m.div>
            );
          })}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
