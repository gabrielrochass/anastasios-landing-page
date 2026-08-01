"use server";

import { getEmailProvider } from "@/lib/email";
import { contactSchema } from "@/lib/schemas/contact";

export interface ContactActionResult {
  ok: boolean;
  error?: string;
}

const MIN_FILL_TIME_MS = 3000;

export async function submitContact(
  data: unknown,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Dados inválidos. Revise os campos." };
  }

  const { website, startedAt, ...contact } = parsed.data;

  // Anti-spam silencioso: honeypot preenchido ou submissão rápida demais
  // respondem ok sem enviar (não dar sinal ao bot).
  if (website || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { ok: true };
  }

  const result = await getEmailProvider().send({
    ...contact,
    consentAt: new Date().toISOString(),
  });

  return result.ok
    ? { ok: true }
    : { ok: false, error: "Não conseguimos enviar agora. Tente o WhatsApp." };
}
