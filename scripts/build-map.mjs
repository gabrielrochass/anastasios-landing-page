/**
 * Projeta o mapa e as rotas em tempo de BUILD, emitindo src/lib/map-paths.ts.
 *
 * Nenhum d3 entra no bundle do cliente. O navegador recebe strings de path
 * prontas, que é a diferença entre alguns kilobytes de SVG e ~90 kb de
 * biblioteca de projeção rodando no aparelho do usuário para desenhar algo
 * que nunca muda.
 *
 * UMA projeção só. Cheguei a gerar duas, paisagem e retrato, mas a rota vai
 * de Xangai a Santos e atravessa quase toda a largura: qualquer recorte
 * retrato corta as origens, que é justamente o assunto da seção. E duas
 * projeções custavam 58 kb de landmass duplicado.
 *
 * No mobile o mesmo mapa escala junto com o SVG. Como o desenho é silhueta
 * sem fronteira e o traço usa vector-effect non-scaling-stroke, a rota
 * continua legível a 375px. O detalhe fino fica na lista mono ao lado, que é
 * texto de verdade.
 *
 *   node scripts/build-map.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { merge } from "topojson-client";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const world = JSON.parse(
  readFileSync(join(root, "node_modules/world-atlas/countries-110m.json"), "utf8"),
);

/**
 * `merge` funde os países num único landmass, o que apaga toda fronteira
 * interna. Some cerca de metade do peso, e a silhueta é a direção de arte
 * certa: o assunto do mapa é a rota, não a divisão política.
 */
const land = merge(world, world.objects.countries.geometries);

/**
 * Arredonda as coordenadas do path para uma casa decimal.
 *
 * O d3 emite precisão de ponto flutuante cheia, que num mapa desenhado a 1200
 * px de largura é ruído puro: nenhuma daquelas casas chega a valer meio pixel.
 * Sem isto o arquivo gerado passava de 300 kb, tudo dentro do bundle do
 * cliente.
 */
function round(d) {
  return d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))));
}

/**
 * As rotas vivem em src/data/routes.ts, que é TypeScript. Em vez de compilar,
 * extraímos os waypoints do próprio arquivo: é build-time, roda uma vez, e
 * evita adicionar um passo de transpilação só para ler um array.
 */
function readRoutes() {
  const source = readFileSync(join(root, "src/data/routes.ts"), "utf8");
  const routes = [];

  const blocks = source.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const id = block.match(/id: "([^"]+)"/)?.[1];
    if (!id) continue;
    const waypointsBlock = block.match(/waypoints: \[([\s\S]*?)\n    \],/)?.[1];
    if (!waypointsBlock) continue;

    const coordinates = [];
    const re = /coordinates: \[(-?[\d.]+), (-?[\d.]+)\]/g;
    let match;
    while ((match = re.exec(waypointsBlock)) !== null) {
      coordinates.push([Number(match[1]), Number(match[2])]);
    }
    if (coordinates.length > 1) routes.push({ id, coordinates });
  }

  return routes;
}

/**
 * Enquadramentos. O Pacífico vazio fica de fora nos dois: o corredor que
 * interessa é Ásia para Atlântico Sul.
 */
const FRAME = {
  size: [1200, 620],
  extent: [
    [-95, 62],
    [140, -45],
  ],
};

function project(frame) {
  const projection = geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [frame.size[0] - 8, frame.size[1] - 8],
    ],
    {
      type: "MultiPoint",
      coordinates: [
        frame.extent[0],
        [frame.extent[1][0], frame.extent[0][1]],
        frame.extent[1],
        [frame.extent[0][0], frame.extent[1][1]],
      ],
    },
  );

  const path = geoPath(projection);

  return {
    viewBox: `0 0 ${frame.size[0]} ${frame.size[1]}`,
    land: round(path(land) ?? ""),
    routes: Object.fromEntries(
      readRoutes().map((route) => [
        route.id,
        // LineString passa pelo mesmo amostrador adaptativo do d3, então o
        // traço entre waypoints acompanha a curvatura do globo em vez de
        // virar uma reta na projeção.
        round(path({ type: "LineString", coordinates: route.coordinates }) ?? ""),
      ]),
    ),
    endpoints: Object.fromEntries(
      readRoutes().map((route) => [
        route.id,
        {
          origin: projection(route.coordinates[0]).map((n) => Math.round(n * 10) / 10),
          destination: projection(route.coordinates[route.coordinates.length - 1]).map((n) => Math.round(n * 10) / 10),
        },
      ]),
    ),
  };
}

const output = project(FRAME);

const file = `// GERADO POR scripts/build-map.mjs. Não editar à mão.
// Rode \`npm run build:map\` depois de mexer em src/data/routes.ts.

export interface ProjectedMap {
  viewBox: string;
  land: string;
  routes: Record<string, string>;
  endpoints: Record<string, { origin: [number, number]; destination: [number, number] }>;
}

export const mapPaths: ProjectedMap = ${JSON.stringify(output, null, 2)} as const;
`;

writeFileSync(join(root, "src/lib/map-paths.ts"), file, "utf8");

const kb = (Buffer.byteLength(file, "utf8") / 1024).toFixed(1);
console.log(`✓ src/lib/map-paths.ts gerado (${kb} kb)`);
