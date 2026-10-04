import { useEffect, useRef } from 'react';

const LIFETIME = 440;
const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

// A temporary ribbon follows the native cursor. No replacement cursor or idle dot.
export default function CursorTrail() {
  const canvas = useRef(null);
  useEffect(() => {
    const surface = canvas.current;
    const context = surface.getContext('2d');
    if (!context) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let points = [];
    let frame = 0;
    let enabled = false;
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      context.clearRect(0, 0, innerWidth, innerHeight);
    };
    const resize = () => {
      clear();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface.width = Math.round(innerWidth * ratio);
      surface.height = Math.round(innerHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const preferences = () => {
      enabled = fine.matches && !reduced.matches;
      surface.hidden = !enabled;
      clear();
    };
    const paint = time => {
      frame = 0;
      points = points.filter(point => time - point.time < LIFETIME);
      context.clearRect(0, 0, innerWidth, innerHeight);
      if (points.length < 2) return;
      const first = points[0];
      const last = points[points.length - 1];
      // Pointer travel, rather than viewport position, determines the color flow.
      const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
      gradient.addColorStop(0, '#0066ff');
      gradient.addColorStop(.5, '#ffffff');
      gradient.addColorStop(1, '#b5ff24');
      context.strokeStyle = gradient;
      // Fill one tapered shape so joins never accumulate into glowing beads.
      const left = [], right = [];
      points.forEach((point, i) => {
        const before = points[Math.max(0, i - 1)];
        const after = points[Math.min(points.length - 1, i + 1)];
        const dx = after.x - before.x, dy = after.y - before.y;
        const length = Math.hypot(dx, dy) || 1;
        const width = 3.5 * Math.min(1, i / 5) * Math.max(0, 1 - (time - point.time) / LIFETIME);
        left.push({ x: point.x - dy / length * width, y: point.y + dx / length * width });
        right.push({ x: point.x + dy / length * width, y: point.y - dx / length * width });
      });
      const outline = [...left, ...right.reverse()];
      const start = midpoint(outline[outline.length - 1], outline[0]);
      context.beginPath();
      context.moveTo(start.x, start.y);
      outline.forEach((point, i) => {
        const end = midpoint(point, outline[(i + 1) % outline.length]);
        context.quadraticCurveTo(point.x, point.y, end.x, end.y);
      });
      context.closePath();
      context.fillStyle = gradient;
      context.globalAlpha = Math.pow(Math.max(0, 1 - (time - last.time) / LIFETIME), 1.5) * .85;
      context.shadowBlur = 5;
      context.shadowColor = '#6faeff50';
      context.fill();
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      frame = requestAnimationFrame(paint);
    };
    const move = event => {
      if (!enabled || event.pointerType !== 'mouse' || document.hidden) return;
      const time = performance.now();
      const last = points[points.length - 1];
      if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 1.5) return;
      if (last && time - last.time >= LIFETIME) points = [];
      points.push({ x: event.clientX, y: event.clientY, time });
      if (points.length > 96) points.shift();
      if (!frame) frame = requestAnimationFrame(paint);
    };
    resize();
    preferences();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('blur', clear);
    document.documentElement.addEventListener('pointerleave', clear);
    document.addEventListener('visibilitychange', clear);
    fine.addEventListener('change', preferences);
    reduced.addEventListener('change', preferences);
    return () => {
      clear();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', clear);
      document.documentElement.removeEventListener('pointerleave', clear);
      document.removeEventListener('visibilitychange', clear);
      fine.removeEventListener('change', preferences);
      reduced.removeEventListener('change', preferences);
    };
  }, []);
  return <canvas ref={canvas} className="cursor-trail" aria-hidden="true" />;
}
