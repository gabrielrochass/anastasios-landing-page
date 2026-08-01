import type {
  CipaGroup,
  CipaInput,
  CipaResult,
  CipaRiskGrade,
  CipaSizingTable,
} from "@/lib/cipa/types";

/** Carga horária do treinamento CIPA por grau de risco (NR-5 vigente). */
const trainingHoursByGrade: Record<CipaRiskGrade, 8 | 12 | 16 | 20> = {
  1: 8,
  2: 12,
  3: 16,
  4: 20,
};

const universalNRs: CipaResult["applicableNRs"] = [
  {
    nr: "NR-1",
    title: "GRO e PGR",
    level: "medium",
    reason: "Todo empregador precisa manter o gerenciamento de riscos ativo.",
  },
  {
    nr: "NR-7",
    title: "PCMSO",
    level: "medium",
    reason: "Exames ocupacionais alinhados aos riscos do PGR.",
  },
];

/**
 * Motor puro do diagnóstico CIPA — sem I/O, 100% coberto por testes.
 * Dimensionamento pela coluna do Quadro I correspondente ao grau de risco
 * informado. Resultado é orientativo: o GR oficial depende do CNAE exato
 * (Anexo I da NR-4).
 */
export function evaluateCipa(
  input: CipaInput,
  group: CipaGroup,
  sizing: CipaSizingTable,
): CipaResult {
  const range = sizing[input.riskGrade].find(
    (r) =>
      input.employees >= r.min &&
      (r.max === null || input.employees <= r.max),
  );

  const required = Boolean(range && range.titulars > 0);
  const singleDesignee = !required;

  const hasNightWork =
    input.shifts.includes("noturno") || input.shifts.includes("revezamento");

  const applicableNRs = [
    {
      nr: "NR-5",
      title: "CIPA",
      level: required ? ("medium" as const) : ("low" as const),
      reason: required
        ? "Sua faixa de empregados exige comissão constituída."
        : "Abaixo da faixa mínima: exige pessoa designada, não comissão.",
    },
    ...universalNRs,
    ...group.sectorNRs,
  ];

  return {
    cipa: {
      required,
      titulars: range?.titulars ?? 0,
      substitutes: range?.substitutes ?? 0,
      singleDesignee,
    },
    training: {
      hours: trainingHoursByGrade[input.riskGrade],
      ...(hasNightWork && {
        shiftNote:
          "Com turno noturno ou revezamento, garanta representantes e treinamento cobrindo todos os turnos.",
      }),
    },
    applicableNRs,
    periodicity: {
      cipaTraining:
        "Treinamento a cada mandato; conclusão antes da posse dos membros.",
      pcmso: "Exames conforme PCMSO, com periodicidade definida pelo médico responsável a partir dos riscos.",
    },
  };
}
