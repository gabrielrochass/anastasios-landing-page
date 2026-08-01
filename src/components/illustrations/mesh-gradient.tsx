export interface MeshGradientProps {
  variant?: "petrol" | "petrol-orange";
  /** 3 composições fixas de blobs — determinístico para SSR */
  seed?: 1 | 2 | 3;
  className?: string;
}

interface Blob {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

// Três arranjos hardcoded (sem Math.random — determinístico para SSR)
const COMPOSITIONS: Record<1 | 2 | 3, [Blob, Blob, Blob]> = {
  1: [
    { cx: 170, cy: 150, rx: 290, ry: 230 },
    { cx: 650, cy: 470, rx: 310, ry: 240 },
    { cx: 540, cy: 90, rx: 220, ry: 170 },
  ],
  2: [
    { cx: 620, cy: 130, rx: 300, ry: 220 },
    { cx: 130, cy: 480, rx: 280, ry: 250 },
    { cx: 420, cy: 320, rx: 200, ry: 160 },
  ],
  3: [
    { cx: 400, cy: 560, rx: 340, ry: 230 },
    { cx: 120, cy: 110, rx: 260, ry: 210 },
    { cx: 700, cy: 240, rx: 210, ry: 180 },
  ],
};

// petróleo domina; laranja é acento raro (1 blob no máximo)
const PETROL_FILLS: [string, string, string] = ["#7db8cf", "#1d7594", "#aed4e3"]; // petrol-300/500/200
const ORANGE_ACCENT = "#ffab70"; // orange-300 — substitui UMA elipse

/**
 * Fundo orgânico para slots de imagem: 3 blobs desfocados sobre petrol-100.
 */
export function MeshGradient({
  variant = "petrol",
  seed = 1,
  className,
}: MeshGradientProps) {
  const blobs = COMPOSITIONS[seed];
  const fills: [string, string, string] =
    variant === "petrol-orange"
      ? [PETROL_FILLS[0], PETROL_FILLS[1], ORANGE_ACCENT]
      : PETROL_FILLS;
  const filterId = `mesh-gradient-blur-${variant}-${seed}`;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <filter
          id={filterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation={60} />
        </filter>
      </defs>
      <rect width={800} height={600} fill="#d9eaf1" /> {/* petrol-100 */}
      <g filter={`url(#${filterId})`}>
        {blobs.map((blob, index) => (
          <ellipse
            key={index}
            cx={blob.cx}
            cy={blob.cy}
            rx={blob.rx}
            ry={blob.ry}
            fill={fills[index]}
          />
        ))}
      </g>
    </svg>
  );
}
