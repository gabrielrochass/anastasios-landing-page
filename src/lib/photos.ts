/**
 * Registro tipado das fotos do site.
 *
 * Vazio de propósito nesta fase. As fotos do domínio anterior saíram junto com
 * o resto do conteúdo, e as novas ainda não foram baixadas nem tratadas. Toda
 * foto que entrar aqui passa antes pelo processo de docs/IMAGE-SOURCES.md:
 * cortar na proporção do slot, gerar AVIF e WebP em 1x e 2x, e registrar
 * autor, licença e data de download.
 *
 * Enquanto o mapa estiver vazio, os componentes caem no ImageSlot, que reserva
 * a proporção e garante que a troca por foto real não gere CLS.
 *
 * Dois cuidados específicos deste projeto:
 * 1. Metade dos resultados de logística no Unsplash é Unsplash+, que é licença
 *    paga da Getty. Conferir o selo na página da foto antes de baixar.
 * 2. Casco com livery legível de armador (MAERSK, MSC, CMA CGM) não entra.
 *    Licença de foto não é licença de marca, e num site de consultoria isso
 *    sugere uma parceria que não existe.
 */

export interface StockPhoto {
  src: string;
  width: number;
  height: number;
  /** Descritivo, em pt-BR. Obrigatório. */
  alt: string;
  /** Autor e origem, para o CREDITS e para auditoria posterior. */
  credit: string;
  /** Nome curto da licença, como aparece na fonte. */
  license: string;
  /** Página da licença, para quem quiser conferir. */
  licenseUrl: string;
  /** Página do arquivo na origem, não o arquivo direto. */
  sourceUrl: string;
  /** Quando foi baixado, para auditoria. */
  downloadedAt: string;
}

/**
 * Wikimedia Commons e não Unsplash, e por um motivo prático: o Commons publica
 * licença, autor e origem em campo estruturado, consultável por API. No
 * Unsplash a distinção entre a licença livre e o Unsplash+ pago da Getty só
 * aparece como selo na página, que é justamente a armadilha descrita acima.
 */
export const stockPhotos: Record<string, StockPhoto> = {
  "linha-de-producao": {
    src: "/images/linha-de-producao.jpg",
    width: 1000,
    height: 1250,
    alt: "Mão de um operário posicionando um perfil de alumínio em uma máquina de linha de produção, com caixas de peças desfocadas ao fundo.",
    credit: "Shixart1985, via Wikimedia Commons",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Worker_uses_machinery_to_assemble_parts_in_a_factory_setting.jpg",
    downloadedAt: "2026-08-03",
  },
};

export type StockPhotoKey = string;

export function getPhoto(key: StockPhotoKey): StockPhoto | undefined {
  return stockPhotos[key];
}
