/**
 * Conteúdo das seções de oferta.
 *
 * Tudo aqui saiu do questionário do cliente ou da pesquisa de setor. Nada foi
 * inventado para preencher espaço, e onde falta informação dele o campo está
 * marcado, não chutado.
 */

/* ------------------------------------------------------------------ */
/* Barra de prova                                                      */
/* ------------------------------------------------------------------ */

export interface ProofPoint {
  value: number | null;
  prefix?: string;
  suffix?: string;
  /** Uma linha. Duas linhas por número transformam a barra num parágrafo. */
  label: string;
  /**
   * NÃO renderizado hoje, e isso é decisão, não esquecimento.
   *
   * A regra "sem fonte não vai para a página" continua certa. O problema é o
   * dado: duas das quatro fontes aqui são "Palavra do cliente", que não é
   * fonte, é a admissão de que não existe uma. Impressa embaixo do número ela
   * enfraquece exatamente o que deveria sustentar, e custava uma linha por
   * cartão numa faixa que precisa ser lida de relance.
   *
   * O campo fica como registro de procedência e volta para a tela quando o
   * cliente entregar número verificável, que já é bloqueio aberto em
   * docs/PENDENCIAS-CLIENTE.md.
   */
  source: string;
}

export const proofPoints: ProofPoint[] = [
  {
    value: 23,
    suffix: " anos",
    label: "de comércio na família",
    source: "Palavra do cliente",
  },
  {
    value: 22,
    suffix: " anos",
    label: "no comércio exterior",
    source: "Palavra do cliente",
  },
  {
    value: 120,
    prefix: "até ",
    suffix: " dias",
    label: "de prazo, contados do embarque",
    source: "Modalidades OA e DA",
  },
  {
    value: 3,
    label: "regiões de origem homologadas",
    source: "Escopo de atuação",
  },
];

/* ------------------------------------------------------------------ */
/* O problema                                                          */
/* ------------------------------------------------------------------ */

export interface ProblemScenario {
  code: string;
  title: string;
  body: string;
}

export const problemScenarios: ProblemScenario[] = [
  {
    code: "canal cinza",
    title: "A carga chega e não sai",
    body: "Parametrização em canal vermelho ou cinza trava o desembaraço, e cada dia parado além do free time vira demurrage. O custo não é a multa, é a cascata: armazenagem, remarcação de entrega e cliente final esperando.",
  },
  {
    code: "avaria",
    title: "O contêiner abre e o lote não é o lote",
    body: "Amostra aprovada e produção seriada são coisas diferentes. Sem inspeção pré-embarque com laudo, a diferença só aparece no destino, quando já não existe alavanca nenhuma de negociação com o fornecedor.",
  },
  {
    code: "documento",
    title: "Falta uma via, e ninguém avisou",
    body: "Certificado de origem errado, NCM mal classificada, original que foi para o banco errado. São erros de papel que custam semanas de porto e, em classificação fiscal, podem custar multa e perdimento.",
  },
];

/* ------------------------------------------------------------------ */
/* Onde atuamos na cadeia                                              */
/* ------------------------------------------------------------------ */

export interface ChainNode {
  id: string;
  label: string;
  detail: string;
  /** Marca a camada onde a H H Brasil de fato atua */
  isUs?: boolean;
}

/**
 * O diagrama que diferencia de 12 dos 12 concorrentes auditados: nenhum
 * explica onde se encaixa na cadeia. Também protege juridicamente, porque
 * deixa explícito o que a H H Brasil não faz.
 */
export const supplyChain: ChainNode[] = [
  {
    id: "fornecedor",
    label: "Fornecedor",
    detail: "Fábrica na China, na Índia ou no Leste Europeu",
  },
  {
    id: "hh",
    label: "H H Brasil",
    detail:
      "Homologa o fornecedor, negocia, estrutura o pagamento e o regime, acompanha a produção e responde quando algo trava",
    isUs: true,
  },
  {
    id: "trading",
    label: "Trading ou importadora",
    detail: "Detém o título da mercadoria, tem RADAR e registra a DUIMP",
  },
  {
    id: "operadores",
    label: "Agente de carga, comissária e despachante",
    detail: "Contratam o frete e executam o despacho aduaneiro",
  },
  {
    id: "importador",
    label: "Importador",
    detail: "Recebe a carga nacionalizada",
  },
];

