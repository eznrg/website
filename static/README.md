# static/

**Standalone, unlisted pages** that live outside the generated site. Each
`static/<name>/` folder is deployed to `dist/<name>/` and served at
`https://eznrg.ai/<name>`.

| Folder | Served at | What it is |
| --- | --- | --- |
| `hospitality/` | `/hospitality` | Landing page for hospitality operators |
| `hospitality/whitepaper/` | `/hospitality/whitepaper` | Full white paper — *The Flexible Hotel, a Grid Asset* |
| `residential/` | `/residential` | **Placeholder** — coming-soon page for homeowners |
| `commercial/` | `/commercial` | **Placeholder** — coming-soon page for commercial operators |
| `shared/` | `/static/*` | Theme + script shared by the pages above |

## Why this folder exists (read before editing)

These pages are deliberately kept **separate from the generated site**:

- They are **not** produced by the render pipeline (`src/render.mjs` /
  `src/content.mjs`). Nothing here has **any dependency on `src/styles.css`** —
  `shared/tokens.css` only *mirrors* the mint theme, so a future theme change on
  the main site cannot alter or break these pages.
- They are **unlisted**: intentionally **not** in the `nav` array (so they never
  appear in the header or footer), **not** linked from the homepage, and **not**
  in `public/sitemap.xml`.
- All of them carry `<meta name="robots" content="noindex">` so search engines
  skip them.
- Anyone with the URL can view them — share by direct link, email, or QR code.
  ⚠️ See "Password gate" below: this is not currently true in production.

## The shared layer

`shared/` is copied to `dist/static/`, so its files are served from `/static/`.
Two stylesheets, deliberately split:

- **`tokens.css`** → `/static/tokens.css` — the `:root` block alone: mint
  palette, the three font stacks, radii, `--max`. **Every** page links it,
  including the white paper. This is the one place the palette lives; edit here
  when the theme moves.
- **`theme.css`** → `/static/theme.css` — the component layer for the three
  **landing** pages: base typography, header, eyebrow, buttons, hero, cards,
  channels, footer, and the reveal animation. It consumes the custom properties
  from `tokens.css`, so **`tokens.css` must be linked first** — on its own,
  `theme.css` renders unstyled.
- **`reveal.js`** → `/static/reveal.js` — the reveal-on-scroll helper, loaded at
  the bottom of each landing page's `<body>`. Purely additive.

A change to `theme.css` lands on `/hospitality`, `/residential`, and
`/commercial` at once — check all three.

**The white paper links `tokens.css` but not `theme.css`.** It shares the palette
but not the components: it is a reading document with a denser line-height, a
sticky header, a TOC rail, and print styles, so it keeps its own component CSS
inline. That divergence is intentional, not drift.

Page-specific CSS stays in that page's own inline `<style>`: the hospitality stat
band, load-profile charts, sequence steps, and white-paper CTA all live in
`hospitality/index.html`. `residential/` and `commercial/` have **no** CSS of
their own — everything they use is in `theme.css`.

## How it gets deployed

`scripts/build.mjs` copies `static/shared/` to `dist/static/`, then loops over a
`standalonePages` array copying each `static/<name>/` to `dist/<name>/`. The copy
is **recursive**, so nested pages like `hospitality/whitepaper/` come along with
no build change. `README.md` and `.DS_Store` are filtered out of the deploy.

With `cleanUrls: true` in `vercel.json`, `dist/<name>/index.html` is served at
`/<name>`. That build block is the *only* place shared code references this
folder.

### Adding a page

1. Create `static/<name>/index.html` — copy `residential/index.html` as the
   skeleton (it is the minimal one: `noindex` meta, fonts, the two stylesheet
   links, header, hero, channels, footer, `reveal.js`).
2. Add `"<name>"` to the `standalonePages` array in `scripts/build.mjs`.
3. Do **not** touch the `nav` array in `src/content.mjs`, `public/sitemap.xml`,
   `src/render.mjs`, or the `pages[]` array — that is what keeps it unlisted.

