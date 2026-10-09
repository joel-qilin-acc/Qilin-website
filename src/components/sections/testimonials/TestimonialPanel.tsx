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
      className={cn(
        "relative overflow-hidden rounded-base bg-ink transition-[flex-grow,height] duration-[600ms] ease-out",
        active
          ? "h-[min(470px,56svh)] lg:h-auto lg:flex-[5]"
          : "h-20 lg:h-auto lg:flex-[1]",
      )}
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
