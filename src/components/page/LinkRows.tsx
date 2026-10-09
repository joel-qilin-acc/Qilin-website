import { Reveal } from "@/components/motion/Reveal";
import { LinkRow } from "./LinkRow";

type Row = {
  href: string;
  title: string;
  body: string;
  meta?: string;
};

type LinkRowsProps = {
  rows: Row[];
};

export function LinkRows({ rows }: LinkRowsProps) {
  return (
    <Reveal stagger className="border-b border-line">
      {rows.map((row) => (
        <LinkRow key={row.href} {...row} />
      ))}
    </Reveal>
  );
}
