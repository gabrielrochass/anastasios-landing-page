import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
      <p className="text-eyebrow text-accent-text">Erro 404</p>
      <h1 className="text-display text-petrol-700">
        Página não encontrada.
      </h1>
      <p className="max-w-md text-ink-muted">
        O endereço pode ter mudado ou nunca existiu. Volte para a página
        inicial ou fale com a gente.
      </p>
      <Button asChild>
        <Link href="/">Voltar ao início</Link>
      </Button>
    </section>
  );
}
