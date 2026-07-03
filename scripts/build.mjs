import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderAbout,
  renderContact,
  renderGetStarted,
  renderGetStartedDeposit,
  renderGetStartedIntake,
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
  { path: "get-started/deposit/index.html", html: renderGetStartedDeposit() },
  { path: "get-started/intake/index.html", html: renderGetStartedIntake() },
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });

await cp(join(root, "public"), dist, { recursive: true });
await cp(join(root, "src/styles.css"), join(dist, "assets/styles.css"));
await cp(join(root, "src/main.js"), join(dist, "assets/main.js"));

for (const page of pages) {
  const output = join(dist, page.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page.html);
}

console.log(`Built ${pages.length} pages to ${dist}`);
