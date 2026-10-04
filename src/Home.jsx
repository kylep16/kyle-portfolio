import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, FileText, FolderOpen, Code2, Mail, Pause, Play, Shirt } from "lucide-react";
import "./home.css";

// Add new clothing photography here. Empty slots are intentional until assets arrive.
const CLOTHING_SHOWCASE = [
  { id: "collection", title: "The collection", src: null, alt: "" },
  { id: "details", title: "A closer look", src: null, alt: "" },
  { id: "process", title: "From sketch to stitch", src: null, alt: "" },
];

const PROJECT_COPY = {
  pxi: { title: "Making nights into memories.", summary: "Shared cameras, event discovery, and a Passport that connects it all.", status: "Mobile product", detail: "Mobile UI & frontend implementation" },
  nep2une: { title: "A brand built from scratch.", summary: "Design, storefront, and releases for my independent clothing brand.", status: "Founder", detail: "$120K+ lifetime sales" },
  sweat2swim: { title: "From first look to checkout.", summary: "Shopify release pages and a storefront designed around the collection.", status: "E-commerce", detail: "Shopify storefront design" },
};

function useMotionPreference() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return reduced;
}

function Hanger({ bottom }) {
  const gradient = useId();
  return <svg className="rail-hanger" viewBox="0 0 240 96" aria-hidden="true">
    <defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#929493" /><stop offset=".45" stopColor="#eceeec" /><stop offset="1" stopColor="#777b78" /></linearGradient></defs>
    <path d="M120 32V25c0-8 14-7 14-16 0-10-17-11-21-1" fill="none" stroke="#8b8f8c" strokeWidth="3" strokeLinecap="round" />
    <path d="M120 32 17 80Q9 87 20 88h200q11-1 3-8L120 32Z" fill="none" stroke={`url(#${gradient})`} strokeWidth="5" strokeLinejoin="round" />
    {bottom && <g fill="#737873"><rect x="54" y="80" width="12" height="17" rx="3" /><rect x="174" y="80" width="12" height="17" rx="3" /></g>}
  </svg>;
}

function ClothingRail({ garments, assets }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const reduced = useMotionPreference();
  const stage = useRef(null);
  const gesture = useRef(null);
  const wheelAt = useRef(0);
  const count = garments.length;
  const step = direction => setActive(value => (value + direction + count) % count);

  useEffect(() => {
    if (reduced || paused || engaged || count < 2) return;
    // Move the hangers from left to right. Stop when the rail is offscreen.
    const timer = window.setInterval(() => {
      if (document.hidden || !stage.current) return;
      const rect = stage.current.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) setActive(value => (value - 1 + count) % count);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [reduced, paused, engaged, count]);

  useEffect(() => {
    const element = stage.current;
    const wheel = event => {
      // Keep ordinary vertical scrolling available for the page.
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY) && !event.shiftKey) return;
      const delta = event.deltaX || event.deltaY;
      if (Math.abs(delta) < 8) return;
      event.preventDefault();
      if (performance.now() - wheelAt.current < 450) return;
      wheelAt.current = performance.now();
      setPaused(true);
      setActive(value => (value + (delta > 0 ? 1 : -1) + count) % count);
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [count]);

  return <div className="clothing-rail" onPointerEnter={() => setEngaged(true)} onPointerLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}>
    <div ref={stage} className="rail-stage" role="region" aria-roledescription="carousel" aria-label="NEP2UNE clothing designed by Kyle" tabIndex={0}
      onKeyDown={event => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); setPaused(true); step(event.key === "ArrowRight" ? 1 : -1); } }}
      onTouchStart={event => { gesture.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => { if (!gesture.current) return; const dx = event.changedTouches[0].clientX - gesture.current.x; const dy = event.changedTouches[0].clientY - gesture.current.y; if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) { setPaused(true); step(dx < 0 ? 1 : -1); } gesture.current = null; }}>
      <div className="rail-line" aria-hidden="true" />
      {garments.map((garment, index) => {
        let offset = (index - active + count) % count;
        if (offset > count / 2) offset -= count;
        const selected = offset === 0;
        return <div key={garment.id} className={`rail-piece ${garment.category === "bottom" ? "rail-bottom" : "rail-top"}`} aria-hidden={!selected} style={{ "--offset": offset, "--distance": Math.abs(offset), zIndex: count - Math.abs(offset) }}>
          <Hanger bottom={garment.category === "bottom"} />
          <img src={assets[garment.id].src} alt={garment.name} draggable="false" width={280} height={360} decoding="async" />
        </div>;
      })}
    </div>
    <div className="rail-controls">
      <button type="button" aria-label="Previous garment" onClick={() => { setPaused(true); step(-1); }}><ChevronLeft size={18} /></button>
      <div className="rail-caption" aria-live={paused || engaged || reduced ? "polite" : "off"} aria-atomic="true"><span>{garments[active].name}</span><small>NEP2UNE · {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</small></div>
      <button type="button" aria-label="Next garment" onClick={() => { setPaused(true); step(1); }}><ChevronRight size={18} /></button>
      {!reduced && <button type="button" className="rail-pause" aria-label={paused ? "Play clothing animation" : "Pause clothing animation"} onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}
    </div>
    <p className="rail-hint">A few things I’ve made. Scroll sideways or take a look →</p>
  </div>;
}

