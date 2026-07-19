# Mohanad & Menna — Wedding Invitation

## Stack note (important)

Your spec asks for React Router DOM + BrowserRouter, but this project is built on **TanStack Start** (file-based routing, SSR-capable). Ripping that out would break the template. I'll implement the same two-route isolation using TanStack Router — behavior is identical (two routes, full unmount between them, direct navigation to `/invitation` works, SPA fallback handled by the platform automatically). Everything else in your spec stays as written: Framer Motion, GSAP + free ScrollTrigger, Tailwind, Lucide, frontend-only, no Supabase.

If you truly need `react-router-dom` specifically, tell me and I'll swap the router — but the UX and code you get will look the same either way.

## Routes

- `src/routes/index.tsx` — **EnvelopePage** only. Full-screen 100svh, no scroll, tap-to-open, animated reveal (~1000ms), then `navigate({ to: "/invitation" })`. Reduced-motion → fast crossfade. Preloads `/invitation-hero.jpg`.
- `src/routes/invitation.tsx` — **InvitationPage** only. Scrolls to top on mount. Cleans up body overflow, GSAP contexts, ScrollTriggers, listeners, timers on unmount.
- `src/routes/__root.tsx` — update head metadata to "Mohanad & Menna — 08.08.2026", load Google Fonts (Great Vibes, Cormorant Garamond, Noto Naskh Arabic) via `<link>` in head (never `@import` in CSS on Tailwind v4).

Envelope and Invitation are separate route files so they cannot render simultaneously.

## Data

`src/data/wedding.ts` — single source of truth: names, date ISO `2026-08-08T20:00:00+03:00`, hero copy, quote lines, welcome paragraph, 5 story events, 8 gallery image paths, venue block, maps URL, 6 schedule entries, note text, palette/typography constants.

## Components

Under `src/components/`:
HeroSection, RomanticQuote, Countdown, WelcomeSection, OurStoryTimeline, StoryGallery, VenueSection, OrderOfDay, NoteSection, RSVPForm, MusicToggle, SectionDivider.

Under `src/hooks/`: `useCountdown.ts`, `useReducedMotion.ts`.

## Section behavior (highlights)

- **Hero**: `/invitation-hero.jpg` cover, gradient overlay, names in Great Vibes, date/time, animated ChevronDown, floating MusicToggle (Music/Volume2/VolumeX) — no autoplay, graceful if `/music.mp3` missing.
- **Romantic quote**: dedicated ivory section, `dir="rtl" lang="ar"`, 8 Arabic lines revealed one-by-one via Framer Motion stagger, closing "Forever and ever" in script.
- **Countdown**: native `useCountdown` hook targeting Cairo time, zero-padded DHMS, `aria-live="off"`, no layout shift, shows "Today is the day 🤍" at zero.
- **Our Story timeline**: mobile = single left rail, cards right; desktop = alternating. GSAP ScrollTrigger scrubs the line growth + arrow draw between milestones; cards use non-scrubbed fade/slide-in. StrictMode-safe via `gsap.context()` + `ctx.revert()` in cleanup. Arabic phrases wrapped in `<span lang="ar" dir="rtl">`.
- **Story gallery**: Framer Motion draggable card stack, rotation from x-drag, threshold fly-out, spring-back, loop, next 2 cards visible behind, keyboard prev/next buttons, AnimatePresence, vertical-gesture pass-through.
- **Venue**: When & Where card with start/end times, address block, clickable QR card linking to the provided Google Maps URL (`target="_blank" rel="noopener noreferrer"`), ScanLine caption. QR never recolored/cropped.
- **Order of the Day**: simpler vertical schedule with subtle GSAP progress line — visually distinct from Our Story (smaller nodes, thinner line, no arrows).
- **Note**: rounded bordered ivory card, Arabic RTL, generous leading.
- **RSVP**: real `<label htmlFor>`, accessible radio group for YES/NO, inline validation, loading/success/error states, 44px+ targets. `submitRSVP(data)` isolated function that fakes 800ms delay and returns success — trivially swappable later.
- **Footer**: minimal "Mohanad & Menna · 08.08.2026".

## Assets & placeholders

Placeholder SVG/CSS cards for `/story/01–08.jpg`, `/envelope.jpg`, `/invitation-hero.jpg`, `/location-qr.png` so nothing breaks if files are absent. Story placeholders: 4:5, ivory paper look, "Photo 01"…"Photo 08". `<img>` uses `object-cover`, `loading="lazy"` for story/QR, `fetchpriority="high"` for envelope/hero. Missing image handlers (`onError`) fall back to the placeholder rather than crashing.

## Design tokens

Update `src/styles.css`:
- Palette: `--ink #22231C`, `--ivory #F0F1E7`, `--blush #E8AAA5`, `--burgundy #692219`, `--paper #FFFDF8`, mapped through `@theme inline` as `--color-ink` etc.
- Fonts: `--font-script "Great Vibes"`, `--font-serif "Cormorant Garamond"`, `--font-arabic "Noto Naskh Arabic"`, all `font-display: swap` via the Google Fonts link.
- Utilities via `@utility` for `.font-script`, `.font-serif-display`, `.font-arabic`.
- Alternating dark (ink) / ivory sections; desktop wraps content in a centered 560–640px column on an ink background.

## Dependencies to add

`framer-motion`, `gsap` (free tier — only ScrollTrigger).

## Accessibility & perf

Semantic headings, correct order, alt text where meaningful, `alt=""` for decorative, visible focus rings, `prefers-reduced-motion` respected in Envelope + all Motion/GSAP components, no color-only signals, Arabic sections with `lang="ar" dir="rtl"`, no focus traps, countdown not announced. Preload envelope + hero; lazy story + QR. Only transform/opacity animations. ScrollTriggers created inside `gsap.context()` and reverted on unmount to avoid StrictMode duplicates.

## Out of scope for v1

No music file bundled (toggle handles missing file), no backend, no analytics, no map iframe. Easy to extend later.
