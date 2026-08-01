"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardBadge } from "@/components/cards/card";
import {
  recommendFromQuiz,
  type QuizAnswers,
  type QuizRecommendation,
} from "@/components/interactive/contact/quiz-engine";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type QuizState =
  | { step: 1; answers: Partial<QuizAnswers> }
  | { step: 2; answers: Partial<QuizAnswers> }
  | { step: 3; answers: Partial<QuizAnswers> }
  | { step: "resultado"; answers: QuizAnswers; recommendation: QuizRecommendation };

interface QuizQuestion<K extends keyof QuizAnswers> {
  key: K;
  legend: string;
  options: Array<{ value: QuizAnswers[K]; label: string }>;
}

const questions: [
  QuizQuestion<"need">,
  QuizQuestion<"size">,
  QuizQuestion<"urgency">,
] = [
  {
    key: "need",
    legend: "Qual é a sua necessidade principal?",
    options: [
      { value: "sst", label: "Documentos de SST (PGR, LTCAT, laudos)" },
      { value: "clinica", label: "Exames ocupacionais / clínica" },
      { value: "dp", label: "Folha e departamento pessoal" },
      { value: "treinamentos", label: "Treinamentos NR" },
      { value: "nao-sei", label: "Não sei por onde começar" },
    ],
  },
  {
    key: "size",
    legend: "Quantas pessoas a empresa emprega?",
    options: [
      { value: "1-19", label: "1 a 19" },
      { value: "20-99", label: "20 a 99" },
      { value: "100+", label: "100 ou mais" },
    ],
  },
  {
    key: "urgency",
    legend: "Qual é o cenário hoje?",
    options: [
      { value: "fiscalizacao", label: "Fiscalização ou notificação em curso" },
      { value: "prazo", label: "Prazo definido (auditoria, contrato, licitação)" },
      { value: "planejamento", label: "Organizando a casa, sem prazo crítico" },
    ],
  },
];

interface ContactQuizProps {
  onComplete: (recommendation: QuizRecommendation, summary: QuizAnswers) => void;
}

export function ContactQuiz({ onComplete }: ContactQuizProps) {
  const [state, setState] = useState<QuizState>({ step: 1, answers: {} });

  function answer(key: keyof QuizAnswers, value: QuizAnswers[keyof QuizAnswers]) {
    const answers = { ...state.answers, [key]: value };
    if (state.step === 1) {
      trackEvent("diagnostic_started", { tool: "quiz-contato" });
      setState({ step: 2, answers });
    } else if (state.step === 2) {
      setState({ step: 3, answers });
    } else if (state.step === 3) {
      const complete = answers as QuizAnswers;
      const recommendation = recommendFromQuiz(complete);
      trackEvent("diagnostic_completed", {
        tool: "quiz-contato",
        recomendacao: recommendation.service,
      });
      setState({ step: "resultado", answers: complete, recommendation });
      onComplete(recommendation, complete);
    }
  }

  if (state.step === "resultado") {
    const { recommendation } = state;
    return (
      <div
        role="region"
        aria-live="polite"
        className="rounded-lg bg-surface-tint p-card"
      >
        <div className="flex items-center gap-2">
          <p className="text-eyebrow text-petrol-700">Recomendação</p>
          {recommendation.urgent && (
            <CardBadge nr="Prioritário" nivel="high" />
          )}
        </div>
        <p className="text-h3 mt-2 text-petrol-700">{recommendation.label}</p>
        {recommendation.note && (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {recommendation.note}
          </p>
        )}
        <p className="mt-3 text-sm text-ink-muted">
          O formulário ao lado já está preenchido com esse assunto, é só
          completar seus dados.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setState({ step: 1, answers: {} })}
        >
          Refazer diagnóstico
        </Button>
      </div>
    );
  }

  const question = questions[state.step - 1];

  return (
    <div role="group" aria-label="Diagnóstico rápido" className="rounded-lg bg-surface-tint p-card">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow text-petrol-700" aria-live="polite">
          Pergunta {state.step} de 3
        </p>
        <div aria-hidden className="flex gap-1">
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={cn(
                "size-2 rounded-xs",
                step <= state.step ? "bg-orange-400" : "bg-petrol-200",
              )}
            />
          ))}
        </div>
      </div>
      <fieldset className="mt-4">
        <legend className="text-h3 text-petrol-700">{question.legend}</legend>
        <div className="mt-4 grid gap-2">
          {question.options.map((option) => (
            <Label
              key={option.value}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-neutral-200 bg-surface-raised px-4 py-2.5 font-normal transition-colors has-checked:border-petrol-500 has-checked:bg-petrol-50 hover:border-petrol-300"
            >
              <input
                type="radio"
                name={`quiz-${question.key}`}
                value={option.value}
                onChange={() => answer(question.key, option.value)}
                className="size-4 accent-petrol-700"
              />
              {option.label}
            </Label>
          ))}
        </div>
      </fieldset>
      {state.step > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() =>
            setState({
              step: (state.step - 1) as 1 | 2,
              answers: state.answers,
            })
          }
        >
          ← Voltar
        </Button>
      )}
    </div>
  );
}
