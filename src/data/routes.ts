/**
 * Rotas de fornecimento atendidas.
 *
 * Os waypoints são reais. Uma great circle de Xangai a Santos corta a
 * Antártida, e um importador que trabalha com o Extremo Oriente percebe na
 * hora. Cada rota é uma polilinha de pontos por onde o navio de fato passa, e
 * é isso que o scripts/build-map.mjs projeta.
 *
 * `transitDays` está null de propósito. Não achei fonte publicada que eu possa
 * citar para tempo de trânsito por par de porto, e número sem fonte numa
 * página de comércio exterior é exatamente o tipo de coisa que o público
 * confere. Entra quando o cliente confirmar os números da operação dele.
 */

export interface Waypoint {
  name: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
}

export interface TradeRoute {
  id: string;
  origin: string;
  /** Código do porto de origem, exibido em mono */
  originCode: string;
  destination: string;
  destinationCode: string;
  /** Região comercial, usada no agrupamento da seção de origens */
  region: string;
  /** Por onde a rota passa de verdade */
  via: string[];
  waypoints: Waypoint[];
  transitDays: number | null;
}

export const tradeRoutes: TradeRoute[] = [
  {
    id: "shanghai-santos",
    origin: "Xangai",
    originCode: "SHA",
    destination: "Santos",
    destinationCode: "SSZ",
    region: "China",
    via: ["Estreito de Malaca", "Canal de Suez", "Atlântico Sul"],
    waypoints: [
      { name: "Xangai", coordinates: [121.47, 31.23] },
      { name: "Mar da China Meridional", coordinates: [112.0, 12.0] },
      { name: "Estreito de Malaca", coordinates: [100.3, 3.0] },
      { name: "Oceano Índico", coordinates: [72.0, 8.0] },
      { name: "Golfo de Áden", coordinates: [45.0, 12.5] },
      { name: "Canal de Suez", coordinates: [32.35, 30.0] },
      { name: "Mediterrâneo", coordinates: [18.0, 34.5] },
      { name: "Gibraltar", coordinates: [-5.6, 35.9] },
      { name: "Atlântico Norte", coordinates: [-20.0, 20.0] },
      { name: "Atlântico Sul", coordinates: [-30.0, -10.0] },
      { name: "Santos", coordinates: [-46.33, -23.96] },
    ],
    transitDays: null,
  },
  {
    id: "nhava-sheva-santos",
    origin: "Nhava Sheva",
    originCode: "NSA",
    destination: "Santos",
    destinationCode: "SSZ",
    region: "Índia",
    via: ["Cabo da Boa Esperança", "Atlântico Sul"],
    waypoints: [
      { name: "Nhava Sheva", coordinates: [72.95, 18.95] },
      { name: "Mar Arábico", coordinates: [65.0, 10.0] },
      { name: "Índico Ocidental", coordinates: [52.0, -8.0] },
      { name: "Canal de Moçambique", coordinates: [40.0, -22.0] },
      { name: "Cabo da Boa Esperança", coordinates: [18.5, -35.5] },
      { name: "Atlântico Sul", coordinates: [-5.0, -30.0] },
      { name: "Santos", coordinates: [-46.33, -23.96] },
    ],
    transitDays: null,
  },
  {
    id: "gdansk-santos",
    origin: "Gdansk",
    originCode: "GDN",
    destination: "Santos",
    destinationCode: "SSZ",
    region: "Leste Europeu",
    via: ["Mar do Norte", "Canal da Mancha", "Atlântico"],
    waypoints: [
      { name: "Gdansk", coordinates: [18.65, 54.4] },
      { name: "Mar Báltico", coordinates: [13.0, 55.5] },
      { name: "Mar do Norte", coordinates: [4.0, 54.0] },
      { name: "Canal da Mancha", coordinates: [-1.5, 50.0] },
      { name: "Golfo da Biscaia", coordinates: [-8.0, 45.0] },
      { name: "Atlântico Norte", coordinates: [-18.0, 25.0] },
      { name: "Atlântico Sul", coordinates: [-28.0, -8.0] },
      { name: "Santos", coordinates: [-46.33, -23.96] },
    ],
    transitDays: null,
  },
];

/**
 * Portos brasileiros de destino. O cliente opera com todos, mas listar 30
 * portos vira ruído. Estes são os que sustentam a maior parte do volume de
 * contêiner do país, e a seção deixa claro que a lista não é limite.
 * [CONFIRMAR com o cliente quais ele mais usa na prática]
 */
export const destinationPorts = [
  { name: "Santos", code: "SSZ", state: "SP" },
  { name: "Paranaguá", code: "PNG", state: "PR" },
  { name: "Itajaí", code: "ITJ", state: "SC" },
  { name: "Navegantes", code: "NVT", state: "SC" },
  { name: "Rio Grande", code: "RIG", state: "RS" },
  { name: "Suape", code: "SUA", state: "PE" },
  { name: "Salvador", code: "SSA", state: "BA" },
  { name: "Vitória", code: "VIX", state: "ES" },
  { name: "Rio de Janeiro", code: "RIO", state: "RJ" },
  { name: "Manaus", code: "MAO", state: "AM" },
] as const;
