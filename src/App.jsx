import "./fonts.css";
import Home from "./Home.jsx";
import CaseStudy from "./CaseStudy.jsx";
import Creations from "./Creations.jsx";
import GlassDock from "./GlassDock.jsx";
import CursorTrail from "./CursorTrail.jsx";
import "./playground.css";
import { CASE_STUDIES, CASE_ORDER } from "./caseStudies.js";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, Menu, X, Undo2, Redo2,
  Trash2, Eraser, PenLine, Sticker as StickerIcon, Palette, ChevronLeft,
} from "lucide-react";

/* =====================================================================
   PORTFOLIO: Kyle Potente
   Single-file prototype. In the real repo, split into:
   components/  data/  views/  hooks/  utils/
   The section markers below mirror that structure.
   Motion: written as a tiny CSS/React layer (`Reveal`, `stage` state).
   In production swap these for Framer Motion `motion.*` + `AnimatePresence`.
   ===================================================================== */

/* ---------------------------------------------------------------------
   data/site.js
   --------------------------------------------------------------------- */
const SITE = {
  name: "Kyle Potente",
  mark: "K.",
  tagline: "Fear of living an ordinary life.",
  email: "kylep111604@gmail.com",
  linkedin: "https://www.linkedin.com/in/kyle-potente-10159a330/",
  github: "https://github.com/kylep16",
  resumeUrl: "/resume.pdf",
  year: 2026,
};



/* ---------------------------------------------------------------------
   data/caseStudies.js. Never invent metrics.
   --------------------------------------------------------------------- */
/* ---------------------------------------------------------------------
   data/changelog.js: newest first. Add one entry each Friday.
   date: ISO. tags: which projects the week touched. note: one line, plain.
   --------------------------------------------------------------------- */
const CHANGELOG = [
  { date: "2026-10-04", tags: ["Site", "NEP2UNE"], note: "Fitted steel shoulder wires inside the shirt and jacket collars and downsized the pants clips. Restored the native cursor with a fading electric-blue, white, and lime-green motion trail, disabled for touch and reduced-motion preferences." },
  { date: "2026-10-04", tags: ["Site", "NEP2UNE"], note: "Shortened the steel hanger hooks and lifted shirts, jackets, and pants closer to the rail. Re-aligned the shoulder wires, neckline layers, and waistband clips with the raised garments." },
  { date: "2026-10-04", tags: ["Site", "NEP2UNE"], note: "Added the official NEP2UNE logo to a dedicated clothing-archive shortcut and made Create open the shirt builder. Restyled the studio, framing moment, and visitor museum with the portfolio’s paper palette, Helvetica controls, rounded panels, and consistent exhibit frames. Kept drawing, stickers, undo/redo, and browser-local saving." },
  { date: "2026-10-04", tags: ["Site", "NEP2UNE"], note: "Switched shirt and jacket hangers to polished steel, preserving each garment’s fitted neckline, foreground layering, and pendulum swing." },
  { date: "2026-10-04", tags: ["Site", "PXI", "NEP2UNE", "Sweat2Swim"], note: "Fitted wooden shoulder hangers and front-facing waistband clips to each carousel garment. Connected the hero copy to product, UI/UX, and fashion design, set the clothing showcase heading in Helvetica, added a sticky case-study side index, and improved mobile dock contrast and touch targets." },
  { date: "2026-10-03", tags: ["Site", "NEP2UNE"], note: "UX refinement: bold Helvetica on the NEP2UNE hero, liquid-glass navigation and dock, and eight accurately named catalog garments on the homepage hanger rail. Added spring-driven travel, pendulum swing, pointer nudges, product links, and reduced-motion support." },
  { date: "2026-10-03", tags: ["Site", "PXI", "NEP2UNE", "Sweat2Swim"], note: "Added a NEP2UNE creations archive with eight current garments, lookbook chapters, process photography, and a downloadable photo template. Switched body text to Helvetica and rebuilt all three case studies with short editorial sections and uniformly sized image panels. Refocused PXI on the camera redesign and reserved media slots for the new disc walkthrough." },
  { date: "2026-10-03", tags: ["Site", "PXI", "NEP2UNE"], note: "Homepage overhaul: left-aligned introduction, horizontal hanger carousel, glass dock, stacked project-card reveal, and a custom block-font clothing showcase. Shortened the recruiter read while keeping the detailed case studies and shirt creator available." },
  { date: "2026-09-09", tags: ["PXI", "NEP2UNE", "Sweat2Swim"], note: "Real work on screen: 21 PXI screens from the 52-screen baseline, NEP2UNE tech packs, campaign photography and studio turn videos, and the live Sweat2Swim storefront." },
  { date: "2026-09-08", tags: ["PXI", "Sweat2Swim", "NEP2UNE"], note: "Rewrote all three case studies around shipped work: PXI's ten product systems, the Sweat2Swim storefront, NEP2UNE's founder story." },
  { date: "2026-09-03", tags: ["Site"], note: "Hero character rebuilt as a paper-doll mannequin wearing real NEP2UNE garments. Visitor gallery became a finite exhibition." },
  { date: "2026-08-29", tags: ["Site"], note: "First build: interactive hero, case study templates, shirt studio and visitor gallery." },
];
const LAST_UPDATED = CHANGELOG[0].date;
const fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });



/* ---------------------------------------------------------------------
   data/studio.js: shirt colors + stickers
   --------------------------------------------------------------------- */
const SHIRT_COLORS = ["#F4F2EC", "#1B1B1B", "#B7B2A4", "#2534E8", "#C8563C", "#D9C3A5", "#3F5E4A", "#E8D8E4"];
const COLOR_NAMES = { "#F4F2EC": "Cream", "#1B1B1B": "Black", "#B7B2A4": "Stone", "#2534E8": "Cobalt", "#C8563C": "Rust", "#D9C3A5": "Sand", "#3F5E4A": "Forest", "#E8D8E4": "Lilac", "#111111": "Ink", "#E5B93B": "Gold" };
const PEN_COLORS = ["#111111", "#F4F2EC", "#2534E8", "#C8563C", "#E5B93B", "#3F5E4A"];

