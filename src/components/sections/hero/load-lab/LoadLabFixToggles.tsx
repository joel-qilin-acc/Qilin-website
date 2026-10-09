import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { costSegments, type FixId } from "@/lib/load-lab/model";

type LoadLabFixTogglesProps = {
  fixes: FixId[];
  onToggle: (id: FixId) => void;
};

export function LoadLabFixToggles({ fixes, onToggle }: LoadLabFixTogglesProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {costSegments.map((segment) => {
        const on = fixes.includes(segment.id);
        return (
          <li key={segment.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(segment.id)}
              className={cn(
                "flex h-full w-full items-start gap-3 rounded-base border px-3.5 py-3 text-left transition-colors duration-200",
                on
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-surface hover:border-ink",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
                  on
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line bg-surface",
                )}
              >
                {on ? <Check aria-hidden size={13} weight="bold" /> : null}
              </span>
              <span>
                <span className="block text-sm font-medium leading-snug">
                  {segment.fix}
                </span>
                <span
                  className="mt-0.5 block text-xs leading-snug text-muted"
                  title={segment.tech}
                >
                  {segment.hint}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
