import Link from "next/link";
import { MotionToggle } from "@/components/motion/motion-toggle";
import { legalLinks, navLinks, siteConfig } from "@/lib/site-config";

/**
 * Rodapé. Server Component, exceto o toggle de movimento.
 *
 * Sem ícones de rede social: a H H Brasil não tem LinkedIn nem Instagram
 * ativos, e ícone que leva a perfil vazio custa mais credibilidade do que
 * ganha. O sinal de legitimidade aqui é o CNPJ visível, que é barato e
 * funciona bem no Brasil.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-mode="ocean" className="bg-surface text-content">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-sm text-sm text-content-muted">
              Sourcing homologado, estruturação tributária e gestão de risco em
              comércio exterior. {siteConfig.years.brazil} anos no comércio
              brasileiro, {siteConfig.years.foreignTrade} no exterior.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-eyebrow text-content-muted">Navegação</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-muted transition-colors hover:text-content"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow text-content-muted">Contato</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tabular-stat text-content transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-content-muted">
                {siteConfig.address.streetAddress}
                <br />
                {siteConfig.address.addressLocality},{" "}
                {siteConfig.address.addressRegion}
                <br />
                <span className="tabular-stat">
                  CEP {siteConfig.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-center md:justify-between">
          {/* Separação por estrutura, com borda de 1px, nunca por midpoint. */}
          <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[11px] text-content-muted">
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Razão social</dt>
              <dd>{siteConfig.legalName}</dd>
            </div>
            <div className="flex items-baseline gap-2 border-l border-rule pl-6">
              <dt>CNPJ</dt>
              <dd className="tabular-stat">{siteConfig.cnpj}</dd>
            </div>
            <div className="flex items-baseline gap-2 border-l border-rule pl-6">
              <dt className="sr-only">Ano</dt>
              <dd className="tabular-stat">{year}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] text-content-muted transition-colors hover:text-content"
              >
                {link.label}
              </Link>
            ))}
            <MotionToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
