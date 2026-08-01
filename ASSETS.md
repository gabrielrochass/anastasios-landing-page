# ASSETS.md, slots de imagem aguardando assets reais

Todo lugar do site que espera foto real usa o componente
[`ImageSlot`](src/components/illustrations/image-slot.tsx) com um `slotId`
desta tabela. O slot reserva a proporção, então a troca por foto real acontece
sem nenhum layout shift.

**Como trocar um placeholder por foto real:**

1. Corte na proporção do slot **antes** de qualquer coisa. Nunca deixe
   `object-cover` decidir o enquadramento.
2. Gere AVIF e WebP em 1x e 2x das dimensões da tabela, com `sharp`.
3. Coloque em `public/images/photos/`.
4. Registre em `src/lib/photos.ts` com `src`, `alt` em pt-BR e `credit`.
5. Documente em [docs/IMAGE-SOURCES.md](docs/IMAGE-SOURCES.md): URL de origem,
   autor, licença, data de download, e se é livre ou Unsplash+.

## Slots

| slotId | Onde | Dimensões (1x) | Proporção | Conteúdo esperado | Direção de arte |
| --- | --- | --- | --- | --- | --- |
| `anastasios-retrato` | Home, seção "Quem somos" | 480×600 | 4/5 | Retrato profissional de Anastasios | Fundo neutro escuro, luz lateral, olhar à câmera, enquadramento busto. É a foto mais importante do site |
| `blog-cover-<slug>` | Cards e capas do Painel de Inteligência | 1280×720 | 16/9 | Capa por artigo, opcional | Porto, contêiner ou operação. Tratamento duotone para uniformizar |

## Assets pendentes fora de slots

| Asset | Onde entra | Status |
| --- | --- | --- |
| Logo oficial em SVG | Header e rodapé | Hoje é wordmark tipográfico em Instrument Serif. Aguardando definição de marca |
| Retrato de Anastasios em alta resolução | Seção "Quem somos" | Aguardando. Bloqueia a maior lacuna do mercado: só 3 de 12 concorrentes mostram rosto |
| Fotos de operação real | Seções de travessia e cases | Aguardando. Foto própria de inspeção, contêiner ou porto vale mais que dez aéreas genéricas |
| OG image de marca 1200×630 | `src/app/opengraph-image.png` | Pendente. O template dos posts já existe e usa o motivo da rota |
| Favicon e ícone | `src/app/favicon.ico`, `src/app/icon.png` | Ainda são os do projeto anterior. Trocar |

## Duas regras duras deste projeto

**1. Unsplash+ é licença paga.** Metade dos resultados de logística no Unsplash
carrega o selo Unsplash+, que é conteúdo licenciado da Getty e não pode ser
usado sob a licença gratuita. Confira o selo na página da foto antes de baixar,
e anote em IMAGE-SOURCES.md qual das duas é.

**2. Nada de livery legível de armador.** As melhores fotos de contêiner
mostram cascos MAERSK, MSC, CMA CGM ou Evergreen. Licença de foto não é licença
de marca, e num site de consultoria um casco desses no herói sugere uma
parceria comercial que não existe. Prefira aéreas, vistas de topo e pilhas onde
a marca fique ilegível, ou trate a imagem para apagá-la.

**3. Ninguém de banco de imagem posa de cliente ou de equipe.** O slot do
retrato fica vazio até a foto real chegar. A página inteira argumenta que
existe gente responsável atrás da operação, e ilustrar isso com um desconhecido
de stock derruba o argumento junto.
