import { CardBadge } from "@/components/cards/card";
import {
  impactLabels,
  impactToRisk,
  type LegislationEvent,
} from "@/lib/legislation";
import { cn } from "@/lib/utils";

interface LegislationTimelineProps {
  events: LegislationEvent[];
  tone?: "dark" | "light";
}

const dotColor: Record<LegislationEvent["impact"], string> = {
  critical: "bg-risk-high-solid",
  important: "bg-risk-medium-solid",
  update: "bg-petrol-400",
};

/**
 * Linha do tempo estilo "roadmap": trilho com pontos coloridos por impacto.
 * Vertical no mobile, horizontal no desktop — sem scroll, texto enxuto
 * (ano, norma, título). O contexto completo de cada marco vive no blog.
 */
export function LegislationTimeline({
  events,
  tone = "light",
}: LegislationTimelineProps) {
  const dark = tone === "dark";
  const ring = dark ? "ring-surface-inverse" : "ring-surface-tint";

  return (
    // Trilho como pseudo-elemento `before:` (não um <span> filho do <ol>, que
    // violaria list-children): vertical no mobile, horizontal no desktop.
    <ol
      role="list"
      aria-label="Linha do tempo da legislação"
      className={cn(
        "relative flex flex-col gap-8 md:flex-row md:gap-6",
        "before:pointer-events-none before:absolute before:left-1.5 before:top-0 before:h-full before:w-px before:content-[''] md:before:inset-x-0 md:before:left-0 md:before:top-1.5 md:before:h-px md:before:w-full",
        dark ? "before:bg-petrol-800" : "before:bg-neutral-300",
      )}
    >
      {events.map((event) => (
        <li key={event.id} className="relative flex-1 pl-8 md:pl-0 md:pt-7">
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-1 size-3 rounded-full ring-4 md:top-0.5",
              dotColor[event.impact],
              ring,
            )}
          />
          <p
            className={cn(
              "text-2xl font-bold tabular-nums",
              dark ? "text-white" : "text-petrol-700",
            )}
          >
            {event.year}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <CardBadge nr={event.nr} nivel={impactToRisk[event.impact]} />
            <span
              className={cn(
                "text-eyebrow",
                dark ? "text-ink-muted-on-inverse" : "text-ink-meta",
              )}
            >
              {impactLabels[event.impact]}
            </span>
          </div>
          <h3
            className={cn(
              "mt-2 text-sm font-semibold leading-snug",
              dark ? "text-white" : "text-petrol-700",
            )}
          >
            {event.title}
          </h3>
        </li>
      ))}
    </ol>
  );
}
