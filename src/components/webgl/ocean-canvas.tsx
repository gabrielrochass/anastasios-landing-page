"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import { useViewportGeometry } from "@/hooks/use-viewport-geometry";
import { cn } from "@/lib/utils";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./ocean-shaders";
import { useGlGate } from "./use-gl-gate";

/**
 * Oceano em WebGL2. Monta atrás do conteúdo das seções em modo ocean.
 *
 * Orçamento por geometria. No mobile o dpr trava em 1, a resolução interna cai
 * para 40% e o loop é limitado a 30 fps. O mar é lento, então 30 fps é
 * invisível, e o que se ganha é metade do consumo e do aquecimento num
 * aparelho que o público de fato usa.
 *
 * Se não houver WebGL2, ou se a conexão pedir economia, o canvas simplesmente
 * não monta e fica o fundo sólido da seção. Nenhum caminho de erro, nenhum
 * console sujo, nenhum layout diferente.
 */

interface OceanCanvasProps {
  /** Progresso de 0 a 1 que aquece o mar conforme a travessia avança */
  progress?: MotionValue<number>;
  className?: string;
}

const BUDGET = {
  compact: { dpr: 1, scale: 0.4, minFrameMs: 1000 / 30 },
  wide: { dpr: 1.5, scale: 0.5, minFrameMs: 0 },
} as const;

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function OceanCanvas({ progress, className }: OceanCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const geometry = useViewportGeometry();
  const { enabled, active, freeze } = useGlGate(hostRef);

  // Sempre criado, nunca condicional: hook não pode ficar atrás de um if.
  // Serve de fonte inerte quando a seção não passa progresso.
  const idle = useMotionValue(0);

  // O uniform lê de um ref, não de estado. Scroll não pode causar render.
  useMotionValueEvent(progress ?? idle, "change", (value) => {
    scrollRef.current = value;
  });

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Dois triângulos cobrindo o clip space inteiro.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");

    const budget = BUDGET[geometry];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, budget.dpr);
      // Render abaixo da resolução de tela e deixa o CSS ampliar. O ruído do
      // mar esconde a suavização e o custo de fill cai pela metade.
      const width = Math.max(1, Math.floor(rect.width * ratio * budget.scale));
      const height = Math.max(1, Math.floor(rect.height * ratio * budget.scale));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
    };

    const draw = (seconds: number) => {
      gl.uniform1f(uTime, seconds);
      gl.uniform1f(uScroll, scrollRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let raf = 0;
    let start = 0;
    let lastFrame = 0;

    // Movimento reduzido: um frame, congelado no tempo zero. Mar devagar
    // continua sendo mar para quem tem sensibilidade vestibular.
    if (freeze) {
      draw(0);
      return () => {
        observer.disconnect();
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        gl.deleteBuffer(buffer);
      };
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!start) start = now;
      if (budget.minFrameMs && now - lastFrame < budget.minFrameMs) return;
      lastFrame = now;
      draw((now - start) / 1000);
    };

    if (active) {
      raf = requestAnimationFrame(loop);
    } else {
      // Fora da viewport, desenha o estado atual uma vez e para. Assim a
      // seção nunca aparece preta ao entrar.
      draw(0);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, [enabled, active, freeze, geometry]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden bg-ocean-950", className)}
    >
      {enabled ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : null}
    </div>
  );
}
