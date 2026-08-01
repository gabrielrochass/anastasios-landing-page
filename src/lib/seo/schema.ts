import type {
  Article,
  BreadcrumbList,
  LocalBusiness,
  Organization,
  Service,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/site-config";

/**
 * JSON-LD do site.
 *
 * Sem `sameAs`: a H H Brasil não tem LinkedIn nem Instagram ativos, e apontar
 * para perfil vazio ou de terceiro é pior que não apontar. O sinal de
 * legitimidade aqui é o CNPJ, que entra como `identifier` e aparece visível no
 * rodapé.
 *
 * Sem `email`: o contato acontece só por WhatsApp.
 */

const postalAddress = {
  "@type": "PostalAddress",
  ...siteConfig.address,
} as const;

const cnpjIdentifier = {
  "@type": "PropertyValue",
  propertyID: "CNPJ",
  value: siteConfig.cnpj,
} as const;

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    identifier: cnpjIdentifier,
    address: postalAddress,
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
    telephone: siteConfig.phone,
    identifier: cnpjIdentifier,
    address: postalAddress,
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  anchor: string;
}

/**
 * Substitui o `courseSchema` do projeto anterior. Cada pilar da operação vira
 * um `Service` do provedor, o que é o tipo correto para consultoria.
 */
export function serviceSchema(input: ServiceSchemaInput): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: "Consultoria em comércio exterior",
    url: `${siteConfig.url}/#${input.anchor}`,
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
