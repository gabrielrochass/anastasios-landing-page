"use client";

import { Fragment } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  IconCheckConformidade,
  IconContrato,
  IconFolhaPagamento,
  IconRelogioPonto,
  type IconProps,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER = 0.18;

type Tone = "dark" | "light";

interface FlowStep {
  label: string;
  Icon: React.ComponentType<IconProps>;
}

/** Ciclo do departamento pessoal, da contratação ao desligamento. */
const steps: FlowStep[] = [
  { label: "Admissão", Icon: IconContrato },
  { label: "eSocial", Icon: IconRelogioPonto },
  { label: "Folha", Icon: IconFolhaPagamento },
  { label: "Desligamento", Icon: IconCheckConformidade },
];

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE, delay: i * STAGGER },
  }),
};

/**
 * Preenche a linha de conexão entre nós. origin-top-left cobre as duas
 * orientações: no mobile escala em Y (linha vertical desce), no desktop
 * escala em X (linha horizontal avança) — o eixo curto de 1px é imperceptível.
 */
const connectorVariants: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.35, ease: EASE, delay: i * STAGGER + 0.2 },
  }),
};

interface DpFlowProps {
  tone?: Tone;
  className?: string;
}

/**
 * Micro-fluxo do departamento pessoal: quatro nós (Admissão → eSocial →
 * Folha → Desligamento) revelam em cascata e as linhas de conexão preenchem
 * entre eles. Empilha na vertical em telas estreitas (a linha acompanha).
 * Reduced motion: fluxo completo, estático.
 */
export function DpFlow({ tone = "dark", className }: DpFlowProps) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          role="list"
          aria-label="Fluxo do departamento pessoal: Admissão, eSocial, Folha e Desligamento"
          className={cn(
            "flex w-full max-w-sm flex-col items-center md:max-w-xl md:flex-row md:items-start md:justify-between",
            className,
          )}
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const isAccentConnector = i === steps.length - 2;
            return (
              <Fragment key={step.label}>
                <m.div
                  role="listitem"
                  custom={i}
                  variants={nodeVariants}
                  className="flex shrink-0 flex-col items-center gap-2 text-center"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-full border",
                      dark
                        ? isLast
                          ? "border-orange-400 bg-petrol-800 text-accent-on-inverse"
                          : "border-petrol-700 bg-petrol-800 text-petrol-100"
                        : isLast
                          ? "border-orange-400 bg-orange-50 text-orange-700"
                          : "border-petrol-100 bg-surface-raised text-petrol-700 shadow-card",
                    )}
                  >
                    <step.Icon size={24} />
                  </span>
                  <span
                    className={cn(
                      "text-meta font-medium",
                      dark ? "text-ink-muted-on-inverse" : "text-ink-muted",
                    )}
                  >
                    {step.label}
                  </span>
                </m.div>

                {!isLast && (
                  <m.div
                    aria-hidden
                    custom={i}
                    variants={connectorVariants}
                    className={cn(
                      "origin-top-left rounded-full",
                      "my-1 h-6 w-px md:my-0 md:mt-6 md:h-px md:w-auto md:flex-1 md:self-start md:mx-3",
                      isAccentConnector
                        ? dark
                          ? "bg-orange-400/70"
                          : "bg-orange-300"
                        : dark
                          ? "bg-petrol-600"
                          : "bg-petrol-200",
                    )}
                  />
                )}
              </Fragment>
            );
          })}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
