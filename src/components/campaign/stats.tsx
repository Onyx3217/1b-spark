import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "./section";

const STATS = [
  { value: 100, suffix: "%", label: "Énergie", sub: "Sur toute l'année, pas juste la campagne." },
  { value: 24, suffix: "/7", label: "À votre écoute", sub: "En cours, en pause, en ligne." },
  { value: null, suffix: "∞", label: "Motivation", sub: "Renouvelable à chaque trimestre." },
];

export function Stats() {
  return (
    <Section id="chiffres">
      <div className="grid gap-10 border-y border-hairline py-16 sm:grid-cols-3 sm:gap-6">
        {STATS.map((s, i) => (
          <Counter key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}

function Counter({
  value,
  suffix,
  label,
  sub,
  delay,
}: {
  value: number | null;
  suffix: string;
  label: string;
  sub: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(value === null ? 0 : 0);

  useEffect(() => {
    if (!inView || value === null) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="text-signature text-6xl font-semibold tabular-nums sm:text-7xl">
        {value === null ? suffix : `${display}${suffix}`}
      </p>
      <p className="mt-4 text-lg font-medium">{label}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p>
    </motion.div>
  );
}
