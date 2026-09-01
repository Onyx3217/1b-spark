import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { fireworks } from "@/lib/confetti";
import { Starfield } from "./starfield";

/** Final : la caméra avance, la scène s'ouvre — miroir de l'intro. */
export function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const inView = useInView(contentRef, { margin: "-20% 0px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  // Même logique cinématographique que l'intro : la caméra avance
  const cameraScale = useTransform(p, [0, 1], [1, 1.9]);
  const glowOpacity = useTransform(p, [0, 0.7], [0.2, 0.9]);

  // Le titre entre comme l'acte 1 de l'intro
  const titleScale = useTransform(p, [0, 0.35], [0.88, 1]);
  const titleOpacity = useTransform(p, [0.08, 0.38], [0, 1]);
  const titleBlur = useTransform(p, [0.08, 0.38], ["blur(18px)", "blur(0px)"]);

  // Le sous-titre suit
  const subOpacity = useTransform(p, [0.35, 0.6], [0, 1]);
  const subY = useTransform(p, [0.35, 0.65], [30, 0]);

  // Le CTA scroll-reveal final
  const ctaOpacity = useTransform(p, [0.62, 0.82], [0, 1]);
  const ctaY = useTransform(p, [0.62, 0.85], [24, 0]);

  // Aurora parallax
  const auroraY = useTransform(p, [0, 1], ["0%", "-20%"]);
  const auroraScale = useTransform(p, [0, 1], [1, 1.6]);

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      fireworks();
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <Starfield density={0.00022} />

        {/* Aurora — caméra qui avance */}
        <motion.div
          aria-hidden
          style={{ scale: cameraScale, opacity: glowOpacity, y: auroraY }}
          className="will-animate pointer-events-none absolute inset-0"
        >
          <motion.div style={{ scale: auroraScale }} className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[160px]" />
            <div className="absolute left-1/2 top-[68%] h-[42rem] w-[68rem] -translate-x-1/2 rounded-full bg-primary/35 blur-[170px]" />
            <div className="absolute left-[22%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[130px]" />
          </motion.div>
        </motion.div>

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_30%,#09090B_100%)]"
        />

        {/* Contenu */}
        <div ref={contentRef} className="relative px-6 text-center">
          {/* Acte 1 — le grand titre perce l'obscurité */}
          <motion.h2
            style={{ scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
            className="will-animate text-foreground text-[clamp(2.6rem,9vw,7rem)] font-semibold leading-[0.93]"
          >
            Camille<br />
            <span className="text-signature">&amp;</span> Léo
          </motion.h2>

          {/* Acte 2 — le rôle */}
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="will-animate text-signature mt-5 text-[clamp(1.2rem,3.5vw,2.2rem)] font-semibold leading-none"
          >
            Délégués 1B
          </motion.p>

          {/* Acte 3 — le mot de fin */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="will-animate mt-10 flex flex-col items-center gap-5"
          >
            <p className="max-w-md text-base text-muted-foreground sm:text-lg">
              Organisés, présents, à votre écoute — toute l'année.
            </p>

            <a
              href="#duo"
              className="signature-gradient halo inline-flex h-14 items-center rounded-full px-10 text-sm font-semibold tracking-tight text-primary-foreground transition-transform duration-300 hover:scale-[1.05] sm:h-16 sm:px-14 sm:text-base"
            >
              Revoir le duo
            </a>

            <p className="text-sm font-semibold tracking-widest uppercase text-signature">
              Votez pour nous !
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
