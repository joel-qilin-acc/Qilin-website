// Runs the callback once, the first time the element is on screen. The inset hides the bottom part of the screen, so
// "5%" fires only after the element has come that far up. This asks the browser where the element really is, so unlike
// scroll positions it can never be thrown off by pinned sections that are added to the page later.
export function whenInView(
  element: Element,
  onEnter: () => void,
  bottomInset = "0%",
) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      onEnter();
    },
    { rootMargin: `0px 0px -${bottomInset} 0px` },
  );
  observer.observe(element);
  return () => observer.disconnect();
}

// Reports how much of the element is on screen (0 to 1) every time that changes, so an animation can follow the scroll.
// Like whenInView it asks the browser instead of reading scroll positions, so it cannot drift out of place.
export function trackInView(
  element: Element,
  onRatio: (ratio: number) => void,
) {
  const steps = Array.from({ length: 51 }, (_, index) => index / 50);
  const observer = new IntersectionObserver(
    ([entry]) => onRatio(entry.intersectionRatio),
    { threshold: steps },
  );
  observer.observe(element);
  return () => observer.disconnect();
}
