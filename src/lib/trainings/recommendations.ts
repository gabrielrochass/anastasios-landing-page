import type { Training } from "@/lib/trainings/types";

/**
 * Normaliza uma NR para a forma canônica com dois dígitos ("NR-6" → "NR-06").
 * Sem isto, o match falhava para NR de dígito único: o frontmatter dos posts
 * usa "NR-6"/"NR-5" e o catálogo usa "NR-06"/"NR-05", então o EPI (NR-06) nunca
 * era recomendado no próprio artigo de EPI e caía no fallback featured.
 */
export function normalizeNR(nr: string): string {
  const digits = nr.replace(/\D/g, "");
  if (!digits) return nr.trim().toUpperCase();
  return `NR-${digits.padStart(2, "0")}`;
}

/** Mapa estático tag (minúscula) → NR (canônica), fallback do match direto. */
const tagToNR: Record<string, string> = {
  "trabalho em altura": "NR-35",
  eletricidade: "NR-10",
  "segurança elétrica": "NR-10",
  cipa: "NR-05",
  "espaço confinado": "NR-33",
  epi: "NR-06",
  "construção civil": "NR-18",
  máquinas: "NR-12",
};

interface RecommendationContext {
  /** NRs citadas no conteúdo de origem (post, diagnóstico...). */
  nrs?: string[];
  tags?: string[];
}

/**
 * Recomendação contextual por regras puras (sem IA):
 * 1. match direto de NR; 2. tag → NR; 3. fallback featured. Máx. `limit`.
 * Todas as NRs passam por normalizeNR antes de comparar.
 */
export function recommendTrainings(
  context: RecommendationContext,
  trainings: Training[],
  limit = 3,
): Training[] {
  const wantedNRs = new Set((context.nrs ?? []).map(normalizeNR));
  for (const tag of context.tags ?? []) {
    const nr = tagToNR[tag.toLowerCase()];
    if (nr) wantedNRs.add(normalizeNR(nr));
  }

  const direct = trainings.filter((t) => wantedNRs.has(normalizeNR(t.nr)));
  const fallback = trainings.filter(
    (t) => t.featured && !wantedNRs.has(normalizeNR(t.nr)),
  );

  return [...direct, ...fallback].slice(0, limit);
}
