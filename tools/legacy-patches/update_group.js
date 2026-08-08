import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const oldButton = `className={\`relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer min-h-[200px] \${cardStyle}\`}`;
const newButton = `className={\`relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer min-h-[200px] group \${cardStyle}\`}`;

content = content.replace(oldButton, newButton);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
