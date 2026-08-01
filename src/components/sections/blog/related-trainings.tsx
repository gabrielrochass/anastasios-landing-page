import { CardBadge } from "@/components/cards/card";
import { TrainingCtaLink } from "@/components/sections/blog/training-cta-link";
import { formatPrice, type Training } from "@/lib/trainings/types";

/** "Próximos passos" ao fim do artigo: cursos recomendados pelas NRs citadas. */
export function RelatedTrainings({ trainings }: { trainings: Training[] }) {
  if (trainings.length === 0) return null;
  return (
    <section
      aria-label="Treinamentos recomendados"
      className="mt-14 rounded-lg bg-surface-inverse p-card text-ink-on-inverse"
    >
      <p className="text-eyebrow text-accent-on-inverse">Próximos passos</p>
      <h2 className="text-h3 mt-2 text-white">
        Capacite a equipe no que este artigo cobra
      </h2>
      <ul className="mt-5 divide-y divide-petrol-900">
        {trainings.map((training) => (
          <li
            key={training.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div className="flex items-center gap-3">
              <CardBadge nr={training.nr} />
              <div>
                <p className="font-medium text-white">{training.title}</p>
                <p className="text-eyebrow mt-0.5 flex flex-wrap gap-x-3 text-petrol-300">
                  <span>{training.hours}h</span>
                  <span>{formatPrice(training.priceCents)}</span>
                </p>
              </div>
            </div>
            <TrainingCtaLink training={training} />
          </li>
        ))}
      </ul>
    </section>
  );
}
