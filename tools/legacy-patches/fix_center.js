import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /className="text-left sm:text-center flex-1 min-w-0 space-y-1 sm:space-y-2 flex flex-col justify-center"/g,
  'className="text-center flex-1 min-w-0 space-y-1 sm:space-y-2 flex flex-col justify-center"'
);

content = content.replace(
  /className="w-auto sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2"/g,
  'className="w-16 sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2"'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
