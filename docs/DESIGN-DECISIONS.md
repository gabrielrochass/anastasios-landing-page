# Decisões de design, H H Brasil

Documento vivo. Registra o porquê, não o quê. Se uma decisão aqui for
revertida, reescreva a entrada em vez de apagar: saber o que foi tentado e
descartado vale tanto quanto saber o que ficou.

Complementa [ASSETS.md](../ASSETS.md), [IMAGE-SOURCES.md](./IMAGE-SOURCES.md) e
[README.md](../README.md).

## Contexto

Landing de página única mais Painel de Inteligência, para a H H Brasil Ltda.,
consultoria de sourcing e gestão de risco em comércio exterior. Público
comprador: importador brasileiro, decisor B2B, muitas vezes em Android
corporativo.

O repositório nasceu de um fork do site da E-Soluções. A infraestrutura foi
reaproveitada e todo o visual e conteúdo foram refeitos.

## O que mudou em relação ao projeto anterior

O doc anterior rejeitava explicitamente WebGL, GSAP e Lenis. Duas dessas
rejeições continuam de pé, uma foi revista.

**WebGL entrou, three.js não.** A pesquisa de referências mostrou que nenhum
site premiado do setor faz "embarcação percorrendo a rota conforme o scroll",
ou seja, a ideia está desocupada. Mas ela não precisa de grafo de cena: o navio
é SVG com `getPointAtLength` e o mar é um único quad em WebGL2 escrito à mão.
React Three Fiber custaria de 200 a 250 kb gz, um rAF permanente e um peer pin
`react >=19 <19.3` que trava o build num bump de versão, tudo para o mesmo
efeito.

**GSAP e Lenis seguem fora.** O Lenis quebra `animation-timeline` nativo e
`scroll-snap`, trava em 60 fps no Safari e altera o comportamento de PageDown e
Tab, o que é risco direto em WCAG 2.2 SC 2.4.11. Como parte do motion depende
de scroll-timeline nativo, adotá-lo significaria abrir mão do compositor.

## Direção de arte

**Dois modos, não um tema com dark mode.** Modo `ocean` nas seções de travessia
e modo `doc` nas seções densas de leitura. São 14 seções: tudo escuro cansa a
leitura técnica longa, tudo claro desperdiça o mar. A troca é o respiro do
ritmo da página.

Implementação: `[data-mode]` remapeia a camada semântica em `globals.css`, e os
componentes consomem só `bg-surface text-content border-rule`. Nenhum
componente sabe que existem dois modos. O header declara `data-mode="ocean"`
enquanto está sobre o herói, então o anel de foco troca de cor sozinho quando o
Tab atravessa a página.

**Nada de azul de logística.** Dois dos três sites premiados do setor usam o
mesmo `#2779A7`. O acento é cobre, cor de contêiner, não de brochura de
armador.

**O mono carrega o argumento.** Código de porto, Incoterm, tipo de equipamento
e nome de documento em monoespaçada nas margens leem como competência
operacional. É o detalhe mais barato do projeto e o que mais separa a página de
um template.

**Uma família de texto, não duas.** Archivo em tudo que é prosa, IBM Plex Mono
em tudo que é dado.

Esta entrada substitui a anterior, que prescrevia Inter no corpo, Instrument
Serif no display e Geist Mono no dado, e a razão da troca não é técnica, é de
conotação. Nenhuma das três era ruim isoladamente. Somadas, elas são o uniforme
exato das landing pages de inteligência artificial de 2023 em diante: Inter é o
padrão de todo produto SaaS desde 2019, Instrument Serif virou a serifada de
display daquela cena, e Geist Mono é a fonte da Vercel. O cliente reconheceu
isso antes de nós, e estava certo.

Vale registrar o erro de método junto: o estudo de fonte que precedeu a troca
mediu altura de x, contraste de traço e folga de acento, concluiu que a
Instrument Serif servia, e não estava errado em nenhum número. Mediu a pergunta
errada. Legibilidade não enxerga conotação.

