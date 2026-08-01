import { z } from "zod";
import type { RiskLevel } from "@/lib/risk";

export const shiftSchema = z.enum(["diurno", "noturno", "revezamento"]);
export type Shift = z.infer<typeof shiftSchema>;

export const riskGradeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);
export type CipaRiskGrade = z.infer<typeof riskGradeSchema>;

export const cipaInputSchema = z.object({
  /** id de um CipaGroup em cipa-data.ts (setor econômico). */
  groupId: z.string().min(1),
  /** Grau de risco NR-4 da atividade principal (1 a 4). */
  riskGrade: riskGradeSchema,
  employees: z.number().int().min(1).max(20000),
  shifts: z.array(shiftSchema).min(1),
});
export type CipaInput = z.infer<typeof cipaInputSchema>;

export interface CipaSizingRange {
  min: number;
  /** null = sem teto (última faixa). */
  max: number | null;
  titulars: number;
  substitutes: number;
}

/** Quadro I da NR-5 vigente: uma coluna de faixas por Grau de Risco. */
export type CipaSizingTable = Record<CipaRiskGrade, CipaSizingRange[]>;

export interface CipaGroup {
  id: string;
  label: string;
  /** Referência da fonte usada (coluna do Quadro I / nota de mapeamento). */
  nr5Reference: string;
  /** GR típico do setor — default sugerido na UI, usuário pode trocar. */
  typicalGrade: CipaRiskGrade;
  /** NRs tipicamente aplicáveis ao setor, além das universais. */
  sectorNRs: Array<{ nr: string; title: string; level: RiskLevel; reason: string }>;
}

export interface CipaResult {
  cipa: {
    required: boolean;
    titulars: number;
    substitutes: number;
    /** Empresas abaixo da 1ª faixa: designado único da NR-5. */
    singleDesignee: boolean;
  };
  training: {
    hours: 8 | 12 | 16 | 20;
    shiftNote?: string;
  };
  applicableNRs: Array<{ nr: string; title: string; level: RiskLevel; reason: string }>;
  periodicity: {
    cipaTraining: string;
    pcmso: string;
  };
}
