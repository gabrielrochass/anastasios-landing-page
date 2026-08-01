export interface ContactMessage {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  diagnosticSummary?: string;
  /** Timestamp ISO do aceite LGPD — vai junto no e-mail. */
  consentAt: string;
}

export interface EmailProvider {
  send(message: ContactMessage): Promise<{ ok: boolean }>;
}
