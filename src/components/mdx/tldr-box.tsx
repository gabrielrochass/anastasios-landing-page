interface TldrBoxProps {
  items: string[];
}

/** Resumo executivo no topo do artigo , 3 a 5 bullets. */
export function TldrBox({ items }: TldrBoxProps) {
  return (
    <section
      aria-label="Resumo do artigo"
      className="border-rule bg-surface-raised p-card my-8 rounded-lg border"
    >
      <p className="eyebrow text-content">Em resumo</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-body flex gap-2.5 leading-relaxed">
            <span
              aria-hidden
              className="bg-accent mt-1.5 size-2 shrink-0 rounded-xs"
            />
            <span className="text-content">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
