/**
 * SCRIPT TEMPORARIO DE AUDITORIA. Nao faz parte do produto.
 *
 * Mede contraste real de texto sobre a cena 3D clara.
 *
 * Como funciona:
 *  1. Abre a pagina no mesmo viewport e no mesmo scroll de scripts/journey-shots.mjs.
 *  2. Para cada batida, extrai o retangulo de CADA linha de texto (Range sobre
 *     os text nodes) e a cor computada daquele texto.
 *  3. Tira uma "chapa limpa": esconde o conteudo da batida (visibility:hidden,
 *     que preserva o layout) e fotografa so o fundo. Sem isso o pixel mais
 *     escuro da regiao seria a propria tinta do texto.
 *  4. Decodifica os PNGs via canvas dentro do proprio browser (sem pngjs) e
 *     acha min/max de luminancia relativa WCAG dentro de cada retangulo.
 *  5. Calcula contraste entre a cor real do texto e o PIOR fundo daquele
 *     retangulo.
 *  6. Repete a amostragem sobre as 14 capturas ja existentes em shots/, para
 *     conferir que a chapa limpa e as capturas concordam.
 *
 *   node scripts/_audit.mjs [url]
 */
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";

const URL = process.argv[2] ?? "http://localhost:3002/";
const BEATS = [
  "chegada",
  "casco",
  "conves",
  "corredor",
  "abertura",
  "manifesto",
  "partida",
];
const RANGES = [
  [0.0, 0.145],
  [0.145, 0.29],
  [0.29, 0.44],
  [0.44, 0.575],
  [0.575, 0.735],
  [0.735, 0.885],
  [0.885, 1.0],
];

const WIDTHS = [1440, 375];

/* --- WCAG, no lado do Node --- */
const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const parseColor = (css) => {
  const m = css.match(/-?[\d.]+/g).map(Number);
  return { r: m[0], g: m[1], b: m[2] };
};
const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const browser = await chromium.launch({ channel: "chrome" });

/* Aba auxiliar so para decodificar PNG com canvas. */
const decoder = await browser.newPage();
await decoder.goto("about:blank");

/**
 * Recebe um PNG em base64 e uma lista de retangulos. Devolve, por retangulo,
 * o pixel mais claro e o mais escuro por luminancia relativa.
 */
async function sample(b64, rects, excl = []) {
  return decoder.evaluate(
    async ({ b64, rects, excl }) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const cv = document.createElement("canvas");
      cv.width = img.naturalWidth;
      cv.height = img.naturalHeight;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const lin = (c) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      const lum = (r, g, b) =>
        0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

      return rects.map((rc) => {
        const x = Math.max(0, Math.floor(rc.x));
        const y = Math.max(0, Math.floor(rc.y));
        const w = Math.min(cv.width - x, Math.ceil(rc.w));
        const h = Math.min(cv.height - y, Math.ceil(rc.h));
        if (w <= 0 || h <= 0) return null;
        void 0;
        const d = ctx.getImageData(x, y, w, h).data;
        let lo = Infinity,
          hi = -Infinity,
          loPx = null,
          hiPx = null,
          loAt = null,
          sum = 0,
          n = 0,
          bad = 0;
        const ratio = (a, b) =>
          (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        for (let i = 0; i < d.length; i += 4) {
          // Pixel coberto por elemento com fundo proprio (card, botao) nao e
          // "cena": ele nao depende da camera e nao entra nesta conta.
          if (excl.length) {
            const px = x + ((i / 4) % w);
            const py = y + Math.floor(i / 4 / w);
            let skip = false;
            for (const e of excl) {
              if (px >= e.x && px < e.x + e.w && py >= e.y && py < e.y + e.h) {
                skip = true;
                break;
              }
            }
            if (skip) continue;
          }
          const L = lum(d[i], d[i + 1], d[i + 2]);
          sum += L;
          n++;
          // Fracao da area da linha cujo fundo ja reprova contra este texto.
          if (rc.tl != null && ratio(rc.tl, L) < rc.need) bad++;
          if (L < lo) {
            lo = L;
            loPx = [d[i], d[i + 1], d[i + 2]];
            loAt = [x + ((i / 4) % w), y + Math.floor(i / 4 / w)];
          }
          if (L > hi) {
            hi = L;
            hiPx = [d[i], d[i + 1], d[i + 2]];
          }
        }
        if (!n) return null;
        return {
          lo,
          hi,
          loPx,
          hiPx,
          loAt,
          mean: sum / n,
          n,
          failFrac: bad / n,
          box: { x, y, w, h },
        };
      });
    },
    { b64, rects, excl },
  );
}

