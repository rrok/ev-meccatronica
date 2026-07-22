# Anchor Scrolling — Design

## Problem
Navbar links use custom JS (`scrollTo()` + `preventDefault()`) instead of real anchors. No `Contatti` link/section exists. URL never reflects the visible section, so a link like `dominio/#contatti` can't be typed/shared to land on a section.

## Approach
Use native browser anchor scrolling instead of custom JS:
- `src/styles.scss` already has global `scroll-behavior: smooth` and `scroll-padding-top: 80px` (offsets the fixed navbar) — no CSS changes needed.
- Convert navbar links from `href="#" (click)="scrollTo(id)"` to real `href="#id"`. Native anchor navigation handles smooth-scroll + URL hash update + deep-link/refresh support for free.
- `navbar.ts`: drop `scrollTo(id)`; keep a `closeMenu()` method (sets `collapsed.set(true)`) bound to each link's `(click)` so the mobile menu still collapses after tapping a link.
- Add a new `Contatti` nav link: `href="#contatti"`.
- Add `id="contatti"` to the existing contact block in `src/app/components/footer/footer.html` (address/phone), no new section.

## Scope
All existing navbar targets (`hero`, `servizi`, `officina`, `gallery`, `storia`, `preventivo`) get the same anchor treatment, plus the new `contatti` target. The duplicate "Cambio Automatico" → `servizi` link is left as-is (pre-existing, out of scope).

## Out of scope
- Angular Router is not touched — stays uninstalled/unwired.
- No GitHub Pages `404.html` redirect trick — not needed since this uses `#hash` fragments, which never hit the server.

## Verification
Run dev server, click each nav link (URL hash updates, smooth scroll lands correctly under fixed navbar), load `#contatti` directly and on refresh to confirm deep-link scroll works, check mobile menu collapses on link click.
