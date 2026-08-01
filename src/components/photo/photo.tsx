import Image from "next/image";
import { stockPhotos, type StockPhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Treatment = "grade" | "overlay" | "duotone";

interface PhotoProps {
  photo: StockPhotoKey;
  /**
   * grade: dessatura leve (mata cheiro de stock).
   * overlay: grade + gradiente petróleo na base (para foto sob texto).
   * duotone: monocromático petróleo (homogeneíza fotos de origens diferentes).
   */
  treatment?: Treatment;
  /** Filete laranja na base (acento gráfico, nunca tinge a foto). */
  accent?: boolean;
  /** Passar quando a foto for a maior da dobra (LCP). */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const treatmentFilter: Record<Treatment, string> = {
  // Cor natural: só uma leve unificação de saturação para coerência entre
  // fotos de origens diferentes — a foto continua parecendo foto.
  grade: "[filter:saturate(0.94)]",
  overlay: "[filter:saturate(0.94)]",
  // Duotone reservado para uso raro/decorativo (nunca em foto de confiança).
  duotone: "[filter:grayscale(1)_contrast(1.05)]",
};

/**
 * Foto tratada para coerência com o design system (ver docs/IMAGE-SOURCES.md §4).
 * Renderiza dentro de um container com dimensão reservada (use ImageSlot ou dê
 * `className` com aspect/height) — `fill` exige pai posicionado.
 */
export function Photo({
  photo,
  treatment = "grade",
  accent = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: PhotoProps) {
  const { src, alt } = stockPhotos[photo];

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", treatmentFilter[treatment])}
      />
      {treatment === "duotone" && (
        <span
          aria-hidden
          className="absolute inset-0 bg-petrol-700 mix-blend-color"
        />
      )}
      {treatment === "duotone" && (
        <span
          aria-hidden
          className="absolute inset-0 bg-petrol-950/25 mix-blend-multiply"
        />
      )}
      {treatment === "overlay" && (
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-petrol-950/75 via-petrol-950/20 to-transparent"
        />
      )}
      {accent && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 bg-orange-400"
        />
      )}
    </div>
  );
}
