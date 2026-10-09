"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { gsap, useGSAP } from "@/lib/gsap";
import type { NavLink } from "@/types/content";
import { MobileMenuLinks } from "./MobileMenuLinks";

type MobileMenuProps = {
  links: NavLink[];
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]", panel);
      gsap.set(panel, { autoAlpha: 0 });
      gsap.set(items, { y: 36, autoAlpha: 0 });
      // State change: the menu opens as a sequence, so the choices arrive in order.
      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(panel, { autoAlpha: 1, duration: 0.25 })
        .to(
          items,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.07,
            duration: 0.6,
            ease: "expo.out",
          },
          "<0.05",
        );
    },
    { scope: panelRef },
  );

  useEffect(() => {
    if (open) timelineRef.current?.play();
    else timelineRef.current?.reverse();
    document.body.style.overflow = open ? "hidden" : "";
    const handleKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-[var(--z-menu)] flex size-10 items-center justify-center rounded-full border border-line bg-surface"
      >
        {open ? (
          <X aria-hidden size={18} weight="bold" />
        ) : (
          <List aria-hidden size={18} weight="bold" />
        )}
      </button>
      <div
        ref={panelRef}
        id="mobile-menu"
        className="fixed inset-0 z-[calc(var(--z-menu)-1)] flex flex-col justify-center gap-2 bg-surface px-8"
      >
        <MobileMenuLinks links={links} onNavigate={() => setOpen(false)} />
      </div>
    </div>
  );
}
