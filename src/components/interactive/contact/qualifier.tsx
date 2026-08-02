"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  composeMessage,
  isComplete,
  quizQuestions,
  type QuizAnswers,
  type QuestionId,
} from "./qualifier-engine";

/**
 * Quiz de qualificação que monta a mensagem de WhatsApp.
 *
 * Todas as perguntas ficam visíveis de uma vez, em vez de um passo por tela.
 * Wizard escondendo o tamanho do compromisso é o padrão que faz a pessoa
 * desistir no passo 3, e aqui o compromisso é pequeno o bastante para ser
 * mostrado inteiro.
 *
 * Botões de rádio de verdade, não divs com onClick: navegação por setas,
 * leitura de grupo pelo leitor de tela e envio por teclado saem de graça.
 */
export function Qualifier({ className }: { className?: string }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const complete = isComplete(answers);
  const message = composeMessage(answers);

  const answered = quizQuestions.filter((q) => answers[q.id]).length;

  function choose(id: QuestionId, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className={cn("", className)}>
      <div className="flex flex-col gap-10">
        {quizQuestions.map((question, index) => (
          <fieldset key={question.id}>
            <legend className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="font-mono text-[11px] tabular-stat text-content-muted"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-h3 text-content">{question.prompt}</span>
            </legend>

            <div className="mt-4 flex flex-wrap gap-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center rounded-sm border px-4 py-2 text-sm transition-colors",
                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-focus)]",
                      selected
                        ? "border-accent bg-accent text-accent-contrast"
                        : "border-rule-strong text-content hover:bg-surface-raised",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={selected}
                      onChange={() => choose(question.id, option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-12 border-t border-rule pt-8">
        {/* Prévia da mensagem. Mostrar o que vai ser enviado antes de enviar é
            o que transforma "abrir o WhatsApp" de salto no escuro em ação
            previsível, e é o que faz a pessoa confiar em apertar o botão. */}
        <p className="text-eyebrow text-content-muted">
          Mensagem que será enviada
        </p>
        <p
          aria-live="polite"
          className="mt-3 text-sm leading-relaxed text-content-muted"
        >
          {message}
        </p>

        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!complete}
          onClick={(event) => {
            if (!complete) {
              event.preventDefault();
              return;
            }
          }}
          className={cn(
            "mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-opacity",
            complete
              ? "bg-accent text-accent-contrast hover:opacity-90"
              : "cursor-not-allowed border border-rule-strong text-content-muted",
          )}
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden />
          {complete
            ? "Quero estruturar minha importação"
            : `Responda as ${quizQuestions.length} perguntas (${answered} de ${quizQuestions.length})`}
        </a>
      </div>
    </div>
  );
}
