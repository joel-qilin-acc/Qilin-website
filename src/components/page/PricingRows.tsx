import { Reveal } from "@/components/motion/Reveal";

type PricingRow = {
  role: string;
  price: string;
  note: string;
};

type PricingRowsProps = {
  rows: PricingRow[];
};

export function PricingRows({ rows }: PricingRowsProps) {
  return (
    <Reveal stagger className="border-b border-line">
      {rows.map((row) => (
        <div
          key={row.role}
          className="grid items-baseline gap-2 border-t border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10"
        >
          <p className="text-2xl font-semibold tracking-tight">{row.role}</p>
          <p className="flex flex-wrap items-baseline gap-x-4">
            <span className="font-figure text-5xl md:text-6xl">{row.price}</span>
            <span className="font-mono text-sm text-muted">{row.note}</span>
          </p>
        </div>
      ))}
    </Reveal>
  );
}
