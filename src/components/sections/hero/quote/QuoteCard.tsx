import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { clientLogoBase, clients } from "@/content/clients";
import { formatFull as format } from "@/lib/format";
import { heroQuote } from "@/content/hero-results";

const { stat } = heroQuote;
const logoScale =
  clients.find((client) => client.file === heroQuote.logo)?.scale ?? 1;

export function QuoteCard() {
  return (
    <div
      data-quote
      data-reveal
      className="hidden justify-self-end pb-6 lg:block [perspective:1100px]"
    >
      <figure
        data-card
        className="relative w-[min(100%,420px)] rounded-[24px] border border-line bg-surface p-7 shadow-[0_40px_80px_-40px_rgba(11,18,32,0.4)]"
      >
        <div data-line-in className="flex items-center justify-between">
          <Image
            src={`${clientLogoBase}/${heroQuote.logo}`}
            alt={heroQuote.client}
            width={110}
            height={44}
            style={{ height: `${2.25 * logoScale}rem` }}
            className="w-auto object-contain object-left"
          />
          <Link
            href={`/case-studies/${heroQuote.slug}`}
            aria-label={`Read the ${heroQuote.client} story`}
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUpRight aria-hidden size={16} />
          </Link>
        </div>
        <blockquote
          data-line-in
          className="mt-6 text-[1.65rem] font-semibold leading-[1.22] tracking-[-0.025em]"
        >
          “{heroQuote.lead}{" "}
          <span
            data-before
            style={{
              backgroundImage: "linear-gradient(currentColor, currentColor)",
            }}
            className="bg-[length:100%_2px] bg-[position:0_58%] bg-no-repeat"
          >
            {heroQuote.before}
          </span>{" "}
          {heroQuote.link}{" "}
          <span
            data-after
            className="bg-gradient-to-r from-accent-soft to-accent-soft bg-[length:100%_38%] bg-[position:0_88%] bg-no-repeat"
          >
            {heroQuote.after}
          </span>{" "}
          <span className="text-muted">{heroQuote.tail}</span>”
        </blockquote>
        <figcaption data-line-in className="mt-4 text-sm text-muted">
          {heroQuote.by}
        </figcaption>
        <div data-line-in className="mt-6 border-t border-line pt-5">
          <p className="flex items-baseline gap-2">
            <span data-stat className="font-figure text-4xl text-ink">
              {format(stat.to)}
            </span>
            <span className="text-sm text-muted">
              {stat.label}, up from 500
            </span>
          </p>
          <div className="mt-3 h-2 rounded-full bg-surface-subtle">
            <div
              data-bar
              className="h-full origin-left rounded-full bg-accent"
            />
          </div>
        </div>
      </figure>
    </div>
  );
}
