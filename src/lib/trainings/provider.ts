import type { Training } from "@/lib/trainings/types";

/**
 * Contrato do catálogo de treinamentos.
 *
 * Hoje implementado por LocalTrainingProvider (JSON local). Quando a API
 * de catálogo do Host existir, crie um HostTrainingProvider implementando
 * esta mesma interface e troque a instância em ./index.ts — nenhum
 * componente ou página precisa mudar. As assinaturas já são assíncronas
 * exatamente para essa troca ser transparente.
 */
export interface TrainingProvider {
  getTrainings(): Promise<Training[]>;
  getTrainingBySlug(slug: string): Promise<Training | null>;
  getTrainingsByNR(nr: string): Promise<Training[]>;
}
