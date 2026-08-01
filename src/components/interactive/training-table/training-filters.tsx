"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modalityLabels, type Modality } from "@/lib/trainings/types";

export interface TrainingFilterState {
  nr: string;
  modality: Modality | "all";
  riskGrade: "all" | "1" | "2" | "3" | "4";
}

interface TrainingFiltersProps {
  nrs: string[];
  value: TrainingFilterState;
  onChange: (next: TrainingFilterState) => void;
}

export function TrainingFilters({ nrs, value, onChange }: TrainingFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="grid gap-1.5">
        <Label id="filtro-nr-label" htmlFor="filtro-nr">
          Norma
        </Label>
        <Select
          value={value.nr}
          onValueChange={(nr) => onChange({ ...value, nr })}
        >
          <SelectTrigger
            id="filtro-nr"
            aria-labelledby="filtro-nr-label"
            className="w-40"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {nrs.map((nr) => (
              <SelectItem key={nr} value={nr}>
                {nr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label id="filtro-modalidade-label" htmlFor="filtro-modalidade">
          Modalidade
        </Label>
        <Select
          value={value.modality}
          onValueChange={(modality) =>
            onChange({ ...value, modality: modality as Modality | "all" })
          }
        >
          <SelectTrigger
            id="filtro-modalidade"
            aria-labelledby="filtro-modalidade-label"
            className="w-44"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {(Object.keys(modalityLabels) as Modality[]).map((modality) => (
              <SelectItem key={modality} value={modality}>
                {modalityLabels[modality]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label id="filtro-grau-label" htmlFor="filtro-grau">
          Grau de risco (CIPA)
        </Label>
        <Select
          value={value.riskGrade}
          onValueChange={(riskGrade) =>
            onChange({
              ...value,
              riskGrade: riskGrade as TrainingFilterState["riskGrade"],
            })
          }
        >
          <SelectTrigger
            id="filtro-grau"
            aria-labelledby="filtro-grau-label"
            className="w-40"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {(["1", "2", "3", "4"] as const).map((grade) => (
              <SelectItem key={grade} value={grade}>
                GR {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
