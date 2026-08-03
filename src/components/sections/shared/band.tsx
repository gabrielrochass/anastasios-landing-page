import { cn } from "@/lib/utils";

/**
 * Faixa de seção. Declara o modo, aplica o ritmo vertical e o container.
 *
 * `section-cv` liga content-visibility com contain-intrinsic-size junto, que é
 * a única forma correta: sem o segundo, o primeiro vira fonte de CLS em vez de
 * ganho de performance.
 */
export function Band({
  id,
  mode = "doc",
  className,
  children,
  contain = true,
}: {
  id?: string;
  mode?: "doc" | "ocean";
  className?: string;
  children: React.ReactNode;
  contain?: boolean;
}) {
  return (
    <section
      id={id}
      data-mode={mode}
      className={cn(
        "bg-surface py-section text-content",
        contain && "section-cv",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/**
 * Cabeçalho de seção. O número em mono à esquerda é a gramática de documentação
 * técnica que o site inteiro usa, e é o jeito mais barato de parecer caro.
 */
export function BandHeading({
  ordinal,
  eyebrow,
  title,
  lead,
  className,
}: {
  ordinal?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <div className="flex items-baseline gap-4">
        {ordinal ? (
          <span aria-hidden className="tabular-stat text-content-muted eyebrow">
            {ordinal}
          </span>
        ) : null}
        <p className="eyebrow text-accent">{eyebrow}</p>
      </div>
      <h2 className="text-h2 mt-4">{title}</h2>
      {lead ? (
        <p className="text-lead text-content-muted mt-5">{lead}</p>
      ) : null}
    </header>
  );
}
