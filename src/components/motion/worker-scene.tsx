"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  IconBalanca,
  IconEstetoscopio,
  IconFolhaPagamento,
  IconMatrizRisco,
  type IconProps,
} from "@/components/icons";
import { Photo } from "@/components/photo/photo";
import { Stagger } from "@/components/motion/stagger";
import type { StockPhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

const WORKER_PHOTO: StockPhotoKey = "sst-trabalhador-colete";

interface CalloutData {
  key: string;
  Icon: React.ComponentType<IconProps>;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  /** Coluna na cena desktop. */
  side: "left" | "right";
  /** Janela de scroll [início, fim] em que o callout se revela. */
  reveal: [number, number];
}

/** Os quatro serviços, agora irradiando do trabalhador (absorvem os pilares). */
const callouts: CalloutData[] = [
  {
    key: "dp",
    Icon: IconFolhaPagamento,
    eyebrow: "Departamento Pessoal",
    title: "A folha, conferida",
    body: "Folha, eSocial e admissões operados sem retrabalho nem multa.",
    href: "/servicos/departamento-pessoal",
    side: "left",
    reveal: [0.08, 0.24],
  },
  {
    key: "sst",
    Icon: IconMatrizRisco,
    eyebrow: "Engenharia de SST",
    title: "O risco, medido em campo",
    body: "PGR, PCMSO e LTCAT dimensionados pela operação real, não por modelo.",
    href: "/servicos/engenharia-sst",
    side: "right",
    reveal: [0.26, 0.42],
  },
  {
    key: "clinica",
    Icon: IconEstetoscopio,
    eyebrow: "Clínica Ocupacional",
    title: "A saúde, no prazo",
    body: "Exames que nascem do mesmo inventário de risco e voltam ao eSocial.",
    href: "/servicos/clinica-ocupacional",
    side: "left",
    reveal: [0.44, 0.6],
  },
  {
    key: "comp",
    Icon: IconBalanca,
    eyebrow: "Serviços Complementares",
    title: "A defesa, técnica",
    body: "Perícia e laudo com medição rastreável quando o caso vira processo.",
    href: "/servicos/complementares",
    side: "right",
    reveal: [0.62, 0.78],
  },
];

function CalloutCard({
  data,
  align,
}: {
  data: CalloutData;
  align: "left" | "right";
}) {
  return (
    <Link
      href={data.href}
      className={cn(
        "group relative flex max-w-xs flex-col gap-1.5",
        align === "right" ? "items-start text-left" : "md:items-end md:text-right",
      )}
    >
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-accent-on-inverse ring-1 ring-white/15 backdrop-blur-sm"
        >
          <data.Icon size={20} />
        </span>
        <span className="text-eyebrow text-petrol-200">{data.eyebrow}</span>
      </span>
      <span className="text-h3 text-white group-hover:text-accent-on-inverse">
        {data.title}
      </span>
      <span className="text-sm leading-relaxed text-ink-muted-on-inverse">
        {data.body}
      </span>
      <span className="mt-1 inline-flex items-center gap-1 text-eyebrow text-accent-on-inverse">
        Ver serviço
        <ArrowUpRight
          aria-hidden
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

/** Callout preso ao scroll (cena desktop): revela e SEGURA (clamp em 1). */
function ScrollCallout({
  data,
  progress,
}: {
  data: CalloutData;
  progress: MotionValue<number>;
  align: "left" | "right";
}) {
  const [start, end] = data.reveal;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const fromX = data.side === "left" ? 40 : -40;
  const x = useTransform(progress, [start, end], [fromX, 0]);
  return (
    <m.div style={{ opacity, x, translateZ: 40 }}>
      <CalloutCard data={data} align={data.side} />
    </m.div>
  );
}

function WorkerPortrait({
  scale,
  opacity,
}: {
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
}) {
  return (
    <m.div
      style={{ scale, opacity, translateZ: 90 }}
      className="relative mx-auto aspect-3/4 w-52 shrink-0 overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(6,30,40,0.6)] ring-1 ring-white/15 md:w-64"
    >
      <Photo photo={WORKER_PHOTO} treatment="grade" sizes="(min-width:768px) 20vw, 60vw" />
      <span
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-petrol-950/70 via-transparent to-petrol-950/10"
      />
    </m.div>
  );
}

/**
 * Cena central 3D: o trabalhador ao centro e os quatro serviços irradiando
 * dele. No desktop a seção é pinada e os callouts revelam um a um conforme o
 * scroll (com folga para ler); a cena inclina com o ponteiro (perspectiva CSS,
 * sem WebGL). No mobile, cai para uma composição em fluxo com revelação por
 * viewport. Em reduced-motion, tudo estático e legível, sem pin nem tilt.
 * Só `transform`/`opacity`; foto via next/image; altura reservada (CLS 0).
 */
export function WorkerScene() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const workerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const workerScale = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);
  const linesOpacity = useTransform(scrollYProgress, [0.04, 0.3], [0, 1]);

  // Tilt 3D por ponteiro na cena inteira.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 120, damping: 18, mass: 0.3 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function resetTilt() {
    px.set(0.5);
    py.set(0.5);
  }

  const left = callouts.filter((c) => c.side === "left");
  const right = callouts.filter((c) => c.side === "right");

  const heading = (
    <div className="mb-8 text-center md:mb-10">
      <p className="text-eyebrow text-petrol-200">
        Uma operação, não três fornecedores
      </p>
      <h2 className="text-h2 mt-3 text-balance text-white">
        Tudo começa e volta para{" "}
        <span className="text-accent-on-inverse">a mesma pessoa</span>
      </h2>
    </div>
  );

  // Conectores desenhados da pessoa (centro) para cada serviço.
  const connectors = (
    <m.svg
      aria-hidden
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 hidden size-full md:block"
      style={reduce ? undefined : { opacity: linesOpacity }}
    >
      <line x1="80" y1="50" x2="40" y2="30" stroke="currentColor" strokeWidth="0.4" className="text-white/25" />
      <line x1="80" y1="50" x2="120" y2="30" stroke="currentColor" strokeWidth="0.4" className="text-white/25" />
      <line x1="80" y1="50" x2="40" y2="70" stroke="currentColor" strokeWidth="0.4" className="text-white/25" />
      <line x1="80" y1="50" x2="120" y2="70" stroke="currentColor" strokeWidth="0.4" className="text-white/25" />
    </m.svg>
  );

  // ---- Reduced-motion / estático: sem pin, sem tilt, tudo visível ----
  if (reduce) {
    return (
      <section className="relative overflow-hidden bg-surface-inverse py-section text-ink-on-inverse">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {heading}
          <div className="grid grid-cols-1 items-center gap-x-10 gap-y-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col gap-8 md:items-end">
              {left.map((c) => (
                <CalloutCard key={c.key} data={c} align="left" />
              ))}
            </div>
            <WorkerPortrait />
            <div className="flex flex-col gap-8">
              {right.map((c) => (
                <CalloutCard key={c.key} data={c} align="right" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* Desktop: cena pinada, revelação por scroll */}
        <section
          ref={wrapperRef}
          style={{ height: "320vh" }}
          className="relative hidden bg-surface-inverse text-ink-on-inverse md:block"
        >
          <div className="sticky top-0 flex h-svh items-center overflow-hidden">
            <div className="mx-auto w-full max-w-6xl px-6">
              {heading}
              <div
                onMouseMove={handleMove}
                onMouseLeave={resetTilt}
                style={{ perspective: 1200 }}
                className="relative"
              >
                <m.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-12"
                >
                  {connectors}
                  <div className="relative z-10 flex flex-col gap-16">
                    {left.map((c) => (
                      <ScrollCallout key={c.key} data={c} align="left" progress={scrollYProgress} />
                    ))}
                  </div>
                  <div className="relative z-10">
                    <WorkerPortrait scale={workerScale} opacity={workerOpacity} />
                  </div>
                  <div className="relative z-10 flex flex-col gap-16">
                    {right.map((c) => (
                      <ScrollCallout key={c.key} data={c} align="right" progress={scrollYProgress} />
                    ))}
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile: fluxo normal, revelação por viewport */}
        <section className="relative overflow-hidden bg-surface-inverse py-section text-ink-on-inverse md:hidden">
          <div className="mx-auto max-w-md px-4">
            {heading}
            <WorkerPortrait />
            <Stagger className="mt-10 flex flex-col gap-8">
              {callouts.map((c) => (
                <CalloutCard key={c.key} data={c} align="right" />
              ))}
            </Stagger>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
