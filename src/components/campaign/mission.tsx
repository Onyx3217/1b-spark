import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Ear, Megaphone, CalendarCheck, HeartHandshake, Signal } from "lucide-react";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const MISSIONS = [
  {
    icon: Ear,
    title: "Écouter tout le monde",
    body: "Un tour de classe avant chaque conseil, y compris ceux qui ne lèvent jamais la main.",
  },
  {
    icon: Megaphone,
    title: "Défendre vos idées",
    body: "Ce qui sort de la classe est ce que la classe a décidé, pas notre avis personnel.",
  },
  {
    icon: CalendarCheck,
    title: "Organiser des projets",
    body: "Sorties, journées à thème, tournois : un projet lancé par trimestre, pas des promesses.",
  },
  {
    icon: HeartHandshake,
    title: "Améliorer la vie de classe",
    body: "Régler les tensions tôt, en direct, avant qu'elles ne deviennent une affaire.",
  },
  {
    icon: Signal,
    title: "Faire entendre la 1B",
    body: "Un compte-rendu partagé après chaque conseil. Vous saurez toujours ce qui a été dit.",
  },
];

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="mission">
      <SectionHeader
        eyebrow="Notre mission"
        title="Cinq engagements, tenus dans cet ordre."
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
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {m.body}
                    </p>
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
