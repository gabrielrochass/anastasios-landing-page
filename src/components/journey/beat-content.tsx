import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { paymentTerms, supplyChain, chainDisclaimer } from "@/data/offer";
import { siteConfig } from "@/lib/site-config";

/**
 * O conteúdo das sete batidas.
 *
 * Orçamento: no máximo 55 palavras por viewport no desktop, 35 no mobile.
 * Headline de 2 a 8 palavras, mediana 4. Uma batida silenciosa.
 *
 * A estrutura de copy é sempre a mesma, e é o movimento mais reproduzível da
 * Apple: eyebrow curto, headline em fragmento, e o par "Frase. Virada." onde a
 * segunda sentença vira a primeira.
 *
 * O conteúdo técnico não sumiu, migrou para dentro de <details> nativo. Zero
 * JS, teclado funciona de fábrica, o texto continua no DOM (indexável pelo
 * Google e pelos buscadores de IA), e zero CLS desde que a altura não seja
 * animada. Colapsar preserva o trabalho que aquele conteúdo faz para o
 * comprador que não quer falar com vendedor, e remove o peso visual.
 */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-eyebrow text-accent">{children}</p>;
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 max-w-3xl font-serif text-display text-content">
      {children}
    </h2>
  );
}

/** Divulgação progressiva. `<details>` nativo, nada de acordeão em JS. */
function Detail({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-rule">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-content marker:hidden">
        <span className="font-mono text-[11px] uppercase tracking-widest">
          {summary}
        </span>
        <span
          aria-hidden
          className="text-accent transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-6 text-sm leading-relaxed text-content-muted">
        {children}
      </div>
    </details>
  );
}

/* 01 ─ Chegada ─────────────────────────────────────────────────────────── */

export function BeatChegada() {
  return (
    <div>
      <Eyebrow>Comércio exterior</Eyebrow>
      <h1 className="mt-3 max-w-3xl font-serif text-display text-content">
        Sorte não é método.
      </h1>
      <p className="mt-6 max-w-xl text-lead text-content-muted">
        {siteConfig.years.foreignTrade} anos trazendo carga da Ásia e da Europa
        para o Brasil. Da escolha da fábrica até a entrega no porto.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#partida"
          className="inline-flex min-h-12 items-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
        >
          Quero estruturar minha importação
        </a>
      </div>
    </div>
  );
}

/* 02 ─ Escala ──────────────────────────────────────────────────────────── */

export function BeatCasco() {
  return (
    <div>
      <Eyebrow>Trajetória</Eyebrow>
      <p className="mt-6 font-serif text-stat tabular-stat text-content">
        {siteConfig.years.brazil}
      </p>
      <p className="mt-4 max-w-md text-lead text-content-muted">
        anos de comércio na família. Os últimos{" "}
        {siteConfig.years.foreignTrade} deles fora do país.
      </p>
    </div>
  );
}

/* 03 ─ A bordo ─────────────────────────────────────────────────────────── */

/**
 * Sem sigla inventada. SRC, FIN e TAX não querem dizer nada para quem chega, e
 * rótulo que precisa ser decifrado gasta a atenção que a frase seguinte
 * precisava. Numeração simples resolve o mesmo problema de ancoragem visual.
 */
const FRENTES = [
  {
    ordinal: "01",
    title: "Quem produz",
    body: "Fábrica auditada e aprovada por nós, não indicada por terceiro.",
  },
  {
    ordinal: "02",
    title: "Quando você paga",
    body: "Até 120 dias depois de a carga embarcar.",
  },
  {
    ordinal: "03",
    title: "Quanto de imposto",
    body: "O regime da operação decidido com estudo, antes de fechar.",
  },
];

