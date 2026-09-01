import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PartyPopper, Handshake, CalendarCheck, BookOpen } from "lucide-react";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const PROGRAM = [
  {
    icon: CalendarCheck,
    title: "Planning partagé des contrôles",
    summary: "Finis les 3 DS qui tombent le même vendredi.",
    detail:
      "On tient un planning clair des évaluations et on va négocier directement avec les profs en amont dès qu'une semaine est surchargée.",
  },
  {
    icon: Handshake,
    title: "Compte-rendu franc après chaque conseil",
    summary: "Savoir exactement ce qui s'est dit.",
    detail:
      "Dès le lendemain du conseil de classe, on vous fait un retour complet : avis général des profs, points positifs, matières où il faut accélérer.",
  },
  {
    icon: BookOpen,
    title: "Entraide pour le Bac de Français",
    summary: "Partage de fiches et préparation aux oraux.",
    detail:
      "Création d'un dossier partagé avec les fiches de lecture, plans détaillés et organisation de sessions d'entraînement aux oraux avant les épreuves.",
  },
  {
    icon: PartyPopper,
    title: "Projet & Sortie de classe",
    summary: "Au moins un vrai moment sympa dans l'année.",
    detail:
      "On monte un dossier solide avec le professeur principal et la vie scolaire pour organiser une sortie ou un projet qui rassemble toute la classe.",
  },
];

export function Program() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="programme" className="stage-gradient">
      <SectionHeader
        eyebrow="Le programme"
        title="4 actions concrètes pour l'année."
        lead="Cliquez sur une action pour voir comment nous allons la mettre en place."
      />

      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2">
        {PROGRAM.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.title} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`glass-panel group relative w-full overflow-hidden rounded-4xl p-7 text-left transition-colors duration-500 sm:p-9 ${
                  isOpen ? "border-ring" : "hover:border-hairline"
                }`}
              >
                <div
                  aria-hidden
                  className={`signature-gradient pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-[90px] transition-opacity duration-700 ${
                    isOpen ? "opacity-35" : "opacity-0 group-hover:opacity-20"
                  }`}
                />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                    <h3 className="mt-5 text-2xl leading-tight sm:text-[1.75rem]">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  </div>
                  <span
                    className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline text-lg leading-none transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden"
                    >
                      <p className="mt-6 border-t border-hairline pt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.detail}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
