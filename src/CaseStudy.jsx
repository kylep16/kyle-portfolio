import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ImagePlus } from 'lucide-react';
import { CASE_ORDER, CASE_STUDIES } from './caseStudies';
import './editorial.css';

export function MediaSlot({ id, title, note }) {
  return <figure className="editorial-figure template-figure" data-slot={id}><div className="editorial-media media-slot" aria-label={`${title}: image to be added`}><ImagePlus size={26} strokeWidth={1} aria-hidden="true" /><span>{title}</span><small>{note}</small></div><figcaption>A space for the next part of the story.</figcaption></figure>;
}
export function Figure({ src, caption, fit = 'contain' }) {
  return <figure className="editorial-figure"><div className={`editorial-media fit-${fit}`}><img src={src} alt={caption} loading="lazy" decoding="async" /></div><figcaption>{caption}</figcaption></figure>;
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
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
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
    <section id="overview" className="editorial-section overview-section"><div className="chapter-heading"><p className="editorial-eyebrow">THE SHORT VERSION</p><h2>A minute to get the idea.</h2><p>{cs.summary}</p></div><dl className="editorial-meta">{Object.entries(cs.meta).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="editorial-overview">{cs.overview.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    {cs.sections.map(section => <section key={section.id} id={section.id} className="editorial-section"><div className="chapter-heading"><p className="editorial-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p>{section.lead}</p></div>
      {section.decisions && <div className="editorial-decisions">{section.decisions.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></div>)}</div>}
      {(section.figures || section.slots) && <div className="editorial-gallery">{section.figures?.map(figure => <Figure key={figure.src} {...figure} />)}{section.slots?.map(slot => <MediaSlot key={slot.id} {...slot} />)}</div>}
      {section.link && <a className="editorial-link" href={section.link.href} target={section.link.href.startsWith('https:') ? '_blank' : undefined} rel="noreferrer">{section.link.label}<ArrowUpRight size={16} /></a>}
    </section>)}
    <footer className="editorial-next"><p className="editorial-eyebrow">NEXT PROJECT</p><a href={`#/work/${next.slug}`}>{next.name}<ArrowRight size={28} /></a></footer>
    </article>
  </main>;
}
