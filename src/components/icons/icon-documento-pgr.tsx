import type { IconProps } from "./icon-props";

export function IconDocumentoPgr({ size = 24, ...props }: IconProps) {
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
      <path d="M13.5 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M13.5 2.5V6a2 2 0 0 0 2 2H19" />
      <path d="M8.5 10h2.5v2.5H8.5ZM8.5 13.5h2.5V16H8.5ZM8.5 17h2.5v2.5H8.5Z" />
    </svg>
  );
}
