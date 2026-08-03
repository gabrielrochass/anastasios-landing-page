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

      <ol className="bg-rule mt-16 grid gap-px md:grid-cols-3">
        {problemScenarios.map((scenario) => (
          <li key={scenario.code} className="bg-surface">
            <article className="flex h-full flex-col p-8">
              <span className="rounded-badge border-rule-strong text-content-muted inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
                {scenario.code}
              </span>
              <h3 className="text-h3 mt-6 font-serif">{scenario.title}</h3>
              <p className="text-content-muted mt-4 text-sm leading-relaxed">
                {scenario.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Band>
  );
}
