export type Palette = {
  accent: string;
  ink: string;
  muted: string;
  line: string;
  surface: string;
  subtle: string;
  danger: string;
  warn: string;
  display: string;
  mono: string;
};

export function readPalette(element: HTMLElement): Palette {
  const styles = getComputedStyle(element);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    accent: read("--color-accent", "#1e40af"),
    ink: read("--color-ink", "#0b1220"),
    muted: read("--color-muted", "#55617a"),
    line: read("--color-line", "#e1e6f0"),
    surface: read("--color-surface", "#ffffff"),
    subtle: read("--color-surface-subtle", "#f4f6fb"),
    danger: read("--color-danger", "#d92d20"),
    warn: read("--color-warn", "#e08a00"),
    display: styles.fontFamily || "system-ui, sans-serif",
    mono: read("--font-mono-face", "ui-monospace, monospace"),
  };
}
