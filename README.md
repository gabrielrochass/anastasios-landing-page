# E-Soluções — Website Institucional

Site institucional da E-Soluções (SST, clínica ocupacional e departamento pessoal — Recife/PE). Frontend 100% estático em Next.js; sem backend próprio nesta fase.

## Stack

- **Next.js 16** (App Router, tudo SSG) + **React 19** + **TypeScript strict**
- **Tailwind CSS 4** (tokens em `@theme` no `src/app/globals.css` — sem tailwind.config) + **shadcn/ui** (Radix)
- **Velite** — blog em MDX com frontmatter validado por Zod (`velite.config.ts`)
- **motion** (Framer Motion) — só via `src/components/motion/{reveal,stagger}.tsx`
- **Vitest** — motor CIPA, catálogo, regressão de contraste WCAG dos tokens

## Rodar

```bash
npm install
npm run dev      # velite dev + next dev
npm run build    # velite + next build (todas as rotas estáticas)
npm run test     # vitest
npm run lint
```

## Arquitetura em 1 minuto

- **Conteúdo dos serviços**: dados tipados em `src/data/services/*.ts` renderizados por um template único (`src/components/sections/services/service-page.tsx`).
- **Catálogo de treinamentos**: `src/lib/trainings/` — interface `TrainingProvider`; hoje um JSON local validado por Zod. Quando a API do Host existir, crie `HostTrainingProvider` e troque 1 linha em `src/lib/trainings/index.ts`.
- **Blog**: `src/content/blog/*.mdx` (3 publicados + 9 stubs `draft: true`, fora de listagem/sitemap em produção). Componentes MDX: TldrBox, Checklist, PullQuote.
- **Diagnóstico CIPA**: motor puro em `src/lib/cipa/engine.ts`; dimensionamento transcrito do Quadro I da NR-5 vigente (fontes e ressalvas em `src/lib/cipa/cipa-data.ts`).
- **Contato**: quiz de 3 perguntas pré-preenche o formulário (RHF + Zod + server action). E-mail via interface `EmailProvider` — stub de console até plugar Resend (`src/lib/email/index.ts`).
- **Analytics**: GA4 só com consentimento (banner LGPD); eventos tipados em `src/lib/analytics.ts`. Configure `NEXT_PUBLIC_GA_ID` (ver `.env.example`).
- **SEO**: metadata API + JSON-LD (Organization, LocalBusiness, Article, Course, Breadcrumb) em `src/lib/seo/schema.ts`; `sitemap.ts`/`robots.ts` nativos; OG images do blog geradas no build.
- **Assets**: fotos reais ainda não existem — slots documentados em [ASSETS.md](ASSETS.md) (troca 1:1 sem CLS).

## Qualidade (verificado nesta versão)

- Lighthouse desktop **100/100/100/100** em home, serviço, treinamentos, blog post e sobre (CLS 0, LCP ≤ 0,7s local)
- **0 violações** no accesslint (WCAG 2.2) nas 10 rotas
- Contraste dos tokens coberto por teste de regressão (`src/lib/design/tokens.contrast.test.ts`)

## Pendências antes do go-live (buscar por `[VALIDAR]`)

Dados de contato/endereço reais (`src/lib/site-config.ts`), números de prova social, cases de cliente, revisão jurídica das páginas legais, bios/fotos, mapeamento setor→grau de risco do diagnóstico CIPA, GA4 property e domínio definitivo.

## Deploy (Vercel)

Projeto pronto para Vercel sem configuração especial (build = `npm run build`). Antes: definir env vars (`NEXT_PUBLIC_GA_ID`, futuramente `RESEND_API_KEY` + `npm install resend`), atualizar `siteConfig.url` para o domínio final.
