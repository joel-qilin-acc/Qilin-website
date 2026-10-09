import Image from "next/image";
import { clientLogoBase } from "@/content/clients";
import type { ClientLogo as ClientLogoContent } from "@/types/content";

type ClientLogoProps = {
  client: ClientLogoContent;
};

export function ClientLogo({ client }: ClientLogoProps) {
  return (
    <li className="flex h-16 w-40 shrink-0 items-center justify-center">
      <Image
        src={`${clientLogoBase}/${client.file}`}
        alt={client.name}
        width={112}
        height={48}
        loading="eager"
        style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
        className="h-12 w-28 object-contain opacity-80 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}
