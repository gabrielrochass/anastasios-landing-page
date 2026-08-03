import { Qualifier } from "@/components/interactive/contact/qualifier";
import { BEAT_CONTENT } from "@/components/journey/beat-content";
import { Journey } from "@/components/journey/journey";
import { About } from "@/components/sections/home/about";
import { Credit } from "@/components/sections/home/credit";
import { Faq } from "@/components/sections/home/faq";
import { Intelligence } from "@/components/sections/home/intelligence";
import { Problem } from "@/components/sections/home/problem";
import { ProofBar } from "@/components/sections/home/proof-bar";
import { Sectors } from "@/components/sections/home/sectors";
import { SupplyChain } from "@/components/sections/home/supply-chain";
import { TaxStructure } from "@/components/sections/home/tax-structure";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo/schema";

/**
 * A home tem duas metades, e a divisão entre elas é uma regra, não um acaso.
 *
 * A jornada é o CARTAZ: sete batidas, uma afirmação por tela, cerca de 400
 * palavras. É o que a maioria vai ver e é o que faz a pessoa se autoqualificar
 * em menos de vinte segundos. O palco dela tem altura fixa e recorte rígido,
 * então nada que cresça cabe lá dentro.
 *
 * `#detalhe` é o DOCUMENTO: o material técnico completo, aberto, sem clique
 * nenhum no meio. A pesquisa de mercado é clara: 61% dos compradores B2B
 * preferem decidir sem falar com vendedor, e o campeão precisa de algo que ele
 * possa encaminhar para as outras quatro pessoas do comitê. Encaminhar pede
 * endereço próprio, e é por isso que cada bloco tem id.
 *
 * A regra que saiu do erro: **o palco não hospeda documento.** Crédito e cadeia
 * chegaram a morar dentro de um `<details>` numa batida, e o resultado foi
 * conteúdo que existia no DOM e não existia na tela, porque o estado expandido
 * não tinha para onde ir. Deletar machucaria de forma mensurável. Colapsar
 * dentro de um quadro que corta machuca igual, com a agravante de parecer que
 * está lá.
 *
 * A ordem espelha a jornada de propósito: quem sai da batida 05 cai em
 * `#credito`, quem sai da 06 cai em `#cadeia`, e quem desce sem clicar em nada
 * lê na mesma sequência que teria visto.
 */
export default function HomePage() {
  return (
    <>
      <Journey>{BEAT_CONTENT}</Journey>

      <div id="detalhe" style={{ scrollMarginTop: "6rem" }}>
        <ProofBar />
        <Problem />
        <SupplyChain />
        <Credit />
        <TaxStructure />
        <Sectors />
        <About />
        <Faq />
        <Intelligence />

        <section
          id="contato"
          data-mode="ocean"
          className="bg-surface py-section text-content"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="eyebrow text-accent">Contato</p>
            <h2 className="text-h2 mt-4">
              Responda quatro perguntas e a conversa já começa com contexto.
            </h2>
            <Qualifier className="mt-14" />
          </div>
        </section>
      </div>

      {/*
        As âncoras apontam para seções de fluxo normal, nunca para id de
        batida. As sete batidas são `absolute` dentro de um elemento `sticky`,
        então todas resolvem para a MESMA posição de documento, o topo do
        track. Este bloco já apontou para `conves` e a URL publicada caía no
        começo da jornada.
      */}
      <JsonLd
        data={serviceSchema({
          name: "Sourcing e homologação de fornecedores",
          description:
            "Prospecção, auditoria de fábrica e homologação de fornecedores na China, Índia e Leste Europeu.",
          anchor: "cadeia",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Prazo de pagamento na importação",
          description:
            "Estruturação da forma de pagamento, com prazo de 90 a 120 dias contados do embarque nas modalidades Open Account e Documents Against Acceptance.",
          anchor: "credito",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Estruturação tributária de importação",
          description:
            "Estudo comparativo entre importação por conta e ordem e por encomenda, com benefício estadual de ICMS e regime aduaneiro especial.",
          anchor: "tributario",
        })}
      />
    </>
  );
}
