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
  IconCalendarioPrazo,
  IconCheckConformidade,
  IconCoracaoPulso,
  IconEstetoscopio,
  IconPulmoes,
  type IconProps,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER = 0.15;

type Tone = "dark" | "light";

interface ExamRow {
  label: string;
  Icon: React.ComponentType<IconProps>;
}

/** Os quatro exames ocupacionais do ciclo de vida do colaborador. */
const rows: ExamRow[] = [
  { label: "Admissional", Icon: IconEstetoscopio },
  { label: "Periódico", Icon: IconCoracaoPulso },
  { label: "Demissional", Icon: IconPulmoes },
  { label: "Mudança de função / Retorno", Icon: IconCalendarioPrazo },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE, delay: 0.1 + i * STAGGER },
  }),
};

/** A pílula verde revela por cima da neutra, em cascata (um pouco após a linha). */
const pillVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.35, ease: EASE, delay: 0.28 + i * STAGGER },
  }),
};

interface ExamStatusPanelProps {
  tone?: Tone;
  className?: string;
}

/**
 * Painel de status de exames ocupacionais: as quatro linhas revelam em
 * cascata e cada pílula de status "acende" de neutro (petróleo) para
 * "Em dia" (verde risk-low). Materializa "cada exame no prazo".
 * Reduced motion: já pinta tudo montado e verde (estado final).
 */
export function ExamStatusPanel({
  tone = "dark",
  className,
}: ExamStatusPanelProps) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className={cn(
            "w-full max-w-sm rounded-lg p-card",
            dark
              ? "border border-petrol-800 bg-petrol-900"
              : "bg-surface-raised shadow-card",
            className,
          )}
        >
          <div className="mb-5 flex items-center gap-2.5">
            <span
              aria-hidden
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-md",
                dark
                  ? "bg-petrol-950 text-accent-on-inverse"
                  : "bg-petrol-50 text-petrol-700",
              )}
            >
              <IconCoracaoPulso size={20} />
            </span>
            <p
              className={cn(
                "text-eyebrow",
                dark ? "text-petrol-300" : "text-ink-meta",
              )}
            >
              Monitoramento de saúde ocupacional
            </p>
          </div>

          <div
            role="group"
            aria-label="Situação dos exames ocupacionais: todos em dia"
            className="flex flex-col gap-2.5"
          >
            {rows.map((row, i) => (
              <m.div
                key={row.label}
                custom={i}
                variants={rowVariants}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5",
                  dark ? "bg-petrol-950/40" : "bg-petrol-50/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(dark ? "text-petrol-300" : "text-petrol-500")}
                >
                  <row.Icon size={20} />
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium",
                    dark ? "text-ink-on-inverse" : "text-petrol-700",
                  )}
                >
                  {row.label}
                </span>

                {/* Pílula: base neutra (decorativa) + overlay verde que revela.
                    O texto acessível "Em dia" vive na camada verde. */}
                <span className="grid shrink-0 text-meta font-semibold">
                  <span
                    aria-hidden
                    className={cn(
                      "col-start-1 row-start-1 inline-flex items-center justify-center gap-1 rounded-badge border px-2 py-0.5",
                      dark
                        ? "border-petrol-700 bg-petrol-800 text-petrol-300"
                        : "border-petrol-200 bg-petrol-50 text-petrol-600",
                    )}
                  >
                    <span className="inline-flex size-4 items-center justify-center">
                      <span
                        className={cn(
                          "size-2 rounded-full border",
                          dark ? "border-petrol-400" : "border-petrol-400",
                        )}
                      />
                    </span>
                    Em dia
                  </span>
                  <m.span
                    custom={i}
                    variants={pillVariants}
                    className={cn(
                      "col-start-1 row-start-1 inline-flex items-center justify-center gap-1 rounded-badge border px-2 py-0.5",
                      dark
                        ? "border-risk-low-solid/30 bg-risk-low-solid/15 text-risk-low-on-dark"
                        : "border-risk-low-border bg-risk-low-bg text-risk-low-fg",
                    )}
                  >
                    <IconCheckConformidade size={16} />
                    Em dia
                  </m.span>
                </span>
              </m.div>
            ))}
          </div>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
