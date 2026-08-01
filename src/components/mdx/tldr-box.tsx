interface TldrBoxProps {
  items: string[];
}

/** Resumo executivo no topo do artigo — 3 a 5 bullets. */
export function TldrBox({ items }: TldrBoxProps) {
  return (
    <section
      aria-label="Resumo do artigo"
      className="my-8 rounded-lg border border-petrol-200 bg-surface-tint p-card"
    >
      <p className="text-eyebrow text-petrol-700">Em resumo</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            <span
              aria-hidden
              className="mt-1.5 size-2 shrink-0 rounded-xs bg-orange-400"
            />
            <span className="text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
