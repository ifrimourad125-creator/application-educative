import fs from 'fs';
let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

content = content.replace(
  /className="text-sm sm:text-base md:text-lg font-black text-slate-300 uppercase tracking-\[0\.2em\] drop-shadow-sm text-center flex items-center gap-3"/g,
  'className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-[0.2em] drop-shadow-sm text-center flex items-center gap-3"'
);

content = content.replace(
  /<ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" \/>/g,
  '<ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" strokeWidth={3} />'
);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
