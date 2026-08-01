"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";
import { useViewportGeometry, type Geometry } from "@/hooks/use-viewport-geometry";
import { cn } from "@/lib/utils";

/**
 * O navio percorrendo a rota conforme o scroll. É a peça-assinatura do site.
 *
 * Duas geometrias, um componente. Em `wide` a rota atravessa a largura. Em
 * `compact` ela desce em serpentina pela coluna de conteúdo, e o navio desce
 * junto com o polegar, o que faz o gesto de scroll e a direção do navio virarem
 * o mesmo movimento. Não é fallback de mobile, é a geometria certa para a tela.
 *
 * `offset-path` do CSS resolveria a posição e a tangente de graça, mas as
 * coordenadas de `path()` são pixels CSS e não unidades do viewBox, então a
 * rota quebraria em layout responsivo. Daí o getPointAtLength na mão.
 *
 * Custo por frame: 3 leituras de getPointAtLength e UMA escrita de transform.
 * Nada de setState, que renderizaria o React 60 vezes por segundo.
 */

interface RouteGeometry {
  viewBox: string;
  d: string;
  /** Onde o rótulo do waypoint se ancora em relação ao ponto */
  labelAnchor: "start" | "middle";
  labelOffset: { x: number; y: number };
  shipScale: number;
}

const ROUTES: Record<Geometry, RouteGeometry> = {
  wide: {
    viewBox: "0 0 1200 420",
    d: "M 60 300 C 220 300 260 120 420 132 S 640 300 800 246 S 1020 92 1140 116",
    labelAnchor: "middle",
    labelOffset: { x: 0, y: -26 },
    shipScale: 1,
  },
  compact: {
    viewBox: "0 0 120 1400",
    d: "M 60 30 C 96 150 24 250 60 370 C 96 490 24 590 60 710 C 96 830 24 930 60 1050 C 96 1170 24 1270 60 1370",
    labelAnchor: "start",
    labelOffset: { x: 22, y: 5 },
    shipScale: 1.5,
  },
};

/**
 * Serpentina vertical gerada a partir da altura real da coluna.
 *
 * Um path fixo esticado por preserveAspectRatio deformaria o navio junto. Como
 * o viewBox é montado com a altura medida em pixels, a proporção fica 1:1 e o
 * casco continua redondo em qualquer comprimento de seção.
 */
export function serpentinePath(height: number, width: number, cycles = 4): string {
  const center = width / 2;
  const amplitude = width * 0.38;
  const segment = height / cycles;

  let d = `M ${center} 0`;
  for (let i = 0; i < cycles; i++) {
    const top = i * segment;
    d +=
      ` C ${center + amplitude} ${top + segment * 0.25}` +
      ` ${center - amplitude} ${top + segment * 0.75}` +
      ` ${center} ${top + segment}`;
  }
  return d;
}

interface ShipRouteProps {
  /** Progresso de 0 a 1. Quem controla o scroll é a seção, não este componente. */
  progress: MotionValue<number>;
  /** Rótulos dos waypoints, na ordem. Distribuídos igualmente ao longo da rota. */
  waypoints: string[];
  /** Substitui a geometria preset. Usado pela serpentina medida em runtime. */
  route?: RouteGeometry;
  /** Esconde os rótulos quando a coluna é estreita demais para caber texto. */
  hideLabels?: boolean;
  className?: string;
}

export function ShipRoute(props: ShipRouteProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ShipRouteInner {...props} />
      </MotionConfig>
    </LazyMotion>
  );
}

