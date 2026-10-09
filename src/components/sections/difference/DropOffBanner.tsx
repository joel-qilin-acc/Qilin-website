import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { fixOrder, metersFor, type FixId } from "@/lib/load-lab/model";
import { cn } from "@/lib/cn";

type DropOffBannerProps = {
  fixes: FixId[];
  rps: number;
};

const formatter = new Intl.NumberFormat("en-US");

// Says out loud what the picture means: customers leaving, then Qilin Lab fixing that.
export function DropOffBanner({ fixes, rps }: DropOffBannerProps) {
  const { dropped } = metersFor(fixes, rps);
  const fixed = fixes.length === fixOrder.length && dropped === 0;
  const losing = dropped > 0;
  const Icon = losing ? WarningCircle : CheckCircle;

  return (
    <p
      aria-live="polite"
      className={cn(
        "mt-4 flex items-center gap-2.5 rounded-base px-4 py-3 text-sm font-medium transition-colors duration-500",
        losing ? "bg-danger/10 text-danger" : "bg-accent-soft text-accent",
      )}
    >
      <Icon aria-hidden size={20} weight="fill" className="shrink-0" />
      {losing
        ? `Customers are dropping off: ${formatter.format(dropped)} lost every second.`
        : fixed
          ? "Qilin Lab fixed your customer drop-off. Nobody is turned away."
          : "Drop-off is falling as each fix lands."}
    </p>
  );
}
