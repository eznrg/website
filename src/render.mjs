import {
  about,
  contact,
  contactFields,
  enrollment,
  enrollmentFields,
  home,
  learn,
  nav,
  site,
  ui,
} from "./content.mjs";

const pageMeta = {
  "/": {
    title: "EZ NRG | Energy priced by the hour, not the month",
    description:
      "EZ NRG reads your interval data before quoting a price, then backs that price with its own capital.",
  },
  "/about": {
    title: "About EZ NRG",
    description:
      "EZ NRG prices what it understands: load shapes, honest contracts, and a portfolio built on quality over quantity.",
  },
  "/learn": {
    title: "Energy Market Primer | EZ NRG",
    description:
      "How deregulation, supplier contracts, and FERC 2222 shape what your energy really costs — in about ninety seconds.",
  },
  "/contact": {
    title: "Contact EZ NRG",
    description:
      "Customers, investors, advisors, partners — start a real conversation with EZ NRG.",
  },
  "/get-started": {
    title: "Enroll | EZ NRG",
    description:
      "Reserve your spot with EZ NRG. Leave your name and number and we'll reach out within 24 hours about the refundable $500 deposit.",
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
      <a class="button button-small" href="/get-started">${escapeHtml(
        ui.headerCta,
      )} ${icon("arrow")}</a>
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

/*
  The hero visual: a real 24-hour interval curve rendered as inline SVG from
  home.curve.values. Off-peak hours draw in mint; the peak window is bracketed
  and filled in ember. This is the one piece of "art" on the site, and it is
  the product thesis drawn literally: a month is one number, a day has shape.
*/
function intervalCurve() {
  const { values, peakStart, peakEnd } = home.curve;
  const width = 480;
  const height = 220;
  const padX = 10;
  const padTop = 18;
  const baseline = height - 26;
  const stepX = (width - padX * 2) / (values.length - 1);
  const scaleY = (baseline - padTop) / 100;

  const pointFor = (value, index) => ({
    x: padX + index * stepX,
    y: baseline - value * scaleY,
  });

  const points = values.map(pointFor);

  // Smooth the polyline with Catmull-Rom -> cubic Bezier conversion.
  const path = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      const p0 = points[Math.max(0, index - 2)];
      const p1 = points[index - 1];
      const p2 = point;
      const p3 = points[Math.min(points.length - 1, index + 1)];
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      return `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    })
    .join(" ");

  const area = `${path} L ${points[points.length - 1].x.toFixed(1)} ${baseline} L ${points[0].x.toFixed(1)} ${baseline} Z`;

  const peakLeft = pointFor(0, peakStart).x;
  const peakRight = pointFor(0, peakEnd).x;

  const hourMarks = [0, 6, 12, 18, 23]
    .map((hour) => {
      const x = pointFor(0, hour).x;
      const label = hour === 0 ? "12am" : hour === 12 ? "12pm" : hour < 12 ? `${hour}am` : `${hour - 12}pm`;
      return `<text x="${x.toFixed(1)}" y="${height - 8}" class="curve-hour"${hour === 23 ? ' text-anchor="end"' : hour === 0 ? "" : ' text-anchor="middle"'}>${label}</text>`;
    })
    .join("");

  const readout = home.curve.readout
    .map(
      (item) => `<div class="curve-readout-item">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>`,
    )
    .join("");

  return `<figure class="hero-curve reveal" data-curve>
    <figcaption class="curve-topline">
      <span>${escapeHtml(home.curve.title)}</span>
      <span class="curve-legend">
        <i class="curve-key curve-key-mint" aria-hidden="true"></i>${escapeHtml(home.curve.offPeakLabel)}
        <i class="curve-key curve-key-ember" aria-hidden="true"></i>${escapeHtml(home.curve.peakLabel)}
      </span>
    </figcaption>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="A 24-hour energy load curve. Usage rises through the day and peaks in the late afternoon window, when energy costs the most.">
      <defs>
        <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--mint)" stop-opacity="0.28"/>
          <stop offset="1" stop-color="var(--mint)" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="peak-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--ember)" stop-opacity="0.34"/>
          <stop offset="1" stop-color="var(--ember)" stop-opacity="0.03"/>
        </linearGradient>
        <clipPath id="peak-clip">
          <rect x="${peakLeft.toFixed(1)}" y="0" width="${(peakRight - peakLeft).toFixed(1)}" height="${baseline}"/>
        </clipPath>
        <!--
          The inverse of peak-clip. The two area fills must not overlap: mint
          at 0.28 under ember at 0.30 composites to a muddy olive, which reads
          as a rendering mistake rather than as "this slice costs more".
          Each hue owns its own hours instead.
        -->
        <clipPath id="offpeak-clip">
          <rect x="0" y="0" width="${peakLeft.toFixed(1)}" height="${baseline}"/>
          <rect x="${peakRight.toFixed(1)}" y="0" width="${(width - peakRight).toFixed(1)}" height="${baseline}"/>
        </clipPath>
      </defs>
      <line x1="${padX}" y1="${baseline}" x2="${width - padX}" y2="${baseline}" class="curve-baseline"/>
      <path d="${area}" fill="url(#curve-fill)" clip-path="url(#offpeak-clip)"/>
      <path d="${area}" fill="url(#peak-fill)" clip-path="url(#peak-clip)"/>
      <path d="${path}" class="curve-line" pathLength="1"/>
      <path d="${path}" class="curve-line curve-line-peak" pathLength="1" clip-path="url(#peak-clip)"/>
      <line x1="${peakLeft.toFixed(1)}" y1="${padTop - 6}" x2="${peakLeft.toFixed(1)}" y2="${baseline}" class="curve-peak-edge"/>
      <line x1="${peakRight.toFixed(1)}" y1="${padTop - 6}" x2="${peakRight.toFixed(1)}" y2="${baseline}" class="curve-peak-edge"/>
      <text x="${((peakLeft + peakRight) / 2).toFixed(1)}" y="${padTop}" text-anchor="middle" class="curve-peak-label">${escapeHtml(home.curve.peakLabel)}</text>
      ${hourMarks}
    </svg>
    <div class="curve-readout">${readout}</div>
    <p class="curve-caption">${escapeHtml(home.curve.caption)}</p>
  </figure>`;
}

function proofStrip() {
  return `<section class="proof-strip" aria-label="What EZ NRG stands behind">
    <div class="container proof-grid">
      ${home.proof
        .map(
          (item) => `<div class="proof-item reveal">
            <strong>${escapeHtml(item.value)}</strong>
            <span>${escapeHtml(item.label)}</span>
          </div>`,
        )
        .join("")}
    </div>
  </section>`;
}

function howSteps() {
  return `<ol class="step-list">
    ${home.how.steps
      .map(
        (step) => `<li class="step reveal">
          <span class="step-index">${escapeHtml(step.index)}</span>
          <div>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.body)}</p>
          </div>
        </li>`,
      )
      .join("")}
  </ol>`;
}

function cardGrid(items, className = "") {
  return `<div class="card-grid ${className}">
    ${items
      .map(
        (item) => {
          const body = item.body
            ? `<p>${escapeHtml(item.body)}</p>`
            : "";

          return `<article class="info-card reveal">
          <span class="card-icon">${icon("spark")}</span>
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

        return `<article class="channel-card reveal">
          <span class="channel-icon">${icon(iconName)}</span>
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </div>
          ${action}
        </article>`;
      },
    )
    .join("");
}

function enrollAssurances(items) {
  return `<ul class="enroll-assurances">
    ${items
      .map(
        (item) => `<li class="reveal">
          <span class="enroll-check">${icon("check")}</span>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </div>
        </li>`,
      )
      .join("")}
  </ul>`;
}

/*
  Same empty-href convention as channelCards(): until a real invite link is
  pasted into home.finalCta.joinHref, the CTA degrades to a disabled button
  rather than shipping a dead link.
*/
function joinAction() {
  const { joinHref, joinLabel } = home.finalCta;

  if (!joinHref) {
    return `<span class="button button-secondary join-button is-disabled" aria-disabled="true">${escapeHtml(
      joinLabel,
    )} — link coming soon</span>`;
  }

  return `<a class="button button-primary join-button" href="${attr(
    joinHref,
  )}" target="_blank" rel="noreferrer">${escapeHtml(joinLabel)} ${icon("arrow")}</a>`;
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
            ${buttonLink(home.hero.secondaryHref, home.hero.secondaryCta, "secondary")}
          </div>
        </div>
        ${intervalCurve()}
      </div>
    </section>
    ${proofStrip()}
    <section class="section" id="shift">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">${escapeHtml(home.shape.eyebrow)}</p>
          <h2>${escapeHtml(home.shape.title)}</h2>
        </div>
        <div class="reveal">
          <p class="section-body">${escapeHtml(home.shape.body)}</p>
          <ul class="point-list">
            ${home.shape.points
              .map((point) => `<li>${icon("check")}<span>${escapeHtml(point)}</span></li>`)
              .join("")}
          </ul>
        </div>
      </div>
    </section>
    <section class="section how-section" id="how">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${escapeHtml(home.how.eyebrow)}</p>
          <h2>${escapeHtml(home.how.title)}</h2>
        </div>
        ${howSteps()}
      </div>
    </section>
    <section class="section contract-section">
      <div class="container contract-shell reveal">
        <p class="eyebrow">${escapeHtml(home.contract.eyebrow)}</p>
        <h2>${escapeHtml(home.contract.title)}</h2>
        <p class="section-body">${escapeHtml(home.contract.body)}</p>
        ${buttonLink(home.contract.ctaHref, home.contract.cta)}
      </div>
    </section>
    <section class="section cta-section" id="early-bird">
      <div class="container join-cta reveal">
        <span class="join-icon">${icon("telegram")}</span>
        <p class="eyebrow">${escapeHtml(home.finalCta.eyebrow)}</p>
        <h2>${escapeHtml(home.finalCta.title)}</h2>
        <p class="join-body">${escapeHtml(home.finalCta.body)}</p>
        ${joinAction()}
      </div>
    </section>`,
  );
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
        ${enrollAssurances(enrollment.assurances)}
      </div>
    </section>`,
  );
}

export function renderAbout() {
  return layout(
    "/about",
    `<section class="page-hero about-hero section">
      <div class="container narrow reveal">
        <p class="eyebrow">${escapeHtml(about.eyebrow)}</p>
        <h1>${escapeHtml(about.title)}</h1>
        ${about.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </section>
    <section class="section pillars-section">
      <div class="container pillars-list">
        ${about.pillars
          .map(
            (pillar) => `<article class="pillar reveal" id="${escapeHtml(pillar.id)}">
              <div class="pillar-head">
                <span class="pillar-index">${escapeHtml(pillar.index)}</span>
                <div>
                  <p class="eyebrow">${escapeHtml(pillar.eyebrow)}</p>
                  <h2>${escapeHtml(pillar.title)}</h2>
                </div>
              </div>
              <div class="pillar-body">
                ${pillar.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              </div>
            </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section founders-section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${escapeHtml(about.foundersEyebrow)}</p>
          <h2>${escapeHtml(about.foundersTitle)}</h2>
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
        <div class="about-cta reveal">${buttonLink(about.ctaHref, about.cta)}</div>
      </div>
    </section>`,
  );
}

export function renderLearn() {
  return layout(
    "/learn",
    `<section class="page-hero learn-hero section">
      <div class="container narrow reveal">
        <p class="eyebrow">${escapeHtml(learn.eyebrow)}</p>
        <h1>${escapeHtml(learn.title)}</h1>
        <p>${escapeHtml(learn.body)}</p>
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
          <p class="eyebrow">${escapeHtml(learn.primerEyebrow)}</p>
          <h2>${escapeHtml(learn.primerTitle)}</h2>
        </div>
      </div>
      <div class="container">
        ${learnPrimer()}
      </div>
    </section>
    <section class="section contract-watch-section">
      <div class="container split-intro">
        <div class="reveal">
          <p class="eyebrow">${escapeHtml(learn.watchEyebrow)}</p>
          <h2>${escapeHtml(learn.watchTitle)}</h2>
        </div>
        <p class="section-body reveal">${escapeHtml(learn.watchBody)}</p>
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
        </div>
        <div class="upload-panel reveal" data-contract-upload>
          <span class="upload-icon">${icon("file")}</span>
          <h3>${escapeHtml(learn.upload.panelTitle)}</h3>
          <p>${escapeHtml(learn.upload.note)}</p>
          <label class="button button-primary contract-upload-button" for="supplier-contract-pdf">
            ${escapeHtml(learn.upload.button)} ${icon("upload")}
          </label>
          <input class="contract-file-input" id="supplier-contract-pdf" type="file" accept="application/pdf" data-contract-input>
          <p class="upload-status" data-contract-status role="status" aria-live="polite">${escapeHtml(learn.upload.emptyState)}</p>
        </div>
      </div>
    </section>
    <section class="section channel-section">
      <div class="container channel-grid">
        <div class="channel-copy reveal">
          <p class="eyebrow">${escapeHtml(learn.channels.eyebrow)}</p>
          <h2>${escapeHtml(learn.channels.title)}</h2>
          <p>${escapeHtml(learn.channels.body)}</p>
        </div>
        <div class="channel-card-grid">
          ${channelCards()}
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
        <p class="eyebrow">${escapeHtml(contact.eyebrow)}</p>
        <h1>${escapeHtml(contact.title)}</h1>
        <p>${escapeHtml(contact.body)}</p>
      </div>
    </section>
    <section class="section contact-points-section">
      <div class="container">
        ${cardGrid(contact.points, "contact-point-grid")}
      </div>
    </section>
    <section class="section contact-section">
      <div class="container cta-grid">
        <div class="cta-copy reveal">
          <p class="eyebrow">${escapeHtml(contact.formEyebrow)}</p>
          <h2>${escapeHtml(contact.formTitle)}</h2>
          <p>${escapeHtml(contact.earlyAccess)}</p>
        </div>
        ${form(
          contactFields,
          contact.submitLabel,
          contact.successMessage,
          "contact",
        )}
      </div>
    </section>`,
  );
}
