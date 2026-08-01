import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  IconFolhaPagamento,
  IconPerigoLosango,
  IconRelogioPonto,
} from "@/components/icons";
import { Stagger } from "@/components/motion/stagger";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import type { RiskLevel } from "@/lib/risk";
import { cn } from "@/lib/utils";

interface Problem {
  nivel: RiskLevel;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: { label: string; href: string };
}

const problems: Problem[] = [
  {
    nivel: "medium",
    icon: <IconRelogioPonto size={20} />,
    title: "O eSocial não espera o seu fechamento",
    body: "Cada admissão, exame e rescisão virou um evento com prazo. Sem acompanhamento, a pendência aparece como multa, não como aviso.",
    cta: { label: "Ver terceirização de folha", href: "/servicos/departamento-pessoal" },
  },
  {
    nivel: "high",
    icon: <IconPerigoLosango size={20} />,
    title: "PGR de prateleira não passa na fiscalização",
    body: "Documento genérico declara risco que não existe e ignora o que existe. Na fiscalização e na perícia, a divergência vira autuação e passivo.",
    cta: { label: "Ver engenharia de SST", href: "/servicos/engenharia-sst" },
  },
  {
    nivel: "medium",
    icon: <IconFolhaPagamento size={20} />,
    title: "Fornecedores que não se falam geram retrabalho",
    body: "Quando folha, exames e riscos vivem em lugares diferentes, o dado chega divergente e o eSocial recusa. O custo é o retrabalho que ninguém contabiliza.",
    cta: { label: "Como integramos", href: "/sobre" },
  },
];

const riskAccent: Record<RiskLevel, { bar: string; icon: string }> = {
  low: { bar: "bg-risk-low-solid", icon: "bg-risk-low-bg text-risk-low-fg" },
  medium: {
    bar: "bg-risk-medium-solid",
    icon: "bg-risk-medium-bg text-risk-medium-fg",
  },
  high: {
    bar: "bg-risk-high-solid",
    icon: "bg-risk-high-bg text-risk-high-fg",
  },
};

export function ProblemCards() {
  return (
    <Section>
      <SectionHeading
        eyebrow="O problema real"
        title="Três formas de perder dinheiro sem perceber"
        lead="Antes de vender solução, a gente reconhece o tamanho do problema. São os três padrões que mais encontramos nas empresas que chegam até nós."
      />
      <Stagger className="mt-10 grid gap-6 md:grid-cols-3" itemClassName="h-full">
        {problems.map((problem) => {
          const accent = riskAccent[problem.nivel];
          return (
            <article
              key={problem.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-raised shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Filete de risco no topo (estático). */}
              <span
                aria-hidden
                className={cn("absolute inset-x-0 top-0 h-1", accent.bar)}
              />
              <div className="flex flex-1 flex-col p-card pt-7">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-lg",
                    accent.icon,
                  )}
                >
                  {problem.icon}
                </span>
                <h3 className="text-h3 mt-5 text-petrol-700">{problem.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {problem.body}
                </p>
                <Link
                  href={problem.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 font-medium text-petrol-600"
                >
                  {problem.cta.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </Stagger>
    </Section>
  );
}
