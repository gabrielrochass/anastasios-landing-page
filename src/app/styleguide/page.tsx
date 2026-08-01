import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardBadge,
  CardBody,
  CardCTA,
  CardIcon,
  CardMeta,
  CardTitle,
} from "@/components/cards/card";
import { CardHoverReveal } from "@/components/cards/card-hover-reveal";
import * as Icons from "@/components/icons";
import { DocLinesPattern } from "@/components/illustrations/doc-lines-pattern";
import { HexPattern } from "@/components/illustrations/hex-pattern";
import { ImageSlot } from "@/components/illustrations/image-slot";
import { MeshGradient } from "@/components/illustrations/mesh-gradient";
import { RiskMatrixPattern } from "@/components/illustrations/risk-matrix-pattern";
import { CardFan } from "@/components/motion/card-fan";
import { NumberTicker } from "@/components/motion/number-ticker";
import { ScrollTimeline } from "@/components/motion/scroll-timeline";
import { Tilt } from "@/components/motion/tilt";
import { TextReveal } from "@/components/motion/text-reveal";
import { Photo } from "@/components/photo/photo";
import { DpFlow } from "@/components/sections/services/anchors/dp-flow";
import { ExamStatusPanel } from "@/components/sections/services/anchors/exam-status-panel";
import { PericiaStack } from "@/components/sections/services/anchors/pericia-stack";
import { riskLabels, type RiskLevel } from "@/lib/risk";

export const metadata: Metadata = {
  title: "Styleguide (interno)",
  robots: { index: false, follow: false },
};

const colorGroups: Array<{ name: string; classes: string[] }> = [
  {
    name: "Petróleo",
    classes: [
      "bg-petrol-50",
      "bg-petrol-100",
      "bg-petrol-200",
      "bg-petrol-300",
      "bg-petrol-400",
      "bg-petrol-500",
      "bg-petrol-600",
      "bg-petrol-700",
      "bg-petrol-800",
      "bg-petrol-900",
      "bg-petrol-950",
    ],
  },
  {
    name: "Laranja",
    classes: [
      "bg-orange-50",
      "bg-orange-100",
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-500",
      "bg-orange-600",
      "bg-orange-700",
      "bg-orange-800",
      "bg-orange-900",
    ],
  },
  {
    name: "Neutros",
    classes: [
      "bg-paper",
      "bg-neutral-100",
      "bg-neutral-200",
      "bg-neutral-300",
      "bg-neutral-400",
      "bg-neutral-500",
      "bg-neutral-600",
      "bg-ink",
    ],
  },
];

const riskLevels: RiskLevel[] = ["low", "medium", "high"];

