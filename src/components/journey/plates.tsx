import type { Plate } from "./dolly-act";

/**
 * Os planos vetoriais dos sete atos.
 *
 * REGRAS DE CONSTRUÇÃO, que não são gosto:
 *
 * 1. Uma grade de perspectiva única para os sete atos. viewBox 0 0 1000 1000,
 *    ponto de fuga em (500, 460), que casa com o transformOrigin de 50% 46%
 *    do dolly. Se um plano for desenhado contra outro ponto, o avanço da
 *    câmera denuncia a inconsistência na hora.
 * 2. Peso de traço constante em unidades de viewBox.
 * 3. Vocabulário geométrico fechado: retângulo, chanfro de 45 graus, arco de
 *    raio único. Nada de curva livre.
 * 4. No máximo três valores por plano: silhueta, meio-tom e luz. Se um plano
 *    precisa de quatro, ele é na verdade dois planos.
 * 5. Nenhum gradiente decorativo. Atmosfera vem das camadas de névoa do
 *    dolly-act, que são cor sólida com opacidade calculada.
 *
 * O último plano de cada ato tem uma REGIÃO ESCURA CENTRAL, e é isso que
 * permite o corte por abertura entre atos: quando o escuro toma o quadro, a
 * troca de cena é invisível porque o olho não tem o que rastrear.
 */

const VP_X = 500;
const VP_Y = 460;

/** Profundidades geométricas, razão perto de 0,7. */
const Z = [12.0, 7.0, 4.0, 2.4, 1.6, 1.1] as const;

const OCEAN_950 = "var(--color-ocean-950)";
const OCEAN_900 = "var(--color-ocean-900)";
const OCEAN_800 = "var(--color-ocean-800)";
const SEA_700 = "var(--color-sea-700)";
const COPPER = "var(--color-copper)";
const MIST = "var(--color-mist)";

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {children}
    </svg>
  );
}

/** Pilha de contêineres em perspectiva, recuando na direção do ponto de fuga. */
function Stack({
  x,
  y,
  w,
  h,
  rows,
  cols,
  fill,
  edge,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
  fill: string;
  edge: string;
}) {
  const cells = [];
  const cw = w / cols;
  const ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * cw}
          y={y + r * ch}
          width={cw - 2}
          height={ch - 2}
          fill={fill}
          stroke={edge}
          strokeWidth={1.5}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}

/* ── Ato 1: chegada ─────────────────────────────────────────────────────── */

export const arrivalPlates: Plate[] = [
  {
    id: "ceu",
    z: Z[0],
    node: (
      <Stage>
        <rect width={1000} height={1000} fill={OCEAN_950} />
        <rect y={VP_Y} width={1000} height={1000 - VP_Y} fill={SEA_700} opacity={0.35} />
        <line x1={0} y1={VP_Y} x2={1000} y2={VP_Y} stroke={OCEAN_800} strokeWidth={2} />
      </Stage>
    ),
  },
  {
    id: "navio-longe",
    z: Z[1],
    node: (
      <Stage>
        {/* Silhueta no horizonte. Só a proporção, nenhum detalhe: a esta
            distância um navio real também é só uma barra. */}
        <rect x={430} y={VP_Y - 26} width={150} height={26} fill={OCEAN_900} />
        <rect x={452} y={VP_Y - 40} width={70} height={16} fill={OCEAN_900} />
      </Stage>
    ),
  },
  {
    id: "casco-medio",
    z: Z[2],
    node: (
      <Stage>
        <path
          d={`M 300 ${VP_Y + 130} L 700 ${VP_Y + 130} L 660 ${VP_Y - 30} L 340 ${VP_Y - 30} Z`}
          fill={OCEAN_900}
          stroke={OCEAN_800}
          strokeWidth={2}
        />
        <Stack x={360} y={VP_Y - 100} w={280} h={70} rows={2} cols={7} fill={OCEAN_950} edge={OCEAN_800} />
        {/* Marca de calado, o único detalhe humano deste plano. */}
        <line x1={318} y1={VP_Y + 90} x2={352} y2={VP_Y + 90} stroke={COPPER} strokeWidth={3} />
      </Stage>
    ),
  },
  {
    id: "proa",
    z: Z[3],
    node: (
      <Stage>
        {/* Proa vista de frente, com o bulbo. O chanfro de 45 graus nos
            ombros é o vocabulário geométrico da regra 3. */}
        <path
          d={`M ${VP_X - 300} 1000 L ${VP_X - 240} ${VP_Y - 60} L ${VP_X - 60} ${VP_Y - 150} L ${VP_X + 60} ${VP_Y - 150} L ${VP_X + 240} ${VP_Y - 60} L ${VP_X + 300} 1000 Z`}
          fill={OCEAN_900}
          stroke={OCEAN_800}
          strokeWidth={2}
        />
        <path
          d={`M ${VP_X - 90} 1000 L ${VP_X - 70} ${VP_Y + 120} L ${VP_X + 70} ${VP_Y + 120} L ${VP_X + 90} 1000 Z`}
          fill={OCEAN_950}
        />
      </Stage>
    ),
  },
  {
    id: "sombra-proa",
    z: Z[5],
    node: (
      <Stage>
        {/* A abertura escura por onde o ato 1 termina. Quando isto toma o
            quadro, o corte para o ato 2 é invisível. */}
        <path
          d={`M 0 1000 L 0 ${VP_Y + 40} L ${VP_X - 150} ${VP_Y - 20} L ${VP_X + 150} ${VP_Y - 20} L 1000 ${VP_Y + 40} L 1000 1000 Z`}
          fill={OCEAN_950}
        />
      </Stage>
    ),
  },
];

