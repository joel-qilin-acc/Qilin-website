import { Pause, Play } from "@phosphor-icons/react/dist/ssr";

type LoadLabPauseButtonProps = {
  paused: boolean;
  onToggle: () => void;
};

export function LoadLabPauseButton({
  paused,
  onToggle,
}: LoadLabPauseButtonProps) {
  const Icon = paused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Play animation" : "Pause animation"}
      className="flex size-9 items-center justify-center rounded-base border border-line text-ink transition-colors hover:border-ink"
    >
      <Icon size={16} weight="fill" aria-hidden />
    </button>
  );
}
