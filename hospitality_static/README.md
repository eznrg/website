# hospitality_static/

A **standalone, unlisted landing page** for hospitality operators, served at
**https://eznrg.ai/hospitality**.

## Why this folder exists (read before editing)

This page is deliberately kept **separate from the generated site**:

- It is **not** produced by the render pipeline (`src/render.mjs` / `src/content.mjs`).
  It is a single, self-contained `index.html` with its own inline `<style>`. It has
  **no dependency on `src/styles.css`** — its styles only *mirror* the mint theme, so a
  future theme change on the main site cannot alter or break this page.
- It is **unlisted**: it is intentionally **not** in the `nav` array (so it never appears
  in the header or footer), **not** linked from the homepage, and **not** in
  `public/sitemap.xml`.
- It carries `<meta name="robots" content="noindex">` so search engines skip it.
- Anyone with the URL can view it — there is **no login gate**. Share it by direct link,
  email, or QR code.

## How it gets deployed

`scripts/build.mjs` copies this folder verbatim to `dist/hospitality/` during the build.
With `cleanUrls: true` in `vercel.json`, `dist/hospitality/index.html` is served at
`/hospitality`. That one `cp` line is the *only* place shared code references this folder.

## Editing

- **Channel links:** replace the two `#REPLACE_ME_TELEGRAM` / `#REPLACE_ME_WHATSAPP`
  `href`s in `index.html` (search for `TELEGRAM_CHANNEL_URL` / `WHATSAPP_CHANNEL_URL`).
- **Copy:** the hero and value sections currently hold placeholder text and will be
  replaced with content from the hospitality white paper.
- Assets like `/logo.svg` come from `public/` (already deployed with the main site).
