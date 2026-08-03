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
 * Em tinta, nunca em acento. Ver o comentário no corpo.
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
        {/*
          Fio de 1px e tinta, não acento.

          A versão anterior usava `bg-accent` em segmentos de 2px, e o acento é
          a cor mais alta do sistema, reservada para o que pede ação. Numa barra
          que fica na tela durante 910svh inteiros, isso competia com a headline
          e com o botão. Indicador é cromo: informa e sai da frente.

          Vencido em tinta a 45%, o da vez em tinta cheia, o que falta no fio.
          Três valores da MESMA cor, então a barra lê como uma coisa só em vez
          de três.
        */}
        <div className="flex flex-1 items-center gap-2">
          {BEATS.map((b, i) => (
            <div key={b.id} className="bg-rule h-px flex-1 overflow-hidden">
              {i < activeBeat && (
                <div className="bg-content h-full w-full opacity-45" />
              )}
              {i === activeBeat &&
                (reduced ? (
                  // Sob movimento reduzido o segmento da vez fica cheio em vez
                  // de acompanhar o scroll: acompanhar é animação contínua.
                  <div className="bg-content h-full w-full" />
                ) : (
                  <m.div
                    className="bg-content h-full w-full origin-left"
                    style={{ scaleX: fill }}
                  />
                ))}
            </div>
          ))}
        </div>

        <span className="tabular-stat text-content-muted eyebrow shrink-0 opacity-70">
          {String(activeBeat + 1).padStart(2, "0")}
          <span className="opacity-50">
            /{String(BEATS.length).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}
