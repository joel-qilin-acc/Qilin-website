import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

type SectionHeadingProps = {
  title: string;
  mark?: string;
  balance?: boolean;
  body?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  title,
  mark,
  body,
  className,
  balance = true,
  as = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <SplitHeading
        as={as}
        mark={mark}
        className={cn(
          "text-3xl font-bold leading-[1.06] tracking-[-0.035em] md:text-5xl lg:text-[3.25rem]",
          balance ? "text-balance" : "text-pretty",
        )}
      >
        {title}
      </SplitHeading>
      {body ? (
        <Reveal>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted md:text-xl">
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
