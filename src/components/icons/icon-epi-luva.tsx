import type { IconProps } from "./icon-props";

export function IconEpiLuva({ size = 24, ...props }: IconProps) {
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
      <path d="M6 21V7a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 16 7v2.5l3.3-1.2a1.4 1.4 0 0 1 1 2.6L16 12.5V21Z" />
      <path d="M8.5 4.75V10M11 4.5v6M13.5 4.75V10" />
      <path d="M6 17.5h10" />
    </svg>
  );
}
