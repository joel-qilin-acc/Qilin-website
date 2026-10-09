import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/cn";
import type { CampaignContent } from "@/types/content";

type HeroCopyProps = {
  content: CampaignContent;
  animate?: boolean;
};

const headlineStyles =
  "max-w-[20ch] text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]";

export function HeroCopy({ content, animate = false }: HeroCopyProps) {
  const rise = animate ? "rise" : undefined;

  return (
    <div>
      {animate ? (
        <SplitHeading as="h1" trigger="load" className={headlineStyles}>
          {content.headline}
        </SplitHeading>
      ) : (
        <h1 className={headlineStyles}>{content.headline}</h1>
      )}
      <p
        className={cn(
          rise,
          "mt-6 max-w-[34ch] text-lg leading-relaxed text-muted",
        )}
        style={{ "--rise-delay": "0.35s" } as React.CSSProperties}
      >
        {content.body}
      </p>
      <div
        className={cn(rise, "mt-9 flex flex-wrap items-center gap-x-8 gap-y-4")}
        style={{ "--rise-delay": "0.5s" } as React.CSSProperties}
      >
        <Magnetic>
          <ButtonLink href={content.primaryCta.href}>
            {content.primaryCta.label}
            <ArrowRight aria-hidden size={18} weight="bold" />
          </ButtonLink>
        </Magnetic>
        <ButtonLink href={content.secondaryCta.href} variant="text">
          {content.secondaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
