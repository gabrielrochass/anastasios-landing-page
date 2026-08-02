import Link from "next/link";
import { CardBadge } from "@/components/cards/card";
import { ImageSlot } from "@/components/illustrations/image-slot";
import { getAuthor, type Post } from "@/lib/posts";

/**
 * Capa do post. O registro de fotos está vazio nesta fase, então nada é
 * renderizado e o ImageSlot em volta segura a proporção. Quando a capa real
 * chegar, o troco é aqui e não gera CLS.
 */
function CoverPlaceholder() {
  return null;
}

export function PostCard({ post }: { post: Post }) {
  const author = getAuthor(post.author);
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(post.date),
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-raised border border-rule transition-[box-shadow,transform] duration-300 hover:-translate-y-1  focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <ImageSlot
        slotId={`blog-cover-${post.slug}`}
        ratio="16/9"
        className="rounded-b-none [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105"
      >
        <CoverPlaceholder />
      </ImageSlot>
      <div className="flex flex-1 flex-col p-card">
        <div className="flex flex-wrap gap-2">
          {post.temas.slice(0, 2).map((nr) => (
            <CardBadge key={nr}>{nr}</CardBadge>
          ))}
        </div>
        <h2 className="text-h3 mt-3 text-content">
          <Link
            href={post.permalink}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-content-muted">
          {post.description}
        </p>
        <p className="text-eyebrow mt-4 flex flex-wrap gap-x-3 text-content-muted">
          <span>{author?.name}</span>
          <span>{date}</span>
          <span>{post.metadata.readingTime} min</span>
        </p>
      </div>
    </article>
  );
}
