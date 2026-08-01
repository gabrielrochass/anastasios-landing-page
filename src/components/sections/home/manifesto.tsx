import { TextReveal } from "@/components/motion/text-reveal";
import { Band } from "@/components/sections/shared/band";

/**
 * Manifesto. O texto aprovado pelo próprio cliente, na íntegra.
 *
 * É o único momento de revelação palavra a palavra da página inteira. Usado
 * duas vezes, viraria maneirismo; usado uma, marca que aquele parágrafo é o
 * que a empresa assina.
 *
 * A transição doc depois de ocean também é o respiro: sai o mar, entra o
 * papel, e a leitura densa começa.
 */
const MANIFESTO =
  "Tradição, segurança e performance no comércio exterior. Unimos agilidade administrativa, suporte jurídico e logística de alta performance para garantir operações com risco mínimo. Do registro no RADAR à entrega no porto, a prioridade é uma só: a segurança do seu negócio e a rentabilidade da sua operação.";

export function Manifesto() {
  return (
    <Band>
      <div className="max-w-4xl">
        <p className="text-eyebrow text-accent">Quem somos, em um parágrafo</p>
        <TextReveal
          text={MANIFESTO}
          className="mt-8 font-serif text-h2 leading-[1.35]"
        />
      </div>
    </Band>
  );
}
