# Decisões de design e conteúdo — E-Soluções

Documento vivo. Explica **por que** cada página é como é e **o que falta** preencher/validar antes do go-live. Complementa: [ASSETS.md](../ASSETS.md) (slots de imagem), [IMAGE-SOURCES.md](./IMAGE-SOURCES.md) (onde buscar fotos), [README.md](../README.md) (stack e como rodar).

## Princípios transversais

- **Assinatura visual: a matriz de risco 5×5.** É o artefato real do domínio (probabilidade × severidade). Aparece no hero, em divisores, nós de timeline e no loading do diagnóstico. Nenhum template corporativo tem isso — é o que tira a "cara de IA/genérico".
- **Laranja é acento cirúrgico.** Petróleo domina; o laranja (`#ff8c42`) só aparece no CTA primário da tela, num dado destacado e no focus ring. Nunca dois laranjas competindo no mesmo viewport.
- **Light-only.** Site de captação, visitante único; dark mode dobraria o QA de contraste. O "peso" visual vem de seções invertidas (petrol-950), não de um tema escuro.
- **Orçamento de qualidade inegociável:** Lighthouse 100, CLS 0, WCAG AA (0 violações no accesslint), `prefers-reduced-motion` respeitado em toda animação. Todo componente novo passa por esses gates antes de entrar.
- **Sem "cara de IA" no texto:** proibidos travessão (—) e middle dot (·) como muleta de pontuação. Separação de dados vira estrutura visual (spans em flex), não caractere. Números sempre tabulares.
- **Movimento com função.** Animação entra para guiar atenção ou revelar hierarquia, nunca como enfeite. Tudo via `motion` confinado a `src/components/motion/*`.

## Direção visual: foto real lidera (revisão jul/2026)

Depois de uma revisão do dono ("não vi fotos, quero remover os gradientes e os gráficos de risco com quadrados e substituir por fotos reais"), o site passou a ser **liderado por foto**:

- **Heros por foto** (`PhotoHero`): home, 4 serviços, sobre e contato abrem com uma foto real em tela cheia + overlay petróleo direcional (garante AA do texto claro). Nada de fundo abstrato no hero.
- **Grafismos abstratos removidos das páginas** (matriz de quadrados, gradientes mesh, hex, doc-lines). Sobrevivem só como marca pequena (células do logo no header, `<hr>` do MDX) e na `/styleguide` interna. Cases de serviço, painéis do sticky-scroll e capas de blog agora usam foto (`Photo`).
- **Tratamento natural**: `Photo` default = `grade` (dessaturação leve só para coesão). O duotone pesado da versão anterior fazia a foto parecer um gráfico azul — por isso o dono "não via foto". `overlay` (gradiente petróleo) só nos heros, para contraste do texto.
- **Fotos de pessoas**: stock interino com pessoas (trabalhador, atendimento) em heros/seções; retrato de Adna, equipe e avatares de autor seguem **placeholder sólido honesto** (nunca stock passando por pessoa real da empresa) até a sessão própria.
- As **âncoras funcionais** (timeline, painel de exames, fluxo DP, pilha de perícias) saíram do hero e viraram **seção do meio** (`ServiceAnchorSection`) — continuam entregando dinamismo, sem competir com a foto na dobra.
- **Hierarquia**: todo `h1` de página usa `text-display` (contato foi corrigido); eyebrow `eager` (legível desde o SSR).

### Âncoras funcionais (agora em seção do meio)

Cada serviço tem uma âncora própria logo após o problema: (não um molde decorativo repetido), alternando fundo claro/escuro para nenhuma sequência abrir igual. Resposta direta à crítica "5 páginas com o mesmo molde e metade direita vazia":

| Página | Fundo | Âncora de entrada | Por quê |
| --- | --- | --- | --- |
| **Home** | escuro | Matriz em parallax + cascata do texto | Tese da marca; a matriz é a assinatura em movimento |
| **Engenharia SST** | escuro | **Timeline da legislação** (1978→hoje) puxada pro topo | Era o elemento mais forte do site, estava enterrado no meio |
| **Clínica** | escuro | **ExamStatusPanel**: exames animando para "Em dia" (verde) | Materializa "cada exame no prazo, cada risco no radar" |
| **DP** | **claro** | **DpFlow**: admissão→eSocial→folha→desligamento | Mostra a integração que evita a divergência do eSocial |
| **Complementares** | **claro** | **PericiaStack**: pilha de perícias/laudos em cascata | Concretiza os tipos de serviço técnico |
| **Treinamentos** | claro | Leque de cursos reais + calculadora CIPA logo abaixo | Amarra ao catálogo; a ferramenta sobe pra dobra |
| **Blog** | claro | Editorial: artigo em destaque (capa + resumo) | Entrega conteúdo imediatamente |
| **Sobre** | escuro | **Números animados** (NumberTicker) + leque de fotos | Prova social na dobra; o leque humaniza |
| **Contato** | escuro | Hero enxuto; o **quiz** é o protagonista logo abaixo | Sóbrio de propósito |

