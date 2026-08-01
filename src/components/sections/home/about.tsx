import { ImageSlot } from "@/components/illustrations/image-slot";
import { Band, BandHeading } from "@/components/sections/shared/band";
import { siteConfig } from "@/lib/site-config";

/**
 * Quem somos.
 *
 * Apenas 3 dos 12 concorrentes auditados mostram rosto, e num negócio de
 * intermediação o produto é justamente a pessoa. Por isso o retrato ocupa um
 * terço da seção em vez de virar avatar de 80px no rodapé.
 *
 * O slot fica reservado até a foto real chegar. Retrato de banco de imagem
 * aqui seria mentira: a página inteira argumenta que existe gente responsável
 * atrás da operação, e ilustrar isso com um desconhecido de stock derrubaria o
 * argumento junto.
 */
export function About() {
  return (
    <Band id="quem-somos">
      <div className="grid gap-14 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <ImageSlot slotId="anastasios-retrato" ratio="4/5">
            <span />
          </ImageSlot>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-content-muted">
            Aguardando retrato profissional
          </p>
        </div>

        <div>
          <BandHeading
            ordinal="07"
            eyebrow="Quem somos"
            title="Um negócio de família, com nome e sobrenome na operação."
          />

          <div className="mt-8 flex flex-col gap-5 text-content-muted">
            <p className="text-lead">
              São {siteConfig.years.brazil} anos de vivência comercial da
              família no mercado brasileiro, sendo os últimos{" "}
              {siteConfig.years.foreignTrade} dedicados ao comércio exterior.
            </p>
            <p className="text-sm leading-relaxed">
              A parte que não cabe em número é a que define o trabalho: cada
              operação que chega até nós veio de uma indicação, e é assim há
              duas décadas. Isso muda o cálculo de risco. Quem depende de
              indicação não pode se dar ao luxo de uma operação malfeita, porque
              o prejuízo não é a margem daquele contrato, é o próximo cliente
              que não vai ligar.
            </p>
            <p className="text-sm leading-relaxed">
              Buscamos fornecedores que operem sob a mesma política de
              responsabilidade e honestidade que aplicamos a nós. Quando algo
              trava, e em comércio exterior sempre trava alguma coisa, tem
              alguém atendendo o telefone e respondendo pelo resultado.
            </p>
          </div>

          <dl className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-widest text-content-muted">
            <div className="flex items-baseline gap-2">
              <dt>Razão social</dt>
              <dd className="text-content">{siteConfig.legalName}</dd>
            </div>
            <div className="flex items-baseline gap-2 border-l border-rule pl-8">
              <dt>CNPJ</dt>
              <dd className="tabular-stat text-content">{siteConfig.cnpj}</dd>
            </div>
            <div className="flex items-baseline gap-2 border-l border-rule pl-8">
              <dt>Sede</dt>
              <dd className="text-content">
                {siteConfig.address.addressLocality},{" "}
                {siteConfig.address.addressRegion}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Band>
  );
}
