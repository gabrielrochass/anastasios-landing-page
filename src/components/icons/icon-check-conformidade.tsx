import type { IconProps } from "./icon-props";

export function IconCheckConformidade({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2.5l7.5 2.75v6c0 4.75-3.1 8.35-7.5 10.25-4.4-1.9-7.5-5.5-7.5-10.25v-6Z" />
      <path d="m8.5 11.5 2.5 2.5 4.5-5" />
    </svg>
  );
}
