import { FileText, FolderOpen, Code2, Shirt } from 'lucide-react';
import Nep2uneMark from './Nep2uneMark';

function LinkedInMark() {
  return <span className="linkedin-mark" aria-hidden="true">in</span>;
}

export default function GlassDock({ site, scrollTo, go, route }) {
  const item = (label, Icon, className) => <><span className={`dock-tile ${className}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span className="dock-label">{label}</span></>;
  const visit = (event, name) => { event.preventDefault(); go({ name }); };
  return <nav className="glass-dock" aria-label="Main navigation" onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glass-x', `${(event.clientX - box.left) / box.width * 100}%`); }} onPointerLeave={event => event.currentTarget.style.setProperty('--glass-x', '35%')}>
    <button type="button" onClick={() => route.name === 'home' ? scrollTo('work') : go({ name: 'home', anchor: 'work' })}>{item('Work', FolderOpen, 'dock-blue')}</button>
    <a href={site.resumeUrl} target="_blank" rel="noreferrer">{item('Resume', FileText, 'dock-cream')}</a>
    <a href={site.linkedin} target="_blank" rel="noreferrer">{item('LinkedIn', LinkedInMark, 'dock-blue')}</a>
    <a href={site.github} target="_blank" rel="noreferrer">{item('GitHub', Code2, 'dock-gray')}</a>
    <a className="dock-nep" href="#/creations" onClick={event => visit(event, 'creations')} aria-current={route.name === 'creations' ? 'page' : undefined}>{item('NEP2UNE', Nep2uneMark, 'dock-sage')}</a>
    <a href="#/studio" onClick={event => visit(event, 'studio')} aria-current={route.name === 'studio' ? 'page' : undefined}>{item('Create', Shirt, 'dock-pink')}</a>
  </nav>;
}
