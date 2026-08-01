import {
  IconCalendarioPrazo,
  IconCheckConformidade,
  IconCoracaoPulso,
  IconEstetoscopio,
  IconMatrizRisco,
  IconPulmoes,
  IconContrato,
} from "@/components/icons";
import type { ServiceContent } from "./types";

export const clinicaOcupacionalService: ServiceContent = {
  slug: "clinica-ocupacional",
  heroImage: "clinica-medico-paciente",
  heroAnchor: "exam-status",
  caseImage: "clinica-otoscopia",
  eyebrow: "PCMSO pela NR-7",
  title: "Cada exame no prazo, cada risco no radar.",
  lead: "Clínica de medicina do trabalho em Recife: exames admissionais, periódicos, demissionais e de mudança de risco, executados dentro de um PCMSO que conversa com o seu PGR e com o eSocial.",
  metaDescription:
    "Clínica de medicina ocupacional em Recife: admissional, periódico, demissional e PCMSO coordenado. Resultados integrados ao eSocial. Agende avaliação.",
  problem: {
    title: "Exame desconectado é despesa que não protege",
    body: "A NR-7 exige que os exames sigam um programa (o PCMSO) que nasce do inventário de riscos do PGR. Na prática, o exame vira fila de guichê: ASO em papel, ninguém cruza com o risco da função e o evento S-2220 sai atrasado. A empresa paga pelo exame e continua exposta, porque o documento não sustenta defesa.",
  },
  solutions: [
    {
      icon: IconEstetoscopio,
      title: "Exame admissional",
      summary:
        "Avaliação de aptidão antes da contratação, orientada pelos riscos reais da função.",
      detail:
        "O exame admissional é feito com base no inventário de riscos da função, não em um protocolo genérico. O ASO sai no mesmo dia na maioria dos casos, e o evento correspondente segue para o eSocial dentro do prazo.",
    },
    {
      icon: IconCoracaoPulso,
      title: "Exames periódicos",
      summary:
        "Monitoramento contínuo da saúde do trabalhador, com controle ativo de vencimentos.",
      detail:
        "Controlamos o vencimento de cada exame por funcionário e por risco: audiometria, espirometria, exames laboratoriais e complementares conforme o PCMSO. Você recebe o alerta antes do vencimento, não a pendência depois dele.",
    },
    {
      icon: IconContrato,
      title: "Exame demissional",
      summary:
        "Encerramento do vínculo com a documentação de saúde completa e dentro do prazo legal.",
      detail:
        "O demissional fecha o histórico ocupacional do trabalhador e protege a empresa contra alegações futuras de doença ocupacional. Executamos dentro dos prazos da NR-7 e articulado com a rotina de desligamento do departamento pessoal.",
    },
    {
      icon: IconPulmoes,
      title: "Mudança de risco e retorno ao trabalho",
      summary:
        "Reavaliação médica sempre que a exposição muda ou o trabalhador retorna de afastamento.",
      detail:
        "Mudou a função, o setor ou o risco? A NR-7 exige novo exame. Voltou de afastamento prolongado? Exame de retorno antes de reassumir. São os exames mais esquecidos pelas empresas, e os mais cobrados em perícia.",
    },
  ],
  timelineIds: [
    "pcmso-ppra-1994",
    "lgpd-dados-saude-2020",
    "esocial-eventos-sst-2021",
    "vigencia-pgr-nova-nr7-2022",
    "riscos-psicossociais-nr1-2024",
  ],
  differentials: [
    {
      icon: IconMatrizRisco,
      title: "PCMSO que nasce do PGR",
      description:
        "Nossa engenharia de SST elabora o inventário de riscos; nossa clínica define os exames a partir dele. É o desenho que a NR-1 e a NR-7 exigem desde 2022, e que exames avulsos não entregam.",
    },
    {
      icon: IconCalendarioPrazo,
      title: "ASO no prazo, eSocial no prazo",
      description:
        "Exame realizado é exame transmitido: o S-2220 segue para o eSocial no mesmo fluxo, sem depender de troca de planilhas entre clínica, contador e RH.",
    },
    {
      icon: IconCheckConformidade,
      title: "Coordenação médica responsável",
      description:
        "O PCMSO tem médico responsável que conhece a sua operação, assina o programa e responde tecnicamente por ele, com guarda de prontuários conforme a norma e a LGPD.",
    },
  ],
  cta: {
    title: "Quantos exames da sua equipe estão vencidos agora?",
    body: "Agende uma avaliação gratuita do seu PCMSO: cruzamos seus exames com o risco de cada função e com o eSocial, e mostramos o que está exposto.",
  },
};
