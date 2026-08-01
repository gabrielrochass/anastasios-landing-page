import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RotatingWord } from "@/components/motion/rotating-word";
import { PhotoHero } from "@/components/sections/shared/photo-hero";

export function Hero() {
  return (
    <PhotoHero
      photo="dp-escritorio"
      size="tall"
      align="center"
      priority
      eyebrow="Departamento pessoal e engenharia de SST"
      title={
        <>
          Folha de pagamento e SST
          <br />
          <RotatingWord
            className="text-accent-on-inverse"
            words={[
              "sem retrabalho.",
              "no prazo.",
              "na mesma casa.",
              "com quem responde.",
            ]}
          />
        </>
      }
      lead="Terceirização de folha e departamento pessoal com visão personalizada e redução de custos. Agora também com engenharia de SST dimensionada em campo, em Recife e região."
      actions={
        <>
          <Button
            asChild
            size="lg"
            className="bg-orange-400 text-ink hover:bg-orange-500"
          >
            <Link href="/servicos/departamento-pessoal">Terceirizar a folha</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-petrol-300 bg-transparent text-white hover:bg-petrol-900 hover:text-white"
          >
            <Link href="/servicos/engenharia-sst">Engenharia de SST</Link>
          </Button>
        </>
      }
    />
  );
}
