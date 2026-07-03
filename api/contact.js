import { access, appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const FOUNDERS_EMAIL = "founders@eznrg.ai";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RECIPIENT_ENV_KEYS = [
  ["f1", "F1"],
  ["f2", "F2"],
];
function enrollmentContactCsvPath() {
  return (
    process.env.ENROLLMENT_CONTACT_CSV ||
    join(process.cwd(), "data", "enrollment-contact-leads.csv")
  );
}

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

function isEnrollmentContactCapture(formType) {
  return formType === "enrollment-contact";
}

function isFileLike(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.arrayBuffer === "function" &&
    "name" in value
  );
}

function formatFileSize(value) {
  const bytes = Number(value);

  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "";
  }

  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1)} MB`;
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
    const payload = {};

    for (const [key, value] of formData.entries()) {
      if (isFileLike(value)) {
        if (value.size > 0) {
          payload[`${key}Name`] = sanitize(value.name, 220);
          payload[`${key}Type`] = sanitize(value.type || "unknown", 120);
          payload[`${key}Size`] = String(value.size);
        }

        continue;
      }

      payload[key] = value;
    }

    return payload;
  }

  return {};
}

function formLabel(formType) {
  if (formType === "early-bird") return "Early-bird list";
  if (formType === "enrollment") return "Enrollment intake";
  if (isEnrollmentContactCapture(formType)) return "Enrollment contact capture";
  return "Contact form";
}

function csvCell(value) {
  const normalized = sanitize(value).replace(/\r?\n/g, " ");
  const safeValue = /^[=+\-@]/.test(normalized) ? `'${normalized}` : normalized;

  return `"${safeValue.replaceAll('"', '""')}"`;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function appendCsvRow(path, headers, values) {
  await mkdir(dirname(path), { recursive: true });

  const hasFile = await fileExists(path);
  const rows = [];

  if (!hasFile) {
    rows.push(headers.map(csvCell).join(","));
  }

  rows.push(values.map(csvCell).join(","));
  await appendFile(path, `${rows.join("\n")}\n`, "utf8");
}

async function saveEnrollmentContactCapture({ name, phone, sourcePath }, request) {
  // Demo persistence only. Replace this with a database write when the backend is ready.
  await appendCsvRow(
    enrollmentContactCsvPath(),
    ["created_at", "name", "phone", "source_path", "user_agent"],
    [
      new Date().toISOString(),
      name,
      phone,
      sourcePath,
      request.headers.get("user-agent") || "",
    ],
  );
}

function buildEmail({
  accountNumber,
  billNotes,
  billPreference,
  company,
  email,
  facility,
  formType,
  goalsTiming,
  loadContext,
  message,
  meterNumber,
  name,
  phone,
  rateClass,
  role,
  utility,
  utilityBillName,
  utilityBillSize,
  utilityBillType,
}) {
  const label = formLabel(formType);
  const subject = `EZ NRG ${label}: ${name}`;
  const billUploadDetails = [
    utilityBillType,
    formatFileSize(utilityBillSize),
  ].filter(Boolean);
  const billUpload = utilityBillName
    ? `${utilityBillName}${billUploadDetails.length ? ` (${billUploadDetails.join(", ")})` : ""}`
    : "";
  const billPreferenceLabel =
    billPreference === "upload"
      ? "Upload bill"
      : billPreference === "manual"
        ? "Enter manually"
        : billPreference;
  const rows = [
    ["Form", label],
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Role or title", role],
    ["Phone", phone],
    ["Service address", facility],
    ["Utility account number", accountNumber],
    ["Utility / market", utility],
    ["Bill preference", billPreferenceLabel],
    ["Utility bill upload", billUpload],
    ["Rate class or plan name", rateClass],
    ["Meter number", meterNumber],
    ["Bill details or recent usage notes", billNotes],
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

    let payload;
    try {
      payload = await readBody(request);
    } catch {
      return json({ error: "Invalid form payload." }, { status: 400 });
    }

    const formType = sanitize(payload.formType, 40);
    const name = sanitize(payload.name, 160);
    const email = sanitize(payload.email, 320).toLowerCase();
    const accountNumber = sanitize(payload.accountNumber, 140);
    const billNotes = sanitize(payload.billNotes, 2000);
    const billPreference = sanitize(payload.billPreference, 40);
    const company = sanitize(payload.company, 180);
    const role = sanitize(payload.role, 180);
    const phone = sanitize(payload.phone, 80);
    const facility = sanitize(payload.facility, 300);
    const utility = sanitize(payload.utility, 180);
    const meterNumber = sanitize(payload.meterNumber, 140);
    const rateClass = sanitize(payload.rateClass, 180);
    const utilityBillName = sanitize(payload.utilityBillName, 220);
    const utilityBillType = sanitize(payload.utilityBillType, 120);
    const utilityBillSize = sanitize(payload.utilityBillSize, 40);
    const loadContext = sanitize(payload.loadContext, 2000);
    const goalsTiming = sanitize(payload.goalsTiming, 2000);
    const message = sanitize(payload.message, 2000);
    const isEnrollment = formType === "enrollment";
    const isManualBillEntry = billPreference === "manual";
    const hasBillUpload = Boolean(utilityBillName);

    if (isEnrollmentContactCapture(formType)) {
      if (!name || !phone) {
        return json(
          { error: "Please enter your name and phone number." },
          { status: 400 },
        );
      }

      try {
        await saveEnrollmentContactCapture(
          {
            name,
            phone,
            sourcePath: sanitize(payload.sourcePath, 300),
          },
          request,
        );
      } catch (error) {
        console.error("Enrollment contact CSV save failed:", error);
        return json(
          { error: "We could not save your contact details. Please try again." },
          { status: 500 },
        );
      }

      return json({ ok: true });
    }

    // Temporary local demo bypass: final enrollment submit should not send email.
    // The first-step "enrollment-contact" CSV capture above still runs normally.
    if (isEnrollment) {
      return json({ ok: true, skippedEmail: true });
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

    const missingEnrollmentContact = !name || !email || !phone;
    const missingEnrollmentUtility = isManualBillEntry
      ? !accountNumber || !facility || !utility
      : !hasBillUpload;
    const missingRequired = isEnrollment
      ? missingEnrollmentContact || missingEnrollmentUtility
      : !name || !email || !company || !message;

    if (missingRequired || !isEmail(email)) {
      const error = isEnrollment
        ? "Please enter a valid email, then upload a utility bill file or complete the manual utility details."
        : "Please complete the form with a valid email address.";

      return json(
        { error },
        { status: 400 },
      );
    }

    const { html, subject, text } = buildEmail({
      accountNumber,
      billNotes,
      billPreference,
      company,
      email,
      facility,
      formType,
      goalsTiming,
      loadContext,
      message,
      meterNumber,
      name,
      phone,
      rateClass,
      role,
      utility,
      utilityBillName,
      utilityBillSize,
      utilityBillType,
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
