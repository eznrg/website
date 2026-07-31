import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderAbout,
  renderContact,
  renderGetStarted,
  renderHome,
  renderLearn,
} from "../src/render.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

const pages = [
  { path: "index.html", html: renderHome() },
  { path: "about/index.html", html: renderAbout() },
  { path: "learn/index.html", html: renderLearn() },
  { path: "contact/index.html", html: renderContact() },
  { path: "get-started/index.html", html: renderGetStarted() },
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });

await cp(join(root, "public"), dist, { recursive: true });
await cp(join(root, "src/styles.css"), join(dist, "assets/styles.css"));
await cp(join(root, "src/main.js"), join(dist, "assets/main.js"));

// Standalone hospitality landing page. `hospitality_static/` is a self-contained,
// UNLISTED page (its own inline styles, no dependency on src/) served at
// eznrg.ai/hospitality. It is intentionally kept OUT of the render pipeline above,
// the `nav` array, and public/sitemap.xml, and carries a `noindex` meta tag — it is
// reachable only by direct link and must not be linked from the main site.
// See hospitality_static/README.md. Copied verbatim to dist/hospitality/ (the
// source-only README is filtered out so it is not deployed).
await cp(join(root, "hospitality_static"), join(dist, "hospitality"), {
  recursive: true,
  filter: (src) => !src.endsWith("README.md"),
});

for (const page of pages) {
  const output = join(dist, page.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page.html);
}

console.log(`Built ${pages.length} pages to ${dist}`);
