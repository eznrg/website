# EZ NRG Website

Static marketing site for [eznrg.ai](https://eznrg.ai).

## Local preview

```bash
npm run dev
```

Then open `http://localhost:4173`.

`npm run dev` serves the static site and the `/api/contact` function locally. Plain static hosting can show the pages, but it cannot test form email delivery.

## Vercel

Use the Vercel project settings below:

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`
- Install command: default is fine

The same settings are also captured in `vercel.json`.

## Email Forms

The Home early-bird form and Contact form post to the Vercel Function at `/api/contact`.

Set these environment variables in Vercel before the production deploy:

```bash
RESEND_API_KEY=re_...
F1=founder-one-personal@example.com
F2=founder-two-personal@example.com
```

The function sends form notifications from `EZ NRG <founders@eznrg.ai>` to the private founder emails stored in `F1` and `F2`. Lowercase `f1` and `f2` are also supported. Verify `eznrg.ai` in Resend before using this in production.

In Vercel, add `F1` and `F2` under Project Settings -> Environment Variables. Add them to Production, Preview, and Development if you want forms to work on all deployment types.

Optional sender override:

```bash
RESEND_FROM_EMAIL="EZ NRG <founders@eznrg.ai>"
```

### DNS for Email Delivery

Add this DMARC TXT record wherever `eznrg.ai` DNS is managed:

| Type | Name / Host | Value |
| --- | --- | --- |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:founders@eznrg.ai; adkim=s; aspf=s` |

Some DNS providers want the full host instead:

```text
_dmarc.eznrg.ai
```

Use TTL `3600` or the provider default. After the record propagates, re-check the domain in Resend.

## Editing copy

Most site copy and page structure lives in `src/content.mjs`.

## Logo

The current mark is a placeholder. Replace `public/logo.svg` with the final logo when it is ready.
