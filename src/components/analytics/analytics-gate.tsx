"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/components/analytics/consent";

/**
 * GA4 só monta com consentimento LGPD explícito — sem consent, zero
 * script third-party no carregamento.
 */
export function AnalyticsGate() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const consent = useConsent();

  if (!gaId || consent !== "granted") return null;
  return <GoogleAnalytics gaId={gaId} />;
}
