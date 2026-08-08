import fs from 'fs';
const content = fs.readFileSync('src/data/extraModelUnits.ts', 'utf8');
const lines = content.split('\n');
lines.forEach(line => {
  if (line.includes('key:')) {
    console.log(line);
  }
});
