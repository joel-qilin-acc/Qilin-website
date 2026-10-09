import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";

type FaqHelpProps = {
  read: number;
  total: number;
};

// A small companion card: it tracks how many questions have been opened and offers a human once the visitor is done.
export function FaqHelp({ read, total }: FaqHelpProps) {
  const done = read === total;

  return (
    <div className="relative mt-10 overflow-hidden rounded-[24px] border border-line bg-surface p-6 shadow-[0_24px_60px_-36px_rgba(30,64,175,0.35)]">
      <span
        aria-hidden
        className="aurora-drift pointer-events-none absolute -bottom-20 -right-16 size-56 rounded-full bg-neon/35 blur-3xl"
      />
      <span
        aria-hidden
        className="aurora-drift pointer-events-none absolute -bottom-24 left-6 size-44 rounded-full bg-accent/20 blur-3xl [animation-delay:-4s]"
      />
      <div className="relative">
        <p className="text-sm text-muted">Questions opened</p>
        <p className="font-figure mt-1 text-5xl leading-none">
          {read}
          <span className="text-muted">/{total}</span>
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-subtle">
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-neon shadow-[0_0_10px_var(--color-neon)] transition-transform duration-700 ease-out"
            style={{ transform: `scaleX(${total === 0 ? 0 : read / total})` }}
          />
        </div>
        <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-ink">
          {done
            ? "That's everything we get asked. Want to talk it through?"
            : "Open a few, or skip ahead and ask us directly."}
        </p>
        <ButtonLink href="/contact" className="neon-glow mt-5 rounded-full">
          Ask an engineer
          <ArrowRight aria-hidden size={18} weight="bold" />
        </ButtonLink>
      </div>
    </div>
  );
}