**Sem serifada de display, a hierarquia migra para a escala.** Era a serifada
que separava título de corpo. Sem ela, o salto passa a ser de peso e de
tracking: display e h2 em 600 contra corpo em 400 e lead em 300, com tracking
de -0.032 em no display contra -0.011 em no corpo. Grotesco em tamanho grande
abre visualmente, então os valores herdados da serifada não servem. A classe
`font-serif` foi removida dos 32 usos: numa família só ela seria mentira e
também redundante, porque quem distingue os níveis é o token de escala.

O risco assumido é achatamento. Se a página ficar plana, o conserto é aumentar
o salto de tamanho e de espaço, nunca reintroduzir uma segunda família.

**Correção aplicada logo depois: a escala inteira desceu um degrau.** O primeiro
corte manteve os tamanhos herdados da serifada, e o resultado ficou grande
demais. O motivo é que o tamanho em pixel não mudou, o PESO mudou: display era
400 e passou a 600, então a mesma medida carrega muito mais tinta e lê bem
maior. Foi erro de tradução entre as duas famílias, não de gosto.

Display de 4rem para 3rem, h2 de 2,5 para 2rem, stat de 4 para 2,5rem. E o lead
passou de peso 300 para 400 com tamanho menor: Archivo Light é bem mais fina que
Inter Light, e um parágrafo de abertura inteiro nela fica cinza e cansa. No lead
a legibilidade ganha da elegância, porque ele é o segundo texto mais lido.

**Faixa de números: número e um rótulo de uma linha, nada mais.** A versão
anterior tinha quatro camadas por cartão, incluindo a fonte de cada número em
monoespaçada, o que dava dezesseis linhas numa faixa cuja função é ser lida de
relance. Faixa que precisa ser lida falhou.

A fonte saiu da tela contra o argumento que eu mesmo tinha usado para defender a
seção. A regra "sem fonte não vai para a página" continua certa; o problema é o
dado: duas das quatro fontes são "Palavra do cliente", que não é fonte, é a
admissão de que não existe uma. Impressa embaixo do número ela enfraquece o que
deveria sustentar. O campo continua em `offer.ts` e volta quando o cliente
entregar número verificável.

## Regras duras de cor

Travadas em `src/lib/design/tokens.contrast.test.ts`, com asserções negativas
que codificam as proibições.

- `copper` nunca como texto sobre papel. Reprova em 2,84:1. No modo doc o
  acento de texto é `oxide`.
- `oxide` nunca como texto sobre oceano. Reprova em 2,72:1. Os dois acentos são
  um par por modo, não intercambiáveis.
- Botão de acento leva texto `ocean-950`. `foam` sobre `copper` reprova em
  2,77:1.
- `content-muted` do modo ocean vale sobre `ocean-950` e `ocean-900`, não sobre
  `sea-700`. `sea-700` é tinta de duotone de foto, não superfície de texto.
- `rule` fica abaixo de 3:1 de propósito: é fio decorativo. Borda de input,
  limite interativo e anel de foco usam `rule-strong` ou `focus`.

## Regras de escrita

Travadas em `src/lib/design/copy.test.ts`, que falha o build apontando arquivo,
linha e coluna.

Proibidos: travessão, midpoint como separador de dados, e meia-risca em faixa
numérica. São as três marcas tipográficas que fazem um texto parecer gerado por
IA. Faixa se escreve "de 90 a 120 dias", como o próprio cliente escreveu.

Separação de dados vira **estrutura visual**: spans em flex com `gap` e borda
de 1px, células de tabela, ou linhas separadas. Isso empurra na mesma direção
da direção de arte, porque a borda de 1px como separador é a gramática de
documentação técnica que o site usa.

Obrigatórios: número sempre com ano e fonte, número não-redondo quando for
real, vocabulário operacional específico, e tabular numerals em todo dado.

O teste tem uma segunda asserção que falha se a varredura ficar vazia. Sem ela,
apagar `src/content` faria o portão passar por vazio.

## Motion

**A animação tem que significar alguma coisa.** O navio não navega num mar
decorativo: ele percorre a rota da própria operação, e cada waypoint é uma
etapa real do serviço. Três consequências práticas. Sobrevive a auditoria de
acessibilidade porque é indicador de progresso. Não conta como animação
automática sob WCAG 2.2 SC 2.2.2 porque é dirigida pelo scroll do usuário. E o
fallback acessível sai de graça, porque é a mesma lista ordenada.

