import type { IconProps } from "./icon-props";

export function IconBalanca({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3.5v17M8 20.5h8" />
      <path d="M6 6h12" />
      <path d="M2.5 9.5a3.5 3.5 0 0 0 7 0M14.5 9.5a3.5 3.5 0 0 0 7 0" />
    </svg>
  );
}
