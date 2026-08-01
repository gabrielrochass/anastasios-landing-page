import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "default" | "inverse";
  className?: string;
}

/**
 * Header de seção: eyebrow pequeno, título grande logo abaixo, tudo alinhado
 * à esquerda (sem deslocamento de coluna). Título prominente para não
 * competir mal com o corpo.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "text-eyebrow",
          tone === "inverse" ? "text-accent-on-inverse" : "text-accent-text",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "inverse" ? "text-white" : "text-petrol-700",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 leading-relaxed",
            tone === "inverse" ? "text-ink-muted-on-inverse" : "text-ink-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
