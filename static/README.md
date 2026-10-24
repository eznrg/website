# static/

**Standalone, unlisted pages** that live outside the generated site. Each
`static/<name>/` folder is deployed to `dist/<name>/` and served at
`https://eznrg.ai/<name>`.

| Folder | Served at | What it is |
| --- | --- | --- |
| `hospitality/` | `/hospitality` | Landing page for hospitality operators |
| `hospitality/whitepaper/` | `/hospitality/whitepaper` | Full white paper — *The Flexible Hotel, a Grid Asset* |
| `commercial/` | `/commercial` | Landing page for Illinois commercial ratepayers |
| `commercial/brief/` | `/commercial/brief` | Full brief — *Price to Compare* |
| `residential/` | `/residential` | **Placeholder** — coming-soon page for homeowners |
| `shared/` | `/static/*` | Theme + scripts shared by the pages above |

## Why this folder exists (read before editing)

These pages are deliberately kept **separate from the generated site**:

- They are **not** produced by the render pipeline (`src/render.mjs` /
  `src/content.mjs`). Nothing here has **any dependency on `src/styles.css`** —
  `shared/tokens.css` only *mirrors* the main site's palette, so a future theme
  change on the main site cannot alter or break these pages.
- They are **unlisted**: intentionally **not** in the `nav` array (so they never
  appear in the header or footer), **not** linked from the homepage, and **not**
  in `public/sitemap.xml`.
- All of them carry `<meta name="robots" content="noindex">` so search engines
  skip them.
- Anyone with the URL can view them — share by direct link, email, or QR code.

## One system, two page types

All five pages are built from one theme and one component kit. There are two
page types:

- **Landing pages** (`/hospitality`, `/commercial`, `/residential`): short, dense,
  visual. The pattern is hero, stat band, icon cards, one evidence section (copy
  on the left, one figure on the right), a step sequence or flow, and a closing
  CTA card that points to the document.
- **Reading documents** (`/hospitality/whitepaper`, `/commercial/brief`): long
  form, with a sticky section rail, numbered sections, a key takeaway at the
  top of each section, in-text figures, tables, and print styles.

Every page has the same header (brand lockup, a tag or back link, and the
appearance control), the same footer, and the same light and dark themes.

## Theme: light and dark

`shared/tokens.css` mirrors the main site's palette (`src/styles.css`; the same
values as `shared/tokens-unified.css`). Light is the default; dark applies when
`data-theme="dark"` is set on `<html>`. Every page loads the main site's
`/assets/appearance.js` in its `<head>`, before the stylesheets, so the
**System / Light / Dark** choice is one shared preference (`eznrg-appearance` in
`localStorage`) across the main site and these pages. The header's `<select
data-appearance>` is the same control the main site renders. Without
JavaScript a page renders light, as the main site does.

The dark token block sits inside `@media screen`, so **every page prints light**
whatever the viewer's setting.

Rules for colour:

- **No raw colours outside `tokens.css`** (print blocks excepted). Accent tints
  use `rgba(var(--accent-rgb), <alpha>)`; translucent surfaces use
  `color-mix(in srgb, var(--surface) <n>%, transparent)`.
- The logo files are drawn for dark surfaces. On light (and on paper)
  `theme.css` darkens them with the same filters the main site uses.

## The shared layer

`shared/` is copied to `dist/static/`, so its files are served from `/static/`.
Link order matters; every page uses:

```
tokens.css -> theme.css -> doc.css (documents) -> viz.css (pages with charts) -> inline <style>
```

- **`tokens.css`**: the palette (light + dark), fonts, radii, `--max`,
  `--measure`, and the chart tokens (`--viz-*`). The one place colours live.
- **`theme.css`**: base and components for **all five pages**: reset, header,
  appearance control, eyebrow, buttons, hero, cards, stat band, steps and flow,
  evidence section, CTA card, channels, footer, reveal, and the `.takeaway`
  callout. A change here lands on every page; check all five.
- **`doc.css`**: what only the reading documents need: reading progress, the
  sticky rail, cover, section markers, TOC, tables, pull quote, chart cards,
  in-text figures, sources, document CTA, print.
- **`viz.css`**: the chart component: line charts, diverging columns, horizontal
  bars, stacked bars, readout, and data tables.
- **`doc.js`**: reading progress + active-section highlighting for the rail.
- **`viz.js`**: the hover / tap / keyboard readout for every `.viz` chart (month
  or hour x-axis; ¢, $ or kW units). Purely additive: every chart renders
  complete without it.
- **`reveal.js`**: the reveal-on-scroll helper on the landing pages. Purely
  additive.

Page-specific CSS stays in that page's own inline `<style>`, loaded last: the
hospitality hero, difference intro, load chart and sequence; the white paper's
citations, ladder and layers; the brief's sensitivity table and extension
aside. `residential/` has **no** CSS of its own.

The Google Fonts request is identical on every page (Space Grotesk 600; Inter
400, 600, 700; IBM Plex Mono 400, 600). If a component starts using another
weight, add it to all five.

## How it gets deployed

`scripts/build.mjs` copies `static/shared/` to `dist/static/`, then loops over a
`standalonePages` array copying each `static/<name>/` to `dist/<name>/`. The copy
is **recursive**, so nested pages like `hospitality/whitepaper/` come along with
no build change. **All `.md` files and `.DS_Store` are filtered out of the
deploy** — markdown under `static/` is source, never output. That covers this
README and the commercial brief's source document, which lives beside the page
built from it (`commercial/brief/IL_RATEPAYER_BRIEF_DRAFT.docx.md`). Keep
source documents as `.md` and they stay out of `dist/` automatically.

With `cleanUrls: true` in `vercel.json`, `dist/<name>/index.html` is served at
`/<name>`. That build block is the *only* place shared code references this
folder.

### Adding a page

1. Create `static/<name>/index.html`. Copy `residential/index.html` as the
   skeleton (it is the minimal one: `noindex` meta, `theme-color`, fonts,
   `appearance.js`, the stylesheet links, header with the appearance control,
   hero, channels, footer, `reveal.js`). Copy a reading document instead if the
   page is long form.
2. Add `"<name>"` to the `standalonePages` array in `scripts/build.mjs`.
3. Do **not** touch the `nav` array in `src/content.mjs`, `public/sitemap.xml`,
   `src/render.mjs`, or the `pages[]` array — that is what keeps it unlisted.

## Editing

- **Copy rule:** no em dashes or emoji in any `static/` `.html`, `.css` or `.js`
  file. `npm run build` runs `scripts/check-copy.mjs` first and fails on them.
- **Channel links:** every landing page has its own pair of
  `#REPLACE_ME_TELEGRAM` / `#REPLACE_ME_WHATSAPP` `href`s (search for
  `TELEGRAM_CHANNEL_URL` / `WHATSAPP_CHANNEL_URL`), and the brief's channel
  buttons are disabled ("available soon"). Still unset.
