import { Reveal } from "@/components/motion/Reveal";
import type { Capability } from "@/types/content";

type CapabilityListProps = {
  items: Capability[];
};

export function CapabilityList({ items }: CapabilityListProps) {
  return (
    <Reveal selector="li">
      <ul className="grid gap-x-16 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="border-t border-line py-7">
            <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
