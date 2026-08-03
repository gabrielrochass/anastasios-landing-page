import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, organizationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

/**
 * Duas famílias, não três.
 *
 * A pilha anterior era Inter mais Instrument Serif mais Geist Mono, e o
 * problema não era nenhuma delas isoladamente: era as três juntas. Inter é a
 * fonte padrão de todo produto SaaS desde 2019, Instrument Serif virou a
 * serifada de display das landing pages de inteligência artificial a partir de
 * 2023, e Geist Mono é a fonte da Vercel. Somadas, elas vestem o uniforme
 * completo daquela cena, e este é um site de uma consultoria de comércio
 * exterior com vinte e dois anos de operação.
 *
 * Agora existe um grotesco só para todo o texto e um monoespaçado só para
 * dado. Sem serifada de display, porque era ela que fazia a sinalização.
 *
 * O risco declarado da escolha é achatamento: sem o contraste entre serifada e
 * sem serifa, a hierarquia inteira passa a depender de tamanho, peso e espaço.
 * A compensação está na escala em `globals.css`, não aqui.
 *
 * Só `latin`, não `latin-ext`.
 * Medido: `latin` cobre U+0000 a U+00FF, e os 30 codepoints do português
 * estão todos ali. `latin-ext` é peso que não serve para nada aqui, e é o
 * tipo de "correção" que alguém refaz achando que acento precisa dela.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/**
 * IBM Plex Mono não é variável, então os pesos vêm declarados. Só os dois que
 * a escala usa: 400 para dado tabular e 600 para rótulo e ordinal.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "600"],
  subsets: ["latin"],
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
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: MOTION_PREFERENCE_SCRIPT }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="focus:bg-accent focus:text-accent-contrast sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
