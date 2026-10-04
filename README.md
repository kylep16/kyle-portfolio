# Welcome To My Portfolio!

Vite + React. Single-component app in `src/App.jsx`.

## Run locally
    npm install
    npm run dev

## Deploy
Push to GitHub, import the repo at vercel.com. Vite is auto-detected.
Every push to `main` redeploys.

## Weekly case study updates
All case study content lives in the `CASE_STUDIES` object at the top of
`src/App.jsx`. Edit copy, sections, and metrics there — no component changes needed.

    git add . && git commit -m "Week of __ update" && git push

## Before sending to recruiters
- Put your résumé at `public/resume.pdf`
- Fill in `SITE.email`, `SITE.linkedin`, `SITE.resumeUrl` in `src/App.jsx`
- Add the NEP2UNE star cursor: set `STAR_CURSOR_SRC` to `/assets/star.png`

## Assets
- `public/assets/clothes/*.webp` — die-cut NEP2UNE garment stickers
- Add garments: drop the processed image in that folder, add an object to `GARMENTS`

## Gallery storage
Uses `localStorage` (see `utils/storage` section in `src/App.jsx`).
A Supabase adapter is written and commented there — swap `const storage = ...` to enable.

## Homepage layout (October 2026)
The homepage lives in `src/Home.jsx`, with styling in `src/home.css`.
It leads with a short introduction and a hanger carousel, followed by the
three case-study cards and a clothing photography section. Full case studies,
the shirt creator and the visitor gallery retain their existing routes.

- Add carousel pieces to `GARMENTS` and `GARMENT_ASSETS` in `src/App.jsx`.
- Add future clothing photography to `CLOTHING_SHOWCASE` in `src/Home.jsx`:
  set each slot's `src` to a public asset path and write its `alt` text.
- Update concise homepage project copy in `PROJECT_COPY`.
- Add dated updates to `CHANGELOG` in `src/App.jsx`; the footer uses the newest date.
- The rail supports arrows, keyboard, horizontal wheel input and touch swipes.
  Its automatic motion pauses on hover/focus, while offscreen, or in a hidden tab.
  Reduced-motion preferences disable autoplay and animated card transitions.

Typography is served locally from `public/assets/fonts`; the third-party font
licenses are alongside the files. `Kyle Block` is an original block display font.
Rebuild it with `python scripts/build-block-font.py` (requires `fonttools`).
