import { clients } from "@/content/clients";
import { Container } from "@/components/ui/Container";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { ClientLogo } from "./ClientLogo";

export function ClientLogos() {
  return (
    <section aria-label="Clients" data-bot="logos" className="relative border-y border-line bg-surface py-12">
      <Container>
        <p className="text-center text-sm text-muted">Trusted by teams at</p>
      </Container>
      <div className="mt-8">
        <ScrollMarquee>
          {clients.map((client) => (
            <ClientLogo key={client.name} client={client} />
          ))}
        </ScrollMarquee>
      </div>
    </section>
  );
}
