import { describe, expect, it } from "vitest";

/**
 * Regressão de contraste WCAG dos design tokens (src/app/globals.css).
 *
 * O site tem dois modos, ocean e doc, então cada par é validado no modo em que
 * de fato aparece. Se alguém mexer numa cor e quebrar um par validado, este
 * teste falha o build antes de o problema chegar num usuário.
 *
 * Os testes negativos no fim são tão importantes quanto os positivos: eles
 * codificam as proibições. Se alguém "consertar" o copper para funcionar em
 * fundo claro, o teste força uma revisão deliberada do sistema de acento
 * inteiro em vez de deixar a mudança passar despercebida.
 */

function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(value.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = {
  // Oceano
  ocean950: "#07141b",
  ocean900: "#0e2029",
  ocean800: "#1c3440",
  sea700: "#12475c",
  foam: "#f2efe9",
  mist: "#8fa3ac",
  copper: "#e2703a",
  dataSea: "#7fb5a2",
  ruleStrongOcean: "#546d78",
  // Documento
  paper: "#f5f2ec",
  paperRaised: "#fbf9f5",
  ink: "#10161a",
  slateWarm: "#5c5952",
  ruleWarm: "#d6d0c4",
  ruleStrongDoc: "#8a8372",
  oxide: "#9c3b22",
  navy: "#1b3a4b",
  dataLand: "#2f6b57",
} as const;

const AA_TEXT = 4.5;
const AA_LARGE_OR_UI = 3;

// [nome, fg, bg, mínimo exigido]
const pairs: Array<[string, string, string, number]> = [
  // Modo Oceano
  ["ocean texto: foam sobre surface", tokens.foam, tokens.ocean950, AA_TEXT],
  ["ocean texto: foam sobre surface-raised", tokens.foam, tokens.ocean900, AA_TEXT],
  ["ocean muted: mist sobre surface", tokens.mist, tokens.ocean950, AA_TEXT],
  ["ocean muted: mist sobre surface-raised", tokens.mist, tokens.ocean900, AA_TEXT],
  ["ocean acento: copper sobre surface", tokens.copper, tokens.ocean950, AA_TEXT],
  ["ocean acento: copper sobre surface-raised", tokens.copper, tokens.ocean900, AA_TEXT],
  ["ocean dado: data-sea sobre surface", tokens.dataSea, tokens.ocean950, AA_TEXT],
  ["ocean botão: ocean-950 sobre copper", tokens.ocean950, tokens.copper, AA_TEXT],
  ["ocean borda interativa: rule-strong sobre surface", tokens.ruleStrongOcean, tokens.ocean950, AA_LARGE_OR_UI],
  ["ocean foco: copper sobre surface", tokens.copper, tokens.ocean950, AA_LARGE_OR_UI],
  ["ocean texto sobre foto duotone: foam sobre sea-700", tokens.foam, tokens.sea700, AA_TEXT],

  // Modo Documento
  ["doc texto: ink sobre surface", tokens.ink, tokens.paper, AA_TEXT],
  ["doc texto: ink sobre surface-raised", tokens.ink, tokens.paperRaised, AA_TEXT],
  ["doc muted: slate-warm sobre surface", tokens.slateWarm, tokens.paper, AA_TEXT],
  ["doc muted: slate-warm sobre surface-raised", tokens.slateWarm, tokens.paperRaised, AA_TEXT],
  ["doc acento: oxide sobre surface", tokens.oxide, tokens.paper, AA_TEXT],
  ["doc acento: oxide sobre surface-raised", tokens.oxide, tokens.paperRaised, AA_TEXT],
  ["doc heading: navy sobre surface", tokens.navy, tokens.paper, AA_TEXT],
  ["doc dado: data-land sobre surface", tokens.dataLand, tokens.paper, AA_TEXT],
  ["doc botão: paper sobre oxide", tokens.paper, tokens.oxide, AA_TEXT],
  ["doc botão: paper sobre navy", tokens.paper, tokens.navy, AA_TEXT],
  ["doc borda interativa: rule-strong sobre surface", tokens.ruleStrongDoc, tokens.paper, AA_LARGE_OR_UI],
  ["doc borda interativa: rule-strong sobre surface-raised", tokens.ruleStrongDoc, tokens.paperRaised, AA_LARGE_OR_UI],
  ["doc foco: oxide sobre surface", tokens.oxide, tokens.paper, AA_LARGE_OR_UI],
];

describe("contraste WCAG dos design tokens", () => {
  it.each(pairs)("%s", (_name, fg, bg, minimum) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(minimum);
  });
});

describe("regras duras codificadas como teste negativo", () => {
  it("copper reprova como texto sobre papel: no modo doc o acento de texto é oxide", () => {
    expect(contrastRatio(tokens.copper, tokens.paper)).toBeLessThan(AA_TEXT);
  });

  it("oxide reprova como texto sobre oceano: os dois acentos são um par por modo, não intercambiáveis", () => {
    expect(contrastRatio(tokens.oxide, tokens.ocean950)).toBeLessThan(AA_TEXT);
  });

  it("foam reprova sobre copper: botão de acento leva texto ocean-950, nunca claro", () => {
    expect(contrastRatio(tokens.foam, tokens.copper)).toBeLessThan(AA_TEXT);
  });

  it("mist reprova sobre sea-700: sea-700 é tinta de duotone de foto, não superfície de texto secundário", () => {
    expect(contrastRatio(tokens.mist, tokens.sea700)).toBeLessThan(AA_TEXT);
  });
});

describe("rule é fio decorativo por decisão, não por descuido", () => {
  // Documenta que rule fica abaixo de 3:1 de propósito. Quem precisar de
  // limite perceptível (input, componente interativo) usa rule-strong.
  it("rule do modo doc é sutil", () => {
    expect(contrastRatio(tokens.ruleWarm, tokens.paper)).toBeLessThan(AA_LARGE_OR_UI);
  });

  it("rule do modo ocean é sutil", () => {
    expect(contrastRatio(tokens.ocean800, tokens.ocean950)).toBeLessThan(AA_LARGE_OR_UI);
  });
});
