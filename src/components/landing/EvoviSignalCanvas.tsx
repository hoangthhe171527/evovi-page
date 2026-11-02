import { useEffect, useRef, type MutableRefObject } from "react";

type HeroCanvasProps = {
  scrollProgressRef: MutableRefObject<number>;
};

const PALETTE = ["#f59422", "#2480ff", "#3cb34a"] as const;

type NodePoint = {
  wing: 0 | 1 | 2;
  baseAngle: number;
  orbitRadius: number;
  speed: number;
  phase: number;
  size: number;
  x: number;
  y: number;
};

export function HeroTriSpectrumCanvas({ scrollProgressRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let isVisible = true;

    const pointer = { x: 0.65, y: 0.42, tx: 0.65, ty: 0.42, active: false };

    const nodes: NodePoint[] = Array.from({ length: 45 }, (_, i) => {
      const wing = (i % 3) as 0 | 1 | 2;
      return {
        wing,
        baseAngle: (i / 15) * Math.PI * 2,
        orbitRadius: 26 + ((i * 19) % 108),
        speed: (0.18 + (i % 7) * 0.045) * (i % 2 === 0 ? 1 : -1),
        phase: i * 0.71,
        size: i % 5 === 0 ? 3.4 : 2.1,
        x: 0,
        y: 0,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const drawFrame = (timeMs: number) => {
      const t = timeMs * 0.001;
      const prog = Math.max(0, Math.min(1, scrollProgressRef.current));

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const hubXBase = isMobile ? width * 0.56 : width * 0.66;
      const hubYBase = isMobile ? height * 0.28 : height * 0.38;
      const targetStreamX = isMobile ? 24 : width * 0.42;
      const targetStreamY = height * 0.96;

      // Subtle architectural coordinate cross at 42% axis
      const axisX = isMobile ? 20 : Math.round(width * 0.42);
      ctx.strokeStyle = "rgba(166, 180, 200, 0.09)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.stroke();

      const triScale = Math.min(width, height) * (isMobile ? 0.22 : 0.21) * (1 - prog * 0.42);
      // Three wings matching Evovi logo geometry: top-left (Orange), bottom-left (Cobalt), right (Emerald)
      const wingOffsets = [
        { dx: -0.34, dy: -0.68 }, // Solar Orange
        { dx: -0.44, dy: 0.56 },  // Electric Cobalt
        { dx: 0.68, dy: 0.08 },   // Emerald
      ] as const;

      const wingCenters = wingOffsets.map((w, idx) => {
        const breathe = Math.sin(t * 0.8 + idx * 2.1) * 8 * (1 - prog);
        const cx = hubXBase + w.dx * triScale + (pointer.x - 0.5) * 26 * (1 - prog);
        const cy = hubYBase + w.dy * triScale + breathe + (pointer.y - 0.5) * 22 * (1 - prog);
        return {
          x: cx + (targetStreamX - cx) * Math.pow(prog, 1.35),
          y: cy + (targetStreamY - cy) * Math.pow(prog, 1.35),
        };
      });

      // Draw structural triangle conduit between the 3 Evovi wings
      ctx.lineWidth = 1.25;
      for (let i = 0; i < 3; i++) {
        const a = wingCenters[i];
        const b = wingCenters[(i + 1) % 3];
        ctx.strokeStyle = "rgba(244, 247, 251, 0.14)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Live signal packet gliding continuously along each edge
        const pulse = (t * 0.42 + i * 0.33) % 1;
        const px = a.x + (b.x - a.x) * pulse;
        const py = a.y + (b.y - a.y) * pulse;
        ctx.fillStyle = PALETTE[i];
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Position nodes around their wing and stream into the 42% conduit on scroll
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const wc = wingCenters[n.wing];
        const angle = n.baseAngle + t * n.speed;
        const tighten = 1 - prog * 0.72;
        let nx = wc.x + Math.cos(angle) * n.orbitRadius * tighten;
        let ny = wc.y + Math.sin(angle) * (n.orbitRadius * 0.68) * tighten;

        if (pointer.active) {
          const mx = pointer.x * width;
          const my = pointer.y * height;
          const dx = mx - nx;
          const dy = my - ny;
          const dist = Math.hypot(dx, dy);
          if (dist < 220 && dist > 1) {
            const pull = (1 - dist / 220) * 18 * (1 - prog);
            nx += (dx / dist) * pull;
            ny += (dy / dist) * pull;
          }
        }

        n.x = nx;
        n.y = ny;
      }

      // Connect nearby nodes within lattice threshold
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9200) {
            const alpha = (1 - d2 / 9200) * 0.22;
            ctx.strokeStyle =
              a.wing === b.wing
                ? a.wing === 0
                  ? `rgba(245, 148, 34, ${alpha})`
                  : a.wing === 1
                    ? `rgba(36, 128, 255, ${alpha})`
                    : `rgba(60, 179, 74, ${alpha})`
                : `rgba(244, 247, 251, ${alpha * 0.55})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes and wing core anchors
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillStyle = PALETTE[n.wing];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 3; i++) {
        const c = wingCenters[i];
        ctx.strokeStyle = PALETTE[i];
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 9, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#f4f7fb";
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vertical handoff signal beam feeding down into Act II along the 42% axis
      const beamTopY = wingCenters[1].y;
      const beamEndY = beamTopY + (height - beamTopY) * Math.min(1, 0.28 + prog * 0.95);
      ctx.strokeStyle = "rgba(36, 128, 255, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(axisX, Math.max(0, height * 0.62));
      ctx.lineTo(axisX, height);
      ctx.stroke();

      const dropPulseY = height * 0.62 + ((t * 110 + prog * 240) % Math.max(40, height * 0.38));
      ctx.fillStyle = "#f59422";
      ctx.beginPath();
      ctx.arc(axisX, dropPulseY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      void beamEndY;
    };

    const loop = (now: number) => {
      if (!isVisible) return;
      drawFrame(now);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    resize();
    drawFrame(1200);
    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nextVisible = entry.isIntersecting;
        if (nextVisible && !isVisible && !reducedMotion) {
          isVisible = true;
          rafId = window.requestAnimationFrame(loop);
        } else {
          isVisible = nextVisible;
        }
      },
      { threshold: 0.02 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [scrollProgressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function HorizonSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let rafId = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (ms: number) => {
      const t = ms * 0.0008;
      ctx.clearRect(0, 0, width, height);

      const waves = [
        { color: "rgba(245, 148, 34, 0.24)", amp: 16, freq: 0.0045, yOff: 0.35, phase: 0 },
        { color: "rgba(36, 128, 255, 0.28)", amp: 22, freq: 0.0036, yOff: 0.55, phase: 1.8 },
        { color: "rgba(60, 179, 74, 0.22)", amp: 14, freq: 0.0052, yOff: 0.74, phase: 3.4 },
      ];

      for (const w of waves) {
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const y =
            height * w.yOff +
            Math.sin(x * w.freq + t * 2.1 + w.phase) * w.amp +
            Math.cos(x * w.freq * 0.5 - t) * (w.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      if (!isVisible) return;
      render(now);
      if (!reducedMotion) rafId = window.requestAnimationFrame(loop);
    };

    resize();
    render(800);
    if (!reducedMotion) rafId = window.requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nextVisible = entry.isIntersecting;
        if (nextVisible && !isVisible && !reducedMotion) {
          isVisible = true;
          rafId = window.requestAnimationFrame(loop);
        } else {
          isVisible = nextVisible;
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full"
    />
  );
}