- **`residential/` is a placeholder.** It shows a "Coming soon." hero over the
  channels section. Replace the hero copy (marked `PLACEHOLDER COPY`) when the
  offering is ready.
- **Landing-page figures and charts come from the documents.** Every number in a
  landing page's stat band or evidence section is in its document, and each
  landing chart is a copy of a document chart (same `data-viz`, same table).
  If a figure changes in the document, change it on the landing page too:
  - `/hospitality` load chart = white paper Customer 1 / Meter 780.
  - `/commercial` stat band = the brief's cover stats.
  - `/commercial` chart (`#viz-ptc-teaser`) = the brief's `#viz-ptc`.
- **Key takeaways** (`.takeaway`, one per numbered section in each document)
  restate that section's own conclusion. A takeaway never introduces a number
  or claim the section does not make; if a section's argument changes, update
  its takeaway.
- Assets like `/logo-mark.svg` and `/logo-wordmark.svg` come from `public/`
  (already deployed with the main site). These pages ship no images of their own.

## The hospitality white paper

`hospitality/whitepaper/index.html` is a static port of the authored white paper.
The source was a self-unpacking JS bundle (React + a custom `doc-page` runtime +
Lucide, ~800 KB of script); the content, data tables, and figures were extracted
and re-rendered as plain HTML so the page needs **no JavaScript to read**. Its
only scripts are `doc.js` (progress bar, active section) and `viz.js` (chart
readout), and the Lucide icon paths are inlined as an SVG `<symbol>` sprite.

Structure worth knowing:

- **Section rail**: sticky TOC at ≥1080px; the inline "Table of Contents"
  section is the fallback below that. Both are driven by the same `id`s; if you
  add a section, add it to *both* lists.
- **Citations**: `<a class="cite" href="#src-N">[N]</a>` link to
  `<li id="src-N">` in Appendix B. Keep the numbering contiguous.
- **Meter cross-refs**: `<a class="meter-ref" href="#prop-780">780</a>` link to
  the matching chart card in Appendix A.
- **In-text figures**: section 03 shows Meter 780 (`#viz-780-fig`), a copy of the
  `#viz-780` chart in Appendix A; change both together. Section 04's growth bars
  (`#viz-growth`) chart the four figures stated in the paragraph above them.
- **Print**: `@media print` hides the header, rail, and CTA, and the page always
  prints in the light theme.

## The commercial brief

`commercial/brief/index.html` renders *Price to Compare*, an Illinois
ratepayer brief on ComEd default service versus retail (ARES) supply. Its source
document sits beside it as `IL_RATEPAYER_BRIEF_DRAFT.docx.md` and is **not**
deployed (see the build filter above).

