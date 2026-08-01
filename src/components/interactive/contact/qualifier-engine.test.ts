import { describe, expect, it } from "vitest";
import {
  composeMessage,
  isComplete,
  quizQuestions,
  type QuizAnswers,
} from "./qualifier-engine";

/**
 * A mensagem do WhatsApp é o produto final do site inteiro. Se ela sair
 * quebrada, o lead chega sem contexto e o único canal de conversão da página
 * perde a razão de existir. Daí valer teste.
 */

const full: QuizAnswers = {
  escopo: "insumos",
  volume: "150k-1m",
  origem: "china",
  dor: "capital",
};

describe("isComplete", () => {
  it("exige as quatro respostas", () => {
    expect(isComplete({})).toBe(false);
    expect(isComplete({ escopo: "insumos" })).toBe(false);
    expect(isComplete({ ...full, dor: undefined })).toBe(false);
    expect(isComplete(full)).toBe(true);
  });
});

describe("composeMessage", () => {
  it("monta uma frase em linguagem natural, não um despejo de campos", () => {
    const message = composeMessage(full);
    expect(message).toBe(
      "Olá! Vim pelo site. Trabalho com insumos industriais, com origem na China. " +
        "O volume é entre US$ 150 mil e US$ 1 milhão por ano. " +
        "Hoje o que mais pesa é capital de giro e prazo de pagamento. Podemos conversar?",
    );
  });

  it("funciona parcialmente preenchida, porque a prévia aparece enquanto a pessoa responde", () => {
    const message = composeMessage({ escopo: "acabados" });
    expect(message).toContain("produtos acabados");
    expect(message).toContain("Podemos conversar?");
  });

  it("não deixa vírgula órfã quando falta a origem", () => {
    const message = composeMessage({ escopo: "acabados", dor: "fornecedor" });
    expect(message).toContain("Trabalho com produtos acabados.");
    expect(message).not.toMatch(/,\s*\./);
  });

  it("sobrevive a respostas vazias sem produzir texto quebrado", () => {
    const message = composeMessage({});
    expect(message).toBe("Olá! Vim pelo site. Podemos conversar?");
  });

  it("ignora valor que não existe nas opções, em vez de imprimir undefined", () => {
    const message = composeMessage({ escopo: "valor-inventado" });
    expect(message).not.toContain("undefined");
  });
});

describe("integridade das perguntas", () => {
  it("toda opção tem valor único dentro da pergunta", () => {
    for (const question of quizQuestions) {
      const values = question.options.map((option) => option.value);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("toda opção tem frase, senão a mensagem sai com buraco", () => {
    for (const question of quizQuestions) {
      for (const option of question.options) {
        expect(option.phrase.length).toBeGreaterThan(0);
      }
    }
  });

  it("a mensagem completa cabe numa URL de WhatsApp sem risco de truncamento", () => {
    // wa.me tolera bem mais que isto, mas mensagem longa demais some no
    // preview do app e a pessoa apaga antes de enviar.
    const longest = composeMessage({
      escopo: "exportacao",
      volume: "acima-1m",
      origem: "leste-europeu",
      dor: "tributario",
    });
    expect(encodeURIComponent(longest).length).toBeLessThan(700);
  });
});
