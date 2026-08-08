import fs from 'fs';
let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');
content = content.replace(
  'className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-6 max-w-2xl mx-auto w-full pb-12 sm:pb-16"',
  'className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-4 sm:gap-6 max-w-2xl mx-auto w-full pb-16 sm:pb-20"'
);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
