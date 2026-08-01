# IMAGE-SOURCES.md — Pesquisa de fontes de imagem

> Pesquisa feita em julho/2026 para substituir os placeholders listados em
> [`ASSETS.md`](../ASSETS.md). **Nenhuma imagem foi baixada nem adicionada ao
> projeto** — este documento é um guia de curadoria para o dono do site escolher,
> baixar, otimizar e trocar os placeholders (processo descrito no topo do
> ASSETS.md).
>
> Regra de ouro do site: **nada de stock genérico de "executivos apertando
> mãos"**. Preferir ambientes reais de trabalho, EPIs, canteiro, clínica,
> close de mãos/instrumentos e indústria brasileira quando possível.

---

## 1. Fontes e licenças (resumo verificado)

| Fonte | Licença | Uso comercial | Atribuição | Padrão de URL de busca | Verificação |
| ----- | ------- | ------------- | ---------- | ---------------------- | ----------- |
| **Unsplash** | [Unsplash License](https://unsplash.com/license) | Sim | Não exigida (apreciada) | `https://unsplash.com/s/photos/<termo-com-hifens>` | Padrão e licença verificados via fetch (07/2026) |
| **Pexels** | [Pexels License](https://www.pexels.com/license/) | Sim | Não exigida (apreciada) | `https://www.pexels.com/search/<termo%20codificado>/` | Padrão e licença verificados via fetch (07/2026) |
| **Pixabay** | [Content License](https://pixabay.com/service/license-summary/) | Sim | Não exigida | `https://pixabay.com/images/search/<termo>/` | Site bloqueia fetch automatizado (403) — padrão de URL é o oficial da galeria, confirmar no navegador. Licença confirmada por fontes secundárias |
| **Wikimedia Commons** | Varia **por arquivo** (CC BY, CC BY-SA, domínio público…) | Depende do arquivo | Geralmente **sim** (CC BY/BY-SA) | `https://commons.wikimedia.org/w/index.php?search=<termo>&title=Special:MediaSearch&type=image` | Padrão verificado via fetch (07/2026) |
| **Fotos Públicas** (fotospublicas.com) | Termos próprios (foco editorial, crédito ao fotógrafo) | **Confirmar caso a caso** | Sim (crédito) | Buscar pelo site (padrão de busca não verificável via fetch) | Site ativo em 07/2026; acervo BR de eventos públicos |
| **Agência Brasil / EBC** | Historicamente CC BY 3.0 BR, mas o rodapé atual exibe "Todos os direitos reservados" | **Não usar sem confirmar** na página do conteúdo | Sim ("Foto: Fulano/Agência Brasil") | — | Verificado via fetch (07/2026): sem indicação CC visível na home |

### Avisos que valem para todas as fontes

- **Pessoas identificáveis**: mesmo com licença livre, não usar a foto de forma
  que sugira que a pessoa é funcionária, cliente ou paciente da E-Soluções, nem
  em contexto depreciativo (proibição explícita na licença da Pexels e da
  Pixabay). Para a clínica, isso reforça: **foto própria com autorização de
  imagem** é o destino final; stock é tapa-buraco.
- **Unsplash+**: parte dos resultados da Unsplash é paga (selo "Unsplash+").
  Nas buscas verificadas abaixo, ~metade dos primeiros resultados era Unsplash+.
  Conferir o selo antes de baixar; os links específicos listados aqui indicam
  quando são gratuitos.
- **Wikimedia Commons**: a licença é de cada arquivo — abrir a página
  `File:...`, ler o quadro de licença e cumprir a atribuição (autor + licença +
  link). Ótima fonte para imagens **especificamente brasileiras** (CTPS,
  fiscalizações, indústria nacional) que as galerias internacionais não têm.
- **Marcas e logos em foto**: evitar fotos com logomarcas de terceiros visíveis
  (uniformes, fachadas) — risco de marca registrada independe da licença da foto.
- Nenhuma foto de banco pode ser revendida isolada nem usada como logo/marca.

---

## 2. Sugestões por slot

Convenções: dimensões/ratio vêm do `ASSETS.md`; os slots `*-hero-1..3` (fan de
3 cards **4/5**, ~480×600 por card em 1x) e `sobre-hero-1..3` são os novos slots
do redesign das heros. Links de foto específica só aparecem quando foram
verificados via fetch — caso contrário, apenas o link da busca (não inventar URL
de foto).

### 2.1 `/servicos/departamento-pessoal` — `servico-departamento-pessoal-case` (640×480, 4/3) e `servico-departamento-pessoal-hero-1..3` (4/5)

Direção de arte: mesa de trabalho real de DP — documentos, calculadora, CTPS,
telas de folha. Sem executivos posando.

| # | Termo de busca | Link da busca | Fotos específicas verificadas |
| - | -------------- | ------------- | ----------------------------- |
| 1 | `payroll` (en) | [Pexels](https://www.pexels.com/search/payroll/) | [Calculadora e caneta sobre gráfico](https://www.pexels.com/photo/calculator-and-pen-on-table-209224/) · [Flat lay: documentos fiscais, calculadora no celular, notas](https://www.pexels.com/photo/smartphone-and-documents-on-desk-8962519/) |
| 2 | `accounting documents` (en) | [Unsplash](https://unsplash.com/s/photos/accounting-documents) · [Pexels](https://www.pexels.com/search/accounting%20documents/) | — |
| 3 | `carteira de trabalho` (pt) — o documento brasileiro por excelência do DP | [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?search=carteira+de+trabalho&title=Special:MediaSearch&type=image) | [CTPS de 2003](https://commons.wikimedia.org/wiki/File:Carteira_de_trabalho_de_2003.jpg) · [Trabalhadores haitianos com CTPS brasileira](https://commons.wikimedia.org/wiki/File:Haitianos_com_carteira_de_trabalho_brasileira.jpg) — conferir licença/atribuição de cada arquivo |
| 4 | `folha de pagamento` (pt) | [Pexels](https://www.pexels.com/search/folha%20de%20pagamento/) · [Pixabay](https://pixabay.com/images/search/folha%20de%20pagamento/) | — |
| 5 | `desk paperwork calculator hands` (en) — close de mãos, sem rosto (bom para hero-fan) | [Unsplash](https://unsplash.com/s/photos/desk-paperwork-calculator) | — |

Composição sugerida do fan `hero-1..3`: (1) close de mãos + calculadora/papel,
(2) CTPS ou documento trabalhista em destaque, (3) tela/planilha de folha em
ângulo. Obs.: a busca `carteira de trabalho` na Pexels **não** retorna o
documento brasileiro (verificado) — para CTPS, usar Commons ou foto própria.

### 2.2 `/servicos/clinica-ocupacional` — `servico-clinica-ocupacional-case` (640×480, 4/3) e `servico-clinica-ocupacional-hero-1..3` (4/5)

**Prioridade absoluta: fotos da clínica real** (ver seção 3 — o ASSETS.md já
prevê sessão com mín. 20 fotos). Stock abaixo serve só como interino e para
capas de blog. Direção de arte: acolhedora e profissional, instrumentos em
close, nada de hospital frio.

| # | Termo de busca | Link da busca | Fotos específicas verificadas |
| - | -------------- | ------------- | ----------------------------- |
| 1 | `medical checkup` (en) | [Unsplash](https://unsplash.com/s/photos/medical-checkup) | [Aferição de pressão arterial](https://unsplash.com/photos/dcBO4nt4MRE) (grátis) · [Médico medindo pressão de paciente — foto CDC](https://unsplash.com/photos/XdErxxR6Xog) (grátis) |
| 2 | `occupational health` (en) | [Pexels](https://www.pexels.com/search/occupational%20health/) | [Profissional de branco com prancheta](https://www.pexels.com/photo/photo-of-person-holding-paper-and-pen-7088483/) · [Médica de luvas e máscara anotando](https://www.pexels.com/photo/crop-black-physician-writing-on-paper-document-at-work-6097759/) |
| 3 | `hearing test` / `audiometry` (en) — audiometria é serviço-chave | [Pexels](https://www.pexels.com/search/hearing%20test/) · [Unsplash](https://unsplash.com/s/photos/audiometry) | [Otoscopia em close, mãos com luvas](https://www.pexels.com/photo/hands-in-gloves-performing-ear-exam-on-patie-5206945/) |
| 4 | `stethoscope close up` (en) — close de instrumento, sem rosto (ideal para hero-fan) | [Unsplash](https://unsplash.com/s/photos/stethoscope-close-up) · [Pexels](https://www.pexels.com/search/stethoscope/) | [Profissional segurando estetoscópio](https://unsplash.com/photos/tE7_jvK-_YU) (grátis) |
| 5 | `exame ocupacional` / `consultório médico` (pt) | [Pexels](https://www.pexels.com/search/consult%C3%B3rio%20m%C3%A9dico/) · [Pixabay](https://pixabay.com/images/search/consult%C3%B3rio%20m%C3%A9dico/) | — |

Composição sugerida do fan `hero-1..3`: (1) close de instrumento (estetoscópio/
otoscópio/audiômetro), (2) atendimento de costas ou mãos (privacidade), (3)
recepção/ambiente da clínica — este último **só com foto própria**.

### 2.3 `/servicos/engenharia-sst` — `servico-engenharia-sst-case` (640×480, 4/3) e `servico-engenharia-sst-hero-1..3` (4/5)

Direção de arte: campo de verdade — EPI em uso, canteiro, inspeção, indústria.
É o tema com melhor oferta nas galerias gratuitas.

| # | Termo de busca | Link da busca | Fotos específicas verificadas |
| - | -------------- | ------------- | ----------------------------- |
| 1 | `construction safety helmet` (en) | [Unsplash](https://unsplash.com/s/photos/construction-safety-helmet) | [Capacetes amarelos em rack](https://unsplash.com/photos/wp81DxKUd1E) · [Trabalhador de colete e capacete branco](https://unsplash.com/photos/6203Ynp5ZqE) · [Fileira de capacetes amarelos](https://unsplash.com/photos/LutB1xxyArA) |
| 2 | `safety helmet` (en) | [Pexels](https://www.pexels.com/search/safety%20helmet/) | [Coleção de capacetes na parede](https://www.pexels.com/photo/collection-of-construction-safety-helmet-38070/) · [Trabalhadores de capacete amarelo em canteiro](https://www.pexels.com/photo/group-of-workers-in-yellow-hard-hats-at-construction-site-38043248/) |
| 3 | `factory worker` (en) — indústria, solda, EPI completo | [Unsplash](https://unsplash.com/s/photos/factory-worker) | [Soldador em ambiente industrial](https://unsplash.com/photos/Wiu3w-99tNg) (grátis) · [Trabalhador de capacete e EPI trabalhando metal](https://unsplash.com/photos/lKqGI7IyBCw) (grátis) |
| 4 | `personal protective equipment` (en) / `EPI segurança do trabalho` (pt) | [Pexels](https://www.pexels.com/search/personal%20protective%20equipment/) · [Pixabay](https://pixabay.com/images/search/epi%20seguran%C3%A7a/) | — |
| 5 | `segurança do trabalho` (pt) — resultados BR, inclusive fiscalizações | [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?search=seguran%C3%A7a+do+trabalho&title=Special:MediaSearch&type=image) · [Pexels](https://www.pexels.com/search/seguran%C3%A7a%20do%20trabalho/) | — |

Composição sugerida do fan `hero-1..3`: (1) EPI em still (capacetes em fileira —
gráfico e forte), (2) trabalhador em atividade real com EPI, (3) inspeção/campo
(prancheta + canteiro). Nota: para o **case** o ASSETS.md pede "equipe própria
em atividade real" — stock cobre o hero, o case idealmente vem da sessão própria.

### 2.4 `/servicos/complementares` — `servico-complementares-case` (640×480, 4/3) e `servico-complementares-hero-1..3` (4/5)

Direção de arte: perícia, laudo, medição — documento e instrumento técnico, não
pessoas posando.

| # | Termo de busca | Link da busca | Fotos específicas verificadas |
| - | -------------- | ------------- | ----------------------------- |
| 1 | `inspection checklist clipboard` (en) | [Unsplash](https://unsplash.com/s/photos/inspection-checklist) · [Pexels](https://www.pexels.com/search/inspection%20checklist/) | — |
| 2 | `engineer blueprint` (en) — mãos sobre projeto/planta | [Unsplash](https://unsplash.com/s/photos/engineer-blueprint) · [Pexels](https://www.pexels.com/search/engineer%20blueprint/) | — |
| 3 | `sound level meter` / `decibelímetro` — medição ambiental (laudos de ruído) | [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?search=sound+level+meter&title=Special:MediaSearch&type=image) · [Pixabay](https://pixabay.com/images/search/sound%20level%20meter/) | — |
| 4 | `technical document signing` / `assinatura de laudo` (en/pt) | [Pexels](https://www.pexels.com/search/technical%20document/) | — |
| 5 | `laboratory measurement instrument` (en) — closes técnicos | [Unsplash](https://unsplash.com/s/photos/measurement-instrument) | — |

Composição sugerida do fan `hero-1..3`: (1) instrumento de medição em close,
(2) prancheta/checklist em campo, (3) laudo/documento técnico com carimbo ou
assinatura (pode ser foto própria de um laudo real anonimizado — mais autêntico
que qualquer stock).

### 2.5 Blog — `blog-cover-<slug>` (1280×720, 16/9)

Capas são opcionais (placeholder por domínio já cobre). Quando quiser foto,
reutilizar os termos do domínio do artigo:

| Domínio do artigo | Termos recomendados | Buscas |
| ----------------- | ------------------- | ------ |
| eSocial / DP | `payroll`, `tax documents`, `carteira de trabalho` (Commons) | ver 2.1 |
| Saúde ocupacional / ASO / PCMSO | `medical checkup`, `hearing test`, `occupational health` | ver 2.2 |
| NRs / EPI / CIPA | `construction safety helmet`, `factory worker`, `segurança do trabalho` | ver 2.3 |
| Perícias / laudos / insalubridade | `inspection checklist`, `sound level meter` | ver 2.4 |

Dica: para capas 16/9, preferir fotos com área "respirável" (fundo desfocado ou
superfície contínua) que aceite o corte largo e eventual sobreposição de título.

### 2.6 Slots que NÃO devem usar stock (foto própria obrigatória)

| slotId | Motivo |
| ------ | ------ |
| `home-especialista` (480×640, 3/4) | Retrato real de Adna Correia — credibilidade é o ponto da seção |
| `sobre-especialista` (480×640, 3/4) | Mesma sessão do retrato principal |
| `autor-adna` (160×160, 1/1) | Recorte quadrado do retrato principal |
| `autor-equipe` (160×160, 1/1) | Foto da equipe real ou monograma da marca (nunca stock de "equipe") |
| `sobre-hero-1..3` (fan 4/5) | Fotos de equipe e clínica reais — página /sobre é sobre a empresa de verdade |
| `servico-clinica-ocupacional-case` | ASSETS.md exige "com autorização de imagem" — clínica real |
| `servico-engenharia-sst-case` | ASSETS.md exige "equipe própria em atividade real" |

Especificação completa da sessão na seção 3.

---

## 3. Sessão de fotos própria (obrigatória)

O ASSETS.md já prevê retrato de Adna + mín. 20 fotos da clínica. Especificação
expandida para brief do fotógrafo (uma diária resolve tudo):

### 3.1 Retrato da especialista (Adna Correia)

- **Nº de fotos**: 8–12 aproveitáveis (de ~60 cliques), para cobrir 4 usos:
  `home-especialista`, `sobre-especialista`, `autor-adna` e reserva para imprensa/OG.
- **Enquadramentos**: busto (3/4 vertical, olhar à câmera — uso principal);
  meio corpo com leve ângulo (variação para /sobre); um plano mais fechado que
  sobreviva ao recorte quadrado 160×160 (rosto centralizado, margem acima da
  cabeça).
- **Luz**: lateral suave (janela ou softbox a ~45°), sem flash direto, sombras
  abertas. Coerente com o tom "sério, técnico" — nada de high-key estourado.
- **Fundo**: neutro claro (cinza-quente ou off-white), liso ou levemente
  texturizado; distância do fundo para leve desfoque. Evitar branco puro
  (briga com o `paper #f6f8f9` do site) e evitar fundo azul (conflita com o
  duotone petróleo do tratamento).
- **Figurino**: roupa lisa, tons neutros ou petróleo escuro; evitar estampas
  finas (moiré) e laranja (reservado a acentos da UI).

### 3.2 Clínica (mín. 20 fotos — cobre `servico-clinica-ocupacional-*`, `sobre-hero-*` e home)

Shot list mínima:

1. **Recepção** (3–4 fotos): ambiente amplo horizontal 4/3 + vertical 4/5 para o
   fan; com e sem pessoas.
2. **Salas de atendimento** (4–5): consultório em uso simulado — médico(a) de
   costas ou de perfil + paciente figurante com termo assinado.
3. **Exames em close** (5–6): audiometria (fones/cabine), aferição de pressão,
   otoscopia, coleta — priorizar **mãos e instrumentos**, sem rosto (dispensa
   autorização de paciente e envelhece menos).
4. **Equipe** (4–5): retratos individuais no mesmo padrão do retrato da Adna +
   1 foto de grupo natural (em atividade, não pose de formatura) para
   `autor-equipe` e `sobre-hero-*`.
5. **Fachada/detalhes** (2–3): fachada com identificação, detalhes de marca.

- **Orientações**: fotografar cada cena em horizontal (4/3) **e** vertical
  (4/5) — os slots de case são 4/3 e os fans de hero são 4/5; corte posterior
  perde composição.
- **Luz**: natural + rebatedor; balanço de branco neutro (a temperatura será
  unificada no tratamento, seção 4).
- **Autorização**: termo de uso de imagem assinado por toda pessoa
  identificável (funcionários e figurantes) citando uso em site, redes e
  material comercial. Sem termo, só fotos sem rosto.

### 3.3 Campo / engenharia SST (cobre `servico-engenharia-sst-case` e reforça o hero)

- 6–10 fotos de técnico(s) próprios em inspeção real ou simulada: EPI completo
  em uso, prancheta/tablet, medição com instrumento, canteiro ou planta
  industrial de cliente parceiro (**com autorização por escrito do cliente**
  para fotografar e publicar).
- Se não houver campo disponível na diária, still de EPIs da empresa (capacete,
  luvas, protetor auricular sobre superfície neutra) resolve o fan do hero com
  autenticidade.

---

## 4. Tratamento visual (coerência com o design system)

Tokens de referência (de `src/lib/design/tokens.contrast.test.ts`): petróleo
`#00465e` (700) / `#061e28` (950) / `#1d7594` (500), laranja `#ff8c42` (400) /
`#d95d0a` (600), papel `#f6f8f9`, tinta `#16242c`.

Fotos de origens diferentes (Unsplash + Pexels + sessão própria) **vão** destoar
sem um tratamento único. Recomendações, na ordem de menor para maior intervenção:

1. **Grade base (todas as fotos)**: dessaturar levemente (−10 a −20 de
   saturação), baixar contraste de altas luzes, unificar temperatura para
   neutro-frio. Mata o "cheiro de stock" (cores saturadas demais) sem esconder
   a foto.
2. **Overlay petróleo para fotos sob texto/hero**: gradiente
   `#061e28 → transparente` (opacidade 55–75% na base) sobre a foto, garantindo
   contraste AA do texto claro. Usar sempre a mesma direção de gradiente
   (ex.: de baixo para cima) em todos os heros.
3. **Duotone petróleo para fotos "decorativas"** (fans de hero, capas de blog
   sem foto forte): mapear sombras → `#061e28` e luzes → `#f6f8f9` (ou
   `#aed4e3` para um resultado mais azulado). Implementável em CSS
   (`filter: grayscale(1)` + `mix-blend-mode` sobre camada petróleo) ou no
   Photoshop/Figma. Duotone deixa qualquer mistura de fontes homogênea — é a
   arma mais eficaz deste documento.
4. **Laranja só como acento gráfico, nunca como grade**: não tingir fotos de
   laranja; o laranja entra em bordas, tags e detalhes de UI sobre a foto
   (ex.: filete `#ff8c42` na base do card do fan).
5. **Corte**: respeitar o ratio do slot desde a escolha da foto (não forçar
   4/5 em foto horizontal apertada). Nos fans de 3 cards, alternar escala dos
   sujeitos (still em close / pessoa em plano médio / ambiente) para ritmo
   visual, mantendo o mesmo tratamento nos três.
6. **Consistência de conjunto**: dentro de uma mesma página, ou todas as fotos
   em duotone, ou todas em grade natural + overlay — não misturar os dois
   regimes lado a lado.
7. **Técnico** (reforço do ASSETS.md): exportar webp/avif em 1x e 2x das
   dimensões do slot, `alt` descritivo em pt-BR obrigatório, e manter o
   `ImageSlot` para zero CLS.
