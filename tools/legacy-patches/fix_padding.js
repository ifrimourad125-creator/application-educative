import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Remove pb-32 sm:pb-36 from HomePage main div, change to pb-4 sm:pb-6
content = content.replace(
  /className="flex-1 flex flex-col justify-between p-3 sm:p-5 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full pb-32 sm:pb-36"/,
  'className="flex-1 flex flex-col justify-between p-3 sm:p-5 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6"'
);
fs.writeFileSync('src/pages/HomePage.tsx', content);
