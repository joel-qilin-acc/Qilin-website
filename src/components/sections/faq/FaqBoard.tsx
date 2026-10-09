"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, motionOk, useGSAP } from "@/lib/gsap";
import type { FaqItem as FaqItemContent } from "@/types/content";
import { FaqEmpty } from "./FaqEmpty";
import { FaqHelp } from "./FaqHelp";
import { FaqRow } from "./FaqRow";
import { FaqSearch } from "./FaqSearch";

type FaqBoardProps = {
  title: string;
  mark?: string;
  items: FaqItemContent[];
};

const matches = (item: FaqItemContent, query: string) =>
  `${item.question} ${item.answer}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());

// "Next question" opens the following visible row and brings it to the middle of the screen.
function openNext(list: HTMLElement | null, position: number) {
  const next =
    list?.querySelectorAll<HTMLDetailsElement>("[data-faq-row]")[position + 1];
  if (!next) return;
  next.querySelector("summary")?.click();
  next.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function FaqBoard({ title, mark, items }: FaqBoardProps) {
  const [opened, setOpened] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const visible = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => matches(item, query));
  const markOpened = (index: number) =>
    setOpened((current) =>
      current.includes(index) ? current : [...current, index],
    );

  // Typing re-deals the matching rows with a short stagger, so the list reacts to every keystroke.
  useGSAP(
    () => {
      if (!query || !window.matchMedia(motionOk).matches) return;
      gsap.from("[data-faq-row]", {
        y: 14,
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: listRef, dependencies: [query] },
  );

  return (
    <>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading title={title} mark={mark} />
        <FaqHelp read={opened.length} total={items.length} />
      </div>
      <div ref={listRef}>
        <FaqSearch
          query={query}
          onQuery={setQuery}
          shown={visible.length}
          total={items.length}
        />
        <Reveal
          selector="[data-faq-row]"
          target
          className="border-b border-line"
        >
          {visible.map(({ item, index }, position) => (
            <FaqRow
              key={item.question}
              item={item}
              index={index}
              query={query}
              onOpen={markOpened}
              onNext={
                position < visible.length - 1
                  ? () => openNext(listRef.current, position)
                  : undefined
              }
            />
          ))}
        </Reveal>
        {visible.length === 0 ? <FaqEmpty query={query} /> : null}
      </div>
    </>
  );
}
