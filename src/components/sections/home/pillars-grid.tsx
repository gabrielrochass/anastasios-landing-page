import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  IconBalanca,
  IconCapacete,
  IconEstetoscopio,
  IconFolhaPagamento,
  type IconProps,
} from "@/components/icons";
import { Stagger } from "@/components/motion/stagger";
import { Tilt } from "@/components/motion/tilt";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";

interface Pillar {
  Icon: React.ComponentType<IconProps>;
  title: string;
  body: string;
  href: string;
}

const pillars: Pillar[] = [
  {
    Icon: IconFolhaPagamento,
    title: "Departamento Pessoal",
    body: "Assessoria da admissão ao desligamento: folha terceirizada, eSocial consistente com os dados de SST e prazos sob controle.",
    href: "/servicos/departamento-pessoal",
  },
  {
    Icon: IconEstetoscopio,
    title: "Clínica Ocupacional",
    body: "Admissional, periódico, demissional, mudança de função e retorno ao trabalho, com resultado ágil e integração direta com DP e SST.",
    href: "/servicos/clinica-ocupacional",
  },
  {
    Icon: IconCapacete,
    title: "Engenharia de SST",
    body: "PGR, PCMSO, LTCAT e laudos dimensionados pelo risco real da operação, assinados por quem responde tecnicamente por eles.",
    href: "/servicos/engenharia-sst",
  },
  {
    Icon: IconBalanca,
    title: "Serviços Complementares",
    body: "Perícias judiciais, assistência técnica e alocação de profissionais de SST na sua operação.",
    href: "/servicos/complementares",
  },
];

export function PillarsGrid() {
  return (
    <Section tone="tint">
      <SectionHeading
        eyebrow="A solução integrada"
        title="Quatro pilares, uma operação só"
        lead="Cada serviço funciona sozinho. Juntos, eliminam a divergência entre folha, exames e riscos, a causa mais comum de notificação no eSocial."
      />
      <Stagger
        className="mt-10 grid gap-6 sm:grid-cols-2"
        itemClassName="h-full"
      >
        {pillars.map((pillar) => (
          <Tilt key={pillar.href}>
            <Link
              href={pillar.href}
              className="group flex h-full flex-col rounded-xl bg-surface-raised p-card shadow-card transition-shadow duration-200 ease-out hover:shadow-card-hover"
            >
              <span
                aria-hidden
                className="inline-flex size-12 items-center justify-center rounded-xl bg-petrol-50 text-petrol-700 transition-colors duration-200 group-hover:bg-petrol-700 group-hover:text-white"
              >
                <pillar.Icon size={24} />
              </span>
              <h3 className="text-h3 mt-5 text-petrol-700">{pillar.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {pillar.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-petrol-600">
                Conhecer o serviço
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </Tilt>
        ))}
      </Stagger>
    </Section>
  );
}
