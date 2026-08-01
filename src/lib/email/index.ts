import { ConsoleEmailProvider } from "@/lib/email/console-provider";
import type { EmailProvider } from "@/lib/email/provider";

/**
 * Factory do provedor de e-mail.
 *
 * Fase de deploy (quando houver RESEND_API_KEY):
 * 1. `npm install resend`
 * 2. criar ResendEmailProvider implementando EmailProvider
 *    (from: onboarding@..., to: e-mail de orçamento da E-Soluções)
 * 3. retornar aqui `process.env.RESEND_API_KEY ? new ResendEmailProvider() : new ConsoleEmailProvider()`
 *
 * O pacote resend NÃO é instalado agora de propósito — sem credenciais
 * seria dead code.
 */
export function getEmailProvider(): EmailProvider {
  return new ConsoleEmailProvider();
}
