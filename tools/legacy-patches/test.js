import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /className="group relative cursor-pointer flex flex-col justify-center h-full"/,
  'className="group relative cursor-pointer flex flex-col justify-center w-full h-full sm:h-auto"'
);
fs.writeFileSync('src/pages/HomePage.tsx', content);
