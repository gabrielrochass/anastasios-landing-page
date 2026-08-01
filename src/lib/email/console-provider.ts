import type { ContactMessage, EmailProvider } from "@/lib/email/provider";

/**
 * Stub desta fase: loga a mensagem estruturada no server. Substituído por
 * um provedor real (Resend) na fase de deploy — ver ./index.ts.
 */
export class ConsoleEmailProvider implements EmailProvider {
  async send(message: ContactMessage): Promise<{ ok: boolean }> {
    console.info(
      "[contato] nova mensagem:",
      JSON.stringify(message, null, 2),
    );
    return { ok: true };
  }
}
