import { ImageSlot } from "@/components/illustrations/image-slot";
import { Photo } from "@/components/photo/photo";
import { Stagger } from "@/components/motion/stagger";
import type { StockPhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * Grade de fotos com revelação em cascata (Stagger) e leve zoom no hover.
 * Reutilizável; o `alt` de cada foto vem de `stockPhotos` (honesto, sem
 * sugerir pessoas/turmas reais). Altura reservada pelo ImageSlot → CLS 0.
 */
export function PhotoGallery({
  photos,
  className,
}: {
  photos: StockPhotoKey[];
  className?: string;
}) {
  return (
    <Stagger
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3", className)}
      itemClassName="h-full"
    >
      {photos.map((photo, index) => (
        <ImageSlot
          key={`${photo}-${index}`}
          slotId={`gallery-${photo}`}
          ratio="4/3"
          className="overflow-hidden rounded-xl shadow-card [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-105 motion-reduce:hover:[&_img]:scale-100"
        >
          <Photo
            photo={photo}
            treatment="grade"
            sizes="(min-width: 640px) 30vw, 50vw"
          />
        </ImageSlot>
      ))}
    </Stagger>
  );
}
