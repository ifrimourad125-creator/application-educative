import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Title changes
content = content.replace(/px-3\.5 py-2\.5 sm:px-8 sm:py-6 text-center/g, 'px-5 py-4 sm:px-8 sm:py-6 text-center');
content = content.replace(/text-xl sm:text-4xl font-black/g, 'text-2xl sm:text-4xl font-black');
content = content.replace(/text-\[11px\] sm:text-lg font-bold text-cyan-300/g, 'text-sm sm:text-lg font-bold text-cyan-300');

// Container
content = content.replace(
  /className="flex-1 flex flex-col sm:grid sm:grid-cols-3 gap-2\.5 sm:gap-5 mt-2 sm:my-auto items-stretch py-1"/,
  'className="flex-1 flex flex-col sm:grid sm:grid-cols-3 justify-center gap-4 sm:gap-6 mt-4 sm:mt-auto sm:mb-auto items-stretch py-2 w-full"'
);

// Card Wrapper
content = content.replace(
  /className="group relative cursor-pointer flex flex-col justify-center w-full flex-1 sm:h-full"/g,
  'className="group relative cursor-pointer w-full sm:h-full"'
);

// Icon sizes
content = content.replace(/text-\[2\.5rem\] sm:text-\[5rem\]/g, 'text-5xl sm:text-[5rem]');

// Inner Card
content = content.replace(
  /p-3\.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-300 w-full h-full/g,
  'p-5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 sm:gap-6 transition-all duration-300 w-full h-auto min-h-[140px] sm:min-h-[300px]'
);

// Circular Proportional Icon Container
content = content.replace(/w-14 sm:w-28 sm:flex sm:justify-center/g, 'w-20 sm:w-28 sm:flex sm:justify-center shrink-0');
content = content.replace(/w-14 h-14 sm:w-28 sm:h-28 rounded-xl sm:rounded-3xl/g, 'w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl');

// Text Info
content = content.replace(/text-3xl sm:text-6xl font-black/g, 'text-4xl sm:text-6xl font-black');
content = content.replace(/text-\[11px\] sm:text-lg font-bold/g, 'text-sm sm:text-lg font-bold');
content = content.replace(/text-center flex-1 min-w-0 space-y-0\.5 flex flex-col justify-center/g, 'text-left sm:text-center flex-1 min-w-0 space-y-1 sm:space-y-2 flex flex-col justify-center');

// Arrow
content = content.replace(/w-14 sm:w-28 sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2/g, 'w-auto sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2');
content = content.replace(/flex w-8 h-8 sm:w-12 sm:h-12/g, 'flex w-10 h-10 sm:w-12 sm:h-12');
content = content.replace(/w-4 h-4 sm:w-6 sm:h-6/g, 'w-5 h-5 sm:w-6 sm:h-6');

fs.writeFileSync('src/pages/HomePage.tsx', content);
