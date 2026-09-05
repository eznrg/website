import {
  audit,
  enrollment,
  enrollmentFields,
  home,
  legalNav,
  nav,
  site,
  ui,
} from "./content.mjs";
import { privacy, terms } from "./legal.mjs";

const pageMeta = {
  "/": {
    title: "EZNRG | Electricity bill audits. No upfront cost.",
    description: site.description,
  },
  "/get-started": {
    title: "Enroll | EZ NRG",
    description:
      "Find out if your site qualifies. Leave your name and number and EZ NRG will reach out within 24 hours to walk you through the next steps.",
  },
  "/terms": {
    title: "Terms of Service | EZ NRG",
    description:
      "The terms that govern your use of eznrg.ai, including what the site is, what it isn't, and how it relates to a signed services agreement.",
  },
  "/privacy": {
    title: "Privacy Policy | EZ NRG",
    description:
      "What EZ NRG collects, why, who we share it with, and how to ask for a copy of your interval data or have it erased.",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function attr(value) {
  return escapeHtml(value);
}

function icon(name) {
  const icons = {
    arrow:
      '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h10.4M10.9 5.8 15.2 10l-4.3 4.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    spark:
      '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="m10 1.8 1.9 5.7 5.8 1.9-5.8 1.9L10 17l-1.9-5.7-5.8-1.9 5.8-1.9L10 1.8Z" fill="currentColor"/></svg>',
    key:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.4 9.6a4.8 4.8 0 1 1-2.2-2.2L21 16.2V20h-3.8v-2.7h-2.7v-2.6h-2.4l-2.6-2.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    upload:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 15V3m0 0 4.2 4.2M12 3 7.8 7.2M5 15.8V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    file:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M8.5 13h7M8.5 16.5h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check:
      '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="m4.2 10.3 3.4 3.4 8.2-8.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    telegram:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m20.2 4.6-3 15.2c-.2 1-1.1 1.3-1.9.8l-4.5-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.8L16.8 7c.4-.3-.1-.5-.5-.2L5.4 13.7.8 12.2c-1-.3-1-.9.2-1.4L19 3.8c.8-.3 1.5.2 1.2.8Z" fill="currentColor"/></svg>',
    whatsapp:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19.1 6 15.5a7.4 7.4 0 1 1 2.9 2.8L5 19.1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.2 8.8c.2-.5.4-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.4.5c-.1.1-.2.3-.1.5.4.8 1.2 1.6 2.1 2.1.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.6 0 .6-.4 1.5-1 1.7-.7.3-2 .1-3.6-.8-2.2-1.2-3.6-3.1-4.1-4.6-.4-1-.3-1.8.1-2.2Z" fill="currentColor"/></svg>',
  };

  return icons[name] ?? "";
}

/*
  The brand lockup is two images, not one: /logo-mark.svg (the hex EZ monogram)
  and /logo-wordmark.svg (the EZNRG lettering). Both are hand-authored vectors
  traced from the supplied artwork - see the comments inside each file. They are
  sized by .brand-mark / .brand-wordmark in styles.css, which key off height.

  The mark carries alt="" because it is decorative here: the wordmark already
  supplies the accessible name, and the anchor has its own aria-label.
*/
function brandLockup(extraClass = "") {
  return `<a class="brand${
    extraClass ? ` ${extraClass}` : ""
  }" href="/" aria-label="EZ NRG home">
      <img class="brand-mark" src="/logo-mark.svg" alt="" width="44" height="48">
      <img class="brand-wordmark" src="/logo-wordmark.svg" alt="EZ NRG" width="88" height="25">
    </a>`;
}

function header(path) {
  const links = nav
    .map((item) => {
      const active = item.href === path;
      return `<a href="${attr(item.href)}" class="nav-link${
        active ? " is-active" : ""
      }"${active ? ' aria-current="page"' : ""}>${escapeHtml(
        item.label,
      )}</a>`;
    })
    .join("");

  return `<header class="site-header" data-menu>
  <a class="skip-link" href="#main">${escapeHtml(ui.skipLink)}</a>
  <div class="container header-shell">
    ${brandLockup()}
    <button class="menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">
      <span class="sr-only">${escapeHtml(ui.menuLabel)}</span>
      ${icon("menu")}
    </button>
    <nav class="nav" id="primary-navigation" aria-label="Primary navigation" data-nav>
      ${links}
      ${auditButton("header")}
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      ${brandLockup("footer-brand")}
      <p>${escapeHtml(ui.footerTagline)}</p>
    </div>
    <div class="footer-links">
      ${nav
        .map((item) => `<a href="${attr(item.href)}">${escapeHtml(item.label)}</a>`)
        .join("")}
    </div>
  </div>
  <div class="container footer-legal">
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(ui.footerCopyright)}</p>
    <div class="footer-legal-links">
      ${legalNav
        .map((item) => `<a href="${attr(item.href)}">${escapeHtml(item.label)}</a>`)
        .join("")}
    </div>
  </div>
</footer>`;
}

function layout(path, content) {
  const meta = pageMeta[path] ?? pageMeta["/"];
  const canonical = `${site.url}${path === "/" ? "" : path}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${attr(meta.description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta property="og:title" content="${attr(meta.title)}">
  <meta property="og:description" content="${attr(meta.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${attr(canonical)}">
  <meta name="theme-color" content="#0b0e0d">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" href="/logo-mark.svg" type="image/svg+xml">
  <script>document.documentElement.classList.add("is-enhanced");</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/main.js" defer></script>
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body class="${path === "/" ? "landing-page" : "document-page"}">
  ${header(path)}
  <main id="main" tabindex="-1">
    ${content}
  </main>
  ${footer()}
</body>
</html>`;
}

function buttonLink(href, label, style = "primary") {
  return `<a class="button button-${style}" href="${attr(href)}">${escapeHtml(
    label,
  )} ${style === "primary" ? icon("arrow") : ""}</a>`;
}

function auditButton(location) {
  if (audit.href) return buttonLink(audit.href, audit.label);
  return `<span class="audit-action">
    <button class="button button-primary audit-unavailable" type="button" disabled aria-describedby="audit-status-${attr(location)}">${escapeHtml(audit.label)} ${icon("arrow")}</button>
    <span class="audit-status" id="audit-status-${attr(location)}">${escapeHtml(audit.unavailable)}</span>
  </span>`;
}

function sectionTitle(title) {
  return title.split("\n").map(escapeHtml).join("<br>");
}

function auditSummary() {
  const e = home.evidence;
  return `<figure class="audit-summary">
    <figcaption class="audit-summary-top"><span>${icon("file")} ${escapeHtml(e.status)}</span><span class="audit-tag">${escapeHtml(e.customer)}</span></figcaption>
    <div class="audit-summary-body">
      <p class="audit-summary-title">${escapeHtml(e.summaryTitle)}</p>
      <strong class="audit-amount">${escapeHtml(e.refundValue)}</strong>
      <p class="audit-amount-label">${escapeHtml(e.refundLabel)}</p>
      <div class="audit-rule" aria-hidden="true"><span></span><i></i></div>
      <div class="audit-time"><span class="audit-time-icon">${icon("check")}</span><div><strong>${escapeHtml(e.timeValue)}</strong><span>${escapeHtml(e.timeLabel)}</span></div></div>
    </div>
    <p class="audit-summary-note">${escapeHtml(e.note)}</p>
  </figure>`;
}

function form(fields, submitLabel, successMessage, formName, options = {}) {
  const successRedirect = options.successRedirect
    ? ` data-success-redirect="${attr(options.successRedirect)}"`
    : "";
  const hideOnSuccess = options.hideOnSuccess ? " data-hide-on-success" : "";

  return `<form class="form-panel reveal" method="post" action="/api/contact" data-form="${attr(
    formName,
  )}"${successRedirect}${hideOnSuccess}>
    <input type="hidden" name="formType" value="${attr(formName)}">
    ${fields
      .map((field) => {
        const id = `${formName}-${field.name}`;
        const required = field.required === false ? "" : " required";
        const autocomplete = field.autocomplete || "off";

        if (field.type === "textarea") {
          return `<label for="${attr(id)}">${escapeHtml(field.label)}
            <textarea id="${attr(id)}" name="${attr(
              field.name,
            )}" autocomplete="${attr(autocomplete)}"${required}></textarea>
          </label>`;
        }

        return `<label for="${attr(id)}">${escapeHtml(field.label)}
          <input id="${attr(id)}" name="${attr(field.name)}" type="${attr(
            field.type,
          )}" autocomplete="${attr(autocomplete)}"${required}>
        </label>`;
      })
      .join("")}
    <button class="button button-primary" type="submit">${escapeHtml(
      submitLabel,
    )} ${icon("arrow")}</button>
    <p class="form-success" role="status" aria-live="polite" hidden>${escapeHtml(
      successMessage,
    )}</p>
    <p class="form-error" role="alert" hidden>${escapeHtml(ui.formError)}</p>
  </form>`;
}

