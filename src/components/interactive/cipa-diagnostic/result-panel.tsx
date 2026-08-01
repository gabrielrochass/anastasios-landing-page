"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardBadge } from "@/components/cards/card";
import type { CipaResult } from "@/lib/cipa/types";

export function ResultPanel({ result }: { result: CipaResult }) {
  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Resultado do diagnóstico CIPA"
      className="rounded-lg bg-surface-inverse p-card text-ink-on-inverse"
    >
      <p className="text-eyebrow text-accent-on-inverse">Resultado</p>

      <p className="text-h3 mt-3 text-white">
        {result.cipa.required
          ? "Sua empresa precisa de CIPA constituída."
          : "Sua empresa precisa de uma pessoa designada (não de comissão)."}
      </p>

      {result.cipa.required && (
        <dl className="mt-5 flex gap-10">
          <div>
            <dd className="text-stat tabular-stat text-white">
              {result.cipa.titulars}
            </dd>
            <dt className="text-eyebrow mt-1 text-petrol-300">
              membros efetivos
            </dt>
          </div>
          <div>
            <dd className="text-stat tabular-stat text-white">
              {result.cipa.substitutes}
            </dd>
            <dt className="text-eyebrow mt-1 text-petrol-300">suplentes</dt>
          </div>
          <div>
            <dd className="text-stat tabular-stat text-white">
              {result.training.hours}
              <span className="text-h3 text-accent-on-inverse">h</span>
            </dd>
            <dt className="text-eyebrow mt-1 text-petrol-300">
              treinamento por membro
            </dt>
          </div>
        </dl>
      )}

      {!result.cipa.required && (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted-on-inverse">
          A pessoa designada também passa por treinamento de{" "}
          {result.training.hours}h, conforme o grau de risco.
        </p>
      )}

      {result.training.shiftNote && (
        <p className="mt-4 rounded-md bg-petrol-900 p-3 text-sm leading-relaxed text-ink-muted-on-inverse">
          {result.training.shiftNote}
        </p>
      )}

      <div className="mt-6">
        <p className="text-eyebrow text-petrol-300">NRs no seu radar</p>
        <ul className="mt-3 space-y-2">
          {result.applicableNRs.map((item) => (
            <li key={item.nr} className="flex items-start gap-3">
              <CardBadge nr={item.nr} nivel={item.level} />
              <p className="text-sm leading-relaxed text-ink-muted-on-inverse">
                <span className="font-medium text-white">{item.title}.</span>{" "}
                {item.reason}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-petrol-900 pt-5">
        <p className="text-sm text-ink-muted-on-inverse">
          {result.periodicity.cipaTraining} {result.periodicity.pcmso}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="bg-orange-400 text-ink hover:bg-orange-500">
            <Link href="/treinamentos?nr=NR-05#catalogo">Ver cursos de CIPA</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-petrol-400 bg-transparent text-white hover:bg-petrol-900 hover:text-white"
          >
            <Link href="/contato">Validar com um especialista</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-petrol-300">
          Estimativa orientativa com base na NR-5 vigente. O dimensionamento
          oficial depende do CNAE exato da empresa, e este resultado não
          substitui avaliação técnica.
        </p>
      </div>
    </div>
  );
}
