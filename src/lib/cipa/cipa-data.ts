import type {
  CipaGroup,
  CipaRiskGrade,
  CipaSizingRange,
} from "@/lib/cipa/types";

/**
 * Dimensionamento da CIPA — NR-5 VIGENTE
 * (redação da Portaria MTP nº 422/2021, em vigor desde 03/01/2022,
 * alterada pela Portaria MTP nº 4.219/2022 — "CIPA e Assédio").
 *
 * FONTES OFICIAIS (acesso em 22/07/2026):
 * - NR-05 atualizada (texto vigente com Quadro I – Dimensionamento da CIPA):
 *   https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR05atualizada2023.pdf
 * - NR-04 atualizada (Anexo I: relação CNAE 2.0 → Grau de Risco, usada para
 *   sugerir o GR típico de cada setor do formulário):
 *   https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR04atualizada2023.pdf
 *
 * COMO A NR-5 VIGENTE DIMENSIONA:
 * Desde a Portaria MTP 422/2021 NÃO existem mais os antigos agrupamentos
 * por setor econômico (C-1, C-5a etc.). O Quadro I da NR-5 dimensiona a
 * CIPA por GRAU DE RISCO (GR 1 a 4, conforme Quadro I da NR-04 / CNAE 2.0)
 * combinado com o nº de empregados do estabelecimento. Por isso o
 * dimensionamento abaixo é indexado pelo GR informado pelo usuário
 * (`cipaSizingByGrade`), e cada setor carrega apenas um GR típico sugerido.
 *
 * AVISO: o dimensionamento oficial depende do CNAE exato da atividade
 * principal do estabelecimento (NR-04, Anexo/Quadro I) — o resultado do
 * site é ORIENTATIVO, não substitui o enquadramento formal.
 *
 * SIMPLIFICAÇÃO DA ÚLTIMA FAIXA: o Quadro I termina na faixa
 * "5.001 a 10.000" e manda, acima de 10.000 empregados, ACRESCENTAR
 * +1 efetivo e +1 suplente (GR 1 e 2) ou +2 efetivos e +2 suplentes
 * (GR 3 e 4) para cada grupo de 2.500 empregados. Aqui a última faixa
 * numérica do quadro (5.001-10.000) foi mantida como faixa aberta
 * (max: null), sem o incremento — valor mínimo garantido.
 *
 * FAIXAS VAZIAS: as primeiras colunas do quadro oficial são vazias
 * (sem exigência de comissão) até 80 empregados no GR 1, até 50 no GR 2
 * e até 19 nos GR 3 e 4. Essas faixas NÃO entram nos arrays — o motor
 * trata "abaixo da primeira faixa" como representante designado.
 *
 * NOTA (jul/2026): o Anexo I da NR-04 (tabela CNAE → GR) passou por
 * consulta pública de revisão em out-dez/2025; os graus típicos sugeridos
 * abaixo são os da tabela vigente publicada no gov.br (NR04atualizada2023).
 */

