import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf-8');

// Container
content = content.replace(
  /<div className="flex-1 flex flex-col justify-start px-3 py-2 sm:p-4 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">/,
  '<div className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-6 max-w-2xl mx-auto w-full pb-8">'
);

// Level Header Banner
content = content.replace(
  /p-3 sm:p-4 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2/,
  'p-6 flex flex-col items-center justify-center text-center gap-3 shadow-2xl'
);
content = content.replace(
  /w-10 h-10 sm:w-12 sm:h-12/,
  'w-14 h-14 sm:w-16 sm:h-16'
);
content = content.replace(
  /text-xl sm:text-2xl/,
  'text-3xl sm:text-4xl'
);
content = content.replace(
  /<h1 className="text-lg sm:text-2xl/,
  '<h1 className="text-2xl sm:text-3xl'
);
content = content.replace(
  /<p className="text-xs sm:text-sm text-white\/90/,
  '<p className="text-sm sm:text-base text-white/90'
);

// Semester Choice Container
content = content.replace(
  /<div className=\{`flex flex-col gap-1\.5 \$\{\!activeSemester \? "flex-1 justify-center pb-2" : ""\}`\}>/,
  '<div className={`flex flex-col gap-4 ${!activeSemester ? "flex-1 justify-center" : ""}`}>'
);

// Choisissez le semestre
content = content.replace(
  /mt-0\.5 mb-0\.5/,
  'mb-2'
);
content = content.replace(
  /text-\[11px\] sm:text-xs/,
  'text-xs sm:text-sm'
);

// Cards
content = content.replace(
  /<div className="grid grid-cols-2 gap-2\.5 sm:gap-3\.5">/,
  '<div className="grid grid-cols-2 gap-4 sm:gap-5">'
);

content = content.replace(
  /p-4 sm:p-5 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer \$\{\!activeSemester \? "min-h-\[160px\] sm:min-h-\[180px\]" : "min-h-\[100px\] sm:min-h-\[110px\]"\}/,
  'p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer ${!activeSemester ? "min-h-[200px]" : "min-h-[120px]"}'
);

content = content.replace(
  /bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 border-2 border-white ring-4 ring-cyan-400\/60 shadow-\[0_0_25px_rgba\(6,182,212,0\.85\)\] scale-\[1\.02\] text-white/,
  'bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 border-2 border-cyan-100 ring-4 ring-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.6)] scale-[1.03] text-white'
);

content = content.replace(
  /bg-gradient-to-br from-fuchsia-400 via-purple-500 to-pink-600 border-2 border-white ring-4 ring-fuchsia-400\/60 shadow-\[0_0_25px_rgba\(217,70,239,0\.85\)\] scale-\[1\.02\] text-white/,
  'bg-gradient-to-br from-fuchsia-400 via-purple-500 to-pink-600 border-2 border-fuchsia-100 ring-4 ring-fuchsia-400/60 shadow-[0_0_35px_rgba(217,70,239,0.6)] scale-[1.03] text-white'
);

content = content.replace(
  /bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 border-2 border-cyan-300\/80 shadow-lg shadow-cyan-900\/50 hover:shadow-cyan-500\/40 hover:scale-\[1\.02\] text-white/,
  'bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 border-2 border-cyan-300/80 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] text-white'
);

content = content.replace(
  /bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700 border-2 border-fuchsia-300\/80 shadow-lg shadow-fuchsia-900\/50 hover:shadow-fuchsia-500\/40 hover:scale-\[1\.02\] text-white/,
  'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700 border-2 border-fuchsia-300/80 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-[1.02] text-white'
);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
