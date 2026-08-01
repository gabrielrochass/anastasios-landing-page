import { TradeRoutes } from "@/components/map/trade-routes";
import { Band, BandHeading } from "@/components/sections/shared/band";

/**
 * Origens e rotas. Modo ocean, porque é onde o traço em cobre brilha.
 *
 * Server Component inteiro: o mapa vem projetado de build e o desenho do traço
 * é scroll-timeline nativo do CSS. Zero JavaScript numa seção que, feita com
 * um globo 3D, custaria uns 200 kb e seria o clichê mais batido do setor.
 */
export function Origins() {
  return (
    <Band id="origens" mode="ocean">
      <BandHeading
        ordinal="05"
        eyebrow="Origens e rotas"
        title="China, Índia e Leste Europeu, com destino a qualquer porto brasileiro."
        lead="As rotas abaixo passam pelos pontos por onde a carga de fato navega. Não são arcos decorativos: uma geodésica de Xangai a Santos cortaria a Antártida."
      />
      <TradeRoutes className="mt-16" />
    </Band>
  );
}
