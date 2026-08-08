import fs from 'fs';

// 1. Fix HomePage subtitle
let homeContent = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
homeContent = homeContent.replace(
  /className="text-base sm:text-2xl font-bold text-white\/95 leading-snug drop-shadow-sm truncate sm:whitespace-normal"/g,
  'className="text-lg sm:text-3xl font-bold text-white/95 leading-snug drop-shadow-sm truncate sm:whitespace-normal"'
);
fs.writeFileSync('src/pages/HomePage.tsx', homeContent);

// 2. Fix LevelPage title color
let levelContent = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');
levelContent = levelContent.replace(
  /className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-\[0\.2em\] drop-shadow-sm text-center flex items-center gap-3"/g,
  'className="text-base sm:text-lg md:text-xl font-black text-cyan-200 uppercase tracking-[0.2em] drop-shadow-md text-center flex items-center gap-3"'
);
fs.writeFileSync('src/pages/LevelPage.tsx', levelContent);
