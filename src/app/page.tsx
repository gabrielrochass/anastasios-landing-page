import { Qualifier } from "@/components/interactive/contact/qualifier";
import { BEAT_CONTENT } from "@/components/journey/beat-content";
import { Journey } from "@/components/journey/journey";
import { About } from "@/components/sections/home/about";
import { Faq } from "@/components/sections/home/faq";
import { Intelligence } from "@/components/sections/home/intelligence";
import { TaxStructure } from "@/components/sections/home/tax-structure";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo/schema";

/**
 * A home tem duas metades, e isso é intencional.
 *
 * A jornada é a superfície: sete batidas, uma ideia por tela, cerca de 400
 * palavras no total. É o que a maioria vai ver e é o que faz a pessoa se
 * autoqualificar em menos de vinte segundos.
 *
 * Abaixo dela, em `#detalhe`, fica o material técnico completo para quem
 * clicar em "ver em detalhe". A pesquisa de mercado é clara: 61% dos
 * compradores B2B preferem decidir sem falar com vendedor, e o campeão precisa
 * de algo que ele possa encaminhar para as outras quatro pessoas do comitê.
 * Deletar esse conteúdo machucaria de forma mensurável. Colapsar não.
 */
export default function HomePage() {
  return (
    <>
      <Journey>{BEAT_CONTENT}</Journey>

      <div id="detalhe" style={{ scrollMarginTop: "6rem" }}>
        <TaxStructure />
        <About />
        <Intelligence />
        <Faq />

        <section
          id="contato"
          data-mode="ocean"
          className="bg-surface py-section text-content"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-eyebrow text-accent">Contato</p>
            <h2 className="mt-4 font-serif text-h2">
              Quatro perguntas. A conversa começa com contexto.
            </h2>
            <Qualifier className="mt-14" />
          </div>
        </section>
      </div>

      <JsonLd
        data={serviceSchema({
          name: "Sourcing e homologação de fornecedores",
          description:
            "Prospecção, auditoria de fábrica e homologação de fornecedores na China, Índia e Leste Europeu.",
          anchor: "conves",
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
