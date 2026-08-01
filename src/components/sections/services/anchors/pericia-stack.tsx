"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  IconBalanca,
  IconContrato,
  IconDocumentoPgr,
  type IconProps,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER = 0.1;

type Tone = "dark" | "light";

interface PericiaCard {
  title: string;
  desc: string;
  Icon: React.ComponentType<IconProps>;
}

const cards: PericiaCard[] = [
  {
    title: "Perícia judicial",
    desc: "Atuação técnica em processos trabalhistas",
    Icon: IconBalanca,
  },
  {
    title: "Assistência técnica",
    desc: "Pareceres e quesitos ao juízo",
    Icon: IconContrato,
  },
  {
    title: "Laudo de insalubridade",
    desc: "Caracterização de agentes nocivos",
    Icon: IconDocumentoPgr,
  },
  {
    title: "Laudo de periculosidade",
    desc: "Exposição a riscos acentuados",
    Icon: IconDocumentoPgr,
  },
  {
    title: "Terceirização de SST",
    desc: "Gestão completa terceirizada",
    Icon: IconBalanca,
  },
];

/** Cada item revela de baixo pra cima (opacity + y), alinhado (sem baralho). */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE,
      delay: (cards.length - 1 - i) * STAGGER,
    },
  }),
};

interface PericiaStackProps {
  tone?: Tone;
  className?: string;
}

/**
 * Lista dos tipos de perícia/laudo em SST. Os itens revelam em cascata de
 * baixo pra cima na entrada, alinhados (sem rotação de baralho). Reduced
 * motion: lista já montada, estática.
 */
export function PericiaStack({ tone = "dark", className }: PericiaStackProps) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          role="list"
          aria-label="Tipos de perícia e laudo em segurança do trabalho"
          className={cn("flex w-full max-w-md flex-col gap-2.5", className)}
        >
          {cards.map((card, i) => (
            <m.div
              key={card.title}
              role="listitem"
              custom={i}
              variants={cardVariants}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3.5",
                dark
                  ? "border border-petrol-800 bg-petrol-900"
                  : "bg-surface-raised shadow-card",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-md",
                  dark
                    ? "bg-petrol-950 text-accent-on-inverse"
                    : "bg-petrol-50 text-petrol-700",
                )}
              >
                <card.Icon size={20} />
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    dark ? "text-ink-on-inverse" : "text-petrol-700",
                  )}
                >
                  {card.title}
                </p>
                <p
                  className={cn(
                    "text-meta",
                    dark ? "text-ink-muted-on-inverse" : "text-ink-muted",
                  )}
                >
                  {card.desc}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
