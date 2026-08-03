/**
 * Mede, no mobile, onde o objeto 3D de fato termina e onde o texto começa.
 * Amostra o canvas pixel a pixel procurando o que não é fundo, em vez de
 * confiar em bounding box de DOM, que para um canvas seria a tela inteira.
 */
import { chromium } from "playwright";

const W = 375, H = 844;
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto("http://localhost:3002/", { waitUntil: "networkidle" });

const track = await p.evaluate(() => {
  const el = document.querySelector("[data-journey-track]");
  return { top: el.getBoundingClientRect().top + scrollY, h: el.scrollHeight };
});

const BEATS = ["chegada","casco","conves","corredor","abertura","manifesto","partida"];
const R = [[0,.145],[.145,.29],[.29,.44],[.44,.575],[.575,.735],[.735,.885],[.885,1]];

console.log("batida      header  objTopo objBase  textoTopo  vao   diagnostico");
for (let i = 0; i < BEATS.length; i++) {
  const mid = (R[i][0] + R[i][1]) / 2;
  await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }),
    Math.round(track.top + (track.h - H) * mid));
  await p.waitForTimeout(420);

  // Mede o TEXTO antes de escondê-lo.
  const textTop = await p.evaluate(() => {
    const sec = document.querySelector('[aria-current="step"]');
    if (!sec) return null;
    const els = [...sec.querySelectorAll("p,h1,h2,h3,summary,a")]
      .filter((e) => e.checkVisibility?.() && e.textContent.trim());
    return els.length ? Math.round(Math.min(...els.map((e) => e.getBoundingClientRect().top))) : null;
  });

  // Esconde o texto ANTES da captura. O eyebrow e o botão usam o mesmo óxido
  // saturado do contêiner, então a detecção por saturação os contava como
  // objeto e a base dava sempre 670, que era o botão.
  await p.evaluate(() => {
    document.querySelectorAll("section[aria-label], header, [data-journey-track] > div > section, [data-journey-progress]")
      .forEach((e) => (e.style.visibility = "hidden"));
  });
  await p.waitForTimeout(120);
  const png = (await p.screenshot()).toString("base64");
  await p.evaluate(() => {
    document.querySelectorAll("section[aria-label], header, [data-journey-track] > div > section, [data-journey-progress]")
      .forEach((e) => (e.style.visibility = ""));
  });

  const m = await p.evaluate(async (png) => {
    const header = document.querySelector("header");
    const hb = header ? header.getBoundingClientRect().bottom : 0;

    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = "data:image/png;base64," + png; });
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const cx = c.getContext("2d");
    cx.drawImage(img, 0, 0);
    const d = cx.getImageData(0, 0, c.width, c.height).data;
    const sx = c.width / window.innerWidth, sy = c.height / window.innerHeight;

    // O fundo do ciclorama e claro e dessaturado. O objeto e oxido saturado.
    // Saturacao separa os dois melhor que luminancia.
    let top = null, bottom = null;
    for (let y = 0; y < c.height; y += 2) {
      let hit = false;
      for (let x = 0; x < c.width; x += 3) {
        const o = (y * c.width + x) * 4;
        const r = d[o], g = d[o+1], bl = d[o+2];
        const mx = Math.max(r,g,bl), mn = Math.min(r,g,bl);
        if (mx - mn > 42) { hit = true; break; }
      }
      if (hit) { if (top === null) top = y; bottom = y; }
    }
    return {
      headerBottom: Math.round(hb),
      objTop: top === null ? null : Math.round(top / sy),
      objBottom: bottom === null ? null : Math.round(bottom / sy),
    };
  }, png);
  m.textTop = textTop;

  const gap = m.textTop !== null && m.objBottom !== null ? m.textTop - m.objBottom : null;
  const diag = [];
  if (m.objTop !== null && m.objTop < m.headerBottom) diag.push(`CORTADO pelo header em ${m.headerBottom - m.objTop}px`);
  if (gap !== null && gap > 120) diag.push(`VAO de ${gap}px`);
  console.log(
    `${BEATS[i].padEnd(11)} ${String(m.headerBottom).padStart(5)} ${String(m.objTop).padStart(8)} ${String(m.objBottom).padStart(8)} ${String(m.textTop).padStart(10)} ${String(gap).padStart(6)}   ${diag.join(", ") || "ok"}`
  );
}
await b.close();
