import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhotoHero } from "@/components/sections/shared/photo-hero";
import type { ServiceContent } from "@/data/services/types";

/** Hero de serviço liderado por foto real; a âncora funcional foi para uma
 * seção do meio da página (ver ServiceAnchorSection). */
export function ServiceHero({ content }: { content: ServiceContent }) {
  return (
    <PhotoHero
      photo={content.heroImage}
      eyebrow={content.eyebrow}
      title={content.title}
      lead={content.lead}
      priority
      actions={
        <Button
          asChild
          size="lg"
          className="bg-orange-400 text-ink hover:bg-orange-500"
        >
          <Link href="/contato">Solicitar orçamento</Link>
        </Button>
      }
    />
  );
}