const report = [];

for (const WIDTH of WIDTHS) {
  const HEIGHT = WIDTH < 500 ? 844 : 900;
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  await page.goto(URL, { waitUntil: "networkidle" });

  const track = await page.evaluate(() => {
    const el = document.querySelector("[data-journey-track]");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.scrollHeight };
  });

  console.log(`\n=== ${WIDTH}x${HEIGHT}  track topo=${Math.round(track.top)} altura=${track.height}`);

  for (let i = 0; i < BEATS.length; i++) {
    const [lo, hi] = RANGES[i];
    const mid = (lo + hi) / 2;
    const y = Math.round(track.top + (track.height - HEIGHT) * mid);
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(600);

    /* Retangulos de linha de cada text node da batida ativa, com cor real.
       checkVisibility pega o <details> fechado, que no Chrome atual usa
       content-visibility:hidden e ainda devolve retangulo fantasma. */
    const runs = await page.evaluate(() => {
      const sec = document.querySelector('[aria-current="step"]');
      if (!sec) return [];
      const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
      const out = [];
      let node;
      while ((node = walker.nextNode())) {
        if (!node.nodeValue.trim()) continue;
        const el = node.parentElement;
        if (
          !el.checkVisibility({
            contentVisibilityAuto: true,
            opacityProperty: true,
            visibilityProperty: true,
          })
        )
          continue;
        const cs = getComputedStyle(el);
        // O texto esta direto sobre a cena 3D, ou sobre um fundo proprio
        // (card bg-surface, botao bg-accent)? So o primeiro caso e refem da
        // camera.
        let onCanvas = true;
        for (let a = el; a && a !== sec.parentElement; a = a.parentElement) {
          const bg = getComputedStyle(a).backgroundColor;
          const m = bg.match(/[\d.]+/g);
          if (m && (m.length < 4 || Number(m[3]) > 0.05)) {
            onCanvas = false;
            break;
          }
        }
        const rng = document.createRange();
        rng.selectNodeContents(node);
        for (const r of rng.getClientRects()) {
          if (r.width < 2 || r.height < 2) continue;
          // Recorta ao viewport em vez de so deslocar a origem.
          const x0 = Math.max(0, r.left);
          const y0 = Math.max(0, r.top);
          const x1 = Math.min(innerWidth, r.right);
          const y1 = Math.min(innerHeight, r.bottom);
          if (x1 - x0 < 2 || y1 - y0 < 2) continue;
          out.push({
            text: node.nodeValue.trim().slice(0, 46),
            onCanvas,
            color: cs.color,
            font: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
            size: parseFloat(cs.fontSize),
            weight: cs.fontWeight,
            lh: parseFloat(cs.lineHeight),
            x: x0,
            y: y0,
            w: x1 - x0,
            h: y1 - y0,
          });
        }
      }
      return out;
    });

    /* Chapa limpa: apaga so a TINTA. `color: transparent` preserva fundo de
       botao, borda de card e layout, que `visibility:hidden` destruiria e
       faria o rotulo de um botao copper ser medido contra a cena atras dele. */
    await page.addStyleTag({
      content: `[aria-current="step"], [aria-current="step"] * {
        color: transparent !important;
        -webkit-text-fill-color: transparent !important;
        text-shadow: none !important;
        text-decoration-color: transparent !important;
      }`,
    });
    await page.waitForTimeout(150);
    const plate = (await page.screenshot()).toString("base64");
    await page.evaluate(() => {
      const tags = document.querySelectorAll("style");
      tags[tags.length - 1].remove();
    });

    const big = (r) =>
      r.size >= 24 || (r.size >= 18.66 && Number(r.weight) >= 700);
    const rects = runs.map((r) => {
      const c = parseColor(r.color);
      return {
        x: r.x,
        y: r.y,
        w: r.w,
        h: r.h,
        tl: lum(c.r, c.g, c.b),
        need: big(r) ? 3.0 : 4.5,
      };
    });
    const plateStats = rects.length ? await sample(plate, rects) : [];

    /* A mesma amostragem sobre a captura ja existente em shots/. */
    /* Onde o objeto invade a faixa do texto.
       Varre coluna a coluna dentro da banda vertical ocupada pelo texto e acha
       o primeiro x que ja nao suporta o texto MAIS FRACO do sistema
       (content-muted #5c5952, que precisa de 4.5:1). Isso da a largura util
       real da coluna, que e o numero que a correcao precisa. */
    /* Retangulos de tudo que tem fundo proprio dentro da batida. */
    const excl = await page.evaluate(() => {
      const sec = document.querySelector('[aria-current="step"]');
      if (!sec) return [];
      const out = [];
      for (const el of sec.querySelectorAll("*")) {
        const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
        if (!m) continue;
        if (m.length >= 4 && Number(m[3]) <= 0.05) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        // Inflado em 34px: --shadow-raised tem 30px de blur, e o derrame do
        // sombreado do botao estava sendo lido como "o objeto invadiu aqui".
        const pad = 34;
        out.push({
          x: r.left - pad,
          y: r.top - pad,
          w: r.width + pad * 2,
          h: r.height + pad * 2,
        });
      }
      return out;
    });

    const onCanvas = runs.filter((r) => r.onCanvas);
    if (onCanvas.length) {
      const bandTop = Math.floor(Math.min(...onCanvas.map((r) => r.y)));
      const bandBot = Math.ceil(Math.max(...onCanvas.map((r) => r.y + r.h)));
      const muted = lum(0x5c, 0x59, 0x52);
      const cols = await sample(
        plate,
        Array.from({ length: WIDTH }, (_, x) => ({
          x,
          y: bandTop,
          w: 1,
          h: bandBot - bandTop,
        })),
        excl,
      );
      let firstBad = -1;
      for (let x = 0; x < cols.length; x++) {
        if (!cols[x]) continue;
        if (ratio(muted, cols[x].lo) < 4.5) {
          firstBad = x;
          break;
        }
      }
      console.log(
        `\n-- ${WIDTH} / ${i} ${BEATS[i]}  banda de texto y ${bandTop}..${bandBot}` +
          `  |  objeto invade a partir de x=${firstBad === -1 ? "nunca" : firstBad}` +
          `  (coluna util = ${firstBad === -1 ? WIDTH : firstBad}px de ${WIDTH})` +
          (firstBad === -1 ? "" : `  pixel culpado em y=${cols[firstBad].loAt[1]} cor ${hex(...cols[firstBad].loPx)}`),
      );
    }

    const shotPath = `shots/${WIDTH}-${i}-${BEATS[i]}.png`;
    let shotStats = [];
    if (existsSync(shotPath) && rects.length) {
      shotStats = await sample(readFileSync(shotPath).toString("base64"), rects);
    }

    console.log(`\n-- ${WIDTH} / ${i} ${BEATS[i]}  (y=${y})  ${runs.length} runs`);
    if (!runs.length) console.log("   (batida silenciosa, sem texto)");

    for (let k = 0; k < runs.length; k++) {
      const r = runs[k];
      const p = plateStats[k];
      if (!p) continue;
      const c = parseColor(r.color);
      const Lt = lum(c.r, c.g, c.b);
      const cWorst = ratio(Lt, p.hi > Lt ? p.lo : p.hi); // pior fundo p/ esse texto
      const cAgainstLightest = ratio(Lt, p.hi);
      const cAgainstDarkest = ratio(Lt, p.lo);
      const worst = Math.min(cAgainstLightest, cAgainstDarkest);
      /* Na captura gravada o texto ESTA presente, entao o pixel mais escuro
         do retangulo e a propria tinta. O que se pode comparar entre a chapa
         limpa e a captura e o pixel mais CLARO, que e fundo nos dois casos.
         Se baterem, a chapa limpa representa mesmo o que esta em shots/. */
      const s = shotStats[k];
      const shotWorst = s ? ratio(Lt, s.hi) : null;
      const shotLightDelta = s ? Math.abs(s.hi - p.hi) : null;

      report.push({
        w: WIDTH,
        beat: BEATS[i],
        text: r.text,
        font: r.font,
        size: r.size,
        weight: r.weight,
        lh: r.lh,
        color: hex(c.r, c.g, c.b),
        bgLightest: hex(...p.hiPx),
        bgDarkest: hex(...p.loPx),
        worst,
        shotWorst,
        shotLightDelta,
        failFrac: p.failFrac,
        box: p.box,
      });

      console.log(
        `   ${String(Math.round(r.size)).padStart(3)}px/${r.weight} ${r.font.padEnd(18)} ` +
          `cor ${hex(c.r, c.g, c.b)}  fundo ${hex(...p.loPx)}..${hex(...p.hiPx)}  ` +
          `pior ${worst.toFixed(2)}:1  area_reprovada ${(p.failFrac * 100).toFixed(0)}%  ` +
          `y ${p.box.y}..${p.box.y + p.box.h}  "${r.text}"`,
      );
      void cWorst;
      void shotWorst;
    }
  }
  await page.close();
}

