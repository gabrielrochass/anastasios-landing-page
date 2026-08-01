import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Checklist } from "@/components/mdx/checklist";
import { PullQuote } from "@/components/mdx/pull-quote";
import { TldrBox } from "@/components/mdx/tldr-box";

/**
 * Mapping global de elementos MDX , a "prose" do blog é definida aqui,
 * elemento a elemento (sem plugin de typography).
 */
export const mdxComponents: MDXComponents = {
  TldrBox,
  Checklist,
  PullQuote,
  h2: (props) => (
    <h2 className="text-h2 mt-12 scroll-mt-24 text-content" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-h3 mt-8 scroll-mt-24 text-content" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-relaxed text-content" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-content"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-content"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="font-medium text-accent underline underline-offset-4 hover:text-accent"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-rule pl-4 text-content-muted italic"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-content" {...props} />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="text-eyebrow border-b border-rule px-3 py-2 text-left text-content-muted"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-rule px-3 py-2" {...props} />
  ),
  hr: () => (
    <div aria-hidden className="mt-10 flex gap-1.5">
      <span className="size-2 rounded-xs bg-rule" />
      <span className="size-2 rounded-xs bg-accent" />
      <span className="size-2 rounded-xs bg-rule" />
    </div>
  ),
};
