import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardIcon } from "@/components/cards/card";
import { IconPerigoLosango } from "@/components/icons";
import { ServiceAnchorSection } from "@/components/sections/services/service-anchor-section";
import { ServiceHero } from "@/components/sections/services/service-hero";
import { SolutionTabs } from "@/components/sections/services/solution-tabs";
import { RelatedServices } from "@/components/sections/shared/related-services";
import { ParallaxBand } from "@/components/motion/parallax-band";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { legislationEvents } from "@/data/legislation-timeline";
import type { ServiceContent } from "@/data/services/types";
import { breadcrumbSchema } from "@/lib/seo/schema";

export function ServicePage({ content }: { content: ServiceContent }) {
  const events = legislationEvents.filter((event) =>
    content.timelineIds.includes(event.id),
  );

  return (
    <>
      <ServiceHero content={content} />

      {/* Problema */}
      <Section>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-1">
              <span
                aria-hidden
                className="inline-flex size-11 items-center justify-center rounded-md bg-risk-high-bg text-risk-high-fg"
              >
                <IconPerigoLosango size={24} />
              </span>
            </div>
            <div className="lg:col-span-8">
              <p className="text-eyebrow text-accent-text">O problema</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-petrol-700 sm:text-4xl">
                {content.problem.title}
              </h2>
              <div className="mt-4 flex max-w-2xl flex-col gap-3 text-ink-muted">
                {(Array.isArray(content.problem.body)
                  ? content.problem.body
                  : [content.problem.body]
                ).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Âncora funcional da página (timeline / painel / fluxo / pilha) */}
      <ServiceAnchorSection content={content} timelineEvents={events} />

      {/* Solução */}
      <Section>
        <SectionHeading
          eyebrow="Como resolvemos"
          title="A solução, parte a parte"
        />
        <div className="mt-12">
          <SolutionTabs
            tabs={content.solutions.map((solution) => ({
              title: solution.title,
              summary: solution.summary,
              detail: solution.detail,
              icon: <solution.icon size={20} />,
            }))}
          />
        </div>
      </Section>

      {/* Diferenciais */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Por que a E-Soluções"
          title="O que muda quando os pilares se falam"
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {content.differentials.map((differential) => (
            <div key={differential.title}>
              <CardIcon>
                <differential.icon size={24} />
              </CardIcon>
              <h3 className="text-h3 mt-4 text-petrol-700">
                {differential.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {differential.description}
              </p>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* Banda de parallax opcional (respiro visual entre diferenciais e case) */}
      {content.midImage && (
        <ParallaxBand photo={content.midImage}>
          <p className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
            Cada risco deste laudo foi medido no chão da sua operação.
          </p>
        </ParallaxBand>
      )}

      {/* Hub: serviços que se conectam a este */}
      <RelatedServices currentSlug={content.slug} />

      {/* CTA final */}
      <Section tone="inverse">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {content.cta.title}
            </h2>
            <p className="mt-4 text-ink-muted-on-inverse">{content.cta.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-orange-400 text-ink hover:bg-orange-500"
              >
                <Link href="/contato">Solicitar orçamento</Link>
              </Button>
              <WhatsappButton context={`servico-${content.slug}`} />
            </div>
          </div>
        </Reveal>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: content.title, path: `/servicos/${content.slug}` },
        ])}
      />
    </>
  );
}