export const chainDisclaimer =
  "Não somos despachante aduaneiro credenciado e não registramos DUIMP em nome próprio. Quem executa o despacho é o despachante, e é com ele que coordenamos. O nosso trabalho começa antes, na escolha do fornecedor e na estruturação da operação, e não termina até a carga chegar.";

/* ------------------------------------------------------------------ */
/* Crédito e modalidades de pagamento                                  */
/* ------------------------------------------------------------------ */

export interface PaymentTerm {
  code: string;
  name: string;
  /**
   * O mesmo acordo dito em português claro. O termo técnico continua no
   * `code` e no `name`, porque quem já é do ramo procura por ele, mas quem
   * está chegando não deveria precisar decifrar uma sigla para entender uma
   * condição de pagamento.
   */
  plain: string;
  term: string;
  documents: string;
  bestFor: string;
}

/**
 * O diferencial número 1. Nenhum dos 12 concorrentes auditados oferece prazo
 * de pagamento pós embarque, e para o importador isso é capital de giro.
 */
export const paymentTerms: PaymentTerm[] = [
  {
    code: "CAD",
    name: "Cash Against Documents",
    plain: "Pagar à vista, contra os documentos",
    term: "Pagamento no momento em que os documentos são apresentados",
    documents: "Documentos liberados na quitação",
    bestFor:
      "Quem quer o menor custo financeiro e tem caixa disponível no embarque",
  },
  {
    code: "OA",
    name: "Open Account",
    plain: "Pagar em até 120 dias, direto para nós",
    term: "De 90 a 120 dias, contados do embarque",
    documents: "Documentos originais enviados direto ao importador",
    bestFor:
      "Quem já tem histórico conosco e quer o giro mais longo com o mínimo de intermediação",
  },
  {
    code: "DA",
    name: "Documents Against Acceptance",
    plain: "Pagar em até 120 dias, com o banco no meio",
    term: "De 90 a 120 dias, contados do embarque",
    documents: "Documentos originais enviados ao banco indicado pelo cliente",
    bestFor:
      "Quem precisa do prazo longo com a segurança de ter o banco no circuito",
  },
];

/* ------------------------------------------------------------------ */
/* Estruturação tributária                                             */
/* ------------------------------------------------------------------ */

export interface ImportRegime {
  id: string;
  name: string;
  funds: string;
  ownership: string;
  taxLiability: string;
  invoice: string;
  fitsWhen: string;
}

export const importRegimes: ImportRegime[] = [
  {
    id: "conta-e-ordem",
    name: "Por conta e ordem",
    funds: "Recursos do adquirente",
    ownership:
      "A mercadoria é do adquirente desde a origem, antes mesmo de chegar ao Brasil",
    taxLiability: "Adquirente é o responsável principal, a trading é solidária",
    invoice: "A trading presta serviço e fatura o serviço",
    fitsWhen:
      "Quando a empresa quer manter o controle da operação e já tem estrutura interna para isso",
  },
  {
    id: "encomenda",
    name: "Por encomenda",
    funds: "Recursos da importadora",
    ownership: "A mercadoria é da trading até a revenda",
    taxLiability: "A trading é a responsável",
    invoice: "A trading emite nota de venda no mercado interno, com ICMS",
    fitsWhen:
      "Quando a empresa prefere terceirizar o risco fiscal e cambial da operação",
  },
];

export const regimeSource =
  "Instrução Normativa RFB nº 1.861, de 27 de dezembro de 2018";

/**
 * O trade-off que quase ninguém publica. Dizer isto custa uma venda de vez em
 * quando e compra a credibilidade de quem explica o que não convém.
 */
