import { Band, BandHeading } from "@/components/sections/shared/band";
import { chainDisclaimer, supplyChain } from "@/data/offer";
import { cn } from "@/lib/utils";

/**
 * Onde a H H Brasil se encaixa na cadeia.
 *
 * Nenhum dos 12 concorrentes auditados explica isto, e é a seção que mais
 * diferencia a página. Faz dois trabalhos ao mesmo tempo: responde a objeção
 * "isso não é o que meu despachante já faz" e protege juridicamente, porque
 * deixa explícito o que a empresa não é.
 *
 * Uma lista ordenada, não um gráfico: a cadeia É uma sequência, e o elemento
 * semanticamente correto já dá leitura de ordem no leitor de tela de graça.
 * Vertical no mobile, horizontal a partir de md, mesmo array de nós.
 *
 * Também esteve presa dentro de um `<details>` no palco da jornada. Ressalva
 * jurídica atrás de um clique, dentro de um quadro que corta o conteúdo, não
 * protege ninguém.
 */
export function SupplyChain() {
  return (
    <Band id="cadeia">
      <BandHeading
        ordinal="02"
        eyebrow="Onde atuamos"
        title="A cadeia tem cinco papéis, e confundi-los custa caro."
        lead="O erro mais caro do setor é contratar a peça errada para o problema que se tem. Abaixo, quem faz o quê, com o nosso lugar marcado."
      />

      <ol className="bg-rule mt-16 grid gap-px md:grid-cols-5">
        {supplyChain.map((node, index) => (
          <li
            key={node.id}
            className={cn(
              "relative flex flex-col p-6",
              node.isUs ? "bg-accent text-accent-contrast" : "bg-surface",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "tabular-stat eyebrow",
                node.isUs ? "opacity-70" : "text-content-muted",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "text-body mt-3 font-sans font-semibold",
                node.isUs ? "" : "text-content",
              )}
            >
              {node.label}
            </h3>
            <p
              className={cn(
                "text-meta mt-3 leading-relaxed",
                node.isUs ? "opacity-85" : "text-content-muted",
              )}
            >
              {node.detail}
            </p>
          </li>
        ))}
      </ol>

      {/* O aviso é parte do argumento, não letra miúda. Dizer com clareza o
          que não fazemos é o que dá peso ao que fazemos. */}
      <p className="border-accent text-content-muted text-body mt-10 max-w-3xl border-l-2 pl-6 leading-relaxed">
        {chainDisclaimer}
      </p>
    </Band>
  );
}
