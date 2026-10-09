import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type CheckListProps = {
  items: string[];
  onDark?: boolean;
};

export function CheckList({ items, onDark = false }: CheckListProps) {
  return (
    <Reveal selector="li">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className={cn("flex items-start gap-3 text-lg leading-snug", onDark ? "text-surface" : "text-ink")}>
            <Check
              aria-hidden
              size={22}
              weight="bold"
              className={cn("mt-0.5 shrink-0", onDark ? "text-accent-bright" : "text-accent")}
            />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
