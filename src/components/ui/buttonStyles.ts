import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-base px-6 text-[15px] font-medium transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent hover:bg-accent-hover",
        secondary: "border border-line bg-surface text-ink hover:border-ink",
        inverse: "bg-surface text-accent hover:bg-accent-soft",
        text: "h-auto px-0 text-ink underline decoration-line underline-offset-[6px] hover:decoration-accent",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);
