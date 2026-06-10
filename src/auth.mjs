const COOKIE_NAME = "eznrg_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function timingSafeEqual(a, b) {
  const left = String(a ?? "");
  const right = String(b ?? "");
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    diff |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return diff === 0;
}

function getCookieHeader(request) {
  return request.headers.get("cookie") ?? "";
}

function isHttpsRequest(request) {
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  return forwardedProtocol === "https" || new URL(request.url).protocol === "https:";
}

function getLoginAction(nextPath = "/") {
  return `/auth/login?next=${encodeURIComponent(nextPath || "/")}`;
}

function normalizeNextPath(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  if (value.startsWith("/auth/")) {
    return "/";
  }

  return value;
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return bytesToHex(new Uint8Array(hash));
}

export function getSitePassword() {
  return String(process.env.SITE_PASSWORD ?? "").trim();
}

export function getAuthSecret() {
  return String(process.env.AUTH_SECRET ?? "").trim();
}

export function nextPathFromRequest(request) {
  const url = new URL(request.url);
  return normalizeNextPath(`${url.pathname}${url.search}`);
}

export function nextPathFromLoginUrl(url) {
  return normalizeNextPath(url.searchParams.get("next") ?? "/");
}

export async function authToken() {
  const password = getSitePassword();
  const secret = getAuthSecret();
  const material = secret ? `${password}:${secret}` : password;
  return digest(material);
}

export function readAuthCookie(request) {
  const cookieHeader = getCookieHeader(request);
  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const match = cookies.find((part) => part.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : "";
}

export async function isAuthenticated(request) {
  const password = getSitePassword();
  if (!password) return false;

  return timingSafeEqual(readAuthCookie(request), await authToken());
}

export async function isPasswordValid(password) {
  return timingSafeEqual(String(password ?? ""), getSitePassword());
}

export async function authCookie(request) {
  const secure = isHttpsRequest(request) ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(
    await authToken(),
  )}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}${secure}`;
}

export function clearAuthCookie(request) {
  const secure = isHttpsRequest(request) ? "; Secure" : "";
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}

export function renderPasswordPage({
  error = "",
  nextPath = "/",
  setupMissing = false,
  status = 401,
} = {}) {
  const action = getLoginAction(normalizeNextPath(nextPath));
  const title = setupMissing ? "Password is not configured" : "Enter password";
  const body = setupMissing
    ? "Set SITE_PASSWORD in Vercel Environment Variables, then redeploy."
    : "This EZ NRG preview is private.";
  const errorMarkup = error
    ? `<p class="error" role="alert">${escapeHtml(error)}</p>`
    : "";
  const formMarkup = setupMissing
    ? ""
    : `<form method="post" action="${escapeHtml(action)}">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
        <button type="submit">Continue</button>
      </form>`;

  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EZ NRG Access</title>
  <meta name="robots" content="noindex">
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      min-width: 320px;
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      color: #f5f7fa;
      background:
        linear-gradient(120deg, rgba(20, 184, 166, 0.14), transparent 38%),
        linear-gradient(160deg, transparent 56%, rgba(244, 185, 66, 0.08)),
        #07111f;
      font-family: Manrope, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    main {
      width: min(100%, 430px);
      padding: 34px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      background: rgba(16, 27, 45, 0.92);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    }
    .brand {
      margin: 0 0 26px;
      color: #78f3e6;
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-size: clamp(2rem, 9vw, 3rem);
      line-height: 1;
      letter-spacing: 0;
    }
    p {
      margin: 14px 0 0;
      color: #a9b6c8;
      line-height: 1.6;
    }
    form { margin-top: 28px; }
    label {
      display: block;
      margin-bottom: 8px;
      color: #f5f7fa;
      font-size: 0.9rem;
      font-weight: 800;
    }
    input {
      width: 100%;
      min-height: 52px;
      padding: 0 14px;
      color: #f5f7fa;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 8px;
      outline: none;
      background: rgba(255, 255, 255, 0.06);
      font: inherit;
    }
    input:focus {
      border-color: #78f3e6;
      box-shadow: 0 0 0 3px rgba(120, 243, 230, 0.14);
    }
    button {
      width: 100%;
      min-height: 52px;
      margin-top: 16px;
      color: #06121d;
      border: 0;
      border-radius: 8px;
      background: #78f3e6;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }
    .error {
      padding: 12px 14px;
      color: #ffe9b8;
      border: 1px solid rgba(244, 185, 66, 0.28);
      border-radius: 8px;
      background: rgba(244, 185, 66, 0.1);
    }
  </style>
</head>
<body>
  <main>
    <p class="brand">EZ NRG</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(body)}</p>
    ${errorMarkup}
    ${formMarkup}
  </main>
</body>
</html>`,
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}
