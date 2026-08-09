import fs from 'node:fs';
import path from 'node:path';

const stylesDir = path.resolve('src/styles');
const files = fs.readdirSync(stylesDir).filter((f) => f.endsWith('.css'));
const total = files.reduce((sum, file) => {
  const text = fs.readFileSync(path.join(stylesDir, file), 'utf8');
  return sum + (text.match(/!important/g) ?? []).length;
}, 0);

const baseline = 2519;
if (total > baseline) {
  console.error(`CSS !important budget exceeded: ${total} > ${baseline}`);
  process.exit(1);
}
console.log(`CSS !important budget OK: ${total}/${baseline}`);
