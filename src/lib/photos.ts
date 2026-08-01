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
  /** Descritivo, em pt-BR. Obrigatório. */
  alt: string;
  /** Autor e origem, para o CREDITS e para auditoria posterior. */
  credit: string;
}

export const stockPhotos: Record<string, StockPhoto> = {};

export type StockPhotoKey = string;

export function getPhoto(key: StockPhotoKey): StockPhoto | undefined {
  return stockPhotos[key];
}
