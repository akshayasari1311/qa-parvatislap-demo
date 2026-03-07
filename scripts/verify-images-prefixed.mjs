import fs from "node:fs";
import path from "node:path";

const PREFIX = "Parvati's Lap - Luxury Hostel & Villa - ";
const PROJECT_ROOT = process.cwd();
const IMAGES_ROOT = path.join(PROJECT_ROOT, "public", "images");

const IMAGE_EXTS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".avif",
]);

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(abs, out);
      continue;
    }
    out.push(abs);
  }
}

if (!fs.existsSync(IMAGES_ROOT)) {
  console.error("Missing directory:", IMAGES_ROOT);
  process.exit(1);
}

const files = [];
walk(IMAGES_ROOT, files);

const unprefixed = [];
for (const abs of files) {
  const ext = path.extname(abs).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) continue;
  const base = path.basename(abs);
  if (!base.startsWith(PREFIX)) {
    unprefixed.push(path.relative(IMAGES_ROOT, abs).split(path.sep).join("/"));
  }
}

console.log("UNPREFIXED_COUNT", unprefixed.length);
if (unprefixed.length) {
  console.log(unprefixed.join("\n"));
  process.exit(2);
}