const iconEntries = Object.entries(Icons).filter(
  ([name]) => name.startsWith("Icon"),
) as Array<[string, React.ComponentType<{ size?: 16 | 20 | 24 | 32 }>]>;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-neutral-200 py-10">
      <h2 className="text-h2 text-petrol-700">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-eyebrow text-accent-text">Página interna, não indexada</p>
      <h1 className="text-display mt-2 text-petrol-700">Styleguide</h1>

      <Section title="Cores">
        <div className="space-y-4">
          {colorGroups.map((group) => (
            <div key={group.name}>
              <p className="text-eyebrow text-ink-meta">{group.name}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {group.classes.map((cls) => (
                  <div key={cls} className="w-20">
                    <div className={`h-10 rounded-md ${cls}`} />
                    <p className="mt-1 truncate text-[10px] text-ink-meta">
                      {cls.replace("bg-", "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <div className="space-y-4">
          <p className="text-display text-petrol-700">Display: tese do hero</p>
          <p className="text-h2 text-petrol-700">H2: título de seção</p>
          <p className="text-h3 text-petrol-700">H3: título de card</p>
          <p className="text-body max-w-prose">
            Body 16px, line-height 1.4: texto corrido do site inteiro.
          </p>
          <p className="text-eyebrow text-ink-meta">
            Eyebrow meta uppercase, ex.: NR-5
          </p>
          <p className="text-stat tabular-stat text-petrol-700">
            850<span className="text-h3 text-orange-700">+</span>
          </p>
        </div>
      </Section>

      <Section title="Badges de risco">
        <div className="flex flex-wrap items-center gap-3">
          {riskLevels.map((nivel) => (
            <CardBadge key={nivel} nr={riskLabels[nivel]} nivel={nivel} />
          ))}
          <CardBadge nr="NR-35" />
          <Badge>shadcn badge</Badge>
        </div>
      </Section>

      <Section title="Botões">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destrutivo</Button>
          <Button disabled>Desabilitado</Button>
          <Button className="bg-orange-400 text-ink hover:bg-orange-500">
            CTA laranja
          </Button>
        </div>
      </Section>

      <Section title="Ícones de domínio (16)">
        <ul className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {iconEntries.map(([name, Icon]) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-md bg-surface-raised p-3 text-petrol-700 shadow-card"
            >
              <Icon size={24} />
              <span className="text-center text-[10px] text-ink-meta">
                {name.replace("Icon", "")}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Illustrations / placeholders">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ImageSlot slotId="styleguide-mesh" ratio="4/3">
            <MeshGradient variant="petrol-orange" seed={2} />
          </ImageSlot>
          <div className="rounded-lg bg-surface-inverse p-6">
            <RiskMatrixPattern
              tone="dark"
              litCells={[
                { x: 1, y: 1, level: "low" },
                { x: 3, y: 2, level: "medium" },
                { x: 4, y: 4, level: "high" },
              ]}
              className="h-auto w-full"
            />
          </div>
          <div className="grid gap-4">
            <ImageSlot slotId="styleguide-hex" ratio="16/9">
              <HexPattern tone="light" />
            </ImageSlot>
            <ImageSlot slotId="styleguide-doc" ratio="16/9">
              <DocLinesPattern tone="light" />
            </ImageSlot>
          </div>
        </div>
      </Section>

      <Section title="Motion (21st.dev re-skin)">
        <p className="text-eyebrow text-ink-meta">Number Ticker</p>
        <p className="text-stat mt-2 text-petrol-700">
          <NumberTicker value={850} />
          <span className="text-h3 text-orange-700">+</span>
        </p>

        <p className="text-eyebrow mt-10 text-ink-meta">Text Reveal (scroll)</p>
        <TextReveal
          text="Risco dimensionado. Pessoas protegidas."
          className="text-h2 mt-2 text-petrol-700"
        />

        <p className="text-eyebrow mt-10 mb-6 text-ink-meta">
          Card Fan (leque de entrada, hero das páginas)
        </p>
        <div className="rounded-lg bg-surface-inverse p-8">
          <CardFan
            className="mx-auto max-w-md"
            cards={[
              <ImageSlot
                key="1"
                slotId="styleguide-fan-1"
                ratio="4/5"
                className="h-full bg-petrol-900"
              >
                <HexPattern tone="dark" />
              </ImageSlot>,
              <div
                key="2"
                className="flex h-full w-full items-center justify-center bg-petrol-800 text-accent-on-inverse"
              >
                <Icons.IconCapacete size={32} />
              </div>,
              <ImageSlot
                key="3"
                slotId="styleguide-fan-3"
                ratio="4/5"
                className="h-full bg-petrol-900"
              >
                <MeshGradient variant="petrol-orange" seed={2} />
              </ImageSlot>,
            ]}
          />
        </div>

        <p className="text-eyebrow mt-10 mb-6 text-ink-meta">
          Scroll Timeline (beam preenche com o scroll)
        </p>
        <ScrollTimeline
          entries={[
            {
              title: "Fase 1",
              content: (
                <p className="text-sm leading-relaxed text-ink-muted">
                  Conteúdo da primeira entrada: role para ver o beam
                  preencher o trilho à esquerda.
                </p>
              ),
            },
            {
              title: "Fase 2",
              content: (
                <p className="text-sm leading-relaxed text-ink-muted">
                  Segunda entrada. Com prefers-reduced-motion o beam fica
                  100% preenchido, estático.
                </p>
              ),
            },
          ]}
        />

        <p className="text-eyebrow mt-10 mb-6 text-ink-meta">
          Tilt 3D (passe o mouse; desligado em reduced-motion / toque)
        </p>
        <div className="max-w-xs">
          <Tilt>
            <div className="flex h-40 flex-col justify-end rounded-xl bg-surface-raised p-card shadow-card">
              <Icons.IconCapacete size={32} />
              <p className="text-h3 mt-3 text-petrol-700">Card com tilt</p>
            </div>
          </Tilt>
        </div>

        <p className="text-eyebrow mt-10 text-ink-meta">Scroll-driven (demo ao vivo nas páginas)</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          <strong>WorkerScene</strong> (cena-centro da Home: o trabalhador ao
          centro com os 4 serviços irradiando dele, revelados no scroll),{" "}
          <strong>ParallaxBand</strong> (camada de foto deslocando por seção, no
          Sobre e em Engenharia de SST) e <strong>ReadingProgress</strong>{" "}
          (filete de progresso no artigo do blog e nas políticas) dependem do
          scroll da página, então vivem nas rotas reais. Todos leem o scroll por
          `target` ref, sem sequestrar o scroll nativo, e caem para estado
          estático em reduced-motion.
        </p>
      </Section>

      <Section title="Fotos (tratamento duotone / overlay)">
        <div className="grid gap-4 sm:grid-cols-3">
          <ImageSlot slotId="sg-photo-duotone" ratio="4/3">
            <Photo photo="sst-trabalhador-metal" treatment="duotone" accent />
          </ImageSlot>
          <ImageSlot slotId="sg-photo-overlay" ratio="4/3">
            <Photo photo="clinica-pressao" treatment="overlay" />
          </ImageSlot>
          <ImageSlot slotId="sg-photo-grade" ratio="4/3">
            <Photo photo="dp-documentos" treatment="grade" />
          </ImageSlot>
        </div>
      </Section>

      <Section title="Âncoras de hero (por serviço)">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-surface-inverse p-6">
            <p className="text-eyebrow mb-4 text-petrol-300">
              exam-status (Clínica)
            </p>
            <ExamStatusPanel tone="dark" />
          </div>
          <div className="rounded-lg bg-surface-tint p-6">
            <p className="text-eyebrow mb-4 text-accent-text">dp-flow (DP)</p>
            <DpFlow tone="light" />
          </div>
          <div className="rounded-lg bg-surface-tint p-6">
            <p className="text-eyebrow mb-4 text-accent-text">
              pericia-stack (Complementares)
            </p>
            <PericiaStack tone="light" />
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardBadge nr="NR-35" nivel="high" />
            <CardIcon className="mt-4">
              <Icons.IconCapacete size={24} />
            </CardIcon>
            <CardTitle className="mt-3">Trabalho em Altura</CardTitle>
            <CardMeta className="mt-1">8h, presencial</CardMeta>
            <CardBody className="mt-3">
              Capacitação obrigatória para atividades acima de 2 metros.
            </CardBody>
            <CardCTA href="/treinamentos" className="mt-4">
              Ver programa
            </CardCTA>
          </Card>
          <Card variant="tint">
            <CardTitle>Card tint</CardTitle>
            <CardBody className="mt-2">
              Superfície alternativa para seções claras.
            </CardBody>
          </Card>
          <Card variant="inverse">
            <CardTitle className="text-white">Card inverse</CardTitle>
            <CardBody className="mt-2 text-ink-muted-on-inverse">
              Superfície escura com tokens on-dark validados.
            </CardBody>
          </Card>
        </div>
        <div className="mt-6 max-w-sm">
          <p className="text-eyebrow mb-2 text-ink-meta">
            Hover-expand (zero layout shift)
          </p>
          <CardHoverReveal
            summary={
              <Card>
                <CardBadge nr="NR-10" nivel="medium" />
                <CardTitle className="mt-3">Segurança Elétrica</CardTitle>
                <CardMeta className="mt-1">40h, semipresencial</CardMeta>
                <CardBody className="mt-3 pb-10">
                  Passe o mouse ou foque para ver o detalhe.
                </CardBody>
              </Card>
            }
            detail={
              <div>
                <CardBody>
                  Formação completa NR-10 com laboratório prático.
                </CardBody>
                <CardCTA href="/treinamentos" className="mt-2">
                  Comprar curso
                </CardCTA>
              </div>
            }
          />
        </div>
      </Section>
    </div>
  );
}
