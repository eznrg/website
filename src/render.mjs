import {
  about,
  contact,
  contactFields,
  enrollment,
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
  "/get-started": {
    title: "Get Started | EZ NRG",
    description:
      "Start the EZ NRG enrollment flow with contact details, utility information, process review, and a refundable deposit.",
  },
  "/get-started/deposit": {
    title: "Refundable Deposit | EZ NRG",
    description:
      "Place the refundable $500 deposit after completing the EZ NRG enrollment intake.",
  },
  "/get-started/intake": {
    title: "Enrollment Intake | EZ NRG",
    description:
      "Complete the step-by-step EZ NRG enrollment intake with contact and utility details.",
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
      <span class="visually-hidden sr-only">Toggle navigation</span>
      ${icon("menu")}
    </button>
    <nav class="nav" id="primary-navigation" aria-label="Primary navigation" data-nav>
      ${links}
      <a class="button button-small" href="/get-started">Enroll Now ${icon(
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
  <script>document.documentElement.classList.add("is-enhanced");</script>
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
  return `<div class="grid-layout grid-3 card-grid ${className}">
    ${items
      .map(
        (item) => {
          const body = item.body
            ? `<p class="muted-copy">${escapeHtml(item.body)}</p>`
            : "";

          return `<article class="surface-card surface-card-interactive surface-card-glow info-card reveal">
          <span class="icon-chip card-icon">${icon("spark")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          ${body}
        </article>`;
        },
      )
      .join("")}
  </div>`;
}

function form(fields, submitLabel, successMessage, formName, options = {}) {
  const successRedirect = options.successRedirect
    ? ` data-success-redirect="${attr(options.successRedirect)}"`
    : "";

  return `<form class="surface-card form-panel reveal" method="post" action="/api/contact" data-form="${attr(
    formName,
  )}"${successRedirect}>
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
    <p class="form-error" role="alert" hidden>Something went wrong. Please try again soon.</p>
  </form>`;
}

function enrollmentIntakeForm() {
  const stepLabels = enrollment.intake.steps
    .map(
      (label, index) => `<li class="${index === 0 ? "is-active" : ""}" data-enrollment-step-tab="${index}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${escapeHtml(label)}
      </li>`,
    )
    .join("");

  return `<form class="surface-card form-panel enrollment-flow reveal" method="post" action="/api/contact" enctype="multipart/form-data" data-form="enrollment" data-enrollment-flow data-success-redirect="/get-started/deposit">
    <input type="hidden" name="formType" value="enrollment">
    <input type="hidden" name="intakeStep" value="1" data-current-step>
    <ol class="enrollment-stepper" aria-label="Enrollment progress">
      ${stepLabels}
    </ol>

    <fieldset class="enrollment-step-panel is-active" data-enrollment-step="0">
      <span class="step-count">Step 1 of 3</span>
      <legend>Basic contact information</legend>
      <p>Start with the person EZ NRG should contact. The next screen asks for utility details.</p>
      <div class="enrollment-field-grid two">
        <label for="enrollment-name">Name
          <input id="enrollment-name" name="name" type="text" autocomplete="name" required>
        </label>
        <label for="enrollment-phone">Phone number
          <input id="enrollment-phone" name="phone" type="tel" autocomplete="tel" required>
        </label>
      </div>
      <div class="enrollment-form-actions">
        <button class="button button-primary" type="button" data-step-next data-save-contact-step>Continue to Utility ${icon("arrow")}</button>
      </div>
    </fieldset>

    <fieldset class="enrollment-step-panel" data-enrollment-step="1" hidden>
      <span class="step-count">Step 2 of 3</span>
      <legend>Email and utility choice</legend>
      <p>Start with your email. Then upload a utility bill PDF or image, or enter the account details manually.</p>
      <div class="enrollment-field-grid">
        <label class="wide" for="enrollment-email">Email
          <input id="enrollment-email" name="email" type="email" autocomplete="email" required>
        </label>
      </div>

      <div class="bill-choice" role="radiogroup" aria-label="Utility bill preference">
        <label>
          <input type="radio" name="billPreference" value="upload" checked data-bill-option="upload">
          Upload bill file
        </label>
        <label>
          <input type="radio" name="billPreference" value="manual" data-bill-option="manual">
          Enter manually
        </label>
      </div>

      <div class="surface-card surface-card-interactive surface-card-glow bill-panel upload-panel enrollment-upload-panel" data-bill-panel="upload" data-bill-upload>
        <span class="icon-chip upload-icon">${icon("file")}</span>
        <h3>Upload a utility bill</h3>
        <p class="muted-copy">Upload a PDF or bill picture and we will use it for the account number, service address, and utility market.</p>
        <label class="button button-primary contract-upload-button" for="utility-bill-file">
          Choose bill file ${icon("upload")}
        </label>
        <input class="visually-hidden contract-file-input" id="utility-bill-file" name="utilityBill" type="file" accept="application/pdf,image/*" data-bill-input>
        <p class="upload-status" data-bill-status role="status" aria-live="polite">No bill file selected.</p>
      </div>

      <div class="bill-panel manual-panel" data-bill-panel="manual" hidden>
        <div class="enrollment-field-grid two">
          <label for="enrollment-account">Utility account number
            <input id="enrollment-account" name="accountNumber" type="text" autocomplete="off" required>
          </label>
          <label for="enrollment-address">Service address
            <input id="enrollment-address" name="facility" type="text" autocomplete="street-address" required>
          </label>
          <label for="enrollment-utility">Utility market
            <input id="enrollment-utility" name="utility" type="text" autocomplete="off" placeholder="ComEd, PJM, ERCOT, etc." required>
          </label>
          <label for="enrollment-rate-class">Rate class or plan name
            <input id="enrollment-rate-class" name="rateClass" type="text" autocomplete="off">
          </label>
          <label for="enrollment-meter">Meter number
            <input id="enrollment-meter" name="meterNumber" type="text" autocomplete="off">
          </label>
          <label class="wide" for="enrollment-bill-notes">Bill details or recent usage notes
            <textarea id="enrollment-bill-notes" name="billNotes" autocomplete="off"></textarea>
          </label>
        </div>
      </div>

      <div class="enrollment-form-actions split">
        <button class="button button-secondary" type="button" data-step-prev>Back</button>
        <button class="button button-primary" type="button" data-step-next>Continue to Deposit ${icon("arrow")}</button>
      </div>
    </fieldset>

    <fieldset class="enrollment-step-panel" data-enrollment-step="2" hidden>
      <span class="step-count">Step 3 of 3</span>
      <legend>Refundable deposit comes last</legend>
      <div class="enrollment-deposit-preview">
        <p class="eyebrow">Refundable deposit</p>
        <h3>$500 starts the proposal workflow after intake.</h3>
        <p>Submit the intake now. The next page asks for the refundable deposit, and no payment is collected by this website until the payment integration is live.</p>
      </div>
      <div class="enrollment-form-actions split">
        <button class="button button-secondary" type="button" data-step-prev>Back</button>
        <button class="button button-primary" type="submit">${escapeHtml(
          enrollment.intake.submitLabel,
        )} ${icon("arrow")}</button>
      </div>
    </fieldset>

    <p class="form-success" role="status" aria-live="polite" hidden>${escapeHtml(
      enrollment.intake.successMessage,
    )}</p>
    <p class="form-error" role="alert" hidden>Something went wrong. Please try again soon.</p>
  </form>`;
}

function learnSummaryCards() {
  return learn.summary
    .map(
      (item) => `<article class="surface-card surface-card-interactive surface-card-glow learn-summary-card reveal">
        <span>${escapeHtml(item.label)}</span>
        <h3>${escapeHtml(item.value)}</h3>
        <p class="muted-copy">${escapeHtml(item.body)}</p>
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
      (item, index) => `<article class="surface-card primer-panel${
        index === 0 ? " is-active" : ""
      }" role="tabpanel" id="primer-panel-${attr(item.id)}" aria-labelledby="primer-tab-${attr(
        item.id,
      )}" data-primer-panel="${attr(item.id)}"${index === 0 ? "" : " hidden"}>
        <p class="eyebrow">${escapeHtml(item.kicker)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="muted-copy">${escapeHtml(item.body)}</p>
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
      (item) => `<article class="surface-card surface-card-interactive surface-card-glow watch-card reveal">
        <span class="icon-chip card-icon">${icon("key")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="muted-copy">${escapeHtml(item.body)}</p>
      </article>`,
    )
    .join("");
}

function channelCards() {
  return learn.channels.items
    .map(
      (item) => {
        const iconName = item.name.toLowerCase();
        const action = item.href
          ? `<a class="button button-primary channel-action" href="${attr(
              item.href,
            )}" target="_blank" rel="noreferrer">${escapeHtml(item.label)} ${icon(
              "arrow",
            )}</a>`
          : `<span class="button button-secondary channel-action is-disabled" aria-disabled="true">${escapeHtml(
              item.label,
            )} link coming soon</span>`;

        return `<article class="surface-card surface-card-interactive surface-card-glow channel-card reveal">
          <span class="icon-chip channel-icon">${icon(iconName)}</span>
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="muted-copy">${escapeHtml(item.body)}</p>
          </div>
          ${action}
        </article>`;
      },
    )
    .join("");
}

function storageSection() {
  const proof = home.storage.proof
    .map((item) => `<li>${icon("check")}<span>${escapeHtml(item)}</span></li>`)
    .join("");

  const cards = home.storage.cards
    .map(
      (item) => `<article class="surface-card surface-card-interactive surface-card-glow storage-card reveal">
        <span class="icon-chip card-icon">${icon("spark")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="muted-copy">${escapeHtml(item.body)}</p>
      </article>`,
    )
    .join("");

  return `<section class="section storage-section" id="storage-batteries">
    <div class="container storage-grid">
      <div class="storage-copy reveal">
        <p class="eyebrow">${escapeHtml(home.storage.eyebrow)}</p>
        <h2>${escapeHtml(home.storage.title)}</h2>
        <p>${escapeHtml(home.storage.body)}</p>
        <ul class="storage-proof">
          ${proof}
        </ul>
        <a class="button button-primary storage-offer" href="#early-bird">${escapeHtml(
          home.storage.offer,
        )} ${icon("arrow")}</a>
      </div>
      <div class="surface-card surface-card-interactive surface-card-glow storage-visual-card reveal" aria-label="110 kW ESS customer value stack">
        <div class="storage-visual-topline">
          <span>110 kW ESS</span>
          <strong>Ready</strong>
        </div>
        <div class="battery-stack" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="storage-meter-list">
          <div>
            <span>Demand Charge Reduction</span>
            <i style="--fill: 82%"></i>
          </div>
          <div>
            <span>Capacity</span>
            <i style="--fill: 68%"></i>
          </div>
          <div>
            <span>VPPs</span>
            <i style="--fill: 74%"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="container grid-layout grid-3 storage-card-grid">
      ${cards}
    </div>
  </section>`;
}

function enrollmentCards(items) {
  return `<div class="grid-layout grid-3 enrollment-card-grid">
    ${items
      .map(
        (item) => `<article class="surface-card surface-card-interactive surface-card-glow enrollment-card reveal">
          <span class="icon-chip card-icon">${icon("spark")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="muted-copy">${escapeHtml(item.body)}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

function enrollmentOverviewSections(items) {
  return `<div class="enrollment-scroll-sections">
    ${items
      .map(
        (item, index) => `<article class="enrollment-scroll-step reveal">
          <span class="enrollment-scroll-index">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2>${escapeHtml(item.title.replace(/^\d+\.\s*/, ""))}</h2>
            <p>${escapeHtml(item.body)}</p>
          </div>
        </article>`,
      )
      .join("")}
  </div>`;
}

function enrollmentOverviewActions() {
  return `<div class="enrollment-bottom-actions reveal">
    <div>
      <p class="eyebrow">Ready when you are</p>
      <h2>Start with a quick review.</h2>
      <p>Share the basics now so EZ NRG can start understanding your utility setup.</p>
    </div>
    <div class="hero-actions">
      ${buttonLink("/get-started/intake", enrollment.overview.primaryCta)}
    </div>
  </div>`;
}

function enrollmentHighlights(items) {
  return `<ul class="storage-proof enrollment-proof">
    ${items.map((item) => `<li>${icon("check")}<span>${escapeHtml(item)}</span></li>`).join("")}
  </ul>`;
}

function enrollmentNav(activePath) {
  const steps = [
    { href: "/get-started", label: "Overview" },
    { href: "/get-started/intake", label: "Intake" },
    { href: "/get-started/deposit", label: "Deposit" },
  ];

  return `<nav class="enrollment-nav" aria-label="Enrollment steps">
    ${steps
      .map(
        (step) => `<a href="${attr(step.href)}" class="${
          step.href === activePath ? "is-active" : ""
        }">${escapeHtml(step.label)}</a>`,
      )
      .join("")}
  </nav>`;
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
            ${buttonLink(home.hero.primaryHref, home.hero.primaryCta)}
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
    <section class="section section-band belief-section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">What EZ NRG believes</p>
          <h2>${escapeHtml(home.beliefs.title)}</h2>
        </div>
        <p class="section-body reveal">${escapeHtml(home.beliefs.body)}</p>
      </div>
    </section>
    ${storageSection()}
    <section class="section cta-section" id="early-bird">
      <div class="container cta-grid">
        <div class="cta-copy reveal">
          <p class="eyebrow">Early access</p>
          <h2>${escapeHtml(home.finalCta.title)}</h2>
          <p>${escapeHtml(home.finalCta.body)}</p>
        </div>
        <div class="grid-layout grid-2 channel-card-grid cta-channel-grid">
          ${channelCards()}
        </div>
      </div>
    </section>`,
  );
}

export function renderGetStarted() {
  return layout(
    "/get-started",
    `<section class="page-hero enrollment-hero section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">${escapeHtml(enrollment.overview.eyebrow)}</p>
          <h1>${escapeHtml(enrollment.overview.title)}</h1>
        </div>
        <div class="section-body reveal">
          <p>${escapeHtml(enrollment.overview.body)}</p>
        </div>
      </div>
    </section>
    <section class="section enrollment-section">
      <div class="container">
        ${enrollmentNav("/get-started")}
        ${enrollmentOverviewSections(enrollment.overview.steps)}
        ${enrollmentOverviewActions()}
      </div>
    </section>`,
  );
}

export function renderGetStartedDeposit() {
  return layout(
    "/get-started/deposit",
    `<section class="page-hero enrollment-hero section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">${escapeHtml(enrollment.deposit.eyebrow)}</p>
          <h1>${escapeHtml(enrollment.deposit.title)}</h1>
        </div>
        <div class="section-body reveal">
          <p>${escapeHtml(enrollment.deposit.body)}</p>
          ${enrollmentHighlights(enrollment.deposit.highlights)}
        </div>
      </div>
    </section>
    <section class="section enrollment-section">
      <div class="container enrollment-panel-grid">
        <div>
          ${enrollmentNav("/get-started/deposit")}
          <div class="surface-card surface-card-interactive surface-card-glow enrollment-payment-panel reveal">
            <p class="eyebrow">Payment status</p>
            <h2>${escapeHtml(enrollment.deposit.placeholder)}</h2>
            <p>No payment is collected on this website yet. This page is a skeleton for the future deposit step.</p>
            <span class="button button-secondary is-disabled" aria-disabled="true">Deposit payment not live</span>
          </div>
        </div>
        <aside class="surface-card surface-card-interactive surface-card-glow enrollment-aside reveal">
          <h3>Need to finish intake?</h3>
          <p>The deposit belongs at the end of the enrollment workflow after contact details and utility information.</p>
          ${buttonLink("/get-started/intake", enrollment.deposit.primaryCta)}
          ${buttonLink("/get-started", enrollment.deposit.secondaryCta, "secondary")}
        </aside>
      </div>
    </section>`,
  );
}

export function renderGetStartedIntake() {
  return layout(
    "/get-started/intake",
    `<section class="page-hero enrollment-hero intake-hero section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">${escapeHtml(enrollment.intake.eyebrow)}</p>
          <h1>${escapeHtml(enrollment.intake.title)}</h1>
        </div>
        <p class="section-body reveal">${escapeHtml(enrollment.intake.body)}</p>
      </div>
    </section>
    <section class="section enrollment-section">
      <div class="container">
        ${enrollmentNav("/get-started/intake")}
        ${enrollmentIntakeForm()}
      </div>
    </section>`,
  );
}

export function renderAbout() {
  return layout(
    "/about",
    `<section class="page-hero about-hero section">
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
          <h2>Building with customers.</h2>
        </div>
        <div class="grid-layout grid-2 founder-grid">
          ${about.founders
            .map(
              (founder) => `<article class="surface-card surface-card-interactive surface-card-glow founder-card reveal">
                <span class="founder-mark">${escapeHtml(
                  founder.name
                    .split(" ")
                    .map((part) => part[0])
                    .join(""),
                )}</span>
                <h3>${escapeHtml(founder.name)}</h3>
                <p class="muted-copy">${escapeHtml(founder.role)}</p>
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
    `<section class="section channel-section">
      <div class="container channel-grid">
        <div class="channel-copy reveal">
          <p class="eyebrow">${escapeHtml(learn.channels.eyebrow)}</p>
          <h2>${escapeHtml(learn.channels.title)}</h2>
          <p>${escapeHtml(learn.channels.body)}</p>
        </div>
        <div class="grid-layout grid-2 channel-card-grid">
          ${channelCards()}
        </div>
      </div>
    </section>
    <section class="section learn-summary-section">
      <div class="container grid-layout grid-3 learn-summary-grid">
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
    <section class="section section-band contract-watch-section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">Contract watchlist</p>
          <h2>What the future agent will explain.</h2>
        </div>
        <p class="section-body reveal">Supplier contracts are where market design becomes customer reality. The future backend agent will look for the clauses that usually decide whether a contract is flexible, expensive, or aligned.</p>
      </div>
      <div class="container grid-layout grid-3 watch-grid">
        ${watchlistCards()}
      </div>
    </section>
    <section class="section upload-section" id="contract-upload">
      <div class="container upload-grid">
        <div class="upload-copy reveal">
          <p class="eyebrow">${escapeHtml(learn.upload.eyebrow)}</p>
          <h2>${escapeHtml(learn.upload.title)}</h2>
          <p>${escapeHtml(learn.upload.body)}</p>
        </div>
        <div class="surface-card surface-card-interactive surface-card-glow upload-panel reveal" data-contract-upload>
          <span class="icon-chip upload-icon">${icon("file")}</span>
          <h3>Supplier agreement PDF</h3>
          <p class="muted-copy">${escapeHtml(learn.upload.note)}</p>
          <label class="button button-primary contract-upload-button" for="supplier-contract-pdf">
            ${escapeHtml(learn.upload.button)} ${icon("upload")}
          </label>
          <input class="visually-hidden contract-file-input" id="supplier-contract-pdf" type="file" accept="application/pdf" data-contract-input>
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
