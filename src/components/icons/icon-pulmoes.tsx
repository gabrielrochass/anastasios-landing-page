import type { IconProps } from "./icon-props";

export function IconPulmoes({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 10.5C9.5 8.5 8.5 7 7 7 4.5 7 3 10 3 13.5V17a3 3 0 0 0 3 3h1.5a2 2 0 0 0 2-2V10.5Z" />
      <path d="M14.5 10.5C14.5 8.5 15.5 7 17 7c2.5 0 4 3 4 6.5V17a3 3 0 0 1-3 3h-1.5a2 2 0 0 1-2-2V10.5Z" />
      <path d="M12 3v4.5c0 1.75 1.1 3 2.5 3M12 7.5c0 1.75-1.1 3-2.5 3" />
    </svg>
  );
}
