# H H Brasil, landing page

Landing de página única mais Painel de Inteligência para a H H Brasil Ltda.,
consultoria de sourcing e gestão de risco em comércio exterior. Frontend 100%
estático em Next.js, sem backend próprio.

## Stack

- **Next.js 16.2.11** (App Router, tudo SSG) com **React 19.2** e TypeScript strict
- **Tailwind CSS 4**, com todos os tokens em `@theme` no `src/app/globals.css`. Não existe `tailwind.config`
- **shadcn/ui** sobre o pacote unificado `radix-ui`
- **Velite** para o blog em MDX, com frontmatter validado por Zod
- **motion** v12, sempre via `LazyMotion` com o componente `m` em modo strict
- **WebGL2 escrito à mão** para o oceano. Sem three.js, sem R3F, zero dependência
- **d3-geo** só em build, para projetar o mapa. Nenhum d3 chega ao navegador
- **Vitest** para contraste WCAG dos tokens, regras de escrita e motor do quiz

## Rodar

```bash
npm install
npm run dev        # velite dev e next dev, em paralelo
npm run build      # gera o mapa, roda o velite e builda
npm test           # vitest
npm run lint
npm run build:map  # regenera src/lib/map-paths.ts a partir de src/data/routes.ts
npm run check:config  # portão de go-live, falha se sobrar placeholder
```

## Arquitetura em um minuto

**Dois modos de cor, não um dark mode.** `[data-mode="ocean"|"doc"]` remapeia a
camada semântica, e os componentes usam só `bg-surface text-content
border-rule`. Nenhum componente sabe que existem dois modos. Detalhes em
[docs/DESIGN-DECISIONS.md](docs/DESIGN-DECISIONS.md).

**O navio é a espinha da página.** `src/components/motion/ship-route.tsx`
percorre uma rota SVG conforme o scroll, com posição e tangente por
`getPointAtLength`. Duas geometrias reais, horizontal e serpentina vertical,
selecionadas por `useViewportGeometry()`. Mobile não recebe fallback, recebe
geometria própria.

**O oceano é um quad em WebGL2.** `src/components/webgl/`, cerca de 120 linhas
de shader. O rAF só roda com o elemento na viewport, a aba visível, movimento
permitido e conexão disposta. Sem WebGL2 o canvas não monta e fica o fundo
sólido.

**O mapa é gerado em build.** `scripts/build-map.mjs` projeta com d3-geo e
emite `src/lib/map-paths.ts`. O componente é Server Component puro e o desenho
do traço é `animation-timeline: view()` nativo, então a seção inteira custa
zero JavaScript.

**Conteúdo em dados tipados.** `src/data/operation.ts` (as 6 etapas),
`src/data/offer.ts` (prova, problema, cadeia, crédito, regimes, FAQ) e
`src/data/routes.ts` (rotas e portos). Alterar copy é alterar dado, não JSX.

**Contato só por WhatsApp.** Quiz de 4 perguntas em
`src/components/interactive/contact/` monta a mensagem e abre a conversa.
Nenhum dado pessoal trafega ou é armazenado.

**Blog.** `src/content/blog/*.mdx`, validado por Zod no `velite.config.ts`.
Componentes MDX: TldrBox, Checklist, PullQuote.

## Portões de qualidade

Três testes que falham o build, não convenções que dependem de disciplina:

- `src/lib/design/tokens.contrast.test.ts`: contraste WCAG de todos os pares,
  nos dois modos, incluindo asserções **negativas** que codificam as
  proibições. Se alguém "consertar" o cobre para funcionar em fundo claro, o
  teste força uma revisão deliberada do sistema de acento.
- `src/lib/design/copy.test.ts`: varre conteúdo e seções atrás de travessão,
  midpoint e meia-risca, e aponta arquivo, linha e coluna.
- `src/components/interactive/contact/qualifier-engine.test.ts`: a mensagem do
  WhatsApp é o produto final do site, então tem teste.

## Pendências antes do go-live

`npm run check:config` lista as que bloqueiam. As demais estão no documento de
pendências enviado ao cliente. As duas mais importantes são jurídicas:

1. A H H Brasil tem RADAR próprio e toma título da mercadoria, ou opera sempre
   via trading parceira?
2. Quem concede o prazo de 90 a 120 dias do B/L?

Ambas mudam a redação da oferta e estão marcadas com `[CONFIRMAR]` no código.

## Deploy

Pronto para Vercel sem configuração especial. Antes: definir
`NEXT_PUBLIC_GA_ID`, atualizar `siteConfig.url` para o domínio final e passar
no `npm run check:config`.
