import {
  about,
  contact,
  contactFields,
  earlyBirdFields,
  home,
  learn,
  nav,
  site,
} from "./content.mjs";

const pageMeta = {
  "/": {
    title: "EZ NRG | Customer-first energy strategy",
    description:
      "EZ NRG is reimagining how you participate in the future of energy.",
  },
  "/about": {
    title: "About EZ NRG",
    description:
      "Learn about EZ NRG, an early-stage energy strategy company focused on customer-aligned decentralized energy.",
  },
  "/learn": {
    title: "Energy Market Primer | EZ NRG",
    description:
      "Learn how deregulation, supplier contracts, and FERC 2222 shape customer-first energy strategy.",
  },
  "/contact": {
    title: "Contact EZ NRG",
    description:
      "Start a conversation with EZ NRG about customer-first energy strategy.",
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
  };

  return icons[name] ?? "";
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
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="container header-shell">
    <a class="brand" href="/" aria-label="EZ NRG home">
      <img src="/logo.svg" alt="EZ NRG" width="176" height="44">
    </a>
    <button class="menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">
      <span class="sr-only">Toggle navigation</span>
      ${icon("menu")}
    </button>
    <nav class="nav" id="primary-navigation" aria-label="Primary navigation" data-nav>
      ${links}
      <a class="button button-small" href="/#early-bird">Join Early-Bird List ${icon(
        "arrow",
      )}</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand footer-brand" href="/" aria-label="EZ NRG home">
        <img src="/logo.svg" alt="EZ NRG" width="176" height="44">
      </a>
      <p>Customer-first energy strategy for the decentralized energy future.</p>
    </div>
    <div class="footer-links">
      ${nav
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
  <meta name="theme-color" content="#07111F">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" href="/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/main.js" defer></script>
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
  ${header(path)}
  <main id="main">
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

function dashboardVisual() {
  const labels = home.dashboard.labels
    .map(
      (label, index) => `<div class="signal-row" style="--fill: ${
        42 + (index + 1) * 9
      }%">
        <span>${escapeHtml(label)}</span>
        <i aria-hidden="true"></i>
      </div>`,
    )
    .join("");

  return `<div class="hero-visual" aria-label="Abstract energy strategy dashboard">
    <div class="key-ghost" aria-hidden="true"></div>
    <div class="strategy-panel">
      <div class="panel-topline">
        <span>${escapeHtml(home.dashboard.title)}</span>
        <strong>${escapeHtml(home.dashboard.status)}</strong>
      </div>
      <div class="pulse-map" aria-hidden="true">
        <span class="pulse-line"></span>
        <span class="node node-a"></span>
        <span class="node node-b"></span>
        <span class="node node-c"></span>
      </div>
      <div class="signal-list">${labels}</div>
    </div>
  </div>`;
}

function cardGrid(items, className = "") {
  return `<div class="card-grid ${className}">
    ${items
      .map(
        (item) => `<article class="info-card reveal">
          <span class="card-icon">${icon("spark")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

function form(fields, submitLabel, successMessage, formName) {
  return `<form class="form-panel reveal" method="post" action="/api/contact" data-form="${attr(
    formName,
  )}">
    <input type="hidden" name="formType" value="${attr(formName)}">
    ${fields
      .map((field) => {
        const id = `${formName}-${field.name}`;
        if (field.type === "textarea") {
          return `<label for="${attr(id)}">${escapeHtml(field.label)}
            <textarea id="${attr(id)}" name="${attr(
              field.name,
            )}" autocomplete="${attr(field.autocomplete)}" required></textarea>
          </label>`;
        }

        return `<label for="${attr(id)}">${escapeHtml(field.label)}
          <input id="${attr(id)}" name="${attr(field.name)}" type="${attr(
            field.type,
          )}" autocomplete="${attr(field.autocomplete)}" required>
        </label>`;
      })
      .join("")}
    <button class="button button-primary" type="submit">${escapeHtml(
      submitLabel,
    )} ${icon("arrow")}</button>
    <p class="form-success" role="status" aria-live="polite" hidden>${escapeHtml(
      successMessage,
    )}</p>
    <p class="form-error" role="alert" hidden>Something went wrong. Please try again soon.</p>
  </form>`;
}

