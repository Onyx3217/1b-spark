import { useRef } from "react";
import { burstConfetti } from "@/lib/confetti";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const PROMISES = [
  "Pas de devoirs le lundi (ou presque).",
  "Plus de bonne humeur, mesurée à l'œil nu.",
  "Sourires garantis, remboursés sinon.",
  "Distribution de chocolat… peut-être.",
];

export function Promises() {
  return (
    <Section id="promesses">
      <SectionHeader
        eyebrow="Section détente"
        title={
          <>
            Promesses totalement réalistes <span aria-hidden>😎</span>
          </>
        }
        lead="Cliquez, c'est là que finit le sérieux. Le reste du site, on le tient."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {PROMISES.map((p, i) => (
          <Reveal key={p} delay={i * 0.06}>
            <ConfettiCard text={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ConfettiCard({ text }: { text: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const pop = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 55, 1.6);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={pop}
      className="glass-panel w-full rounded-3xl px-7 py-8 text-left text-lg leading-snug transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
    >
      {text}
      <span className="mt-3 block text-xs text-muted-foreground">Cliquez pour faire exploser</span>
    </button>
  );
}