## Password gate

⚠️ `middleware.js` matches `/(.*)` with no exclusions, so when `SITE_PASSWORD` is
set in Vercel **every page here is behind the password gate**, including
`/hospitality`. These pages were designed to be shareable by direct link; if that
is the intent, the middleware matcher needs to exclude them. Locally `dev.mjs`
skips the gate when `SITE_PASSWORD` is unset, which is why they open freely in
preview.

## Editing

- **Channel links:** every landing page has its own pair of
  `#REPLACE_ME_TELEGRAM` / `#REPLACE_ME_WHATSAPP` `href`s (search for
  `TELEGRAM_CHANNEL_URL` / `WHATSAPP_CHANNEL_URL`). Six placeholders across the
  three pages — still unset. They can point at the same channel or per-audience
  ones.
- **`residential/` and `commercial/` are placeholders.** Both show a "Coming
  soon." hero over the channels section. Replace the hero copy (marked
  `PLACEHOLDER COPY`) when each offering is ready.
- **Landing-page figures:** every number in the hospitality hero stat band comes
  from the white paper. If a figure changes there, change it here too.
- Assets like `/logo.svg` come from `public/` (already deployed with the main
  site). These pages ship no images of their own.

## The white paper

`hospitality/whitepaper/index.html` is a static port of the authored white paper.
The source was a self-unpacking JS bundle (React + a custom `doc-page` runtime +
Lucide, ~800 KB of script); the content, data tables, and figures were extracted
and re-rendered as plain HTML so the page needs **no JavaScript to read**. The
only script on the page is a small progress-bar / active-section helper, and the
Lucide icon paths are inlined as an SVG `<symbol>` sprite.

Structure worth knowing:

- **Section rail** — sticky TOC at ≥1080px; the inline "Table of Contents"
  section is the fallback below that. Both are driven by the same `id`s; if you
  add a section, add it to *both* lists.
- **Citations** — `<a class="cite" href="#src-N">[N]</a>` link to
  `<li id="src-N">` in Appendix B. There are 27; keep the numbering contiguous.
- **Meter cross-refs** — `<a class="meter-ref" href="#prop-780">780</a>` link to
  the matching chart card in Appendix A.
- **Print** — `@media print` hides the header, rail, and CTA and flips to light
  text.

## The load-profile charts

Five seasonal load-profile charts — one on the landing page, four in Appendix A —
are **hand-built HTML/SVG**, not images and not a charting library. Each is a
`.viz` block: HTML for the gridlines, axis ticks, legend, direct labels, and
readout; a two-path `<svg>` (viewBox `0 0 1000 1000`,
`preserveAspectRatio="none"`, `vector-effect="non-scaling-stroke"`) for the lines
themselves. That split keeps axis text at real CSS pixels down to 320px and the
strokes a true 2px at every width — which a single scaled SVG cannot do.

- **The lines, labels, axes, and data table all render with JavaScript off.** The
  script at the bottom of each page only adds the hover layer (crosshair,
  markers, readout) and arrow-key navigation. Nothing is gated behind it: every
  value is also in the `<details>` table under each chart.
- **Data** lives inline in the `data-viz` attribute on each `.viz-plot` (24
  hourly points per series) and again in the table body. Change one, change the
  other. Values were digitized from the original Plotly PNG exports, which are in
  git history at commit `6cb96c1`
  (`hospitality_static/img/load-profile-meter-*.png`).
- **Series colors** are `--viz-sum` `#46a26d` and `--viz-win` `#8f83e8`, defined
  on `.viz`. They are *not* the site's `--primary`/`--gold`: that original pairing
  failed both colorblind separation (ΔE 5.6 deutan) and the normal-vision floor
  (ΔE 10.8) against the chart surface. The current pair clears every check — keep
  any replacement validated rather than swapping by eye.
- **Direct labels** mark each series' peak. When two peaks fall close enough to
  collide, only the higher one is labeled — the generator decides this, so a data
  edit may change which labels appear.
