import fs from 'fs';
let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');
content = content.replace(
  /className=\{\`relative overflow-hidden rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer group \$\{cardStyle\}\`\}/g,
  "className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer group aspect-[4/3] sm:aspect-[4/3] max-h-[180px] ${cardStyle}`}"
);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
