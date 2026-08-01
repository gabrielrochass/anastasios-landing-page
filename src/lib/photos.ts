/**
 * Fotos de stock curado (interino) — licença livre comercial, sem atribuição
 * obrigatória (Unsplash/Pexels; ver docs/IMAGE-SOURCES.md). São tapa-buraco
 * até a sessão de fotos própria: NÃO usar em contexto que sugira serem
 * funcionários/pacientes/clientes reais da E-Soluções. `alt` sempre descritivo.
 */
export interface StockPhoto {
  src: string;
  alt: string;
  credit: string;
}

export const stockPhotos = {
  "sst-trabalhador-metal": {
    src: "/images/photos/sst-trabalhador-metal.jpg",
    alt: "Trabalhador com capacete e EPI manuseando peça metálica em ambiente industrial",
    credit: "Unsplash",
  },
  "sst-trabalhador-colete": {
    src: "/images/photos/sst-trabalhador-colete.jpg",
    alt: "Trabalhador com colete refletivo e capacete branco em obra",
    credit: "Unsplash",
  },
  "clinica-medica-luvas": {
    src: "/images/photos/clinica-medica-luvas.jpg",
    alt: "Médica de luvas e máscara registrando informações durante exame",
    credit: "Pexels",
  },
  "sst-soldador": {
    src: "/images/photos/sst-soldador.jpg",
    alt: "Soldador em atividade com equipamento de proteção em ambiente industrial",
    credit: "Unsplash",
  },
  "sst-capacetes-rack": {
    src: "/images/photos/sst-capacetes-rack.jpg",
    alt: "Fileira de capacetes de segurança amarelos organizados em suporte",
    credit: "Unsplash",
  },
  "sst-capacetes-parede": {
    src: "/images/photos/sst-capacetes-parede.jpg",
    alt: "Coleção de capacetes de segurança pendurados na parede de um canteiro",
    credit: "Pexels",
  },
  "sst-trabalhadores": {
    src: "/images/photos/sst-trabalhadores.jpg",
    alt: "Equipe de trabalhadores com capacetes amarelos em canteiro de obras",
    credit: "Pexels",
  },
  "clinica-pressao": {
    src: "/images/photos/clinica-pressao.jpg",
    alt: "Aferição de pressão arterial durante exame ocupacional",
    credit: "Unsplash",
  },
  "clinica-otoscopia": {
    src: "/images/photos/clinica-otoscopia.jpg",
    alt: "Mãos com luvas realizando exame de audição em close",
    credit: "Pexels",
  },
  "clinica-estetoscopio": {
    src: "/images/photos/clinica-estetoscopio.jpg",
    alt: "Profissional de saúde segurando um estetoscópio",
    credit: "Unsplash",
  },
  "clinica-prancheta": {
    src: "/images/photos/clinica-prancheta.jpg",
    alt: "Profissional de branco registrando informações em prancheta",
    credit: "Pexels",
  },
  "dp-calculadora": {
    src: "/images/photos/dp-calculadora.jpg",
    alt: "Calculadora e caneta sobre relatório com números",
    credit: "Pexels",
  },
  "dp-documentos": {
    src: "/images/photos/dp-documentos.jpg",
    alt: "Documentos fiscais, notas e calculadora sobre mesa de trabalho",
    credit: "Pexels",
  },
  "dp-escritorio": {
    src: "/images/photos/dp-escritorio.jpg",
    alt: "Equipe analisando relatórios e gráficos sobre a mesa de trabalho",
    credit: "Pexels",
  },
  "sst-industria": {
    src: "/images/photos/sst-industria.jpg",
    alt: "Trabalhadora com capacete e óculos de proteção operando em ambiente industrial",
    credit: "Pexels",
  },
  "sst-capacetes-fila": {
    src: "/images/photos/sst-capacetes-fila.jpg",
    alt: "Fileira de capacetes de segurança amarelos",
    credit: "Unsplash",
  },
  "clinica-medico-paciente": {
    src: "/images/photos/clinica-medico-paciente.jpg",
    alt: "Profissional de saúde medindo a pressão de um paciente em consulta",
    credit: "Unsplash",
  },
  "clinica-profissional": {
    src: "/images/photos/clinica-profissional.jpg",
    alt: "Profissional de saúde de jaleco com estetoscópio",
    credit: "Pexels",
  },
} as const;

export type StockPhotoKey = keyof typeof stockPhotos;

/** Pool de capas de SST — variadas por post para não repetir a mesma foto. */
const sstCoverPool: StockPhotoKey[] = [
  "sst-soldador",
  "sst-trabalhador-metal",
  "sst-industria",
  "sst-capacetes-rack",
  "sst-trabalhador-colete",
];

/**
 * Hash FNV-1a 32-bit — espalha bem strings curtas (slugs). O hash polinomial
 * *31 anterior colidia (pgr e cipa caíam na mesma capa); este separa os slugs
 * publicados de SST em índices distintos do pool.
 */
function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Foto de capa de artigo por domínio (tags/nrs), interina até arte própria.
 * Para posts de SST (a maioria), varia a capa de forma determinística pelo
 * `seed` (slug do post) para não repetir a mesma imagem na listagem.
 */
export function blogCoverPhoto(tags: string[], seed = ""): StockPhotoKey {
  if (tags.includes("clínica ocupacional")) return "clinica-estetoscopio";
  if (tags.includes("departamento pessoal")) return "dp-calculadora";
  if (tags.some((t) => t.includes("perícia") || t.includes("laudo")))
    return "sst-capacetes-parede";
  return sstCoverPool[fnv1a(seed) % sstCoverPool.length];
}
