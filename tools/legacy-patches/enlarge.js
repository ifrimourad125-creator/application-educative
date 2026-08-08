import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Header modifications
content = content.replace(
  /py-3 sm:px-6 sm:py-4.5 text-center/,
  'py-4 sm:px-8 sm:py-6 text-center'
);
content = content.replace(
  /text-xl sm:text-3xl font-black/,
  'text-2xl sm:text-4xl font-black'
);
content = content.replace(
  /text-xs sm:text-base font-bold text-cyan-300 tracking-wide/,
  'text-sm sm:text-lg font-bold text-cyan-300 tracking-wide'
);

// LEVEL_CONFIGS modifications
content = content.replace(
  /text-5xl sm:text-6xl select-none leading-none/g,
  'text-6xl sm:text-[5rem] select-none leading-none'
);

// Card sizing modifications
content = content.replace(
  /w-16 sm:w-20 sm:flex sm:justify-center/g,
  'w-20 sm:w-28 sm:flex sm:justify-center'
);
content = content.replace(
  /w-16 h-16 sm:w-20 sm:h-20 rounded-2xl/g,
  'w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl'
);
content = content.replace(
  /text-4xl sm:text-5xl font-black/,
  'text-5xl sm:text-6xl font-black'
);
content = content.replace(
  /text-sm sm:text-base font-bold text-white\/95/,
  'text-base sm:text-lg font-bold text-white/95'
);
content = content.replace(
  /w-16 sm:w-20 sm:w-full shrink-0/,
  'w-20 sm:w-28 sm:w-full shrink-0'
);
content = content.replace(
  /flex w-8 h-8 rounded-full/,
  'flex w-10 h-10 sm:w-12 sm:h-12 rounded-full'
);
content = content.replace(
  /w-4 h-4 sm:w-5 sm:h-5/g,
  'w-5 h-5 sm:w-6 sm:h-6'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
