import { maxRps, minRps } from "@/lib/load-lab/model";

type LoadLabSliderProps = {
  rps: number;
  onRpsChange: (rps: number) => void;
};

const formatter = new Intl.NumberFormat("en-US");

export function LoadLabSlider({ rps, onRpsChange }: LoadLabSliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor="load-lab-rps" className="text-sm font-medium text-ink">
          How busy is your site?
        </label>
        <output
          htmlFor="load-lab-rps"
          className="text-sm tabular-nums text-ink"
        >
          {formatter.format(rps)} visitors a second
        </output>
      </div>
      <input
        id="load-lab-rps"
        type="range"
        min={minRps}
        max={maxRps}
        step={50}
        value={rps}
        onChange={(event) => onRpsChange(Number(event.target.value))}
        className="load-slider mt-3 w-full"
      />
      <div className="flex justify-between text-[11px] text-muted">
        <span>Quiet day</span>
        <span>Launch day</span>
      </div>
    </div>
  );
}
