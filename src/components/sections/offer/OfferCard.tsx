import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import type { Offer } from "@/content/offers";

type OfferCardProps = {
  offer: Offer;
  lead?: boolean;
};

export function OfferCard({ offer, lead = false }: OfferCardProps) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] border p-7 md:p-9",
        lead
          ? "border-accent/25 bg-accent-soft shadow-[0_30px_70px_-40px_rgba(30,64,175,0.55)]"
          : "border-line bg-surface",
      )}
    >
      {lead ? (
        <span
          aria-hidden
          className="aurora-drift pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-neon/30 blur-3xl"
        />
      ) : null}
      <p className="relative w-fit rounded-full border border-accent/25 bg-surface px-3 py-1 font-mono text-xs text-accent">
        {offer.tag}
      </p>
      <h3 className="relative mt-6 max-w-[16ch] text-3xl font-bold leading-[1.08] tracking-[-0.03em] md:text-4xl">
        {offer.title}
      </h3>
      <p className="relative mt-4 max-w-[44ch] text-lg leading-relaxed text-muted">
        {offer.body}
      </p>
      <ul className="relative mt-6 space-y-3">
        {offer.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[15px]">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              <Check aria-hidden size={12} weight="bold" />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="relative mt-8 pt-2 md:mt-auto">
        <ButtonLink
          href={offer.href}
          variant={lead ? "primary" : "secondary"}
          className={cn("w-full sm:w-auto", lead && "neon-glow")}
        >
          {offer.cta}
        </ButtonLink>
      </div>
    </article>
  );
}
