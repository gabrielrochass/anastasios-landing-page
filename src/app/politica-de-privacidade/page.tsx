import type { Metadata } from "next";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Este site não usa cookies, não tem formulário e não coleta dados pessoais. O que ele guarda, e por quê.",
};

/**
 * Reescrita do zero.
 *
 * A versão anterior era template de outro projeto e descrevia coleta que este
 * site nunca fez: formulário de contato, diagnóstico, plataforma de ensino,
 * Google Analytics. Política de privacidade que descreve tratamento
 * inexistente não protege ninguém, e ainda cria obrigação declarada que a
 * empresa não cumpre.
 *
 * A versão honesta é curta porque o site é simples: sem cookie, sem
 * formulário, sem servidor recebendo dado. Só uma preferência de interface no
 * navegador e links de saída para o WhatsApp.
 *
 * [CONFIRMAR] revisão jurídica antes do go-live.
 */
export default function PoliticaPrivacidadePage() {
  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-eyebrow text-accent">Legal</p>
        <h1 className="mt-4 font-serif text-display text-content">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-eyebrow text-content-muted">
          Última atualização: agosto de 2026
        </p>

        <p className="mt-8 text-lead leading-relaxed text-content">
          Resumo, para quem não quer ler o resto: este site não usa cookies, não
          tem formulário e não envia nenhum dado seu para nenhum servidor. Não
          há o que vazar porque não há o que guardar.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          1. Quem é o controlador
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          {siteConfig.legalName}, CNPJ {siteConfig.cnpj}, com sede em{" "}
          {siteConfig.address.streetAddress},{" "}
          {siteConfig.address.addressLocality},{" "}
          {siteConfig.address.addressRegion}, CEP{" "}
          {siteConfig.address.postalCode}.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          Contato para qualquer assunto relativo a esta política, inclusive
          exercício de direitos previstos na LGPD: WhatsApp{" "}
          {siteConfig.phone}.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          2. O que este site não faz
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Vale começar pelo que não acontece, porque é a maior parte:
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {[
            "Não há cookies. Nenhum, de nenhum tipo, nem próprios nem de terceiros.",
            "Não há ferramenta de análise de audiência. Nem Google Analytics, nem equivalente.",
            "Não há pixel de rastreamento, nem de rede social, nem de anúncio.",
            "Não há formulário que envie dados. Nenhum campo deste site transmite informação para um servidor.",
            "Não há cadastro, login ou área restrita.",
            "Nenhum dado pessoal seu é coletado, armazenado ou compartilhado por causa da sua visita.",
          ].map((item) => (
            <li
              key={item}
              className="border-l border-rule pl-4 leading-relaxed text-content-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-h2 text-content">
          3. A única coisa guardada no seu navegador
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          O site tem um botão para reduzir animações. Se você usar esse botão, a
          escolha fica salva no <strong>localStorage</strong> do seu próprio
          navegador, sob a chave <code className="font-mono">hh-motion</code>,
          para que a página lembre da preferência na próxima visita.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          Isso não é cookie, não identifica você e nunca sai do seu aparelho.
          Não conseguimos ler esse valor. Para apagá-lo, basta limpar os dados
          do site nas configurações do navegador.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          4. Quando você fala com a gente
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Todo contato acontece pelo WhatsApp. Os botões e o questionário do
          site apenas montam uma mensagem e abrem o aplicativo com ela escrita.
          A mensagem só é enviada quando você aperta enviar, dentro do WhatsApp.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          As respostas do questionário existem apenas na memória do seu
          navegador enquanto a página está aberta. Fechou a aba, sumiram.
        </p>
        <p className="mt-4 leading-relaxed text-content-muted">
          A partir do momento em que a conversa começa, ela acontece na
          plataforma do WhatsApp e passa a ser regida também pela política de
          privacidade da Meta. Os dados que você nos enviar por lá são tratados
          por nós para responder e conduzir a operação comercial, com base
          legal no interesse legítimo e na execução de contrato, e ficam
          guardados enquanto a relação comercial durar.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          5. Hospedagem e registros técnicos
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          O site é estático e fica hospedado em um provedor de infraestrutura
          que, como qualquer servidor da internet, registra requisições
          incluindo endereço IP, para segurança e funcionamento do serviço.
          Esses registros são do provedor, temporários, e não são usados por nós
          para perfilar, identificar ou contatar visitantes.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          6. Seus direitos
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          A LGPD garante a você confirmação de tratamento, acesso, correção,
          anonimização, portabilidade, eliminação e informação sobre
          compartilhamento. Como este site não coleta dados, na prática esses
          direitos se aplicam ao que você tiver nos enviado por WhatsApp. É só
          pedir pelo mesmo canal.
        </p>

        <h2 className="mt-14 font-serif text-h2 text-content">
          7. Mudanças nesta política
        </h2>
        <p className="mt-4 leading-relaxed text-content-muted">
          Se o site passar a usar alguma ferramenta que colete dados, esta
          página será atualizada antes, e não depois. A data no topo indica a
          última revisão.
        </p>
      </article>
    </>
  );
}
