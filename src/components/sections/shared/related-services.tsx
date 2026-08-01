import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import { Stagger } from "@/components/motion/stagger";
import { serviceLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface RelatedServicesProps {
  /** Slug do serviço atual, para não linkar a página para ela mesma. */
  currentSlug?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: "default" | "tint";
}

/**
 * Bloco "serviços que se conectam a este": transforma o site de funil em hub.
 * A copy repete que os pilares se falam; aqui eles ficam de fato navegáveis.
 * Reaproveita serviceLinks (com blurb) e exclui o serviço atual.
 */
export function RelatedServices({
  currentSlug,
  eyebrow = "Os pilares se falam",
  title = "Serviços que se conectam a este",
  lead = "Cada frente funciona sozinha. Juntas, eliminam a divergência entre folha, exames e riscos, na mesma operação.",
  tone = "tint",
}: RelatedServicesProps) {
  const others = serviceLinks.filter(
    (service) => !currentSlug || !service.href.endsWith(currentSlug),
  );
  // Colunas = nº de cards, para caber numa linha só (sem card órfão embaixo).
  const cols = others.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      <Stagger
        className={cn("mt-10 grid gap-4 sm:grid-cols-2", cols)}
        itemClassName="h-full"
      >
        {others.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group flex h-full flex-col rounded-xl bg-surface-raised p-card shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover"
          >
            <h3 className="text-h3 text-petrol-700">{service.label}</h3>
            {service.blurb && (
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {service.blurb}
              </p>
            )}
            <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-petrol-600">
              Ver serviço
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </Stagger>
    </Section>
  );
}
