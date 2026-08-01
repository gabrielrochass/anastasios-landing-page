"use client";

import { useId, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Ícone chega já renderizado (ReactNode) — o componente-função não pode
 * cruzar a fronteira server→client. */
export interface SolutionTab {
  title: string;
  summary: string;
  detail: string;
  icon: React.ReactNode;
}

/**
 * Solução em ABAS (substitui o sticky-scroll com foto repetida). Os títulos
 * ficam todos à vista (segmented control: vertical no desktop, rolável no
 * mobile) e só o detalhe ativo aparece num painel — escaneável, controlado
 * pelo usuário, sem scroll-jacking e com pouco texto na tela. Painel com
 * `min-height` reservada (zero CLS); reduced-motion → troca instantânea.
 * Teclado: setas, Home/End, roving tabindex, aria-selected/controls.
 */
export function SolutionTabs({ tabs }: { tabs: SolutionTab[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const current = tabs[active];

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % tabs.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + tabs.length) % tabs.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(last);
    }
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="grid gap-5 md:grid-cols-[19rem_1fr] md:gap-10">
          <div
            role="tablist"
            aria-label="Partes da solução"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0"
          >
            {tabs.map((tab, index) => {
              const selected = index === active;
              return (
                <button
                  key={tab.title}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${index}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors md:shrink",
                    selected
                      ? "bg-surface-raised text-petrol-700 shadow-card"
                      : "text-ink-muted hover:bg-petrol-50/70 hover:text-petrol-700",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors",
                      selected
                        ? "bg-petrol-700 text-white"
                        : "bg-petrol-50 text-petrol-700",
                    )}
                  >
                    {tab.icon}
                  </span>
                  {tab.title}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-56 rounded-xl bg-surface-raised p-card shadow-card">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                role="tabpanel"
                id={`${baseId}-panel-${active}`}
                aria-labelledby={`${baseId}-tab-${active}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <p className="text-eyebrow text-accent-text">
                  Parte {active + 1} de {tabs.length}
                </p>
                <h3 className="text-h3 mt-2 text-petrol-700">{current.title}</h3>
                <p className="mt-3 font-medium text-ink">{current.summary}</p>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {current.detail}
                </p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
