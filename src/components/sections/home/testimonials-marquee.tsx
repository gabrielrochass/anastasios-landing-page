"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="w-80 shrink-0 rounded-lg bg-surface-raised p-card shadow-card">
      <blockquote className="text-sm leading-relaxed text-ink">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="text-eyebrow mt-4 flex flex-wrap gap-x-3 text-ink-meta">
        <span>{testimonial.role}</span>
        <span>{testimonial.segment}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Marquee de depoimentos (adaptado do testimonials-with-marquee do
 * 21st.dev): animação CSS pura, pausa em hover/focus, botão pausar visível
 * e prefers-reduced-motion global já zera a animação (fallback: lista
 * rolável). A segunda cópia da lista é aria-hidden (só fecha o loop).
 */
export function TestimonialsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <Section tone="tint">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Quem já integrou"
          title="O que as empresas dizem"
          lead="Depoimentos de quem tirou folha, exames e riscos do modo fornecedor-por-silo."
        />
        <Button
          variant="outline"
          size="sm"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <>
              <Play aria-hidden /> Retomar
            </>
          ) : (
            <>
              <Pause aria-hidden /> Pausar
            </>
          )}
        </Button>
      </div>

      <div
        role="region"
        aria-label="Depoimentos de clientes"
        tabIndex={0}
        className="group relative mt-12 overflow-x-auto overflow-y-hidden scrollbar-none"
      >
        <div
          className={cn(
            "flex w-max gap-6 motion-safe:animate-marquee group-focus-within:paused group-hover:paused",
            paused && "paused",
          )}
        >
          <ul className="flex gap-6">
            {testimonials.map((testimonial) => (
              <li key={testimonial.quote}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
          <ul className="flex gap-6" aria-hidden>
            {testimonials.map((testimonial) => (
              <li key={testimonial.quote}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-surface-tint to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-surface-tint to-transparent"
        />
      </div>
      {/* [VALIDAR] depoimentos ilustrativos — ver src/data/testimonials.ts */}
      <p className="mt-6 text-xs leading-relaxed text-ink-meta">
        Cenários ilustrativos, representativos de casos reais. Depoimentos
        nominais serão publicados à medida que os clientes autorizarem.
      </p>
    </Section>
  );
}