It uses the same document layer as the white paper (`doc.css`), minus the
pieces it has no use for (`.cite`, `.meter-ref`, `.ladder`, `.layers`), and adds
its own sensitivity table and extension aside inline. Same sync rule as the
rail there: **the sticky `.rail` and the inline `.toc` are two lists driven by
the same `id`s; add a section to both.**

Things worth knowing before editing it:

- **Every figure derives from Appendix A.** The 30-row rate table (Jan 2024 –
  Jun 2026) is the only data source in the document; the scenarios, the totals,
  the 7.439¢ break-even, the sensitivity rows, the charts and the section 03
  stacked bar (`#viz-stack`, the 05-2025 and 05-2026 rows) are computed from it.
  Change a rate there and everything downstream is stale, including the
  `/commercial` landing page.
- **Section 09 is not part of the source brief.** The source stops at the end of
  2025; section 09 applies its method to the 2026 rates in its own appendix. It
  is wrapped in `.extension` and labelled "Beyond the brief · EzNRG" so the
  distinction survives a skim; its key takeaway sits after that label. Keep that
  labelling on any further extrapolation.
- **There are no numbered citations.** The source document's Sources section was
  empty, so this page has a *Sources & Method* section that names the data
  origin and writes out the assumptions instead of inventing references. Don't
  add `.cite` markup without real sources to point at.

## The charts

Every chart is **hand-built HTML/SVG**, not an image and not a charting library.
Line charts and columns are a `.viz` block: HTML for the gridlines, axis ticks,
legend, bars, direct labels and readout; a two-path `<svg>` (viewBox
`0 0 1000 1000`, `preserveAspectRatio="none"`, `vector-effect="non-scaling-stroke"`)
for the lines themselves. That split keeps axis text at real CSS pixels down to
320px and the strokes a true 2px at every width.

- **Everything renders with JavaScript off.** `viz.js` only adds the crosshair,
  markers and readout, plus arrow-key, Home, End and Escape navigation. Every
  value is also in the `<details>` table under each chart, or printed beside
  each bar.
- **Data lives inline** in `data-viz` on each `.viz-plot` (`lo`, `hi`, `x`, `u`,
  series `a` and `b`) and again in the table body. Change one, change the other.
  The load-profile values were digitized from the original Plotly PNG exports,
  which are in git history at commit `6cb96c1`
  (`hospitality_static/img/load-profile-meter-*.png`).
- **Series colours follow the entity, not the chart:** NET (realized default
  cost) orange, PTC blue, the fixed ARES rate teal; summer orange, winter blue.
  Savings teal, cost red. They live in `tokens.css` (`--viz-*`) with light and
  dark values.
- **The palette is validated, not eyeballed.** Each pair that shares a chart was
  checked with the dataviz validator against the chart surface in both themes
  (results are in the comment in `tokens.css`). PTC and ARES never share a chart;
  teal against blue is the weak pair in dark mode, so re-validate before putting
  them together. If you restyle a chart, re-run the validator rather than
  swapping hexes by eye.
- **No reading rests on hue alone.** Winter lines and keys are dashed; diverging
  charts carry the sign in bar direction and accounting parentheses; the stacked
  bar's adjustment segment is hatched and every value is written out; text
  (readouts, labels) is always ink, with a coloured swatch beside it.
- **Direct labels** mark each series' peak. When two peaks fall close enough to
  collide, only the higher one is labeled; a data edit may change which labels
  appear.

### Hospitality load chart

`hospitality/index.html` holds the static SVG, axis labels, seasonal highs, and
`data-viz` hourly values. Keep those values and the SVG synchronized with
Customer 1 / Meter 780 in `hospitality/whitepaper/index.html`.
`hospitality/load-chart.js` adds a shared hourly readout for pointer hover, touch,
and keyboard use (arrows, Home, End); the plot is exposed as a slider with the
selected hour and both seasonal values in its value text. It uses the same
`--viz-*` tokens as the document charts. Without JavaScript, the chart, peak
markers, seasonal highs, and supporting evidence link remain available.

Check hover, touch, keyboard endpoints, narrow-screen overflow, and agreement
with all 48 white-paper values when changing this chart.

### Commercial two-page reading flow

`/commercial` is the landing page: hero with the brief's cover stats, three
concept cards, the plant-to-meter flow from section 02, the Price to Compare vs.
realized NET chart from section 03 with its finding, and a CTA card. All
detailed analysis lives at `/commercial/brief`. The former
`/commercial/whitepaper` URL redirects permanently to the brief; it is not a
third content page. CFRA is excluded from calculations because it applies
across rate classes regardless of delivery classification; retain its
historical values in the appendix. Contact channels are at
`/commercial/brief#channels`.
