import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const jsonPath = path.join(root, 'src', 'data', 'finalUnits.json');
const modelUnitsPath = path.join(root, 'src', 'data', 'modelUnits.ts');
const finalModelUnitsPath = path.join(root, 'src', 'data', 'finalModelUnits.ts');

const units = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const modelUnitsSource = fs.readFileSync(modelUnitsPath, 'utf8');
const finalModelUnitsSource = fs.readFileSync(finalModelUnitsPath, 'utf8');

if (!modelUnitsSource.includes('...finalModelUnits')) {
  errors.push('finalModelUnits n\'est pas injecté dans modelUnits.ts.');
}
if (!finalModelUnitsSource.includes('./finalUnits.json')) {
  errors.push('finalModelUnits.ts ne consomme pas finalUnits.json.');
}
if (units.length !== 30) errors.push(`finalUnits.json contient ${units.length} unités au lieu de 30.`);
const sessions = units.reduce((sum, unit) => sum + (Array.isArray(unit.sessions) ? unit.sessions.length : 0), 0);
if (sessions !== 300) errors.push(`finalUnits.json contient ${sessions} séances au lieu de 300.`);

const referencedAssets = new Set();
for (const unit of units) {
  for (const value of [unit.image, unit.reading?.image, unit.listening?.audio]) {
    if (typeof value === 'string' && value) {
      if (/^https?:\/\//i.test(value)) errors.push(`${unit.key}: asset externe obligatoire: ${value}`);
      else referencedAssets.add(value);
    }
  }
}

for (const asset of referencedAssets) {
  const file = path.join(root, 'public', asset.replace(/^\/+/, ''));
  if (!fs.existsSync(file)) {
    errors.push(`Asset référencé mais absent: ${asset}`);
    continue;
  }
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size === 0) errors.push(`Asset vide ou non-fichier: ${asset}`);

  if (/\.(webp|png|jpe?g|gif|svg|ico)$/i.test(file)) {
    try {
      const header = fs.readFileSync(file).subarray(0, 16);
      const ext = path.extname(file).toLowerCase();
      let valid = false;
      if (ext === '.webp') valid = header.length >= 12 && header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'WEBP';
      else if (ext === '.png') valid = header.length >= 8 && header.equals(Buffer.from([137,80,78,71,13,10,26,10]), 0, 8, 0, 8);
      else if (ext === '.jpg' || ext === '.jpeg') valid = header.length >= 3 && header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
      else if (ext === '.gif') valid = header.toString('ascii', 0, 6) === 'GIF87a' || header.toString('ascii', 0, 6) === 'GIF89a';
      else if (ext === '.ico') valid = header.length >= 4 && header[0] === 0 && header[1] === 0 && header[2] === 1 && header[3] === 0;
      else if (ext === '.svg') valid = /<svg(?:\s|>)/i.test(fs.readFileSync(file, 'utf8').slice(0, 4096));
      if (!valid) errors.push(`Asset image non décodable: ${asset}`);
    } catch (error) {
      errors.push(`Impossible de vérifier l'image ${asset}: ${error.message}`);
    }
  }
}

const imageRefs = units.map((unit) => unit.reading?.image).filter(Boolean);
if (new Set(imageRefs).size !== 30) errors.push(`Les lectures utilisent ${new Set(imageRefs).size} illustrations au lieu de 30 uniques.`);

const externalRefs = [...modelUnitsSource.matchAll(/(?:image|audio)\s*:\s*["'](https?:\/\/[^"']+)["']/gi)];
if (externalRefs.length) errors.push(`${externalRefs.length} référence(s) image/audio externe(s) trouvée(s) dans modelUnits.ts.`);

console.log(`Runtime data: ${units.length}/30 unités, ${sessions}/300 séances.`);
console.log(`Assets référencés contrôlés: ${referencedAssets.size}`);
console.log(`Illustrations de lecture uniques: ${new Set(imageRefs).size}/30`);
console.log(`Erreurs runtime statiques: ${errors.length}`);

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Runtime static validation: PASS');