/* --- Resumo --- */
console.log("\n\n================ RESUMO ================");
const fails = report
  .slice()
  .sort((a, b) => a.worst - b.worst);

const isLarge = (r) =>
  r.size >= 24 || (r.size >= 18.66 && Number(r.weight) >= 700);

console.log("\nPIORES 18 PARES:");
for (const r of fails.slice(0, 18)) {
  const need = isLarge(r) ? 3.0 : 4.5;
  const verdict = r.worst >= need ? "PASSA" : "REPROVA";
  console.log(
    `  ${verdict.padEnd(8)} ${r.worst.toFixed(2)}:1 (min ${need}) area_reprovada ${String(Math.round(r.failFrac * 100)).padStart(3)}%  ` +
      `${r.w} ${r.beat.padEnd(10)} ` +
      `${Math.round(r.size)}px ${r.color} sobre ${r.bgDarkest}..${r.bgLightest}  "${r.text}"`,
  );
}

const reprovados = report.filter(
  (r) => r.worst < (isLarge(r) ? 3.0 : 4.5),
);
console.log(`\ntotal de runs medidos: ${report.length}`);
console.log(`reprovados AA: ${reprovados.length}`);
console.log(
  `menor contraste medido: ${fails[0].worst.toFixed(2)}:1  (${fails[0].w} ${fails[0].beat})`,
);

