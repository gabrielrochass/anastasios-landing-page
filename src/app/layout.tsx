import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsGate } from "@/components/analytics/analytics-gate";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, organizationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Instrument Serif não é variável, só existe no peso 400. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: sourcing e gestão de risco em comércio exterior`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
  },
};

/**
 * Roda de forma síncrona durante o parse do HTML, antes do primeiro paint.
 * Sem isto, quem escolheu reduzir animações veria a página animar por alguns
 * frames antes do React hidratar, que é exatamente o público para quem esses
 * frames são o problema.
 */
const MOTION_PREFERENCE_SCRIPT = `try{if(localStorage.getItem("hh-motion")==="reduced"){document.documentElement.setAttribute("data-motion","reduced")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      // O Next 16 não sobrescreve mais scroll-behavior na navegação. Sem este
      // atributo, o `scroll-behavior: smooth` do globals.css faz cada troca de
      // rota animar um scroll longo até o topo.
      data-scroll-behavior="smooth"
      data-mode="doc"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_PREFERENCE_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ConsentBanner />
        <AnalyticsGate />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
