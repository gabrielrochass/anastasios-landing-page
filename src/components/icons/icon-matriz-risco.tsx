import type { IconProps } from "./icon-props";

export function IconMatrizRisco({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x={3} y={3} width={18} height={18} rx={1.5} />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      <rect
        x={16.5}
        y={4.5}
        width={3}
        height={3}
        rx={0.5}
        fill="currentColor"
        stroke="none"
      />
      <rect
        x={10.5}
        y={10.5}
        width={3}
        height={3}
        rx={0.5}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