export function BeatConves() {
  return (
    <div>
      <Eyebrow>O que fazemos</Eyebrow>
      <Headline>Três frentes. Um responsável.</Headline>
      <ul className="mt-12 grid gap-px bg-rule sm:grid-cols-3">
        {FRENTES.map((f) => (
          <li key={f.ordinal} className="bg-surface p-6">
            <span className="font-mono text-[11px] tabular-stat tracking-widest text-accent">
              {f.ordinal}
            </span>
            <h3 className="mt-3 text-h3 text-content">{f.title}</h3>
            <p className="mt-2 text-sm text-content-muted">{f.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 04 ─ Corredor ────────────────────────────────────────────────────────── */

/**
 * A batida silenciosa. Zero palavras, de propósito.
 *
 * A Apple reserva uma por página, e ela é o que dá peso às outras seis: sem um
 * momento em que a página não pede nada, nenhum momento consegue pedir muito.
 * O `aria-label` na seção já nomeia a batida para quem usa leitor de tela.
 */
export function BeatCorredor() {
  return null;
}

/* 05 ─ Abertura ────────────────────────────────────────────────────────── */

export function BeatAbertura() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>Crédito</Eyebrow>
      <Headline>Embarca agora. Paga depois.</Headline>
      <p className="mt-5 text-lead text-content-muted">
        O prazo conta do dia do embarque, não do dia da chegada. Você recebe a
        mercadoria e libera na alfândega antes de o pagamento vencer.
      </p>

      <div className="mt-7">
        {paymentTerms.map((term) => (
          <Detail key={term.code} summary={term.plain}>
            <dl className="flex flex-col gap-3">
              <div>
                <dt className="text-eyebrow text-content-muted">Prazo</dt>
                <dd className="mt-1 text-content">{term.term}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Documentos originais
                </dt>
                <dd className="mt-1">{term.documents}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-content-muted">
                  Costuma servir para
                </dt>
                <dd className="mt-1">{term.bestFor}</dd>
              </div>
            </dl>
          </Detail>
        ))}
      </div>
    </div>
  );
}

/* 06 ─ Manifesto ───────────────────────────────────────────────────────── */

export function BeatManifesto() {
  return (
    // max-w-lg e não max-w-2xl: mesmo com o alvo acompanhando a explosão, a
    // coluna limpa nesta batida mede 548px e o lead em 2xl pede 672px.
    <div className="max-w-lg">
      <Eyebrow>Onde atuamos</Eyebrow>
      <Headline>Não somos despachante. Nem trading.</Headline>
      <p className="mt-5 text-lead text-content-muted">
        Somos quem coordena todo mundo e responde quando alguma coisa trava.
      </p>

      <div className="mt-7">
        <Detail summary="A cadeia, e onde entramos">
          <ol className="flex flex-col gap-3">
            {supplyChain.map((node) => (
              <li
                key={node.id}
                className={
                  node.isUs
                    ? "border-l-2 border-accent pl-4 text-content"
                    : "border-l border-rule pl-4"
                }
              >
                <strong className="font-semibold">{node.label}</strong>
                <br />
                {node.detail}
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-rule pt-4">{chainDisclaimer}</p>
        </Detail>
      </div>
    </div>
  );
}

/* 07 ─ Partida ─────────────────────────────────────────────────────────── */

export function BeatPartida() {
  return (
    <div className="max-w-xl">
      <Eyebrow>Contato</Eyebrow>
      <Headline>A conversa começa por mensagem.</Headline>
      <p className="mt-6 text-lead text-content-muted">
        Sem formulário e sem cadastro. Você escreve, a gente responde.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <WhatsappButton
          variant="solid"
          label="Quero estruturar minha importação"
        />
        <a
          href="#detalhe"
          className="min-h-11 border-b border-rule-strong pb-1 text-sm text-content-muted transition-colors hover:text-content"
        >
          Ver tudo em detalhe
        </a>
      </div>
    </div>
  );
}

export const BEAT_CONTENT = [
  <BeatChegada key="chegada" />,
  <BeatCasco key="casco" />,
  <BeatConves key="conves" />,
  <BeatCorredor key="corredor" />,
  <BeatAbertura key="abertura" />,
  <BeatManifesto key="manifesto" />,
  <BeatPartida key="partida" />,
];
