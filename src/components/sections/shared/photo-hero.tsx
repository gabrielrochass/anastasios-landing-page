import { Photo } from "@/components/photo/photo";
import { Entrance, EntranceItem } from "@/components/motion/entrance";
import type { StockPhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

interface PhotoHeroProps {
  photo: StockPhotoKey;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  actions?: React.ReactNode;
  /** Conteúdo extra abaixo das ações (ex.: faixa de números). */
  children?: React.ReactNode;
  /** Altura da dobra. */
  size?: "default" | "tall";
  /** Alinhamento do conteúdo — "center" para heros-manifesto. */
  align?: "left" | "center";
  /** LCP: primeira dobra da navegação. */
  priority?: boolean;
}

/**
 * Hero liderado por foto real: a foto ocupa a seção inteira, com overlay
 * petróleo que garante contraste AA do texto claro. `align="center"` usa
 * overlay uniforme (texto centralizado); "left" usa overlay direcional.
 * Título entra `eager` (LCP nítido). Reserva topo para a navbar fixa.
 */
export function PhotoHero({
  photo,
  eyebrow,
  title,
  lead,
  actions,
  children,
  size = "default",
  align = "left",
  priority = false,
}: PhotoHeroProps) {
  const centered = align === "center";

  return (
    <section className="relative isolate overflow-hidden bg-surface-inverse text-ink-on-inverse">
      <div className="absolute inset-0">
        <Photo
          photo={photo}
          treatment="grade"
          priority={priority}
          sizes="100vw"
        />
        {centered ? (
          <span aria-hidden className="absolute inset-0 bg-petrol-950/72" />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-petrol-950 from-15% via-petrol-950/85 via-45% to-petrol-950/35"
          />
        )}
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-petrol-950/70 to-transparent"
        />
      </div>

      <div
        className={cn(
          "relative mx-auto max-w-6xl px-4 pt-24 sm:px-6",
          size === "tall" ? "pb-24 lg:pb-32" : "pb-16 lg:pb-24",
          size === "tall" ? "lg:pt-36" : "lg:pt-28",
        )}
      >
        <Entrance
          className={cn(
            centered
              ? "mx-auto flex max-w-3xl flex-col items-center text-center"
              : "max-w-xl lg:max-w-2xl",
          )}
        >
          <EntranceItem eager>
            <p className="text-eyebrow text-petrol-200">{eyebrow}</p>
          </EntranceItem>
          <EntranceItem eager>
            <h1 className="text-display mt-4 text-white">{title}</h1>
          </EntranceItem>
          {lead && (
            <EntranceItem>
              <p
                className={cn(
                  "mt-5 max-w-xl text-lg leading-relaxed text-ink-muted-on-inverse",
                  centered && "mx-auto",
                )}
              >
                {lead}
              </p>
            </EntranceItem>
          )}
          {actions && (
            <EntranceItem>
              <div
                className={cn(
                  "mt-8 flex flex-wrap gap-3",
                  centered && "justify-center",
                )}
              >
                {actions}
              </div>
            </EntranceItem>
          )}
          {children && <EntranceItem>{children}</EntranceItem>}
        </Entrance>
      </div>
    </section>
  );
}
