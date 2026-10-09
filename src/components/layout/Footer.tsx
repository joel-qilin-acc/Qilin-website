import Image from "next/image";
import Link from "next/link";
import { footerGroups, logoSrc } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { FooterAurora } from "@/components/motion/FooterAurora";
import { FooterWordmark } from "@/components/motion/FooterWordmark";
import { BackToTop } from "./BackToTop";
import { FooterGroup } from "./FooterGroup";

export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-line bg-surface-subtle pt-16">
      <FooterAurora />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Qilin Lab home">
              <Image
                src={logoSrc}
                alt="Qilin Lab"
                width={132}
                height={22}
                unoptimized
                className="brightness-0"
              />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Senior engineers who build, scale and secure software for growing
              teams.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <FooterGroup
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © 2026 Qilin Lab. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </Container>
      <div className="relative mt-6 px-4 pb-10 md:pb-14">
        <FooterWordmark />
      </div>
    </footer>
  );
}
