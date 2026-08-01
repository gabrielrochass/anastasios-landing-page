/** Nível de risco semântico usado em badges, matriz e timeline. */
export type RiskLevel = "low" | "medium" | "high";

export const riskLabels: Record<RiskLevel, string> = {
  low: "Baixo risco",
  medium: "Risco médio",
  high: "Risco alto",
};

/** Trio tint bg + fg escuro + border — nunca solid com texto branco. */
export const riskBadgeClasses: Record<RiskLevel, string> = {
  low: "border-risk-low-border bg-risk-low-bg text-risk-low-fg",
  medium: "border-risk-medium-border bg-risk-medium-bg text-risk-medium-fg",
  high: "border-risk-high-border bg-risk-high-bg text-risk-high-fg",
};

export const riskOnDarkTextClasses: Record<RiskLevel, string> = {
  low: "text-risk-low-on-dark",
  medium: "text-risk-medium-on-dark",
  high: "text-risk-high-on-dark",
};
