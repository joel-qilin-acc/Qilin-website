import { Reveal } from "@/components/motion/Reveal";

type StackChipsProps = {
  items: string[];
};

export function StackChips({ items }: StackChipsProps) {
  return (
    <Reveal selector="li">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-base border border-line bg-surface px-3.5 py-2 font-mono text-xs text-ink">
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
