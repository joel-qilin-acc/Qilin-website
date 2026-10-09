import Link from "next/link";

export function FaqEmpty({ query }: { query: string }) {
  return (
    <p className="rounded-2xl bg-surface-subtle p-6 text-lg text-muted">
      Nothing matches “{query}”.{" "}
      <Link
        href="/contact"
        className="font-medium text-accent underline underline-offset-4"
      >
        Ask us directly
      </Link>
      .
    </p>
  );
}
