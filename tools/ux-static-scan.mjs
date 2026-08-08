import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src");
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(entry.name)) files.push(p);
  }
}
walk(root);

const checks = [
  [/\<img\b(?![^>]*\balt=)/g, "img without alt"],
  [/\<button\b[^>]*\>\s*<[^/]+\/?>\s*<\/button\>/g, "icon-only button should be reviewed"],
];
let failures = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const [re, label] of checks) {
    const hits = text.match(re) || [];
    if (hits.length) console.log(`${label}: ${path.relative(process.cwd(), file)} (${hits.length})`);
  }
}
console.log(`UX static scan complete: ${files.length} source files checked.`);
process.exit(failures ? 1 : 0);
