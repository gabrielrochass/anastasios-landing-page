"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResultPanel } from "@/components/interactive/cipa-diagnostic/result-panel";
import { trackEvent } from "@/lib/analytics";
import { cipaGroups, cipaSizingByGrade } from "@/lib/cipa/cipa-data";
import { evaluateCipa } from "@/lib/cipa/engine";
import {
  cipaInputSchema,
  type CipaInput,
  type CipaResult,
  type Shift,
} from "@/lib/cipa/types";

const STORAGE_KEY = "esol:diagnostico:v1";
const MAX_HISTORY = 10;

const historySchema = z.array(
  z.object({ input: cipaInputSchema, timestamp: z.number() }),
);

function saveToHistory(input: CipaInput) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? historySchema.safeParse(JSON.parse(raw)) : undefined;
    const history = parsed?.success ? parsed.data : [];
    history.unshift({ input, timestamp: Date.now() });
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY)),
    );
  } catch {
    // storage cheio/bloqueado — histórico é opcional, segue sem ele
  }
}

const shiftOptions: Array<{ value: Shift; label: string }> = [
  { value: "diurno", label: "Diurno" },
  { value: "noturno", label: "Noturno" },
  { value: "revezamento", label: "Revezamento" },
];

export function CipaDiagnostic() {
  const [groupId, setGroupId] = useState<string>();
  const [riskGrade, setRiskGrade] = useState<string>();
  const [employees, setEmployees] = useState("");
  const [shifts, setShifts] = useState<Shift[]>(["diurno"]);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<CipaResult>();
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent("diagnostic_started", { tool: "cipa" });
    }
  }

  function toggleShift(shift: Shift) {
    markStarted();
    setShifts((current) =>
      current.includes(shift)
        ? current.filter((s) => s !== shift)
        : [...current, shift],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = cipaInputSchema.safeParse({
      groupId,
      riskGrade: riskGrade ? Number(riskGrade) : undefined,
      employees: employees ? Number(employees) : undefined,
      shifts,
    });
    if (!parsed.success) {
      setError("Preencha setor, grau de risco, nº de empregados e ao menos um turno.");
      setResult(undefined);
      return;
    }
    const group = cipaGroups.find((g) => g.id === parsed.data.groupId);
    if (!group) {
      setError("Setor inválido.");
      return;
    }
    setError(undefined);
    setResult(evaluateCipa(parsed.data, group, cipaSizingByGrade));
    saveToHistory(parsed.data);
    trackEvent("diagnostic_completed", { tool: "cipa", setor: group.id });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5"
        aria-label="Diagnóstico de CIPA"
      >
        <div className="grid gap-5">
          <div className="grid gap-1.5">
            <Label id="cipa-setor-label" htmlFor="cipa-setor">
              Setor da empresa
            </Label>
            <Select
              value={groupId}
              onValueChange={(value) => {
                markStarted();
                setGroupId(value);
                const group = cipaGroups.find((g) => g.id === value);
                if (group && !riskGrade) {
                  setRiskGrade(String(group.typicalGrade));
                }
              }}
            >
              <SelectTrigger
                id="cipa-setor"
                aria-labelledby="cipa-setor-label cipa-setor"
                className="w-full"
              >
                <SelectValue placeholder="Escolha o setor" />
              </SelectTrigger>
              <SelectContent>
                {cipaGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label id="cipa-grau-label" htmlFor="cipa-grau">
              Grau de risco (NR-4)
            </Label>
            <Select
              value={riskGrade}
              onValueChange={(value) => {
                markStarted();
                setRiskGrade(value);
              }}
            >
              <SelectTrigger
                id="cipa-grau"
                aria-labelledby="cipa-grau-label cipa-grau"
                className="w-full"
              >
                <SelectValue placeholder="1 a 4" />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4"].map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    GR {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-ink-meta">
              Não sabe o grau? Está no Quadro I da NR-4, pelo CNAE da empresa.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cipa-empregados">Número de empregados</Label>
            <Input
              id="cipa-empregados"
              type="number"
              inputMode="numeric"
              min={1}
              max={20000}
              value={employees}
              onChange={(e) => {
                markStarted();
                setEmployees(e.target.value);
              }}
            />
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Turnos de trabalho</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {shiftOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`cipa-turno-${option.value}`}
                    aria-labelledby={`cipa-turno-${option.value}-label`}
                    checked={shifts.includes(option.value)}
                    onCheckedChange={() => toggleShift(option.value)}
                  />
                  <Label
                    id={`cipa-turno-${option.value}-label`}
                    htmlFor={`cipa-turno-${option.value}`}
                    className="font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="text-sm text-risk-high-fg">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="justify-self-start">
            Calcular dimensionamento
          </Button>
        </div>
      </form>

      <div className="lg:col-span-7">
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <div className="flex h-full min-h-48 items-center justify-center rounded-lg border border-dashed border-neutral-300 p-card">
            <p className="max-w-xs text-center text-sm text-ink-meta">
              Preencha os campos ao lado: o resultado mostra membros,
              suplentes, carga de treinamento e as NRs do seu radar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
