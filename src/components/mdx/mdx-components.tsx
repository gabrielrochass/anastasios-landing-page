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
    <h2 className="text-h2 text-content mt-12 scroll-mt-24" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-h3 text-content mt-8 scroll-mt-24" {...props} />
  ),
  p: (props) => <p className="text-content mt-5 leading-relaxed" {...props} />,
  ul: (props) => (
    <ul
      className="text-content mt-5 list-disc space-y-2 pl-6 leading-relaxed"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-content mt-5 list-decimal space-y-2 pl-6 leading-relaxed"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="text-accent hover:text-accent font-semibold underline underline-offset-4"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-rule text-content-muted mt-5 border-l-2 pl-4 italic"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-content font-semibold" {...props} />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="text-body w-full" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="eyebrow border-rule text-content-muted border-b px-3 py-2 text-left"
      {...props}
    />
  ),
  td: (props) => <td className="border-rule border-b px-3 py-2" {...props} />,
  hr: () => (
    <div aria-hidden className="mt-10 flex gap-1.5">
      <span className="bg-rule size-2 rounded-xs" />
      <span className="bg-accent size-2 rounded-xs" />
      <span className="bg-rule size-2 rounded-xs" />
    </div>
  ),
};
