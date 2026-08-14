import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderAbout,
  renderContact,
  renderGetStarted,
  renderHome,
  renderLearn,
  renderPrivacy,
  renderTerms,
} from "../src/render.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

const pages = [
  { path: "index.html", html: renderHome() },
  { path: "about/index.html", html: renderAbout() },
  { path: "learn/index.html", html: renderLearn() },
  { path: "contact/index.html", html: renderContact() },
  { path: "get-started/index.html", html: renderGetStarted() },
  { path: "terms/index.html", html: renderTerms() },
  { path: "privacy/index.html", html: renderPrivacy() },
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });

await cp(join(root, "public"), dist, { recursive: true });
await cp(join(root, "src/styles.css"), join(dist, "assets/styles.css"));
await cp(join(root, "src/main.js"), join(dist, "assets/main.js"));

// Standalone landing pages. Each `static/<name>/` is a self-contained, UNLISTED
// page served at eznrg.ai/<name>. They are intentionally kept OUT of the render
// pipeline above, the `nav` array, and public/sitemap.xml, and each carries a
// `noindex` meta tag — reachable only by direct link, and they must not be linked
// from the main site. `static/shared/` holds the theme they link at /static/*; it
// mirrors the mint theme but never imports src/styles.css, so a main-site theme
// change cannot break these pages. See static/README.md.
//
// The copy is recursive, so nested pages (e.g. hospitality/whitepaper/) come along
// with no build change. Source-only files are filtered out of the deploy.
// Markdown under static/ is source, never output: the folder READMEs and the
// commercial brief's source document both live beside the pages they describe,
// and neither should be reachable on the deployed site.
const standalonePages = ["hospitality", "residential", "commercial"];
const isSourceOnly = (src) => src.endsWith(".md") || src.endsWith(".DS_Store");

await cp(join(root, "static/shared"), join(dist, "static"), {
  recursive: true,
  filter: (src) => !isSourceOnly(src),
});

for (const name of standalonePages) {
  await cp(join(root, "static", name), join(dist, name), {
    recursive: true,
    filter: (src) => !isSourceOnly(src),
  });
}

for (const page of pages) {
  const output = join(dist, page.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page.html);
}

console.log(
  `Built ${pages.length} pages + ${standalonePages.length} standalone pages to ${dist}`,
);
