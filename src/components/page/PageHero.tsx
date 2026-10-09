import { Container } from "@/components/ui/Container";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  title: string;
  body?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
};

export function PageHero({ title, body, actions, aside }: PageHeroProps) {
  return (
    <section id="page-hero" className="relative pb-16 pt-36 md:pb-24 md:pt-44">
      <Container className={cn(aside && "grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16")}>
        <div>
          <SplitHeading
            as="h1"
            trigger="load"
            className="max-w-[20ch] text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[4rem]"
          >
            {title}
          </SplitHeading>
          {body ? (
            <p
              className="rise mt-6 max-w-[56ch] text-lg leading-relaxed text-muted"
              style={{ "--rise-delay": "0.35s" } as React.CSSProperties}
            >
              {body}
            </p>
          ) : null}
          {actions ? (
            <div
              className="rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ "--rise-delay": "0.5s" } as React.CSSProperties}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {aside}
      </Container>
    </section>
  );
}
