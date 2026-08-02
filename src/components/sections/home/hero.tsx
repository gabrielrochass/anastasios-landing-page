"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { OceanCanvas } from "@/components/webgl/ocean-canvas";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { siteConfig } from "@/lib/site-config";

/**
 * Herói. Mar em WebGL2 atrás, conteúdo por cima.
 *
 * O h1 não recebe animação de entrada. Ele é o LCP, e animar o LCP é trocar
 * pontuação por efeito num elemento que a pessoa precisa ler no primeiro
 * frame. O movimento aqui é o mar, que é decorativo e gated.
 *
 * `svh` e não `vh`: a barra de URL do mobile muda `vh` durante o scroll e o
 * herói pularia.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Aquece o mar conforme o herói sai de cena, como um fim de tarde chegando.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={ref}
      data-mode="ocean"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-surface text-content"
    >
      <OceanCanvas progress={scrollYProgress} className="-z-10" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-32 sm:px-6">
        <p className="text-eyebrow text-accent">
          Sourcing e gestão de risco em comércio exterior
        </p>

        <h1 className="mt-6 max-w-4xl font-serif text-display">
          Sua importação não pode depender de sorte.
        </h1>

        <p className="mt-8 max-w-2xl text-lead text-content-muted">
          {siteConfig.years.brazil} anos no comércio brasileiro,{" "}
          {siteConfig.years.foreignTrade} no exterior. Homologamos fornecedores
          na China, na Índia e no Leste Europeu, estruturamos o regime
          tributário da operação e financiamos o embarque com prazo de 90 a 120
          dias contados do B/L.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contato"
            className="inline-flex min-h-12 items-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
          >
            Quero estruturar minha importação
          </a>
          <WhatsappButton />
        </div>

        {/* Separação por estrutura com borda de 1px, nunca por midpoint. */}
        <dl className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-content-muted">
          <div className="flex items-baseline gap-2">
            <dt>Origens</dt>
            <dd className="text-content">China, Índia, Leste Europeu</dd>
          </div>
          <div className="flex items-baseline gap-2 border-l border-rule pl-8">
            <dt>Prazo</dt>
            <dd className="tabular-stat text-content">90 a 120 dias do B/L</dd>
          </div>
          <div className="flex items-baseline gap-2 border-l border-rule pl-8">
            <dt>Portos</dt>
            <dd className="text-content">Todos os brasileiros</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
