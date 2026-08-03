import { proofPoints } from "@/data/offer";

/**
 * Barra de prova. Quatro números, uma linha de rótulo cada.
 *
 * A versão anterior tinha quatro camadas por cartão: número, rótulo em duas
 * linhas, um fio, e a fonte em monoespaçada. Dezesseis linhas de texto numa
 * faixa cuja função é ser lida de relance. Faixa não é seção: se ela precisa
 * ser lida, ela falhou.
 *
 * A fonte de cada número saiu da tela, e isso foi decisão contra o meu próprio
 * argumento anterior. Eu defendi que a procedência justificava a faixa existir,
 * e ainda acho que "sem fonte não vai para a página" é a regra certa. Só que
 * duas das quatro fontes são "Palavra do cliente", que não é fonte: é a
 * admissão de que não existe uma. Impressa embaixo do número, ela enfraquece o
 * que deveria sustentar. O campo continua em `offer.ts` e volta quando o
 * cliente entregar número verificável.
 *
 * O número é texto estático. Um dos concorrentes auditados exibe "+0 Clientes"
 * em produção com o contador animado quebrado, e contador é exatamente o
 * mecanismo que falha desse jeito. Número aqui é para ser lido, não celebrado.
 */
export function ProofBar() {
  return (
    <section
      id="prova"
      data-mode="ocean"
      className="border-rule bg-surface text-content border-y"
    >
      <dl className="bg-rule mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
        {proofPoints.map((point) => (
          <div key={point.label} className="bg-surface px-6 py-8">
            <dt className="sr-only">{point.label}</dt>
            <dd>
              <span className="text-stat text-content flex items-baseline">
                {point.prefix ? (
                  <span className="text-content-muted text-body mr-1.5 font-normal">
                    {point.prefix}
                  </span>
                ) : null}
                {/* value null significa "número ainda não confirmado pelo
                    cliente". Nesse caso não renderiza nada em vez de exibir
                    zero ou placeholder, porque zero numa barra de prova é pior
                    que espaço vazio. */}
                {point.value === null ? null : point.value}
                {point.suffix ? (
                  <span className="text-content-muted text-body ml-1.5 font-normal">
                    {point.suffix}
                  </span>
                ) : null}
              </span>
              <p className="text-content-muted text-body mt-2">{point.label}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