/* ── Ato 2: casco e escala ──────────────────────────────────────────────── */

export const hullPlates: Plate[] = [
  {
    id: "parede-casco",
    z: Z[0],
    node: (
      <Stage>
        <rect width={1000} height={1000} fill={OCEAN_900} />
        {/* Chapeamento: fiadas horizontais, o ritmo que dá escala ao casco. */}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={0}
            y1={i * 84}
            x2={1000}
            y2={i * 84}
            stroke={OCEAN_800}
            strokeWidth={1.5}
          />
        ))}
      </Stage>
    ),
  },
  {
    id: "rebites",
    z: Z[2],
    node: (
      <Stage>
        {Array.from({ length: 9 }, (_, r) =>
          Array.from({ length: 11 }, (_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={60 + c * 88}
              cy={70 + r * 108}
              r={3}
              fill={OCEAN_800}
            />
          )),
        )}
      </Stage>
    ),
  },
  {
    id: "abertura-costado",
    z: Z[4],
    node: (
      <Stage>
        {/* O vão por onde se entra. Moldura clara, interior preto. */}
        <rect
          x={VP_X - 210}
          y={VP_Y - 190}
          width={420}
          height={400}
          fill={OCEAN_950}
          stroke={COPPER}
          strokeWidth={3}
        />
      </Stage>
    ),
  },
  {
    id: "entrada",
    z: Z[5],
    node: (
      <Stage>
        <rect
          x={VP_X - 190}
          y={VP_Y - 170}
          width={380}
          height={360}
          fill={OCEAN_950}
        />
      </Stage>
    ),
  },
];

/* ── Atos 3 e 4: convés e corredor ──────────────────────────────────────── */

/**
 * Corredor entre duas pilhas. As linhas convergem para o ponto de fuga, então
 * o avanço da câmera lê como caminhar por um vão real.
 */
function corridorPlates(idPrefix: string, tint: string): Plate[] {
  return [
    {
      id: `${idPrefix}-fundo`,
      z: Z[0],
      node: (
        <Stage>
          <rect width={1000} height={1000} fill={OCEAN_950} />
          <rect x={VP_X - 90} y={VP_Y - 80} width={180} height={170} fill={tint} opacity={0.5} />
        </Stage>
      ),
    },
    {
      id: `${idPrefix}-piso`,
      z: Z[1],
      node: (
        <Stage>
          <path
            d={`M 0 1000 L ${VP_X - 90} ${VP_Y + 90} L ${VP_X + 90} ${VP_Y + 90} L 1000 1000 Z`}
            fill={OCEAN_900}
          />
          {Array.from({ length: 6 }, (_, i) => {
            const t = (i + 1) / 7;
            const y = VP_Y + 90 + (1000 - VP_Y - 90) * t * t;
            const spread = 90 + (VP_X - 90) * t * t;
            return (
              <line
                key={i}
                x1={VP_X - spread}
                y1={y}
                x2={VP_X + spread}
                y2={y}
                stroke={OCEAN_800}
                strokeWidth={1.5}
              />
            );
          })}
        </Stage>
      ),
    },
    {
      id: `${idPrefix}-pilha-esq`,
      z: Z[2],
      node: (
        <Stage>
          <path
            d={`M 0 0 L ${VP_X - 90} ${VP_Y - 80} L ${VP_X - 90} ${VP_Y + 90} L 0 1000 Z`}
            fill={OCEAN_900}
            stroke={OCEAN_800}
            strokeWidth={2}
          />
          <Stack x={20} y={80} w={300} h={620} rows={5} cols={3} fill={OCEAN_950} edge={OCEAN_800} />
        </Stage>
      ),
    },
    {
      id: `${idPrefix}-pilha-dir`,
      z: Z[2] * 0.98,
      node: (
        <Stage>
          <path
            d={`M 1000 0 L ${VP_X + 90} ${VP_Y - 80} L ${VP_X + 90} ${VP_Y + 90} L 1000 1000 Z`}
            fill={OCEAN_900}
            stroke={OCEAN_800}
            strokeWidth={2}
          />
          <Stack x={680} y={80} w={300} h={620} rows={5} cols={3} fill={OCEAN_950} edge={OCEAN_800} />
        </Stage>
      ),
    },
    {
      id: `${idPrefix}-luz`,
      z: Z[3],
      node: (
        <Stage>
          {/* Luminária de corredor. O único acento quente do ato, e o que
              dá direção ao olhar. */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={VP_X - 22}
              y={120 + i * 90}
              width={44}
              height={5}
              fill={COPPER}
              opacity={0.5 + i * 0.16}
            />
          ))}
        </Stage>
      ),
    },
  ];
}