/* Concordancia entre chapa limpa e as 14 capturas ja gravadas. */
const withShot = report.filter((r) => r.shotLightDelta != null);
const diffs = withShot.map((r) => r.shotLightDelta);
if (diffs.length) {
  console.log(
    `\nvalidacao chapa limpa vs as 14 capturas de shots/ (luminancia do pixel` +
      ` mais claro do mesmo retangulo): n=${diffs.length} ` +
      `delta medio ${(diffs.reduce((a, b) => a + b) / diffs.length).toFixed(4)} ` +
      `delta max ${Math.max(...diffs).toFixed(4)}`,
  );
}

/* Faixa de luminancia do fundo por batida, que e o numero de "estabilidade". */
console.log("\nFAIXA DE FUNDO SOB O TEXTO (por batida):");
const byBeat = new Map();
for (const r of report) {
  const k = `${r.w} ${r.beat}`;
  if (!byBeat.has(k)) byBeat.set(k, []);
  byBeat.get(k).push(r);
}
for (const [k, rs] of byBeat) {
  const lows = rs.map((r) => r.bgDarkest);
  const highs = rs.map((r) => r.bgLightest);
  const worst = Math.min(...rs.map((r) => r.worst));
  console.log(
    `  ${k.padEnd(18)} escuro ${lows.sort()[0]}  claro ${highs.sort().at(-1)}  pior par ${worst.toFixed(2)}:1`,
  );
}

await browser.close();

