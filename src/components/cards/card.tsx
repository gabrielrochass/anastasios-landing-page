import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { riskBadgeClasses, type RiskLevel } from "@/lib/risk";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg p-card", {
  variants: {
    variant: {
      raised: "bg-surface-raised shadow-card",
      tint: "bg-surface-tint",
      inverse: "bg-surface-inverse text-ink-on-inverse",
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

interface CardBadgeProps {
  /** Ex.: "NR-35". Sem `nivel`, renderiza neutro (petróleo). */
  nr: string;
  nivel?: RiskLevel;
  className?: string;
}

export function CardBadge({ nr, nivel, className }: CardBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge border px-2 py-0.5 text-meta font-semibold tracking-wide",
        nivel
          ? riskBadgeClasses[nivel]
          : "border-petrol-200 bg-petrol-50 text-petrol-700",
        className,
      )}
    >
      {nr}
    </span>
  );
}

export function CardIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md bg-petrol-50 text-petrol-700",
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

export function CardTitle({ as: Tag = "h3", className, children }: CardTitleProps) {
  return (
    <Tag className={cn("text-h3 text-petrol-700", className)}>{children}</Tag>
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
    <p className={cn("text-eyebrow text-ink-meta", className)}>{children}</p>
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
    <div className={cn("text-sm leading-relaxed text-ink-muted", className)}>
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
        "inline-flex min-h-6 items-center gap-1.5 font-medium text-petrol-500 underline underline-offset-4 transition-colors hover:text-petrol-600",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
