import { readdir, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const extensions = new Set([".mjs", ".js", ".html", ".css"]);
const forbidden = [["em dash", /—/u], ["emoji or decorative Unicode symbol", /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u]];
const failures = [];
async function scan(relative) {
  for (const entry of await readdir(resolve(root, relative), { withFileTypes: true })) {
    const child = `${relative}/${entry.name}`;
    if (entry.isDirectory()) await scan(child);
    else if (extensions.has(extname(entry.name))) {
      const lines = (await readFile(resolve(root, child), "utf8")).split("\n");
      lines.forEach((line, index) => forbidden.forEach(([label, pattern]) => {
        if (pattern.test(line)) failures.push(`${child}:${index + 1}: ${label}`);
      }));
    }
  }
}
await Promise.all([scan("src"), scan("static")]);
if (failures.length) {
  console.error(`Professional copy check failed:\n${failures.join("\n")}`);
  process.exit(1);
}
