import type {
  Article,
  BreadcrumbList,
  Course,
  LocalBusiness,
  Organization,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/site-config";
import type { Training } from "@/lib/trainings/types";

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
  };
}

export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: "Recife e Região Metropolitana, PE",
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  authorName: string;
  tags: string[];
}

export function articleSchema(post: ArticleSchemaInput): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "pt-BR",
    keywords: post.tags.join(", "),
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function courseSchema(training: Training): WithContext<Course> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.shortDescription,
    courseCode: training.slug,
    timeRequired: `PT${training.hours}H`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(training.priceCents !== null && {
      offers: {
        "@type": "Offer",
        price: (training.priceCents / 100).toFixed(2),
        priceCurrency: "BRL",
        url: training.externalUrl,
      },
    }),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
