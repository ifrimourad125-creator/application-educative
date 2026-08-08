import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Header modifications for mobile fit
content = content.replace(
  /px-3.5 py-4 sm:px-8 sm:py-6 text-center/,
  'px-3.5 py-2.5 sm:px-8 sm:py-6 text-center'
);
content = content.replace(
  /text-2xl sm:text-4xl font-black/,
  'text-xl sm:text-4xl font-black'
);
content = content.replace(
  /text-sm sm:text-lg font-bold text-cyan-300 tracking-wide/,
  'text-[11px] sm:text-lg font-bold text-cyan-300 tracking-wide'
);

// LEVEL_CONFIGS modifications
content = content.replace(
  /text-6xl sm:text-\[5rem\] select-none leading-none/g,
  'text-[2.5rem] sm:text-[5rem] select-none leading-none'
);

// Cards container
content = content.replace(
  /gap-4 sm:gap-5 mt-4 sm:my-auto items-stretch py-2/,
  'gap-2.5 sm:gap-5 mt-2 sm:my-auto items-stretch py-1'
);

// Card sizing modifications for mobile fit
content = content.replace(
  /w-20 sm:w-28 sm:flex sm:justify-center/g,
  'w-14 sm:w-28 sm:flex sm:justify-center'
);
content = content.replace(
  /w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl/g,
  'w-14 h-14 sm:w-28 sm:h-28 rounded-xl sm:rounded-3xl'
);
content = content.replace(
  /text-5xl sm:text-6xl font-black/,
  'text-3xl sm:text-6xl font-black'
);
content = content.replace(
  /text-base sm:text-lg font-bold text-white\/95/,
  'text-[11px] sm:text-lg font-bold text-white/95'
);
content = content.replace(
  /w-20 sm:w-28 sm:w-full shrink-0/,
  'w-14 sm:w-28 sm:w-full shrink-0'
);
content = content.replace(
  /flex w-10 h-10 sm:w-12 sm:h-12 rounded-full/,
  'flex w-8 h-8 sm:w-12 sm:h-12 rounded-full'
);
content = content.replace(
  /w-5 h-5 sm:w-6 sm:h-6/g,
  'w-4 h-4 sm:w-6 sm:h-6'
);
content = content.replace(
  /p-5 sm:p-8 flex flex-row sm:flex-col/,
  'p-3.5 sm:p-8 flex flex-row sm:flex-col'
);
content = content.replace(
  /flex-1 flex flex-col justify-between p-3 sm:p-5 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6/,
  'flex-1 flex flex-col justify-between p-3 sm:p-5 gap-2 sm:gap-4 max-w-4xl mx-auto w-full pb-2 sm:pb-6'
);


fs.writeFileSync('src/pages/HomePage.tsx', content);
