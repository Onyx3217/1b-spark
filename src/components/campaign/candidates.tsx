import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import camille from "@/assets/camille.jpg";
import leo from "@/assets/leo.jpg";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

const CANDIDATES = [
  {
    name: "Léo",
    role: "Délégué",
    image: leo,
    qualities: ["Franc-parler", "Médiation", "Fiabilité"],
    contribution:
      "Il porte les sujets qui coincent devant les professeurs sans les édulcorer, et il tient les délais qu'il annonce.",
    thought: null,
  },
  {
    name: "Camille",
    role: "Déléguée",
    image: camille,
    qualities: ["Écoute active", "Organisation", "Sang-froid"],
    contribution:
      "Elle prépare chaque conseil de classe à partir de ce que vous lui dites vraiment, et elle en revient avec des réponses claires.",
    thought: "On va faire de la 1B la meilleure classe de l'année !",
  },
];

export function Candidates() {
  return (
    <Section id="duo" className="stage-gradient">
      <SectionHeader
        eyebrow="Le duo"
        title="Deux façons de faire, un seul engagement."
        lead="Camille et Léo se répartissent le travail au lieu de se répéter. L'un défend, l'autre structure."
      />
      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2">
        {CANDIDATES.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <TiltCard {...c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function TiltCard({
  name,
  role,
  image,
  qualities,
  contribution,
  thought,
}: (typeof CANDIDATES)[number]) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 24 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 24 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["18%", "82%"]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="glass-panel will-animate group relative overflow-hidden rounded-4xl p-2"
    >
      <motion.div
        aria-hidden
        style={{ left: glareX }}
        className="pointer-events-none absolute top-0 h-full w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={`Portrait de ${name}`}
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full scale-105 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        {/* Bulle de pensée pour Camille */}
        {thought && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 top-4 max-w-[58%]"
          >
            {/* Corps de la bulle */}
            <div className="relative rounded-2xl bg-white/90 px-4 py-3 text-[0.72rem] font-medium leading-snug text-zinc-800 shadow-lg backdrop-blur-sm">
              {thought}
              {/* Queue de bulle (cercles pensifs) */}
              <span
                aria-hidden
                className="absolute -bottom-2.5 left-6 h-3 w-3 rounded-full bg-white/90 shadow-sm"
              />
              <span
                aria-hidden
                className="absolute -bottom-4.5 left-4 h-2 w-2 rounded-full bg-white/75 shadow-sm"
              />
              <span
                aria-hidden
                className="absolute -bottom-6 left-3 h-1.5 w-1.5 rounded-full bg-white/60"
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative p-6 sm:p-8">
        <p className="eyebrow">{role} · 1B</p>
        <h3 className="mt-3 text-3xl sm:text-4xl">{name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contribution}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {qualities.map((q) => (
            <li
              key={q}
              className="rounded-full border border-hairline bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-secondary-foreground"
            >
              {q}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
