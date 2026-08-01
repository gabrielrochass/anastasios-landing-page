import { describe, expect, it } from "vitest";
import {
  normalizeNR,
  recommendTrainings,
} from "@/lib/trainings/recommendations";
import type { Training } from "@/lib/trainings/types";

function makeTraining(nr: string, featured = false): Training {
  return {
    id: nr,
    nr,
    slug: nr.toLowerCase(),
    title: `Curso ${nr}`,
    shortDescription: "descrição",
    hours: 8,
    modalities: ["ead"],
    priceCents: 10000,
    riskGrades: [],
    recyclingMonths: null,
    externalUrl: "https://example.com/curso",
    featured,
    details: { audience: "todos", syllabus: ["item"], certification: "cert" },
  };
}

describe("normalizeNR", () => {
  it("zero-pads NR de dígito único", () => {
    expect(normalizeNR("NR-6")).toBe("NR-06");
    expect(normalizeNR("NR-5")).toBe("NR-05");
  });
  it("mantém NR de dois dígitos", () => {
    expect(normalizeNR("NR-35")).toBe("NR-35");
    expect(normalizeNR("NR-06")).toBe("NR-06");
  });
});

describe("recommendTrainings", () => {
  const catalog = [
    makeTraining("NR-35", true),
    makeTraining("NR-10", true),
    makeTraining("NR-06"), // EPI, não featured
    makeTraining("NR-05", true),
  ];

  it("recomenda o curso de EPI para um post com nrs:['NR-6'] (regressão do bug NR-6 vs NR-06)", () => {
    const rec = recommendTrainings({ nrs: ["NR-6"] }, catalog);
    expect(rec[0]?.nr).toBe("NR-06");
  });

  it("resolve tag → NR (epi → NR-06)", () => {
    const rec = recommendTrainings({ tags: ["epi"] }, catalog);
    expect(rec.some((t) => t.nr === "NR-06")).toBe(true);
  });

  it("cai no fallback featured quando nenhuma NR casa", () => {
    const rec = recommendTrainings({ nrs: ["NR-99"] }, catalog, 2);
    expect(rec).toHaveLength(2);
    expect(rec.every((t) => t.featured)).toBe(true);
  });
});
