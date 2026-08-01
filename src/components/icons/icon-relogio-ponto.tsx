import type { IconProps } from "./icon-props";

export function IconRelogioPonto({ size = 24, ...props }: IconProps) {
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
      <circle cx={11} cy={11} r={8.5} />
      <path d="M11 6.5V11l3 1.75" />
      <path d="m16.5 18.5 1.75 1.75 3.25-3.25" />
    </svg>
  );
}
