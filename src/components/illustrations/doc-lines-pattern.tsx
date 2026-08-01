export interface DocLinesPatternProps {
  tone?: "light" | "dark";
  className?: string;
}

const LINE_FILL: Record<"light" | "dark", string> = {
  light: "#aed4e3", // petrol-200
  dark: "#06384a", // petrol-800
};

// Grupo de 3 linhas de larguras diferentes, como texto de documento.
const LINES: ReadonlyArray<{ y: number; width: number }> = [
  { y: 12, width: 96 },
  { y: 26, width: 68 },
  { y: 40, width: 84 },
];

const TILE_WIDTH = 128;
const TILE_HEIGHT = 72;
const LINE_HEIGHT = 4;
const LINE_RX = 2;

/**
 * Pattern de linhas de documento — domínio DP (departamento pessoal).
 */
export function DocLinesPattern({
  tone = "light",
  className,
}: DocLinesPatternProps) {
  const patternId = `doc-lines-pattern-${tone}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern
          id={patternId}
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          patternUnits="userSpaceOnUse"
        >
          {LINES.map((line) => (
            <rect
              key={line.y}
              x={8}
              y={line.y}
              width={line.width}
              height={LINE_HEIGHT}
              rx={LINE_RX}
              fill={LINE_FILL[tone]}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
