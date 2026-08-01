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
 */
export function Credit() {
  return (
    <Band id="credito">
      <BandHeading
        ordinal="03"
        eyebrow="Crédito e prazo"
        title="A carga embarca, você nacionaliza, e o pagamento vence depois."
        lead="Nas modalidades OA e DA o prazo é de 90 a 120 dias contados do B/L, ou seja, da data do embarque e não da chegada. É o período em que o capital de giro costuma apertar."
      />

      {/* Desktop: tabela de comparação */}
      <div className="mt-16 hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Comparação das modalidades de pagamento CAD, OA e DA
          </caption>
          <thead>
            <tr className="border-b border-rule-strong">
              <th scope="col" className="w-40 py-4 pr-6 text-eyebrow text-content-muted">
                Modalidade
              </th>
              <th scope="col" className="py-4 pr-6 text-eyebrow text-content-muted">
                Prazo
              </th>
              <th scope="col" className="py-4 pr-6 text-eyebrow text-content-muted">
                Documentos originais
              </th>
              <th scope="col" className="py-4 text-eyebrow text-content-muted">
                Costuma servir para
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentTerms.map((term) => (
              <tr key={term.code} className="border-b border-rule align-top">
                <th scope="row" className="py-6 pr-6">
                  <span className="block font-mono text-sm text-accent">
                    {term.code}
                  </span>
                  <span className="mt-1 block text-xs font-normal text-content-muted">
                    {term.name}
                  </span>
                </th>
                <td className="py-6 pr-6 text-sm text-content">{term.term}</td>
                <td className="py-6 pr-6 text-sm text-content-muted">
                  {term.documents}
                </td>
                <td className="py-6 text-sm text-content-muted">
                  {term.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: os mesmos dados como lista de definições empilhada */}
      <div className="mt-12 flex flex-col gap-px bg-rule md:hidden">
        {paymentTerms.map((term) => (
          <article key={term.code} className="bg-surface py-8">
            <p className="font-mono text-sm text-accent">{term.code}</p>
            <p className="mt-1 text-xs text-content-muted">{term.name}</p>
            <dl className="mt-5 flex flex-col gap-4">
              <div>
                <dt className="text-eyebrow text-content-muted">Prazo</dt>
                <dd className="mt-1 text-sm text-content">{term.term}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Documentos originais
                </dt>
                <dd className="mt-1 text-sm text-content-muted">
                  {term.documents}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Costuma servir para
                </dt>
                <dd className="mt-1 text-sm text-content-muted">
                  {term.bestFor}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <WhatsappButton
          context="credito"
          variant="solid"
          label="Quero simular o prazo na minha operação"
          message="Olá! Vim pelo site e quero entender as modalidades de pagamento de 90 a 120 dias do B/L."
        />
        <p className="text-xs text-content-muted">
          A modalidade é definida junto com o seu financeiro, antes do contrato.
        </p>
      </div>
    </Band>
  );
}
