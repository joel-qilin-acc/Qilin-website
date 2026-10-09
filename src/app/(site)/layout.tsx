import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyCta } from "@/components/layout/StickyCta";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
