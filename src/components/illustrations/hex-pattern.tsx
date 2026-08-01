export interface HexPatternProps {
  tone?: "light" | "dark";
  className?: string;
}

const STROKE: Record<"light" | "dark", string> = {
  light: "#aed4e3", // petrol-200
  dark: "#06384a", // petrol-800
};

// Hexágono pointy-top de lado 16: tile de 27.7128 x 48 (√3·s x 3·s).
// 5 subpaths (hex central + vizinhos parciais) para tesselar sem emendas.
const HEX_TILE_WIDTH = 27.7128;
const HEX_TILE_HEIGHT = 48;
const HEX_PATH = [
  "M13.8564 0 L27.7128 8 L27.7128 24 L13.8564 32 L0 24 L0 8 Z",
  "M0 24 L13.8564 32 L13.8564 48 L0 56 L-13.8564 48 L-13.8564 32 Z",
  "M27.7128 24 L41.5692 32 L41.5692 48 L27.7128 56 L13.8564 48 L13.8564 32 Z",
  "M0 -24 L13.8564 -16 L13.8564 0 L0 8 L-13.8564 0 L-13.8564 -16 Z",
  "M27.7128 -24 L41.5692 -16 L41.5692 0 L27.7128 8 L13.8564 0 L13.8564 -16 Z",
].join(" ");

/**
 * Pattern de hexágonos em outline — domínio clínica/moléculas.
 */
export function HexPattern({ tone = "light", className }: HexPatternProps) {
  const patternId = `hex-pattern-${tone}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern
          id={patternId}
          width={HEX_TILE_WIDTH}
          height={HEX_TILE_HEIGHT}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={HEX_PATH}
            fill="none"
            stroke={STROKE[tone]}
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
