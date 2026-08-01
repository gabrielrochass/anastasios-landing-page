import type { Metadata } from "next";
import Link from "next/link";
import { CipaDiagnostic } from "@/components/interactive/cipa-diagnostic/cipa-diagnostic";
import { TrainingComparisonTable } from "@/components/interactive/training-table/training-comparison-table";
import { PhotoGallery } from "@/components/motion/photo-gallery";
import { RelatedServices } from "@/components/sections/shared/related-services";
import { Section } from "@/components/sections/shared/section";
import { SectionHeading } from "@/components/sections/shared/section-heading";
import { TrainingsHero } from "@/components/sections/trainings/trainings-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, courseSchema } from "@/lib/seo/schema";
import { trainings } from "@/lib/trainings";

export const metadata: Metadata = {
  title: "Treinamentos em Normas Regulamentadoras",
  description:
    "Catálogo de treinamentos NR validados: NR-35, NR-10, CIPA, NR-33 e mais. Compare carga horária, modalidade e preço, com checkout direto na plataforma EAD.",
};

export default async function TreinamentosPage() {
  const catalog = await trainings.getTrainings();
  const featured = catalog.filter((t) => t.featured);

  return (
    <>
      <TrainingsHero featured={featured} />

      {/* Calculadora primeiro: é a ferramenta que diferencia a página. */}
      <Section id="diagnostico-cipa">
        <SectionHeading
          eyebrow="Dimensionamento pela NR-5"
          title="Não sabe qual CIPA sua empresa precisa?"
          lead="Quatro campos e você descobre quantos membros, quanta hora de treinamento e quais NRs ficam no seu radar."
        />
        <div className="mt-12">
          <CipaDiagnostic />
        </div>
      </Section>

      <Section tone="tint" id="catalogo">
        <SectionHeading
          eyebrow="Catálogo completo"
          title="Todos os programas, lado a lado"
          lead="Filtre por norma, modalidade e grau de risco; compare carga horária e preço."
        />
        <div className="mt-12">
          <TrainingComparisonTable trainings={catalog} />
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-meta">
          Precisa de um programa in company ou de um volume maior de
          matrículas?{" "}
          <Link
            href="/contato"
            className="font-medium text-accent-text underline decoration-orange-400 underline-offset-2 hover:text-petrol-700"
          >
            Fale com a gente
          </Link>{" "}
          e montamos a trilha pelo grau de risco da sua operação.
        </p>
      </Section>

      <Section id="galeria">
        <SectionHeading
          eyebrow="Ambiente e prática"
          title="Treinamento onde o risco acontece"
          lead="Imagens de referência dos contextos de SST que nossos treinamentos de NR cobrem, da altura ao espaço confinado."
        />
        <div className="mt-10">
          <PhotoGallery
            photos={[
              "sst-trabalhadores",
              "sst-industria",
              "sst-capacetes-rack",
              "sst-soldador",
              "sst-trabalhador-colete",
              "sst-capacetes-parede",
            ]}
          />
        </div>
      </Section>

      <RelatedServices
        currentSlug="treinamentos"
        eyebrow="Além do treinamento"
        title="A capacitação é uma frente. Veja as outras."
        lead="Treinamento de NR anda junto com o programa que o exige. Estas são as frentes que a E-Soluções opera na mesma casa."
      />

      {catalog.map((training) => (
        <JsonLd key={training.id} data={courseSchema(training)} />
      ))}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Treinamentos", path: "/treinamentos" },
        ])}
      />
    </>
  );
}
