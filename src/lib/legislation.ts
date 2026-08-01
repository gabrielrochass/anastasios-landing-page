import type { RiskLevel } from "@/lib/risk";

export type LegislationImpact = "critical" | "important" | "update";

export interface LegislationEvent {
  id: string;
  year: number;
  /** Norma ou marco: "NR-1", "eSocial", "NR-7"... */
  nr: string;
  title: string;
  summary: string;
  impact: LegislationImpact;
}

/** critical → vermelho, important → âmbar; update fica neutro (petróleo). */
export const impactToRisk: Record<LegislationImpact, RiskLevel | undefined> = {
  critical: "high",
  important: "medium",
  update: undefined,
};

export const impactLabels: Record<LegislationImpact, string> = {
  critical: "Crítico",
  important: "Importante",
  update: "Atualização",
};
