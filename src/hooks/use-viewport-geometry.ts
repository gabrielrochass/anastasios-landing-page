"use client";

import { useSyncExternalStore } from "react";

/**
 * Geometria de layout das peças de motion.
 *
 * Não é um breakpoint de estilo, é a escolha entre duas geometrias reais: a
 * rota do navio atravessa a largura em `wide` e desce em serpentina em
 * `compact`, e o mapa tem duas projeções geradas em build. Por isso vive num
 * hook e não em classe do Tailwind.
 *
 * Uma quebra só. Uma terceira variante dobraria o custo de manutenção sem
 * dobrar o ganho.
 */
export type Geometry = "compact" | "wide";

const QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot(): Geometry {
  return window.matchMedia(QUERY).matches ? "wide" : "compact";
}

/**
 * Mobile-first também na hidratação. O servidor sempre emite `compact`, então
 * o telefone nunca renderiza a geometria larga para descartar em seguida.
 * Desktop paga um reflow único no mount, que é o lado certo para pagar.
 */
function getServerSnapshot(): Geometry {
  return "compact";
}

export function useViewportGeometry(): Geometry {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
