# ASSETS.md — Slots de imagem aguardando assets reais

Todo lugar do site que espera foto/vídeo real usa o componente
[`ImageSlot`](src/components/illustrations/image-slot.tsx) com um `slotId`
desta tabela. O slot reserva o aspect-ratio (zero CLS) e mostra um
placeholder projetado (ilustração SVG da marca) até o asset chegar.

**Como trocar um placeholder por foto real:**

1. Otimize a imagem (webp/avif, 1x e 2x das dimensões da tabela).
2. Coloque em `public/images/<área>/`.
3. No componente que usa o `ImageSlot`, substitua o child (ilustração) por
   `<Image src=... alt=... fill className="object-cover" />` — as dimensões
   do slot não mudam.
4. Escreva `alt` descritivo (pt-BR) — obrigatório.

> **Stock interino aplicado (jul/2026):** os slots de *case* dos 4 serviços já
> usam fotos de stock tratadas em duotone (`src/lib/photos.ts`, arquivos em
> `public/images/photos/`, componente [`Photo`](src/components/photo/photo.tsx)).
> São tapa-buraco de licença livre — substituir pela sessão própria quando
> houver. Slots de pessoas reais (retrato Adna, equipe, `sobre-hero`, cases com
> paciente/equipe identificável) **seguem placeholder** por exigirem foto própria.

| slotId | Página / seção | Dimensões (1x) | Ratio | Conteúdo esperado | Direção de arte |
| ------ | -------------- | -------------- | ----- | ----------------- | --------------- |
| `home-especialista` | Home / CTA final | 480×640 | 3/4 | Retrato de Adna Correia | Fundo neutro claro, luz lateral suave, olhar à câmera, enquadramento busto |
| `sobre-especialista` | /sobre / seção "Quem responde" | 480×640 | 3/4 | Retrato de Adna Correia (pode ser a mesma foto do slot da home ou variação) | Mesma sessão do retrato principal |
| `servico-departamento-pessoal-case` | /servicos/departamento-pessoal / case | 640×480 | 4/3 | Foto de operação de DP ou infográfico do case | Ambiente de trabalho real, sem stock genérico |
| `servico-clinica-ocupacional-case` | /servicos/clinica-ocupacional / case | 640×480 | 4/3 | Foto da clínica (recepção/atendimento) | Acolhedora e profissional; com autorização de imagem |
| `servico-engenharia-sst-case` | /servicos/engenharia-sst / case | 640×480 | 4/3 | Foto de campo (EPI, inspeção) | Equipe própria em atividade real |
| `servico-complementares-case` | /servicos/complementares / case | 640×480 | 4/3 | Foto de perícia/laudo ou infográfico | Documento/atividade técnica |
| `autor-adna` | Blog / bio de autor | 160×160 | 1/1 | Avatar de Adna Correia | Recorte quadrado do retrato principal |
| `autor-equipe` | Blog / bio de autor | 160×160 | 1/1 | Marca/foto da equipe | Pode ser monograma da marca |
| `blog-cover-<slug>` | Cards e capas do blog | 1280×720 | 16/9 | Capa por artigo (opcional — placeholder por domínio já cobre) | Infográfico ou foto temática; adicionar via frontmatter `cover` |
| `servico-<slug>-hero-1` e `-3` | Hero de cada serviço (leque de cards, posições laterais) | 480×600 | 4/5 | 2 fotos verticais do domínio do serviço (ver IMAGE-SOURCES.md) | Retrato/ambiente real; card central do leque é o ícone, não é foto |
| `sobre-hero-1..3` | Hero do /sobre (leque de 3 cards) | 480×600 | 4/5 | Equipe, clínica e ambiente de trabalho | Fotos próprias da E-Soluções, coerentes entre si |

## Assets pendentes fora de slots

| Asset | Onde entra | Status |
| ----- | ---------- | ------ |
| Logo oficial (SVG) | Header/footer (hoje: wordmark tipográfico + células de matriz) | Aguardando brand guidelines |
| Foto Adna Correia (retrato) | Home CTA final, blog author bio, /sobre | Aguardando foto high-res |
| Fotos clínica (mín. 20) | /servicos/clinica-ocupacional, home | Aguardando sessão |
| Vídeo clínica 30–60s | Hero /servicos/clinica-ocupacional (fase futura) | Aguardando produção |
| OG image de marca 1200×630 | `src/app/opengraph-image.png` | Placeholder gerado entra na F8 |
