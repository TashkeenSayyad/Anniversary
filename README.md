# 365 Blessed Days

A hand-made, single-page anniversary keepsake — an editorial-style love letter for a first wedding anniversary. Built as a static site with plain HTML, CSS, and JavaScript. No build tools. Deploy by opening `index.html`, or drop the folder onto any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

---

## Design

Warm ivory paper, aubergine ink, a whisper of antique gold. Serif typography (Fraunces + Cormorant Garamond). Subtle paper grain, drifting gold dust, scroll-triggered reveals, and an animated 365 counter on the hero. Designed to feel like a bound keepsake rather than a web page.

---

## Structure

```
anniversary-site/
├── index.html             — semantic markup, content, section scaffolding
├── styles/
│   ├── base.css           — reset, design tokens, typography, grain overlay
│   ├── layout.css         — containers, hero, sections, responsive grid
│   └── components.css     — buttons, stats, timeline, frames, dua, motion
├── scripts/
│   └── main.js            — IntersectionObserver reveals, counter, dust
├── assets/
│   └── photos/            — drop your photographs in here
├── .gitignore
└── README.md
```

---

## Run it

No install, no build. Two options:

```bash
# Option 1 — open directly
open index.html          # macOS
xdg-open index.html      # linux
start index.html         # windows

# Option 2 — local static server (recommended for fonts/caching)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Customising the content

All copy lives in `index.html`. Search for a phrase and edit it in place. Sections are clearly marked with comment banners, for example:

```html
<!-- =============== LETTER =============== -->
```

### Adding your photographs

1. Drop your images into `assets/photos/` (JPG or WebP, ideally 1200–1600 px on the long edge).
2. Open `index.html`, jump to `<!-- =============== GALLERY =============== -->`.
3. Replace each `<div class="frame-placeholder">…</div>` with:

```html
<img src="assets/photos/your-photo.jpg" alt="A brief caption for accessibility." />
```

The frames already handle cover-fit, aspect ratio, and hover elevation.

### Changing the palette

All colours are CSS custom properties at the top of `styles/base.css`:

```css
:root {
  --ivory:     #F7F1E8;
  --ink:       #2A1F26;
  --rose:      #8B3A4E;
  --gold:      #B08A4E;
  /* … */
}
```

Change four tokens and the whole page re-skins.

### Changing the fonts

Replace the Google Fonts `<link>` in `index.html` and update the `font-family` stacks in `styles/base.css` (`.display` and `body`).

### Changing the number

If your anniversary lands on a different day count, edit two spots:

```html
<!-- index.html, hero -->
<span class="numerals" id="counter" data-target="365">365</span>

<!-- index.html, stats -->
<span data-count="365">365</span>
```

---

## Accessibility notes

- Respects `prefers-reduced-motion` — reveals snap in, dust is suppressed, counter jumps to final value.
- Semantic landmarks (`<main>`, `<section>`, `<article>`, `<ol>`, `<figure>`, `<blockquote>`, `<footer>`).
- Decorative SVGs marked `aria-hidden="true"`.
- Sufficient colour contrast on body text.
- Keyboard-navigable; focus styles inherit from the browser — tighten in `components.css` if desired.

---

## Credits

- Typography — **Fraunces** by Phaedra Charles & Undercase Type; **Cormorant Garamond** by Christian Thalmann; **Amiri** by Khaled Hosny. All via Google Fonts (SIL OFL).
- Paper grain — inline SVG fractal noise, no external asset.

---

Made with love, for our first year.
