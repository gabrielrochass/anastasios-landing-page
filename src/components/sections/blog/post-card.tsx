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
    <article className="group bg-surface-raised border-rule focus-within:ring-accent relative flex h-full flex-col overflow-hidden rounded-xl border transition-[box-shadow,transform] duration-300 focus-within:ring-2 focus-within:ring-offset-2 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <ImageSlot
        slotId={`blog-cover-${post.slug}`}
        ratio="16/9"
        className="rounded-b-none [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105"
      >
        <CoverPlaceholder />
      </ImageSlot>
      <div className="p-card flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2">
          {post.temas.slice(0, 2).map((nr) => (
            <CardBadge key={nr}>{nr}</CardBadge>
          ))}
        </div>
        <h2 className="text-h3 text-content mt-3">
          <Link
            href={post.permalink}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-content-muted text-body mt-2 flex-1 leading-relaxed">
          {post.description}
        </p>
        <p className="eyebrow text-content-muted mt-4 flex flex-wrap gap-x-3">
          <span>{author?.name}</span>
          <span>{date}</span>
          <span>{post.metadata.readingTime} min</span>
        </p>
      </div>
    </article>
  );
}
