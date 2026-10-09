import { Trace } from "@/components/motion/Trace";
import { ClientLogos } from "@/components/sections/client-logos/ClientLogos";
import { CtaBand } from "@/components/sections/cta-band/CtaBand";
import { Difference } from "@/components/sections/difference/Difference";
import { Faq } from "@/components/sections/faq/Faq";
import { Founder } from "@/components/sections/founder/Founder";
import { Hero } from "@/components/sections/hero/Hero";
import { Offer } from "@/components/sections/offer/Offer";
import { PathPicker } from "@/components/sections/path-picker/PathPicker";
import { Process } from "@/components/sections/process/Process";
import { ProofStory } from "@/components/sections/proof-story/ProofStory";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { WorkPan } from "@/components/sections/work-pan/WorkPan";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Trace />
      <Hero searchParams={searchParams} />
      <ClientLogos />
      <Offer />
      <Difference />
      <PathPicker />
      <ProofStory />
      <WorkPan />
      <Founder />
      <Process />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
