import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/illustrations/image-slot";
import type { Author } from "@/lib/posts";

export function AuthorBio({ author }: { author: Author }) {
  return (
    <section
      aria-label={`Sobre ${author.name}`}
      className="bg-surface-raised p-card mt-14 rounded-lg"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="w-20 shrink-0">
          <ImageSlot
            slotId={`autor-${author.key}`}
            ratio="1/1"
            className="rounded-full"
          >
            <div className="bg-surface-raised text-content flex size-full items-center justify-center">
              <span className="text-h3">
                {author.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          </ImageSlot>
        </div>
        <div className="flex-1">
          <p className="text-content font-semibold">{author.name}</p>
          <p className="eyebrow text-content-muted mt-0.5">{author.role}</p>
          <p className="text-content-muted text-body mt-2 leading-relaxed">
            {author.bio}
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/contato">Agendar conversa</Link>
        </Button>
      </div>
    </section>
  );
}
