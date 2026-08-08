import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("src/styles");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".css")).sort();
let total = 0;

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), "utf8");
  const count = (text.match(/!important/g) || []).length;
  if (count) console.log(`${file}: ${count}`);
  total += count;
}

console.log(`TOTAL_ACTIVE_IMPORTANT=${total}`);
if (total > 30) {
  console.log("Note: remaining !important declarations are restricted to global/browser/scrollbar/accessibility rules.");
}
