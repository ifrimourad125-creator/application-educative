import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

// Add iconGlow to type definition
content = content.replace(
  /subTitle: string;\n}> = {/,
  'subTitle: string;\n  iconGlow: string;\n}> = {'
);

// Add iconGlow for 1ac
content = content.replace(
  /subTitle: 'Première Année Collège',\n  },/,
  "subTitle: 'Première Année Collège',\n    iconGlow: 'animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.7)] border-cyan-400/80',\n  },"
);

// Add iconGlow for 2ac
content = content.replace(
  /subTitle: 'Deuxième Année Collège',\n  },/,
  "subTitle: 'Deuxième Année Collège',\n    iconGlow: 'animate-pulse shadow-[0_0_20px_rgba(232,121,249,0.7)] border-fuchsia-400/80',\n  },"
);

// Add iconGlow for 3ac
content = content.replace(
  /subTitle: 'Troisième Année Collège',\n  }\n};/,
  "subTitle: 'Troisième Année Collège',\n    iconGlow: 'animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.7)] border-amber-400/80',\n  }\n};"
);

// Modify the container
content = content.replace(
  /<div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl border-2 border-white\/80 bg-white\/20 backdrop-blur-md flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">/g,
  '<div className={`w-16 h-16 sm:w-28 sm:h-28 rounded-full border-2 bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ${config.iconGlow}`}>'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
