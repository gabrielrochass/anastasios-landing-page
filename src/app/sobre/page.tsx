import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconCapacete,
  IconCheckConformidade,
  IconEstetoscopio,
} from "@/components/icons";
import { ImageSlot } from "@/components/illustrations/image-slot";
import { Reveal } from "@/components/motion/reveal";
import {
  ScrollTimeline,
  type ScrollTimelineEntry,
} from "@/components/motion/scroll-timeline";
import { Stagger } from "@/components/motion/stagger";
import { RotatingWord } from "@/components/motion/rotating-word";
import { ParallaxBand } from "@/components/motion/parallax-band";
import { PhotoHero } from "@/components/sections/shared/photo-hero";
import { RelatedServices } from "@/components/sections/shared/related-services";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre a E-Soluções",
  description:
    "Terceirização de folha e engenharia de SST na mesma operação, em Recife/PE. A tese da E-Soluções: um dado só, sem divergência e sem retrabalho.",
};

function StepBullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
          <span
            aria-hidden
            className="mt-1.5 size-2 shrink-0 rounded-xs bg-petrol-300"
          />
          <span className="text-ink-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const methodEntries: ScrollTimelineEntry[] = [
  {
    title: "Diagnóstico",
    content: (
      <div>
        <p className="leading-relaxed text-ink">
          Mapeamos o que existe: documentos, exames, folha, prazos. Sem
          julgamento, só o retrato honesto de onde a empresa está.
        </p>
        <StepBullets
          items={[
            "Inventário de documentos legais e vencimentos",
            "Conversa com RH e operações sobre a rotina real",
            "Retrato de conformidade por pilar (DP, clínica, SST)",
          ]}
        />
      </div>
    ),
  },
  {
    title: "Plano dimensionado",
    content: (
      <div>
        <p className="leading-relaxed text-ink">
          Prioridade pelo risco real e pelo passivo potencial, não por pacote
          de prateleira.
        </p>
        <StepBullets
          items={[
            "Urgências primeiro: o que gera multa ou interdição amanhã",
            "Cronograma com responsáveis e prazos por entrega",
            "Escopo e orçamento fechados antes de começar",
          ]}
        />
      </div>
    ),
  },
  {
    title: "Execução integrada",
    content: (
      <div>
        <p className="leading-relaxed text-ink">
          PGR, PCMSO, exames e eSocial saem da mesma operação, e os dados batem
          entre si por construção.
        </p>
        <StepBullets
          items={[
            "O risco do PGR dimensiona o exame do PCMSO",
            "Eventos de SST do eSocial consistentes com a folha",
            "Um responsável técnico com nome e telefone",
          ]}
        />
      </div>
    ),
  },
  {
    title: "Acompanhamento",
    content: (
      <div>
        <p className="leading-relaxed text-ink">
          Legislação muda; seu compliance acompanha. Revisões e alertas de
          prazo fazem parte do serviço, não de um aditivo.
        </p>
        <StepBullets
          items={[
            "Revisão a cada mudança de norma, quadro ou processo",
            "Alertas de vencimento de exames, laudos e treinamentos",
            "Indicadores periódicos para a gestão",
          ]}
        />
      </div>
    ),
  },
];

