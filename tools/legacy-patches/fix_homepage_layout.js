import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /className=\{\`relative overflow-hidden rounded-2xl sm:rounded-3xl \$\{config.gradientBg\} \$\{config.borderStyle\} \$\{config.shadowGlow\} p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-300 h-full\`\}/,
  "className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${config.gradientBg} ${config.borderStyle} ${config.shadowGlow} p-4 sm:p-6 flex flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-300 h-full`}"
);

content = content.replace(
  /<div className="hidden sm:flex w-8 h-8 rounded-full border border-white\/60 bg-white\/20 backdrop-blur-md items-center justify-center text-white shrink-0 group-hover:bg-white\/35 transition-all shadow-md mt-2">/,
  '<div className="flex w-8 h-8 rounded-full border border-white/60 bg-white/20 backdrop-blur-md items-center justify-center text-white shrink-0 group-hover:bg-white/35 transition-all shadow-md">'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
