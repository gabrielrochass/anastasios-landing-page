import { LegislationTimeline } from "@/components/interactive/legislation-timeline/legislation-timeline";
import { DpFlow } from "@/components/sections/services/anchors/dp-flow";
import { ExamStatusPanel } from "@/components/sections/services/anchors/exam-status-panel";
import { PericiaStack } from "@/components/sections/services/anchors/pericia-stack";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import type { LegislationEvent } from "@/lib/legislation";
import type { ServiceContent } from "@/data/services/types";

const headings: Record<
  ServiceContent["heroAnchor"],
  { eyebrow: string; title: string; lead: string }
> = {
  timeline: {
    eyebrow: "Contexto legal",
    title: "A legislação que molda o PGR, de 1978 até hoje",
    lead: "Os marcos que definem a urgência deste serviço e o que muda para a sua operação.",
  },
  "exam-status": {
    eyebrow: "Como acompanhamos",
    title: "Cada exame com prazo e status visível",
    lead: "Admissional, periódico, demissional e mudança de função sob monitoramento contínuo.",
  },
  "dp-flow": {
    eyebrow: "Como funciona",
    title: "Um fio só, da admissão ao desligamento",
    lead: "Cada evento entra no eSocial no prazo, com a folha e os exames conversando entre si.",
  },
  "pericia-stack": {
    eyebrow: "O que entregamos",
    title: "Apoio técnico para quando o caso vira processo",
    lead: "Perícias, laudos e terceirização especializada, com responsabilidade técnica.",
  },
};

/** Renderiza a âncora funcional do serviço como seção do meio da página
 * (light, tint para destacar), com fotos liderando os heros. */
export function ServiceAnchorSection({
  content,
  timelineEvents,
}: {
  content: ServiceContent;
  timelineEvents: LegislationEvent[];
}) {
  const h = headings[content.heroAnchor];
  if (content.heroAnchor === "timeline" && timelineEvents.length === 0) {
    return null;
  }

  return (
    <Section tone="tint">
      <SectionHeading eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
      <div className="mt-12">
        {content.heroAnchor === "timeline" && (
          <LegislationTimeline events={timelineEvents} />
        )}
        {content.heroAnchor === "exam-status" && (
          <ExamStatusPanel tone="light" className="max-w-2xl" />
        )}
        {content.heroAnchor === "dp-flow" && <DpFlow tone="light" />}
        {content.heroAnchor === "pericia-stack" && <PericiaStack tone="light" />}
      </div>
    </Section>
  );
}
