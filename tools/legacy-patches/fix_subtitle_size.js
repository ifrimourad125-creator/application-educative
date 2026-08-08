import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /className="text-sm sm:text-lg font-bold text-white\/95 leading-snug drop-shadow-sm truncate sm:whitespace-normal"/g,
  'className="text-base sm:text-2xl font-bold text-white/95 leading-snug drop-shadow-sm truncate sm:whitespace-normal"'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
