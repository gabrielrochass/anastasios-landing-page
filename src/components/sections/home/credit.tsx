import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Band, BandHeading } from "@/components/sections/shared/band";
import { paymentTerms } from "@/data/offer";

/**
 * Crédito e modalidades de pagamento. O diferencial comercial número 1.
 *
 * Nenhum dos 12 concorrentes auditados oferece prazo de pagamento pós
 * embarque. Para o importador isso não é uma condição comercial, é capital de
 * giro: a carga chega, nacionaliza e vende antes de o pagamento vencer.
 *
 * Tabela no desktop e cartões empilhados no mobile, a partir do MESMO array.
 * Tabela com rolagem horizontal escondida é armadilha de descoberta e de
 * acessibilidade, então não existe aqui.
 *
 * Esta seção existiu e foi deletada no redesign. O conteúdo dela foi parar
 * dentro de um `<details>` no palco da jornada, que é `sticky h-svh
 * overflow-hidden`, e lá não tinha para onde crescer: a caixa útil no mobile é
 * cerca de 409px e o estado FECHADO já ocupava tudo. Voltou para o fluxo
 * normal, que é onde documento vive.
 */
export function Credit() {
  return (
    <Band id="credito">
      <BandHeading
        ordinal="03"
        eyebrow="Crédito e prazo"
        title="A carga embarca, você nacionaliza, e o pagamento vence depois."
        lead="Em duas das três formas o prazo é de 90 a 120 dias contados do conhecimento de embarque, ou seja, da data em que a carga sai e não da data em que ela chega. É exatamente o período em que o capital de giro costuma apertar."
      />

      {/* Desktop: tabela de comparação */}
      <div className="mt-16 hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Comparação das modalidades de pagamento CAD, OA e DA
          </caption>
          <thead>
            <tr className="border-rule-strong border-b">
              <th
                scope="col"
                className="text-eyebrow text-content-muted w-40 py-4 pr-6"
              >
                Modalidade
              </th>
              <th
                scope="col"
                className="text-eyebrow text-content-muted py-4 pr-6"
              >
                Prazo
              </th>
              <th
                scope="col"
                className="text-eyebrow text-content-muted py-4 pr-6"
              >
                Documentos originais
              </th>
              <th scope="col" className="text-eyebrow text-content-muted py-4">
                Costuma servir para
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentTerms.map((term) => (
              <tr key={term.code} className="border-rule border-b align-top">
                <th scope="row" className="py-6 pr-6">
                  <span className="text-accent block font-mono text-sm">
                    {term.code}
                  </span>
                  <span className="text-content-muted mt-1 block text-xs font-normal">
                    {term.name}
                  </span>
                </th>
                <td className="text-content py-6 pr-6 text-sm">{term.term}</td>
                <td className="text-content-muted py-6 pr-6 text-sm">
                  {term.documents}
                </td>
                <td className="text-content-muted py-6 text-sm">
                  {term.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: os mesmos dados como lista de definições empilhada */}
      <div className="bg-rule mt-12 flex flex-col gap-px md:hidden">
        {paymentTerms.map((term) => (
          <article key={term.code} className="bg-surface py-8">
            <p className="text-accent font-mono text-sm">{term.code}</p>
            <p className="text-content-muted mt-1 text-xs">{term.name}</p>
            <dl className="mt-5 flex flex-col gap-4">
              <div>
                <dt className="text-eyebrow text-content-muted">Prazo</dt>
                <dd className="text-content mt-1 text-sm">{term.term}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Documentos originais
                </dt>
                <dd className="text-content-muted mt-1 text-sm">
                  {term.documents}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Costuma servir para
                </dt>
                <dd className="text-content-muted mt-1 text-sm">
                  {term.bestFor}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <WhatsappButton
          variant="solid"
          label="Quero simular o prazo na minha operação"
          message="Olá! Vim pelo site e quero entender as formas de pagamento de 90 a 120 dias contados do embarque."
        />
        <p className="text-content-muted text-xs">
          A modalidade é definida junto com o seu financeiro, antes do contrato.
        </p>
      </div>
    </Band>
  );
}
