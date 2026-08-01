import { z } from "zod";

export const contactServiceOptions = [
  { value: "departamento-pessoal", label: "Departamento Pessoal" },
  { value: "clinica-ocupacional", label: "Clínica Ocupacional" },
  { value: "engenharia-sst", label: "Engenharia de SST" },
  { value: "complementares", label: "Serviços Complementares" },
  { value: "treinamentos", label: "Treinamentos NR" },
  { value: "nao-sei", label: "Ainda não sei, quero um diagnóstico" },
] as const;

export type ContactService = (typeof contactServiceOptions)[number]["value"];

const serviceValues = contactServiceOptions.map((o) => o.value) as [
  ContactService,
  ...ContactService[],
];

/** Schema único, usado no client (react-hook-form) E re-validado na action. */
export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome.").max(120),
  company: z.string().min(2, "Informe a empresa.").max(120),
  email: z.string().email("E-mail inválido."),
  phone: z
    .string()
    .min(10, "Telefone com DDD.")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "Telefone inválido."),
  service: z.enum(serviceValues, { message: "Escolha um assunto." }),
  message: z.string().min(10, "Conte um pouco mais (mínimo 10 caracteres).").max(2000),
  lgpdConsent: z.literal(true, {
    message: "O consentimento é necessário para enviarmos sua resposta.",
  }),
  /** Preenchido pelo quiz — resumo da recomendação. */
  diagnosticSummary: z.string().max(500).optional(),
  /** Honeypot anti-spam: humano nunca preenche. */
  website: z.string().max(0).optional(),
  /** Epoch ms de quando o form montou — submissão <3s é bot. */
  startedAt: z.number(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
