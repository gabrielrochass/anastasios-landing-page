import type { IconProps } from "./icon-props";

export function IconLivroNr({ size = 24, ...props }: IconProps) {
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
      <path d="M12 6.5C10.75 5.5 9.1 5 7 5H4.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1H7c2.1 0 3.75.5 5 1.5 1.25-1 2.9-1.5 5-1.5h2.5a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H17c-2.1 0-3.75.5-5 1.5Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}
