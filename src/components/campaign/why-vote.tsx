import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "./section";

const ARGUMENTS = [
  { title: "On ose parler aux profs", body: "Poser les questions que tout le monde se pose tout bas sans oser lever la main." },
  { title: "Pas là pour la déco", body: "On se présente pour faire bouger les choses, pas juste pour une ligne sur le bulletin." },
  { title: "Dispos tous les jours", body: "Pendant les récrés, à la cantine ou sur WhatsApp : pas besoin d'attendre la veille du conseil." },
  { title: "Présents à 100%", body: "Toujours là aux réunions et conseils pour défendre chaque élève de la classe." },
  { title: "Organisation carrée", body: "On note les remarques et les devoirs pour ne rien oublier et agir vite." },
  { title: "Bonne ambiance", body: "Une classe soudée qui rigole ensemble travaille 10 fois mieux. On y veillera." },
];

/** Cartes en apesanteur : chacune dérive à sa propre profondeur pendant le scroll. */
export function WhyVote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgShift = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} id="pourquoi" className="relative overflow-hidden px-6 py-28 sm:py-36 lg:px-10">
      <motion.div aria-hidden style={{ y: bgShift }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-accent/18 blur-[150px]" />
        <div className="absolute right-[5%] bottom-[5%] h-[30rem] w-[30rem] rounded-full bg-primary/18 blur-[150px]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl">
        <SectionHeader eyebrow="Pourquoi nous" title="Pourquoi voter pour notre duo ?" />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARGUMENTS.map((a, i) => (
            <FloatingCard key={a.title} index={i} progress={scrollYProgress} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  title,
  body,
  index,
  progress,
}: {
  title: string;
  body: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const depth = 24 + (index % 3) * 22;
  const y = useTransform(progress, [0, 1], [depth, -depth]);

  return (
    <motion.article
      style={{ y }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel will-animate rounded-3xl p-7 transition-colors duration-500 hover:border-ring"
    >
      <p className="text-signature text-3xl font-semibold tabular-nums">0{index + 1}</p>
      <h3 className="mt-4 text-xl">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </motion.article>
  );
}
