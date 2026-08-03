import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/mdx-content";
import { TldrBox } from "@/components/mdx/tldr-box";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { AuthorBio } from "@/components/sections/blog/author-bio";
import { RelatedPosts } from "@/components/sections/blog/related-posts";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAuthor,
  getPostBySlug,
  getRelatedPosts,
  publishedPosts,
} from "@/lib/posts";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const author = getAuthor(post.author);
  const related = getRelatedPosts(post);
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(post.date),
  );

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <header>
          <p className="eyebrow text-accent flex flex-wrap gap-x-2">
            {post.temas.length > 0 ? (
              post.temas.map((nr) => <span key={nr}>{nr}</span>)
            ) : (
              <span>SST na prática</span>
            )}
          </p>
          <h1 className="text-display text-content mt-4">{post.title}</h1>
          <p className="eyebrow text-content-muted mt-5 flex flex-wrap gap-x-3">
            {author?.name && <span>{author.name}</span>}
            <span>{date}</span>
            <span>{post.metadata.readingTime} min de leitura</span>
          </p>
        </header>

        <TldrBox items={post.tldr} />

        <MDXContent code={post.content} />
        {author && <AuthorBio author={author} />}
        <RelatedPosts posts={related} />

        <JsonLd
          data={articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            updated: post.updated,
            authorName: author?.name ?? "Equipe E-Soluções",
            tags: post.tags,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: post.permalink },
          ])}
        />
      </article>
    </>
  );
}
