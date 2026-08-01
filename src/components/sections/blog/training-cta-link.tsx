"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Training } from "@/lib/trainings/types";

export function TrainingCtaLink({ training }: { training: Training }) {
  return (
    <a
      href={training.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("training_card_click", { nr: training.nr })}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-accent-on-inverse hover:bg-petrol-900"
    >
      Ver curso
      <ArrowRight className="size-4" aria-hidden />
    </a>
  );
}
