import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  tone?: "default" | "tint" | "inverse";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  tone = "default",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-section",
        tone === "tint" && "bg-surface-tint",
        tone === "inverse" && "bg-surface-inverse text-ink-on-inverse",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
