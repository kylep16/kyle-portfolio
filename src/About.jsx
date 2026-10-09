import { ArrowUpRight } from 'lucide-react';
import './about.css';

// Set this to a local asset when Kyle supplies his portrait.
const PORTRAIT = null;

function MinecraftIcon() {
  return <svg viewBox="0 0 112 112" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="minecraft-soil" x1="20" y1="45" x2="76" y2="103" gradientUnits="userSpaceOnUse"><stop stopColor="#986640" /><stop offset="1" stopColor="#64432e" /></linearGradient>
    </defs>
    <path d="M13 42 50 23 89 42 52 63Z" fill="#83bd48" />
    <path d="M13 42 52 63V103L13 82Z" fill="url(#minecraft-soil)" />
    <path d="m52 63 37-21v40l-37 21Z" fill="#574030" />
    <path d="m13 42 39 21v14l-9-5v-6l-9-5v7l-10-5v-9l-11-6Z" fill="#639932" />
    <path d="m52 63 37-21v11l-8 5v8l-10 5v-8l-10 6v9l-9 5Z" fill="#45752c" />
    <path d="m24 38 9-5 10 5-9 5Zm24-12 9 4-9 5-9-5Zm14 14 10-5 9 5-10 5Zm-17 9 9-5 10 5-9 5Z" fill="#a8d264" />
    <path d="m21 68 8 4v7l-8-4Zm17 16 8 4v7l-8-4Z" fill="#b08456" />
    <path d="m63 80 8-4v7l-8 4Zm14-9 7-4v7l-7 4Z" fill="#856145" />
    <g transform="rotate(38 76 40)">
      <path d="M70 24h9v59h-9Z" fill="#483221" />
      <path d="M72 27h4v51h-4Z" fill="#b58a4a" />
      <path d="M51 13h34v7h9v21h-8V29h-8v-7H51Z" fill="#17555a" />
      <path d="M54 15h28v8h9v13h-3V26h-8v-8H54Z" fill="#78e5d8" />
      <path d="M54 19h24v4H54Z" fill="#35b8b2" />
    </g>
  </svg>;
}

function DestinyIcon() {
  return <svg viewBox="0 0 112 112" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="ghost-shell" x1="22" y1="12" x2="90" y2="98" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".55" stopColor="#e2e7ed" /><stop offset="1" stopColor="#a9b7c6" /></linearGradient>
      <radialGradient id="ghost-eye"><stop stopColor="#e7ffff" /><stop offset=".45" stopColor="#70deff" /><stop offset="1" stopColor="#1979b9" /></radialGradient>
    </defs>
    <path d="m56 7 17 27 32 22-32 20-17 29-18-29L7 56l31-22Z" fill="url(#ghost-shell)" stroke="#8090a3" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m56 7 1 30-19-3Zm49 49-31 1-1-23ZM56 105l-1-31 18 2ZM7 56l30-1 1 21Z" fill="#c2ced9" />
    <path d="m38 34 18 3 17-3 1 23-1 19-18-2-17 2-1-21Z" fill="#465262" />
    <path d="m56 12 11 20-10-2Zm43 44-21 12 2-11ZM56 99 44 80l11 2ZM13 56l20-12-2 11Z" fill="#f6f8fa" />
    <circle cx="56" cy="56" r="19" fill="#202d3c" stroke="#8293a3" strokeWidth="2" />
    <circle cx="56" cy="56" r="12" fill="url(#ghost-eye)" />
    <path d="m56 48 8 8-8 8-8-8Z" fill="#dafcff" />
    <circle cx="56" cy="56" r="3" fill="#fff" />
    <path d="m44 22 4 6M84 41l6 4M69 85l-4 6M23 69l6-4" stroke="#7789a0" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

function StarClip() {
  return <svg className="about-star-clip" viewBox="0 0 70 142" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="clip-metal" x1="12" y1="0" x2="54" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#7c817d" /><stop offset=".3" stopColor="#fafbf8" /><stop offset=".5" stopColor="#8a9089" /><stop offset=".7" stopColor="#edf0e9" /><stop offset="1" stopColor="#72786f" /></linearGradient></defs>
    <path d="m35 6 7 15 17 2-12 12 3 17-15-8-15 8 3-17L11 23l17-2Z" stroke="#777c76" strokeWidth="5" strokeLinejoin="round" />
    <path d="m35 6 7 15 17 2-12 12 3 17-15-8-15 8 3-17L11 23l17-2Z" stroke="url(#clip-metal)" strokeWidth="3" strokeLinejoin="round" />
    <path d="M26 47v68a13 13 0 0 0 26 0V64a9 9 0 0 0-18 0v46" stroke="#777c76" strokeWidth="5" strokeLinecap="round" />
    <path d="M26 47v68a13 13 0 0 0 26 0V64a9 9 0 0 0-18 0v46" stroke="url(#clip-metal)" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

function CurrentInterests() {
  return <aside className="about-interests" aria-labelledby="interests-heading">
    <h2 id="interests-heading">Current interests...</h2>
    <ul className="interest-desktop">
      <li><div className="interest-icon interest-minecraft"><MinecraftIcon /></div><span>Minecraft</span></li>
      <li><div className="interest-icon interest-destiny"><DestinyIcon /></div><span>Destiny</span></li>
      <li><div className="interest-icon interest-kidsuper"><div className="interest-photo"><div className="interest-photo-crop"><img src="/assets/about/kidsuper-spring-2026.jpg" alt="KidSuper runway model in a colorful patchwork jacket and green trousers" width="1280" height="1921" decoding="async" /></div></div></div><span>KidSuper<small>Spring 2026 runway</small></span></li>
    </ul>
  </aside>;
}

export default function About() {
  return <main id="main" className="about-page" aria-labelledby="about-title">
    <div className="about-layout">
      <div className="about-portrait">
        <figure className="about-photo-frame">
          {PORTRAIT ? <img className="about-photo" src={PORTRAIT} alt="Kyle Potente" /> : <div className="about-photo-placeholder"><span className="portrait-corner portrait-corner-tl" /><span className="portrait-corner portrait-corner-br" /><p>A photo of me,<br /><em>coming soon.</em></p></div>}
          <figcaption><span>Kyle Potente</span><span>San Diego, CA</span></figcaption>
        </figure>
        <StarClip />
      </div>

      <div className="about-copy">
        <h1 id="about-title">About me</h1>
        <p className="about-greeting">Hey, I’m Kyle.</p>
        <p>I’m a product and UI/UX designer from San Diego, studying Computer Science at San Diego State University.</p>
        <p>My creative work started with clothing. Through NEP2UNE, I began designing pieces I wanted to see in the world. Building the brand meant thinking about more than the garments. I also cared about how people discovered them, experienced the website, and connected with the story behind each release.</p>
        <p>Combining that creative background with my computer science degree is what made me fall in love with web development, product design, and UI/UX. I could bring the same attention to shape, detail, and expression into digital experiences, then use code to bring those ideas to life.</p>
        <p>Today, I bring that perspective to my work as Head of Mobile UI Design at PXI Labs, my e-commerce work, and NEP2UNE. I’m graduating in December 2026 and continuing to explore where fashion, design, and technology meet.</p>
        <a className="about-story-link" href="#/work/nep2une">The story behind NEP2UNE <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>

      <CurrentInterests />
    </div>
  </main>;
}
