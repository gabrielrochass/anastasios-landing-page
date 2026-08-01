import { Band, BandHeading } from "@/components/sections/shared/band";
import { sectors } from "@/data/offer";
import { destinationPorts } from "@/data/routes";

/**
 * Portos e setores.
 *
 * A lista de portos é uma amostra, não um limite, e o texto diz isso. Listar
 * os trinta e poucos portos do país viraria ruído, e omitir a ressalva viraria
 * mentira por omissão para quem opera fora dos dez principais.
 */
export function PortsSectors() {
  return (
    <Band id="portos">
      <BandHeading
        ordinal="06"
        eyebrow="Portos e setores"
        title="O porto certo raramente é o mais perto."
        lead="É o que combina benefício estadual, estrutura para o seu tipo de carga e prazo. Operamos com todos os portos brasileiros, e a escolha entra no estudo antes de fechar a operação."
      />

      <div className="mt-14">
        <h3 className="text-eyebrow text-content-muted">
          Alguns dos portos de destino
        </h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {destinationPorts.map((port) => (
            <li
              key={port.code}
              className="inline-flex items-baseline gap-2 rounded-sm border border-rule px-3 py-2"
            >
              <span className="font-mono text-[11px] tabular-stat text-accent">
                {port.code}
              </span>
              <span className="text-sm text-content">{port.name}</span>
              <span className="font-mono text-[10px] text-content-muted">
                {port.state}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-content-muted">
          A lista acima é amostra, não limite.
        </p>
      </div>

      <div className="mt-16 grid gap-px bg-rule md:grid-cols-3">
        {sectors.map((sector) => (
          <article key={sector.title} className="bg-surface p-8">
            <h3 className="font-serif text-h3">{sector.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-content-muted">
              {sector.body}
            </p>
          </article>
        ))}
      </div>
    </Band>
  );
}