Componentes-âncora novos em `src/components/sections/services/anchors/`. Alternância clara/escura vem de `heroTone` em cada `ServiceContent`; a âncora, de `heroAnchor`.

**Correções de contraste/legibilidade:** o eyebrow agora entra `eager` (legível desde o SSR, não depende da animação — era o "desbotado" que a análise apontou). Títulos de Clínica/DP/Complementares reescritos para quebrar a fórmula "X não se Y. Verbo-se." (mantidos Home e Engenharia). Heros de serviço tiveram a altura reduzida (`py-16/20`) e a metade direita deixou de ser decorativa.

**Fotos reais (confiança):** stock curado tratado em duotone petróleo nos cases dos serviços (`Photo` + `src/lib/photos.ts`); ver Parte de fotos abaixo. Slots humanos (Adna, equipe, clínica com paciente) seguem placeholder até a sessão própria.

**Primitivos de animação** (`src/components/motion/`): `Entrance`/`EntranceItem` (cascata blur+y; prop `eager` no elemento LCP), `CardFan` (leque de 3 cards), `Reveal`/`Stagger`, `ScrollTimeline`, `NumberTicker`, `RotatingWord`, `PhotoGallery` (grade de fotos com Stagger + zoom no hover). Todos com fallback estático em reduced-motion.

**Interações de scroll/parallax/3D** (adaptadas de padrões do 21st.dev ao tema, jul/2026): `WorkerScene` (cena-centro da Home: o trabalhador ao centro com os 4 serviços irradiando dele, revelados um a um no scroll com folga de leitura, perspectiva CSS + tilt no ponteiro; absorve a antiga grade de pilares), `ParallaxBand` (camada de foto deslocando em `y` por seção; Sobre e um serviço), `Tilt` (inclinação 3D por ponteiro em cards, via CSS transforms), `ReadingProgress` (filete de progresso em páginas longas). Regras que os mantêm dentro do orçamento: uma única lib (`motion`, sem `gsap`/`lenis`/`three`); leitura de scroll por `target` ref, **nunca** `preventDefault` em wheel/touch (sem scroll-jacking); só `transform`/`opacity`; altura reservada (CLS 0); tríplice guarda de reduced-motion com estado final estático. Descartados: smooth-scroll global (Lenis) por mudar o feel do site inteiro e furar reduced-motion; scroll-jacking do componente original; vídeo autoplay e image-sequence por peso/tom.

**Posicionamento (jul/2026): dois pilares reais.** Alinhado ao negócio real (site esolucoesdp.com.br): **terceirização de folha/DP** (consolidado) + **engenharia de SST** (frente nova). A Home lidera pelos dois; `serviceLinks` põe DP em 1º e Engenharia de SST em 2º. **Prova fabricada removida** (stats 850+/100%/35%, cases "Cenário ilustrativo", depoimentos) até haver dado real. **Contato real** em `site-config.ts` (WhatsApp 5581996074906, Rua Alfredo Coutinho 95, @esolucoesdp); o formulário de contato compõe a mensagem do WhatsApp a partir dos campos. **Blog escondido** do nav/rodapé (rotas mantidas). Pendentes: validar clínica/complementares, e-mail/CNPJ, fotos próprias de turmas.

**Seção "A solução" = abas** (`solution-tabs.tsx`, substituiu o antigo sticky de foto repetida): segmented-control escaneável, só o detalhe ativo à vista, `AnimatePresence` no painel + indicador por bg (sem `layoutId`, que exigiria `domMax`), teclado completo, `min-height` reservada (CLS 0).

**Mobile (375px):** verificado por medição real de viewport (CDP, `scrollWidth == 375`, zero elementos estourando) em home, serviços e treinamentos. DpFlow empilha vertical, timeline rola horizontal dentro do próprio container, nav vira hambúrguer. Sem overflow horizontal.

## Fotos

Componente `Photo` (`src/components/photo/photo.tsx`) aplica o tratamento do design system a fotos de stock de origens diferentes: `grade` (dessatura), `overlay` (gradiente petróleo sob texto), `duotone` (monocromático petróleo — usado nos cases). 12 fotos de licença livre em `public/images/photos/` (créditos em `CREDITS.md` ao lado). São **interinas**: `docs/IMAGE-SOURCES.md` §3 tem o brief da sessão própria que as substitui. Slots que exigem foto própria (retrato Adna, equipe, clínica com pessoas) continuam placeholder por honestidade — stock não deve sugerir ser a equipe real.

## Página a página: decisões e pendências

### Home (`src/app/page.tsx`)
Arco de storytelling do PRD: hero (tese) → 3 problemas → 4 pilares → prova social → depoimentos → CTA final.
- **Prova social** (`NumberTicker`): números **`[VALIDAR]`** (850+, 100%, 35%) — vieram do PRD, precisam de confirmação da E-Soluções. Contam ao entrar na viewport.
- **Depoimentos** (marquee): mock anonimizado **`[VALIDAR]`** em `src/data/testimonials.ts` — substituir por reais autorizados.
- **CTA final**: slot de foto `home-especialista` (retrato Adna) ainda placeholder.

