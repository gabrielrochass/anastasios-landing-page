import {
  IconBalanca,
  IconCalendarioPrazo,
  IconCapacete,
  IconCheckConformidade,
  IconContrato,
  IconMatrizRisco,
  IconPerigoLosango,
} from "@/components/icons";
import type { ServiceContent } from "./types";

export const complementaresService: ServiceContent = {
  slug: "complementares",
  heroImage: "sst-capacetes-fila",
  heroAnchor: "pericia-stack",
  caseImage: "dp-documentos",
  eyebrow: "Perícias e apoio técnico",
  title: "Quando o caso vira processo, o laudo decide.",
  lead: "Perícias judiciais, assistência técnica em processos trabalhistas, laudos específicos e terceirização de profissionais de SST para empresas de Recife e região que precisam de profundidade técnica sob demanda.",
  metaDescription:
    "Perícia judicial, assistência técnica, laudos de SST e terceirização de profissionais em Recife. Apoio técnico a processos trabalhistas. Fale conosco.",
  problem: {
    title: "Na perícia, quem não tem laudo aceita o laudo do outro",
    body: "Insalubridade chega a 40% e periculosidade a 30%; multiplicados por anos e reflexos, viram condenação. Quem chega à perícia sem laudo próprio, sem medição e sem assistente técnico é julgado pela única versão disponível: a da outra parte. É essa lacuna que este serviço fecha.",
  },
  solutions: [
    {
      icon: IconBalanca,
      title: "Perícia judicial",
      summary:
        "Atuação como perito em processos trabalhistas e previdenciários que exigem prova técnica.",
      detail:
        "Realizamos perícias de insalubridade, periculosidade e condições de trabalho com metodologia documentada: vistoria, medições, enquadramento normativo e laudo fundamentado. Rigor técnico e imparcialidade são o que sustenta um laudo diante do juízo.",
    },
    {
      icon: IconContrato,
      title: "Assistência técnica em processos",
      summary:
        "Assistente técnico da empresa em perícias: quesitos, acompanhamento e parecer divergente.",
      detail:
        "Formulamos quesitos, acompanhamos a diligência pericial e analisamos criticamente o laudo do perito do juízo. Quando há fundamento, elaboramos parecer técnico divergente que dá ao seu advogado base concreta para impugnação.",
    },
    {
      icon: IconCapacete,
      title: "Terceirização de profissional de SST",
      summary:
        "Técnicos e engenheiros de segurança alocados na sua operação, pelo tempo que a demanda exigir.",
      detail:
        "Obra com prazo definido, projeto sazonal ou exigência de contratante: alocamos profissionais de SST qualificados sem que você monte estrutura própria. A gestão técnica e a responsabilidade pela entrega continuam conosco.",
    },
    {
      icon: IconPerigoLosango,
      title: "Laudos específicos",
      summary:
        "Avaliações técnicas pontuais: insalubridade, periculosidade, ergonomia e demandas de norma.",
      detail:
        "Elaboramos laudos sob demanda para situações específicas: enquadramento de adicionais, análise ergonômica, avaliações ambientais quantitativas e respostas técnicas a notificações. Cada laudo sai com medição rastreável e responsável habilitado.",
    },
  ],
  timelineIds: [
    "ltcat-aposentadoria-especial-1995",
    "nr12-maquinas-2010",
    "nr35-trabalho-em-altura-2012",
    "esocial-eventos-sst-2021",
  ],
  differentials: [
    {
      icon: IconMatrizRisco,
      title: "Visão completa do passivo",
      description:
        "Quem elabora PGR, PCMSO e LTCAT no dia a dia sabe onde as perícias costumam encontrar fragilidade. Levamos essa visão de gestão para dentro do processo, e do processo de volta para a prevenção.",
    },
    {
      icon: IconCalendarioPrazo,
      title: "Prazos processuais respeitados",
      description:
        "Quesito, diligência e parecer têm janelas que não se reabrem. Trabalhamos alinhados ao calendário do processo e ao seu jurídico, com entregas dentro do prazo, sempre.",
    },
    {
      icon: IconCheckConformidade,
      title: "Assinatura de quem responde",
      description:
        "Todo laudo e parecer sai com responsável técnico habilitado, metodologia explícita e medições rastreáveis. É isso que diferencia prova técnica de opinião escrita.",
    },
  ],
  cta: {
    title: "Recebeu uma citação ou uma notificação? O prazo já está correndo.",
    body: "Fale com a equipe técnica: avaliamos o processo, indicamos a prova necessária e damos orçamento objetivo, no tempo do seu prazo.",
  },
};
