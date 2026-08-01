import type { MetadataRoute } from "next";
import { publishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

const staticPaths = [
  "/",
  "/sobre",
  "/servicos/departamento-pessoal",
  "/servicos/clinica-ocupacional",
  "/servicos/engenharia-sst",
  "/servicos/complementares",
  "/treinamentos",
  "/blog",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-uso",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${siteConfig.url}${post.permalink}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
