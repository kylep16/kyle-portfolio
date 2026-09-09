import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Download, Menu, X, Undo2, Redo2,
  Trash2, Eraser, PenLine, Sticker as StickerIcon, Palette, Check, ChevronLeft,
} from "lucide-react";

/* =====================================================================
   PORTFOLIO: Kyle Potente
   Single-file prototype. In the real repo, split into:
   components/  data/  views/  hooks/  utils/
   The section markers below mirror that structure.
   Motion: written as a tiny CSS/React layer (`Reveal`, `stage` state).
   In production swap these for Framer Motion `motion.*` + `AnimatePresence`.
   ===================================================================== */

/* ---------------------------------------------------------------------
   data/site.js
   --------------------------------------------------------------------- */
const SITE = {
  name: "Kyle Potente",
  mark: "K.",
  tagline: "Fear of living an ordinary life.",
  email: "kylep111604@gmail.com",
  linkedin: "https://www.linkedin.com/in/kyle-potente-10159a330/",
  github: "https://github.com/kylep16",
  resumeUrl: "/resume.pdf",
  year: 2026,
};

const OUTFIT_MESSAGES = ["good choice.", "interesting.", "you might be onto something.", "fit approved."];

/* ---------------------------------------------------------------------
   data/caseStudies.js. Never invent metrics.
   --------------------------------------------------------------------- */
const CASE_STUDIES = {
  /* PXI. All imagery exported from the 52-screen production baseline (PXI_Labs). */
  pxi: {
    slug: "pxi",
    name: "PXI Labs",
    year: "2026",
    disciplines: "Mobile product design",
    preview: "Shipped mobile UI connecting events, a shared camera, memories and identity into one product.",
    tagline: "Designing an interconnected mobile social product, from event creation to a Passport that remembers where you have been.",
    role: "Head of Mobile UI Design",
    impact: "52 screens across 10 product systems",
    meta: { Role: "Head of Mobile UI Design", Team: "Founder, engineering, design", Platform: "Mobile (iOS)", Tools: "Figma, React/TSX, CSS", Timeline: "June 2026 to present" },
    quick: {
      Problem: "PXI needed events, a collaborative camera, memories, messaging and identity to feel like one product rather than a set of unrelated utility screens.",
      "My role": "Mobile UI design across the product: interface prototypes in Figma focused on accessibility and usability, front-end changes in TSX and CSS, and customer feedback folded back into the design.",
      "Biggest decision": "Treating the profile as a travel Passport (passport number, visas, citizen approval) so identity, places and memories share one metaphor across the app.",
      Outcome: "A 52-screen shipped baseline across ten product systems with consistent patterns: pill actions, bottom-anchored primary buttons, story progress bars, ticket and passport graphics, and a badge family.",
    },
    sections: [
      { n: "01", title: "Context", blocks: [
        { type: "text", body: "PXI is a mobile social app built around events. I joined an early-stage team in June 2026, working directly with the founder and engineers on the mobile interface across the full user lifecycle: join, build a profile and Passport, discover or create an event, shoot on its shared camera, talk to attendees, revisit memories, and build identity through levels and badges. The camera interface is one focus of my work; the screens below span the wider product." },
        { type: "grid", items: [
          { src: "/assets/pxi/signup.webp", label: "Sign up, in PXI's identity rather than a borrowed utility screen" },
          { src: "/assets/pxi/studio-tickets.webp", label: "The Studio feed: events as stacked tickets" },
          { src: "/assets/pxi/circle-wall.webp", label: "Circle and Wall: the social layer after the event" },
          { src: "/assets/pxi/music-match.webp", label: "Music Match: discovery through listening compatibility" },
        ]},
      ]},
      { n: "02", title: "Decision: capture to memory", blocks: [
        { type: "decision", labels: ["The task and friction", "My decision", "The tradeoff"],
          constraint: "At an event, taking a photo is a two-second action, but deciding what happens to that photo (keep, share, organize) usually gets pushed to a messy camera roll later.",
          response: "The event camera is built around one primary capture action with zoom in thumb reach, and the post-capture choice is explicit and binary: Vault or Discard. Vaulted photos flow to the event album and the Scrapbook automatically.",
          result: "The user makes a small decision immediately instead of a large one never. The cost is an extra tap per photo, which the flow absorbs by keeping both actions on the preview itself." },
        { type: "grid", items: [
          { src: "/assets/pxi/camera.webp", label: "The shared event camera: capture first, zoom in thumb reach" },
          { src: "/assets/pxi/vault-discard.webp", label: "The post-capture decision: Vault or Discard, on the preview" },
          { src: "/assets/pxi/scrapbook-scattered.webp", label: "Scrapbook, expressive: memories scattered like prints" },
          { src: "/assets/pxi/scrapbook-filmstrip.webp", label: "Scrapbook, film strip: the same night as a roll" },
        ]},
        { type: "text", body: "Downstream, the Scrapbook gives those photos multiple ways back: albums by year, an event's own gallery, structured grids, and the expressive compositions above. It is designed to feel like a personal object, not a utility gallery." },
        { type: "visual", src: "/assets/pxi/scrapbook-albums.webp", label: "All Albums: the structured route back through time" },
      ]},
      { n: "03", title: "Decision: Passport onboarding", blocks: [
        { type: "decision", labels: ["The task and friction", "My decision", "The tradeoff"],
          constraint: "Profile setup is the least interesting part of most apps: a stack of form fields with no payoff, in a product where identity needed to connect events, places and memories.",
          response: "One question per screen with clear progress and strong primary actions, and every answer assembles into a travel Passport: cover, identity page, passport number, visas, and an Approved state at the end.",
          result: "Ordinary account data becomes something people want to show off, and the metaphor carries through the whole app. The cost is a longer onboarding sequence than a single form, paced so each screen stays trivial to answer." },
        { type: "grid", items: [
          { src: "/assets/pxi/onboard-name.webp", label: "One question per screen: a name tag, not a form field" },
          { src: "/assets/pxi/passport-cover.webp", label: "The Passport cover: your identity on PXI" },
          { src: "/assets/pxi/passport-profile.webp", label: "The profile as passport: map, visas, citizen status" },
          { src: "/assets/pxi/passport-approved.webp", label: "Approved: onboarding ends with citizenship, not a submit button" },
        ]},
      ]},
      { n: "04", title: "Decision: Face Match consent", blocks: [
        { type: "decision", labels: ["The task and friction", "My decision", "The tradeoff"],
          constraint: "Face Match finds your photos in event albums. Face scanning is exactly the kind of feature that erodes trust when it appears without explanation.",
          response: "The consent screen answers the questions in order: what is collected, why, how it is processed, what is retained, and how to turn it off later, with a plain Not Now action. Green identifies face matching; blue identifies consent.",
          result: "Users opt in with the full picture or skip in one tap. The cost is deliberate friction in front of a headline feature, which is the point: the interface never promises more than the product does." },
        { type: "visual", src: "/assets/pxi/face-match.webp", label: "Face Match: consent, mechanics, retention and opt-out on one screen, with Not Now always available" },
      ]},
      { n: "05", title: "The full scope", blocks: [
        { type: "text", body: "The shipped baseline is 52 screens across ten product systems, all sharing one visual language on a black canvas: purple as primary identity, orange for music and destructive actions, high-contrast type, pill actions, and primary buttons anchored to the bottom of every screen." },
        { type: "grid", items: [
          { src: "/assets/pxi/create-name.webp", label: "Event creation: the event's name stays visible throughout" },
          { src: "/assets/pxi/create-datetime.webp", label: "Date and time as a focused step" },
          { src: "/assets/pxi/create-preview.webp", label: "The preview before commit: name, venue, city, date" },
          { src: "/assets/pxi/wrap-artists.webp", label: "Monthly Wrap: each statistic gets an editorial screen" },
          { src: "/assets/pxi/wrap-friends.webp", label: "Wrap templates make new recap categories cheap to add" },
          { src: "/assets/pxi/passport-level.webp", label: "Passport level and leaderboard" },
          { src: "/assets/pxi/badges.webp", label: "The Odyssey badge family: one shape system, distinct colors" },
        ]},
        { type: "list", items: [
          "Event creation and discovery, ending in a ticket that carries into the Studio feed",
          "Authentication and phone verification in PXI's visual identity",
          "Product onboarding built on three ideas: shared albums, one lens for all, and the Passport",
          "Shared event camera with Vault and Discard",
          "Scrapbook, Time Travel and Gallery memory experiences",
          "Circle, Wall, Event Thread and direct messaging",
          "Profile onboarding and the Passport identity system",
          "Monthly Wrap, a story-format recap built on reusable templates",
          "Passport levels, leaderboard and the Odyssey badge family",
          "Music Match through Spotify, and Face Match with its consent flow",
        ]},
      ]},
      { n: "06", title: "What I own day to day", blocks: [
        { type: "list", items: [
          "Camera interface UI prototypes in Figma, focused on accessibility and usability",
          "Front-end changes in TSX and CSS to improve experience and interface behavior",
          "Gathering and analyzing customer feedback to refine the product design",
          "Interface consistency across the ten systems above",
        ]},
      ]},
      { n: "07", title: "Reflection", blocks: [
        { type: "text", body: "PXI is teaching me to design a product rather than screens: consistency has to survive a roadmap that changes weekly. The hardest problems are balance problems. An expressive identity against mobile usability, trust against a sensitive feature, and emotional reflection experiences against utility flows, all in one voice." },
      ]},
    ],
  },

  /* NEP2UNE. Figures per Kyle's resume: $120K+ lifetime sales, 15 countries,
     12K+ followers, founded November 2021. Sales are lifetime sales, never profit. */
  nep2une: {
    slug: "nep2une",
    name: "NEP2UNE",
    year: "2021 to present",
    disciplines: "Founder, brand and ecommerce",
    preview: "I did not design for a hypothetical client. I founded the brand: $120K+ lifetime sales, 15 countries.",
    tagline: "A founder story: product, brand, storefront, marketing and operations as one system.",
    role: "Founder and creative director",
    impact: "$120K+ lifetime sales, 15 countries",
    meta: { Role: "Sole proprietor and creative director, NEP2UNE Design Studio", Team: "Solo founder with collaborators", Platform: "Apparel + Shopify", Tools: "Figma, Shopify, Illustrator, Photoshop, tech packs", Timeline: "November 2021 to present" },
    quick: {
      Problem: "Turn a small starting budget into a working apparel brand: products people want, a store that sells them, releases that reach an audience, and operations that deliver, without a team or outside capital.",
      "My role": "All of it: product concepts, mockups and technical packs, brand identity, the Shopify storefront and its optimization, ad creative, inventory planning, release strategy, fulfilment and customer operations.",
      "Biggest decision": "Building the brand around one recognizable object, the NEP2UNE star, carried across garments, campaigns and the customization concepts.",
      Outcome: "$120,000+ lifetime sales, customers in 15 countries, 12,000+ followers and 120,000+ likes across social media, running since November 2021.",
    },
    sections: [
      { n: "01", title: "The numbers, defined", blocks: [
        { type: "metrics", items: [["$120K+", "lifetime sales, not profit"], ["15", "countries with customers"], ["12K+", "followers across social media"], ["4+ yrs", "in continuous operation"]] },
        { type: "text", body: "Lifetime sales means gross sales across the brand's life: not revenue from a single release, and not the result of any one design change. Every decision below was made under real financial constraint, with each release funding the next." },
      ]},
      { n: "02", title: "One object, everywhere", blocks: [
        { type: "text", body: "The NEP2UNE star, a rounded irregular four-point mark, is the brand's recognizable element: gingham star patches on tees, star pockets on wide-leg denim, star tags on every garment. Product design and brand design were the same job." },
        { type: "grid", items: [
          { src: "/assets/nep/ph-star-detail.webp", label: "The gingham star on the chest: rivets at the points" },
          { src: "/assets/nep/ph-star-tee.webp", label: "The star tee on model" },
          { src: "/assets/nep/ph-pocket.webp", label: "Star pockets, embroidered and studded, on dark denim" },
          { src: "/assets/nep/ph-flatlay.webp", label: "NDS dark denim: the star carried into hardware" },
        ]},
      ]},
      { n: "03", title: "The detachable star", blocks: [
        { type: "text", body: "The most distinctive product idea: the star is not printed, it is a physical flannel piece riveted at four points, made to come off. Underneath, the back of the star is screen printed with a message the owner only sees when they detach it: a piece of me, with you." },
        { type: "grid", items: [
          { src: "/assets/nep/tp-star-on.webp", label: "Tech pack: star on, riveted at the corners" },
          { src: "/assets/nep/tp-star-off.webp", label: "Tech pack: star off, rivets remain as the mark" },
          { src: "/assets/nep/tp-colorways.webp", label: "Colorway system: shirt and flannel pairs" },
        ]},
        { type: "callout", body: "The Shirt Studio on this site grew out of this idea: a garment the owner changes themselves." },
      ]},
      { n: "04", title: "From concept to production", blocks: [
        { type: "text", body: "I create the product concepts, mockups and technical packs that go to production: colorway systems, construction order for multi-layer pockets, fade references, custom leather and canvas tags, and the notes a manufacturer needs to get it right. Working to production constraints shaped the graphics themselves." },
        { type: "grid", items: [
          { src: "/assets/nep/tp-pocket.webp", label: "Custom pocket: spec drawing beside the produced sample" },
          { src: "/assets/nep/tp-fade.webp", label: "Fade reference: how the wash should behave, front and back" },
          { src: "/assets/nep/tp-sweats-tag.webp", label: "Tag copy in the brand's voice: adapt to everything" },
          { src: "/assets/nep/tp-tag.webp", label: "The NDS EXP 02 label, used across the garment family" },
        ]},
      ]},
      { n: "05", title: "The garments", blocks: [
        { type: "video", src: "/assets/video/cream-turn.mp4", poster: "/assets/video/cream-turn.webp", label: "NDS EXP 02, cream belted wide-leg: studio turn" },
        { type: "video", src: "/assets/video/jacket-turn.mp4", poster: "/assets/video/jacket-turn.webp", label: "The N. work jacket over raw selvedge denim: the back carries the mark" },
        { type: "grid", items: [
          { src: "/assets/nep/ph-lookbook-duo.webp", label: "NDS Denim 01 lookbook" },
          { src: "/assets/nep/ph-indigo-back.webp", label: "NDS Denim 03 Indigo, F/W 25 campaign" },
          { src: "/assets/nep/ph-grey-model.webp", label: "NDS Denim 02 on model" },
          { src: "/assets/nep/ph-green-pants.webp", label: "Star patch wide-leg, the pair on this site's hero figure" },
        ]},
      ]},
      { n: "06", title: "Store, releases and operations", blocks: [
        { type: "text", body: "I designed and optimized the Shopify store around user statistics and tendencies, planned each release end to end, and produced the ad creative myself in Illustrator and Photoshop: work that grew the audience past 12,000 followers and 120,000 likes. Then the unglamorous half: inventory, purchasing, packing and shipping to customers in 15 countries." },
        { type: "grid", items: [
          { src: "/assets/nep/ph-lookbook-grid.webp", label: "Campaign photography, shot for release" },
          { src: "/assets/nep/ph-fulfillment.webp", label: "Release day, the other side: a truck of orders leaving" },
          { src: "/assets/nep/ph-retail.webp", label: "The clothes out in the world" },
        ]},
      ]},
      { n: "07", title: "Inventory as risk management", blocks: [
        { type: "decision", labels: ["The constraint", "My approach", "The result"],
          constraint: "Limited capital, real production minimums, and demand that is unknown until a release goes live.",
          response: "Inventory and release strategy planned together: run sizes matched to what cash flow could absorb, and each launch's sell-through used to plan the next.",
          result: "Four-plus years of operation and $120K+ in lifetime sales without outside capital. Not every launch worked, and the ones that did not changed the next product, price and marketing decisions." },
      ]},
      { n: "08", title: "Reflection", blocks: [
        { type: "text", body: "NEP2UNE is where I learned that product design does not end at the screen. Concept, production, storefront, marketing, inventory and fulfilment are one system, and a designer who understands the whole loop makes better calls at every point in it." },
      ]},
    ],
  },

  /* SWEAT2SWIM. Role per resume: Remote Shopify Ecommerce Intern, June 2026 to present.
     Verified against the live site. Shopify provides cart, checkout and accounts. */
  sweat2swim: {
    slug: "sweat2swim",
    name: "Sweat2Swim",
    year: "2026",
    disciplines: "Shopify ecommerce design",
    preview: "Optimizing the customer-facing storefront for Sweat2Swim's releases, from landing page to cart.",
    tagline: "A release-first Shopify storefront: one path from campaign to purchase.",
    role: "Remote Shopify ecommerce intern",
    impact: "Live at sweat2swim.com",
    meta: { Role: "Remote Shopify Ecommerce Intern", Team: "Brand founders and me", Platform: "Web (Shopify), responsive", Tools: "Shopify website builder, Figma", Timeline: "June 2026 to present" },
    quick: {
      Problem: "Sweat2Swim's storefront needed to introduce each release, present the collection, and move a customer from discovery to checkout, with better engagement than the default pages were producing.",
      "My role": "Optimizing the customer-facing front end: landing pages, product presentation and ecommerce flow, plus building and integrating an email newsletter system for customer communication and retention.",
      "Biggest decision": "Organizing the store around releases and collections, leading with the active drop and a single Shop Now action, instead of a flat catalog.",
      Outcome: "A live storefront carrying the Summer of 1776 release and the S2S x FBSC collaboration, with Gametime and Shop All collections, consistent product cards, and an integrated newsletter.",
    },
    sections: [
      { n: "01", title: "See it live", blocks: [
        { type: "text", body: "The storefront is in production and shopping is open. The fastest way to evaluate this work is to use it." },
        { type: "link", href: "https://sweat2swim.com", label: "Open sweat2swim.com" },
      ]},
      { n: "02", title: "The journey", blocks: [
        { type: "text", body: "One path: arrive through a release campaign, understand the current collection, browse featured products, open a product, review options, add to cart, continue to checkout, join the email list. Every section carries one of those jobs and hands off to the next." },
        { type: "grid", items: [
          { src: "/assets/s2s/hero.webp", label: "The release hero: Summer of 1776, one positioning line, one action" },
          { src: "/assets/s2s/collection.webp", label: "The collection page: campaign photography over a filterable grid" },
          { src: "/assets/s2s/grid.webp", label: "Product cards: consistent names, imagery and pricing across the S2S x FBSC range" },
          { src: "/assets/s2s/pdp.webp", label: "The product page: photography, story, fit and materials, then size and cart" },
        ]},
      ]},
      { n: "03", title: "Decision: release-first structure", blocks: [
        { type: "decision", labels: ["The constraint", "My decision", "The tradeoff"],
          constraint: "A seasonal brand with a few collections needs each release to feel like an event, but Shopify's default structure is a flat catalog.",
          response: "Lead with the active release (Summer of 1776, with the Performance, Redefined positioning) and a single Shop Now action, then organize collections so the current drop is first and everything stays one tap away.",
          result: "The store reads as a release, not a warehouse. The cost is that older products sit one level deeper, mitigated by Shop All and search." },
      ]},
      { n: "04", title: "What I work on vs. what Shopify provides", blocks: [
        { type: "text", body: "Shopify provides the cart, checkout, accounts and the underlying commerce engine. My work is the customer-facing experience composed in the website builder: landing page hierarchy, product presentation, merchandising, the email newsletter system I created and integrated, and the trust surface of contact and policy pages. Design and optimization within platform constraints, not platform engineering." },
      ]},
      { n: "05", title: "What shipped", blocks: [
        { type: "list", items: [
          "Optimized landing pages for engagement and performance, live at sweat2swim.com",
          "Release landing with hero, positioning and Shop Now",
          "Product presentation and ecommerce flow improvements across the S2S x FBSC collaboration",
          "An email newsletter system, created and integrated for customer communication and retention",
        ]},
      ]},
      { n: "06", title: "Reflection", blocks: [
        { type: "text", body: "Ecommerce design is hierarchy: which job each section does and in what order a customer meets them. Working inside a builder puts the craft in composition and merchandising decisions rather than code, a useful constraint to ship against." },
      ]},
    ],
  },
};