function learnSummaryCards() {
  return learn.summary
    .map(
      (item) => `<article class="learn-summary-card reveal">
        <span>${escapeHtml(item.label)}</span>
        <h3>${escapeHtml(item.value)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>`,
    )
    .join("");
}

function learnPrimer() {
  const tabs = learn.modules
    .map(
      (item, index) => `<button class="primer-tab${
        index === 0 ? " is-active" : ""
      }" type="button" role="tab" id="primer-tab-${attr(item.id)}" aria-selected="${
        index === 0 ? "true" : "false"
      }" aria-controls="primer-panel-${attr(item.id)}" data-primer-tab="${attr(
        item.id,
      )}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${escapeHtml(item.label)}
      </button>`,
    )
    .join("");

  const panels = learn.modules
    .map(
      (item, index) => `<article class="primer-panel${
        index === 0 ? " is-active" : ""
      }" role="tabpanel" id="primer-panel-${attr(item.id)}" aria-labelledby="primer-tab-${attr(
        item.id,
      )}" data-primer-panel="${attr(item.id)}"${index === 0 ? "" : " hidden"}>
        <p class="eyebrow">${escapeHtml(item.kicker)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
        <ul>
          ${item.bullets.map((bullet) => `<li>${icon("check")}<span>${escapeHtml(bullet)}</span></li>`).join("")}
        </ul>
      </article>`,
    )
    .join("");

  return `<div class="primer-shell reveal" data-primer>
    <div class="primer-tabs" role="tablist" aria-label="Energy market primer">
      ${tabs}
    </div>
    <div class="primer-panels">
      ${panels}
    </div>
  </div>`;
}

function watchlistCards() {
  return learn.watchlist
    .map(
      (item) => `<article class="watch-card reveal">
        <span class="card-icon">${icon("key")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>`,
    )
    .join("");
}

function sourceLinks() {
  return learn.sources
    .map(
      (source) => `<a href="${attr(source.href)}" target="_blank" rel="noreferrer">${escapeHtml(
        source.label,
      )}</a>`,
    )
    .join("");
}

