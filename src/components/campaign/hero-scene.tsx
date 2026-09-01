import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useRef } from "react";
import camille from "@/assets/camille.jpg";
import leo from "@/assets/leo.jpg";
import { Starfield } from "./starfield";

/**
 * Ouverture cinématographique pilotée à 100 % par la molette.
 * Le scroll fait « avancer la caméra » : le titre s'ouvre, les deux
 * silhouettes émergent puis se révèlent, le duo se pose.
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Acte 1 — le titre d'ouverture traverse la caméra
  const titleScale = useTransform(p, [0, 0.28], [1, 2.6]);
  const titleOpacity = useTransform(p, [0, 0.16, 0.26], [1, 1, 0]);
  const titleBlur = useTransform(p, [0.1, 0.26], ["blur(0px)", "blur(22px)"]);

  // Acte 2 — les silhouettes montent depuis la profondeur
  const portraitY = useTransform(p, [0.2, 0.62], ["16%", "0%"]);
  const portraitScale = useTransform(p, [0.2, 0.62], [0.82, 1]);
  const portraitOpacity = useTransform(p, [0.2, 0.4], [0, 1]);
  const silhouette = useTransform(p, [0.3, 0.62], [1, 0]);
  const spreadLeft = useTransform(p, [0.24, 0.66], ["6%", "0%"]);
  const spreadRight = useTransform(p, [0.24, 0.66], ["-6%", "0%"]);

  // Acte 3 — le duo s'annonce
  const nameOpacity = useTransform(p, [0.58, 0.74], [0, 1]);
  const nameY = useTransform(p, [0.58, 0.78], [40, 0]);
  const ctaOpacity = useTransform(p, [0.78, 0.92], [0, 1]);

  // Profondeurs de décor
  const auroraY = useTransform(p, [0, 1], ["0%", "-24%"]);
  const auroraScale = useTransform(p, [0, 1], [1, 1.5]);
  const vignette = useTransform(p, [0, 0.6], [0.15, 0.6]);

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Décor : profondeur 1 */}
        <Starfield />

        {/* Décor : profondeur 2 — aurora */}
        <motion.div
          aria-hidden
          style={{ y: auroraY, scale: auroraScale }}
          className="will-animate pointer-events-none absolute inset-0"
        >
          <div className="stage-gradient absolute inset-0" />
          <div className="absolute left-1/2 top-[62%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]" />
          <div className="absolute left-[18%] top-[24%] h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[130px]" />
        </motion.div>

        {/* Acte 1 */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
          className="will-animate absolute px-6 text-center"
        >
          <p className="eyebrow mb-6">Classe 1B — Candidats délégués</p>
          <h1 className="text-headline text-[clamp(2.6rem,9vw,7.5rem)] font-semibold leading-[0.95]">
            Élection
            <br />
            des délégués
          </h1>
        </motion.div>

        {/* Acte 2 — les deux portraits */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="will-animate absolute top-[14vh] flex w-full max-w-3xl items-start justify-center gap-4 px-6 sm:gap-8"
        >
          <PortraitPlate
            src={leo}
            name="Léo"
            offset={spreadLeft}
            silhouette={silhouette}
          />
          <PortraitPlate src={camille} name="Camille" offset={spreadRight} silhouette={silhouette} priority />
        </motion.div>

        {/* Acte 3 */}
        <motion.div
          style={{ opacity: nameOpacity, y: nameY }}
          className="will-animate absolute bottom-[10vh] px-6 text-center"
        >
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-none">
            <span className="text-headline">Camille</span>
            <span className="text-signature"> + </span>
            <span className="text-headline">Léo</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Votre duo pour représenter la 1B.
          </p>
          <motion.div style={{ opacity: ctaOpacity }} className="mt-8">
            <a
              href="#programme"
              className="signature-gradient halo inline-flex h-13 items-center rounded-full px-8 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Découvrir notre programme
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,#09090B_100%)]"
        />

        <motion.p
          style={{ opacity: useTransform(p, [0, 0.08], [1, 0]) }}
          className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem]"
        >
          Faites défiler
        </motion.p>
      </div>
    </div>
  );
}

function PortraitPlate({
  src,
  name,
  offset,
  silhouette,
  priority,
}: {
  src: string;
  name: string;
  offset: MotionValue<string>;
  silhouette: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <motion.div
      style={{ x: offset }}
      className="will-animate relative aspect-[4/5] w-1/2 max-w-[16rem] overflow-hidden rounded-3xl border border-hairline"
    >
      <img
        src={src}
        alt={`Portrait de ${name}`}
        width={1024}
        height={1280}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
      {/* La silhouette se dissout pour révéler le visage */}
      <motion.div
        aria-hidden
        style={{ opacity: silhouette }}
        className="signature-gradient absolute inset-0 mix-blend-color"
      />
      <motion.div
        aria-hidden
        style={{ opacity: silhouette }}
        className="absolute inset-0 bg-background/55 backdrop-blur-xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/85 to-transparent" />
      <p className="absolute bottom-4 left-5 text-sm font-medium tracking-tight">{name}</p>
    </motion.div>
  );
}
