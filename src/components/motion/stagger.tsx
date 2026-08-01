"use client";

import { Children } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/** Contenção Linear-style: acima disso, o grupo revela de uma vez. */
const MAX_STAGGERED_ITEMS = 5;

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

/**
 * Revela os filhos diretos em sequência (60ms entre itens) quando o grupo
 * entra no viewport. Com mais de 5 filhos, todos revelam juntos — stagger
 * longo vira espera, não polimento.
 */
export function Stagger({ children, className, itemClassName }: StaggerProps) {
  const items = Children.toArray(children);
  const staggerDelay = items.length > MAX_STAGGERED_ITEMS ? 0 : 0.06;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: staggerDelay } },
          }}
          className={cn(className)}
        >
          {items.map((child, index) => (
            <m.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className={cn(itemClassName)}
            >
              {child}
            </m.div>
          ))}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
