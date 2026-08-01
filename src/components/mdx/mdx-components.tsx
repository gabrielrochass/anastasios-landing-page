import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Checklist } from "@/components/mdx/checklist";
import { PullQuote } from "@/components/mdx/pull-quote";
import { TldrBox } from "@/components/mdx/tldr-box";

/**
 * Mapping global de elementos MDX — a "prose" do blog é definida aqui,
 * elemento a elemento (sem plugin de typography).
 */
export const mdxComponents: MDXComponents = {
  TldrBox,
  Checklist,
  PullQuote,
  h2: (props) => (
    <h2 className="text-h2 mt-12 scroll-mt-24 text-petrol-700" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-h3 mt-8 scroll-mt-24 text-petrol-700" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-relaxed text-ink" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-ink"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-ink"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="font-medium text-petrol-500 underline underline-offset-4 hover:text-petrol-600"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-petrol-200 pl-4 text-ink-muted italic"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-petrol-700" {...props} />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="text-eyebrow border-b border-neutral-300 px-3 py-2 text-left text-ink-meta"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-neutral-100 px-3 py-2" {...props} />
  ),
  hr: () => (
    <div aria-hidden className="mt-10 flex gap-1.5">
      <span className="size-2 rounded-xs bg-petrol-200" />
      <span className="size-2 rounded-xs bg-orange-400" />
      <span className="size-2 rounded-xs bg-petrol-200" />
    </div>
  ),
};
