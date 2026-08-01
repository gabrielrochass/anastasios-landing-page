import type { IconProps } from "./icon-props";

export function IconAudiometria({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 10a5.75 5.75 0 0 1 11.5 0c0 3.5-3.5 4.5-3.5 7.5a3 3 0 0 1-6 0" />
      <path d="M8 10a2.75 2.75 0 0 1 5.5 0c0 2-2 2.5-2.5 4.5" />
      <path d="M18 9a4 4 0 0 1 0 6" />
      <path d="M20.5 7.5a7.5 7.5 0 0 1 0 9" />
    </svg>
  );
}
