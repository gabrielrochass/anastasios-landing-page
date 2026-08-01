import type { IconProps } from "./icon-props";

export function IconEstetoscopio({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3v6a5 5 0 0 0 10 0V3" />
      <path d="M11 14v1.75a3.5 3.5 0 0 0 3.5 3.5h1.25" />
      <circle cx={18} cy={19.25} r={2.25} />
      <circle cx={18} cy={19.25} r={1} fill="currentColor" stroke="none" />
    </svg>
  );
}