/* ---------------------------------------------------------------------
   data/changelog.js: newest first. Add one entry each Friday.
   date: ISO. tags: which projects the week touched. note: one line, plain.
   --------------------------------------------------------------------- */
const CHANGELOG = [
  { date: "2026-09-09", tags: ["PXI", "NEP2UNE", "Sweat2Swim"], note: "Real work on screen: 21 PXI screens from the 52-screen baseline, NEP2UNE tech packs, campaign photography and studio turn videos, and the live Sweat2Swim storefront." },
  { date: "2026-09-08", tags: ["PXI", "Sweat2Swim", "NEP2UNE"], note: "Rewrote all three case studies around shipped work: PXI's ten product systems, the Sweat2Swim storefront, NEP2UNE's founder story." },
  { date: "2026-09-03", tags: ["Site"], note: "Hero character rebuilt as a paper-doll mannequin wearing real NEP2UNE garments. Visitor gallery became a finite exhibition." },
  { date: "2026-08-29", tags: ["Site"], note: "First build: interactive hero, case study templates, shirt studio and visitor gallery." },
];
const LAST_UPDATED = CHANGELOG[0].date;
const fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const CASE_ORDER = ["pxi", "nep2une", "sweat2swim"];

/* ---------------------------------------------------------------------
   data/garments.js: real NEP2UNE pieces (photographic die-cut stickers)
   Add a piece: process its image (transparent bg + off-white border),
   add it to GARMENT_ASSETS at the bottom of this file, add an object here,
   tune `fit`. No component changes needed.
   fit = { cx, cy, w } in figure viewBox units (0 0 300 640); height follows aspect.
   --------------------------------------------------------------------- */
const GARMENTS = [
  { id: "tee-black",   name: "Gingham star tee",      meta: ["NEP2UNE", "HI I'M ✦", "COTTON"], category: "top",    z: 20, fit: { cx: 150, cy: 231, w: 204 } },
  { id: "denim-green", name: "Star patch wide denim", meta: ["NEP2UNE", "NDS 01", "DENIM"],   category: "bottom", z: 10, fit: { cx: 150, cy: 430, w: 178 } },
  { id: "denim-black", name: "NDS wide denim",        meta: ["NEP2UNE", "NDS 02", "DENIM"],   category: "bottom", z: 10, fit: { cx: 150, cy: 424, w: 180 } },
  { id: "denim-cream", name: "Belted wide denim",     meta: ["NEP2UNE", "NDS 03", "DENIM"],   category: "bottom", z: 10, fit: { cx: 150, cy: 430, w: 178 } },
  // { id: "tee-white", name: "Gingham star tee, white", meta: ["NEP2UNE","HI I'M ✦","COTTON"], category: "top", z: 20, fit: { cx: 150, cy: 224, w: 200 } },
];
// layering order: body → top → outerwear → bottom → shoes → hat → accessory (z per garment)
const CATEGORY_REGION = { top: "torso", outerwear: "torso", bottom: "legs", shoes: "legs", hat: "head", accessory: "torso" };
// loose sticker positions around the figure (desktop); up to 6 visible, rest behind "more clothes +"
const STICKER_SLOTS = [
  { left: "-6%", top: "4%", rot: -3 }, { right: "-8%", top: "8%", rot: 2 },
  { left: "-4%", top: "54%", rot: -1 }, { right: "-6%", top: "58%", rot: 3 },
  { left: "22%", top: "84%", rot: -2 }, { right: "20%", top: "84%", rot: 1 },
];

/* Exact NEP2UNE star cursor: paste the cleaned transparent PNG/SVG as a data URI.
   Until it's provided, the cursor falls back to a small dot. */
const STAR_CURSOR_SRC = null;

/* ---------------------------------------------------------------------
   data/studio.js: shirt colors + stickers
   --------------------------------------------------------------------- */
const SHIRT_COLORS = ["#F4F2EC", "#1B1B1B", "#B7B2A4", "#2534E8", "#C8563C", "#D9C3A5", "#3F5E4A", "#E8D8E4"];
const COLOR_NAMES = { "#F4F2EC": "Cream", "#1B1B1B": "Black", "#B7B2A4": "Stone", "#2534E8": "Cobalt", "#C8563C": "Rust", "#D9C3A5": "Sand", "#3F5E4A": "Forest", "#E8D8E4": "Lilac", "#111111": "Ink", "#E5B93B": "Gold" };
const PEN_COLORS = ["#111111", "#F4F2EC", "#2534E8", "#C8563C", "#E5B93B", "#3F5E4A"];

