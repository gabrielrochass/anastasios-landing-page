import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { PostRow } from "@/components/sections/blog/post-row";
import { Section } from "@/components/sections/shared/section";
import { JsonLd } from "@/components/seo/json-ld";
import { publishedPosts } from "@/lib/posts";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Legislação de SST explicada por quem aplica: NRs, eSocial, PGR, clínica ocupacional e departamento pessoal, sem juridiquês.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />

      <Section>
        {publishedPosts.length === 0 ? (
          <p className="text-content-muted">Primeiros artigos chegando em breve.</p>
        ) : (
          <div className="flex flex-col divide-y divide-neutral-200">
            {publishedPosts.map((post, index) => (
              <div key={post.slug} className="py-10 first:pt-0 last:pb-0">
                <PostRow post={post} featured={index === 0} />
              </div>
            ))}
          </div>
        )}
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </>
  );
}
