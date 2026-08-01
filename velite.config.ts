import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(80),
      slug: s.slug("posts"),
      description: s.string().min(80).max(160),
      date: s.isodate(),
      updated: s.isodate().optional(),
      /** key em authors.yml */
      author: s.string(),
      tags: s.array(s.string()),
      /** NRs citadas — alimenta recomendações de treinamento. */
      nrs: s.array(s.string()).default([]),
      cover: s.image().optional(),
      /** bullets do TLDR box */
      tldr: s.array(s.string()).min(2).max(5),
      /** override manual de related posts (slugs) */
      related: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
});

const authors = defineCollection({
  name: "Author",
  pattern: "authors.yml",
  schema: s.object({
    key: s.string(),
    name: s.string(),
    role: s.string(),
    bio: s.string(),
    linkedin: s.string().optional(),
  }),
});

export default defineConfig({
  root: "src/content",
  collections: { posts, authors },
});
