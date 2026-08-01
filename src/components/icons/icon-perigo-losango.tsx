import type { IconProps } from "./icon-props";

export function IconPerigoLosango({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" />
      <path d="M12 7.5V12" />
      <circle cx={12} cy={15.5} r={1.1} fill="currentColor" stroke="none" />
    </svg>
  );
}
