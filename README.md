# EZ NRG Website

Static marketing site for [eznrg.ai](https://eznrg.ai).

## Local preview

```bash
npm run dev
```

Then open `http://localhost:4173`.

`npm run dev` serves the static site and the `/api/contact` function locally.
Local preview does not require a password unless you set `SITE_PASSWORD` in `.env`.

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
This fail-closed behavior applies to Vercel. Local preview is intentionally unlocked when `SITE_PASSWORD` is not set.

## Email Forms

Set these environment variables in Vercel for form delivery:

```bash
RESEND_API_KEY=
F1=
F2=
RESEND_FROM_EMAIL=
```

The first enrollment step saves name and phone immediately during local preview.
By default, those demo leads are appended to `data/enrollment-contact-leads.csv`.
Set `ENROLLMENT_CONTACT_CSV` to write the demo CSV somewhere else.

For local enrollment-flow testing without configuring Resend, keep the
`formType === "enrollment-contact"` CSV branch active and temporarily
short-circuit only the later full enrollment submit. Add the temporary bypass in
`api/contact.js` after the `isEnrollmentContactCapture(formType)` branch returns
and before the `RESEND_API_KEY` check:

```js
if (isEnrollment) {
  return json({ ok: true, skippedEmail: true });
}
```

This lets step 1 continue saving name and phone to the local CSV while the final
`formType === "enrollment"` submit skips email delivery. Remove the bypass before
using the full production enrollment workflow.

## Editing copy

Most site copy and page structure lives in `src/content.mjs`.
