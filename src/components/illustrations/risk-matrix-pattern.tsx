const CELL_SIZE = 32;
const CELL_GAP = 6;
const CELL_RX = 3;

export interface LitCell {
  x: number;
  y: number;
  level: "low" | "medium" | "high";
}

export interface RiskMatrixPatternProps {
  rows?: number;
  cols?: number;
  litCells?: LitCell[];
  /** dark = para uso sobre petrol-950; light = sobre fundos claros */
  tone?: "light" | "dark";
  className?: string;
}

const RISK_FILL: Record<"light" | "dark", Record<LitCell["level"], string>> = {
  // Cores sólidas (sobre claro)
  light: { low: "#2e9e4f", medium: "#a67400", high: "#d64545" },
  // Variantes on-dark (sobre petrol-950)
  dark: { low: "#7fd99a", medium: "#ffce6b", high: "#ff9d94" },
};

const BASE_CELL: Record<
  "light" | "dark",
  { fill: string; fillOpacity: number; stroke: string }
> = {
  light: { fill: "#eff6f9", fillOpacity: 1, stroke: "#aed4e3" }, // petrol-50 / petrol-200
  dark: { fill: "#0a2d3b", fillOpacity: 0.4, stroke: "#06384a" }, // petrol-900/40 / petrol-800
};

/**
 * Assinatura visual do site: grade de células quadradas evocando a matriz
 * de risco (probabilidade x severidade) da avaliação de riscos em SST.
 */
export function RiskMatrixPattern({
  rows = 5,
  cols = 5,
  litCells = [],
  tone = "light",
  className,
}: RiskMatrixPatternProps) {
  const width = cols * CELL_SIZE + (cols - 1) * CELL_GAP;
  const height = rows * CELL_SIZE + (rows - 1) * CELL_GAP;
  const base = BASE_CELL[tone];

  const litByPosition = new Map<string, LitCell["level"]>();
  for (const cell of litCells) {
    litByPosition.set(`${cell.x},${cell.y}`, cell.level);
  }

  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const level = litByPosition.get(`${col},${row}`);
      cells.push(
        <rect
          key={`${col}-${row}`}
          x={col * (CELL_SIZE + CELL_GAP)}
          y={row * (CELL_SIZE + CELL_GAP)}
          width={CELL_SIZE}
          height={CELL_SIZE}
          rx={CELL_RX}
          fill={level ? RISK_FILL[tone][level] : base.fill}
          fillOpacity={level ? 0.85 : base.fillOpacity}
          stroke={level ? "none" : base.stroke}
          strokeWidth={1}
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {cells}
    </svg>
  );
}
