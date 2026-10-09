import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/types/content";
import { CardDetails } from "./CardDetails";
import { CardVisual } from "./CardVisual";

type WorkCardProps = {
  study: CaseStudy;
  index: number;
  open: boolean;
  onToggle: () => void;
};

const tints = [
  "bg-[#e6eefc]",
  "bg-[#e3f1fb]",
  "bg-[#e9edfb]",
  "bg-[#e1f0f6]",
  "bg-[#e7ecf9]",
];

export function WorkCard({ study, index, open, onToggle }: WorkCardProps) {
  return (
    <article
      data-work-card
      className={cn(
        "relative flex h-[min(540px,72svh)] w-[min(84vw,430px)] lg:h-full lg:max-h-[580px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] p-6 transition-shadow duration-500 sm:p-7",
        tints[index % tints.length],
        open &&
          "shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-neon)_55%,transparent),0_30px_70px_-34px_color-mix(in_srgb,var(--color-neon)_80%,transparent)]",
      )}
    >
      <span
        aria-hidden
        className="hatch absolute bottom-0 right-0 size-[60%]"
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink/75">
            {study.industry}
          </p>
          <h3 className="mt-3 max-w-[16ch] text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.03em] text-balance sm:text-[1.75rem]">
            {study.headline}
          </h3>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={`${open ? "Close" : "Open"} the ${study.client} result`}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-300",
            open
              ? "border-ink bg-ink text-surface"
              : "border-ink/70 text-ink hover:bg-ink hover:text-surface",
          )}
        >
          {open ? (
            <Minus aria-hidden size={18} />
          ) : (
            <Plus aria-hidden size={18} />
          )}
        </button>
      </div>
      <div className="relative mt-auto min-h-0 flex-1 pt-5">
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-500 ease-out",
            open
              ? "pointer-events-none translate-y-3 opacity-0"
              : "translate-y-0 opacity-100",
          )}
        >
          <CardVisual study={study} seed={index + 3} />
        </div>
        <div
          inert={!open}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0",
          )}
        >
          <CardDetails study={study} />
        </div>
      </div>
    </article>
  );
}
