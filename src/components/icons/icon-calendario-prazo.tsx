import type { IconProps } from "./icon-props";

export function IconCalendarioPrazo({ size = 24, ...props }: IconProps) {
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
      <rect x={3.5} y={4.5} width={17} height={16} rx={2} />
      <path d="M8 2.5v4M16 2.5v4" />
      <path d="M3.5 10h17" />
      <rect
        x={14}
        y={12.5}
        width={3}
        height={3}
        rx={0.5}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
