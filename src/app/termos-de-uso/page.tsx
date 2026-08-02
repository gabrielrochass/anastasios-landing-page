import type { Metadata } from "next";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso deste site institucional da H H Brasil Ltda. e limites do que é publicado aqui.",
};

/**
 * Reescrita do zero.
 *
 * A versão anterior era template de outro projeto: falava de normas
 * regulamentadoras, diagnóstico de CIPA, checkout de curso e foro em Recife.
 * Nada disso existe aqui.
 *
 * O ponto que de fato importa neste site é o item 4: conteúdo do Painel de
 * Inteligência é leitura de mercado com data, não consultoria, e a regra
 * tributária e aduaneira muda rápido. Dizer isso protege o cliente de verdade.
 *
 * [CONFIRMAR] revisão jurídica antes do go-live.
 */
export default function TermosDeUsoPage() {
  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-eyebrow text-accent">Legal</p>
        <h1 className="mt-4 font-serif text-display text-content">
          Termos de Uso
        </h1>
        <p className="mt-4 text-eyebrow text-content-muted">
          Última atualização: agosto de 2026
        </p>

        <p className="mt-8 text-lead leading-relaxed text-content">
          Este é um site institucional. Ele apresenta os serviços da{" "}
          {siteConfig.legalName} e publica leitura de mercado. Não vende nada,
          não processa pagamento e não cria vínculo contratual.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          1. Quem publica este site
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          {siteConfig.legalName}, CNPJ {siteConfig.cnpj},{" "}
          {siteConfig.address.addressLocality},{" "}
          {siteConfig.address.addressRegion}. Contato pelo WhatsApp{" "}
          {siteConfig.phone}.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          2. O que este site é, e o que não é
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          O conteúdo aqui tem finalidade informativa e comercial. Descrever um
          serviço não é ofertá-lo em condições fixas: prazo, preço, modalidade
          de pagamento e viabilidade de qualquer operação dependem de análise do
          caso concreto e são definidos em contrato próprio.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          Nada nesta página constitui proposta vinculante, e iniciar uma
          conversa pelo WhatsApp não cria obrigação para nenhuma das partes.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          3. Escopo de atuação
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          A {siteConfig.name} atua na homologação de fornecedores, negociação,
          estruturação da operação e acompanhamento da carga. Coordenamos a
          operação junto aos demais participantes da cadeia.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          Não somos despachante aduaneiro credenciado e não executamos o
          despacho. Essa atividade é privativa de profissional habilitado
          perante a Receita Federal, com quem trabalhamos em conjunto.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          4. Sobre o Painel de Inteligência
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Os textos publicados são leitura de mercado, com fonte e data
          indicadas. Não são consultoria tributária, aduaneira, jurídica ou de
          investimento, e não substituem análise da sua operação específica.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          Frete, câmbio, alíquota, medida antidumping, cronograma de sistema e
          rota mudam rápido. Um texto correto na data de publicação pode estar
          desatualizado em semanas. Confira as fontes citadas antes de tomar
          qualquer decisão com base neles.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          5. Propriedade intelectual
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Textos, ilustrações, marca e código deste site pertencem à{" "}
          {siteConfig.legalName} ou são usados sob licença. Citação com
          atribuição e link é bem-vinda. Reprodução integral ou uso comercial
          exige autorização por escrito.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          6. Disponibilidade e links externos
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          O site pode ficar indisponível para manutenção ou por falha de
          terceiros, sem aviso prévio. Links para sites externos, incluindo as
          fontes citadas nos artigos e o WhatsApp, levam a conteúdo que não
          controlamos e que tem termos próprios.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          7. Privacidade
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Este site não usa cookies e não coleta dados pessoais. O detalhe está
          na{" "}
          <a
            href="/politica-de-privacidade"
            className="text-accent underline underline-offset-4"
          >
            Política de Privacidade
          </a>
          .
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          8. Lei aplicável
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Estes termos são regidos pela lei brasileira. Fica eleito o foro da
          comarca de {siteConfig.address.addressLocality},{" "}
          {siteConfig.address.addressRegion}, para dirimir controvérsias
          decorrentes deste site.
        </p>
      </article>
    </>
  );
}
