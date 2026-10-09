"use client";

import { useMemo, useState } from "react";
import { caseStudies } from "@/content/case-studies";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { CaseRow } from "./CaseRow";

export function CaseIndex() {
  const industries = useMemo(() => ["All", ...new Set(caseStudies.map((study) => study.industry))], []);
  const [active, setActive] = useState("All");
  const visible = caseStudies.filter((study) => active === "All" || study.industry === active);

  return (
    <div>
      <div role="group" aria-label="Filter by industry" className="mb-10 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            aria-pressed={industry === active}
            onClick={() => setActive(industry)}
            className={cn(
              "h-10 rounded-base border px-4 text-sm font-medium transition-colors duration-200",
              industry === active
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-muted hover:border-ink hover:text-ink",
            )}
          >
            {industry}
          </button>
        ))}
      </div>
      <Reveal key={active} stagger className="border-b border-line">
        {visible.map((study) => (
          <CaseRow key={study.slug} study={study} />
        ))}
      </Reveal>
    </div>
  );
}
