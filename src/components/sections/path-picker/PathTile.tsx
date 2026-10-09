import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import { Spotlight } from "@/components/motion/Spotlight";
import type { PathTileContent } from "@/types/content";
import { PathTileHighlight } from "./PathTileHighlight";
import { PathTileIncludes } from "./PathTileIncludes";

const tileStyles = cva("rounded-base", {
  variants: {
    id: {
      platform: "bg-ink text-surface lg:col-start-1 lg:row-start-1 lg:min-h-[300px]",
      audit: "border border-line bg-surface lg:col-start-2 lg:row-start-1 lg:row-span-2",
      hire: "border border-line bg-surface-tint lg:col-start-1 lg:row-start-2",
    },
  },
});

type PathTileProps = {
  tile: PathTileContent;
};

export function PathTile({ tile }: PathTileProps) {
  const onDark = tile.id === "platform";
  const id = tile.id as "platform" | "audit" | "hire";

  return (
    <Spotlight className={tileStyles({ id })}>
      <Link href={tile.cta.href} className="group relative flex h-full flex-col justify-between p-8">
        <div>
          <p className={onDark ? "font-mono text-xs text-surface/70" : "font-mono text-xs text-muted"}>{tile.label}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">{tile.title}</h3>
          {tile.highlight ? <PathTileHighlight value={tile.highlight} note={tile.highlightNote} /> : null}
          <p className={onDark ? "mt-4 max-w-[44ch] text-surface/80" : "mt-4 max-w-[44ch] text-muted"}>{tile.body}</p>
          {tile.includes ? <PathTileIncludes items={tile.includes} /> : null}
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium">
          {tile.cta.label}
          <ArrowUpRight
            aria-hidden
            size={18}
            weight="bold"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </Spotlight>
  );
}
