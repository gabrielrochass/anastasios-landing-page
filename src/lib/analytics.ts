type AnalyticsEvent =
  | "diagnostic_started"
  | "diagnostic_completed"
  | "training_card_click"
  | "whatsapp_click"
  | "contact_submitted";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara evento GA4. No-op quando o GA não está montado
 * (sem consentimento LGPD ou sem NEXT_PUBLIC_GA_ID).
 */
export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string | number>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
