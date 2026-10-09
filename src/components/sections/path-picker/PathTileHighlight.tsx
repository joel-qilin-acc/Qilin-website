type PathTileHighlightProps = {
  value: string;
  note?: string;
};

export function PathTileHighlight({ value, note }: PathTileHighlightProps) {
  return (
    <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-figure text-5xl text-ink md:text-6xl">{value}</span>
      {note ? <span className="font-mono text-sm text-muted">{note}</span> : null}
    </p>
  );
}
