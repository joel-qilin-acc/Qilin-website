import { Check } from "@phosphor-icons/react/dist/ssr";

type PathTileIncludesProps = {
  items: string[];
};

export function PathTileIncludes({ items }: PathTileIncludesProps) {
  return (
    <ul className="mt-8 space-y-3 border-t border-line pt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
          <Check aria-hidden size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}
