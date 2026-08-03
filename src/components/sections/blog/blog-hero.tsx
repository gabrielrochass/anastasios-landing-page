import { Entrance, EntranceItem } from "@/components/motion/entrance";

/**
 * Cabeçalho do blog. A listagem em si (com o artigo em destaque como primeira
 * linha) vive na página , este bloco só ancora o tom editorial no topo.
 */
export function BlogHero() {
  return (
    <section className="border-rule bg-surface border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Entrance>
          <EntranceItem eager>
            <p className="eyebrow text-accent">SST na prática</p>
          </EntranceItem>
          <EntranceItem eager>
            <h1 className="text-display text-content mt-4 max-w-3xl">
              Legislação explicada por quem aplica.
            </h1>
          </EntranceItem>
          <EntranceItem>
            <p className="text-content-muted text-lead mt-5 max-w-2xl leading-relaxed">
              NRs, eSocial, PGR e rotinas de departamento pessoal destrinchados
              por quem assina os laudos e responde tecnicamente por eles.
            </p>
          </EntranceItem>
        </Entrance>
      </div>
    </section>
  );
}
