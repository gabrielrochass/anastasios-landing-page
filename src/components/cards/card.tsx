import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Cartão base. Sem sombra e com canto quase reto de propósito: a linguagem do
 * site é documento técnico, e sombra difusa puxa para app genérico.
 *
 * Consome só a camada semântica, então o mesmo cartão funciona nas seções
 * claras e nas escuras sem nenhuma variante de tema.
 */
const cardVariants = cva("rounded-sm p-card", {
  variants: {
    variant: {
      raised: "bg-surface-raised border border-rule",
      flat: "border border-rule",
      bare: "",
    },
  },
  defaultVariants: {
    variant: "raised",
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Card({ variant, className, children }: CardProps) {
  return (
    <article className={cn(cardVariants({ variant }), className)}>
      {children}
    </article>
  );
}

/** Rótulo curto em mono. Códigos de porto, Incoterm, tipo de equipamento. */
export function CardBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-badge border-rule-strong text-content-muted eyebrow inline-flex items-center border px-2 py-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface CardTitleProps {
  as?: "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({
  as: Tag = "h3",
  className,
  children,
}: CardTitleProps) {
  return (
    <Tag className={cn("text-h3 text-content", className)}>{children}</Tag>
  );
}

export function CardMeta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow text-content-muted", className)}>{children}</p>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("text-content-muted text-body leading-relaxed", className)}
    >
      {children}
    </div>
  );
}

interface CardCTAProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function CardCTA({ href, className, children }: CardCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-accent text-body inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4 transition-opacity hover:opacity-80",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
