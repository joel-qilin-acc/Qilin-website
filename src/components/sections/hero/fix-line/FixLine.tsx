import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { defaultCampaign } from "@/content/campaigns";
import { FixChart } from "./FixChart";
import { FixCta, ReliefChips, WorryChips } from "./FixChips";

// The chart band. Everything here is driven by HeroStage; the markup alone already shows the fixed result.
export function FixLine() {
  return (
    <div
      data-fix
      data-reveal
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(220px,32vh,320px)]"
    >
      <FixChart />
      <p className="absolute left-6 top-0 font-mono text-[11px] uppercase tracking-wide text-muted lg:left-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]">
        How long customers wait
      </p>
      <WorryChips />
      <ReliefChips />
      <FixCta href={defaultCampaign.primaryCta.href} label="Get yours fixed" />
      <p
        data-hint
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-muted shadow-sm"
      >
        Scroll to fix it
        <ArrowDown aria-hidden size={14} className="animate-bounce" />
      </p>
    </div>
  );
}
