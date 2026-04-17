# Anniversary

A static, single-page anniversary keepsake. No framework, no build step — open `index.html` in any modern browser.

## Run it

Double-click `index.html`, or:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

A local server is only needed if the browser blocks `file://` font loading; Chrome and Firefox handle the included woff2 files fine either way.

## Deploy

**GitHub Pages.** Push the repo; in repository Settings → Pages, set Source to the branch and `/` as the folder. The included `.nojekyll` file prevents Jekyll from rewriting asset paths.

**Netlify.** Drag the whole folder into the Netlify dashboard, or connect the repo. No build command, no publish directory to configure beyond the root.

## Layout

```
index.html
css/
  tokens.css      palette, type scale, spacing, timings
  base.css        font faces, reset, typography, reduced-motion rules
  sections.css    per-section layout and the rosette ornament
js/
  main.js         one-shot reveal and rosette draw-in on scroll
assets/
  fonts/          self-hosted Cormorant Garamond + EB Garamond (latin woff2)
  svg/rosette.svg reference source of the repeating ornament motif
```

## Fonts

Cormorant Garamond (display) and EB Garamond (body) are served from `assets/fonts/` as woff2 subsets covering the Latin range. No network calls to Google Fonts or any other CDN at runtime.

## Accessibility

- Semantic landmarks (`main`, `section`, `footer`) and labelled regions.
- Decorative SVGs are `aria-hidden` and `focusable="false"`.
- Body text meets WCAG AA against the background.
- `prefers-reduced-motion: reduce` disables the page fade-in and the ornament draw-in; ornaments render fully on load instead.
- Focus-visible outlines use the accent colour.

## Changing the palette

Edit `css/tokens.css`. The five palette variables (`--bg`, `--ink`, `--ink-soft`, `--accent`, `--metallic`) are the only values the design reads from.
