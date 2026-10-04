# Kyle Potente's Portfolio

React + Vite. The app keeps a compact homepage, three editorial case studies,
a NEP2UNE creations archive, a shirt studio, and a local visitor gallery.

## Run locally

```sh
npm ci
npm run dev
npm run build
npm run lint
```

## Deploy

The connected GitHub repository deploys to Vercel on updates to `main`.

## Content and routes

| Content | File | Route |
| --- | --- | --- |
| Short homepage and animated hanger rail | `src/Home.jsx`, `src/home.css` | `#/` |
| Case-study copy and approved media | `src/caseStudies.js` | `#/work/pxi`, `#/work/nep2une`, `#/work/sweat2swim` |
| Case-study renderer and shared media panels | `src/CaseStudy.jsx`, `src/editorial.css` | All case-study routes |
| Brand story and lookbook | `src/Creations.jsx` | `#/creations` |
| Current garments and future photo slots | `src/brandData.js` | `#/creations` |
| Shirt creator, visitor gallery, site details, changelog | `src/App.jsx` | `#/studio`, `#/gallery`, `#/changelog` |

Create in the main navigation and glass dock opens the NEP2UNE archive. The shirt
creator remains accessible from the archive and homepage. Gallery data uses
localStorage; it is local to the visitor's browser.

## Photography template

`public/NEP2UNE_Photo_Upload_Template.md` is downloadable from the creations page.
It lists the next campaign's setting, outfit, detail, candid, and sample slots.
Add a chapter in `src/Creations.jsx` with a title, short narrative, captions, and
credits, replacing its `MediaSlot` components with `Figure` components. Images
live in `public/assets/nep/`. Use `fit="contain"` for uncropped photos or UI exports;
use `fit="cover"` only when a crop preserves the subject.

All editorial media panels use a bounded 4:3 stage, at most 453 × 340 CSS pixels.
On narrow screens they form one column. The garment index has a separate 4:5
product stage, with front photography and a detail revealed on hover or focus.

## Sources and design status

The October 2026 catalog snapshot and current photography come from the owner's
public https://nep2une.shop storefront and its product JSON. Product descriptions
use confirmed materials and construction details. Website publication dates are
not claimed as release dates. Eight garments are included in `src/brandData.js`.

The case-study hierarchy was informed by https://www.cindyly.design/work/reddit:
short overview, metadata, clear section headings, decisions, captions, reflection,
and chapter navigation. Case studies have a sticky side index on desktop and a
scrollable chapter bar on mobile, with the current section highlighted as you
read. Project content and outcomes are Kyle's existing work.

PXI's older public camera assets are explicitly labeled as the shipped baseline.
The newer camera direction is a prototype. The new disc section is a media
walkthrough template until its states, purpose, status, and approved exports are
provided. No new private Figma screenshots are included in this release.

## Homepage motion and typography

The hanger carousel shares the eight product identities in `src/brandData.js`.
Its catalog names match the public storefront, and each selected piece links to
its product page. Add a product there and prepare a transparent, trimmed image
in `public/assets/clothes/rail/`, then add its measured fit in `src/HungGarment.jsx`.
That component layers the real photograph between the hanger shoulders and
foreground hardware. Pants use two front clips positioned over the waistband;
tops show a wooden hanger at the neckline. Rebuild the existing cutouts with
`python scripts/build-rail-assets.py` (requires Pillow).

`src/ClothingRail.jsx` runs a spring for horizontal travel and a damped pendulum
for hanger rotation. Pointer movement nudges the selected garment. The motion
loop stops when the hangers settle, leave the viewport, or the tab is hidden.
The physics unit checks run with `node --test scripts/test-hanger-physics.mjs`. The rail
supports arrows, keyboard, horizontal wheel input, and touch swipes. Autoplay
pauses on hover/focus, offscreen, and in hidden tabs. Reduced motion disables
carousel autoplay, travel springs, hanger swing, card transitions, and garment
entrance animation. Glass navigation uses translucent layers, backdrop blur,
saturation, rim highlights, and an opaque fallback when blur is unavailable.
The mobile dock uses a more opaque surface, bold labels, and larger touch targets
to stay readable over campaign photography.

Body copy uses `Helvetica, 'Helvetica Neue', Arial, sans-serif`, with an OS font
fallback where Helvetica is unavailable. Instrument Serif is served locally;
its license is in `public/assets/fonts`. The clothing showcase heading also uses
bold Helvetica. The original Kyle Block font and its build script are retained
as archived assets.

Add updates to `CHANGELOG` in `src/App.jsx`; the footer uses the newest date.