**Três camadas, nunca duas na mesma propriedade do mesmo elemento.**

| Elemento | Camada |
| --- | --- |
| Posição e rotação do navio | `useScroll` com `getPointAtLength` |
| Uniform de scroll do shader | `scrollYProgress.on("change")` |
| Desenho das rotas do mapa | CSS `animation-timeline: view()` |
| Reveals de bloco | `whileInView` |
| Contadores | `useInView`, uma vez |

**Custo por frame do navio:** três leituras de `getPointAtLength` e uma escrita
de `transform`. Nada de `setState`, que renderizaria o React 60 vezes por
segundo.

**`offset-path` do CSS foi descartado** apesar de resolver posição e tangente
de graça: as coordenadas de `path()` são pixels CSS e não unidades do viewBox,
então a rota quebraria em layout responsivo.

**Contrato de movimento reduzido, em quatro camadas:** media query global,
`MotionConfig reducedMotion="user"`, `useReducedMotion()` com estado final
estático, e um botão no rodapé. O botão existe porque nem todo mundo sabe que a
preferência existe no sistema, e porque SC 2.2.2 pede um mecanismo na própria
página. Um script inline no `<head>` aplica a preferência antes do primeiro
paint, senão quem precisa de movimento reduzido veria alguns frames animados
justamente antes de a página se comportar.

O botão nunca liga o movimento de volta contra a preferência do sistema. Se o
sistema pede reduzido, ele fica travado e o rótulo explica o motivo.

## Responsividade

**Nenhuma peça é desktop-only.** Cada elemento de motion tem geometria mobile
própria, não versão empobrecida. A única coisa que remove movimento é
`prefers-reduced-motion` ou o botão, nunca o tamanho da tela.

Isso descarta explicitamente o padrão do projeto anterior, onde a cena
principal tinha um ramo desktop fixado e um ramo mobile que só empilhava cards.

- **Navio:** horizontal no desktop, serpentina vertical no mobile. O path da
  serpentina é gerado a partir da altura medida, então o viewBox casa com a
  caixa em pixels e o casco não distorce.
- **Oceano:** mesmo shader, orçamento diferente. Mobile trava `dpr` em 1, roda
  a 40% de resolução interna e limita a 30 fps. Mar é lento, 30 fps é
  invisível, e corta consumo e aquecimento pela metade.
- **Mapa:** uma projeção só. Cheguei a gerar duas, paisagem e retrato, mas a
  rota vai de Xangai a Santos e atravessa quase toda a largura, então recorte
  retrato corta as origens. Duas projeções ainda custavam 58 kb de landmass
  duplicado.
- **Comparadores:** tabela no desktop, `<dl>` empilhada no mobile, mesma fonte
  de dados. Nada de tabela com rolagem horizontal escondida.

Chaveamento por `useViewportGeometry()`, com snapshot de servidor em `compact`,
então o telefone nunca renderiza a geometria larga para descartar em seguida.
Uma quebra só, em 768px.

## Decisões de conteúdo

**O palco não hospeda documento.** Regra que saiu de um erro. Crédito e cadeia
chegaram a morar dentro de um `<details>` numa batida da jornada, cujo palco é
`sticky h-svh overflow-hidden`. O estado expandido não tinha para onde ir e o
único scroll disponível era o da jornada, que é o mesmo que apaga a batida.
Medido a 375 por 844: a caixa útil é 409px e o estado fechado já usava 385px.
Conteúdo que cresce vive em fluxo normal. A batida faz uma afirmação e aponta.

**Nenhum título usa "Frase. Virada." mais de uma vez.** O padrão de duas
sentenças curtas separadas por ponto é o movimento mais reproduzível do método
Apple, e reproduzível é exatamente o problema: 5 dos 13 títulos o usavam e 4
abriam com negação, o que somado lê como texto gerado. Catorze títulos, catorze
construções diferentes. O modelo é a melhor linha do site, que nunca seguiu o
padrão: "A carga embarca, você nacionaliza, e o pagamento vence depois." Três
tempos numa sentença só.

