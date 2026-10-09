"use client";

import { useRef } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { gsap, motionOk, SplitText } from "@/lib/gsap";
import type { FaqItem as FaqItemContent } from "@/types/content";
import { FaqVote } from "./FaqVote";
import { Highlight } from "./Highlight";

type FaqRowProps = {
  item: FaqItemContent;
  index: number;
  query: string;
  onOpen: (index: number) => void;
  onNext?: () => void;
};

// When a question opens, its answer arrives word by word, so the eye follows it as it is read.
function revealWords(answer: HTMLElement) {
  if (!window.matchMedia(motionOk).matches) return;
  const split = SplitText.create(answer, { type: "words" });
  gsap.from(split.words, {
    opacity: 0,
    y: 10,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.02,
    onComplete: () => split.revert(),
  });
}

export function FaqRow({ item, index, query, onOpen, onNext }: FaqRowProps) {
  const answerRef = useRef<HTMLParagraphElement>(null);

  return (
    <details
      name="faq"
      data-faq-row
      onToggle={(event) => {
        if (!event.currentTarget.open) return;
        onOpen(index);
        if (answerRef.current) revealWords(answerRef.current);
      }}
      className="group relative border-t border-line transition-colors duration-500 open:bg-accent-soft/45"
    >
      <summary className="flex cursor-pointer items-center gap-5 py-6 pe-3 ps-4 text-lg font-semibold tracking-[-0.015em] transition-[padding,color] duration-300 hover:ps-6 hover:text-accent group-open:text-accent">
        <span className="font-mono text-xs font-normal text-muted transition-colors group-open:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1">
          <Highlight text={item.question} query={query} />
        </span>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-accent transition-[transform,background-color,color,border-color] duration-300 group-hover:border-accent group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-on-accent"
        >
          <Plus size={16} weight="bold" />
        </span>
      </summary>
      <p
        ref={answerRef}
        className="max-w-[60ch] pb-7 ps-[3.75rem] pe-6 text-lg leading-relaxed text-muted"
      >
        <Highlight text={item.answer} query={query} />
      </p>
      <FaqVote onNext={onNext} />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-accent to-neon shadow-[0_0_14px_var(--color-neon)] transition-transform duration-500 group-open:scale-y-100"
      />
    </details>
  );
}
