"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  Check,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type FaqVoteProps = {
  onNext?: () => void;
};

type Vote = "yes" | "no" | null;

const pill =
  "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors duration-200";

// Under every answer: was it useful? A "no" offers a person, a "yes" offers the next question.
export function FaqVote({ onNext }: FaqVoteProps) {
  const [vote, setVote] = useState<Vote>(null);

  return (
    <div className="flex flex-wrap items-center gap-2.5 pb-6 ps-[3.75rem] pe-6">
      {vote === null ? (
        <>
          <span className="text-sm text-muted">Was this helpful?</span>
          <button
            type="button"
            onClick={() => setVote("yes")}
            className={cn(
              pill,
              "border-line hover:border-accent hover:text-accent",
            )}
          >
            <ThumbsUp aria-hidden size={15} /> Yes
          </button>
          <button
            type="button"
            onClick={() => setVote("no")}
            className={cn(pill, "border-line hover:border-ink")}
          >
            <ThumbsDown aria-hidden size={15} /> Not quite
          </button>
        </>
      ) : null}
      {vote === "yes" ? (
        <>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <Check aria-hidden size={16} weight="bold" /> Glad it helped.
          </span>
          {onNext ? (
            <button
              type="button"
              onClick={onNext}
              className={cn(
                pill,
                "border-accent text-accent hover:bg-accent hover:text-on-accent",
              )}
            >
              Next question <ArrowDown aria-hidden size={14} weight="bold" />
            </button>
          ) : null}
        </>
      ) : null}
      {vote === "no" ? (
        <>
          <span className="text-sm text-muted">
            Sorry about that. A real person can answer it properly.
          </span>
          <Link
            href="/contact"
            className={cn(
              pill,
              "neon-glow border-transparent bg-accent text-on-accent hover:bg-accent-hover",
            )}
          >
            Ask an engineer
          </Link>
        </>
      ) : null}
    </div>
  );
}
