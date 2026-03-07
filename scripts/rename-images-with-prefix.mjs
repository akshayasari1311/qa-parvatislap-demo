import fs from "node:fs";
import path from "node:path";

const PREFIX = "Parvati's Lap - Luxury Hostel & Villa";
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

const IGNORE_DIRS = new Set(["node_modules", ".next", ".git"]);

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      walk(abs, out);
      continue;
    }
    out.push(abs);
  }
}

function readTextIfSafe(file) {
  try {
    const buf = fs.readFileSync(file);
    // Basic binary heuristic: NUL byte in first chunk => skip
    for (let i = 0; i < Math.min(buf.length, 8000); i++) {
      if (buf[i] === 0) return null;
    }
    return buf.toString("utf8");
  } catch {
    return null;
  }
}

function writeText(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function absToPublicUrl(absFile) {
  const rel = path
    .relative(path.join(PROJECT_ROOT, "public"), absFile)
    .split(path.sep)
    .join("/");
  return `/${rel}`;
}

function gatherTextFiles() {
  const roots = [
    "src",
    "styles",
    "docs",
    "public",
    "README.md",
    "next.config.ts",
    "next-sitemap.config.js",
    "vercel.json",
    "package.json",
  ];

  const allowedExts = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".md",
    ".css",
    ".html",
    ".txt",
    ".yml",
    ".yaml",
    ".toml",
  ]);

  const files = [];
  for (const r of roots) {
    const abs = path.join(PROJECT_ROOT, r);
    if (!fs.existsSync(abs)) continue;
    const st = fs.statSync(abs);
    if (st.isFile()) {
      files.push(abs);
      continue;
    }
    const tmp = [];
    walk(abs, tmp);
    for (const f of tmp) {
      const ext = path.extname(f).toLowerCase();
      if (allowedExts.has(ext) || path.basename(f) === "vercel.json") {
        files.push(f);
      }
    }
  }

  return Array.from(new Set(files));
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  if (!fs.existsSync(IMAGES_ROOT)) {
    console.error("Missing directory:", IMAGES_ROOT);
    process.exit(1);
  }

  // 1) Rename all images under public/images
  const imageFiles = [];
  walk(IMAGES_ROOT, imageFiles);

  const mapping = []; // [oldUrl, newUrl]

  for (const abs of imageFiles) {
    const ext = path.extname(abs).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;

    const base = path.basename(abs);
    if (base.startsWith(`${PREFIX} - `)) continue;

    const dir = path.dirname(abs);
    const newBase = `${PREFIX} - ${base}`;
    const absNew = path.join(dir, newBase);

    if (fs.existsSync(absNew)) {
      console.error("Rename target already exists:", absNew);
      process.exit(2);
    }

    const oldUrl = absToPublicUrl(abs);
    fs.renameSync(abs, absNew);
    const newUrl = absToPublicUrl(absNew);

    mapping.push([oldUrl, newUrl]);
  }

  // 2) Replace references across repo text files
  const textFiles = gatherTextFiles();
  let filesChanged = 0;
  let totalReplacements = 0;

  for (const f of textFiles) {
    const t = readTextIfSafe(f);
    if (t == null) continue;

    let out = t;
    for (const [oldUrl, newUrl] of mapping) {
      if (!out.includes(oldUrl)) continue;
      const re = new RegExp(escapeRegExp(oldUrl), "g");
      const before = out;
      out = out.replace(re, newUrl);
      totalReplacements += (before.match(re) || []).length;
    }

    if (out !== t) {
      writeText(f, out);
      filesChanged++;
    }
  }

  console.log("RENAMED_IMAGES", mapping.length);
  console.log("UPDATED_TEXT_FILES", filesChanged);
  console.log("TOTAL_REPLACEMENTS", totalReplacements);
  console.log("SAMPLE_MAPPING");
  for (const [o, n] of mapping.slice(0, 10)) {
    console.log(`${o} => ${n}`);
  }
}

main();

