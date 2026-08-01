import { z } from "zod";

export const modalitySchema = z.enum(["presencial", "ead", "semipresencial"]);
export type Modality = z.infer<typeof modalitySchema>;

export const modalityLabels: Record<Modality, string> = {
  presencial: "Presencial",
  ead: "100% online",
  semipresencial: "Semipresencial",
};

/** Grau de risco NR-4 (GR1–GR4), usado no dimensionamento CIPA. */
export const riskGradeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);
export type RiskGrade = z.infer<typeof riskGradeSchema>;

export const trainingSchema = z.object({
  id: z.string().min(1),
  nr: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  hours: z.number().int().positive(),
  modalities: z.array(modalitySchema).min(1),
  /** null = "sob consulta". */
  priceCents: z.number().int().positive().nullable(),
  /** Graus de risco a que o curso se destina (CIPA) — vazio = todos. */
  riskGrades: z.array(riskGradeSchema),
  /** Prazo de reciclagem em meses; null = sem reciclagem obrigatória. */
  recyclingMonths: z.number().int().positive().nullable(),
  /** Checkout na plataforma EAD (Host). */
  externalUrl: z.string().url(),
  featured: z.boolean(),
  details: z.object({
    audience: z.string().min(1),
    syllabus: z.array(z.string().min(1)).min(1),
    certification: z.string().min(1),
  }),
});

export type Training = z.infer<typeof trainingSchema>;

export function formatPrice(priceCents: number | null): string {
  if (priceCents === null) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}
