"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site-config";
import {
  contactServiceOptions,
  type ContactService,
} from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

interface WhatsappFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ContactService | "";
  message: string;
}

/** Monta a mensagem do WhatsApp num tom natural, a partir dos campos. */
function buildWhatsappMessage(values: WhatsappFormData): string {
  const serviceLabel = contactServiceOptions.find(
    (option) => option.value === values.service,
  )?.label;
  const lines = ["Olá! Vim pelo site da E-Soluções."];
  if (values.name) {
    lines.push(
      values.company
        ? `Sou ${values.name}, da ${values.company}.`
        : `Sou ${values.name}.`,
    );
  } else if (values.company) {
    lines.push(`Sou da ${values.company}.`);
  }
  if (serviceLabel) lines.push(`Assunto: ${serviceLabel}.`);
  if (values.message) lines.push("", values.message);
  const extra: string[] = [];
  if (values.email) extra.push(`E-mail: ${values.email}`);
  if (values.phone) extra.push(`Telefone: ${values.phone}`);
  if (extra.length > 0) lines.push("", ...extra);
  return lines.join("\n");
}

interface ContactFormProps {
  prefillService?: ContactService;
  prefillMessage?: string;
}

/**
 * Compositor de WhatsApp: o contato acontece sempre pelo WhatsApp, com a
 * mensagem já montada a partir do formulário. O quiz pré-preenche o assunto e
 * o campo Mensagem com o porte/urgência informados. Nome, Assunto e Mensagem
 * são obrigatórios; o resto é opcional. Usa `<select>` nativo (sem o scroll-
 * lock do Radix, que empurrava a navbar). Sem envio por e-mail: o usuário
 * dispara a mensagem do próprio WhatsApp.
 */
export function ContactForm({
  prefillService,
  prefillMessage,
}: ContactFormProps) {
  const [opened, setOpened] = useState(false);

  const form = useForm<WhatsappFormData>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: prefillService ?? "",
      message: "",
    },
  });

  // Quiz respondido depois do mount preenche assunto + mensagem, desde que o
  // usuário ainda não tenha mexido nesses campos.
  useEffect(() => {
    const touched = form.formState.touchedFields;
    if (prefillService && !touched.service) {
      form.setValue("service", prefillService);
    }
    if (prefillMessage && !touched.message) {
      form.setValue("message", prefillMessage);
    }
  }, [prefillService, prefillMessage, form]);

  function onSubmit(data: WhatsappFormData) {
    trackEvent("whatsapp_click", { context: "contact-form" });
    window.open(
      whatsappUrl(buildWhatsappMessage(data)),
      "_blank",
      "noopener,noreferrer",
    );
    setOpened(true);
  }

  const errors = form.formState.errors;
  const fieldClass =
    "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="contato-nome">Nome</Label>
          <Input
            id="contato-nome"
            autoComplete="name"
            placeholder="Ex.: Maria Souza"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "erro-nome" : undefined}
            {...form.register("name", { required: "Informe seu nome." })}
          />
          {errors.name && (
            <p id="erro-nome" className="text-sm text-risk-high-fg">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contato-empresa">
            Empresa <span className="text-ink-meta">(opcional)</span>
          </Label>
          <Input
            id="contato-empresa"
            autoComplete="organization"
            placeholder="Ex.: Acme Indústria"
            {...form.register("company")}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contato-email">
            E-mail <span className="text-ink-meta">(opcional)</span>
          </Label>
          <Input
            id="contato-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="voce@empresa.com.br"
            {...form.register("email")}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contato-telefone">
            Telefone / WhatsApp <span className="text-ink-meta">(opcional)</span>
          </Label>
          <Input
            id="contato-telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(81) 99999-9999"
            {...form.register("phone")}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-1.5">
        <Label htmlFor="contato-assunto">Assunto</Label>
        <select
          id="contato-assunto"
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "erro-assunto" : undefined}
          className={cn(fieldClass, "sm:w-80")}
          {...form.register("service", { required: "Escolha o assunto." })}
        >
          <option value="">Escolha o assunto</option>
          {contactServiceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="erro-assunto" className="text-sm text-risk-high-fg">
            {errors.service.message}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-1.5">
        <Label htmlFor="contato-mensagem">Mensagem</Label>
        <Textarea
          id="contato-mensagem"
          rows={5}
          placeholder="Conte rápido o que você precisa. Se respondeu o diagnóstico, já preenchemos aqui."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "erro-mensagem" : undefined}
          {...form.register("message", {
            required: "Escreva sua mensagem.",
            minLength: { value: 5, message: "Conte um pouco mais." },
          })}
        />
        {errors.message && (
          <p id="erro-mensagem" className="text-sm text-risk-high-fg">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          size="lg"
          className="bg-orange-400 text-ink hover:bg-orange-500"
        >
          <MessageCircle aria-hidden />
          Enviar no WhatsApp
        </Button>
        <p className="text-sm text-ink-meta">
          Abre o WhatsApp da E-Soluções com a mensagem pronta.
        </p>
      </div>

      {opened && (
        <p role="status" className="mt-4 text-sm text-risk-low-fg">
          Abrimos o WhatsApp numa nova aba com sua mensagem. Se não abriu,
          verifique o bloqueador de pop-ups.
        </p>
      )}
    </form>
  );
}
