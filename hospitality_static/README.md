# hospitality_static/

A **standalone, unlisted** two-page site for hospitality operators:

| File | Served at | What it is |
| --- | --- | --- |
| `index.html` | `https://eznrg.ai/hospitality` | Landing page |
| `whitepaper/index.html` | `https://eznrg.ai/hospitality/whitepaper` | Full white paper — *The Flexible Hotel, a Grid Asset* |
| `img/*.png` | `/hospitality/img/…` | Seasonal load-profile charts (already mint-themed) |

## Why this folder exists (read before editing)

These pages are deliberately kept **separate from the generated site**:

- They are **not** produced by the render pipeline (`src/render.mjs` / `src/content.mjs`).
  Each is a single, self-contained HTML file with its own inline `<style>`. Neither has
  **any dependency on `src/styles.css`** — their styles only *mirror* the mint theme, so a
  future theme change on the main site cannot alter or break them. Both files carry their
  own copy of the same `:root` token block; **keep the two in sync** when the theme moves.
- They are **unlisted**: intentionally **not** in the `nav` array (so they never appear in
  the header or footer), **not** linked from the homepage, and **not** in
  `public/sitemap.xml`.
- Both carry `<meta name="robots" content="noindex">` so search engines skip them.
- Anyone with the URL can view them — there is **no login gate**. Share by direct link,
  email, or QR code.

## How it gets deployed

`scripts/build.mjs` copies this folder **recursively** to `dist/hospitality/` during the
build, so `whitepaper/` and `img/` come along automatically. With `cleanUrls: true` in
`vercel.json`, `dist/hospitality/index.html` is served at `/hospitality` and
`dist/hospitality/whitepaper/index.html` at `/hospitality/whitepaper`. That one `cp` line
is the *only* place shared code references this folder.

## The white paper

`whitepaper/index.html` is a static port of the authored white paper. The source was a
self-unpacking JS bundle (React + a custom `doc-page` runtime + Lucide, ~800 KB of
script); the content, data tables, and figures were extracted and re-rendered as plain
HTML so the page needs **no JavaScript to read**. The only script on the page is a small
progress-bar / active-section helper, and the Lucide icon paths are inlined as an SVG
`<symbol>` sprite.

Structure worth knowing:

- **Section rail** — sticky TOC at ≥1080px; the inline "Table of Contents" section is the
  fallback below that. Both are driven by the same `id`s; if you add a section, add it to
  *both* lists.
- **Citations** — `<a class="cite" href="#src-N">[N]</a>` link to `<li id="src-N">` in
  Appendix B. There are 27; keep the numbering contiguous.
- **Meter cross-refs** — `<a class="meter-ref" href="#prop-780">780</a>` link to the
  matching chart card in Appendix A.
- **Print** — `@media print` hides the header, rail, and CTA and flips to light text.

## Editing

- **Channel links:** replace the two `#REPLACE_ME_TELEGRAM` / `#REPLACE_ME_WHATSAPP`
  `href`s in `index.html` (search for `TELEGRAM_CHANNEL_URL` / `WHATSAPP_CHANNEL_URL`).
  These are still placeholders.
- **Landing-page figures:** every number in the hero stat band comes from the white paper.
  If a figure changes there, change it here too.
- Assets like `/logo.svg` come from `public/` (already deployed with the main site);
  the load-profile charts live in `img/` and are referenced as `../img/…` from the paper.
