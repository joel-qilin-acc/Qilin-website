import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

type SectionHeadingProps = {
  title: string;
  body?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ title, body, className, as = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <SplitHeading
        as={as}
        className="text-3xl font-semibold leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </SplitHeading>
      {body ? (
        <Reveal>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted">{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