/* ============================================================
 * VARREDURA CONTINUA
 *
 * As medidas acima sao no MEIO de cada batida. A camera nao para nos meios, e
 * entre duas batidas as duas copies coexistem em opacidade parcial. Esta
 * passada anda 41 posicoes de scroll e, em CADA uma, remede os retangulos de
 * linha reais de toda secao com opacidade > 0.05. Nao e caixa nominal: e onde
 * a tinta cai naquele instante.
 * ============================================================ */
{
  const sw = await chromium.launch({ channel: "chrome" });
  const dec2 = await sw.newPage();
  await dec2.goto("about:blank");

  const minLum = async (b64, rects) =>
    dec2.evaluate(
      async ({ b64, rects }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const lin = (c) => {
          const s = c / 255;
          return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        let lo = Infinity, px = null;
        for (const r of rects) {
          const x = Math.max(0, Math.floor(r.x));
          const y = Math.max(0, Math.floor(r.y));
          const w = Math.min(cv.width - x, Math.ceil(r.w));
          const h = Math.min(cv.height - y, Math.ceil(r.h));
          if (w <= 0 || h <= 0) continue;
          const d = ctx.getImageData(x, y, w, h).data;
          for (let i = 0; i < d.length; i += 4) {
            const L =
              0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
            if (L < lo) { lo = L; px = [d[i], d[i + 1], d[i + 2]]; }
          }
        }
        return { lo, px };
      },
      { b64, rects },
    );

  console.log("\n\n======= VARREDURA CONTINUA DO SCROLL =======");
  console.log("(retangulos de linha reais, so texto direto sobre a cena)\n");

  for (const WIDTH of WIDTHS) {
    const HEIGHT = WIDTH < 500 ? 844 : 900;
    const page = await sw.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.goto(URL, { waitUntil: "networkidle" });
    const track = await page.evaluate(() => {
      const el = document.querySelector("[data-journey-track]");
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: el.scrollHeight };
    });

    const inkL = lum(0x10, 0x16, 0x1a);
    const mutedL = lum(0x5c, 0x59, 0x52);
    let badInk = 0, badMuted = 0, n = 0;
    const rows = [];

    for (let s = 0; s <= 40; s++) {
      const p = s / 40;
      const y = Math.round(track.top + (track.height - HEIGHT) * p);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(280);

      const rects = await page.evaluate(() => {
        const out = [];
        for (const sec of document.querySelectorAll("[data-journey-track] section")) {
          if (Number(getComputedStyle(sec).opacity) <= 0.05) continue;
          const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            if (!node.nodeValue.trim()) continue;
            const el = node.parentElement;
            if (!el.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true })) continue;
            let onCanvas = true;
            for (let a = el; a && a !== sec.parentElement; a = a.parentElement) {
              const m = getComputedStyle(a).backgroundColor.match(/[\d.]+/g);
              if (m && (m.length < 4 || Number(m[3]) > 0.05)) { onCanvas = false; break; }
            }
            if (!onCanvas) continue;
            const rng = document.createRange();
            rng.selectNodeContents(node);
            for (const r of rng.getClientRects()) {
              if (r.width < 2 || r.height < 2) continue;
              const x0 = Math.max(0, r.left), y0 = Math.max(0, r.top);
              const x1 = Math.min(innerWidth, r.right), y1 = Math.min(innerHeight, r.bottom);
              if (x1 - x0 < 2 || y1 - y0 < 2) continue;
              out.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
            }
          }
        }
        return out;
      });
      if (!rects.length) continue;

      await page.addStyleTag({
        content: `[data-journey-track] section, [data-journey-track] section * {
          color: transparent !important; -webkit-text-fill-color: transparent !important; }`,
      });
      await page.waitForTimeout(90);
      const shot = (await page.screenshot()).toString("base64");
      await page.evaluate(() => {
        const t = document.querySelectorAll("style");
        t[t.length - 1].remove();
      });

      const r = await minLum(shot, rects);
      const cInk = ratio(inkL, r.lo);
      const cMut = ratio(mutedL, r.lo);
      n++;
      if (cInk < 3.0) badInk++;
      if (cMut < 4.5) badMuted++;
      rows.push({ p, cInk, cMut, px: hex(...r.px), nr: rects.length });
    }

    rows.sort((a, b) => a.cInk - b.cInk);
    console.log(`${WIDTH}px  ${n} posicoes de scroll amostradas`);
    console.log(
      `  pior fundo vs headline #10161a (min 3.0):  reprova em ${badInk}/${n} = ${((badInk / n) * 100).toFixed(0)}% do scroll`,
    );
    console.log(
      `  pior fundo vs corpo    #5c5952 (min 4.5):  reprova em ${badMuted}/${n} = ${((badMuted / n) * 100).toFixed(0)}% do scroll`,
    );
    console.log("  piores 8 posicoes:");
    for (const w of rows.slice(0, 8))
      console.log(
        `    p=${w.p.toFixed(3)}  fundo ${w.px}  headline ${w.cInk.toFixed(2)}:1  corpo ${w.cMut.toFixed(2)}:1  (${w.nr} linhas)`,
      );
    console.log("");
    await page.close();
  }
  await sw.close();
}


