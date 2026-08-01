import { NumberTicker } from "@/components/motion/number-ticker";
import { proofPoints } from "@/data/offer";

/**
 * Barra de prova. Quatro números, cada um com a fonte visível embaixo.
 *
 * A fonte não é rodapé jurídico, é o argumento: em B2B de comércio exterior o
 * público confere, e número solto sem procedência lê como marketing. Um dos
 * concorrentes auditados exibe "+0 Clientes" em produção, com o contador
 * animado quebrado. O NumberTicker aqui coloca o valor real em sr-only e marca
 * o animado como aria-hidden, então mesmo se a animação falhar o número certo
 * está no DOM.
 */
export function ProofBar() {
  return (
    <section
      data-mode="ocean"
      className="border-y border-rule bg-surface text-content"
    >
      <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <div key={point.label} className="bg-surface px-6 py-10">
            <dt className="sr-only">{point.label}</dt>
            <dd>
              <span className="flex items-baseline font-serif text-stat text-content">
                {point.prefix ? (
                  <span className="mr-2 font-sans text-lead text-content-muted">
                    {point.prefix}
                  </span>
                ) : null}
                {/* value null significa "número ainda não confirmado pelo
                    cliente". Nesse caso não renderiza nada em vez de exibir
                    zero ou placeholder, porque zero numa barra de prova é pior
                    que espaço vazio. */}
                {point.value === null ? null : (
                  <NumberTicker value={point.value} />
                )}
                {point.suffix ? (
                  <span className="ml-1 font-sans text-lead text-content-muted">
                    {point.suffix}
                  </span>
                ) : null}
              </span>
              <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-content-muted">
                {point.label}
              </p>
              <p className="mt-4 border-t border-rule pt-3 font-mono text-[10px] uppercase tracking-widest text-content-muted">
                {point.source}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
