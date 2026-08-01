"use client";

import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChecklistProps {
  title: string;
  items: string[];
}

/** Checklist interativo dentro de artigos — estado local, não persiste. */
export function Checklist({ title, items }: ChecklistProps) {
  const baseId = useId();
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section
      aria-label={title}
      className="my-8 rounded-lg bg-surface-raised p-card shadow-card"
    >
      <p className="text-eyebrow text-petrol-700">{title}</p>
      <p className="text-eyebrow mt-1 text-ink-meta" aria-live="polite">
        {checked.size} de {items.length} concluídos
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => {
          const id = `${baseId}-${index}`;
          return (
            <li key={item} className="flex items-start gap-3">
              <Checkbox
                id={id}
                aria-labelledby={`${id}-label`}
                checked={checked.has(index)}
                onCheckedChange={() => toggle(index)}
                className="mt-0.5"
              />
              <Label
                id={`${id}-label`}
                htmlFor={id}
                className="text-sm leading-relaxed font-normal text-ink"
              >
                {item}
              </Label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
