/**
 * [VALIDAR] Depoimentos ilustrativos e anonimizados — substituir por
 * depoimentos reais AUTORIZADOS (com nome/empresa mediante consentimento)
 * antes do go-live.
 */
export interface Testimonial {
  quote: string;
  role: string;
  segment: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "A divergência entre folha e SST era nossa maior fonte de notificação no eSocial. Com tudo na mesma operação, simplesmente parou.",
    role: "Gerente de RH",
    segment: "Indústria, ~300 colaboradores",
  },
  {
    quote:
      "O diagnóstico foi honesto: mostraram o que estava vencido e o que podia esperar. Sem empurrar pacote.",
    role: "Diretora administrativa",
    segment: "Rede de clínicas, Recife",
  },
  {
    quote:
      "Resultado de exame em 48h e integração direta com o PCMSO. A rotina de admissão ficou outra coisa.",
    role: "Coordenador de DP",
    segment: "Logística, ~500 colaboradores",
  },
  {
    quote:
      "Fiscalização chegou e a documentação estava pronta: PGR, laudos, treinamentos. Zero auto de infração.",
    role: "Sócio-gestor",
    segment: "Construção civil, médio porte",
  },
  {
    quote:
      "A trilha de treinamentos por grau de risco resolveu a CIPA de três filiais de uma vez.",
    role: "Analista de SST",
    segment: "Varejo, multiunidade",
  },
  {
    quote:
      "Quem assina o laudo atende o telefone. Isso, na prática, vale mais que qualquer proposta comercial.",
    role: "Gerente de operações",
    segment: "Metalurgia, ~200 colaboradores",
  },
];
