import { proofPoints } from "@/data/offer";

/**
 * Barra de prova. Quatro números, cada um com a fonte visível embaixo.
 *
 * A fonte não é rodapé jurídico, é o argumento: em B2B de comércio exterior o
 * público confere, e número solto sem procedência lê como marketing. Um dos
 * concorrentes auditados exibe "+0 Clientes" em produção, com o contador
 * animado quebrado. Aqui o número é texto estático: contador animado é
 * exatamente o mecanismo que falha e deixa zero na tela, e ele não acrescenta
 * nada a um número que precisa ser lido, não celebrado.
 */
export function ProofBar() {
  return (
    <section
      data-mode="ocean"
      className="border-rule bg-surface text-content border-y"
    >
      <dl className="bg-rule mx-auto grid max-w-6xl grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <div key={point.label} className="bg-surface px-6 py-10">
            <dt className="sr-only">{point.label}</dt>
            <dd>
              <span className="text-stat text-content flex items-baseline font-serif">
                {point.prefix ? (
                  <span className="text-lead text-content-muted mr-2 font-sans">
                    {point.prefix}
                  </span>
                ) : null}
                {/* value null significa "número ainda não confirmado pelo
                    cliente". Nesse caso não renderiza nada em vez de exibir
                    zero ou placeholder, porque zero numa barra de prova é pior
                    que espaço vazio. */}
                {point.value === null ? null : point.value}
                {point.suffix ? (
                  <span className="text-lead text-content-muted ml-1 font-sans">
                    {point.suffix}
                  </span>
                ) : null}
              </span>
              <p className="text-content-muted mt-4 max-w-[26ch] text-sm leading-relaxed">
                {point.label}
              </p>
              <p className="border-rule text-content-muted mt-4 border-t pt-3 font-mono text-[10px] tracking-widest uppercase">
                {point.source}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
