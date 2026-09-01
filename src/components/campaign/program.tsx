import { CalendarCheck, Handshake, BookOpen, PartyPopper } from "lucide-react";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const PROGRAM = [
  {
    icon: CalendarCheck,
    title: "Planning des contrôles",
  },
  {
    icon: Handshake,
    title: "Compte-rendu après chaque conseil",
  },
  {
    icon: BookOpen,
    title: "Entraide Bac de Français",
  },
  {
    icon: PartyPopper,
    title: "Sortie & Projets de classe",
  },
];

export function Program() {
  return (
    <Section id="programme" className="stage-gradient">
      <SectionHeader
        eyebrow="Le programme"
        title="Nos 4 priorités"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {PROGRAM.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-colors duration-500 hover:border-ring">
              <div
                aria-hidden
                className="signature-gradient pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-25"
              />
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/80 border border-hairline">
                  <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium leading-snug">{item.title}</h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
