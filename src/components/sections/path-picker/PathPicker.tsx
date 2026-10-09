import { pathTiles } from "@/content/paths";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PathTile } from "./PathTile";

export function PathPicker() {
  return (
    <Section id="start" bot="start">
      <Container>
        <SectionHeading
          title="Pick where you want to start."
          body="Three ways to work with us. Each has a clear price or a clear next step."
        />
        <Reveal stagger target className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          {pathTiles.map((tile) => (
            <PathTile key={tile.id} tile={tile} />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
