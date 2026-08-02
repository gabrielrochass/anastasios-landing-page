/**
 * Screenshot de cada batida da jornada, e checagem do estado discreto.
 *
 * Existe porque a jornada depende de scroll e de profundidade percebida, e
 * nenhuma das duas se verifica lendo HTML. Foi exatamente o buraco da rodada
 * anterior: entregar componente que nunca rodou num navegador.
 *
 *   node scripts/journey-shots.mjs [url] [largura]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.argv[2] ?? "http://localhost:3002/";
const WIDTH = Number(process.argv[3] ?? 1440);
const HEIGHT = WIDTH < 500 ? 844 : 900;
const OUT = "shots";

const BEATS = [
  "chegada",
  "casco",
  "conves",
  "corredor",
  "abertura",
  "manifesto",
  "partida",
];

mkdirSync(OUT, { recursive: true });

// O Chromium empacotado do Playwright falhou no download nesta máquina.
// Usar o Chrome do sistema é equivalente para o que estamos verificando aqui:
// layout, scroll e estado discreto, não compatibilidade entre engines.
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: "networkidle" });
const window_h = HEIGHT;

// Altura total do track, para posicionar o scroll no meio de cada batida.
const total = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight,
);

console.log(`url ${URL}  viewport ${WIDTH}x${HEIGHT}  scroll total ${total}px\n`);

// A jornada ocupa a primeira parte da página. As faixas vêm de beats.ts.
const RANGES = [
  [0.0, 0.145],
  [0.145, 0.29],
  [0.29, 0.44],
  [0.44, 0.575],
  [0.575, 0.735],
  [0.735, 0.885],
  [0.885, 1.0],
];

// Fração da página que a jornada ocupa: 7 batidas x 220svh.
// O track tem atributo próprio. Consultar por [data-mode="ocean"] pegava o
// header, que também declara esse modo quando está sobre o herói, e o
// resultado era uma fração minúscula.
const track = await page.evaluate(() => {
  const el = document.querySelector("[data-journey-track]");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: el.scrollHeight };
});
if (!track) {
  console.error("track da jornada não encontrado");
  await browser.close();
  process.exit(1);
}
console.log(`track: topo=${Math.round(track.top)} altura=${track.height}`);

for (let i = 0; i < BEATS.length; i++) {
  const [lo, hi] = RANGES[i];
  const mid = (lo + hi) / 2;
  // A batida é medida DENTRO do track, não como fração da página inteira.
  const scrollable = track.height - window_h;
  const y = Math.round(track.top + scrollable * mid);

  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(450);

  const active = await page.evaluate(() => {
    const el = document.querySelector('[aria-current="step"]');
    return el ? el.getAttribute("id") : null;
  });

  const ok = active === BEATS[i];
  console.log(
    `${ok ? "ok  " : "ERRO"} ${String(i).padStart(2, "0")} esperado=${BEATS[i].padEnd(10)} ativo=${active}  y=${y}`,
  );

  await page.screenshot({
    path: `${OUT}/${WIDTH}-${i}-${BEATS[i]}.png`,
  });
}

// Scroll rápido de ponta a ponta: o teste que pega batida pulada.
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(200);
await page.evaluate(
  (top) => window.scrollTo({ top, behavior: "instant" }),
  Math.round(track.top + (track.height - window_h) * 0.95),
);
await page.waitForTimeout(400);
const afterJump = await page.evaluate(() =>
  document.querySelector('[aria-current="step"]')?.getAttribute("id"),
);
console.log(`\nsalto direto do topo para o fim: ativo=${afterJump} (esperado partida)`);

console.log(`\nerros de console: ${errors.length}`);
for (const e of errors.slice(0, 8)) console.log("  " + e);

await browser.close();
