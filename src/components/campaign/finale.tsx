import { motion } from "motion/react";
import { Starfield } from "./starfield";

/** Section finale spectaculaire, ultra fluide et sans blocage de scroll */
export function Finale() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      {/* Fond spatial & lumières */}
      <Starfield density={0.0002} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[150px]" />
        <div className="absolute left-1/2 top-[70%] h-[35rem] w-[55rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[160px]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,#09090B_100%)]"
      />

      {/* Contenu final */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Pour une 1B au top toute l'année
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-foreground text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95]"
        >
          Camille <span className="text-signature">&amp;</span> Léo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-signature mt-4 text-[clamp(1.2rem,3vw,2rem)] font-semibold"
        >
          Délégués 1B
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          On est là pour vous écouter, parler aux profs quand il le faut et faire bouger les choses ensemble.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center gap-6"
        >
          <a
            href="#duo"
            className="signature-gradient halo inline-flex h-14 items-center rounded-full px-10 text-sm font-semibold tracking-tight text-primary-foreground transition-transform duration-300 hover:scale-[1.05] sm:h-16 sm:px-14 sm:text-base"
          >
            Revoir le programme
          </a>

          <p className="text-sm font-bold tracking-widest uppercase text-signature">
            Votez pour nous !
          </p>
        </motion.div>
      </div>
    </section>
  );
}
