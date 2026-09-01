import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Ear, Megaphone, CalendarCheck, HeartHandshake, Signal } from "lucide-react";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const MISSIONS = [
  {
    icon: Ear,
    title: "Éviter les semaines surchargées",
    body: "Anticiper et négocier avec les profs quand plusieurs gros devoirs ou contrôles tombent la même semaine.",
  },
  {
    icon: Signal,
    title: "Transparence sur les conseils de classe",
    body: "Un compte-rendu clair et détaillé après chaque conseil pour savoir ce qui s'est réellement dit.",
  },
  {
    icon: Megaphone,
    title: "Porter vos vraies remarques",
    body: "Parler franchement aux profs en cas de problème de rythme ou d'incompréhension, sans langue de bois.",
  },
  {
    icon: CalendarCheck,
    title: "Organiser des projets et sorties",
    body: "Proposer à la vie scolaire et aux profs au moins une vraie sortie ou un moment sympa pour la classe.",
  },
  {
    icon: HeartHandshake,
    title: "Entraide pour le Bac de Français & les Spés",
    body: "Faciliter le partage de cours, de fiches et la préparation des oraux blancs.",
  },
];

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="mission">
      <SectionHeader
        eyebrow="Nos engagements"
        title="Ce qu'on va réellement faire cette année."
        align="left"
      />

      <div ref={ref} className="relative mt-16 md:mt-20">
        <div className="absolute left-[1.4rem] top-2 h-full w-px bg-hairline md:left-1/2" />
        <motion.div
          style={{ height }}
          className="signature-gradient absolute left-[1.4rem] top-2 w-px origin-top md:left-1/2"
        />

        <ol className="space-y-14 md:space-y-24">
          {MISSIONS.map((m, i) => (
            <li key={m.title} className="relative pl-16 md:pl-0">
              <div
                className={`md:grid md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:col-start-2" : ""
                }`}
              >
                <Reveal>
                  <div
                    className={`glass-panel rounded-3xl p-6 sm:p-8 ${
                      i % 2 === 1 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        i % 2 === 1 ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <m.icon className="h-5 w-5 text-primary" strokeWidth={1.6} aria-hidden />
                      <p className="eyebrow">0{i + 1}</p>
                    </div>
                    <h3 className="mt-4 text-2xl sm:text-3xl">{m.title}</h3>
                  </div>
                </Reveal>
              </div>

              <motion.span
                aria-hidden
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="signature-gradient absolute left-[1.4rem] top-8 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-[0_0_28px_6px_color-mix(in_oklab,var(--beam)_60%,transparent)] md:left-1/2"
              />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
