/**
 * As 6 etapas da operação. Esta é a espinha da página: o navio percorre a rota
 * conforme o visitante desce, e cada trecho corresponde a uma etapa real.
 *
 * `artifacts` são nomes de documento de verdade, não rótulos genéricos. Um
 * importador reconhece "proforma invoice" e "packing list" na hora, e é isso
 * que separa quem faz o trabalho de quem comprou um template.
 *
 * Regra de enquadramento em todas as descrições: a H H Brasil coordena,
 * homologa, negocia e responde. Ela não é despachante credenciado, então nada
 * aqui pode dizer que ela executa o despacho.
 */

export interface OperationStage {
  id: string;
  /** Número exibido em mono, no formato "01" */
  ordinal: string;
  title: string;
  /** Rótulo curto do waypoint no mapa e na rota */
  waypoint: string;
  summary: string;
  /** O que de fato acontece, em frases curtas */
  points: string[];
  /** Documentos e entregáveis reais desta etapa */
  artifacts: string[];
}

export const operationStages: OperationStage[] = [
  {
    id: "sourcing",
    ordinal: "01",
    title: "Sourcing e homologação",
    waypoint: "Origem",
    summary:
      "Antes de cotar preço, descobrimos com quem você estaria falando. Fábrica existe, produz o que diz produzir e aguenta o seu volume, ou é trading revendendo com margem escondida.",
    points: [
      "Prospecção e triagem de fornecedores na China, Índia e Leste Europeu.",
      "Auditoria de fábrica e verificação de certificado direto na fonte emissora, não no PDF que o fornecedor manda.",
      "Checagem de capacidade real, MOQ praticado e histórico de subcontratação.",
      "Só entra na lista quem aceita a mesma política de responsabilidade que aplicamos a nós.",
    ],
    artifacts: [
      "Relatório de homologação",
      "Auditoria de fábrica",
      "Ficha técnica do produto",
    ],
  },
  {
    id: "contrato",
    ordinal: "02",
    title: "Contrato e financiamento",
    waypoint: "Contrato",
    summary:
      "O ponto onde a maior parte das operações trava por falta de capital de giro. Estruturamos o prazo de pagamento para que a carga embarque antes de o dinheiro sair.",
    points: [
      "Contrato de compra e venda com escopo, tolerância de qualidade e penalidade definidos antes de qualquer adiantamento.",
      "Modalidade de pagamento escolhida junto com o seu financeiro, entre CAD, OA e DA.",
      "Prazo de 90 a 120 dias contados do B/L nas modalidades OA e DA.",
      "Definição do Incoterm com a conta fechada, não pela cotação mais simpática.",
    ],
    artifacts: [
      "Contrato de compra e venda",
      "Proforma invoice",
      "Instrução de pagamento",
    ],
  },
  {
    id: "producao",
    ordinal: "03",
    title: "Produção, padronização e inspeção",
    waypoint: "Produção",
    summary:
      "Amostra aprovada e lote produzido são coisas diferentes, e a distância entre as duas é onde mora o prejuízo. Acompanhamos a linha, não o e-mail.",
    points: [
      "Padronização de especificação, embalagem e marcação antes do início da produção.",
      "Inspeção pré-embarque com laudo, comparando o lote contra a amostra aprovada.",
      "Rastreabilidade do pedido do contrato até a chegada ao porto de destino.",
      "Lead time acordado por escrito, conciliando produção, preparo e janela de embarque.",
    ],
    artifacts: [
      "Laudo de inspeção pré-embarque",
      "Packing list",
      "Commercial invoice",
    ],
  },
  {
    id: "embarque",
    ordinal: "04",
    title: "Embarque e contêiner",
    waypoint: "Embarque",
    summary:
      "Contêiner ruim vira custo de reparação na devolução, e free time mal negociado vira demurrage. Os dois são invisíveis na cotação e muito visíveis na fatura.",
    points: [
      "Parceiros logísticos que entregam equipamento em condição de uso, o que evita surpresa na devolução.",
      "Free time negociado na reserva, não descoberto na chegada.",
      "Conferência documental antes do embarque, porque erro em documento original custa semanas depois.",
      "Emissão e conferência do B/L, que é o marco a partir do qual o prazo de pagamento começa a contar.",
    ],
    artifacts: ["Bill of Lading", "Booking confirmation", "Certificado de origem"],
  },
  {
    id: "travessia",
    ordinal: "05",
    title: "Travessia e risco",
    waypoint: "Travessia",
    summary:
      "Entre o embarque e a chegada acontece o que ninguém controla: desvio de rota, transbordo, avaria, greve, guerra. O que dá para controlar é a velocidade da resposta.",
    points: [
      "Acompanhamento de rota, transbordo e janela de chegada.",
      "Cobertura de seguro dimensionada para o risco real da carga, não a mínima do vendedor.",
      "Em caso de avaria, sinistro ou troca de armazém, coordenação da resposta enquanto a carga ainda está em trânsito.",
      "Leitura de cenário e frete publicada no Painel de Inteligência, com data e fonte.",
    ],
    artifacts: ["Apólice de seguro", "Tracking de rota", "Aviso de chegada"],
  },
  {
    id: "chegada",
    ordinal: "06",
    title: "Chegada, desembaraço e entrega",
    waypoint: "Santos",
    summary:
      "Operamos com todos os portos brasileiros. O porto certo raramente é o mais perto: é o que combina benefício estadual, estrutura e prazo para a sua carga.",
    points: [
      "Escolha de porto e regime feita com estudo, comparando conta e ordem contra encomenda.",
      "Coordenação com comissária e despachante credenciado, que são quem executa o despacho.",
      "Suporte alfandegário e jurídico quando a carga cai em canal amarelo, vermelho ou cinza.",
      "Acompanhamento até a entrega, com a operação inteira documentada.",
    ],
    artifacts: ["DUIMP", "Comprovante de importação", "Nota fiscal de entrada"],
  },
];
