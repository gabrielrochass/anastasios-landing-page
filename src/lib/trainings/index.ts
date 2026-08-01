import { LocalTrainingProvider } from "@/lib/trainings/local-provider";
import type { TrainingProvider } from "@/lib/trainings/provider";

/**
 * Ponto único de troca: quando a API do Host existir, substitua por
 * `new HostTrainingProvider(...)` — o resto do site não muda.
 */
export const trainings: TrainingProvider = new LocalTrainingProvider();
