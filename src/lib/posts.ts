import { authors, posts } from "@velite";

export type Post = (typeof posts)[number];
export type Author = (typeof authors)[number];

/** Publicados, mais recentes primeiro. Drafts ficam fora de tudo em produção. */
export const publishedPosts: Post[] = posts
  .filter((post) => !post.draft)
  .toSorted((a, b) => b.date.localeCompare(a.date));

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAuthor(key: string): Author | undefined {
  return authors.find((author) => author.key === key);
}

/**
 * Related posts: override manual do frontmatter quando presente; senão,
 * score por interseção de nrs (peso 2) e tags (peso 1).
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const manual = post.related
    .map((slug) => publishedPosts.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p) && p?.slug !== post.slug);
  if (manual.length >= limit) return manual.slice(0, limit);

  const scored = publishedPosts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        !manual.some((m) => m.slug === candidate.slug),
    )
    .map((candidate) => {
      const nrScore = candidate.nrs.filter((nr) => post.nrs.includes(nr)).length;
      const tagScore = candidate.tags.filter((tag) =>
        post.tags.includes(tag),
      ).length;
      return { candidate, score: nrScore * 2 + tagScore };
    })
    .filter(({ score }) => score > 0)
    .toSorted((a, b) => b.score - a.score)
    .map(({ candidate }) => candidate);

  return [...manual, ...scored].slice(0, limit);
}
