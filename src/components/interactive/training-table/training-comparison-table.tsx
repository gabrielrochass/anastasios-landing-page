"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardBadge } from "@/components/cards/card";
import {
  TrainingFilters,
  type TrainingFilterState,
} from "@/components/interactive/training-table/training-filters";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  formatPrice,
  modalityLabels,
  type Training,
} from "@/lib/trainings/types";

type SortKey = "title" | "hours" | "price";
type SortDirection = "asc" | "desc";

interface TrainingComparisonTableProps {
  trainings: Training[];
}

function nrToRiskBadge(training: Training) {
  const maxGrade = Math.max(...(training.riskGrades.length ? training.riskGrades : [0]));
  if (maxGrade >= 4) return "high" as const;
  if (maxGrade === 3) return "medium" as const;
  if (maxGrade > 0) return "low" as const;
  return undefined;
}

function BuyButton({ training }: { training: Training }) {
  return (
    <Button
      asChild
      size="sm"
      className="bg-orange-400 text-ink hover:bg-orange-500"
    >
      <a
        href={training.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("training_card_click", { nr: training.nr })}
      >
        Comprar
      </a>
    </Button>
  );
}

function TrainingDetails({ training }: { training: Training }) {
  return (
    <div className="grid gap-4 text-sm leading-relaxed text-ink-muted sm:grid-cols-3">
      <div>
        <p className="font-semibold text-petrol-700">Público</p>
        <p className="mt-1">{training.details.audience}</p>
      </div>
      <div>
        <p className="font-semibold text-petrol-700">Programa</p>
        <ul className="mt-1 list-disc pl-4">
          {training.details.syllabus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-petrol-700">Certificação</p>
        <p className="mt-1">{training.details.certification}</p>
        {training.recyclingMonths && (
          <p className="mt-2">
            Reciclagem a cada {training.recyclingMonths} meses.
          </p>
        )}
      </div>
    </div>
  );
}

export function TrainingComparisonTable({
  trainings,
}: TrainingComparisonTableProps) {
  const [filters, setFilters] = useState<TrainingFilterState>({
    nr: "all",
    modality: "all",
    riskGrade: "all",
  });

  // Lê ?nr= após o mount: o HTML estático renderiza a tabela completa
  // (zero CLS) e o filtro do deep-link aplica na hidratação. setState aqui
  // é intencional e roda uma única vez — não há cascata.
  useEffect(() => {
    const nr = new URLSearchParams(window.location.search).get("nr");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (nr) setFilters((current) => ({ ...current, nr }));
  }, []);
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const nrs = useMemo(
    () => [...new Set(trainings.map((t) => t.nr))].sort(),
    [trainings],
  );

  const visible = useMemo(() => {
    const filtered = trainings.filter((t) => {
      if (filters.nr !== "all" && t.nr !== filters.nr) return false;
      if (filters.modality !== "all" && !t.modalities.includes(filters.modality))
        return false;
      if (
        filters.riskGrade !== "all" &&
        t.riskGrades.length > 0 &&
        !t.riskGrades.includes(Number(filters.riskGrade) as 1 | 2 | 3 | 4)
      )
        return false;
      return true;
    });
    const direction = sortDirection === "asc" ? 1 : -1;
    return filtered.toSorted((a, b) => {
      if (sortKey === "title") return direction * a.title.localeCompare(b.title, "pt-BR");
      if (sortKey === "hours") return direction * (a.hours - b.hours);
      const priceA = a.priceCents ?? Number.MAX_SAFE_INTEGER;
      const priceB = b.priceCents ?? Number.MAX_SAFE_INTEGER;
      return direction * (priceA - priceB);
    });
  }, [trainings, filters, sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function ariaSort(key: SortKey): "ascending" | "descending" | "none" {
    if (key !== sortKey) return "none";
    return sortDirection === "asc" ? "ascending" : "descending";
  }

  const sortableHeaders: Array<{ key: SortKey; label: string }> = [
    { key: "title", label: "Curso" },
    { key: "hours", label: "Carga horária" },
    { key: "price", label: "Preço" },
  ];

  return (
    <div>
      <TrainingFilters nrs={nrs} value={filters} onChange={setFilters} />
      <p className="text-eyebrow mt-6 text-ink-meta" aria-live="polite">
        {visible.length} {visible.length === 1 ? "curso" : "cursos"}
      </p>

      {/* Desktop: tabela semântica */}
      <div className="mt-3 hidden overflow-x-auto rounded-lg bg-surface-raised shadow-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th scope="col" className="px-4 py-3">
                <span className="text-eyebrow text-ink-meta">NR</span>
              </th>
              {sortableHeaders.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  aria-sort={ariaSort(header.key)}
                  className="px-4 py-3"
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(header.key)}
                    className="text-eyebrow inline-flex min-h-8 items-center gap-1 text-ink-meta hover:text-petrol-700"
                  >
                    {header.label}
                    <ArrowUpDown className="size-3.5" aria-hidden />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-4 py-3">
                <span className="text-eyebrow text-ink-meta">Modalidade</span>
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((training) => {
              const expanded = expandedId === training.id;
              return (
                <TableRow
                  key={training.id}
                  training={training}
                  expanded={expanded}
                  onToggle={() =>
                    setExpandedId(expanded ? null : training.id)
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: pilha de cards (mesma fonte de dados) */}
      <ul className="mt-3 grid gap-4 md:hidden">
        {visible.map((training) => (
          <li
            key={training.id}
            className="rounded-lg bg-surface-raised p-card shadow-card"
          >
            <div className="flex items-center justify-between">
              <CardBadge nr={training.nr} nivel={nrToRiskBadge(training)} />
              <p className="font-semibold text-petrol-700">
                {formatPrice(training.priceCents)}
              </p>
            </div>
            <p className="mt-3 font-semibold text-petrol-700">
              {training.title}
            </p>
            <p className="text-eyebrow mt-1 flex flex-wrap gap-x-3 text-ink-meta">
              <span>{training.hours}h</span>
              <span>
                {training.modalities.map((m) => modalityLabels[m]).join(" / ")}
              </span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              {training.shortDescription}
            </p>
            <div className="mt-4">
              <BuyButton training={training} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TableRow({
  training,
  expanded,
  onToggle,
}: {
  training: Training;
  expanded: boolean;
  onToggle: () => void;
}) {
  const detailsId = `treinamento-detalhes-${training.id}`;
  return (
    <>
      <tr className="border-b border-neutral-100 transition-colors hover:bg-petrol-50">
        <td className="px-4 py-3">
          <CardBadge nr={training.nr} nivel={nrToRiskBadge(training)} />
        </td>
        <td className="px-4 py-3">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={onToggle}
            className="inline-flex min-h-8 items-center gap-1.5 text-left font-medium text-petrol-700 hover:text-petrol-500"
          >
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 shrink-0 transition-transform",
                expanded && "rotate-180",
              )}
            />
            {training.title}
          </button>
        </td>
        <td className="px-4 py-3 tabular-nums">{training.hours}h</td>
        <td className="px-4 py-3 font-semibold tabular-nums text-petrol-700">
          {formatPrice(training.priceCents)}
        </td>
        <td className="px-4 py-3 text-ink-muted">
          {training.modalities.map((m) => modalityLabels[m]).join(" / ")}
        </td>
        <td className="px-4 py-3 text-right">
          <BuyButton training={training} />
        </td>
      </tr>
      <tr className="border-b border-neutral-100">
        <td colSpan={6} className="p-0">
          <div
            id={detailsId}
            className={cn(
              "grid transition-[grid-template-rows] duration-250",
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="bg-petrol-50/50 px-4 py-5">
                <TrainingDetails training={training} />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

