import { Reveal } from "@/components/motion/reveal";
import { Band, BandHeading } from "@/components/sections/shared/band";
import { problemScenarios } from "@/data/offer";

/**
 * O problema, em três cenários reconhecíveis.
 *
 * Escrito no vocabulário operacional de verdade: canal cinza, free time,
 * demurrage, NCM, perdimento. Quem já importou lê isso e sabe que do outro
 * lado tem alguém que fez o trabalho. Quem nunca importou entende do mesmo
 * jeito, porque cada cenário explica a consequência em dinheiro.
 */
export function Problem() {
  return (
    <Band id="problema">
      <BandHeading
        ordinal="01"
        eyebrow="O problema"
        title="Importação não costuma dar errado no preço. Dá errado no meio do caminho."
        lead="Três situações que todo importador reconhece, e que têm em comum o fato de a conta só aparecer depois que já não dá para negociar."
      />

      <ol className="mt-16 grid gap-px bg-rule md:grid-cols-3">
        {problemScenarios.map((scenario, index) => (
          <li key={scenario.code} className="bg-surface">
            <Reveal delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col p-8">
                <span className="inline-flex w-fit items-center rounded-badge border border-rule-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-content-muted">
                  {scenario.code}
                </span>
                <h3 className="mt-6 font-serif text-h3">{scenario.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-content-muted">
                  {scenario.body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Band>
  );
}
