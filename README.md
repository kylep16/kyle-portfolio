# Kyle — Portfolio

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
