import type { LegislationEvent } from "@/lib/legislation";

/**
 * Marcos de legislação de SST, departamento pessoal e saúde ocupacional.
 * Ordenados cronologicamente. Os ids são referenciados pelos serviços em
 * src/data/services/*.ts (campo timelineIds).
 */
export const legislationEvents: LegislationEvent[] = [
  {
    id: "portaria-3214-1978",
    year: 1978,
    nr: "Portaria 3.214",
    title: "Nascem as Normas Regulamentadoras",
    summary:
      "A Portaria 3.214/78 aprova as primeiras Normas Regulamentadoras de segurança e medicina do trabalho, regulamentando o Capítulo V da CLT. É a base de todo o sistema de SST brasileiro até hoje.",
    impact: "critical",
  },
  {
    id: "pcmso-ppra-1994",
    year: 1994,
    nr: "NR-7 e NR-9",
    title: "PCMSO e PPRA tornam-se obrigatórios",
    summary:
      "A nova redação da NR-7 institui o PCMSO, com exames admissional, periódico, de retorno, de mudança de função e demissional. A NR-9 cria o PPRA, ligando pela primeira vez o controle médico à avaliação de riscos ambientais.",
    impact: "critical",
  },
  {
    id: "ltcat-aposentadoria-especial-1995",
    year: 1995,
    nr: "LTCAT",
    title: "Aposentadoria especial passa a exigir prova técnica",
    summary:
      "A Lei 9.032/95 endurece as regras da aposentadoria especial: a exposição a agentes nocivos passa a exigir comprovação efetiva. Nos anos seguintes, o LTCAT se consolida como o documento-base dessa comprovação perante a Previdência.",
    impact: "important",
  },
  {
    id: "nr33-espacos-confinados-2006",
    year: 2006,
    nr: "NR-33",
    title: "Espaços confinados ganham norma própria",
    summary:
      "A NR-33 estabelece requisitos para identificação de espaços confinados e para o controle de entrada e trabalho nesses ambientes, incluindo permissão de entrada, supervisão e capacitação obrigatória.",
    impact: "important",
  },
  {
    id: "nr12-maquinas-2010",
    year: 2010,
    nr: "NR-12",
    title: "Revisão ampla da segurança em máquinas",
    summary:
      "A NR-12 é profundamente revisada e passa a exigir medidas de proteção em máquinas e equipamentos ao longo de todo o ciclo de vida: projeto, instalação, operação e manutenção, com inventário e apreciação de riscos.",
    impact: "important",
  },
  {
    id: "nr35-trabalho-em-altura-2012",
    year: 2012,
    nr: "NR-35",
    title: "Trabalho em altura acima de 2 metros é regulamentado",
    summary:
      "A NR-35 define trabalho em altura como toda atividade executada acima de 2 metros do nível inferior com risco de queda, exigindo análise de risco, capacitação e autorização formal do trabalhador.",
    impact: "important",
  },
  {
    id: "criacao-esocial-2014",
    year: 2014,
    nr: "eSocial",
    title: "Decreto 8.373 institui o eSocial",
    summary:
      "O governo federal cria o Sistema de Escrituração Digital das Obrigações Fiscais, Previdenciárias e Trabalhistas. Folha, admissões e desligamentos passam, gradualmente, a ser transmitidos em eventos digitais com prazo.",
    impact: "important",
  },
  {
    id: "lgpd-dados-saude-2020",
    year: 2020,
    nr: "LGPD",
    title: "Dados de saúde ocupacional viram dados sensíveis",
    summary:
      "A Lei 13.709/18 entra em vigor. Resultados de exames, ASOs e prontuários ocupacionais são dados pessoais sensíveis: exigem base legal, controle de acesso e cuidado redobrado na guarda e no compartilhamento.",
    impact: "important",
  },
  {
    id: "nova-nr1-gro-pgr-2020",
    year: 2020,
    nr: "NR-1",
    title: "Nova NR-1 cria o GRO e o PGR",
    summary:
      "Publicada em 2020, a nova redação da NR-1 institui o Gerenciamento de Riscos Ocupacionais (GRO) e o Programa de Gerenciamento de Riscos (PGR), com inventário de riscos e plano de ação como documentos centrais.",
    impact: "critical",
  },
  {
    id: "esocial-eventos-sst-2021",
    year: 2021,
    nr: "eSocial SST",
    title: "Eventos de SST tornam-se obrigatórios no eSocial",
    summary:
      "Começa o envio obrigatório dos eventos S-2210 (CAT), S-2220 (monitoramento de saúde) e S-2240 (condições ambientais), em fases entre 2021 e 2022. Exame feito e não transmitido no prazo passa a gerar risco de autuação.",
    impact: "critical",
  },
  {
    id: "vigencia-pgr-nova-nr7-2022",
    year: 2022,
    nr: "NR-1 e NR-7",
    title: "PGR substitui o PPRA e o PCMSO é realinhado",
    summary:
      "Entram em vigor a nova NR-1 e a nova NR-7: o PPRA deixa de existir, o PGR passa a valer e o PCMSO deve ser elaborado a partir do inventário de riscos. Programas desconectados entre si deixam de ser aceitáveis.",
    impact: "critical",
  },
  {
    id: "cipa-assedio-nr5-2022",
    year: 2022,
    nr: "NR-5",
    title: "CIPA incorpora a prevenção ao assédio",
    summary:
      "A Lei 14.457/22 amplia o papel da CIPA, que passa a incluir a prevenção ao assédio no ambiente de trabalho, com exigência de canal de denúncias, procedimentos internos e ações de capacitação periódicas.",
    impact: "important",
  },
  {
    id: "riscos-psicossociais-nr1-2024",
    year: 2024,
    nr: "NR-1",
    // [VALIDAR] confirmar número da portaria e cronograma de fiscalização
    // (vigência e fase orientativa) antes do go-live.
    title: "Riscos psicossociais entram no gerenciamento de riscos",
    summary:
      "Atualização da NR-1 torna explícita a obrigação de identificar e avaliar riscos psicossociais relacionados ao trabalho dentro do GRO/PGR. A fiscalização foi estruturada em fases, com período inicial de caráter orientativo.",
    impact: "critical",
  },
];
