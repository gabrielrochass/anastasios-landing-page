"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface WhatsappButtonProps {
  context: string;
  message?: string;
  className?: string;
}

export function WhatsappButton({
  context,
  message = "Olá! Quero falar com um especialista da E-Soluções.",
  className,
}: WhatsappButtonProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { context })}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-md border border-petrol-400 px-4 py-2 text-sm font-medium text-petrol-200 transition-colors hover:bg-petrol-900 hover:text-white",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden />
      Conversar no WhatsApp
    </a>
  );
}
