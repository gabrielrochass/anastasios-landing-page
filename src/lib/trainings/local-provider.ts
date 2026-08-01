import rawTrainings from "@/data/trainings.json";
import type { TrainingProvider } from "@/lib/trainings/provider";
import { trainingSchema, type Training } from "@/lib/trainings/types";

/**
 * Catálogo mock em src/data/trainings.json, validado com Zod na primeira
 * leitura — JSON inválido falha o build, nunca a produção.
 */
export class LocalTrainingProvider implements TrainingProvider {
  private readonly trainings: Training[] = trainingSchema
    .array()
    .parse(rawTrainings);

  async getTrainings(): Promise<Training[]> {
    return this.trainings;
  }

  async getTrainingBySlug(slug: string): Promise<Training | null> {
    return this.trainings.find((t) => t.slug === slug) ?? null;
  }

  async getTrainingsByNR(nr: string): Promise<Training[]> {
    return this.trainings.filter((t) => t.nr === nr);
  }
}
