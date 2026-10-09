import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { preconnect } from "react-dom";
import Script from "next/script";
import { documentFlagsScript } from "@/lib/document-flags";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Qilin Lab | Technology your business can count on",
    template: "%s | Qilin Lab",
  },
  description:
    "Senior engineers who build, fix and protect the software behind your business. Faster apps, security audits, lower cloud bills and dedicated developers.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preconnect("https://qilinlab.com");

  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${mono.variable}`}>
      <body>
        <Script id="document-flags" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: documentFlagsScript }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
