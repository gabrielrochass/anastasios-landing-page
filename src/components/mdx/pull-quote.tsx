interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export function PullQuote({ children, author }: PullQuoteProps) {
  return (
    <blockquote className="my-10 border-l-2 border-orange-400 pl-6">
      <p className="text-h3 text-petrol-700 italic">{children}</p>
      {author && (
        <footer className="text-eyebrow mt-3 text-ink-meta">{author}</footer>
      )}
    </blockquote>
  );
}
