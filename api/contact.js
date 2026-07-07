const FOUNDERS_EMAIL = "founders@eznrg.ai";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RECIPIENT_ENV_KEYS = [
  ["f1", "F1"],
  ["f2", "F2"],
];

// TODO: fill in the real invite links once the channels exist.
const TELEGRAM_INVITE_URL = "";
const WHATSAPP_INVITE_URL = "";

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers ?? {}),
    },
  });
}

function sanitize(value, maxLength = 2000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return sanitize(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFounderRecipients() {
  const missing = [];
  const recipients = RECIPIENT_ENV_KEYS.map((keys) => {
    const value = keys.map((key) => process.env[key]).find(Boolean);
    const email = sanitize(value, 320).toLowerCase();

    if (!email || !isEmail(email)) {
      missing.push(keys[0]);
      return "";
    }

    return email;
  }).filter(Boolean);

  return {
    missing,
    recipients: [...new Set(recipients)],
  };
}

async function readBody(request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  return {};
}

function formLabel(formType) {
  if (formType === "early-bird") return "Early-bird list";
  if (formType === "enrollment") return "Enrollment intake";
  return "Contact form";
}

function buildEmail({
  company,
  email,
  facility,
  formType,
  goalsTiming,
  loadContext,
  message,
  name,
  phone,
  role,
  utility,
}) {
  const label = formLabel(formType);
  const subject = `EZ NRG ${label}: ${name}`;
  const rows = [
    ["Form", label],
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Role or title", role],
    ["Phone", phone],
    ["Facility or service address", facility],
    ["Utility / market", utility],
    ["Current load, demand, or bill context", loadContext],
    ["Goals / timing", goalsTiming],
    ["Message / interest", message],
  ].filter(([, value]) => value);

  const text = rows.map(([key, value]) => `${key}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([key, value]) => `<tr>
        <th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(
          key,
        )}</th>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(
          value,
        ).replaceAll("\n", "<br>")}</td>
      </tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
    <h1 style="font-size:20px;margin:0 0 16px;">${escapeHtml(label)}</h1>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px;">${htmlRows}</table>
  </div>`;

  return { html, subject, text };
}

function buildWelcomeEmail({ name }) {
  const subject = "Welcome to EZ NRG";
  const greetingName = name ? escapeHtml(name) : "there";

  const telegramLine = TELEGRAM_INVITE_URL
    ? `<a href="${escapeHtml(TELEGRAM_INVITE_URL)}">Join our Telegram</a>`
    : "Join our Telegram (link/channel missing)";
  const whatsappLine = WHATSAPP_INVITE_URL
    ? `<a href="${escapeHtml(WHATSAPP_INVITE_URL)}">Join our WhatsApp</a>`
    : "Join our WhatsApp (link/channel account missing)";

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:640px;">
    <h1 style="font-size:22px;margin:0 0 16px;">Welcome to EZ NRG, ${greetingName}.</h1>
    <p>Thanks for reserving your spot. You're now first in line as we build the customer-first energy platform for the decentralized energy future.</p>
    <p>Here's what that means for you: EZ NRG is building the coordination, optimization, and settlement layer that turns energy complexity into confidence. Our DeFi-powered platform acts as a verification tool &mdash; a trust layer between customers, asset owners, and market partners &mdash; so savings, flexibility value, and program revenue are shared clearly and fairly. No bait-and-switch contracts or teaser rates you need a lawyer to decode. Just one straightforward, double-sided contract, built around what's best for you.</p>
    <p>Your $500 deposit is fully refundable &mdash; if you ever decide not to move forward, you get it all back. No payment is being collected right now.</p>
    <p>While you wait, join the conversation: ${telegramLine} &middot; ${whatsappLine}.</p>
    <p>We'll reach out within 24 hours via text message to coordinate and set up a call from there :)</p>
    <p>Talk soon,<br>The EZ NRG Team</p>
  </div>`;

  const text = [
    `Welcome to EZ NRG, ${name || "there"}.`,
    "",
    "Thanks for reserving your spot. You're now first in line as we build the customer-first energy platform for the decentralized energy future.",
    "",
    "Here's what that means for you: EZ NRG is building the coordination, optimization, and settlement layer that turns energy complexity into confidence. Our DeFi-powered platform acts as a verification tool - a trust layer between customers, asset owners, and market partners - so savings, flexibility value, and program revenue are shared clearly and fairly. No bait-and-switch contracts or teaser rates you need a lawyer to decode. Just one straightforward, double-sided contract, built around what's best for you.",
    "",
    "Your $500 deposit is fully refundable - if you ever decide not to move forward, you get it all back. No payment is being collected right now.",
    "",
    `While you wait, join the conversation: Join our Telegram ${TELEGRAM_INVITE_URL || "(link/channel missing)"} / Join our WhatsApp ${WHATSAPP_INVITE_URL || "(link/channel account missing)"}`,
    "",
    "We'll reach out within 24 hours via text message to coordinate and set up a call from there :)",
    "",
    "Talk soon,",
    "The EZ NRG Team",
  ].join("\n");

  return { html, subject, text };
}

async function sendWelcomeEmail({ apiKey, from, name, to }) {
  const { html, subject, text } = buildWelcomeEmail({ name });

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });

  if (!response.ok) {
    let detail = "Resend request failed.";
    try {
      const errorBody = await response.json();
      detail = errorBody.message || errorBody.error || detail;
    } catch {
      detail = await response.text();
    }

    console.error("Resend welcome email error:", detail);
  }
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, { status: 405 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return json(
        { error: "Email service is not configured yet." },
        { status: 503 },
      );
    }

    const { missing, recipients } = getFounderRecipients();
    if (missing.length > 0) {
      console.error(`Missing founder recipient env vars: ${missing.join(", ")}`);
      return json(
        { error: "Founder recipient emails are not configured yet." },
        { status: 503 },
      );
    }

    let payload;
    try {
      payload = await readBody(request);
    } catch {
      return json({ error: "Invalid form payload." }, { status: 400 });
    }

    const formType = sanitize(payload.formType, 40);
    const name = sanitize(payload.name, 160);
    const email = sanitize(payload.email, 320).toLowerCase();
    const company = sanitize(payload.company, 180);
    const role = sanitize(payload.role, 180);
    const phone = sanitize(payload.phone, 80);
    const facility = sanitize(payload.facility, 300);
    const utility = sanitize(payload.utility, 180);
    const loadContext = sanitize(payload.loadContext, 2000);
    const goalsTiming = sanitize(payload.goalsTiming, 2000);
    const message = sanitize(payload.message, 2000);
    const isEnrollment = formType === "enrollment";

    const missingRequired = isEnrollment
      ? !name || !phone
      : !name || !email || !company || !message;

    // Enrollment only needs a name and phone. Email is optional there, but if
    // one is provided it still has to be valid. Other forms require a valid email.
    const emailInvalid = isEnrollment
      ? Boolean(email) && !isEmail(email)
      : !isEmail(email);

    if (missingRequired || emailInvalid) {
      let error = "Please complete the form with a valid email address.";
      if (isEnrollment) {
        error = missingRequired
          ? "Please add your name and a phone number."
          : "That email address doesn't look right — or just leave it blank.";
      }

      return json({ error }, { status: 400 });
    }

    const { html, subject, text } = buildEmail({
      company,
      email,
      facility,
      formType,
      goalsTiming,
      loadContext,
      message,
      name,
      phone,
      role,
      utility,
    });

    const from = process.env.RESEND_FROM_EMAIL || `EZ NRG <${FOUNDERS_EMAIL}>`;

    const emailPayload = {
      from,
      to: recipients,
      subject,
      html,
      text,
    };
    if (email) {
      emailPayload.reply_to = email;
    }

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      let detail = "Resend request failed.";
      try {
        const errorBody = await response.json();
        detail = errorBody.message || errorBody.error || detail;
      } catch {
        detail = await response.text();
      }

      console.error("Resend error:", detail);
      return json(
        { error: "We could not send your message. Please try again soon." },
        { status: 502 },
      );
    }

    if (isEnrollment && email) {
      try {
        await sendWelcomeEmail({ apiKey, from, name, to: email });
      } catch (welcomeError) {
        console.error("Failed to send welcome email:", welcomeError);
      }
    }

    return json({ ok: true });
  },
};
