import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { beforeShape, pointCount, spikeIndexes } from "./points";

const worry = ["Pages crawl", "Orders fail", "Customers drop off"];
const relief = [
  { text: "Loads in a blink", left: 20 },
  { text: "Orders go through", left: 48 },
  { text: "Drop-off fixed", left: 72 },
];
const peaks = beforeShape();

const chip =
  "absolute -translate-x-1/2 whitespace-nowrap rounded-full border bg-surface px-3 py-1.5 text-xs font-medium shadow-[0_10px_24px_-14px_rgba(11,18,32,0.4)] sm:text-[13px]";

export function WorryChips() {
  return spikeIndexes.map((index, position) => (
    <span
      key={worry[position]}
      data-bad
      className={cn(
        chip,
        "border-slow/40 text-slow-ink",
        position === 1 && "hidden sm:block",
      )}
      style={{
        left: `${(index / (pointCount - 1)) * 100}%`,
        top: `calc(${peaks[index] * 100}% - 40px)`,
      }}
    >
      {worry[position]}
    </span>
  ));
}

export function ReliefChips() {
  return relief.map((item, position) => (
    <span
      key={item.text}
      data-good
      className={cn(
        chip,
        "border-accent/25 text-accent",
        position === 1 && "hidden sm:block",
      )}
      style={{ left: `${item.left}%`, top: "calc(68% - 46px)" }}
    >
      {item.text}
    </span>
  ));
}

type FixCtaProps = {
  href: string;
  label: string;
};

export function FixCta({ href, label }: FixCtaProps) {
  return (
    <Link
      data-cta
      href={href}
      className="pointer-events-auto absolute right-6 top-[calc(68%-92px)] inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_16px_34px_-14px_rgba(30,64,175,0.7)] transition-colors hover:bg-accent-hover lg:right-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]"
    >
      {label}
      <ArrowRight aria-hidden size={18} weight="bold" />
    </Link>
  );
}
