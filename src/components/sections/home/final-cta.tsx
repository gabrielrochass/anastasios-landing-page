import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/illustrations/image-slot";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/sections/shared/section";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-accent-text">Próximo passo</p>
            <h2 className="text-h2 mt-3 text-petrol-700">
              Quer saber exatamente onde sua empresa está exposta?
            </h2>
            <p className="mt-4 max-w-lg text-ink-muted">
              Agende uma conversa de 30 minutos com{" "}
              {siteConfig.specialist.name}. Você sai com um diagnóstico
              honesto do seu risco, mesmo que decida não contratar nada.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contato">Agendar diagnóstico</Link>
              </Button>
              <WhatsappButton
                context="home-final-cta"
                className="border-petrol-300 text-petrol-600 hover:bg-petrol-50 hover:text-petrol-700"
              />
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ImageSlot slotId="home-especialista" ratio="3/4">
              <div className="flex size-full items-center justify-center bg-petrol-900 text-center">
                <span className="text-eyebrow text-petrol-300 px-4">Foto da especialista<br />(sessão própria)</span>
              </div>
            </ImageSlot>
            <p className="text-eyebrow mt-3 flex flex-wrap gap-x-3 text-ink-meta">
              <span>{siteConfig.specialist.name}</span>
              <span>{siteConfig.specialist.role}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
