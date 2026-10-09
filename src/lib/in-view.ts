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
