import { next } from "@vercel/functions";
import {
  authCookie,
  clearAuthCookie,
  getSitePassword,
  isAuthenticated,
  isPasswordValid,
  nextPathFromLoginUrl,
  nextPathFromRequest,
  renderPasswordPage,
} from "./src/auth.mjs";

export const config = {
  matcher: "/(.*)",
};

function json(body, status) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function redirect(location, headers = {}) {
  return new Response(null, {
    status: 303,
    headers: {
      "Cache-Control": "no-store",
      Location: location,
      ...headers,
    },
  });
}

function methodNotAllowed() {
  return new Response("Method not allowed", {
    status: 405,
    headers: {
      "Cache-Control": "no-store",
      Allow: "GET, POST",
    },
  });
}

async function handleLogin(request, url) {
  const nextPath = nextPathFromLoginUrl(url);

  if (request.method === "GET") {
    return renderPasswordPage({ nextPath, status: 200 });
  }

  if (request.method !== "POST") {
    return methodNotAllowed();
  }

  let password = "";
  try {
    const formData = await request.formData();
    password = formData.get("password");
  } catch {
    return renderPasswordPage({
      error: "Could not read the password. Try again.",
      nextPath,
      status: 400,
    });
  }

  if (!(await isPasswordValid(password))) {
    return renderPasswordPage({
      error: "Password did not match.",
      nextPath,
      status: 401,
    });
  }

  return redirect(nextPath, {
    "Set-Cookie": await authCookie(request),
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (!getSitePassword()) {
    if (url.pathname.startsWith("/api/")) {
      return json({ error: "SITE_PASSWORD is not configured." }, 503);
    }

    return renderPasswordPage({ setupMissing: true, status: 503 });
  }

  if (url.pathname === "/auth/login") {
    return handleLogin(request, url);
  }

  if (url.pathname === "/auth/logout") {
    return redirect("/", {
      "Set-Cookie": clearAuthCookie(request),
    });
  }

  if (await isAuthenticated(request)) {
    return next();
  }

  if (url.pathname.startsWith("/api/")) {
    return json({ error: "Password required." }, 401);
  }

  return renderPasswordPage({
    nextPath: nextPathFromRequest(request),
    status: 401,
  });
}
