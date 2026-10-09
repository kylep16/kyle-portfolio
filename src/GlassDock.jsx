import { FolderOpen, UserRound, Shirt } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import Nep2uneMark from './Nep2uneMark';

export default function GlassDock({ scrollTo, go, route }) {
  const dock = useRef(null);
  useLayoutEffect(() => {
    const element = dock.current;
    const measure = () => {
      const bottom = parseFloat(getComputedStyle(element).bottom) || 0;
      element.closest('.site').style.setProperty('--dock-clearance', `${Math.ceil(element.getBoundingClientRect().height + bottom + 16)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
  const item = (label, Icon, className) => <><span className={`dock-tile ${className}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span className="dock-label">{label}</span></>;
  const visit = (event, name) => { event.preventDefault(); go({ name }); };
  return <nav ref={dock} className="glass-dock" aria-label="Main navigation" onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glass-x', `${(event.clientX - box.left) / box.width * 100}%`); }} onPointerLeave={event => event.currentTarget.style.setProperty('--glass-x', '35%')}>
    <button type="button" onClick={() => route.name === 'home' ? scrollTo('work') : go({ name: 'home', anchor: 'work' })}>{item('Work', FolderOpen, 'dock-blue')}</button>
    <a href="#/about" onClick={event => visit(event, 'about')} aria-current={route.name === 'about' ? 'page' : undefined}>{item('About Me', UserRound, 'dock-blue')}</a>
    <a className="dock-nep" href="#/creations" onClick={event => visit(event, 'creations')} aria-current={route.name === 'creations' ? 'page' : undefined}>{item('NEP2UNE', Nep2uneMark, 'dock-sage')}</a>
    <a href="#/studio" onClick={event => visit(event, 'studio')} aria-current={route.name === 'studio' ? 'page' : undefined}>{item('Create', Shirt, 'dock-pink')}</a>
  </nav>;
}
