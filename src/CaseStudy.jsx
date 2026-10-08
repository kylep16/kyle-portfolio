import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ImagePlus, Maximize2, X } from 'lucide-react';
import { CASE_ORDER, CASE_STUDIES } from './caseStudies';
import './editorial.css';
import './pxi-case-study.css';

export function MediaSlot({ id, title, note }) {
  return <figure className="editorial-figure template-figure" data-slot={id}><div className="editorial-media media-slot" aria-label={`${title}: image to be added`}><ImagePlus size={26} strokeWidth={1} aria-hidden="true" /><span>{title}</span><small>{note}</small></div><figcaption>A space for the next part of the story.</figcaption></figure>;
}
export function Figure({ src, caption, fit = 'contain', width = 508, height = 1100, onExpand }) {
  const picture = <img src={src} alt={caption} loading="lazy" decoding="async" width={width} height={height} />;
  return <figure className="editorial-figure">{onExpand
    ? <button type="button" className={`editorial-media fit-${fit} screen-expand`} onClick={() => onExpand({ src, caption })} aria-label={`Enlarge screen: ${caption}`}>{picture}<span className="screen-expand-icon"><Maximize2 size={16} aria-hidden="true" /><span>View screen</span></span></button>
    : <div className={`editorial-media fit-${fit}`}>{picture}</div>}<figcaption>{caption}</figcaption></figure>;
}

function ScreenViewer({ screen, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (screen && !dialog.current.open) dialog.current.showModal();
    if (!screen && dialog.current.open) dialog.current.close();
  }, [screen]);
  return <dialog ref={dialog} className="pxi-screen-viewer" aria-label="Expanded PXI screen" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
    {screen && <div className="pxi-viewer-content"><button autoFocus type="button" className="pxi-viewer-close" aria-label="Close expanded screen" onClick={() => dialog.current.close()}><X size={20} />Close</button><img src={screen.src} alt={screen.caption} /><p>{screen.caption}</p></div>}
  </dialog>;
}
export function ChapterNav({ sections, label = 'Page chapters', sidebar = false }) {
  const [active, setActive] = useState('overview');
  const nav = useRef(null);
  useEffect(() => {
    const elements = sections.map(section => document.getElementById(section.id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const passed = elements.filter(element => element.getBoundingClientRect().top <= 185);
      setActive((passed.at(-1) || elements[0])?.id || 'overview');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule, true); window.removeEventListener('resize', schedule); };
  }, [sections]);
  useEffect(() => {
    const element = nav.current;
    const link = element.querySelector('[aria-current]');
    if (link && element.scrollWidth > element.clientWidth) {
      const box = element.getBoundingClientRect();
      const target = link.getBoundingClientRect();
      element.scrollLeft += target.left - box.left - (box.width - target.width) / 2;
    }
  }, [active]);
  return <nav ref={nav} className={`chapter-nav${sidebar ? ' chapter-nav-side' : ''}`} aria-label={label}>{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={event => { event.preventDefault(); document.getElementById(section.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setActive(section.id); }}>{section.label}</a>)}</nav>;
}
export default function CaseStudy({ cs, go }) {
  const [screen, setScreen] = useState(null);
  const pxi = cs.slug === 'pxi';
  const next = CASE_STUDIES[CASE_ORDER[(CASE_ORDER.indexOf(cs.slug) + 1) % CASE_ORDER.length]];
  const sections = useMemo(() => [{ id: 'overview', label: 'Overview' }, ...cs.sections], [cs]);
  return <main id="main" className={`editorial-page case-layout study-${cs.slug}`}>
    <aside className="case-sidebar">
      <a className="editorial-back" href="#/" onClick={event => { event.preventDefault(); go({ name: 'home', anchor: 'work' }); }}><ArrowLeft size={15} /> Selected work</a>
      <p className="case-index-label">ON THIS PAGE</p>
      <ChapterNav sections={sections} label="Case study sections" sidebar />
    </aside>
    <article className="case-content">
    <header className="editorial-hero"><p className="editorial-eyebrow"><span className={`brand-dot brand-dot-${cs.slug}`} />{cs.name} / {cs.disciplines}</p><h1>{cs.title}</h1><p className="editorial-deck">{cs.tagline}</p><div className="editorial-tags">{cs.tags.map(tag => <span key={tag}>{tag}</span>)}</div></header>
    {cs.heroFigures && <figure className="pxi-opening"><div className="pxi-opening-stage"><div className="pxi-opening-label"><span>THE PXI EXPERIENCE</span><span>DESIGNED TO CONNECT</span></div><div className="pxi-opening-screens">{cs.heroFigures.map((figure, index) => <div key={figure.src}><span className="pxi-screen-label"><span>0{index + 1}</span>{figure.label}</span><img src={figure.src} alt={figure.alt} width={508} height={1100} decoding="async" fetchPriority={index === 1 ? 'high' : 'auto'} /></div>)}</div></div><figcaption>{cs.heroNote}</figcaption></figure>}
    <section id="overview" className="editorial-section overview-section"><div className="chapter-heading"><p className="editorial-eyebrow">THE SHORT VERSION</p><h2>A minute to get the idea.</h2><p>{cs.summary}</p></div><dl className="editorial-meta">{Object.entries(cs.meta).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="editorial-overview">{cs.overview.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    {cs.sections.map(section => <section key={section.id} id={section.id} className="editorial-section"><div className="chapter-heading"><p className="editorial-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p>{section.lead}</p></div>
      {section.decisions && <div className="editorial-decisions">{section.decisions.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></div>)}</div>}
      {section.journey && <ol className="pxi-journey" aria-label="PXI product journey">{section.journey.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>}
      {(section.figures || section.slots) && <div className={`editorial-gallery${pxi ? ` pxi-screen-gallery pxi-screen-count-${section.figures?.length || 0}` : ''}`}>{section.figures?.map(figure => <Figure key={figure.src} {...figure} onExpand={pxi ? setScreen : undefined} />)}{section.slots?.map(slot => <MediaSlot key={slot.id} {...slot} />)}</div>}
      {section.checks && <div className="pxi-checks"><table><caption>Documented QA and design-review work</caption><thead><tr><th scope="col">Area</th><th scope="col">My contribution</th><th scope="col">Documented result</th></tr></thead><tbody>{section.checks.map(([area, contribution, result]) => <tr key={area}><th scope="row">{area}</th><td>{contribution}</td><td><span className={result.startsWith('Verified') ? 'pxi-check-verified' : 'pxi-check-followup'}>{result}</span></td></tr>)}</tbody></table></div>}
      {section.proof && <dl className="pxi-proof">{section.proof.map(([value, title, note]) => <div key={title}><dt>{title}</dt><dd><strong>{value}</strong><span>{note}</span></dd></div>)}</dl>}
      {section.takeaway && <aside className="pxi-takeaway"><h3>{section.takeaway[0]}</h3><p>{section.takeaway[1]}</p></aside>}
      {section.note && <p className="pxi-section-note">{section.note}</p>}
      {section.link && <a className="editorial-link" href={section.link.href} target={section.link.href.startsWith('https:') ? '_blank' : undefined} rel="noreferrer">{section.link.label}<ArrowUpRight size={16} /></a>}
    </section>)}
    <footer className="editorial-next"><p className="editorial-eyebrow">NEXT PROJECT</p><a href={`#/work/${next.slug}`}>{next.name}<ArrowRight size={28} /></a></footer>
    </article>
    {pxi && <ScreenViewer screen={screen} onClose={() => setScreen(null)} />}
  </main>;
}
