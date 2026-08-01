import { describe, expect, it } from "vitest";
import raw from "@/data/trainings.json";
import { trainingSchema } from "@/lib/trainings/types";

describe("catálogo de treinamentos", () => {
  it("valida contra o schema Zod", () => {
    const parsed = trainingSchema.array().parse(raw);
    expect(parsed).toHaveLength(12);
  });
  it("slugs e ids únicos", () => {
    const parsed = trainingSchema.array().parse(raw);
    expect(new Set(parsed.map((t) => t.slug)).size).toBe(parsed.length);
    expect(new Set(parsed.map((t) => t.id)).size).toBe(parsed.length);
  });
});
