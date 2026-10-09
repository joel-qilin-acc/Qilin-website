import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type LinkRowProps = {
  href: string;
  title: string;
  body: string;
  meta?: string;
};

export function LinkRow({ href, title, body, meta }: LinkRowProps) {
  return (
    <Link
      href={href}
      className="group -mx-4 grid items-center gap-3 rounded-base border-t border-line px-4 py-8 transition-colors duration-300 hover:bg-surface-subtle md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-10"
    >
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        {meta ? <p className="mt-1 font-mono text-xs text-muted">{meta}</p> : null}
      </div>
      <p className="max-w-[52ch] leading-relaxed text-muted">{body}</p>
      <ArrowUpRight
        aria-hidden
        size={26}
        className="hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
      />
    </Link>
  );
}
