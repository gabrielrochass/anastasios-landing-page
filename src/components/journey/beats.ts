/**
 * As sete batidas da jornada.
 *
 * As faixas são contíguas e cobrem 0 a 1 sem buraco. Isso é requisito, não
 * estética: a batida ativa é derivada da posição do scroll como função pura, e
 * um buraco entre faixas produziria um estado indefinido no meio da página.
 *
 * Todo `end` fica dentro de [0, 1]. Já tentei 1.001 na última batida para o
 * intervalo incluir o 1.0 exato, e isso quebrou: o mesmo valor vira offset de
 * keyframe no Web Animations API, que rejeita qualquer coisa acima de 1 com
 * "Offsets must be null or in the range [0,1]". A inclusão do extremo é
 * tratada na resolução da batida, que é onde o problema de fato mora.
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
  { id: "partida", start: 0.885, end: 1.0, label: "Partida" },
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
 *
 * Já foi 220, que dava 1540svh de track, ou seja quinze telas de scroll para
 * ler sete ideias. Cansava, e cansaço não é imersão.
 *
 * 130 corta o track para 910svh, 41% menos. Mas encurtar o track NÃO encurta o
 * caminho da câmera, então a velocidade por pixel de scroll sobe na mesma
 * proporção, e movimento rápido é exatamente o que causa desconforto
 * vestibular. Por isso a redução vem acompanhada de corte no percurso da
 * câmera em `camera-path.ts`, e não sozinha.
 */
export const BEAT_HEIGHT_SVH = 130;
export const BEAT_HEIGHT_SVH_REDUCED = 100;

/** Converte progresso global (0 a 1) em progresso local de uma batida. */
export function localProgress(global: number, beat: Beat): number {
  const span = beat.end - beat.start;
  if (span <= 0) return 0;
  return Math.min(Math.max((global - beat.start) / span, 0), 1);
}
