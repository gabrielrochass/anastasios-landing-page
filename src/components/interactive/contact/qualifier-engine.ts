/**
 * Motor do quiz de qualificação. Puro, sem UI, testável.
 *
 * A pesquisa de mercado mostrou uma tensão real: formulário filtra lead e
 * WhatsApp não. Cinco dos concorrentes brasileiros mandam direto para o
 * WhatsApp e recebem tudo que aparece. Como aqui o WhatsApp é o canal único, a
 * saída é não escolher entre os dois: quatro perguntas curtas montam a
 * mensagem, e a conversa começa com contexto.
 *
 * Efeito colateral que importa: quem não tem paciência para quatro perguntas
 * provavelmente não era lead qualificado.
 */

export type QuestionId = "escopo" | "volume" | "origem" | "dor";

export interface QuizOption {
  value: string;
  label: string;
  /** Como esta resposta aparece na mensagem do WhatsApp */
  phrase: string;
}

export interface QuizQuestion {
  id: QuestionId;
  prompt: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "escopo",
    prompt: "O que você importa, ou pretende importar?",
    options: [
      {
        value: "insumos",
        label: "Insumos industriais",
        phrase: "insumos industriais",
      },
      {
        value: "acabados",
        label: "Produtos acabados",
        phrase: "produtos acabados",
      },
      { value: "ambos", label: "Os dois", phrase: "insumos e produtos acabados" },
      {
        value: "exportacao",
        label: "Quero exportar",
        phrase: "exportação de produtos brasileiros",
      },
    ],
  },
  {
    id: "volume",
    prompt: "Volume anual estimado da operação?",
    options: [
      {
        value: "primeira",
        label: "Primeira importação",
        phrase: "seria a primeira importação da empresa",
      },
      { value: "ate-150k", label: "Até US$ 150 mil", phrase: "até US$ 150 mil por ano" },
      {
        value: "150k-1m",
        label: "De US$ 150 mil a US$ 1 milhão",
        phrase: "entre US$ 150 mil e US$ 1 milhão por ano",
      },
      {
        value: "acima-1m",
        label: "Acima de US$ 1 milhão",
        phrase: "acima de US$ 1 milhão por ano",
      },
    ],
  },
  {
    id: "origem",
    prompt: "Origem pretendida?",
    options: [
      { value: "china", label: "China", phrase: "com origem na China" },
      { value: "india", label: "Índia", phrase: "com origem na Índia" },
      {
        value: "leste-europeu",
        label: "Leste Europeu",
        phrase: "com origem no Leste Europeu",
      },
      {
        value: "avaliando",
        label: "Ainda avaliando",
        phrase: "ainda avaliando a melhor origem",
      },
    ],
  },
  {
    id: "dor",
    prompt: "O que mais pesa hoje?",
    options: [
      {
        value: "fornecedor",
        label: "Encontrar fornecedor confiável",
        phrase: "encontrar um fornecedor confiável",
      },
      {
        value: "capital",
        label: "Capital de giro e prazo de pagamento",
        phrase: "capital de giro e prazo de pagamento",
      },
      {
        value: "travada",
        label: "Carga travada ou custo inesperado",
        phrase: "carga travada ou custo que apareceu fora da conta",
      },
      {
        value: "tributario",
        label: "Estrutura tributária e habilitação",
        phrase: "estrutura tributária e habilitação para operar",
      },
    ],
  },
];

export type QuizAnswers = Partial<Record<QuestionId, string>>;

function phraseFor(id: QuestionId, answers: QuizAnswers): string | undefined {
  const question = quizQuestions.find((q) => q.id === id);
  const value = answers[id];
  if (!question || !value) return undefined;
  return question.options.find((option) => option.value === value)?.phrase;
}

export function isComplete(answers: QuizAnswers): boolean {
  return quizQuestions.every((question) => Boolean(answers[question.id]));
}

/**
 * Monta a mensagem em linguagem natural. Precisa ler como pessoa escrevendo,
 * não como formulário despejando campos, senão o efeito de "já chego com
 * contexto" vira o efeito oposto.
 */
export function composeMessage(answers: QuizAnswers): string {
  const escopo = phraseFor("escopo", answers);
  const volume = phraseFor("volume", answers);
  const origem = phraseFor("origem", answers);
  const dor = phraseFor("dor", answers);

  const parts: string[] = ["Olá! Vim pelo site."];

  if (escopo && origem) {
    parts.push(`Trabalho com ${escopo}, ${origem}.`);
  } else if (escopo) {
    parts.push(`Trabalho com ${escopo}.`);
  }

  if (volume) {
    parts.push(`O volume é ${volume}.`);
  }

  if (dor) {
    parts.push(`Hoje o que mais pesa é ${dor}.`);
  }

  parts.push("Podemos conversar?");

  return parts.join(" ");
}
