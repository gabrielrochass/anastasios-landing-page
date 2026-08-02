/**
 * As sete batidas da jornada.
 *
 * As faixas são contíguas e cobrem 0 a 1 sem buraco. Isso é requisito, não
 * estética: a batida ativa é derivada da posição do scroll como função pura, e
 * um buraco entre faixas produziria um estado indefinido no meio da página.
 *
 * O último `end` é 1.001 de propósito, para o topo do intervalo incluir
 * exatamente 1.0 quando o usuário chega ao fim.
 */

export interface Beat {
  id: string;
  /** Início da faixa de progresso, inclusive. */
  start: number;
  /** Fim da faixa, exclusive. */
  end: number;
  /** Rótulo curto, usado no indicador de progresso e no sumário navegável. */
  label: string;
}

export const BEATS = [
  { id: "chegada", start: 0.0, end: 0.145, label: "Chegada" },
  { id: "casco", start: 0.145, end: 0.29, label: "Escala" },
  { id: "conves", start: 0.29, end: 0.44, label: "A bordo" },
  { id: "corredor", start: 0.44, end: 0.575, label: "Corredor" },
  { id: "abertura", start: 0.575, end: 0.735, label: "Abertura" },
  { id: "manifesto", start: 0.735, end: 0.885, label: "Manifesto" },
  { id: "partida", start: 0.885, end: 1.001, label: "Partida" },
] as const satisfies readonly Beat[];

export type BeatId = (typeof BEATS)[number]["id"];

/**
 * Altura do track por batida, em svh.
 *
 * `svh` e nunca `vh` nem `dvh`. O `vh` ignora a barra de URL do mobile, e o
 * `dvh` redimensiona durante o scroll, que gera CLS e jank justamente no
 * Android intermediário que é o público daqui.
 *
 * Sob movimento reduzido o track colapsa para uma tela por batida: sete telas
 * de planos estáticos empilhados, mesma ordem, mesma copy, um sétimo do
 * scroll.
 */
export const BEAT_HEIGHT_SVH = 220;
export const BEAT_HEIGHT_SVH_REDUCED = 100;

/** Converte progresso global (0 a 1) em progresso local de uma batida. */
export function localProgress(global: number, beat: Beat): number {
  const span = beat.end - beat.start;
  if (span <= 0) return 0;
  return Math.min(Math.max((global - beat.start) / span, 0), 1);
}