export const deckPlates = corridorPlates("conves", SEA_700);
export const corridorActPlates = corridorPlates("corredor", OCEAN_800);

/* ── Ato 5: a face do contêiner ─────────────────────────────────────────── */

export const doorPlates: Plate[] = [
  {
    id: "parede-fundo",
    z: Z[0],
    node: (
      <Stage>
        <rect width={1000} height={1000} fill={OCEAN_950} />
      </Stage>
    ),
  },
  {
    id: "moldura",
    z: Z[2],
    node: (
      <Stage>
        {/* Cantoneiras: o quadro estrutural do contêiner. As portas de
            verdade são DOM com rotateY, não SVG, porque precisam de
            dobradiça real. */}
        <rect
          x={VP_X - 300}
          y={VP_Y - 230}
          width={600}
          height={480}
          fill="none"
          stroke={OCEAN_800}
          strokeWidth={10}
        />
        {[
          [VP_X - 300, VP_Y - 230],
          [VP_X + 270, VP_Y - 230],
          [VP_X - 300, VP_Y + 220],
          [VP_X + 270, VP_Y + 220],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx} y={cy} width={30} height={30} fill={MIST} opacity={0.25} />
        ))}
      </Stage>
    ),
  },
];

/* ── Ato 6 e 7: manifesto e partida ─────────────────────────────────────── */

export const manifestPlates: Plate[] = [
  {
    id: "interior",
    z: Z[0],
    node: (
      <Stage>
        <rect width={1000} height={1000} fill={OCEAN_950} />
        {/* Nervuras do teto do contêiner, convergindo. */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 1) / 8;
          const y = VP_Y - 260 * (1 - t);
          const spread = 120 + 380 * t;
          return (
            <line
              key={i}
              x1={VP_X - spread}
              y1={y}
              x2={VP_X + spread}
              y2={y}
              stroke={OCEAN_800}
              strokeWidth={1.5}
            />
          );
        })}
      </Stage>
    ),
  },
];

export const departurePlates: Plate[] = [
  {
    id: "porto-noite",
    z: Z[0],
    node: (
      <Stage>
        <rect width={1000} height={1000} fill={OCEAN_950} />
        <rect y={VP_Y + 60} width={1000} height={1000} fill={OCEAN_900} />
        {/* Pórticos do terminal. Silhueta pura, nenhum detalhe. */}
        {[120, 380, 640, 880].map((x, i) => (
          <g key={i}>
            <rect x={x} y={VP_Y - 120} width={6} height={180} fill={OCEAN_800} />
            <rect x={x + 70} y={VP_Y - 120} width={6} height={180} fill={OCEAN_800} />
            <rect x={x} y={VP_Y - 128} width={76} height={8} fill={OCEAN_800} />
            <circle cx={x + 38} cy={VP_Y - 140} r={4} fill={COPPER} opacity={0.7} />
          </g>
        ))}
      </Stage>
    ),
  },
  {
    id: "agua",
    z: Z[3],
    node: (
      <Stage>
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={140 + i * 20}
            y1={VP_Y + 140 + i * 44}
            x2={860 - i * 20}
            y2={VP_Y + 140 + i * 44}
            stroke={COPPER}
            strokeWidth={1.5}
            opacity={0.1 + i * 0.02}
          />
        ))}
      </Stage>
    ),
  },
];