export const oeaCaveat =
  "Vale saber antes de decidir: o programa OEA de Conformidade exige que o importador faça pelo menos 85% das operações de forma direta, sem terceiros figurando como adquirente ou encomendante. Se a certificação OEA está no seu horizonte, operar sempre via trading trabalha contra ela. É uma conta que fazemos junto com você, não uma que escondemos.";

/* ------------------------------------------------------------------ */
/* Setores                                                             */
/* ------------------------------------------------------------------ */

export const sectors = [
  {
    title: "Insumos industriais",
    body: "Matéria-prima e componentes para linha de produção, onde prazo de entrega furado é linha parada.",
  },
  {
    title: "Produtos acabados",
    body: "Mercadoria pronta para revenda, onde a conta que decide é o custo posto no seu armazém, não o preço FOB.",
  },
  {
    title: "Exportação",
    body: "Estudo de viabilidade para levar produto brasileiro a mercados na Europa e na Ásia.",
  },
];

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * As objeções reais do setor, incluindo as desconfortáveis. FAQ que só
 * responde pergunta fácil não convence ninguém, e a pergunta sobre comissão do
 * fornecedor é a mais importante que existe neste mercado.
 */
export const faq: FaqItem[] = [
  {
    question: "Por que eu não falo direto com a fábrica?",
    answer:
      "Você pode, e às vezes deve. O que a fábrica não conta é o MOQ real, a capacidade ociosa, o quanto do seu pedido vai ser subcontratado e se o certificado que ela mandou existe no portal do emissor. Em 2026 já existe fornecedor fazendo videochamada gerada por inteligência artificial. A conta é simples: o que você economiza sem intermediário precisa ser maior do que o que custa um erro desses.",
  },
  {
    question: "Vocês recebem comissão do fornecedor também?",
    answer:
      "Esta é a pergunta mais importante do setor e quase ninguém responde. [CONFIRMAR com o cliente: modelo de remuneração exato, se é comissão em percentual sobre o pedido, fee fixo, ou spread na operação, e declarar aqui de forma inequívoca de quem vem o pagamento.]",
  },
  {
    question: "Isso não é o que meu despachante já faz?",
    answer:
      "Não. O despachante executa o despacho aduaneiro quando a carga já está no porto. O nosso trabalho começa muito antes disso, na escolha e homologação do fornecedor, na estruturação do pagamento e do regime tributário, e segue durante toda a travessia. Coordenamos com o despachante, não substituímos.",
  },
  {
    question: "Vocês tomam posse da mercadoria?",
    answer:
      "[CONFIRMAR com o cliente: se a H H Brasil tem RADAR próprio e toma título da mercadoria, ou se sempre opera via trading parceira. A resposta muda o enquadramento jurídico de toda a oferta e precisa estar correta aqui.]",
  },
  {
    question: "Como funciona o prazo de 90 a 120 dias?",
    answer:
      "A contagem começa na data do conhecimento de embarque, ou seja, no dia em que a carga sai, e não na chegada. Nas duas formas com prazo você recebe a carga e nacionaliza antes de o pagamento vencer, o que libera capital de giro no período mais apertado da operação. [CONFIRMAR com o cliente: quem concede o prazo, se é o fornecedor, uma instituição financeira ou a própria H H Brasil, para a redação ficar juridicamente precisa.]",
  },
  {
    question: "Trabalham com qual volume mínimo?",
    answer:
      "[CONFIRMAR com o cliente: se existe volume mínimo, e qual. Também vale saber se atende primeira importação, já que boa parte do público que chega por busca orgânica ainda não tem RADAR.]",
  },
  {
    question: "Em quais portos vocês operam?",
    answer:
      "Todos os portos brasileiros. Na prática o porto certo raramente é o mais próximo: é o que combina benefício estadual de ICMS, estrutura para o seu tipo de carga e prazo. Isso entra no estudo antes de fechar a operação, não depois.",
  },
  {
    question: "Como sei que a empresa existe?",
    answer:
      "H H Brasil Ltda., CNPJ 28.415.496/0001-83, com endereço em São Paulo. Está no rodapé desta página e pode ser conferido na Receita Federal antes de qualquer conversa.",
  },
];
