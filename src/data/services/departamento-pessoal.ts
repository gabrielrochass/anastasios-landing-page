import {
  IconCalendarioPrazo,
  IconCheckConformidade,
  IconContrato,
  IconFolhaPagamento,
  IconMatrizRisco,
  IconRelogioPonto,
} from "@/components/icons";
import type { ServiceContent } from "./types";

export const departamentoPessoalService: ServiceContent = {
  slug: "departamento-pessoal",
  heroImage: "dp-escritorio",
  heroAnchor: "dp-flow",
  caseImage: "dp-documentos",
  eyebrow: "eSocial e folha",
  title: "Da admissão ao eSocial, a folha já nasce conferida.",
  lead: "Terceirização de departamento pessoal para empresas de Recife e região: folha, eSocial, admissões e desligamentos operados por quem também responde pela sua saúde ocupacional.",
  metaDescription:
    "Departamento pessoal em Recife: folha de pagamento, eSocial e admissões sem retrabalho nem multa. Integrado à saúde ocupacional. Peça um diagnóstico.",
  problem: {
    title: "O eSocial não espera o fechamento da sua planilha",
    body: "Cada admissão, exame e desligamento virou evento do eSocial com prazo próprio. Quando folha, exames e eSocial vivem em fornecedores diferentes, o dado chega atrasado ou divergente: rescisão recalculada, ASO fora do prazo, verba paga a maior. O custo não é uma multa isolada, é o retrabalho que cresce em silêncio.",
  },
  solutions: [
    {
      icon: IconFolhaPagamento,
      title: "Folha de pagamento",
      summary:
        "Processamento mensal completo, do cálculo de proventos e descontos às guias de encargos.",
      detail:
        "Calculamos folha, férias, 13º, adicionais e encargos com conferência antes do fechamento, não depois. Você recebe relatórios de provisão e custo por centro de resultado, e as guias saem no prazo, todos os meses.",
    },
    {
      icon: IconRelogioPonto,
      title: "Gestão do eSocial",
      summary:
        "Transmissão e monitoramento de todos os eventos trabalhistas e de SST, dentro do prazo legal.",
      detail:
        "Acompanhamos o calendário de cada evento (de S-2200 a S-2299, incluindo os eventos de SST) e tratamos as pendências de retorno antes que virem inconsistência. Como também executamos os exames ocupacionais, o dado nasce no mesmo fluxo que o transmite.",
    },
    {
      icon: IconContrato,
      title: "Admissões e desligamentos",
      summary:
        "Rotina completa de entrada e saída: documentação, registro, exames e homologação de verbas.",
      detail:
        "Estruturamos o processo admissional com checklist único: contrato, registro, exame admissional e evento no eSocial em sequência, sem lacuna. No desligamento, calculamos e conferimos as verbas rescisórias e o exame demissional dentro dos prazos legais.",
    },
    {
      icon: IconCheckConformidade,
      title: "Consultoria trabalhista",
      summary:
        "Orientação preventiva para decisões do dia a dia: jornada, adicionais, contratos e convenções.",
      detail:
        "Antes de mudar uma escala, criar uma função ou aplicar um desconto, você consulta quem conhece a legislação e a sua convenção coletiva. Decisão orientada custa menos que reclamatória, e deixa rastro documental para a defesa, se ela vier.",
    },
  ],
  timelineIds: [
    "criacao-esocial-2014",
    "lgpd-dados-saude-2020",
    "esocial-eventos-sst-2021",
    "cipa-assedio-nr5-2022",
  ],
  differentials: [
    {
      icon: IconMatrizRisco,
      title: "Folha e SST no mesmo fluxo",
      description:
        "O exame que a nossa clínica realiza é o mesmo que o nosso DP transmite ao eSocial. Sem planilha intermediária, sem divergência entre o que foi feito e o que foi declarado.",
    },
    {
      icon: IconCalendarioPrazo,
      title: "Calendário de obrigações monitorado",
      description:
        "Cada evento do eSocial tem prazo, e cada prazo tem responsável. Monitoramos vencimentos de forma contínua, para que a sua empresa não descubra a pendência na notificação.",
    },
    {
      icon: IconCheckConformidade,
      title: "Conferência antes do fechamento",
      description:
        "Toda folha passa por dupla conferência de cálculo e de parametrização antes de fechar. Erro identificado antes do pagamento custa uma correção; depois, custa passivo.",
    },
  ],
  cta: {
    title: "Quanto custa o retrabalho da sua folha hoje?",
    body: "Peça um diagnóstico gratuito: analisamos folha, eSocial e admissões e apontamos o risco antes da fiscalização.",
  },
};
