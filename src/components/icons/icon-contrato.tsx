import type { IconProps } from "./icon-props";

export function IconContrato({ size = 24, ...props }: IconProps) {
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
      <rect x={5} y={2.5} width={14} height={19} rx={2} />
      <path d="M8.5 7h7M8.5 10.5h4.5" />
      <path d="M8 17.5q1-1.5 2 0t2 0t2 0t2 0" />
    </svg>
  );
}
