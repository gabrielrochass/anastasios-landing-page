import { NumberTicker } from "@/components/motion/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";

/**
 * [VALIDAR] Números vindos do PRD — confirmar com a E-Soluções antes do
 * go-live. Fonte: PRD v2.0, seção 3.1 "Prova Social".
 */
const stats = [
  { value: 850, suffix: "+", label: "empresas atendidas" },
  { value: 100, suffix: "%", label: "dos clientes com compliance ativo" },
  { value: 35, suffix: "%", label: "de redução média no custo de DP" },
];

export function SocialProof() {
  return (
    <Section tone="inverse">
      <SectionHeading
        tone="inverse"
        eyebrow="Prova, não promessa"
        title="Resultado que aparece no número"
        lead="Integrar folha, exames e riscos numa operação só tem efeito medível. É onde a conformidade deixa de ser discurso e vira indicador de gestão."
      />
      <Reveal className="mt-12">
        <dl className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-t border-petrol-800 pt-8 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0"
            >
              <dd className="text-stat text-white">
                <NumberTicker value={stat.value} />
                <span className="text-h2 text-accent-on-inverse">
                  {stat.suffix}
                </span>
              </dd>
              {/* acento curto no lugar de régua compartilhada */}
              <span
                aria-hidden
                className="mt-3 block h-0.5 w-10 rounded-full bg-orange-400"
              />
              <dt className="mt-3 max-w-[24ch] text-sm text-ink-muted-on-inverse">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal delay={0.15} className="mt-12">
        {/* [VALIDAR] case do PRD — anonimizado até autorização do cliente */}
        <figure className="max-w-3xl rounded-xl bg-petrol-900/60 p-card">
          <blockquote className="border-l-2 border-orange-400 pl-5 leading-relaxed text-ink-muted-on-inverse">
            <span className="font-semibold text-white">
              Indústria de logística, 500 funcionários:
            </span>{" "}
            de 40% para 100% de conformidade documental em 3 meses, com redução
            de 40% nos afastamentos no primeiro ano.
          </blockquote>
        </figure>
      </Reveal>
    </Section>
  );
}