function ProjectVisual({ slug }) {
  if (slug === "pxi") return <div className="work-visual work-visual-pxi">
    {["camera", "passport-cover", "studio-tickets"].map((screen, index) => <img key={screen} src={`/assets/pxi/${screen}.webp`} alt={["Shared event camera", "Personal Passport", "Event Studio"][index]} loading="lazy" decoding="async" width={508} height={1100} style={{ "--screen-angle": `${(index - 1) * 6}deg`, "--screen-y": `${index === 1 ? -12 : 10}px` }} />)}
  </div>;
  if (slug === "nep2une") return <div className="work-visual work-visual-nep"><img src="/assets/nep/ph-lookbook-duo.webp" alt="NEP2UNE campaign photography featuring my clothing designs" loading="lazy" decoding="async" /></div>;
  return <div className="work-visual work-visual-s2s"><div className="work-browser"><div className="window-bar"><span>● ● ●</span><span>sweat2swim.com</span><span /></div><img src="/assets/s2s/hero.webp" alt="Sweat2Swim release homepage I designed in Shopify" loading="lazy" decoding="async" /></div></div>;
}

function SelectedWork({ projects, order, go }) {
  const grid = useRef(null);
  const reduced = useMotionPreference();
  const [unfolded, setUnfolded] = useState(reduced);
  useEffect(() => {
    const element = grid.current;
    const arrange = () => {
      [...element.children].forEach(card => {
        card.style.setProperty("--stack-x", `${element.clientWidth / 2 - card.offsetLeft - card.clientWidth / 2}px`);
        card.style.setProperty("--stack-y", `${130 - card.offsetTop - card.clientHeight / 2}px`);
      });
    };
    arrange();
    const resize = new ResizeObserver(arrange);
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setUnfolded(true); observer.disconnect(); } }, { threshold: .08 });
    observer.observe(element);
    return () => { observer.disconnect(); resize.disconnect(); };
  }, []);
  const move = event => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", `${-((event.clientY - box.top) / box.height - .5) * 5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - box.left) / box.width - .5) * 5}deg`);
  };
  const reset = event => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); };
  return <section id="work" className="selected-work" aria-labelledby="work-h">
    <div className="home-section-head"><div><p className="home-eyebrow">01 / SELECTED WORK</p><h2 id="work-h">Ideas out in <em>the world.</em></h2></div><p>Three projects. From idea to shipped.</p></div>
    <div ref={grid} className={`work-grid ${unfolded || reduced ? "is-unfolded" : "is-stacked"}`}>
      {order.map((slug, index) => {
        const project = projects[slug]; const copy = PROJECT_COPY[slug];
        return <article key={slug} className={`work-card work-card-${slug}`} style={{ "--card-index": index }}>
          <a href={`#/work/${slug}`} className="work-card-link" onClick={event => { event.preventDefault(); go({ name: "case", slug }); }} onPointerMove={move} onPointerLeave={reset} onFocus={() => setUnfolded(true)} aria-label={`${project.name}: ${copy.title} View case study`}>
            <ProjectVisual slug={slug} />
            <div className="work-card-body"><div className="work-card-topline"><span className="work-brand"><span className={`brand-dot brand-dot-${slug}`} />{project.name}</span><span className="work-status">{copy.status}</span></div>
              <h3>{copy.title}</h3><p>{copy.summary}</p><div className="work-card-foot"><span>{copy.detail}</span><ArrowUpRight size={20} aria-hidden="true" /></div>
            </div>
          </a>
        </article>;
      })}
    </div>
  </section>;
}

