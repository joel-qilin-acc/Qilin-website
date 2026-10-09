import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { FaqItem as FaqItemContent } from "@/types/content";

type FaqItemProps = {
  item: FaqItemContent;
};

export function FaqItem({ item }: FaqItemProps) {
  return (
    <details name="faq" className="group border-t border-line">
      <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium transition-colors hover:text-accent">
        {item.question}
        <Plus
          aria-hidden
          size={20}
          weight="bold"
          className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
        />
      </summary>
      <p className="max-w-[60ch] pb-6 text-lg leading-relaxed text-muted">{item.answer}</p>
    </details>
  );
}
