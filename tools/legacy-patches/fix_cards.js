import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

// 1. Remove min-h-[200px] and reduce padding on the cards
content = content.replace(
  /className=\{\`relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer min-h-\[200px\] group \$\{cardStyle\}\`\}/g,
  "className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer group ${cardStyle}`}"
);

// 2. Adjust the inner flex spacing and emoji sizes to be more compact
content = content.replace(
  /<div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full h-full">/,
  '<div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full h-full">'
);

content = content.replace(
  /<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white\/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white\/30 group-hover:scale-110 transition-transform duration-300">/,
  '<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">'
);

content = content.replace(
  /<span className="text-4xl sm:text-5xl drop-shadow-md">\{semEmoji\}<\/span>/,
  '<span className="text-3xl sm:text-4xl drop-shadow-md">{semEmoji}</span>'
);

content = content.replace(
  /<h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md leading-none">/,
  '<h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md leading-none">'
);

// 3. Update the main padding bottom of the page to ensure it doesn't get hidden behind navbar
content = content.replace(
  /className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-6 max-w-2xl mx-auto w-full pb-8"/,
  'className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-6 max-w-2xl mx-auto w-full pb-12 sm:pb-16"'
);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
