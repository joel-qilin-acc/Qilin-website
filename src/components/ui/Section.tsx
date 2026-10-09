import { cn } from "@/lib/cn";
import { TraceNode } from "@/components/motion/TraceNode";

type SectionProps = {
  id?: string;
  tone?: "plain" | "subtle" | "dark";
  spacing?: "default" | "none";
  trace?: boolean;
  bot?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "plain", spacing = "default", trace = true, bot, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-bot={bot}
      className={cn(
        "relative",
        spacing === "default" && "py-20 md:py-32",
        tone === "subtle" && "bg-surface-subtle",
        tone === "dark" && "z-20 bg-ink text-surface",
        className,
      )}
    >
      {trace ? <TraceNode /> : null}
      {children}
    </section>
  );
}
