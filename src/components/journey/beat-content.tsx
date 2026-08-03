import { WhatsappButton } from "@/components/layout/whatsapp-button";
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
 * O conteúdo técnico NÃO mora aqui, e essa é a regra que este arquivo
 * existe para respeitar: o palco não hospeda documento.
 *
 * Já morou. Ficava dentro de um `<details>` nativo, e a escolha estava certa
 * isoladamente e errada no contexto. O palco é `sticky h-svh overflow-hidden`,
 * de altura fixa e recorte rígido, e o único scroll disponível pertence ao
 * track da jornada, que é o mesmo scroll que apaga a batida. Ou seja: o estado
 * expandido não tinha para onde ir e não havia gesto que o alcançasse. Medido
 * a 375 por 844: a caixa útil é cerca de 409px e o estado FECHADO já usava
 * cerca de 385px.
 *
 * A batida faz uma afirmação e aponta. Comparação, tabela, definição e
 * ressalva jurídica vivem em `#credito` e `#cadeia`, em fluxo normal, onde a
 * página pode crescer. Lá o conteúdo também funciona sem JavaScript, é
 * indexável, imprime e tem endereço próprio para encaminhar.
 */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-eyebrow text-accent">{children}</p>;
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-display text-content mt-3 max-w-3xl font-serif">
      {children}
    </h2>
  );
}

/* 01 ─ Chegada ─────────────────────────────────────────────────────────── */

export function BeatChegada() {
  return (
    <div>
      <Eyebrow>Comércio exterior</Eyebrow>
      <h1 className="text-display text-content mt-3 max-w-3xl font-serif">
        Sorte não é método.
      </h1>
      <p className="text-lead text-content-muted mt-6 max-w-xl">
        {siteConfig.years.foreignTrade} anos trazendo carga da Ásia e da Europa
        para o Brasil. Da escolha da fábrica até a entrega no porto.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {/*
          `#contato` e não `#partida`. Medido com scripts/_anchors.mjs: a
          batida `partida` é `absolute` dentro de um `sticky`, então não tem
          posição de documento própria e resolve para o topo do track. O CTA
          principal da página não navegava. `#contato` também é o destino
          semanticamente certo: quem clica em "quero estruturar" quer o
          formulário, não outra tela de cena.
        */}
        <a
          href="#contato"
          className="bg-accent text-accent-contrast inline-flex min-h-12 items-center rounded-sm px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
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
      <p className="text-stat tabular-stat text-content mt-6 font-serif">
        {siteConfig.years.brazil}
      </p>
      <p className="text-lead text-content-muted mt-4 max-w-md">
        anos de comércio na família. Os últimos {siteConfig.years.foreignTrade}{" "}
        deles fora do país.
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
    // max-w-2xl e não largura livre: a grade de três colunas ocupava os 1152px
    // inteiros do contêiner, então não sobrava coluna limpa nenhuma e o objeto
    // atravessava os cartões por falta de lugar para onde ir.
    <div className="max-w-2xl">
      <Eyebrow>O que fazemos</Eyebrow>
      <Headline>Três frentes. Um responsável.</Headline>
      {/*
        Duas formas para a mesma lista, e não uma esticada.

        MOBILE: linha com fio, ordinal na mesma linha do título, corpo justo
        embaixo. Três cartões com p-6 empilhados pedem cerca de 447px, e do
        início do texto até o botão flutuante existem cerca de 382px. O terceiro
        ficava cortado na dobra.

        SM E ACIMA: a grade de três colunas, onde o cartão faz sentido porque
        eles ficam lado a lado e o fio separa em vez de empilhar.
      */}
      <ul className="divide-rule border-rule sm:bg-rule mt-7 divide-y border-y sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0 sm:border-0">
        {FRENTES.map((f) => (
          <li key={f.ordinal} className="sm:bg-surface py-3 sm:p-6">
            <div className="flex items-baseline gap-2.5 sm:block">
              <span className="tabular-stat text-accent font-mono text-[11px] tracking-widest">
                {f.ordinal}
              </span>
              <h3 className="text-h3 text-content sm:mt-3">{f.title}</h3>
            </div>
            <p className="text-content-muted mt-1 text-[13px] leading-snug sm:mt-2 sm:text-sm sm:leading-relaxed">
              {f.body}
            </p>
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
      <p className="text-lead text-content-muted mt-5">
        O prazo conta do dia do embarque, não do dia da chegada. Você recebe a
        mercadoria e libera na alfândega antes de o pagamento vencer.
      </p>

      {/*
        `inline-flex items-center` e não um `<a>` solto: `min-height` não se
        aplica a caixa inline não substituída (CSS 2.1 secao 10.7), então o
        alvo de 44px de `min-h-11` seria letra morta num anchor padrão.
      */}
      <a
        href="#credito"
        className="border-rule-strong text-content-muted hover:text-content mt-9 inline-flex min-h-11 items-center border-b pb-1 text-sm transition-colors"
      >
        Comparar as três formas de pagamento
      </a>
    </div>
  );
}

/* 06 ─ Manifesto ───────────────────────────────────────────────────────── */

export function BeatManifesto() {
  return (
    <div className="max-w-lg">
      <Eyebrow>Onde atuamos</Eyebrow>
      <Headline>Não somos despachante. Nem trading.</Headline>
      <p className="text-lead text-content-muted mt-5">
        Somos quem coordena todo mundo e responde quando alguma coisa trava.
      </p>

      <a
        href="#cadeia"
        className="border-rule-strong text-content-muted hover:text-content mt-9 inline-flex min-h-11 items-center border-b pb-1 text-sm transition-colors"
      >
        Ver a cadeia inteira e onde entramos
      </a>
    </div>
  );
}

/* 07 ─ Partida ─────────────────────────────────────────────────────────── */

export function BeatPartida() {
  return (
    <div className="max-w-xl">
      <Eyebrow>Contato</Eyebrow>
      <Headline>A conversa começa por mensagem.</Headline>
      <p className="text-lead text-content-muted mt-6">
        Sem formulário e sem cadastro. Você escreve, a gente responde.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <WhatsappButton
          variant="solid"
          label="Quero estruturar minha importação"
        />
        <a
          href="#detalhe"
          className="border-rule-strong text-content-muted hover:text-content inline-flex min-h-11 items-center border-b pb-1 text-sm transition-colors"
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
