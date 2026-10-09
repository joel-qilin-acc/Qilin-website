export function BotFallback() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 88"
      className="pointer-events-none fixed bottom-24 right-3 z-[35] size-16 md:bottom-6 md:right-6 md:size-20"
    >
      <path d="M40 2 L46 22 L34 22 Z" fill="var(--color-accent-bright)" />
      <circle cx="40" cy="48" r="32" fill="var(--color-surface)" stroke="var(--color-line)" strokeWidth="2" />
      <path d="M10 54 Q40 66 70 54" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="44" rx="22" ry="12" fill="var(--color-ink)" />
      <rect x="29" y="38" width="6" height="12" rx="3" fill="var(--color-accent)" />
      <rect x="45" y="38" width="6" height="12" rx="3" fill="var(--color-accent)" />
      <rect x="26" y="78" width="10" height="7" rx="3" fill="var(--color-ink)" />
      <rect x="44" y="78" width="10" height="7" rx="3" fill="var(--color-ink)" />
    </svg>
  );
}
