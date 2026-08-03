import { Band, BandHeading } from "@/components/sections/shared/band";
import { sectors } from "@/data/offer";

/**
 * Portos e setores.
 *
 * A lista de portos que existia aqui saiu junto com `src/data/routes.ts`, que
 * foi deletado. O argumento do porto virou uma linha no lead, porque ele
 * continua verdadeiro e não depende do dado que sumiu.
 */
export function Sectors() {
  return (
    <Band id="setores">
      <BandHeading
        ordinal="06"
        eyebrow="Para quem"
        title="Três tipos de operação."
        lead="Operamos com todos os portos brasileiros. O porto certo raramente é o mais perto, e a escolha entra no estudo antes de fechar a operação."
      />

      <div className="bg-rule mt-16 grid gap-px md:grid-cols-3">
        {sectors.map((sector) => (
          <article key={sector.title} className="bg-surface p-8">
            <h3 className="text-h3 font-serif">{sector.title}</h3>
            <p className="text-content-muted mt-4 text-sm leading-relaxed">
              {sector.body}
            </p>
          </article>
        ))}
      </div>
    </Band>
  );
}
