"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { BEATS } from "./beats";

/**
 * Indicador de progresso da jornada.
 *
 * Existe porque scroll longo sem referência não dá noção de quanto falta, e sem
 * essa noção a pessoa não sabe se vale continuar.
 *
 * A primeira versão era um fio único com os limites das batidas marcados por
 * traço. Ficou com cara de régua, e por um motivo concreto: as batidas têm
 * larguras diferentes (0.145, 0.29, 0.44 e assim por diante), então os traços
 * caíam em espaçamento irregular e leem como erro de alinhamento, não como
 * informação.
 *
 * Aqui são sete segmentos de largura IGUAL. A irregularidade real das batidas
 * não é informação que ajude ninguém, e mostrá-la custava a leitura inteira.
 * Sete pedaços iguais respondem "quanto falta" num relance, que é o trabalho.
 *
 * Segmento vencido fica cheio. O da vez preenche conforme o scroll, então o
 * dedo tem retorno contínuo sem que a peça pareça barra de download.
 *
 * Decorativo para tecnologia assistiva: `aria-hidden`. O estado real vive no
 * `aria-current="step"` de cada batida, que é o mecanismo padrão. Progresso
 * anunciado a cada pixel de scroll é justamente o que atrapalha leitor de tela.
 */

interface JourneyProgressProps {
  progress: MotionValue<number>;
  activeBeat: number;
  reduced: boolean;
}

export function JourneyProgress({
  progress,
  activeBeat,
  reduced,
}: JourneyProgressProps) {
  const beat = BEATS[activeBeat] ?? BEATS[0];

  // Progresso dentro da batida da vez. `scaleX` e não `width`: escala não
  // dispara layout, largura dispara em todo frame de scroll.
  const fill = useTransform(progress, [beat.start, beat.end], [0, 1], {
    clamp: true,
  });

  return (
    <div
      aria-hidden="true"
      // Marca para o probe de medição excluir: os segmentos usam o mesmo óxido
      // do contêiner, e a detecção por saturação os contava como objeto.
      data-journey-progress=""
      /*
       * A posição muda por viewport, e cada uma é a certa para o seu layout.
       *
       * MOBILE, logo abaixo do header: o texto flui para BAIXO a partir de
       * 44svh e o botão flutuante de WhatsApp mora no canto inferior. No rodapé
       * a barra cortava a última linha de <details> e o botão cobria o numeral.
       *
       * DESKTOP, no rodapé: o texto é centrado e o objeto vive à direita, então
       * a faixa de baixo está livre. Ali a barra não disputa com o header.
       *
       * O padding do topo vai como CLASSE e não como style inline: inline vence
       * qualquer variante, então `md:pt-0` não teria efeito e o desktop herdaria
       * a folga do header que só o mobile precisa.
       */
      className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-[calc(4rem+0.875rem+env(safe-area-inset-top))] sm:px-6 md:top-auto md:bottom-0 md:pt-0 md:pb-7"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
        <div className="flex flex-1 items-center gap-1.5">
          {BEATS.map((b, i) => (
            <div
              key={b.id}
              className="h-0.5 flex-1 overflow-hidden rounded-full bg-rule"
            >
              {i < activeBeat && <div className="h-full w-full bg-accent" />}
              {i === activeBeat &&
                (reduced ? (
                  // Sob movimento reduzido o segmento da vez fica cheio em vez
                  // de acompanhar o scroll: acompanhar é animação contínua.
                  <div className="h-full w-full bg-accent" />
                ) : (
                  <m.div
                    className="h-full w-full origin-left bg-accent"
                    style={{ scaleX: fill }}
                  />
                ))}
            </div>
          ))}
        </div>

        <span className="shrink-0 font-mono text-[10px] tabular-stat tracking-[0.14em] text-content-muted">
          {String(activeBeat + 1).padStart(2, "0")}
          <span className="opacity-45">
            /{String(BEATS.length).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}
