import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardBadge } from "@/components/cards/card";
import { ImageSlot } from "@/components/illustrations/image-slot";
import { getAuthor, type Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

/**
 * Linha editorial do blog: capa à esquerda, texto à direita. A primeira
 * (`featured`) entra maior. Empilhadas com divisórias, nunca deixam célula
 * vazia , bom com 3 posts e com 12. Hover sóbrio: zoom leve da capa,
 * sublinhado no título e seta deslizando (desligados em reduced-motion).
 */
export function PostRow({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const author = getAuthor(post.author);
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(post.date),
  );

  return (
    <article
      className={cn(
        "group focus-within:ring-accent focus-within:ring-offset-surface relative grid gap-6 rounded-xl focus-within:ring-2 focus-within:ring-offset-4 md:grid-cols-12 md:items-center",
        featured && "md:gap-8",
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl",
          featured ? "md:col-span-7" : "md:col-span-5",
        )}
      >
        {/* O registro de fotos está vazio nesta fase, então o slot reserva a
            proporção e não haverá CLS quando a capa real entrar. */}
        <ImageSlot slotId={`blog-cover-${post.slug}`} ratio="16/9">
          <span />
        </ImageSlot>
      </div>
      <div
        className={cn(
          "flex flex-col",
          featured ? "md:col-span-5" : "md:col-span-7",
        )}
      >
        <div className="flex flex-wrap gap-2">
          {featured && <CardBadge>Em destaque</CardBadge>}
          {post.temas.slice(0, 2).map((nr) => (
            <CardBadge key={nr}>{nr}</CardBadge>
          ))}
        </div>
        <h2
          className={cn("text-content mt-3", featured ? "text-h2" : "text-h3")}
        >
          <Link
            href={post.permalink}
            className="decoration-orange-400 decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-content-muted mt-2 leading-relaxed">
          {post.description}
        </p>
        <p className="eyebrow text-content-muted mt-4 flex flex-wrap gap-x-3">
          {author && <span>{author.name}</span>}
          <span>{date}</span>
          <span>{post.metadata.readingTime} min de leitura</span>
        </p>
        <span className="text-accent mt-4 inline-flex items-center gap-1.5 font-semibold">
          Ler artigo
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </article>
  );
}
