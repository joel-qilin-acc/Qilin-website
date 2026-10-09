import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { proof } from "@/content/proof";
import { SplitHeading } from "@/components/motion/SplitHeading";

export function ProofCopy() {
  return (
    <div>
      <p className="font-mono text-xs text-surface/75">
        Case study: {proof.client}
      </p>
      <SplitHeading
        mark="customers wait."
        markSolid
        className="mt-4 text-3xl font-bold leading-[1.06] tracking-[-0.035em] text-balance md:text-5xl lg:text-[3.25rem]"
      >
        {proof.title}
      </SplitHeading>
      <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-surface/85">
        {proof.body}
      </p>
      <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {proof.facts.map((fact) => (
          <div
            key={fact.label}
            className={
              fact.label === "Built with" ? "sm:col-span-2" : undefined
            }
          >
            <dt className="text-xs text-surface/75">{fact.label}</dt>
            <dd className="mt-1 font-mono text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Link
        href={proof.href}
        className="group mt-9 inline-flex items-center gap-2 text-[15px] font-medium underline decoration-surface/40 underline-offset-[6px] transition-colors hover:decoration-surface"
      >
        Read the case study
        <ArrowRight
          aria-hidden
          size={16}
          weight="bold"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
