type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
};

const COLORS = ["#2F80FF", "#6C4DFF", "#8FB6FF", "#FFFFFF", "#B79DFF"];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let pieces: Piece[] = [];
let raf = 0;

function ensureCanvas() {
  if (typeof document === "undefined") return null;
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  return canvas;
}

function sizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function loop() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter((p) => p.life > 0 && p.y < window.innerHeight + 60);

  for (const p of pieces) {
    p.vy += 0.16;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life / 40);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }

  if (pieces.length > 0) {
    raf = requestAnimationFrame(loop);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    raf = 0;
  }
}

/** Éclat de confettis depuis un point de l'écran (coordonnées viewport). */
export function burstConfetti(x: number, y: number, count = 70, spread = 1) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!ensureCanvas()) return;
  sizeCanvas();

  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * spread;
    const speed = 5 + Math.random() * 11 * spread;
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      size: 5 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 110 + Math.random() * 70,
    });
  }
  if (pieces.length > 900) pieces = pieces.slice(-900);
  if (!raf) raf = requestAnimationFrame(loop);
}

/** Salve façon feu d'artifice sur toute la largeur. */
export function fireworks() {
  if (typeof window === "undefined") return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  [0.2, 0.5, 0.8].forEach((fx, i) => {
    window.setTimeout(() => burstConfetti(w * fx, h * (0.35 + i * 0.06), 90, 2), i * 220);
  });
}
