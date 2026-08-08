import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/pb-32 sm:pb-36/g, 'pb-4 sm:pb-6');
  content = content.replace(/pb-32/g, 'pb-4');
  
  fs.writeFileSync(filePath, content);
}