function ShipRouteInner({
  progress,
  waypoints,
  route: routeOverride,
  hideLabels = false,
  className,
}: ShipRouteProps) {
  const geometry = useViewportGeometry();
  const route = routeOverride ?? ROUTES[geometry];
  const reduced = useReducedMotion();

  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const lengthRef = useRef(0);

  // Posições dos waypoints são derivadas do próprio path, então ficam sempre
  // exatamente em cima da linha, em qualquer geometria. Nada de coordenada
  // hardcoded que sai do lugar quando a curva muda.
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  const stops = useMemo(
    () =>
      waypoints.map((_, index) =>
        waypoints.length === 1 ? 1 : index / (waypoints.length - 1),
      ),
    [waypoints],
  );

  // Amortece o scroll cru, mas só quando movimento é bem-vindo. Sob movimento
  // reduzido o navio anda exatamente o que o usuário rolou, sem inércia.
  const smooth = useSpring(progress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.0005,
  });
  const driver = reduced ? progress : smooth;

  const place = useCallback((value: number) => {
    const path = pathRef.current;
    const ship = shipRef.current;
    const total = lengthRef.current;
    if (!path || !ship || !total) return;

    const distance = Math.min(Math.max(value, 0), 1) * total;
    const point = path.getPointAtLength(distance);

    // SVG não tem getTangentAtLength. Diferença finita, travada nas pontas
    // para o ângulo não pular no começo e no fim da rota.
    const epsilon = Math.min(2, total * 0.001);
    const before = path.getPointAtLength(Math.max(distance - epsilon, 0));
    const after = path.getPointAtLength(Math.min(distance + epsilon, total));
    const degrees =
      (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;

    ship.setAttribute(
      "transform",
      `translate(${point.x} ${point.y}) rotate(${degrees})`,
    );
  }, []);

  // Remedir na troca de geometria. O viewBox muda, logo o comprimento muda.
  // Fica no efeito, nunca no frame de scroll.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    lengthRef.current = path.getTotalLength();
    setPoints(
      stops.map((stop) => {
        const p = path.getPointAtLength(stop * lengthRef.current);
        return { x: p.x, y: p.y };
      }),
    );
    // Reposiciona já na geometria nova, senão o navio fica no lugar antigo
    // até o próximo evento de scroll.
    place(reduced ? 1 : driver.get());
  }, [route.d, route.viewBox, stops, place, driver, reduced]);

  useMotionValueEvent(driver, "change", place);

  const scale = route.shipScale;

  return (
    <svg
      viewBox={route.viewBox}
      className={cn("h-full w-full overflow-visible", className)}
      aria-hidden
      focusable="false"
    >
      {/* Rota não percorrida */}
      <path
        ref={pathRef}
        d={route.d}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="5 9"
        className="stroke-rule-strong"
      />

      {/* Rota percorrida. pathLength normalizado de 0 a 1 deixa o motion
          cuidar do strokeDasharray sem ninguém medir nada. */}
      <m.path
        d={route.d}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-accent"
        style={{ pathLength: reduced ? 1 : driver }}
      />

      {points.map((point, index) => (
        <Waypoint
          key={waypoints[index]}
          label={hideLabels ? null : waypoints[index]}
          x={point.x}
          y={point.y}
          stop={stops[index]}
          driver={driver}
          reduced={reduced}
          anchor={route.labelAnchor}
          offset={route.labelOffset}
        />
      ))}

      <g ref={shipRef}>
        {/* O balanço vive num <g> aninhado, então nunca disputa a propriedade
            transform com o posicionamento do scroll. */}
        <g className="motion-safe:animate-bob origin-center">
          <g transform={`scale(${scale})`}>
            {/* Vista de topo: o casco lê certo em qualquer rotação, o que
                importa porque em compact a tangente aponta para baixo. */}
            <path
              d="M 15 0 L 5 5.5 L -11 5.5 L -14 3 L -14 -3 L -11 -5.5 L 5 -5.5 Z"
              className="fill-accent"
            />
            <rect
              x={-6}
              y={-2.5}
              width={7}
              height={5}
              rx={0.5}
              className="fill-surface"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

interface WaypointProps {
  label: string | null;
  x: number;
  y: number;
  stop: number;
  driver: MotionValue<number>;
  reduced: boolean;
  anchor: "start" | "middle";
  offset: { x: number; y: number };
}

function Waypoint({
  label,
  x,
  y,
  stop,
  driver,
  reduced,
  anchor,
  offset,
}: WaypointProps) {
  const [passed, setPassed] = useState(false);

  // Estado booleano por waypoint, não valor contínuo: são no máximo 6
  // atualizações na página inteira, e só quando o navio cruza o ponto.
  useMotionValueEvent(driver, "change", (value) => {
    const next = value >= stop - 0.001;
    setPassed((current) => (current === next ? current : next));
  });

  const lit = reduced || passed;

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={lit ? 5 : 3}
        className={cn(
          "transition-all duration-200",
          lit ? "fill-accent" : "fill-surface stroke-rule-strong",
        )}
        strokeWidth={1.5}
      />
      {label ? (
        <text
          x={x + offset.x}
          y={y + offset.y}
          textAnchor={anchor}
          className={cn(
            "font-mono text-[11px] uppercase tracking-widest transition-opacity duration-200",
            lit ? "fill-content opacity-100" : "fill-content-muted opacity-60",
          )}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}
