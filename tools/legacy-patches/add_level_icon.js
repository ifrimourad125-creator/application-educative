import fs from 'fs';
let content = fs.readFileSync('src/types/app.ts', 'utf8');
content = content.replace(
  /export type Level = {/g,
  'export type Level = {\n  icon?: string;'
);
fs.writeFileSync('src/types/app.ts', content);
