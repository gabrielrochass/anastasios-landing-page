import { Entrance, EntranceItem } from "@/components/motion/entrance";

/**
 * Cabeçalho do blog. A listagem em si (com o artigo em destaque como primeira
 * linha) vive na página , este bloco só ancora o tom editorial no topo.
 */
export function BlogHero() {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Entrance>
          <EntranceItem eager>
            <p className="text-eyebrow text-accent-text">SST na prática</p>
          </EntranceItem>
          <EntranceItem eager>
            <h1 className="text-display mt-4 max-w-3xl text-content">
              Legislação explicada por quem aplica.
            </h1>
          </EntranceItem>
          <EntranceItem>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-content-muted">
              NRs, eSocial, PGR e rotinas de departamento pessoal destrinchados
              por quem assina os laudos e responde tecnicamente por eles.
            </p>
          </EntranceItem>
        </Entrance>
      </div>
    </section>
  );
}
