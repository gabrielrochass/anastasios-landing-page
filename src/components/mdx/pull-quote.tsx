interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export function PullQuote({ children, author }: PullQuoteProps) {
  return (
    <blockquote className="border-accent my-10 border-l-2 pl-6">
      <p className="text-h3 text-content italic">{children}</p>
      {author && (
        <footer className="eyebrow text-content-muted mt-3">{author}</footer>
      )}
    </blockquote>
  );
}
