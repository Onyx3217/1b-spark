import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PartyPopper, Handshake, Megaphone, BookOpen } from "lucide-react";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const PROGRAM = [
  {
    icon: PartyPopper,
    title: "Plus d'événements de classe",
    summary: "Un temps fort par trimestre, organisé et budgété.",
    detail:
      "Une sortie, un tournoi inter-classes et une journée à thème. On propose le calendrier dès octobre à la vie scolaire pour que les dates tiennent.",
  },
  {
    icon: Handshake,
    title: "Le lien avec les professeurs",
    summary: "Un interlocuteur clair, dans les deux sens.",
    detail:
      "Un point rapide avec le professeur principal chaque quinzaine : charge de travail, contrôles qui s'empilent, ambiance en cours. Vous recevez le compte-rendu.",
  },
  {
    icon: Megaphone,
    title: "Porter vos idées",
    summary: "Rien ne remonte sans avoir été validé par la classe.",
    detail:
      "Chaque demande est notée, présentée au conseil, puis suivie jusqu'à la réponse. Si c'est refusé, on vous dit pourquoi.",
  },
  {
    icon: BookOpen,
    title: "Une meilleure ambiance de travail",
    summary: "Moins de bruit, plus d'entraide.",
    detail:
      "Mise en place d'un binôme d'entraide par matière difficile et d'un planning partagé des évaluations pour éviter les semaines surchargées.",
  },
];

export function Program() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="programme" className="stage-gradient">
      <SectionHeader
        eyebrow="Le programme"
        title="Quatre mesures. Rien d'autre."
        lead="Ouvrez une mesure pour voir comment elle est concrètement mise en place."
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