export function renderHome() {
  const { hero, evidence, how, after, strategy, services, faq, closing } = home;
  return layout("/", `
    <section class="section audit-hero">
      <div class="container audit-hero-grid">
        <div class="audit-hero-copy">
          <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
          <h1>${hero.title.map((line, i) => `<span${i === 1 ? ' class="mint-text"' : ""}>${escapeHtml(line)}</span>`).join("")}</h1>
          <p class="audit-intro">${escapeHtml(hero.body)}</p>
          <div class="audit-hero-actions">${auditButton("hero")}${buttonLink("#how", hero.secondaryCta, "secondary")}</div>
          <ul class="audit-reassurances">${hero.reassurances.map(text => `<li>${icon("check")}${escapeHtml(text)}</li>`).join("")}</ul>
        </div>
        <div class="audit-visual"><span class="visual-label">${escapeHtml(evidence.label)}</span>${auditSummary()}</div>
      </div>
    </section>
    <section class="customer-story" aria-label="Customer experience">
      <figure class="container customer-quote">
        <span class="quote-mark" aria-hidden="true">“</span>
        <blockquote><p>“${escapeHtml(evidence.quote)}.”</p></blockquote><figcaption><strong>${escapeHtml(evidence.customer)}</strong><span>${escapeHtml(evidence.caption)}</span></figcaption>
      </figure>
    </section>
    <section class="section audit-how" id="how">
      <div class="container">
        <div class="audit-section-heading"><div><p class="eyebrow">${escapeHtml(how.eyebrow)}</p><h2>${sectionTitle(how.title)}</h2></div><p>${escapeHtml(how.body)}</p></div>
        <ol class="audit-steps">${how.steps.map(step => `<li><span class="audit-step-number">${escapeHtml(step.index)}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></li>`).join("")}</ol>
      </div>
    </section>
    <section class="section audit-after" id="after">
      <div class="container after-grid">
        <div><p class="eyebrow">${escapeHtml(after.eyebrow)}</p><h2>${sectionTitle(after.title)}</h2><p class="audit-section-body">${escapeHtml(after.body)}</p>
          <div class="recovery-card"><h3>${escapeHtml(after.feeTitle)}</h3><div class="recovery-split"><div><strong>${escapeHtml(after.yourShare)}</strong><span>${escapeHtml(after.yourLabel)}</span></div><div><strong>${escapeHtml(after.ourShare)}</strong><span>${escapeHtml(after.ourLabel)}</span></div></div><p>${escapeHtml(after.feeNote)}</p></div>
        </div>
        <div class="after-options">${after.options.map((item,i) => `<article><span class="option-marker" aria-hidden="true">${String(i+1).padStart(2,"0")}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></div></article>`).join("")}</div>
      </div>
    </section>
    <section class="section audit-strategy" id="why-eznrg">
      <div class="container"><div class="audit-section-heading"><div><p class="eyebrow">${escapeHtml(strategy.eyebrow)}</p><h2>${sectionTitle(strategy.title)}</h2></div><p>${escapeHtml(strategy.body)}</p></div>
        <div class="strategy-pillars">${strategy.pillars.map((item,i) => `<article><span class="strategy-icon">${icon(["key","file","spark"][i])}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("")}</div>
        <p class="strategy-note">${icon("check")}${escapeHtml(strategy.note)}</p>
      </div>
    </section>
    <section class="section energy-services" id="energy-services">
      <div class="container">
        <div class="audit-section-heading"><div><p class="eyebrow">${escapeHtml(services.eyebrow)}</p><h2>${sectionTitle(services.title)}</h2></div><p>${escapeHtml(services.body)}</p></div>
        <div class="service-grid">${services.items.map(item => `<article><span class="service-number">${escapeHtml(item.index)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("")}</div>
        <p class="service-note">${escapeHtml(services.note)}</p>
      </div>
    </section>
    <section class="section audit-faq" id="faq">
      <div class="container faq-grid"><div><p class="eyebrow">${escapeHtml(faq.eyebrow)}</p><h2>${sectionTitle(faq.title)}</h2></div><div class="faq-list">${faq.items.map(item => `<details><summary>${escapeHtml(item.question)}<span aria-hidden="true" class="faq-plus">+</span></summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</div></div>
    </section>
    <section class="section audit-closing" id="start"><div class="container"><p class="eyebrow">${escapeHtml(closing.eyebrow)}</p><h2>${sectionTitle(closing.title)}</h2><p>${escapeHtml(closing.body)}</p>${auditButton("closing")}</div></section>
  `);
}

export function renderGetStarted() {
  return layout(
    "/get-started",
    `<section class="page-hero enroll-hero section">
      <div class="container narrow enroll-intro reveal">
        <p class="eyebrow">${escapeHtml(enrollment.eyebrow)}</p>
        <h1>${escapeHtml(enrollment.title)}</h1>
        <p>${escapeHtml(enrollment.body)}</p>
      </div>
    </section>
    <section class="section enroll-section">
      <div class="container enroll-shell">
        ${form(
          enrollmentFields,
          enrollment.submitLabel,
          enrollment.successMessage,
          "enrollment",
          { hideOnSuccess: true },
        )}
      </div>
    </section>`,
  );
}

/*
  Terms and Privacy share one shape (see src/legal.mjs), so they share one
  renderer. Sections carry `paragraphs`, an optional `bullets` list, and
  optional `trailing` paragraphs that land after the bullets.
*/
function renderLegalDoc(path, doc) {
  const section = (item) => `<section class="legal-section reveal">
        <h2>${escapeHtml(item.heading)}</h2>
        ${(item.paragraphs ?? []).map((text) => `<p>${escapeHtml(text)}</p>`).join("")}
        ${
          item.bullets
            ? `<ul>${item.bullets
                .map((text) => `<li>${escapeHtml(text)}</li>`)
                .join("")}</ul>`
            : ""
        }
        ${(item.trailing ?? []).map((text) => `<p>${escapeHtml(text)}</p>`).join("")}
      </section>`;

  return layout(
    path,
    `<section class="page-hero legal-hero section">
      <div class="container narrow reveal">
        <p class="eyebrow">${escapeHtml(doc.eyebrow)}</p>
        <h1>${escapeHtml(doc.title)}</h1>
        <p class="legal-effective">${escapeHtml(doc.effective)}</p>
        ${doc.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </section>
    <section class="section legal-section-wrap">
      <div class="container narrow legal-body">
        ${doc.sections.map(section).join("")}
      </div>
    </section>`,
  );
}

export function renderTerms() {
  return renderLegalDoc("/terms", terms);
}

export function renderPrivacy() {
  return renderLegalDoc("/privacy", privacy);
}
