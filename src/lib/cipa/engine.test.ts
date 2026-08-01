import { describe, expect, it } from "vitest";
import { evaluateCipa } from "@/lib/cipa/engine";
import type {
  CipaGroup,
  CipaInput,
  CipaSizingTable,
} from "@/lib/cipa/types";

const testGroup: CipaGroup = {
  id: "teste",
  label: "Setor de teste",
  nr5Reference: "T-1",
  typicalGrade: 3,
  sectorNRs: [
    { nr: "NR-12", title: "Máquinas", level: "high", reason: "Setor industrial." },
  ],
};

const gr3Column = [
  { min: 20, max: 29, titulars: 1, substitutes: 1 },
  { min: 30, max: 50, titulars: 2, substitutes: 2 },
  { min: 51, max: null, titulars: 3, substitutes: 3 },
];

const testSizing: CipaSizingTable = {
  1: [{ min: 81, max: null, titulars: 1, substitutes: 1 }],
  2: [{ min: 51, max: null, titulars: 2, substitutes: 1 }],
  3: gr3Column,
  4: [{ min: 20, max: null, titulars: 4, substitutes: 4 }],
};

function input(overrides: Partial<CipaInput> = {}): CipaInput {
  return {
    groupId: "teste",
    riskGrade: 3,
    employees: 40,
    shifts: ["diurno"],
    ...overrides,
  };
}

describe("evaluateCipa", () => {
  it("abaixo da primeira faixa do GR: designado único, sem comissão", () => {
    const result = evaluateCipa(input({ employees: 12 }), testGroup, testSizing);
    expect(result.cipa.required).toBe(false);
    expect(result.cipa.singleDesignee).toBe(true);
    expect(result.cipa.titulars).toBe(0);
  });

  it("resolve a faixa correta nos limites inferior e superior", () => {
    const at = (employees: number) =>
      evaluateCipa(input({ employees }), testGroup, testSizing).cipa.titulars;
    expect(at(20)).toBe(1);
    expect(at(29)).toBe(1);
    expect(at(30)).toBe(2);
    expect(at(50)).toBe(2);
  });

  it("última faixa sem teto cobre valores altos", () => {
    const result = evaluateCipa(
      input({ employees: 5000 }),
      testGroup,
      testSizing,
    );
    expect(result.cipa.required).toBe(true);
    expect(result.cipa.titulars).toBe(3);
    expect(result.cipa.substitutes).toBe(3);
  });

  it("dimensionamento muda com o grau de risco informado", () => {
    // 60 empregados: GR1 → designado (faixa começa em 81); GR4 → 4 membros
    const gr1 = evaluateCipa(
      input({ riskGrade: 1, employees: 60 }),
      testGroup,
      testSizing,
    );
    expect(gr1.cipa.singleDesignee).toBe(true);
    const gr4 = evaluateCipa(
      input({ riskGrade: 4, employees: 60 }),
      testGroup,
      testSizing,
    );
    expect(gr4.cipa.titulars).toBe(4);
  });

  it("carga horária de treinamento segue o grau de risco", () => {
    const hours = (riskGrade: 1 | 2 | 3 | 4) =>
      evaluateCipa(input({ riskGrade }), testGroup, testSizing).training.hours;
    expect(hours(1)).toBe(8);
    expect(hours(2)).toBe(12);
    expect(hours(3)).toBe(16);
    expect(hours(4)).toBe(20);
  });

  it("turno noturno ou revezamento adiciona observação de turnos", () => {
    const note = (shifts: CipaInput["shifts"]) =>
      evaluateCipa(input({ shifts }), testGroup, testSizing).training.shiftNote;
    expect(note(["diurno"])).toBeUndefined();
    expect(note(["diurno", "noturno"])).toBeDefined();
    expect(note(["revezamento"])).toBeDefined();
  });

  it("NRs setoriais entram no resultado junto com as universais", () => {
    const nrs = evaluateCipa(input(), testGroup, testSizing).applicableNRs.map(
      (n) => n.nr,
    );
    expect(nrs).toContain("NR-5");
    expect(nrs).toContain("NR-1");
    expect(nrs).toContain("NR-7");
    expect(nrs).toContain("NR-12");
  });
});