const STICKERS = {
  cursor: { label: "Cursor", draw: () => <path d="M8 4 L8 30 L14 24 L19 34 L24 32 L19 22 L27 22 Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round" /> },
  heart: { label: "Pixel heart", draw: () => <g fill="#C8563C">{[[10,8],[14,8],[22,8],[26,8],[6,12],[30,12],[6,16],[30,16],[10,20],[26,20],[14,24],[22,24],[18,28]].map(([x,y],i)=><rect key={i} x={x} y={y} width="4" height="4"/>)}<rect x="10" y="12" width="16" height="8"/><rect x="14" y="20" width="8" height="4"/></g> },
  smiley: { label: "Smiley", draw: () => <g><circle cx="20" cy="20" r="14" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.5"/><circle cx="15" cy="17" r="1.6" fill="var(--ink)"/><circle cx="25" cy="17" r="1.6" fill="var(--ink)"/><path d="M13 24 Q20 30 27 24" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round"/></g> },
  star: { label: "Star", draw: () => <path d="M20 4 L24 15 L36 15 L26 22 L30 34 L20 27 L10 34 L14 22 L4 15 L16 15 Z" fill="var(--ink)"/> },
  folder: { label: "Folder", draw: () => <g><path d="M5 11 h10 l3 3 h17 v18 h-30 z" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.5"/><path d="M5 17 h30" stroke="var(--ink)" strokeWidth="1.5"/></g> },
  wire: { label: "Wireframe", draw: () => <g stroke="var(--ink)" strokeWidth="1.5" fill="none"><rect x="6" y="6" width="28" height="28"/><rect x="10" y="10" width="20" height="6"/><rect x="10" y="20" width="8" height="10"/><rect x="22" y="20" width="8" height="10"/></g> },
  computer: { label: "Computer", draw: () => <g stroke="var(--ink)" strokeWidth="1.5"><rect x="6" y="7" width="28" height="19" rx="1" fill="#B7B2A4"/><rect x="9" y="10" width="22" height="13" fill="#2534E8" stroke="none"/><rect x="14" y="28" width="12" height="3" fill="var(--ink)"/><path d="M10 33 h20" /></g> },
  flower: { label: "Flower", draw: () => <g>{[0,72,144,216,288].map(a=><ellipse key={a} cx="20" cy="12" rx="4.5" ry="8" fill="#E8D8E4" stroke="var(--ink)" strokeWidth="1.2" transform={`rotate(${a} 20 20)`}/>)}<circle cx="20" cy="20" r="4" fill="#E5B93B" stroke="var(--ink)" strokeWidth="1.2"/></g> },
  flame: { label: "Flame", draw: () => <g><path d="M20 4 C24 12 30 14 30 23 A10 10 0 0 1 10 23 C10 17 15 15 16 10 C17 13 19 14 20 12 Z" fill="#C8563C"/><path d="M20 18 C22 22 25 23 25 27 A5 5 0 0 1 15 27 C15 23 19 22 20 18 Z" fill="#E5B93B"/></g> },
  e404: { label: "404", draw: () => <text x="20" y="26" textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize="19" fontStyle="italic" fill="var(--ink)">404</text> },
  ship: { label: "ship it", draw: () => <g><rect x="3" y="12" width="34" height="16" rx="8" fill="var(--ink)"/><text x="20" y="24" textAnchor="middle" fontFamily="Schibsted Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="var(--paper)">ship it</text></g> },
  globe: { label: "Globe", draw: () => <g stroke="var(--ink)" strokeWidth="1.4" fill="none"><circle cx="20" cy="20" r="14" fill="#DDE3FF"/><ellipse cx="20" cy="20" rx="6" ry="14"/><path d="M6 20 h28 M9 12 h22 M9 28 h22"/></g> },
  pointer: { label: "Hand", draw: () => <path d="M17 8 v14 l-4 -4 c-2 -2 -5 0 -3 3 l7 9 h11 c2 0 4 -2 4 -4 v-8 c0 -2 -3 -2 -3 0 v-2 c0 -2 -3 -2 -3 0 v-2 c0 -2 -3 -2 -3 0 v-6 c0 -2 -3 -2 -3 0 z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round"/> },
};

/* ---------------------------------------------------------------------
   utils/storage.js: swappable persistence adapter
   Studio + gallery only talk to `storage.list()` / `storage.insert()`.
   Entry shape: { id, alias, color, drawing (dataURL), stickers[], createdAt, display }
   No email, no IP, no identifiers. For site analytics use a privacy-first
   tool (Plausible / Fathom) separately from this data.
   --------------------------------------------------------------------- */
const memoryAdapter = (() => {
  let items = seedGallery();
  return {
    async list() { return items.filter(e => e.display); },
    async insert(entry) { items = [entry, ...items]; return entry; },
    async clear() { items = []; },
  };
})();

/* localStorage adapter: active. */
const localAdapter = {
  key: "kyle.gallery.v1",
  async list() {
    try {
      const mine = (JSON.parse(localStorage.getItem(this.key) || "[]")).filter(e => e.display);
      return mine.length ? mine : seedGallery(); // samples by Kyle until this browser has saved shirts
    } catch { return seedGallery(); }
  },
  async insert(entry) { const all = JSON.parse(localStorage.getItem(this.key) || "[]"); localStorage.setItem(this.key, JSON.stringify([entry, ...all])); return entry; },
  async clear() { localStorage.removeItem(this.key); },
};

/* Supabase adapter: table `shirts` (id uuid, alias text null, color text,
   drawing text, stickers jsonb, display bool, created_at timestamptz):
const supabaseAdapter = {
  async list() { const { data } = await supabase.from("shirts").select("*").eq("display", true).order("created_at", { ascending: false }).limit(60); return data ?? []; },
  async insert(entry) { const { data } = await supabase.from("shirts").insert(entry).select().single(); return data; },
};
*/
const storage = localAdapter;

function seedGallery() {
  const seed = (alias, color, stickers, daysAgo) => ({
    id: "seed-" + Math.random().toString(36).slice(2), alias, color, drawing: null,
    stickers, display: true, createdAt: Date.now() - daysAgo * 864e5,
  });
  return [
    seed("Kyle · sample", "#2534E8", [{ id: 1, kind: "star", x: 0.5, y: 0.42, s: 2.6, r: -8 }], 2),
    seed("Kyle · sample", "#F4F2EC", [{ id: 1, kind: "e404", x: 0.5, y: 0.35, s: 2.4, r: 0 }, { id: 2, kind: "cursor", x: 0.7, y: 0.65, s: 1.4, r: 20 }], 5),
    seed("Kyle · sample", "#C8563C", [{ id: 1, kind: "smiley", x: 0.42, y: 0.5, s: 2.2, r: 0 }, { id: 2, kind: "flame", x: 0.68, y: 0.3, s: 1.3, r: 15 }], 9),
    seed("Kyle · sample", "#1B1B1B", [{ id: 1, kind: "ship", x: 0.5, y: 0.5, s: 2.8, r: -4 }], 14),
    seed("Kyle · sample", "#3F5E4A", [{ id: 1, kind: "flower", x: 0.34, y: 0.4, s: 1.8, r: 0 }, { id: 2, kind: "flower", x: 0.66, y: 0.6, s: 1.4, r: 30 }], 20),
  ];
}

/* ---------------------------------------------------------------------
   hooks/
   --------------------------------------------------------------------- */
function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches); const f = e => setR(e.matches); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    setM(q.matches); const f = e => setM(e.matches); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}
function useInView(threshold = 0.15) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ---------------------------------------------------------------------
   components/motion: Reveal (scroll), Magnetic (buttons), Cursor
   --------------------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, v] = useInView(); const rm = useReducedMotion();
  return (
    <Tag ref={ref} className={className} style={{
      opacity: v || rm ? 1 : 0, transform: v || rm ? "none" : "translateY(14px)",
      transition: rm ? "none" : `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
    }}>{children}</Tag>
  );
}
function Magnetic({ children, strength = 0.18, className = "" }) {
  const ref = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  const move = e => { if (rm || mob) return; const r = ref.current.getBoundingClientRect(); const x = (e.clientX - r.left - r.width / 2) * strength; const y = (e.clientY - r.top - r.height / 2) * strength; ref.current.style.transform = `translate(${x}px,${y}px)`; };
  const leave = () => { ref.current.style.transform = ""; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={"magnetic " + className} style={{ transition: "transform .35s cubic-bezier(.2,.7,.2,1)" }}>{children}</div>;
}
function Cursor() {
  const el = useRef(null); const mob = useIsMobile(); const rm = useReducedMotion();
  const [st, setSt] = useState({ hover: false, down: false, native: false });
  useEffect(() => {
    if (mob) return;
    const mv = e => {
      if (el.current) el.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const t = e.target;
      const native = !!t.closest?.("input,textarea,select,[contenteditable]");
      const hover = !native && !!t.closest?.("a,button,[data-cursor],[role=button]");
      setSt(s => (s.hover === hover && s.native === native) ? s : { ...s, hover, native });
    };
    const dn = () => setSt(s => ({ ...s, down: true })); const up = () => setSt(s => ({ ...s, down: false }));
    window.addEventListener("pointermove", mv); window.addEventListener("pointerdown", dn); window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerdown", dn); window.removeEventListener("pointerup", up); };
  }, [mob]);
  if (mob) return null;
  return (
    <div ref={el} className={"cursor " + (st.native ? "is-native " : "") + (st.hover ? "is-hover " : "") + (st.down ? "is-down" : "")} aria-hidden style={{ transition: rm ? "none" : undefined }}>
      {STAR_CURSOR_SRC ? <img src={STAR_CURSOR_SRC} alt="" className="cursor-star" draggable="false" /> : <span className="cursor-dot" />}
    </div>
  );
}

/* ---------------------------------------------------------------------
   components/ui: Button, Section heading, placeholder
   --------------------------------------------------------------------- */
function Button({ children, onClick, href, variant = "primary", icon: Icon, download, className = "", ariaLabel }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = <>{children}{Icon && <Icon size={15} strokeWidth={1.75} aria-hidden />}</>;
  return (
    <Magnetic>
      {href ? <a href={href} download={download} className={cls} aria-label={ariaLabel} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
            : <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>{inner}</button>}
    </Magnetic>
  );
}
function Placeholder({ label, ratio = "4/3", className = "", tone = 0 }) {
  const tones = ["#ECEAE3", "#E4E2DA", "#DCDAD2"];
  return (
    <div className={"placeholder " + className} style={{ aspectRatio: ratio, background: tones[tone % 3] }} role="img" aria-label={`Placeholder for ${label}`}>
      <span>{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------
   components/Navigation
   --------------------------------------------------------------------- */
function Navigation({ route, go, scrollTo }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const links = [["Work", "work"], ["Play", "play"], ["About", "about"]];
  const nav = id => { setOpen(false); if (route.name !== "home") { go({ name: "home", anchor: id }); } else scrollTo(id); };
  return (
    <header className={"nav " + (scrolled ? "nav-scrolled" : "")}>
      <button className="mark" onClick={() => { setOpen(false); go({ name: "home" }); }} aria-label="Home">{SITE.mark}</button>
      <nav className="nav-center" aria-label="Primary">{links.map(([l, id]) => <button key={id} onClick={() => nav(id)}>{l}</button>)}</nav>
      <div className="nav-right">
        {SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}{SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{SITE.github && <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>}
        <button onClick={() => nav("contact")}>Contact</button>
      </div>
      <button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}</button>
      {open && (
        <div className="nav-sheet" role="dialog" aria-label="Menu">
          {links.map(([l, id]) => <button key={id} onClick={() => nav(id)}>{l}</button>)}
          <div className="nav-sheet-divider" />
          {SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}{SITE.linkedin && <a href={SITE.linkedin}>LinkedIn</a>}<button onClick={() => nav("contact")}>Contact</button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------
   components/Character: editorial figure + wardrobe drag-and-drop
   --------------------------------------------------------------------- */
function Figure({ outfit, justEquipped, rm, target }) {
  const worn = Object.values(outfit).filter(Boolean).map(id => GARMENTS.find(g => g.id === id)).sort((a, b) => a.z - b.z);
  return (
    <svg viewBox="0 0 300 640" className="figure" aria-label="Pictogram figure wearing your chosen NEP2UNE pieces" role="img">
      {/* paper-doll mannequin: white body, black outline */}
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round">
        <circle cx="150" cy="72" r="44" />
        <rect x="136" y="112" width="28" height="30" rx="6" />
        {/* arms: hang slightly away from the torso so sleeves read naturally */}
        <rect x="70" y="146" width="28" height="182" rx="14" transform="rotate(8 84 146)" />
        <rect x="202" y="146" width="28" height="182" rx="14" transform="rotate(-8 216 146)" />
        {/* legs */}
        <g className={target === "legs" ? "region-hot" : ""}>
          <rect x="104" y="300" width="44" height="304" rx="14" />
          <rect x="152" y="300" width="44" height="304" rx="14" />
        </g>
        {/* torso: broad rounded shoulders tapering to the waist, hips flare slightly */}
        <path className={target === "torso" ? "region-hot" : ""} d="M104 138 C112 132 188 132 196 138 C206 146 208 160 206 176 L200 246 C198 270 198 290 202 310 L98 310 C102 290 102 270 100 246 L94 176 C92 160 94 146 104 138 Z" />
      </g>
      {/* region hints while dragging */}
      {target === "torso" && <path d="M96 128 C106 120 194 120 204 128 C218 138 218 160 214 180 L208 252 L212 322 L88 322 L92 252 L86 180 C82 160 82 138 96 128 Z" className="region-ring" />}
      {target === "legs" && <rect x="94" y="292" width="112" height="322" rx="24" className="region-ring" />}
      {/* real garments, paper-doll style: scale + translate only */}
      {worn.map(g => { const a = GARMENT_ASSETS[g.id]; const h = g.fit.w / a.aspect; return (
        <image key={g.id} href={a.src} x={g.fit.cx - g.fit.w / 2} y={g.fit.cy - h / 2} width={g.fit.w} height={h}
               className={justEquipped === g.id && !rm ? "snap-in" : ""} style={{ transformOrigin: `${g.fit.cx}px ${g.fit.cy}px` }} preserveAspectRatio="xMidYMid meet" />); })}
    </svg>
  );
}

function GarmentSticker({ g, on, style, onPointerDown, onClick, onKeyDown, ghost }) {
  return (
    <button className={"garment " + (on ? "is-on " : "") + (ghost ? "is-ghost" : "")} style={style}
      onPointerDown={onPointerDown} onClick={onClick} onKeyDown={onKeyDown} aria-pressed={on} aria-label={`${on ? "Take off" : "Wear"} ${g.name}`} data-cursor>
      <img src={GARMENT_ASSETS[g.id].src} alt="" draggable="false" loading="lazy" decoding="async" />
      <span className="g-meta" aria-hidden>{g.meta.join("  ·  ")}</span>
    </button>
  );
}

function Character({ onComplete }) {
  const [outfit, setOutfit] = useState({});
  const [msg, setMsg] = useState(null); const [just, setJust] = useState(null);
  const [drag, setDrag] = useState(null); const [target, setTarget] = useState(null); const [page, setPage] = useState(0);
  const zone = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  const completed = useRef(false); const outfitRef = useRef({});
  const categories = [...new Set(GARMENTS.map(g => g.category))];

  const equip = useCallback(id => {
    const g = GARMENTS.find(x => x.id === id); const o = outfitRef.current;
    const next = { ...o, [g.category]: o[g.category] === id ? undefined : id };
    outfitRef.current = next; setOutfit(next);
    const done = categories.every(c => next[c]);
    if (next[g.category]) { setJust(id); setMsg(done ? "fit approved." : OUTFIT_MESSAGES[Object.values(next).filter(Boolean).length % 3]); }
    else setMsg(null);
    if (done && !completed.current) { completed.current = true; onComplete?.(); }
    setTimeout(() => setJust(null), 700);
  }, [onComplete]);

  const startDrag = (e, g) => {
    if (mob) return; e.preventDefault();
    const start = { x: e.clientX, y: e.clientY, moved: false };
    setDrag({ id: g.id, x: e.clientX, y: e.clientY }); document.body.dataset.drag = "1";
    const region = CATEGORY_REGION[g.category];
    const inZone = (x, y) => { const r = zone.current.getBoundingClientRect(); const pad = 40; return x > r.left - pad && x < r.right + pad && y > r.top - pad && y < r.bottom + pad; };
    const mv = ev => { if (Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 3) start.moved = true; setDrag({ id: g.id, x: ev.clientX, y: ev.clientY }); setTarget(inZone(ev.clientX, ev.clientY) ? region : null); };
    const up = ev => {
      window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up);
      setDrag(null); setTarget(null); delete document.body.dataset.drag;
      if (!start.moved || inZone(ev.clientX, ev.clientY)) equip(g.id);
    };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  const perPage = STICKER_SLOTS.length; const pages = Math.ceil(GARMENTS.length / perPage);
  const visible = mob ? GARMENTS : GARMENTS.slice(page * perPage, page * perPage + perPage);
  const isOn = id => Object.values(outfit).includes(id);
  const dragG = drag && GARMENTS.find(g => g.id === drag.id);

  return (
    <div className={"character " + (mob ? "is-mobile" : "")}>
      <div ref={zone} className="figure-zone" data-cursor>
        <Figure outfit={outfit} justEquipped={just} rm={rm} target={target} />
        <p className={"figure-msg " + (msg ? "show" : "")} aria-live="polite">{msg}</p>
      </div>
      <p className="wardrobe-hint">Style me. {mob ? "Tap a piece to wear it." : "Drag a piece onto the figure, or click it."}
        {Object.values(outfit).some(Boolean) && <button className="reset-outfit" onClick={() => { outfitRef.current = {}; setOutfit({}); setMsg(null); }}>Reset outfit</button>}
      </p>
      <div className={mob ? "garment-tray" : "garment-cloud"} role="group" aria-label="NEP2UNE garments">
        {visible.map((g, i) => {
          const slot = STICKER_SLOTS[i] || {}; const style = mob ? {} : { left: slot.left, right: slot.right, top: slot.top, "--rot": slot.rot + "deg" };
          return <GarmentSticker key={g.id} g={g} on={isOn(g.id)} style={style} ghost={drag?.id === g.id}
            onPointerDown={e => startDrag(e, g)} onClick={() => { if (mob) equip(g.id); }}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); equip(g.id); } }} />;
        })}
        {!mob && pages > 1 && <button className="more-clothes" onClick={() => setPage(p => (p + 1) % pages)}>more clothes +</button>}
      </div>
      {dragG && !rm && <img src={GARMENT_ASSETS[dragG.id].src} alt="" className="garment-drag" style={{ transform: `translate(${drag.x}px,${drag.y}px) translate(-50%,-50%) scale(1.04)` }} aria-hidden />}
    </div>
  );
}

/* ---------------------------------------------------------------------
   components/ProjectPreview: editorial project block (home)
   --------------------------------------------------------------------- */
function ProjectArt({ slug, hovered }) {
  // Tasteful placeholder compositions; swap for real imagery via lazy <img>.
  if (slug === "pxi") return (
    <div className="art art-pxi">
      {[0, 1, 2].map(i => <div key={i} className="phone" style={{ transform: `translate(${(i - 1) * (hovered ? 116 : 108)}%, ${i === 1 ? -6 : 0}%) rotate(${(i - 1) * 3}deg)` }}>
        <div className="phone-bar" /><div className="phone-block" style={{ height: "38%" }} /><div className="phone-row" /><div className="phone-row short" /><div className="phone-block" style={{ height: "22%", marginTop: "auto" }} />
      </div>)}
      <span className="art-label">PXI mobile screens</span>
    </div>);
  if (slug === "sweat2swim") return (
    <div className="art art-s2s">
      <div className="browser"><div className="browser-bar"><i /><i /><i /></div><div className="browser-hero" /><div className="browser-grid">{[0, 1, 2, 3].map(i => <div key={i} />)}</div></div>
      <span className="art-label">Storefront</span>
    </div>);
  return (
    <div className="art art-nep2">
      {["denim-green", "tee-black", "denim-cream"].map((k, i) => (
        <img key={k} src={GARMENT_ASSETS[k].src} alt="" loading="lazy" decoding="async"
             style={{ transform: `rotate(${(i - 1) * 5}deg) translateY(${i === 1 ? -3 : 3}%)` }} />))}
      <span className="art-label">Real NEP2UNE garments, designed and produced by Kyle</span>
    </div>);
}
function ProjectPreview({ cs, go, index }) {
  const [h, setH] = useState(false); const ref = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  const par = e => { if (rm || mob) return; const r = ref.current.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; ref.current.style.setProperty("--px", x * 10 + "px"); ref.current.style.setProperty("--py", y * 10 + "px"); };
  return (
    <Reveal as="article" className={"project " + (index === 0 ? "project-flagship" : "")}>
      <a href={"#" + cs.slug} onClick={e => { e.preventDefault(); go({ name: "case", slug: cs.slug }); }}
         ref={ref} className="project-link" onPointerMove={par} onPointerEnter={() => setH(true)} onPointerLeave={() => { setH(false); ref.current.style.setProperty("--px", "0px"); ref.current.style.setProperty("--py", "0px"); }}
         aria-label={`${cs.name} case study`}>
        <div className="project-media"><ProjectArt slug={cs.slug} hovered={h} /><span className="project-cta">View case study <ArrowRight size={14} aria-hidden /></span></div>
        <div className="project-meta">
          <div className="project-title-row"><h3>{cs.name}</h3><span className="project-year">{cs.year}</span></div>
          <p className="project-disc">{cs.disciplines}</p>
          <p className="project-desc">{cs.preview}</p>
          <p className="project-role"><span>Role</span> {cs.role} {cs.impact && <><span className="dotsep">Shipped</span> {cs.impact}</>}</p>
        </div>
      </a>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------
   views/Home
   --------------------------------------------------------------------- */
function Home({ go, scrollTo }) {
  const [nudge, setNudge] = useState(false);
  return (
    <main id="main">
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h">
        <div className="hero-copy">
          <p className="hero-now"><strong>Kyle Potente</strong> · Head of Mobile UI Design at PXI Labs</p>
          <h1 id="hero-h">I design experiences <em>and build them.</em></h1>
          <p className="hero-body">Product designer with a frontend background: shipping mobile UI at PXI, running my own apparel brand NEP2UNE ($120K+ lifetime sales, 15 countries), and optimizing Sweat2Swim's Shopify storefront.</p>
          <div className="hero-actions">
            <Button onClick={() => scrollTo("work")} icon={ArrowDown}>View my work</Button>
            {SITE.resumeUrl && <Button href={SITE.resumeUrl} variant="ghost" icon={Download} download>Download résumé</Button>}
          </div>
          <p className={"hero-nudge " + (nudge ? "show" : "")} aria-hidden={!nudge}>now see what I actually make <ArrowDown size={13} /></p>
        </div>
        <div className="hero-figure"><Character onComplete={() => setNudge(true)} /></div>
      </section>

      {/* WORK */}
      <section id="work" className="work" aria-labelledby="work-h">
        <div className="section-head"><h2 id="work-h">Selected work</h2><p>Three products. My role in each, and what changed.</p></div>
        {CASE_ORDER.map((s, i) => <ProjectPreview key={s} cs={CASE_STUDIES[s]} go={go} index={i} />)}
      </section>

      {/* PLAY */}
      <section id="play" className="play" aria-labelledby="play-h">
        <Reveal>
          <h2 id="play-h">You've seen what I make.<br /><em>Now make something here.</em></h2>
          <p>Leave your mark on my portfolio. Design a shirt, hang it in the visitor gallery.</p>
          <div className="play-actions"><Button onClick={() => go({ name: "studio" })} icon={ArrowRight}>Make a shirt</Button><Button variant="ghost" onClick={() => go({ name: "gallery" })}>See the gallery</Button></div>
        </Reveal>
        <Reveal delay={120} className="play-wall"><MiniWall /></Reveal>
      </section>

      {/* ABOUT */}
      <section id="about" className="about" aria-labelledby="about-h">
        <Reveal><h2 id="about-h">Designer brain.<br /><em>Developer hands.</em></h2></Reveal>
        <Reveal delay={80} className="about-body">
          <p>I design product interfaces and build them in React. Most of my work happens in small teams where the distance between an idea and a shipped screen has to be short: PXI's mobile app, my own brand NEP2UNE, and Sweat2Swim's storefront. I'm a computer science student at SDSU, graduating December 2026.</p>
          <div className="skills">
            {[["Design", ["Figma", "UI design", "UX", "Prototyping", "Interaction design", "Design systems"]],
              ["Development", ["React", "TypeScript", "TSX", "CSS", "Frontend development", "Shopify"]],
              ["Product", ["Product thinking", "Iteration", "A/B testing", "QA", "Startup environments"]]].map(([k, items]) => (
              <div key={k} className="skill-col"><h3>{k}</h3><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></div>))}
          </div>
          <div className="built">
            <h3>This site is part of the evidence</h3>
            <p>Everything interactive here is code I can walk through: hash routing with focus management and per-page titles, a canvas drawing tool with a bounded print area and a 40-step undo/redo history, pointer-based sticker manipulation with keyboard alternatives (arrow keys nudge, plus and minus scale, r rotates), lazy-loaded garment cutouts processed from my own product photography, prefers-reduced-motion fallbacks throughout, and a storage adapter that keeps gallery shirts in this browser's localStorage with a marked swap point for Supabase. Designed by me, built in React with AI-assisted pair programming; every decision in it is mine to explain. The source is on my GitHub.</p>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact" aria-labelledby="contact-h">
        <Reveal><h2 id="contact-h">Let's make something <em>people remember.</em></h2>
          <div className="contact-actions">
            {SITE.resumeUrl && <Button href={SITE.resumeUrl} icon={ArrowUpRight}>View résumé</Button>}
            {SITE.resumeUrl && <Button href={SITE.resumeUrl} variant="ghost" icon={Download} download>Download résumé</Button>}
            {SITE.linkedin && <Button href={SITE.linkedin} variant="ghost" icon={ArrowUpRight}>LinkedIn</Button>}
            {SITE.email && <Button href={"mailto:" + SITE.email} variant="ghost">Email me</Button>}
            {SITE.github && <Button href={SITE.github} variant="ghost" icon={ArrowUpRight}>GitHub</Button>}
          </div>
          {!(SITE.email || SITE.linkedin || SITE.resumeUrl) && <p className="contact-note">Direct links are being connected. Meanwhile, find me on LinkedIn: Kyle Potente.</p>}</Reveal>
      </section>
    </main>
  );
}

function MiniWall() {
  const [items, setItems] = useState([]);
  useEffect(() => { storage.list().then(l => setItems(l.slice(0, 4))); }, []);
  return <div className="mini-wall" aria-hidden>{items.map((e, i) => <div key={e.id} className="mini-frame" style={{ transform: `translateY(${[0, 18, -10, 8][i]}px)` }}><ShirtArtwork entry={e} /></div>)}</div>;
}

/* ---------------------------------------------------------------------
   views/CaseStudy: recruiter-first template
   --------------------------------------------------------------------- */
function CaseStudy({ cs, go }) {
  const [quick, setQuick] = useState(true);
  const idx = CASE_ORDER.indexOf(cs.slug); const next = CASE_STUDIES[CASE_ORDER[(idx + 1) % CASE_ORDER.length]];
  return (
    <main id="main" className="case">
      <button className="back" onClick={() => go({ name: "home", anchor: "work" })}><ChevronLeft size={14} /> Work</button>
      <header className="case-hero">
        <div className="case-title-row"><h1>{cs.name}</h1><span>{cs.year}</span></div>
        <p className="case-tag">{cs.tagline}</p>
        <dl className="case-meta">{Object.entries(cs.meta).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </header>
      <div className="case-art"><ProjectArt slug={cs.slug} /></div>

      {/* 60-second version */}
      <section className="quick" aria-labelledby="quick-h">
        <div className="quick-head">
          <h2 id="quick-h">60 second version</h2>
          <div className="seg" role="tablist" aria-label="Case study depth">
            <button role="tab" aria-selected={quick} className={quick ? "on" : ""} onClick={() => setQuick(true)}>Quick scan</button>
            <button role="tab" aria-selected={!quick} className={!quick ? "on" : ""} onClick={() => setQuick(false)}>Full story</button>
          </div>
        </div>
        <dl className="quick-grid">{Object.entries(cs.quick).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        {quick && <button className="textlink" onClick={() => setQuick(false)}>Read full story <ArrowRight size={13} /></button>}
      </section>

      {!quick && (<>
        {cs.sections.map(s => (
          <Reveal as="section" key={s.n} className="cs-section" >
            <div className="cs-section-head"><span className="cs-n">{s.n}</span><h2>{s.title}</h2></div>
            <div className="cs-blocks">{s.blocks.map((b, i) => <Block key={i} b={b} />)}</div>
          </Reveal>
        ))}
      </>)}

      <footer className="case-next">
        <p>Next project</p>
        <button className="next-link" onClick={() => go({ name: "case", slug: next.slug })}>{next.name} <ArrowRight size={18} /></button>
      </footer>
    </main>
  );
}
function Block({ b }) {
  switch (b.type) {
    case "text": return <p className="cs-text">{b.body}</p>;
    case "callout": return <p className="cs-callout">{b.body}</p>;
    case "list": return <ul className="cs-list">{b.items.map(x => <li key={x}>{x}</li>)}</ul>;
    case "video": return (
      <figure className="cs-fig">
        <video src={b.src} poster={b.poster} muted loop autoPlay playsInline preload="metadata" controls={false} aria-label={b.label} />
        <figcaption>{b.label}</figcaption>
      </figure>);
    case "link": return <p><a className="textlink" href={b.href} target="_blank" rel="noreferrer">{b.label} <ArrowUpRight size={13} aria-hidden /></a></p>;
    case "visual": return b.src ? (
      <figure className="cs-fig"><img src={b.src} alt={b.alt || b.label} loading="lazy" decoding="async" /><figcaption>{b.label}</figcaption></figure>) : null;
    case "grid": {
      const real = (b.items || []).filter(x => typeof x === "object" && x.src);
      if (!real.length) return null; // asset slots stay hidden until real imagery exists
      return <div className="cs-grid">{real.map(x => <figure key={x.src} className="cs-fig"><img src={x.src} alt={x.alt || x.label} loading="lazy" decoding="async" /><figcaption>{x.label}</figcaption></figure>)}</div>;
    }
    case "beforeAfter": return (b.beforeSrc && b.afterSrc) ? (
      <div className="cs-ba">
        <figure className="cs-fig"><img src={b.beforeSrc} alt={b.before} loading="lazy" /><figcaption>Before: {b.before}</figcaption></figure>
        <figure className="cs-fig"><img src={b.afterSrc} alt={b.after} loading="lazy" /><figcaption>After: {b.after}</figcaption></figure>
      </div>) : null;
    case "decision": {
      const labels = b.labels || ["Constraint", "Decision", "Result"];
      return (
        <div className="decision">
          {[[labels[0], b.constraint], [labels[1], b.response], [labels[2], b.result]].map(([k, v]) => <div key={k}><h3>{k}</h3><p>{v}</p></div>)}
        </div>);
    }
    case "metrics": return <div className="metrics">{b.items.map(([v, l]) => <div key={l} className="metric"><strong>{v}</strong><span>{l}</span></div>)}</div>;
    default: return null;
  }
}

/* ---------------------------------------------------------------------
   components/Shirt: shared shirt geometry + artwork renderer
   Print area in viewBox(0 0 400 460): x118 y140 w164 h210
   --------------------------------------------------------------------- */
const PRINT = { x: 118, y: 140, w: 164, h: 210 };
const CANVAS_W = 328, CANVAS_H = 420; // 2x print area
function ShirtPath({ color }) {
  return (<>
    <path d="M142 40 C150 30 250 30 258 40 L330 66 L352 150 L296 170 L296 424 C250 436 150 436 104 424 L104 170 L48 150 L70 66 Z" fill={color} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
    <path d="M160 46 C170 68 230 68 240 46" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
    <path d="M104 172 L296 172" stroke="rgba(0,0,0,.06)" strokeWidth="1" />
  </>);
}
function StickerGlyph({ kind }) { return <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden>{STICKERS[kind].draw()}</svg>; }
function ShirtArtwork({ entry, showPrintArea = false }) {
  const light = ["#1B1B1B", "#2534E8", "#3F5E4A", "#C8563C"].includes(entry.color) ? "#F4F2EC" : "#111";
  return (
    <svg viewBox="0 0 400 460" className="shirt-svg" role="img" aria-label={`Shirt by ${entry.alias || "anonymous visitor"}`}>
      <defs><clipPath id={"clip-" + entry.id}><rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} /></clipPath></defs>
      <ShirtPath color={entry.color} />
      {showPrintArea && <rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} fill="none" stroke={light} strokeOpacity=".25" strokeDasharray="4 4" />}
      <g clipPath={`url(#clip-${entry.id})`}>
        {entry.drawing && <image href={entry.drawing} x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} />}
        {(entry.stickers || []).map(s => {
          const cx = PRINT.x + s.x * PRINT.w, cy = PRINT.y + s.y * PRINT.h; const size = 20 * s.s;
          return <g key={s.id} transform={`translate(${cx} ${cy}) rotate(${s.r}) scale(${size / 40}) translate(-20 -20)`}>{STICKERS[s.kind].draw()}</g>;
        })}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------
   views/Studio: T-shirt designer (canvas drawing + sticker layer)
   --------------------------------------------------------------------- */
function Studio({ go, onSaved }) {
  const [color, setColor] = useState(SHIRT_COLORS[0]);
  const [tool, setTool] = useState("pen"); const [pen, setPen] = useState(6); const [penColor, setPenColor] = useState(PEN_COLORS[0]);
  const [stickers, setStickers] = useState([]); const [sel, setSel] = useState(null);
  const [panel, setPanel] = useState("draw"); // mobile bottom panel
  const [hist, setHist] = useState([{ drawing: null, stickers: [], color: SHIRT_COLORS[0] }]); const [hi, setHi] = useState(0);
  const [phase, setPhase] = useState("edit"); // edit | tag | frame
  const [alias, setAlias] = useState(""); const [display, setDisplay] = useState(true);
  const [entry, setEntry] = useState(null);
  const canvas = useRef(null); const stage = useRef(null); const printRef = useRef(null); const drawing = useRef(false); const idc = useRef(1);
  const mob = useIsMobile();

  // canvas init
  useEffect(() => { const c = canvas.current; if (!c) return; const ctx = c.getContext("2d"); ctx.lineCap = "round"; ctx.lineJoin = "round"; }, [phase]);

  const snapshot = useCallback((stk = stickers, col = color) => {
    const drawingUrl = canvas.current?.toDataURL() || null;
    setHist(h => { const n = h.slice(0, hi + 1); n.push({ drawing: drawingUrl, stickers: stk, color: col }); return n.slice(-40); });
    setHi(h => Math.min(h + 1, 39));
  }, [stickers, color, hi]);

  const restore = useCallback(s => {
    setStickers(s.stickers); setColor(s.color);
    const c = canvas.current; const ctx = c.getContext("2d"); ctx.clearRect(0, 0, c.width, c.height);
    if (s.drawing) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0); img.src = s.drawing; }
  }, []);
  const undo = () => { if (hi === 0) return; restore(hist[hi - 1]); setHi(hi - 1); };
  const redo = () => { if (hi >= hist.length - 1) return; restore(hist[hi + 1]); setHi(hi + 1); };
  const clear = () => { const c = canvas.current; c.getContext("2d").clearRect(0, 0, c.width, c.height); setStickers([]); setSel(null); setTimeout(() => snapshot([], color), 0); };

  // drawing
  const pos = e => { const r = canvas.current.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * CANVAS_W, y: (e.clientY - r.top) / r.height * CANVAS_H }; };
  const down = e => {
    if (tool === "sticker") return;
    e.preventDefault(); drawing.current = true; setSel(null);
    const ctx = canvas.current.getContext("2d"); const p = pos(e);
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = penColor; ctx.lineWidth = pen * (tool === "eraser" ? 3 : 1) * 2;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y + .1); ctx.stroke();
    canvas.current.setPointerCapture(e.pointerId);
  };
  const move = e => { if (!drawing.current) return; const ctx = canvas.current.getContext("2d"); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
  const up = () => { if (!drawing.current) return; drawing.current = false; snapshot(); };

  // stickers
  const addSticker = kind => { const s = { id: idc.current++, kind, x: .5, y: .5, s: 2, r: 0 }; const n = [...stickers, s]; setStickers(n); setSel(s.id); setTool("sticker"); snapshot(n); };
  const updateSticker = (id, patch) => setStickers(st => st.map(s => s.id === id ? { ...s, ...patch } : s));
  const deleteSticker = id => { const n = stickers.filter(s => s.id !== id); setStickers(n); setSel(null); snapshot(n); };
  const dragSticker = (e, s) => {
    e.stopPropagation(); e.preventDefault(); setSel(s.id); setTool("sticker");
    const r = printRef.current.getBoundingClientRect(); const ox = e.clientX - (r.left + s.x * r.width), oy = e.clientY - (r.top + s.y * r.height);
    const mv = ev => updateSticker(s.id, { x: clamp((ev.clientX - ox - r.left) / r.width, .05, .95), y: clamp((ev.clientY - oy - r.top) / r.height, .05, .95) });
    const upH = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", upH); setStickers(cur => { snapshot(cur); return cur; }); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", upH);
  };
  const handleSticker = (e, s) => { // rotate + scale handle
    e.stopPropagation(); e.preventDefault();
    const r = printRef.current.getBoundingClientRect(); const cx = r.left + s.x * r.width, cy = r.top + s.y * r.height;
    const base = r.width / PRINT.w; // px per viewBox unit
    const mv = ev => { const dx = ev.clientX - cx, dy = ev.clientY - cy; const d = Math.hypot(dx, dy); updateSticker(s.id, { s: clamp(d / (base * 14), .8, 5), r: Math.atan2(dy, dx) * 180 / Math.PI - 45 }); };
    const upH = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", upH); setStickers(cur => { snapshot(cur); return cur; }); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", upH);
  };
  useEffect(() => { const k = e => { if ((e.key === "Backspace" || e.key === "Delete") && sel != null && document.activeElement?.tagName !== "INPUT") deleteSticker(sel); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); });

  const changeColor = c => { setColor(c); snapshot(stickers, c); };
  const hasContent = stickers.length > 0 || hi > 0;

  const finish = async () => {
    const e = { id: "v-" + Date.now(), alias: alias.trim() || null, color, drawing: canvas.current.toDataURL("image/png"), stickers, display, createdAt: Date.now() };
    /* SUPABASE: this is the single insert point → storage.insert(e) */
    await storage.insert(e); setEntry(e); setPhase("frame"); onSaved?.();
  };

  if (phase === "frame" && entry) return <FrameSequence entry={entry} go={go} />;

  const printStyle = { left: PRINT.x / 4 + "%", top: PRINT.y / 4.6 + "%", width: PRINT.w / 4 + "%", height: PRINT.h / 4.6 + "%" };
  const isDark = ["#1B1B1B", "#2534E8", "#3F5E4A", "#C8563C"].includes(color);

  return (
    <main id="main" className="studio">
      <div className="studio-top">
        <button className="back" onClick={() => go({ name: "home", anchor: "play" })}><ChevronLeft size={14} /> Back</button>
        <h1>Shirt studio</h1>
        <div className="studio-hist">
          <button onClick={undo} disabled={hi === 0} aria-label="Undo"><Undo2 size={16} /></button>
          <button onClick={redo} disabled={hi >= hist.length - 1} aria-label="Redo"><Redo2 size={16} /></button>
          <button onClick={clear} aria-label="Clear shirt"><Trash2 size={16} /></button>
        </div>
      </div>

      <div className="studio-body">
        {/* tools */}
        <aside className={"tools " + (mob ? "tools-mobile" : "")} aria-label="Tools">
          {mob && <div className="seg seg-tabs">{[["color", Palette, "Color"], ["draw", PenLine, "Draw"], ["sticker", StickerIcon, "Stickers"]].map(([k, I, l]) => <button key={k} className={panel === k ? "on" : ""} onClick={() => { setPanel(k); if (k === "draw") setTool("pen"); if (k === "sticker") setTool("sticker"); }}><I size={14} /> {l}</button>)}</div>}
          {(!mob || panel === "color") && <div className="tool-group"><h2>Shirt</h2><div className="swatches">{SHIRT_COLORS.map(c => <button key={c} className={"sw " + (color === c ? "on" : "")} style={{ background: c }} onClick={() => changeColor(c)} aria-label={`Shirt color: ${COLOR_NAMES[c] || c}`} aria-pressed={color === c} />)}</div></div>}
          {(!mob || panel === "draw") && <div className="tool-group"><h2>Draw</h2>
            <div className="seg"><button className={tool === "pen" ? "on" : ""} onClick={() => setTool("pen")} aria-pressed={tool === "pen"}><PenLine size={14} /> Pen</button><button className={tool === "eraser" ? "on" : ""} onClick={() => setTool("eraser")} aria-pressed={tool === "eraser"}><Eraser size={14} /> Eraser</button></div>
            <label className="range">Size <input type="range" min="2" max="14" value={pen} onChange={e => setPen(+e.target.value)} /></label>
            <div className="swatches small">{PEN_COLORS.map(c => <button key={c} className={"sw " + (penColor === c ? "on" : "")} style={{ background: c }} onClick={() => { setPenColor(c); setTool("pen"); }} aria-label={`Pen color: ${COLOR_NAMES[c] || c}`} aria-pressed={penColor === c} />)}</div>
          </div>}
          {(!mob || panel === "sticker") && <div className="tool-group"><h2>Stickers</h2>
            <div className="sticker-tray">{Object.entries(STICKERS).map(([k, s]) => <button key={k} onClick={() => addSticker(k)} aria-label={`Add ${s.label} sticker`} title={s.label}><StickerGlyph kind={k} /></button>)}</div>
            {sel != null && <button className="textlink" onClick={() => deleteSticker(sel)}><Trash2 size={13} /> Delete selected</button>}
          </div>}
        </aside>

        {/* stage */}
        <div className="stage" ref={stage}>
          <div className="shirt-wrap" onPointerDown={() => setSel(null)}>
            <svg viewBox="0 0 400 460" className="shirt-svg" aria-hidden><ShirtPath color={color} /><rect x={PRINT.x} y={PRINT.y} width={PRINT.w} height={PRINT.h} fill="none" stroke={isDark ? "#fff" : "#000"} strokeOpacity=".2" strokeDasharray="4 4" /></svg>
            <div className="print" ref={printRef} style={printStyle}>
              <canvas ref={canvas} width={CANVAS_W} height={CANVAS_H} className={"draw-canvas " + (tool === "sticker" ? "passive" : "")}
                onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
                aria-label="Drawing area on the shirt" role="img" />
              {stickers.map(s => (
                <div key={s.id} className={"sticker " + (sel === s.id ? "is-sel" : "")}
                     style={{ left: s.x * 100 + "%", top: s.y * 100 + "%", width: (20 * s.s) / PRINT.w * 100 + "%", transform: `translate(-50%,-50%) rotate(${s.r}deg)` }}
                     onPointerDown={e => dragSticker(e, s)} role="button" tabIndex={0} aria-label={`${STICKERS[s.kind].label} sticker, drag to move`}
                     onKeyDown={e => { const d = e.shiftKey ? .05 : .015; if (e.key === "ArrowLeft") updateSticker(s.id, { x: s.x - d }); if (e.key === "ArrowRight") updateSticker(s.id, { x: s.x + d }); if (e.key === "ArrowUp") updateSticker(s.id, { y: s.y - d }); if (e.key === "ArrowDown") updateSticker(s.id, { y: s.y + d }); if (e.key === "+" || e.key === "=") updateSticker(s.id, { s: Math.min(5, s.s + .2) }); if (e.key === "-") updateSticker(s.id, { s: Math.max(.8, s.s - .2) }); if (e.key === "r") updateSticker(s.id, { r: s.r + 15 }); }}>
                  <StickerGlyph kind={s.kind} />
                  {sel === s.id && <span className="handle" onPointerDown={e => handleSticker(e, s)} aria-label="Resize and rotate" />}
                </div>))}
            </div>
          </div>
          <p className="stage-hint">{tool === "sticker" ? "Drag stickers. Corner handle resizes and rotates. Arrow keys nudge, + and - scale, r rotates." : "Draw inside the dotted print area."}</p>
        </div>
      </div>

      <div className="studio-foot">
        <Button onClick={() => setPhase("tag")} icon={ArrowRight}>Leave my mark</Button>
        {!hasContent && <span className="muted">Add something first. Even a scribble counts.</span>}
      </div>

      {phase === "tag" && (
        <div className="modal-bg" role="dialog" aria-modal="true" aria-labelledby="tag-h">
          <div className="modal">
            <h2 id="tag-h">What should I put on the museum tag?</h2>
            <label>Name or alias<input value={alias} onChange={e => setAlias(e.target.value.slice(0, 24))} placeholder="Anonymous" autoFocus /></label>
            <p className="muted">Totally optional. Your shirt can stay anonymous. No email, ever.</p>
            <label className="check"><input type="checkbox" checked={display} onChange={e => setDisplay(e.target.checked)} /> Display my shirt in the visitor gallery</label>
            <div className="modal-actions"><Button onClick={finish} icon={ArrowRight}>Hang it</Button><button className="textlink" onClick={() => setPhase("edit")}>Keep editing</button></div>
          </div>
        </div>)}
    </main>
  );
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------------------------------------------------------------
   components/FrameSequence: the cinematic framing moment
   stages: 0 controls gone → 1 lift → 2 gallery + frame → 3 pull back → 4 plaque → 5 done
   --------------------------------------------------------------------- */
