type HighlightProps = {
  text: string;
  query: string;
};

const specials = /[.*+?^${}()|[\]\\]/g;

// Marks every place the search words appear, so the visitor sees why a question matched.
export function Highlight({ text, query }: HighlightProps) {
  const needle = query.trim();
  if (!needle) return text;
  const parts = text.split(
    new RegExp(`(${needle.replace(specials, "\\$&")})`, "ig"),
  );
  return parts.map((part, index) =>
    part.toLowerCase() === needle.toLowerCase() ? (
      <mark key={index} className="rounded-sm bg-neon/40 px-0.5 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
