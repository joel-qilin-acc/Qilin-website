"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Hidden wherever a booking prompt is already on screen, and over the footer so it never covers the wordmark.
const watchedIds = ["hero", "page-hero", "free", "book", "site-footer"];

type Visibility = {
  ready: boolean;
  ids: string[];
};

export function StickyCta() {
  const [visibility, setVisibility] = useState<Visibility>({
    ready: false,
    ids: [],
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setVisibility((current) => {
        const next = new Set(current.ids);
        entries.forEach((entry) => {
          if (entry.isIntersecting) next.add(entry.target.id);
          else next.delete(entry.target.id);
        });
        return { ready: true, ids: [...next] };
      });
    });
    watchedIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const shown = visibility.ready && visibility.ids.length === 0;

  return (
    <div
      aria-hidden={!shown}
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[var(--z-sticky-cta)] mx-auto flex max-w-md items-center justify-between gap-4 rounded-base border border-line bg-surface/95 p-2 pl-5 shadow-[0_8px_30px_-12px_rgba(15,18,24,0.25)] md:bg-surface/90 md:backdrop-blur-md transition-[opacity,transform] duration-300 data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-6 data-[shown=false]:opacity-0"
      data-shown={shown}
    >
      <p className="text-sm text-muted">Have a system to fix or scale?</p>
      <ButtonLink href="#book" className="h-10 px-4 text-sm">
        Book a call
      </ButtonLink>
    </div>
  );
}
