import { tradeRoutes } from "@/data/routes";
import { mapPaths } from "@/lib/map-paths";
import { cn } from "@/lib/utils";

/**
 * Mapa das rotas de fornecimento. Server Component, zero JavaScript.
 *
 * Os paths vêm projetados de build (scripts/build-map.mjs), então nenhum d3
 * chega ao navegador e os 41 kb de geometria viajam como HTML, que faz stream
 * e comprime bem, em vez de virar chunk de JS.
 *
 * O desenho do traço é scroll-timeline nativo do CSS, com estado padrão já
 * desenhado. Sem suporte, sem JS ou com movimento reduzido, o mapa aparece
 * completo, que é a informação inteira.
 *
 * As rotas são polilinhas por waypoint real, não great circles. Uma geodésica
 * de Xangai a Santos corta a Antártida, e um importador que trabalha com o
 * Extremo Oriente percebe na hora.
 */
export function TradeRoutes({ className }: { className?: string }) {
  return (
    <figure className={cn("", className)}>
      <svg
        viewBox={mapPaths.viewBox}
        className="h-auto w-full"
        role="img"
        aria-labelledby="rotas-titulo rotas-descricao"
      >
        <title id="rotas-titulo">Rotas de fornecimento atendidas</title>
        <desc id="rotas-descricao">
          Três rotas marítimas com destino ao Porto de Santos: Xangai pelo
          Estreito de Malaca e Canal de Suez, Nhava Sheva pelo Cabo da Boa
          Esperança, e Gdansk pelo Canal da Mancha.
        </desc>

        <path d={mapPaths.land} className="fill-surface-raised" />

        {tradeRoutes.map((route, index) => {
          const d = mapPaths.routes[route.id];
          const ends = mapPaths.endpoints[route.id];
          if (!d || !ends) return null;

          return (
            <g key={route.id}>
              <path
                d={d}
                fill="none"
                // pathLength normalizado deixa o stroke-dasharray de 1 do
                // utilitário route-draw funcionar em qualquer comprimento.
                pathLength={1}
                strokeWidth={1.5}
                strokeLinecap="round"
                // Sem isto o traço afina junto com o SVG no mobile e some.
                vectorEffect="non-scaling-stroke"
                className="route-draw stroke-accent"
                style={{ animationDelay: `${index * 120}ms` }}
              />
              <circle
                cx={ends.origin[0]}
                cy={ends.origin[1]}
                r={4}
                className="fill-accent"
              />
              <circle
                cx={ends.destination[0]}
                cy={ends.destination[1]}
                r={5}
                className="fill-content"
              />
            </g>
          );
        })}
      </svg>

      {/*
        Equivalente textual visível, nunca sr-only. Serve de fallback, de
        conteúdo indexável e de direção de arte ao mesmo tempo: uma lista de
        rotas em mono lê como competência operacional.
      */}
      <figcaption className="mt-8">
        <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
          {tradeRoutes.map((route) => (
            <li key={route.id} className="bg-surface p-5">
              <div className="flex items-baseline gap-2 font-mono text-xs tabular-stat text-content">
                <span>{route.originCode}</span>
                <span aria-hidden className="text-content-muted">
                  {"→"}
                </span>
                <span>{route.destinationCode}</span>
              </div>
              <p className="mt-2 text-sm text-content">
                {route.origin} para {route.destination}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-content-muted">
                Via {route.via.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
