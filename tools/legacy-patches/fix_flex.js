import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /flex flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-300 w-full h-auto sm:h-full/,
  'flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-300 w-full h-auto sm:h-full'
);
content = content.replace(
  /div className="relative shrink-0 w-16 sm:w-20"/,
  'div className="relative shrink-0 w-16 sm:w-20 sm:flex sm:justify-center"'
);
content = content.replace(
  /div className="w-16 sm:w-20 shrink-0 flex justify-end"/,
  'div className="w-16 sm:w-20 sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2"'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
