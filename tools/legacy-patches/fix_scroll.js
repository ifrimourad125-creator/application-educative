import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Reduce header padding
content = content.replace(
  /px-5 py-4 sm:px-8 sm:py-6 text-center/g,
  'px-4 py-3 sm:px-8 sm:py-6 text-center'
);

// Reduce gap between cards
content = content.replace(
  /gap-4 sm:gap-6 mt-4 sm:mt-auto sm:mb-auto items-stretch py-2 w-full/g,
  'gap-3 sm:gap-6 mt-3 sm:mt-auto sm:mb-auto items-stretch py-1 w-full'
);

// Card sizing & padding
content = content.replace(
  /p-5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 sm:gap-6 transition-all duration-300 w-full h-auto min-h-\[140px\] sm:min-h-\[300px\]/g,
  'p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-6 transition-all duration-300 w-full flex-1 sm:min-h-[300px]'
);

// Icon container sizing (from 20 -> 16)
content = content.replace(
  /w-20 sm:w-28 sm:flex sm:justify-center shrink-0/g,
  'w-16 sm:w-28 sm:flex sm:justify-center shrink-0'
);
content = content.replace(
  /w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl/g,
  'w-16 h-16 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl'
);
content = content.replace(
  /text-5xl sm:text-\[5rem\]/g,
  'text-4xl sm:text-[5rem]'
);

// Text Info sizing
content = content.replace(
  /text-4xl sm:text-6xl font-black/g,
  'text-3xl sm:text-6xl font-black'
);

// Arrow container sizing
content = content.replace(
  /flex w-10 h-10 sm:w-12 sm:h-12/g,
  'flex w-8 h-8 sm:w-12 sm:h-12'
);
content = content.replace(
  /w-5 h-5 sm:w-6 sm:h-6/g,
  'w-4 h-4 sm:w-6 sm:h-6'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
