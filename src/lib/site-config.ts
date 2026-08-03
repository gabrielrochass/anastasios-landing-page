/**
 * Dados centrais do site. Valores marcados com [CONFIRMAR] são placeholders que
 * precisam de confirmação do cliente antes do go-live, e são bloqueados pelo
 * scripts/check-config.mjs.
 *
 * Enquadramento jurídico da copy, que vale para todo texto do site:
 * a H H Brasil coordena, homologa, negocia e responde pelo resultado. Ela NÃO
 * é despachante aduaneiro credenciado e não registra DUIMP em nome próprio.
 * Nunca escrever "desembaraçamos", "somos despachante" ou "nossa trading".
 */
export const siteConfig = {
  name: "H H Brasil",
  legalName: "H H Brasil Ltda.",
  cnpj: "28.415.496/0001-83",
  description:
    "Consultoria de sourcing e gestão de risco em comércio exterior. Homologação de fornecedores na China, Índia e Leste Europeu, estruturação tributária e financiamento de 90 a 120 dias do B/L.",
  url: "https://hhbrasil.com.br", // [CONFIRMAR domínio final]
  locale: "pt-BR",
  address: {
    streetAddress: "Rua Bernardo dos Santos, 10, Conjunto G262",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "05542-000",
    addressCountry: "BR",
  },
  phone: "+55 11 98561-3776",
  whatsappNumber: "5511985613776",
  /**
   * Contato acontece só por WhatsApp. Não há e-mail transacional nem
   * formulário que envia para servidor, então nenhum dado pessoal é
   * armazenado pelo site.
   */
  specialist: {
    name: "Anastasios", // [CONFIRMAR nome completo]
    role: "Sourcing e gestão de risco em comércio exterior",
  },
  /** Anos de mercado, na palavra do próprio cliente. [CONFIRMAR: o PDF da proposta diz 19] */
  years: {
    brazil: 23,
    foreignTrade: 22,
  },
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface NavLink {
  label: string;
  href: string;
}

/**
 * A landing é uma página só. A navegação são âncoras, mais o Painel de
 * Inteligência, que é a única rota separada.
 */
export const navLinks: NavLink[] = [
  // Apontava para /#travessia, id que não existe em lugar nenhum. A âncora de
  // batida também não serve: as batidas são `absolute` dentro de um `sticky`,
  // então todas resolvem para a mesma posição de documento, o topo do track.
  { label: "A operação", href: "/#cadeia" },
  { label: "Crédito", href: "/#credito" },
  { label: "Tributário", href: "/#tributario" },
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "Inteligência", href: "/blog" },
];

export const legalLinks: NavLink[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];
