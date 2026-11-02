import { useEffect, useRef, type MutableRefObject } from "react";

type HeroCanvasProps = {
  scrollProgressRef: MutableRefObject<number>;
};

const CLUSTER_COLORS = ["#247eff", "#34c759", "#f5a623"] as const;
const CLUSTER_RGB = [
  "36, 126, 255",
  "52, 199, 89",
  "245, 166, 35",
] as const;

type ServiceNode = {
  cluster: 0 | 1 | 2;
  baseAngle: number;
  orbitRadius: number;
  tilt: number;
  speed: number;
  size: number;
  x: number;
  y: number;
  depth: number;
};

function evalQuad(
  ax: number,
  ay: number,
  cx: number,
  cy: number,
  bx: number,
  by: number,
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * ax + 2 * mt * t * cx + t * t * bx,
    y: mt * mt * ay + 2 * mt * t * cy + t * t * by,
  };
}

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

    const pointer = { x: 0.68, y: 0.4, tx: 0.68, ty: 0.4, active: false };

    // 39 service nodes representing the 39 repositories in evovi-vn
    const nodes: ServiceNode[] = Array.from({ length: 39 }, (_, i) => {
      const cluster = (i % 3) as 0 | 1 | 2;
      const ringIdx = Math.floor(i / 3);
      return {
        cluster,
        baseAngle: (ringIdx / 13) * Math.PI * 2 + cluster * 0.65,
        orbitRadius: 34 + (ringIdx % 4) * 28 + (i % 3) * 9,
        tilt: 0.56 + (ringIdx % 3) * 0.1,
        speed: (0.16 + (i % 5) * 0.035) * (i % 2 === 0 ? 1 : -1),
        size: i % 6 === 0 ? 3.2 : 2.1,
        x: 0,
        y: 0,
        depth: 0,
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

    const drawSoftHalo = (cx: number, cy: number, maxR: number, rgb: string, peakAlpha: number) => {
      const steps = 6;
      for (let s = steps; s >= 1; s--) {
        const r = (maxR * s) / steps;
        const a = (peakAlpha / steps) * (1.15 - s / (steps + 2));
        ctx.fillStyle = `rgba(${rgb}, ${a.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFrame = (timeMs: number) => {
      const t = timeMs * 0.001;
      const prog = Math.max(0, Math.min(1, scrollProgressRef.current));

      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;

      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const axisX = isMobile ? 20 : Math.round(width * 0.4166);
      const hubXBase = isMobile ? width * 0.58 : width * 0.69;
      const hubYBase = isMobile ? height * 0.28 : height * 0.39;
      const convergeEase = Math.pow(prog, 1.3);

      const coreX =
        hubXBase +
        (pointer.x - 0.5) * 24 * (1 - prog) +
        (axisX - hubXBase) * convergeEase;
      const coreY =
        hubYBase +
        (pointer.y - 0.5) * 18 * (1 - prog) +
        (height * 0.94 - hubYBase) * convergeEase;

      // 1. Subtle Enterprise Coordinate Grid & 42% Structural Spine
      const gridStep = isMobile ? 64 : 88;
      ctx.strokeStyle = "rgba(92, 164, 255, 0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = axisX; gx < width; gx += gridStep) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = gridStep; gy < height; gy += gridStep) {
        ctx.moveTo(axisX, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Primary 42% architectural axis line
      ctx.strokeStyle = "rgba(92, 164, 255, 0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.stroke();

      // 2. Volumetric Sapphire Halo behind the Enterprise Topology Hub
      drawSoftHalo(coreX, coreY, isMobile ? 180 : 290, "18, 98, 228", 0.14 * (1 - prog * 0.4));

      // Concentric orbital guide rings around the Spec-Driven Nucleus
      const ringRadii = isMobile ? [58, 108] : [84, 156, 224];
      for (let rIdx = 0; rIdx < ringRadii.length; rIdx++) {
        const rx = ringRadii[rIdx] * (1 - prog * 0.58);
        const ry = rx * 0.62;
        ctx.strokeStyle = `rgba(148, 184, 235, ${(0.09 - rIdx * 0.022).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(coreX, coreY, Math.max(4, rx), Math.max(4, ry), -0.18, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Three Enterprise Domain Clusters (Cloud Web, Field Mobile, AI Agents)
      const clusterScale = Math.min(width, height) * (isMobile ? 0.2 : 0.22) * (1 - prog * 0.52);
      const offsets = [
        { dx: -0.52, dy: 0.44 },  // Cobalt: Multi-tenant Web / ERP / LMS
        { dx: 0.72, dy: 0.08 },   // Emerald: Offline-First Field Mobile
        { dx: -0.26, dy: -0.68 }, // Amber: Spec-Driven AI Guardrails
      ] as const;

      const clusters = offsets.map((off, idx) => {
        const floatY = Math.sin(t * 0.75 + idx * 2.09) * 7 * (1 - prog);
        const cx = coreX + off.dx * clusterScale;
        const cy = coreY + off.dy * clusterScale + floatY;
        return { x: cx, y: cy };
      });

      // 4. Curved Bezier Conduits + Comet-Tail Telemetry Packets
      const links: Array<{
        ax: number;
        ay: number;
        cx: number;
        cy: number;
        bx: number;
        by: number;
        colorIdx: 0 | 1 | 2;
        phase: number;
      }> = [];

      for (let i = 0; i < 3; i++) {
        const a = clusters[i];
        const b = clusters[(i + 1) % 3];
        const midX = (a.x + b.x) * 0.5 + (coreX - (a.x + b.x) * 0.5) * 0.28;
        const midY = (a.y + b.y) * 0.5 - 18 * (1 - prog);
        links.push({
          ax: a.x,
          ay: a.y,
          cx: midX,
          cy: midY,
          bx: b.x,
          by: b.y,
          colorIdx: i as 0 | 1 | 2,
          phase: i * 0.33,
        });

        // Spoke from central Spec-Driven Core to each cluster
        links.push({
          ax: coreX,
          ay: coreY,
          cx: (coreX + a.x) * 0.5,
          cy: (coreY + a.y) * 0.5 - 12 * (1 - prog),
          bx: a.x,
          by: a.y,
          colorIdx: i as 0 | 1 | 2,
          phase: 0.5 + i * 0.27,
        });
      }

      for (const lnk of links) {
        ctx.strokeStyle = `rgba(${CLUSTER_RGB[lnk.colorIdx]}, 0.22)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(lnk.ax, lnk.ay);
        ctx.quadraticCurveTo(lnk.cx, lnk.cy, lnk.bx, lnk.by);
        ctx.stroke();

        // Comet-tail live telemetry packet gliding smoothly along Bezier curve
        const headT = (t * 0.34 + lnk.phase) % 1;
        for (let seg = 0; seg < 6; seg++) {
          const sampleT = Math.max(0, headT - seg * 0.022);
          const pt = evalQuad(lnk.ax, lnk.ay, lnk.cx, lnk.cy, lnk.bx, lnk.by, sampleT);
          const alpha = (1 - seg / 6) * 0.92;
          const radius = seg === 0 ? 3.1 : Math.max(1, 2.5 - seg * 0.32);
          ctx.fillStyle =
            seg === 0
              ? "#f5f8ff"
              : `rgba(${CLUSTER_RGB[lnk.colorIdx]}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. 39 Orbiting Repository Nodes with 3D Depth Projection
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const center = clusters[n.cluster];
        const ang = n.baseAngle + t * n.speed;
        const tighten = 1 - prog * 0.72;
        const z = Math.sin(ang);
        let nx = center.x + Math.cos(ang) * n.orbitRadius * tighten;
        let ny = center.y + z * (n.orbitRadius * n.tilt) * tighten;

        if (pointer.active) {
          const mx = pointer.x * width;
          const my = pointer.y * height;
          const dx = mx - nx;
          const dy = my - ny;
          const dist = Math.hypot(dx, dy);
          if (dist < 210 && dist > 1) {
            const pull = (1 - dist / 210) * 15 * (1 - prog);
            nx += (dx / dist) * pull;
            ny += (dy / dist) * pull;
          }
        }

        n.x = nx;
        n.y = ny;
        n.depth = z;
      }

      // Fine mesh connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 7800) {
            const alpha = (1 - d2 / 7800) * 0.19;
            ctx.strokeStyle =
              a.cluster === b.cluster
                ? `rgba(${CLUSTER_RGB[a.cluster]}, ${alpha.toFixed(3)})`
                : `rgba(180, 206, 244, ${(alpha * 0.55).toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Render nodes sorted/modulated by depth
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const depthScale = 0.78 + (n.depth + 1) * 0.24;
        const alpha = 0.45 + (n.depth + 1) * 0.26;
        ctx.fillStyle = `rgba(${CLUSTER_RGB[n.cluster]}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * depthScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render the 3 Cluster Hubs + Central Spec-Driven Core
      for (let i = 0; i < 3; i++) {
        const c = clusters[i];
        drawSoftHalo(c.x, c.y, 26, CLUSTER_RGB[i], 0.22);
        ctx.strokeStyle = CLUSTER_COLORS[i];
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 8.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#f5f8ff";
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central Nucleus
      drawSoftHalo(coreX, coreY, 34, "92, 164, 255", 0.28);
      ctx.strokeStyle = "#5ca4ff";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#f5f8ff";
      ctx.beginPath();
      ctx.arc(coreX, coreY, 4, 0, Math.PI * 2);
      ctx.fill();

      // 6. Vertical Handoff Signal Beam feeding down into Act II along 42% axis
      const spineStartY = Math.max(0, height * 0.58);
      ctx.strokeStyle = "rgba(92, 164, 255, 0.42)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(axisX, spineStartY);
      ctx.lineTo(axisX, height);
      ctx.stroke();

      const dropSpan = Math.max(40, height - spineStartY);
      const dropY = spineStartY + ((t * 95 + prog * 220) % dropSpan);
      drawSoftHalo(axisX, dropY, 14, "92, 164, 255", 0.32);
      ctx.fillStyle = "#f5a623";
      ctx.beginPath();
      ctx.arc(axisX, dropY, 3.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now: number) => {
      if (!isVisible) return;
      drawFrame(now);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    resize();
    drawFrame(1400);
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
      const t = ms * 0.00075;
      ctx.clearRect(0, 0, width, height);

      // Subtle architectural coordinate ticks along bottom edge
      ctx.strokeStyle = "rgba(92, 164, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 48; gx < width; gx += 96) {
        ctx.moveTo(gx, height - 18);
        ctx.lineTo(gx, height);
      }
      ctx.stroke();

      const waves = [
        { rgb: "36, 126, 255", alpha: 0.34, amp: 20, freq: 0.0036, yOff: 0.44, phase: 0 },
        { rgb: "52, 199, 89", alpha: 0.24, amp: 15, freq: 0.0046, yOff: 0.62, phase: 1.9 },
        { rgb: "245, 166, 35", alpha: 0.22, amp: 12, freq: 0.0054, yOff: 0.78, phase: 3.6 },
      ] as const;

      waves.forEach((w, idx) => {
        const yAt = (x: number) =>
          height * w.yOff +
          Math.sin(x * w.freq + t * 2.0 + w.phase) * w.amp +
          Math.cos(x * w.freq * 0.52 - t * 1.2) * (w.amp * 0.38);

        ctx.strokeStyle = `rgba(${w.rgb}, ${w.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y = yAt(x);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Gliding live signal beacon along each wave
        const beaconX = ((t * 140 + idx * (width * 0.33)) % Math.max(1, width));
        const beaconY = yAt(beaconX);
        ctx.fillStyle = `rgba(${w.rgb}, 0.24)`;
        ctx.beginPath();
        ctx.arc(beaconX, beaconY, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#f5f8ff";
        ctx.beginPath();
        ctx.arc(beaconX, beaconY, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = (now: number) => {
      if (!isVisible) return;
      render(now);
      if (!reducedMotion) rafId = window.requestAnimationFrame(loop);
    };

    resize();
    render(900);
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
      className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full"
    />
  );
}
