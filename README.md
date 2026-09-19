# EzNRG Website

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

## Audit landing page

The main site is now one page, with section navigation. `src/content.mjs`
contains the copy and the shared destinations. `audit.href` opens the platform
enrollment flow and `login.href` opens the shared customer/staff sign-in page.
The AWS/Django platform owns the connected Start Audit submission and account
activation flow. The static preview renders the same visual shell but uses its
own contact endpoint.

`/about`, `/learn`, and `/contact` permanently redirect to the relevant homepage
sections. `vercel.json` owns the redirects; the local preview server reads the
same configuration. The sitemap lists only `/`, `/terms`, and `/privacy`.
Unlisted campaign pages and whitepapers remain unchanged and reachable by direct
link. Their service claims are outside this landing-page revision.

The hospitality testimonial was supplied by the owner with permission for
anonymous publication. Its $5,000+ figure represents eligible refunds identified,
not a confirmed recovery. The approximately two hours saved per month describes
that customer's reporting solution, not a universal audit outcome.

### Before public launch

Before publishing:

- Verify the platform-owned account/bill-upload destination before launch.
- Align onboarding and welcome emails with recovery-based fees, optional
  continuation, and supported service territories.
- Review the existing Terms and Privacy pages against the actual onboarding,
  data handling, and service agreement. Their prose is unchanged in this phase.
- Verify the complete signup/upload journey before enabling the audit buttons.