/** Os três destinos do mesmo dado de risco — o coração da tese. */
const dataUses = [
  {
    icon: IconCapacete,
    tag: "PGR",
    title: "Vira risco documentado",
    body: "Dimensiona o Programa de Gerenciamento de Riscos com a medida real da operação, não com estimativa de prateleira.",
  },
  {
    icon: IconEstetoscopio,
    tag: "PCMSO",
    title: "Define o exame certo",
    body: "O mesmo risco indica quais exames cada função precisa fazer, e em que periodicidade.",
  },
  {
    icon: IconCheckConformidade,
    tag: "eSocial",
    title: "Alimenta o evento de SST",
    body: "Sai como evento consistente com a folha. Sem divergência, a notificação não tem onde nascer.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PhotoHero
        photo="sst-trabalhador-metal"
        priority
        size="tall"
        align="center"
        eyebrow="Sobre a E-Soluções"
        title={
          <>
            Conformidade não é papelada.
            <br />
            <RotatingWord
              className="text-accent-on-inverse"
              words={[
                "É engenharia.",
                "É método.",
                "É rotina.",
                "É responsabilidade.",
              ]}
            />
          </>
        }
        lead="Nascemos da constatação de que folha, exames e riscos viviam em fornecedores que não se falavam, e de que era nessa fresta que moravam as multas. Existimos para fechá-la."
      />

      <Section tone="tint">
        <SectionHeading
          eyebrow="A tese"
          title="Um dado só, três usos"
          lead="O mesmo risco que entra no PGR dimensiona o exame do PCMSO e alimenta o evento de SST no eSocial. Quando isso acontece na mesma operação, a divergência, uma das principais causas de notificação, simplesmente não tem onde nascer."
        />
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[20rem_1fr]">
          {/* A fonte: um único dado */}
          <div className="relative rounded-2xl bg-petrol-700 p-6 text-white shadow-card">
            <p className="text-eyebrow text-accent-on-inverse">Um dado</p>
            <h3 className="text-h3 mt-2 text-white">O risco medido em campo</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted-on-inverse">
              Uma única medição por função e ambiente: ruído, agente químico,
              calor, esforço. É daqui que tudo parte.
            </p>
            <span
              aria-hidden
              className="absolute left-1/2 top-full h-8 w-px -translate-x-1/2 bg-neutral-300 lg:left-full lg:top-1/2 lg:h-px lg:w-8 lg:-translate-y-1/2 lg:translate-x-0"
            />
          </div>

          {/* Três usos do mesmo dado */}
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {dataUses.map((use, index) => (
              <div
                key={use.tag}
                className="flex h-full flex-col rounded-xl bg-surface-raised p-5 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <span className="text-eyebrow text-ink-meta">
                    Uso {index + 1}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-neutral-200" />
                </div>
                <span
                  aria-hidden
                  className="mt-3 inline-flex size-10 items-center justify-center rounded-md bg-petrol-50 text-petrol-700"
                >
                  <use.icon size={20} />
                </span>
                <p className="text-eyebrow mt-3 text-accent-text">{use.tag}</p>
                <h4 className="mt-1 font-semibold text-petrol-700">
                  {use.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {use.body}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </Section>

      <ParallaxBand photo="sst-capacetes-parede">
        <p className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
          Da folha ao laudo, tudo parte do mesmo levantamento de campo.
        </p>
      </ParallaxBand>

      <Section>
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Método, não pacote"
          lead="Quatro fases, sempre nesta ordem. A linha abaixo acompanha seu scroll pelo caminho completo."
        />
        <div className="mt-14">
          <ScrollTimeline entries={methodEntries} />
        </div>
      </Section>

      <RelatedServices
        eyebrow="Os pilares se falam"
        title="Veja como isso funciona em cada frente"
        lead="A tese acima vira operação em quatro serviços que compartilham o mesmo dado. Cada um tem uma página própria."
      />

      <Section>
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ImageSlot slotId="sobre-especialista" ratio="3/4">
                <div className="flex size-full items-center justify-center bg-petrol-900 px-4 text-center">
                  <span className="text-eyebrow text-petrol-300">
                    Foto de {siteConfig.specialist.name}
                    <br />
                    (sessão própria)
                  </span>
                </div>
              </ImageSlot>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-eyebrow text-accent-text">Quem responde</p>
              <h2 className="text-h2 mt-3 text-petrol-700">
                {siteConfig.specialist.name}
              </h2>
              <p className="text-eyebrow mt-1 text-ink-meta">
                {siteConfig.specialist.role}
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-ink-muted">
                À frente da E-Soluções, Adna construiu a operação em cima de
                uma regra simples: quem assina o documento precisa responder
                por ele. Cada PGR, laudo e folha que sai daqui tem nome,
                registro e telefone de quem atende quando a fiscalização
                liga.
              </p>
              <div className="mt-7">
                <Button asChild size="lg">
                  <Link href="/contato">Conversar com a Adna</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ])}
      />
    </>
  );
}
