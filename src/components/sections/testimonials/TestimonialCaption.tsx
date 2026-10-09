import type { Testimonial } from "@/types/content";

type TestimonialCaptionProps = {
  testimonial: Testimonial;
  active: boolean;
};

export function TestimonialCaption({
  testimonial,
  active,
}: TestimonialCaptionProps) {
  return (
    <span className="block bg-ink p-5 text-on-accent sm:p-6 lg:absolute lg:inset-x-0 lg:bottom-0">
      {active ? (
        <span className="swap block">
          <span className="block max-w-[46ch] text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            “{testimonial.quote}”
          </span>
          <span className="mt-3 block text-sm text-on-accent/80">
            {testimonial.name}, {testimonial.role}, {testimonial.company}
          </span>
        </span>
      ) : (
        <span className="block text-sm font-medium">{testimonial.company}</span>
      )}
    </span>
  );
}
