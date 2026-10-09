type MarkedTextProps = {
  text: string;
  mark?: string;
  // On dark backgrounds the lime fills the whole word so the dark text always sits on it.
  solid?: boolean;
};

// Wraps one key phrase in the neon highlighter. If the phrase is not in the text, the text is shown unchanged.
export function MarkedText({ text, mark, solid = false }: MarkedTextProps) {
  const start = mark ? text.indexOf(mark) : -1;
  if (!mark || start < 0) return text;
  return (
    <>
      {text.slice(0, start)}
      <span className={solid ? "neon-mark neon-mark-solid" : "neon-mark"}>
        {mark}
      </span>
      {text.slice(start + mark.length)}
    </>
  );
}
