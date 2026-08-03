import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

/**
 * Fotografa e mede cada seção de #detalhe.
 *
 * Mede o que o orçamento de qualidade exige e que nenhum outro script cobre:
 * transbordo horizontal, que é o defeito clássico de grade de N colunas em
 * tela estreita.
 */

const URL = process.argv[2] ?? "http://localhost:3002/";
const W = Number(process.argv[3] ?? 375);
const IDS = [
  "prova",
  "problema",
  "cadeia",
  "credito",
  "tributario",
  "setores",
  "quem-somos",
  "faq",
  "contato",
];

mkdirSync("shots", { recursive: true });

const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: W, height: 900 } });
const erros = [];
p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
await p.goto(URL, { waitUntil: "networkidle" });
await p.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));

console.log("secao".padEnd(12), "altura", "transbordo", "diagnostico");

for (const id of IDS) {
  const m = await p.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    el.scrollIntoView();
    // Transbordo horizontal: qualquer descendente passando da largura do body.
    const limite = document.body.clientWidth;
    let pior = 0;
    for (const n of el.querySelectorAll("*")) {
      const r = n.getBoundingClientRect();
      if (r.width > 0) pior = Math.max(pior, Math.round(r.right - limite));
    }
    return { altura: Math.round(el.getBoundingClientRect().height), pior };
  }, id);

  if (!m) {
    console.log(id.padEnd(12), "  AUSENTE");
    continue;
  }
  await p.waitForTimeout(120);
  await p.screenshot({ path: `shots/sec-${W}-${id}.png` });
  console.log(
    id.padEnd(12),
    String(m.altura).padEnd(6),
    String(m.pior > 0 ? `+${m.pior}px` : "nao").padEnd(10),
    m.pior > 0 ? "TRANSBORDA" : "ok",
  );
}

// A pagina inteira nunca pode rolar na horizontal.
const rolaLado = await p.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
);
console.log(`\nrolagem horizontal da pagina: ${rolaLado ? "SIM, DEFEITO" : "nao"}`);
console.log(`erros de console: ${erros.length}`);
erros.forEach((e) => console.log("  " + e));

await b.close();
