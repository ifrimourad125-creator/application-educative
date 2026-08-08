import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Container
content = content.replace(
  /className="flex-1 flex flex-col sm:grid sm:grid-cols-3 justify-evenly sm:justify-center gap-2.5 sm:gap-5 mt-2 sm:my-auto items-stretch py-1"/,
  'className="flex-1 flex flex-col sm:grid sm:grid-cols-3 gap-2.5 sm:gap-5 mt-2 sm:my-auto items-stretch py-1"'
);

// Card Wrapper
content = content.replace(
  /className="group relative cursor-pointer flex flex-col justify-center w-full h-auto sm:h-full"/g,
  'className="group relative cursor-pointer flex flex-col justify-center w-full flex-1 sm:h-full"'
);

// Inner Card
content = content.replace(
  /p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-300 w-full h-auto sm:h-full/g,
  'p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-300 w-full h-full'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
