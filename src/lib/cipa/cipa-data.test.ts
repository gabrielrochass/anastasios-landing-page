import { describe, expect, it } from "vitest";
import { cipaGroups, cipaSizingByGrade } from "@/lib/cipa/cipa-data";
import type { CipaRiskGrade } from "@/lib/cipa/types";

const grades: CipaRiskGrade[] = [1, 2, 3, 4];

describe("Quadro I da NR-5 (cipa-data)", () => {
  it("cada coluna de GR tem faixas contíguas, sem sobreposição, terminando aberta", () => {
    for (const grade of grades) {
      const ranges = cipaSizingByGrade[grade];
      expect(ranges.length, `GR${grade} vazio`).toBeGreaterThan(0);
      for (let i = 1; i < ranges.length; i++) {
        const prev = ranges[i - 1];
        expect(prev.max, `GR${grade}: faixa ${i - 1} sem teto no meio`).not.toBeNull();
        expect(ranges[i].min, `GR${grade}: buraco/overlap na faixa ${i}`).toBe(
          (prev.max as number) + 1,
        );
      }
      expect(
        ranges[ranges.length - 1].max,
        `GR${grade}: última faixa deve ser aberta`,
      ).toBeNull();
    }
  });

  it("membros não-negativos e não-decrescentes dentro de cada coluna", () => {
    for (const grade of grades) {
      let previousTitulars = 0;
      for (const range of cipaSizingByGrade[grade]) {
        expect(range.titulars).toBeGreaterThanOrEqual(0);
        expect(range.substitutes).toBeGreaterThanOrEqual(0);
        expect(range.titulars).toBeGreaterThanOrEqual(previousTitulars);
        previousTitulars = range.titulars;
      }
    }
  });

  it("grau maior nunca exige comissão mais tarde (min da 1ª faixa não cresce com o GR)", () => {
    const firstMins = grades.map((g) => cipaSizingByGrade[g][0].min);
    for (let i = 1; i < firstMins.length; i++) {
      expect(firstMins[i]).toBeLessThanOrEqual(firstMins[i - 1]);
    }
  });

  it("grupos: ids únicos, typicalGrade válido, com NRs setoriais", () => {
    expect(new Set(cipaGroups.map((g) => g.id)).size).toBe(cipaGroups.length);
    for (const group of cipaGroups) {
      expect(grades).toContain(group.typicalGrade);
      expect(group.sectorNRs.length).toBeGreaterThan(0);
    }
  });
});
