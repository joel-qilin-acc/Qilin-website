"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types/content";
import { TestimonialCaption } from "./TestimonialCaption";

type TestimonialPanelProps = {
  testimonial: Testimonial;
  active: boolean;
  onActivate: () => void;
};

export function TestimonialPanel({
  testimonial,
  active,
  onActivate,
}: TestimonialPanelProps) {
  const [playing, setPlaying] = useState(false);
  const showVideo = active && playing;

  return (
    <div
      data-voice
      data-active={active}
      // --a is how open the panel is (0 to 1). The scroll sets it continuously; without scrolling the active one is 1.
      className="relative h-[calc(5rem_+_(min(470px,56svh)_-_5rem)_*_var(--a))] overflow-hidden rounded-base bg-ink [--a:0] data-[active=true]:[--a:1] lg:h-auto lg:shrink lg:grow-[calc(1_+_4_*_var(--a))] lg:basis-0"
    >
      {showVideo ? (
        <iframe
          title={`Video testimonial from ${testimonial.name}`}
          src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={active ? () => setPlaying(true) : onActivate}
          aria-label={
            active
              ? `Play video testimonial from ${testimonial.name}`
              : `Show ${testimonial.company} testimonial`
          }
          className="group flex size-full flex-col text-left lg:block"
        >
          <span className="relative block min-h-0 flex-1 lg:absolute lg:inset-0">
            <Image
              src={`https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 700px, 90vw"
              className={cn(
                "origin-center scale-[1.34] object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.38]",
                active ? "opacity-100" : "opacity-60",
              )}
            />
            {active ? (
              <span className="absolute right-5 top-5 flex size-14 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:scale-110">
                <Play aria-hidden size={22} weight="fill" />
              </span>
            ) : null}
          </span>
          <TestimonialCaption testimonial={testimonial} active={active} />
        </button>
      )}
    </div>
  );
}
