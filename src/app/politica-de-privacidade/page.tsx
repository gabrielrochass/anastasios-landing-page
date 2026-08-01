import type { Metadata } from "next";
import { ReadingProgress } from "@/components/motion/reading-progress";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a E-Soluções coleta, usa e protege seus dados pessoais neste site, em conformidade com a LGPD (Lei 13.709/2018).",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* [VALIDAR] template — requer revisão jurídica antes do go-live */}
      <p className="text-eyebrow text-accent-text">Legal</p>
      <h1 className="text-display mt-4 text-petrol-700">Política de Privacidade</h1>
      <p className="text-eyebrow mt-4 text-ink-meta">Última atualização: julho de 2026</p>

      <p className="mt-4 leading-relaxed text-ink">
        Esta Política de Privacidade explica, de forma direta, quais dados pessoais são
        tratados quando você usa este site e como eles são protegidos. Ela foi elaborada em
        conformidade com a Lei Geral de Proteção de Dados Pessoais, a LGPD (Lei nº
        13.709/2018).
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">1. Quem somos</h2>
      <p className="mt-4 leading-relaxed text-ink">
        A controladora dos dados pessoais tratados neste site é a E-Soluções
        [VALIDAR razão social e CNPJ], com sede em Recife/PE, empresa especializada em
        Saúde e Segurança do Trabalho (SST), clínica de medicina ocupacional e serviços de
        departamento pessoal.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">2. Quais dados coletamos e por quê</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Este site não possui área logada nem realiza vendas diretas. Os dados pessoais
        tratados aqui se limitam às quatro situações abaixo.
      </p>

      <h3 className="mt-8 font-semibold text-petrol-700">2.1 Formulário de contato</h3>
      <p className="mt-4 leading-relaxed text-ink">
        Ao preencher o formulário de contato, você nos informa: nome, empresa, e-mail,
        telefone, assunto e mensagem e, opcionalmente, um resumo do diagnóstico gerado no
        site. Esses dados são enviados por e-mail à nossa equipe e usados exclusivamente
        para responder à sua solicitação. O envio só acontece após você marcar a caixa de
        consentimento, e registramos a data e hora desse aceite. Base legal: consentimento
        do titular (art. 7º, inciso I, da LGPD).
      </p>

      <h3 className="mt-8 font-semibold text-petrol-700">2.2 Cookies de estatística (Google Analytics 4)</h3>
      <p className="mt-4 leading-relaxed text-ink">
        Usamos o Google Analytics 4 para entender, de forma agregada, como o site é
        utilizado (páginas visitadas, origem do acesso, tipo de dispositivo). Essa medição
        só é ativada depois que você aceita expressamente os cookies no banner exibido na
        primeira visita. Se você não aceitar, nenhum dado de navegação é enviado ao Google
        Analytics. Base legal: consentimento do titular (art. 7º, inciso I, da LGPD).
      </p>

      <h3 className="mt-8 font-semibold text-petrol-700">2.3 Diagnóstico CIPA</h3>
      <p className="mt-4 leading-relaxed text-ink">
        A ferramenta de diagnóstico CIPA salva o histórico das suas respostas apenas no
        armazenamento local (localStorage) do seu próprio navegador. Essas informações não
        saem do seu dispositivo e não são enviadas aos nossos servidores. Você pode
        apagá-las a qualquer momento limpando os dados de navegação do site.
      </p>

      <h3 className="mt-8 font-semibold text-petrol-700">2.4 Links externos</h3>
      <p className="mt-4 leading-relaxed text-ink">
        O site contém links para o WhatsApp e para a plataforma de ensino a distância (EAD)
        parceira, onde ocorre a compra de cursos. Ao acessar esses serviços, o tratamento
        dos seus dados passa a ser regido pelas políticas de privacidade de cada plataforma.
        Recomendamos a leitura delas.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">3. Cookies e como gerenciar seu consentimento</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Na sua primeira visita, exibimos um banner de cookies. Sua escolha fica registrada
        no armazenamento local do seu navegador (chave &quot;esol-consent&quot;), para que o
        banner não seja exibido novamente a cada visita.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
        <li>
          Recusar os cookies de estatística <strong>não bloqueia</strong> nenhuma
          funcionalidade: você continua navegando pelo site normalmente.
        </li>
        <li>
          Para revogar ou alterar sua escolha, basta limpar os dados deste site no seu
          navegador (cookies e dados de sites): o banner será exibido novamente na próxima
          visita.
        </li>
      </ul>

      <h2 className="text-h2 mt-10 text-petrol-700">4. Com quem compartilhamos seus dados</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Nós <strong>não vendemos</strong> seus dados pessoais e não os compartilhamos para
        fins de publicidade. O compartilhamento se limita ao necessário para operar o site:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
        <li>
          As mensagens do formulário de contato transitam pelo nosso provedor de serviço de
          e-mail, exclusivamente para entrega à nossa equipe.
        </li>
        <li>
          O Google (Google Analytics 4) atua como operador dos dados estatísticos de
          navegação, somente quando você consente com os cookies de estatística.
        </li>
        <li>
          A plataforma EAD parceira trata os dados de compra de cursos sob sua própria
          política de privacidade. Esse tratamento acontece fora deste site.
        </li>
      </ul>

      <h2 className="text-h2 mt-10 text-petrol-700">5. Por quanto tempo guardamos seus dados</h2>
      <p className="mt-4 leading-relaxed text-ink">
        As mensagens recebidas pelo formulário de contato são mantidas pelo tempo necessário
        para atender à sua solicitação e cumprir obrigações legais, pelo prazo de
        [VALIDAR prazo de retenção; sugestão: 12 meses] a contar do último contato. Após
        esse período, os dados são eliminados ou anonimizados, salvo obrigação legal de
        guarda por prazo maior.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">6. Seus direitos como titular</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Nos termos do art. 18 da LGPD, você pode, a qualquer momento e gratuitamente,
        solicitar:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>eliminação dos dados tratados com base no seu consentimento;</li>
        <li>portabilidade dos dados a outro fornecedor de serviço;</li>
        <li>
          revogação do consentimento, a qualquer momento, sem prejuízo dos tratamentos já
          realizados.
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink">
        Para exercer qualquer desses direitos, escreva para{" "}
        <strong>contato@esolucoes.com.br</strong> [VALIDAR e-mail do encarregado/DPO].
        Responderemos no menor prazo possível, dentro dos limites previstos na legislação.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">7. Segurança</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados
        pessoais tratados por meio deste site contra acessos não autorizados, perda ou
        alteração, incluindo tráfego criptografado (HTTPS) e acesso restrito às mensagens
        recebidas. Nenhum sistema é absolutamente seguro, mas trabalhamos para reduzir os
        riscos ao mínimo.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">8. Alterações desta política</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A
        versão vigente estará sempre publicada nesta página, com a data da última
        atualização indicada no topo. Alterações relevantes serão destacadas quando
        aplicável.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">9. Legislação aplicável e foro</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Esta política é regida pela legislação brasileira, em especial pela LGPD (Lei nº
        13.709/2018). Fica eleito o foro da comarca de Recife/PE [VALIDAR foro] para dirimir
        eventuais controvérsias, sem prejuízo dos direitos assegurados por lei ao titular de
        dados e ao consumidor.
      </p>
      </article>
    </>
  );
}
