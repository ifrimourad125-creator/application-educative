import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /className="group relative cursor-pointer flex flex-col justify-center w-full h-full sm:h-auto"/,
  'className="group relative cursor-pointer flex flex-col justify-center w-full h-auto sm:h-full"'
);
content = content.replace(
  /transition-all duration-300 h-full\`}/,
  'transition-all duration-300 w-full h-auto sm:h-full`}'
);
fs.writeFileSync('src/pages/HomePage.tsx', content);
