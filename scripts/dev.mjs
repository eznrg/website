import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import contactHandler from "../api/contact.js";
import "./build.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const port = Number(process.env.PORT || 4173);

await loadLocalEnv();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

async function loadLocalEnv() {
  try {
    const raw = fileURLToPath(new URL("../.env", import.meta.url));
    const contents = await readFile(raw, "utf8");
    for (const originalLine of contents.split(/\r?\n/)) {
      const line = originalLine.trim();
      if (!line || line.startsWith("#")) continue;

      const index = line.indexOf("=");
      if (index < 0) continue;

      const key = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      process.env[key] ??= value;
    }
  } catch {
    // Local env is optional for static preview, but forms need it.
  }
}

function safePath(pathname) {
  const cleaned = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  return cleaned === "/" ? "/index.html" : cleaned;
}

async function serveStatic(pathname) {
  const requestPath = safePath(pathname);
  const candidates = [
    join(dist, requestPath),
    join(dist, requestPath, "index.html"),
  ];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (!info.isFile()) continue;

      const body = await readFile(candidate);
      return new Response(body, {
        headers: {
          "Content-Type": contentTypes[extname(candidate)] || "application/octet-stream",
        },
      });
    } catch {
      // Try the next candidate.
    }
  }

  return new Response("Not found", { status: 404 });
}

async function toWebRequest(req, url) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body: chunks.length ? Buffer.concat(chunks) : undefined,
  });
}

function send(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));

  response.arrayBuffer().then((body) => {
    res.end(Buffer.from(body));
  });
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const response =
      url.pathname === "/api/contact"
        ? await contactHandler.fetch(await toWebRequest(req, url))
        : await serveStatic(url.pathname);

    send(res, response);
  } catch (error) {
    console.error(error);
    send(res, new Response("Internal server error", { status: 500 }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`EZ NRG local preview running at http://localhost:${port}`);
});
