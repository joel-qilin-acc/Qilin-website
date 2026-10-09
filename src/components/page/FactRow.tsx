import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

type Fact = {
  value: string;
  label: string;
};

type FactRowProps = {
  facts: Fact[];
};

function parseFact(value: string) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const number = Number(match[2].replace(/,/g, ""));
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return { prefix: match[1], number, decimals, suffix: match[3] };
}

export function FactRow({ facts }: FactRowProps) {
  return (
    <Reveal selector="dl > div">
      <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => {
          const parsed = parseFact(fact.value);
          return (
            <div key={fact.label} className="border-t border-line pt-5">
              <dd className="font-figure text-5xl md:text-6xl">
                {parsed ? (
                  <CountUp value={parsed.number} decimals={parsed.decimals} prefix={parsed.prefix} suffix={parsed.suffix} />
                ) : (
                  fact.value
                )}
              </dd>
              <dt className="mt-3 text-muted">{fact.label}</dt>
            </div>
          );
        })}
      </dl>
    </Reveal>
  );
}
