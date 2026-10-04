import { UserRound, Shirt } from 'lucide-react';
import Nep2uneMark from './Nep2uneMark';

export default function GlassDock({ scrollTo, go, route }) {
  const item = (label, Icon, className) => <><span className={`dock-tile ${className}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span className="dock-label">{label}</span></>;
  const visit = (event, name) => { event.preventDefault(); go({ name }); };
  return <nav className="glass-dock" aria-label="Main navigation" onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glass-x', `${(event.clientX - box.left) / box.width * 100}%`); }} onPointerLeave={event => event.currentTarget.style.setProperty('--glass-x', '35%')}>
    <button type="button" onClick={() => route.name === 'home' ? scrollTo('about') : go({ name: 'home', anchor: 'about' })}>{item('About Me', UserRound, 'dock-blue')}</button>
    <a className="dock-nep" href="#/creations" onClick={event => visit(event, 'creations')} aria-current={route.name === 'creations' ? 'page' : undefined}>{item('NEP2UNE', Nep2uneMark, 'dock-sage')}</a>
    <a href="#/studio" onClick={event => visit(event, 'studio')} aria-current={route.name === 'studio' ? 'page' : undefined}>{item('Create', Shirt, 'dock-pink')}</a>
  </nav>;
}
