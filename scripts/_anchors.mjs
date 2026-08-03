import { chromium } from "playwright";

const URL = "http://localhost:3002/";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(URL, { waitUntil: "networkidle" });

// Toda ancora usada em href, e onde ela realmente aterrissa.
const alvos = await p.evaluate(() => {
  const hrefs = [
    ...new Set(
      [...document.querySelectorAll('a[href*="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.includes("#") && !h.startsWith("http")),
    ),
  ];
  return hrefs.map((h) => {
    const id = h.split("#")[1];
    const el = id && document.getElementById(id);
    if (!el) return { href: h, existe: false };
    const cs = getComputedStyle(el);
    // Um filho absolute de um sticky nao tem posicao de documento propria.
    let anc = el.parentElement,
      dentroDeSticky = false;
    while (anc && anc !== document.body) {
      if (getComputedStyle(anc).position === "sticky") dentroDeSticky = true;
      anc = anc.parentElement;
    }
    return {
      href: h,
      existe: true,
      pos: cs.position,
      dentroDeSticky,
      topoAbs: Math.round(el.getBoundingClientRect().top + window.scrollY),
    };
  });
});

console.log("ancora".padEnd(16), "existe", "posicao".padEnd(9), "emSticky", "topo");
for (const a of alvos) {
  const bug = a.existe && a.pos === "absolute" && a.dentroDeSticky;
  console.log(
    a.href.padEnd(16),
    String(a.existe).padEnd(6),
    (a.pos ?? "").padEnd(9),
    String(a.dentroDeSticky ?? "").padEnd(8),
    String(a.topoAbs ?? ""),
    bug ? "  <== NAO NAVEGA" : a.existe ? "" : "  <== ID INEXISTENTE",
  );
}

// Prova empirica: clicar e ver se a pagina anda.
for (const alvo of ["#credito", "#cadeia"]) {
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.evaluate((a) => {
    document.documentElement.style.scrollBehavior = "auto";
    location.hash = a;
  }, alvo);
  await p.waitForTimeout(300);
  const y = await p.evaluate(() => Math.round(window.scrollY));
  const coberto = await p.evaluate((a) => {
    const el = document.getElementById(a.slice(1));
    const h = document.querySelector("header");
    return Math.round(
      el.getBoundingClientRect().top - h.getBoundingClientRect().bottom,
    );
  }, alvo);
  console.log(`${alvo}: scrollY=${y}  folga abaixo do header=${coberto}px`);
}

await b.close();