/** Quadro I da NR-5 vigente — uma coluna por Grau de Risco (NR-4). */
export const cipaSizingByGrade: Record<CipaRiskGrade, CipaSizingRange[]> = {
  // Coluna GR 1 — vazia até 80 empregados no quadro oficial.
  1: [
    { min: 81, max: 100, titulars: 1, substitutes: 1 },
    { min: 101, max: 120, titulars: 1, substitutes: 1 },
    { min: 121, max: 140, titulars: 1, substitutes: 1 },
    { min: 141, max: 300, titulars: 1, substitutes: 1 },
    { min: 301, max: 500, titulars: 2, substitutes: 2 },
    { min: 501, max: 1000, titulars: 4, substitutes: 3 },
    { min: 1001, max: 2500, titulars: 5, substitutes: 4 },
    { min: 2501, max: 5000, titulars: 6, substitutes: 5 },
    // Quadro oficial: 5.001-10.000; acima de 10.000, +1 efetivo e +1
    // suplente por grupo de 2.500 — simplificado como faixa aberta.
    { min: 5001, max: null, titulars: 8, substitutes: 6 },
  ],
  // Coluna GR 2 — vazia até 50 empregados no quadro oficial.
  2: [
    { min: 51, max: 80, titulars: 1, substitutes: 1 },
    { min: 81, max: 100, titulars: 1, substitutes: 1 },
    { min: 101, max: 120, titulars: 2, substitutes: 1 },
    { min: 121, max: 140, titulars: 2, substitutes: 1 },
    { min: 141, max: 300, titulars: 3, substitutes: 2 },
    { min: 301, max: 500, titulars: 4, substitutes: 3 },
    { min: 501, max: 1000, titulars: 5, substitutes: 4 },
    { min: 1001, max: 2500, titulars: 6, substitutes: 5 },
    { min: 2501, max: 5000, titulars: 8, substitutes: 6 },
    // Quadro oficial: 5.001-10.000; acima de 10.000, +1 efetivo e +1
    // suplente por grupo de 2.500 — simplificado como faixa aberta.
    { min: 5001, max: null, titulars: 10, substitutes: 8 },
  ],
  // Coluna GR 3 — vazia até 19 empregados no quadro oficial.
  3: [
    { min: 20, max: 29, titulars: 1, substitutes: 1 },
    { min: 30, max: 50, titulars: 1, substitutes: 1 },
    { min: 51, max: 80, titulars: 2, substitutes: 1 },
    { min: 81, max: 100, titulars: 2, substitutes: 1 },
    { min: 101, max: 120, titulars: 2, substitutes: 1 },
    { min: 121, max: 140, titulars: 3, substitutes: 2 },
    { min: 141, max: 300, titulars: 4, substitutes: 2 },
    { min: 301, max: 500, titulars: 5, substitutes: 4 },
    { min: 501, max: 1000, titulars: 6, substitutes: 4 },
    { min: 1001, max: 2500, titulars: 8, substitutes: 6 },
    { min: 2501, max: 5000, titulars: 10, substitutes: 8 },
    // Quadro oficial: 5.001-10.000 (12 efetivos / 8 suplentes — sim, o nº
    // de suplentes repete o da faixa anterior no quadro publicado); acima
    // de 10.000, +2 efetivos e +2 suplentes por grupo de 2.500 —
    // simplificado como faixa aberta.
    { min: 5001, max: null, titulars: 12, substitutes: 8 },
  ],
  // Coluna GR 4 — vazia até 19 empregados no quadro oficial.
  4: [
    { min: 20, max: 29, titulars: 1, substitutes: 1 },
    { min: 30, max: 50, titulars: 2, substitutes: 1 },
    { min: 51, max: 80, titulars: 3, substitutes: 2 },
    { min: 81, max: 100, titulars: 3, substitutes: 2 },
    { min: 101, max: 120, titulars: 4, substitutes: 2 },
    { min: 121, max: 140, titulars: 4, substitutes: 2 },
    { min: 141, max: 300, titulars: 4, substitutes: 3 },
    { min: 301, max: 500, titulars: 5, substitutes: 4 },
    { min: 501, max: 1000, titulars: 6, substitutes: 5 },
    { min: 1001, max: 2500, titulars: 9, substitutes: 7 },
    { min: 2501, max: 5000, titulars: 11, substitutes: 8 },
    // Quadro oficial: 5.001-10.000; acima de 10.000, +2 efetivos e +2
    // suplentes por grupo de 2.500 — simplificado como faixa aberta.
    { min: 5001, max: null, titulars: 13, substitutes: 10 },
  ],
};

/**
 * Setores do formulário — rótulo, NRs setoriais e GR típico sugerido
 * (default de UI; o dimensionamento usa o GR informado pelo usuário).
 */
