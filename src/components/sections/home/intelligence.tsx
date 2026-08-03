import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, BandHeading } from "@/components/sections/shared/band";
import { publishedPosts } from "@/lib/posts";

/**
 * Painel de Inteligência na home: as três análises mais recentes.
 *
 * Apenas 3 dos 12 concorrentes auditados publicam inteligência de mercado, e é
 * a segunda maior lacuna do setor. Conteúdo datado prova competência em tempo
 * real, que é diferente de provar histórico: qualquer um diz que tem 20 anos
 * de estrada, poucos conseguem escrever sobre o frete desta semana.
 *
 * Se ainda não houver post publicado, a seção não renderiza. Melhor ausente
 * que presente e vazia.
 */
export function Intelligence() {
  const posts = publishedPosts.slice(0, 3);
  if (posts.length === 0) return null;

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Band id="inteligencia" mode="ocean">
      <BandHeading
        ordinal="09"
        eyebrow="Painel de Inteligência"
        title="O que está acontecendo no mercado, com data e fonte."
        lead="Frete, câmbio, rota e regulação mudam a conta da sua importação toda semana. Publicamos a leitura que usamos nas nossas próprias operações."
      />

      <ul className="bg-rule mt-14 grid gap-px md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="bg-surface">
            <Link
              href={post.permalink}
              className="group flex h-full flex-col p-8"
            >
              <time
                dateTime={post.date}
                className="tabular-stat text-content-muted eyebrow"
              >
                {dateFormatter.format(new Date(post.date))}
              </time>
              <h3 className="text-h3 text-content group-hover:text-accent mt-4">
                {post.title}
              </h3>
              <p className="text-content-muted text-body mt-3 flex-1 leading-relaxed">
                {post.description}
              </p>
              <span className="text-accent text-body mt-6 inline-flex items-center gap-1.5">
                Ler análise
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/blog"
        className="border-accent text-content hover:text-accent text-body mt-10 inline-flex min-h-11 items-center gap-2 border-b pb-1 transition-colors"
      >
        Ver o painel completo
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Band>
  );
}
