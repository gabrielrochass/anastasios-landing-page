import { Button } from "@/components/ui/button";
import { CardBadge } from "@/components/cards/card";
import { CardFan } from "@/components/motion/card-fan";
import { Entrance, EntranceItem } from "@/components/motion/entrance";
import { formatPrice, type Training } from "@/lib/trainings/types";

function CourseCard({ training }: { training: Training }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-surface-raised p-4">
      <CardBadge nr={training.nr} />
      <div>
        <p className="text-sm font-semibold text-petrol-700">
          {training.title}
        </p>
        <p className="text-eyebrow mt-2 flex flex-wrap gap-x-3 text-ink-meta">
          <span>{training.hours}h</span>
          <span>{formatPrice(training.priceCents)}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Hero de treinamentos: fundo claro (quebra a sequência de heros escuros
 * das outras páginas) com leque de 3 cursos em destaque à direita, amarrado
 * ao catálogo real. Números tabulares, acento laranja pontual.
 */
export function TrainingsHero({ featured }: { featured: Training[] }) {
  const cards = featured
    .slice(0, 3)
    .map((training) => <CourseCard key={training.id} training={training} />);

  return (
    <section className="relative overflow-hidden bg-surface-tint">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12">
        <Entrance className="lg:col-span-6">
          <EntranceItem eager>
            <p className="text-eyebrow text-accent-text">
              Capacitação com certificado nacional
            </p>
          </EntranceItem>
          <EntranceItem eager>
            <h1 className="text-display mt-4 text-petrol-700">
              Treinamento certo, no{" "}
              <span className="text-accent-text">grau de risco</span> certo.
            </h1>
          </EntranceItem>
          <EntranceItem>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Compare os programas por norma, carga horária, modalidade e
              preço. A compra acontece na nossa plataforma EAD parceira, e o
              certificado vale em todo o território nacional.
            </p>
          </EntranceItem>
          <EntranceItem>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-orange-400 text-ink hover:bg-orange-500"
              >
                <a href="#catalogo">Ver catálogo completo</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#diagnostico-cipa">Dimensionar minha CIPA</a>
              </Button>
            </div>
          </EntranceItem>
        </Entrance>

        {cards.length === 3 && (
          <div className="lg:col-span-6">
            <CardFan className="mx-auto max-w-md" cards={cards} />
          </div>
        )}
      </div>
    </section>
  );
}
