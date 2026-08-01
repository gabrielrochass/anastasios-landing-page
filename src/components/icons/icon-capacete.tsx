import type { IconProps } from "./icon-props";

export function IconCapacete({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 15v-2a7.5 7.5 0 0 1 15 0v2" />
      <path d="M2.5 15h19" />
      <path d="M12 5.5V9" />
    </svg>
  );
}
