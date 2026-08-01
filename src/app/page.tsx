import { Qualifier } from "@/components/interactive/contact/qualifier";
import { About } from "@/components/sections/home/about";
import { Credit } from "@/components/sections/home/credit";
import { Crossing } from "@/components/sections/home/crossing";
import { Faq } from "@/components/sections/home/faq";
import { Hero } from "@/components/sections/home/hero";
import { Intelligence } from "@/components/sections/home/intelligence";
import { Manifesto } from "@/components/sections/home/manifesto";
import { Origins } from "@/components/sections/home/origins";
import { PortsSectors } from "@/components/sections/home/ports-sectors";
import { Problem } from "@/components/sections/home/problem";
import { ProofBar } from "@/components/sections/home/proof-bar";
import { SupplyChain } from "@/components/sections/home/supply-chain";
import { TaxStructure } from "@/components/sections/home/tax-structure";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo/schema";

/**
 * A ordem das seções é o argumento comercial, nesta sequência:
 * reconhecer o problema, entender quem somos na cadeia, ver a operação
 * inteira, descobrir o crédito, entender a conta tributária, conferir alcance,
 * conhecer a pessoa, checar competência atual e só então falar.
 *
 * O crédito aparece cedo de propósito. É o único argumento que nenhum dos 12
 * concorrentes auditados oferece, e enterrá-lo no fim seria desperdiçar a
 * única vantagem difícil de copiar.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Manifesto />
      <Problem />
      <SupplyChain />
      <Crossing />
      <Credit />
      <TaxStructure />
      <Origins />
      <PortsSectors />
      <About />
      <Intelligence />
      <Faq />

      <section
        id="contato"
        data-mode="ocean"
        className="section-cv bg-surface py-section text-content"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-eyebrow text-accent">Contato</p>
          <h2 className="mt-4 font-serif text-h2">
            Quatro perguntas, e a conversa já começa com contexto.
          </h2>
          <p className="mt-5 text-lead text-content-muted">
            Toda conversa acontece no WhatsApp. As respostas abaixo montam a
            mensagem, então ninguém perde tempo se apresentando duas vezes.
          </p>
          <Qualifier className="mt-14" />
        </div>
      </section>

      <JsonLd
        data={serviceSchema({
          name: "Sourcing e homologação de fornecedores",
          description:
            "Prospecção, auditoria de fábrica e homologação de fornecedores na China, Índia e Leste Europeu.",
          anchor: "travessia",
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