**Seis degraus de tamanho, e nada fora deles.** A escala tinha 14 tamanhos
distintos na tela e a maior parte não vinha de token: `text-sm` aparecia 46
vezes carregando o corpo do texto enquanto `--text-body` quase não era usado,
ou seja existiam dois corpos de texto diferentes. Havia ainda 17 usos de
`text-[10px]` e `text-[11px]` reimplementando à mão o eyebrow que já existia
como utility.

Diferença pequena entre degraus é o pior dos mundos: não lê como hierarquia, lê
como descuido. A rampa é 11, 13, 16, 18 a 20, 24 a 30, 30 a 42. O h3 tem o
tamanho do corpo e se distingue só pelo peso, porque dois pixels não constroem
hierarquia nenhuma e ainda somam um degrau.

**A utility de eyebrow não pode se chamar `text-eyebrow`.** Duas armadilhas, e
caí nas duas na mesma sessão. Declarar `--text-eyebrow` em `@theme` faz o
Tailwind 4 gerar uma utility de tamanho com o mesmo nome, e passa a haver dois
donos. Manter o prefixo `text-` sem token faz o tailwind-merge, que o `cn()`
usa, classificar a classe como COR e descartá-la sempre que ela vier junto de
`text-content-muted` ou `text-accent`. O menu principal perdeu monoespaçada e
caixa alta exatamente assim, em silêncio, sem erro nenhum. O nome é `eyebrow`,
sem prefixo, e o tamanho fica literal dentro do `@utility`.

**A barra de progresso é cromo, não acento.** Era `bg-accent` em segmentos de
2px, e o acento é a cor mais alta do sistema, reservada para o que pede ação.
Numa peça que fica na tela durante os 910svh inteiros da jornada, ela competia
com a headline e com o botão. Agora é fio de 1px em tinta, com três valores da
mesma cor: vencido a 45%, o da vez cheio, o que falta no fio.

**O crédito vai cedo na página.** O prazo de 90 a 120 dias contados do B/L nas
modalidades OA e DA é o único argumento que nenhum dos 12 concorrentes
auditados oferece. Enterrá-lo no fim seria desperdiçar a única vantagem difícil
de copiar.

**A seção "onde atuamos na cadeia" existe por dois motivos.** Nenhum
concorrente explica onde se encaixa, e ela protege juridicamente: deixa
explícito que a H H Brasil não é despachante credenciado e não registra DUIMP
em nome próprio.

**O FAQ encara as perguntas desconfortáveis.** "Vocês recebem comissão do
fornecedor também" é a pergunta mais importante do setor e a que ninguém
responde. FAQ que só responde pergunta fácil não convence.

**A ressalva do OEA fica.** Dizer que operar sempre via trading trabalha contra
a certificação OEA de Conformidade custa uma venda de vez em quando e compra a
credibilidade de quem explica o que não convém.

**Contato só por WhatsApp, com quiz antes.** Formulário filtra lead e WhatsApp
não, e cinco dos concorrentes brasileiros recebem tudo que aparece. Quatro
perguntas montam a mensagem, então a conversa começa com contexto. Efeito
colateral bom: nenhum dado pessoal trafega ou é armazenado pelo site.

## Fotografia

Registro em `src/lib/photos.ts` está vazio nesta fase. Enquanto estiver, os
componentes caem no `ImageSlot`, que reserva a proporção e garante que a troca
por foto real não gere CLS.

Duas regras específicas deste domínio:

1. Metade dos resultados de logística no Unsplash é Unsplash+, licença paga da
   Getty. Conferir o selo antes de baixar.
2. Casco com livery legível de armador não entra. Licença de foto não é licença
   de marca, e um MAERSK gigante no herói de uma consultoria sugere uma
   parceria que não existe.

O slot do retrato fica reservado até a foto real chegar. Retrato de banco de
imagem ali seria mentira: a página inteira argumenta que existe gente
responsável atrás da operação.

## Orçamento de qualidade

Inegociável, verificado antes de cada merge:

- Lighthouse 100, CLS 0
- WCAG 2.2 sem violações
- Paridade de experiência entre desktop e mobile
- Nenhuma seção entra sem ter sido percorrida a 375px em aparelho real
- `content-visibility: auto` sempre acompanhado de `contain-intrinsic-size`
- Só `transform`, `opacity` e `filter` animam
