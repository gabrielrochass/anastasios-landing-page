import Image from "next/image";

import { ImageSlot } from "@/components/illustrations/image-slot";
import { Band, BandHeading } from "@/components/sections/shared/band";
import { getPhoto } from "@/lib/photos";
import { siteConfig } from "@/lib/site-config";

/**
 * Quem somos.
 *
 * Apenas 3 dos 12 concorrentes auditados mostram rosto, e num negócio de
 * intermediação o produto é justamente a pessoa. Por isso o retrato ocupa um
 * terço da seção em vez de virar avatar de 80px no rodapé.
 *
 * A coluna da esquerda ficou vazia por muito tempo esperando o retrato, e lia
 * como página quebrada. Mas retrato de banco de imagem aqui continua fora de
 * questão: esta seção traz razão social e CNPJ reais, e ilustrar "existe gente
 * responsável atrás disso" com o rosto de um desconhecido derrubaria o próprio
 * argumento.
 *
 * A saída é foto de OPERAÇÃO, não de pessoa: uma linha de produção, que é o que
 * o texto ao lado descreve (fábrica escolhida e homologada por nós). A mão em
 * quadro coloca trabalho humano na seção sem inventar um indivíduo.
 *
 * O retrato do Anastasios continua pendente e está registrado em
 * docs/PENDENCIAS-CLIENTE.md. Quando chegar, ele entra aqui.
 */
export function About() {
  const foto = getPhoto("linha-de-producao");
  if (!foto) return null;

  return (
    <Band id="quem-somos">
      <div className="grid gap-14 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <ImageSlot slotId="quem-somos-operacao" ratio="4/5">
            {/* `fill` porque o ImageSlot já fixa a proporção e recorta, então a
                altura vem do slot e o CLS é zero por construção. */}
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </ImageSlot>
          {/* Crédito visível porque a licença é CC BY, que exige atribuição.
              Rodapé de créditos escondido cumpre a letra e não o espírito. */}
          <p className="text-content-muted eyebrow mt-3">
            Foto {foto.credit}, {foto.license}
          </p>
        </div>

        <div>
          <BandHeading
            ordinal="07"
            eyebrow="Quem somos"
            title="Um negócio de família, com nome e sobrenome na operação."
          />

          <div className="text-content-muted mt-8 flex flex-col gap-5">
            <p className="text-lead">
              São {siteConfig.years.brazil} anos de vivência comercial da
              família no mercado brasileiro, sendo os últimos{" "}
              {siteConfig.years.foreignTrade} dedicados ao comércio exterior.
            </p>
            <p className="text-body leading-relaxed">
              A parte que não cabe em número é a que define o trabalho: cada
              operação que chega até nós veio de uma indicação, e é assim há
              duas décadas. Isso muda o cálculo de risco. Quem depende de
              indicação não pode se dar ao luxo de uma operação malfeita, porque
              o prejuízo não é a margem daquele contrato, é o próximo cliente
              que não vai ligar.
            </p>
            <p className="text-body leading-relaxed">
              Buscamos fornecedores que operem sob a mesma política de
              responsabilidade e honestidade que aplicamos a nós. Quando algo
              trava, e em comércio exterior sempre trava alguma coisa, tem
              alguém atendendo o telefone e respondendo pelo resultado.
            </p>
          </div>

          <dl className="border-rule text-content-muted eyebrow mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t pt-6">
            <div className="flex items-baseline gap-2">
              <dt>Razão social</dt>
              <dd className="text-content">{siteConfig.legalName}</dd>
            </div>
            <div className="border-rule flex items-baseline gap-2 border-l pl-8">
              <dt>CNPJ</dt>
              <dd className="tabular-stat text-content">{siteConfig.cnpj}</dd>
            </div>
            <div className="border-rule flex items-baseline gap-2 border-l pl-8">
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
