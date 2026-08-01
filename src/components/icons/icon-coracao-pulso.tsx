import type { IconProps } from "./icon-props";

export function IconCoracaoPulso({ size = 24, ...props }: IconProps) {
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
      <path d="M12 20.5C7.5 16.5 3 13.25 3 8.75 3 6 5.25 4 7.75 4 9.5 4 11 5 12 6.5 13 5 14.5 4 16.25 4 18.75 4 21 6 21 8.75c0 4.5-4.5 7.75-9 11.75Z" />
      <path d="M3.5 11.5h4L9 9l2.5 6 1.5-3.5h7.5" />
    </svg>
  );
}
