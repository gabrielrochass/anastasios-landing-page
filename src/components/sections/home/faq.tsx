import { Band, BandHeading } from "@/components/sections/shared/band";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/offer";

/**
 * Perguntas frequentes, incluindo as desconfortáveis.
 *
 * FAQ que só responde pergunta fácil não convence ninguém. As duas que
 * importam de verdade aqui são "vocês recebem comissão do fornecedor também"
 * e "vocês tomam posse da mercadoria", que são exatamente as que o mercado
 * evita. Três dos doze concorrentes auditados têm FAQ, e nenhum encara essas.
 *
 * Acordeão do Radix: teclado, aria-expanded e a relação entre gatilho e painel
 * já vêm corretos, e reimplementar isso à mão é como se introduz bug de
 * acessibilidade.
 */
export function Faq() {
  return (
    <Band id="faq">
      <BandHeading
        ordinal="08"
        eyebrow="Perguntas frequentes"
        title="As perguntas que costumam ficar sem resposta."
      />

      <Accordion type="single" collapsible className="mt-14 w-full">
        {faq.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="border-b border-rule"
          >
            <AccordionTrigger className="py-6 text-left font-sans text-base text-content hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl pb-8 text-sm leading-relaxed text-content-muted">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Band>
  );
}