function LinkedInMark() {
  return <span className="linkedin-mark" aria-hidden="true">in</span>;
}

function GlassDock({ site, scrollTo, go }) {
  const item = (label, Icon, className) => <><span className={`dock-tile ${className}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span></>;
  return <nav className="glass-dock" aria-label="Portfolio shortcuts">
    <button type="button" onClick={() => scrollTo("work")}>{item("Work", FolderOpen, "dock-blue")}</button>
    <a href={site.resumeUrl} target="_blank" rel="noreferrer">{item("Resume", FileText, "dock-cream")}</a>
    <a href={site.linkedin} target="_blank" rel="noreferrer">{item("LinkedIn", LinkedInMark, "dock-blue")}</a>
    <a href={site.github} target="_blank" rel="noreferrer">{item("GitHub", Code2, "dock-gray")}</a>
    <button type="button" onClick={() => go({ name: "studio" })}>{item("Create", Shirt, "dock-pink")}</button>
  </nav>;
}

export default function Home({ go, scrollTo, site, garments, garmentAssets, projects, order }) {
  return <main id="main" className="portfolio-home">
    <section className="home-hero" aria-labelledby="home-hero-h">
      <div className="home-hero-copy"><p className="home-eyebrow">HELLO, I’M KYLE.</p><h1 id="home-hero-h">I design<br />experiences.<br /><em>And build them.</em></h1>
        <p className="home-hero-description">Product designer & frontend developer.<br />From mobile moments to clothes you keep.</p>
        <p className="home-hero-role">Head of Mobile UI Design @ PXI Labs<br />SDSU · Computer Science · December 2026</p>
        <button type="button" className="home-work-link" onClick={() => scrollTo("work")}>Explore my work <ArrowDown size={16} aria-hidden="true" /></button>
      </div>
      <ClothingRail garments={garments} assets={garmentAssets} />
      <span className="hero-corner-note">DESIGNED WITH INTENTION. BUILT TO BE USED.</span>
    </section>
    <SelectedWork projects={projects} order={order} go={go} />
    <section id="clothes" className="clothing-showcase" aria-labelledby="clothes-h">
      <div className="home-section-head"><div><p className="home-eyebrow">02 / OFF THE SCREEN</p><h2 id="clothes-h" className="block-heading">Clothes<br />I’ve made.</h2></div><p>NEP2UNE. From a sketch to something you can wear.</p></div>
      <div className="clothing-windows">{CLOTHING_SHOWCASE.map((piece, index) => <div key={piece.id} className={`clothing-window clothing-window-${index}`}><div className="window-bar"><span>● ● ●</span><span>{piece.title}</span><span /></div>
        {piece.src ? <img src={piece.src} alt={piece.alt} loading="lazy" decoding="async" /> : <div className="clothing-placeholder"><Shirt size={index === 0 ? 56 : 38} strokeWidth={.7} aria-hidden="true" /><span>{piece.title}</span><small>Coming into focus soon.</small></div>}
      </div>)}</div>
      <div id="play" className="create-strip"><p>A little room to play.<br /><em>Make something of your own.</em></p><div><button type="button" className="home-pill" onClick={() => go({ name: "studio" })}>Create a shirt <ArrowUpRight size={16} /></button><a href="#/gallery" onClick={event => { event.preventDefault(); go({ name: "gallery" }); }}>Visitor gallery <ArrowUpRight size={15} /></a></div></div>
    </section>
    <section id="about" className="home-about" aria-labelledby="about-h"><h2 id="about-h">Designer brain.<br /><em>Developer hands.</em></h2><div><p>I’m Kyle, a product designer with a computer science background. I design mobile experiences at PXI Labs, build Shopify storefronts, and run NEP2UNE, my independent clothing brand.</p><p className="home-skills">Figma · React · TypeScript · CSS · Shopify · Interaction design</p></div></section>
    <section id="contact" className="home-contact" aria-labelledby="contact-h"><h2 id="contact-h">Let’s make something <em>people remember.</em></h2><a className="home-pill" href={`mailto:${site.email}`}><Mail size={17} /> Say hello <ArrowUpRight size={16} /></a></section>
    <GlassDock site={site} scrollTo={scrollTo} go={go} />
  </main>;
}