### Serviços (`src/components/sections/services/service-page.tsx` + `src/data/services/*.ts`)
Template único, 4 conteúdos tipados. Fluxo: hero → problema → solução (sticky scroll) → timeline de legislação → diferenciais → case → CTA.
- **Cases de cliente**: todos **`[VALIDAR]`** (anonimizados, números conservadores) — precisam de autorização/adaptação real.
- **Timeline de legislação**: datas de alta confiança; a entrada de riscos psicossociais na NR-1 está **`[VALIDAR]`** (portaria/cronograma).
- **Slots de foto**: `servico-<slug>-hero-1/-3` (leque) e `servico-<slug>-case`.

### Treinamentos (`src/app/treinamentos/page.tsx`)
Hero claro + tabela comparativa (filtros/sort/deep-link `?nr=`) + diagnóstico CIPA.
- **Catálogo** (`src/data/trainings.json`): 12 cursos **mock** atrás do contrato `TrainingProvider`. Preços e URLs de checkout são ilustrativos — trocar pelo catálogo real (idealmente via API do Host, sem refactor de componente).
- **Diagnóstico CIPA**: dimensionamento transcrito do Quadro I da NR-5 oficial (gov.br). O mapa **setor → grau de risco típico** é prudencial e está **`[VALIDAR]`** por CNAE (ver cabeçalho de `src/lib/cipa/cipa-data.ts`). Resultado é orientativo por design (disclaimer no painel).

### Blog (`src/app/blog/page.tsx` + `src/content/blog/*.mdx`)
Hero editorial + grade. 3 artigos completos + 9 stubs `draft: true` (fora de listagem/sitemap em produção).
- **Fatos normativos**: escritos só com alta confiança; detalhes incertos generalizados ("verifique a redação vigente"). Nenhuma estatística inventada.
- **Falta**: completar os 9 stubs; capas reais (opcionais — placeholder por domínio cobre); avatar de autor.

### Sobre (`src/app/sobre/page.tsx`)
Hero com leque de fotos → TextReveal (manifesto) → tese "um dado, três usos" → método (ScrollTimeline com beam que preenche) → bloco da especialista.
- **Falta**: retrato Adna (`sobre-especialista`), fotos do leque (`sobre-hero-1..3`), bio/cargo **`[VALIDAR]`** em `src/content/authors.yml`.

### Contato (`src/app/contato/page.tsx`)
Quiz de 3 perguntas → pré-preenche o formulário (RHF + Zod + server action). E-mail via `EmailProvider` (stub de console; Resend entra no deploy).
- **Falta**: dados de contato reais em `src/lib/site-config.ts` (telefone, endereço, WhatsApp, e-mail — todos **`[VALIDAR]`**); credencial do Resend.

### Legais (`politica-de-privacidade`, `termos-de-uso`)
Templates LGPD com marcadores **`[VALIDAR]`** visíveis (razão social, CNPJ, DPO, prazo de retenção, foro). **Exigem revisão jurídica antes do go-live.**

## Backlog de validação (resumo — busque `[VALIDAR]` no código)

1. Dados de contato/endereço/razão social/CNPJ (`site-config.ts`, páginas legais)
2. Números de prova social e todos os cases de cliente
3. Revisão jurídica das páginas legais
4. Mapa setor → grau de risco do diagnóstico CIPA (por CNAE)
5. Catálogo real de treinamentos (preços, URLs, idealmente API do Host)
6. Depoimentos reais autorizados
7. Bios/fotos (Adna, equipe) e todos os slots de `ASSETS.md`
8. Detalhe normativo dos riscos psicossociais na NR-1
9. GA4 property (`NEXT_PUBLIC_GA_ID`) e domínio final

## Opções de hero/layout para evoluir (inventário para decisão futura)

Alternativas pesquisadas e descartadas nesta rodada (mantidas aqui como cardápio; todas exigiriam re-skin para a paleta e passar nos gates):

- **Sticky scroll no hero**: painel fixo trocando por seção conforme o scroll — poderoso, mas já usamos sticky scroll na seção de soluções; repetir no hero cansaria.
- **Container 3D scroll** (card que rotaciona em rotateX com o scroll): só faz sentido se houver um portal/dashboard do cliente para mostrar. Sem produto SaaS próprio, fica sem função.
- **Text shimmer / kinetic type**: brilho varrendo um rótulo. Reservado para um selo pontual; hoje o acento é o laranja, não brilho.
- **Bento grid no hero**: destacaria o carro-chefe num bloco maior. Bom candidato para uma futura home v2, combina com a linguagem de grid da matriz.
- **Descartados por conflito de tom**: heros com WebGL/shader, partículas, glow neon, glassmorphism, timelines gamificadas/retrô — quebram o tom técnico B2B e o orçamento de performance.

Se o dono quiser trocar um hero atual por uma dessas opções, o caminho é: adaptar cores → confinar `motion` em `components/motion/` → validar reduced-motion → rodar os gates (build, Lighthouse, accesslint) antes de integrar.