export function renderHome() {
  return layout(
    "/",
    `<section class="hero section">
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <p class="eyebrow">${escapeHtml(home.hero.eyebrow)}</p>
          <h1>${escapeHtml(home.hero.title)}</h1>
          <p class="hero-body">${escapeHtml(home.hero.body)}</p>
          <div class="hero-actions">
            ${buttonLink("#early-bird", home.hero.primaryCta)}
            ${buttonLink("#shift", home.hero.secondaryCta, "secondary")}
          </div>
        </div>
        ${dashboardVisual()}
      </div>
    </section>
    <section class="section section-line" id="shift">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">The shift</p>
          <h2>${escapeHtml(home.shift.title)}</h2>
        </div>
        <p class="section-body reveal">${escapeHtml(home.shift.body)}</p>
      </div>
      <div class="container">${cardGrid(home.shift.cards)}</div>
    </section>
    <section class="section belief-section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">What EZ NRG believes</p>
          <h2>${escapeHtml(home.beliefs.title)}</h2>
        </div>
        <p class="section-body reveal">${escapeHtml(home.beliefs.body)}</p>
      </div>
      <div class="container principle-list">
        ${home.beliefs.principles
          .map(
            (item) => `<article class="principle reveal">
              <span>${icon("key")}</span>
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.body)}</p>
              </div>
            </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section cta-section" id="early-bird">
      <div class="container cta-grid">
        <div class="cta-copy reveal">
          <p class="eyebrow">Early access</p>
          <h2>${escapeHtml(home.finalCta.title)}</h2>
          <p>${escapeHtml(home.finalCta.body)}</p>
        </div>
        ${form(
          earlyBirdFields,
          "Join the Early-Bird List",
          "Thanks. You are on the early-bird list. We will reach out soon.",
          "early-bird",
        )}
      </div>
    </section>`,
  );
}

export function renderAbout() {
  return layout(
    "/about",
    `<section class="page-hero section">
      <div class="container narrow reveal">
        <p class="eyebrow">Company</p>
        <h1>${escapeHtml(about.title)}</h1>
        ${about.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </section>
    <section class="section founders-section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">Co-founders</p>
          <h2>Building with customers in the front seat.</h2>
        </div>
        <div class="founder-grid">
          ${about.founders
            .map(
              (founder) => `<article class="founder-card reveal">
                <span class="founder-mark">${escapeHtml(
                  founder.name
                    .split(" ")
                    .map((part) => part[0])
                    .join(""),
                )}</span>
                <h3>${escapeHtml(founder.name)}</h3>
                <p>${escapeHtml(founder.role)}</p>
              </article>`,
            )
            .join("")}
        </div>
        <p class="coming-soon reveal">${escapeHtml(about.note)}</p>
      </div>
    </section>`,
  );
}

export function renderLearn() {
  return layout(
    "/learn",
    `<section class="page-hero learn-hero section">
      <div class="container learn-hero-grid">
        <div class="reveal">
        <p class="eyebrow">Learn</p>
        <h1>${escapeHtml(learn.title)}</h1>
        <p>${escapeHtml(learn.body)}</p>
        </div>
        <div class="learn-market-map reveal" aria-label="Energy market evolution">
          <div>
            <span>1</span>
            <strong>Regulated utility</strong>
            <p>One default energy path</p>
          </div>
          <div>
            <span>2</span>
            <strong>Retail choice</strong>
            <p>Supplier contract risk</p>
          </div>
          <div>
            <span>3</span>
            <strong>Customer platform</strong>
            <p>Load, assets, and markets</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section learn-summary-section">
      <div class="container learn-summary-grid">
        ${learnSummaryCards()}
      </div>
    </section>
    <section class="section primer-section" id="primer">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">Interactive primer</p>
          <h2>From deregulation to customer-side markets.</h2>
        </div>
        <p class="section-body reveal">Use these sections as a fast education layer before comparing a supplier offer. The point is not that deregulation is good or bad in the abstract. The point is that customers need context before signing terms that determine who captures value.</p>
      </div>
      <div class="container">
        ${learnPrimer()}
      </div>
    </section>
    <section class="section contract-watch-section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">Contract watchlist</p>
          <h2>What the future agent will explain.</h2>
        </div>
        <p class="section-body reveal">Supplier contracts are where market design becomes customer reality. The future backend agent will look for the clauses that usually decide whether a contract is flexible, expensive, or aligned.</p>
      </div>
      <div class="container watch-grid">
        ${watchlistCards()}
      </div>
    </section>
    <section class="section upload-section" id="contract-upload">
      <div class="container upload-grid">
        <div class="upload-copy reveal">
          <p class="eyebrow">${escapeHtml(learn.upload.eyebrow)}</p>
          <h2>${escapeHtml(learn.upload.title)}</h2>
          <p>${escapeHtml(learn.upload.body)}</p>
          <div class="source-links" aria-label="Source links">
            <span>Source baseline</span>
            ${sourceLinks()}
          </div>
        </div>
        <div class="upload-panel reveal" data-contract-upload>
          <span class="upload-icon">${icon("file")}</span>
          <h3>Supplier agreement PDF</h3>
          <p>${escapeHtml(learn.upload.note)}</p>
          <label class="button button-primary contract-upload-button" for="supplier-contract-pdf">
            ${escapeHtml(learn.upload.button)} ${icon("upload")}
          </label>
          <input class="contract-file-input" id="supplier-contract-pdf" type="file" accept="application/pdf" data-contract-input>
          <p class="upload-status" data-contract-status role="status" aria-live="polite">No file selected.</p>
        </div>
      </div>
    </section>`,
  );
}

export function renderContact() {
  return layout(
    "/contact",
    `<section class="page-hero section">
      <div class="container narrow reveal">
        <p class="eyebrow">Contact</p>
        <h1>${escapeHtml(contact.title)}</h1>
        <p>${escapeHtml(contact.body)}</p>
      </div>
    </section>
    <section class="section contact-section">
      <div class="container cta-grid">
        <div class="cta-copy reveal">
          <p class="eyebrow">Early access</p>
          <h2>Start a focused conversation.</h2>
          <p>${escapeHtml(contact.earlyAccess)}</p>
        </div>
        ${form(
          contactFields,
          "Send Message",
          "Thanks. We received your message and will reach out soon.",
          "contact",
        )}
      </div>
    </section>`,
  );
}