const STICKERS = {
  cursor: { label: "Cursor", draw: () => <path d="M8 4 L8 30 L14 24 L19 34 L24 32 L19 22 L27 22 Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round" /> },
  heart: { label: "Pixel heart", draw: () => <g fill="#C8563C">{[[10,8],[14,8],[22,8],[26,8],[6,12],[30,12],[6,16],[30,16],[10,20],[26,20],[14,24],[22,24],[18,28]].map(([x,y],i)=><rect key={i} x={x} y={y} width="4" height="4"/>)}<rect x="10" y="12" width="16" height="8"/><rect x="14" y="20" width="8" height="4"/></g> },
  smiley: { label: "Smiley", draw: () => <g><circle cx="20" cy="20" r="14" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.5"/><circle cx="15" cy="17" r="1.6" fill="var(--ink)"/><circle cx="25" cy="17" r="1.6" fill="var(--ink)"/><path d="M13 24 Q20 30 27 24" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round"/></g> },
  star: { label: "Star", draw: () => <path d="M20 4 L24 15 L36 15 L26 22 L30 34 L20 27 L10 34 L14 22 L4 15 L16 15 Z" fill="var(--ink)"/> },
  folder: { label: "Folder", draw: () => <g><path d="M5 11 h10 l3 3 h17 v18 h-30 z" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.5"/><path d="M5 17 h30" stroke="var(--ink)" strokeWidth="1.5"/></g> },
  wire: { label: "Wireframe", draw: () => <g stroke="var(--ink)" strokeWidth="1.5" fill="none"><rect x="6" y="6" width="28" height="28"/><rect x="10" y="10" width="20" height="6"/><rect x="10" y="20" width="8" height="10"/><rect x="22" y="20" width="8" height="10"/></g> },
  computer: { label: "Computer", draw: () => <g stroke="var(--ink)" strokeWidth="1.5"><rect x="6" y="7" width="28" height="19" rx="1" fill="#B7B2A4"/><rect x="9" y="10" width="22" height="13" fill="#2534E8" stroke="none"/><rect x="14" y="28" width="12" height="3" fill="var(--ink)"/><path d="M10 33 h20" /></g> },
  flower: { label: "Flower", draw: () => <g>{[0,72,144,216,288].map(a=><ellipse key={a} cx="20" cy="12" rx="4.5" ry="8" fill="#E8D8E4" stroke="var(--ink)" strokeWidth="1.2" transform={`rotate(${a} 20 20)`}/>)}<circle cx="20" cy="20" r="4" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.2"/></g> },
  flame: { label: "Flame", draw: () => <g><path d="M20 4 C24 12 30 14 30 23 A10 10 0 0 1 10 23 C10 17 15 15 16 10 C17 13 19 14 20 12 Z" fill="#C8563C"/><path d="M20 18 C22 22 25 23 25 27 A5 5 0 0 1 15 27 C15 23 19 22 20 18 Z" fill="#E5B93B"/></g> },
  e404: { label: "404", draw: () => <text x="20" y="26" textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize="19" fontStyle="italic" fill="var(--ink)">404</text> },
  ship: { label: "ship it", draw: () => <g><rect x="3" y="12" width="34" height="16" rx="8" fill="var(--ink)"/><text x="20" y="24" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="700" fill="var(--paper)">ship it</text></g> },
  globe: { label: "Globe", draw: () => <g stroke="var(--ink)" strokeWidth="1.4" fill="none"><circle cx="20" cy="20" r="14" fill="#DDE3FF"/><ellipse cx="20" cy="20" rx="6" ry="14"/><path d="M6 20 h28 M9 12 h22 M9 28 h22"/></g> },
  pointer: { label: "Hand", draw: () => <path d="M17 8 v14 l-4 -4 c-2 -2 -5 0 -3 3 l7 9 h11 c2 0 4 -2 4 -4 v-8 c0 -2 -3 -2 -3 0 v-2 c0 -2 -3 -2 -3 0 v-2 c0 -2 -3 -2 -3 0 v-6 c0 -2 -3 -2 -3 0 z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round"/> },
};

/* ---------------------------------------------------------------------
   utils/storage.js: swappable persistence adapter
   Studio + gallery only talk to `storage.list()` / `storage.insert()`.
   Entry shape: { id, alias, color, drawing (dataURL), stickers[], createdAt, display }
   No email, no IP, no identifiers. For site analytics use a privacy-first
   tool (Plausible / Fathom) separately from this data.
   --------------------------------------------------------------------- */
const memoryAdapter = (() => {
  let items = seedGallery();
  return {
    async list() { return items.filter(e => e.display); },
    async insert(entry) { items = [entry, ...items]; return entry; },
    async clear() { items = []; },
  };
})();

/* localStorage adapter: active. */
const localAdapter = {
  key: "kyle.gallery.v1",
  async list() {
    try {
      const mine = (JSON.parse(localStorage.getItem(this.key) || "[]")).filter(e => e.display);
      return mine.length ? mine : seedGallery(); // samples by Kyle until this browser has saved shirts
    } catch { return seedGallery(); }
  },
  async insert(entry) { const all = JSON.parse(localStorage.getItem(this.key) || "[]"); localStorage.setItem(this.key, JSON.stringify([entry, ...all])); return entry; },
  async clear() { localStorage.removeItem(this.key); },
};

/* Supabase adapter: table `shirts` (id uuid, alias text null, color text,
   drawing text, stickers jsonb, display bool, created_at timestamptz):
const supabaseAdapter = {
  async list() { const { data } = await supabase.from("shirts").select("*").eq("display", true).order("created_at", { ascending: false }).limit(60); return data ?? []; },
  async insert(entry) { const { data } = await supabase.from("shirts").insert(entry).select().single(); return data; },
};
*/
const storage = localAdapter;

function seedGallery() {
  const seed = (alias, color, stickers, daysAgo) => ({
    id: "seed-" + Math.random().toString(36).slice(2), alias, color, drawing: null,
    stickers, display: true, createdAt: Date.now() - daysAgo * 864e5,
  });
  return [
    seed("Kyle · sample", "#2534E8", [{ id: 1, kind: "star", x: 0.5, y: 0.42, s: 2.6, r: -8 }], 2),
    seed("Kyle · sample", "#F4F2EC", [{ id: 1, kind: "e404", x: 0.5, y: 0.35, s: 2.4, r: 0 }, { id: 2, kind: "cursor", x: 0.7, y: 0.65, s: 1.4, r: 20 }], 5),
    seed("Kyle · sample", "#C8563C", [{ id: 1, kind: "smiley", x: 0.42, y: 0.5, s: 2.2, r: 0 }, { id: 2, kind: "flame", x: 0.68, y: 0.3, s: 1.3, r: 15 }], 9),
    seed("Kyle · sample", "#1B1B1B", [{ id: 1, kind: "ship", x: 0.5, y: 0.5, s: 2.8, r: -4 }], 14),
    seed("Kyle · sample", "#3F5E4A", [{ id: 1, kind: "flower", x: 0.34, y: 0.4, s: 1.8, r: 0 }, { id: 2, kind: "flower", x: 0.66, y: 0.6, s: 1.4, r: 30 }], 20),
  ];
}

/* ---------------------------------------------------------------------
   hooks/
   --------------------------------------------------------------------- */
function useReducedMotion() {
  const [r, setR] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = e => setR(e.matches); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}
function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia("(max-width: 767px), (pointer: coarse)").matches);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const f = e => setM(e.matches); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}
function useInView(threshold = 0.15) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ---------------------------------------------------------------------
   components/motion: Reveal (scroll), Magnetic (buttons), Cursor
   --------------------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, v] = useInView(); const rm = useReducedMotion();
  return (
    <Tag ref={ref} className={className} style={{
      opacity: v || rm ? 1 : 0, transform: v || rm ? "none" : "translateY(14px)",
      transition: rm ? "none" : `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
    }}>{children}</Tag>
  );
}
function Magnetic({ children, strength = 0.18, className = "" }) {
  const ref = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  const move = e => { if (rm || mob) return; const r = ref.current.getBoundingClientRect(); const x = (e.clientX - r.left - r.width / 2) * strength; const y = (e.clientY - r.top - r.height / 2) * strength; ref.current.style.transform = `translate(${x}px,${y}px)`; };
  const leave = () => { ref.current.style.transform = ""; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={"magnetic " + className} style={{ transition: "transform .35s cubic-bezier(.2,.7,.2,1)" }}>{children}</div>;
}
/* ---------------------------------------------------------------------
   components/ui: Button, Section heading, placeholder
   --------------------------------------------------------------------- */
function Button({ children, onClick, href, variant = "primary", icon: Icon, download, className = "", ariaLabel }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = <>{children}{Icon && <Icon size={15} strokeWidth={1.75} aria-hidden />}</>;
  return (
    <Magnetic>
      {href ? <a href={href} download={download} className={cls} aria-label={ariaLabel} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
            : <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>{inner}</button>}
    </Magnetic>
  );
}
function Placeholder({ label, ratio = "4/3", className = "", tone = 0 }) {
  const tones = ["#ECEAE3", "#E4E2DA", "#DCDAD2"];
  return (
    <div className={"placeholder " + className} style={{ aspectRatio: ratio, background: tones[tone % 3] }} role="img" aria-label={`Placeholder for ${label}`}>
      <span>{label}</span>
    </div>
  );
}

function ModalDialog({ children, label, labelledBy, onClose }) {
  const element = useRef(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => [...element.current.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]')];
    (element.current.querySelector('[autofocus]') || focusable()[0] || element.current).focus();
    const key = event => {
      if (event.key === "Escape") { event.preventDefault(); close.current(); }
      if (event.key === "Tab") {
        const list = focusable(); const first = list[0]; const last = list.at(-1);
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === element.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', key); previous?.focus({ preventScroll: true }); };
  }, []);
  return <div ref={element} className="modal-bg" role="dialog" aria-modal="true" aria-label={label} aria-labelledby={labelledBy} tabIndex={-1} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>{children}</div>;
}

/* ---------------------------------------------------------------------
   components/Navigation
   --------------------------------------------------------------------- */
function Navigation({ route, go, scrollTo }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const links = [["Work", "work"], ["NEP2UNE", "creations"], ["Create", "studio"], ["About", "about"]];
  const nav = id => { setOpen(false); if (["creations", "studio"].includes(id)) { go({ name: id }); return; } if (route.name !== "home") { go({ name: "home", anchor: id }); } else scrollTo(id); };
  return (
    <header className={"nav " + (scrolled ? "nav-scrolled" : "")}>
      <button className="mark" onClick={() => { setOpen(false); go({ name: "home" }); }} aria-label="Home">{route.name === "home" ? SITE.name : SITE.mark}</button>
      <nav className="nav-center" aria-label="Primary">{links.map(([l, id]) => <button key={id} onClick={() => nav(id)}>{l}</button>)}</nav>
      <div className="nav-right">
        {SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}{SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{SITE.github && <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>}
        <button onClick={() => nav("contact")}>Contact</button>
      </div>
      <button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}</button>
      {open && (
        <div className="nav-sheet" role="dialog" aria-label="Menu">
          {links.map(([l, id]) => <button key={id} onClick={() => nav(id)}>{l}</button>)}
          <div className="nav-sheet-divider" />
          {SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}{SITE.linkedin && <a href={SITE.linkedin}>LinkedIn</a>}<button onClick={() => nav("contact")}>Contact</button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------
   components/Shirt: shared shirt geometry + artwork renderer
   Print area in viewBox(0 0 400 460): x118 y140 w164 h210
   --------------------------------------------------------------------- */
const PRINT = { x: 118, y: 140, w: 164, h: 210 };
const CANVAS_W = 328, CANVAS_H = 420; // 2x print area
function ShirtPath({ color }) {
  return (<>
    <path d="M142 40 C150 30 250 30 258 40 L330 66 L352 150 L296 170 L296 424 C250 436 150 436 104 424 L104 170 L48 150 L70 66 Z" fill={color} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
    <path d="M160 46 C170 68 230 68 240 46" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
    <path d="M104 172 L296 172" stroke="rgba(0,0,0,.06)" strokeWidth="1" />
  </>);
}
function StickerGlyph({ kind }) { return <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden>{STICKERS[kind].draw()}</svg>; }
function ShirtArtwork({ entry, showPrintArea = false }) {
  const light = ["#1B1B1B", "#2534E8", "#3F5E4A", "#C8563C"].includes(entry.color) ? "#F4F2EC" : "#111";
  return (
    <svg viewBox="0 0 400 460" className="shirt-svg" role="img" aria-label={`Shirt by ${entry.alias || "anonymous visitor"}`}>
      <defs><clipPath id={"clip-" + entry.id}><rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} /></clipPath></defs>
      <ShirtPath color={entry.color} />
      {showPrintArea && <rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} fill="none" stroke={light} strokeOpacity=".25" strokeDasharray="4 4" />}
      <g clipPath={`url(#clip-${entry.id})`}>
        {entry.drawing && <image href={entry.drawing} x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} />}
        {(entry.stickers || []).map(s => {
          const cx = PRINT.x + s.x * PRINT.w, cy = PRINT.y + s.y * PRINT.h; const size = 20 * s.s;
          return <g key={s.id} transform={`translate(${cx} ${cy}) rotate(${s.r}) scale(${size / 40}) translate(-20 -20)`}>{STICKERS[s.kind].draw()}</g>;
        })}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------
   views/Studio: T-shirt designer (canvas drawing + sticker layer)
   --------------------------------------------------------------------- */
function Studio({ go, onSaved }) {
  const [color, setColor] = useState(SHIRT_COLORS[0]);
  const [tool, setTool] = useState("pen"); const [pen, setPen] = useState(6); const [penColor, setPenColor] = useState(PEN_COLORS[0]);
  const [stickers, setStickers] = useState([]); const [sel, setSel] = useState(null);
  const [panel, setPanel] = useState("draw"); // mobile bottom panel
  const [hist, setHist] = useState([{ drawing: null, stickers: [], color: SHIRT_COLORS[0] }]); const [hi, setHi] = useState(0);
  const [phase, setPhase] = useState("edit"); // edit | tag | frame
  const [alias, setAlias] = useState(""); const [display, setDisplay] = useState(true);
  const [entry, setEntry] = useState(null);
  const canvas = useRef(null); const stage = useRef(null); const printRef = useRef(null); const drawing = useRef(false); const idc = useRef(1);
  const mob = useIsMobile();

  // canvas init
  useEffect(() => { const c = canvas.current; if (!c) return; const ctx = c.getContext("2d"); ctx.lineCap = "round"; ctx.lineJoin = "round"; }, [phase]);

  const snapshot = useCallback((stk = stickers, col = color) => {
    const drawingUrl = canvas.current?.toDataURL() || null;
    setHist(h => { const n = h.slice(0, hi + 1); n.push({ drawing: drawingUrl, stickers: stk, color: col }); return n.slice(-40); });
    setHi(h => Math.min(h + 1, 39));
  }, [stickers, color, hi]);

  const restore = useCallback(s => {
    setStickers(s.stickers); setColor(s.color);
    const c = canvas.current; const ctx = c.getContext("2d"); ctx.clearRect(0, 0, c.width, c.height);
    if (s.drawing) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0); img.src = s.drawing; }
  }, []);
  const undo = () => { if (hi === 0) return; restore(hist[hi - 1]); setHi(hi - 1); };
  const redo = () => { if (hi >= hist.length - 1) return; restore(hist[hi + 1]); setHi(hi + 1); };
  const clear = () => { const c = canvas.current; c.getContext("2d").clearRect(0, 0, c.width, c.height); setStickers([]); setSel(null); setTimeout(() => snapshot([], color), 0); };

  // drawing
  const pos = e => { const r = canvas.current.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * CANVAS_W, y: (e.clientY - r.top) / r.height * CANVAS_H }; };
  const down = e => {
    if (tool === "sticker") return;
    e.preventDefault(); drawing.current = true; setSel(null);
    const ctx = canvas.current.getContext("2d"); const p = pos(e);
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = penColor; ctx.lineWidth = pen * (tool === "eraser" ? 3 : 1) * 2;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y + .1); ctx.stroke();
    canvas.current.setPointerCapture(e.pointerId);
  };
  const move = e => { if (!drawing.current) return; const ctx = canvas.current.getContext("2d"); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
  const up = () => { if (!drawing.current) return; drawing.current = false; snapshot(); };

  // stickers
  const addSticker = kind => { const s = { id: idc.current++, kind, x: .5, y: .5, s: 2, r: 0 }; const n = [...stickers, s]; setStickers(n); setSel(s.id); setTool("sticker"); snapshot(n); };
  const updateSticker = (id, patch) => setStickers(st => st.map(s => s.id === id ? { ...s, ...patch } : s));
  const deleteSticker = id => { const n = stickers.filter(s => s.id !== id); setStickers(n); setSel(null); snapshot(n); };
  const dragSticker = (e, s) => {
    e.stopPropagation(); e.preventDefault(); setSel(s.id); setTool("sticker");
    const r = printRef.current.getBoundingClientRect(); const ox = e.clientX - (r.left + s.x * r.width), oy = e.clientY - (r.top + s.y * r.height);
    const mv = ev => updateSticker(s.id, { x: clamp((ev.clientX - ox - r.left) / r.width, .05, .95), y: clamp((ev.clientY - oy - r.top) / r.height, .05, .95) });
    const upH = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", upH); setStickers(cur => { snapshot(cur); return cur; }); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", upH);
  };
  const handleSticker = (e, s) => { // rotate + scale handle
    e.stopPropagation(); e.preventDefault();
    const r = printRef.current.getBoundingClientRect(); const cx = r.left + s.x * r.width, cy = r.top + s.y * r.height;
    const base = r.width / PRINT.w; // px per viewBox unit
    const mv = ev => { const dx = ev.clientX - cx, dy = ev.clientY - cy; const d = Math.hypot(dx, dy); updateSticker(s.id, { s: clamp(d / (base * 14), .8, 5), r: Math.atan2(dy, dx) * 180 / Math.PI - 45 }); };
    const upH = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", upH); setStickers(cur => { snapshot(cur); return cur; }); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", upH);
  };
  useEffect(() => { const k = e => { if ((e.key === "Backspace" || e.key === "Delete") && sel != null && document.activeElement?.tagName !== "INPUT") deleteSticker(sel); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); });

  const changeColor = c => { setColor(c); snapshot(stickers, c); };
  const hasContent = stickers.length > 0 || hi > 0;

  const finish = async () => {
    const e = { id: "v-" + Date.now(), alias: alias.trim() || null, color, drawing: canvas.current.toDataURL("image/png"), stickers, display, createdAt: Date.now() };
    /* SUPABASE: this is the single insert point → storage.insert(e) */
    await storage.insert(e); setEntry(e); setPhase("frame"); onSaved?.();
  };

  if (phase === "frame" && entry) return <FrameSequence entry={entry} go={go} />;

  const printStyle = { left: PRINT.x / 4 + "%", top: PRINT.y / 4.6 + "%", width: PRINT.w / 4 + "%", height: PRINT.h / 4.6 + "%" };
  const isDark = ["#1B1B1B", "#2534E8", "#3F5E4A", "#C8563C"].includes(color);

  return (
    <main id="main" className="studio">
      <div className="studio-top">
        <button className="back" onClick={() => go({ name: "home", anchor: "clothes" })}><ChevronLeft size={14} /> Back</button>
        <a className="home-pill" href="#/gallery">Visit the museum <ArrowRight size={14} /></a>
      </div>
      <header className="play-hero studio-hero"><div><p className="home-eyebrow">THE SHIRT STUDIO / A ROOM TO PLAY</p><h1>Make it <em>your own.</em></h1><p>A blank tee. A few tools. Your point of view.</p></div>
        <div className="studio-hist">
          <button onClick={undo} disabled={hi === 0} aria-label="Undo"><Undo2 size={16} /></button>
          <button onClick={redo} disabled={hi >= hist.length - 1} aria-label="Redo"><Redo2 size={16} /></button>
          <button onClick={clear} aria-label="Clear shirt"><Trash2 size={16} /></button>
        </div>
      </header>

      <div className="studio-body">
        {/* tools */}
        <aside className={"tools " + (mob ? "tools-mobile" : "")} aria-label="Tools">
          <div className="toolkit-title"><span>Your toolkit</span><small>Start anywhere.</small></div>
          {mob && <div className="seg seg-tabs">{[["color", Palette, "Color"], ["draw", PenLine, "Draw"], ["sticker", StickerIcon, "Stickers"]].map(([k, I, l]) => <button key={k} className={panel === k ? "on" : ""} onClick={() => { setPanel(k); if (k === "draw") setTool("pen"); if (k === "sticker") setTool("sticker"); }}><I size={14} /> {l}</button>)}</div>}
          {(!mob || panel === "color") && <div className="tool-group"><h2><span>01</span> The canvas <small>{COLOR_NAMES[color]}</small></h2><div className="swatches">{SHIRT_COLORS.map(c => <button key={c} className={"sw " + (color === c ? "on" : "")} style={{ background: c }} onClick={() => changeColor(c)} aria-label={`Shirt color: ${COLOR_NAMES[c] || c}`} aria-pressed={color === c} />)}</div></div>}
          {(!mob || panel === "draw") && <div className="tool-group"><h2><span>02</span> Make a mark</h2>
            <div className="seg"><button className={tool === "pen" ? "on" : ""} onClick={() => setTool("pen")} aria-pressed={tool === "pen"}><PenLine size={14} /> Pen</button><button className={tool === "eraser" ? "on" : ""} onClick={() => setTool("eraser")} aria-pressed={tool === "eraser"}><Eraser size={14} /> Eraser</button></div>
            <label className="range">Size <input type="range" min="2" max="14" value={pen} onChange={e => setPen(+e.target.value)} /></label>
            <div className="swatches small">{PEN_COLORS.map(c => <button key={c} className={"sw " + (penColor === c ? "on" : "")} style={{ background: c }} onClick={() => { setPenColor(c); setTool("pen"); }} aria-label={`Pen color: ${COLOR_NAMES[c] || c}`} aria-pressed={penColor === c} />)}</div>
          </div>}
          {(!mob || panel === "sticker") && <div className="tool-group"><h2><span>03</span> Add a little character</h2>
            <div className="sticker-tray">{Object.entries(STICKERS).map(([k, s]) => <button key={k} onClick={() => addSticker(k)} aria-label={`Add ${s.label} sticker`} title={s.label}><StickerGlyph kind={k} /></button>)}</div>
            {sel != null && <button className="textlink" onClick={() => deleteSticker(sel)}><Trash2 size={13} /> Delete selected</button>}
          </div>}
        </aside>

        {/* stage */}
        <div className="stage" ref={stage}>
          <div className="studio-preview-bar"><span className="preview-dots" aria-hidden="true">● ● ●</span><span>UNTITLED TEE / LIVE PREVIEW</span><span>{COLOR_NAMES[color]}</span></div>
          <div className="studio-canvas-stage">
          <div className="shirt-wrap" onPointerDown={() => setSel(null)}>
            <svg viewBox="0 0 400 460" className="shirt-svg" aria-hidden><ShirtPath color={color} /><rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} fill="none" stroke={isDark ? "#fff" : "#000"} strokeOpacity=".2" strokeDasharray="4 4" /></svg>
            <div className="print" ref={printRef} style={printStyle}>
              <canvas ref={canvas} width={CANVAS_W} height={CANVAS_H} className={"draw-canvas " + (tool === "sticker" ? "passive" : "")}
                onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
                aria-label="Drawing area on the shirt" role="img" />
              {stickers.map(s => (
                <div key={s.id} className={"sticker " + (sel === s.id ? "is-sel" : "")}
                     style={{ left: s.x * 100 + "%", top: s.y * 100 + "%", width: (20 * s.s) / PRINT.w * 100 + "%", transform: `translate(-50%,-50%) rotate(${s.r}deg)` }}
                     onPointerDown={e => dragSticker(e, s)} role="button" tabIndex={0} aria-label={`${STICKERS[s.kind].label} sticker, drag to move`}
                     onKeyDown={e => { const d = e.shiftKey ? .05 : .015; if (e.key === "ArrowLeft") updateSticker(s.id, { x: s.x - d }); if (e.key === "ArrowRight") updateSticker(s.id, { x: s.x + d }); if (e.key === "ArrowUp") updateSticker(s.id, { y: s.y - d }); if (e.key === "ArrowDown") updateSticker(s.id, { y: s.y + d }); if (e.key === "+" || e.key === "=") updateSticker(s.id, { s: Math.min(5, s.s + .2) }); if (e.key === "-") updateSticker(s.id, { s: Math.max(.8, s.s - .2) }); if (e.key === "r") updateSticker(s.id, { r: s.r + 15 }); }}>
                  <StickerGlyph kind={s.kind} />
                  {sel === s.id && <span className="handle" onPointerDown={e => handleSticker(e, s)} aria-label="Resize and rotate" />}
                </div>))}
            </div>
          </div>
          </div>
          <p className="stage-hint">{tool === "sticker" ? "Drag stickers. Corner handle resizes and rotates. Arrow keys nudge, + and - scale, r rotates." : "Draw inside the dotted print area."}</p>
        </div>
      </div>

      <div className="studio-foot">
        <div><p>Every idea deserves a frame.</p><span className="muted">{hasContent ? "Ready when you are. Give your tee a museum label." : "Pick a color, draw a line, or add a sticker."}</span></div>
        <Button onClick={() => setPhase("tag")} icon={ArrowRight}>Frame my shirt</Button>
      </div>

      {phase === "tag" && (
        <ModalDialog labelledBy="tag-h" onClose={() => setPhase("edit")}>
          <div className="modal">
            <p className="home-eyebrow">THE FINISHING TOUCH</p><h2 id="tag-h">Give it a label.</h2>
            <label>Name or alias<input value={alias} onChange={e => setAlias(e.target.value.slice(0, 24))} placeholder="Anonymous" autoFocus /></label>
            <p className="muted">Totally optional. Your shirt can stay anonymous. No email, ever.</p>
            <label className="check"><input type="checkbox" checked={display} onChange={e => setDisplay(e.target.checked)} /> Display my shirt in the visitor museum</label>
            <p className="save-note">Your design is saved in this browser.</p>
            <div className="modal-actions"><Button onClick={finish} icon={ArrowRight}>Hang it</Button><button className="textlink" onClick={() => setPhase("edit")}>Keep editing</button></div>
          </div>
        </ModalDialog>)}
    </main>
  );
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------------------------------------------------------------
   components/FrameSequence: the cinematic framing moment
   stages: 0 controls gone → 1 lift → 2 gallery + frame → 3 pull back → 4 plaque → 5 done
   --------------------------------------------------------------------- */
