import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Cards container
content = content.replace(
  /className="flex-1 flex flex-col sm:grid sm:grid-cols-3 justify-center gap-3 sm:gap-6 mt-3 sm:mt-auto sm:mb-auto items-stretch py-1 w-full"/g,
  'className="flex-1 flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-6 mt-3 sm:mt-4 items-stretch py-1 w-full"'
);

// Card Wrapper
content = content.replace(
  /className="group relative cursor-pointer w-full sm:h-full"/g,
  'className="group relative cursor-pointer w-full flex-1 sm:h-full"'
);

// Inner Card
content = content.replace(
  /p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-6 transition-all duration-300 w-full flex-1 sm:min-h-\[300px\]/g,
  'p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-6 transition-all duration-300 w-full h-full sm:min-h-[300px]'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
