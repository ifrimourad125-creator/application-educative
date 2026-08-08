import fs from 'fs';

let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /'shadow-\[0_8px_25px_rgba\(6,182,212,0.35\)\] group-hover:shadow-\[0_12px_30px_rgba\(6,182,212,0.5\)\]'/,
  "'hover:shadow-[0_12px_30px_rgba(6,182,212,0.6)] hover:shadow-cyan-500/50 transition-all duration-300'"
);
content = content.replace(
  /'shadow-\[0_8px_25px_rgba\(217,70,239,0.35\)\] group-hover:shadow-\[0_12px_30px_rgba\(217,70,239,0.5\)\]'/,
  "'hover:shadow-[0_12px_30px_rgba(217,70,239,0.6)] hover:shadow-fuchsia-500/50 transition-all duration-300'"
);
content = content.replace(
  /'shadow-\[0_8px_25px_rgba\(245,158,11,0.35\)\] group-hover:shadow-\[0_12px_30px_rgba\(245,158,11,0.5\)\]'/,
  "'hover:shadow-[0_12px_30px_rgba(245,158,11,0.6)] hover:shadow-amber-500/50 transition-all duration-300'"
);

content = content.replace(
  /<div className=\{\`relative overflow-hidden rounded-2xl sm:rounded-3xl \$\{config\.gradientBg\} \$\{config\.borderStyle\} \$\{config\.shadowGlow\} p-4 sm:p-6 flex flex-row sm:flex-col items-center justify-between gap-3 sm:gap-4 transition-all duration-300 h-full\`\}>/,
  "<div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${config.gradientBg} ${config.borderStyle} ${config.shadowGlow} p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-300 h-full`}>"
);

content = content.replace(
  /<div className="text-left sm:text-center flex-1 min-w-0 space-y-0.5">/,
  '<div className="text-center flex-1 min-w-0 space-y-0.5 flex flex-col justify-center">'
);

// We should also remove the right arrow on mobile if it's now flex-col and centered
content = content.replace(
  /<div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border border-white\/60 bg-white\/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-white\/35 transition-all shadow-md">/g,
  '<div className="hidden sm:flex w-8 h-8 rounded-full border border-white/60 bg-white/20 backdrop-blur-md items-center justify-center text-white shrink-0 group-hover:bg-white/35 transition-all shadow-md mt-2">'
);


fs.writeFileSync('src/pages/HomePage.tsx', content);
