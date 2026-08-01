import type { Metadata } from "next";
import { ContactFlow } from "@/components/interactive/contact/contact-flow";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { PhotoHero } from "@/components/sections/shared/photo-hero";
import { Section } from "@/components/sections/shared/section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com um especialista da E-Soluções: diagnóstico rápido de 3 perguntas e sua mensagem de WhatsApp montada na hora. Folha/DP, engenharia de SST e treinamentos em Recife/PE.",
};

export default function ContatoPage() {
  return (
    <>
      <PhotoHero
        photo="clinica-profissional"
        align="center"
        priority
        eyebrow="Contato"
        title="Três perguntas e você sai com um caminho."
        lead="Responda o diagnóstico rápido: ele já monta a sua mensagem de WhatsApp com o assunto certo. É só revisar e enviar."
      />

      <Section>
        <ContactFlow />
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-ink-muted">
            Prefere não preencher formulário?
          </p>
          <div className="mt-3">
            <WhatsappButton
              context="pagina-contato"
              className="border-petrol-300 text-petrol-600 hover:bg-petrol-50 hover:text-petrol-700"
            />
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-meta">
            <span>{siteConfig.phone}</span>
            <span>
              {siteConfig.address.addressLocality}/
              {siteConfig.address.addressRegion}
            </span>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:text-petrol-700"
            >
              {siteConfig.instagram.handle}
            </a>
          </p>
        </div>
      </Section>

      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
    </>
  );
}
