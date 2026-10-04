import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { advanceHanger, railOffset } from './hangerPhysics';
import { RAIL_PRODUCTS } from './brandData';
import HungGarment from './HungGarment';

export default function ClothingRail({ reduced }) {
  const products = RAIL_PRODUCTS;
  const count = products.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const stage = useRef(null);
  const pieces = useRef([]);
  const swings = useRef([]);
  const spacing = useRef(200);
  const gesture = useRef(null);
  const wheelAt = useRef(0);
  const pointer = useRef(null);
  const frame = useRef(0);
  const lastTime = useRef(0);
  const visible = useRef(true);
  const reducedRef = useRef(reduced);
  const bodies = useRef(products.map((product, index) => ({ x: railOffset(index, 0, count), target: railOffset(index, 0, count), velocity: 0, angle: 0, angularVelocity: 0, length: product.hanger === 'clip' ? 1.15 : .85 })));

  const paint = useCallback(() => {
    bodies.current.forEach((body, index) => {
      const element = pieces.current[index];
      if (!element) return;
      const distance = Math.min(3, Math.abs(body.x));
      element.style.setProperty('--offset', body.x.toFixed(5));
      element.style.setProperty('--distance', distance.toFixed(5));
      element.style.setProperty('--scale', String(1 - distance * .17));
      swings.current[index]?.setAttribute('transform', `rotate(${(body.angle * 180 / Math.PI).toFixed(4)} 160 30)`);
      element.style.opacity = Math.abs(body.x) > 2.35 ? '0' : String(Math.max(0, 1 - distance * .34));
      element.style.zIndex = String(Math.round(100 - Math.abs(body.x) * 10));
    });
  }, []);
  const wake = useCallback(() => {
    if (frame.current || reducedRef.current || !visible.current || document.hidden) return;
    lastTime.current = 0;
    const tick = time => {
      frame.current = 0;
      if (reducedRef.current || !visible.current || document.hidden) return;
      const seconds = lastTime.current ? Math.min((time - lastTime.current) / 1000, .032) : 1 / 60;
      lastTime.current = time;
      let moving = false;
      for (const body of bodies.current) if (advanceHanger(body, seconds)) moving = true;
      paint();
      if (moving) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [paint]);

  useLayoutEffect(() => {
    const element = stage.current;
    const measure = () => {
      const style = getComputedStyle(element);
      const width = parseFloat(style.getPropertyValue('--rail-width'));
      const step = parseFloat(style.getPropertyValue('--rail-step'));
      // A fixed SVG aspect ratio removes letterboxing. Every scale shares the
      // same hook/rack contact point at (160, 12), including during resize.
      const unit = Math.min(element.clientWidth * width / 320, (element.clientHeight - 45) / 460);
      spacing.current = unit * 320 * step;
      element.style.setProperty('--outfit-unit', String(unit));
      element.style.setProperty('--rail-spacing', `${spacing.current}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    reducedRef.current = reduced;
    bodies.current.forEach((body, index) => {
      const target = railOffset(index, active, count);
      // The wrap crosses outside the mask, never through the foreground.
      if (Math.abs(target - body.target) > count / 2 || reduced) {
        body.x = target; body.velocity = 0; body.angle = 0; body.angularVelocity = 0;
      }
      body.target = target;
    });
    if (reduced) { cancelAnimationFrame(frame.current); frame.current = 0; }
    paint(); wake();
  }, [active, count, reduced, paint, wake]);

  useEffect(() => {
    const element = stage.current;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (visible.current) wake();
      else { cancelAnimationFrame(frame.current); frame.current = 0; }
    });
    observer.observe(element);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame.current); frame.current = 0; } else wake(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); cancelAnimationFrame(frame.current); frame.current = 0; };
  }, [wake]);

  useEffect(() => {
    if (reduced || paused || engaged) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && visible.current) setActive(value => (value - 1 + count) % count);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [reduced, paused, engaged, count]);

  const step = direction => { setPaused(true); setActive(value => (value + direction + count) % count); };
  useEffect(() => {
    const wheel = event => {
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY) && !event.shiftKey) return;
      const delta = event.deltaX || event.deltaY;
      if (Math.abs(delta) < 8) return;
      event.preventDefault();
      if (performance.now() - wheelAt.current < 450) return;
      wheelAt.current = performance.now(); setPaused(true);
      setActive(value => (value + (delta > 0 ? 1 : -1) + count) % count);
    };
    const element = stage.current;
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, [count]);

  const nudge = event => {
    if (reduced || event.pointerType !== 'mouse') return;
    const previous = pointer.current;
    pointer.current = { x: event.clientX, time: performance.now() };
    if (!previous || pointer.current.time - previous.time > 150) return;
    const velocity = Math.max(-1, Math.min(1, (event.clientX - previous.x) / 65));
    bodies.current[active].angularVelocity += velocity * .25;
    wake();
  };
  const startSwipe = event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, time: performance.now(), velocity: 0, dragging: false, targets: bodies.current.map(body => body.target) };
    pointer.current = null;
  };
  const moveSwipe = event => {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) { nudge(event); return; }
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
      if (Math.abs(dx) < 8) return;
      drag.dragging = true;
      setPaused(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = 'true';
    }
    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(8, now - drag.time);
    drag.lastX = event.clientX; drag.time = now;
    if (reduced) return;
    const offset = Math.max(-1.15, Math.min(1.15, dx / spacing.current));
    bodies.current.forEach((body, index) => { body.target = drag.targets[index] + offset; });
    wake();
  };
  const endSwipe = (event, cancelled = false) => {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    gesture.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!drag.dragging) return;
    const dx = event.clientX - drag.x;
    const flick = performance.now() - drag.time < 120 && Math.abs(drag.velocity) > .45 && Math.abs(dx) > 12;
    if (!cancelled && (Math.abs(dx) > spacing.current * .18 || flick)) {
      step(dx < 0 ? 1 : -1);
    } else {
      bodies.current.forEach((body, index) => { body.target = railOffset(index, active, count); });
      wake();
    }
  };
  const product = products[active];
  return <div className="clothing-rail" onPointerEnter={() => setEngaged(true)} onPointerLeave={() => { setEngaged(false); pointer.current = null; }} onFocusCapture={() => setEngaged(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}>
    <div ref={stage} className="rail-stage" role="region" aria-roledescription="carousel" aria-label="NEP2UNE clothing designed by Kyle" tabIndex={0}
      onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={event => endSwipe(event)} onPointerCancel={event => endSwipe(event, true)} onLostPointerCapture={event => endSwipe(event, true)}
      onKeyDown={event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); } }}
      >
      <div className="rail-line" aria-hidden="true" />
      {products.map((item, index) => <div key={item.id} ref={element => { pieces.current[index] = element; }} className={`rail-piece rail-${item.hanger}`} aria-hidden={index !== active} data-product={item.id} style={{ '--offset': railOffset(index, active, count), '--distance': Math.min(3, Math.abs(railOffset(index, active, count))), '--swing': '0deg' }}>
        <HungGarment product={item} bodyRef={element => { swings.current[index] = element; }} />
      </div>)}
    </div>
    <div className="rail-controls"><button type="button" aria-label="Previous garment" onClick={() => step(-1)}><ChevronLeft size={18} /></button><div className="rail-caption" aria-live={paused || engaged || reduced ? 'polite' : 'off'} aria-atomic="true"><span>{product.catalogName}</span><small>{product.category} · {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</small></div><button type="button" aria-label="Next garment" onClick={() => step(1)}><ChevronRight size={18} /></button>{!reduced && <button type="button" className="rail-pause" aria-label={paused ? 'Play clothing animation' : 'Pause clothing animation'} onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}</div>
    <div className="rail-footer"><p className="rail-hint">Scroll sideways. Give it a little swing.</p><a href={`https://nep2une.shop/products/${product.id}`} target="_blank" rel="noreferrer">View this piece <ArrowUpRight size={12} /></a></div>
  </div>;
}
