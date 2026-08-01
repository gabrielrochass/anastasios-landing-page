"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";
import { ShipRoute, serpentinePath } from "@/components/motion/ship-route";
import { useReducedMotion } from "@/hooks/use-motion-preference";
import { useViewportGeometry } from "@/hooks/use-viewport-geometry";
import { operationStages } from "@/data/operation";
import { cn } from "@/lib/utils";

/**
 * A travessia. O scroll é a operação: o navio sai da origem e chega ao porto
 * brasileiro conforme o visitante desce, e cada trecho é uma etapa real.
 *
 * A animação é indicador de progresso, não enfeite, e isso tem três
 * consequências práticas: sobrevive a auditoria de acessibilidade, é
 * controlada pelo usuário (logo não é animação automática sob WCAG 2.2 SC
 * 2.2.2), e o fallback acessível sai de graça, porque é a mesma lista ordenada.
 *
 * Duas geometrias, nenhum fallback empobrecido:
 * wide    rota atravessa a largura numa cena fixada, uma etapa em foco
 * compact serpentina vertical num trilho à esquerda, navio descendo junto
 *         com o polegar enquanto os cards passam
 */

const RAIL_WIDTH = 48;
const waypoints = operationStages.map((stage) => stage.waypoint);

export function Crossing() {
  const reduced = useReducedMotion();
  const geometry = useViewportGeometry();

  // Sob movimento reduzido não existe cena: é a lista, inteira e legível.
  // Mesma informação, zero movimento.
  if (reduced) return <StaticCrossing />;

  return geometry === "wide" ? <WideCrossing /> : <CompactCrossing />;
}

function SectionShell({
  children,
  className,
  ...rest
}: React.ComponentProps<"section">) {
  return (
    <section
      id="travessia"
      data-mode="ocean"
      className={cn("bg-surface text-content", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

function Heading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-section sm:px-6">
      <p className="text-eyebrow text-accent">A operação</p>
      <h2 className="mt-4 max-w-2xl font-serif text-h2">
        Da fábrica ao porto de destino, com alguém respondendo em cada trecho.
      </h2>
    </div>
  );
}

/** Desktop: cena fixada, uma etapa em foco, rota cruzando a largura. */
function WideCrossing() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      const index = Math.min(
        operationStages.length - 1,
        Math.floor(value * operationStages.length),
      );
      setActive((current) => (current === index ? current : index));
    });
  }, [scrollYProgress]);

  const stage = operationStages[active];

  return (
    <SectionShell>
      <Heading />
      <div
        ref={ref}
        style={{ height: `${operationStages.length * 100}svh` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden pb-10 pt-28">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <StageDetail stage={stage} />
          </div>
          <div className="h-[220px] w-full px-4 sm:px-6">
            <ShipRoute progress={scrollYProgress} waypoints={waypoints} />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/** Mobile: trilho vertical à esquerda, cards em fluxo normal à direita. */
function CompactCrossing() {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [railHeight, setRailHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Começa quando o topo da lista chega perto do fim da tela e termina
    // quando o fim da lista passa do topo. O navio acompanha a leitura.
    offset: ["start 0.85", "end 0.35"],
  });

  useEffect(() => {
    const element = railRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setRailHeight(Math.round(entry.contentRect.height));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // viewBox montado com a altura medida: proporção 1:1, casco sem distorção.
  const route =
    railHeight > 0
      ? {
          viewBox: `0 0 ${RAIL_WIDTH} ${railHeight}`,
          d: serpentinePath(railHeight, RAIL_WIDTH, operationStages.length - 1),
          labelAnchor: "start" as const,
          labelOffset: { x: 0, y: 0 },
          shipScale: 1.1,
        }
      : undefined;

  return (
    <SectionShell>
      <Heading />
      <div
        ref={ref}
        className="mx-auto max-w-6xl px-4 pb-section pt-12 sm:px-6"
      >
        <div className="grid grid-cols-[48px_1fr] gap-4">
          <div ref={railRef} className="relative">
            <div className="absolute inset-0">
              {route ? (
                <ShipRoute
                  progress={scrollYProgress}
                  waypoints={waypoints}
                  route={route}
                  // A coluna tem 48px. Rótulo aqui não caberia, e o nome do
                  // waypoint já está no título do card ao lado.
                  hideLabels
                />
              ) : null}
            </div>
          </div>

          <ol className="flex flex-col gap-16">
            {operationStages.map((stage) => (
              <li key={stage.id}>
                <StageDetail stage={stage} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}

/** Movimento reduzido: rota inteira, informação inteira, nada se mexendo. */
function StaticCrossing() {
  return (
    <SectionShell>
      <Heading />
      <div className="mx-auto max-w-6xl px-4 pb-section pt-12 sm:px-6">
        <ol className="flex flex-col gap-16 border-l border-rule pl-6">
          {operationStages.map((stage) => (
            <li key={stage.id}>
              <StageDetail stage={stage} />
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}

function StageDetail({ stage }: { stage: (typeof operationStages)[number] }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] tabular-stat text-accent">
          {stage.ordinal}
        </span>
        <h3 className="font-serif text-h2">{stage.title}</h3>
      </div>

      <p className="mt-4 text-lead text-content-muted">{stage.summary}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {stage.points.map((point) => (
          <li
            key={point}
            className="border-l border-rule pl-4 text-sm leading-relaxed text-content-muted"
          >
            {point}
          </li>
        ))}
      </ul>

      {/* Nomes de documento reais. É o que separa quem faz o trabalho de quem
          comprou um template, e um importador reconhece na hora. */}
      <dl className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <dt className="text-eyebrow text-content-muted">Entregáveis</dt>
        {stage.artifacts.map((artifact) => (
          <dd
            key={artifact}
            className="border-l border-rule pl-5 font-mono text-[11px] uppercase tracking-widest text-content"
          >
            {artifact}
          </dd>
        ))}
      </dl>
    </div>
  );
}
