"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";

/**
 * Poeira em suspensão, num canvas.
 *
 * É o efeito de melhor relação custo-benefício da jornada inteira: cerca de
 * 0,4 ms por frame, e nada vende movimento para frente com tanta força.
 *
 * O truque é que a velocidade das partículas é ligada ao DELTA do dolly, não
 * ao tempo. As motas expandem radialmente para fora do ponto de fuga, o que é
 * exatamente o que acontece quando você atravessa uma nuvem de poeira. Poeira
 * que cai devagar sozinha lê como neve e destrói a sensação de avanço.
 *
 * O sprite é desenhado UMA vez num canvas offscreen. `drawImage` é muito mais
 * barato que `arc()` seguido de `fill()` por partícula por frame.
 */

const SPRITE_SIZE = 24;

export function Dust({ dolly }: { dolly: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    // Sprite: um gradiente radial, desenhado uma vez.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const half = SPRITE_SIZE / 2;
    const gradient = sctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(226,236,246,0.95)");
    gradient.addColorStop(0.4, "rgba(196,214,232,0.28)");
    gradient.addColorStop(1, "rgba(196,214,232,0)");
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

    // Orçamento: DPR travado e metade das partículas em ponteiro grosso,
    // que é a heurística mais confiável para "isto é um celular".
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fine = window.matchMedia("(pointer: fine)").matches;
    const count = fine ? 140 : 60;

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // z entre 0,2 e 1. Mota próxima é maior, mais brilhante e mais rápida.
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 0.00018,
    }));

    let raf = 0;
    let last = performance.now();
    let running = true;
    let previousDolly = dolly.get();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      const dt = Math.min(now - last, 48);
      last = now;

      const current = dolly.get();
      const delta = current - previousDolly;
      previousDolly = current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        // Expansão radial a partir do ponto de fuga. Divide por z para que a
        // mota próxima passe mais rápido, que é o gradiente de paralaxe.
        const dx = p.x - 0.5;
        const dy = p.y - 0.46;
        const push = (delta * 2.4) / p.z;
        p.x += dx * push + p.drift * dt;
        p.y += dy * push + (0.000012 * dt) / p.z;

        if (p.x < -0.15 || p.x > 1.15 || p.y < -0.15 || p.y > 1.15) {
          // Renasce perto do ponto de fuga, como se viesse de longe.
          p.x = 0.42 + Math.random() * 0.16;
          p.y = 0.38 + Math.random() * 0.16;
          p.z = 0.2 + Math.random() * 0.8;
        }

        const size = 2 + 9 * (1 - p.z);
        ctx.globalAlpha = 0.1 + 0.42 * (1 - p.z);
        ctx.drawImage(
          sprite,
          p.x * width - size / 2,
          p.y * height - size / 2,
          size,
          size,
        );
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(loop);

    // Pausa fora da viewport e com a aba escondida. rAF rodando atrás da dobra
    // é imposto de INP e de bateria pago por todo mundo.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dolly, reduced]);

  // Sob movimento reduzido a poeira não monta. Não é atenuada, não existe.
  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
