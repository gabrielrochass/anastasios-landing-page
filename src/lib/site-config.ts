/**
 * Dados centrais do site. Valores marcados com [VALIDAR] são placeholders
 * que precisam de confirmação da E-Soluções antes do go-live.
 */
export const siteConfig = {
  name: "E-Soluções",
  legalName: "E-Soluções Desenvolvimento Profissional", // [VALIDAR razão social]
  description:
    "Terceirização de folha de pagamento e engenharia de SST em Recife e região. Departamento pessoal, eSocial e segurança do trabalho operados na mesma casa.",
  url: "https://esolucoes.com.br", // [VALIDAR domínio final]
  locale: "pt-BR",
  address: {
    streetAddress: "Rua Alfredo Coutinho, 95, Poço da Panela",
    addressLocality: "Recife",
    addressRegion: "PE",
    postalCode: "52061-130",
    addressCountry: "BR",
  },
  phone: "+55 81 99607-4906",
  whatsappNumber: "5581996074906",
  email: "contato@esolucoes.com.br", // [VALIDAR e-mail real]
  instagram: {
    handle: "@esolucoesdp",
    url: "https://www.instagram.com/esolucoesdp",
  },
  specialist: {
    name: "Adna Correia",
    role: "Especialista em SST e Departamento Pessoal", // [VALIDAR título]
  },
  hostUrl: "https://host-69e6b3473a.isesmt.com",
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface NavLink {
  label: string;
  href: string;
  /** Tagline curta usada nos blocos de "serviços que se conectam" (hub). */
  blurb?: string;
}

export const serviceLinks: NavLink[] = [
  {
    label: "Departamento Pessoal",
    href: "/servicos/departamento-pessoal",
    blurb: "Folha, eSocial e admissões operados sem retrabalho nem multa.",
  },
  {
    label: "Engenharia de SST",
    href: "/servicos/engenharia-sst",
    blurb: "PGR, PCMSO, LTCAT e laudos dimensionados em campo, com assinatura.",
  },
  {
    label: "Clínica Ocupacional",
    href: "/servicos/clinica-ocupacional",
    blurb: "Exames e PCMSO que nascem do mesmo inventário de riscos do PGR.",
  },
  {
    label: "Serviços Complementares",
    href: "/servicos/complementares",
    blurb: "Perícias, assistência técnica e laudos sob demanda para processos.",
  },
];

export const navLinks: NavLink[] = [
  { label: "Serviços", href: "/servicos/departamento-pessoal" },
  { label: "Treinamentos", href: "/treinamentos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const legalLinks: NavLink[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];
