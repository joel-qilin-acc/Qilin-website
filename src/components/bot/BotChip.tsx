import {
  ChatCircleText,
  CheckCircle,
  Compass,
  FolderOpen,
  ListChecks,
  Medal,
  PaperPlaneTilt,
  Question,
  TrendUp,
  UsersThree,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { BotIcon } from "@/lib/bot/types";

const icons = {
  warning: WarningCircle,
  check: CheckCircle,
  users: UsersThree,
  compass: Compass,
  trend: TrendUp,
  folder: FolderOpen,
  medal: Medal,
  steps: ListChecks,
  chat: ChatCircleText,
  question: Question,
  send: PaperPlaneTilt,
} satisfies Record<BotIcon, unknown>;

type BotChipProps = {
  icon: BotIcon | null;
};

export const BotChip = forwardRef<HTMLDivElement, BotChipProps>(function BotChip({ icon }, ref) {
  const Icon = icon ? icons[icon] : null;
  const alert = icon === "warning";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[36] will-change-transform">
      <div
        key={icon}
        className={cn(
          "flex size-11 items-center justify-center rounded-full bg-surface shadow-[0_8px_24px_-8px_rgba(11,18,32,0.45)] ring-2 transition-opacity duration-300",
          alert ? "text-danger ring-danger" : "text-accent ring-accent",
          Icon ? "swap opacity-100" : "opacity-0",
        )}
      >
        {Icon ? <Icon size={24} weight="fill" /> : null}
      </div>
    </div>
  );
});
