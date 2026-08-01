import type { ContactService } from "@/lib/schemas/contact";

export interface QuizAnswers {
  need: "clinica" | "sst" | "dp" | "treinamentos" | "nao-sei";
  size: "1-19" | "20-99" | "100+";
  urgency: "fiscalizacao" | "prazo" | "planejamento";
}

export interface QuizRecommendation {
  service: ContactService;
  label: string;
  note: string;
  urgent: boolean;
}

const needToService: Record<QuizAnswers["need"], ContactService> = {
  clinica: "clinica-ocupacional",
  sst: "engenharia-sst",
  dp: "departamento-pessoal",
  treinamentos: "treinamentos",
  "nao-sei": "nao-sei",
};

const serviceLabels: Record<ContactService, string> = {
  "departamento-pessoal": "Departamento Pessoal",
  "clinica-ocupacional": "Clínica Ocupacional",
  "engenharia-sst": "Engenharia de SST",
  complementares: "Serviços Complementares",
  treinamentos: "Treinamentos NR",
  "nao-sei": "Diagnóstico completo",
};

/** Mapeamento puro respostas → recomendação (testável, sem UI). */
export function recommendFromQuiz(answers: QuizAnswers): QuizRecommendation {
  const service = needToService[answers.need];
  const urgent = answers.urgency === "fiscalizacao";

  const sizeNote =
    answers.size === "1-19"
      ? "Com menos de 20 pessoas, boa parte das exigências simplifica, mas não desaparece."
      : answers.size === "100+"
        ? "No seu porte, a integração entre folha, exames e riscos é o que evita notificação."
        : "";

  const urgencyNote = urgent
    ? "Fiscalização em curso pede prioridade: traga autos ou notificações para a conversa."
    : answers.urgency === "prazo"
      ? "Com prazo definido, começamos pelo que destrava o documento exigido."
      : "";

  return {
    service,
    label: serviceLabels[service],
    note: [sizeNote, urgencyNote].filter(Boolean).join(" "),
    urgent,
  };
}

export function summarizeQuiz(
  answers: QuizAnswers,
  recommendation: QuizRecommendation,
): string {
  return `Quiz: necessidade=${answers.need}; porte=${answers.size}; urgência=${answers.urgency}; recomendação=${recommendation.label}`;
}

const sizeText: Record<QuizAnswers["size"], string> = {
  "1-19": "menos de 20 funcionários",
  "20-99": "entre 20 e 99 funcionários",
  "100+": "mais de 100 funcionários",
};

const urgencyText: Record<QuizAnswers["urgency"], string> = {
  fiscalizacao: "estou com uma fiscalização em curso",
  prazo: "estou com um prazo definido",
  planejamento: "estou em fase de planejamento",
};

/** Mensagem amigável, pronta para o campo Mensagem, a partir das respostas. */
export function quizMessage(answers: QuizAnswers): string {
  return `Minha empresa tem ${sizeText[answers.size]} e ${urgencyText[answers.urgency]}.`;
}
