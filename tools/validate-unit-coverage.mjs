import fs from "node:fs";
import path from "node:path";

const modelText = fs.readFileSync(path.resolve("src/data/modelUnits.ts"), "utf8");
const extraText = fs.readFileSync(path.resolve("src/data/extraModelUnits.ts"), "utf8");

const expected = [];
for (const level of ["1ac","2ac","3ac"]) {
  for (const id of [1,2,3,4]) expected.push(`${level}-s1-${id}`);
  for (const id of [5,6,7,8,9,10]) expected.push(`${level}-s2-${id}`);
}

const found = new Set([
  ...Array.from(modelText.matchAll(/['"]([0-9a-z]+-s[12]-\d+)['"]\s*:/g), m => m[1]),
  ...Array.from(extraText.matchAll(/["']([0-9a-z]+-s[12]-\d+)["']/g), m => m[1]),
]);

const missing = expected.filter(key => !found.has(key));
console.log(`Expected units: ${expected.length}`);
console.log(`Covered units: ${expected.length - missing.length}`);
console.log(`Missing model units: ${missing.length ? missing.join(", ") : "none"}`);
if (missing.length) process.exit(1);
