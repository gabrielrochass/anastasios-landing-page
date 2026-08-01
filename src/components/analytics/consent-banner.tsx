"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setConsent, useConsent } from "@/components/analytics/consent";

export function ConsentBanner() {
  const consent = useConsent();

  // "pending" = render de servidor; qualquer decisão salva também esconde.
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-petrol-900 bg-surface-inverse p-4 text-ink-on-inverse"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 sm:px-2">
        <p className="max-w-xl text-sm leading-relaxed text-ink-muted-on-inverse">
          Usamos cookies de análise (Google Analytics) apenas com o seu
          consentimento, para entender o uso do site. Detalhes na{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-medium text-white underline underline-offset-4"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConsent("denied")}
            className="border-petrol-400 bg-transparent text-white hover:bg-petrol-900 hover:text-white"
          >
            Recusar
          </Button>
          <Button
            size="sm"
            onClick={() => setConsent("granted")}
            className="bg-orange-400 text-ink hover:bg-orange-500"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
