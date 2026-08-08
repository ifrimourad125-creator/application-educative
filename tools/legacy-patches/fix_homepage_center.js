import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /<div className="flex w-8 h-8 rounded-full border border-white\/60 bg-white\/20 backdrop-blur-md items-center justify-center text-white shrink-0 group-hover:bg-white\/35 transition-all shadow-md">/,
  '<div className="w-16 sm:w-20 shrink-0 flex justify-end"><div className="flex w-8 h-8 rounded-full border border-white/60 bg-white/20 backdrop-blur-md items-center justify-center text-white group-hover:bg-white/35 transition-all shadow-md">'
);
content = content.replace(
  /                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" \/>\n                <\/div>/,
  '                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />\n                </div></div>'
);

content = content.replace(
  /<div className="relative shrink-0">/,
  '<div className="relative shrink-0 w-16 sm:w-20">'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
