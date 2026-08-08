import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const errors = [];
const warnings = [];

function read(file) { return fs.readFileSync(file, 'utf8'); }
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && ['styles.before-important-cleanup'].includes(entry.name)) return [];
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const tsFiles = walk(src).filter((f) => /\.(ts|tsx)$/.test(f));
const cssFiles = walk(src).filter((f) => f.endsWith('.css'));

for (const file of tsFiles) {
  const text = read(file);
  const imports = [...text.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1]);
  for (const imp of imports) {
    if (!imp.startsWith('.')) continue;
    const base = path.resolve(path.dirname(file), imp);
    const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      errors.push(`${path.relative(root, file)} -> missing import ${imp}`);
    }
  }
}

// Only generated audio is required to exist. Entries marked "missing" intentionally
// fall back to their existing oldAudioPath at runtime.
const manifest = path.join(root, 'src/data/audioManifest.ts');
if (fs.existsSync(manifest)) {
  const text = read(manifest);
  for (const block of text.split(/\n\s*\},\s*\{/)) {
    const generated = block.match(/newAudioPath:\s*["']\/([^"']+\.mp3)["']/)?.[1];
    const status = block.match(/status:\s*["']([^"']+)["']/)?.[1];
    if (generated && status === 'generated') {
      const asset = path.join(root, 'public', generated);
      if (!fs.existsSync(asset)) errors.push(`Generated audio marked available but missing: ${generated}`);
    }
  }
}

const importantCount = cssFiles.reduce((n, file) => n + (read(file).match(/!important/g) ?? []).length, 0);
if (importantCount > 500) warnings.push(`CSS contains ${importantCount} !important declarations. Keep the existing visual cascade intact; remove these only with screenshot regression checks.`);

const packageJson = JSON.parse(read(path.join(root, 'package.json')));
for (const script of ['build', 'lint', 'validate']) {
  if (!packageJson.scripts?.[script]) warnings.push(`Missing npm script: ${script}`);
}

if (errors.length) {
  console.error('Validation failed:\n' + errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}
console.log(`Project validation passed: ${tsFiles.length} TS/TSX files and ${cssFiles.length} CSS files checked.`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
