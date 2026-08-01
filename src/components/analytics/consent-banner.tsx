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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule-strong bg-surface p-4 text-content"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 sm:px-2">
        <p className="max-w-xl text-sm leading-relaxed text-content-muted-on-inverse">
          Usamos cookies de análise (Google Analytics) apenas com o seu
          consentimento, para entender o uso do site. Detalhes na{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-medium text-content underline underline-offset-4"
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
            className="border-rule-strong bg-transparent text-content hover:bg-surface-raised hover:text-content"
          >
            Recusar
          </Button>
          <Button
            size="sm"
            onClick={() => setConsent("granted")}
            className="bg-accent text-content hover:bg-accent"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