/* ============================================================
 * MEDIDA DA FONTE
 *
 * Duas perguntas, respondidas com pixel e nao com gosto:
 *
 *  A. CONTRASTE DE TRACO. Renderiza "o" e mede a haste (traco grosso) e o
 *     filete (traco fino, no topo da barriga). A razao entre os dois e o
 *     contraste de traco da fonte. Depois renderiza no tamanho REAL de uso e
 *     mede que tom de cinza o filete chega a atingir sob antialias: se o
 *     filete for mais fino que 1px, ele nao pinta tinta cheia, e o contraste
 *     EFETIVO daquele traco e muito menor que o nominal do token.
 *
 *  B. FOLGA DE ACENTO. Mede a subida real de maiuscula acentuada e a descida
 *     real de cedilha, e calcula a entrelinha minima que evita colisao.
 * ============================================================ */
{
  const fb = await chromium.launch({ channel: "chrome" });
  const page = await fb.newPage({ viewport: { width: 1200, height: 800 } });
  await page.goto(URL, { waitUntil: "networkidle" });

  // Newsreader nao esta no projeto. Carrega do Google so para comparar.
  const gotNewsreader = await page.evaluate(async () => {
    try {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=block";
      document.head.appendChild(l);
      await new Promise((r) => {
        l.onload = r;
        setTimeout(r, 5000);
      });
      await document.fonts.load('400 64px "Newsreader"');
      return document.fonts.check('400 64px "Newsreader"');
    } catch {
      return false;
    }
  });

  const out = await page.evaluate(async (gotNewsreader) => {
    await document.fonts.ready;
    const serif = getComputedStyle(document.querySelector("h1")).fontFamily;
    const sans = getComputedStyle(document.body).fontFamily;

    const cv = document.createElement("canvas");
    const ctx = cv.getContext("2d", { willReadFrequently: true });

    const BG = [0xde, 0xdc, 0xd7]; // fundo medido sob o texto na cena
    const FG = "#10161a";
    const lin = (c) => {
      const s = c / 255;
      return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const cr = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

    /** Desenha um glifo e devolve o ImageData. */
    function draw(fam, px, ch, weight) {
      const pad = Math.ceil(px * 0.6);
      cv.width = Math.ceil(px * 2 + pad * 2);
      cv.height = Math.ceil(px * 2 + pad * 2);
      ctx.fillStyle = "rgb(" + BG[0] + "," + BG[1] + "," + BG[2] + ")";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = FG;
      ctx.textBaseline = "alphabetic";
      ctx.font = weight + " " + px + "px " + fam;
      ctx.fillText(ch, pad, pad + px);
      const d = ctx.getImageData(0, 0, cv.width, cv.height);
      return { d, w: cv.width, h: cv.height };
    }

    const bgL = L(BG[0], BG[1], BG[2]);
    const inkL = L(0x10, 0x16, 0x1a);

    /** Espessura de traco em px, e o tom mais escuro que ele atinge. */
    function strokes(fam, px, weight) {
      const r0 = draw(fam, px, "o", weight || 400);
      const d = r0.d,
        w = r0.w,
        h = r0.h;
      const at = (x, y) => {
        const i = (y * w + x) * 4;
        return L(d.data[i], d.data[i + 1], d.data[i + 2]);
      };
      const isInk = (x, y) => at(x, y) < bgL * 0.97;
      let x0 = w,
        x1 = -1,
        y0 = h,
        y1 = -1;
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
          if (isInk(x, y)) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
      if (x1 < 0) return null;
      const cx = Math.round((x0 + x1) / 2);
      const cy = Math.round((y0 + y1) / 2);

      // HASTE: linha horizontal pelo meio do "o" cruza as duas hastes.
      let run = 0,
        stem = 0;
      for (let x = x0; x <= x1; x++) {
        if (isInk(x, cy)) run++;
        else {
          if (run > stem) stem = run;
          run = 0;
        }
      }
      if (run > stem) stem = run;

      // FILETE: coluna vertical pelo meio cruza o topo e a base da barriga.
      run = 0;
      let hair = Infinity,
        hairDarkest = 1;
      for (let y = y0; y <= y1; y++) {
        if (isInk(cx, y)) {
          run++;
          const v = at(cx, y);
          if (v < hairDarkest) hairDarkest = v;
        } else {
          if (run > 0 && run < hair) hair = run;
          run = 0;
        }
      }
      if (run > 0 && run < hair) hair = run;

      return {
        stem: stem,
        hair: hair === Infinity ? 0 : hair,
        hairDarkest: hairDarkest,
        // Contraste EFETIVO do filete: o tom que ele de fato atinge contra o
        // fundo, nao a cor nominal do token.
        hairContrast: cr(hairDarkest, bgL),
      };
    }

    /** Subida de acento e descida de cedilha, em em. */
    function verticals(fam, px, weight) {
      px = px || 200;
      ctx.font = (weight || 400) + " " + px + "px " + fam;
      ctx.textBaseline = "alphabetic";
      const asc = (s) => ctx.measureText(s).actualBoundingBoxAscent / px;
      const desc = (s) => ctx.measureText(s).actualBoundingBoxDescent / px;
      const accCaps = "ÁÂÃÀÉÊÍÓÔÕÚ".split("");
      const maxAccAsc = Math.max.apply(null, accCaps.map(asc));
      const cedilla = Math.max(desc("ç"), desc("Ç"));
      const maxDesc = Math.max.apply(
        null,
        ["g", "p", "q", "j", "y", "ç", "Ç"].map(desc),
      );
      return {
        capAsc: asc("H"),
        accAsc: maxAccAsc,
        xh: asc("x"),
        cedilla: cedilla,
        maxDesc: maxDesc,
        // Entrelinha minima para o acento da linha de baixo nao encostar na
        // cedilha da linha de cima.
        minLH: maxAccAsc + maxDesc,
      };
    }

    const fams = [
      ["Instrument Serif", serif],
      ["Inter", sans],
    ];
    if (gotNewsreader) fams.push(["Newsreader", '"Newsreader", serif']);

    const res = { nominalContrast: cr(inkL, bgL), fonts: {} };
    for (const pair of fams) {
      res.fonts[pair[0]] = {
        vert: verticals(pair[1]),
        design: strokes(pair[1], 400),
        px64: strokes(pair[1], 64),
        px36: strokes(pair[1], 36),
        px21: strokes(pair[1], 21),
        px17: strokes(pair[1], 17),
      };
    }
    return res;
  }, gotNewsreader);

  console.log("\n\n======= MEDIDA DA FONTE =======");
  console.log(
    "fundo de referencia #dedcd7, tinta #10161a, contraste NOMINAL " +
      out.nominalContrast.toFixed(2) +
      ":1",
  );
  console.log("Newsreader carregado para comparacao: " + gotNewsreader + "\n");

  for (const name of Object.keys(out.fonts)) {
    const f = out.fonts[name];
    const v = f.vert;
    console.log("--- " + name);
    console.log(
      "  vertical (em):  altura-x " +
        v.xh.toFixed(3) +
        "  maiuscula " +
        v.capAsc.toFixed(3) +
        "  maiuscula ACENTUADA " +
        v.accAsc.toFixed(3) +
        "  cedilha " +
        v.cedilla.toFixed(3) +
        "  descida max " +
        v.maxDesc.toFixed(3),
    );
    console.log(
      "  entrelinha minima sem colisao = " +
        v.minLH.toFixed(3) +
        "   (o projeto usa 1.17 no display)",
    );
    const d = f.design;
    console.log(
      "  desenho a 400px: haste " +
        d.stem +
        "px  filete " +
        d.hair +
        "px  contraste de traco 1:" +
        (d.stem / d.hair).toFixed(2),
    );
    const sizes = [
      ["64px", f.px64, 64],
      ["36px", f.px36, 36],
      ["21px", f.px21, 21],
      ["17px", f.px17, 17],
    ];
    for (const row of sizes) {
      const s = row[1];
      if (!s) continue;
      const nominalHair = (d.hair / 400) * row[2];
      console.log(
        "  " +
          row[0].padEnd(5) +
          ": haste " +
          String(s.stem).padStart(2) +
          "px  filete teorico " +
          nominalHair.toFixed(2) +
          "px  medido " +
          s.hair +
          "px  contraste EFETIVO do filete " +
          s.hairContrast.toFixed(2) +
          ":1",
      );
    }
    console.log("");
  }
  await fb.close();
}


/* ============================================================
 * PERFIL POR LINHA
 *
 * Converte "tem sobreposicao" em "o texto precisa descer N px" / "a coluna
 * precisa terminar em N px". Para cada batida que reprovou, varre linha a
 * linha e coluna a coluna a chapa limpa e devolve a fronteira do objeto
 * dentro da area de leitura.
 * ============================================================ */
{
  const rb = await chromium.launch({ channel: "chrome" });
  const dec3 = await rb.newPage();
  await dec3.goto("about:blank");

  const profile = async (b64, box) =>
    dec3.evaluate(
      async ({ b64, box }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const lin = (c) => {
          const s = c / 255;
          return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        const d = ctx.getImageData(box.x, box.y, box.w, box.h).data;
        const rows = [],
          cols = new Array(box.w).fill(Infinity);
        for (let y = 0; y < box.h; y++) {
          let lo = Infinity;
          for (let x = 0; x < box.w; x++) {
            const i = (y * box.w + x) * 4;
            const L =
              0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
            if (L < lo) lo = L;
            if (L < cols[x]) cols[x] = L;
          }
          rows.push(lo);
        }
        return { rows, cols };
      },
      { b64, box },
    );

  const CASES = [
    { w: 1440, i: 2, box: { x: 168, y: 120, w: 768, h: 700 } },
    { w: 1440, i: 5, box: { x: 168, y: 120, w: 768, h: 700 } },
    { w: 1440, i: 6, box: { x: 168, y: 120, w: 768, h: 700 } },
    { w: 375, i: 2, box: { x: 20, y: 80, w: 335, h: 700 } },
  ];

  console.log("\n\n======= PERFIL POR LINHA E POR COLUNA =======");
  console.log("(limite = 3.0:1 para o display #10161a, 4.5:1 para o corpo #5c5952)\n");

  const inkL = lum(0x10, 0x16, 0x1a);
  const mutedL = lum(0x5c, 0x59, 0x52);

  for (const W of [1440, 375]) {
    const HEIGHT = W < 500 ? 844 : 900;
    const page = await rb.newPage({
      viewport: { width: W, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.goto(URL, { waitUntil: "networkidle" });
    const track = await page.evaluate(() => {
      const el = document.querySelector("[data-journey-track]");
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: el.scrollHeight };
    });

    for (const c of CASES.filter((c) => c.w === W)) {
      const [lo, hi] = RANGES[c.i];
      const mid = (lo + hi) / 2;
      const y = Math.round(track.top + (track.height - HEIGHT) * mid);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(600);
      await page.addStyleTag({
        content:
          "[data-journey-track] section, [data-journey-track] section * { color: transparent !important; -webkit-text-fill-color: transparent !important; }",
      });
      await page.waitForTimeout(120);
      const shot = (await page.screenshot()).toString("base64");
      const pr = await profile(shot, c.box);

      // Primeira linha, de cima para baixo, a partir da qual TODAS as linhas
      // abaixo suportam texto de corpo.
      let safeFrom = -1;
      for (let r = pr.rows.length - 1; r >= 0; r--) {
        if (ratio(mutedL, pr.rows[r]) < 4.5) {
          safeFrom = c.box.y + r + 1;
          break;
        }
      }
      // Ultima coluna, da esquerda para a direita, ate a qual TODAS as colunas
      // a esquerda suportam texto de corpo.
      let safeUntil = c.box.x + c.box.w;
      for (let x = 0; x < pr.cols.length; x++) {
        if (ratio(mutedL, pr.cols[x]) < 4.5) {
          safeUntil = c.box.x + x;
          break;
        }
      }
      let safeUntilInk = c.box.x + c.box.w;
      for (let x = 0; x < pr.cols.length; x++) {
        if (ratio(inkL, pr.cols[x]) < 3.0) {
          safeUntilInk = c.box.x + x;
          break;
        }
      }
      console.log(
        `${W} / ${c.i} ${BEATS[c.i]}  (caixa x${c.box.x}..${c.box.x + c.box.w} y${c.box.y}..${c.box.y + c.box.h})`,
      );
      console.log(
        `   objeto ocupa ate y=${safeFrom - 1}; abaixo disso a coluna inteira e limpa`,
      );
      console.log(
        `   coluna limpa ate x=${safeUntil} (corpo 4.5:1) / x=${safeUntilInk} (display 3.0:1)` +
          `  -> largura util a partir de x=${c.box.x}: ${safeUntil - c.box.x}px / ${safeUntilInk - c.box.x}px`,
      );
      await page.evaluate(() => {
        const t = document.querySelectorAll("style");
        t[t.length - 1].remove();
      });
    }
    await page.close();
  }
  await rb.close();
}