function FrameSequence({ entry, go }) {
  const rm = useReducedMotion(); const [st, setSt] = useState(rm ? 5 : 0);
  const [count, setCount] = useState(42);
  useEffect(() => { storage.list().then(l => setCount(l.length)); }, []);
  useEffect(() => {
    if (rm) return;
    const t = [400, 1100, 2000, 2900, 3500].map((ms, i) => setTimeout(() => setSt(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, [rm]);
  return (
    <main id="main" className={"frame-seq st-" + st} aria-live="polite">
      <div className="gallery-bg" />
      <div className="framed-wrap">
        <div className="framed">
          <div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" />
          <div className="framed-art"><ShirtArtwork entry={entry} /></div>
        </div>
        <MuseumTag entry={entry} n={count} />
      </div>
      <div className="frame-done">
        <h1>You left your mark.</h1>
        <div className="frame-actions"><Button onClick={() => go({ name: "gallery" })} icon={ArrowRight}>View the gallery</Button><Button variant="ghost" onClick={() => go({ name: "home", anchor: "about" })}>Continue exploring</Button></div>
      </div>
    </main>
  );
}
function MuseumTag({ entry, n }) {
  const yr = new Date(entry.createdAt).getFullYear();
  return (
    <div className="plaque" aria-label="Museum plaque">
      {entry.alias ? <><span className="plaque-t">"Untitled Tee"</span><span>by {entry.alias}</span></> : <><span className="plaque-t">Designed by</span><span>Kyle's visitor #{String(n).padStart(3, "0")}</span></>}
      <span className="plaque-y">{yr}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------
   views/Gallery: visitor wall
   --------------------------------------------------------------------- */
const VISITOR_LINES = ["wow I love that shirt", "what do you think it means?", "I'd wear that", "wait this one's sick", "who made this?", "look at that one", "I like this one", "the details are crazy"];
const rnd = (a, b) => a + Math.random() * (b - a);
function makeVisitor(id, fromLeft = Math.random() < .5) {
  const depth = Math.random() < .4 ? 0 : 1;
  return { id, x: fromLeft ? -8 : 108, dir: fromLeft ? 1 : -1, speed: rnd(.05, .11) * (depth ? 1 : .7), depth, variant: Math.floor(rnd(0, 3)),
    pauseAt: rnd(14, 86), paused: false, pauseLeft: rnd(2500, 5200), didPause: false, bubble: null, bubbleLeft: 0, talkChance: .45, gesture: Math.random() < .3 };
}
function useVisitors(count, rm) {
  const [vs, setVs] = useState(() => Array.from({ length: count }, (_, i) => { const v = makeVisitor(i); if (rm) { v.x = 18 + i * 28; v.paused = true; } return v; }));
  useEffect(() => {
    if (rm) return;
    let last = performance.now(); let nid = 100;
    const t = setInterval(() => {
      const now = performance.now(); const dt = now - last; last = now;
      setVs(list => list.map(v => {
        v = { ...v };
        if (v.bubble) { v.bubbleLeft -= dt; if (v.bubbleLeft <= 0) v.bubble = null; }
        if (v.paused) { v.pauseLeft -= dt; if (v.pauseLeft <= 0) v.paused = false; return v; }
        v.x += v.dir * v.speed * dt / 16;
        if (!v.didPause && Math.abs(v.x - v.pauseAt) < 1) { v.paused = true; v.didPause = true; if (Math.random() < v.talkChance) { v.bubble = VISITOR_LINES[Math.floor(Math.random() * VISITOR_LINES.length)]; v.bubbleLeft = rnd(2200, 3800); } }
        if (v.x < -12 || v.x > 112) { const fresh = makeVisitor(nid++, Math.random() < .5); fresh.x = fresh.dir > 0 ? -12 - rnd(0, 30) : 112 + rnd(0, 30); return fresh; }
        return v;
      }));
    }, 50);
    return () => clearInterval(t);
  }, [rm]);
  return vs;
}
function VisitorFigure({ v, rm }) {
  const walking = !v.paused && !rm;
  return (
    <div className={"visitor " + (v.depth ? "front " : "back ") + (walking ? "walking" : "looking")} style={{ left: v.x + "%", "--flip": v.dir < 0 ? -1 : 1 }} aria-hidden>
      {v.bubble && <span className="bubble">{v.bubble}</span>}
      <svg viewBox="0 0 24 60" className={"vis-svg v" + v.variant}>
        <g className="vis-head"><circle cx="12" cy="7" r="5" /></g>
        <rect x="7" y="13" width="10" height="22" rx="4" />
        {v.gesture && v.paused ? <rect x="15" y="14" width="3.5" height="16" rx="1.75" transform="rotate(-50 16.75 14)" /> : <rect className="arm" x="15.5" y="15" width="3.5" height="18" rx="1.75" />}
        <rect className="arm arm-b" x="5" y="15" width="3.5" height="18" rx="1.75" />
        <rect className="leg leg-a" x="7" y="34" width="4.5" height="24" rx="2" />
        <rect className="leg leg-b" x="12.5" y="34" width="4.5" height="24" rx="2" />
      </svg>
    </div>
  );
}

function Gallery({ go }) {
  const [items, setItems] = useState(null); const [open, setOpen] = useState(null); const [idx, setIdx] = useState(0);
  const track = useRef(null); const rm = useReducedMotion(); const mob = useIsMobile();
  useEffect(() => { storage.list().then(setItems); }, []);
  const PER = 4; const walls = items ? Array.from({ length: Math.max(1, Math.ceil(items.length / PER)) }, (_, i) => items.slice(i * PER, i * PER + PER)) : [];
  const layout = [[1.0, 0], [.72, 40], [.86, -22], [.66, 26]];
  const visitors = useVisitors(mob ? 2 : 3, rm);

  const goTo = i => { const t = track.current; if (!t) return; const n = clamp(i, 0, walls.length - 1); t.scrollTo({ left: n * t.clientWidth, behavior: rm ? "auto" : "smooth" }); };
  const onScroll = () => { const t = track.current; setIdx(Math.round(t.scrollLeft / t.clientWidth)); };
  // desktop: click-drag to pan; wheel → horizontal only while the wall can still move that way
  const dragPan = e => {
    if (mob || e.target.closest("button")) return;
    const t = track.current; const sx = e.clientX, sl = t.scrollLeft; t.style.scrollSnapType = "none"; document.body.dataset.drag = "1";
    const mv = ev => { t.scrollLeft = sl - (ev.clientX - sx); };
    const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); t.style.scrollSnapType = ""; delete document.body.dataset.drag; goTo(Math.round(t.scrollLeft / t.clientWidth)); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };
  useEffect(() => {
    const t = track.current; if (!t || mob) return;
    const wheel = e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad horizontal: native
      const max = t.scrollWidth - t.clientWidth; const atStart = t.scrollLeft <= 1 && e.deltaY < 0; const atEnd = t.scrollLeft >= max - 1 && e.deltaY > 0;
      if (max <= 0 || atStart || atEnd) return; // let the page scroll vertically at the ends
      e.preventDefault(); t.scrollLeft += e.deltaY;
    };
    t.addEventListener("wheel", wheel, { passive: false }); return () => t.removeEventListener("wheel", wheel);
  }, [mob, walls.length]);

  return (
    <main id="main" className="gallery">
      <div className="gallery-head">
        <button className="back" onClick={() => go({ name: "home", anchor: "play" })}><ChevronLeft size={14} /> Home</button>
        <h1>Visitor gallery</h1>
        <p>Shirts made in the studio hang here. <button className="textlink" onClick={() => go({ name: "studio" })}>Add yours <ArrowRight size={13} /></button></p>
        <p className="gallery-note">Saved shirts live in this browser only. Until yours arrive, the samples on the wall are mine.</p>
      </div>
      {items && items.length === 0 && <p className="empty">The wall is empty. Be the first to hang something.</p>}

      <div className="exhibition">
        <div className="wall-track" ref={track} onScroll={onScroll} onPointerDown={dragPan} aria-roledescription="carousel" aria-label="Gallery walls">
          {walls.map((wall, wi) => (
            <section key={wi} className="wall-panel" aria-label={`Wall ${wi + 1} of ${walls.length}`}>
              <div className="wall" role="list">
                {wall.map((e, i) => { const [sc, off] = layout[i % layout.length]; return (
                  <div key={e.id} role="listitem" className="wall-item" style={{ "--sc": sc, "--off": off + "px" }}>
                    <button className="frame-btn" onClick={() => setOpen(e)} aria-label={`Open shirt by ${e.alias || "anonymous"}`}>
                      <div className="framed small"><div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" /><div className="framed-art"><ShirtArtwork entry={e} /></div></div>
                      <span className="plaque tiny"><span>{e.alias || "Anonymous"}</span><span className="plaque-y">{new Date(e.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></span>
                    </button>
                  </div>); })}
              </div>
            </section>))}
        </div>
        {walls.length > 1 && (
          <div className="wall-nav">
            <button onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous wall"><ChevronLeft size={16} /></button>
            <span className="wall-count">Wall {String(idx + 1).padStart(2, "0")} / {String(walls.length).padStart(2, "0")}</span>
            <button onClick={() => goTo(idx + 1)} disabled={idx >= walls.length - 1} aria-label="Next wall"><ArrowRight size={16} /></button>
          </div>)}
      </div>

      <div className="museum-floor" aria-hidden><div className="visitors">{visitors.map(v => <VisitorFigure key={v.id} v={v} rm={rm} />)}</div></div>
      {open && (
        <div className="modal-bg" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div className="modal modal-art" onClick={e => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setOpen(null)} aria-label="Close"><X size={18} /></button>
            <div className="framed big"><div className="frame-edge" /><div className="frame-mat" /><div className="frame-glass" /><div className="framed-art"><ShirtArtwork entry={open} /></div></div>
            <MuseumTag entry={open} n={items.indexOf(open) + 1} />
          </div>
        </div>)}
    </main>
  );
}

function Changelog() {
  const [open, setOpen] = useState(false);
  const shown = open ? CHANGELOG : CHANGELOG.slice(0, 3);
  return (
    <section id="changelog" className="log" aria-labelledby="log-h">
      <div className="log-head">
        <h2 id="log-h">Still building</h2>
        <p>This portfolio updates weekly with work from PXI, Sweat2Swim and NEP2UNE. Last updated {fmtDate(LAST_UPDATED)}.</p>
      </div>
      <ol className="log-list">
        {shown.map(e => (
          <Reveal as="li" key={e.date} className="log-item">
            <time dateTime={e.date}>{fmtDate(e.date)}</time>
            <p className="log-note">{e.note}</p>
            <p className="log-tags">{e.tags.join(" · ")}</p>
          </Reveal>))}
      </ol>
      {CHANGELOG.length > 3 && <button className="textlink" onClick={() => setOpen(o => !o)}>{open ? "Show less" : `All ${CHANGELOG.length} updates`}</button>}
    </section>
  );
}

/* ---------------------------------------------------------------------
   components/Footer
   --------------------------------------------------------------------- */
function Footer({ go, scrollTo, route }) {
  const nav = id => route.name !== "home" ? go({ name: "home", anchor: id }) : scrollTo(id);
  return (
    <footer className="foot">
      <div className="foot-left"><span className="mark-lg">{SITE.mark}</span><p className="foot-tag">{SITE.tagline}</p><p className="muted">© {SITE.year} {SITE.name}</p><button className="foot-stamp" onClick={() => go({ name: "changelog" })}>Updated {fmtDate(LAST_UPDATED)} · changelog</button></div>
      <div className="foot-cols">
        <div><h3>Menu</h3><button onClick={() => nav("work")}>Work</button><button onClick={() => nav("about")}>About</button><button onClick={() => nav("play")}>Play</button><button onClick={() => go({ name: "changelog" })}>Changelog</button>{SITE.resumeUrl && <a href={SITE.resumeUrl}>Résumé</a>}</div>
        <div><h3>Contact</h3>{SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{SITE.email && <a href={"mailto:" + SITE.email}>Email</a>}{SITE.github && <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>}<button onClick={() => nav("contact")}>Contact section</button></div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------
   App: hash routing, titles, focus management
   --------------------------------------------------------------------- */
const VALID_PAGES = ["studio", "gallery", "changelog"];
function parseHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  const p = h.split("/");
  if (p[0] === "work" && CASE_STUDIES[p[1]]) return { name: "case", slug: p[1] };
  if (VALID_PAGES.includes(p[0])) return { name: p[0] };
  return { name: "home" };
}
const hashFor = r => r.name === "case" ? `#/work/${r.slug}` : r.name === "home" ? "#/" : `#/${r.name}`;

function ChangelogPage({ go }) {
  return (
    <main id="main" className="case">
      <button className="back" onClick={() => go({ name: "home" })}><ChevronLeft size={14} /> Home</button>
      <Changelog />
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const pendingAnchor = useRef(null); const rm = useReducedMotion();
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
  const go = next => {
    pendingAnchor.current = next.anchor || null;
    const h = hashFor(next);
    if (window.location.hash === h || (h === "#/" && window.location.hash === "")) setRoute(next);
    else window.location.hash = h;
  };
  useEffect(() => {
    const f = () => setRoute(parseHash());
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    const cs = route.name === "case" ? CASE_STUDIES[route.slug] : null;
    document.title =
      route.name === "home" ? "Kyle Potente | Product Designer Who Builds" :
      cs ? cs.name + " | Kyle Potente" :
      route.name === "studio" ? "Shirt Studio | Kyle Potente" :
      route.name === "gallery" ? "Visitor Gallery | Kyle Potente" : "Changelog | Kyle Potente";
    const a = pendingAnchor.current; pendingAnchor.current = null;
    if (a) { const t = setTimeout(() => scrollTo(a), 80); return () => clearTimeout(t); }
    window.scrollTo(0, 0);
    const m = document.getElementById("main");
    if (m) { m.setAttribute("tabindex", "-1"); m.focus({ preventScroll: true }); }
  }, [route]);
  const view = route.name === "case" ? <CaseStudy cs={CASE_STUDIES[route.slug]} go={go} />
    : route.name === "studio" ? <Studio go={go} />
    : route.name === "gallery" ? <Gallery go={go} />
    : route.name === "changelog" ? <ChangelogPage go={go} />
    : <Home go={go} scrollTo={scrollTo} />;
  return (
    <div className="site" data-route={route.name}>
      <style>{CSS}</style>
      <a href="#main" className="skip">Skip to content</a>
      <Cursor />
      <Navigation route={route} go={go} scrollTo={scrollTo} />
      <div className="page">{view}{route.name !== "studio" && <Footer go={go} scrollTo={scrollTo} route={route} />}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   styles: tokens + components (would be globals.css + modules)
   --------------------------------------------------------------------- */
const CSS = `
.magnetic{display:inline-block}
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,700;1,400&display=swap');
:root{--paper:#F5F4EF;--paper-2:#ECEAE3;--ink:#000;--char:#2B2B2B;--mute:#77756D;--line:#DAD8CF;--accent:#2534E8;--gold:#B79A3A;--gold-2:#E4CC7A;
 --serif:'Instrument Serif',Georgia,serif;--sans:'Schibsted Grotesk',system-ui,sans-serif;--ease:cubic-bezier(.2,.7,.2,1);--pad:clamp(20px,5vw,72px)}
*{box-sizing:border-box}
.site{font-family:var(--sans);color:var(--ink);background:var(--paper);min-height:100vh;-webkit-font-smoothing:antialiased;font-size:16px;line-height:1.5}
.site,.site a,.site button{cursor:none}
@media (pointer:coarse),(max-width:767px){.site,.site a,.site button{cursor:auto}}
h1,h2,h3{margin:0;font-weight:400}
h1,.site h2{font-family:var(--serif);letter-spacing:-.01em;line-height:1.02}
em{font-style:italic}
p{margin:0}
button{font:inherit;color:inherit;background:none;border:0;padding:0}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}
.skip{position:absolute;left:-999px;top:8px;background:var(--ink);color:var(--paper);padding:8px 12px;z-index:100}.skip:focus{left:8px}
.muted{color:var(--mute)}
.page{transition:opacity .26s var(--ease),transform .26s var(--ease)}.page-out{opacity:0;transform:translateY(6px)}
.cursor{position:fixed;left:0;top:0;pointer-events:none;z-index:9999}
.cursor>*{display:block;transition:transform .18s var(--ease),opacity .15s}
.cursor-star{width:22px;height:22px;margin:-11px;object-fit:contain}
.cursor-dot{width:6px;height:6px;margin:-3px;border-radius:50%;background:var(--ink)}
.cursor.is-hover>*{transform:scale(1.12)}.cursor.is-down>*{transform:scale(.88)}.cursor.is-hover.is-down>*{transform:scale(.96)}
.cursor.is-native>*{opacity:0}
body[data-drag] .cursor>*{transform:scale(.92) rotate(-12deg)}
.site input,.site textarea,.site select{cursor:auto}

/* nav */
.nav{position:sticky;top:0;z-index:50;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px var(--pad);font-size:14px;transition:background .3s,backdrop-filter .3s}
.nav-scrolled{background:rgba(245,244,239,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.mark{font-family:var(--serif);font-size:24px;line-height:1;justify-self:start}
.nav-center{display:flex;gap:28px}.nav-right{justify-self:end;display:flex;gap:22px}
.nav a,.nav-center button,.nav-right button{position:relative;padding:4px 0}
.nav-center button::after,.nav-right a::after,.nav-right button::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:100%;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .3s var(--ease)}
.nav-center button:hover::after,.nav-right a:hover::after,.nav-right button:hover::after{transform:scaleX(1)}
.nav-burger{display:none;justify-self:end}
.nav-sheet{position:absolute;top:100%;left:0;right:0;background:var(--paper);border-bottom:1px solid var(--line);padding:12px var(--pad) 24px;display:flex;flex-direction:column;gap:4px;font-size:20px;font-family:var(--serif)}
.nav-sheet button,.nav-sheet a{text-align:left;padding:10px 0}.nav-sheet-divider{height:1px;background:var(--line);margin:8px 0}
@media (max-width:820px){.nav{grid-template-columns:1fr auto}.nav-center,.nav-right{display:none}.nav-burger{display:block}}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 20px;border-radius:2px;font-size:14px;font-weight:500;transition:background .25s,color .25s,border-color .25s;border:1px solid var(--ink)}
.btn-primary{background:var(--ink);color:var(--paper)}.btn-primary:hover{background:var(--char)}
.btn-ghost{background:transparent;color:var(--ink)}.btn-ghost:hover{background:rgba(0,0,0,.05)}
.textlink{display:inline-flex;align-items:center;gap:6px;font-size:14px;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.back{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--mute)}.back:hover{color:var(--ink)}

/* hero */
.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(24px,4vw,56px);padding:clamp(20px,4vh,44px) var(--pad) clamp(32px,5vh,56px);align-items:center;position:relative}
.hero-now{font-size:14px;color:var(--mute);margin-bottom:20px}.hero-now strong{color:var(--ink);font-weight:600}
.hero h1{font-size:clamp(40px,6vw,84px);max-width:13ch}
.hero-sub{font-family:var(--serif);font-style:italic;font-size:clamp(22px,2.4vw,32px);margin-top:18px;min-height:1.4em;line-height:1.4;color:var(--char)}
.hero-sub-in{display:inline-block;animation:subin .7s var(--ease)}
@keyframes subin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.hero-body{max-width:46ch;margin-top:16px;color:var(--char);font-size:17px;line-height:1.55}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}
.hero-nudge{margin-top:28px;font-family:var(--serif);font-style:italic;font-size:18px;display:inline-flex;gap:6px;align-items:center;opacity:0;transform:translateY(6px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.hero-nudge.show{opacity:1;transform:none}
.hero-figure{position:relative;justify-self:center;width:100%;max-width:560px}
.character{position:relative;display:flex;flex-direction:column;align-items:center}
.figure-zone{position:relative;width:56%;padding:12px}
.figure{width:100%;height:auto;max-height:58vh;display:block}
.figure image{transform-box:view-box}
.region-hot{fill:var(--paper-2)}
.region-ring{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-dasharray:5 5;opacity:.6;animation:ringin .3s var(--ease)}
@keyframes ringin{from{opacity:0;transform:scale(1.05)}to{opacity:.6}}
.garment-cloud{position:absolute;inset:0;pointer-events:none}
.garment{position:absolute;width:24%;pointer-events:auto;transform:rotate(var(--rot,0deg));transition:transform .35s var(--ease),filter .35s var(--ease),opacity .25s;filter:drop-shadow(0 6px 10px rgba(0,0,0,.12));touch-action:none;user-select:none;-webkit-user-select:none}
.garment img{width:100%;height:auto;display:block;pointer-events:none}
.garment:hover{transform:rotate(calc(var(--rot,0deg) * .3)) scale(1.04);filter:drop-shadow(0 12px 18px rgba(0,0,0,.18));z-index:5}
.garment.is-on{opacity:.45}.garment.is-ghost{opacity:.15}
.g-meta{position:absolute;left:50%;top:100%;transform:translate(-50%,2px);white-space:nowrap;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);opacity:0;transition:opacity .25s}
.garment:hover .g-meta,.garment:focus-visible .g-meta{opacity:1}
.garment-drag{position:fixed;left:0;top:0;width:150px;z-index:80;pointer-events:none;filter:drop-shadow(0 18px 24px rgba(0,0,0,.25))}
.more-clothes{position:absolute;right:0;bottom:-6px;pointer-events:auto;font-family:var(--serif);font-style:italic;font-size:15px;color:var(--mute)}.more-clothes:hover{color:var(--ink)}
.garment-tray{display:flex;gap:14px;overflow-x:auto;padding:8px 4px 12px;width:100%;scrollbar-width:none}.garment-tray .garment{position:static;flex:0 0 auto;width:96px;transform:none}
.figure-msg{position:absolute;left:8%;top:6%;font-family:var(--serif);font-style:italic;font-size:22px;opacity:0;transform:translateY(6px);transition:opacity .35s var(--ease),transform .35s var(--ease);pointer-events:none}
.figure-msg.show{opacity:1;transform:none}
.snap-in{animation:snap .6s cubic-bezier(.34,1.56,.64,1)}
@keyframes snap{0%{opacity:0;transform:scale(1.08) translateY(-10px)}100%{opacity:1;transform:none}}
.wardrobe-hint{color:var(--mute);margin-top:8px;line-height:1.4;font-family:var(--serif);font-style:italic;font-size:15px;display:flex;gap:14px;align-items:baseline}
.reset-outfit{font-family:var(--sans);font-style:normal;font-size:12px;color:var(--mute);text-decoration:underline;text-underline-offset:3px}.reset-outfit:hover{color:var(--ink)}
@media (max-width:900px){.hero{grid-template-columns:1fr;min-height:0}.hero-figure{max-width:440px}.figure-zone{width:52%}.figure{max-height:48vh}}

/* work */
.section-head{display:flex;justify-content:space-between;align-items:baseline;padding:0 var(--pad) 28px;border-bottom:1px solid var(--line);margin:0 0 56px}
.section-head h2{font-size:clamp(28px,3vw,40px)}.section-head p{font-size:14px;color:var(--mute)}
.work{padding:64px 0 40px}
.project{padding:0 var(--pad);margin-bottom:clamp(72px,10vw,140px)}
.project-link{display:block;--px:0px;--py:0px}
.project-media{position:relative;overflow:hidden;background:var(--paper-2);border-radius:3px;aspect-ratio:16/10}
.project-flagship .project-media{aspect-ratio:16/9}
.art{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .8s var(--ease);transform:translate(var(--px),var(--py))}
.project-link:hover .art{transform:translate(var(--px),var(--py)) scale(1.015)}
.art-label{position:absolute;right:16px;bottom:12px;font-size:11px;color:var(--mute);letter-spacing:.02em}
.phone{position:absolute;width:20%;max-width:180px;min-width:110px;aspect-ratio:9/19;background:#fff;border-radius:18px;border:1px solid var(--line);padding:10px;display:flex;flex-direction:column;gap:8px;transition:transform .8s var(--ease);box-shadow:0 20px 40px -20px rgba(0,0,0,.25)}
.phone-bar{width:36%;height:4px;background:var(--line);border-radius:2px;align-self:center}.phone-block{background:var(--paper-2);border-radius:8px}.phone-row{height:8px;background:var(--paper-2);border-radius:4px}.phone-row.short{width:60%}
.phone:nth-child(2) .phone-block:first-of-type{background:var(--accent)}
.browser{width:66%;background:#fff;border:1px solid var(--line);border-radius:6px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.25)}
.browser-bar{display:flex;gap:5px;padding:8px}.browser-bar i{width:7px;height:7px;border-radius:50%;background:var(--line)}
.browser-hero{height:110px;background:linear-gradient(160deg,#DCE6E8,#B7CDD3)}.browser-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px}.browser-grid div{aspect-ratio:3/4;background:var(--paper-2);border-radius:3px}
.art-shirt{height:78%;filter:drop-shadow(0 24px 30px rgba(0,0,0,.2))}
.project-cta{position:absolute;left:18px;bottom:14px;font-size:13px;display:inline-flex;align-items:center;gap:6px;background:var(--paper);padding:8px 12px;border-radius:2px;opacity:0;transform:translateY(6px);transition:opacity .35s var(--ease),transform .35s var(--ease)}
.project-link:hover .project-cta,.project-link:focus-visible .project-cta{opacity:1;transform:none}
.project-meta{padding-top:18px;max-width:900px}
.project-title-row{display:flex;justify-content:space-between;align-items:baseline}
.project-title-row h3{font-family:var(--serif);font-size:clamp(30px,3.4vw,48px);transition:transform .4s var(--ease)}.project-link:hover h3{transform:translateX(4px)}
.project-flagship h3{font-size:clamp(36px,4.6vw,64px)}
.project-year{font-size:14px;color:var(--mute)}
.project-disc{font-size:13px;color:var(--mute);margin-top:4px}
.project-desc{margin-top:12px;font-size:clamp(17px,1.5vw,21px);max-width:44ch;color:var(--char)}
.project-role{margin-top:10px;font-size:13px;color:var(--char)}.project-role span{color:var(--mute);margin-right:4px}.dotsep{margin-left:14px}
@media (max-width:640px){.project-media{aspect-ratio:4/3}.project-flagship .project-media{aspect-ratio:4/3}.phone{width:34%}}

/* play */
.play{padding:clamp(60px,10vw,120px) var(--pad);border-top:1px solid var(--line);display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center}
.play h2{font-size:clamp(36px,5vw,72px)}.play p{margin-top:18px;max-width:40ch;color:var(--char);font-size:17px}
.play-actions{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
.mini-wall{display:flex;gap:18px;justify-content:center;align-items:center}
.mini-frame{width:22%;padding:6px;background:#fff;border:6px solid #1f1c19;box-shadow:0 20px 40px -20px rgba(0,0,0,.4)}
@media (max-width:900px){.play{grid-template-columns:1fr}}

/* about */
.about{padding:clamp(60px,10vw,120px) var(--pad);border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1.2fr;gap:40px}
.about h2{font-size:clamp(36px,5vw,72px)}.about-body p{font-size:18px;max-width:52ch;color:var(--char)}
.skills{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:40px}
.skill-col h3{font-size:13px;color:var(--mute);padding-bottom:10px;border-bottom:1px solid var(--line);margin-bottom:10px}
.skill-col ul{list-style:none;padding:0;margin:0;font-size:15px}.skill-col li{padding:4px 0}
@media (max-width:900px){.about{grid-template-columns:1fr}}@media (max-width:560px){.skills{grid-template-columns:1fr 1fr}}

/* contact */
.contact{padding:clamp(80px,12vw,160px) var(--pad);border-top:1px solid var(--line);text-align:center}
.contact h2{font-size:clamp(40px,6vw,88px);max-width:14ch;margin:0 auto}
.contact-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:36px}

/* changelog */
.log{padding:clamp(60px,9vw,110px) var(--pad);border-top:1px solid var(--line)}
.log-head{display:flex;justify-content:space-between;align-items:baseline;gap:24px;flex-wrap:wrap;padding-bottom:20px;border-bottom:1px solid var(--line)}
.log-head h2{font-size:clamp(28px,3vw,40px)}
.log-head p{font-size:14px;color:var(--mute);max-width:46ch}
.log-list{list-style:none;margin:0;padding:0}
.log-item{display:grid;grid-template-columns:150px 1fr 180px;gap:24px;align-items:baseline;padding:20px 0;border-bottom:1px solid var(--line)}
.log-item time{font-size:13px;color:var(--mute);font-variant-numeric:tabular-nums}
.log-note{font-size:16px;line-height:1.5;color:var(--char);max-width:62ch}
.log-tags{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);text-align:right}
.log .textlink{margin-top:20px}
.foot-stamp{font-size:12px;margin-top:2px}
@media (max-width:760px){.log-item{grid-template-columns:1fr;gap:6px}.log-tags{text-align:left}}

/* figures + notes + built */
.cs-fig{margin:0}.cs-fig img{width:100%;height:auto;display:block;border-radius:3px;border:1px solid var(--line)}
.cs-fig figcaption{font-size:13px;color:var(--mute);margin-top:8px;line-height:1.45}
.cs-fig video{width:100%;height:auto;display:block;border-radius:3px;border:1px solid var(--line);background:var(--paper-2)}
@media (prefers-reduced-motion:reduce){.cs-fig video{display:none}.cs-fig:has(video)::before{content:"";display:block;width:100%;aspect-ratio:9/16;background:var(--paper-2);border-radius:3px}}
.gallery-note{margin-top:6px;font-size:13px;color:var(--mute)}
.contact-note{margin-top:18px;font-size:14px;color:var(--mute)}
.built{margin-top:44px;padding-top:24px;border-top:1px solid var(--line);max-width:62ch}
.built h3{font-size:14px;margin-bottom:10px}
.built p{font-size:15px;line-height:1.55;color:var(--char)}
.art-nep2{gap:3%}.art-nep2 img{width:23%;height:auto;filter:drop-shadow(0 18px 26px rgba(0,0,0,.18));transition:transform .8s var(--ease)}
.foot-stamp{font-size:12px;color:var(--mute);margin-top:2px;text-align:left}.foot-stamp:hover{color:var(--ink)}
[data-route=changelog] .log{border-top:0;padding:24px 0 40px}

/* footer */
.foot{border-top:1px solid var(--line);padding:48px var(--pad);display:flex;justify-content:space-between;gap:40px;font-size:14px}
.mark-lg{font-family:var(--serif);font-size:40px;line-height:1}.foot-tag{font-family:var(--serif);font-style:italic;font-size:18px;margin:14px 0 6px}
.foot-cols{display:flex;gap:64px}.foot-cols h3{font-size:13px;color:var(--mute);margin-bottom:8px}.foot-cols div{display:flex;flex-direction:column}.foot-cols a,.foot-cols button{text-align:left;padding:3px 0}
@media (max-width:640px){.foot{flex-direction:column}.foot-cols{gap:40px}}

/* case study */
.case{padding:20px var(--pad) 80px;max-width:1200px;margin:0 auto}
.case-hero{margin-top:14px}
.case-title-row{display:flex;justify-content:space-between;align-items:baseline}.case-title-row h1{font-size:clamp(48px,8vw,120px)}.case-title-row span{color:var(--mute)}
.case-tag{font-family:var(--serif);font-size:clamp(24px,3vw,40px);max-width:24ch;margin-top:12px;line-height:1.15}
.case-meta{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin:24px 0 0;padding-top:16px;border-top:1px solid var(--line)}
.case-meta dt{font-size:12px;color:var(--mute)}.case-meta dd{margin:4px 0 0;font-size:14px}
.case-art{position:relative;aspect-ratio:16/9;width:min(100%,64%);margin:24px auto 0;background:var(--paper-2);border-radius:3px;overflow:hidden}
@media (max-width:820px){.case-art{width:100%}}
.quick{margin-top:36px;padding:28px;background:#fff;border:1px solid var(--line);border-radius:3px}
.quick-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}.quick-head h2{font-size:26px}
.quick-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin:22px 0 0}
.quick-grid dt{font-size:12px;color:var(--mute)}.quick-grid dd{margin:4px 0 0;font-size:16px;line-height:1.45}
.quick .textlink{margin-top:20px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:2px;overflow:hidden}
.seg button{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;font-size:13px}.seg button.on{background:var(--ink);color:var(--paper)}
.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:64px}
.summary h2{font-size:14px;font-family:var(--sans);color:var(--mute);margin-bottom:8px}.summary p{font-size:16px;line-height:1.5}
.cs-section{display:grid;grid-template-columns:260px 1fr;gap:40px;margin-top:72px;padding-top:28px;border-top:1px solid var(--line)}
.cs-section-head{display:flex;gap:14px;align-items:baseline}.cs-n{font-size:13px;color:var(--mute)}.cs-section h2{font-size:30px}
.cs-blocks{display:flex;flex-direction:column;gap:24px;max-width:760px}
.cs-text{font-size:17px;line-height:1.55;max-width:60ch;color:var(--char)}
.cs-callout{font-family:var(--serif);font-size:24px;line-height:1.25;padding-left:18px;border-left:2px solid var(--ink)}
.cs-list{margin:0;padding-left:18px;font-size:16px;line-height:1.7}
.cs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.cs-ba{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cs-ba span{display:block;font-size:12px;color:var(--mute);margin-top:8px}
.decision{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--line);border-radius:3px}
.decision>div{padding:18px}.decision>div+div{border-left:1px solid var(--line)}.decision h3{font-size:12px;color:var(--mute);margin-bottom:8px}.decision p{font-size:15px;line-height:1.45}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.metric{padding:20px 0;border-top:1px solid var(--ink)}.metric strong{display:block;font-family:var(--serif);font-weight:400;font-size:40px;line-height:1}.metric span{font-size:13px;color:var(--mute)}
.placeholder{position:relative;border-radius:3px;display:flex;align-items:flex-end;padding:12px;background-image:linear-gradient(45deg,transparent 48%,rgba(0,0,0,.05) 49%,rgba(0,0,0,.05) 51%,transparent 52%);background-size:22px 22px}
.placeholder span{font-size:12px;color:var(--mute);background:var(--paper);padding:3px 6px;border-radius:2px}
.case-next{margin-top:96px;border-top:1px solid var(--line);padding-top:28px}.case-next p{font-size:13px;color:var(--mute)}
.next-link{font-family:var(--serif);font-size:clamp(36px,5vw,64px);display:inline-flex;align-items:center;gap:14px;margin-top:6px}
@media (max-width:820px){.case-meta{grid-template-columns:1fr 1fr}.summary{grid-template-columns:1fr}.cs-section{grid-template-columns:1fr;gap:18px}.decision{grid-template-columns:1fr}.decision>div+div{border-left:0;border-top:1px solid var(--line)}.quick-grid{grid-template-columns:1fr}.cs-grid{grid-template-columns:1fr 1fr}.metrics{grid-template-columns:1fr}}

/* studio */
.studio{padding:16px var(--pad) 32px;min-height:calc(100vh - 62px);display:flex;flex-direction:column}
.studio-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center}.studio-top h1{font-size:28px;text-align:center}
.studio-hist{justify-self:end;display:flex;gap:4px}.studio-hist button{width:36px;height:36px;display:grid;place-items:center;border:1px solid var(--line);border-radius:2px;background:#fff}.studio-hist button:disabled{opacity:.35}
.studio-body{display:grid;grid-template-columns:240px 1fr;gap:32px;margin-top:24px;flex:1}
.tools{display:flex;flex-direction:column;gap:28px}.tool-group h2{font-size:13px;font-family:var(--sans);color:var(--mute);margin-bottom:10px}
.swatches{display:flex;flex-wrap:wrap;gap:8px}.sw{width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.15);transition:transform .2s var(--ease)}.sw.on{outline:2px solid var(--ink);outline-offset:2px}.sw:hover{transform:scale(1.1)}
.swatches.small .sw{width:22px;height:22px}
.range{display:flex;align-items:center;gap:10px;font-size:13px;margin:12px 0}.range input{flex:1;accent-color:var(--ink)}
.sticker-tray{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.sticker-tray button{aspect-ratio:1;padding:6px;border:1px solid var(--line);background:#fff;border-radius:2px;transition:transform .2s var(--ease),border-color .2s}.sticker-tray button:hover{transform:translateY(-2px);border-color:var(--ink)}
.stage{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
.shirt-wrap{position:relative;width:min(100%,520px);aspect-ratio:400/460;touch-action:none}
.shirt-svg{width:100%;height:100%;display:block;filter:drop-shadow(0 30px 40px rgba(0,0,0,.14))}
.print{position:absolute}
.draw-canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.draw-canvas.passive{pointer-events:none}
.sticker{position:absolute;aspect-ratio:1;touch-action:none;user-select:none;-webkit-user-select:none}
.sticker.is-sel{outline:1px dashed var(--accent);outline-offset:4px}
.handle{position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;border-radius:50%;background:var(--accent);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)}
.stage-hint{font-size:12px;color:var(--mute);text-align:center;max-width:52ch}
.studio-foot{display:flex;align-items:center;gap:16px;justify-content:center;margin-top:20px;font-size:13px}
.tools-mobile{position:fixed;left:0;right:0;bottom:0;background:var(--paper);border-top:1px solid var(--line);padding:10px var(--pad) 14px;z-index:40;gap:12px}
.seg-tabs{width:100%}.seg-tabs button{flex:1;justify-content:center}
.tools-mobile .sticker-tray{grid-template-columns:repeat(6,1fr)}
@media (max-width:767px){.studio{padding-bottom:230px}.studio-body{grid-template-columns:1fr}.studio-top h1{font-size:20px}}

/* modal */
.modal-bg{position:fixed;inset:0;background:rgba(20,18,15,.55);display:grid;place-items:center;z-index:70;padding:20px;animation:fadein .25s var(--ease)}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{background:var(--paper);padding:32px;width:min(100%,460px);border-radius:3px;position:relative;animation:pop .35s var(--ease)}
@keyframes pop{from{transform:translateY(10px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.modal h2{font-size:28px;margin-bottom:18px}.modal label{display:block;font-size:13px;color:var(--mute)}
.modal input[type=text],.modal input:not([type]){display:block;width:100%;margin-top:6px;font:inherit;font-size:16px;padding:10px 12px;border:1px solid var(--line);border-radius:2px;background:#fff;color:var(--ink)}
.modal .muted{font-size:13px;margin:8px 0 18px}
.check{display:flex;align-items:center;gap:10px;font-size:14px!important;color:var(--ink)!important}.check input{accent-color:var(--ink);width:16px;height:16px}
.modal-actions{display:flex;gap:18px;align-items:center;margin-top:24px}
.modal-art{width:min(100%,560px);text-align:center;display:flex;flex-direction:column;align-items:center;gap:18px}
.modal-x{position:absolute;right:12px;top:12px}

/* frames + plaque */
.framed{position:relative;padding:22px;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
.frame-edge{position:absolute;inset:0;border:14px solid #1f1c19;box-shadow:inset 0 0 0 1px #6b5e4d,inset 0 0 0 2px #2b2724}
.frame-mat{position:absolute;inset:14px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.frame-glass{position:absolute;inset:14px;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 60%);pointer-events:none;background-size:250% 100%;background-position:100% 0}
.framed-art{position:relative;width:100%}
.framed.small{padding:14px}.framed.small .frame-edge{border-width:9px}.framed.small .frame-mat,.framed.small .frame-glass{inset:9px}
.framed.big{width:min(100%,420px)}
.plaque{display:inline-flex;flex-direction:column;align-items:center;padding:8px 18px;background:linear-gradient(180deg,var(--gold-2),var(--gold));color:#2b2110;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border:1px solid #8f7627;box-shadow:0 2px 6px rgba(0,0,0,.3);min-width:150px;line-height:1.5}
.plaque-t{font-family:var(--serif);text-transform:none;letter-spacing:0;font-size:14px;font-style:italic}.plaque-y{font-size:10px;opacity:.75}
.plaque.tiny{padding:5px 12px;min-width:0;font-size:10px}

/* frame sequence */
.frame-seq{position:relative;min-height:calc(100vh - 62px);display:grid;place-items:center;overflow:hidden;padding:40px var(--pad)}
.gallery-bg{position:absolute;inset:0;background:linear-gradient(180deg,#E8E5DD 0%,#E8E5DD 74%,#B8AF9E 74.2%,#A69D8C 100%);opacity:0;transition:opacity 1s var(--ease)}
.framed-wrap{position:relative;display:flex;flex-direction:column;align-items:center;gap:22px;transition:transform 1.1s var(--ease)}
.frame-seq .framed{width:min(80vw,420px);transition:transform .8s var(--ease),box-shadow .8s var(--ease)}
.frame-seq .frame-edge,.frame-seq .frame-mat{opacity:0;transform:scale(1.12);transition:opacity .6s var(--ease),transform .7s var(--ease)}
.frame-seq .framed{background:transparent;box-shadow:none}
.frame-seq .plaque{opacity:0;transform:translateY(10px);transition:opacity .5s var(--ease),transform .5s var(--ease)}
.frame-seq .frame-done{position:absolute;bottom:clamp(30px,8vh,80px);text-align:center;opacity:0;transform:translateY(10px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.frame-done h1{font-size:clamp(34px,5vw,64px)}.frame-actions{display:flex;gap:12px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.st-1 .framed{transform:translateY(-14px) scale(1.03)}
.st-2 .gallery-bg,.st-3 .gallery-bg,.st-4 .gallery-bg,.st-5 .gallery-bg{opacity:1}
.st-2 .framed,.st-3 .framed,.st-4 .framed,.st-5 .framed{background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
.st-2 .frame-edge,.st-2 .frame-mat,.st-3 .frame-edge,.st-3 .frame-mat,.st-4 .frame-edge,.st-4 .frame-mat,.st-5 .frame-edge,.st-5 .frame-mat{opacity:1;transform:none}
.st-2 .frame-glass{animation:glint 1s var(--ease) .3s forwards}
@keyframes glint{from{background-position:100% 0}to{background-position:0 0}}
.st-3 .framed-wrap,.st-4 .framed-wrap,.st-5 .framed-wrap{transform:translateY(-8vh) scale(.62)}
.st-4 .plaque,.st-5 .plaque{opacity:1;transform:none}
.st-5 .frame-done{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.frame-seq *{transition:none!important;animation:none!important}}

/* gallery */
.gallery{position:relative;min-height:calc(100vh - 62px);background:#E8E5DD;padding:24px var(--pad) 120px;overflow:hidden}
.gallery-head h1{font-size:clamp(36px,5vw,64px);margin-top:16px}.gallery-head p{margin-top:8px;color:var(--char);font-size:15px}
.exhibition{position:relative;margin-top:40px}
.wall-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}.wall-track::-webkit-scrollbar{display:none}
.wall-panel{flex:0 0 100%;scroll-snap-align:start;padding:20px 0 40px}
.wall{display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,56px);align-items:flex-start;justify-content:center;max-width:1000px;margin:0 auto;min-height:280px}
.wall-nav{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:10px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.wall-nav button{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:var(--paper)}.wall-nav button:disabled{opacity:.3}
.museum-floor{position:fixed;left:0;right:0;bottom:0;height:34px;background:linear-gradient(180deg,#B8AF9E,#A69D8C);pointer-events:none;z-index:3}
.visitors{position:absolute;left:0;right:0;bottom:8px;height:60px;pointer-events:none}
.visitor{position:absolute;bottom:0;transform:translateX(-50%)}
.visitor.front{bottom:0}.visitor.back{bottom:10px;opacity:.5}
.vis-svg{width:22px;height:56px;fill:#2b2724;transform:scaleX(var(--flip))}.visitor.back .vis-svg{width:18px;height:46px}
.vis-svg.v1{fill:#3a342e}.vis-svg.v2{fill:#1f1c19}
.walking .leg-a{animation:step .7s ease-in-out infinite alternate;transform-origin:9px 36px}.walking .leg-b{animation:step .7s ease-in-out infinite alternate-reverse;transform-origin:15px 36px}
.walking .arm{animation:step .7s ease-in-out infinite alternate-reverse;transform-origin:17px 16px}.walking .arm-b{animation:step .7s ease-in-out infinite alternate;transform-origin:7px 16px}
@keyframes step{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
.looking .vis-head{transform:rotate(-10deg) translateY(-1px);transform-origin:12px 12px;transition:transform .6s var(--ease)}
.bubble{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-6px);white-space:nowrap;font-family:var(--serif);font-style:italic;font-size:11px;color:var(--char);background:var(--paper);border:1px solid var(--line);padding:2px 7px;border-radius:2px;animation:bub .4s var(--ease) both}
@keyframes bub{from{opacity:0;transform:translate(-50%,0)}to{opacity:1;transform:translate(-50%,-6px)}}
@media (prefers-reduced-motion:reduce){.walking *{animation:none!important}}
.wall-item{width:calc(150px * var(--sc));transform:translateY(var(--off))}
.frame-btn{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;transition:transform .4s var(--ease)}.frame-btn:hover{transform:translateY(-4px)}
.frame-btn .framed{width:100%}
.frame-btn .plaque{opacity:0;transition:opacity .3s}.frame-btn:hover .plaque,.frame-btn:focus-visible .plaque{opacity:1}
@media (pointer:coarse){.frame-btn .plaque{opacity:1}}
.empty{text-align:center;margin-top:80px;color:var(--mute)}
@media (max-width:640px){.wall-item{width:calc(110px * var(--sc))}}
`;

/* ---------------------------------------------------------------------
   assets/clothes: processed NEP2UNE garment stickers (transparent WebP data URIs)
   In the repo: move to /assets/clothes/*.webp and set src to the path.
   --------------------------------------------------------------------- */
const GARMENT_ASSETS = {
  "tee-black": {
    "src": "/assets/clothes/tee-black.webp",
    "aspect": 1.0689
  },
  "denim-green": {
    "src": "/assets/clothes/denim-green.webp",
    "aspect": 0.6838
  },
  "denim-black": {
    "src": "/assets/clothes/denim-black.webp",
    "aspect": 0.7284
  },
  "denim-cream": {
    "src": "/assets/clothes/denim-cream.webp",
    "aspect": 0.6811
  }
};
