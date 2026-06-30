const FOUNDERS_EMAIL = "founders@eznrg.ai";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RECIPIENT_ENV_KEYS = [
  ["f1", "F1"],
  ["f2", "F2"],
];

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
      ? !name ||
        !email ||
        !company ||
        !role ||
        !phone ||
        !facility ||
        !utility ||
        !loadContext ||
        !goalsTiming
      : !name || !email || !company || !message;

    if (missingRequired || !isEmail(email)) {
      return json(
        { error: "Please complete the form with a valid email address." },
        { status: 400 },
      );
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

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        html,
        text,
        reply_to: email,
      }),
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

    return json({ ok: true });
  },
};
