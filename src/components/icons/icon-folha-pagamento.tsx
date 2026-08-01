import type { IconProps } from "./icon-props";

export function IconFolhaPagamento({ size = 24, ...props }: IconProps) {
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
      <path d="M14.5 7H11.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H9.5" />
      <path d="M12 5.5v9" />
      <path d="M9 16.5h6M9 19h6" />
    </svg>
  );
}