function FrameSequence({ entry, go }) {
  const rm = useReducedMotion(); const [st, setSt] = useState(rm ? 5 : 0);
  const [count, setCount] = useState(0);
  useEffect(() => { storage.list().then(l => setCount(l.length)); }, []);
  useEffect(() => {
    if (rm) return;
    const t = [400, 1100, 2000, 2900, 3500].map((ms, i) => setTimeout(() => setSt(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, [rm]);
  return (
    <main id="main" className={"frame-seq st-" + st} aria-live="polite">
      <div className="gallery-bg" />
      <div className="framed-wrap">
        <div className="framed">
          <div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" />
          <div className="framed-art"><ShirtArtwork entry={entry} /></div>
        </div>
        <MuseumTag entry={entry} n={count} />
      </div>
      <div className="frame-done">
        <p className="home-eyebrow">{entry.display ? 'A NEW STUDY FOR THE MUSEUM' : 'YOUR OWN LITTLE STUDY'}</p><h1>You left your <em>mark.</em></h1>
        <p className="frame-saved-note">Saved in this browser{entry.display ? ' and added to your museum.' : '.'}</p>
        <div className="frame-actions"><Button onClick={() => go({ name: "gallery" })} icon={ArrowRight}>Visit the museum</Button><Button variant="ghost" onClick={() => go({ name: "home", anchor: "about" })}>Continue exploring</Button></div>
      </div>
    </main>
  );
}
function MuseumTag({ entry, n }) {
  const yr = new Date(entry.createdAt).getFullYear();
  return (
    <div className="plaque" aria-label="Museum plaque">
      <span className="plaque-t">Untitled Tee</span><span>by {entry.alias || 'Anonymous'}</span>
      {n > 0 && <span className="plaque-study">STUDY {String(n).padStart(3, '0')}</span>}
      <span className="plaque-y">{yr}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------
   views/Gallery: visitor wall
   --------------------------------------------------------------------- */
const VISITOR_LINES = ["wow I love that shirt", "what do you think it means?", "I'd wear that", "wait this one's sick", "who made this?", "look at that one", "I like this one", "the details are crazy"];
const rnd = (a, b) => a + Math.random() * (b - a);
function makeVisitor(id, fromLeft = Math.random() < .5) {
  const depth = Math.random() < .4 ? 0 : 1;
  return { id, x: fromLeft ? -8 : 108, dir: fromLeft ? 1 : -1, speed: rnd(.05, .11) * (depth ? 1 : .7), depth, variant: Math.floor(rnd(0, 3)),
    pauseAt: rnd(14, 86), paused: false, pauseLeft: rnd(2500, 5200), didPause: false, bubble: null, bubbleLeft: 0, talkChance: .45, gesture: Math.random() < .3 };
}
function useVisitors(count, rm) {
  const [vs, setVs] = useState(() => Array.from({ length: count }, (_, i) => { const v = makeVisitor(i); v.x = 18 + i * 28; if (rm) v.paused = true; return v; }));
  useEffect(() => {
    if (rm) return;
    let last = performance.now(); let nid = 100;
    const t = setInterval(() => {
      const now = performance.now(); const dt = now - last; last = now;
      setVs(list => list.map(v => {
        v = { ...v };
        if (v.bubble) { v.bubbleLeft -= dt; if (v.bubbleLeft <= 0) v.bubble = null; }
        if (v.paused) { v.pauseLeft -= dt; if (v.pauseLeft <= 0) v.paused = false; return v; }
        v.x += v.dir * v.speed * dt / 16;
        if (!v.didPause && Math.abs(v.x - v.pauseAt) < 1) { v.paused = true; v.didPause = true; if (Math.random() < v.talkChance) { v.bubble = VISITOR_LINES[Math.floor(Math.random() * VISITOR_LINES.length)]; v.bubbleLeft = rnd(2200, 3800); } }
        if (v.x < -12 || v.x > 112) { const fresh = makeVisitor(nid++, Math.random() < .5); fresh.x = fresh.dir > 0 ? -12 - rnd(0, 30) : 112 + rnd(0, 30); return fresh; }
        return v;
      }));
    }, 50);
    return () => clearInterval(t);
  }, [rm]);
  return vs;
}
function VisitorFigure({ v, rm }) {
  const walking = !v.paused && !rm;
  return (
    <div className={"visitor " + (v.depth ? "front " : "back ") + (walking ? "walking" : "looking")} style={{ left: v.x + "%", "--flip": v.dir < 0 ? -1 : 1 }} aria-hidden>
      {v.bubble && <span className="bubble">{v.bubble}</span>}
      <svg viewBox="0 0 24 60" className={"vis-svg v" + v.variant}>
        <g className="vis-head"><circle cx="12" cy="7" r="5" /></g>
        <rect x="7" y="13" width="10" height="22" rx="4" />
        {v.gesture && v.paused ? <rect x="15" y="14" width="3.5" height="16" rx="1.75" transform="rotate(-50 16.75 14)" /> : <rect className="arm" x="15.5" y="15" width="3.5" height="18" rx="1.75" />}
        <rect className="arm arm-b" x="5" y="15" width="3.5" height="18" rx="1.75" />
        <rect className="leg leg-a" x="7" y="34" width="4.5" height="24" rx="2" />
        <rect className="leg leg-b" x="12.5" y="34" width="4.5" height="24" rx="2" />
      </svg>
    </div>
  );
}

function Gallery({ go }) {
  const [items, setItems] = useState(null); const [open, setOpen] = useState(null); const [idx, setIdx] = useState(0);
  const track = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  useEffect(() => { storage.list().then(setItems); }, []);
  const PER = 4; const walls = items ? Array.from({ length: Math.max(1, Math.ceil(items.length / PER)) }, (_, i) => items.slice(i * PER, i * PER + PER)) : [];
  const visitors = useVisitors(mob ? 2 : 3, rm);

  const goTo = i => { const t = track.current; if (!t) return; const n = clamp(i, 0, walls.length - 1); t.scrollTo({ left: n * t.clientWidth, behavior: rm ? "auto" : "smooth" }); };
  const onScroll = () => { const t = track.current; setIdx(Math.round(t.scrollLeft / t.clientWidth)); };
  // desktop: click-drag to pan; wheel → horizontal only while the wall can still move that way
  const dragPan = e => {
    if (mob || e.target.closest("button")) return;
    const t = track.current; const sx = e.clientX, sl = t.scrollLeft; t.style.scrollSnapType = "none"; document.body.dataset.drag = "1";
    const mv = ev => { t.scrollLeft = sl - (ev.clientX - sx); };
    const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); t.style.scrollSnapType = ""; delete document.body.dataset.drag; goTo(Math.round(t.scrollLeft / t.clientWidth)); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };
  useEffect(() => {
    const t = track.current; if (!t || mob) return;
    const wheel = e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad horizontal: native
      const max = t.scrollWidth - t.clientWidth; const atStart = t.scrollLeft <= 1 && e.deltaY < 0; const atEnd = t.scrollLeft >= max - 1 && e.deltaY > 0;
      if (max <= 0 || atStart || atEnd) return; // let the page scroll vertically at the ends
      e.preventDefault(); t.scrollLeft += e.deltaY;
    };
    t.addEventListener("wheel", wheel, { passive: false }); return () => t.removeEventListener("wheel", wheel);
  }, [mob, walls.length]);

  return (
    <main id="main" className="gallery">
      <div className="gallery-head">
        <div className="museum-top"><button className="back" onClick={() => go({ name: "home", anchor: "clothes" })}><ChevronLeft size={14} /> Back to the portfolio</button><a className="home-pill" href="#/studio">Create a shirt <ArrowRight size={14} /></a></div>
        <header className="play-hero museum-hero"><div><p className="home-eyebrow">THE VISITOR MUSEUM / AN OPEN EXHIBITION</p><h1>A little room<br />for <em>your ideas.</em></h1><p>Made in the studio. Framed with a little care.</p></div><p className="museum-intro-note">Everyone has a designer’s eye.<br />This is a place to try yours.</p></header>
        <div className="museum-summary"><span>{items ? `${items.length} ${items.length === 1 ? 'study' : 'studies'} on view` : 'Opening the museum…'}</span><p className="gallery-note">Saved shirts live in this browser. Until yours arrive, the samples are mine.</p></div>
      </div>
      {items && items.length === 0 && <p className="empty">The wall is empty. Be the first to hang something.</p>}

      <div className="exhibition">
        <div className="wall-track" ref={track} onScroll={onScroll} onPointerDown={dragPan} role="region" tabIndex={0} aria-roledescription="carousel" aria-label="Museum walls" onKeyDown={event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); goTo(idx + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
          {walls.map((wall, wi) => (
            <section key={wi} className="wall-panel" aria-label={`Wall ${wi + 1} of ${walls.length}`}>
              <div className="wall" role="list">
                {wall.map((e, i) => (
                  <div key={e.id} role="listitem" className="wall-item">
                    <button className="frame-btn" tabIndex={wi === idx ? 0 : -1} onClick={() => setOpen(e)} aria-label={`Open shirt by ${e.alias || "anonymous"}`}>
                      <div className="framed small"><div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" /><div className="framed-art"><ShirtArtwork entry={e} /></div></div>
                      <span className="museum-card-label"><span className="museum-study">STUDY {String(wi * PER + i + 1).padStart(3, '0')}</span><span>Untitled Tee</span><small>{e.alias || "Anonymous"}</small><span className="museum-date">{new Date(e.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></span>
                    </button>
                  </div>))}
              </div>
            </section>))}
        </div>
        {walls.length > 1 && (
          <div className="wall-nav">
            <button onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous wall"><ChevronLeft size={16} /></button>
            <span className="wall-count">Wall {String(idx + 1).padStart(2, "0")} / {String(walls.length).padStart(2, "0")}</span>
            <button onClick={() => goTo(idx + 1)} disabled={idx >= walls.length - 1} aria-label="Next wall"><ArrowRight size={16} /></button>
          </div>)}
      </div>

      <div className="museum-floor" aria-hidden><div className="visitors">{visitors.map(v => <VisitorFigure key={v.id} v={v} rm={rm} />)}</div></div>
      {open && (
        <ModalDialog label={`Untitled Tee by ${open.alias || 'Anonymous'}`} onClose={() => setOpen(null)}>
          <div className="modal modal-art" onClick={e => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setOpen(null)} aria-label="Close"><X size={18} /></button>
            <div className="framed big"><div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" /><div className="framed-art"><ShirtArtwork entry={open} /></div></div>
            <MuseumTag entry={open} n={items.indexOf(open) + 1} />
          </div>
        </ModalDialog>)}
    </main>
  );
}

function Changelog() {
  const [open, setOpen] = useState(false);
  const shown = open ? CHANGELOG : CHANGELOG.slice(0, 3);
  return (
    <section id="changelog" className="log" aria-labelledby="log-h">
      <div className="log-head">
        <h2 id="log-h">Still building</h2>
        <p>This portfolio updates weekly with work from PXI, Sweat2Swim and NEP2UNE. Last updated {fmtDate(LAST_UPDATED)}.</p>
      </div>
      <ol className="log-list">
        {shown.map(e => (
          <Reveal as="li" key={`${e.date}-${e.note}`} className="log-item">
            <time dateTime={e.date}>{fmtDate(e.date)}</time>
            <p className="log-note">{e.note}</p>
            <p className="log-tags">{e.tags.join(" · ")}</p>
          </Reveal>))}
      </ol>
      {CHANGELOG.length > 3 && <button className="textlink" onClick={() => setOpen(o => !o)}>{open ? "Show less" : `All ${CHANGELOG.length} updates`}</button>}
    </section>
  );
}

/* ---------------------------------------------------------------------
   components/Footer
   --------------------------------------------------------------------- */
function Footer({ go, scrollTo, route }) {
  const nav = id => route.name !== "home" ? go({ name: "home", anchor: id }) : scrollTo(id);
  return (
    <footer className="foot">
      <div className="foot-left"><span className="mark-lg">{SITE.mark}</span><p className="foot-tag">{SITE.tagline}</p><p className="muted">© {SITE.year} {SITE.name}</p><button className="foot-stamp" onClick={() => go({ name: "changelog" })}>Updated {fmtDate(LAST_UPDATED)} · changelog</button></div>
      <div className="foot-cols">
        <div><h3>Menu</h3><button onClick={() => nav("work")}>Work</button><button onClick={() => nav("about")}>About</button><button onClick={() => go({ name: "creations" })}>NEP2UNE</button><button onClick={() => go({ name: "studio" })}>Create</button><button onClick={() => go({ name: "gallery" })}>Museum</button><button onClick={() => go({ name: "changelog" })}>Changelog</button>{SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}</div>
        <div><h3>Contact</h3>{SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{SITE.email && <a href={"mailto:" + SITE.email}>Email</a>}{SITE.github && <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>}<button onClick={() => nav("contact")}>Contact section</button></div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------
   App: hash routing, titles, focus management
   --------------------------------------------------------------------- */
const VALID_PAGES = ["studio", "gallery", "changelog", "creations"];
function parseHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  const p = h.split("/");
  if (p[0] === "work" && CASE_STUDIES[p[1]]) return { name: "case", slug: p[1] };
  if (VALID_PAGES.includes(p[0])) return { name: p[0] };
  return { name: "home" };
}
const hashFor = r => r.name === "case" ? `#/work/${r.slug}` : r.name === "home" ? "#/" : `#/${r.name}`;

function ChangelogPage({ go }) {
  return (
    <main id="main" className="case">
      <button className="back" onClick={() => go({ name: "home" })}><ChevronLeft size={14} /> Home</button>
      <Changelog />
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const pendingAnchor = useRef(null); const rm = useReducedMotion();
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
  const go = next => {
    pendingAnchor.current = next.anchor || null;
    const h = hashFor(next);
    if (window.location.hash === h || (h === "#/" && window.location.hash === "")) setRoute(next);
    else window.location.hash = h;
  };
  useEffect(() => {
    const f = () => setRoute(parseHash());
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    const cs = route.name === "case" ? CASE_STUDIES[route.slug] : null;
    document.title =
      route.name === "home" ? "Kyle Potente | Product Designer Who Builds" :
      cs ? cs.name + " | Kyle Potente" :
      route.name === "creations" ? "NEP2UNE Creations | Kyle Potente" :
      route.name === "studio" ? "Shirt Studio | Kyle Potente" :
      route.name === "gallery" ? "Visitor Museum | Kyle Potente" : "Changelog | Kyle Potente";
    const a = pendingAnchor.current; pendingAnchor.current = null;
    if (a) { const t = setTimeout(() => scrollTo(a), 80); return () => clearTimeout(t); }
    window.scrollTo(0, 0);
    const m = document.getElementById("main");
    if (m) { m.setAttribute("tabindex", "-1"); m.focus({ preventScroll: true }); }
  }, [route]);
  const view = route.name === "case" ? <CaseStudy cs={CASE_STUDIES[route.slug]} go={go} />
    : route.name === "creations" ? <Creations go={go} />
    : route.name === "studio" ? <Studio go={go} />
    : route.name === "gallery" ? <Gallery go={go} />
    : route.name === "changelog" ? <ChangelogPage go={go} />
    : <Home go={go} scrollTo={scrollTo} site={SITE} projects={CASE_STUDIES} order={CASE_ORDER} />;
  return (
    <div className="site" data-route={route.name}>
      <style>{CSS}</style>
      <a href="#main" className="skip">Skip to content</a>
      <CursorTrail />
      <Navigation route={route} go={go} scrollTo={scrollTo} />
      <div className="page">{view}{route.name !== "studio" && <Footer go={go} scrollTo={scrollTo} route={route} />}</div>
      {["home", "creations", "studio", "gallery"].includes(route.name) && <GlassDock site={SITE} scrollTo={scrollTo} go={go} route={route} />}
    </div>
  );
}

/* ---------------------------------------------------------------------
   styles: tokens + components (would be globals.css + modules)
   --------------------------------------------------------------------- */
const CSS = `
.magnetic{display:inline-block}
:root{--paper:#F5F4EF;--paper-2:#ECEAE3;--ink:#000;--char:#2B2B2B;--mute:#77756D;--line:#DAD8CF;--accent:#2534E8;--gold:#B79A3A;--gold-2:#E4CC7A;
 --serif:'Instrument Serif',Georgia,serif;--sans:Helvetica,'Helvetica Neue',Arial,sans-serif;--ease:cubic-bezier(.2,.7,.2,1);--pad:clamp(20px,5vw,72px)}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper)}
.site{font-family:var(--sans);color:var(--ink);background:var(--paper);min-height:100vh;-webkit-font-smoothing:antialiased;font-size:16px;line-height:1.5}
.site a,.site button,.site [role=button]{cursor:pointer}
h1,h2,h3{margin:0;font-weight:400}
h1,.site h2{font-family:var(--serif);letter-spacing:-.01em;line-height:1.02}
em{font-style:italic}
p{margin:0}
button{font:inherit;color:inherit;background:none;border:0;padding:0}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}
.skip{position:absolute;left:-999px;top:8px;background:var(--ink);color:var(--paper);padding:8px 12px;z-index:100}.skip:focus{left:8px}
.muted{color:var(--mute)}
.page{transition:opacity .26s var(--ease),transform .26s var(--ease)}.page-out{opacity:0;transform:translateY(6px)}
.cursor-trail{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999}
.cursor-trail[hidden]{display:none}
.site input,.site textarea{cursor:text}

/* nav */
.nav{position:sticky;top:0;z-index:50;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px var(--pad);font-size:14px;transition:background .3s,backdrop-filter .3s}
.nav-scrolled{background:rgba(245,244,239,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.mark{font-family:var(--serif);font-size:24px;line-height:1;justify-self:start}
.nav-center{display:flex;gap:28px}.nav-right{justify-self:end;display:flex;gap:22px}
.nav a,.nav-center button,.nav-right button{position:relative;padding:4px 0}
.nav-center button::after,.nav-right a::after,.nav-right button::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:100%;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .3s var(--ease)}
.nav-center button:hover::after,.nav-right a:hover::after,.nav-right button:hover::after{transform:scaleX(1)}
.nav-burger{display:none;justify-self:end}
.nav-sheet{position:absolute;top:100%;left:0;right:0;background:var(--paper);border-bottom:1px solid var(--line);padding:12px var(--pad) 24px;display:flex;flex-direction:column;gap:4px;font-size:20px;font-family:var(--serif)}
.nav-sheet button,.nav-sheet a{text-align:left;padding:10px 0}.nav-sheet-divider{height:1px;background:var(--line);margin:8px 0}
@media (max-width:820px){.nav{grid-template-columns:1fr auto}.nav-center,.nav-right{display:none}.nav-burger{display:block}}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 20px;border-radius:2px;font-size:14px;font-weight:500;transition:background .25s,color .25s,border-color .25s;border:1px solid var(--ink)}
.btn-primary{background:var(--ink);color:var(--paper)}.btn-primary:hover{background:var(--char)}
.btn-ghost{background:transparent;color:var(--ink)}.btn-ghost:hover{background:rgba(0,0,0,.05)}
.textlink{display:inline-flex;align-items:center;gap:6px;font-size:14px;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.back{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--mute)}.back:hover{color:var(--ink)}

/* work */
.section-head{display:flex;justify-content:space-between;align-items:baseline;padding:0 var(--pad) 28px;border-bottom:1px solid var(--line);margin:0 0 56px}
.section-head h2{font-size:clamp(28px,3vw,40px)}.section-head p{font-size:14px;color:var(--mute)}
.work{padding:64px 0 40px}
.project{padding:0 var(--pad);margin-bottom:clamp(72px,10vw,140px)}
.project-link{display:block;--px:0px;--py:0px}
.project-media{position:relative;overflow:hidden;background:var(--paper-2);border-radius:3px;aspect-ratio:16/10}
.project-flagship .project-media{aspect-ratio:16/9}
.art{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .8s var(--ease);transform:translate(var(--px),var(--py))}
.project-link:hover .art{transform:translate(var(--px),var(--py)) scale(1.015)}
.art-label{position:absolute;right:16px;bottom:12px;font-size:11px;color:var(--mute);letter-spacing:.02em}
.art-pxi{gap:4%;padding:24px 20px 48px;--px:0px;--py:0px}
.pxi-preview-screen{display:block;width:auto;height:100%;max-width:27%;object-fit:contain;border-radius:12px;filter:drop-shadow(0 14px 16px rgba(0,0,0,.18));transform:translateY(var(--screen-lift)) rotate(var(--screen-rotation));transition:transform .4s var(--ease)}
.art-pxi .art-label{left:12px;right:12px;bottom:12px;text-align:center}
.project-media:has(.art-pxi) .project-cta{top:14px;bottom:auto}
@media (max-width:640px){.art-pxi{gap:4%;padding:16px 12px 42px}.art-pxi .art-label{font-size:10px;line-height:1.35}.pxi-preview-screen{border-radius:6px}}
@media (prefers-reduced-motion:reduce){.art-pxi,.pxi-preview-screen{transition:none!important}.pxi-preview-screen{transform:rotate(var(--screen-rotation))}}
.phone{position:absolute;width:20%;max-width:180px;min-width:110px;aspect-ratio:9/19;background:#fff;border-radius:18px;border:1px solid var(--line);padding:10px;display:flex;flex-direction:column;gap:8px;transition:transform .8s var(--ease);box-shadow:0 20px 40px -20px rgba(0,0,0,.25)}
.phone-bar{width:36%;height:4px;background:var(--line);border-radius:2px;align-self:center}.phone-block{background:var(--paper-2);border-radius:8px}.phone-row{height:8px;background:var(--paper-2);border-radius:4px}.phone-row.short{width:60%}
.phone:nth-child(2) .phone-block:first-of-type{background:var(--accent)}
.browser{width:66%;background:#fff;border:1px solid var(--line);border-radius:6px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.25)}
.browser-bar{display:flex;gap:5px;padding:8px}.browser-bar i{width:7px;height:7px;border-radius:50%;background:var(--line)}
.browser-hero{height:110px;background:linear-gradient(160deg,#DCE6E8,#B7CDD3)}.browser-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px}.browser-grid div{aspect-ratio:3/4;background:var(--paper-2);border-radius:3px}
.art-shirt{height:78%;filter:drop-shadow(0 24px 30px rgba(0,0,0,.2))}
.project-cta{position:absolute;left:18px;bottom:14px;font-size:13px;display:inline-flex;align-items:center;gap:6px;background:var(--paper);padding:8px 12px;border-radius:2px;opacity:0;transform:translateY(6px);transition:opacity .35s var(--ease),transform .35s var(--ease)}
.project-link:hover .project-cta,.project-link:focus-visible .project-cta{opacity:1;transform:none}
.project-meta{padding-top:18px;max-width:900px}
.project-title-row{display:flex;justify-content:space-between;align-items:baseline}
.project-title-row h3{font-family:var(--serif);font-size:clamp(30px,3.4vw,48px);transition:transform .4s var(--ease)}.project-link:hover h3{transform:translateX(4px)}
.project-flagship h3{font-size:clamp(36px,4.6vw,64px)}
.project-year{font-size:14px;color:var(--mute)}
.project-disc{font-size:13px;color:var(--mute);margin-top:4px}
.project-desc{margin-top:12px;font-size:clamp(17px,1.5vw,21px);max-width:44ch;color:var(--char)}
.project-role{margin-top:10px;font-size:13px;color:var(--char)}.project-role span{color:var(--mute);margin-right:4px}.dotsep{margin-left:14px}
@media (max-width:640px){.project-media{aspect-ratio:4/3}.project-flagship .project-media{aspect-ratio:4/3}.phone{width:34%}}

/* play */
.play{padding:clamp(60px,10vw,120px) var(--pad);border-top:1px solid var(--line);display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center}
.play h2{font-size:clamp(36px,5vw,72px)}.play p{margin-top:18px;max-width:40ch;color:var(--char);font-size:17px}
.play-actions{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
.mini-wall{display:flex;gap:18px;justify-content:center;align-items:center}
.mini-frame{width:22%;padding:6px;background:#fff;border:6px solid #1f1c19;box-shadow:0 20px 40px -20px rgba(0,0,0,.4)}
@media (max-width:900px){.play{grid-template-columns:1fr}}

/* about */
.about{padding:clamp(60px,10vw,120px) var(--pad);border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1.2fr;gap:40px}
.about h2{font-size:clamp(36px,5vw,72px)}.about-body p{font-size:18px;max-width:52ch;color:var(--char)}
.skills{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:40px}
.skill-col h3{font-size:13px;color:var(--mute);padding-bottom:10px;border-bottom:1px solid var(--line);margin-bottom:10px}
.skill-col ul{list-style:none;padding:0;margin:0;font-size:15px}.skill-col li{padding:4px 0}
@media (max-width:900px){.about{grid-template-columns:1fr}}@media (max-width:560px){.skills{grid-template-columns:1fr 1fr}}

/* contact */
.contact{padding:clamp(80px,12vw,160px) var(--pad);border-top:1px solid var(--line);text-align:center}
.contact h2{font-size:clamp(40px,6vw,88px);max-width:14ch;margin:0 auto}
.contact-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:36px}

/* changelog */
.log{padding:clamp(60px,9vw,110px) var(--pad);border-top:1px solid var(--line)}
.log-head{display:flex;justify-content:space-between;align-items:baseline;gap:24px;flex-wrap:wrap;padding-bottom:20px;border-bottom:1px solid var(--line)}
.log-head h2{font-size:clamp(28px,3vw,40px)}
.log-head p{font-size:14px;color:var(--mute);max-width:46ch}
.log-list{list-style:none;margin:0;padding:0}
.log-item{display:grid;grid-template-columns:150px 1fr 180px;gap:24px;align-items:baseline;padding:20px 0;border-bottom:1px solid var(--line)}
.log-item time{font-size:13px;color:var(--mute);font-variant-numeric:tabular-nums}
.log-note{font-size:16px;line-height:1.5;color:var(--char);max-width:62ch}
.log-tags{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);text-align:right}
.log .textlink{margin-top:20px}
.foot-stamp{font-size:12px;margin-top:2px}
@media (max-width:760px){.log-item{grid-template-columns:1fr;gap:6px}.log-tags{text-align:left}}

/* figures + notes + built */
.cs-fig{margin:0}.cs-fig img{width:100%;height:auto;display:block;border-radius:3px;border:1px solid var(--line)}
.cs-fig figcaption{font-size:13px;color:var(--mute);margin-top:8px;line-height:1.45}
.cs-fig video{width:100%;height:auto;display:block;border-radius:3px;border:1px solid var(--line);background:var(--paper-2)}
@media (prefers-reduced-motion:reduce){.cs-fig video{display:none}.cs-fig:has(video)::before{content:"";display:block;width:100%;aspect-ratio:9/16;background:var(--paper-2);border-radius:3px}}
.gallery-note{margin-top:6px;font-size:13px;color:var(--mute)}
.contact-note{margin-top:18px;font-size:14px;color:var(--mute)}
.built{margin-top:44px;padding-top:24px;border-top:1px solid var(--line);max-width:62ch}
.built h3{font-size:14px;margin-bottom:10px}
.built p{font-size:15px;line-height:1.55;color:var(--char)}
.art-nep2{gap:3%}.art-nep2 img{width:23%;height:auto;filter:drop-shadow(0 18px 26px rgba(0,0,0,.18));transition:transform .8s var(--ease)}
.foot-stamp{font-size:12px;color:var(--mute);margin-top:2px;text-align:left}.foot-stamp:hover{color:var(--ink)}
[data-route=changelog] .log{border-top:0;padding:24px 0 40px}

/* footer */
.foot{border-top:1px solid var(--line);padding:48px var(--pad);display:flex;justify-content:space-between;gap:40px;font-size:14px}
.mark-lg{font-family:var(--serif);font-size:40px;line-height:1}.foot-tag{font-family:var(--serif);font-style:italic;font-size:18px;margin:14px 0 6px}
.foot-cols{display:flex;gap:64px}.foot-cols h3{font-size:13px;color:var(--mute);margin-bottom:8px}.foot-cols div{display:flex;flex-direction:column}.foot-cols a,.foot-cols button{text-align:left;padding:3px 0}
@media (max-width:640px){.foot{flex-direction:column}.foot-cols{gap:40px}}

/* case study */
.case{padding:20px var(--pad) 80px;max-width:1200px;margin:0 auto}
.case-hero{margin-top:14px}
.case-title-row{display:flex;justify-content:space-between;align-items:baseline}.case-title-row h1{font-size:clamp(48px,8vw,120px)}.case-title-row span{color:var(--mute)}
.case-tag{font-family:var(--serif);font-size:clamp(24px,3vw,40px);max-width:24ch;margin-top:12px;line-height:1.15}
.case-meta{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin:24px 0 0;padding-top:16px;border-top:1px solid var(--line)}
.case-meta dt{font-size:12px;color:var(--mute)}.case-meta dd{margin:4px 0 0;font-size:14px}
.case-art{position:relative;aspect-ratio:16/9;width:min(100%,64%);margin:24px auto 0;background:var(--paper-2);border-radius:3px;overflow:hidden}
@media (max-width:820px){.case-art{width:100%}}
.quick{margin-top:36px;padding:28px;background:#fff;border:1px solid var(--line);border-radius:3px}
.quick-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}.quick-head h2{font-size:26px}
.quick-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin:22px 0 0}
.quick-grid dt{font-size:12px;color:var(--mute)}.quick-grid dd{margin:4px 0 0;font-size:16px;line-height:1.45}
.quick .textlink{margin-top:20px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:2px;overflow:hidden}
.seg button{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;font-size:13px}.seg button.on{background:var(--ink);color:var(--paper)}
.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:64px}
.summary h2{font-size:14px;font-family:var(--sans);color:var(--mute);margin-bottom:8px}.summary p{font-size:16px;line-height:1.5}
.cs-section{display:grid;grid-template-columns:260px 1fr;gap:40px;margin-top:72px;padding-top:28px;border-top:1px solid var(--line)}
.cs-section-head{display:flex;gap:14px;align-items:baseline}.cs-n{font-size:13px;color:var(--mute)}.cs-section h2{font-size:30px}
.cs-blocks{display:flex;flex-direction:column;gap:24px;max-width:760px}
.cs-text{font-size:17px;line-height:1.55;max-width:60ch;color:var(--char)}
.cs-callout{font-family:var(--serif);font-size:24px;line-height:1.25;padding-left:18px;border-left:2px solid var(--ink)}
.cs-list{margin:0;padding-left:18px;font-size:16px;line-height:1.7}
.cs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.cs-ba{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cs-ba span{display:block;font-size:12px;color:var(--mute);margin-top:8px}
.decision{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--line);border-radius:3px}
.decision>div{padding:18px}.decision>div+div{border-left:1px solid var(--line)}.decision h3{font-size:12px;color:var(--mute);margin-bottom:8px}.decision p{font-size:15px;line-height:1.45}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.metric{padding:20px 0;border-top:1px solid var(--ink)}.metric strong{display:block;font-family:var(--serif);font-weight:400;font-size:40px;line-height:1}.metric span{font-size:13px;color:var(--mute)}
.placeholder{position:relative;border-radius:3px;display:flex;align-items:flex-end;padding:12px;background-image:linear-gradient(45deg,transparent 48%,rgba(0,0,0,.05) 49%,rgba(0,0,0,.05) 51%,transparent 52%);background-size:22px 22px}
.placeholder span{font-size:12px;color:var(--mute);background:var(--paper);padding:3px 6px;border-radius:2px}
.case-next{margin-top:96px;border-top:1px solid var(--line);padding-top:28px}.case-next p{font-size:13px;color:var(--mute)}
.next-link{font-family:var(--serif);font-size:clamp(36px,5vw,64px);display:inline-flex;align-items:center;gap:14px;margin-top:6px}
@media (max-width:820px){.case-meta{grid-template-columns:1fr 1fr}.summary{grid-template-columns:1fr}.cs-section{grid-template-columns:1fr;gap:18px}.decision{grid-template-columns:1fr}.decision>div+div{border-left:0;border-top:1px solid var(--line)}.quick-grid{grid-template-columns:1fr}.cs-grid{grid-template-columns:1fr 1fr}.metrics{grid-template-columns:1fr}}

/* studio */
.studio{padding:16px var(--pad) 32px;min-height:calc(100vh - 62px);display:flex;flex-direction:column}
.studio-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center}.studio-top h1{font-size:28px;text-align:center}
.studio-hist{justify-self:end;display:flex;gap:4px}.studio-hist button{width:36px;height:36px;display:grid;place-items:center;border:1px solid var(--line);border-radius:2px;background:#fff}.studio-hist button:disabled{opacity:.35}
.studio-body{display:grid;grid-template-columns:240px 1fr;gap:32px;margin-top:24px;flex:1}
.tools{display:flex;flex-direction:column;gap:28px}.tool-group h2{font-size:13px;font-family:var(--sans);color:var(--mute);margin-bottom:10px}
.swatches{display:flex;flex-wrap:wrap;gap:8px}.sw{width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.15);transition:transform .2s var(--ease)}.sw.on{outline:2px solid var(--ink);outline-offset:2px}.sw:hover{transform:scale(1.1)}
.swatches.small .sw{width:22px;height:22px}
.range{display:flex;align-items:center;gap:10px;font-size:13px;margin:12px 0}.range input{flex:1;accent-color:var(--ink)}
.sticker-tray{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.sticker-tray button{aspect-ratio:1;padding:6px;border:1px solid var(--line);background:#fff;border-radius:2px;transition:transform .2s var(--ease),border-color .2s}.sticker-tray button:hover{transform:translateY(-2px);border-color:var(--ink)}
.stage{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
.shirt-wrap{position:relative;width:min(100%,520px);aspect-ratio:400/460;touch-action:none}
.shirt-svg{width:100%;height:100%;display:block;filter:drop-shadow(0 30px 40px rgba(0,0,0,.14))}
.print{position:absolute}
.draw-canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.draw-canvas.passive{pointer-events:none}
.sticker{position:absolute;aspect-ratio:1;touch-action:none;user-select:none;-webkit-user-select:none}
.sticker.is-sel{outline:1px dashed var(--accent);outline-offset:4px}
.handle{position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;border-radius:50%;background:var(--accent);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)}
.stage-hint{font-size:12px;color:var(--mute);text-align:center;max-width:52ch}
.studio-foot{display:flex;align-items:center;gap:16px;justify-content:center;margin-top:20px;font-size:13px}
.tools-mobile{position:fixed;left:0;right:0;bottom:0;background:var(--paper);border-top:1px solid var(--line);padding:10px var(--pad) 14px;z-index:40;gap:12px}
.seg-tabs{width:100%}.seg-tabs button{flex:1;justify-content:center}
.tools-mobile .sticker-tray{grid-template-columns:repeat(6,1fr)}
@media (max-width:767px){.studio{padding-bottom:230px}.studio-body{grid-template-columns:1fr}.studio-top h1{font-size:20px}}

/* modal */
.modal-bg{position:fixed;inset:0;background:rgba(20,18,15,.55);display:grid;place-items:center;z-index:70;padding:20px;animation:fadein .25s var(--ease)}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{background:var(--paper);padding:32px;width:min(100%,460px);border-radius:3px;position:relative;animation:pop .35s var(--ease)}
@keyframes pop{from{transform:translateY(10px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.modal h2{font-size:28px;margin-bottom:18px}.modal label{display:block;font-size:13px;color:var(--mute)}
.modal input[type=text],.modal input:not([type]){display:block;width:100%;margin-top:6px;font:inherit;font-size:16px;padding:10px 12px;border:1px solid var(--line);border-radius:2px;background:#fff;color:var(--ink)}
.modal .muted{font-size:13px;margin:8px 0 18px}
.check{display:flex;align-items:center;gap:10px;font-size:14px!important;color:var(--ink)!important}.check input{accent-color:var(--ink);width:16px;height:16px}
.modal-actions{display:flex;gap:18px;align-items:center;margin-top:24px}
.modal-art{width:min(100%,560px);text-align:center;display:flex;flex-direction:column;align-items:center;gap:18px}
.modal-x{position:absolute;right:12px;top:12px}

/* frames + plaque */
.framed{position:relative;padding:22px;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
.frame-edge{position:absolute;inset:0;border:14px solid #1f1c19;box-shadow:inset 0 0 0 1px #6b5e4d,inset 0 0 0 2px #2b2724}
.frame-mat{position:absolute;inset:14px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.frame-glass{position:absolute;inset:14px;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 60%);pointer-events:none;background-size:250% 100%;background-position:100% 0}
.framed-art{position:relative;width:100%}
.framed.small{padding:14px}.framed.small .frame-edge{border-width:9px}.framed.small .frame-mat,.framed.small .frame-glass{inset:9px}
.framed.big{width:min(100%,420px)}
.plaque{display:inline-flex;flex-direction:column;align-items:center;padding:8px 18px;background:linear-gradient(180deg,var(--gold-2),var(--gold));color:#2b2110;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border:1px solid #8f7627;box-shadow:0 2px 6px rgba(0,0,0,.3);min-width:150px;line-height:1.5}
.plaque-t{font-family:var(--serif);text-transform:none;letter-spacing:0;font-size:14px;font-style:italic}.plaque-y{font-size:10px;opacity:.75}
.plaque.tiny{padding:5px 12px;min-width:0;font-size:10px}

/* frame sequence */
.frame-seq{position:relative;min-height:calc(100vh - 62px);display:grid;place-items:center;overflow:hidden;padding:40px var(--pad)}
.gallery-bg{position:absolute;inset:0;background:linear-gradient(180deg,#E8E5DD 0%,#E8E5DD 74%,#B8AF9E 74.2%,#A69D8C 100%);opacity:0;transition:opacity 1s var(--ease)}
.framed-wrap{position:relative;display:flex;flex-direction:column;align-items:center;gap:22px;transition:transform 1.1s var(--ease)}
.frame-seq .framed{width:min(80vw,420px);transition:transform .8s var(--ease),box-shadow .8s var(--ease)}
.frame-seq .frame-edge,.frame-seq .frame-mat{opacity:0;transform:scale(1.12);transition:opacity .6s var(--ease),transform .7s var(--ease)}
.frame-seq .framed{background:transparent;box-shadow:none}
.frame-seq .plaque{opacity:0;transform:translateY(10px);transition:opacity .5s var(--ease),transform .5s var(--ease)}
.frame-seq .frame-done{position:absolute;bottom:clamp(30px,8vh,80px);text-align:center;opacity:0;transform:translateY(10px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.frame-done h1{font-size:clamp(34px,5vw,64px)}.frame-actions{display:flex;gap:12px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.st-1 .framed{transform:translateY(-14px) scale(1.03)}
.st-2 .gallery-bg,.st-3 .gallery-bg,.st-4 .gallery-bg,.st-5 .gallery-bg{opacity:1}
.st-2 .framed,.st-3 .framed,.st-4 .framed,.st-5 .framed{background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
.st-2 .frame-edge,.st-2 .frame-mat,.st-3 .frame-edge,.st-3 .frame-mat,.st-4 .frame-edge,.st-4 .frame-mat,.st-5 .frame-edge,.st-5 .frame-mat{opacity:1;transform:none}
.st-2 .frame-glass{animation:glint 1s var(--ease) .3s forwards}
@keyframes glint{from{background-position:100% 0}to{background-position:0 0}}
.st-3 .framed-wrap,.st-4 .framed-wrap,.st-5 .framed-wrap{transform:translateY(-8vh) scale(.62)}
.st-4 .plaque,.st-5 .plaque{opacity:1;transform:none}
.st-5 .frame-done{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.frame-seq *{transition:none!important;animation:none!important}}

/* gallery */
.gallery{position:relative;min-height:calc(100vh - 62px);background:#E8E5DD;padding:24px var(--pad) 120px;overflow:hidden}
.gallery-head h1{font-size:clamp(36px,5vw,64px);margin-top:16px}.gallery-head p{margin-top:8px;color:var(--char);font-size:15px}
.exhibition{position:relative;margin-top:40px}
.wall-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}.wall-track::-webkit-scrollbar{display:none}
.wall-panel{flex:0 0 100%;scroll-snap-align:start;padding:20px 0 40px}
.wall{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,56px);align-items:flex-start;justify-content:center;max-width:1000px;margin:0 auto;min-height:280px}
.wall-nav{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:10px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.wall-nav button{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:var(--paper)}.wall-nav button:disabled{opacity:.3}
.museum-floor{position:fixed;left:0;right:0;bottom:0;height:34px;background:linear-gradient(180deg,#B8AF9E,#A69D8C);pointer-events:none;z-index:3}
.visitors{position:absolute;left:0;right:0;bottom:8px;height:60px;pointer-events:none}
.visitor{position:absolute;bottom:0;transform:translateX(-50%)}
.visitor.front{bottom:0}.visitor.back{bottom:10px;opacity:.5}
.vis-svg{width:22px;height:56px;fill:#2b2724;transform:scaleX(var(--flip))}.visitor.back .vis-svg{width:18px;height:46px}
.vis-svg.v1{fill:#3a342e}.vis-svg.v2{fill:#1f1c19}
.walking .leg-a{animation:step .7s ease-in-out infinite alternate;transform-origin:9px 36px}.walking .leg-b{animation:step .7s ease-in-out infinite alternate-reverse;transform-origin:15px 36px}
.walking .arm{animation:step .7s ease-in-out infinite alternate-reverse;transform-origin:17px 16px}.walking .arm-b{animation:step .7s ease-in-out infinite alternate;transform-origin:7px 16px}
@keyframes step{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
.looking .vis-head{transform:rotate(-10deg) translateY(-1px);transform-origin:12px 12px;transition:transform .6s var(--ease)}
.bubble{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-6px);white-space:nowrap;font-family:var(--serif);font-style:italic;font-size:11px;color:var(--char);background:var(--paper);border:1px solid var(--line);padding:2px 7px;border-radius:2px;animation:bub .4s var(--ease) both}
@keyframes bub{from{opacity:0;transform:translate(-50%,0)}to{opacity:1;transform:translate(-50%,-6px)}}
@media (prefers-reduced-motion:reduce){.walking *{animation:none!important}}
.wall-item{width:calc(150px * var(--sc));transform:translateY(var(--off))}
.frame-btn{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;transition:transform .4s var(--ease)}.frame-btn:hover{transform:translateY(-4px)}
.frame-btn .framed{width:100%}
.frame-btn .plaque{opacity:0;transition:opacity .3s}.frame-btn:hover .plaque,.frame-btn:focus-visible .plaque{opacity:1}
@media (pointer:coarse){.frame-btn .plaque{opacity:1}}
.empty{text-align:center;margin-top:80px;color:var(--mute)}
@media (max-width:640px){.wall-item{width:calc(110px * var(--sc))}}
`;
