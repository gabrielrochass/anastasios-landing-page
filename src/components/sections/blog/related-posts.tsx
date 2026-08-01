import { PostCard } from "@/components/sections/blog/post-card";
import type { Post } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-label="Artigos relacionados" className="mt-14">
      <p className="text-eyebrow text-accent-text">Continue lendo</p>
      <h2 className="text-h2 mt-2 text-petrol-700">Artigos relacionados</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
