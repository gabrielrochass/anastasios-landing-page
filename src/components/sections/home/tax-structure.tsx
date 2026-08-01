import { Band, BandHeading } from "@/components/sections/shared/band";
import { importRegimes, oeaCaveat, regimeSource } from "@/data/offer";

/**
 * Estruturação tributária. Conta e ordem contra encomenda.
 *
 * É a distinção mais confundida do setor, e explicá-la direito faz duas
 * coisas: mostra domínio técnico e justifica a consultoria, porque a escolha
 * errada de regime custa dinheiro todo mês.
 *
 * A ressalva sobre OEA no fim é deliberada. Dizer que operar sempre via
 * trading trabalha contra a certificação custa uma venda de vez em quando, e
 * compra a credibilidade de quem explica o que não convém. Nenhum concorrente
 * publica isso.
 */
export function TaxStructure() {
  return (
    <Band id="tributario">
      <BandHeading
        ordinal="04"
        eyebrow="Estruturação tributária"
        title="O regime da operação decide quanto imposto você paga, e quem responde por ele."
        lead="Antes de fechar, apresentamos o estudo comparando conta e ordem com encomenda, considerando benefício estadual de ICMS e regime aduaneiro especial federal."
      />

      <div className="mt-16 grid gap-px bg-rule md:grid-cols-2">
        {importRegimes.map((regime) => (
          <article key={regime.id} className="bg-surface p-8">
            <h3 className="font-serif text-h3">{regime.name}</h3>
            <dl className="mt-6 flex flex-col">
              {[
                ["Recursos", regime.funds],
                ["Propriedade da mercadoria", regime.ownership],
                ["Responsável tributário", regime.taxLiability],
                ["Nota fiscal", regime.invoice],
                ["Costuma servir quando", regime.fitsWhen],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-rule py-4 last:border-b-0"
                >
                  <dt className="text-eyebrow text-content-muted">{label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-content">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-content-muted">
        Base legal: {regimeSource}
      </p>

      <aside className="mt-12 max-w-3xl border-l-2 border-accent pl-6">
        <p className="text-eyebrow text-accent">O que quase ninguém conta</p>
        <p className="mt-3 text-sm leading-relaxed text-content-muted">
          {oeaCaveat}
        </p>
      </aside>
    </Band>
  );
}
