import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
content = content.replace(
  /p-4 sm:p-6 flex flex-row sm:flex-col/,
  'p-5 sm:p-8 flex flex-row sm:flex-col'
);
fs.writeFileSync('src/pages/HomePage.tsx', content);
