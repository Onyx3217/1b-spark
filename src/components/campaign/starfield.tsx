import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number };

/**
 * Champ d'étoiles en canvas : la profondeur est pilotée par le scroll.
 * Rendu GPU-friendly, une seule boucle rAF, coupé si reduced-motion.
 */
export function Starfield({ density = 0.00012 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let scroll = window.scrollY;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.max(90, Math.floor(w * h * density)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + Math.random() * 0.75,
        r: 0.3 + Math.random() * 1.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = reduced ? 0 : scroll;
      for (const s of stars) {
        const y = (s.y - t * s.z * 0.35) % h;
        const yy = y < 0 ? y + h : y;
        ctx.globalAlpha = 0.18 + s.z * 0.55;
        ctx.fillStyle = s.z > 0.72 ? "#9db9ff" : "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, yy, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scroll = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
