"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";

type FaqSearchProps = {
  query: string;
  onQuery: (query: string) => void;
  shown: number;
  total: number;
};

export function FaqSearch({ query, onQuery, shown, total }: FaqSearchProps) {
  return (
    <div className="mb-5">
      <label className="group relative flex items-center">
        <span className="sr-only">Search the questions</span>
        <MagnifyingGlass
          aria-hidden
          size={18}
          className="pointer-events-none absolute left-4 text-muted transition-colors group-focus-within:text-accent"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Escape" && onQuery("")}
          placeholder="Search the questions, for example cost or security"
          className="h-12 w-full rounded-full border border-line bg-surface pe-12 ps-11 text-[15px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-neon)_30%,transparent)] [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQuery("")}
            aria-label="Clear the search"
            className="absolute right-2 grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <X aria-hidden size={14} weight="bold" />
          </button>
        ) : null}
      </label>
      <p aria-live="polite" className="mt-2 ps-4 text-xs text-muted">
        {query ? `${shown} of ${total} questions match` : `${total} questions`}
      </p>
    </div>
  );
}
