import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, FileText, FolderOpen, Code2, Mail, Shirt } from "lucide-react";
import "./home.css";
import ClothingRail from "./ClothingRail.jsx";

// A short preview of the full NEP2UNE archive.
const CLOTHING_SHOWCASE = [
  { id: "collection", title: "VESSEL / the lookbook", src: "/assets/nep/current/exp-04-bl-vessel-2.webp", alt: "NEP2UNE VESSEL styled in a full outfit" },
  { id: "details", title: "SWEATS 02 / detachable stars", src: "/assets/nep/current/sweats-02-gray-1.webp", alt: "The detachable stars on NEP2UNE SWEATS 02" },
  { id: "process", title: "CANVAS / lace & construction", src: "/assets/nep/current/exp-02-canvas-jacket-navy-2.webp", alt: "Lace construction on the NEP2UNE canvas jacket" },
];

const PROJECT_COPY = {
  pxi: { title: "Making nights into memories.", summary: "Camera personality, interaction prototypes, and a shared event experience.", status: "Mobile product", detail: "Mobile UI & frontend implementation" },
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
  return <nav className="glass-dock" aria-label="Portfolio shortcuts" onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--glass-x", `${(event.clientX - box.left) / box.width * 100}%`); }} onPointerLeave={event => event.currentTarget.style.setProperty("--glass-x", "35%")} >
    <button type="button" onClick={() => scrollTo("work")}>{item("Work", FolderOpen, "dock-blue")}</button>
    <a href={site.resumeUrl} target="_blank" rel="noreferrer">{item("Resume", FileText, "dock-cream")}</a>
    <a href={site.linkedin} target="_blank" rel="noreferrer">{item("LinkedIn", LinkedInMark, "dock-blue")}</a>
    <a href={site.github} target="_blank" rel="noreferrer">{item("GitHub", Code2, "dock-gray")}</a>
    <button type="button" onClick={() => go({ name: "creations" })}>{item("Create", Shirt, "dock-pink")}</button>
  </nav>;
}

export default function Home({ go, scrollTo, site, projects, order }) {
  const reduced = useMotionPreference();
  return <main id="main" className="portfolio-home">
    <section className="home-hero" aria-labelledby="home-hero-h">
      <div className="home-hero-copy"><p className="home-eyebrow">HELLO, I’M KYLE.</p><h1 id="home-hero-h">I design how<br />things look, feel,<br /><em>and work.</em></h1>
        <p className="home-hero-description">Product & UI/UX designer with a fashion designer’s eye.<br />Thoughtful details, from the interface to the garment.</p>
        <p className="home-hero-role">Head of Mobile UI Design @ PXI Labs<br />SDSU · Computer Science · December 2026</p>
        <button type="button" className="home-work-link" onClick={() => scrollTo("work")}>Explore my work <ArrowDown size={16} aria-hidden="true" /></button>
      </div>
      <ClothingRail reduced={reduced} />
      <span className="hero-corner-note">DESIGNED WITH INTENTION. BUILT TO BE USED.</span>
    </section>
    <SelectedWork projects={projects} order={order} go={go} />
    <section id="clothes" className="clothing-showcase" aria-labelledby="clothes-h">
      <div className="home-section-head"><div><p className="home-eyebrow">02 / OFF THE SCREEN</p><h2 id="clothes-h" className="clothes-heading">Clothes<br />I’ve made.</h2></div><p>NEP2UNE. From a sketch to something you can wear.</p></div>
      <div className="clothing-windows">{CLOTHING_SHOWCASE.map((piece, index) => <div key={piece.id} className={`clothing-window clothing-window-${index}`}><div className="window-bar"><span>● ● ●</span><span>{piece.title}</span><span /></div>
        {piece.src ? <img src={piece.src} alt={piece.alt} loading="lazy" decoding="async" /> : <div className="clothing-placeholder"><Shirt size={index === 0 ? 56 : 38} strokeWidth={.7} aria-hidden="true" /><span>{piece.title}</span><small>Coming into focus soon.</small></div>}
      </div>)}</div>
      <div id="play" className="create-strip"><p>The garments. The shoots.<br /><em>The story behind it all.</em></p><div><a className="home-pill" href="#/creations">Explore NEP2UNE <ArrowUpRight size={16} /></a><button type="button" onClick={() => go({ name: "studio" })}>Create a shirt <ArrowUpRight size={15} /></button></div></div>
    </section>
    <section id="about" className="home-about" aria-labelledby="about-h"><h2 id="about-h">Designer brain.<br /><em>Developer hands.</em></h2><div><p>I’m Kyle, a product designer with a computer science background. I design mobile experiences at PXI Labs, build Shopify storefronts, and run NEP2UNE, my independent clothing brand.</p><p className="home-skills">Figma · React · TypeScript · CSS · Shopify · Interaction design</p></div></section>
    <section id="contact" className="home-contact" aria-labelledby="contact-h"><h2 id="contact-h">Let’s make something <em>people remember.</em></h2><a className="home-pill" href={`mailto:${site.email}`}><Mail size={17} /> Say hello <ArrowUpRight size={16} /></a></section>
    <GlassDock site={site} scrollTo={scrollTo} go={go} />
  </main>;
}
