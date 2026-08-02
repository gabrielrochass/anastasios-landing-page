"use client";

import { type MotionValue } from "motion/react";
import { Dust } from "./dust";

/**
 * Camadas atmosféricas, do mais barato ao mais caro.
 *
 * A vinheta é estática e existe por um motivo prático além do estético: ela é
 * o seguro de contraste do texto que passa por cima dos planos. Assada aqui,
 * nenhuma combinação de plano claro com texto claro consegue reprovar.
 *
 * O grão é estático de propósito. Animar grão custa um repaint de tela cheia
 * por frame para um efeito que ninguém percebe conscientemente, e ainda é o
 * grande igualador que faz camadas desenhadas em momentos diferentes
 * parecerem a mesma emulsão.
 *
 * Nenhum `filter: blur()` em runtime. Custa de 20 a 40 ms por frame num
 * Snapdragon intermediário, que é o aparelho do público daqui.
 */
export function Atmosphere({ dolly }: { dolly: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Dust dolly={dolly} />

      {/* Vinheta. Seguro de contraste para o texto por cima. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 46%, transparent 32%, rgb(4 7 11 / 0.30) 68%, rgb(4 7 11 / 0.88) 100%)",
        }}
      />

      {/* Grão. Ruído por SVG inline em vez de PNG: nenhuma requisição. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
