import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { burstConfetti, fireworks } from "@/lib/confetti";
import { Starfield } from "./starfield";

/** Final : la caméra avance, la scène s'ouvre, le vote se déclenche. */
export function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const inView = useInView(ctaRef, { margin: "-30% 0px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  const cameraScale = useTransform(p, [0, 1], [1, 1.9]);
  const glowOpacity = useTransform(p, [0, 0.7], [0.25, 0.85]);
  const contentScale = useTransform(p, [0, 0.6], [0.92, 1]);
  const contentOpacity = useTransform(p, [0.05, 0.35], [0, 1]);

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      fireworks();
    }
  }, [inView]);

  const vote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 120, 2);
    fireworks();
  };

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <Starfield density={0.00018} />

        <motion.div
          aria-hidden
          style={{ scale: cameraScale, opacity: glowOpacity }}
          className="will-animate pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 blur-[160px]" />
          <div className="absolute left-1/2 top-[70%] h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[170px]" />
        </motion.div>

        <motion.div
          ref={ctaRef}
          style={{ scale: contentScale, opacity: contentOpacity }}
          className="will-animate relative px-6 text-center"
        >
          <h2 className="text-headline text-[clamp(2.4rem,8vw,6.5rem)] font-semibold leading-[0.95]">
            Votez Camille &amp; Léo
          </h2>
          <p className="text-signature mt-4 text-[clamp(1.4rem,4vw,2.6rem)] font-semibold leading-none">
            Délégués 1B
          </p>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Ensemble, on fait bouger la 1B.
          </p>

          <button
            type="button"
            onClick={vote}
            className="signature-gradient halo group relative mt-12 inline-flex h-16 items-center justify-center overflow-hidden rounded-full px-10 text-base font-semibold tracking-tight text-primary-foreground transition-transform duration-300 hover:scale-[1.05] active:scale-[0.98] sm:h-18 sm:px-14 sm:text-lg"
          >
            <span
              aria-hidden
              className="absolute inset-0 scale-0 rounded-full bg-white/25 transition-transform duration-700 ease-out group-active:scale-150"
            />
            <span className="relative">JE VOTE CAMILLE &amp; LÉO</span>
          </button>

          <p className="mt-6 text-xs text-muted-foreground">
            Scrutin en classe · Bulletin secret · Un tour
          </p>
        </motion.div>
      </div>
    </div>
  );
}
