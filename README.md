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

## Audit landing page preview

The main site is now one page, with section navigation. `src/content.mjs`
contains the copy and the shared `audit.href` setting. An empty destination
renders every audit action as a disabled button with an “Available soon” label.
No bill upload, signup, or form submission is connected to these actions.

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

This change is for local review; it has not been deployed. Before publishing:

- Supply the real account/bill-upload destination in `audit.href` and verify it.
- Replace or retire the legacy `/get-started` intake, which remains reachable by
  direct URL but is not linked from the new main site. It still describes the
  older deposit-based offer and must not be used for the audit journey.
- Align onboarding and welcome emails with recovery-based fees, optional
  continuation, and supported service territories.
- Review the existing Terms and Privacy pages against the actual onboarding,
  data handling, and service agreement. Their prose is unchanged in this phase.
- Verify the complete signup/upload journey before enabling the audit buttons.
