import { describe, expect, it } from "vitest";

/**
 * Regressão de contraste WCAG dos design tokens (src/app/globals.css).
 * Se um token mudar e quebrar um par validado, este teste falha o build.
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
  white: "#ffffff",
  paper: "#f6f8f9",
  ink: "#16242c",
  inkMuted: "#4a5a63",
  inkMeta: "#4a5a63",
  petrol50: "#eff6f9",
  petrol200: "#aed4e3",
  petrol300: "#7db8cf",
  petrol500: "#1d7594",
  petrol600: "#0b5c78",
  petrol700: "#00465e",
  petrol950: "#061e28",
  orange300: "#ffab70",
  orange400: "#ff8c42",
  orange600: "#d95d0a",
  orange700: "#b44a08",
  riskLowBg: "#e7f6ec",
  riskLowFg: "#1a7431",
  riskMediumBg: "#fdf3df",
  riskMediumFg: "#8a5300",
  riskHighBg: "#fdeceb",
  riskHighFg: "#ba2121",
  riskHighSolid: "#d64545",
  riskLowOnDark: "#7fd99a",
  riskMediumOnDark: "#ffce6b",
  riskHighOnDark: "#ff9d94",
} as const;

const AA_TEXT = 4.5;
const AA_LARGE_OR_UI = 3;

// [nome, fg, bg, mínimo exigido]
const pairs: Array<[string, string, string, number]> = [
  ["body: ink sobre paper", tokens.ink, tokens.paper, AA_TEXT],
  ["body: ink sobre branco (cards)", tokens.ink, tokens.white, AA_TEXT],
  ["muted: ink-muted sobre paper", tokens.inkMuted, tokens.paper, AA_TEXT],
  ["muted: ink-muted sobre tint petrol-50", tokens.inkMuted, tokens.petrol50, AA_TEXT],
  ["meta: ink-meta sobre branco", tokens.inkMeta, tokens.white, AA_TEXT],
  ["meta: ink-meta sobre paper", tokens.inkMeta, tokens.paper, AA_TEXT],
  ["meta: ink-meta sobre tint petrol-50", tokens.inkMeta, tokens.petrol50, AA_TEXT],
  ["stat decorativo: petrol-400 sobre branco (large text)", "#4796b4", tokens.white, AA_LARGE_OR_UI],
  ["link: petrol-500 sobre branco", tokens.petrol500, tokens.white, AA_TEXT],
  ["link hover: petrol-600 sobre branco", tokens.petrol600, tokens.white, AA_TEXT],
  ["heading/primário: petrol-700 sobre branco", tokens.petrol700, tokens.white, AA_TEXT],
  ["botão primário: branco sobre petrol-700", tokens.white, tokens.petrol700, AA_TEXT],
  ["dark: branco sobre petrol-950", tokens.white, tokens.petrol950, AA_TEXT],
  ["dark muted: petrol-200 sobre petrol-950", tokens.petrol200, tokens.petrol950, AA_TEXT],
  ["dark secundário: petrol-300 sobre petrol-950", tokens.petrol300, tokens.petrol950, AA_TEXT],
  ["accent texto claro: orange-700 sobre branco", tokens.orange700, tokens.white, AA_TEXT],
  ["accent texto dark: orange-300 sobre petrol-950", tokens.orange300, tokens.petrol950, AA_TEXT],
  ["botão laranja: ink sobre orange-400", tokens.ink, tokens.orange400, AA_TEXT],
  ["focus ring: orange-600 sobre branco (UI)", tokens.orange600, tokens.white, AA_LARGE_OR_UI],
  ["badge low: fg sobre bg", tokens.riskLowFg, tokens.riskLowBg, AA_TEXT],
  ["badge medium: fg sobre bg", tokens.riskMediumFg, tokens.riskMediumBg, AA_TEXT],
  ["badge high: fg sobre bg", tokens.riskHighFg, tokens.riskHighBg, AA_TEXT],
  ["badge low fg sobre branco", tokens.riskLowFg, tokens.white, AA_TEXT],
  ["badge medium fg sobre branco", tokens.riskMediumFg, tokens.white, AA_TEXT],
  ["badge high fg sobre branco", tokens.riskHighFg, tokens.white, AA_TEXT],
  ["destructive: branco sobre risk-high-solid", tokens.white, tokens.riskHighSolid, AA_LARGE_OR_UI],
  ["risk on-dark low sobre petrol-950", tokens.riskLowOnDark, tokens.petrol950, AA_TEXT],
  ["risk on-dark medium sobre petrol-950", tokens.riskMediumOnDark, tokens.petrol950, AA_TEXT],
  ["risk on-dark high sobre petrol-950", tokens.riskHighOnDark, tokens.petrol950, AA_TEXT],
];

describe("contraste WCAG dos design tokens", () => {
  it.each(pairs)("%s", (_name, fg, bg, minimum) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(minimum);
  });

  it("documenta a regra dura: orange-400 reprova como texto sobre claro", () => {
    expect(contrastRatio(tokens.orange400, tokens.white)).toBeLessThan(AA_TEXT);
  });
});
