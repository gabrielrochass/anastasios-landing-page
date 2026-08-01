import type { Metadata } from "next";
import { ReadingProgress } from "@/components/motion/reading-progress";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso do site da E-Soluções: conteúdo informativo de SST, diagnóstico CIPA, propriedade intelectual e responsabilidades.",
};

export default function TermosUsoPage() {
  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* [VALIDAR] template — requer revisão jurídica antes do go-live */}
      <p className="text-eyebrow text-accent-text">Legal</p>
      <h1 className="text-display mt-4 text-petrol-700">Termos de Uso</h1>
      <p className="text-eyebrow mt-4 text-ink-meta">Última atualização: julho de 2026</p>

      <p className="mt-4 leading-relaxed text-ink">
        Estes Termos de Uso regulam o acesso e a utilização do site da E-Soluções
        [VALIDAR razão social e CNPJ], com sede em Recife/PE. Leia-os com atenção antes de
        navegar.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">1. Aceitação</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Ao acessar e usar este site, você declara ter lido e aceito estes Termos de Uso e a
        nossa Política de Privacidade. Se você não concorda com alguma condição aqui
        prevista, pedimos que não utilize o site.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">2. O que o site oferece</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Este é um site institucional e informativo sobre Saúde e Segurança do Trabalho
        (SST), medicina ocupacional e departamento pessoal. Nele você encontra:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
        <li>conteúdo informativo sobre nossos serviços, artigos e ferramentas de diagnóstico;</li>
        <li>
          um catálogo de cursos cujo checkout acontece em plataforma EAD parceira, fora
          deste site; as compras, pagamentos, acessos e certificados são regidos pelos
          termos e políticas da própria plataforma parceira;
        </li>
        <li>canais de contato com a nossa equipe (formulário e WhatsApp).</li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink">
        Não há venda direta de produtos ou serviços neste site, nem área de acesso restrito
        com login.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">3. Aviso importante sobre o conteúdo técnico</h2>
      <p className="mt-4 leading-relaxed text-ink">
        <strong>
          Todo o conteúdo técnico publicado neste site (artigos, guias e ferramentas de
          diagnóstico, incluindo o diagnóstico CIPA) tem caráter exclusivamente
          orientativo e educacional. Ele não substitui a avaliação técnica realizada por
          profissional habilitado em Saúde e Segurança do Trabalho, tampouco consultoria
          jurídica.
        </strong>{" "}
        Cada empresa possui realidade própria (atividade econômica, grau de risco, número de
        empregados, convenções coletivas), e decisões sobre conformidade com Normas
        Regulamentadoras devem sempre ser tomadas com apoio profissional especializado. A
        E-Soluções não se responsabiliza por decisões tomadas exclusivamente com base no
        conteúdo informativo deste site.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">4. Propriedade intelectual</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Os textos autorais, a marca, o layout, as ilustrações e as ferramentas deste site
        pertencem à E-Soluções e são protegidos pela legislação de propriedade intelectual.
        É permitido citar e compartilhar trechos do conteúdo com indicação da fonte; a
        reprodução integral para fins comerciais depende de autorização prévia por escrito.
      </p>
      <p className="mt-4 leading-relaxed text-ink">
        As Normas Regulamentadoras (NRs) e demais atos normativos citados no site são normas
        públicas, de titularidade do poder público, e não são objeto de qualquer reivindicação
        de propriedade pela E-Soluções.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">5. Limitação de responsabilidade</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Trabalhamos para manter o site disponível, atualizado e correto, mas, dentro dos
        limites permitidos pela lei:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
        <li>
          não garantimos disponibilidade ininterrupta: o site pode ficar temporariamente
          fora do ar por manutenção, atualizações ou fatores fora do nosso controle;
        </li>
        <li>
          não nos responsabilizamos pelo conteúdo, pela disponibilidade ou pelas práticas de
          sites e serviços de terceiros acessados por links externos (como WhatsApp e a
          plataforma EAD parceira);
        </li>
        <li>
          o conteúdo informativo pode ser atualizado ou removido a qualquer momento, sem
          aviso prévio.
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink">
        Nada nestes termos exclui ou limita responsabilidades que não possam ser excluídas
        ou limitadas pela legislação brasileira, em especial pelo Código de Defesa do
        Consumidor.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">6. Alterações destes termos</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Estes Termos de Uso podem ser alterados a qualquer momento para refletir mudanças no
        site ou na legislação. A versão vigente estará sempre publicada nesta página, com a
        data da última atualização indicada no topo. O uso continuado do site após a
        publicação de alterações significa concordância com a nova versão.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">7. Contato</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Dúvidas sobre estes termos podem ser enviadas para{" "}
        <strong>contato@esolucoes.com.br</strong> [VALIDAR e-mail de contato] ou pelos
        canais indicados na página de contato do site.
      </p>

      <h2 className="text-h2 mt-10 text-petrol-700">8. Legislação aplicável e foro</h2>
      <p className="mt-4 leading-relaxed text-ink">
        Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca
        de Recife/PE [VALIDAR foro] para dirimir eventuais controvérsias decorrentes do uso
        deste site, ressalvado ao consumidor o direito de optar pelo foro do seu domicílio,
        nos termos da lei.
      </p>
      </article>
    </>
  );
}