export const cipaGroups: CipaGroup[] = [
  {
    id: "industria",
    label: "Indústria / fabricação",
    // NR-04 Anexo I: maioria das divisões de fabricação (10, 28, 29, 31…)
    // é GR 3; metalurgia/estruturas metálicas (24, 25.11) chegam a GR 4 e
    // confecção (14.12) fica em GR 2.
    nr5Reference: "GR típico 3 — [VALIDAR por CNAE]", // [VALIDAR] indústrias pesadas podem ser GR 4 (mais membros)
    typicalGrade: 3,
    sectorNRs: [
      {
        nr: "NR-12",
        title: "Segurança no trabalho em máquinas e equipamentos",
        level: "high",
        reason:
          "Máquinas e equipamentos de produção exigem proteções, dispositivos de segurança e procedimentos de operação.",
      },
      {
        nr: "NR-6",
        title: "Equipamento de Proteção Individual (EPI)",
        level: "medium",
        reason:
          "Processos fabris demandam fornecimento, treinamento e gestão de EPI adequados aos riscos.",
      },
    ],
  },
  {
    id: "construcao",
    label: "Construção civil",
    // NR-04 Anexo I: construção de edifícios (41.20-4) é GR 3; obras de
    // infraestrutura (42.11-1) e demolição/preparação de canteiro (43.11-8)
    // são GR 4. Sugerido GR 4 por prudência (dimensionamento maior).
    nr5Reference: "GR típico 4 — [VALIDAR por CNAE]", // [VALIDAR] edificações (41.20-4) enquadram-se em GR 3
    typicalGrade: 4,
    sectorNRs: [
      {
        nr: "NR-18",
        title: "Segurança e saúde no trabalho na indústria da construção",
        level: "high",
        reason:
          "Canteiros de obras têm requisitos próprios de organização, proteções coletivas e CIPA (Anexo I da NR-5).",
      },
      {
        nr: "NR-35",
        title: "Trabalho em altura",
        level: "high",
        reason:
          "Atividades acima de 2 metros do nível inferior exigem análise de risco, capacitação e sistemas de proteção contra quedas.",
      },
    ],
  },
  {
    id: "saude",
    label: "Saúde e serviços médicos",
    // NR-04 Anexo I: atendimento hospitalar (86.10-1) e atenção
    // ambulatorial por médicos/odontólogos (86.30-5) são GR 3.
    nr5Reference: "GR típico 3 — [VALIDAR por CNAE]",
    typicalGrade: 3,
    sectorNRs: [
      {
        nr: "NR-32",
        title: "Segurança e saúde no trabalho em serviços de saúde",
        level: "high",
        reason:
          "Exposição a agentes biológicos, químicos e perfurocortantes exige controles específicos do setor de saúde.",
      },
      {
        nr: "NR-6",
        title: "Equipamento de Proteção Individual (EPI)",
        level: "medium",
        reason:
          "Luvas, máscaras e demais EPI são barreira essencial contra agentes biológicos no atendimento.",
      },
    ],
  },
  {
    id: "comercio",
    label: "Comércio / varejo",
    // NR-04 Anexo I: varejo de mercadorias em geral/supermercados
    // (47.11-3) é GR 2; vários CNAEs de varejo especializado (47.51-2,
    // 47.81-4) são GR 1. Sugerido GR 2 por prudência.
    nr5Reference: "GR típico 2 — [VALIDAR por CNAE]", // [VALIDAR] parte do varejo é GR 1 (CIPA só a partir de 81 empregados)
    typicalGrade: 2,
    sectorNRs: [
      {
        nr: "NR-6",
        title: "Equipamento de Proteção Individual (EPI)",
        level: "low",
        reason:
          "Estoque, reposição e recebimento de mercadorias podem exigir EPI pontuais (luvas, calçado de segurança).",
      },
      {
        nr: "NR-23",
        title: "Proteção contra incêndios",
        level: "medium",
        reason:
          "Lojas com circulação de público exigem saídas de emergência desobstruídas, extintores e plano de abandono.",
      },
    ],
  },
  {
    id: "servicos",
    label: "Serviços / escritório",
    // NR-04 Anexo I: escritórios típicos (69.20-6 contabilidade,
    // 70.20-4 consultoria) são GR 1; serviços de TI (62.01-5 a 62.09-1)
    // são GR 2. Sugerido GR 2 por prudência.
    nr5Reference: "GR típico 2 — [VALIDAR por CNAE]", // [VALIDAR] escritórios GR 1 só constituem CIPA a partir de 81 empregados
    typicalGrade: 2,
    sectorNRs: [
      {
        nr: "NR-17",
        title: "Ergonomia",
        level: "low",
        reason:
          "Trabalho em computador exige mobiliário, pausas e condições ergonômicas adequadas ao posto.",
      },
      {
        nr: "NR-23",
        title: "Proteção contra incêndios",
        level: "low",
        reason:
          "Escritórios devem manter rotas de fuga sinalizadas e equipamentos de combate a incêndio acessíveis.",
      },
    ],
  },
  {
    id: "transporte",
    label: "Transporte e logística",
    // NR-04 Anexo I: transporte rodoviário de carga (49.30-2), transporte
    // coletivo de passageiros (49.21-3), armazenamento (52.11-7) e
    // organização do transporte de carga (52.50-8) são GR 3.
    nr5Reference: "GR típico 3 — [VALIDAR por CNAE]",
    typicalGrade: 3,
    sectorNRs: [
      {
        nr: "NR-11",
        title: "Transporte, movimentação, armazenagem e manuseio de materiais",
        level: "medium",
        reason:
          "Empilhadeiras, pontes rolantes e movimentação de cargas exigem operadores habilitados e regras de circulação.",
      },
      {
        nr: "NR-6",
        title: "Equipamento de Proteção Individual (EPI)",
        level: "medium",
        reason:
          "Carga, descarga e pátio de manobras demandam EPI como calçado de segurança, colete refletivo e capacete.",
      },
    ],
  },
];
