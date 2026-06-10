# EZ NRG Website

Static marketing site for [eznrg.ai](https://eznrg.ai).

## Local preview

```bash
npm run dev
```

Then open `http://localhost:4173`.

`npm run dev` serves the static site and the `/api/contact` function locally.

## Vercel

Use the Vercel project settings below:

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`
- Install command: default is fine

The same settings are also captured in `vercel.json`.

## Password Protection

Set these environment variables in Vercel before deploying:

```bash
SITE_PASSWORD=
AUTH_SECRET=
```

`SITE_PASSWORD` is required. If it is missing, the site fails closed instead of exposing the website.

## Email Forms

Set these environment variables in Vercel for form delivery:

```bash
RESEND_API_KEY=
F1=
F2=
RESEND_FROM_EMAIL=
```

## Editing copy

Most site copy and page structure lives in `src/content.mjs`.
